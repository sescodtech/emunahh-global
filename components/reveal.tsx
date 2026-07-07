"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: "div" | "li";
}

const delayClass: Record<number, string> = {
  0: "",
  1: "delay-100",
  2: "delay-200",
  3: "delay-300",
  4: "delay-[400ms]",
};

/**
 * Fades and lifts content into view as it enters the viewport. Content
 * renders fully visible by default (no JS = no loss of content) and
 * only gets hidden once we've confirmed IntersectionObserver is
 * available client-side, so this never risks hiding content for
 * crawlers, slow connections, or JS failures.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setReady(true);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "transition-all duration-700 ease-out",
        ready && !visible && "opacity-0 translate-y-4",
        (visible || !ready) && "opacity-100 translate-y-0",
        delayClass[delay],
        className
      )}
    >
      {children}
    </Tag>
  );
}
