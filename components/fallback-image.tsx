"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface FallbackImageProps extends Omit<ImageProps, "onError" | "src"> {
  src: string;
  fallbackSrc: string;
}

/** Swaps to fallbackSrc if the primary image fails to load (e.g. a
 * Cloudinary public ID that hasn't been uploaded yet, or a network
 * blip) — so a broken image never ships to a visitor. */
export function FallbackImage({ src, fallbackSrc, alt, ...props }: FallbackImageProps) {
  const [current, setCurrent] = useState(src);
  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => setCurrent(fallbackSrc)}
    />
  );
}
