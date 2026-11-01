import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import EcommerceEmailMarketingView from "@/components/service-detail/digital-marketing/ecommerce-email-marketing/EcommerceEmailMarketingView";

export const metadata: Metadata = {
  title: "E-commerce Email Marketing | Klaviyo Flows & Campaigns for Online Stores | Simplified Startup",
  description:
    "E-commerce email marketing for online stores. Welcome, cart, browse, and post-purchase flows, campaign calendars, segmentation, and Klaviyo setup.",
};

export default function EcommerceEmailMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <EcommerceEmailMarketingView />
    </ResourcePage>
  );
}
