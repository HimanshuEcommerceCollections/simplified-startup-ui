import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MetaAdsView from "@/components/service-detail/digital-marketing/meta-ads/MetaAdsView";

export const metadata: Metadata = {
  title: "Meta Ads — Facebook & Instagram Advertising | Simplified Startup",
  description:
    "Facebook and Instagram ads that drive sales, leads, and repeat customers - scroll-stopping creative, precise targeting, iOS-proof CAPI tracking. Flat fee, no % of spend, no minimum spend.",
};

export default function MetaAdsPage() {
  return (
    <ResourcePage name="service-detail">
      <MetaAdsView />
    </ResourcePage>
  );
}
