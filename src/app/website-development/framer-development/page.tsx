import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import FramerDevelopmentView from "@/components/service-detail/website-development/framer-development/FramerDevelopmentView";

export const metadata: Metadata = {
  title: "Framer Development Services | Fast, Design-Led Websites | Simplified Startup",
  description:
    "Framer website development for startups and brands. Design-led sites with smooth motion, built-in CMS, localization, and fast publishing.",
};

export default function FramerDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <FramerDevelopmentView />
    </ResourcePage>
  );
}
