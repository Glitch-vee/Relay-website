import { Banknote, Layers, Pause, Repeat, ShieldCheck, Webhook } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Pick the alerts",
    body: "Choose the text senders and apps that matter: your bank, bKash, delivery updates, a family chat. Login codes are ignored by default.",
  },
  {
    n: "02",
    title: "Send them to Grok",
    body: "Relay posts each alert to the address you give it, as JSON your bot or webhook can read. No copy and paste.",
  },
  {
    n: "03",
    title: "You chill",
    body: "Grok knows what your phone just heard. Pause, resend, or change what it gets whenever you like.",
  },
] as const;

const FEATURES = [
  { icon: Banknote, title: "Only money messages", body: "Send just payments, transfers and balances." },
  { icon: ShieldCheck, title: "Login codes ignored", body: "One-time codes never leave your phone unless you say so." },
  { icon: Layers, title: "As many connections as you like", body: "A finance bot, a family chat, an orders feed. Each with its own rules." },
  { icon: Repeat, title: "Resend the last 24 hours", body: "Missed something? Send it again in two taps." },
  { icon: Pause, title: "Pause any time", body: "Switch a connection off without deleting it." },
  { icon: Webhook, title: "Your address, your key", body: "Works with any bot or webhook that accepts a POST." },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="site-wrap pt-8 pb-20 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-[0.14em] text-[#9db4ff] uppercase">How it works</p>
        <h2 className="mt-4 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1] font-medium tracking-[-0.05em]">
          Three steps. <span className="accent-serif">Then it just runs.</span>
        </h2>
      </div>

      <ol className="mt-14 grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <li key={step.n} className="glass rounded-3xl p-7">
            <span className="accent-serif text-5xl text-white/35">{step.n}</span>
            <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">{step.body}</p>
          </li>
        ))}
      </ol>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex gap-4 rounded-3xl border border-white/8 bg-white/[0.02] p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#6f86ff]/15 text-[#9db4ff]">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-[17px] font-medium tracking-[-0.02em]">{title}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-white/55">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
