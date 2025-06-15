import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCharacter } from "@/hooks/useCharacter";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { supabase } from "@/integrations/supabase/client";
import DashboardTherapyRecommendation from "@/pages/dashboard/DashboardTherapyRecommendation";
import DashboardSuggestionCards from "@/pages/dashboard/DashboardSuggestionCards";

const Index = () => {
  const { user } = useAuth();
  const { character } = useCharacter();
  const [therapyRecommendations, setTherapyRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapyRecommendations = async () => {
      if (user && user.onboarding_completed) {
        const { data, error } = await supabase
          .from("therapy_recommendations")
          .select("*")
          .eq("user_id", user.id)
          .order("confidence_score", { ascending: false });
        if (!error && data) {
          setTherapyRecommendations(data);
        }
      }
      setLoading(false);
    };
    fetchTherapyRecommendations();
  }, [user]);

  // Personalized Dashboard
  if (user && user.onboarding_completed) {
    return (
      <div className="min-h-screen wellness-gradient px-3 pb-6">
        <div className="container mx-auto max-w-3xl pt-8 pb-8">
          {/* Greeting + Top Recommendation */}
          <div className="mb-5">
            <span className="font-semibold text-base text-gray-600">Welcome back, {user.full_name || user.email?.split("@")[0] || "Friend"}!</span>
            <h1 className="text-3xl font-bold mt-1 mb-2 text-black">Your Personalized Wellness Dashboard</h1>
            <p className="text-muted-foreground">Curated care and resources <span className="font-semibold text-emerald-700">just for you</span>.</p>
          </div>

          <div className="mb-8">
            <DashboardTherapyRecommendation 
              recommendations={therapyRecommendations} 
              loading={loading}
              character={character}
            />
          </div>
          <div className="mb-8">
            <DashboardSuggestionCards
              user={user}
              therapyRecommendations={therapyRecommendations}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Liquid Glass Background with Better Opacity */}
      <div className="absolute inset-0 min-h-screen bg-gradient-to-br from-crimson-wine/20 via-soft-taupe/30 to-warm-gray/25 backdrop-blur-3xl">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-crimson-wine/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-soft-taupe/25 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-warm-gray/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Main Content with Enhanced Contrast */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Liquid Glass Container - Wrapping all content */}
          <LiquidGlass 
            variant="card" 
            interactive
            floating
            className="p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl border-2 border-white/30 bg-white/95 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
          >
            {/* Hero Icon */}
            <div className="mb-8 relative">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br from-crimson-wine to-crimson-wine/80 flex items-center justify-center shadow-2xl relative animate-scale-in">
                <Heart className="w-12 h-12 md:w-16 md:h-16 text-white animate-pulse-slow" />
                <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Title with maximum contrast */}
              <div className="space-y-6">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
                  Welcome to Sahara
                </h1>
                
                {/* Main Tagline with White Text */}
                <div className="bg-white/98 backdrop-blur-sm rounded-2xl p-6 shadow-inner border border-gray-200/50">
                  <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-semibold">
                    Your personal wellness companion is here to support your mental health journey
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                {!user ? (
                  <div className="space-y-4">
                    {/* Get Started Button */}
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full max-w-sm mx-auto bg-crimson-wine hover:bg-crimson-wine/90 text-white text-lg py-6 rounded-2xl group shadow-xl border-2 border-white/20 transition-all duration-300 font-semibold"
                    >
                      <Link to="/auth" className="flex items-center justify-center gap-3">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    
                    {/* Sign In Button */}
                    <Button 
                      variant="outline" 
                      size="lg" 
                      asChild 
                      className="w-full max-w-sm mx-auto bg-white/90 hover:bg-white text-black border-2 border-gray-300 text-lg py-6 rounded-2xl transition-all duration-300 font-semibold shadow-lg"
                    >
                      <Link to="/auth">
                        Sign In
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Continue Journey Button */}
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full max-w-sm mx-auto bg-crimson-wine hover:bg-crimson-wine/90 text-white text-lg py-6 rounded-2xl group shadow-xl border-2 border-white/20 transition-all duration-300 font-semibold"
                    >
                      <Link to="/personal-growth" className="flex items-center justify-center gap-3">
                        Continue Your Journey
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    
                    {/* Track Mood Button */}
                    <Button 
                      variant="outline" 
                      size="lg" 
                      asChild 
                      className="w-full max-w-sm mx-auto bg-white/90 hover:bg-white text-black border-2 border-gray-300 text-lg py-6 rounded-2xl transition-all duration-300 font-semibold shadow-lg"
                    >
                      <Link to="/personal-growth/unified-mood-journal">
                        Track Your Mood
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* Trust indicators */}
              <div className="mt-8 pt-8 border-t border-gray-200/50">
                <div className="flex flex-wrap items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse"></div>
                    <span className="text-sm font-bold text-black">Licensed Therapists</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-sm font-bold text-black">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-sm font-bold text-black">Privacy Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
};

export default Index;
