import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BusinessAdvisoryView from "@/components/service-detail/business-advisory/BusinessAdvisoryView";

export const metadata: Metadata = {
  title: "Business & Startup Advisory | Simplified Startup",
  description:
    "Business plans, pitch decks, market research, and financial models for founders — investor-ready deliverables at published prices, with no equity taken.",
};

export default function BusinessAdvisoryPage() {
  return (
    <ResourcePage name="service-detail">
      <BusinessAdvisoryView />
    </ResourcePage>
  );
}
