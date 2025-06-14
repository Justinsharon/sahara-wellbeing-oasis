
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { CharacterCompanion } from '@/types/character';

interface BreathingExerciseProps {
  character: CharacterCompanion;
  onComplete: () => void;
}

export function BreathingExercise({ character, onComplete }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready');
  const [countdown, setCountdown] = useState(4);
  const [cycle, setCycle] = useState(0);
  const totalCycles = 3;

  const startBreathing = () => {
    setPhase('inhale');
    setCycle(1);
    setCountdown(4);
  };

  useEffect(() => {
    if (phase === 'ready' || phase === 'complete') return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else if (phase === 'exhale') {
            if (cycle >= totalCycles) {
              setPhase('complete');
              return 0;
            } else {
              setCycle(prev => prev + 1);
              setPhase('inhale');
              return 4;
            }
          }
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, cycle]);

  const getInstructions = () => {
    switch (phase) {
      case 'ready':
        return "Let's take a moment to breathe together. We'll do three slow, deep breaths.";
      case 'inhale':
        return 'Breathe in slowly...';
      case 'hold':
        return 'Hold your breath...';
      case 'exhale':
        return 'Breathe out slowly...';
      case 'complete':
        return 'Great job! How do you feel now?';
      default:
        return '';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-150';
      case 'hold':
        return 'scale-150';
      case 'exhale':
        return 'scale-100';
      default:
        return 'scale-100';
    }
  };

  return (
    <div className="min-h-screen sahara-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md soft-shadow border-0">
        <CardHeader className="text-center">
          <CardTitle>Breathing Exercise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <CharacterAvatar 
              character={character} 
              size="lg"
              expression={{ type: 'neutral', intensity: 'medium' }}
            />
            
            <div className="text-center">
              <p className="text-lg font-medium mb-2">{character.name} says:</p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm">{getInstructions()}</p>
              </div>
            </div>
          </div>

          {phase !== 'ready' && phase !== 'complete' && (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div 
                  className={`w-24 h-24 rounded-full bg-primary/20 border-2 border-primary transition-transform duration-1000 ease-in-out ${getCircleScale()}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{countdown}</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Cycle {cycle} of {totalCycles}
                </p>
                <p className="text-lg font-medium">{phase.charAt(0).toUpperCase() + phase.slice(1)}</p>
              </div>
            </div>
          )}

          {phase === 'ready' && (
            <Button onClick={startBreathing} className="w-full">
              Start Breathing Exercise
            </Button>
          )}

          {phase === 'complete' && (
            <Button onClick={onComplete} className="w-full">
              Continue Assessment
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
