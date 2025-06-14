
import { useState } from "react";
import { MessageCircle, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FloatingChatButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50 safe-area-bottom">
      {/* Main Floating Button with new 8-color palette */}
      <div className="relative">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-slow"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--classic-red-500)) 0%, 
              hsl(var(--classic-red-600)) 100%)`,
            boxShadow: `0 15px 35px rgba(192, 57, 43, 0.45), 0 6px 18px rgba(192, 57, 43, 0.35)`
          }}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <Heart className="w-6 h-6" />
          )}
        </Button>

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
             style={{
               background: `linear-gradient(135deg, 
                 hsl(var(--bright-orange-500)) 0%, 
                 hsl(var(--bright-orange-600)) 100%)`
             }}>
          <span className="text-xs text-white font-bold">•</span>
        </div>
      </div>

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 rounded-2xl shadow-2xl border border-white/20 p-4 min-w-48 animate-scale-in"
             style={{
               background: `linear-gradient(135deg, 
                 rgba(245, 213, 174, 0.95) 0%, 
                 rgba(248, 225, 225, 0.9) 50%,
                 rgba(251, 239, 249, 0.85) 100%)`,
               backdropFilter: 'blur(24px)',
               WebkitBackdropFilter: 'blur(24px)'
             }}>
          <div className="space-y-3">
            <div className="text-center pb-2 border-b border-white/30">
              <h3 className="font-semibold text-deep-navy-500">Chat with Nia</h3>
              <p className="text-xs text-muted-foreground">Your AI wellness companion</p>
            </div>
            
            <Link
              to="/chat"
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, 
                  rgba(248, 225, 225, 0.8) 0%, 
                  rgba(251, 239, 249, 0.6) 100%)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{
                     background: `linear-gradient(135deg, 
                       hsl(var(--soft-pink-100)) 0%, 
                       hsl(var(--light-peach-100)) 100%)`
                   }}>
                <MessageCircle className="w-4 h-4 text-classic-red-600" />
              </div>
              <div>
                <p className="font-medium text-deep-navy-500">Open Chat</p>
                <p className="text-xs text-muted-foreground">Start conversation</p>
              </div>
            </Link>

            <button
              onClick={() => setIsExpanded(false)}
              className="w-full p-2 text-xs text-muted-foreground hover:text-deep-burgundy-600 transition-colors"
            >
              Quick wellness check-in coming soon...
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
