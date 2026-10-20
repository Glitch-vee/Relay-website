import { Hero } from "@/components/hero";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ download?: string }>;
}) {
  return (
    <Suspense fallback={<Hero />}>
      <HomeHero searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeHero({ searchParams }: { searchParams: Promise<{ download?: string }> }) {
  const params = await searchParams;
  return <Hero openDownload={params.download === "1"} />;
}
