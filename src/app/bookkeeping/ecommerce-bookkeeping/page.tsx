import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BookkeepingIndustryView from "@/components/service-detail/bookkeeping/industry/BookkeepingIndustryView";
import { ECOMMERCE } from "@/components/service-detail/bookkeeping/industry/data/ecommerce";

export const metadata: Metadata = {
  title: "E-commerce Bookkeeping | Shopify, Amazon & Online Store Accounting | Simplified Startup",
  description:
    "Bookkeeping for online stores. Shopify, Amazon, and Stripe payouts reconciled, inventory and cost of goods tracked, and monthly reports that show true profit.",
};

export default function EcommerceBookkeepingPage() {
  return (
    <ResourcePage name="service-detail">
      <BookkeepingIndustryView data={ECOMMERCE} />
    </ResourcePage>
  );
}
