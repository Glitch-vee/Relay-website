import { DownloadCount } from "@/components/download-count";
import { DownloadDialog } from "@/components/download-dialog";
import { PhoneCycle } from "@/components/phone-cycle";
import { RELAY_VERSION } from "@/lib/release";
import Link from "next/link";
import { Suspense } from "react";

export function Hero({ openDownload = false }: { openDownload?: boolean }) {
  return (
    <div className="overflow-x-clip">
      <section className="site-wrap grid h-[calc(100dvh-4rem)] min-h-[34rem] grid-rows-[auto_minmax(0,1fr)] gap-8 pt-6 text-center lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-1 lg:items-center lg:gap-24 lg:pt-0 lg:text-left">
        <div className="mx-auto flex flex-col items-center lg:mx-0 lg:items-start">
          <h1 className="rise text-[clamp(3rem,10vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.055em] text-white">
            Give Grok
            <br />
            <span className="accent-serif text-[1.06em] tracking-[-0.03em]">
              a phone.
            </span>
          </h1>
          <p className="rise rise-1 mt-5 max-w-md text-lg leading-snug text-white/60 sm:text-xl">
            Relay sends the texts and alerts you pick to Grok.
          </p>
          <div className="rise rise-2 mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <DownloadDialog initialOpen={openDownload} variant="hero" />
            <Link
              href="/#setup"
              className="inline-flex h-14 items-center rounded-full border border-white/15 px-7 text-base font-semibold text-white transition-colors hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8aa4ff]"
            >
              Setup
            </Link>
          </div>
          <p className="rise rise-3 mt-4 text-sm text-white/40">
            Free · Android 8+ · v{RELAY_VERSION}
            <Suspense fallback={null}>
              <DownloadCount />
            </Suspense>
          </p>
        </div>

        <div className="rise rise-2 relative min-h-0 overflow-hidden lg:overflow-visible">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 hidden size-[34rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(130,150,255,0.14),transparent)] lg:block"
          />
          <div className="relative flex justify-center">
            <PhoneCycle className="[--s:0.5] sm:[--s:0.56] lg:[--s:0.62] [@media(min-width:1024px)_and_(min-height:860px)]:[--s:0.7]" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050507] to-transparent lg:hidden" />
        </div>
      </section>
    </div>
  );
}
