

import { useState } from "react";
import { MessageCircle, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FloatingChatButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50 safe-area-bottom">
      {/* Main Floating Button */}
      <div className="relative">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-slow"
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <Heart className="w-6 h-6" />
          )}
        </Button>

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">•</span>
        </div>
      </div>

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-4 min-w-48 animate-scale-in">
          <div className="space-y-3">
            <div className="text-center pb-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Chat with Nia</h3>
              <p className="text-xs text-gray-600">Your AI wellness companion</p>
            </div>
            
            <Link
              to="/chat"
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Open Chat</p>
                <p className="text-xs text-gray-600">Start conversation</p>
              </div>
            </Link>

            <button
              onClick={() => setIsExpanded(false)}
              className="w-full p-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Quick wellness check-in coming soon...
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

