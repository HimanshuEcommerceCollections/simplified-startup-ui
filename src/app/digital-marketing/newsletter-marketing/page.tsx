import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import NewsletterMarketingView from "@/components/service-detail/digital-marketing/newsletter-marketing/NewsletterMarketingView";

export const metadata: Metadata = {
  title: "Newsletter Marketing Services | Newsletters People Want to Read | Simplified Startup",
  description:
    "Newsletter marketing for brands, founders, and B2B companies. Editorial strategy, writing, design, list growth, and platforms like Beehiiv, Kit, and HubSpot.",
};

export default function NewsletterMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <NewsletterMarketingView />
    </ResourcePage>
  );
}
