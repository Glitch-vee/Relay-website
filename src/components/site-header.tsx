"use client";

import { DownloadDialog } from "@/components/download-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#app", label: "The app" },
  { href: "/#setup", label: "Setup" },
  { href: "/#creator", label: "Creator" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-white/10 bg-black/55 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="site-wrap flex h-[4.5rem] items-center justify-between pt-[env(safe-area-inset-top)] md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8aa4ff]"
        >
          <Image src="/logo.png" alt="" width={36} height={36} className="size-9 rounded-[10px]" priority />
          <span className="text-xl font-semibold tracking-[-0.03em] text-white">Relay</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[15px] text-white/70 transition-colors hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <DownloadDialog variant="nav" />
          </div>
          <Dialog.Root open={menu} onOpenChange={setMenu}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="grid size-12 place-items-center rounded-full bg-white text-black transition-transform active:scale-95 md:hidden"
            >
              <Menu className="size-6" strokeWidth={2.2} aria-hidden="true" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl" />
              <Dialog.Popup className="fixed inset-0 z-[60] flex flex-col px-5 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] outline-none">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="flex h-[3.75rem] items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <Image src="/logo.png" alt="" width={36} height={36} className="size-9 rounded-[10px]" />
                    <span className="text-xl font-semibold tracking-[-0.03em]">Relay</span>
                  </span>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="grid size-12 place-items-center rounded-full bg-white text-black"
                  >
                    <X className="size-6" strokeWidth={2.2} aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav aria-label="Menu" className="mt-8 flex flex-1 flex-col">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="border-b border-white/10 py-5 text-[2rem] font-semibold tracking-[-0.04em] text-white active:text-white/60"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/guide"
                    onClick={() => setMenu(false)}
                    className="border-b border-white/10 py-5 text-[2rem] font-semibold tracking-[-0.04em] text-white active:text-white/60"
                  >
                    Full guide
                  </Link>
                </nav>
                <div className="flex justify-center">
                  <DownloadDialog variant="hero" />
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
