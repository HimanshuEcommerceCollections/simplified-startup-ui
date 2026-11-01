import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import WoocommerceDevelopmentView from "@/components/service-detail/website-development/woocommerce-development/WoocommerceDevelopmentView";

export const metadata: Metadata = {
  title: "WooCommerce Development Services | Custom WordPress Stores | Simplified Startup",
  description:
    "WooCommerce development for businesses that want full control. Custom stores on WordPress, plugin integrations, performance, security, and ongoing care.",
};

export default function WoocommerceDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <WoocommerceDevelopmentView />
    </ResourcePage>
  );
}
