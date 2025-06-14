
import { NavLink, useLocation } from "react-router-dom";
import { Heart, Users, TrendingUp, BarChart3, Home, Sparkles, Compass } from "lucide-react";

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
    <nav className="enhanced-mobile-nav safe-area-bottom">
      <div className="grid grid-cols-6 gap-0.5 p-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`nav-item-enhanced touch-manipulation ${
              isActive(item.url) ? "active" : ""
            }`}
          >
            <div className={`nav-icon-container ${
              isActive(item.url) 
                ? "active-icon" 
                : "inactive-icon"
            }`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={`nav-label ${
              isActive(item.url) ? "active-label" : "inactive-label"
            }`}>
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
