
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Calendar, 
  Star, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Award,
  Clock,
  Eye,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const supportGroups = [
  {
    id: 1,
    name: "Anxiety Support Circle",
    description: "A safe space to share experiences and coping strategies for anxiety.",
    members: 234,
    category: "Mental Health",
    isJoined: true,
    lastActivity: "2 hours ago",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Meditation & Mindfulness",
    description: "Daily meditation practices and mindfulness techniques.",
    members: 189,
    category: "Wellness",
    isJoined: false,
    lastActivity: "4 hours ago",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Self-Care Warriors",
    description: "Sharing self-care tips and celebrating small victories.",
    members: 156,
    category: "Self-Care",
    isJoined: true,
    lastActivity: "1 hour ago",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
  }
];

const discussionTopics = [
  {
    id: 1,
    title: "How do you deal with overwhelming feelings?",
    author: "Sarah M.",
    category: "Anxiety",
    replies: 24,
    likes: 45,
    timeAgo: "3 hours ago",
    isHot: true
  },
  {
    id: 2,
    title: "Morning routine that changed my life",
    author: "Alex K.",
    category: "Self-Care",
    replies: 18,
    likes: 62,
    timeAgo: "5 hours ago",
    isHot: false
  },
  {
    id: 3,
    title: "Meditation apps that actually work",
    author: "Jamie L.",
    category: "Wellness",
    replies: 31,
    likes: 38,
    timeAgo: "8 hours ago",
    isHot: true
  }
];

const successStories = [
  {
    id: 1,
    title: "6 months anxiety-free milestone!",
    author: "Anonymous",
    content: "Today marks 6 months since my last panic attack. The journey wasn't easy, but with therapy, meditation, and this amazing community...",
    likes: 89,
    comments: 23,
    timeAgo: "2 days ago",
    badge: "6 Month Milestone"
  },
  {
    id: 2,
    title: "Found my passion for art therapy",
    author: "Creative Soul",
    content: "Art therapy has become my sanctuary. Sharing some of my recent work and how it's helped me process emotions...",
    likes: 67,
    comments: 15,
    timeAgo: "1 day ago",
    badge: "Creative Achievement"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Group Meditation",
    date: "Today, 7:00 PM",
    attendees: 45,
    type: "Meditation"
  },
  {
    id: 2,
    title: "Anxiety Management Workshop",
    date: "Tomorrow, 2:00 PM",
    attendees: 23,
    type: "Workshop"
  },
  {
    id: 3,
    title: "Art Therapy Session",
    date: "Friday, 6:30 PM",
    attendees: 18,
    type: "Therapy"
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("groups");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold heading-gradient mb-2">
              Community
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect, share, and grow together on your wellness journey
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button className="btn-primary-modern">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
            <Button variant="outline" className="btn-secondary-modern">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search groups, discussions, or people..."
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
          <TabsTrigger value="groups" className="tab-modern">
            <Users className="w-4 h-4 mr-2" />
            Groups
          </TabsTrigger>
          <TabsTrigger value="discussions" className="tab-modern">
            <MessageCircle className="w-4 h-4 mr-2" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="stories" className="tab-modern">
            <Star className="w-4 h-4 mr-2" />
            Stories
          </TabsTrigger>
          <TabsTrigger value="events" className="tab-modern">
            <Calendar className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
        </TabsList>

        {/* Support Groups Tab */}
        <TabsContent value="groups" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportGroups.map((group) => (
              <Card key={group.id} className="glass-card hover-scale soft-shadow">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-t-xl flex items-center justify-center">
                    <Users className="w-12 h-12 text-white opacity-80" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30">
                    {group.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {group.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {group.members} members
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {group.lastActivity}
                    </div>
                  </div>

                  <Button 
                    className={group.isJoined ? "btn-secondary-modern w-full" : "btn-primary-modern w-full"}
                    variant={group.isJoined ? "outline" : "default"}
                  >
                    {group.isJoined ? "Joined" : "Join Group"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="animate-fade-in">
          <div className="space-y-4">
            {discussionTopics.map((topic) => (
              <Card key={topic.id} className="glass-card hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                          {topic.title}
                        </h3>
                        {topic.isHot && (
                          <Badge className="bg-red-100 text-red-600 border-red-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>by {topic.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {topic.category}
                        </Badge>
                        <span>{topic.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">{topic.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{topic.likes} likes</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-white/60">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Success Stories Tab */}
        <TabsContent value="stories" className="animate-fade-in">
          <div className="space-y-6">
            {successStories.map((story) => (
              <Card key={story.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                        {story.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{story.author}</h3>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <Award className="w-3 h-3 mr-1" />
                          {story.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{story.timeAgo}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3">{story.title}</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {story.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{story.comments}</span>
                      </button>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-white/60">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="glass-card hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{event.date}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {event.attendees} attending
                    </div>
                    <Button size="sm" className="btn-primary-modern">
                      Join Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
