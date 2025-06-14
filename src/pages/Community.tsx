
import { useState } from "react";
import { Users, MessageCircle, Calendar, Heart, Plus, Search, Filter, Sparkles, MapPin } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const supportGroups = [
  {
    id: 1,
    name: "Anxiety Support Circle",
    description: "A safe space to share experiences and coping strategies for anxiety",
    members: 124,
    isOnline: true,
    nextMeeting: "Today 7:00 PM",
    category: "Mental Health"
  },
  {
    id: 2,
    name: "Depression Recovery Group",
    description: "Supporting each other through the journey of depression recovery",
    members: 89,
    isOnline: false,
    nextMeeting: "Tomorrow 6:00 PM",
    category: "Mental Health"
  },
  {
    id: 3,
    name: "Mindfulness & Meditation",
    description: "Explore mindfulness practices and meditation techniques together",
    members: 156,
    isOnline: true,
    nextMeeting: "Wed 8:00 AM",
    category: "Wellness"
  }
];

const discussions = [
  {
    id: 1,
    title: "How do you handle overwhelming days?",
    author: "Sarah M.",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    category: "Coping Strategies"
  },
  {
    id: 2,
    title: "Celebrating small wins - what's yours today?",
    author: "Mike K.",
    replies: 18,
    likes: 62,
    timeAgo: "4 hours ago",
    category: "Positivity"
  },
  {
    id: 3,
    title: "Meditation apps that actually work?",
    author: "Emma L.",
    replies: 31,
    likes: 28,
    timeAgo: "6 hours ago",
    category: "Resources"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Wellness Workshop",
    date: "Today",
    time: "3:00 PM",
    attendees: 45,
    type: "Workshop"
  },
  {
    id: 2,
    title: "Group Meditation Session",
    date: "Tomorrow",
    time: "7:00 AM",
    attendees: 23,
    type: "Meditation"
  },
  {
    id: 3,
    title: "Mental Health Awareness Talk",
    date: "Friday",
    time: "6:00 PM",
    attendees: 78,
    type: "Talk"
  }
];

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <LiquidGlass variant="card" floating bubbles className="text-center p-8">
          <div className="w-16 h-16 bg-crimson-wine rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Users className="w-8 h-8 text-off-white" />
          </div>
          <h1 className="text-4xl font-bold heading-gradient mb-4">Community Support</h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Connect with others who understand your journey. Share experiences, find support, and grow together.
          </p>
        </LiquidGlass>

        {/* Search and Filters */}
        <LiquidGlass variant="crystal" className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-warm-gray" />
              <Input
                placeholder="Search groups, discussions, or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-input"
              />
            </div>
            <Button variant="outline" className="btn-secondary-modern">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button className="btn-primary-modern">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
        </LiquidGlass>

        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted-blush">
            <TabsTrigger value="groups" className="tab-trigger-primary">Support Groups</TabsTrigger>
            <TabsTrigger value="discussions" className="tab-trigger-warm">Discussions</TabsTrigger>
            <TabsTrigger value="events" className="tab-trigger-taupe">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-6">
            <div className="grid gap-6">
              {supportGroups.map((group) => (
                <LiquidGlass 
                  key={group.id} 
                  variant="card" 
                  interactive 
                  floating 
                  liquidBorder 
                  className="p-6 hover-scale"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-deep-charcoal">{group.name}</h3>
                        <Badge variant={group.isOnline ? "default" : "secondary"} className="bg-emerald-splash-100 text-emerald-splash-700">
                          {group.isOnline ? "Online" : "In-Person"}
                        </Badge>
                      </div>
                      <p className="text-warm-gray mb-4">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-warm-gray">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Next: {group.nextMeeting}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="btn-primary-modern">Join Group</Button>
                      <Button variant="outline" size="sm" className="btn-secondary-modern">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="grid gap-4">
              {discussions.map((discussion) => (
                <LiquidGlass 
                  key={discussion.id} 
                  variant="crystal" 
                  interactive 
                  className="p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-deep-charcoal mb-2">{discussion.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-warm-gray mb-3">
                        <span>by {discussion.author}</span>
                        <span>{discussion.timeAgo}</span>
                        <Badge variant="outline" className="bg-muted-blush text-deep-charcoal">
                          {discussion.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-crimson-wine">
                          <MessageCircle className="w-4 h-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1 text-crimson-wine">
                          <Heart className="w-4 h-4" />
                          <span>{discussion.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <LiquidGlass 
                  key={event.id} 
                  variant="card" 
                  floating 
                  bubbles 
                  className="p-6"
                >
                  <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Sparkles className="w-6 h-6 text-crimson-wine" />
                  </div>
                  <h3 className="text-lg font-bold text-deep-charcoal mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-warm-gray mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-muted-blush text-deep-charcoal mb-4">
                    {event.type}
                  </Badge>
                  <Button className="w-full btn-primary-modern">Join Event</Button>
                </LiquidGlass>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
