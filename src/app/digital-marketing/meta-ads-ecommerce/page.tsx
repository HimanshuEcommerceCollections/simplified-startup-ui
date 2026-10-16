import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MetaAdsEcommerceView from "@/components/service-detail/digital-marketing/meta-ads-ecommerce/MetaAdsEcommerceView";

export const metadata: Metadata = {
  title: "Meta Ads for E-commerce | Facebook & Instagram Ads for Online Stores | Simplified Startup",
  description:
    "Facebook and Instagram ads for online stores. Catalog ads, Advantage+ campaigns, creative testing, and Pixel plus Conversions API tracking built around real sales.",
};

export default function MetaAdsEcommercePage() {
  return (
    <ResourcePage name="service-detail">
      <MetaAdsEcommerceView />
    </ResourcePage>
  );
}
