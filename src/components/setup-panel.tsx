"use client";

import { CopyPromptButton } from "@/components/copy-prompt";
import { Phone, type ScreenId } from "@/components/phones/phone";
import { useState, type ReactNode } from "react";

const B = ({ children }: { children: ReactNode }) => <b className="font-medium text-white">{children}</b>;

type Item = { text: ReactNode; screen?: ScreenId };
type Tab = { id: string; label: string; screen: ScreenId; items: Item[] };

const TABS: Tab[] = [
  {
    id: "install",
    label: "Install",
    screen: "home",
    items: [
      { text: <>Download the APK.</> },
      { text: <>When Android asks, <B>allow from this source</B>.</> },
      { text: <>Tap <B>Install</B>, or <B>Update</B> if you have an older Relay.</> },
      { text: <>Open Relay and allow SMS and notifications.</> },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    screen: "home",
    items: [
      { text: <>Tap <B>Add connection</B>.</>, screen: "home" },
      { text: <>Name it.</>, screen: "step-name" },
      { text: <>Paste your <B>setup link</B>, or type the https address and key. Tap <B>Test</B>.</>, screen: "step-send" },
      { text: <>Pick <B>Messages</B>, <B>Apps</B>, or both. Tap <B>Done</B>.</>, screen: "step-receive" },
    ],
  },
  {
    id: "running",
    label: "Keep running",
    screen: "phone-setup",
    items: [
      { text: <>Battery: set Relay to <B>No restrictions</B>.</> },
      { text: <>Turn on <B>Autostart</B> (Xiaomi, Oppo, Vivo).</> },
      { text: <>Xiaomi: App info, ⋮, <B>Allow restricted settings</B>.</> },
      { text: <>Don&apos;t force stop Relay.</> },
      { text: <>Check it: gear, then <B>Phone setup</B>.</> },
    ],
  },
  {
    id: "help",
    label: "Help",
    screen: "connection",
    items: [
      { text: <><B>Nothing arrives.</B> Connection, Activity, <B>Send a test</B>.</> },
      { text: <><B>Key refused.</B> Enter the address and key again.</> },
      { text: <><B>Sender or app missing.</B> Tick it under Messages or Apps.</> },
      { text: <><B>Missed some.</B> Activity, <B>Send again (last 24 hours)</B>.</> },
      { text: <><B>After a reboot.</B> Open Relay once.</> },
    ],
  },
];

const AI_PROMPT =
  'I use an Android app called Relay. It sends my text messages and app alerts to a webhook as JSON (sender, body, timestamp, and the connection name). Create an https webhook endpoint and a key for it, and tell me the https address, the header name, the key, and whether I need "Bearer" before the key. If you can, also give me one setup link I can paste into Relay, in this form: relay://connect?name=NAME&url=URL-ENCODED-HTTPS-ADDRESS&header=Authorization&key=KEY&bearer=1';

export function SetupPanel() {
  const [tabIndex, setTabIndex] = useState(0);
  const [step, setStep] = useState(0);
  const tab = TABS[tabIndex];
  const interactive = tab.id === "connect";
  const screen: ScreenId = interactive ? (tab.items[step].screen ?? tab.screen) : tab.screen;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div
        role="tablist"
        aria-label="Setup"
        className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-white/[0.06] p-1"
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === tabIndex}
            onClick={() => {
              setTabIndex(i);
              setStep(0);
            }}
            className={`h-10 shrink-0 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors sm:px-5 ${
              i === tabIndex ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-center gap-10 md:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
        <div>
          <ol className="grid gap-1.5" role="tabpanel">
            {tab.items.map((item, i) => {
              const active = interactive && i === step;
              const body = (
                <>
                  <span className="w-5 shrink-0 text-sm text-white/35 tabular-nums">{i + 1}</span>
                  <span className="text-[17px] leading-snug text-white/70">{item.text}</span>
                </>
              );
              return (
                <li key={`${tab.id}-${i}`}>
                  {interactive ? (
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      aria-current={active ? "step" : undefined}
                      className={`flex w-full items-baseline gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors ${
                        active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                      }`}
                    >
                      {body}
                    </button>
                  ) : (
                    <div className="flex items-baseline gap-4 px-4 py-3.5">{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
          {interactive ? (
            <div className="mt-4 px-4">
              <CopyPromptButton text={AI_PROMPT} label="Copy prompt to get an address and key" />
            </div>
          ) : null}
        </div>

        <div className="hidden justify-center md:flex">
          <Phone screen={screen} className="[--s:0.5]" />
        </div>
      </div>
    </div>
  );
}
