import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import YouTubeAdsView from "@/components/service-detail/digital-marketing/youtube-ads/YouTubeAdsView";

export const metadata: Metadata = {
  title: "YouTube Ads Services: Video Campaigns, Shorts & Retargeting | Simplified Startup",
  description:
    "Managed YouTube advertising - video creative, campaigns across YouTube and Shorts, and cross-Google retargeting. Flat monthly fee, no % of spend, you own the ad account.",
};

export default function YouTubeAdsPage() {
  return (
    <ResourcePage name="service-detail">
      <YouTubeAdsView />
    </ResourcePage>
  );
}
