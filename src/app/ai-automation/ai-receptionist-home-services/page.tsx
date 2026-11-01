import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiReceptionistIndustryView from "@/components/service-detail/ai-automation/ai-receptionist-industry/AiReceptionistIndustryView";
import { HOME_SERVICES } from "@/components/service-detail/ai-automation/ai-receptionist-industry/home-services";

export const metadata: Metadata = {
  title: "AI Receptionist for Home Services | Book More Jobs, Miss Fewer Calls | Simplified Startup",
  description:
    "AI receptionist for HVAC, plumbing, electrical, roofing, and other home service businesses. Answers calls, books jobs, and routes emergencies to on-call techs.",
};

export default function AiReceptionistHomeServicesPage() {
  return (
    <ResourcePage name="service-detail">
      <AiReceptionistIndustryView data={HOME_SERVICES} />
    </ResourcePage>
  );
}
