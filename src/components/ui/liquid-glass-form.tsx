import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { LiquidGlass } from "./liquid-glass";

export interface LiquidGlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const LiquidGlassInput = React.forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-deep-charcoal">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "liquid-glass-input w-full px-4 py-3 text-deep-charcoal placeholder:text-warm-gray",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

LiquidGlassInput.displayName = "LiquidGlassInput";

export interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      default: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    const variantClasses = {
      default: "liquid-glass-button",
      ghost: "liquid-glass-card text-deep-charcoal"
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "liquid-ripple rounded-2xl font-semibold transition-all duration-300",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

LiquidGlassButton.displayName = "LiquidGlassButton";

export interface LiquidGlassFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
}

export const LiquidGlassForm = React.forwardRef<HTMLFormElement, LiquidGlassFormProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <LiquidGlass variant="card" className={cn("p-8 max-w-md mx-auto", className)}>
        <form ref={ref} className="space-y-6" {...props}>
          {(title || description) && (
            <div className="text-center space-y-2">
              {title && (
                <h2 className="text-2xl font-bold text-deep-charcoal">{title}</h2>
              )}
              {description && (
                <p className="text-warm-gray">{description}</p>
              )}
            </div>
          )}
          {children}
        </form>
      </LiquidGlass>
    );
  }
);

LiquidGlassForm.displayName = "LiquidGlassForm";
