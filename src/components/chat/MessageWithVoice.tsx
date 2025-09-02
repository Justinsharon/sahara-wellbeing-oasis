import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface MessageWithVoiceProps {
  message: string;
  isAI?: boolean;
  children?: React.ReactNode;
}

export const MessageWithVoice: React.FC<MessageWithVoiceProps> = ({
  message,
  isAI = false,
  children
}) => {
  const { speak, stop, pause, resume, speaking, paused, supported } = useTextToSpeech();

  const handlePlay = () => {
    if (speaking && !paused) {
      pause();
    } else if (paused) {
      resume();
    } else {
      speak(message);
    }
  };

  const handleStop = () => {
    stop();
  };

  if (!isAI || !supported) {
    return <div>{children}</div>;
  }

  return (
    <div className="group">
      {children}
      <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={handlePlay}
          className="h-6 px-2 text-xs"
        >
          {speaking && !paused ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </Button>
        {speaking && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleStop}
            className="h-6 px-2 text-xs"
          >
            <Square className="w-3 h-3" />
          </Button>
        )}
        <Volume2 className="w-3 h-3 text-muted-foreground ml-1" />
      </div>
    </div>
  );
};