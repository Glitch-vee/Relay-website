"use client";

import { CreatorIdentity, SocialChips } from "@/components/creator-card";
import { normalizeEmail } from "@/lib/email";
import { APK_PATH, RELAY_VERSION } from "@/lib/release";
import { Dialog } from "@base-ui/react/dialog";
import { Check, Download, X } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const styles = {
  hero: "h-14 gap-2.5 bg-white px-7 text-base text-black hover:bg-white/90",
  nav: "h-10 gap-2 bg-white px-5 text-sm text-black hover:bg-white/90",
} as const;

export function DownloadDialog({
  initialOpen = false,
  variant = "hero",
  label = "Download",
}: {
  initialOpen?: boolean;
  variant?: keyof typeof styles;
  label?: string;
}) {
  const [open, setOpen] = useState(initialOpen);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaned = normalizeEmail(email);
    if (!cleaned) {
      setError("That email does not look right.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: cleaned }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(
          payload?.error === "email"
            ? "That email does not look right."
            : "Could not save that just now. Try again.",
        );
        setPending(false);
        return;
      }

      const link = document.createElement("a");
      link.href = APK_PATH;
      link.download = APK_PATH.slice(1);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDone(true);
      setPending(false);
    } catch {
      setError("Could not save that just now. Try again.");
      setPending(false);
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) window.setTimeout(() => setDone(false), 200);
      }}
    >
      <Dialog.Trigger
        className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8aa4ff] ${styles[variant]}`}
      >
        <Download className="size-[1.1em]" aria-hidden="true" />
        {label}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-md" />
        <Dialog.Popup className="fixed inset-x-3 top-1/2 z-[70] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-md -translate-y-1/2 overflow-y-auto rounded-[1.75rem] border border-white/12 bg-[#0e0e12] p-6 text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] outline-none sm:p-8">
          <Dialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
          >
            <X className="size-4" aria-hidden="true" />
          </Dialog.Close>

          {done ? (
            <div>
              <span className="grid size-11 place-items-center rounded-full bg-[#30d158] text-black">
                <Check className="size-5" strokeWidth={3} aria-hidden="true" />
              </span>
              <Dialog.Title className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.03em]">
                Relay {RELAY_VERSION} is downloading.
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-[15px] text-white/55">
                Open the file when it finishes.
              </Dialog.Description>
              <Link
                href="/#setup"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-[15px] font-semibold text-black hover:bg-white/90"
              >
                Setup guide
              </Link>

              <div className="mt-7 border-t border-white/10 pt-6">
                <CreatorIdentity size={48} />
                <SocialChips className="mt-5" />
              </div>
            </div>
          ) : (
            <div>
              <Dialog.Title className="pr-8 text-2xl leading-tight font-semibold tracking-[-0.03em]">
                Your email
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-[15px] leading-relaxed text-white/60">
                Drop your email and the app downloads.
              </Dialog.Description>
              <form className="mt-6" onSubmit={onSubmit}>
                <label className="block text-sm text-white/70" htmlFor="relay-email">
                  Email
                </label>
                <input
                  id="relay-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                  className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-white/5 px-4 text-base text-white outline-none placeholder:text-white/30 focus:border-[#8aa4ff]"
                />
                {error ? (
                  <p className="mt-2 text-sm text-[#ff9b94]" role="alert">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={pending}
                  className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-[15px] font-semibold text-black hover:bg-white/90 disabled:opacity-60"
                >
                  <Download className="size-4" aria-hidden="true" />
                  {pending ? "Sending..." : "Download Relay"}
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-white/40">Free · Android 8 or newer · v{RELAY_VERSION} APK</p>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
