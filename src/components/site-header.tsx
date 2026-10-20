import { DownloadDialog } from "@/components/download-dialog";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="shrink-0">
      <div className="site-wrap flex h-16 items-center justify-between pt-[env(safe-area-inset-top)]">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8aa4ff]"
        >
          <Image src="/logo.png" alt="" width={32} height={32} className="size-8 rounded-[9px]" priority />
          <span className="text-lg font-semibold tracking-[-0.03em] text-white">Relay</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/#setup" className="rounded-full px-4 py-2 text-[15px] text-white/60 transition-colors hover:text-white">
            Setup
          </Link>
          <DownloadDialog variant="nav" />
        </div>
      </div>
    </header>
  );
}
