
import { useState } from "react";
import { TrendingUp, Calendar, Activity, Heart, Brain, Moon, Zap, Target, Award, BarChart3 } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const moodData = [
  { date: "Mon", mood: 7, energy: 6, sleep: 8 },
  { date: "Tue", mood: 8, energy: 7, sleep: 7 },
  { date: "Wed", mood: 6, energy: 5, sleep: 6 },
  { date: "Thu", mood: 9, energy: 8, sleep: 9 },
  { date: "Fri", mood: 7, energy: 7, sleep: 8 },
  { date: "Sat", mood: 8, energy: 6, sleep: 7 },
  { date: "Sun", mood: 9, energy: 8, sleep: 9 }
];

const insights = [
  {
    id: 1,
    title: "Mood Improvement Trend",
    description: "Your mood has improved by 15% this week compared to last week",
    type: "positive",
    icon: TrendingUp,
    value: "+15%"
  },
  {
    id: 2,
    title: "Sleep Quality",
    description: "You're averaging 7.8 hours of quality sleep, which is excellent",
    type: "good",
    icon: Moon,
    value: "7.8hrs"
  },
  {
    id: 3,
    title: "Energy Levels",
    description: "Your energy levels are most consistent in the mornings",
    type: "info",
    icon: Zap,
    value: "Morning"
  },
  {
    id: 4,
    title: "Meditation Streak",
    description: "You've maintained a 12-day meditation streak!",
    type: "achievement",
    icon: Brain,
    value: "12 days"
  }
];

const goals = [
  {
    id: 1,
    title: "Daily Meditation",
    progress: 85,
    target: "20 minutes daily",
    streak: 12
  },
  {
    id: 2,
    title: "Exercise Routine",
    progress: 60,
    target: "4 times weekly",
    streak: 5
  },
  {
    id: 3,
    title: "Sleep Schedule",
    progress: 90,
    target: "8 hours nightly",
    streak: 18
  }
];

export default function Insights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  const handleGoalClick = (goalId: number) => {
    console.log("Viewing goal details:", goalId);
  };

  const handleInsightClick = (insightId: number) => {
    console.log("Viewing insight details:", insightId);
  };

  const handleExportData = () => {
    console.log("Exporting insights data");
  };

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <LiquidGlass variant="card" floating bubbles className="text-center p-8">
          <div className="w-16 h-16 bg-crimson-wine rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <BarChart3 className="w-8 h-8 text-off-white" />
          </div>
          <h1 className="text-4xl font-bold heading-gradient mb-4">Personal Insights</h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Track your progress, understand patterns, and celebrate your wellness journey.
          </p>
        </LiquidGlass>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {insights.map((insight) => (
            <LiquidGlass 
              key={insight.id} 
              variant="crystal" 
              interactive 
              floating 
              className="p-4 text-center cursor-pointer"
              onClick={() => handleInsightClick(insight.id)}
            >
              <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <insight.icon className="w-6 h-6 text-crimson-wine" />
              </div>
              <p className="text-2xl font-bold text-deep-charcoal mb-1">{insight.value}</p>
              <p className="text-sm text-warm-gray">{insight.title}</p>
            </LiquidGlass>
          ))}
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted-blush">
            <TabsTrigger value="trends" className="tab-trigger-primary">Mood Trends</TabsTrigger>
            <TabsTrigger value="goals" className="tab-trigger-warm">Goal Progress</TabsTrigger>
            <TabsTrigger value="insights" className="tab-trigger-taupe">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <LiquidGlass variant="card" liquidBorder className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-crimson-wine">Weekly Mood Trends</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedTimeframe === "week" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedTimeframe("week")}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={selectedTimeframe === "month" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedTimeframe("month")}
                  >
                    Month
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportData}>
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(154, 131, 124, 0.3)" />
                    <XAxis dataKey="date" stroke="#3c3c3c" />
                    <YAxis stroke="#3c3c3c" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(243, 236, 232, 0.9)', 
                        border: '1px solid rgba(154, 131, 124, 0.3)',
                        borderRadius: '12px'
                      }} 
                    />
                    <Line type="monotone" dataKey="mood" stroke="#501122" strokeWidth={3} dot={{ fill: '#501122' }} />
                    <Line type="monotone" dataKey="energy" stroke="#c5a398" strokeWidth={3} dot={{ fill: '#c5a398' }} />
                    <Line type="monotone" dataKey="sleep" stroke="#9a837c" strokeWidth={3} dot={{ fill: '#9a837c' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-crimson-wine rounded-full"></div>
                  <span className="text-sm text-warm-gray">Mood</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-soft-taupe rounded-full"></div>
                  <span className="text-sm text-warm-gray">Energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warm-gray rounded-full"></div>
                  <span className="text-sm text-warm-gray">Sleep</span>
                </div>
              </div>
            </LiquidGlass>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid gap-6">
              {goals.map((goal) => (
                <LiquidGlass 
                  key={goal.id} 
                  variant="crystal" 
                  interactive 
                  floating 
                  liquidBorder 
                  className="p-6 cursor-pointer"
                  onClick={() => handleGoalClick(goal.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-crimson-wine" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-deep-charcoal">{goal.title}</h3>
                        <p className="text-sm text-warm-gray">{goal.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-crimson-wine">{goal.progress}%</p>
                      <div className="flex items-center gap-1 text-sm text-warm-gray">
                        <Award className="w-4 h-4" />
                        <span>{goal.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted-blush rounded-full h-3">
                    <div 
                      className="bg-crimson-wine h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {insights.map((insight) => (
                <LiquidGlass 
                  key={insight.id} 
                  variant="card" 
                  floating 
                  bubbles 
                  className="p-6 cursor-pointer"
                  onClick={() => handleInsightClick(insight.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center shadow-lg">
                      <insight.icon className="w-6 h-6 text-crimson-wine" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-deep-charcoal mb-2">{insight.title}</h3>
                      <p className="text-warm-gray mb-3">{insight.description}</p>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          insight.type === 'positive' ? 'bg-emerald-splash-100 text-emerald-splash-700' :
                          insight.type === 'good' ? 'bg-soft-taupe text-deep-charcoal' :
                          insight.type === 'achievement' ? 'bg-crimson-wine text-off-white' :
                          'bg-muted-blush text-deep-charcoal'
                        }`}
                      >
                        {insight.type}
                      </Badge>
                    </div>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
