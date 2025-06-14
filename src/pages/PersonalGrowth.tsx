
import { useState } from "react";
import { Link } from "react-router-dom";
import { Target, BookOpen, TrendingUp, Brain, Plus, Calendar, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMockAuth } from "@/hooks/useMockAuth";

const featureCards = [
  {
    title: "Goal Setting",
    description: "Set, track, and achieve your personal wellness goals",
    icon: Target,
    href: "/personal-growth/goals",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Mood Journaling",
    description: "Daily mood tracking and emotional insights",
    icon: BookOpen,
    href: "/personal-growth/mood-journal",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Self-Assessments",
    description: "Guided assessments for anxiety, depression, and more",
    icon: Brain,
    href: "/personal-growth/assessments",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const achievements = [
  { title: "First Goal Set", description: "Set your first wellness goal", unlocked: true },
  { title: "Week Streak", description: "Track mood for 7 consecutive days", unlocked: true },
  { title: "Goal Achiever", description: "Complete your first goal", unlocked: false },
  { title: "Self-Aware", description: "Complete 3 self-assessments", unlocked: false },
];

export default function PersonalGrowth() {
  const { user } = useMockAuth();
  const [currentStreak, setCurrentStreak] = useState(5);
  const [totalGoals, setTotalGoals] = useState(3);
  const [completedGoals, setCompletedGoals] = useState(1);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Personal Growth Hub
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Track your progress, set meaningful goals, and develop healthy habits on your wellness journey.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="soft-shadow border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-primary">{currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soft-shadow border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goals Progress</p>
                <p className="text-2xl font-bold text-primary">{completedGoals}/{totalGoals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soft-shadow border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weekly Progress</p>
                <Progress value={75} className="w-full mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {featureCards.map((card, index) => (
          <Link key={index} to={card.href} className="group">
            <Card className="card-hover soft-shadow border-0 h-full">
              <CardHeader>
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Achievements */}
      <Card className="soft-shadow border-0 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Achievements
          </CardTitle>
          <CardDescription>
            Celebrate your wellness milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? "bg-yellow-500" : "bg-gray-300"
                  }`}>
                    <Award className={`w-4 h-4 ${
                      achievement.unlocked ? "text-white" : "text-gray-500"
                    }`} />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      achievement.unlocked ? "text-yellow-800" : "text-gray-500"
                    }`}>
                      {achievement.title}
                    </p>
                    <p className={`text-sm ${
                      achievement.unlocked ? "text-yellow-600" : "text-gray-400"
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="soft-shadow border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your wellness activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/personal-growth/goals">
                <Plus className="w-4 h-4 mr-2" />
                Add New Goal
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/personal-growth/mood-journal">
                <Heart className="w-4 h-4 mr-2" />
                Log Today's Mood
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/personal-growth/assessments">
                <Brain className="w-4 h-4 mr-2" />
                Take Assessment
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
