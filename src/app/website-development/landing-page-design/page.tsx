import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LandingPageDesignView from "@/components/service-detail/website-development/landing-page-design/LandingPageDesignView";

export const metadata: Metadata = {
  title: "Landing Page Design — Built to Convert, Live in Days | Simplified Startup",
  description:
    "Landing pages designed to convert - one page, one message, one CTA. Live in 2-5 business days, A/B testing built in, ad-to-page message match, priced by the page.",
};

export default function LandingPageDesignPage() {
  return (
    <ResourcePage name="service-detail">
      <LandingPageDesignView />
    </ResourcePage>
  );
}
