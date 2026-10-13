import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SeoAuditView from "@/components/service-detail/digital-marketing/seo-audit/SeoAuditView";

export const metadata: Metadata = {
  title: "SEO Audit Services | Full Website SEO Review | Simplified Startup",
  description:
    "A complete SEO audit covering technical health, on-page SEO, content, backlinks, local presence, and competitors, with a clear, prioritized action plan.",
};

export default function SeoAuditPage() {
  return (
    <ResourcePage name="service-detail">
      <SeoAuditView />
    </ResourcePage>
  );
}
