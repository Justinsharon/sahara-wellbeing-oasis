
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Phone, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage } from "@/types";

const predefinedQuestions = [
  "I'm feeling anxious today",
  "How can I manage stress?",
  "I'm having trouble sleeping",
  "I feel overwhelmed with work",
  "Can you help me with breathing exercises?",
  "I'm feeling lonely"
];

const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "can't go on"];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm Nia, your AI wellness companion. I'm here to listen and provide support. How are you feeling today?",
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
      return "I'm concerned about what you've shared. Your safety is my top priority. Let me connect you with immediate support resources.";
    }

    const responses = [
      "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what's been on your mind?",
      "Thank you for sharing with me. It takes courage to open up. How long have you been feeling this way?",
      "I'm here to support you through this. Have you tried any coping strategies that have helped in the past?",
      "Your wellbeing matters. Let's work through this together. What would feel most helpful right now?",
      "I appreciate you trusting me with your feelings. Remember, you're not alone in this journey."
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
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">Chat with Nia</h1>
              <p className="text-muted-foreground">Your AI wellness companion</p>
            </div>
          </div>
        </div>

        {/* Predefined Questions */}
        {messages.length <= 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {predefinedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left justify-start h-auto p-3"
                    onClick={() => handlePredefinedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" 
                      ? "bg-blue-100" 
                      : "bg-purple-100"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div className={`max-w-xs lg:max-w-md ${
                    message.sender === "user" ? "text-right" : ""
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputValue);
                  }
                }}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Detection Dialog */}
        <Dialog open={showCrisisDialog} onOpenChange={setShowCrisisDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Immediate Support Available
              </DialogTitle>
              <DialogDescription>
                I'm concerned about your safety. Please consider reaching out for immediate support.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.location.href = "tel:988"}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Crisis Hotline (988)
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = "/emergency"}
              >
                <Heart className="w-4 h-4 mr-2" />
                Emergency Resources
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowCrisisDialog(false)}
              >
                Continue Chat
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
