
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

const stressLevels = [
  { value: 1, label: "Very Low", color: "bg-emerald-500", description: "Completely relaxed" },
  { value: 2, label: "Low", color: "bg-green-500", description: "Calm and peaceful" },
  { value: 3, label: "Moderate", color: "bg-yellow-500", description: "Some tension" },
  { value: 4, label: "High", color: "bg-orange-500", description: "Feeling stressed" },
  { value: 5, label: "Very High", color: "bg-red-500", description: "Overwhelmed" },
];

interface StressLevelTrackerProps {
  selectedLevel: number | null;
  onLevelSelect: (level: number) => void;
}

export function StressLevelTracker({ selectedLevel, onLevelSelect }: StressLevelTrackerProps) {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-crimson-wine-500" />
          <h3 className="text-lg font-semibold text-crimson-wine-600">Stress Level</h3>
        </div>
        <p className="text-sm text-misty-rosewood-500">
          How stressed are you feeling right now?
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {stressLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => onLevelSelect(level.value)}
            onMouseEnter={() => setHoveredLevel(level.value)}
            onMouseLeave={() => setHoveredLevel(null)}
            className={cn(
              "w-12 h-12 rounded-full transition-all duration-300 border-2 flex items-center justify-center",
              selectedLevel === level.value
                ? `${level.color} border-white scale-110 shadow-lg`
                : "bg-soft-blush-100 border-soft-blush-200 hover:scale-105",
              hoveredLevel === level.value && selectedLevel !== level.value && "scale-105"
            )}
          >
            <span className="text-white font-bold text-sm">{level.value}</span>
          </button>
        ))}
      </div>

      {/* Progress bar visualization */}
      <div className="w-full bg-soft-blush-100 rounded-full h-3">
        <div
          className={cn(
            "h-3 rounded-full transition-all duration-500",
            selectedLevel ? stressLevels[selectedLevel - 1].color : "bg-transparent"
          )}
          style={{ width: selectedLevel ? `${(selectedLevel / 5) * 100}%` : "0%" }}
        />
      </div>

      {/* Level description */}
      {(selectedLevel || hoveredLevel) && (
        <div className="text-center">
          <p className="font-medium text-crimson-wine-600">
            {stressLevels[(hoveredLevel || selectedLevel)! - 1].label}
          </p>
          <p className="text-sm text-misty-rosewood-500">
            {stressLevels[(hoveredLevel || selectedLevel)! - 1].description}
          </p>
        </div>
      )}
    </div>
  );
}
