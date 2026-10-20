import { BatteryFull, SignalHigh, Wifi } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Screens are drawn on a fixed 450 x 1000 canvas and scaled with --s, so every phone is
 * vector sharp at any size. Set the scale with a class such as `[--s:0.6] md:[--s:0.8]`.
 */
export function PhoneFrame({
  children,
  label,
  scale,
  className = "",
}: {
  children: ReactNode;
  label: string;
  scale?: number;
  className?: string;
}) {
  const style = scale ? ({ "--s": scale } as CSSProperties) : undefined;
  return (
    <div
      role="img"
      aria-label={label}
      style={style}
      className={`relative shrink-0 rounded-[calc(54px*var(--s)+9px)] bg-[#0b0b0e] p-[9px] shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_0_0_2px_rgba(0,0,0,0.9),0_40px_100px_-40px_rgba(140,160,255,0.28),0_20px_40px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* side buttons */}
      <span aria-hidden="true" className="absolute top-[22%] -right-[3px] h-[9%] w-[3px] rounded-r bg-white/15" />
      <span aria-hidden="true" className="absolute top-[16%] -left-[3px] h-[5%] w-[3px] rounded-l bg-white/15" />
      <div
        aria-hidden="true"
        className="relative overflow-hidden bg-black"
        style={{
          width: "calc(450px * var(--s))",
          height: "calc(1000px * var(--s))",
          borderRadius: "calc(54px * var(--s))",
        }}
      >
        <div className="absolute top-0 left-0 h-[1000px] w-[450px] origin-top-left" style={{ transform: "scale(var(--s))" }}>
          {children}
          <div className="absolute inset-x-0 top-0 flex h-[56px] items-end justify-between bg-black px-[34px] pb-[6px] text-[19px] font-semibold text-white">
            <span>9:41</span>
            <span className="flex items-center gap-[9px]">
              <SignalHigh size={21} strokeWidth={2.4} />
              <Wifi size={21} strokeWidth={2.4} />
              <BatteryFull size={26} strokeWidth={2} />
            </span>
          </div>
          <div className="absolute bottom-[14px] left-1/2 h-[6px] w-[150px] -translate-x-1/2 rounded-full bg-white/70" />
        </div>
        {/* glass reflection */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.07),transparent_32%)]" />
      </div>
    </div>
  );
}
