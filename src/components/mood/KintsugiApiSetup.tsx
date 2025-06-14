
import { useState } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { CheckCircle, Waves, Cpu, Shield } from "lucide-react";

interface LocalAiSetupProps {
  onComplete?: () => void;
}

export function LocalAiSetup({ onComplete }: LocalAiSetupProps) {
  const [isReady, setIsReady] = useState(true);

  const handleGetStarted = () => {
    onComplete?.();
  };

  return (
    <LiquidGlass variant="card" className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-emerald-splash-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold heading-gradient">Local AI Voice Analysis</h3>
          <p className="text-sm text-misty-rosewood-500">
            Advanced mood detection powered by local AI processing
          </p>
        </div>

        <LiquidGlass variant="crystal" className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-splash-500" />
              <div className="text-sm">
                <p className="font-medium text-emerald-splash-700">Privacy Protected</p>
                <p className="text-misty-rosewood-600">All processing happens locally</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-deep-teal-500" />
              <div className="text-sm">
                <p className="font-medium text-deep-teal-700">AI-Powered Analysis</p>
                <p className="text-misty-rosewood-600">Analyzes pitch, energy, and speech patterns</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-soft-blush-600" />
              <div className="text-sm">
                <p className="font-medium text-soft-blush-700">No API Keys Needed</p>
                <p className="text-misty-rosewood-600">Works completely offline</p>
              </div>
            </div>
          </div>
        </LiquidGlass>

        <div className="text-center">
          <Button
            onClick={handleGetStarted}
            className="liquid-glass-button w-full"
          >
            Get Started with Voice Analysis
          </Button>
          <p className="text-xs text-misty-rosewood-400 mt-2">
            Ready to use - no setup required!
          </p>
        </div>
      </div>
    </LiquidGlass>
  );
}
