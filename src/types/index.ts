export interface User {
  id: string;
  email: string;
  full_name: string;
  mobile_number?: string;
  country_code?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
  email_verified?: boolean;
  otp_verified?: boolean;
}

export interface Therapist {
  id: string;
  name: string;
  image?: string;
  specializations: string[];
  languages: string[];
  session_types: string[];
  description: string;
  rating: number;
  experience_years: number;
  fee_per_session: number;
  availability: string[];
  contact_info: {
    email?: string;
    phone?: string;
  };
}

export interface Session {
  id: string;
  user_id: string;
  therapist_id: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'audio' | 'chat';
  status: 'scheduled' | 'completed' | 'cancelled';
  fee: number;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';
  notes?: string;
  date: string;
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_date?: string;
  completed: boolean;
  created_at: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  type: 'anxiety' | 'depression' | 'sleep' | 'stress';
  questions: AssessmentQuestion[];
  responses: Record<string, string | number>;
  score: number;
  completed_at: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'scale' | 'text';
  options?: string[];
  scale_min?: number;
  scale_max?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'nia' | 'therapist';
  timestamp: string;
  type: 'text' | 'audio' | 'crisis_response';
}
