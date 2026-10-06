import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import PricingStrategyView from "@/components/service-detail/business-advisory/pricing-strategy/PricingStrategyView";

export const metadata: Metadata = {
  title: "Pricing Strategy: Value-Based Pricing, Models & Packaging | Simplified Startup",
  description:
    "Pricing research, models, and packaging for startups and growing businesses - willingness-to-pay research, competitor review, Good-Better-Best tiers, discount rules, and a rollout plan. Price on value, not guesswork.",
};

export default function PricingStrategyPage() {
  return (
    <ResourcePage name="service-detail">
      <PricingStrategyView />
    </ResourcePage>
  );
}
