"use client";

import { buttonVariants } from "@/components/ui/button";
import { normalizeEmail } from "@/lib/email";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function DownloadDialog({ initialOpen = false }: { initialOpen?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(initialOpen);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

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
      link.href = "/Relay-v3.0.apk";
      link.download = "Relay-v3.0.apk";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => {
        router.push("/guide");
      }, 500);
    } catch {
      setError("Could not save that just now. Try again.");
      setPending(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={cn(
          buttonVariants({
            size: "lg",
            className:
              "h-12 rounded-full bg-[#6C4DFF] px-7 text-base font-semibold text-white shadow-[0_0_36px_-10px_rgba(108,77,255,0.95)] hover:bg-[#7c62ff]",
          }),
        )}
      >
        Download
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-[#121218] p-6 text-white shadow-[0_30px_80px_-30px_rgba(108,77,255,0.8)] outline-none">
          <Dialog.Title className="text-xl font-semibold tracking-[-0.03em]">
            Drop your email so we can ask how Relay treats you.
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-white/60">
            Then the Android app downloads, and the setup guide opens.
          </Dialog.Description>
          <form className="mt-5" onSubmit={onSubmit}>
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
              className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-3 text-base text-white outline-none placeholder:text-white/30 focus:border-[#8b74ff]"
            />
            {error ? (
              <p className="mt-2 text-sm text-[#ffb4b0]" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="mt-4 h-11 w-full rounded-full bg-[#6C4DFF] text-sm font-semibold text-white hover:bg-[#7c62ff] disabled:opacity-60"
            >
              {pending ? "Sending..." : "Send the app"}
            </button>
          </form>
          <Dialog.Close className="mt-3 w-full text-center text-sm text-white/45 hover:text-white/70">
            Not now
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
