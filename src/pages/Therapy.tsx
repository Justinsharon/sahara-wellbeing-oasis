
import { useState } from "react";
import { Heart, Brain, MessageCircle, Calendar, Clock, Star, User, Phone, Video, ChevronRight } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Anxiety & Depression",
    rating: 4.9,
    experience: "8 years",
    image: "/placeholder.svg",
    nextAvailable: "Today 2:00 PM",
    price: "$120/session"
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    specialty: "Relationship Counseling",
    rating: 4.8,
    experience: "12 years",
    image: "/placeholder.svg",
    nextAvailable: "Tomorrow 10:00 AM",
    price: "$150/session"
  },
  {
    id: 3,
    name: "Dr. Emma Thompson",
    specialty: "Trauma & PTSD",
    rating: 4.9,
    experience: "15 years",
    image: "/placeholder.svg",
    nextAvailable: "Today 4:30 PM",
    price: "$180/session"
  }
];

const sessionTypes = [
  {
    type: "Individual Therapy",
    description: "One-on-one sessions with a licensed therapist",
    duration: "50 minutes",
    icon: User,
    price: "From $120"
  },
  {
    type: "Couples Therapy",
    description: "Relationship counseling for couples",
    duration: "60 minutes",
    icon: Heart,
    price: "From $180"
  },
  {
    type: "Group Therapy",
    description: "Supportive group sessions with peers",
    duration: "90 minutes",
    icon: MessageCircle,
    price: "From $60"
  }
];

export default function Therapy() {
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <LiquidGlass variant="card" floating bubbles className="text-center p-8">
          <div className="w-16 h-16 bg-crimson-wine rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Brain className="w-8 h-8 text-off-white" />
          </div>
          <h1 className="text-4xl font-bold heading-gradient mb-4">Professional Therapy</h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Connect with licensed therapists who understand your journey and provide personalized care.
          </p>
        </LiquidGlass>

        {/* Session Types */}
        <LiquidGlass variant="crystal" liquidBorder className="p-6">
          <h2 className="text-2xl font-bold text-crimson-wine mb-6">Choose Your Session Type</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sessionTypes.map((session, index) => (
              <LiquidGlass 
                key={index} 
                variant="card" 
                interactive 
                floating 
                className="p-6 hover-scale transition-all duration-300"
              >
                <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <session.icon className="w-6 h-6 text-crimson-wine" />
                </div>
                <h3 className="text-xl font-bold text-deep-charcoal mb-2">{session.type}</h3>
                <p className="text-warm-gray mb-4">{session.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-muted-blush text-deep-charcoal">
                    {session.duration}
                  </Badge>
                  <span className="font-bold text-crimson-wine">{session.price}</span>
                </div>
              </LiquidGlass>
            ))}
          </div>
        </LiquidGlass>

        {/* Therapist Directory */}
        <LiquidGlass variant="card" bubbles className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-crimson-wine">Available Therapists</h2>
            <Button className="btn-secondary-modern">
              <Calendar className="w-4 h-4 mr-2" />
              View Schedule
            </Button>
          </div>

          <div className="space-y-4">
            {therapists.map((therapist) => (
              <LiquidGlass 
                key={therapist.id} 
                variant="crystal" 
                interactive 
                floating 
                liquidBorder 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedTherapist === therapist.id ? 'ring-2 ring-crimson-wine' : ''
                }`}
                onClick={() => setSelectedTherapist(therapist.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-soft-taupe rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-crimson-wine" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-deep-charcoal">{therapist.name}</h3>
                      <p className="text-warm-gray">{therapist.specialty}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{therapist.rating}</span>
                        </div>
                        <span className="text-sm text-warm-gray">{therapist.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-crimson-wine">{therapist.price}</p>
                    <p className="text-sm text-warm-gray mb-2">{therapist.nextAvailable}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="btn-secondary-modern">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="btn-secondary-modern">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="btn-primary-modern">
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            ))}
          </div>
        </LiquidGlass>

        {/* Quick Actions */}
        <LiquidGlass variant="overlay" floating className="p-6">
          <h2 className="text-2xl font-bold text-crimson-wine mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <LiquidGlass variant="card" interactive className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-deep-charcoal">Emergency Support</h3>
                  <p className="text-sm text-warm-gray">24/7 crisis intervention</p>
                </div>
                <ChevronRight className="w-5 h-5 text-crimson-wine" />
              </div>
            </LiquidGlass>
            <LiquidGlass variant="card" interactive className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-deep-charcoal">Self-Help Resources</h3>
                  <p className="text-sm text-warm-gray">Guided exercises and tools</p>
                </div>
                <ChevronRight className="w-5 h-5 text-crimson-wine" />
              </div>
            </LiquidGlass>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}
