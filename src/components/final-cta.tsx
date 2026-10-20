import { Aurora } from "@/components/aurora";
import { DownloadDialog } from "@/components/download-dialog";
import { RELAY_VERSION } from "@/lib/release";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Aurora className="absolute inset-0 -z-10 rotate-180 opacity-70" />
      <div className="site-wrap flex flex-col items-center py-28 text-center md:py-40">
        <h2 className="max-w-3xl text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.97] font-medium tracking-[-0.055em]">
          Your phone knows things. <span className="accent-serif">Let Grok in on it.</span>
        </h2>
        <p className="mt-6 max-w-md text-lg text-white/65">Free for Android. Version {RELAY_VERSION}.</p>
        <div className="mt-9">
          <DownloadDialog variant="cta" />
        </div>
      </div>
    </section>
  );
}
