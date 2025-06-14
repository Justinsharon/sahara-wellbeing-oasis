
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { CharacterCompanion } from '@/types/character';
import { TherapyRecommendation } from '@/types/assessment';
import { Heart, Brain, Flower, Palette, TreePine, Activity, MessageCircle } from 'lucide-react';

interface TherapyRecommendationsProps {
  recommendations: TherapyRecommendation[];
  character: CharacterCompanion;
  onFinish: () => void;
}

export function TherapyRecommendations({ recommendations, character, onFinish }: TherapyRecommendationsProps) {
  const getTherapyIcon = (type: string) => {
    switch (type) {
      case 'CBT': return Brain;
      case 'DBT': return Heart;
      case 'ACT': return TreePine;
      case 'Mindfulness': return Flower;
      case 'Yoga': return Activity;
      case 'Mandala Art': return Palette;
      case 'Humanistic': return MessageCircle;
      default: return Heart;
    }
  };

  const getTherapyDescription = (type: string) => {
    switch (type) {
      case 'CBT':
        return 'Cognitive Behavioral Therapy helps identify and change negative thought patterns and behaviors.';
      case 'DBT':
        return 'Dialectical Behavior Therapy focuses on emotional regulation and distress tolerance skills.';
      case 'ACT':
        return 'Acceptance and Commitment Therapy emphasizes mindfulness and value-based living.';
      case 'Mindfulness':
        return 'Mindfulness practices help reduce stress and increase present-moment awareness.';
      case 'Yoga':
        return 'Yoga combines physical movement, breathing, and meditation for holistic wellness.';
      case 'Mandala Art':
        return 'Creative art therapy using mandala patterns for relaxation and self-expression.';
      case 'Humanistic':
        return 'Person-centered therapy providing empathetic support and validation.';
      default:
        return 'A therapeutic approach tailored to your specific needs.';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-orange-100 text-orange-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen sahara-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="soft-shadow border-0 mb-6">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <CharacterAvatar 
                character={character} 
                size="lg"
                expression={{ type: 'happy', intensity: 'medium' }}
              />
              <div>
                <CardTitle className="text-2xl mb-2">Assessment Complete!</CardTitle>
                <p className="text-muted-foreground">
                  {character.name} has analyzed your responses and created personalized recommendations just for you.
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold text-center">Your Personalized Therapy Recommendations</h2>
          
          {recommendations.length === 0 ? (
            <Card className="soft-shadow border-0">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Based on your responses, you seem to be managing well! Consider exploring general wellness activities or check back if your situation changes.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {recommendations.map((rec, index) => {
                const Icon = getTherapyIcon(rec.type);
                return (
                  <Card key={index} className="soft-shadow border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{rec.type}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(rec.priority)}>
                                Priority {rec.priority}
                              </Badge>
                              <Badge variant="outline">
                                {rec.confidenceScore}% match
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {getTherapyDescription(rec.type)}
                          </p>
                          
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm">
                              <strong>Why this is recommended for you:</strong> {rec.reasoning}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <Card className="soft-shadow border-0">
          <CardContent className="p-6 text-center space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">
                <strong>{character.name} says:</strong> "Remember, these are personalized suggestions based on your responses. 
                You can explore these recommendations at your own pace. I'll be here to support you on your wellness journey!"
              </p>
            </div>
            
            <Button onClick={onFinish} className="w-full md:w-auto">
              Start Your Wellness Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
