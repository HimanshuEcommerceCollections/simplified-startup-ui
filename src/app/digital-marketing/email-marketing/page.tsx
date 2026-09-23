import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import EmailMarketingView from "@/components/service-detail/digital-marketing/email-marketing/EmailMarketingView";

export const metadata: Metadata = {
  title: "Email Marketing — Campaigns, Automations & Deliverability | Simplified Startup",
  description:
    "Email marketing that turns your list into predictable revenue - campaign strategy, automation flows, copy, design, segmentation, and deliverability. Platform-agnostic, published pricing, you own everything.",
};

export default function EmailMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <EmailMarketingView />
    </ResourcePage>
  );
}
