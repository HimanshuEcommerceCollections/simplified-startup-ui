import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import WebsiteRedesignMigrationView from "@/components/service-detail/website-development/website-redesign-migration/WebsiteRedesignMigrationView";

export const metadata: Metadata = {
  title: "Website Redesign & Migration — Without Losing Rankings | Simplified Startup",
  description:
    "Redesign or migrate your website without losing rankings - SEO-first planning, complete 1:1 redirect strategy, zero-downtime launch, and 60 days of post-launch monitoring.",
};

export default function WebsiteRedesignMigrationPage() {
  return (
    <ResourcePage name="service-detail">
      <WebsiteRedesignMigrationView />
    </ResourcePage>
  );
}
