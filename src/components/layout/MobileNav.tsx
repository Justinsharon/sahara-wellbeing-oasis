
import { NavLink, useLocation } from "react-router-dom";
import { Heart, Users, TrendingUp, Search, MessageCircle, BarChart3, Home } from "lucide-react";

const mobileNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Therapy", url: "/therapy", icon: Heart },
  { title: "Community", url: "/community", icon: Users },
  { title: "Growth", url: "/personal-growth", icon: TrendingUp },
  { title: "Chat", url: "/chat", icon: MessageCircle },
  { title: "Insights", url: "/insights", icon: BarChart3 },
];

export function MobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="modern-glass border-t border-white/20 modern-shadow">
      <div className="grid grid-cols-6 gap-1 p-3">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`modern-nav-item touch-manipulation ${
              isActive(item.url) ? "active" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className={`p-3 rounded-2xl transition-all duration-300 ${
              isActive(item.url) 
                ? "bg-gradient-to-t from-emerald-500 to-teal-600 text-white modern-shadow-active scale-105" 
                : "hover:bg-white/50 hover:scale-105"
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-medium mt-1 transition-all duration-200 ${
              isActive(item.url) ? "text-emerald-600 font-semibold" : ""
            }`}>
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
