
export interface CharacterAppearance {
  skin_tone: 'light' | 'medium' | 'dark' | 'tan';
  hair_style: 'short' | 'long' | 'curly' | 'straight' | 'wavy' | 'buzz';
  hair_color: 'black' | 'brown' | 'blonde' | 'red' | 'gray' | 'blue' | 'purple';
  eye_color: 'brown' | 'blue' | 'green' | 'hazel' | 'gray';
  outfit: 'casual' | 'formal' | 'sporty' | 'creative' | 'cozy';
  accessories: string[];
}

export interface CharacterPersonality {
  traits: string[];
  communication_style: 'friendly' | 'professional' | 'casual' | 'encouraging';
  mood_response_style: 'empathetic' | 'motivational' | 'analytical' | 'supportive';
}

export interface CharacterRelationship {
  bond_level: number;
  milestones_achieved: string[];
  daily_interactions: number;
  total_interactions: number;
}

export interface CharacterCompanion {
  id: string;
  name: string;
  appearance: CharacterAppearance;
  personality: CharacterPersonality;
  relationship: CharacterRelationship;
  created_at: string;
  updated_at: string;
}

export interface CharacterExpression {
  type: 'happy' | 'sad' | 'neutral' | 'excited' | 'concerned' | 'proud' | 'thinking';
  intensity: 'low' | 'medium' | 'high';
}
