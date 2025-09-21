-- Crisis Support System Database Schema

-- Crisis counselors table
CREATE TABLE public.crisis_counselors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  availability_status TEXT NOT NULL DEFAULT 'offline' CHECK (availability_status IN ('online', 'busy', 'offline')),
  current_sessions INTEGER NOT NULL DEFAULT 0,
  max_concurrent_sessions INTEGER NOT NULL DEFAULT 3,
  languages TEXT[] NOT NULL DEFAULT '{"en"}',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  certification_level TEXT NOT NULL DEFAULT 'certified' CHECK (certification_level IN ('trainee', 'certified', 'senior', 'supervisor')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crisis sessions table
CREATE TABLE public.crisis_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  counselor_id UUID REFERENCES public.crisis_counselors(id),
  session_type TEXT NOT NULL DEFAULT 'chat' CHECK (session_type IN ('chat', 'voice', 'video')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'escalated', 'transferred')),
  urgency_level INTEGER NOT NULL DEFAULT 3 CHECK (urgency_level BETWEEN 1 AND 5),
  location_data JSONB,
  initial_message TEXT,
  resolution_notes TEXT,
  escalation_reason TEXT,
  session_metadata JSONB DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crisis locations table for geographic resources
CREATE TABLE public.crisis_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code TEXT NOT NULL,
  state_province TEXT,
  city TEXT,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('emergency_services', 'hospital', 'crisis_center', 'hotline', 'support_group')),
  name TEXT NOT NULL,
  phone_number TEXT,
  address TEXT,
  website_url TEXT,
  hours_of_operation TEXT,
  languages_supported TEXT[] DEFAULT '{"en"}',
  special_services TEXT[],
  coordinates POINT,
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crisis escalations table
CREATE TABLE public.crisis_escalations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.crisis_sessions(id),
  escalation_type TEXT NOT NULL CHECK (escalation_type IN ('emergency_services', 'supervisor', 'transfer', 'followup')),
  escalated_by UUID NOT NULL,
  escalated_to UUID,
  reason TEXT NOT NULL,
  action_taken TEXT,
  outcome TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Counselor notes table
CREATE TABLE public.counselor_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.crisis_sessions(id),
  counselor_id UUID NOT NULL REFERENCES public.crisis_counselors(id),
  note_type TEXT NOT NULL DEFAULT 'session' CHECK (note_type IN ('session', 'risk_assessment', 'followup', 'transfer')),
  content TEXT NOT NULL,
  risk_level INTEGER CHECK (risk_level BETWEEN 1 AND 5),
  interventions_used TEXT[],
  metadata JSONB DEFAULT '{}',
  is_confidential BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crisis chat messages table
CREATE TABLE public.crisis_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.crisis_sessions(id),
  sender_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'counselor', 'system')),
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image', 'system_alert')),
  content TEXT NOT NULL,
  file_url TEXT,
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.crisis_counselors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselor_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for crisis_counselors
CREATE POLICY "Counselors can view their own profile" 
ON public.crisis_counselors 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Counselors can update their own profile" 
ON public.crisis_counselors 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for crisis_sessions
CREATE POLICY "Users can view their own crisis sessions" 
ON public.crisis_sessions 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = (SELECT user_id FROM public.crisis_counselors WHERE id = counselor_id));

CREATE POLICY "Users can create their own crisis sessions" 
ON public.crisis_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Counselors can update assigned sessions" 
ON public.crisis_sessions 
FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM public.crisis_counselors WHERE id = counselor_id));

-- RLS Policies for crisis_locations (public data)
CREATE POLICY "Crisis locations are viewable by authenticated users" 
ON public.crisis_locations 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- RLS Policies for crisis_escalations
CREATE POLICY "Users can view escalations for their sessions" 
ON public.crisis_escalations 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.crisis_sessions WHERE id = session_id) OR 
       auth.uid() = escalated_by OR 
       auth.uid() = escalated_to);

CREATE POLICY "Counselors can create escalations" 
ON public.crisis_escalations 
FOR INSERT 
WITH CHECK (auth.uid() = escalated_by);

-- RLS Policies for counselor_notes
CREATE POLICY "Counselors can view notes for their sessions" 
ON public.counselor_notes 
FOR SELECT 
USING (auth.uid() = counselor_id);

CREATE POLICY "Counselors can create notes for their sessions" 
ON public.counselor_notes 
FOR INSERT 
WITH CHECK (auth.uid() = counselor_id);

-- RLS Policies for crisis_messages
CREATE POLICY "Users can view messages from their crisis sessions" 
ON public.crisis_messages 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.crisis_sessions WHERE id = session_id) OR 
       auth.uid() = (SELECT user_id FROM public.crisis_counselors WHERE id = (SELECT counselor_id FROM public.crisis_sessions WHERE id = session_id)));

CREATE POLICY "Users can send messages in their crisis sessions" 
ON public.crisis_messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

-- Indexes for performance
CREATE INDEX idx_crisis_counselors_availability ON public.crisis_counselors(availability_status, current_sessions);
CREATE INDEX idx_crisis_sessions_status ON public.crisis_sessions(status, created_at);
CREATE INDEX idx_crisis_sessions_user ON public.crisis_sessions(user_id, created_at);
CREATE INDEX idx_crisis_locations_type ON public.crisis_locations(resource_type, country_code, state_province);
CREATE INDEX idx_crisis_messages_session ON public.crisis_messages(session_id, created_at);

-- Insert sample crisis locations data
INSERT INTO public.crisis_locations (country_code, state_province, city, resource_type, name, phone_number, address, hours_of_operation) VALUES
('US', 'CA', 'Los Angeles', 'emergency_services', '911 Emergency Services', '911', 'Emergency Services', '24/7'),
('US', 'CA', 'Los Angeles', 'crisis_center', 'LA Crisis Center', '(213) 381-5111', '123 Main St, Los Angeles, CA', '24/7'),
('US', 'NY', 'New York', 'emergency_services', '911 Emergency Services', '911', 'Emergency Services', '24/7'),
('US', 'NY', 'New York', 'hotline', 'NYC Well', '1-888-692-9355', 'NYC Crisis Hotline', '24/7'),
('US', NULL, NULL, 'hotline', 'National Suicide Prevention Lifeline', '988', 'National Crisis Hotline', '24/7'),
('US', NULL, NULL, 'hotline', 'Crisis Text Line', 'Text HOME to 741741', 'Text-based crisis support', '24/7');

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION public.update_crisis_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_crisis_counselors_updated_at
  BEFORE UPDATE ON public.crisis_counselors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_crisis_updated_at_column();

CREATE TRIGGER update_crisis_sessions_updated_at
  BEFORE UPDATE ON public.crisis_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_crisis_updated_at_column();

CREATE TRIGGER update_crisis_locations_updated_at
  BEFORE UPDATE ON public.crisis_locations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_crisis_updated_at_column();

CREATE TRIGGER update_counselor_notes_updated_at
  BEFORE UPDATE ON public.counselor_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_crisis_updated_at_column();