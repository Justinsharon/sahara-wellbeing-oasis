
import { useMockAuth } from "@/hooks/useMockAuth";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, loading } = useMockAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center sahara-gradient">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-center space-x-1">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
            <p className="text-muted-foreground font-medium">Loading your wellness space...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col sahara-gradient">
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 safe-area-top">
        <div className="glass-effect border-b border-white/20">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sahara
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">Wellness Companion</p>
              </div>
            </div>

            {/* Emergency SOS Button */}
            <Button
              asChild
              size="sm"
              className="emergency-btn"
            >
              <Link to="/emergency">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">SOS</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="animate-fade-in-up">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      {user && (
        <div className="safe-area-bottom">
          <MobileNav />
        </div>
      )}

      {/* Auth Overlay for non-authenticated users */}
      {!user && (
        <div className="fixed inset-0 z-40 glass-effect flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Sahara
            </h2>
            <p className="text-muted-foreground mb-8">
              Your personal wellness companion is here to support your mental health journey.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full btn-primary">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild className="w-full btn-secondary">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
