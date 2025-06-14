
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen wellness-gradient relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-crimson-wine/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-soft-taupe/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-warm-gray/15 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero Icon */}
          <div className="mb-12 relative">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-crimson-wine to-warm-gray flex items-center justify-center shadow-2xl relative animate-scale-in">
              <Heart className="w-16 h-16 text-off-white animate-pulse-slow" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="heading-xl text-center">
              Welcome to Sahara
            </h1>
            
            <p className="text-xl md:text-2xl text-warm-gray leading-relaxed font-medium">
              Your personal wellness companion is here to support your mental health journey
            </p>

            <div className="pt-8">
              {!user ? (
                <div className="space-y-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full max-w-sm mx-auto btn-primary-modern text-lg py-6 rounded-2xl group"
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
                    className="w-full max-w-sm mx-auto btn-secondary-modern text-lg py-6 rounded-2xl block"
                  >
                    <Link to="/auth">
                      Sign In
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full max-w-sm mx-auto btn-primary-modern text-lg py-6 rounded-2xl group"
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
                    className="w-full max-w-sm mx-auto btn-secondary-modern text-lg py-6 rounded-2xl block"
                  >
                    <Link to="/personal-growth/unified-mood-journal">
                      Track Your Mood
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-12 border-t border-warm-gray/20">
            <div className="flex flex-wrap items-center justify-center gap-8 text-warm-gray">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm font-medium">Licensed Therapists</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm font-medium">Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
