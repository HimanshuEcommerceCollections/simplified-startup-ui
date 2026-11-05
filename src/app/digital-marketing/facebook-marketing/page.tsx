import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SocialPlatformView from "@/components/service-detail/digital-marketing/social-platform/SocialPlatformView";
import { FACEBOOK } from "@/components/service-detail/digital-marketing/social-platform/facebook";

export const metadata: Metadata = {
  title: "Facebook Marketing Services | Page Management, Groups & Content | Simplified Startup",
  description:
    "Facebook marketing for businesses. Page management, content planning, Reels, Groups, Events, community management, and boosted posts that support your goals.",
};

export default function FacebookMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <SocialPlatformView data={FACEBOOK} />
    </ResourcePage>
  );
}
