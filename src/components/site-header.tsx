import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="shrink-0">
      <div className="site-wrap flex h-12 items-center pt-[env(safe-area-inset-top)]">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b74ff]"
        >
          <Image src="/logo.png" alt="" width={28} height={28} className="size-7" priority />
          <span className="text-[0.95rem] font-semibold tracking-[-0.02em] text-white">Relay</span>
        </Link>
      </div>
    </header>
  );
}
