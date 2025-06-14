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
  character_companion?: string; // Character ID reference
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

export interface SupportGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  isJoined: boolean;
  lastActivity: string;
  image?: string;
  created_at: string;
}

export interface DiscussionTopic {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  timeAgo: string;
  isHot: boolean;
  content?: string;
  created_at: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  badge: string;
  created_at: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  attendees: number;
  type: string;
  description?: string;
  created_at: string;
}

export interface MeditationSession {
  id: string;
  title: string;
  duration: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  plays: number;
  description: string;
  instructor: string;
  image?: string;
  audio_url?: string;
}

export interface HealingActivity {
  id: string;
  title: string;
  type: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  benefits: string[];
  completions: number;
  instructions?: string[];
}

export interface WellnessArticle {
  id: string;
  title: string;
  author: string;
  readTime: string;
  category: string;
  publishedDate: string;
  excerpt: string;
  views: number;
  rating: number;
  content?: string;
  image?: string;
}

export interface WellnessChallenge {
  id: string;
  title: string;
  duration: string;
  participants: number;
  description: string;
  progress: number;
  status: 'Available' | 'In Progress' | 'Completed';
  dailyTime: string;
  activities: string[];
  created_at: string;
}
