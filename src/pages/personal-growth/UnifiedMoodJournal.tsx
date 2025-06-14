import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, TrendingUp, Heart, LogOut } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DailyCheckIn } from "@/components/mood/DailyCheckIn";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { useCharacter } from "@/hooks/useCharacter";
import { useMoodEntries, MoodEntry } from "@/hooks/useMoodEntries";
import { useAuth } from "@/hooks/useAuth";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const moodOptions = [
  { value: "very_happy", label: "Very Happy", emoji: "😄", color: "text-emerald-splash-600" },
  { value: "happy", label: "Happy", emoji: "😊", color: "text-emerald-splash-500" },
  { value: "neutral", label: "Neutral", emoji: "😐", color: "text-soft-blush-500" },
  { value: "sad", label: "Sad", emoji: "😢", color: "text-crimson-wine-400" },
  { value: "very_sad", label: "Very Sad", emoji: "😭", color: "text-crimson-wine-500" },
] as const;

export default function UnifiedMoodJournal() {
  const { user, signOut, loading: authLoading } = useAuth();
  const { moodEntries, loading, createMoodEntry } = useMoodEntries();
  const { character } = useCharacter();

  // Redirect to auth if not logged in
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen wellness-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crimson-wine-500 mx-auto mb-4"></div>
          <p className="text-misty-rosewood-600">Loading your wellness data...</p>
        </div>
      </div>
    );
  }

  const handleSaveEnhancedCheckIn = async (data: any) => {
    await createMoodEntry({
      mood: data.mood,
      stress_level: data.stressLevel,
      sleep_quality: data.sleepQuality,
      hours_slept: data.hoursSlept,
      entry_type: "enhanced",
      notes: data.notes,
      date: data.date,
    });
  };

  const getMoodOption = (mood: string) => {
    return moodOptions.find(option => option.value === mood);
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
    const enhancedEntries = moodEntries.filter(entry => entry.entry_type === 'enhanced');
    
    const avgMood = moodEntries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / moodEntries.length;
    const avgStress = enhancedEntries.length > 0 ? enhancedEntries.reduce((sum, entry) => sum + (entry.stress_level || 0), 0) / enhancedEntries.length : 0;
    const avgSleep = enhancedEntries.length > 0 ? enhancedEntries.reduce((sum, entry) => sum + (entry.hours_slept || 0), 0) / enhancedEntries.length : 0;
    
    return {
      mood: Math.round(avgMood * 10) / 10,
      stress: Math.round(avgStress * 10) / 10,
      sleep: Math.round(avgSleep * 10) / 10,
    };
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

  const averages = getAverages();

  return (
    <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/personal-growth">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Personal Growth
          </Link>
        </Button>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-misty-rosewood-600">
            Welcome, {user?.full_name || user?.email}
          </span>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="heading-xl mb-2">Mood Journal</h1>
          <p className="text-lg text-misty-rosewood-500">
            Track your emotional wellness journey with daily check-ins
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <LiquidGlass 
            variant="crystal" 
            floating 
            bubbles 
            className="p-6 animate-scale-in" 
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-splash-100 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-splash-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-misty-rosewood-500">Avg Mood</p>
                <p className="text-2xl font-bold text-crimson-wine-600">{averages.mood}/5</p>
                <p className="text-xs text-emerald-splash-600 font-medium">this week</p>
              </div>
            </div>
          </LiquidGlass>

          <LiquidGlass 
            variant="crystal" 
            floating 
            bubbles 
            className="p-6 animate-scale-in" 
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-deep-teal-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-deep-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-misty-rosewood-500">Avg Stress</p>
                <p className="text-2xl font-bold text-crimson-wine-600">{averages.stress}/5</p>
                <p className="text-xs text-deep-teal-600 font-medium">enhanced entries</p>
              </div>
            </div>
          </LiquidGlass>

          <LiquidGlass 
            variant="crystal" 
            floating 
            bubbles 
            className="p-6 animate-scale-in" 
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-soft-blush-100 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-soft-blush-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-misty-rosewood-500">Avg Sleep</p>
                <p className="text-2xl font-bold text-crimson-wine-600">{averages.sleep}h</p>
                <p className="text-xs text-soft-blush-600 font-medium">enhanced entries</p>
              </div>
            </div>
          </LiquidGlass>
        </div>

        <Tabs defaultValue="enhanced" className="space-y-6">
          <LiquidGlass variant="crystal" className="p-2">
            <TabsList className="grid w-full grid-cols-3 h-16 bg-transparent">
              <TabsTrigger value="enhanced" className="liquid-glass-button text-white rounded-xl font-medium">
                Daily Check-In
              </TabsTrigger>
              <TabsTrigger value="analytics" className="liquid-glass-button text-white rounded-xl font-medium">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="history" className="liquid-glass-button text-white rounded-xl font-medium">
                History
              </TabsTrigger>
            </TabsList>
          </LiquidGlass>

          <TabsContent value="enhanced">
            <DailyCheckIn onSave={handleSaveEnhancedCheckIn} />
          </TabsContent>

          <TabsContent value="analytics">
            <LiquidGlass variant="card" floating bubbles className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold heading-gradient mb-2">Wellness Trends</h2>
                <p className="text-misty-rosewood-500">Your mood, stress, and sleep patterns over time</p>
              </div>
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
            </LiquidGlass>
          </TabsContent>

          <TabsContent value="history">
            <LiquidGlass variant="card" floating bubbles className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold heading-gradient mb-2">Entry History</h2>
                <p className="text-misty-rosewood-500">Your recent mood tracking entries</p>
              </div>
              <div className="space-y-4">
                {moodEntries.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-misty-rosewood-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No entries yet</h3>
                    <p className="text-misty-rosewood-500">
                      Start tracking your mood to see patterns and insights
                    </p>
                  </div>
                ) : (
                  moodEntries.map((entry) => {
                    const moodOption = getMoodOption(entry.mood);
                    return (
                      <LiquidGlass key={entry.id} variant="crystal" interactive className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              {character && entry.entry_type === 'enhanced' && (
                                <CharacterAvatar
                                  character={character}
                                  expression={getMoodExpression(entry.mood)}
                                  size="md"
                                  animated={false}
                                />
                              )}
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{moodOption?.emoji}</div>
                                <div>
                                  <p className={`font-semibold ${moodOption?.color}`}>
                                    {moodOption?.label}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm text-misty-rosewood-500">
                                      {new Date(entry.date).toLocaleDateString()}
                                    </p>
                                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-splash-100 text-emerald-splash-600">
                                      Enhanced
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {entry.entry_type === 'enhanced' && (
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
                            )}
                            
                            {entry.notes && (
                              <p className="text-misty-rosewood-600 text-sm">{entry.notes}</p>
                            )}
                          </div>
                        </div>
                      </LiquidGlass>
                    );
                  })
                )}
              </div>
            </LiquidGlass>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
