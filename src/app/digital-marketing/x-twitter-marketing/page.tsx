import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SocialPlatformView from "@/components/service-detail/digital-marketing/social-platform/SocialPlatformView";
import { X_TWITTER } from "@/components/service-detail/digital-marketing/social-platform/x-twitter";

export const metadata: Metadata = {
  title: "X (Twitter) Marketing Services | Thought Leadership & Brand Voice | Simplified Startup",
  description:
    "X (Twitter) marketing for brands, founders, and B2B companies. Content strategy, threads, community engagement, and real-time conversation management.",
};

export default function XTwitterMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <SocialPlatformView data={X_TWITTER} />
    </ResourcePage>
  );
}
