import { Link } from "react-router-dom";
import { Heart, Users, TrendingUp, Search, MessageCircle, BarChart3, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { LiquidGlassButton, LiquidGlassInput, LiquidGlassForm } from "@/components/ui/liquid-glass-form";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useState } from "react";
import { toast } from "sonner";

const featureCards = [
  {
    title: "Therapy Sessions",
    description: "Connect with certified therapists for personalized support",
    icon: Heart,
    href: "/therapy",
    bgColor: "bg-box-feature",
  },
  {
    title: "Community Support",
    description: "Join a supportive community of peers on similar journeys",
    icon: Users,
    href: "/community",
    bgColor: "bg-box-feature",
  },
  {
    title: "Personal Growth",
    description: "Set goals, track progress, and celebrate achievements",
    icon: TrendingUp,
    href: "/personal-growth",
    bgColor: "bg-box-feature",
  },
  {
    title: "Explore & Heal",
    description: "Discover wellness activities, articles, and healing resources",
    icon: Search,
    href: "/explore-heal",
    bgColor: "bg-box-feature",
  },
  {
    title: "Chat with Nia",
    description: "24/7 AI-powered support for immediate guidance",
    icon: MessageCircle,
    href: "/chat",
    bgColor: "bg-box-feature",
  },
  {
    title: "My Daily Insights",
    description: "Track your mood, view analytics, and get personalized insights",
    icon: BarChart3,
    href: "/insights",
    bgColor: "bg-box-feature",
  },
];

const stats = [
  { label: "Licensed Therapists", value: "500+", icon: Shield },
  { label: "Support Available", value: "24/7", icon: Clock },
  { label: "Success Stories", value: "10k+", icon: Award },
];

export default function Index() {
  const { user } = useMockAuth();
  const [moodInput, setMoodInput] = useState("");

  const handleWellnessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!moodInput.trim()) {
      toast.error("Please share how you're feeling");
      return;
    }
    
    toast.success(user ? `Thanks for checking in, ${user.full_name}!` : "Thanks for checking in!");
    setMoodInput("");
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Enhanced Hero Section with Liquid Glass */}
      <section className="mb-12">
        <LiquidGlass 
          variant="card" 
          floating 
          bubbles 
          className="text-center max-w-4xl mx-auto p-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-crimson-wine">
            <span className="heading-gradient">
              Welcome to Your Wellness Oasis
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-warm-gray">
            Sahara provides a safe, supportive space for your mental health journey. 
            Connect with licensed therapists, build healthy habits, and find your path to wellbeing.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LiquidGlassButton size="lg" asChild>
                <Link to="/auth/signup">Start Your Journey</Link>
              </LiquidGlassButton>
              <LiquidGlassButton variant="ghost" size="lg" asChild>
                <Link to="/auth/signin">Welcome Back</Link>
              </LiquidGlassButton>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LiquidGlassButton size="lg" asChild>
                <Link to="/therapy">Book a Session</Link>
              </LiquidGlassButton>
              <LiquidGlassButton variant="ghost" size="lg" asChild>
                <Link to="/chat">Chat with Nia</Link>
              </LiquidGlassButton>
            </div>
          )}
        </LiquidGlass>
      </section>

      {/* Enhanced Stats Section with Crystal Glass */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <LiquidGlass 
              key={index} 
              variant="crystal" 
              interactive 
              floating 
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-crimson-wine flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-off-white" />
              </div>
              <div className="text-3xl font-bold mb-2 text-deep-charcoal">{stat.value}</div>
              <div className="text-warm-gray">{stat.label}</div>
            </LiquidGlass>
          ))}
        </div>
      </section>

      {/* Feature Cards with Liquid Glass Effects */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-crimson-wine">Comprehensive Wellness Support</h2>
          <p className="max-w-2xl mx-auto text-warm-gray">
            Every tool you need for your mental health journey, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featureCards.map((card, index) => (
            <Link key={index} to={user ? card.href : "/auth/signup"} className="group">
              <LiquidGlass 
                variant="card" 
                interactive 
                floating 
                bubbles={index % 2 === 0}
                liquidBorder={index % 3 === 0}
                className="h-full p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-crimson-wine flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <card.icon className="w-6 h-6 text-off-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-deep-charcoal">{card.title}</h3>
                <p className="text-warm-gray">{card.description}</p>
              </LiquidGlass>
            </Link>
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section with Frosted Glass */}
      <section className="text-center py-12">
        <LiquidGlass variant="overlay" floating bubbles className="max-w-2xl mx-auto p-8">
          <h3 className="text-2xl font-bold mb-4 text-deep-charcoal">
            Ready to Begin Your Healing Journey?
          </h3>
          <p className="text-warm-gray mb-6">
            Join thousands who have found support, growth, and healing through Sahara.
          </p>
          {!user ? (
            <LiquidGlassButton size="lg" asChild>
              <Link to="/auth/signup">Get Started Today</Link>
            </LiquidGlassButton>
          ) : (
            <LiquidGlassButton variant="ghost" size="lg" asChild>
              <Link to="/personal-growth">Continue Your Growth</Link>
            </LiquidGlassButton>
          )}
        </LiquidGlass>
      </section>

      {/* Personalized Liquid Glass Form */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4 text-crimson-wine">Experience Liquid Glass Design</h2>
        </div>
        
        <LiquidGlassForm 
          title={user ? `Hi ${user.full_name}, Quick Wellness Check-in` : "Quick Wellness Check-in"}
          description={user ? "How are you feeling today?" : "Try our liquid glass form elements"}
          className="max-w-sm"
          onSubmit={handleWellnessSubmit}
        >
          {!user && (
            <LiquidGlassInput 
              label="Your Name" 
              placeholder="Enter your name"
            />
          )}
          <LiquidGlassInput 
            label={user ? "Share your current mood" : "How are you feeling today?"} 
            placeholder={user ? "I'm feeling..." : "Share your mood"}
            value={moodInput}
            onChange={(e) => setMoodInput(e.target.value)}
          />
          <LiquidGlassButton type="submit" className="w-full">
            {user ? "Submit Check-in" : "Try Demo"}
          </LiquidGlassButton>
        </LiquidGlassForm>
      </section>
    </div>
  );
}
