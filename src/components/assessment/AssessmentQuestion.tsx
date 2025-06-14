
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AssessmentQuestion as IAssessmentQuestion } from '@/types/assessment';

interface AssessmentQuestionProps {
  question: IAssessmentQuestion;
  onAnswer: (questionId: string, answerValue: string, answerData?: any) => void;
  loading?: boolean;
}

export function AssessmentQuestion({ question, onAnswer, loading }: AssessmentQuestionProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [openEndedValue, setOpenEndedValue] = useState('');
  const [scaleValue, setScaleValue] = useState<number[]>([5]);

  const handleSubmit = () => {
    let answerValue = '';
    let answerData = {};

    switch (question.type) {
      case 'multiple_choice':
      case 'yes_no':
        answerValue = selectedValue;
        break;
      case 'open_ended':
        answerValue = openEndedValue;
        break;
      case 'scale':
        answerValue = scaleValue[0].toString();
        answerData = { numericValue: scaleValue[0] };
        break;
    }

    if (answerValue || question.type === 'scale') {
      onAnswer(question.id, answerValue, answerData);
    }
  };

  const canSubmit = () => {
    switch (question.type) {
      case 'multiple_choice':
      case 'yes_no':
        return selectedValue !== '';
      case 'open_ended':
        return openEndedValue.trim() !== '';
      case 'scale':
        return true; // Scale always has a value
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
        {question.description && (
          <p className="text-muted-foreground mb-4">{question.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {question.type === 'multiple_choice' && question.options && (
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'yes_no' && question.options && (
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'open_ended' && (
          <Textarea
            value={openEndedValue}
            onChange={(e) => setOpenEndedValue(e.target.value)}
            placeholder="Share your thoughts here..."
            className="min-h-[100px]"
          />
        )}

        {question.type === 'scale' && (
          <div className="space-y-4">
            <div className="px-3">
              <Slider
                value={scaleValue}
                onValueChange={setScaleValue}
                max={question.scaleMax || 10}
                min={question.scaleMin || 1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.scaleMin || 1}</span>
              <span className="font-medium text-primary text-lg">
                {scaleValue[0]}
              </span>
              <span>{question.scaleMax || 10}</span>
            </div>
          </div>
        )}
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={!canSubmit() || loading}
        className="w-full"
      >
        {loading ? 'Saving...' : 'Continue'}
      </Button>
    </div>
  );
}
