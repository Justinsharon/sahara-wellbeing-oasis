
import { useState } from "react";
import { Phone, MessageCircle, AlertTriangle, Heart, MapPin, Clock, Shield, Headphones } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const emergencyContacts = [
  {
    id: 1,
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support and suicide prevention",
    type: "Crisis",
    availability: "24/7"
  },
  {
    id: 2,
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Free 24/7 crisis support via text",
    type: "Text Support",
    availability: "24/7"
  },
  {
    id: 3,
    name: "Emergency Services",
    number: "911",
    description: "Immediate emergency assistance",
    type: "Emergency",
    availability: "24/7"
  },
  {
    id: 4,
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Treatment referral and information service",
    type: "Information",
    availability: "24/7"
  }
];

const safetyTips = [
  {
    id: 1,
    title: "Grounding Technique (5-4-3-2-1)",
    description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
    category: "Anxiety",
    duration: "2-5 minutes"
  },
  {
    id: 2,
    title: "Box Breathing",
    description: "Breathe in for 4, hold for 4, breathe out for 4, hold for 4",
    category: "Panic",
    duration: "1-3 minutes"
  },
  {
    id: 3,
    title: "Progressive Muscle Relaxation",
    description: "Tense and release muscle groups starting from your toes",
    category: "Stress",
    duration: "10-15 minutes"
  },
  {
    id: 4,
    title: "Safe Space Visualization",
    description: "Imagine yourself in a place where you feel completely safe and calm",
    category: "Trauma",
    duration: "5-10 minutes"
  }
];

const warningSignsData = [
  {
    category: "Immediate Risk",
    signs: [
      "Thoughts of self-harm or suicide",
      "Severe panic attacks",
      "Complete loss of touch with reality",
      "Substance abuse crisis"
    ],
    action: "Call 911 or go to nearest emergency room",
    color: "bg-red-100 text-red-700 border-red-200"
  },
  {
    category: "Urgent Support Needed",
    signs: [
      "Persistent hopelessness",
      "Inability to function daily",
      "Severe anxiety or depression",
      "Social withdrawal"
    ],
    action: "Contact crisis helpline or mental health professional",
    color: "bg-orange-100 text-orange-700 border-orange-200"
  },
  {
    category: "Seek Professional Help",
    signs: [
      "Mood changes lasting weeks",
      "Sleep or appetite changes",
      "Difficulty concentrating",
      "Relationship problems"
    ],
    action: "Schedule appointment with therapist or counselor",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200"
  }
];

export default function Emergency() {
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Critical Alert Header */}
        <LiquidGlass variant="card" floating liquidBorder className="text-center p-8 border-red-200">
          <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-red-700 mb-4">Emergency Support</h1>
          <p className="text-lg text-red-600 max-w-2xl mx-auto mb-6">
            If you're in immediate danger or having thoughts of self-harm, please reach out for help immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4">
              <a href="tel:911">
                <Phone className="w-5 h-5 mr-2" />
                Call 911
              </a>
            </Button>
            <Button asChild variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 text-lg px-8 py-4">
              <a href="tel:988">
                <Phone className="w-5 h-5 mr-2" />
                Crisis Line 988
              </a>
            </Button>
          </div>
        </LiquidGlass>

        {/* Emergency Contacts */}
        <LiquidGlass variant="crystal" bubbles className="p-6">
          <h2 className="text-2xl font-bold text-crimson-wine mb-6 flex items-center gap-3">
            <Phone className="w-6 h-6" />
            Emergency Contacts
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <LiquidGlass 
                key={contact.id} 
                variant="card" 
                interactive 
                floating 
                className="p-6 hover-scale"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-deep-charcoal mb-2">{contact.name}</h3>
                    <p className="text-warm-gray mb-3">{contact.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-muted-blush text-deep-charcoal">
                        {contact.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-warm-gray">
                        <Clock className="w-4 h-4" />
                        <span>{contact.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-crimson-wine">{contact.number}</p>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 btn-primary-modern">
                      <a href={`tel:${contact.number.replace(/\D/g, '')}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                    {contact.type === "Text Support" && (
                      <Button asChild variant="outline" className="btn-secondary-modern">
                        <a href={`sms:${contact.number.match(/\d+/)?.[0]}`}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Text
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </LiquidGlass>
            ))}
          </div>
        </LiquidGlass>

        {/* Immediate Coping Strategies */}
        <LiquidGlass variant="card" floating className="p-6">
          <h2 className="text-2xl font-bold text-crimson-wine mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6" />
            Immediate Coping Strategies
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {safetyTips.map((tip) => (
              <LiquidGlass 
                key={tip.id} 
                variant="crystal" 
                interactive 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedTip === tip.id ? 'ring-2 ring-crimson-wine' : ''
                }`}
                onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-deep-charcoal">{tip.title}</h3>
                  <Badge variant="outline" className="bg-muted-blush text-deep-charcoal">
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-warm-gray mb-3">{tip.description}</p>
                <div className="flex items-center gap-2 text-sm text-warm-gray">
                  <Clock className="w-4 h-4" />
                  <span>{tip.duration}</span>
                </div>
                {selectedTip === tip.id && (
                  <div className="mt-4 p-4 bg-emerald-splash-50 rounded-xl">
                    <p className="text-sm text-emerald-splash-700 font-medium">
                      Take your time with this technique. Focus on each step and breathe slowly.
                    </p>
                  </div>
                )}
              </LiquidGlass>
            ))}
          </div>
        </LiquidGlass>

        {/* Warning Signs Guide */}
        <LiquidGlass variant="overlay" className="p-6">
          <h2 className="text-2xl font-bold text-crimson-wine mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6" />
            When to Seek Help
          </h2>
          <div className="space-y-4">
            {warningSignsData.map((category, index) => (
              <LiquidGlass 
                key={index} 
                variant="card" 
                className={`p-6 border-2 ${category.color}`}
              >
                <h3 className="text-lg font-bold mb-3">{category.category}</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-medium mb-2">Warning Signs:</p>
                    <ul className="space-y-1">
                      {category.signs.map((sign, signIndex) => (
                        <li key={signIndex} className="text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Recommended Action:</p>
                    <p className="text-sm">{category.action}</p>
                  </div>
                </div>
              </LiquidGlass>
            ))}
          </div>
        </LiquidGlass>

        {/* Additional Resources */}
        <LiquidGlass variant="crystal" liquidBorder className="p-6">
          <h2 className="text-2xl font-bold text-crimson-wine mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <LiquidGlass variant="card" floating className="p-6 text-center">
              <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-6 h-6 text-crimson-wine" />
              </div>
              <h3 className="font-bold text-deep-charcoal mb-2">Find Local Help</h3>
              <p className="text-sm text-warm-gray mb-4">Locate mental health services in your area</p>
              <Button className="btn-secondary-modern">Search Nearby</Button>
            </LiquidGlass>

            <LiquidGlass variant="card" floating className="p-6 text-center">
              <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Headphones className="w-6 h-6 text-crimson-wine" />
              </div>
              <h3 className="font-bold text-deep-charcoal mb-2">Chat with Nia</h3>
              <p className="text-sm text-warm-gray mb-4">Talk to our AI companion for immediate support</p>
              <Button className="btn-primary-modern">Start Chat</Button>
            </LiquidGlass>

            <LiquidGlass variant="card" floating className="p-6 text-center">
              <div className="w-12 h-12 bg-soft-taupe rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-6 h-6 text-crimson-wine" />
              </div>
              <h3 className="font-bold text-deep-charcoal mb-2">Safety Plan</h3>
              <p className="text-sm text-warm-gray mb-4">Create a personalized crisis plan</p>
              <Button className="btn-secondary-modern">Create Plan</Button>
            </LiquidGlass>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}
