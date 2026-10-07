import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MonthlyBookkeepingView from "@/components/service-detail/bookkeeping/monthly-bookkeeping/MonthlyBookkeepingView";

export const metadata: Metadata = {
  title: "Monthly Bookkeeping Services for Small Businesses | Simplified Startup",
  description:
    "Monthly bookkeeping in QuickBooks or Xero: transaction categorization, bank reconciliation, and monthly financial reports - so your books stay current and tax-ready.",
};

export default function MonthlyBookkeepingPage() {
  return (
    <ResourcePage name="service-detail">
      <MonthlyBookkeepingView />
    </ResourcePage>
  );
}
