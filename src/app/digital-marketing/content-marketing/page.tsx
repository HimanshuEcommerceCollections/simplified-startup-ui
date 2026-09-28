import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ContentMarketingView from "@/components/service-detail/digital-marketing/content-marketing/ContentMarketingView";

export const metadata: Metadata = {
  title: "Content Marketing & Blogging — SEO Content, Topic Clusters & E-E-A-T | Simplified Startup",
  description:
    "Done-for-you SEO content and blog strategy - topic clusters, pillar pages, human-edited production, and GEO optimization for both SERPs and AI Overviews. E-E-A-T aligned, built to compound.",
};

export default function ContentMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <ContentMarketingView />
    </ResourcePage>
  );
}
