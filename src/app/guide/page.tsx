import { CreatorSection } from "@/components/creator-card";
import { SetupSection } from "@/components/setup-section";
import { RELAY_VERSION } from "@/lib/release";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup guide",
  description: `How to install Relay ${RELAY_VERSION} on Android and add a connection.`,
};

export default function GuidePage() {
  return (
    <div className="pt-16 md:pt-20">
      <SetupSection id="setup" asPage />
      <CreatorSection />
    </div>
  );
}
