import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  MessageCircle, 
  Video, 
  AlertTriangle, 
  Send, 
  MapPin,
  Clock,
  User,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { useCrisisSupport } from '@/hooks/useCrisisSupport';
import { formatDistanceToNow } from 'date-fns';

interface CrisisSupportProps {
  initialUrgency?: number;
  autoStart?: boolean;
}

export const CrisisSupport: React.FC<CrisisSupportProps> = ({ 
  initialUrgency = 3, 
  autoStart = false 
}) => {
  const {
    currentSession,
    messages,
    loading,
    isConnecting,
    startCrisisSession,
    sendMessage,
    escalateToEmergency,
    getCrisisResources,
    endSession
  } = useCrisisSupport();

  const [messageInput, setMessageInput] = useState('');
  const [selectedType, setSelectedType] = useState<'chat' | 'voice' | 'video'>('chat');
  const [urgencyLevel, setUrgencyLevel] = useState(initialUrgency);
  const [resources, setResources] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load crisis resources
  useEffect(() => {
    const loadResources = async () => {
      const crisisResources = await getCrisisResources('US');
      setResources(crisisResources);
    };
    loadResources();
  }, [getCrisisResources]);

  // Auto-start session if requested
  useEffect(() => {
    if (autoStart && !currentSession && !loading) {
      handleStartSession();
    }
  }, [autoStart]);

  const handleStartSession = async () => {
    const initialMessage = selectedType === 'chat' ? messageInput : undefined;
    await startCrisisSession(selectedType, urgencyLevel, initialMessage);
    if (selectedType === 'chat') {
      setMessageInput('');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    await sendMessage(messageInput);
    setMessageInput('');
  };

  const handleEmergencyEscalation = async () => {
    await escalateToEmergency('User requested emergency escalation');
  };

  const getUrgencyColor = (level: number) => {
    if (level <= 2) return 'bg-green-500';
    if (level <= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getUrgencyText = (level: number) => {
    if (level <= 2) return 'Low';
    if (level <= 3) return 'Medium';
    return 'High';
  };

  if (!currentSession) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Crisis Alert */}
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Crisis Support Available 24/7</strong> - If you're experiencing a mental health emergency, 
            we're here to help. Connect with a trained crisis counselor immediately.
          </AlertDescription>
        </Alert>

        {/* Session Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Crisis Support Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Chat Option */}
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedType === 'chat' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedType('chat')}
              >
                <CardContent className="p-4 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Text Chat</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure messaging with a counselor
                  </p>
                </CardContent>
              </Card>

              {/* Voice Option */}
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedType === 'voice' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedType('voice')}
              >
                <CardContent className="p-4 text-center">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Voice Call</h3>
                  <p className="text-sm text-muted-foreground">
                    Speak directly with a counselor
                  </p>
                </CardContent>
              </Card>

              {/* Video Option */}
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedType === 'video' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedType('video')}
              >
                <CardContent className="p-4 text-center">
                  <Video className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Video Call</h3>
                  <p className="text-sm text-muted-foreground">
                    Face-to-face support session
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Urgency Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Urgency Level</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    variant={urgencyLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUrgencyLevel(level)}
                    className="flex-1"
                  >
                    {level}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                1 = Low urgency, 5 = Immediate emergency
              </p>
            </div>

            {/* Initial Message for Chat */}
            {selectedType === 'chat' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">How can we help you today?</label>
                <Textarea
                  placeholder="Describe what you're experiencing..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  rows={3}
                />
              </div>
            )}

            {/* Start Session Button */}
            <Button 
              onClick={handleStartSession} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Connecting...' : `Start ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Session`}
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Emergency Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {resources.slice(0, 6).map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {resource.resource_type.replace('_', ' ').toUpperCase()}
                    </p>
                    {resource.hours_of_operation && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {resource.hours_of_operation}
                      </div>
                    )}
                  </div>
                  {resource.phone_number && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${resource.phone_number}`}>
                        <PhoneCall className="h-4 w-4 mr-1" />
                        Call
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active Session Interface
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`${getUrgencyColor(currentSession.urgency_level)} text-white`}>
                    {getUrgencyText(currentSession.urgency_level)} Priority
                  </Badge>
                  <Badge variant="secondary">
                    {currentSession.session_type.toUpperCase()}
                  </Badge>
                  <Badge variant={currentSession.status === 'active' ? 'default' : 'secondary'}>
                    {currentSession.status.charAt(0).toUpperCase() + currentSession.status.slice(1)}
                  </Badge>
                </div>
                <Button variant="destructive" size="sm" onClick={handleEmergencyEscalation}>
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Emergency
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] p-4">
                {isConnecting && (
                  <div className="text-center py-8">
                    <div className="animate-pulse text-muted-foreground">
                      Connecting you with a crisis counselor...
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender_type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender_type !== 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {message.sender_type === 'counselor' ? 'C' : 'S'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender_type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : message.sender_type === 'system'
                            ? 'bg-muted text-muted-foreground text-sm'
                            : 'bg-secondary'
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        </div>
                      </div>
                      {message.sender_type === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
              
              {currentSession.session_type === 'chat' && (
                <>
                  <Separator />
                  <form onSubmit={handleSendMessage} className="p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!messageInput.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Session Info & Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Session Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started:</span>
                <span>{formatDistanceToNow(new Date(currentSession.created_at), { addSuffix: true })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="capitalize">{currentSession.session_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline" className="text-xs">
                  {currentSession.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full"
                onClick={handleEmergencyEscalation}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Call Emergency Services
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => endSession('Session ended by user')}
              >
                End Session
              </Button>
            </CardContent>
          </Card>

          {/* Quick Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resources.slice(0, 3).map((resource) => (
                  <div key={resource.id} className="p-2 border rounded text-xs">
                    <div className="font-medium">{resource.name}</div>
                    {resource.phone_number && (
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                        <a href={`tel:${resource.phone_number}`}>
                          {resource.phone_number}
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};