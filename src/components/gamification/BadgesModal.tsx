import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { UserBadge, Badge as BadgeType } from '@/hooks/useUserStats';
import { format } from 'date-fns';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBadges: UserBadge[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  userBadges,
}) => {
  const [allBadges, setAllBadges] = useState<BadgeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchAllBadges();
    }
  }, [isOpen]);

  const fetchAllBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('created_at');

      if (error) {
        console.error('Error fetching badges:', error);
        return;
      }

      setAllBadges(data || []);
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const earnedBadgeIds = new Set(userBadges.map(ub => ub.badge_id));
  const lockedBadges = allBadges.filter(badge => !earnedBadgeIds.has(badge.id));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Achievement Collection</DialogTitle>
          <DialogDescription>
            Track your wellness journey through badges and milestones.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="earned" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="earned">
              Earned ({userBadges.length})
            </TabsTrigger>
            <TabsTrigger value="locked">
              Available ({lockedBadges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-4">
            {userBadges.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-2">🎯</div>
                <p>Start your journey by logging your first mood entry!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {userBadges.map((userBadge) => (
                  <Card key={userBadge.id} className="p-4 border-2 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{userBadge.badge.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">
                          {userBadge.badge.name}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {userBadge.badge.description}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Earned {format(new Date(userBadge.earned_at), 'MMM d, yyyy')}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="locked" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {lockedBadges.map((badge) => (
                  <Card key={badge.id} className="p-4 opacity-60 border-dashed">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl grayscale">{badge.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">
                          {badge.name}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {badge.description}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Not yet earned
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};