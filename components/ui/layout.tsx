import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

// Eyebrow label uses mono type — reserved for data/labels, not decoration,
// per the design system's utility-face rule.
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp-gold mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-sans font-extrabold tracking-tight text-3xl sm:text-4xl text-ink-navy">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-body text-slate leading-relaxed">{description}</p>
      )}
    </div>
  );
}
