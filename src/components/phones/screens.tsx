import { ChevronLeft, ChevronRight, LayoutGrid, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";

/* Drawn on a 450 x 1000 canvas. Colours follow the app's dark theme. */

const BLUE = "#0a84ff";
const GREEN = "#30d158";
const CARD = "#1c1c1e";
const MUTED = "#8e8e93";

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full overflow-hidden bg-black pt-[52px] text-white" style={{ fontFamily: "var(--font-app), system-ui, sans-serif" }}>
      {children}
    </div>
  );
}

function Group({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-[18px] overflow-hidden rounded-[22px] ${className}`} style={{ background: CARD }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mx-[36px] mt-[26px] mb-[9px] text-[14px] tracking-[0.02em] uppercase" style={{ color: MUTED }}>{children}</p>;
}

function Divider({ inset = 66 }: { inset?: number }) {
  return <div className="h-px" style={{ marginLeft: inset, background: "rgba(255,255,255,0.1)" }} />;
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-[34px] shrink-0 place-items-center rounded-[9px]" style={{ background: BLUE }}>
      {children}
    </span>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className="relative h-[34px] w-[56px] rounded-full" style={{ background: on ? BLUE : "#39393d" }}>
      <span className="absolute top-[3px] size-[28px] rounded-full bg-white" style={{ left: on ? 25 : 3 }} />
    </span>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <div className="mx-[18px] grid h-[58px] place-items-center rounded-[18px] text-[20px] font-semibold" style={{ background: BLUE }}>
      {children}
    </div>
  );
}

function TintButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-[18px] grid h-[58px] place-items-center rounded-[18px] text-[20px] font-medium ${className}`}
      style={{ background: "rgba(10,132,255,0.14)", color: BLUE }}
    >
      {children}
    </div>
  );
}

function Avatar({ children, bg, size = 48 }: { children: ReactNode; bg: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full" style={{ width: size, height: size, background: bg, fontSize: size * 0.48 }}>
      {children}
    </span>
  );
}

function SettingRow({ icon, label, value, last }: { icon: ReactNode; label: string; value?: string; last?: boolean }) {
  return (
    <>
      <div className="flex items-center gap-[16px] px-[18px] py-[14px]">
        <IconTile>{icon}</IconTile>
        <span className="flex-1 text-[19px]">{label}</span>
        {value ? <span className="max-w-[170px] truncate text-[17px]" style={{ color: MUTED }}>{value}</span> : null}
        <ChevronRight size={19} style={{ color: MUTED }} />
      </div>
      {last ? null : <Divider />}
    </>
  );
}

function StepHeader({ left, title }: { left: string; title: string }) {
  return (
    <div className="relative flex h-[44px] items-center px-[14px] text-[19px]" style={{ color: BLUE }}>
      <span className="flex items-center">
        {left === "Cancel" ? null : <ChevronLeft size={28} />}
        {left}
      </span>
      <span className="absolute inset-x-0 text-center font-semibold text-white">{title}</span>
    </div>
  );
}

function StepTitle({ step, title, sub }: { step: number; title: string; sub: string }) {
  return (
    <div className="px-[30px] pt-[14px] text-center">
      <p className="text-[14px] tracking-[0.04em] uppercase" style={{ color: MUTED }}>Step {step} of 3</p>
      <p className="mt-[8px] text-[35px] leading-[1.1] font-bold tracking-[-0.02em]">{title}</p>
      <p className="mt-[8px] text-[17px] leading-[1.3]" style={{ color: MUTED }}>{sub}</p>
    </div>
  );
}

/** Same eight avatar colours as the app (Connection.COLORS). */
const AVATAR_COLORS = ["#0a84ff", "#30b0c7", "#34c759", "#ff9f0a", "#ff375f", "#bf5af2", "#5e5ce6", "#8e8e93"];
const AVATAR_EMOJIS = ["", "💰", "💬", "🤖", "🔔", "🏦", "📦", "⭐"];
const tint = (color: string, base: string) => `color-mix(in srgb, ${color} 20%, ${base})`;

export function NameStepScreen() {
  const ring = { boxShadow: `0 0 0 3px ${BLUE}` };
  return (
    <Screen>
      <StepHeader left="Cancel" title="New connection" />
      <StepTitle step={1} title="Name it" sub="For example “Finance bot” or “Family chat”." />
      <div className="mt-[22px] flex justify-center">
        <Avatar bg={tint(AVATAR_COLORS[0], "#000")} size={83}>💰</Avatar>
      </div>
      <Group className="mt-[20px] px-[18px] py-[19px] text-[24px]">Finvee</Group>
      <Group className="mt-[18px]">
        <div className="flex gap-[11px] overflow-hidden px-[13px] py-[11px]">
          {AVATAR_EMOJIS.map((e) => (
            <span
              key={e || "letter"}
              className="grid size-[48px] shrink-0 place-items-center rounded-full text-[22px]"
              style={{
                background: e ? tint(AVATAR_COLORS[0], CARD) : AVATAR_COLORS[0],
                ...(e === "💰" ? ring : null),
              }}
            >
              {e || <span className="font-bold text-white">F</span>}
            </span>
          ))}
        </div>
        <Divider inset={18} />
        <div className="flex gap-[11px] overflow-hidden px-[13px] py-[11px]">
          {AVATAR_COLORS.map((c, i) => (
            <span
              key={c}
              className="grid size-[48px] shrink-0 place-items-center rounded-full text-[22px]"
              style={{ background: tint(c, CARD), ...(i === 0 ? ring : null) }}
            >
              💰
            </span>
          ))}
        </div>
      </Group>
      <div className="mt-[30px]"><PrimaryButton>Next</PrimaryButton></div>
    </Screen>
  );
}

export function SendStepScreen() {
  return (
    <Screen>
      <StepHeader left="Back" title="New connection" />
      <StepTitle step={2} title="Where should it send?" sub="Paste the setup link from your bot, or type the address and key." />
      <TintButton className="mt-[18px]">Paste setup link</TintButton>
      <p className="mx-[36px] mt-[8px] text-[14px] leading-[1.35]" style={{ color: MUTED }}>
        If your bot gave you a setup link, copy it and tap Paste. Or fill in the details below.
      </p>
      <SectionLabel>Address</SectionLabel>
      <Group className="px-[18px] py-[16px] text-[19px]">https://finvee.example.com/hook</Group>
      <SectionLabel>Sign-in</SectionLabel>
      <Group>
        <p className="px-[18px] py-[15px] text-[19px]">Authorization</p>
        <Divider inset={18} />
        <p className="px-[18px] py-[15px] text-[19px] tracking-[0.18em]">••••••••••••</p>
      </Group>
      <Group className="mt-[18px]">
        <div className="flex items-center justify-between px-[18px] py-[13px] text-[19px]">Add “Bearer” before the key <Toggle on /></div>
        <Divider inset={18} />
        <div className="flex items-center justify-between px-[18px] py-[13px] text-[19px]">Send the key in the address <Toggle on={false} /></div>
      </Group>
      <TintButton className="mt-[20px]">Test connection</TintButton>
      <p className="mt-[10px] text-center text-[17px]" style={{ color: GREEN }}>✓ Works</p>
      <div className="mt-[12px]"><PrimaryButton>Next</PrimaryButton></div>
    </Screen>
  );
}

export function ReceiveStepScreen() {
  return (
    <Screen>
      <StepHeader left="Back" title="New connection" />
      <StepTitle step={3} title="What should it receive?" sub="Pick text messages, app alerts, or both. You can change this any time." />
      <Group className="mt-[22px]">
        <SettingRow icon={<MessageSquare size={19} fill="#fff" />} label="Messages" value="5 senders" />
        <SettingRow icon={<LayoutGrid size={19} />} label="Apps" value="Choose" last />
      </Group>
      <p className="mx-[36px] mt-[10px] text-[14px] leading-[1.35]" style={{ color: MUTED }}>
        Login codes are ignored. You can change that on the connection&apos;s page.
      </p>
      <div className="mt-[28px]"><PrimaryButton>Done</PrimaryButton></div>
    </Screen>
  );
}

