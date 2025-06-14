
import { Route } from "react-router-dom";
import EnhancedMoodJournal from "@/pages/personal-growth/EnhancedMoodJournal";
import MoodJournal from "@/pages/personal-growth/MoodJournal";
import Goals from "@/pages/personal-growth/Goals";

export const personalGrowthRoutes = [
  <Route key="enhanced-mood-journal" path="/personal-growth/enhanced-mood-journal" element={<EnhancedMoodJournal />} />,
  <Route key="mood-journal" path="/personal-growth/mood-journal" element={<MoodJournal />} />,
  <Route key="goals" path="/personal-growth/goals" element={<Goals />} />,
];
