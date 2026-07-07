"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates the leading number in a stat value (e.g. "500+" -> counts
 * 0 to 500, then appends the "+"). Falls back to rendering the value
 * as-is immediately if it has no leading number, if the user prefers
 * reduced motion, or if IntersectionObserver isn't available — so the
 * figure is never hidden or wrong while waiting on JS/animation.
 */
export function CounterStat({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (target === null) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(match![1]);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDisplay(match![1]);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();
        const isInt = Number.isInteger(target);

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          setDisplay(isInt ? String(Math.round(current)) : current.toFixed(1));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
