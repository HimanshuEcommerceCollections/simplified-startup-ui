import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LeadGenAuditView from "@/components/service-detail/sales-lead-gen/lead-gen-audit/LeadGenAuditView";

export const metadata: Metadata = {
  title: "Lead Gen Audit: Find Where Your Leads Slip Away | Simplified Startup",
  description:
    "A focused 1-2 week lead generation audit - targeting, data quality, deliverability, messaging, lead handling, and CRM reviewed across every channel. Plain-language findings and a prioritized 90-day plan. No obligation.",
};

export default function LeadGenAuditPage() {
  return (
    <ResourcePage name="service-detail">
      <LeadGenAuditView />
    </ResourcePage>
  );
}
