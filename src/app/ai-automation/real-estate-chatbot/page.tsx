import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ChatbotIndustryView from "@/components/service-detail/ai-automation/chatbot-industry/ChatbotIndustryView";

export const metadata: Metadata = {
  title: "Real Estate Chatbot Solutions | AI Chatbots for Agencies | Simplified Startup",
  description:
    "AI chatbot solutions for real estate: answer property inquiries, qualify leads, and help book viewings. Built around how your agency works.",
};

export default function RealEstateChatbotPage() {
  return (
    <ResourcePage name="service-detail">
      <ChatbotIndustryView industry="real-estate" />
    </ResourcePage>
  );
}
