import { ConnectionStepper } from "@/components/connection-stepper";
import { CopyPrompt } from "@/components/copy-prompt";
import { DownloadDialog } from "@/components/download-dialog";
import { Phone } from "@/components/phones/phone";
import { RELAY_VERSION } from "@/lib/release";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

const B = ({ children }: { children: ReactNode }) => <b className="font-medium text-white">{children}</b>;

const INSTALL: { title: string; body: ReactNode }[] = [
  { title: "Download the APK", body: <>Tap <B>Download</B> and save Relay {RELAY_VERSION} to your phone. It needs Android 8 or newer.</> },
  {
    title: "Allow the install",
    body: <>When Android asks, tap <B>Settings</B>, turn on <B>Allow from this source</B> (Chrome or Files), then go back.</>,
  },
  {
    title: "Install",
    body: <>Tap <B>Install</B>. If you have SMS Forwarder or an older Relay, tap <B>Update</B>. Your settings are kept.</>,
  },
  { title: "Open Relay", body: <>Follow the steps to allow SMS and notification access.</> },
];

const KEEP_RUNNING: ReactNode[] = [
  <>Battery: Settings &gt; Apps &gt; Relay &gt; Battery &gt; <B>No restrictions</B> (Unrestricted).</>,
  <>Turn on <B>Autostart</B> if your phone has it (Xiaomi, Oppo, Vivo and others).</>,
  <>On Xiaomi, if notification access is greyed out, open App info &gt; ⋮ &gt; <B>Allow restricted settings</B> first.</>,
  <>Don&apos;t force stop Relay.</>,
  <>In Relay, open the gear, then <B>Phone setup</B>, to check everything.</>,
];

const TROUBLE: { q: ReactNode; a: ReactNode }[] = [
  {
    q: "Nothing arrives",
    a: <>Open the connection, tap <B>Activity</B>, then <B>Send a test</B>.</>,
  },
  {
    q: "“The address refused the key”",
    a: <>Paste the address and key again (connection &gt; Address and key &gt; Edit).</>,
  },
  {
    q: "A sender or app is missing",
    a: <>Open the connection, then Messages or Apps, and tick it.</>,
  },
  {
    q: "I missed some messages",
    a: <>Connection &gt; Activity &gt; <B>Send again (last 24 hours)</B>, or gear &gt; <B>Resend all old messages</B>.</>,
  },
  { q: "After a reboot", a: <>Open Relay once.</> },
];

const AI_PROMPT =
  'I use an Android app called Relay. It sends my text messages and app alerts to a webhook as JSON (sender, body, timestamp, and the connection name). Create an https webhook endpoint and a key for it, and tell me the https address, the header name, the key, and whether I need "Bearer" before the key. If you can, also give me one setup link I can paste into Relay, in this form: relay://connect?name=NAME&url=URL-ENCODED-HTTPS-ADDRESS&header=Authorization&key=KEY&bearer=1';

function SubHead({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium tracking-[0.14em] text-[#9db4ff] uppercase">{eyebrow}</p>
      <h3 className="mt-3 text-3xl leading-[1.05] font-medium tracking-[-0.045em] sm:text-4xl">
        {title} <span className="accent-serif">{accent}</span>
      </h3>
    </div>
  );
}

/** The whole setup story. Used on the landing page and on /guide. */
export function SetupSection({ id = "setup", asPage = false }: { id?: string; asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section id={id} className="site-wrap py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-[0.14em] text-[#9db4ff] uppercase">Setup guide</p>
        <Heading className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.055em]">
          Up and running <span className="accent-serif">in minutes.</span>
        </Heading>
        <p className="mt-5 text-lg text-white/60">
          Relay sends the text messages and app alerts you choose to your own bots or webhooks. Latest version:{" "}
          <span className="text-white">Relay {RELAY_VERSION}</span>.
        </p>
        <div className="mt-7 flex justify-center">
          <DownloadDialog variant="hero" label={`Download Relay ${RELAY_VERSION}`} />
        </div>
      </div>

      {/* 1. Install */}
      <div className="mt-20">
        <SubHead eyebrow="Part 1" title="Install" accent="the app." />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INSTALL.map((step, i) => (
            <li key={step.title} className="glass rounded-3xl p-6">
              <span className="grid size-9 place-items-center rounded-full bg-white text-sm font-semibold text-black">
                {i + 1}
              </span>
              <h4 className="mt-5 text-lg font-medium tracking-[-0.02em]">{step.title}</h4>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* 2. Add a connection */}
      <div className="mt-24">
        <SubHead eyebrow="Part 2" title="Add a" accent="connection." />
        <div className="mt-10">
          <ConnectionStepper />
        </div>
      </div>

      {/* 3. Address and key */}
      <div className="mt-24 grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SubHead eyebrow="Part 3" title="Need an address" accent="and key?" />
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/60">
            Ask an AI assistant, or whoever runs your bot, with this. Relay needs an https address. A setup link fills in everything for you.
          </p>
        </div>
        <CopyPrompt text={AI_PROMPT} />
      </div>

      {/* 4. Keep it running */}
      <div className="mt-24 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div>
          <SubHead eyebrow="Part 4" title="Keep it" accent="running." />
          <ul className="mt-8 grid gap-3">
            {KEEP_RUNNING.map((item, i) => (
              <li key={i} className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-[15px] leading-relaxed text-white/65">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#30d158]/15 text-xs font-semibold text-[#30d158]">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center gap-4">
          <Phone screen="settings" className="hidden [--s:0.46] sm:block lg:[--s:0.5]" />
          <Phone screen="phone-setup" className="[--s:0.56] sm:[--s:0.46] lg:[--s:0.5]" />
        </div>
      </div>

      {/* 5. Troubleshooting */}
      <div className="mt-24 grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-20">
        <div className="order-2 flex justify-center lg:order-1">
          <Phone screen="activity" className="[--s:0.56] lg:[--s:0.5]" />
        </div>
        <div className="order-1 lg:order-2">
          <SubHead eyebrow="Part 5" title="If something" accent="goes wrong." />
          <div className="mt-8 grid gap-3">
            {TROUBLE.map((item, i) => (
              <details key={i} className="group rounded-2xl border border-white/10 bg-white/[0.03] open:bg-white/[0.06]">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-3 text-[16px] font-medium">
                  {item.q}
                  <ChevronDown className="size-5 shrink-0 text-white/50 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-white/65">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/45">Older versions are in the Old versions folder.</p>
        </div>
      </div>
    </section>
  );
}
