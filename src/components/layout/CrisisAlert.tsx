import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';
import { CrisisButton } from '@/components/crisis/CrisisButton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface CrisisAlert {
  id: string;
  message: string;
  urgency_level: number;
  created_at: string;
  dismissed_at?: string;
}

export const CrisisAlert: React.FC = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<CrisisAlert[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    // Check for crisis alerts based on recent activities
    checkForCrisisAlerts();

    // Subscribe to real-time updates for crisis situations
    const alertsChannel = supabase
      .channel('crisis-alerts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'crisis_sessions',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          checkForCrisisAlerts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(alertsChannel);
    };
  }, [user]);

  const checkForCrisisAlerts = async () => {
    if (!user) return;

    try {
      // Check for recent mood entries indicating distress
      const { data: recentMoods } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
        .order('created_at', { ascending: false });

      // Check for high stress levels or concerning mood patterns
      const concerningMoods = recentMoods?.filter(mood => 
        mood.mood === 'very_sad' || 
        mood.mood === 'anxious' || 
        (mood.stress_level && mood.stress_level >= 8)
      );

      if (concerningMoods && concerningMoods.length >= 2) {
        const alertId = `mood-alert-${Date.now()}`;
        if (!dismissed.includes(alertId)) {
          setAlerts(prev => [{
            id: alertId,
            message: "We've noticed you've been experiencing some difficult feelings. Crisis support is available 24/7 if you need someone to talk to.",
            urgency_level: 3,
            created_at: new Date().toISOString()
          }, ...prev]);
        }
      }

      // Check for keywords in recent chat messages that might indicate crisis
      // This would be implemented with the AI system detecting concerning language patterns

    } catch (error) {
      console.error('Error checking for crisis alerts:', error);
    }
  };

  const dismissAlert = (alertId: string) => {
    setDismissed(prev => [...prev, alertId]);
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const visibleAlerts = alerts.filter(alert => !dismissed.includes(alert.id));

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {visibleAlerts.map(alert => (
        <Alert key={alert.id} className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 shadow-lg">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm mb-3">{alert.message}</p>
                <div className="flex gap-2">
                  <CrisisButton 
                    variant="destructive" 
                    size="sm"
                    className="text-xs h-8"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => dismissAlert(alert.id)}
                    className="text-xs h-8"
                  >
                    Not now
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert(alert.id)}
                className="h-6 w-6 p-0 hover:bg-orange-100 dark:hover:bg-orange-900/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};