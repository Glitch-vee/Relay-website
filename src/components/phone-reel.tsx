"use client";

import { cn } from "cn";
import Image from "next/image";
import { useEffect, useState } from "react";

const SCREENS = [
  {
    src: "/screens/home-three-dark.png",
    alt: "Relay home in dark mode. Orders still needs an address.",
  },
  {
    src: "/screens/connection-dark.png",
    alt: "A connection page in dark mode, with pause and activity.",
  },
  {
    src: "/screens/add-step-1.png",
    alt: "Naming a new connection.",
  },
  {
    src: "/screens/add-step-2.png",
    alt: "Pasting the address and key.",
  },
  {
    src: "/screens/add-step-3.png",
    alt: "Choosing messages, apps, or both.",
  },
  {
    src: "/screens/apps-picker.png",
    alt: "Picking which apps can send alerts.",
  },
  {
    src: "/screens/home-all-good.png",
    alt: "Relay home when every connection is working.",
  },
  {
    src: "/screens/home-three-light.png",
    alt: "Relay home in light mode.",
  },
] as const;

const INTERVAL_MS = 2500;

export function PhoneReel() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let timer = 0;
    const start = () => {
      timer = window.setInterval(() => {
        setIndex((current) => (current + 1) % SCREENS.length);
      }, INTERVAL_MS);
    };
    const onVisibility = () => {
      window.clearInterval(timer);
      if (!document.hidden) start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  const current = SCREENS[index];

  return (
    <figure className="mx-auto w-fit">
      <div className="relative aspect-[450/1000] h-[min(32dvh,260px)] overflow-hidden rounded-[1.65rem] border border-white/12 bg-black shadow-[0_0_80px_-24px_rgba(108,77,255,0.85)] sm:h-[min(46dvh,430px)] lg:h-[min(540px,calc(100dvh-8.25rem))]">
        {SCREENS.map((screen, screenIndex) => (
          <Image
            key={screen.src}
            src={screen.src}
            alt=""
            fill
            priority={screenIndex === 0}
            sizes="260px"
              className={cn(
              "object-cover object-center transition-opacity duration-700 ease-in-out motion-reduce:transition-none",
              screenIndex === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {current.alt}
      </p>
      <div className="mt-2 flex items-center justify-center">
        {SCREENS.map((screen, screenIndex) => {
          const selected = screenIndex === index;
          return (
            <button
              key={screen.src}
              type="button"
              aria-label={screen.alt}
              aria-current={selected ? "true" : undefined}
              onClick={() => setIndex(screenIndex)}
              className="grid size-6 place-items-center"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all motion-reduce:transition-none",
                  selected ? "w-4 bg-white" : "w-1.5 bg-white/35",
                )}
              />
            </button>
          );
        })}
      </div>
    </figure>
  );
}
