import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import HeadlessCommerceView from "@/components/service-detail/website-development/headless-commerce/HeadlessCommerceView";

export const metadata: Metadata = {
  title: "Headless Commerce Development | Custom Storefronts on Shopify & BigCommerce | Simplified Startup",
  description:
    "Headless commerce development with custom front ends on Next.js, Shopify Hydrogen, and BigCommerce, connected to a headless CMS for flexible, fast shopping experiences.",
};

export default function HeadlessCommercePage() {
  return (
    <ResourcePage name="service-detail">
      <HeadlessCommerceView />
    </ResourcePage>
  );
}
