import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ChatbotIndustryView from "@/components/service-detail/ai-automation/chatbot-industry/ChatbotIndustryView";

export const metadata: Metadata = {
  title: "SaaS Chatbot Solutions | AI Chatbots for Software | Simplified Startup",
  description:
    "AI chatbot solutions for SaaS: answer product questions, guide onboarding, automate routine support, and qualify leads. Built around your product and docs.",
};

export default function SaasChatbotPage() {
  return (
    <ResourcePage name="service-detail">
      <ChatbotIndustryView industry="saas" />
    </ResourcePage>
  );
}
