import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BookkeepingIndustryView from "@/components/service-detail/bookkeeping/industry/BookkeepingIndustryView";
import { AGENCIES } from "@/components/service-detail/bookkeeping/industry/data/agencies";

export const metadata: Metadata = {
  title: "Agency Bookkeeping | Accounting for Marketing & Creative Agencies | Simplified Startup",
  description:
    "Bookkeeping for marketing, creative, and digital agencies. Retainers and projects tracked, client pass-through costs separated, contractor payments organized, and profit by client.",
};

export default function AgencyBookkeepingPage() {
  return (
    <ResourcePage name="service-detail">
      <BookkeepingIndustryView data={AGENCIES} />
    </ResourcePage>
  );
}
