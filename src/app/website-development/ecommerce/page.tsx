import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import EcommerceWebsitesView from "@/components/service-detail/website-development/ecommerce/EcommerceWebsitesView";

export const metadata: Metadata = {
  title: "E-commerce Website Design — Shopify & WooCommerce, Built to Convert | Simplified Startup",
  description:
    "Custom e-commerce websites on Shopify, WooCommerce, or Shopify Plus - mobile-first, built to convert, SEO from day one. Published prices, 4-8 week launch, you own the store.",
};

export default function EcommerceWebsitesPage() {
  return (
    <ResourcePage name="service-detail">
      <EcommerceWebsitesView />
    </ResourcePage>
  );
}
