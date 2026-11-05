import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GoogleShoppingPmaxView from "@/components/service-detail/digital-marketing/google-shopping-pmax/GoogleShoppingPmaxView";

export const metadata: Metadata = {
  title: "Google Shopping & Performance Max Management | Simplified Startup",
  description:
    "Google Shopping and Performance Max management. Merchant Center feed optimization, asset groups, audience signals, custom labels, and reporting you can understand.",
};

export default function GoogleShoppingPmaxPage() {
  return (
    <ResourcePage name="service-detail">
      <GoogleShoppingPmaxView />
    </ResourcePage>
  );
}
