"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Slow, glassy ribbon behind the hero. Two layers drift with CSS transforms and the
 * ribbon shapes themselves morph with SMIL. Both pause when off screen and stay still
 * for people who ask for reduced motion.
 */

const A1 = "M-260 330 C 60 40, 420 80, 600 330 S 1020 760, 1720 380";
const A2 = "M-260 400 C 100 150, 380 260, 620 280 S 1000 620, 1720 300";
const B1 = "M-200 780 C 260 500, 560 920, 860 620 S 1260 180, 1700 300";
const B2 = "M-200 700 C 220 620, 600 780, 880 560 S 1240 300, 1700 220";

function Ribbon({
  d,
  morph,
  id,
  width,
  animate,
  dur,
}: {
  d: string;
  morph: string;
  id: string;
  width: number;
  animate: boolean;
  dur: string;
}) {
  const shape = { fill: "none", strokeLinecap: "round" as const };
  const morphing = animate ? (
    <animate
      attributeName="d"
      dur={dur}
      values={`${d};${morph};${d}`}
      keySplines=".45 0 .55 1;.45 0 .55 1"
      calcMode="spline"
      repeatCount="indefinite"
    />
  ) : null;

  return (
    <g>
      {/* soft outer glow, then the body, then a thin highlight along the top edge */}
      <path d={d} {...shape} stroke={`url(#${id})`} strokeWidth={width * 1.9} opacity={0.1}>
        {morphing}
      </path>
      <path d={d} {...shape} stroke={`url(#${id})`} strokeWidth={width * 1.35} opacity={0.22}>
        {morphing}
      </path>
      <path d={d} {...shape} stroke={`url(#${id})`} strokeWidth={width} opacity={0.85}>
        {morphing}
      </path>
      <path
        d={d}
        {...shape}
        stroke="url(#aurora-sheen)"
        strokeWidth={width * 0.34}
        opacity={0.75}
        transform="translate(0 -14)"
      >
        {morphing}
      </path>
    </g>
  );
}

export function Aurora({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAnimate(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "80px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = rootRef.current?.querySelector("svg");
    if (!svg) return;
    if (visible && animate) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [visible, animate]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${visible ? "" : "aurora-paused"} ${className}`}
      style={{
        maskImage: "linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%)",
      }}
    >
      <svg
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id="aurora-a" x1="0" y1="0" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1637d6" />
            <stop offset="0.28" stopColor="#5b3df5" />
            <stop offset="0.5" stopColor="#2aa7e8" />
            <stop offset="0.72" stopColor="#1fc9a0" />
            <stop offset="1" stopColor="#3b5bff" />
          </linearGradient>
          <linearGradient id="aurora-b" x1="1440" y1="100" x2="0" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7a3df0" />
            <stop offset="0.35" stopColor="#e24fc4" />
            <stop offset="0.6" stopColor="#4a4cf2" />
            <stop offset="1" stopColor="#12b7c9" />
          </linearGradient>
          <linearGradient id="aurora-sheen" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9fe9ff" stopOpacity="0" />
            <stop offset="0.35" stopColor="#d9e2ff" stopOpacity="0.9" />
            <stop offset="0.65" stopColor="#b6fff0" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="aurora-glow" cx="50%" cy="38%" r="60%">
            <stop offset="0" stopColor="#3b2fb8" stopOpacity="0.38" />
            <stop offset="1" stopColor="#050507" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="1000" fill="url(#aurora-glow)" />
        <g className="aurora-a">
          <Ribbon d={A1} morph={A2} id="aurora-a" width={120} animate={animate} dur="16s" />
        </g>
        <g className="aurora-b">
          <Ribbon d={B1} morph={B2} id="aurora-b" width={96} animate={animate} dur="20s" />
        </g>
      </svg>
      {/* keeps the headline readable over bright parts of the ribbon */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_42%,rgba(5,5,7,0.62),transparent_75%)]" />
    </div>
  );
}
