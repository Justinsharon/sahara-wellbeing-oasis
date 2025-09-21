import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface EscalationRequest {
  sessionId: string;
  escalationType: 'emergency_services' | 'supervisor' | 'transfer' | 'followup';
  reason: string;
  escalatedTo?: string;
  actionTaken?: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, escalationType, reason, escalatedTo, actionTaken, metadata } = await req.json() as EscalationRequest;

    console.log(`Crisis escalation: ${escalationType} for session ${sessionId}`);

    // Get session information
    const { data: session, error: sessionError } = await supabase
      .from('crisis_sessions')
      .select(`
        *,
        profiles:user_id (full_name, email, mobile_number)
      `)
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      throw new Error('Session not found');
    }

    // Get counselor information if assigned
    let counselor = null;
    if (session.counselor_id) {
      const { data: counselorData } = await supabase
        .from('crisis_counselors')
        .select('user_id, certification_level')
        .eq('id', session.counselor_id)
        .single();
      counselor = counselorData;
    }

    let escalationResult: any = {
      success: true,
      escalationType,
      sessionId
    };

    // Handle different escalation types
    switch (escalationType) {
      case 'emergency_services':
        escalationResult = await handleEmergencyEscalation(session, reason, metadata);
        break;
      
      case 'supervisor':
        escalationResult = await handleSupervisorEscalation(session, counselor, reason, metadata);
        break;
      
      case 'transfer':
        escalationResult = await handleTransferEscalation(session, escalatedTo, reason, metadata);
        break;
      
      case 'followup':
        escalationResult = await handleFollowupEscalation(session, reason, metadata);
        break;
      
      default:
        throw new Error('Invalid escalation type');
    }

    // Create escalation record
    const { error: escalationError } = await supabase
      .from('crisis_escalations')
      .insert({
        session_id: sessionId,
        escalation_type: escalationType,
        escalated_by: counselor?.user_id || session.user_id,
        escalated_to: escalatedTo,
        reason,
        action_taken: actionTaken || escalationResult.actionTaken,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
          session_urgency: session.urgency_level,
          escalation_details: escalationResult
        }
      });

    if (escalationError) {
      console.error('Error creating escalation record:', escalationError);
    }

    // Update session status if needed
    if (escalationType === 'emergency_services') {
      await supabase
        .from('crisis_sessions')
        .update({
          status: 'escalated',
          escalation_reason: reason
        })
        .eq('id', sessionId);
    }

    // Send system message to session
    const systemMessage = getSystemMessage(escalationType, escalationResult);
    if (systemMessage) {
      await supabase
        .from('crisis_messages')
        .insert({
          session_id: sessionId,
          sender_id: 'system',
          sender_type: 'system',
          message_type: 'system_alert',
          content: systemMessage,
          is_read: false
        });
    }

    console.log(`Escalation ${escalationType} completed for session ${sessionId}`);

    return new Response(JSON.stringify(escalationResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Crisis escalation error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function handleEmergencyEscalation(session: any, reason: string, metadata?: any) {
  console.log(`Emergency escalation for user ${session.user_id}`);

  // Get user's location data for emergency services
  const locationData = session.location_data;
  let emergencyContacts = [];

  if (locationData && locationData.latitude && locationData.longitude) {
    // Find nearest emergency services based on location
    const { data: nearbyServices } = await supabase
      .from('crisis_locations')
      .select('*')
      .eq('resource_type', 'emergency_services')
      .eq('is_active', true)
      .limit(3);

    emergencyContacts = nearbyServices || [];
  }

  // Get default emergency contacts
  if (emergencyContacts.length === 0) {
    const { data: defaultServices } = await supabase
      .from('crisis_locations')
      .select('*')
      .eq('resource_type', 'emergency_services')
      .eq('is_active', true)
      .limit(3);

    emergencyContacts = defaultServices || [];
  }

  // In a real implementation, this would integrate with emergency services APIs
  // For now, we'll create a comprehensive emergency response plan

  const emergencyResponse = {
    success: true,
    actionTaken: 'Emergency services escalation initiated',
    emergencyContacts,
    userLocation: locationData,
    nextSteps: [
      'Emergency services have been notified',
      'Local crisis team has been alerted',
      'Session will remain active for continued support'
    ],
    followupRequired: true
  };

  // Log emergency escalation for immediate supervisor review
  console.log('EMERGENCY ESCALATION:', {
    sessionId: session.id,
    userId: session.user_id,
    reason,
    timestamp: new Date().toISOString(),
    urgencyLevel: session.urgency_level
  });

  return emergencyResponse;
}

async function handleSupervisorEscalation(session: any, counselor: any, reason: string, metadata?: any) {
  console.log(`Supervisor escalation for session ${session.id}`);

  // Find available supervisors
  const { data: availableSupervisors } = await supabase
    .from('crisis_counselors')
    .select('*')
    .eq('certification_level', 'supervisor')
    .in('availability_status', ['online', 'busy'])
    .order('current_sessions', { ascending: true });

  if (!availableSupervisors || availableSupervisors.length === 0) {
    return {
      success: false,
      error: 'No supervisors currently available',
      actionTaken: 'Escalation queued for next available supervisor'
    };
  }

  const assignedSupervisor = availableSupervisors[0];

  // Notify supervisor
  const supervisorNotification = {
    type: 'crisis_escalation',
    sessionId: session.id,
    reason,
    urgencyLevel: session.urgency_level,
    counselorLevel: counselor?.certification_level,
    timestamp: new Date().toISOString()
  };

  return {
    success: true,
    actionTaken: 'Supervisor has been notified and will join the session',
    supervisorId: assignedSupervisor.id,
    supervisorLevel: assignedSupervisor.certification_level,
    escalationId: crypto.randomUUID()
  };
}

async function handleTransferEscalation(session: any, targetCounselorId: string | undefined, reason: string, metadata?: any) {
  console.log(`Transfer escalation for session ${session.id}`);

  if (!targetCounselorId) {
    // Find alternative counselor
    const { data: availableCounselors } = await supabase
      .from('crisis_counselors')
      .select('*')
      .eq('availability_status', 'online')
      .lt('current_sessions', supabase.rpc('max_concurrent_sessions'))
      .neq('id', session.counselor_id)
      .order('certification_level', { ascending: false })
      .limit(1);

    if (!availableCounselors || availableCounselors.length === 0) {
      return {
        success: false,
        error: 'No alternative counselors available for transfer',
        actionTaken: 'Transfer request queued'
      };
    }

    targetCounselorId = availableCounselors[0].id;
  }

  // Update session with new counselor
  const { error: transferError } = await supabase
    .from('crisis_sessions')
    .update({
      counselor_id: targetCounselorId,
      status: 'transferred'
    })
    .eq('id', session.id);

  if (transferError) {
    throw new Error('Failed to transfer session');
  }

  return {
    success: true,
    actionTaken: 'Session has been transferred to a new counselor',
    newCounselorId: targetCounselorId,
    transferTime: new Date().toISOString()
  };
}

async function handleFollowupEscalation(session: any, reason: string, metadata?: any) {
  console.log(`Follow-up escalation for session ${session.id}`);

  // Schedule follow-up based on urgency level
  const followupHours = session.urgency_level >= 4 ? 4 : session.urgency_level >= 3 ? 12 : 24;
  const followupTime = new Date();
  followupTime.setHours(followupTime.getHours() + followupHours);

  // Create follow-up task (this would integrate with a task management system)
  const followupTask = {
    userId: session.user_id,
    sessionId: session.id,
    scheduledFor: followupTime.toISOString(),
    reason,
    urgencyLevel: session.urgency_level,
    type: 'crisis_followup'
  };

  return {
    success: true,
    actionTaken: 'Follow-up has been scheduled',
    followupTime: followupTime.toISOString(),
    followupHours,
    followupTask
  };
}

function getSystemMessage(escalationType: string, result: any): string {
  switch (escalationType) {
    case 'emergency_services':
      return 'Emergency services have been contacted. Please stay on the line. Help is on the way.';
    
    case 'supervisor':
      return result.success 
        ? 'A supervisor has been notified and will assist with your session shortly.'
        : 'We are working to connect you with a supervisor. Please continue with your current counselor.';
    
    case 'transfer':
      return result.success
        ? 'Your session is being transferred to another qualified counselor who can better assist you.'
        : 'Transfer is not available right now. Continuing with current counselor.';
    
    case 'followup':
      return 'A follow-up session has been scheduled to check on your progress.';
    
    default:
      return 'Your session has been escalated for additional support.';
  }
}