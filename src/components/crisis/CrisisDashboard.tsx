import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Clock, 
  User, 
  MapPin, 
  AlertTriangle, 
  Phone, 
  FileText,
  Activity,
  Heart,
  Brain,
  Zap
} from 'lucide-react';
import { useCrisisSupport } from '@/hooks/useCrisisSupport';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface UserProfile {
  full_name?: string;
  email?: string;
  mobile_number?: string;
  date_of_birth?: string;
  gender?: string;
}

interface MoodEntry {
  id: string;
  mood: string;
  stress_level?: number;
  sleep_quality?: string;
  hours_slept?: number;
  notes?: string;
  created_at: string;
}

interface AssessmentSession {
  id: string;
  emotional_score?: number;
  physical_score?: number;
  work_score?: number;
  lifestyle_score?: number;
  status: string;
  created_at: string;
}

export const CrisisDashboard: React.FC = () => {
  const { user } = useAuth();
  const { currentSession } = useCrisisSupport();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recentMoodEntries, setRecentMoodEntries] = useState<MoodEntry[]>([]);
  const [lastAssessment, setLastAssessment] = useState<AssessmentSession | null>(null);
  const [riskLevel, setRiskLevel] = useState<number>(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !currentSession) return;
    
    loadUserData();
  }, [user, currentSession]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUserProfile(profile);
      }

      // Load recent mood entries
      const { data: moodEntries } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (moodEntries) {
        setRecentMoodEntries(moodEntries);
      }

      // Load latest assessment
      const { data: assessment } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (assessment) {
        setLastAssessment(assessment);
        
        // Calculate risk level based on assessment scores
        const avgScore = (
          (assessment.emotional_score || 0) +
          (assessment.physical_score || 0) +
          (assessment.work_score || 0) +
          (assessment.lifestyle_score || 0)
        ) / 4;
        
        setRiskLevel(Math.ceil(avgScore / 20)); // Convert to 1-5 scale
      }

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelColor = (level: number) => {
    if (level <= 2) return 'bg-green-500';
    if (level === 3) return 'bg-yellow-500';
    if (level === 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRiskLevelText = (level: number) => {
    if (level <= 2) return 'Low Risk';
    if (level === 3) return 'Moderate Risk';
    if (level === 4) return 'High Risk';
    return 'Critical Risk';
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      'very_happy': '😊',
      'happy': '🙂',
      'neutral': '😐',
      'sad': '😔',
      'very_sad': '😢',
      'anxious': '😰',
      'angry': '😠',
      'excited': '🤩',
      'calm': '😌',
      'stressed': '😤'
    };
    return moodMap[mood] || '😐';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">No active crisis session</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* User Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {userProfile?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{userProfile?.full_name || 'Anonymous User'}</h3>
                  <p className="text-sm text-muted-foreground">{userProfile?.email}</p>
                </div>
              </div>
              
              {userProfile?.mobile_number && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>{userProfile.mobile_number}</span>
                </div>
              )}
              
              {userProfile?.date_of_birth && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Born: {new Date(userProfile.date_of_birth).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Risk Assessment:</span>
                <Badge className={`${getRiskLevelColor(riskLevel)} text-white`}>
                  {getRiskLevelText(riskLevel)}
                </Badge>
              </div>
              
              {currentSession.location_data && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Location detected</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4" />
                <span>Session urgency: Level {currentSession.urgency_level}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Mood History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Recent Mood Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-3">
                {recentMoodEntries.length > 0 ? (
                  recentMoodEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                        <div>
                          <p className="text-sm font-medium capitalize">{entry.mood.replace('_', ' ')}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        {entry.stress_level && (
                          <p>Stress: {entry.stress_level}/10</p>
                        )}
                        {entry.hours_slept && (
                          <p>Sleep: {entry.hours_slept}h</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent mood entries
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Assessment Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Latest Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastAssessment ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Emotional:</span>
                    <Badge variant="outline">{lastAssessment.emotional_score || 0}/100</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Physical:</span>
                    <Badge variant="outline">{lastAssessment.physical_score || 0}/100</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Work/Life:</span>
                    <Badge variant="outline">{lastAssessment.work_score || 0}/100</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Lifestyle:</span>
                    <Badge variant="outline">{lastAssessment.lifestyle_score || 0}/100</Badge>
                  </div>
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  Completed {formatDistanceToNow(new Date(lastAssessment.created_at), { addSuffix: true })}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No assessment data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="destructive" size="sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Services
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Add Session Note
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Contact Supervisor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};