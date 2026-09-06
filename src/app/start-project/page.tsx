import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GrowthPlanView from "@/components/resources/growth-plan/GrowthPlanView";

export const metadata: Metadata = {
  title: "Free Growth Plan — Built Around Your Business | Simplified Startup",
  description:
    "A short conversation, then a written plan you keep — whether you hire us or not. Named services, fixed prices, and the order to run them in.",
};

export default function GrowthPlanPage() {
  return (
    <ResourcePage name="growth-plan">
      <GrowthPlanView />
    </ResourcePage>
  );
}
