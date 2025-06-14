
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CharacterAppearance, CharacterPersonality, CharacterCompanion } from "@/types/character";
import { CharacterAvatar } from "./CharacterAvatar";
import { Heart, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterCreatorProps {
  onComplete: (character: Omit<CharacterCompanion, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel?: () => void;
}

const personalityTraits = [
  'Empathetic', 'Optimistic', 'Thoughtful', 'Encouraging', 
  'Wise', 'Playful', 'Calm', 'Energetic'
];

const steps = [
  { id: 'name', title: 'Meet Your Companion', description: 'Choose a name for your wellness companion' },
  { id: 'appearance', title: 'Create Their Look', description: 'Customize your companion\'s appearance' },
  { id: 'personality', title: 'Shape Their Personality', description: 'Define how your companion will interact with you' },
  { id: 'preview', title: 'Meet Your Companion', description: 'Review and finalize your wellness partner' }
];

export function CharacterCreator({ onComplete, onCancel }: CharacterCreatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [appearance, setAppearance] = useState<CharacterAppearance>({
    skin_tone: 'medium',
    hair_style: 'short',
    hair_color: 'brown',
    eye_color: 'brown',
    outfit: 'casual',
    accessories: []
  });
  const [personality, setPersonality] = useState<CharacterPersonality>({
    traits: [],
    communication_style: 'friendly',
    mood_response_style: 'empathetic'
  });

  const previewCharacter: CharacterCompanion = {
    id: 'preview',
    name: characterName || 'Your Companion',
    appearance,
    personality,
    relationship: {
      bond_level: 1,
      milestones_achieved: [],
      daily_interactions: 0,
      total_interactions: 0
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (characterName.trim()) {
      onComplete({
        name: characterName,
        appearance,
        personality,
        relationship: {
          bond_level: 1,
          milestones_achieved: [],
          daily_interactions: 0,
          total_interactions: 0
        }
      });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return characterName.trim().length > 0;
      case 1: return true; // Appearance always valid
      case 2: return personality.traits.length > 0;
      case 3: return characterName.trim().length > 0;
      default: return false;
    }
  };

  const toggleTrait = (trait: string) => {
    setPersonality(prev => ({
      ...prev,
      traits: prev.traits.includes(trait)
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait]
    }));
  };

  const toggleAccessory = (accessory: string) => {
    setAppearance(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }));
  };

  return (
    <div className="min-h-screen wellness-gradient p-4 md:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl glass-card border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-crimson-wine flex items-center justify-center">
              <Heart className="w-6 h-6 text-off-white" />
            </div>
            <Sparkles className="w-8 h-8 text-emerald-splash-500" />
          </div>
          <CardTitle className="text-2xl heading-gradient">{steps[currentStep].title}</CardTitle>
          <CardDescription className="text-misty-rosewood-500 text-base">
            {steps[currentStep].description}
          </CardDescription>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-300',
                    index <= currentStep 
                      ? 'bg-emerald-splash-500' 
                      : 'bg-soft-blush-200'
                  )}
                />
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Character Preview */}
          <div className="flex justify-center mb-8">
            <CharacterAvatar 
              character={previewCharacter} 
              size="xl"
              expression={{ type: 'happy', intensity: 'medium' }}
              className="shadow-lg"
            />
          </div>

          {/* Step Content */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="character-name" className="text-crimson-wine-600 font-semibold">
                  What would you like to name your companion?
                </Label>
                <Input
                  id="character-name"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Enter a name..."
                  className="mt-2 text-center text-lg font-medium"
                />
              </div>
              <p className="text-sm text-misty-rosewood-500 text-center">
                This companion will be with you throughout your wellness journey, 
                providing support and celebrating your progress.
              </p>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Skin Tone</Label>
                  <Select value={appearance.skin_tone} onValueChange={(value: any) => 
                    setAppearance(prev => ({ ...prev, skin_tone: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="tan">Tan</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Hair Style</Label>
                  <Select value={appearance.hair_style} onValueChange={(value: any) => 
                    setAppearance(prev => ({ ...prev, hair_style: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                      <SelectItem value="curly">Curly</SelectItem>
                      <SelectItem value="straight">Straight</SelectItem>
                      <SelectItem value="wavy">Wavy</SelectItem>
                      <SelectItem value="buzz">Buzz Cut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Hair Color</Label>
                  <Select value={appearance.hair_color} onValueChange={(value: any) => 
                    setAppearance(prev => ({ ...prev, hair_color: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="blonde">Blonde</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Eye Color</Label>
                  <Select value={appearance.eye_color} onValueChange={(value: any) => 
                    setAppearance(prev => ({ ...prev, eye_color: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="hazel">Hazel</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Outfit Style</Label>
                  <Select value={appearance.outfit} onValueChange={(value: any) => 
                    setAppearance(prev => ({ ...prev, outfit: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="sporty">Sporty</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="cozy">Cozy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Accessories</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="glasses"
                        checked={appearance.accessories.includes('glasses')}
                        onCheckedChange={() => toggleAccessory('glasses')}
                      />
                      <Label htmlFor="glasses">Glasses</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-crimson-wine-600 font-semibold mb-3 block">
                  Personality Traits (Select 2-4)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {personalityTraits.map((trait) => (
                    <Button
                      key={trait}
                      variant={personality.traits.includes(trait) ? "default" : "outline"}
                      onClick={() => toggleTrait(trait)}
                      className={cn(
                        "justify-start",
                        personality.traits.includes(trait) && "bg-emerald-splash-500 hover:bg-emerald-splash-600"
                      )}
                    >
                      {trait}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Communication Style</Label>
                  <Select value={personality.communication_style} onValueChange={(value: any) => 
                    setPersonality(prev => ({ ...prev, communication_style: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="encouraging">Encouraging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-crimson-wine-600 font-semibold">Mood Response Style</Label>
                  <Select value={personality.mood_response_style} onValueChange={(value: any) => 
                    setPersonality(prev => ({ ...prev, mood_response_style: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empathetic">Empathetic</SelectItem>
                      <SelectItem value="motivational">Motivational</SelectItem>
                      <SelectItem value="analytical">Analytical</SelectItem>
                      <SelectItem value="supportive">Supportive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-crimson-wine-600 mb-4">
                  Meet {characterName}!
                </h3>
                <div className="space-y-2 text-misty-rosewood-600">
                  <p><strong>Personality:</strong> {personality.traits.join(', ')}</p>
                  <p><strong>Communication:</strong> {personality.communication_style}</p>
                  <p><strong>Support Style:</strong> {personality.mood_response_style}</p>
                </div>
              </div>
              <p className="text-misty-rosewood-500">
                {characterName} is ready to be your wellness companion! They'll appear throughout 
                the app to support you, celebrate your achievements, and grow alongside your journey.
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={currentStep === 0 ? onCancel : handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep === 0 ? 'Skip' : 'Previous'}
            </Button>

            <Button
              onClick={currentStep === steps.length - 1 ? handleComplete : handleNext}
              disabled={!isStepValid()}
              className="btn-primary-modern flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Heart className="w-4 h-4" />
                  Create Companion
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
