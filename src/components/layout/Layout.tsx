
import { AppSidebar } from "@/components/layout/AppSidebar";
import { FloatingChatButton } from "@/components/layout/FloatingChatButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { OnboardingGuard } from "@/components/layout/OnboardingGuard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <OnboardingGuard>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <MobileNav />
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
          <FloatingChatButton />
        </div>
      </SidebarProvider>
    </OnboardingGuard>
  );
}
