
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfwzdfmsovtjksiaxvva.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmd3pkZm1zb3Z0amtzaWF4dnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTg5NjQsImV4cCI6MjA2NTQ3NDk2NH0.L0P8f381FBN8zuFC3ft-L6i_Cn3o515l1h7BOjI7FXo';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
