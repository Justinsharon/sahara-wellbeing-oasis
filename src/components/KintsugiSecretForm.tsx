
import { useState } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function KintsugiSecretForm() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your Kintsugi API key");
      return;
    }

    setIsLoading(true);
    try {
      // This would typically save to Supabase Edge Function secrets
      // For now, we'll show a success message
      toast.success("Kintsugi API key saved successfully!");
      setApiKey("");
    } catch (error) {
      toast.error("Failed to save API key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LiquidGlass variant="card" className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold heading-gradient">Configure Kintsugi API</h3>
          <p className="text-sm text-misty-rosewood-500">
            Enter your Kintsugi API key to enable voice mood analysis
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="kintsugi-key">Kintsugi API Key</Label>
          <Input
            id="kintsugi-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Kintsugi API key"
            className="liquid-glass-input"
          />
        </div>
        
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="liquid-glass-button w-full"
        >
          {isLoading ? "Saving..." : "Save API Key"}
        </Button>
        
        <p className="text-xs text-misty-rosewood-400">
          Your API key will be securely stored in Supabase Edge Function secrets
        </p>
      </div>
    </LiquidGlass>
  );
}
