
import { Heart } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center wellness-gradient">
      <div className="text-center animate-slide-up">
        <div className="w-20 h-20 rounded-3xl bg-crimson-wine flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float">
          <Heart className="w-10 h-10 text-off-white animate-pulse-slow" />
        </div>
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="skeleton-modern w-3 h-3 rounded-full"></div>
            <div className="skeleton-modern w-3 h-3 rounded-full"></div>
            <div className="skeleton-modern w-3 h-3 rounded-full"></div>
          </div>
          <p className="text-lg text-warm-gray font-semibold">Loading your wellness space...</p>
        </div>
      </div>
    </div>
  )
}
