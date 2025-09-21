import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

export interface CrisisSession {
  id: string;
  user_id: string;
  counselor_id?: string;
  session_type: 'chat' | 'voice' | 'video';
  status: 'pending' | 'active' | 'completed' | 'escalated' | 'transferred';
  urgency_level: number;
  location_data?: any;
  initial_message?: string;
  resolution_notes?: string;
  escalation_reason?: string;
  session_metadata?: any;
  started_at?: string;
  ended_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CrisisMessage {
  id: string;
  session_id: string;
  sender_id: string;
  sender_type: 'user' | 'counselor' | 'system';
  message_type: 'text' | 'file' | 'image' | 'system_alert';
  content: string;
  file_url?: string;
  metadata?: any;
  is_read: boolean;
  created_at: string;
}

export interface CrisisLocation {
  id: string;
  country_code: string;
  state_province?: string;
  city?: string;
  resource_type: 'emergency_services' | 'hospital' | 'crisis_center' | 'hotline' | 'support_group';
  name: string;
  phone_number?: string;
  address?: string;
  website_url?: string;
  hours_of_operation?: string;
  languages_supported?: string[];
  special_services?: string[];
  coordinates?: any;
  metadata?: any;
  is_active: boolean;
}

export const useCrisisSupport = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentSession, setCurrentSession] = useState<CrisisSession | null>(null);
  const [messages, setMessages] = useState<CrisisMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Start a new crisis session
  const startCrisisSession = async (
    sessionType: 'chat' | 'voice' | 'video' = 'chat',
    urgencyLevel: number = 3,
    initialMessage?: string
  ) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access crisis support",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);
    try {
      // Get user location if available
      let locationData = null;
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
        } catch (error) {
          console.log('Location access denied or unavailable');
        }
      }

      const { data, error } = await supabase
        .from('crisis_sessions')
        .insert({
          user_id: user.id,
          session_type: sessionType,
          urgency_level: urgencyLevel,
          initial_message: initialMessage,
          location_data: locationData,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentSession(data as CrisisSession);
      
      // Call crisis matching edge function
      await supabase.functions.invoke('crisis-matcher', {
        body: { sessionId: data.id, urgencyLevel, sessionType }
      });

      toast({
        title: "Crisis Support Initiated",
        description: "Connecting you with a crisis counselor...",
      });

      return data;
    } catch (error) {
      console.error('Error starting crisis session:', error);
      toast({
        title: "Error",
        description: "Failed to start crisis session. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Send a message in the current session
  const sendMessage = async (content: string, messageType: 'text' | 'file' | 'image' = 'text') => {
    if (!currentSession || !user) return null;

    try {
      const { data, error } = await supabase
        .from('crisis_messages')
        .insert({
          session_id: currentSession.id,
          sender_id: user.id,
          sender_type: 'user',
          message_type: messageType,
          content
        })
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, data as CrisisMessage]);
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Escalate to emergency services
  const escalateToEmergency = async (reason: string) => {
    if (!currentSession || !user) return;

    try {
      await supabase.functions.invoke('crisis-escalation', {
        body: {
          sessionId: currentSession.id,
          escalationType: 'emergency_services',
          reason
        }
      });

      toast({
        title: "Emergency Services Contacted",
        description: "Emergency services have been notified of your situation.",
      });
    } catch (error) {
      console.error('Error escalating to emergency:', error);
      toast({
        title: "Error",
        description: "Failed to contact emergency services. Please call 911 directly.",
        variant: "destructive",
      });
    }
  };

  // Get crisis resources by location
  const getCrisisResources = async (countryCode?: string, stateProvince?: string) => {
    try {
      let query = supabase
        .from('crisis_locations')
        .select('*')
        .eq('is_active', true);

      if (countryCode) {
        query = query.eq('country_code', countryCode);
      }
      if (stateProvince) {
        query = query.eq('state_province', stateProvince);
      }

      const { data, error } = await query.order('resource_type').order('name');
      
      if (error) throw error;
      return data as CrisisLocation[];
    } catch (error) {
      console.error('Error fetching crisis resources:', error);
      return [];
    }
  };

  // End current session
  const endSession = async (resolutionNotes?: string) => {
    if (!currentSession) return;

    try {
      const { error } = await supabase
        .from('crisis_sessions')
        .update({
          status: 'completed',
          ended_at: new Date().toISOString(),
          resolution_notes: resolutionNotes
        })
        .eq('id', currentSession.id);

      if (error) throw error;

      setCurrentSession(null);
      setMessages([]);
      
      toast({
        title: "Session Ended",
        description: "Crisis support session has been completed.",
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: "Error",
        description: "Failed to end session properly.",
        variant: "destructive",
      });
    }
  };

  // Subscribe to real-time session updates
  useEffect(() => {
    if (!currentSession) return;

    const messagesChannel = supabase
      .channel(`crisis-messages-${currentSession.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'crisis_messages',
          filter: `session_id=eq.${currentSession.id}`
        },
        (payload) => {
          const newMessage = payload.new as CrisisMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    const sessionChannel = supabase
      .channel(`crisis-session-${currentSession.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'crisis_sessions',
          filter: `id=eq.${currentSession.id}`
        },
        (payload) => {
          const updatedSession = payload.new as CrisisSession;
          setCurrentSession(updatedSession);
          
          if (updatedSession.counselor_id && updatedSession.status === 'active') {
            setIsConnecting(false);
            toast({
              title: "Counselor Connected",
              description: "A crisis counselor has joined your session.",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(sessionChannel);
    };
  }, [currentSession, toast]);

  // Load existing messages when session starts
  useEffect(() => {
    if (!currentSession) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('crisis_messages')
        .select('*')
        .eq('session_id', currentSession.id)
        .order('created_at');

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data as CrisisMessage[]);
    };

    loadMessages();
  }, [currentSession]);

  return {
    currentSession,
    messages,
    loading,
    isConnecting,
    startCrisisSession,
    sendMessage,
    escalateToEmergency,
    getCrisisResources,
    endSession
  };
};