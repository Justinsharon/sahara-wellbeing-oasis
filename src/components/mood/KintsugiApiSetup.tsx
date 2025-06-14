
import { useState } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ExternalLink, Key } from "lucide-react";

interface KintsugiApiSetupProps {
  onComplete?: () => void;
}

export function KintsugiApiSetup({ onComplete }: KintsugiApiSetupProps) {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would save to Supabase Edge Function secrets
      // For now, we'll just show instructions
      console.log("API key would be saved:", apiKey.substring(0, 10) + "...");
      onComplete?.();
    } catch (error) {
      console.error("Failed to save API key:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LiquidGlass variant="card" className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-center">
          <Key className="w-12 h-12 text-emerald-splash-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold heading-gradient">Setup Voice Analysis</h3>
          <p className="text-sm text-misty-rosewood-500">
            Configure Kintsugi API to enable mood detection from voice
          </p>
        </div>

        <LiquidGlass variant="crystal" className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-700 mb-1">Setup Required</p>
              <p className="text-blue-600">
                To use voice mood analysis, you need to:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-blue-600">
                <li>Get a Kintsugi API key</li>
                <li>Add it to your Supabase Edge Function secrets</li>
                <li>Set the secret name as "KINTSUGI_API_KEY"</li>
              </ol>
            </div>
          </div>
        </LiquidGlass>

        <div className="space-y-2">
          <Label htmlFor="kintsugi-key">Kintsugi API Key (for reference)</Label>
          <Input
            id="kintsugi-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="liquid-glass-input"
          />
          <p className="text-xs text-misty-rosewood-400">
            This needs to be added to Supabase Edge Function secrets
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isLoading || !apiKey.trim()}
            className="liquid-glass-button flex-1"
          >
            {isLoading ? "Saving..." : "Save Reference"}
          </Button>
          <Button
            variant="outline"
            className="liquid-glass-button"
            asChild
          >
            <a 
              href="https://docs.lovable.dev/integrations/supabase/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </LiquidGlass>
  );
}
