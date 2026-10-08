import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import CatchUpBookkeepingView from "@/components/service-detail/bookkeeping/catch-up-bookkeeping/CatchUpBookkeepingView";

export const metadata: Metadata = {
  title: "Catch-Up Bookkeeping Services | Get Your Books Current | Simplified Startup",
  description:
    "Behind on your books? Catch-up bookkeeping rebuilds and reconciles past months or years in QuickBooks or Xero so your records are accurate and ready for your CPA.",
};

export default function CatchUpBookkeepingPage() {
  return (
    <ResourcePage name="service-detail">
      <CatchUpBookkeepingView />
    </ResourcePage>
  );
}
