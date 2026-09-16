import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SeoView from "@/components/service-detail/digital-marketing/seo/SeoView";

export const metadata: Metadata = {
  title: "SEO Services — Organic Search & AI Discoverability | Simplified Startup",
  description:
    "SEO built for 2026 - Google's blue links, AI Overviews, and citations inside ChatGPT, Gemini, Claude, and Perplexity. On-page, technical, local, content, and GEO, at published prices.",
};

export default function SeoPage() {
  return (
    <ResourcePage name="service-detail">
      <SeoView />
    </ResourcePage>
  );
}
