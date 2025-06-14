
import { useState } from "react";
import { CircularMoodSelector } from "./CircularMoodSelector";
import { StressLevelTracker } from "./StressLevelTracker";
import { SleepQualityTracker } from "./SleepQualityTracker";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Heart, Save } from "lucide-react";
import { toast } from "sonner";

interface DailyCheckInData {
  mood: string;
  stressLevel: number | null;
  sleepQuality: string;
  hoursSlept: number;
  notes: string;
  date: string;
}

interface DailyCheckInProps {
  onSave: (data: DailyCheckInData) => void;
  initialData?: Partial<DailyCheckInData>;
}

export function DailyCheckIn({ onSave, initialData }: DailyCheckInProps) {
  const [mood, setMood] = useState(initialData?.mood || "");
  const [stressLevel, setStressLevel] = useState<number | null>(initialData?.stressLevel || null);
  const [sleepQuality, setSleepQuality] = useState(initialData?.sleepQuality || "");
  const [hoursSlept, setHoursSlept] = useState(initialData?.hoursSlept || 7.5);
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [currentDate, setCurrentDate] = useState(
    initialData?.date || new Date().toISOString().split('T')[0]
  );

  const handleSave = () => {
    if (!mood) {
      toast.error("Please select your mood");
      return;
    }
    if (stressLevel === null) {
      toast.error("Please select your stress level");
      return;
    }
    if (!sleepQuality) {
      toast.error("Please rate your sleep quality");
      return;
    }

    const checkInData: DailyCheckInData = {
      mood,
      stressLevel,
      sleepQuality,
      hoursSlept,
      notes: notes.trim(),
      date: currentDate,
    };

    onSave(checkInData);
    toast.success("Daily check-in saved successfully!");
  };

  const isComplete = mood && stressLevel !== null && sleepQuality;
  const completionPercentage = Math.round(
    ((mood ? 1 : 0) + (stressLevel !== null ? 1 : 0) + (sleepQuality ? 1 : 0)) / 3 * 100
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with progress */}
      <LiquidGlass variant="card" floating bubbles className="p-6 animate-scale-in">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-crimson-wine-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold heading-gradient">Daily Check-In</h2>
              <p className="text-misty-rosewood-500 font-normal">
                Track your daily wellness journey
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-misty-rosewood-500" />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="liquid-glass-input px-3 py-1 text-sm"
              />
            </div>
            <div className="text-right">
              <p className="text-sm text-misty-rosewood-500">Progress</p>
              <p className="text-lg font-bold text-emerald-splash-600">{completionPercentage}%</p>
            </div>
          </div>
          <div className="w-full bg-soft-blush-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-splash-500 to-deep-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </LiquidGlass>

      {/* Mood Selection */}
      <LiquidGlass variant="card" floating bubbles className="p-6 animate-scale-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-6">
          <h3 className="text-xl font-bold heading-gradient mb-2">Express Your Current Mood</h3>
          <p className="text-misty-rosewood-500">Choose the mood that best represents how you're feeling right now</p>
        </div>
        <CircularMoodSelector selectedMood={mood} onMoodSelect={setMood} />
      </LiquidGlass>

      {/* Stress and Sleep in a grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <LiquidGlass variant="card" floating bubbles className="p-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <StressLevelTracker selectedLevel={stressLevel} onLevelSelect={setStressLevel} />
        </LiquidGlass>

        <LiquidGlass variant="card" floating bubbles className="p-6 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <SleepQualityTracker
            selectedQuality={sleepQuality}
            onQualitySelect={setSleepQuality}
            hoursSlept={hoursSlept}
            onHoursChange={setHoursSlept}
          />
        </LiquidGlass>
      </div>

      {/* Notes */}
      <LiquidGlass variant="card" floating bubbles className="p-6 animate-scale-in" style={{ animationDelay: "0.4s" }}>
        <div className="space-y-4">
          <Label htmlFor="notes" className="text-lg font-semibold text-crimson-wine-600">
            Reflect on Your Day (Optional)
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Reflect on your day - any insights, events, or feelings you'd like to capture and remember..."
            className="liquid-glass-input min-h-24"
            rows={4}
          />
        </div>
      </LiquidGlass>

      {/* Save Button */}
      <div className="text-center">
        <Button
          onClick={handleSave}
          disabled={!isComplete}
          className="liquid-glass-button px-8 py-3 text-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Daily Check-In
        </Button>
      </div>
    </div>
  );
}
