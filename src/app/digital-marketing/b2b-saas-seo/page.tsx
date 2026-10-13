import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import B2bSaasSeoView from "@/components/service-detail/digital-marketing/b2b-saas-seo/B2bSaasSeoView";

export const metadata: Metadata = {
  title: "B2B & SaaS SEO Services | Organic Growth for Software Companies | Simplified Startup",
  description:
    "B2B and SaaS SEO built around your buyers and pipeline. Feature, use-case, integration, and comparison pages, plus content that reaches every member of the buying committee.",
};

export default function B2bSaasSeoPage() {
  return (
    <ResourcePage name="service-detail">
      <B2bSaasSeoView />
    </ResourcePage>
  );
}
