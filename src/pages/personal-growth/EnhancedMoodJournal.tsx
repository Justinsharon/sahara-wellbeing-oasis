
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, TrendingUp, Heart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyCheckIn } from "@/components/mood/DailyCheckIn";
import { MoodEntry } from "@/types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ExtendedMoodEntry extends MoodEntry {
  stress_level?: number;
  sleep_quality?: string;
  hours_slept?: number;
}

const mockEnhancedEntries: ExtendedMoodEntry[] = [
  {
    id: "1",
    user_id: "user1",
    mood: "happy",
    stress_level: 2,
    sleep_quality: "good",
    hours_slept: 8,
    notes: "Great therapy session today. Feeling optimistic about the future.",
    date: "2024-06-14",
    created_at: "2024-06-14T10:00:00Z",
  },
  {
    id: "2",
    user_id: "user1",
    mood: "neutral",
    stress_level: 3,
    sleep_quality: "fair",
    hours_slept: 6.5,
    notes: "Average day, nothing special but not bad either.",
    date: "2024-06-13",
    created_at: "2024-06-13T20:00:00Z",
  },
  {
    id: "3",
    user_id: "user1",
    mood: "very_happy",
    stress_level: 1,
    sleep_quality: "excellent",
    hours_slept: 8.5,
    notes: "Achieved my meditation goal! Feeling very proud and peaceful.",
    date: "2024-06-12",
    created_at: "2024-06-12T18:00:00Z",
  },
];

export default function EnhancedMoodJournal() {
  const [moodEntries, setMoodEntries] = useState<ExtendedMoodEntry[]>(mockEnhancedEntries);

  const handleSaveCheckIn = (data: any) => {
    const newEntry: ExtendedMoodEntry = {
      id: Date.now().toString(),
      user_id: "user1",
      mood: data.mood as ExtendedMoodEntry['mood'],
      stress_level: data.stressLevel,
      sleep_quality: data.sleepQuality,
      hours_slept: data.hoursSlept,
      notes: data.notes,
      date: data.date,
      created_at: new Date().toISOString(),
    };

    const updatedEntries = moodEntries.filter(entry => entry.date !== data.date);
    setMoodEntries([newEntry, ...updatedEntries]);
  };

  const getChartData = () => {
    return moodEntries
      .slice(0, 7)
      .reverse()
      .map(entry => {
        const moodValues = { very_sad: 1, sad: 2, neutral: 3, happy: 4, very_happy: 5 };
        return {
          date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
          mood: moodValues[entry.mood],
          stress: entry.stress_level || 0,
          sleep: entry.hours_slept || 0,
        };
      });
  };

  const getAverages = () => {
    if (moodEntries.length === 0) return { mood: 0, stress: 0, sleep: 0 };
    
    const moodValues = { very_sad: 1, sad: 2, neutral: 3, happy: 4, very_happy: 5 };
    const avgMood = moodEntries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / moodEntries.length;
    const avgStress = moodEntries.reduce((sum, entry) => sum + (entry.stress_level || 0), 0) / moodEntries.length;
    const avgSleep = moodEntries.reduce((sum, entry) => sum + (entry.hours_slept || 0), 0) / moodEntries.length;
    
    return {
      mood: Math.round(avgMood * 10) / 10,
      stress: Math.round(avgStress * 10) / 10,
      sleep: Math.round(avgSleep * 10) / 10,
    };
  };

  const averages = getAverages();

  return (
    <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/personal-growth">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Personal Growth
          </Link>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="heading-xl mb-2">Enhanced Mood Journal</h1>
          <p className="text-lg text-misty-rosewood-500">
            Track your mood, stress, and sleep patterns with our comprehensive wellness tracker
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="soft-shadow border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-splash-100 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-emerald-splash-600" />
                </div>
                <div>
                  <p className="text-sm text-misty-rosewood-500">Avg Mood</p>
                  <p className="text-2xl font-bold text-crimson-wine-600">{averages.mood}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="soft-shadow border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-deep-teal-100 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-deep-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-misty-rosewood-500">Avg Stress</p>
                  <p className="text-2xl font-bold text-crimson-wine-600">{averages.stress}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="soft-shadow border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-soft-blush-100 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-soft-blush-600" />
                </div>
                <div>
                  <p className="text-sm text-misty-rosewood-500">Avg Sleep</p>
                  <p className="text-2xl font-bold text-crimson-wine-600">{averages.sleep}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="checkin" className="space-y-6">
          <TabsList className="glass-nav grid w-full grid-cols-3 h-16 p-2 rounded-2xl">
            <TabsTrigger value="checkin" className="tab-trigger-crimson rounded-xl font-medium">
              Daily Check-In
            </TabsTrigger>
            <TabsTrigger value="analytics" className="tab-trigger-emerald rounded-xl font-medium">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="history" className="tab-trigger-teal rounded-xl font-medium">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checkin">
            <DailyCheckIn onSave={handleSaveCheckIn} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="heading-gradient">Wellness Trends</CardTitle>
                <CardDescription>Your mood, stress, and sleep patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={getChartData()}>
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--emerald-splash-500))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--emerald-splash-500))" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--crimson-wine-500))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--crimson-wine-500))" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--misty-rosewood-100))" />
                    <XAxis dataKey="date" stroke="hsl(var(--misty-rosewood-500))" fontSize={12} />
                    <YAxis stroke="hsl(var(--misty-rosewood-500))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(80, 17, 34, 0.1)'
                      }} 
                    />
                    <Area type="monotone" dataKey="mood" stroke="hsl(var(--emerald-splash-500))" strokeWidth={3} fill="url(#moodGradient)" name="Mood" />
                    <Area type="monotone" dataKey="stress" stroke="hsl(var(--crimson-wine-500))" strokeWidth={3} fill="url(#stressGradient)" name="Stress" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="soft-shadow border-0">
              <CardHeader>
                <CardTitle>Check-In History</CardTitle>
                <CardDescription>Your recent wellness entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodEntries.map((entry) => (
                    <div key={entry.id} className="glass-card p-6 rounded-2xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-2xl">
                              {entry.mood === 'very_happy' ? '😄' : 
                               entry.mood === 'happy' ? '😊' :
                               entry.mood === 'neutral' ? '😐' :
                               entry.mood === 'sad' ? '😢' : '😭'}
                            </span>
                            <div>
                              <p className="font-semibold text-crimson-wine-600 capitalize">
                                {entry.mood.replace('_', ' ')}
                              </p>
                              <p className="text-sm text-misty-rosewood-500">
                                {new Date(entry.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="text-sm">
                              <span className="text-misty-rosewood-500">Stress:</span>
                              <span className="ml-2 font-medium">{entry.stress_level}/5</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-misty-rosewood-500">Sleep:</span>
                              <span className="ml-2 font-medium">{entry.hours_slept}h ({entry.sleep_quality})</span>
                            </div>
                          </div>
                          
                          {entry.notes && (
                            <p className="text-misty-rosewood-600 text-sm">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
