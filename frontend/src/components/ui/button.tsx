import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none text-sm select-none cursor-pointer";

    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600",
      secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200",
      outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900",
      danger: "bg-red-600 hover:bg-red-700 text-white border border-red-600",
      subtle: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-sm gap-2",
      lg: "h-10 px-5 text-base gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
