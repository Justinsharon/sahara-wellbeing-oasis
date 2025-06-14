
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { CharacterAppearance } from '@/types/character';

export default function CharacterCreator() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [skinTone, setSkinTone] = useState<CharacterAppearance['skin_tone']>('light');
  const [hairColor, setHairColor] = useState<CharacterAppearance['hair_color']>('black');
  const [hairStyle, setHairStyle] = useState<CharacterAppearance['hair_style']>('short');
  const [eyeColor, setEyeColor] = useState<CharacterAppearance['eye_color']>('brown');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [outfit, setOutfit] = useState<CharacterAppearance['outfit']>('casual');

  const handleAccessoriesChange = (accessory: string) => {
    if (accessories.includes(accessory)) {
      setAccessories(accessories.filter(a => a !== accessory));
    } else {
      setAccessories([...accessories, accessory]);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name for your character.');
      return;
    }

    if (!user) {
      toast.error('Please sign in to create your character.');
      return;
    }

    const characterData = {
      name: name.trim(),
      appearance: {
        skin_tone: skinTone,
        hair_color: hairColor,
        hair_style: hairStyle,
        eye_color: eyeColor,
        accessories: accessories,
        outfit: outfit,
      },
      personality: {
        traits: [],
        communication_style: 'friendly' as const,
        mood_response_style: 'empathetic' as const
      },
      relationship: {
        bond_level: 1,
        milestones_achieved: [],
        daily_interactions: 0,
        total_interactions: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      // Store character data as JSON string in the database
      await updateProfile({
        character_companion: JSON.stringify(characterData)
      });

      toast.success('Character created successfully!');
      // Navigate to onboarding assessment
      navigate('/onboarding-assessment');
    } catch (error: any) {
      console.error('Error creating character:', error);
      toast.error(`Failed to create character: ${error.message || 'Unknown error'}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Please sign in to create your character.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-20 md:pb-8 wellness-gradient">
      <div className="max-w-4xl mx-auto">
        <Card className="soft-shadow border-0 mb-8">
          <CardHeader>
            <CardTitle>Create Your Companion</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Character Preview */}
              <div className="flex items-center justify-center">
                <CharacterAvatar
                  character={{
                    id: 'preview',
                    name: name || 'Your Companion',
                    appearance: {
                      skin_tone: skinTone,
                      hair_color: hairColor,
                      hair_style: hairStyle,
                      eye_color: eyeColor,
                      accessories: accessories,
                      outfit: outfit,
                    },
                    personality: {
                      traits: [],
                      communication_style: 'friendly',
                      mood_response_style: 'empathetic'
                    },
                    relationship: {
                      bond_level: 1,
                      milestones_achieved: [],
                      daily_interactions: 0,
                      total_interactions: 0,
                    },
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  }}
                  size="xl"
                />
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter companion name"
                  />
                </div>

                <div>
                  <Label htmlFor="skinTone">Skin Tone</Label>
                  <Select value={skinTone} onValueChange={(value) => setSkinTone(value as CharacterAppearance['skin_tone'])}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select skin tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="tan">Tan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="hairColor">Hair Color</Label>
                  <Select value={hairColor} onValueChange={(value) => setHairColor(value as CharacterAppearance['hair_color'])}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select hair color" />
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

                <div>
                  <Label htmlFor="hairStyle">Hair Style</Label>
                  <Select value={hairStyle} onValueChange={(value) => setHairStyle(value as CharacterAppearance['hair_style'])}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select hair style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="eyeColor">Eye Color</Label>
                  <Select value={eyeColor} onValueChange={(value) => setEyeColor(value as CharacterAppearance['eye_color'])}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select eye color" />
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
                  <Label>Accessories</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={accessories.includes('glasses') ? 'default' : 'outline'}
                      onClick={() => handleAccessoriesChange('glasses')}
                    >
                      Glasses
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="outfit">Outfit</Label>
                  <Select value={outfit} onValueChange={(value) => setOutfit(value as CharacterAppearance['outfit'])}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select outfit" />
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
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full md:w-auto">
              Create Companion & Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
