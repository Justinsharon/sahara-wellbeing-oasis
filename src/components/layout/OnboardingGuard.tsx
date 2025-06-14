
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCharacter } from '@/hooks/useCharacter';
import { supabase } from '@/integrations/supabase/client';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const { user } = useAuth();
  const { character } = useCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) return;

      try {
        // Check if user has completed onboarding
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed, character_companion')
          .eq('id', user.id)
          .single();

        if (!profile) return;

        // If no character, redirect to character creator
        if (!character && !profile.character_companion) {
          navigate('/character-creator');
          return;
        }

        // If character exists but onboarding not completed, redirect to assessment
        if (character && !profile.onboarding_completed) {
          navigate('/onboarding-assessment');
          return;
        }

      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [user, character, navigate]);

  return <>{children}</>;
}
