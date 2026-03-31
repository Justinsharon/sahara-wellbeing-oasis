import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CharacterCreationPrompt() {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-40 glass-nav flex items-center justify-center p-6">
      <div className="glass-card rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full animate-scale-in">
        <div className="w-24 h-24 rounded-3xl bg-emerald-splash-500 flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Plus className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4 heading-gradient">
          Create Your Companion
        </h2>
        <p className="text-warm-gray mb-8 text-lg">
          Let's create a personalized companion to support you throughout your wellness journey.
        </p>
        <div className="space-y-4">
          <Button onClick={() => navigate('/character-creator')} className="btn-primary-modern w-full">
            Create My Companion
          </Button>
          <Button variant="outline" onClick={() => setDismissed(true)} className="btn-secondary-modern w-full">
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
}
