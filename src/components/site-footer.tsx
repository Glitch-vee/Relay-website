import { SOCIALS, SocialIcon, isExternal } from "@/components/social-icons";
import { CREATOR } from "@/lib/creator";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="site-wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={36} height={36} className="size-9 rounded-[10px]" />
            <span className="text-xl font-semibold tracking-[-0.03em]">Relay</span>
          </Link>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/55">
            Forwards the texts and notifications you pick to Grok. Free for Android.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-medium text-white/40">Relay</p>
          <ul className="mt-4 grid gap-1 text-[15px] text-white/70">
            {[
              ["/#how", "How it works"],
              ["/#app", "The app"],
              ["/#setup", "Setup"],
              ["/guide", "Full setup guide"],
              ["/#creator", "Creator"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-block py-1.5 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-medium text-white/40">Built by {CREATOR.name}</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {SOCIALS.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  aria-label={`${social.label}: ${social.handle}`}
                  title={social.label}
                  target={isExternal(social.href) ? "_blank" : undefined}
                  rel={isExternal(social.href) ? "noreferrer noopener" : undefined}
                  className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] transition-colors hover:border-white/25 hover:bg-white/10"
                >
                  <SocialIcon social={social} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-white/45">{CREATOR.tagline}</p>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="site-wrap flex flex-col gap-2 py-5 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Relay is made by {CREATOR.name} in {CREATOR.location}.
          </p>
          <Link href="/stats" className="hover:text-white/70">
            Stats
          </Link>
        </div>
      </div>
    </footer>
  );
}
