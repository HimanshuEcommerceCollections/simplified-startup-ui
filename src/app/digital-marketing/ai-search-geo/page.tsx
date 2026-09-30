import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiSearchGeoView from "@/components/service-detail/digital-marketing/ai-search-geo/AiSearchGeoView";

export const metadata: Metadata = {
  title: "AI Search & GEO Optimization: Get Cited by ChatGPT, Perplexity & AI Overviews | Simplified Startup",
  description:
    "Generative Engine Optimization (GEO) - get your business cited in AI Overviews, ChatGPT, Perplexity, Claude, and Gemini. Schema, entities, author authority, and digital PR across all 7 GEO signals.",
};

export default function AiSearchGeoPage() {
  return (
    <ResourcePage name="service-detail">
      <AiSearchGeoView />
    </ResourcePage>
  );
}
