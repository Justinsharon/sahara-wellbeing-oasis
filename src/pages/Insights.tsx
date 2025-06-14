
import { useState } from "react";
import { Calendar, TrendingUp, BarChart3, Brain, Target, Clock, Award, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const moodData = [
  { date: "Mon", mood: 4 },
  { date: "Tue", mood: 3 },
  { date: "Wed", mood: 5 },
  { date: "Thu", mood: 4 },
  { date: "Fri", mood: 3 },
  { date: "Sat", mood: 4 },
  { date: "Sun", mood: 5 },
];

const weeklyProgress = [
  { week: "Week 1", mood: 3.5, goals: 60, assessments: 2 },
  { week: "Week 2", mood: 4.0, goals: 75, assessments: 1 },
  { week: "Week 3", mood: 3.8, goals: 80, assessments: 3 },
  { week: "Week 4", mood: 4.2, goals: 85, assessments: 2 },
];

const assessmentHistory = [
  { id: "1", type: "Anxiety", score: 12, date: "2024-01-15", level: "Mild" },
  { id: "2", type: "Depression", score: 8, date: "2024-01-10", level: "Minimal" },
  { id: "3", type: "Stress", score: 18, date: "2024-01-05", level: "Moderate" },
];

export default function Insights() {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [totalGoals, setTotalGoals] = useState(8);
  const [completedGoals, setCompletedGoals] = useState(5);
  const [averageMood, setAverageMood] = useState(4.1);

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4.5) return "😊";
    if (mood >= 3.5) return "🙂";
    if (mood >= 2.5) return "😐";
    if (mood >= 1.5) return "😔";
    return "😞";
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4.5) return "text-green-600";
    if (mood >= 3.5) return "text-blue-600";
    if (mood >= 2.5) return "text-yellow-600";
    if (mood >= 1.5) return "text-orange-600";
    return "text-red-600";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Minimal": return "bg-green-100 text-green-800";
      case "Mild": return "bg-yellow-100 text-yellow-800";
      case "Moderate": return "bg-orange-100 text-orange-800";
      case "Severe": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            My Daily Insights
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Track your progress, understand patterns, and celebrate your journey to better mental health.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold text-primary">{currentStreak} days</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Goals Progress</p>
                  <p className="text-2xl font-bold text-primary">{completedGoals}/{totalGoals}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Mood</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{averageMood}</span>
                    <span className="text-2xl">{getMoodEmoji(averageMood)}</span>
                  </div>
                </div>
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Assessments</p>
                  <p className="text-2xl font-bold text-primary">{assessmentHistory.length}</p>
                </div>
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="mood" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mood">Mood Trends</TabsTrigger>
            <TabsTrigger value="goals">Goal Progress</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>7-Day Mood Tracking</CardTitle>
                <CardDescription>
                  Your mood patterns over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-7 gap-2 mt-6">
                  {moodData.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm font-medium">{day.date}</p>
                      <p className={`text-2xl ${getMoodColor(day.mood)}`}>
                        {getMoodEmoji(day.mood)}
                      </p>
                      <p className="text-xs text-muted-foreground">{day.mood}/5</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Goal Achievement</CardTitle>
                <CardDescription>
                  Your progress towards wellness goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round((completedGoals / totalGoals) * 100)}%</span>
                  </div>
                  <Progress value={(completedGoals / totalGoals) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-700">Completed Goals</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium">Daily Meditation</p>
                        <p className="text-xs text-muted-foreground">Completed 21 days ago</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium">Exercise 3x/week</p>
                        <p className="text-xs text-muted-foreground">Completed 14 days ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-700">Active Goals</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium">Read 15 min daily</p>
                        <Progress value={80} className="h-1 mt-1" />
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium">Journal weekly</p>
                        <Progress value={60} className="h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
                <CardDescription>
                  Track your mental health assessments over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessmentHistory.map((assessment) => (
                    <div key={assessment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{assessment.type} Assessment</h4>
                        <Badge className={getLevelColor(assessment.level)}>
                          {assessment.level}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Score: {assessment.score}</span>
                        <span>{new Date(assessment.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <Brain className="w-4 h-4 mr-2" />
                  Take New Assessment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress Overview</CardTitle>
                <CardDescription>
                  Your progress across different areas over the past month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="mood" fill="#8884d8" name="Average Mood" />
                    <Bar dataKey="goals" fill="#82ca9d" name="Goal Progress %" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Mood Trend</p>
                      <p className="text-lg font-bold text-green-600">↗ Improving</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Goal Achievement</p>
                      <p className="text-lg font-bold text-blue-600">85% This Week</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Streak Record</p>
                      <p className="text-lg font-bold text-yellow-600">{currentStreak} Days</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
