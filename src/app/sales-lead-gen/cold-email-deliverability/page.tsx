import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ColdEmailDeliverabilityView from "@/components/service-detail/sales-lead-gen/cold-email-family/ColdEmailDeliverabilityView";

export const metadata: Metadata = {
  title: "Cold Email Deliverability Setup | Domains, Inboxes, Warmup & DNS | Simplified Startup",
  description:
    "Cold email deliverability setup: secondary domains, Google Workspace and Microsoft 365 inboxes, SPF, DKIM, DMARC, warmup, list verification, and monitoring.",
};

export default function ColdEmailDeliverabilityPage() {
  return (
    <ResourcePage name="service-detail">
      <ColdEmailDeliverabilityView />
    </ResourcePage>
  );
}
