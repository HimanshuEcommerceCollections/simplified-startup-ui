import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ShopifyDevelopmentView from "@/components/service-detail/website-development/shopify-development/ShopifyDevelopmentView";

export const metadata: Metadata = {
  title: "Shopify Development Services | Custom Shopify Stores & Themes | Simplified Startup",
  description:
    "Shopify development for new and growing stores. Custom themes, Online Store 2.0 sections, app integrations, migrations, and Shopify Plus support.",
};

export default function ShopifyDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <ShopifyDevelopmentView />
    </ResourcePage>
  );
}
