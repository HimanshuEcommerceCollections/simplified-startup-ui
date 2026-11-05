import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BookkeepingIndustryView from "@/components/service-detail/bookkeeping/industry/BookkeepingIndustryView";
import { SAAS } from "@/components/service-detail/bookkeeping/industry/data/saas";

export const metadata: Metadata = {
  title: "SaaS Bookkeeping | Deferred Revenue, MRR & Startup Accounting | Simplified Startup",
  description:
    "Bookkeeping for SaaS companies. Subscription revenue recorded correctly, deferred revenue tracked, Stripe reconciled, and investor-ready reports with runway and burn.",
};

export default function SaasBookkeepingPage() {
  return (
    <ResourcePage name="service-detail">
      <BookkeepingIndustryView data={SAAS} />
    </ResourcePage>
  );
}
