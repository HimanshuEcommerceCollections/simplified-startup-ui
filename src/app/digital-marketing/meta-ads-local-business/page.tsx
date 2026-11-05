import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MetaAdsLocalBusinessView from "@/components/service-detail/digital-marketing/meta-ads-local-business/MetaAdsLocalBusinessView";

export const metadata: Metadata = {
  title: "Meta Ads for Local Businesses | Facebook & Instagram Ads Near You | Simplified Startup",
  description:
    "Facebook and Instagram ads for local businesses. Location targeting, local offers, messaging and call ads, and community-focused creative that brings in nearby customers.",
};

export default function MetaAdsLocalBusinessPage() {
  return (
    <ResourcePage name="service-detail">
      <MetaAdsLocalBusinessView />
    </ResourcePage>
  );
}
