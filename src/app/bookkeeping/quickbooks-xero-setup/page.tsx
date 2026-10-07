import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import QuickbooksXeroSetupView from "@/components/service-detail/bookkeeping/quickbooks-xero-setup/QuickbooksXeroSetupView";

export const metadata: Metadata = {
  title: "QuickBooks & Xero Setup and Cleanup Services | Simplified Startup",
  description:
    "QuickBooks Online and Xero setup, cleanup, and migration for small businesses. Chart of accounts, bank feeds, integrations, and training - set up right from day one.",
};

export default function QuickbooksXeroSetupPage() {
  return (
    <ResourcePage name="service-detail">
      <QuickbooksXeroSetupView />
    </ResourcePage>
  );
}
