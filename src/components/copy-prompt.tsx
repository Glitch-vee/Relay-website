"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="glass rounded-3xl p-5 sm:p-7">
      <blockquote className="text-[15px] leading-relaxed text-white/75 sm:text-base">{text}</blockquote>
      <button
        type="button"
        onClick={copy}
        className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
      >
        {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy prompt"}
      </button>
    </div>
  );
}
