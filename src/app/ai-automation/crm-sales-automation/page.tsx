import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import CrmSalesAutomationView from "@/components/service-detail/ai-automation/crm-sales-automation/CrmSalesAutomationView";

export const metadata: Metadata = {
  title: "CRM & Sales Automation — HubSpot, Salesforce, GHL, Pipedrive | Simplified Startup",
  description:
    "Done-for-you CRM setup and sales automation on HubSpot, Salesforce, GoHighLevel, or Pipedrive - pipeline build, AI lead scoring, follow-up automation, and full-stack integration. You own everything.",
};

export default function CrmSalesAutomationPage() {
  return (
    <ResourcePage name="service-detail">
      <CrmSalesAutomationView />
    </ResourcePage>
  );
}
