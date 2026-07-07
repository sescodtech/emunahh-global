"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * A subtle commercial-aircraft flyover across the hero. Flies in from
 * the left, crosses the hero, flies out to the right, then repeats
 * automatically every 10 seconds for as long as the hero is in view.
 * Renders nothing at all if the user prefers reduced motion.
 */
export function PlaneFlyover({ src = "/images/plane.png" }: { src?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={`absolute left-0 top-[16%] w-40 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:w-56 lg:w-64 ${
          play ? "animate-plane-fly" : "opacity-0"
        }`}
      >
        <Image
          src={src}
          alt=""
          width={1200}
          height={816}
          className="h-auto w-full"
          unoptimized={src.startsWith("http")}
        />
      </div>
    </div>
  );
}
