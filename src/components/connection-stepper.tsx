"use client";

import { Phone, type ScreenId } from "@/components/phones/phone";
import { useState } from "react";

const STEPS: { screen: ScreenId; title: string; body: React.ReactNode }[] = [
  {
    screen: "home",
    title: "Tap Add connection",
    body: (
      <>
        Open Relay and tap <b className="font-medium text-white">Add your first connection</b> (or{" "}
        <b className="font-medium text-white">+ Add connection</b>). A connection is one place Relay sends to, like a
        bot or a webhook. Add as many as you like.
      </>
    ),
  },
  {
    screen: "step-name",
    title: "Name it",
    body: <>Give it a name, for example &quot;Finvee&quot;, and pick an emoji if you like.</>,
  },
  {
    screen: "step-send",
    title: "Say where it sends",
    body: (
      <>
        Tap <b className="font-medium text-white">Paste setup link</b> if your bot gave you one. Otherwise type the
        https:// address and the key, then tap <b className="font-medium text-white">Test connection</b>.
      </>
    ),
  },
  {
    screen: "step-receive",
    title: "Choose what it receives",
    body: (
      <>
        Pick <b className="font-medium text-white">Messages</b> (text senders), <b className="font-medium text-white">Apps</b>{" "}
        (app alerts), or both. Tap <b className="font-medium text-white">Done</b>. Login codes are ignored by default.
      </>
    ),
  },
];

export function ConnectionStepper() {
  const [index, setIndex] = useState(0);
  const current = STEPS[index];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-20">
      <div className="relative mx-auto grid place-items-center">
        <div
          aria-hidden="true"
          className="absolute size-72 rounded-full bg-[#5b3df5]/25 blur-[90px]"
        />
        <div className="relative [--s:0.56] sm:[--s:0.62]">
          {STEPS.map((step, i) => (
            <div key={step.screen} className={i === index ? "block" : "hidden"}>
              <Phone screen={step.screen} />
            </div>
          ))}
        </div>
      </div>

      <div role="tablist" aria-label="Add a connection, step by step" className="grid gap-3">
        <div className="mx-auto flex gap-2 lg:hidden" aria-hidden="true">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              tabIndex={-1}
              onClick={() => setIndex(i)}
              className={`grid size-11 place-items-center rounded-full text-sm font-semibold transition-colors ${
                i === index ? "bg-white text-black" : "bg-white/10 text-white/60"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {STEPS.map((step, i) => {
          const active = i === index;
          return (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setIndex(i)}
              className={`gap-4 rounded-3xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8aa4ff] ${
                active
                  ? "flex border-white/25 bg-white/[0.07]"
                  : "hidden border-white/8 bg-white/[0.02] hover:bg-white/[0.04] lg:flex"
              }`}
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                  active ? "bg-white text-black" : "bg-white/10 text-white/60"
                }`}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-medium tracking-[-0.02em]">{step.title}</span>
                {active ? (
                  <span className="mt-1.5 block text-[15px] leading-relaxed text-white/65">{step.body}</span>
                ) : null}
              </span>
            </button>
          );
        })}
        <p className="sr-only" aria-live="polite">
          {current.title}
        </p>
      </div>
    </div>
  );
}
