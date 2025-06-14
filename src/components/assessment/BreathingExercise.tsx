
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { CharacterCompanion } from '@/types/character';

interface BreathingExerciseProps {
  character: CharacterCompanion | null;
  onComplete: () => void;
  onAnswer: (answer: string) => void;
}

export function BreathingExercise({ character, onComplete, onAnswer }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<'intro' | 'breathing' | 'feedback'>('intro');
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(4);
  const [selectedFeeling, setSelectedFeeling] = useState<string>('');

  const totalBreaths = 3;
  const breathTiming = { inhale: 4, hold: 4, exhale: 6 };

  useEffect(() => {
    if (phase === 'breathing') {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            // Move to next phase
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return breathTiming.hold;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return breathTiming.exhale;
            } else {
              // Completed one breath cycle
              const newCount = breathCount + 1;
              setBreathCount(newCount);
              
              if (newCount >= totalBreaths) {
                setPhase('feedback');
                return 0;
              } else {
                setBreathPhase('inhale');
                return breathTiming.inhale;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [phase, breathPhase, breathCount]);

  const startBreathing = () => {
    setPhase('breathing');
    setBreathCount(0);
    setBreathPhase('inhale');
    setTimer(breathTiming.inhale);
  };

  const handleFeedbackSubmit = () => {
    onAnswer(selectedFeeling);
    onComplete();
  };

  const getBreathingInstructions = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe in slowly...';
      case 'hold':
        return 'Hold your breath...';
      case 'exhale':
        return 'Breathe out slowly...';
      default:
        return '';
    }
  };

  const getCircleSize = () => {
    switch (breathPhase) {
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

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 wellness-gradient">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            {character && (
              <CharacterAvatar 
                character={character} 
                size="lg" 
                className="mx-auto mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-4">Let's Breathe Together</h2>
            <p className="text-muted-foreground mb-6">
              I'll guide you through a simple breathing exercise. We'll take three slow, deep breaths together to help you relax.
            </p>
            <Button onClick={startBreathing} className="w-full">
              Start Breathing Exercise
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === 'breathing') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 wellness-gradient">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            {character && (
              <CharacterAvatar 
                character={character} 
                size="md" 
                className="mx-auto mb-6"
              />
            )}
            
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Breath {breathCount + 1} of {totalBreaths}
              </p>
              <h2 className="text-xl font-semibold mb-4">{getBreathingInstructions()}</h2>
            </div>

            {/* Breathing circle animation */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div 
                className={`absolute inset-0 bg-primary/20 rounded-full transition-transform duration-1000 ease-in-out ${getCircleSize()}`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{timer}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Follow the circle and breathe with me
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === 'feedback') {
    const feelingOptions = [
      'Much more relaxed',
      'A bit more relaxed', 
      'About the same',
      'More stressed'
    ];

    return (
      <div className="min-h-screen flex items-center justify-center p-4 wellness-gradient">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            {character && (
              <CharacterAvatar 
                character={character} 
                size="lg" 
                className="mx-auto mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-4">
              How do you feel now?
            </h2>
            <p className="text-muted-foreground mb-6">
              After our breathing exercise together, how are you feeling?
            </p>
            
            <div className="space-y-3 mb-6">
              {feelingOptions.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedFeeling === option ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setSelectedFeeling(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <Button 
              onClick={handleFeedbackSubmit}
              disabled={!selectedFeeling}
              className="w-full"
            >
              Continue Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
