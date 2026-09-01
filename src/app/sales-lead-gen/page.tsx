import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SalesLeadGenView from "@/components/service-detail/sales-lead-gen/SalesLeadGenView";

export const metadata: Metadata = {
  title: "B2B Lead Generation & Appointment Setting | Simplified Startup",
  description:
    "Targeted cold email and LinkedIn outreach in your voice, under your name — verified weekly activity counts, published retainer pricing, and accounts you own.",
};

export default function SalesLeadGenPage() {
  return (
    <ResourcePage name="service-detail">
      <SalesLeadGenView />
    </ResourcePage>
  );
}
