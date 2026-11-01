import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiReceptionistIndustryView from "@/components/service-detail/ai-automation/ai-receptionist-industry/AiReceptionistIndustryView";
import { LAW_FIRMS } from "@/components/service-detail/ai-automation/ai-receptionist-industry/law-firms";

export const metadata: Metadata = {
  title: "AI Receptionist for Law Firms | Legal Intake Around the Clock | Simplified Startup",
  description:
    "AI receptionist for law firms. Answers calls, captures new client intake, schedules consultations, and routes urgent matters to your team, with clear boundaries.",
};

export default function AiReceptionistLawFirmsPage() {
  return (
    <ResourcePage name="service-detail">
      <AiReceptionistIndustryView data={LAW_FIRMS} />
    </ResourcePage>
  );
}
