import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BookkeepingIndustryView from "@/components/service-detail/bookkeeping/industry/BookkeepingIndustryView";
import { REAL_ESTATE } from "@/components/service-detail/bookkeeping/industry/data/realEstate";

export const metadata: Metadata = {
  title: "Real Estate Bookkeeping | For Agents, Investors & Landlords | Simplified Startup",
  description:
    "Bookkeeping for real estate agents, investors, and landlords. Commissions tracked, rental income and expenses by property, mortgage payments split, and clear monthly reports.",
};

export default function RealEstateBookkeepingPage() {
  return (
    <ResourcePage name="service-detail">
      <BookkeepingIndustryView data={REAL_ESTATE} />
    </ResourcePage>
  );
}
