import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MetaAdsAuditView from "@/components/service-detail/digital-marketing/meta-ads-audit/MetaAdsAuditView";

export const metadata: Metadata = {
  title: "Meta Ads Audit | Facebook & Instagram Ads Account Review | Simplified Startup",
  description:
    "A Meta ads audit covering tracking, account structure, audiences, creative, offers, and landing pages, with a clear, prioritized action plan.",
};

export default function MetaAdsAuditPage() {
  return (
    <ResourcePage name="service-detail">
      <MetaAdsAuditView />
    </ResourcePage>
  );
}
