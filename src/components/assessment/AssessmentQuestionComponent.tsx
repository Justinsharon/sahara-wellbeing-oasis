
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { AssessmentQuestion } from '@/data/assessmentQuestions';
import { CharacterCompanion } from '@/types/character';

interface AssessmentQuestionComponentProps {
  question: AssessmentQuestion;
  character: CharacterCompanion | null;
  onAnswer: (answer: string) => void;
}

export function AssessmentQuestionComponent({ 
  question, 
  character, 
  onAnswer 
}: AssessmentQuestionComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [openEndedAnswer, setOpenEndedAnswer] = useState<string>('');
  const [scaleValue, setScaleValue] = useState<number[]>([5]);

  const handleSubmit = () => {
    let answer = '';
    
    if (question.type === 'open_ended') {
      answer = openEndedAnswer.trim();
    } else if (question.type === 'scale') {
      answer = scaleValue[0].toString();
    } else {
      answer = selectedAnswer;
    }

    if (answer) {
      onAnswer(answer);
      setSelectedAnswer('');
      setOpenEndedAnswer('');
      setScaleValue([5]);
    }
  };

  const getCharacterMessage = () => {
    const messages = [
      "I'm here to listen and understand how you're feeling.",
      "Take your time with this question - there's no rush.",
      "Your honesty helps me support you better.",
      "Thank you for sharing with me.",
      "Let's explore this together."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <Card className="soft-shadow border-0">
      <CardContent className="p-8">
        {/* Character speaking bubble */}
        {character && (
          <div className="flex items-start gap-4 mb-6">
            <CharacterAvatar character={character} size="md" />
            <div className="flex-1">
              <div className="bg-primary/10 rounded-lg p-4 relative">
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-primary/10"></div>
                <p className="text-sm text-muted-foreground mb-2">{getCharacterMessage()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
          
          {/* Answer options based on question type */}
          {question.type === 'multiple_choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? 'default' : 'outline'}
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {question.type === 'yes_no' && question.options && (
            <div className="flex gap-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {question.type === 'scale' && question.scaleRange && (
            <div className="space-y-4">
              <div className="px-4">
                <Slider
                  value={scaleValue}
                  onValueChange={setScaleValue}
                  min={question.scaleRange.min}
                  max={question.scaleRange.max}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-4">
                <span>{question.scaleRange.min} (Not at all)</span>
                <span className="font-semibold">Current: {scaleValue[0]}</span>
                <span>{question.scaleRange.max} (Extremely)</span>
              </div>
            </div>
          )}

          {question.type === 'open_ended' && (
            <Textarea
              placeholder="Share your thoughts here..."
              value={openEndedAnswer}
              onChange={(e) => setOpenEndedAnswer(e.target.value)}
              className="min-h-[100px]"
            />
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={
              (question.type === 'multiple_choice' || question.type === 'yes_no') && !selectedAnswer ||
              question.type === 'open_ended' && !openEndedAnswer.trim()
            }
            className="px-8"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
