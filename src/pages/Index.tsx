import { Link } from "react-router-dom";
import { Heart, Users, TrendingUp, Search, MessageCircle, BarChart3, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMockAuth } from "@/hooks/useMockAuth";

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

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center max-w-4xl mx-auto">
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
              <Button size="lg" className="btn-primary-modern rounded-xl" asChild>
                <Link to="/auth/signup">Start Your Journey</Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary-modern rounded-xl" asChild>
                <Link to="/auth/signin">Welcome Back</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary-modern rounded-xl" asChild>
                <Link to="/therapy">Book a Session</Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-accent-modern rounded-xl" asChild>
                <Link to="/chat">Chat with Nia</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center soft-shadow border-0 glass-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-crimson-wine flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-off-white" />
                </div>
                <div className="text-3xl font-bold mb-2 text-deep-charcoal">{stat.value}</div>
                <div className="text-warm-gray">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
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
              <Card className="card-hover soft-shadow border-0 h-full glass-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-crimson-wine flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <card.icon className="w-6 h-6 text-off-white" />
                  </div>
                  <CardTitle className="text-xl text-deep-charcoal">{card.title}</CardTitle>
                  <CardDescription className="text-warm-gray">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <Card className="max-w-2xl mx-auto soft-shadow border-0 bg-box-feature">
          <CardContent className="pt-8">
            <h3 className="text-2xl font-bold mb-4 text-deep-charcoal">
              Ready to Begin Your Healing Journey?
            </h3>
            <p className="text-warm-gray mb-6">
              Join thousands who have found support, growth, and healing through Sahara.
            </p>
            {!user ? (
              <Button size="lg" className="btn-primary-modern rounded-xl" asChild>
                <Link to="/auth/signup">Get Started Today</Link>
              </Button>
            ) : (
              <Button size="lg" className="btn-accent-modern rounded-xl" asChild>
                <Link to="/personal-growth">Continue Your Growth</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
