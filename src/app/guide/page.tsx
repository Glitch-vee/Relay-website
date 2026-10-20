import { ContactLinks } from "@/components/contact-links";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Setup guide",
  description: "How to install Relay 3.0 on Android and add a connection.",
};

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="mx-auto w-full max-w-[240px]">
      <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
        <Image src={src} alt={alt} width={450} height={1000} className="h-auto w-full" />
      </div>
    </figure>
  );
}

export default function GuidePage() {
  return (
    <article className="site-wrap max-w-3xl py-8 pb-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
        <Image src="/logo.png" alt="" width={24} height={24} className="size-6" />
        Relay
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white">Relay Setup Guide</h1>
      <p className="mt-4 text-lg leading-relaxed text-white/75">
        Relay sends the text messages and app alerts you choose to your own bots or webhooks.
      </p>
      <p className="mt-3 text-white/80">
        <strong className="font-semibold text-white">Latest version: Relay 3.0</strong>. Download:{" "}
        <Link href="/?download=1" className="text-[#c4b6ff] underline-offset-4 hover:underline">
          Relay 3.0.apk
        </Link>
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Install</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-white/80">
          <li>Open the link above and download the APK.</li>
          <li>
            When Android asks, allow installing apps from this source (Chrome or Files): tap{" "}
            <strong className="text-white">Settings</strong>, turn on{" "}
            <strong className="text-white">Allow from this source</strong>, then go back.
          </li>
          <li>
            Tap <strong className="text-white">Install</strong>. If you already have SMS Forwarder or an older
            Relay, tap <strong className="text-white">Update</strong>. Your settings are kept.
          </li>
          <li>Open Relay and follow the steps to allow SMS and notification access.</li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Add a connection</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-white/80">
          A connection is one place Relay sends to, like a bot or a webhook. You can add as many as you like.
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-white/80">
          <li>
            Tap <strong className="text-white">Add your first connection</strong> (or{" "}
            <strong className="text-white">+ Add connection</strong>).
          </li>
          <li>Give it a name, for example &quot;Finance bot&quot;, and pick an emoji if you like.</li>
          <li>
            Tap <strong className="text-white">Paste setup link</strong> if your bot gave you one. Otherwise type
            the address (https://…) and the key. Tap <strong className="text-white">Test connection</strong>.
          </li>
          <li>
            Choose what it receives: <strong className="text-white">Messages</strong> (SMS senders) and/or{" "}
            <strong className="text-white">Apps</strong> (app alerts). Tap <strong className="text-white">Done</strong>.
          </li>
        </ol>
        <p className="mt-4 text-[15px] leading-relaxed text-white/70">
          Login codes are ignored by default. You can change this, or turn on &quot;Only money messages&quot;, on
          the connection&apos;s page.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Shot src="/screens/add-step-1.png" alt="Name the connection and pick an emoji." />
          <Shot src="/screens/add-step-2.png" alt="Paste the address and key, then test the connection." />
          <Shot src="/screens/add-step-3.png" alt="Choose messages, apps, or both." />
          <Shot src="/screens/apps-picker.png" alt="Pick the apps that can send alerts." />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Need an address and key?</h2>
        <p className="mt-3 text-[15px] text-white/80">Ask an AI assistant or whoever runs your bot:</p>
        <blockquote className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-[15px] leading-relaxed text-white/75">
          I use an Android app called Relay. It sends my text messages and app alerts to a webhook as JSON
          (sender, body, timestamp, and the connection name). Create a webhook endpoint and a key for it, and
          tell me the https address, the header name, the key, and whether I need &quot;Bearer&quot; before the
          key.
        </blockquote>
      </section>

      <section className="mt-12 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Keep it running</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-white/80">
            <li>
              Battery: Settings &gt; Apps &gt; Relay &gt; Battery &gt;{" "}
              <strong className="text-white">No restrictions</strong> (Unrestricted).
            </li>
            <li>
              Turn on <strong className="text-white">Autostart</strong> if your phone has it (Xiaomi, Oppo, Vivo
              and others).
            </li>
            <li>
              On Xiaomi, if notification access is greyed out, open App info &gt; ⋮ &gt;{" "}
              <strong className="text-white">Allow restricted settings</strong> first.
            </li>
            <li>Don&apos;t force stop Relay.</li>
            <li>
              In Relay, open the gear, then <strong className="text-white">Phone setup</strong>, to check
              everything.
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          <Shot src="/screens/home-three-dark.png" alt="Relay home in dark mode, with a connection that still needs an address." />
          <Shot src="/screens/home-three-light.png" alt="Relay home in light mode." />
        </div>
      </section>

      <section className="mt-12 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">If something goes wrong</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-white/80">
            <li>
              <strong className="text-white">Nothing arrives:</strong> open the connection, tap{" "}
              <strong className="text-white">Activity</strong>, then <strong className="text-white">Send a test</strong>.
            </li>
            <li>
              <strong className="text-white">&quot;The address refused the key&quot;:</strong> paste the address and
              key again (connection &gt; Address and key &gt; Edit).
            </li>
            <li>
              <strong className="text-white">A sender or app is missing:</strong> open the connection, then Messages
              or Apps, and tick it.
            </li>
            <li>
              <strong className="text-white">Missed some messages:</strong> connection &gt; Activity &gt;{" "}
              <strong className="text-white">Send again (last 24 hours)</strong>, or gear &gt;{" "}
              <strong className="text-white">Resend all old messages</strong>.
            </li>
            <li>
              <strong className="text-white">After a reboot:</strong> open Relay once.
            </li>
          </ul>
          <p className="mt-4 text-[15px] text-white/60">Older versions are in the Old versions folder.</p>
        </div>
        <div className="grid gap-4">
          <Shot src="/screens/connection-dark.png" alt="The connection page, with activity, pause, and delete." />
          <Shot src="/screens/home-all-good.png" alt="Relay home when every connection is working." />
        </div>
      </section>

      <div className="mt-14 border-t border-white/10 pt-6">
        <ContactLinks />
      </div>
    </article>
  );
}
