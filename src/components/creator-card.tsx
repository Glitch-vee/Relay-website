import { CreatorAvatar } from "@/components/creator-avatar";
import { SOCIALS, SocialIcon, isExternal } from "@/components/social-icons";
import { CREATOR } from "@/lib/creator";

/** One row of profile tiles: brand icon over a short label. Safe in server and client trees. */
export function SocialTiles({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-5 gap-1.5 ${className}`}>
      {SOCIALS.map((social) => (
        <li key={social.key}>
          <a
            href={social.href}
            aria-label={`${social.label}: ${social.handle}`}
            target={isExternal(social.href) ? "_blank" : undefined}
            rel={isExternal(social.href) ? "noreferrer noopener" : undefined}
            className="flex h-16 flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] text-[11px] text-white/70 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8aa4ff]"
          >
            <SocialIcon social={social} className="size-5" />
            {social.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CreatorIdentity({ size = 44 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3.5">
      <CreatorAvatar size={size} />
      <div className="leading-tight">
        <p className="text-base font-semibold tracking-[-0.02em] text-white">{CREATOR.name}</p>
        <p className="text-[13px] text-[#7acc22]">{CREATOR.tagline}</p>
      </div>
    </div>
  );
}
