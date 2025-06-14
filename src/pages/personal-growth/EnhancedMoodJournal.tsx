
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, TrendingUp, Heart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyCheckIn } from "@/components/mood/DailyCheckIn";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { useCharacter } from "@/hooks/useCharacter";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function EnhancedMoodJournal() {
  const { moodEntries, loading, createMoodEntry } = useMoodEntries();
  const { character, getCharacterExpression } = useCharacter();

  const handleSaveCheckIn = async (data: any) => {
    const entryData = {
      mood: data.mood,
      stress_level: data.stressLevel,
      sleep_quality: data.sleepQuality,
      hours_slept: data.hoursSlept,
      notes: data.notes,
      date: data.date,
      entry_type: 'enhanced' as const,
    };

    await createMoodEntry(entryData);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading mood entries...</p>
          </div>
        </div>
      </div>
    );
  }

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
                {moodEntries.length > 0 ? (
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
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No data yet</h3>
                    <p className="text-muted-foreground">
                      Start tracking your mood to see analytics
                    </p>
                  </div>
                )}
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
                {moodEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No entries yet</h3>
                    <p className="text-muted-foreground">
                      Start with a daily check-in to build your wellness history
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {moodEntries.map((entry) => (
                      <div key={entry.id} className="glass-card p-6 rounded-2xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              {character && (
                                <CharacterAvatar
                                  character={character}
                                  expression={getMoodExpression(entry.mood)}
                                  size="md"
                                  animated={false}
                                />
                              )}
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
                                <span className="ml-2 font-medium">{entry.stress_level || 'N/A'}/5</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-misty-rosewood-500">Sleep:</span>
                                <span className="ml-2 font-medium">
                                  {entry.hours_slept || 'N/A'}h {entry.sleep_quality && `(${entry.sleep_quality})`}
                                </span>
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
