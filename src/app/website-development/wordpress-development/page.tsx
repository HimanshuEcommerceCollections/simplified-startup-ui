import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import WordpressDevelopmentView from "@/components/service-detail/website-development/wordpress-development/WordpressDevelopmentView";

export const metadata: Metadata = {
  title: "WordPress Development Services | Custom WordPress Websites | Simplified Startup",
  description:
    "Custom WordPress websites built for speed, security, and easy editing. Custom themes, block editor layouts, plugin integrations, migrations, and care plans.",
};

export default function WordpressDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <WordpressDevelopmentView />
    </ResourcePage>
  );
}
