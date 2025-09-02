import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { LiquidGlass } from '@/components/ui/liquid-glass';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { SafetyAlert } from '@/components/chat/SafetyAlert';
import { TherapistConnectionModal } from '@/components/chat/TherapistConnectionModal';
import { MessageWithVoice } from '@/components/chat/MessageWithVoice';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Heart, 
  Brain, 
  Zap,
  MessageCircle,
  Coffee,
  Moon,
  Phone,
  Loader2
} from 'lucide-react';

// Initial conversation data
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello! I'm Nia, your wellness companion. I'm here to support you through whatever you're experiencing. How are you feeling today?",
    timestamp: '10:00 AM',
    safety: { level: 1, keywords: [], needsAttention: false }
  }
];

const quickQuestions = [
  "How can I manage stress better?",
  "I'm feeling anxious today",
  "Help me with sleep issues", 
  "I need motivation",
  "Coping with sadness"
];

const moodOptions = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-100 text-yellow-700" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-100 text-gray-700" },
  { emoji: "😔", label: "Sad", color: "bg-blue-100 text-blue-700" },
  { emoji: "😰", label: "Anxious", color: "bg-purple-100 text-purple-700" },
  { emoji: "😴", label: "Tired", color: "bg-indigo-100 text-indigo-700" }
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [safetyLevel, setSafetyLevel] = useState(1);
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isConnecting) {
      const userMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputValue.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        safety: { level: 1, keywords: [], needsAttention: false }
      };
      
      setMessages(prev => [...prev, userMessage]);
      const messageText = inputValue.trim();
      setInputValue('');
      setIsTyping(true);
      setIsConnecting(true);
      
      try {
        // Get conversation history for context
        const conversationHistory = messages.map(msg => ({
          sender: msg.sender,
          text: msg.text
        }));

        const { data, error } = await supabase.functions.invoke('nia-gemini-chat', {
          body: {
            message: messageText,
            conversationHistory
          }
        });

        if (error) {
          throw error;
        }

        const aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          text: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          safety: data.safety
        };

        setMessages(prev => [...prev, aiResponse]);
        setSafetyLevel(data.safety.level);

        // Show therapist modal for high safety levels
        if (data.safety.level >= 3) {
          setTimeout(() => setShowTherapistModal(true), 1000);
        }

      } catch (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Connection Error",
          description: "I'm having trouble connecting. Please try again.",
          variant: "destructive",
        });

        // Add error message
        const errorResponse = {
          id: messages.length + 2,
          sender: 'ai',
          text: "I'm having trouble connecting right now, but I'm here for you. If you're in crisis, please reach out to a mental health professional immediately.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          safety: { level: 1, keywords: [], needsAttention: false }
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsTyping(false);
        setIsConnecting(false);
      }
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleEmergencyHelp = () => {
    // In a real app, this would open emergency contacts or crisis resources
    toast({
      title: "Emergency Resources",
      description: "In a real app, this would connect you to crisis support immediately.",
    });
  };

  const handleTherapistConnected = () => {
    toast({
      title: "Connected",
      description: "You're now connected with a professional therapist.",
    });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <LiquidGlass className="text-center p-6 mb-8">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chat with Nia</h1>
          <p className="text-muted-foreground">Your AI wellness companion is here to listen and support you</p>
        </LiquidGlass>

        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <SafetyAlert 
              level={safetyLevel}
              onConnectTherapist={() => setShowTherapistModal(true)}
              onEmergencyHelp={handleEmergencyHelp}
            />
            
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <MessageWithVoice 
                      message={message.text} 
                      isAI={message.sender === 'ai'}
                    >
                      <LiquidGlass className={`max-w-xs lg:max-w-md p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary/20 ml-auto' 
                          : 'bg-secondary/50'
                      }`}>
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                      </LiquidGlass>
                    </MessageWithVoice>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <LiquidGlass className="max-w-xs lg:max-w-md p-3 bg-secondary/50">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </LiquidGlass>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="w-4 h-4" />
                </Button>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-background/50 border-border/50"
                  disabled={isConnecting}
                />
                <Button variant="ghost" size="icon">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  disabled={isConnecting || !inputValue.trim()}
                >
                  {isConnecting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-4">
            <LiquidGlass className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Questions
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <LiquidGlass
                    key={index}
                    className="p-3 cursor-pointer text-sm hover:bg-accent transition-colors"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </LiquidGlass>
                ))}
              </div>
            </LiquidGlass>

            <LiquidGlass className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                How are you feeling?
              </h3>
              <div className="space-y-2">
                {moodOptions.map((mood, index) => (
                  <LiquidGlass
                    key={index}
                    className="p-2 cursor-pointer text-sm flex items-center gap-2 hover:bg-accent transition-colors"
                  >
                    <span className="text-lg">{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </LiquidGlass>
                ))}
              </div>
            </LiquidGlass>

            <LiquidGlass className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Support Options
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setShowTherapistModal(true)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Connect with Therapist
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Coffee className="w-4 h-4 mr-2" />
                  Breathing Exercise
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Moon className="w-4 h-4 mr-2" />
                  Sleep Stories
                </Button>
              </div>
            </LiquidGlass>
          </div>
        </div>

        <TherapistConnectionModal
          isOpen={showTherapistModal}
          onClose={() => setShowTherapistModal(false)}
          onConnected={handleTherapistConnected}
        />
      </div>
    </div>
  );
};

export default Chat;