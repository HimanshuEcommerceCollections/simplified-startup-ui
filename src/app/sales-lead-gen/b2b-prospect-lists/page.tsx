import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import B2bProspectListsView from "@/components/service-detail/sales-lead-gen/b2b-prospect-lists/B2bProspectListsView";

export const metadata: Metadata = {
  title: "B2B Prospect List Building: Verified, ICP-Matched Contact Data | Simplified Startup",
  description:
    "Verified B2B prospect lists built around your exact ICP - real decision-makers, deliverable emails, tested direct dials, CRM-ready. 5-step verification waterfall, never recycled, you own the data.",
};

export default function B2bProspectListsPage() {
  return (
    <ResourcePage name="service-detail">
      <B2bProspectListsView />
    </ResourcePage>
  );
}
