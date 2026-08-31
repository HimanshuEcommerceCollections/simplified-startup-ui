import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import DigitalMarketingView from "@/components/service-detail/digital-marketing/DigitalMarketingView";

export const metadata: Metadata = {
  title: "Digital Marketing for Small Business | Simplified Startup",
  description:
    "Digital marketing with the black box removed — fixed scope, published pricing, and a monthly report that says what we did, what it cost, and what it moved.",
};

export default function DigitalMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <DigitalMarketingView />
    </ResourcePage>
  );
}
