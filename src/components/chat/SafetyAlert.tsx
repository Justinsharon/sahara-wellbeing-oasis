import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, MessageSquare, Heart } from 'lucide-react';

interface SafetyAlertProps {
  level: number;
  onConnectTherapist: () => void;
  onEmergencyHelp: () => void;
}

export const SafetyAlert: React.FC<SafetyAlertProps> = ({
  level,
  onConnectTherapist,
  onEmergencyHelp
}) => {
  if (level === 1) return null;

  return (
    <div className="mb-4">
      {level === 3 && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <div className="space-y-3">
              <p className="font-medium">
                I'm concerned about what you're sharing. You don't have to go through this alone.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={onEmergencyHelp}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Help
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onConnectTherapist}
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Talk to Therapist
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {level === 2 && (
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <Heart className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <div className="space-y-3">
              <p>
                It sounds like you're going through a difficult time. Would you like to connect with a professional therapist for additional support?
              </p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={onConnectTherapist}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Connect with Therapist
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};