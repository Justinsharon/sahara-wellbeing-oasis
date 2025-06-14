
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Target, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Award, 
  Heart,
  Brain,
  Sparkles,
  Zap,
  Activity
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const quickActions = [
  {
    title: "Mood Journal",
    description: "Track your mood, stress, and sleep with our comprehensive wellness tracker",
    icon: Heart,
    color: "crimson-wine",
    href: "/personal-growth/mood-journal",
    isNew: false
  },
  {
    title: "Goals & Milestones",
    description: "Set and track your personal development goals",
    icon: Target,
    color: "emerald-splash",
    href: "/personal-growth/goals",
  },
  {
    title: "Progress Insights",
    description: "View detailed analytics of your wellness journey",
    icon: TrendingUp,
    color: "deep-teal",
    href: "/insights",
  },
  {
    title: "Wellness Resources",
    description: "Discover tools and techniques for mental wellness",
    icon: BookOpen,
    color: "soft-blush",
    href: "/explore-heal",
  },
];

export default function PersonalGrowth() {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [goalsCompleted, setGoalsCompleted] = useState(3);
  const [totalGoals, setTotalGoals] = useState(8);

  return (
    <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                 style={{
                   background: `linear-gradient(135deg, 
                     hsl(var(--emerald-splash-500)) 0%, 
                     hsl(var(--deep-teal-500)) 100%)`
                 }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="heading-xl">
                Personal Growth
              </h1>
              <p className="text-lg text-misty-rosewood-500 font-medium">
                Your journey to mental wellness and self-discovery
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <LiquidGlass 
            variant="crystal" 
            floating 
            bubbles 
            className="p-4 animate-scale-in" 
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-8 h-8 text-soft-blush-600" />
              <Activity className="w-5 h-5 text-crimson-wine-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-misty-rosewood-500">Current Streak</p>
              <p className="text-2xl font-bold text-crimson-wine-600">{currentStreak}</p>
              <p className="text-xs text-soft-blush-600 font-medium">days</p>
            </div>
          </LiquidGlass>

          <LiquidGlass 
            variant="crystal" 
            floating 
            bubbles 
            className="p-4 animate-scale-in" 
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between mb-3">
              <Target className="w-8 h-8 text-emerald-splash-500" />
              <Award className="w-5 h-5 text-deep-teal-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-misty-rosewood-500">Goals Progress</p>
              <p className="text-2xl font-bold text-crimson-wine-600">{goalsCompleted}/{totalGoals}</p>
              <p className="text-xs text-emerald-splash-600 font-medium">completed</p>
            </div>
          </LiquidGlass>

          <LiquidGlass 
            variant="crystal" 
            floating 
            bubbles 
            className="p-4 animate-scale-in col-span-2 md:col-span-1" 
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center justify-between mb-3">
              <Brain className="w-8 h-8 text-misty-rosewood-500" />
              <Zap className="w-5 h-5 text-crimson-wine-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-misty-rosewood-500">Wellness Score</p>
              <p className="text-2xl font-bold text-crimson-wine-600">85%</p>
              <p className="text-xs text-misty-rosewood-600 font-medium">this week</p>
            </div>
          </LiquidGlass>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold heading-gradient mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <LiquidGlass 
                key={action.title} 
                variant="card"
                interactive
                floating
                bubbles
                className="p-6 hover:scale-105 transition-all duration-300 cursor-pointer group animate-scale-in relative"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {action.isNew && (
                  <div className="absolute -top-2 -right-2 bg-crimson-wine-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                    NEW
                  </div>
                )}
                <Link to={action.href} className="block">
                  <div className="pb-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                        style={{
                          background: `linear-gradient(135deg, 
                            hsl(var(--${action.color}-500)) 0%, 
                            hsl(var(--${action.color}-600)) 100%)`
                        }}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold heading-gradient group-hover:scale-105 transition-transform">
                          {action.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-misty-rosewood-500">
                      {action.description}
                    </p>
                  </div>
                </Link>
              </LiquidGlass>
            ))}
          </div>
        </div>

        {/* Weekly Goals Progress */}
        <LiquidGlass variant="card" floating bubbles className="p-6 mb-8">
          <div className="mb-6">
            <h3 className="flex items-center gap-3 text-xl font-bold heading-gradient mb-2">
              <Target className="w-6 h-6 text-emerald-splash-500" />
              This Week's Goals
            </h3>
            <p className="text-misty-rosewood-500">
              Track your progress towards weekly wellness targets
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-crimson-wine-600">Daily Mood Check-ins</span>
                <span className="text-sm text-emerald-splash-600 font-medium">5/7 days</span>
              </div>
              <Progress value={71} className="h-3" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-crimson-wine-600">Meditation Sessions</span>
                <span className="text-sm text-emerald-splash-600 font-medium">4/5 sessions</span>
              </div>
              <Progress value={80} className="h-3" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-crimson-wine-600">Sleep Quality Tracking</span>
                <span className="text-sm text-emerald-splash-600 font-medium">6/7 nights</span>
              </div>
              <Progress value={86} className="h-3" />
            </div>
          </div>
        </LiquidGlass>

        {/* Recent Activity */}
        <LiquidGlass variant="card" floating bubbles className="p-6">
          <div className="mb-6">
            <h3 className="flex items-center gap-3 text-xl font-bold heading-gradient">
              <Activity className="w-6 h-6 text-deep-teal-500" />
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4">
            <LiquidGlass variant="crystal" interactive className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-splash-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-emerald-splash-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-crimson-wine-600">Completed mood check-in</p>
                  <p className="text-sm text-misty-rosewood-500">Today at 9:30 AM</p>
                </div>
              </div>
            </LiquidGlass>
            
            <LiquidGlass variant="crystal" interactive className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-deep-teal-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-deep-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-crimson-wine-600">Achieved daily meditation goal</p>
                  <p className="text-sm text-misty-rosewood-500">Yesterday at 7:00 PM</p>
                </div>
              </div>
            </LiquidGlass>
            
            <LiquidGlass variant="crystal" interactive className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-soft-blush-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-soft-blush-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-crimson-wine-600">Earned 7-day streak badge</p>
                  <p className="text-sm text-misty-rosewood-500">2 days ago</p>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}
