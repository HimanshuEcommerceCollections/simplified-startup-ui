import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import InstagramAdsView from "@/components/service-detail/digital-marketing/instagram-ads/InstagramAdsView";

export const metadata: Metadata = {
  title: "Instagram Ads Management | Reels, Stories & Feed Ads | Simplified Startup",
  description:
    "Instagram ads management for brands and businesses. Reels, Stories, Feed, and Explore placements, creator partnership ads, and creative built for mobile.",
};

export default function InstagramAdsPage() {
  return (
    <ResourcePage name="service-detail">
      <InstagramAdsView />
    </ResourcePage>
  );
}
