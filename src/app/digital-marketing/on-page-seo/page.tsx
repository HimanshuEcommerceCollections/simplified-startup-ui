import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import OnPageSeoView from "@/components/service-detail/digital-marketing/on-page-seo/OnPageSeoView";

export const metadata: Metadata = {
  title: "On-Page SEO Services | Page Optimization That Matches Search Intent | Simplified Startup",
  description:
    "On-page SEO services covering title tags, headings, content, internal links, images, and schema - so each page clearly matches what searchers are looking for.",
};

export default function OnPageSeoPage() {
  return (
    <ResourcePage name="service-detail">
      <OnPageSeoView />
    </ResourcePage>
  );
}
