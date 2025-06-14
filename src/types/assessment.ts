
export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'scale' | 'open_ended' | 'yes_no';
  question: string;
  description?: string;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  conditionalLogic?: {
    showIf: {
      questionId: string;
      answerValue: string | string[];
    };
  };
  scoring: {
    emotional: Record<string, number>;
    physical: Record<string, number>;
    work: Record<string, number>;
    lifestyle: Record<string, number>;
  };
  characterResponse?: {
    positive: string;
    neutral: string;
    concerned: string;
  };
}

export interface AssessmentResponse {
  questionId: string;
  answerValue: string;
  answerData?: any;
  emotionalScore: number;
  physicalScore: number;
  workScore: number;
  lifestyleScore: number;
}

export interface AssessmentSession {
  id: string;
  userId: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  currentQuestionId?: string;
  emotionalScore: number;
  physicalScore: number;
  workScore: number;
  lifestyleScore: number;
  startedAt: string;
  completedAt?: string;
  responses: AssessmentResponse[];
}

export interface TherapyRecommendation {
  type: 'CBT' | 'DBT' | 'ACT' | 'Mindfulness' | 'Yoga' | 'Mandala Art' | 'Humanistic';
  confidenceScore: number;
  reasoning: string;
  priority: number;
}

export interface AssessmentScores {
  emotional: number;
  physical: number;
  work: number;
  lifestyle: number;
}
