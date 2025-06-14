
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockAuthProvider } from "@/hooks/useMockAuth";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import PersonalGrowth from "./pages/PersonalGrowth";
import Goals from "./pages/personal-growth/Goals";
import MoodJournal from "./pages/personal-growth/MoodJournal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MockAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes without layout */}
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signin" element={<SignIn />} />
            
            {/* Main app routes with layout */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            
            {/* Personal Growth routes */}
            <Route path="/personal-growth" element={<Layout><PersonalGrowth /></Layout>} />
            <Route path="/personal-growth/goals" element={<Layout><Goals /></Layout>} />
            <Route path="/personal-growth/mood-journal" element={<Layout><MoodJournal /></Layout>} />
            
            {/* Placeholder routes for future implementation */}
            <Route path="/about" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">About Us - Coming Soon</h1></div></Layout>} />
            <Route path="/solutions" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Solutions - Coming Soon</h1></div></Layout>} />
            <Route path="/subscriptions" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Subscriptions - Coming Soon</h1></div></Layout>} />
            <Route path="/contact" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Contact Us - Coming Soon</h1></div></Layout>} />
            <Route path="/therapy" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Therapy - Coming Soon</h1></div></Layout>} />
            <Route path="/community" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Community - Coming Soon</h1></div></Layout>} />
            <Route path="/explore-heal" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Explore & Heal - Coming Soon</h1></div></Layout>} />
            <Route path="/chat" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Chat with Nia - Coming Soon</h1></div></Layout>} />
            <Route path="/insights" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">My Insights - Coming Soon</h1></div></Layout>} />
            <Route path="/emergency" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-red-600">Emergency Support - Coming Soon</h1></div></Layout>} />
            <Route path="/terms" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Terms & Conditions - Coming Soon</h1></div></Layout>} />
            <Route path="/privacy" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Privacy Policy - Coming Soon</h1></div></Layout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MockAuthProvider>
  </QueryClientProvider>
);

export default App;
