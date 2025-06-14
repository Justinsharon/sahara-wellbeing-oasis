
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useCharacter } from '@/hooks/useCharacter';
import { useAssessment } from '@/hooks/useAssessment';
import { AssessmentQuestion } from './AssessmentQuestion';
import { CharacterGuide } from './CharacterGuide';
import { BreathingExercise } from './BreathingExercise';
import { TherapyRecommendations } from './TherapyRecommendations';
import { TherapyRecommendation } from '@/types/assessment';

export default function OnboardingAssessment() {
  const { user } = useAuth();
  const { character } = useCharacter();
  const navigate = useNavigate();
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [recommendations, setRecommendations] = useState<TherapyRecommendation[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    currentSession,
    currentQuestionIndex,
    responses,
    loading,
    createSession,
    saveResponse,
    moveToNextQuestion,
    completeAssessment,
    getCurrentQuestion,
    getTotalQuestions,
    getProgress,
  } = useAssessment();

  useEffect(() => {
    if (user && !currentSession) {
      createSession(user.id);
    }
  }, [user, currentSession, createSession]);

  const handleAnswer = async (questionId: string, answerValue: string, answerData?: any) => {
    await saveResponse(questionId, answerValue, answerData);

    // Handle breathing exercise logic
    if (questionId === 'q2_breathing' && answerValue === 'Yes') {
      setShowBreathingExercise(true);
      return;
    }

    // Check if this is the last question
    if (currentQuestionIndex >= getTotalQuestions() - 1) {
      const recs = await completeAssessment();
      setRecommendations(recs);
      setIsCompleted(true);
    } else {
      moveToNextQuestion();
    }
  };

  const handleBreathingComplete = () => {
    setShowBreathingExercise(false);
    moveToNextQuestion();
  };

  const handleFinish = () => {
    navigate('/');
  };

  if (!user || !character) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">Loading...</h2>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <TherapyRecommendations 
        recommendations={recommendations}
        character={character}
        onFinish={handleFinish}
      />
    );
  }

  if (showBreathingExercise) {
    return (
      <BreathingExercise 
        character={character}
        onComplete={handleBreathingComplete}
      />
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">Assessment Complete</h2>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen sahara-gradient p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {getTotalQuestions()}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(getProgress())}% Complete
            </span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Character Guide */}
          <div className="order-2 lg:order-1">
            <CharacterGuide 
              character={character}
              currentQuestion={currentQuestion}
              responses={responses}
            />
          </div>

          {/* Assessment Question */}
          <div className="order-1 lg:order-2">
            <Card className="soft-shadow border-0">
              <CardContent className="p-6">
                <AssessmentQuestion
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
