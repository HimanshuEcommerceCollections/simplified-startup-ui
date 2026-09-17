import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import WebApplicationsView from "@/components/service-detail/website-development/web-applications/WebApplicationsView";

export const metadata: Metadata = {
  title: "Web Application & SaaS Development | Simplified Startup",
  description:
    "Custom web apps, SaaS products, internal tools, portals, and dashboards - scoped tight, built to ship, and owned by you. Honest build-vs-buy advice and published pricing.",
};

export default function WebApplicationsPage() {
  return (
    <ResourcePage name="service-detail">
      <WebApplicationsView />
    </ResourcePage>
  );
}
