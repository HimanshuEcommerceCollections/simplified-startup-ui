import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import EmailAutomationFlowsView from "@/components/service-detail/digital-marketing/email-automation-flows/EmailAutomationFlowsView";

export const metadata: Metadata = {
  title: "Email Automation & Flows | Triggered Emails That Run on Their Own | Simplified Startup",
  description:
    "Email automation and flow building for e-commerce, B2B, and service businesses. Triggers, branching logic, personalization, testing, and flow audits.",
};

export default function EmailAutomationFlowsPage() {
  return (
    <ResourcePage name="service-detail">
      <EmailAutomationFlowsView />
    </ResourcePage>
  );
}
