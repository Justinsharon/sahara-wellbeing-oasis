import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Settings,
  CreditCard,
  Phone,
  Heart,
  Users,
  TrendingUp,
  Search,
  MessageCircle,
  BarChart3,
  AlertTriangle
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useMockAuth } from "@/hooks/useMockAuth";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About Us", url: "/about", icon: Info },
  { title: "Solutions", url: "/solutions", icon: Settings },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
  { title: "Contact Us", url: "/contact", icon: Phone },
];

const featuresNavItems = [
  { title: "Therapy", url: "/therapy", icon: Heart },
  { title: "Community", url: "/community", icon: Users },
  { title: "Personal Growth", url: "/personal-growth", icon: TrendingUp },
  { title: "Explore & Heal", url: "/explore-heal", icon: Search },
  { title: "Chat with Nia", url: "/chat", icon: MessageCircle },
  { title: "My Insights", url: "/insights", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useMockAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-primary/10 text-primary font-medium"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          {state !== "collapsed" && (
            <div>
              <h2 className="text-xl font-bold text-primary">Sahara</h2>
              <p className="text-xs text-muted-foreground">Wellbeing Oasis</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="w-4 h-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Features</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {featuresNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className="w-4 h-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/emergency" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <AlertTriangle className="w-4 h-4" />
                    {state !== "collapsed" && <span>Emergency SOS</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.full_name?.charAt(0) || user.email?.charAt(0)}
              </span>
            </div>
            {state !== "collapsed" && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </div>
          {state !== "collapsed" && (
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="w-full"
            >
              Sign Out
            </Button>
          )}
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
