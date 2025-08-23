
import { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types';

// Add session to context to ensure persistent session state
interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Subscribe to auth changes FIRST to avoid brief unwanted null states
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, _session) => {
        setSession(_session);
        setSupabaseUser(_session?.user ?? null);
        // Always try to get profile as soon as we have a user
        if (_session?.user) {
          setTimeout(() => {
            ensureProfileExists(_session.user.id);
          }, 0);
        } else if (isMounted) {
          setUser(null);
        }
        if (isMounted) setLoading(false);
      }
    );

    // Then check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        ensureProfileExists(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const ensureProfileExists = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUser(data);
      } else {
        // Create minimal profile if none exists
        console.log('No profile found, creating minimal profile...');
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: supabaseUser?.email || '',
            full_name: supabaseUser?.user_metadata?.full_name || supabaseUser?.email || '',
            onboarding_completed: false
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating profile:', insertError);
          // Create minimal in-memory user object if DB insert fails
          setUser({
            id: userId,
            email: supabaseUser?.email || '',
            full_name: supabaseUser?.user_metadata?.full_name || supabaseUser?.email || '',
            onboarding_completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as any);
        } else {
          setUser(newProfile);
        }
      }
    } catch (error) {
      console.error('Error in ensureProfileExists:', error);
      // Create minimal in-memory user object as fallback
      setUser({
        id: userId,
        email: supabaseUser?.email || '',
        full_name: supabaseUser?.user_metadata?.full_name || supabaseUser?.email || '',
        onboarding_completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<User> = {}) => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: redirectUrl,
        }
      });
      if (error) throw error;
      console.log('Sign up successful:', data);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      console.log('Sign in successful:', data);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSupabaseUser(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/auth/reset-password`;
    console.log('Reset password redirect URL:', redirectUrl);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    if (error) throw error;
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!supabaseUser) throw new Error('No user logged in');
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', supabaseUser.id);
    if (error) throw error;
    await ensureProfileExists(supabaseUser.id);
  };

  const value = {
    user,
    supabaseUser,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Consider refactoring this file to smaller, focused hooks or utilities; it's now lengthy.

