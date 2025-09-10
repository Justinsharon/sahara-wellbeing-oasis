import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Clock, CheckCircle } from 'lucide-react';
import { Nudge } from '@/hooks/useNudges';

interface NudgeBannerProps {
  nudge: Nudge;
  onSnooze: () => void;
  onDismiss: () => void;
  onAction: () => void;
}

export const NudgeBanner: React.FC<NudgeBannerProps> = ({
  nudge,
  onSnooze,
  onDismiss,
  onAction,
}) => {
  const getIcon = () => {
    switch (nudge.type) {
      case 'micro_checkin':
        return '💭';
      case 'suggestion':
        return '💡';
      case 'celebration':
        return '🎉';
      default:
        return '📝';
    }
  };

  const getActionText = () => {
    switch (nudge.type) {
      case 'micro_checkin':
        return 'Quick Check-in';
      case 'suggestion':
        return 'Try It';
      case 'celebration':
        return 'Awesome!';
      default:
        return 'Okay';
    }
  };

  const getBgColor = () => {
    switch (nudge.severity) {
      case 'high':
        return 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30';
      case 'normal':
        return 'bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/30';
      case 'low':
        return 'bg-gradient-to-r from-muted/50 to-muted/20 border-muted';
      default:
        return 'bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/30';
    }
  };

  return (
    <Card className={`p-4 ${getBgColor()} animate-in slide-in-from-top-2 duration-300`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-foreground leading-relaxed">
            {nudge.message}
          </p>
          
          {nudge.metadata_json?.suggestion && (
            <p className="text-xs text-muted-foreground mt-1">
              {nudge.metadata_json.suggestion}
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {nudge.type !== 'celebration' && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={onSnooze}
                className="gap-1 h-8 px-2"
              >
                <Clock className="w-3 h-3" />
                1h
              </Button>
            </>
          )}
          
          <Button
            size="sm"
            onClick={onAction}
            className="gap-1 h-8 px-3"
          >
            <CheckCircle className="w-3 h-3" />
            {getActionText()}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onDismiss}
            className="h-8 w-8 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};