
import { useState } from "react";
import { CircularMoodSelector } from "./CircularMoodSelector";
import { StressLevelTracker } from "./StressLevelTracker";
import { SleepQualityTracker } from "./SleepQualityTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="soft-shadow border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-crimson-wine-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold heading-gradient">Daily Check-In</h2>
              <p className="text-misty-rosewood-500 font-normal">
                Track your daily wellness journey
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-misty-rosewood-500" />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="border border-soft-blush-200 rounded-lg px-3 py-1 text-sm"
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
        </CardContent>
      </Card>

      {/* Mood Selection */}
      <Card className="soft-shadow border-0">
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent>
          <CircularMoodSelector selectedMood={mood} onMoodSelect={setMood} />
        </CardContent>
      </Card>

      {/* Stress and Sleep in a grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="soft-shadow border-0">
          <CardContent className="pt-6">
            <StressLevelTracker selectedLevel={stressLevel} onLevelSelect={setStressLevel} />
          </CardContent>
        </Card>

        <Card className="soft-shadow border-0">
          <CardContent className="pt-6">
            <SleepQualityTracker
              selectedQuality={sleepQuality}
              onQualitySelect={setSleepQuality}
              hoursSlept={hoursSlept}
              onHoursChange={setHoursSlept}
            />
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <Card className="soft-shadow border-0">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label htmlFor="notes" className="text-lg font-semibold text-crimson-wine-600">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today? Any thoughts, events, or reflections you'd like to remember..."
              className="min-h-24"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="text-center">
        <Button
          onClick={handleSave}
          disabled={!isComplete}
          className="btn-primary-modern px-8 py-3 text-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Daily Check-In
        </Button>
      </div>
    </div>
  );
}
