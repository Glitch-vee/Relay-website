import { ContactLinks } from "@/components/contact-links";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="shrink-0 pb-[env(safe-area-inset-bottom)]">
      <div className="site-wrap flex flex-col gap-3 py-3 sm:flex-row sm:items-end sm:justify-between">
        <ContactLinks />
        <nav aria-label="Footer" className="flex gap-4 text-[13px] text-white/45">
          <Link href="/guide" className="hover:text-white/80">
            Setup guide
          </Link>
          <Link href="/stats" className="hover:text-white/80">
            Stats
          </Link>
        </nav>
      </div>
    </footer>
  );
}
