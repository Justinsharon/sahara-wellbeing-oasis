
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Heart, Users, TrendingUp, Sparkles, AlertTriangle, MessageCircle } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Heart,
      title: "Therapy & Counseling",
      description: "Connect with licensed therapists for personalized support and guidance on your mental health journey.",
      link: "/therapy",
      linkText: "Explore Therapy Options"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join supportive communities and connect with others on similar wellness and recovery journeys.",
      link: "/community",
      linkText: "Find Your Community"
    },
    {
      icon: TrendingUp,
      title: "Personal Growth",
      description: "Track your progress with mood journaling, goal setting, and personal development tools.",
      link: "/personal-growth",
      linkText: "Start Growing"
    },
    {
      icon: Sparkles,
      title: "Insights & Education",
      description: "Access articles, guides, and educational content on mental health and wellness topics.",
      link: "/insights",
      linkText: "Gain Valuable Insights"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Support",
      description: "Get immediate access to crisis hotlines and emergency mental health resources.",
      link: "/emergency",
      linkText: "Find Emergency Support"
    },
    {
      icon: MessageCircle,
      title: "AI Chatbot",
      description: "Chat with our AI companion for instant support, guidance, and personalized wellness tips.",
      link: "/chat",
      linkText: "Start Chatting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Welcome to <span className="text-primary">Sahara</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your personal wellness and mental health companion - a safe oasis for healing, growth, and connection
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/personal-growth">Explore Features</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link to="/personal-growth">Continue Your Journey</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/personal-growth/unified-mood-journal">Track Your Mood</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-800 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 mb-6 leading-relaxed">
                  {feature.description}
                </CardDescription>
                <Link 
                  to={feature.link} 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300 group-hover:underline"
                >
                  {feature.linkText}
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-white/20">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to begin your wellness journey?
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Join thousands of others who have found support, healing, and growth with Sahara.
            </p>
            {!user && (
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link to="/auth">Start Your Journey Today</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
