import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ColdEmailVerticalView from "@/components/service-detail/sales-lead-gen/cold-email-family/ColdEmailVerticalView";

export const metadata: Metadata = {
  title: "Cold Email for SaaS | Outbound That Books Demos | Simplified Startup",
  description:
    "Cold email outreach for SaaS companies. ICP targeting, trigger-based personalization, multi-step sequences, and demos booked with the right buyers.",
};

export default function ColdEmailSaasPage() {
  return (
    <ResourcePage name="service-detail">
      <ColdEmailVerticalView page="saas" />
    </ResourcePage>
  );
}
