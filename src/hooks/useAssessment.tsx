import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AssessmentSession, AssessmentResponse, AssessmentScores, TherapyRecommendation } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';

export const useAssessment = () => {
  const [currentSession, setCurrentSession] = useState<AssessmentSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const createSession = useCallback(async (userId: string): Promise<string | null> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assessment_sessions')
        .insert({
          user_id: userId,
          status: 'in_progress' as const,
          current_question_id: assessmentQuestions[0].id,
        })
        .select()
        .single();

      if (error) throw error;

      const newSession: AssessmentSession = {
        id: data.id,
        userId: data.user_id,
        status: data.status as 'in_progress' | 'completed' | 'abandoned',
        currentQuestionId: data.current_question_id,
        emotionalScore: data.emotional_score,
        physicalScore: data.physical_score,
        workScore: data.work_score,
        lifestyleScore: data.lifestyle_score,
        startedAt: data.started_at,
        responses: []
      };

      setCurrentSession(newSession);
      return data.id;
    } catch (error) {
      console.error('Error creating assessment session:', error);
      toast.error('Failed to start assessment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveResponse = useCallback(async (questionId: string, answerValue: string, answerData?: any) => {
    if (!currentSession) return;

    try {
      const question = assessmentQuestions.find(q => q.id === questionId);
      if (!question) return;

      // Calculate scores for this response
      const emotionalScore = question.scoring.emotional[answerValue] || 0;
      const physicalScore = question.scoring.physical[answerValue] || 0;
      const workScore = question.scoring.work[answerValue] || 0;
      const lifestyleScore = question.scoring.lifestyle[answerValue] || 0;

      // Save response to database
      const { error } = await supabase
        .from('assessment_responses')
        .insert({
          session_id: currentSession.id,
          question_id: questionId,
          answer_value: answerValue,
          answer_data: answerData,
          emotional_score: emotionalScore,
          physical_score: physicalScore,
          work_score: workScore,
          lifestyle_score: lifestyleScore,
        });

      if (error) throw error;

      // Update local state
      const newResponse: AssessmentResponse = {
        questionId,
        answerValue,
        answerData,
        emotionalScore,
        physicalScore,
        workScore,
        lifestyleScore,
      };

      setResponses(prev => [...prev, newResponse]);

      // Update session scores
      const updatedScores = responses.reduce(
        (acc, response) => ({
          emotional: acc.emotional + response.emotionalScore,
          physical: acc.physical + response.physicalScore,
          work: acc.work + response.workScore,
          lifestyle: acc.lifestyle + response.lifestyleScore,
        }),
        {
          emotional: emotionalScore,
          physical: physicalScore,
          work: workScore,
          lifestyle: lifestyleScore,
        }
      );

      // Update session in database
      await supabase
        .from('assessment_sessions')
        .update({
          emotional_score: updatedScores.emotional,
          physical_score: updatedScores.physical,
          work_score: updatedScores.work,
          lifestyle_score: updatedScores.lifestyle,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentSession.id);

      setCurrentSession(prev => prev ? {
        ...prev,
        emotionalScore: updatedScores.emotional,
        physicalScore: updatedScores.physical,
        workScore: updatedScores.work,
        lifestyleScore: updatedScores.lifestyle,
      } : null);

    } catch (error) {
      console.error('Error saving response:', error);
      toast.error('Failed to save response');
    }
  }, [currentSession, responses]);

  const getNextQuestion = useCallback(() => {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    if (!currentQuestion) return null;

    // Check if next question should be shown based on conditional logic
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= assessmentQuestions.length) return null;

    const nextQuestion = assessmentQuestions[nextIndex];
    
    // Check conditional logic
    if (nextQuestion.conditionalLogic) {
      const { questionId, answerValue } = nextQuestion.conditionalLogic.showIf;
      const previousResponse = responses.find(r => r.questionId === questionId);
      
      if (!previousResponse) return null;
      
      const shouldShow = Array.isArray(answerValue) 
        ? answerValue.includes(previousResponse.answerValue)
        : previousResponse.answerValue === answerValue;
        
      if (!shouldShow) {
        // Skip this question and check the next one
        setCurrentQuestionIndex(nextIndex + 1);
        return null;
      }
    }

    return nextQuestion;
  }, [currentQuestionIndex, responses]);

  const moveToNextQuestion = useCallback(() => {
    const nextQuestion = getNextQuestion();
    if (nextQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [getNextQuestion]);

  const completeAssessment = useCallback(async (): Promise<TherapyRecommendation[]> => {
    if (!currentSession) return [];

    try {
      setLoading(true);

      // Calculate final scores
      const finalScores = responses.reduce(
        (acc, response) => ({
          emotional: acc.emotional + response.emotionalScore,
          physical: acc.physical + response.physicalScore,
          work: acc.work + response.workScore,
          lifestyle: acc.lifestyle + response.lifestyleScore,
        }),
        { emotional: 0, physical: 0, work: 0, lifestyle: 0 }
      );

      // Generate therapy recommendations
      const recommendations = generateTherapyRecommendations(finalScores, responses);

      // Save recommendations to database
      for (const rec of recommendations) {
        await supabase
          .from('therapy_recommendations')
          .insert({
            session_id: currentSession.id,
            user_id: currentSession.userId,
            recommendation_type: rec.type,
            confidence_score: rec.confidenceScore,
            reasoning: rec.reasoning,
            priority: rec.priority,
          });
      }

      // Mark session as completed
      await supabase
        .from('assessment_sessions')
        .update({
          status: 'completed' as const,
          completed_at: new Date().toISOString(),
        })
        .eq('id', currentSession.id);

      // Update user profile
      await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          assessment_session_id: currentSession.id,
        })
        .eq('id', currentSession.userId);

      toast.success('Assessment completed successfully!');
      return recommendations;

    } catch (error) {
      console.error('Error completing assessment:', error);
      toast.error('Failed to complete assessment');
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentSession, responses]);

  const generateTherapyRecommendations = (scores: AssessmentScores, responses: AssessmentResponse[]): TherapyRecommendation[] => {
    const recommendations: TherapyRecommendation[] = [];

    // CBT - High emotional scores or anxiety indicators
    if (scores.emotional >= 8 || responses.some(r => r.questionId === 'q11_anxiety' && r.answerValue === 'Yes')) {
      recommendations.push({
        type: 'CBT',
        confidenceScore: 90,
        reasoning: 'High emotional distress and anxiety symptoms indicate CBT would be highly beneficial for developing coping strategies and addressing negative thought patterns.',
        priority: 1
      });
    }

    // Mindfulness - High stress/anxiety
    if (scores.emotional >= 7 || responses.some(r => r.questionId === 'q6_stress_scale' && parseInt(r.answerValue) >= 7)) {
      recommendations.push({
        type: 'Mindfulness',
        confidenceScore: 85,
        reasoning: 'High stress levels suggest mindfulness practices could help with stress reduction and emotional regulation.',
        priority: 2
      });
    }

    // Yoga - High physical scores and stress
    if (scores.physical >= 8 && scores.emotional >= 6) {
      recommendations.push({
        type: 'Yoga',
        confidenceScore: 80,
        reasoning: 'Physical symptoms combined with emotional stress indicate yoga could provide both physical relief and stress management.',
        priority: 3
      });
    }

    // DBT - Very high emotional scores with regulation issues
    if (scores.emotional >= 10) {
      recommendations.push({
        type: 'DBT',
        confidenceScore: 75,
        reasoning: 'Very high emotional distress suggests DBT skills for emotion regulation could be beneficial.',
        priority: 2
      });
    }

    // ACT - Moderate scores with work-life balance goals
    if (scores.emotional >= 5 && responses.some(r => r.questionId === 'q26_goals' && r.answerValue.includes('balance'))) {
      recommendations.push({
        type: 'ACT',
        confidenceScore: 70,
        reasoning: 'Stress combined with work-life balance goals suggests ACT could help with acceptance and value-based living.',
        priority: 3
      });
    }

    // Mandala Art - Creative preference and emotional stress
    if (responses.some(r => r.questionId === 'q22_coping_preference' && r.answerValue.includes('Write')) && scores.emotional >= 6) {
      recommendations.push({
        type: 'Mandala Art',
        confidenceScore: 65,
        reasoning: 'Preference for creative expression combined with emotional stress suggests art therapy could be beneficial.',
        priority: 4
      });
    }

    // Humanistic - High emotional distress with low support
    if (scores.emotional >= 7 && responses.some(r => r.questionId === 'q21_social_support' && r.answerValue === 'No one')) {
      recommendations.push({
        type: 'Humanistic',
        confidenceScore: 80,
        reasoning: 'High emotional distress with limited social support indicates humanistic therapy could provide needed emotional validation and support.',
        priority: 2
      });
    }

    // Sort by priority and confidence
    return recommendations.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.confidenceScore - a.confidenceScore;
    });
  };

  return {
    currentSession,
    currentQuestionIndex,
    responses,
    loading,
    createSession,
    saveResponse,
    moveToNextQuestion,
    getNextQuestion,
    completeAssessment,
    getCurrentQuestion: () => assessmentQuestions[currentQuestionIndex],
    getTotalQuestions: () => assessmentQuestions.length,
    getProgress: () => (currentQuestionIndex / assessmentQuestions.length) * 100,
  };
};
