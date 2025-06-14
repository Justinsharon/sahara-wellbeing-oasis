
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, BookOpen, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MoodEntry } from "@/types";

const moodOptions = [
  { value: "very_happy", label: "Very Happy", emoji: "😄", color: "text-green-600" },
  { value: "happy", label: "Happy", emoji: "😊", color: "text-green-500" },
  { value: "neutral", label: "Neutral", emoji: "😐", color: "text-yellow-500" },
  { value: "sad", label: "Sad", emoji: "😢", color: "text-orange-500" },
  { value: "very_sad", label: "Very Sad", emoji: "😭", color: "text-red-500" },
] as const;

const mockMoodEntries: MoodEntry[] = [
  {
    id: "1",
    user_id: "user1",
    mood: "happy",
    notes: "Had a great therapy session today. Feeling optimistic about the future.",
    date: "2024-06-14",
    created_at: "2024-06-14T10:00:00Z",
  },
  {
    id: "2",
    user_id: "user1",
    mood: "neutral",
    notes: "Average day, nothing special but not bad either.",
    date: "2024-06-13",
    created_at: "2024-06-13T20:00:00Z",
  },
  {
    id: "3",
    user_id: "user1",
    mood: "very_happy",
    notes: "Achieved my meditation goal! Feeling very proud and peaceful.",
    date: "2024-06-12",
    created_at: "2024-06-12T18:00:00Z",
  },
];

export default function MoodJournal() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodEntries);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmitEntry = () => {
    if (!selectedMood) {
      toast.error("Please select your mood");
      return;
    }

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      user_id: "user1",
      mood: selectedMood as MoodEntry['mood'],
      notes: notes.trim(),
      date: currentDate,
      created_at: new Date().toISOString(),
    };

    // Remove existing entry for the same date and add new one
    const updatedEntries = moodEntries.filter(entry => entry.date !== currentDate);
    setMoodEntries([newEntry, ...updatedEntries]);
    
    setSelectedMood("");
    setNotes("");
    setCurrentDate(new Date().toISOString().split('T')[0]);
    toast.success("Mood entry saved successfully!");
  };

  const getMoodOption = (mood: string) => {
    return moodOptions.find(option => option.value === mood);
  };

  const getWeeklyAverage = () => {
    const lastWeek = moodEntries.slice(0, 7);
    if (lastWeek.length === 0) return 0;
    
    const moodValues = { very_sad: 1, sad: 2, neutral: 3, happy: 4, very_happy: 5 };
    const average = lastWeek.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / lastWeek.length;
    return Math.round(average * 10) / 10;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/personal-growth">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Personal Growth
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Mood Journal</h1>
          <p className="text-muted-foreground">
            Track your daily mood and reflect on your emotional journey
          </p>
        </div>

        {/* Today's Entry */}
        <Card className="soft-shadow border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              How are you feeling today?
            </CardTitle>
            <CardDescription>
              Select your mood and add any notes about your day
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="date">Date</Label>
              <input
                id="date"
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              />
            </div>

            <div>
              <Label>Your Mood</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMood === mood.value
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{mood.emoji}</div>
                    <div className={`text-sm font-medium ${mood.color}`}>
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What happened today? How are you feeling? Any thoughts you'd like to remember..."
                className="mt-1"
                rows={4}
              />
            </div>

            <Button onClick={handleSubmitEntry} className="w-full md:w-auto">
              Save Mood Entry
            </Button>
          </CardContent>
        </Card>

        {/* Mood Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="soft-shadow border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Average</p>
                  <p className="text-2xl font-bold text-primary">{getWeeklyAverage()}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="soft-shadow border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Tracked</p>
                  <p className="text-2xl font-bold text-primary">{moodEntries.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="soft-shadow border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold text-primary">5 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Entries */}
        <Card className="soft-shadow border-0">
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>
              Your mood tracking history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {moodEntries.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No entries yet</h3>
                <p className="text-muted-foreground">
                  Start tracking your mood to see patterns and insights
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {moodEntries.map((entry) => {
                  const moodOption = getMoodOption(entry.mood);
                  return (
                    <div
                      key={entry.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{moodOption?.emoji}</div>
                          <div>
                            <p className={`font-medium ${moodOption?.color}`}>
                              {moodOption?.label}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(entry.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      {entry.notes && (
                        <p className="mt-3 text-muted-foreground">{entry.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
