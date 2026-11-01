import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BookkeepingIndustryView from "@/components/service-detail/bookkeeping/industry/BookkeepingIndustryView";
import { RESTAURANTS } from "@/components/service-detail/bookkeeping/industry/data/restaurants";

export const metadata: Metadata = {
  title: "Restaurant Bookkeeping | POS Reconciliation, Food Cost & Labor Tracking | Simplified Startup",
  description:
    "Bookkeeping for restaurants, cafes, and bars. Daily POS sales reconciled, delivery app payouts tracked, food and labor costs recorded, and clear monthly reports.",
};

export default function RestaurantBookkeepingPage() {
  return (
    <ResourcePage name="service-detail">
      <BookkeepingIndustryView data={RESTAURANTS} />
    </ResourcePage>
  );
}
