
import { useState } from "react";
import { Calendar, TrendingUp, BarChart3, Brain, Target, Clock, Award, Heart, Sparkles, Zap, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";

const moodData = [
  { date: "Mon", mood: 4, energy: 3.5 },
  { date: "Tue", mood: 3, energy: 2.8 },
  { date: "Wed", mood: 5, energy: 4.2 },
  { date: "Thu", mood: 4, energy: 3.8 },
  { date: "Fri", mood: 3, energy: 3.2 },
  { date: "Sat", mood: 4, energy: 4.0 },
  { date: "Sun", mood: 5, energy: 4.5 },
];

const weeklyProgress = [
  { week: "Week 1", mood: 3.5, goals: 60, assessments: 2, wellness: 65 },
  { week: "Week 2", mood: 4.0, goals: 75, assessments: 1, wellness: 72 },
  { week: "Week 3", mood: 3.8, goals: 80, assessments: 3, wellness: 78 },
  { week: "Week 4", mood: 4.2, goals: 85, assessments: 2, wellness: 85 },
];

const assessmentHistory = [
  { id: "1", type: "Anxiety", score: 12, date: "2024-01-15", level: "Mild", improvement: "+15%" },
  { id: "2", type: "Depression", score: 8, date: "2024-01-10", level: "Minimal", improvement: "+22%" },
  { id: "3", type: "Stress", score: 18, date: "2024-01-05", level: "Moderate", improvement: "+8%" },
];

export default function Insights() {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [totalGoals, setTotalGoals] = useState(8);
  const [completedGoals, setCompletedGoals] = useState(5);
  const [averageMood, setAverageMood] = useState(4.1);
  const [wellnessScore, setWellnessScore] = useState(85);

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4.5) return "😊";
    if (mood >= 3.5) return "🙂";
    if (mood >= 2.5) return "😐";
    if (mood >= 1.5) return "😔";
    return "😞";
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4.5) return "text-emerald-600";
    if (mood >= 3.5) return "text-blue-600";
    if (mood >= 2.5) return "text-yellow-600";
    if (mood >= 1.5) return "text-orange-600";
    return "text-red-600";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Minimal": return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "Mild": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Moderate": return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Severe": return "bg-red-100 text-red-800 border border-red-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                 style={{
                   background: `linear-gradient(135deg, 
                     hsl(var(--emerald-splash-500)) 0%, 
                     hsl(var(--emerald-splash-600)) 100%)`
                 }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="heading-xl">
                Personal Insights
              </h1>
              <p className="text-lg text-misty-rosewood-500 font-medium">
                Your wellness journey at a glance
              </p>
            </div>
          </div>
          
          {/* Wellness Score Banner */}
          <div className="glass-card rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                     style={{
                       background: `linear-gradient(135deg, 
                         hsl(var(--emerald-splash-500)) 0%, 
                         hsl(var(--deep-teal-500)) 100%)`
                     }}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold heading-gradient">Wellness Score</h2>
                  <p className="text-misty-rosewood-500">Your overall mental health progress</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-emerald-splash-600">{wellnessScore}</div>
                <div className="text-sm text-emerald-splash-600 font-medium">+12% this week</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="progress-modern">
                <div 
                  className="progress-fill" 
                  style={{ width: `${wellnessScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="metric-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-8 h-8 text-soft-blush-600" />
              <Star className="w-5 h-5 text-crimson-wine-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-misty-rosewood-500">Streak</p>
              <p className="text-2xl font-bold text-crimson-wine-600">{currentStreak}</p>
              <p className="text-xs text-soft-blush-600 font-medium">days</p>
            </div>
          </div>

          <div className="metric-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-3">
              <Target className="w-8 h-8 text-emerald-splash-500" />
              <Zap className="w-5 h-5 text-deep-teal-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-misty-rosewood-500">Goals</p>
              <p className="text-2xl font-bold text-crimson-wine-600">{completedGoals}/{totalGoals}</p>
              <p className="text-xs text-emerald-splash-600 font-medium">completed</p>
            </div>
          </div>

          <div className="metric-card animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between mb-3">
              <Heart className="w-8 h-8 text-crimson-wine-500" />
              <span className="text-2xl">{getMoodEmoji(averageMood)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-misty-rosewood-500">Avg Mood</p>
              <p className="text-2xl font-bold text-crimson-wine-600">{averageMood}</p>
              <p className="text-xs text-soft-blush-600 font-medium">this week</p>
            </div>
          </div>

          <div className="metric-card animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-3">
              <Brain className="w-8 h-8 text-misty-rosewood-500" />
              <Award className="w-5 h-5 text-crimson-wine-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-misty-rosewood-500">Check-ins</p>
              <p className="text-2xl font-bold text-crimson-wine-600">{assessmentHistory.length}</p>
              <p className="text-xs text-misty-rosewood-600 font-medium">completed</p>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="mood" className="space-y-8">
          <TabsList className="glass-nav grid w-full grid-cols-4 h-16 p-2 rounded-2xl">
            <TabsTrigger value="mood" className="rounded-xl font-medium data-[state=active]:text-white"
                         style={{
                           'data-[state=active]:background': `linear-gradient(135deg, 
                             hsl(var(--crimson-wine-500)) 0%, 
                             hsl(var(--crimson-wine-600)) 100%)`
                         }}>
              <Heart className="w-4 h-4 mr-2" />
              Mood
            </TabsTrigger>
            <TabsTrigger value="goals" className="rounded-xl font-medium data-[state=active]:text-white"
                         style={{
                           'data-[state=active]:background': `linear-gradient(135deg, 
                             hsl(var(--emerald-splash-500)) 0%, 
                             hsl(var(--emerald-splash-600)) 100%)`
                         }}>
              <Target className="w-4 h-4 mr-2" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="assessments" className="rounded-xl font-medium data-[state=active]:text-white"
                         style={{
                           'data-[state=active]:background': `linear-gradient(135deg, 
                             hsl(var(--deep-teal-500)) 0%, 
                             hsl(var(--deep-teal-600)) 100%)`
                         }}>
              <Brain className="w-4 h-4 mr-2" />
              Health
            </TabsTrigger>
            <TabsTrigger value="weekly" className="rounded-xl font-medium data-[state=active]:text-white"
                         style={{
                           'data-[state=active]:background': `linear-gradient(135deg, 
                             hsl(var(--soft-blush-500)) 0%, 
                             hsl(var(--soft-blush-600)) 100%)`
                         }}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-6">
            <div className="chart-container">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold heading-gradient">Mood & Energy Patterns</CardTitle>
                <CardDescription className="text-base text-misty-rosewood-500">
                  Track your emotional wellbeing and energy levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={moodData}>
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--emerald-splash-500))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--emerald-splash-500))" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--soft-blush-500))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--soft-blush-500))" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--misty-rosewood-100))" />
                    <XAxis dataKey="date" stroke="hsl(var(--misty-rosewood-500))" fontSize={12} />
                    <YAxis domain={[1, 5]} stroke="hsl(var(--misty-rosewood-500))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(80, 17, 34, 0.1)'
                      }} 
                    />
                    <Area type="monotone" dataKey="mood" stroke="hsl(var(--emerald-splash-500))" strokeWidth={3} fill="url(#moodGradient)" name="Mood" />
                    <Area type="monotone" dataKey="energy" stroke="hsl(var(--soft-blush-500))" strokeWidth={3} fill="url(#energyGradient)" name="Energy" />
                  </AreaChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-7 gap-2 mt-8">
                  {moodData.map((day, index) => (
                    <div key={index} className="text-center glass-card p-3 rounded-2xl">
                      <p className="text-sm font-semibold text-misty-rosewood-600">{day.date}</p>
                      <p className={`text-3xl my-2 ${getMoodColor(day.mood)}`}>
                        {getMoodEmoji(day.mood)}
                      </p>
                      <p className="text-xs font-medium text-emerald-splash-600">{day.mood}/5</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="chart-container">
              <CardHeader>
                <CardTitle className="heading-gradient">Goal Achievement Dashboard</CardTitle>
                <CardDescription className="text-misty-rosewood-500">
                  Your progress towards wellness milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-misty-rosewood-600">Overall Progress</span>
                    <span className="text-lg font-bold text-emerald-splash-600">{Math.round((completedGoals / totalGoals) * 100)}%</span>
                  </div>
                  <div className="progress-modern">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(completedGoals / totalGoals) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-emerald-splash-600 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Completed Goals
                    </h4>
                    <div className="space-y-3">
                      {[
                        { name: "Daily Meditation", days: 21, color: "emerald-splash" },
                        { name: "Exercise 3x/week", days: 14, color: "deep-teal" },
                        { name: "Gratitude Journal", days: 30, color: "crimson-wine" }
                      ].map((goal, index) => (
                        <div key={index} className="glass-card p-4 rounded-2xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-crimson-wine-600">{goal.name}</p>
                              <p className="text-sm text-misty-rosewood-500">Completed {goal.days} days ago</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-emerald-splash-100 flex items-center justify-center">
                              <Award className="w-4 h-4 text-emerald-splash-600" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-deep-teal-600 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Active Goals
                    </h4>
                    <div className="space-y-3">
                      {[
                        { name: "Read 15 min daily", progress: 80 },
                        { name: "Journal weekly", progress: 60 },
                        { name: "Sleep 8+ hours", progress: 75 }
                      ].map((goal, index) => (
                        <div key={index} className="glass-card p-4 rounded-2xl">
                          <div className="mb-2">
                            <p className="font-semibold text-crimson-wine-600">{goal.name}</p>
                          </div>
                          <div className="progress-modern">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-deep-teal-600 font-medium mt-1">{goal.progress}% complete</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <div className="chart-container">
              <CardHeader>
                <CardTitle className="heading-gradient">Mental Health Assessments</CardTitle>
                <CardDescription className="text-misty-rosewood-500">
                  Track your progress with professional assessment tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessmentHistory.map((assessment) => (
                    <div key={assessment.id} className="glass-card p-6 rounded-2xl border border-soft-blush-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-misty-rosewood-100 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-misty-rosewood-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-crimson-wine-600">{assessment.type} Assessment</h4>
                            <p className="text-sm text-misty-rosewood-500">{new Date(assessment.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getLevelColor(assessment.level)} px-3 py-1 rounded-full font-medium`}>
                            {assessment.level}
                          </Badge>
                          <p className="text-sm text-emerald-splash-600 font-medium mt-1">{assessment.improvement}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-misty-rosewood-600">Score: {assessment.score}</span>
                        <TrendingUp className="w-4 h-4 text-emerald-splash-500" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="btn-primary-modern w-full mt-6">
                  <Brain className="w-4 h-4 mr-2" />
                  Take New Assessment
                </Button>
              </CardContent>
            </div>
          </TabsContent>

          {/* Weekly Trends Tab */}
          <TabsContent value="weekly" className="space-y-6">
            <div className="chart-container">
              <CardHeader>
                <CardTitle className="heading-gradient">4-Week Wellness Trends</CardTitle>
                <CardDescription className="text-misty-rosewood-500">
                  Comprehensive view of your mental health journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={weeklyProgress}>
                    <defs>
                      <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--emerald-splash-500))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--emerald-splash-500))" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--deep-teal-500))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--deep-teal-500))" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--misty-rosewood-100))" />
                    <XAxis dataKey="week" stroke="hsl(var(--misty-rosewood-500))" fontSize={12} />
                    <YAxis stroke="hsl(var(--misty-rosewood-500))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(80, 17, 34, 0.1)'
                      }} 
                    />
                    <Bar dataKey="mood" fill="url(#colorMood)" name="Average Mood" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="goals" fill="url(#colorGoals)" name="Goal Progress %" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="metric-card text-center">
                    <TrendingUp className="w-10 h-10 text-emerald-splash-500 mx-auto mb-3" />
                    <p className="text-sm font-medium text-misty-rosewood-500">Mood Trend</p>
                    <p className="text-xl font-bold text-emerald-splash-600">↗ Improving</p>
                    <p className="text-xs text-emerald-splash-500 mt-1">+18% this month</p>
                  </div>
                  
                  <div className="metric-card text-center">
                    <Target className="w-10 h-10 text-deep-teal-500 mx-auto mb-3" />
                    <p className="text-sm font-medium text-misty-rosewood-500">Goal Achievement</p>
                    <p className="text-xl font-bold text-deep-teal-600">85% This Week</p>
                    <p className="text-xs text-deep-teal-500 mt-1">Personal best!</p>
                  </div>
                  
                  <div className="metric-card text-center">
                    <Award className="w-10 h-10 text-crimson-wine-500 mx-auto mb-3" />
                    <p className="text-sm font-medium text-misty-rosewood-500">Streak Record</p>
                    <p className="text-xl font-bold text-crimson-wine-600">{currentStreak} Days</p>
                    <p className="text-xs text-crimson-wine-500 mt-1">Keep it up!</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
