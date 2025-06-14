
import { createContext, useContext, useEffect, useState } from 'react';
import { CharacterCompanion, CharacterExpression } from '@/types/character';
import { useAuth } from './useAuth';

interface CharacterContextType {
  character: CharacterCompanion | null;
  loading: boolean;
  updateCharacter: (updates: Partial<CharacterCompanion>) => Promise<void>;
  incrementInteraction: () => void;
  getCharacterExpression: (mood?: string) => CharacterExpression;
  hasCharacter: boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [character, setCharacter] = useState<CharacterCompanion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.character_companion) {
      const storedCharacter = localStorage.getItem(`character_${user.id}`);
      if (storedCharacter) {
        setCharacter(JSON.parse(storedCharacter));
      }
    }
    setLoading(false);
  }, [user]);

  const updateCharacter = async (updates: Partial<CharacterCompanion>) => {
    if (!character || !user) return;

    const updatedCharacter = {
      ...character,
      ...updates,
      updated_at: new Date().toISOString()
    };

    setCharacter(updatedCharacter);
    localStorage.setItem(`character_${user.id}`, JSON.stringify(updatedCharacter));
  };

  const incrementInteraction = () => {
    if (!character) return;

    updateCharacter({
      relationship: {
        ...character.relationship,
        daily_interactions: character.relationship.daily_interactions + 1,
        total_interactions: character.relationship.total_interactions + 1
      }
    });
  };

  const getCharacterExpression = (mood?: string): CharacterExpression => {
    if (!mood) return { type: 'neutral', intensity: 'medium' };

    switch (mood) {
      case 'very_happy':
        return { type: 'excited', intensity: 'high' };
      case 'happy':
        return { type: 'happy', intensity: 'medium' };
      case 'neutral':
        return { type: 'neutral', intensity: 'medium' };
      case 'sad':
        return { type: 'concerned', intensity: 'medium' };
      case 'very_sad':
        return { type: 'sad', intensity: 'high' };
      default:
        return { type: 'neutral', intensity: 'medium' };
    }
  };

  const value = {
    character,
    loading,
    updateCharacter,
    incrementInteraction,
    getCharacterExpression,
    hasCharacter: !!character
  };

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}
