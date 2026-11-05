import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SocialPlatformView from "@/components/service-detail/digital-marketing/social-platform/SocialPlatformView";
import { TIKTOK } from "@/components/service-detail/digital-marketing/social-platform/tiktok";

export const metadata: Metadata = {
  title: "TikTok Marketing Services | Content, Creators & Growth | Simplified Startup",
  description:
    "TikTok marketing for brands and businesses. Content strategy, short-form video production, trend planning, creator partnerships, and Spark Ads support.",
};

export default function TikTokMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <SocialPlatformView data={TIKTOK} />
    </ResourcePage>
  );
}
