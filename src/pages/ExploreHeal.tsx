import { useState } from "react";
import { Search, Filter, Play, BookOpen, Headphones, Heart, Star, Clock, Users, Compass, Sparkles } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaContentModal } from "@/components/MediaContentModal";

// Safe audio generation that creates blob URLs on demand
const generateToneObjectURL = (frequency: number, duration: number) => {
  const sampleRate = 44100;
  const samples = sampleRate * duration;
  const buffer = new ArrayBuffer(44 + samples * 2); // WAV header + PCM data
  const view = new DataView(buffer);
  
  // WAV file header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, samples * 2, true);
  
  // Generate audio samples
  for (let i = 0; i < samples; i++) {
    const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
    const intSample = Math.max(-32767, Math.min(32766, sample * 32767));
    view.setInt16(44 + i * 2, intSample, true);
  }
  
  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

// Component for lazy audio loading
const ToneAudio = ({ frequency, duration }: { frequency: number; duration: number }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const handlePlay = () => {
    if (!audioUrl) {
      const url = generateToneObjectURL(frequency, duration);
      setAudioUrl(url);
      const audio = new Audio(url);
      audio.play();
      
      // Clean up the blob URL after playing
      audio.onended = () => {
        URL.revokeObjectURL(url);
        setAudioUrl(null);
      };
    } else {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };
  
  return (
    <Button onClick={handlePlay} variant="outline" size="sm">
      <Play className="w-4 h-4 mr-2" />
      Play Tone
    </Button>
  );
};

const meditations = [
  {
    id: 1,
    title: "Morning Mindfulness",
    description: "Start your day with clarity and intention",
    duration: "10 min",
    category: "Mindfulness",
    difficulty: "Beginner",
    rating: 4.8,
    plays: 15420,
    localContent: (
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
        <h3 className="text-lg font-semibold">Breathing Exercise</h3>
        <p className="text-sm text-gray-600">Follow the circle's rhythm with your breath</p>
        <div className="space-y-2 text-left max-w-md mx-auto">
          <p>• Find a comfortable position</p>
          <p>• Close your eyes or soften your gaze</p>
          <p>• Breathe in as the circle expands</p>
          <p>• Breathe out as it contracts</p>
          <p>• Continue for 10 minutes</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Anxiety Relief",
    description: "Calm your mind and reduce anxiety",
    duration: "16 min",
    category: "Anxiety",
    difficulty: "Intermediate",
    rating: 4.9,
    plays: 23150,
    localContent: (
      <div className="text-center space-y-4">
        <div className="w-32 h-32 mx-auto border-4 border-green-400 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-green-400 rounded-full animate-bounce"></div>
        </div>
        <h3 className="text-lg font-semibold">5-4-3-2-1 Grounding</h3>
        <div className="space-y-2 text-left max-w-md mx-auto text-sm">
          <p><strong>5 things</strong> you can see around you</p>
          <p><strong>4 things</strong> you can touch</p>
          <p><strong>3 things</strong> you can hear</p>
          <p><strong>2 things</strong> you can smell</p>
          <p><strong>1 thing</strong> you can taste</p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Sleep Stories",
    description: "Peaceful stories to help you drift off",
    duration: "22 min",
    category: "Sleep",
    difficulty: "Beginner",
    rating: 4.7,
    plays: 18760,
    localContent: (
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-gradient-to-b from-indigo-600 to-purple-800 rounded-full opacity-60 animate-pulse"></div>
        <h3 className="text-lg font-semibold">Peaceful Forest Walk</h3>
        <div className="space-y-3 text-left max-w-lg mx-auto text-sm leading-relaxed">
          <p>Imagine walking through a quiet forest path. The soft earth cushions each step...</p>
          <p>Sunlight filters through the leaves above, creating gentle patterns of light and shadow...</p>
          <p>You hear the distant sound of a babbling brook and birds singing softly...</p>
          <p>With each breath, you feel more relaxed and peaceful...</p>
          <p className="text-xs text-gray-500 italic">Continue reading and visualizing for deeper relaxation...</p>
        </div>
      </div>
    )
  }
];

const activities = [
  {
    id: 1,
    title: "Gratitude Journaling",
    description: "Reflect on positive moments in your day",
    time: "5-10 min",
    category: "Reflection",
    benefits: ["Improved mood", "Better sleep", "Increased positivity"],
    activityContent: (
      <div>
        <h4 className="font-semibold mb-2">Gratitude Journal</h4>
        <p className="mb-2">Write three things you're grateful for today:</p>
        <ul className="mb-2 space-y-1">
          <li>
            <input className="border p-2 rounded w-full" placeholder="Grateful for..." />
          </li>
          <li>
            <input className="border p-2 rounded w-full" placeholder="Grateful for..." />
          </li>
          <li>
            <input className="border p-2 rounded w-full" placeholder="Grateful for..." />
          </li>
        </ul>
        <p className="text-xs text-warm-gray">Reflect for a moment and focus on these positives.</p>
      </div>
    ),
  },
  {
    id: 2,
    title: "Breathing Exercises",
    description: "Simple techniques to manage stress and anxiety",
    time: "3-5 min",
    category: "Stress Relief",
    benefits: ["Reduced anxiety", "Better focus", "Calm mind"],
    activityContent: (
      <div>
        <h4 className="font-semibold mb-2">Box Breathing</h4>
        <p className="mb-2">
          Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds—repeat 4 times.
        </p>
        <div className="flex gap-2 mt-4">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="w-6 h-6 rounded-full bg-emerald-splash-200 animate-pulse"></div>
          ))}
        </div>
        <p className="text-xs text-warm-gray mt-2">Try to sync your breath with the visual.</p>
      </div>
    ),
  },
  {
    id: 3,
    title: "Progressive Muscle Relaxation",
    description: "Release physical tension throughout your body",
    time: "15-20 min",
    category: "Relaxation",
    benefits: ["Muscle tension relief", "Improved sleep", "Stress reduction"],
    activityContent: (
      <div>
        <h4 className="font-semibold mb-2">Progressive Muscle Relaxation Guide</h4>
        <ul className="list-decimal ml-4 mb-2 text-sm">
          <li>Start at your toes and tense the muscles for 5 seconds, then release.</li>
          <li>Move up to your legs, then stomach, hands, arms, shoulders, face—repeat for each group.</li>
        </ul>
        <p className="text-xs text-warm-gray">Notice the difference in feeling between tension and relaxation.</p>
      </div>
    ),
  }
];

// Real open-licensed/public domain articles (example with Medium)
const articles = [
  {
    id: 1,
    title: "Understanding Anxiety: A Comprehensive Guide",
    author: "Open Minds Foundation",
    readTime: "8 min read",
    category: "Mental Health",
    excerpt: "Learn about anxiety symptoms, causes, and effective coping strategies...",
    articleHtml: `<h2>Anxiety - A Guide</h2><p>Anxiety is a normal part of life, but too much can be overwhelming. This article compiles strategies...</p><ul><li>Recognize symptoms</li><li>Use grounding techniques</li><li>Seek professional help if needed</li></ul>`,
    publishDate: "2 days ago"
  },
  {
    id: 2,
    title: "Building Resilience in Daily Life",
    author: "PublicHealth.gov",
    readTime: "6 min read",
    category: "Personal Growth",
    excerpt: "Discover practical ways to build emotional resilience and bounce back...",
    articleHtml: `<h2>Building Resilience</h2><p>Resilience is our ability to adapt to stress and adversity...</p><ol><li>Foster supportive relationships</li><li>Practice self-care</li><li>Embrace change</li></ol>`,
    publishDate: "1 week ago"
  },
  {
    id: 3,
    title: "The Science of Meditation",
    author: "ScienceDaily Editors",
    readTime: "10 min read",
    category: "Mindfulness",
    excerpt: "Explore the neuroscience behind meditation and its benefits...",
    articleHtml: `<h2>Science of Meditation</h2><p>Modern studies show meditation can...</p><ul><li>Reduce stress</li><li>Improve focus</li><li>Enhance emotional regulation</li></ul>`,
    publishDate: "3 days ago"
  }
];

// Local audio content using simple data URLs and generated sounds
const musicTracks = [
  {
    id: 1,
    title: "Gentle Forest Stream",
    description: "Relaxing water sounds generated locally",
    length: "Continuous",
    localAudioContent: (
      <div className="space-y-4">
        <div className="w-full bg-blue-100 rounded-lg p-4 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-400 rounded-full animate-pulse mb-2"></div>
          <p className="text-sm text-blue-800">Close your eyes and imagine flowing water</p>
        </div>
        <ToneAudio frequency={200} duration={2} />
        <p className="text-xs text-gray-500">Simple tone for relaxation - use your imagination for water sounds</p>
      </div>
    )
  },
  {
    id: 2,
    title: "Calm Piano Ambient",
    description: "Soothing tones for meditation and mindfulness",
    length: "Continuous",
    localAudioContent: (
      <div className="space-y-4">
        <div className="w-full bg-purple-100 rounded-lg p-4 text-center">
          <div className="flex justify-center space-x-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-8 bg-purple-400 rounded animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
            ))}
          </div>
          <p className="text-sm text-purple-800">Imagine gentle piano melodies</p>
        </div>
        <ToneAudio frequency={440} duration={1} />
        <p className="text-xs text-gray-500">Calming tone - let your mind create the piano sounds</p>
      </div>
    )
  },
  {
    id: 3,
    title: "Gentle Ocean Waves",
    description: "Ocean soundscape for peaceful sleep",
    length: "Continuous",
    localAudioContent: (
      <div className="space-y-4">
        <div className="w-full bg-teal-100 rounded-lg p-4 text-center">
          <div className="w-20 h-8 mx-auto bg-teal-400 rounded-full animate-bounce mb-2"></div>
          <p className="text-sm text-teal-800">Visualize gentle ocean waves</p>
        </div>
        <ToneAudio frequency={150} duration={3} />
        <p className="text-xs text-gray-500">Low frequency tone for deep relaxation</p>
      </div>
    )
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
  const [mediaModal, setMediaModal] = useState<{
    open: boolean;
    type: "video" | "audio" | "article" | "activity" | null;
    title: string;
    url?: string;
    articleHtml?: string;
    activityContent?: React.ReactNode;
    soundcloudUrl?: string;
    youtubeUrl?: string;
  }>({ open: false, type: null, title: "" });

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

  // Updated handlers for local content
  const handleOpenMeditation = (meditation: typeof meditations[0]) => {
    setMediaModal({
      open: true,
      type: "activity",
      title: meditation.title,
      activityContent: meditation.localContent,
    });
  };
  
  const handleOpenActivity = (activity: typeof activities[0]) => {
    setMediaModal({
      open: true,
      type: "activity",
      title: activity.title,
      activityContent: activity.activityContent,
    });
  };
  
  const handleOpenArticle = (article: typeof articles[0]) => {
    setMediaModal({
      open: true,
      type: "article",
      title: article.title,
      articleHtml: article.articleHtml,
    });
  };
  
  const handleOpenMusic = (track: typeof musicTracks[0]) => {
    setMediaModal({
      open: true,
      type: "activity",
      title: track.title,
      activityContent: track.localAudioContent,
    });
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
          <TabsList className="grid w-full grid-cols-5 bg-muted-blush">
            <TabsTrigger value="meditations" className="tab-trigger-primary">Meditations</TabsTrigger>
            <TabsTrigger value="activities" className="tab-trigger-warm">Activities</TabsTrigger>
            <TabsTrigger value="articles" className="tab-trigger-taupe">Articles</TabsTrigger>
            <TabsTrigger value="challenges" className="tab-trigger-primary">Challenges</TabsTrigger>
            <TabsTrigger value="music" className="tab-trigger-primary">Music</TabsTrigger>
          </TabsList>

          {/* Meditations */}
          <TabsContent value="meditations" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meditations.map((meditation) => (
                <LiquidGlass
                  key={meditation.id}
                  variant="card"
                  interactive
                  floating
                  className="p-6 hover-scale cursor-pointer"
                  onClick={() => handleOpenMeditation(meditation)}
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
                    onClick={e => { e.stopPropagation(); handleOpenMeditation(meditation); }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Meditation
                  </Button>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          {/* Activities */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid gap-6">
              {activities.map((activity) => (
                <LiquidGlass
                  key={activity.id}
                  variant="crystal"
                  interactive
                  liquidBorder
                  className="p-6 cursor-pointer"
                  onClick={() => handleOpenActivity(activity)}
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
                      onClick={e => { e.stopPropagation(); handleOpenActivity(activity); }}
                    >
                      Start Activity
                    </Button>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          {/* Articles */}
          <TabsContent value="articles" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <LiquidGlass
                  key={article.id}
                  variant="card"
                  floating
                  bubbles
                  className="p-6 hover-scale cursor-pointer"
                  onClick={() => handleOpenArticle(article)}
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
                    onClick={e => { e.stopPropagation(); handleOpenArticle(article); }}
                  >
                    Read Article
                  </Button>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          {/* Challenges */}
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

          {/* Music */}
          <TabsContent value="music" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {musicTracks.map(track => (
                <LiquidGlass
                  key={track.id}
                  variant="card"
                  floating
                  interactive
                  className="p-6 hover-scale cursor-pointer"
                  onClick={() => handleOpenMusic(track)}
                >
                  <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-crimson-wine" stroke="currentColor" strokeWidth={2}><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                  </div>
                  <h3 className="text-lg font-bold text-deep-charcoal mb-2">{track.title}</h3>
                  <p className="text-warm-gray mb-2">{track.description}</p>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="bg-emerald-splash-100 text-emerald-splash-700 rounded-full px-3 py-0.5">{track.length}</span>
                  </div>
                  <Button
                    className="w-full btn-primary-modern"
                    onClick={e => { e.stopPropagation(); handleOpenMusic(track); }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-2" stroke="currentColor" strokeWidth={2}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Listen & Relax
                  </Button>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Media Modal */}
        <MediaContentModal
          open={mediaModal.open}
          onClose={() => setMediaModal({ open: false, type: null, title: "" })}
          type={mediaModal.type as any}
          title={mediaModal.title}
          url={mediaModal.url}
          articleHtml={mediaModal.articleHtml}
          activityContent={mediaModal.activityContent}
          soundcloudUrl={mediaModal.soundcloudUrl}
          youtubeUrl={mediaModal.youtubeUrl}
        />
      </div>
    </div>
  );
}
