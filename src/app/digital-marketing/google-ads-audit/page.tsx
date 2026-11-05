import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GoogleAdsAuditView from "@/components/service-detail/digital-marketing/google-ads-audit/GoogleAdsAuditView";

export const metadata: Metadata = {
  title: "Google Ads Audit | Find Wasted Spend & Missed Opportunities | Simplified Startup",
  description:
    "A Google Ads audit covering tracking, account structure, keywords, search terms, bidding, ads, landing pages, and audiences, with a clear, prioritized action plan.",
};

export default function GoogleAdsAuditPage() {
  return (
    <ResourcePage name="service-detail">
      <GoogleAdsAuditView />
    </ResourcePage>
  );
}
