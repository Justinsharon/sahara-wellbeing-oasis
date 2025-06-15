
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import PersonalGrowthRoutes from "@/routes/personalGrowthRoutes";
import AuthPage from "@/pages/auth/AuthPage";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import OnboardingAssessment from "@/pages/OnboardingAssessment";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy-loaded pages
const Therapy = lazy(() => import("@/pages/Therapy"));
const Community = lazy(() => import("@/pages/Community"));
const ExploreHeal = lazy(() => import("@/pages/ExploreHeal"));
const Insights = lazy(() => import("@/pages/Insights"));
const Emergency = lazy(() => import("@/pages/Emergency"));
const Chat = lazy(() => import("@/pages/Chat"));
const CharacterCreator = lazy(() => import("@/pages/CharacterCreator"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function AppRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Auth routes outside layout */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        {/* Onboarding routes - outside of Layout */}
        <Route path="/character-creator" element={<CharacterCreator />} />
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
  );
}
