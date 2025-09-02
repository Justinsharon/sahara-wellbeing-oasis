import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Phone, MessageSquare, User, Clock, CheckCircle } from 'lucide-react';

interface TherapistConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected: () => void;
}

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  availability: 'available' | 'busy' | 'offline';
  rating: number;
  responseTime: string;
}

const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Anxiety & Depression',
    availability: 'available',
    rating: 4.9,
    responseTime: '< 2 min'
  },
  {
    id: '2', 
    name: 'Dr. Michael Torres',
    specialty: 'Crisis Intervention',
    availability: 'available',
    rating: 4.8,
    responseTime: '< 1 min'
  },
  {
    id: '3',
    name: 'Dr. Emma Johnson',
    specialty: 'Cognitive Behavioral Therapy',
    availability: 'busy',
    rating: 4.9,
    responseTime: '< 5 min'
  }
];

type ConnectionStage = 'preference' | 'matching' | 'connecting' | 'connected';

export const TherapistConnectionModal: React.FC<TherapistConnectionModalProps> = ({
  isOpen,
  onClose,
  onConnected
}) => {
  const [stage, setStage] = useState<ConnectionStage>('preference');
  const [selectedMethod, setSelectedMethod] = useState<'call' | 'text' | null>(null);
  const [matchedTherapist, setMatchedTherapist] = useState<Therapist | null>(null);
  const [progress, setProgress] = useState(0);
  const [connectionTime, setConnectionTime] = useState(0);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('preference');
      setSelectedMethod(null);
      setMatchedTherapist(null);
      setProgress(0);
      setConnectionTime(0);
    }
  }, [isOpen]);

  // Handle matching simulation
  useEffect(() => {
    if (stage === 'matching') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Select available therapist
            const availableTherapists = mockTherapists.filter(t => t.availability === 'available');
            const selected = availableTherapists[Math.floor(Math.random() * availableTherapists.length)];
            setMatchedTherapist(selected);
            setStage('connecting');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [stage]);

  // Handle connection simulation
  useEffect(() => {
    if (stage === 'connecting') {
      const interval = setInterval(() => {
        setConnectionTime(prev => {
          if (prev >= 8) {
            clearInterval(interval);
            setStage('connected');
            return 8;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleMethodSelect = (method: 'call' | 'text') => {
    setSelectedMethod(method);
    setStage('matching');
  };

  const handleConnect = () => {
    onConnected();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Connect with a Therapist
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {stage === 'preference' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                How would you prefer to connect with a therapist right now?
              </p>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-3 p-4 h-auto justify-start"
                  onClick={() => handleMethodSelect('call')}
                >
                  <Phone className="w-5 h-5 text-green-500" />
                  <div className="text-left">
                    <div className="font-medium">Voice Call</div>
                    <div className="text-xs text-muted-foreground">
                      Immediate verbal support
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-3 p-4 h-auto justify-start"
                  onClick={() => handleMethodSelect('text')}
                >
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium">Text Chat</div>
                    <div className="text-xs text-muted-foreground">
                      Written conversation support
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {stage === 'matching' && (
            <div className="space-y-4 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <div>
                <h3 className="font-medium">Finding the right therapist for you</h3>
                <p className="text-sm text-muted-foreground">
                  Matching based on availability and expertise...
                </p>
              </div>
              <Progress value={progress} className="w-full" />
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}

          {stage === 'connecting' && matchedTherapist && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">{matchedTherapist.name}</h3>
                <p className="text-sm text-muted-foreground">{matchedTherapist.specialty}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Badge variant="secondary">★ {matchedTherapist.rating}</Badge>
                  <Badge variant="outline">{matchedTherapist.responseTime}</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Connecting... {connectionTime}s
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {stage === 'connected' && matchedTherapist && (
            <div className="space-y-4 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <div>
                <h3 className="font-medium text-green-700">Connected!</h3>
                <p className="text-sm text-muted-foreground">
                  You're now connected with {matchedTherapist.name}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedMethod === 'call' ? 'Starting voice call...' : 'Opening chat window...'}
                </p>
              </div>
              <Button onClick={handleConnect} className="w-full">
                {selectedMethod === 'call' ? 'Start Call' : 'Open Chat'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};