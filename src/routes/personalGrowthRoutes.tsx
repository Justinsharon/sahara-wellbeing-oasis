
import { Routes, Route } from "react-router-dom";
import PersonalGrowth from "@/pages/PersonalGrowth";
import Goals from "@/pages/personal-growth/Goals";
import MoodJournal from "@/pages/personal-growth/MoodJournal";
import EnhancedMoodJournal from "@/pages/personal-growth/EnhancedMoodJournal";
import UnifiedMoodJournal from "@/pages/personal-growth/UnifiedMoodJournal";
import AuthPage from "@/pages/auth/AuthPage";

const PersonalGrowthRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PersonalGrowth />} />
      <Route path="goals" element={<Goals />} />
      <Route path="mood-journal" element={<MoodJournal />} />
      <Route path="enhanced-mood-journal" element={<EnhancedMoodJournal />} />
      <Route path="unified-mood-journal" element={<UnifiedMoodJournal />} />
      <Route path="auth" element={<AuthPage />} />
    </Routes>
  );
};

export default PersonalGrowthRoutes;
