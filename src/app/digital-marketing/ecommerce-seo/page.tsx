import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import EcommerceSeoView from "@/components/service-detail/digital-marketing/ecommerce-seo/EcommerceSeoView";

export const metadata: Metadata = {
  title: "E-commerce SEO Services for Online Stores | Simplified Startup",
  description:
    "E-commerce SEO for Shopify, WooCommerce, and BigCommerce stores. Category and product page optimization, technical SEO, product schema, and Google Merchant Center setup.",
};

export default function EcommerceSeoPage() {
  return (
    <ResourcePage name="service-detail">
      <EcommerceSeoView />
    </ResourcePage>
  );
}
