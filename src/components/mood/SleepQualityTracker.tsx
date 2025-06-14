
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Moon } from "lucide-react";

const sleepQualities = [
  { value: "excellent", label: "Excellent", emoji: "😴", color: "bg-emerald-500", description: "Refreshed and energized" },
  { value: "good", label: "Good", emoji: "😊", color: "bg-green-500", description: "Well-rested" },
  { value: "fair", label: "Fair", emoji: "😐", color: "bg-yellow-500", description: "Somewhat rested" },
  { value: "poor", label: "Poor", emoji: "😪", color: "bg-orange-500", description: "Tired and groggy" },
  { value: "very_poor", label: "Very Poor", emoji: "😵", color: "bg-red-500", description: "Exhausted" },
];

interface SleepQualityTrackerProps {
  selectedQuality: string;
  onQualitySelect: (quality: string) => void;
  hoursSlept: number;
  onHoursChange: (hours: number) => void;
}

export function SleepQualityTracker({ 
  selectedQuality, 
  onQualitySelect, 
  hoursSlept, 
  onHoursChange 
}: SleepQualityTrackerProps) {
  const [hoveredQuality, setHoveredQuality] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Moon className="w-5 h-5 text-crimson-wine-500" />
          <h3 className="text-lg font-semibold text-crimson-wine-600">Sleep Quality</h3>
        </div>
        <p className="text-sm text-misty-rosewood-500">
          How was your sleep last night?
        </p>
      </div>

      {/* Hours slept input */}
      <div className="text-center">
        <label className="block text-sm font-medium text-misty-rosewood-600 mb-2">
          Hours of Sleep
        </label>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onHoursChange(Math.max(1, hoursSlept - 0.5))}
            className="w-8 h-8 rounded-full bg-soft-blush-100 hover:bg-soft-blush-200 transition-colors flex items-center justify-center"
          >
            -
          </button>
          <span className="text-2xl font-bold text-crimson-wine-600 min-w-16 text-center">
            {hoursSlept}h
          </span>
          <button
            onClick={() => onHoursChange(Math.min(12, hoursSlept + 0.5))}
            className="w-8 h-8 rounded-full bg-soft-blush-100 hover:bg-soft-blush-200 transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Sleep quality options */}
      <div className="grid grid-cols-5 gap-3">
        {sleepQualities.map((quality) => (
          <button
            key={quality.value}
            onClick={() => onQualitySelect(quality.value)}
            onMouseEnter={() => setHoveredQuality(quality.value)}
            onMouseLeave={() => setHoveredQuality(null)}
            className={cn(
              "p-3 rounded-xl transition-all duration-300 border-2 text-center",
              selectedQuality === quality.value
                ? `${quality.color} border-white text-white scale-105 shadow-lg`
                : "bg-soft-blush-50 border-soft-blush-200 hover:scale-105 hover:shadow-md",
              hoveredQuality === quality.value && selectedQuality !== quality.value && "scale-105 shadow-md"
            )}
          >
            <div className="text-2xl mb-1">{quality.emoji}</div>
            <div className="text-xs font-medium">{quality.label}</div>
          </button>
        ))}
      </div>

      {/* Quality description */}
      {(selectedQuality || hoveredQuality) && (
        <div className="text-center">
          <p className="font-medium text-crimson-wine-600">
            {sleepQualities.find(q => q.value === (hoveredQuality || selectedQuality))?.label}
          </p>
          <p className="text-sm text-misty-rosewood-500">
            {sleepQualities.find(q => q.value === (hoveredQuality || selectedQuality))?.description}
          </p>
        </div>
      )}
    </div>
  );
}
