import { useState } from "react";
import { Search, Filter, Play, BookOpen, Headphones, Heart, Star, Clock, Users, Compass, Sparkles } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const meditations = [
  {
    id: 1,
    title: "Morning Mindfulness",
    description: "Start your day with clarity and intention",
    duration: "10 min",
    category: "Mindfulness",
    difficulty: "Beginner",
    rating: 4.8,
    plays: 15420
  },
  {
    id: 2,
    title: "Anxiety Relief",
    description: "Calm your mind and reduce anxiety",
    duration: "15 min",
    category: "Anxiety",
    difficulty: "Intermediate",
    rating: 4.9,
    plays: 23150
  },
  {
    id: 3,
    title: "Sleep Stories",
    description: "Peaceful stories to help you drift off",
    duration: "20 min",
    category: "Sleep",
    difficulty: "Beginner",
    rating: 4.7,
    plays: 18760
  }
];

const activities = [
  {
    id: 1,
    title: "Gratitude Journaling",
    description: "Reflect on positive moments in your day",
    time: "5-10 min",
    category: "Reflection",
    benefits: ["Improved mood", "Better sleep", "Increased positivity"]
  },
  {
    id: 2,
    title: "Breathing Exercises",
    description: "Simple techniques to manage stress and anxiety",
    time: "3-5 min",
    category: "Stress Relief",
    benefits: ["Reduced anxiety", "Better focus", "Calm mind"]
  },
  {
    id: 3,
    title: "Progressive Muscle Relaxation",
    description: "Release physical tension throughout your body",
    time: "15-20 min",
    category: "Relaxation",
    benefits: ["Muscle tension relief", "Improved sleep", "Stress reduction"]
  }
];

const articles = [
  {
    id: 1,
    title: "Understanding Anxiety: A Comprehensive Guide",
    author: "Dr. Sarah Chen",
    readTime: "8 min read",
    category: "Mental Health",
    excerpt: "Learn about anxiety symptoms, causes, and effective coping strategies...",
    publishDate: "2 days ago"
  },
  {
    id: 2,
    title: "Building Resilience in Daily Life",
    author: "Dr. Michael Rodriguez",
    readTime: "6 min read",
    category: "Personal Growth",
    excerpt: "Discover practical ways to build emotional resilience and bounce back...",
    publishDate: "1 week ago"
  },
  {
    id: 3,
    title: "The Science of Meditation",
    author: "Dr. Emma Thompson",
    readTime: "10 min read",
    category: "Mindfulness",
    excerpt: "Explore the neuroscience behind meditation and its benefits...",
    publishDate: "3 days ago"
  }
];

const challenges = [
  {
    id: 1,
    title: "7-Day Mindfulness Challenge",
    description: "Build a daily mindfulness practice",
    duration: "7 days",
    participants: 2847,
    difficulty: "Beginner",
    reward: "Mindfulness Badge"
  },
  {
    id: 2,
    title: "30-Day Gratitude Journey",
    description: "Cultivate gratitude and positive thinking",
    duration: "30 days",
    participants: 1523,
    difficulty: "Intermediate",
    reward: "Gratitude Master Badge"
  },
  {
    id: 3,
    title: "Sleep Better Challenge",
    description: "Improve your sleep quality and habits",
    duration: "14 days",
    participants: 3421,
    difficulty: "Beginner",
    reward: "Sleep Champion Badge"
  }
];

export default function ExploreHeal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleStartMeditation = (meditationId: number) => {
    console.log("Starting meditation:", meditationId);
  };

  const handleStartActivity = (activityId: number) => {
    console.log("Starting activity:", activityId);
  };

  const handleReadArticle = (articleId: number) => {
    console.log("Reading article:", articleId);
  };

  const handleJoinChallenge = (challengeId: number) => {
    console.log("Joining challenge:", challengeId);
  };

  const handleFilter = () => {
    console.log("Opening filter options");
  };

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <LiquidGlass variant="card" floating bubbles className="text-center p-8">
          <div className="w-16 h-16 bg-crimson-wine rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Compass className="w-8 h-8 text-off-white" />
          </div>
          <h1 className="text-4xl font-bold heading-gradient mb-4">Explore & Heal</h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Discover guided meditations, healing activities, educational articles, and wellness challenges to support your journey.
          </p>
        </LiquidGlass>

        {/* Search and Filters */}
        <LiquidGlass variant="crystal" className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-warm-gray" />
              <Input
                placeholder="Search meditations, activities, articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-input"
              />
            </div>
            <Button variant="outline" className="btn-secondary-modern" onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </LiquidGlass>

        <Tabs defaultValue="meditations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted-blush">
            <TabsTrigger value="meditations" className="tab-trigger-primary">Meditations</TabsTrigger>
            <TabsTrigger value="activities" className="tab-trigger-warm">Activities</TabsTrigger>
            <TabsTrigger value="articles" className="tab-trigger-taupe">Articles</TabsTrigger>
            <TabsTrigger value="challenges" className="tab-trigger-primary">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="meditations" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meditations.map((meditation) => (
                <LiquidGlass 
                  key={meditation.id} 
                  variant="card" 
                  interactive 
                  floating 
                  className="p-6 hover-scale cursor-pointer"
                  onClick={() => console.log("Viewing meditation:", meditation.id)}
                >
                  <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Headphones className="w-6 h-6 text-crimson-wine" />
                  </div>
                  <h3 className="text-lg font-bold text-deep-charcoal mb-2">{meditation.title}</h3>
                  <p className="text-warm-gray mb-4">{meditation.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="bg-muted-blush text-deep-charcoal">
                      {meditation.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-splash-100 text-emerald-splash-700">
                      {meditation.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-warm-gray mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{meditation.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{meditation.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span>{meditation.plays.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full btn-primary-modern"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartMeditation(meditation.id);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Meditation
                  </Button>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="grid gap-6">
              {activities.map((activity) => (
                <LiquidGlass 
                  key={activity.id} 
                  variant="crystal" 
                  interactive 
                  liquidBorder 
                  className="p-6 cursor-pointer"
                  onClick={() => console.log("Viewing activity:", activity.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-soft-taupe rounded-xl flex items-center justify-center">
                          <Heart className="w-5 h-5 text-crimson-wine" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-deep-charcoal">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-warm-gray">
                            <Clock className="w-4 h-4" />
                            <span>{activity.time}</span>
                            <Badge variant="outline" className="bg-muted-blush text-deep-charcoal">
                              {activity.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-warm-gray mb-4">{activity.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-deep-charcoal">Benefits:</p>
                        <div className="flex flex-wrap gap-2">
                          {activity.benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="bg-emerald-splash-100 text-emerald-splash-700">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="btn-primary-modern ml-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartActivity(activity.id);
                      }}
                    >
                      Start Activity
                    </Button>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <LiquidGlass 
                  key={article.id} 
                  variant="card" 
                  floating 
                  bubbles 
                  className="p-6 hover-scale cursor-pointer"
                  onClick={() => console.log("Viewing article:", article.id)}
                >
                  <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <BookOpen className="w-6 h-6 text-crimson-wine" />
                  </div>
                  <Badge variant="outline" className="bg-muted-blush text-deep-charcoal mb-3">
                    {article.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-deep-charcoal mb-2">{article.title}</h3>
                  <p className="text-warm-gray mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-warm-gray mb-4">
                    <span>by {article.author}</span>
                    <span>{article.readTime}</span>
                    <span>{article.publishDate}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full btn-secondary-modern"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadArticle(article.id);
                    }}
                  >
                    Read Article
                  </Button>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <LiquidGlass 
                  key={challenge.id} 
                  variant="card" 
                  interactive 
                  floating 
                  liquidBorder 
                  className="p-6 cursor-pointer"
                  onClick={() => console.log("Viewing challenge:", challenge.id)}
                >
                  <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Sparkles className="w-6 h-6 text-crimson-wine" />
                  </div>
                  <h3 className="text-lg font-bold text-deep-charcoal mb-2">{challenge.title}</h3>
                  <p className="text-warm-gray mb-4">{challenge.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-warm-gray">Duration:</span>
                      <span className="font-medium text-deep-charcoal">{challenge.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-warm-gray">Participants:</span>
                      <span className="font-medium text-deep-charcoal">{challenge.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-warm-gray">Difficulty:</span>
                      <Badge variant="secondary" className="bg-muted-blush text-deep-charcoal">
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-splash-50 rounded-xl mb-4">
                    <div className="flex items-center gap-2 text-sm text-emerald-splash-700">
                      <Star className="w-4 h-4" />
                      <span>Reward: {challenge.reward}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full btn-primary-modern"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinChallenge(challenge.id);
                    }}
                  >
                    Join Challenge
                  </Button>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
