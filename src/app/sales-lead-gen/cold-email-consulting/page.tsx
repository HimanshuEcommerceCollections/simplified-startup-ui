import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ColdEmailVerticalView from "@/components/service-detail/sales-lead-gen/cold-email-family/ColdEmailVerticalView";

export const metadata: Metadata = {
  title: "Cold Email for Consultants | Outbound Lead Generation for Consulting Firms | Simplified Startup",
  description:
    "Cold email outreach for consultants and consulting firms. Expertise-led messaging, executive targeting, and respectful sequences that start high-value conversations.",
};

export default function ColdEmailConsultingPage() {
  return (
    <ResourcePage name="service-detail">
      <ColdEmailVerticalView page="consulting" />
    </ResourcePage>
  );
}
