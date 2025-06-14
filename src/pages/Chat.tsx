
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Phone, AlertTriangle, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage } from "@/types";

const predefinedQuestions = [
  { text: "I'm feeling anxious today", icon: "😰", color: "from-blue-400 to-purple-500" },
  { text: "How can I manage stress?", icon: "🧘", color: "from-green-400 to-blue-500" },
  { text: "I'm having trouble sleeping", icon: "😴", color: "from-indigo-400 to-purple-500" },
  { text: "I feel overwhelmed with work", icon: "💼", color: "from-orange-400 to-red-500" },
  { text: "Can you help me with breathing exercises?", icon: "🫁", color: "from-teal-400 to-green-500" },
  { text: "I'm feeling lonely", icon: "💙", color: "from-pink-400 to-rose-500" }
];

const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "can't go on"];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm Nia, your AI wellness companion. I'm here to listen and provide support. How are you feeling today? ✨",
      sender: "nia",
      timestamp: new Date().toISOString(),
      type: "text"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisDialog, setShowCrisisDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisis = (message: string) => {
    return crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateNiaResponse = (userMessage: string) => {
    if (detectCrisis(userMessage)) {
      setShowCrisisDialog(true);
      return "I'm concerned about what you've shared. Your safety is my top priority. Let me connect you with immediate support resources. 🆘";
    }

    const responses = [
      "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what's been on your mind? 💭",
      "Thank you for sharing with me. It takes courage to open up. How long have you been feeling this way? 🤗",
      "I'm here to support you through this. Have you tried any coping strategies that have helped in the past? 🌱",
      "Your wellbeing matters. Let's work through this together. What would feel most helpful right now? 💪",
      "I appreciate you trusting me with your feelings. Remember, you're not alone in this journey. 🌟"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const niaResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateNiaResponse(content),
        sender: "nia",
        timestamp: new Date().toISOString(),
        type: "text"
      };

      setMessages(prev => [...prev, niaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePredefinedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Header Section */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar-ai">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Chat with Nia
            </h1>
            <p className="text-muted-foreground text-sm">Your AI wellness companion is online</p>
          </div>
        </div>
      </div>

      {/* Quick Start Questions */}
      {messages.length <= 1 && (
        <div className="px-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              How are you feeling?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handlePredefinedQuestion(question.text)}
                  className={`quick-start-card text-left bg-gradient-to-r ${question.color} text-white shadow-lg`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{question.icon}</span>
                    <span className="font-medium">{question.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 px-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-3 animate-slide-in-${message.sender === "user" ? "right" : "left"} ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className={message.sender === "user" ? "avatar-user" : "avatar-ai"}>
                {message.sender === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Sparkles className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={message.sender === "user" ? "chat-message-user" : "chat-message-ai"}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-2">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-end gap-3 animate-slide-in-left">
              <div className="avatar-ai">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="chat-message-ai">
                <div className="flex space-x-1">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input Section */}
      <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 safe-area-bottom">
        <div className="glass-effect rounded-3xl p-4 shadow-2xl border border-white/20">
          <div className="flex gap-3 items-end">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(inputValue);
                }
              }}
              className="chat-input flex-1 border-0 focus:ring-2 focus:ring-purple-300"
              disabled={isTyping}
            />
            <Button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Crisis Detection Dialog */}
      <Dialog open={showCrisisDialog} onOpenChange={setShowCrisisDialog}>
        <DialogContent className="sm:max-w-md mx-4 rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="flex items-center justify-center gap-3 text-red-600 text-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              Immediate Support Available
            </DialogTitle>
            <DialogDescription className="text-center mt-4 text-base">
              I'm concerned about your safety. Please consider reaching out for immediate support.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <Button 
              className="w-full h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => window.location.href = "tel:988"}
            >
              <Phone className="w-5 h-5 mr-3" />
              Call Crisis Hotline (988)
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-2xl border-2 border-purple-200 hover:bg-purple-50 transition-all duration-200"
              onClick={() => window.location.href = "/emergency"}
            >
              <Heart className="w-4 h-4 mr-2" />
              Emergency Resources
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-2xl transition-all duration-200"
              onClick={() => setShowCrisisDialog(false)}
            >
              Continue Chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
