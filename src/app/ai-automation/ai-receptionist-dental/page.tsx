import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiReceptionistIndustryView from "@/components/service-detail/ai-automation/ai-receptionist-industry/AiReceptionistIndustryView";
import { DENTAL } from "@/components/service-detail/ai-automation/ai-receptionist-industry/dental";

export const metadata: Metadata = {
  title: "AI Receptionist for Dental Practices | Answer Every Patient Call | Simplified Startup",
  description:
    "AI receptionist for dental offices. Answers calls around the clock, books and reschedules appointments, handles common questions, and routes urgent calls to your team.",
};

export default function AiReceptionistDentalPage() {
  return (
    <ResourcePage name="service-detail">
      <AiReceptionistIndustryView data={DENTAL} />
    </ResourcePage>
  );
}
