
import { NavLink, useLocation } from "react-router-dom";
import { Heart, Users, TrendingUp, Sparkles, Home, Compass } from "lucide-react";

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
      {/* Floating navigation container with earthy palette */}
      <div className="mx-4 mb-4">
        <div className="enhanced-mobile-nav rounded-3xl p-2 shadow-2xl border border-soft-blush-100">
          <div className="grid grid-cols-6 gap-1">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className="group relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 touch-manipulation min-h-[64px]"
                aria-label={item.title}
              >
                {/* Active background pill with crimson wine */}
                {isActive(item.url) && (
                  <div className="absolute inset-1 rounded-2xl shadow-lg animate-scale-in"
                       style={{
                         background: `linear-gradient(135deg, 
                           hsl(var(--crimson-wine-500)) 0%, 
                           hsl(var(--crimson-wine-600)) 100%)`
                       }} />
                )}
                
                {/* Hover background with soft colors */}
                <div className="absolute inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{
                       background: `linear-gradient(135deg, 
                         hsl(var(--soft-blush-100)) 0%, 
                         hsl(var(--misty-rosewood-100)) 100%)`
                     }} />
                
                {/* Icon container */}
                <div className={`relative z-10 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                  isActive(item.url) 
                    ? "transform scale-110" 
                    : "group-hover:scale-105"
                }`}>
                  <item.icon className={`w-6 h-6 transition-colors duration-300 ${
                    isActive(item.url)
                      ? "text-white"
                      : "text-misty-rosewood-600 group-hover:text-emerald-splash-600"
                  }`} />
                </div>
                
                {/* Active indicator dot */}
                {isActive(item.url) && (
                  <div className="relative z-10 w-1 h-1 bg-white rounded-full mt-1 animate-scale-in" />
                )}
                
                {/* Tooltip on press/hover with earthy colors */}
                <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-xl text-xs font-medium text-white shadow-lg transition-all duration-300 pointer-events-none ${
                  isActive(item.url)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                }`}
                     style={{
                       background: isActive(item.url)
                         ? `linear-gradient(135deg, 
                             hsl(var(--crimson-wine-600)) 0%, 
                             hsl(var(--misty-rosewood-600)) 100%)`
                         : `linear-gradient(135deg, 
                             hsl(var(--misty-rosewood-600)) 0%, 
                             hsl(var(--deep-teal-600)) 100%)`
                     }}>
                  {item.title}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current" />
                </div>
                
                {/* Ripple effect with crimson wine */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-150"
                       style={{
                         backgroundColor: 'rgba(80, 17, 34, 0.2)'
                       }} />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
