
import { cn } from "@/lib/utils";
import { CharacterCompanion, CharacterExpression } from "@/types/character";

interface CharacterAvatarProps {
  character: CharacterCompanion;
  expression?: CharacterExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

const skinToneColors = {
  light: '#FDBCB4',
  medium: '#E3A857',
  dark: '#8D5524',
  tan: '#DEB887'
};

const hairColors = {
  black: '#000000',
  brown: '#8B4513',
  blonde: '#FAD5A5',
  red: '#DC143C',
  gray: '#808080',
  blue: '#0080FF',
  purple: '#8A2BE2'
};

const eyeColors = {
  brown: '#8B4513',
  blue: '#0080FF',
  green: '#008000',
  hazel: '#8E7618',
  gray: '#808080'
};

export function CharacterAvatar({ 
  character, 
  expression = { type: 'neutral', intensity: 'medium' },
  size = 'md',
  className,
  animated = true
}: CharacterAvatarProps) {
  const getExpressionPath = () => {
    switch (expression.type) {
      case 'happy':
        return 'M15 18s1-2 3-2 3 2 3 2';
      case 'sad':
        return 'M18 15s-1-2-3-2-3 2-3 2';
      case 'excited':
        return 'M12 18s2-3 6-3 6 3 6 3';
      case 'concerned':
        return 'M16 18s0-2 2-2 2 2 2 2';
      case 'proud':
        return 'M14 18s1-1 4-1 4 1 4 1';
      case 'thinking':
        return 'M16 18s1-1 2-1 2 1 2 1';
      default:
        return 'M16 18s1-1 2-1 2 1 2 1';
    }
  };

  const getEyeExpression = () => {
    switch (expression.type) {
      case 'happy':
      case 'excited':
        return 'M9 10h.01M15 10h.01';
      case 'sad':
      case 'concerned':
        return 'M9 9h.01M15 9h.01';
      case 'thinking':
        return 'M9 10h.01M15 8h.01';
      default:
        return 'M9 10h.01M15 10h.01';
    }
  };

  return (
    <div className={cn(
      sizeClasses[size],
      'relative rounded-full overflow-hidden',
      animated && 'transition-all duration-300 hover:scale-105',
      className
    )}>
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="none"
      >
        {/* Face */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill={skinToneColors[character.appearance.skin_tone]}
          stroke="hsl(var(--misty-rosewood-200))"
          strokeWidth="1"
        />
        
        {/* Hair */}
        <path
          d={character.appearance.hair_style === 'short' 
            ? 'M4 12C4 7.6 7.6 4 12 4s8 3.6 8 8' 
            : 'M3 12C3 7.2 7.2 3 12 3s9 4.2 9 9'}
          fill={hairColors[character.appearance.hair_color]}
          stroke="hsl(var(--misty-rosewood-300))"
          strokeWidth="0.5"
        />
        
        {/* Eyes */}
        <g stroke={eyeColors[character.appearance.eye_color]} strokeWidth="2">
          <path d={getEyeExpression()} />
        </g>
        
        {/* Mouth */}
        <path
          d={getExpressionPath()}
          stroke="hsl(var(--crimson-wine-600))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Accessories */}
        {character.appearance.accessories.includes('glasses') && (
          <g stroke="hsl(var(--deep-charcoal))" strokeWidth="1" fill="none">
            <circle cx="9" cy="10" r="2.5" />
            <circle cx="15" cy="10" r="2.5" />
            <path d="M11.5 10h1" />
          </g>
        )}
      </svg>
      
      {/* Outfit indicator */}
      <div className={cn(
        'absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full',
        character.appearance.outfit === 'casual' && 'bg-blue-400',
        character.appearance.outfit === 'formal' && 'bg-gray-600',
        character.appearance.outfit === 'sporty' && 'bg-green-500',
        character.appearance.outfit === 'creative' && 'bg-purple-500',
        character.appearance.outfit === 'cozy' && 'bg-orange-400'
      )} />
    </div>
  );
}
