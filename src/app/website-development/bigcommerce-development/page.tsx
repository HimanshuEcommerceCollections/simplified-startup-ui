import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BigcommerceDevelopmentView from "@/components/service-detail/website-development/bigcommerce-development/BigcommerceDevelopmentView";

export const metadata: Metadata = {
  title: "BigCommerce Development Services | Custom Stores & B2B Commerce | Simplified Startup",
  description:
    "BigCommerce development for growing and B2B stores. Custom Stencil themes, multi-storefront setups, B2B features, integrations, and migrations.",
};

export default function BigcommerceDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <BigcommerceDevelopmentView />
    </ResourcePage>
  );
}
