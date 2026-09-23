import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import StartupMvpWebsitesView from "@/components/service-detail/website-development/startup-mvp-websites/StartupMvpWebsitesView";

export const metadata: Metadata = {
  title: "Startup & MVP Websites — Live in 2–4 Weeks, Fixed Price | Simplified Startup",
  description:
    "Waitlist pages, investor sites, and MVP marketing sites for founders - fixed price, 2-4 week launch on Webflow or Framer, no $50K minimum, you own everything.",
};

export default function StartupMvpWebsitesPage() {
  return (
    <ResourcePage name="service-detail">
      <StartupMvpWebsitesView />
    </ResourcePage>
  );
}
