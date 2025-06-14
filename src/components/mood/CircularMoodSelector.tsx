
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { useCharacter } from "@/hooks/useCharacter";

const moodOptions = [
  { value: "very_happy", label: "Very Happy", color: "text-emerald-600", bgColor: "bg-emerald-100", position: { x: 50, y: 10 } },
  { value: "happy", label: "Happy", color: "text-green-500", bgColor: "bg-green-100", position: { x: 85, y: 35 } },
  { value: "neutral", label: "Neutral", color: "text-yellow-500", bgColor: "bg-yellow-100", position: { x: 85, y: 65 } },
  { value: "sad", label: "Sad", color: "text-orange-500", bgColor: "bg-orange-100", position: { x: 50, y: 90 } },
  { value: "very_sad", label: "Very Sad", color: "text-red-500", bgColor: "bg-red-100", position: { x: 15, y: 65 } },
];

interface CircularMoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

export function CircularMoodSelector({ selectedMood, onMoodSelect }: CircularMoodSelectorProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  const { character, getCharacterExpression } = useCharacter();

  const getMoodExpression = (mood: string) => {
    switch (mood) {
      case "very_happy":
        return { type: 'excited' as const, intensity: 'high' as const };
      case "happy":
        return { type: 'happy' as const, intensity: 'medium' as const };
      case "neutral":
        return { type: 'neutral' as const, intensity: 'medium' as const };
      case "sad":
        return { type: 'sad' as const, intensity: 'medium' as const };
      case "very_sad":
        return { type: 'sad' as const, intensity: 'high' as const };
      default:
        return { type: 'neutral' as const, intensity: 'medium' as const };
    }
  };

  if (!character) {
    return (
      <div className="text-center text-misty-rosewood-500">
        <p>Create your character companion to track your mood!</p>
      </div>
    );
  }

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Circular background */}
      <div className="absolute inset-0 rounded-full border-4 border-soft-blush-200 bg-gradient-to-br from-soft-blush-50 to-muted-blush-100" />
      
      {/* Center circle with character */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-soft-blush-200">
        {selectedMood ? (
          <CharacterAvatar
            character={character}
            expression={getMoodExpression(selectedMood)}
            size="lg"
            animated={false}
          />
        ) : (
          <CharacterAvatar
            character={character}
            expression={{ type: 'thinking', intensity: 'medium' }}
            size="lg"
            animated={false}
          />
        )}
      </div>

      {/* Mood options positioned in circle */}
      {moodOptions.map((mood) => (
        <button
          key={mood.value}
          onClick={() => onMoodSelect(mood.value)}
          onMouseEnter={() => setHoveredMood(mood.value)}
          onMouseLeave={() => setHoveredMood(null)}
          className={cn(
            "absolute w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center border-2",
            selectedMood === mood.value
              ? `${mood.bgColor} border-crimson-wine-400 scale-110 shadow-lg`
              : "bg-white border-soft-blush-200 hover:scale-105 hover:shadow-md",
            hoveredMood === mood.value && selectedMood !== mood.value && "scale-105 shadow-md"
          )}
          style={{
            top: `${mood.position.y}%`,
            left: `${mood.position.x}%`,
            transform: "translate(-50%, -50%)"
          }}
        >
          <CharacterAvatar
            character={character}
            expression={getMoodExpression(mood.value)}
            size="md"
            animated={false}
          />
        </button>
      ))}

      {/* Mood label */}
      {(selectedMood || hoveredMood) && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-lg font-semibold text-crimson-wine-600">
            {moodOptions.find(m => m.value === (hoveredMood || selectedMood))?.label}
          </p>
        </div>
      )}
    </div>
  );
}
