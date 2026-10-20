"use client";

import { PhoneFrame } from "@/components/phones/phone-frame";
import { cn } from "cn";
import Image from "next/image";
import { useEffect, useState } from "react";

const SCREENS = ["/screens/home.webp", "/screens/connection.webp", "/screens/apps.webp"] as const;

/** The three main Relay screens, fading one into the next. Still for reduced motion. */
export function PhoneCycle({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % SCREENS.length), 3600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <PhoneFrame label="Screens from the Relay app" className={className}>
      {SCREENS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={450}
          height={1000}
          unoptimized
          priority={i === 0}
          loading="eager"
          className={cn(
            "absolute inset-0 h-[1000px] w-[450px] max-w-none transition-opacity duration-700 motion-reduce:transition-none",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </PhoneFrame>
  );
}
