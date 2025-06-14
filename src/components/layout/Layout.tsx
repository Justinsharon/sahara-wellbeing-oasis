
import { useMockAuth } from "@/hooks/useMockAuth";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Menu, Heart, Home, User, Settings, HelpCircle, LogOut } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center modern-gradient">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
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
    <div className="min-h-screen flex flex-col modern-gradient">
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 safe-area-top">
        <div className="modern-glass border-b border-white/20">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center gap-3">
              {/* Hamburger Menu */}
              <Sheet open={sideMenuOpen} onOpenChange={setSideMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="modern-button-ghost">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 modern-glass border-r border-white/20">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h1 className="font-bold text-lg modern-text-gradient">Sahara</h1>
                          <p className="text-xs text-muted-foreground -mt-1">Wellness Companion</p>
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
                        className="flex items-center gap-3 p-3 rounded-2xl modern-nav-item"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    ))}
                    
                    <div className="pt-4 border-t border-white/20">
                      <button className="flex items-center gap-3 p-3 rounded-2xl modern-nav-item w-full text-left text-red-600">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Clickable Logo */}
              <Link to="/" className="flex items-center gap-3 modern-logo-hover">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg modern-text-gradient">Sahara</h1>
                  <p className="text-xs text-muted-foreground -mt-1">Wellness Companion</p>
                </div>
              </Link>
            </div>

            {/* Emergency SOS Button */}
            <Button
              asChild
              size="sm"
              className="modern-emergency-btn"
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
        <div className="fixed inset-0 z-40 modern-glass flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 text-center modern-shadow max-w-sm w-full animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3 modern-text-gradient">
              Welcome to Sahara
            </h2>
            <p className="text-muted-foreground mb-8">
              Your personal wellness companion is here to support your mental health journey.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full modern-btn-primary">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild className="w-full modern-btn-secondary">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
