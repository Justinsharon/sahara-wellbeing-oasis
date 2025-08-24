import { useAuth } from "@/hooks/useAuth";
import { useCharacter } from "@/hooks/useCharacter";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { MobileNav } from "./MobileNav";
import { FloatingChatButton } from "./FloatingChatButton";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Menu, Heart, LogOut, Plus } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Refactored components/constants
import { sideMenuItems } from "@/constants/navigation";
import { CharacterCreationPrompt } from "./CharacterCreationPrompt";
import { AuthOverlay } from "./AuthOverlay";
import { LoadingScreen } from "@/components/common/LoadingScreen";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, loading, signOut } = useAuth();
  const { character, hasCharacter } = useCharacter();
  const navigate = useNavigate();
  const location = useLocation();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Only prompt for character creation if user is logged in,
  // hasn't completed onboarding (i.e. assessment), and has no character.
  const shouldShowCharacterPrompt =
    user && !user.onboarding_completed && !hasCharacter && !loading;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col wellness-gradient">
      {/* Enhanced Mobile-First Header with character integration */}
      <header className="sticky top-0 z-50 safe-area-top">
        <div className="glass-nav border-b border-white/20">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center gap-3">
              {/* Enhanced Hamburger Menu with Character */}
              <Sheet open={sideMenuOpen} onOpenChange={setSideMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="neo-button rounded-2xl">
                    <Menu className="w-5 h-5 text-off-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 glass-nav border-r border-white/20">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-3">
                        {character ? (
                          <CharacterAvatar 
                            character={character} 
                            size="lg"
                            expression={{ type: 'happy', intensity: 'medium' }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-crimson-wine flex items-center justify-center shadow-xl">
                            <Heart className="w-6 h-6 text-off-white" />
                          </div>
                        )}
                        <div>
                          <h1 className="font-bold text-xl heading-gradient">
                            {character ? `${character.name}` : 'Sahara'}
                          </h1>
                          <p className="text-sm text-warm-gray -mt-1">
                            {character ? 'Your Wellness Companion' : 'Wellness Companion'}
                          </p>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <nav className="space-y-2">
                    {!character && user && (
                      <Link
                        to="/character-creator"
                        onClick={() => setSideMenuOpen(false)}
                        className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 bg-emerald-splash-100 border border-emerald-splash-200"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-emerald-splash-500 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-emerald-splash-700">Create Your Companion</span>
                      </Link>
                    )}

                    {sideMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.url}
                        onClick={() => setSideMenuOpen(false)}
                        className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-muted-blush"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-soft-taupe flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-crimson-wine" />
                        </div>
                        <span className="font-semibold text-deep-charcoal">{item.title}</span>
                      </Link>
                    ))}
                    
                    {user && (
                      <div className="pt-4 border-t border-white/30">
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 w-full text-left text-red-600 hover:bg-red-50"
                        >
                          <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center">
                            <LogOut className="w-5 h-5" />
                          </div>
                          <span className="font-semibold">Sign Out</span>
                        </button>
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>

              <Link to="/" className="flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95">
                {character ? (
                  <CharacterAvatar 
                    character={character} 
                    size="lg"
                    expression={{ type: 'happy', intensity: 'medium' }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-crimson-wine flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-off-white" />
                  </div>
                )}
                <div>
                  <h1 className="font-bold text-xl heading-gradient">Sahara</h1>
                  <p className="text-xs text-warm-gray -mt-1">Wellness Companion</p>
                </div>
              </Link>
            </div>

            <Button
              asChild
              size="sm"
              className="rounded-2xl px-6 py-3 font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 bg-red-600 hover:bg-red-700 text-white"
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
      <main className="flex-1 relative pb-24">
        <div className="animate-slide-up">
          {children}
        </div>
      </main>

      {/* Enhanced Mobile Navigation */}
      {user && <MobileNav />}

      {/* Floating Nia Chat Button */}
      {user && <FloatingChatButton />}

      {/* Character Creation Prompt */}
      {shouldShowCharacterPrompt && <CharacterCreationPrompt />}

      {/* Enhanced Auth Overlay - only show on home page */}
      {!user && location.pathname === "/" && <AuthOverlay />}
    </div>
  );
}
