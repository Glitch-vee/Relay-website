import { AppTour } from "@/components/app-tour";
import { CreatorSection } from "@/components/creator-card";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SetupSection } from "@/components/setup-section";
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
      <HowItWorks />
      <AppTour />
      <SetupSection />
      <CreatorSection />
      <FinalCta />
    </>
  );
}

async function HomeHero({ searchParams }: { searchParams: Promise<{ download?: string }> }) {
  const params = await searchParams;
  return <Hero openDownload={params.download === "1"} />;
}
