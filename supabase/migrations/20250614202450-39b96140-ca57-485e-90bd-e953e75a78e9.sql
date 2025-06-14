
-- Create assessment sessions table
CREATE TABLE public.assessment_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  current_question_id TEXT,
  emotional_score INTEGER DEFAULT 0,
  physical_score INTEGER DEFAULT 0,
  work_score INTEGER DEFAULT 0,
  lifestyle_score INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assessment responses table
CREATE TABLE public.assessment_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.assessment_sessions(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  answer_value TEXT NOT NULL,
  answer_data JSONB,
  emotional_score INTEGER DEFAULT 0,
  physical_score INTEGER DEFAULT 0,
  work_score INTEGER DEFAULT 0,
  lifestyle_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create therapy recommendations table
CREATE TABLE public.therapy_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.assessment_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('CBT', 'DBT', 'ACT', 'Mindfulness', 'Yoga', 'Mandala Art', 'Humanistic')),
  confidence_score INTEGER NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
  reasoning TEXT,
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for assessment_sessions
CREATE POLICY "Users can view their own assessment sessions" 
  ON public.assessment_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessment sessions" 
  ON public.assessment_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessment sessions" 
  ON public.assessment_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for assessment_responses
CREATE POLICY "Users can view their own assessment responses" 
  ON public.assessment_responses 
  FOR SELECT 
  USING (auth.uid() = (SELECT user_id FROM public.assessment_sessions WHERE id = session_id));

CREATE POLICY "Users can create their own assessment responses" 
  ON public.assessment_responses 
  FOR INSERT 
  WITH CHECK (auth.uid() = (SELECT user_id FROM public.assessment_sessions WHERE id = session_id));

-- Create RLS policies for therapy_recommendations
CREATE POLICY "Users can view their own therapy recommendations" 
  ON public.therapy_recommendations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own therapy recommendations" 
  ON public.therapy_recommendations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_assessment_sessions_user_id ON public.assessment_sessions(user_id);
CREATE INDEX idx_assessment_responses_session_id ON public.assessment_responses(session_id);
CREATE INDEX idx_therapy_recommendations_user_id ON public.therapy_recommendations(user_id);
CREATE INDEX idx_therapy_recommendations_session_id ON public.therapy_recommendations(session_id);

-- Update profiles table to track onboarding status
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS assessment_session_id UUID REFERENCES public.assessment_sessions(id);
