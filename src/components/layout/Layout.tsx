
import { useAuth } from "@/hooks/useAuth";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center sahara-gradient">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full sahara-gradient">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div className="md:hidden flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">S</span>
                  </div>
                  <span className="font-bold text-primary">Sahara</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  asChild
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Link to="/emergency">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Emergency SOS</span>
                    <span className="sm:hidden">SOS</span>
                  </Link>
                </Button>
                
                {!user && (
                  <div className="hidden sm:flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/auth/signin">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/auth/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Mobile Navigation */}
          {user && <MobileNav />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
