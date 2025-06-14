
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border/40">
      <div className="grid grid-cols-6 gap-1 p-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
              isActive(item.url)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
