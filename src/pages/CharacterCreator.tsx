
import { CharacterCreator } from "@/components/character/CharacterCreator";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CharacterCompanion } from "@/types/character";

export default function CharacterCreatorPage() {
  const { user, updateProfile } = useMockAuth();
  const navigate = useNavigate();

  const handleCharacterComplete = async (characterData: Omit<CharacterCompanion, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const character: CharacterCompanion = {
        ...characterData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Store character in localStorage
      localStorage.setItem(`character_${user?.id}`, JSON.stringify(character));
      
      // Update user profile with character reference
      await updateProfile({
        character_companion: character.id
      });

      toast.success(`${character.name} is now your wellness companion!`);
      navigate('/');
    } catch (error) {
      console.error('Error creating character:', error);
      toast.error('Failed to create character. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <CharacterCreator 
      onComplete={handleCharacterComplete}
      onCancel={handleCancel}
    />
  );
}
