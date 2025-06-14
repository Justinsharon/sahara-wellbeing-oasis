
import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { CharacterCompanion } from '@/types/character';
import { AssessmentQuestion, AssessmentResponse } from '@/types/assessment';

interface CharacterGuideProps {
  character: CharacterCompanion;
  currentQuestion: AssessmentQuestion;
  responses: AssessmentResponse[];
}

export function CharacterGuide({ character, currentQuestion, responses }: CharacterGuideProps) {
  const characterMessage = useMemo(() => {
    // Get the most recent response to determine character's reaction
    const lastResponse = responses[responses.length - 1];
    
    if (!lastResponse || !currentQuestion.characterResponse) {
      return `Hi! I'm ${character.name}, and I'm here to guide you through this wellness assessment. Take your time with each question - there are no right or wrong answers. I'm here to support you every step of the way.`;
    }

    // Determine response type based on the answer
    const question = currentQuestion;
    let responseType: 'positive' | 'neutral' | 'concerned' = 'neutral';

    // Simple logic to determine response type based on common patterns
    if (lastResponse.answerValue.toLowerCase().includes('good') || 
        lastResponse.answerValue.toLowerCase().includes('yes') ||
        lastResponse.answerValue === 'Energized' ||
        lastResponse.answerValue === 'Very calm/positive') {
      responseType = 'positive';
    } else if (lastResponse.answerValue.toLowerCase().includes('stressed') ||
               lastResponse.answerValue.toLowerCase().includes('exhausted') ||
               lastResponse.answerValue.toLowerCase().includes('anxious') ||
               lastResponse.answerValue === 'No one' ||
               parseInt(lastResponse.answerValue) >= 7) {
      responseType = 'concerned';
    }

    return question.characterResponse[responseType] || question.characterResponse.neutral;
  }, [character.name, currentQuestion, responses]);

  const getCharacterExpression = () => {
    const lastResponse = responses[responses.length - 1];
    
    if (!lastResponse) return { type: 'neutral' as const, intensity: 'medium' as const };
    
    // Determine expression based on recent responses
    if (lastResponse.emotionalScore >= 3 || lastResponse.physicalScore >= 3) {
      return { type: 'concerned' as const, intensity: 'medium' as const };
    } else if (lastResponse.emotionalScore <= 0 && lastResponse.physicalScore <= 0) {
      return { type: 'happy' as const, intensity: 'medium' as const };
    }
    
    return { type: 'neutral' as const, intensity: 'medium' as const };
  };

  return (
    <Card className="soft-shadow border-0 h-fit">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <CharacterAvatar 
            character={character} 
            size="lg"
            expression={getCharacterExpression()}
          />
          
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{character.name}</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm leading-relaxed">{characterMessage}</p>
            </div>
          </div>
          
          {responses.length > 0 && (
            <div className="w-full pt-4 border-t">
              <div className="text-xs text-muted-foreground text-center">
                Progress: {responses.length} questions answered
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
