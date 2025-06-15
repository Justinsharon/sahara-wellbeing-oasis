
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCharacter } from "@/hooks/useCharacter";
import { Heart, Sparkles, User, ArrowRight } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { supabase } from "@/integrations/supabase/client";
import DashboardTherapyRecommendation from "@/pages/dashboard/DashboardTherapyRecommendation";
import DashboardSuggestionCards from "@/pages/dashboard/DashboardSuggestionCards";

// Main home/dashboard welcome page
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

  // Dashboard for logged-in users
  if (user && user.onboarding_completed) {
    return (
      <div className="min-h-screen wellness-gradient">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Dashboard Header - Consistent with Therapy Page */}
          <LiquidGlass variant="card" floating bubbles className="text-center p-8">
            <div className="w-16 h-16 bg-crimson-wine rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <User className="w-8 h-8 text-off-white" />
            </div>
            {/* Heading matches h1 (2xl, crimson-wine) on therapy page */}
            <h1 className="text-2xl font-bold text-crimson-wine mb-4 header-font">
              Welcome back, {user.full_name || user.email?.split("@")[0] || "Friend"}!
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Your Personalized Wellness Dashboard<br />
              <span className="font-semibold text-emerald-700">Curated care and resources just for you.</span>
            </p>
          </LiquidGlass>

          <div className="space-y-8">
            {/* Top Recommendation */}
            <DashboardTherapyRecommendation
              recommendations={therapyRecommendations}
              loading={loading}
              character={character}
            />
            {/* Suggestions as Cards */}
            <DashboardSuggestionCards
              user={user}
              therapyRecommendations={therapyRecommendations}
            />
          </div>
        </div>
      </div>
    );
  }

  // Main landing page (not authenticated)
  return (
    <div className="min-h-screen wellness-gradient flex items-center">
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
        <div className="max-w-2xl w-full">
          {/* Central liquid glass panel for home, styled like Therapy page */}
          <LiquidGlass
            variant="card"
            floating
            className="p-8 md:p-12 rounded-3xl shadow-2xl"
          >
            {/* Icon Header */}
            <div className="mb-8 relative flex flex-col items-center">
              <div className="w-20 h-20 bg-crimson-wine rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                <Heart className="w-10 h-10 text-off-white" />
                <div className="absolute -top-3 -right-6 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              {/* Main Title with matching typography from Therapy */}
              <h1 className="text-4xl font-bold mb-4 text-crimson-wine header-font">
                Welcome to Sahara
              </h1>
              {/* Subtitle under main title */}
              <p className="text-lg text-warm-gray mb-2 mt-2 max-w-xl">
                Your personal wellness companion is here to support your mental health journey.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-4 w-full max-w-sm mx-auto">
              {!user ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-crimson-wine hover:bg-crimson-wine/90 text-white text-lg py-6 rounded-2xl group shadow-xl border-2 border-white/20 transition-all duration-300 font-semibold"
                  >
                    <Link to="/auth" className="flex items-center justify-center gap-3">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full bg-white hover:bg-muted-blush text-crimson-wine border-2 border-gray-300 text-lg py-6 rounded-2xl transition-all duration-300 font-semibold shadow-lg"
                  >
                    <Link to="/auth">
                      Sign In
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-crimson-wine hover:bg-crimson-wine/90 text-white text-lg py-6 rounded-2xl group shadow-xl border-2 border-white/20 transition-all duration-300 font-semibold"
                  >
                    <Link to="/personal-growth" className="flex items-center justify-center gap-3">
                      Continue Your Journey
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full bg-white hover:bg-muted-blush text-crimson-wine border-2 border-gray-300 text-lg py-6 rounded-2xl transition-all duration-300 font-semibold shadow-lg"
                  >
                    <Link to="/personal-growth/unified-mood-journal">
                      Track Your Mood
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Trust indicators - same font/caps/color system */}
            <div className="mt-10 pt-8 border-t border-gray-200/50">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse"></div>
                  <span className="text-sm font-bold text-crimson-wine">Licensed Therapists</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-sm font-bold text-crimson-wine">24/7 Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-sm font-bold text-crimson-wine">Privacy Protected</span>
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
