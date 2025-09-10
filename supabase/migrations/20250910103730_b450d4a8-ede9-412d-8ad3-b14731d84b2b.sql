-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  criteria_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_badges table  
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES public.badges(id),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create user_stats table
CREATE TABLE public.user_stats (
  user_id UUID NOT NULL PRIMARY KEY,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_checkin_date DATE,
  mood_entries_7d INTEGER NOT NULL DEFAULT 0,
  avg_stress_7d NUMERIC,
  avg_sleep_7d NUMERIC,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create progress_snapshots table
CREATE TABLE public.progress_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  avg_stress NUMERIC,
  avg_sleep NUMERIC,
  mood_distribution_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create nudges table
CREATE TABLE public.nudges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('micro_checkin', 'suggestion', 'celebration')),
  message TEXT NOT NULL,
  metadata_json JSONB,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'snoozed', 'dismissed')),
  severity TEXT DEFAULT 'normal' CHECK (severity IN ('low', 'normal', 'high')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('mindfulness', 'sleep', 'stress')),
  days INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT true,
  join_code TEXT NOT NULL UNIQUE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenge_participants table
CREATE TABLE public.challenge_participants (
  challenge_id UUID NOT NULL REFERENCES public.challenges(id),
  user_id UUID NOT NULL,
  alias TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (challenge_id, user_id)
);

-- Create challenge_checkins table
CREATE TABLE public.challenge_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id),
  user_id UUID NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  activity_type TEXT NOT NULL,
  duration_min INTEGER,
  FOREIGN KEY (challenge_id, user_id) REFERENCES public.challenge_participants(challenge_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nudges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_checkins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for badges (public read)
CREATE POLICY "Badges are viewable by everyone" ON public.badges FOR SELECT USING (true);

-- RLS Policies for user_badges
CREATE POLICY "Users can view their own badges" ON public.user_badges 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own badge records" ON public.user_badges 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_stats
CREATE POLICY "Users can view their own stats" ON public.user_stats 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stats" ON public.user_stats 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.user_stats 
FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for progress_snapshots
CREATE POLICY "Users can view their own progress snapshots" ON public.progress_snapshots 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress snapshots" ON public.progress_snapshots 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for nudges
CREATE POLICY "Users can view their own nudges" ON public.nudges 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own nudges" ON public.nudges 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nudges" ON public.nudges 
FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for challenges
CREATE POLICY "Challenges are viewable by everyone" ON public.challenges FOR SELECT USING (true);

CREATE POLICY "Users can create challenges" ON public.challenges 
FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS Policies for challenge_participants
CREATE POLICY "Users can view participants in their challenges" ON public.challenge_participants 
FOR SELECT USING (
  auth.uid() = user_id OR 
  auth.uid() IN (SELECT user_id FROM public.challenge_participants WHERE challenge_id = challenge_participants.challenge_id)
);

CREATE POLICY "Users can join challenges" ON public.challenge_participants 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for challenge_checkins  
CREATE POLICY "Users can view their own challenge checkins" ON public.challenge_checkins 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own challenge checkins" ON public.challenge_checkins 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert initial badges
INSERT INTO public.badges (key, name, description, icon, criteria_json) VALUES
('first_checkin', 'First Check-in', 'Welcome! You logged your first mood entry.', '🎯', '{"type": "first_entry"}'),
('streak_3', '3-Day Streak', 'Consistency builds habits! 3 days in a row.', '🔥', '{"type": "streak", "days": 3}'),
('streak_7', '7-Day Streak', 'Amazing dedication! One full week of check-ins.', '⭐', '{"type": "streak", "days": 7}'),
('streak_30', '30-Day Champion', 'Incredible commitment! 30 days of consistent tracking.', '👑', '{"type": "streak", "days": 30}'),
('sleep_guardian', 'Sleep Guardian', 'Great sleep habits! 7+ hours for 5 of last 7 days.', '😴', '{"type": "sleep_average", "hours": 7, "days": 5, "period": 7}'),
('stress_tamer', 'Stress Tamer', 'Staying calm! Low stress levels for 5 consecutive days.', '🧘', '{"type": "stress_average", "max_level": 2, "days": 5}'),
('mood_stable', 'Mood Stabilizer', 'Emotional balance! Consistent mood for 7 days.', '⚖️', '{"type": "mood_stability", "days": 7}'),
('voice_active', 'Voice Streak', 'Voice-first approach! Using voice check-ins regularly.', '🎤', '{"type": "voice_usage", "sessions": 5, "period": 7}');

-- Create function to update user stats
CREATE OR REPLACE FUNCTION public.update_user_stats(target_user_id UUID)
RETURNS VOID AS $$
DECLARE
  latest_entry_date DATE;
  streak_count INTEGER := 0;
  check_date DATE;
  entries_7d INTEGER;
  avg_stress_val NUMERIC;
  avg_sleep_val NUMERIC;
BEGIN
  -- Get latest entry date
  SELECT date INTO latest_entry_date 
  FROM public.mood_entries 
  WHERE user_id = target_user_id 
  ORDER BY date DESC 
  LIMIT 1;
  
  -- Calculate current streak
  IF latest_entry_date IS NOT NULL THEN
    check_date := latest_entry_date;
    WHILE EXISTS (
      SELECT 1 FROM public.mood_entries 
      WHERE user_id = target_user_id AND date = check_date
    ) LOOP
      streak_count := streak_count + 1;
      check_date := check_date - INTERVAL '1 day';
    END LOOP;
  END IF;
  
  -- Count entries in last 7 days
  SELECT COUNT(*) INTO entries_7d
  FROM public.mood_entries 
  WHERE user_id = target_user_id 
    AND date >= CURRENT_DATE - INTERVAL '6 days';
    
  -- Calculate averages for last 7 days
  SELECT AVG(stress_level), AVG(hours_slept) 
  INTO avg_stress_val, avg_sleep_val
  FROM public.mood_entries 
  WHERE user_id = target_user_id 
    AND date >= CURRENT_DATE - INTERVAL '6 days'
    AND stress_level IS NOT NULL;
  
  -- Insert or update user stats
  INSERT INTO public.user_stats (
    user_id, current_streak, longest_streak, last_checkin_date, 
    mood_entries_7d, avg_stress_7d, avg_sleep_7d, updated_at
  ) VALUES (
    target_user_id, streak_count, GREATEST(streak_count, 0), 
    latest_entry_date, entries_7d, avg_stress_val, avg_sleep_val, now()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    current_streak = EXCLUDED.current_streak,
    longest_streak = GREATEST(user_stats.longest_streak, EXCLUDED.current_streak),
    last_checkin_date = EXCLUDED.last_checkin_date,
    mood_entries_7d = EXCLUDED.mood_entries_7d,
    avg_stress_7d = EXCLUDED.avg_stress_7d,
    avg_sleep_7d = EXCLUDED.avg_sleep_7d,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update stats when mood entries change
CREATE OR REPLACE FUNCTION public.trigger_update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.update_user_stats(COALESCE(NEW.user_id, OLD.user_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_stats_on_mood_entry
  AFTER INSERT OR UPDATE OR DELETE ON public.mood_entries
  FOR EACH ROW EXECUTE FUNCTION public.trigger_update_user_stats();