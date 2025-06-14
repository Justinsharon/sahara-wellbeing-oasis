
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useCharacter } from '@/hooks/useCharacter';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { assessmentQuestions, AssessmentQuestion } from '@/data/assessmentQuestions';
import { generateTherapyRecommendations, AssessmentScores, UserResponses } from '@/utils/therapyRecommendations';
import { AssessmentQuestionComponent } from '@/components/assessment/AssessmentQuestionComponent';
import { BreathingExercise } from '@/components/assessment/BreathingExercise';

export default function OnboardingAssessment() {
  const { user, updateProfile } = useAuth();
  const { character } = useCharacter();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponses>({});
  const [scores, setScores] = useState<AssessmentScores>({
    emotional: 0,
    physical: 0,
    work: 0,
    lifestyle: 0
  });
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShowingBreathing, setIsShowingBreathing] = useState(false);

  // Filter questions based on conditional logic
  const getAvailableQuestions = (): AssessmentQuestion[] => {
    return assessmentQuestions.filter(question => {
      if (!question.conditional) return true;
      
      const dependentResponse = responses[question.conditional.dependsOn];
      if (Array.isArray(question.conditional.condition)) {
        return question.conditional.condition.includes(dependentResponse);
      }
      return dependentResponse === question.conditional.condition;
    });
  };

  const availableQuestions = getAvailableQuestions();
  const currentQuestion = availableQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / availableQuestions.length) * 100;

  useEffect(() => {
    if (user && !sessionId) {
      createAssessmentSession();
    }
  }, [user]);

  const createAssessmentSession = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('assessment_sessions')
        .insert({
          user_id: user.id,
          status: 'in_progress'
        })
        .select()
        .single();

      if (error) throw error;
      setSessionId(data.id);
    } catch (error) {
      console.error('Error creating assessment session:', error);
      toast.error('Failed to start assessment');
    }
  };

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion || !sessionId) return;

    const newResponses = { ...responses, [currentQuestion.id]: answer };
    setResponses(newResponses);

    // Calculate scores for this answer
    const newScores = { ...scores };
    const questionScoring = currentQuestion.scoring;
    
    Object.keys(questionScoring).forEach(domain => {
      const domainScoring = questionScoring[domain as keyof typeof questionScoring];
      if (domainScoring[answer] !== undefined) {
        newScores[domain as keyof AssessmentScores] += domainScoring[answer];
      }
    });
    setScores(newScores);

    // Save response to database
    try {
      await supabase
        .from('assessment_responses')
        .insert({
          session_id: sessionId,
          question_id: currentQuestion.id,
          answer_value: answer,
          emotional_score: questionScoring.emotional[answer] || 0,
          physical_score: questionScoring.physical[answer] || 0,
          work_score: questionScoring.work[answer] || 0,
          lifestyle_score: questionScoring.lifestyle[answer] || 0
        });
    } catch (error) {
      console.error('Error saving response:', error);
    }

    // Handle special breathing exercise case
    if (currentQuestion.id === 'q2' && answer === 'Yes') {
      setIsShowingBreathing(true);
      return;
    }

    // Move to next question or complete assessment
    if (currentQuestionIndex < availableQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await completeAssessment(newScores, newResponses);
    }
  };

  const handleBreathingComplete = () => {
    setIsShowingBreathing(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const completeAssessment = async (finalScores: AssessmentScores, finalResponses: UserResponses) => {
    if (!sessionId || !user) return;

    try {
      // Update assessment session as completed
      await supabase
        .from('assessment_sessions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          emotional_score: finalScores.emotional,
          physical_score: finalScores.physical,
          work_score: finalScores.work,
          lifestyle_score: finalScores.lifestyle
        })
        .eq('id', sessionId);

      // Generate therapy recommendations
      const recommendations = generateTherapyRecommendations(finalScores, finalResponses);

      // Save therapy recommendations
      for (const rec of recommendations) {
        await supabase
          .from('therapy_recommendations')
          .insert({
            user_id: user.id,
            session_id: sessionId,
            recommendation_type: rec.type,
            confidence_score: rec.confidence,
            reasoning: rec.reasoning
          });
      }

      // Update user profile - now with correct typing
      await updateProfile({
        onboarding_completed: true,
        assessment_session_id: sessionId
      });

      setIsCompleted(true);
      toast.success('Assessment completed! Your personalized recommendations are ready.');
      
      // Navigate to main app after a delay
      setTimeout(() => {
        navigate('/personal-growth');
      }, 3000);

    } catch (error) {
      console.error('Error completing assessment:', error);
      toast.error('Failed to complete assessment');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p>Please sign in to take the assessment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleted) {
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
            <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for completing your wellness assessment. Your personalized recommendations are being prepared.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isShowingBreathing) {
    return (
      <BreathingExercise 
        character={character}
        onComplete={handleBreathingComplete}
        onAnswer={handleAnswer}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 wellness-gradient">
      <div className="max-w-2xl mx-auto">
        {/* Header with character and progress */}
        <div className="mb-8 text-center">
          {character && (
            <CharacterAvatar 
              character={character} 
              size="lg" 
              className="mx-auto mb-4"
            />
          )}
          <h1 className="text-2xl font-bold mb-2">Wellness Assessment</h1>
          <p className="text-muted-foreground mb-4">
            Let's understand your current well-being together
          </p>
          <div className="w-full max-w-md mx-auto">
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {availableQuestions.length}
            </p>
          </div>
        </div>

        {/* Current Question */}
        {currentQuestion && (
          <AssessmentQuestionComponent
            question={currentQuestion}
            character={character}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}
