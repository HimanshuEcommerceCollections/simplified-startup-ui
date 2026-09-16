import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import B2bSaasWebsitesView from "@/components/service-detail/website-development/b2b-saas-websites/B2bSaasWebsitesView";

export const metadata: Metadata = {
  title: "B2B & SaaS Website Design — Built for Pipeline | Simplified Startup",
  description:
    "Websites for SaaS, AI, fintech, and B2B - built to convert pipeline, not win design awards. Positioning, buyer-committee messaging, Webflow/WordPress, published pricing, 6-10 week launch.",
};

export default function B2bSaasWebsitesPage() {
  return (
    <ResourcePage name="service-detail">
      <B2bSaasWebsitesView />
    </ResourcePage>
  );
}
