"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StampBadgeProps {
  label: string;
  className?: string;
}

/**
 * The single signature moment on the Home hero: an ink-stamp presses
 * down once on load. If the user prefers reduced motion, it simply
 * fades in instead of animating — the badge itself never depends on
 * the animation to be legible.
 */
export function StampBadge({ label, className }: StampBadgeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
  }, []);

  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-visa-red px-4 py-2",
        "font-mono text-sm uppercase tracking-wide text-visa-red -rotate-6",
        reduceMotion ? "animate-none opacity-100" : "animate-stamp-press",
        className
      )}
    >
      <span aria-hidden>✓</span>
      {label}
    </div>
  );
}
