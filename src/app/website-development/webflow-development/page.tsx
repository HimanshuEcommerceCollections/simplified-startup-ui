import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import WebflowDevelopmentView from "@/components/service-detail/website-development/webflow-development/WebflowDevelopmentView";

export const metadata: Metadata = {
  title: "Webflow Development Services | Custom Webflow Websites | Simplified Startup",
  description:
    "Webflow development for marketing sites that look great and are easy to update. Custom builds, CMS collections, interactions, integrations, and migrations from WordPress.",
};

export default function WebflowDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <WebflowDevelopmentView />
    </ResourcePage>
  );
}
