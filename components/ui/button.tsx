import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Render as the child element (e.g. an <a>) instead of a <button> */
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-stamp-gold text-ink-navy hover:bg-stamp-gold/90 focus-visible:ring-stamp-gold",
  secondary:
    "bg-transparent border border-boarding-paper/40 text-boarding-paper hover:bg-boarding-paper/10 focus-visible:ring-boarding-paper",
  ghost:
    "bg-transparent text-ink-navy hover:bg-ink-navy/5 focus-visible:ring-ink-navy",
  whatsapp:
    "bg-approved-green text-boarding-paper hover:bg-approved-green/90 focus-visible:ring-approved-green",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

// Every interactive control keeps a visible focus ring — accessibility
// floor from the audit (WCAG 2.2 AA, focus states).
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
