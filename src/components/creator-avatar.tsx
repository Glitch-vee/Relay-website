"use client";

import { CREATOR } from "@/lib/creator";
import { useEffect, useRef, useState } from "react";

/**
 * Shows public/alvee.jpg when it exists and a green-ringed monogram when it does not,
 * so there is never a broken image. Alvee's brand ring is green on near-black.
 */
export function CreatorAvatar({ size = 96, className = "" }: { size?: number; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-[#111] ring-[3px] ring-[#5cb800] ring-offset-[3px] ring-offset-[#050507] ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="font-semibold tracking-[-0.04em] text-[#5cb800]" style={{ fontSize: size * 0.4 }} aria-hidden="true">
        AA
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={CREATOR.photo}
        alt={`${CREATOR.name}`}
        width={size}
        height={size}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
