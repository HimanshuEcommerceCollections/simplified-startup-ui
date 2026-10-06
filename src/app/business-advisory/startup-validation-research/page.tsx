import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import StartupValidationResearchView from "@/components/service-detail/business-advisory/startup-validation-research/StartupValidationResearchView";

export const metadata: Metadata = {
  title: "Startup Validation & Market Research: Test Your Idea Before You Build | Simplified Startup",
  description:
    "Startup validation and market research - customer interviews, market sizing, competitor analysis, demand and pricing tests, and a proceed/pivot/pause decision memo. Evidence, not opinions.",
};

export default function StartupValidationResearchPage() {
  return (
    <ResourcePage name="service-detail">
      <StartupValidationResearchView />
    </ResourcePage>
  );
}
