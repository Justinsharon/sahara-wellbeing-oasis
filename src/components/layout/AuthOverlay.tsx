
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function AuthOverlay() {
  return (
    <div className="fixed inset-0 z-40 glass-nav flex items-center justify-center p-6">
      <div className="glass-card rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full animate-scale-in">
        <div className="w-24 h-24 rounded-3xl bg-crimson-wine flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Heart className="w-12 h-12 text-off-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4 heading-gradient">
          Welcome to Sahara
        </h2>
        <p className="text-warm-gray mb-8 text-lg">
          Your personal wellness companion is here to support your mental health journey.
        </p>
        <div className="space-y-4">
          <Button asChild className="btn-primary-modern w-full">
            <Link to="/auth">Get Started</Link>
          </Button>
          <Button variant="outline" asChild className="btn-secondary-modern w-full">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
