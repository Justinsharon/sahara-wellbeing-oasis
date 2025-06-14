import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import PersonalGrowthRoutes from "@/routes/personalGrowthRoutes";
import AuthPage from "@/pages/auth/AuthPage";

const Therapy = lazy(() => import("@/pages/Therapy"));
const Community = lazy(() => import("@/pages/Community"));
const ExploreHeal = lazy(() => import("@/pages/ExploreHeal"));
const Insights = lazy(() => import("@/pages/Insights"));
const Emergency = lazy(() => import("@/pages/Emergency"));
const Chat = lazy(() => import("@/pages/Chat"));
const CharacterCreator = lazy(() => import("@/pages/CharacterCreator"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/*"
                element={
                  <Layout>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/therapy/*" element={<Therapy />} />
                        <Route path="/community/*" element={<Community />} />
                        <Route path="/explore-heal/*" element={<ExploreHeal />} />
                        <Route path="/insights/*" element={<Insights />} />
                        <Route path="/emergency/*" element={<Emergency />} />
                        <Route path="/chat/*" element={<Chat />} />
                        <Route path="/character-creator/*" element={<CharacterCreator />} />
                        <Route path="/personal-growth/*" element={<PersonalGrowthRoutes />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </Layout>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
