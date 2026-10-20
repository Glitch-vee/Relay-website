import { CreatorAvatar } from "@/components/creator-avatar";
import { SOCIALS, SocialIcon, isExternal } from "@/components/social-icons";
import { CREATOR } from "@/lib/creator";

export function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-white/8 pb-[env(safe-area-inset-bottom)]">
      <div className="site-wrap flex h-[4.5rem] items-center justify-between gap-3">
        <a
          href={CREATOR.links.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8aa4ff]"
        >
          <CreatorAvatar size={32} className="max-sm:hidden" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[15px] font-medium text-white">{CREATOR.name}</span>
            <span className="hidden truncate text-[12px] text-[#7acc22] sm:block">{CREATOR.tagline}</span>
          </span>
        </a>
        <ul className="flex shrink-0 items-center">
          {SOCIALS.map((social) => (
            <li key={social.key}>
              <a
                href={social.href}
                aria-label={`${social.label}: ${social.handle}`}
                title={social.label}
                target={isExternal(social.href) ? "_blank" : undefined}
                rel={isExternal(social.href) ? "noreferrer noopener" : undefined}
                className="grid size-11 place-items-center rounded-full opacity-80 transition-opacity hover:bg-white/8 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-[#8aa4ff]"
              >
                <SocialIcon social={social} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
