
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';
  stress_level?: number;
  sleep_quality?: 'excellent' | 'good' | 'fair' | 'poor';
  hours_slept?: number;
  notes?: string;
  date: string;
  entry_type?: 'simple' | 'enhanced';
  created_at: string;
  updated_at: string;
}

// Type guard to ensure mood values are valid
const isValidMood = (mood: string): mood is MoodEntry['mood'] => {
  return ['very_happy', 'happy', 'neutral', 'sad', 'very_sad'].includes(mood);
};

// Helper function to transform database response to MoodEntry
const transformDatabaseEntry = (dbEntry: any): MoodEntry => {
  return {
    id: dbEntry.id,
    user_id: dbEntry.user_id,
    mood: isValidMood(dbEntry.mood) ? dbEntry.mood : 'neutral',
    stress_level: dbEntry.stress_level,
    sleep_quality: dbEntry.sleep_quality,
    hours_slept: dbEntry.hours_slept,
    notes: dbEntry.notes,
    date: dbEntry.date,
    entry_type: dbEntry.entry_type,
    created_at: dbEntry.created_at,
    updated_at: dbEntry.updated_at,
  };
};

export function useMoodEntries() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMoodEntries();
    } else {
      setMoodEntries([]);
      setLoading(false);
    }
  }, [user]);

  const fetchMoodEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      
      // Transform database entries to properly typed MoodEntry objects
      const transformedEntries = (data || []).map(transformDatabaseEntry);
      setMoodEntries(transformedEntries);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      toast.error('Failed to load mood entries');
    } finally {
      setLoading(false);
    }
  };

  const createMoodEntry = async (entryData: Omit<MoodEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      toast.error('Please log in to save mood entries');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert({
          ...entryData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const transformedEntry = transformDatabaseEntry(data);
      setMoodEntries(prev => [transformedEntry, ...prev.filter(entry => entry.date !== transformedEntry.date)]);
      toast.success('Mood entry saved successfully!');
      
      // Trigger badge awards and nudge generation
      try {
        await Promise.all([
          supabase.functions.invoke('award-badges', { body: { user_id: user.id } }),
          supabase.functions.invoke('nudge-engine', { body: { user_id: user.id } })
        ]);
      } catch (error) {
        console.error('Error triggering post-entry functions:', error);
      }
      
      return transformedEntry;
    } catch (error) {
      console.error('Error creating mood entry:', error);
      toast.error('Failed to save mood entry');
    }
  };

  const updateMoodEntry = async (id: string, updates: Partial<MoodEntry>) => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedEntry = transformDatabaseEntry(data);
      setMoodEntries(prev => prev.map(entry => entry.id === id ? transformedEntry : entry));
      toast.success('Mood entry updated successfully!');
      return transformedEntry;
    } catch (error) {
      console.error('Error updating mood entry:', error);
      toast.error('Failed to update mood entry');
    }
  };

  const deleteMoodEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('mood_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMoodEntries(prev => prev.filter(entry => entry.id !== id));
      toast.success('Mood entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      toast.error('Failed to delete mood entry');
    }
  };

  return {
    moodEntries,
    loading,
    createMoodEntry,
    updateMoodEntry,
    deleteMoodEntry,
    refetch: fetchMoodEntries,
  };
}
