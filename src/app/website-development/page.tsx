import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import WebsiteDevelopmentView from "@/components/service-detail/website-development/WebsiteDevelopmentView";

export const metadata: Metadata = {
  title: "Small Business Web Design & Development | Simplified Startup",
  description:
    "Small business web design that sells — custom-designed, conversion-built websites with a published 14-point checklist and prices set before work starts.",
};

export default function WebsiteDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <WebsiteDevelopmentView />
    </ResourcePage>
  );
}
