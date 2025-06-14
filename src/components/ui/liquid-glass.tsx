
import * as React from "react";
import { cn } from "@/lib/utils";
import "./liquid-glass.css";

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "card" | "overlay" | "crystal" | "input" | "button";
  interactive?: boolean;
  floating?: boolean;
  bubbles?: boolean;
  liquidBorder?: boolean;
  children: React.ReactNode;
}

const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ 
    className, 
    variant = "card", 
    interactive = false,
    floating = false,
    bubbles = false,
    liquidBorder = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = {
      card: "liquid-glass-card",
      overlay: "frosted-glass-overlay",
      crystal: "crystal-glass-element",
      input: "liquid-glass-input",
      button: "liquid-glass-button"
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses[variant],
          {
            "liquid-ripple glass-distortion": interactive,
            "floating-glass": floating,
            "bubble-effect": bubbles,
            "liquid-border": liquidBorder
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGlass.displayName = "LiquidGlass";

export { LiquidGlass };
