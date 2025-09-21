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

interface CrisisMatchingRequest {
  sessionId: string;
  urgencyLevel: number;
  sessionType: 'chat' | 'voice' | 'video';
  specialtyPreferences?: string[];
  languagePreference?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, urgencyLevel, sessionType, specialtyPreferences, languagePreference } = await req.json() as CrisisMatchingRequest;

    console.log(`Crisis matcher: Processing session ${sessionId} with urgency ${urgencyLevel}`);

    // Step 1: Find available counselors
    let counselorQuery = supabase
      .from('crisis_counselors')
      .select('*')
      .eq('availability_status', 'online')
      .lt('current_sessions', supabase.rpc('max_concurrent_sessions'));

    // Filter by language preference if specified
    if (languagePreference) {
      counselorQuery = counselorQuery.contains('languages', [languagePreference]);
    }

    // Filter by specialty preferences if specified
    if (specialtyPreferences && specialtyPreferences.length > 0) {
      counselorQuery = counselorQuery.overlaps('specialties', specialtyPreferences);
    }

    const { data: availableCounselors, error: counselorError } = await counselorQuery
      .order('current_sessions', { ascending: true })
      .order('certification_level', { ascending: false });

    if (counselorError) {
      console.error('Error fetching counselors:', counselorError);
      throw new Error('Failed to fetch available counselors');
    }

    console.log(`Found ${availableCounselors?.length || 0} available counselors`);

    // Step 2: Apply matching algorithm based on urgency
    let selectedCounselor = null;

    if (availableCounselors && availableCounselors.length > 0) {
      if (urgencyLevel >= 4) {
        // High urgency: Find senior/supervisor counselors first
        selectedCounselor = availableCounselors.find(c => 
          c.certification_level === 'supervisor' || c.certification_level === 'senior'
        ) || availableCounselors[0];
      } else if (urgencyLevel >= 3) {
        // Medium urgency: Find certified counselors
        selectedCounselor = availableCounselors.find(c => 
          c.certification_level === 'certified' || c.certification_level === 'senior'
        ) || availableCounselors[0];
      } else {
        // Lower urgency: Any available counselor
        selectedCounselor = availableCounselors[0];
      }
    }

    // Step 3: Assign counselor or queue session
    if (selectedCounselor) {
      console.log(`Assigning counselor ${selectedCounselor.id} to session ${sessionId}`);

      // Update session with assigned counselor
      const { error: sessionUpdateError } = await supabase
        .from('crisis_sessions')
        .update({
          counselor_id: selectedCounselor.id,
          status: 'active',
          started_at: new Date().toISOString()
        })
        .eq('id', sessionId);

      if (sessionUpdateError) {
        console.error('Error updating session:', sessionUpdateError);
        throw new Error('Failed to assign counselor to session');
      }

      // Update counselor's current session count
      const { error: counselorUpdateError } = await supabase
        .from('crisis_counselors')
        .update({
          current_sessions: selectedCounselor.current_sessions + 1,
          availability_status: selectedCounselor.current_sessions + 1 >= selectedCounselor.max_concurrent_sessions ? 'busy' : 'online'
        })
        .eq('id', selectedCounselor.id);

      if (counselorUpdateError) {
        console.error('Error updating counselor:', counselorUpdateError);
        // Continue anyway - session is more important
      }

      // Send initial system message
      const { error: messageError } = await supabase
        .from('crisis_messages')
        .insert({
          session_id: sessionId,
          sender_id: selectedCounselor.user_id,
          sender_type: 'system',
          message_type: 'system_alert',
          content: `A crisis counselor has joined your ${sessionType} session. You're now connected and support is available.`,
          is_read: false
        });

      if (messageError) {
        console.error('Error sending system message:', messageError);
      }

      // If urgency is critical, send alert to supervisors
      if (urgencyLevel === 5) {
        console.log('Critical urgency detected, alerting supervisors');
        
        const { data: supervisors } = await supabase
          .from('crisis_counselors')
          .select('user_id')
          .eq('certification_level', 'supervisor')
          .eq('availability_status', 'online');

        if (supervisors && supervisors.length > 0) {
          // Create escalation record for supervisor notification
          await supabase
            .from('crisis_escalations')
            .insert({
              session_id: sessionId,
              escalation_type: 'supervisor',
              escalated_by: selectedCounselor.user_id,
              reason: 'Critical urgency level detected',
              metadata: { auto_escalated: true, urgency_level: urgencyLevel }
            });
        }
      }

      return new Response(JSON.stringify({
        success: true,
        matched: true,
        counselor: {
          id: selectedCounselor.id,
          certification_level: selectedCounselor.certification_level,
          specialties: selectedCounselor.specialties
        },
        session_status: 'active'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else {
      console.log(`No counselors available, queuing session ${sessionId}`);

      // No counselors available - keep session in pending state
      const { error: queueError } = await supabase
        .from('crisis_sessions')
        .update({
          session_metadata: {
            queued_at: new Date().toISOString(),
            queue_position: await getQueuePosition(urgencyLevel)
          }
        })
        .eq('id', sessionId);

      if (queueError) {
        console.error('Error queuing session:', queueError);
      }

      // Send system message about queue status
      const { error: queueMessageError } = await supabase
        .from('crisis_messages')
        .insert({
          session_id: sessionId,
          sender_id: 'system',
          sender_type: 'system',
          message_type: 'system_alert',
          content: `All counselors are currently busy. You've been placed in our priority queue based on your urgency level. We'll connect you as soon as possible. If this is an emergency, please call 911 immediately.`,
          is_read: false
        });

      if (queueMessageError) {
        console.error('Error sending queue message:', queueMessageError);
      }

      return new Response(JSON.stringify({
        success: true,
        matched: false,
        session_status: 'pending',
        message: 'No counselors currently available. Session queued.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Crisis matcher error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getQueuePosition(urgencyLevel: number): Promise<number> {
  try {
    const { count } = await supabase
      .from('crisis_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
      .gte('urgency_level', urgencyLevel);

    return (count || 0) + 1;
  } catch (error) {
    console.error('Error calculating queue position:', error);
    return 1;
  }
}
