import { CreatorAvatar } from "@/components/creator-avatar";
import { SOCIALS, SocialIcon, isExternal } from "@/components/social-icons";
import { CREATOR } from "@/lib/creator";

/** Labelled profile chips. Safe to use in server and client trees. */
export function SocialChips({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIALS.map((social) => (
        <li key={social.key}>
          <a
            href={social.href}
            target={isExternal(social.href) ? "_blank" : undefined}
            rel={isExternal(social.href) ? "noreferrer noopener" : undefined}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/85 transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8aa4ff]"
          >
            <SocialIcon social={social} className="size-4" />
            {social.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CreatorIdentity({ size = 56 }: { size?: number }) {
  return (
    <div className="flex items-center gap-4">
      <CreatorAvatar size={size} />
      <div>
        <p className="text-lg font-semibold tracking-[-0.02em] text-white">{CREATOR.name}</p>
        <p className="text-sm text-[#7acc22]">{CREATOR.tagline}</p>
      </div>
    </div>
  );
}
