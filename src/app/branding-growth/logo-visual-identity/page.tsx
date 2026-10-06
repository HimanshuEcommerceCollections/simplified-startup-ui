import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LogoVisualIdentityView from "@/components/service-detail/branding-growth/logo-visual-identity/LogoVisualIdentityView";

export const metadata: Metadata = {
  title: "Logo & Visual Identity: Custom Logos & Brand Systems | Simplified Startup",
  description:
    "Custom logo design and complete visual identity systems for startups and growing brands - strategy-first, human-designed, every file format included, and full copyright ownership at handoff.",
};

export default function LogoVisualIdentityPage() {
  return (
    <ResourcePage name="service-detail">
      <LogoVisualIdentityView />
    </ResourcePage>
  );
}
