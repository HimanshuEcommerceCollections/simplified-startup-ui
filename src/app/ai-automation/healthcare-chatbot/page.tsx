import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ChatbotIndustryView from "@/components/service-detail/ai-automation/chatbot-industry/ChatbotIndustryView";

export const metadata: Metadata = {
  title: "Healthcare Chatbot Solutions | AI Chatbots for Clinics | Simplified Startup",
  description:
    "AI chatbot solutions for healthcare: help patients book appointments, find clinic info, and get answers to routine questions, with clear human handover.",
};

export default function HealthcareChatbotPage() {
  return (
    <ResourcePage name="service-detail">
      <ChatbotIndustryView industry="healthcare" />
    </ResourcePage>
  );
}
