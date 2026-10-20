import { Hero } from "@/components/hero";
import { SetupPanel } from "@/components/setup-panel";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ download?: string }>;
}) {
  return (
    <>
      <Suspense fallback={<Hero />}>
        <HomeHero searchParams={searchParams} />
      </Suspense>
      <section id="setup" className="site-wrap py-16 md:py-24">
        <h2 className="mb-8 text-center text-[clamp(2rem,5vw,3.25rem)] leading-none font-medium tracking-[-0.05em]">
          Set up <span className="accent-serif">Relay.</span>
        </h2>
        <SetupPanel />
      </section>
    </>
  );
}

async function HomeHero({ searchParams }: { searchParams: Promise<{ download?: string }> }) {
  const params = await searchParams;
  return <Hero openDownload={params.download === "1"} />;
}
