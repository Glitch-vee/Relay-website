import { CopyPromptButton } from "@/components/copy-prompt";
import { Phone } from "@/components/phones/phone";
import { GROK_PROMPT, GROK_URL, GUIDE_PDF_URL, GUIDE_VIEW_URL } from "@/lib/guide";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import type { ReactNode } from "react";

const B = ({ children }: { children: ReactNode }) => <b className="font-medium text-white">{children}</b>;

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li>
      <div className="flex items-center gap-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-semibold text-white">
          {n}
        </span>
        <h3 className="text-xl font-medium tracking-[-0.02em]">{title}</h3>
      </div>
      <div className="mt-2 md:pl-[3.25rem]">{children}</div>
    </li>
  );
}

const hint = "text-[16px] leading-relaxed text-white/60";

/** Connect Grok to Relay in three steps. The prompt is the middle of it. */
export function SetupPanel() {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-x-16 gap-y-12 md:grid-cols-[minmax(0,1fr)_auto]">
      <ol className="grid gap-9">
        <Step n={1} title="Install Relay">
          <p className={hint}>
            Download it and open the file. Allow unknown apps when Android asks. If Relay shows <B>Finish phone setup</B>, tap it
            and allow SMS and notifications.
          </p>
        </Step>

        <Step n={2} title="Send this to Grok">
          <p className={hint}>Grok replies with a Relay setup link.</p>
          <div className="mt-4 rounded-3xl border border-white/15 bg-white/[0.05] p-5 sm:p-6">
            <p className="text-[15px] leading-relaxed text-white/85 sm:text-base">{GROK_PROMPT}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <CopyPromptButton text={GROK_PROMPT} />
              <a
                href={GROK_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center gap-1.5 rounded-full border border-white/15 px-5 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/8 hover:text-white"
              >
                Open Grok
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Step>

        <Step n={3} title="Paste it in Relay">
          <p className={hint}>
            Tap <B>Add connection</B>, then <B>Paste setup link</B>. Tap <B>Test connection</B>, then <B>Done</B>. If Grok gave
            you an address and key instead of a link, type those in.
          </p>
        </Step>
      </ol>

      <div className="hidden items-start justify-center md:flex">
        <Phone screen="step-send" className="[--s:0.5]" />
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
        <div className="flex items-center gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/8 text-white/70">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-snug">
            <p className="font-medium">Need more help?</p>
            <p className="text-sm text-white/50">The full guide covers Xiaomi settings and fixes.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={GUIDE_VIEW_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-white/90"
          >
            View guide
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href={GUIDE_PDF_URL}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white/85 hover:bg-white/8 hover:text-white"
          >
            <Download className="size-4" aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
