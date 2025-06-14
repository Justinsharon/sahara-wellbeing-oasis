
import { NavLink, useLocation } from "react-router-dom";
import { Heart, Users, TrendingUp, Search, MessageCircle, BarChart3 } from "lucide-react";

const mobileNavItems = [
  { title: "Therapy", url: "/therapy", icon: Heart },
  { title: "Community", url: "/community", icon: Users },
  { title: "Growth", url: "/personal-growth", icon: TrendingUp },
  { title: "Explore", url: "/explore-heal", icon: Search },
  { title: "Chat", url: "/chat", icon: MessageCircle },
  { title: "Insights", url: "/insights", icon: BarChart3 },
];

export function MobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="glass-effect border-t border-white/20 shadow-2xl">
      <div className="grid grid-cols-6 gap-1 p-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`mobile-nav-item touch-manipulation ${
              isActive(item.url) ? "active" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-200 ${
              isActive(item.url) 
                ? "bg-gradient-to-t from-purple-500 to-pink-500 text-white shadow-lg" 
                : "hover:bg-white/50"
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-medium mt-1 ${
              isActive(item.url) ? "text-primary font-semibold" : ""
            }`}>
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
