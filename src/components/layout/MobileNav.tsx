
import { NavLink, useLocation } from "react-router-dom";
import { Heart, Users, TrendingUp, Sparkles, Home, Compass } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const mobileNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Therapy", url: "/therapy", icon: Heart },
  { title: "Community", url: "/community", icon: Users },
  { title: "Growth", url: "/personal-growth", icon: TrendingUp },
  { title: "Insights", url: "/insights", icon: Sparkles },
  { title: "Explore", url: "/explore-heal", icon: Compass },
];

export function MobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      {/* Enhanced Liquid Glass Navigation Container */}
      <div className="mx-4 mb-4">
        <LiquidGlass 
          variant="card" 
          floating 
          bubbles 
          liquidBorder 
          className="p-2 shadow-2xl"
        >
          <div className="grid grid-cols-6 gap-1">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className="group relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 touch-manipulation min-h-[64px] liquid-ripple glass-distortion"
                aria-label={item.title}
              >
                {/* Active background with liquid glass effect */}
                {isActive(item.url) && (
                  <LiquidGlass 
                    variant="crystal" 
                    className="absolute inset-1 bg-crimson-wine rounded-2xl shadow-lg animate-scale-in" 
                  />
                )}
                
                {/* Hover background with frosted glass */}
                <LiquidGlass 
                  variant="overlay" 
                  className="absolute inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                />
                
                {/* Icon container with enhanced effects */}
                <div className={`relative z-10 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                  isActive(item.url) 
                    ? "transform scale-110" 
                    : "group-hover:scale-105"
                }`}>
                  <item.icon className={`w-6 h-6 transition-colors duration-300 ${
                    isActive(item.url)
                      ? "text-off-white"
                      : "text-warm-gray group-hover:text-crimson-wine"
                  }`} />
                </div>
                
                {/* Active indicator with crystal glass effect */}
                {isActive(item.url) && (
                  <div className="relative z-10 w-1 h-1 bg-off-white rounded-full mt-1 animate-scale-in crystal-glass-element" />
                )}
                
                {/* Enhanced tooltip with liquid glass */}
                <LiquidGlass 
                  variant="crystal"
                  className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-xl text-xs font-medium shadow-lg transition-all duration-300 pointer-events-none ${
                    isActive(item.url)
                      ? "opacity-100 scale-100 bg-crimson-wine text-off-white"
                      : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 bg-warm-gray text-off-white"
                  }`}
                >
                  {item.title}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current" />
                </LiquidGlass>
                
                {/* Enhanced ripple effect with liquid glass styling */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-150 bg-crimson-wine opacity-20 liquid-glass-card" />
                </div>
              </NavLink>
            ))}
          </div>
        </LiquidGlass>
      </div>
    </nav>
  );
}
