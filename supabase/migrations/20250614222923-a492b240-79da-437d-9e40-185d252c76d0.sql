
-- First, let's ensure the profiles table has all necessary columns for the onboarding flow
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS country_code TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS otp_verified BOOLEAN DEFAULT FALSE;

-- Enable Row Level Security on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create comprehensive RLS policies for profiles
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

-- Recreate the trigger function to handle all user metadata properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name,
    mobile_number,
    country_code,
    date_of_birth,
    gender,
    email_verified,
    otp_verified,
    character_companion,
    onboarding_completed
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'mobile_number',
    new.raw_user_meta_data->>'country_code',
    CASE 
      WHEN new.raw_user_meta_data->>'date_of_birth' IS NOT NULL 
      THEN (new.raw_user_meta_data->>'date_of_birth')::DATE 
      ELSE NULL 
    END,
    new.raw_user_meta_data->>'gender',
    COALESCE((new.raw_user_meta_data->>'email_verified')::BOOLEAN, FALSE),
    COALESCE((new.raw_user_meta_data->>'otp_verified')::BOOLEAN, FALSE),
    new.raw_user_meta_data->>'character_companion',
    COALESCE((new.raw_user_meta_data->>'onboarding_completed')::BOOLEAN, FALSE)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
