import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import StartupLogoDesignView from "@/components/service-detail/branding-growth/startup-logo-design/StartupLogoDesignView";

export const metadata: Metadata = {
  title: "Startup Logo Design | Logos Built for Launch and Growth | Simplified Startup",
  description:
    "Startup logo design for founders preparing to launch, raise, or rebrand. Custom logos tested for app icons, pitch decks, product UI, and every size in between.",
};

export default function StartupLogoDesignPage() {
  return (
    <ResourcePage name="service-detail">
      <StartupLogoDesignView />
    </ResourcePage>
  );
}
