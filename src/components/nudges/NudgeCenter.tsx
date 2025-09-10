import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, CheckCircle2, X } from 'lucide-react';
import { useNudges } from '@/hooks/useNudges';
import { format } from 'date-fns';

export const NudgeCenter: React.FC = () => {
  const { nudges, snoozeNudge, dismissNudge, markAsDelivered } = useNudges();
  const [isOpen, setIsOpen] = useState(false);

  const pendingNudges = nudges.filter(n => n.status === 'pending');
  const recentNudges = nudges.filter(n => n.status !== 'pending').slice(0, 5);

  const handleAction = async (nudgeId: string, type: string) => {
    await markAsDelivered(nudgeId);
    
    if (type === 'micro_checkin') {
      // Navigate to mood check-in
      window.location.href = '/personal-growth/mood-journal';
    }
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {pendingNudges.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {pendingNudges.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Wellness Nudges</DialogTitle>
          <DialogDescription>
            Your personalized wellness reminders and suggestions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Pending Nudges */}
          {pendingNudges.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-foreground mb-2">
                Action Needed
              </h3>
              <div className="space-y-2">
                {pendingNudges.map((nudge) => (
                  <div
                    key={nudge.id}
                    className="p-3 rounded-lg border bg-primary/5 border-primary/20"
                  >
                    <div className="flex items-start gap-2">
                      <div className="text-lg">
                        {nudge.type === 'micro_checkin' ? '💭' : 
                         nudge.type === 'suggestion' ? '💡' : '🎉'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          {nudge.message}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            onClick={() => handleAction(nudge.id, nudge.type)}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {nudge.type === 'micro_checkin' ? 'Check-in' : 'Try It'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => snoozeNudge(nudge.id)}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            1h
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => dismissNudge(nudge.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Nudges */}
          {recentNudges.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-foreground mb-2">
                Recent Activity
              </h3>
              <div className="space-y-2">
                {recentNudges.map((nudge) => (
                  <div
                    key={nudge.id}
                    className="p-3 rounded-lg border bg-muted/20"
                  >
                    <div className="flex items-start gap-2">
                      <div className="text-sm opacity-60">
                        {nudge.type === 'micro_checkin' ? '💭' : 
                         nudge.type === 'suggestion' ? '💡' : '🎉'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          {nudge.message}
                        </p>
                        <div className="text-xs text-muted-foreground mt-1">
                          {format(new Date(nudge.delivered_at || nudge.created_at), 'MMM d, h:mm a')}
                        </div>
                      </div>
                      <Badge 
                        variant={nudge.status === 'sent' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {nudge.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {nudges.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-4xl mb-2">🔔</div>
              <p>No nudges yet. Keep using the app to get personalized suggestions!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};