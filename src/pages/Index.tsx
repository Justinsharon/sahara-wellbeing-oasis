
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const Index = () => {
  const { user } = useAuth();

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
          {/* Hero Icon */}
          <div className="mb-12 relative">
            <LiquidGlass 
              variant="crystal" 
              floating 
              bubbles
              className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl relative animate-scale-in"
            >
              <Heart className="w-16 h-16 text-crimson-wine animate-pulse-slow" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </LiquidGlass>
          </div>

          {/* Hero Content with Enhanced Liquid Glass */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-crimson-wine header-font">
              Welcome to Sahara
            </h1>
            
            {/* Main Tagline Card - Enhanced Liquid Glass */}
            <LiquidGlass 
              variant="card" 
              interactive
              liquidBorder
              className="p-8 rounded-3xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
            >
              <p className="text-xl md:text-2xl text-deep-charcoal leading-relaxed font-semibold">
                Your personal wellness companion is here to support your mental health journey
              </p>
            </LiquidGlass>

            <div className="pt-8">
              {!user ? (
                <div className="space-y-4">
                  <LiquidGlass 
                    variant="button" 
                    interactive 
                    className="w-full max-w-sm mx-auto block"
                  >
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full bg-crimson-wine hover:bg-crimson-wine/90 text-white text-lg py-6 rounded-2xl group shadow-xl border-2 border-white/20 transition-all duration-300"
                    >
                      <Link to="/auth" className="flex items-center justify-center gap-3">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </LiquidGlass>
                  
                  <LiquidGlass 
                    variant="crystal" 
                    interactive 
                    className="w-full max-w-sm mx-auto block"
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      asChild 
                      className="w-full bg-white/80 backdrop-blur-sm hover:bg-white/90 text-deep-charcoal border-2 border-crimson-wine/30 text-lg py-6 rounded-2xl shadow-lg transition-all duration-300"
                    >
                      <Link to="/auth">
                        Sign In
                      </Link>
                    </Button>
                  </LiquidGlass>
                </div>
              ) : (
                <div className="space-y-4">
                  <LiquidGlass 
                    variant="button" 
                    interactive 
                    className="w-full max-w-sm mx-auto block"
                  >
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full bg-crimson-wine hover:bg-crimson-wine/90 text-white text-lg py-6 rounded-2xl group shadow-xl border-2 border-white/20 transition-all duration-300"
                    >
                      <Link to="/personal-growth" className="flex items-center justify-center gap-3">
                        Continue Your Journey
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </LiquidGlass>
                  
                  <LiquidGlass 
                    variant="crystal" 
                    interactive 
                    className="w-full max-w-sm mx-auto block"
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      asChild 
                      className="w-full bg-white/80 backdrop-blur-sm hover:bg-white/90 text-deep-charcoal border-2 border-crimson-wine/30 text-lg py-6 rounded-2xl shadow-lg transition-all duration-300"
                    >
                      <Link to="/personal-growth/unified-mood-journal">
                        Track Your Mood
                      </Link>
                    </Button>
                  </LiquidGlass>
                </div>
              )}
            </div>
          </div>

          {/* Trust indicators with enhanced liquid glass */}
          <div className="mt-16 pt-12 border-t border-white/30">
            <LiquidGlass 
              variant="overlay" 
              bubbles
              className="p-8 rounded-3xl transform transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse"></div>
                  <span className="text-sm font-semibold text-deep-charcoal">Licensed Therapists</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-sm font-semibold text-deep-charcoal">24/7 Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-sm font-semibold text-deep-charcoal">Privacy Protected</span>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
