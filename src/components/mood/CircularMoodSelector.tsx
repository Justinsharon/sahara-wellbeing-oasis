
import { useState } from "react";
import { cn } from "@/lib/utils";

const moodOptions = [
  { value: "very_happy", label: "Very Happy", emoji: "😄", color: "text-emerald-600", bgColor: "bg-emerald-100", position: { x: 50, y: 10 } },
  { value: "happy", label: "Happy", emoji: "😊", color: "text-green-500", bgColor: "bg-green-100", position: { x: 85, y: 35 } },
  { value: "neutral", label: "Neutral", emoji: "😐", color: "text-yellow-500", bgColor: "bg-yellow-100", position: { x: 85, y: 65 } },
  { value: "sad", label: "Sad", emoji: "😢", color: "text-orange-500", bgColor: "bg-orange-100", position: { x: 50, y: 90 } },
  { value: "very_sad", label: "Very Sad", emoji: "😭", color: "text-red-500", bgColor: "bg-red-100", position: { x: 15, y: 65 } },
];

interface CircularMoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

export function CircularMoodSelector({ selectedMood, onMoodSelect }: CircularMoodSelectorProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Circular background */}
      <div className="absolute inset-0 rounded-full border-4 border-soft-blush-200 bg-gradient-to-br from-soft-blush-50 to-muted-blush-100" />
      
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-soft-blush-200">
        {selectedMood ? (
          <span className="text-4xl">
            {moodOptions.find(m => m.value === selectedMood)?.emoji}
          </span>
        ) : (
          <span className="text-2xl text-misty-rosewood-400">?</span>
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
          <span className="text-2xl">{mood.emoji}</span>
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
