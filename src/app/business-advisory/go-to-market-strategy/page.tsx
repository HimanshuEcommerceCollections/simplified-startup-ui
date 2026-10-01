import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GoToMarketStrategyView from "@/components/service-detail/business-advisory/go-to-market-strategy/GoToMarketStrategyView";

export const metadata: Metadata = {
  title: "Go-to-Market Strategy: Audience, Positioning, Channels & a 90-Day Launch Plan | Simplified Startup",
  description:
    "Go-to-market strategy for new products and markets - ICP, positioning, pricing, channel and motion selection, and a 90-day launch plan your team can run. Six GTM decisions, written down.",
};

export default function GoToMarketStrategyPage() {
  return (
    <ResourcePage name="service-detail">
      <GoToMarketStrategyView />
    </ResourcePage>
  );
}
