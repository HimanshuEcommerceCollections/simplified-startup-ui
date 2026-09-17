import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GoogleAdsView from "@/components/service-detail/digital-marketing/google-ads/GoogleAdsView";

export const metadata: Metadata = {
  title: "Google Ads Management — Paid Search & Performance | Simplified Startup",
  description:
    "Google Ads managed for leads, revenue, and ROAS - Search, Shopping, Performance Max, YouTube, and remarketing. Published pricing, no minimum ad spend, month-to-month.",
};

export default function GoogleAdsPage() {
  return (
    <ResourcePage name="service-detail">
      <GoogleAdsView />
    </ResourcePage>
  );
}
