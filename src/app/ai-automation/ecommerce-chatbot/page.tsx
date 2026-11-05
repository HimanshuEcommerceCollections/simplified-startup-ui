import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ChatbotIndustryView from "@/components/service-detail/ai-automation/chatbot-industry/ChatbotIndustryView";

export const metadata: Metadata = {
  title: "Ecommerce Chatbot Solutions | AI Chatbots for Online Stores | Simplified Startup",
  description:
    "AI chatbot solutions for ecommerce stores: help shoppers find products, get answers, and reach support. Built around your store’s real workflows.",
};

export default function EcommerceChatbotPage() {
  return (
    <ResourcePage name="service-detail">
      <ChatbotIndustryView industry="ecommerce" />
    </ResourcePage>
  );
}
