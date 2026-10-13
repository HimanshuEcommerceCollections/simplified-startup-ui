import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SeoContentWritingView from "@/components/service-detail/digital-marketing/seo-content-writing/SeoContentWritingView";

export const metadata: Metadata = {
  title: "SEO Content Writing Services | Human-Written, Search-Ready Content | Simplified Startup",
  description:
    "SEO content writing for service pages, blog posts, landing pages, and guides. Researched briefs, human writers and editors, and on-page optimization built into every piece.",
};

export default function SeoContentWritingPage() {
  return (
    <ResourcePage name="service-detail">
      <SeoContentWritingView />
    </ResourcePage>
  );
}
