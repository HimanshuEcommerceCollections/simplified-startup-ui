import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BrandStrategyPositioningView from "@/components/service-detail/branding-growth/brand-strategy-positioning/BrandStrategyPositioningView";

export const metadata: Metadata = {
  title: "Brand Strategy & Positioning: Own a Position Buyers Remember | Simplified Startup",
  description:
    "Research-backed brand strategy and positioning - ICP, positioning statement, 12 archetypes, voice, and a plain-language playbook. Customer interviews included, built for sales, not just design.",
};

export default function BrandStrategyPositioningPage() {
  return (
    <ResourcePage name="service-detail">
      <BrandStrategyPositioningView />
    </ResourcePage>
  );
}
