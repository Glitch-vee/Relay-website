import { DownloadCount } from "@/components/download-count";
import { DownloadDialog } from "@/components/download-dialog";
import { PhoneReel } from "@/components/phone-reel";
import { Suspense } from "react";

const steps = [
  { n: "1", label: "Pick the alerts" },
  { n: "2", label: "Send them to Grok" },
  { n: "3", label: "You chill" },
];

export function Hero({ openDownload = false }: { openDownload?: boolean }) {
  return (
    <section className="flex flex-1 items-center">
      <div className="site-wrap grid w-full items-center gap-4 py-3 lg:grid-cols-[minmax(0,34rem)_auto] lg:justify-between lg:gap-12 lg:py-2">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="text-xs font-medium tracking-[0.14em] text-[#c4b6ff] uppercase">
            Free for Android
          </p>
          <h1 className="mt-3 text-[2.65rem] leading-[0.98] font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.25rem]">
            Give Grok a phone.
          </h1>
          <p className="mt-4 text-[1.02rem] leading-snug text-white/70 sm:text-lg">
            Relay forwards the texts and notifications you pick to Grok, so your AI finally knows
            what&apos;s going on.
          </p>
          <ol className="mt-5 hidden gap-2 lg:grid lg:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.n}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left"
              >
                <span className="text-[11px] font-medium text-[#b7a6ff]">{step.n}</span>
                <p className="text-sm text-white/85">{step.label}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col items-center gap-2 lg:items-start">
            <DownloadDialog initialOpen={openDownload} />
            <Suspense fallback={null}>
              <DownloadCount />
            </Suspense>
          </div>
        </div>
        <PhoneReel />
      </div>
    </section>
  );
}
