
-- Create mood_entries table
CREATE TABLE public.mood_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('very_happy', 'happy', 'neutral', 'sad', 'very_sad')),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 5),
  sleep_quality TEXT CHECK (sleep_quality IN ('excellent', 'good', 'fair', 'poor')),
  hours_slept DECIMAL(3,1) CHECK (hours_slept >= 0 AND hours_slept <= 24),
  notes TEXT,
  date DATE NOT NULL,
  entry_type TEXT DEFAULT 'enhanced' CHECK (entry_type IN ('simple', 'enhanced')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  character_companion TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for mood_entries
CREATE POLICY "Users can view their own mood entries" 
  ON public.mood_entries 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mood entries" 
  ON public.mood_entries 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood entries" 
  ON public.mood_entries 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mood entries" 
  ON public.mood_entries 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_mood_entries_user_date ON public.mood_entries(user_id, date DESC);
CREATE INDEX idx_mood_entries_created_at ON public.mood_entries(created_at DESC);
