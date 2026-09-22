import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LinkedinOutreachView from "@/components/service-detail/sales-lead-gen/linkedin-outreach/LinkedinOutreachView";

export const metadata: Metadata = {
  title: "LinkedIn Outreach & Lead Generation — Compliant, Done-For-You | Simplified Startup",
  description:
    "Managed LinkedIn outreach for B2B - profile optimization, Sales Navigator prospecting, signal-based targeting, personalized messaging, and content. Compliant, flat monthly, no risk-your-account automation.",
};

export default function LinkedinOutreachPage() {
  return (
    <ResourcePage name="service-detail">
      <LinkedinOutreachView />
    </ResourcePage>
  );
}
