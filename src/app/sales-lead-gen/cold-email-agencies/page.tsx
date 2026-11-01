import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ColdEmailVerticalView from "@/components/service-detail/sales-lead-gen/cold-email-family/ColdEmailVerticalView";

export const metadata: Metadata = {
  title: "Cold Email for Agencies | Outbound Lead Generation for Marketing & Creative Agencies | Simplified Startup",
  description:
    "Cold email outreach for marketing, creative, and development agencies. Targeted prospect lists, personalized sequences, and booked calls with decision-makers.",
};

export default function ColdEmailAgenciesPage() {
  return (
    <ResourcePage name="service-detail">
      <ColdEmailVerticalView page="agencies" />
    </ResourcePage>
  );
}
