
import { useMockAuth } from "@/hooks/useMockAuth";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Menu, Heart, Home, User, Settings, HelpCircle, LogOut, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const sideMenuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
];

export function Layout({ children }: LayoutProps) {
  const { user, loading } = useMockAuth();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center wellness-gradient">
        <div className="text-center animate-slide-up">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float">
            <Heart className="w-10 h-10 text-white animate-pulse-slow" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              <div className="skeleton-modern w-3 h-3 rounded-full"></div>
              <div className="skeleton-modern w-3 h-3 rounded-full"></div>
              <div className="skeleton-modern w-3 h-3 rounded-full"></div>
            </div>
            <p className="text-lg text-muted-foreground font-semibold">Loading your wellness space...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col wellness-gradient">
      {/* Enhanced Mobile-First Header */}
      <header className="sticky top-0 z-50 safe-area-top">
        <div className="glass-nav border-b border-white/20">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center gap-3">
              {/* Enhanced Hamburger Menu */}
              <Sheet open={sideMenuOpen} onOpenChange={setSideMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="neo-button rounded-2xl">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 glass-nav border-r border-white/20">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h1 className="font-bold text-xl heading-gradient">Sahara</h1>
                          <p className="text-sm text-muted-foreground -mt-1">Wellness Companion</p>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <nav className="space-y-2">
                    {sideMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.url}
                        onClick={() => setSideMenuOpen(false)}
                        className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:bg-white/60 hover:scale-105 active:scale-95"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="font-semibold text-gray-700">{item.title}</span>
                      </Link>
                    ))}
                    
                    <div className="pt-4 border-t border-white/30">
                      <button className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:bg-red-50 hover:scale-105 active:scale-95 w-full text-left text-red-600">
                        <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center">
                          <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">Sign Out</span>
                      </button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Enhanced Clickable Logo */}
              <Link to="/" className="flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl heading-gradient">Sahara</h1>
                  <p className="text-xs text-muted-foreground -mt-1">Wellness Companion</p>
                </div>
              </Link>
            </div>

            {/* Enhanced Emergency SOS Button */}
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl px-6 py-3 font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Link to="/emergency">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="text-sm font-bold">SOS</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="animate-slide-up">
          {children}
        </div>
      </main>

      {/* Enhanced Mobile Navigation */}
      {user && (
        <div className="safe-area-bottom">
          <MobileNav />
        </div>
      )}

      {/* Enhanced Auth Overlay */}
      {!user && (
        <div className="fixed inset-0 z-40 glass-nav flex items-center justify-center p-6">
          <div className="glass-card rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full animate-scale-in">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 heading-gradient">
              Welcome to Sahara
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Your personal wellness companion is here to support your mental health journey.
            </p>
            <div className="space-y-4">
              <Button asChild className="btn-primary-modern w-full">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild className="btn-secondary-modern w-full">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
