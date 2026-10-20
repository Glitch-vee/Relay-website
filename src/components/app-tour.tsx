import { Phone, screenLabel, type ScreenId } from "@/components/phones/phone";

const TOUR: { screen: ScreenId; title: string; body: string }[] = [
  { screen: "home", title: "One glance", body: "Green means every connection is working. Anything that needs you says so." },
  { screen: "connection", title: "Every rule in one place", body: "What it receives, where it sends, and the options. Pause it whenever." },
  { screen: "apps", title: "Pick the apps", body: "Tick the apps whose alerts Grok should see. Recent senders come first." },
  { screen: "messages", title: "Pick the senders", body: "Choose which text senders to forward, like your bank or bKash." },
];

export function AppTour() {
  return (
    <section id="app" className="relative overflow-x-clip py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[34rem] w-[60rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5b3df5]/[0.13] blur-[120px]"
      />
      <div className="site-wrap">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-[0.14em] text-[#9db4ff] uppercase">The app</p>
          <h2 className="mt-4 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1] font-medium tracking-[-0.05em]">
            Calm by design. <span className="accent-serif">Made for dark.</span>
          </h2>
          <p className="mt-5 text-lg text-white/60">Real screens from Relay 3.0 on a real phone.</p>
        </div>
      </div>

      <ul className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.25rem,calc((100vw-1180px)/2))] pb-4 lg:grid lg:snap-none lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
        {TOUR.map((item) => (
          <li key={item.screen} className="w-[15.5rem] shrink-0 snap-center sm:w-[17rem] lg:w-auto lg:shrink">
            <Phone screen={item.screen} className="mx-auto [--s:0.5] sm:[--s:0.56] lg:[--s:0.5] xl:[--s:0.56]" />
            <h3 className="mt-6 text-center text-lg font-medium tracking-[-0.02em]">{item.title}</h3>
            <p className="mx-auto mt-1.5 max-w-[16rem] text-center text-[14px] leading-relaxed text-white/55">{item.body}</p>
            <span className="sr-only">{screenLabel(item.screen)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
