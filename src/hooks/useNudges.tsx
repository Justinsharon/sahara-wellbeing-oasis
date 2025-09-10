import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Nudge {
  id: string;
  user_id: string;
  type: 'micro_checkin' | 'suggestion' | 'celebration';
  message: string;
  metadata_json?: any;
  scheduled_at: string;
  delivered_at?: string;
  status: 'pending' | 'sent' | 'snoozed' | 'dismissed';
  severity: 'low' | 'normal' | 'high';
  created_at: string;
}

export function useNudges() {
  const [nudges, setNudges] = useState<Nudge[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchNudges();
      setupRealtimeSubscription();
    } else {
      setNudges([]);
      setLoading(false);
    }
  }, [user]);

  const fetchNudges = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('nudges')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['pending', 'sent'])
        .order('scheduled_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching nudges:', error);
        return;
      }

      setNudges((data || []) as Nudge[]);
    } catch (error) {
      console.error('Error fetching nudges:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    if (!user) return;

    const channel = supabase
      .channel('nudges-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'nudges',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNudge = payload.new as Nudge;
          setNudges(prev => [newNudge, ...prev]);
          
          // Show toast notification for new nudges
          if (newNudge.type === 'celebration') {
            toast.success(newNudge.message, {
              duration: 5000,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const updateNudgeStatus = async (nudgeId: string, status: 'sent' | 'snoozed' | 'dismissed') => {
    try {
      const updateData: any = { status };
      if (status === 'sent') {
        updateData.delivered_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('nudges')
        .update(updateData)
        .eq('id', nudgeId);

      if (error) {
        console.error('Error updating nudge status:', error);
        return;
      }

      setNudges(prev => 
        prev.map(nudge => 
          nudge.id === nudgeId 
            ? { ...nudge, ...updateData }
            : nudge
        )
      );
    } catch (error) {
      console.error('Error updating nudge status:', error);
    }
  };

  const snoozeNudge = async (nudgeId: string, hours: number = 1) => {
    try {
      const newScheduledTime = new Date(Date.now() + hours * 60 * 60 * 1000);
      
      const { error } = await supabase
        .from('nudges')
        .update({
          status: 'pending',
          scheduled_at: newScheduledTime.toISOString()
        })
        .eq('id', nudgeId);

      if (error) {
        console.error('Error snoozing nudge:', error);
        return;
      }

      setNudges(prev => 
        prev.map(nudge => 
          nudge.id === nudgeId 
            ? { 
                ...nudge, 
                status: 'pending' as const,
                scheduled_at: newScheduledTime.toISOString()
              }
            : nudge
        )
      );

      toast.success('Nudge snoozed for 1 hour');
    } catch (error) {
      console.error('Error snoozing nudge:', error);
    }
  };

  const dismissNudge = async (nudgeId: string) => {
    await updateNudgeStatus(nudgeId, 'dismissed');
  };

  const markAsDelivered = async (nudgeId: string) => {
    await updateNudgeStatus(nudgeId, 'sent');
  };

  return {
    nudges,
    loading,
    snoozeNudge,
    dismissNudge,
    markAsDelivered,
    refetch: fetchNudges
  };
}