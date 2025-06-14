
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Heart, Brain, Target, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const quickStartQuestions = [
  { 
    text: "How can I manage my anxiety today?", 
    icon: Brain,
    gradient: "from-blue-100 to-indigo-100",
    iconColor: "text-blue-600"
  },
  { 
    text: "I'm feeling overwhelmed, can you help?", 
    icon: Heart,
    gradient: "from-rose-100 to-pink-100", 
    iconColor: "text-rose-600"
  },
  { 
    text: "Help me set a wellness goal", 
    icon: Target,
    gradient: "from-emerald-100 to-green-100",
    iconColor: "text-emerald-600"
  },
  { 
    text: "I want to practice mindfulness", 
    icon: Sparkles,
    gradient: "from-purple-100 to-violet-100",
    iconColor: "text-purple-600"
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Nia, your AI wellness companion. I'm here to support you on your mental health journey. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "I understand how you're feeling. Let's work through this together. Can you tell me more about what's on your mind?",
      "That's a great question. Here are some strategies that might help you feel more centered and calm.",
      "It's completely normal to feel this way sometimes. Remember, seeking support shows strength, not weakness.",
      "Let's explore some mindfulness techniques that can help you in this moment. Would you like to try a brief breathing exercise?",
      "I'm here to listen and support you. Your mental health journey is important, and every step forward matters.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-blue-50/50">
      {/* Chat Header */}
      <div className="modern-glass border-b border-white/20 p-4 safe-area-top">
        <div className="flex items-center gap-3">
          <div className="avatar-ai">
            <Heart className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="font-bold text-lg modern-text-gradient">Nia</h1>
            <p className="text-sm text-muted-foreground">Your AI Wellness Companion</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 1 && (
          <div className="space-y-6 mb-8">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold modern-text-gradient mb-2">
                Start Your Wellness Journey
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Choose a quick start question or share what's on your mind
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
              {quickStartQuestions.map((question, index) => (
                <Card
                  key={index}
                  className={`modern-quick-card cursor-pointer bg-gradient-to-r ${question.gradient} border-2 border-white/30`}
                  onClick={() => handleQuickQuestion(question.text)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-md`}>
                      <question.icon className={`w-6 h-6 ${question.iconColor}`} />
                    </div>
                    <p className="font-medium text-gray-700 flex-1">{question.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slide-in-${message.sender === "user" ? "right" : "left"}`}
          >
            {message.sender === "ai" && (
              <div className="avatar-ai flex-shrink-0">
                <Heart className="w-5 h-5 text-emerald-600" />
              </div>
            )}
            
            <div className={`${message.sender === "user" ? "chat-message-user" : "chat-message-ai"}`}>
              <p className="text-sm font-medium leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.sender === "user" ? "text-emerald-100" : "text-gray-500"
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            {message.sender === "user" && (
              <div className="avatar-user flex-shrink-0">
                <Smile className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start animate-fade-in-up">
            <div className="avatar-ai flex-shrink-0">
              <Heart className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="chat-message-ai">
              <div className="flex items-center gap-1">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="modern-glass border-t border-white/20 p-4 safe-area-bottom">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts or ask me anything..."
              className="modern-chat-input resize-none min-h-[48px] text-base"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="modern-btn-primary h-12 w-12 p-0 rounded-full shadow-lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-xs text-center text-muted-foreground mt-3 max-w-md mx-auto">
          Nia is here to support you. Remember, this isn't a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
