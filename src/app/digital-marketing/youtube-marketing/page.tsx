import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SocialPlatformView from "@/components/service-detail/digital-marketing/social-platform/SocialPlatformView";
import { YOUTUBE } from "@/components/service-detail/digital-marketing/social-platform/youtube";

export const metadata: Metadata = {
  title: "YouTube Marketing Services | Channel Growth, Shorts & SEO | Simplified Startup",
  description:
    "YouTube marketing for brands and businesses. Channel strategy, long-form videos, Shorts, YouTube SEO, thumbnails, and analytics to grow a channel that lasts.",
};

export default function YouTubeMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <SocialPlatformView data={YOUTUBE} />
    </ResourcePage>
  );
}
