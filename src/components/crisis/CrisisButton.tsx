import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Phone, MessageCircle } from 'lucide-react';
import { CrisisSupport } from './CrisisSupport';

interface CrisisButtonProps {
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  urgent?: boolean;
}

export const CrisisButton: React.FC<CrisisButtonProps> = ({ 
  variant = 'destructive', 
  size = 'default',
  className = '',
  urgent = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmergencyCall = () => {
    window.location.href = 'tel:911';
  };

  const handleCrisisLine = () => {
    window.location.href = 'tel:988';
  };

  if (urgent) {
    return (
      <div className="flex gap-2">
        <Button 
          variant="destructive" 
          size={size}
          onClick={handleEmergencyCall}
          className={`flex-1 ${className}`}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call 911
        </Button>
        <Button 
          variant="outline" 
          size={size}
          onClick={handleCrisisLine}
          className="flex-1"
        >
          <Phone className="h-4 w-4 mr-2" />
          Crisis Line
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Crisis Support
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Crisis Support - 24/7 Help Available
          </DialogTitle>
        </DialogHeader>
        <CrisisSupport />
      </DialogContent>
    </Dialog>
  );
};