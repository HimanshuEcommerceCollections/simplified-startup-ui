import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BrandingGrowthView from "@/components/service-detail/branding-growth/BrandingGrowthView";

export const metadata: Metadata = {
  title: "Branding & Growth | Simplified Startup",
  description:
    "Positioning-led brand identity — discovery, messaging framework, full logo suite, and brand guidelines you own, delivered in a structured 4–6 week process.",
};

export default function BrandingGrowthPage() {
  return (
    <ResourcePage name="service-detail">
      <BrandingGrowthView />
    </ResourcePage>
  );
}
