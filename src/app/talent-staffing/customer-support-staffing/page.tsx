import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import CustomerSupportStaffingView from "@/components/service-detail/talent-staffing/customer-support-staffing/CustomerSupportStaffingView";

export const metadata: Metadata = {
  title: "Customer Support Staffing | Outsourced Support Agents | Simplified Startup",
  description:
    "Remote customer support agents for email, live chat, phone, and social. Flexible coverage for business hours, evenings, weekends, or 24/7 support.",
};

export default function CustomerSupportStaffingPage() {
  return (
    <ResourcePage name="service-detail">
      <CustomerSupportStaffingView />
    </ResourcePage>
  );
}
