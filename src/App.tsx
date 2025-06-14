
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockAuthProvider } from "@/hooks/useMockAuth";
import { CharacterProvider } from "@/hooks/useCharacter";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import CharacterCreator from "./pages/CharacterCreator";
import PersonalGrowth from "./pages/PersonalGrowth";
import Goals from "./pages/personal-growth/Goals";
import MoodJournal from "./pages/personal-growth/MoodJournal";
import EnhancedMoodJournal from "./pages/personal-growth/EnhancedMoodJournal";
import Emergency from "./pages/Emergency";
import Chat from "./pages/Chat";
import Therapy from "./pages/Therapy";
import Insights from "./pages/Insights";
import Community from "./pages/Community";
import ExploreHeal from "./pages/ExploreHeal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MockAuthProvider>
      <CharacterProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth routes without layout */}
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/signin" element={<SignIn />} />
              
              {/* Character creation route */}
              <Route path="/create-character" element={<CharacterCreator />} />
              
              {/* Emergency route without sidebar for urgency */}
              <Route path="/emergency" element={<Emergency />} />
              
              {/* Main app routes with layout */}
              <Route path="/" element={<Layout><Index /></Layout>} />
              
              {/* Personal Growth routes */}
              <Route path="/personal-growth" element={<Layout><PersonalGrowth /></Layout>} />
              <Route path="/personal-growth/goals" element={<Layout><Goals /></Layout>} />
              <Route path="/personal-growth/mood-journal" element={<Layout><MoodJournal /></Layout>} />
              <Route path="/personal-growth/enhanced-mood-journal" element={<Layout><EnhancedMoodJournal /></Layout>} />
              
              {/* Feature routes */}
              <Route path="/chat" element={<Layout><Chat /></Layout>} />
              <Route path="/therapy" element={<Layout><Therapy /></Layout>} />
              <Route path="/insights" element={<Layout><Insights /></Layout>} />
              <Route path="/community" element={<Layout><Community /></Layout>} />
              <Route path="/explore-heal" element={<Layout><ExploreHeal /></Layout>} />
              
              {/* Placeholder routes for future implementation */}
              <Route path="/about" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">About Us - Coming Soon</h1></div></Layout>} />
              <Route path="/solutions" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Solutions - Coming Soon</h1></div></Layout>} />
              <Route path="/subscriptions" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Subscriptions - Coming Soon</h1></div></Layout>} />
              <Route path="/contact" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Contact Us - Coming Soon</h1></div></Layout>} />
              <Route path="/terms" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Terms & Conditions - Coming Soon</h1></div></Layout>} />
              <Route path="/privacy" element={<Layout><div className="p-8"><h1 className="text-2xl font-bold">Privacy Policy - Coming Soon</h1></div></Layout>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CharacterProvider>
    </MockAuthProvider>
  </QueryClientProvider>
);

export default App;
