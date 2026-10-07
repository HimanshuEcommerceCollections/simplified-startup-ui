import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LocalSeoView from "@/components/service-detail/digital-marketing/local-seo/LocalSeoView";

export const metadata: Metadata = {
  title: "Local SEO Services for Small Businesses | Simplified Startup",
  description:
    "Local SEO services for small businesses and multi-location brands. Google Business Profile, local map rankings, citations, reviews, and location pages that bring in nearby customers.",
};

export default function LocalSeoPage() {
  return (
    <ResourcePage name="service-detail">
      <LocalSeoView />
    </ResourcePage>
  );
}
