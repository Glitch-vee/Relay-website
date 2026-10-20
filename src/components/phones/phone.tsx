import Image from "next/image";
import { PhoneFrame } from "@/components/phones/phone-frame";
import { NameStepScreen, ReceiveStepScreen, SendStepScreen } from "@/components/phones/screens";

/**
 * Real dark-mode captures live in public/screens (status bar, nav bar and private details are
 * already removed). The three add-connection steps are drawn in code to match.
 */
const SHOTS = {
  home: { src: "/screens/home.webp", label: "Relay home. Every connection is working." },
  connection: { src: "/screens/connection.webp", label: "A connection page with what it receives, where it sends, and options." },
  apps: { src: "/screens/apps.webp", label: "Picking which apps can send alerts." },
  messages: { src: "/screens/messages.webp", label: "Picking which text senders to forward." },
  activity: { src: "/screens/activity.webp", label: "The activity page with Send now, Send again and Send a test." },
  settings: { src: "/screens/settings.webp", label: "Relay settings with Phone setup." },
  "phone-setup": { src: "/screens/phone-setup.webp", label: "Phone setup checklist: allow texts, turn on app alerts, keep Relay running." },
} as const;

const DRAWN = {
  "step-name": { label: "Step 1: name the connection and pick an emoji.", Screen: NameStepScreen },
  "step-send": { label: "Step 2: paste the address and key, then test the connection.", Screen: SendStepScreen },
  "step-receive": { label: "Step 3: choose messages, apps, or both.", Screen: ReceiveStepScreen },
} as const;

export type ScreenId = keyof typeof SHOTS | keyof typeof DRAWN;

export function screenLabel(id: ScreenId): string {
  return id in SHOTS ? SHOTS[id as keyof typeof SHOTS].label : DRAWN[id as keyof typeof DRAWN].label;
}

export function Phone({
  screen,
  className = "",
  priority = false,
}: {
  screen: ScreenId;
  className?: string;
  priority?: boolean;
}) {
  if (screen in SHOTS) {
    const shot = SHOTS[screen as keyof typeof SHOTS];
    return (
      <PhoneFrame label={shot.label} className={className}>
        <Image src={shot.src} alt="" width={450} height={1000} unoptimized loading="eager" priority={priority} className="h-[1000px] w-[450px] max-w-none" />
      </PhoneFrame>
    );
  }
  const drawn = DRAWN[screen as keyof typeof DRAWN];
  return (
    <PhoneFrame label={drawn.label} className={className}>
      <drawn.Screen />
    </PhoneFrame>
  );
}
