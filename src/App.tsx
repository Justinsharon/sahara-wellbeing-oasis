import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CharacterProvider } from "@/hooks/useCharacter";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import PersonalGrowthRoutes from "@/routes/personalGrowthRoutes";
import AuthPage from "@/pages/auth/AuthPage";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import OnboardingAssessment from "@/pages/OnboardingAssessment";

// ErrorBoundary class component
class LegacyErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You could log the error and errorInfo here if needed
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="max-w-sm w-full bg-white rounded-lg shadow p-6 text-center">
            <h1 className="text-xl font-bold text-red-600 mb-2">
              Something went wrong
            </h1>
            <p className="mb-4">{this.state.error.message}</p>
            <button
              className="btn btn-primary-modern"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Helper functional ErrorBoundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <LegacyErrorBoundary>{children}</LegacyErrorBoundary>;
}

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
            <CharacterProvider>
              <ErrorBoundary>
                <Routes>
                  {/* Auth routes outside layout */}
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                  <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                  {/* IMPORTANT: ResetPassword route now outside Layout */}
                  <Route path="/auth/reset-password" element={<ResetPassword />} />

                  {/* Onboarding routes - outside of Layout */}
                  <Route path="/character-creator" element={<CharacterCreator />} />
                  {/* Add alias route for create-character for prompt compatibility */}
                  <Route path="/create-character" element={<CharacterCreator />} />
                  
                  <Route path="/onboarding-assessment" element={<OnboardingAssessment />} />

                  {/* Main app routes - inside Layout */}
                  <Route
                    path="/*"
                    element={
                      <Layout>
                        <Suspense
                          fallback={
                            <div className="flex items-center justify-center min-h-[400px]">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                          }
                        >
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/therapy/*" element={<Therapy />} />
                            <Route path="/community/*" element={<Community />} />
                            <Route path="/explore-heal/*" element={<ExploreHeal />} />
                            <Route path="/insights/*" element={<Insights />} />
                            <Route path="/emergency/*" element={<Emergency />} />
                            <Route path="/chat/*" element={<Chat />} />
                            <Route path="/personal-growth/*" element={<PersonalGrowthRoutes />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Suspense>
                      </Layout>
                    }
                  />
                </Routes>
              </ErrorBoundary>
            </CharacterProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
