import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LinkedInAdsView from "@/components/service-detail/digital-marketing/linkedin-ads/LinkedInAdsView";

export const metadata: Metadata = {
  title: "LinkedIn Ads Services: B2B, SaaS, Consulting & ABM | Simplified Startup",
  description:
    "Managed LinkedIn Ads for B2B, SaaS, consulting, and ABM - campaigns, creative, funnels, and spend managed for pipeline. Flat monthly fee, no % of spend, you own the ad account.",
};

export default function LinkedInAdsPage() {
  return (
    <ResourcePage name="service-detail">
      <LinkedInAdsView />
    </ResourcePage>
  );
}
