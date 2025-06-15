
import { Heart } from "lucide-react";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { LiquidGlass } from "@/components/ui/liquid-glass";

interface DashboardTherapyRecommendationProps {
  recommendations: any[];
  loading: boolean;
  character?: any;
}

export default function DashboardTherapyRecommendation({
  recommendations,
  loading,
  character,
}: DashboardTherapyRecommendationProps) {
  if (loading) {
    return (
      <LiquidGlass
        variant="card"
        interactive
        floating
        className="w-full py-8 flex justify-center items-center gap-2 hover-scale transition-all duration-300"
      >
        <Heart className="w-8 h-8 text-crimson-wine animate-pulse" />
        <span className="ml-2 text-gray-500 font-medium">Loading your recommended approach...</span>
      </LiquidGlass>
    );
  }
  if (!recommendations?.length) {
    return (
      <LiquidGlass
        variant="card"
        interactive
        floating
        className="w-full rounded-2xl p-5 text-center hover-scale transition-all duration-300"
      >
        <span className="font-semibold text-emerald-700">No personalized approach found.</span>
        <div className="text-gray-500 mt-2">
          After you complete your assessment, your best-fit therapeutic approach will appear here.
        </div>
      </LiquidGlass>
    );
  }

  const topRec = recommendations[0];

  return (
    <LiquidGlass
      variant="card"
      interactive
      floating
      className="w-full rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6 hover-scale transition-all duration-300"
    >
      {character && (
        <CharacterAvatar character={character} size="lg" className="mx-auto md:mx-0" />
      )}
      <div className="flex-1">
        <p className="uppercase tracking-wide text-xs text-gray-500 font-bold mb-2">
          Preferred Therapeutic Approach
        </p>
        <h2 className="text-2xl font-bold text-crimson-wine mb-2">{topRec.title}</h2>
        <span className="inline-block font-semibold text-emerald-700 mb-1">
          Confidence: {topRec.confidence_score}%
        </span>
        <p className="text-gray-700 mb-2">{topRec.reasoning}</p>
        <p className="text-base text-gray-600">{topRec.description}</p>
      </div>
    </LiquidGlass>
  );
}

