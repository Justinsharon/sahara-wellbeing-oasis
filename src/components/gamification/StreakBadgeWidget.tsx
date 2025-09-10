import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Eye } from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';
import { BadgesModal } from './BadgesModal';

export const StreakBadgeWidget: React.FC = () => {
  const { userStats, userBadges, loading } = useUserStats();
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  if (loading) {
    return (
      <Card className="p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded mb-2" />
            <div className="h-3 bg-muted rounded w-2/3" />
          </div>
        </div>
      </Card>
    );
  }

  const topBadges = userBadges.slice(0, 3);

  return (
    <>
      <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Streak Section */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">
                  {userStats?.current_streak || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Day streak
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-secondary/10">
                <Trophy className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold text-foreground">
                  {userBadges.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Badges earned
                </div>
              </div>
            </div>

            {/* Top Badges Preview */}
            {topBadges.length > 0 && (
              <div className="flex gap-1">
                {topBadges.map((userBadge) => (
                  <div
                    key={userBadge.id}
                    className="text-lg"
                    title={userBadge.badge.name}
                  >
                    {userBadge.badge.icon}
                  </div>
                ))}
                {userBadges.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{userBadges.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBadgesModal(true)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            View All
          </Button>
        </div>
      </Card>

      <BadgesModal
        isOpen={showBadgesModal}
        onClose={() => setShowBadgesModal(false)}
        userBadges={userBadges}
      />
    </>
  );
};