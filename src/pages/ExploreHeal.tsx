
import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  Headphones, 
  Activity, 
  Heart, 
  Brain,
  Sparkles,
  Play,
  Clock,
  Star,
  Bookmark,
  Filter,
  TrendingUp,
  Award,
  Users,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const meditationLibrary = [
  {
    id: 1,
    title: "Morning Anxiety Relief",
    duration: "10 min",
    category: "Anxiety",
    difficulty: "Beginner",
    rating: 4.8,
    plays: 1234,
    description: "Start your day with calm and confidence through guided breathing exercises.",
    instructor: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Deep Sleep Journey",
    duration: "25 min",
    category: "Sleep",
    difficulty: "All Levels",
    rating: 4.9,
    plays: 2156,
    description: "Drift into peaceful sleep with this gentle, progressive relaxation session.",
    instructor: "Michael Rivers",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Focus & Concentration",
    duration: "15 min",
    category: "Focus",
    difficulty: "Intermediate",
    rating: 4.7,
    plays: 987,
    description: "Enhance your mental clarity and concentration with mindful attention practices.",
    instructor: "Emma Martinez",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop"
  }
];

const healingActivities = [
  {
    id: 1,
    title: "Gratitude Journal",
    type: "Writing",
    duration: "5-10 min",
    difficulty: "Easy",
    description: "Daily practice of writing three things you're grateful for.",
    benefits: ["Improved mood", "Better sleep", "Reduced stress"],
    completions: 456
  },
  {
    id: 2,
    title: "4-7-8 Breathing Exercise",
    type: "Breathing",
    duration: "3-5 min",
    difficulty: "Easy",
    description: "A simple breathing technique to reduce anxiety and promote relaxation.",
    benefits: ["Instant calm", "Better focus", "Sleep improvement"],
    completions: 789
  },
  {
    id: 3,
    title: "Body Scan Meditation",
    type: "Mindfulness",
    duration: "20 min",
    difficulty: "Intermediate",
    description: "Progressive relaxation technique focusing on different parts of your body.",
    benefits: ["Body awareness", "Tension release", "Deep relaxation"],
    completions: 234
  }
];

const wellnessArticles = [
  {
    id: 1,
    title: "Understanding Anxiety: A Complete Guide",
    author: "Dr. Lisa Thompson",
    readTime: "8 min read",
    category: "Mental Health",
    publishedDate: "2 days ago",
    excerpt: "Learn about the different types of anxiety, their symptoms, and evidence-based treatment approaches.",
    views: 1845,
    rating: 4.9
  },
  {
    id: 2,
    title: "Building Healthy Sleep Habits",
    author: "Sleep Specialist Team",
    readTime: "6 min read",
    category: "Sleep Wellness",
    publishedDate: "5 days ago",
    excerpt: "Discover practical tips and strategies for improving your sleep quality and establishing a healthy bedtime routine.",
    views: 1234,
    rating: 4.7
  },
  {
    id: 3,
    title: "The Science of Mindfulness",
    author: "Dr. James Wilson",
    readTime: "12 min read",
    category: "Mindfulness",
    publishedDate: "1 week ago",
    excerpt: "Explore the research behind mindfulness practices and their impact on mental health and well-being.",
    views: 967,
    rating: 4.8
  }
];

const wellnessChallenges = [
  {
    id: 1,
    title: "7-Day Mindfulness Challenge",
    duration: "7 days",
    participants: 2340,
    description: "Build a daily mindfulness practice with guided exercises and community support.",
    progress: 65,
    status: "In Progress",
    dailyTime: "10-15 min"
  },
  {
    id: 2,
    title: "30-Day Gratitude Journey",
    duration: "30 days",
    participants: 1876,
    description: "Transform your mindset through daily gratitude practices and reflection.",
    progress: 0,
    status: "Available",
    dailyTime: "5-10 min"
  },
  {
    id: 3,
    title: "Sleep Better Challenge",
    duration: "14 days",
    participants: 1543,
    description: "Improve your sleep quality with evidence-based techniques and habits.",
    progress: 100,
    status: "Completed",
    dailyTime: "Various"
  }
];

export default function ExploreHeal() {
  const [activeTab, setActiveTab] = useState("meditations");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold heading-gradient mb-2">
              Explore & Heal
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover resources, activities, and tools for your wellness journey
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button className="btn-primary-modern">
              <Bookmark className="w-4 h-4 mr-2" />
              My Saved
            </Button>
            <Button variant="outline" className="btn-secondary-modern">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search meditations, articles, activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-input"
            />
          </div>
          <Button variant="outline" className="btn-secondary-modern">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-nav mb-8">
          <TabsTrigger value="meditations" className="tab-modern">
            <Headphones className="w-4 h-4 mr-2" />
            Meditations
          </TabsTrigger>
          <TabsTrigger value="activities" className="tab-modern">
            <Activity className="w-4 h-4 mr-2" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="articles" className="tab-modern">
            <BookOpen className="w-4 h-4 mr-2" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="challenges" className="tab-modern">
            <Award className="w-4 h-4 mr-2" />
            Challenges
          </TabsTrigger>
        </TabsList>

        {/* Meditations Tab */}
        <TabsContent value="meditations" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meditationLibrary.map((meditation) => (
              <Card key={meditation.id} className="glass-card hover-scale soft-shadow">
                <div className="relative">
                  <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-16 h-16 z-10">
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                    <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30">
                      {meditation.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{meditation.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {meditation.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    by {meditation.instructor}
                  </p>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {meditation.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {meditation.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {meditation.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {meditation.plays}
                    </div>
                  </div>

                  <Button className="btn-primary-modern w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healingActivities.map((activity) => (
              <Card key={activity.id} className="glass-card hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        {activity.type}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{activity.difficulty}</p>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {activity.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {activity.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {activity.completions} completed
                    </div>
                  </div>

                  <Button className="btn-primary-modern w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles" className="animate-fade-in">
          <div className="space-y-6">
            {wellnessArticles.map((article) => (
              <Card key={article.id} className="glass-card hover-scale">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">
                            {article.category}
                          </Badge>
                          <h3 className="font-bold text-xl mb-1 hover:text-primary cursor-pointer">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            by {article.author} • {article.publishedDate}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-white/60">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {article.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {article.views} views
                          </div>
                        </div>
                        <Button className="btn-primary-modern">
                          Read Article
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessChallenges.map((challenge) => (
              <Card key={challenge.id} className="glass-card hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant={challenge.status === 'Completed' ? 'default' : challenge.status === 'In Progress' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {challenge.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {challenge.description}
                  </p>
                  
                  {challenge.status === 'In Progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {challenge.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {challenge.dailyTime}
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Users className="w-4 h-4" />
                      {challenge.participants} participants
                    </div>
                  </div>

                  <Button 
                    className={challenge.status === 'Completed' ? "btn-secondary-modern w-full" : "btn-primary-modern w-full"}
                    variant={challenge.status === 'Completed' ? 'outline' : 'default'}
                  >
                    {challenge.status === 'Completed' ? 'View Results' : 
                     challenge.status === 'In Progress' ? 'Continue' : 'Start Challenge'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
