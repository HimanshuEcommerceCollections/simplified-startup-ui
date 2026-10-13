import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import TechnicalSeoAuditView from "@/components/service-detail/digital-marketing/technical-seo-audit/TechnicalSeoAuditView";

export const metadata: Metadata = {
  title: "Technical SEO Audit Services | Crawl, Index & Core Web Vitals | Simplified Startup",
  description:
    "A technical SEO audit covering crawlability, indexing, site architecture, Core Web Vitals, structured data, and JavaScript rendering - with a prioritized fix list for your developers.",
};

export default function TechnicalSeoAuditPage() {
  return (
    <ResourcePage name="service-detail">
      <TechnicalSeoAuditView />
    </ResourcePage>
  );
}
