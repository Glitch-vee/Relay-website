import { CreatorAvatar } from "@/components/creator-avatar";
import { SOCIALS, SocialIcon, isExternal } from "@/components/social-icons";
import { CREATOR } from "@/lib/creator";
import { ArrowUpRight, MapPin } from "lucide-react";

/** Every profile as a full-size, labelled row. Works in server and client trees. */
export function SocialList({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-2.5 ${className}`}>
      {SOCIALS.map((social) => (
        <li key={social.key}>
          <a
            href={social.href}
            target={isExternal(social.href) ? "_blank" : undefined}
            rel={isExternal(social.href) ? "noreferrer noopener" : undefined}
            className="group flex min-h-14 items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8aa4ff]"
          >
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl"
              style={{ background: `${social.color}22` }}
            >
              <SocialIcon social={social} className="size-5" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[15px] font-medium text-white">{social.label}</span>
              <span className="block truncate text-[13px] text-white/50">{social.handle}</span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-white/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CreatorIdentity({ size = 96 }: { size?: number }) {
  return (
    <div className="flex items-center gap-4">
      <CreatorAvatar size={size} />
      <div>
        <p className="text-2xl font-semibold tracking-[-0.03em] text-white">{CREATOR.name}</p>
        <p className="mt-0.5 text-sm font-medium text-[#7acc22]">{CREATOR.tagline}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-white/50">
          <MapPin className="size-3.5" aria-hidden="true" />
          {CREATOR.location}
        </p>
      </div>
    </div>
  );
}

/** The landing page section and the end of the setup guide. */
export function CreatorSection({ id = "creator" }: { id?: string }) {
  return (
    <section id={id} className="site-wrap py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0e] p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-32 size-[28rem] rounded-full bg-[#5cb800]/[0.12] blur-3xl"
        />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="text-sm font-medium tracking-[0.14em] text-[#7acc22] uppercase">Built by</p>
            <div className="mt-6">
              <CreatorIdentity size={104} />
            </div>
            <h2 className="mt-8 text-3xl leading-[1.05] font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Made by one person, <span className="accent-serif">for real phones.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/65">{CREATOR.bio}</p>
            <a
              href={CREATOR.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-full bg-[#5cb800] px-6 text-[15px] font-semibold text-[#0a1400] transition-colors hover:bg-[#6fd000] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7acc22]"
            >
              Connect on LinkedIn
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div>
            <p className="mb-3 text-sm text-white/50">Find me here</p>
            <SocialList />
          </div>
        </div>
      </div>
    </section>
  );
}
