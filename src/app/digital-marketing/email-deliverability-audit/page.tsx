import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import EmailDeliverabilityAuditView from "@/components/service-detail/digital-marketing/email-deliverability-audit/EmailDeliverabilityAuditView";

export const metadata: Metadata = {
  title: "Email Deliverability Audit | Get Out of Spam and Into the Inbox | Simplified Startup",
  description:
    "An email deliverability audit covering SPF, DKIM, DMARC, sender reputation, list hygiene, Gmail and Yahoo sender requirements, and content, with a clear fix plan.",
};

export default function EmailDeliverabilityAuditPage() {
  return (
    <ResourcePage name="service-detail">
      <EmailDeliverabilityAuditView />
    </ResourcePage>
  );
}
