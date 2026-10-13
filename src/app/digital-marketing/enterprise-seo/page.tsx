import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import EnterpriseSeoView from "@/components/service-detail/digital-marketing/enterprise-seo/EnterpriseSeoView";

export const metadata: Metadata = {
  title: "Enterprise SEO Services | SEO for Large & Complex Websites | Simplified Startup",
  description:
    "Enterprise SEO for large, complex, and multi-team websites. Technical SEO at scale, governance, international SEO, migrations, and reporting built for leadership.",
};

export default function EnterpriseSeoPage() {
  return (
    <ResourcePage name="service-detail">
      <EnterpriseSeoView />
    </ResourcePage>
  );
}
