import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LocalBusinessWebsitesView from "@/components/service-detail/website-development/local-business-websites/LocalBusinessWebsitesView";

export const metadata: Metadata = {
  title: "Local Business Website Design — Built to Ring the Phone | Simplified Startup",
  description:
    "Websites for plumbers, dentists, lawyers, salons, restaurants, gyms - mobile-first, phone-first, review-first. Built to turn 'near me' searches into booked calls. Published pricing, 3-5 week launch.",
};

export default function LocalBusinessWebsitesPage() {
  return (
    <ResourcePage name="service-detail">
      <LocalBusinessWebsitesView />
    </ResourcePage>
  );
}
