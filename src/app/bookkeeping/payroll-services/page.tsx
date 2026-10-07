import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import PayrollServicesView from "@/components/service-detail/bookkeeping/payroll-services/PayrollServicesView";

export const metadata: Metadata = {
  title: "Payroll Services for Small Businesses | Gusto, ADP & QuickBooks Payroll | Simplified Startup",
  description:
    "Small business payroll setup and management in Gusto, ADP, QuickBooks Payroll, and more. Accurate pay runs, contractor payments, and payroll recorded correctly in your books.",
};

export default function PayrollServicesPage() {
  return (
    <ResourcePage name="service-detail">
      <PayrollServicesView />
    </ResourcePage>
  );
}
