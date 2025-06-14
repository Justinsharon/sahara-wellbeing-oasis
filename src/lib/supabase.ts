
import { createClient } from '@supabase/supabase-js';

// These should be set through your Supabase project settings
// You can find these in your Supabase Dashboard > Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing. Please add your Supabase URL and anon key.');
  console.log('You can find these in your Supabase Dashboard > Settings > API');
  console.log('VITE_SUPABASE_URL should be your Project URL');
  console.log('VITE_SUPABASE_ANON_KEY should be your anon public key');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
