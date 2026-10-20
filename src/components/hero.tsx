import { Aurora } from "@/components/aurora";
import { DownloadCount } from "@/components/download-count";
import { DownloadDialog } from "@/components/download-dialog";
import { Phone } from "@/components/phones/phone";
import { RELAY_VERSION } from "@/lib/release";
import { BellRing, Landmark, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function AlertCard({
  icon,
  title,
  body,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`glass absolute w-[10.6rem] rounded-2xl p-3 text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:w-60 sm:p-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-[11px] font-medium text-white/60 sm:text-xs">
        <span className="grid size-5 place-items-center rounded-md bg-white/12 sm:size-6">{icon}</span>
        {title}
      </div>
      <p className="mt-1.5 text-[12px] leading-snug text-white sm:mt-2 sm:text-sm">{body}</p>
    </div>
  );
}

export function Hero({ openDownload = false }: { openDownload?: boolean }) {
  return (
    <section className="relative isolate overflow-x-clip">
      <Aurora className="absolute inset-x-0 top-0 -z-10 h-[56rem] sm:h-[62rem]" />

      <div className="site-wrap flex flex-col items-center pt-32 text-center sm:pt-40">
        <p className="rise glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] text-white/80">
          <Sparkles className="size-4 text-[#9db4ff]" aria-hidden="true" />
          Relay {RELAY_VERSION} · Free for Android
        </p>

        <h1 className="rise rise-1 mt-8 max-w-4xl text-[clamp(3.1rem,11.5vw,7.25rem)] leading-[0.95] font-medium tracking-[-0.055em] text-white">
          Give Grok
          <br />
          <span className="accent-serif text-[1.06em] tracking-[-0.03em]">a phone.</span>
        </h1>

        <p className="rise rise-2 mt-7 max-w-xl text-[1.15rem] leading-[1.45] text-white/70 sm:text-xl">
          Relay forwards the texts and notifications you pick to Grok, so your AI finally knows what&apos;s going on.
        </p>

        <div className="rise rise-3 mt-10 flex flex-wrap items-center justify-center gap-3">
          <DownloadDialog initialOpen={openDownload} variant="hero" />
          <Link
            href="/#setup"
            className="inline-flex h-14 items-center rounded-full border border-white/15 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8aa4ff]"
          >
            See the setup
          </Link>
        </div>
        <div className="rise rise-3 mt-5 min-h-5">
          <Suspense fallback={null}>
            <DownloadCount />
          </Suspense>
        </div>
      </div>

      {/* The phone rises out of the bottom of the hero, with the alerts that flow to Grok */}
      <div className="rise rise-4 relative mx-auto mt-10 h-[30rem] w-full max-w-3xl overflow-hidden sm:mt-14 sm:h-[34rem]">
        <div className="absolute inset-x-0 top-[6.5rem] flex justify-center sm:top-0">
          <Phone screen="home" priority className="float-slow [--s:0.6] sm:[--s:0.76]" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050507] to-transparent" />
        <AlertCard
          icon={<Landmark className="size-3 sm:size-3.5" />}
          title="UCB · SMS"
          body="Tk 1,200 debited at Daraz. Balance Tk 8,430."
          className="float-slower top-0 left-3 sm:top-[14%] sm:left-0"
        />
        <AlertCard
          icon={<BellRing className="size-3 sm:size-3.5" />}
          title="bKash"
          body="You have received Tk 2,500 from Rafi."
          className="float-slow top-4 right-3 sm:top-[40%] sm:right-0"
        />
      </div>
    </section>
  );
}
