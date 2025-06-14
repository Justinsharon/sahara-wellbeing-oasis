
import { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, Smile, Heart, Sparkles, MessageCircle } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const mockMessages = [
  {
    id: 1,
    content: "Hello! I'm Nia, your AI wellness companion. How are you feeling today?",
    sender: "ai",
    timestamp: new Date(Date.now() - 300000),
    mood: "supportive"
  },
  {
    id: 2,
    content: "Hi Nia! I'm feeling a bit overwhelmed with work lately. Any suggestions?",
    sender: "user",
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: 3,
    content: "I understand feeling overwhelmed can be really challenging. Let's work through this together. Would you like to try a quick breathing exercise, or would you prefer to talk about what's specifically causing the stress?",
    sender: "ai",
    timestamp: new Date(Date.now() - 180000),
    mood: "caring"
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

export default function Chat() {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user" as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: "Thank you for sharing that with me. I'm here to support you through this. Let's explore some strategies that might help...",
        sender: "ai" as const,
        timestamp: new Date(),
        mood: "supportive" as const
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <LiquidGlass variant="card" floating className="text-center p-6 mb-8">
          <div className="w-12 h-12 bg-crimson-wine rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MessageCircle className="w-6 h-6 text-off-white" />
          </div>
          <h1 className="text-2xl font-bold heading-gradient mb-2">Chat with Nia</h1>
          <p className="text-warm-gray">Your AI wellness companion is here to listen and support you</p>
        </LiquidGlass>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <LiquidGlass variant="crystal" className="p-4">
              <h3 className="font-bold text-deep-charcoal mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <LiquidGlass
                    key={index}
                    variant="card"
                    interactive
                    className="p-3 cursor-pointer text-sm"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </LiquidGlass>
                ))}
              </div>
            </LiquidGlass>

            <LiquidGlass variant="crystal" className="p-4">
              <h3 className="font-bold text-deep-charcoal mb-4">How are you feeling?</h3>
              <div className="space-y-2">
                {moodOptions.map((mood, index) => (
                  <LiquidGlass
                    key={index}
                    variant="card"
                    interactive
                    className="p-2 cursor-pointer text-sm flex items-center gap-2"
                  >
                    <span className="text-lg">{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </LiquidGlass>
                ))}
              </div>
            </LiquidGlass>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <LiquidGlass variant="card" bubbles className="flex flex-col h-[600px]">
              {/* Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <LiquidGlass
                        variant={message.sender === 'user' ? 'crystal' : 'card'}
                        floating
                        className={`max-w-xs lg:max-w-md p-4 ${
                          message.sender === 'user' 
                            ? 'bg-crimson-wine text-off-white' 
                            : 'bg-soft-taupe'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' 
                            ? 'text-off-white/70' 
                            : 'text-warm-gray'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </LiquidGlass>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <LiquidGlass variant="card" floating className="p-4 bg-soft-taupe">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-warm-gray rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </LiquidGlass>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <LiquidGlass variant="overlay" className="p-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="neo-button">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="neo-button">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 glass-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button variant="ghost" size="icon" className="neo-button">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    className="btn-primary-modern"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </LiquidGlass>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </div>
  );
}
