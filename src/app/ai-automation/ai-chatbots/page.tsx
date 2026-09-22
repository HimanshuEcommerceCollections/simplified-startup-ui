import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiChatbotsView from "@/components/service-detail/ai-automation/ai-chatbots/AiChatbotsView";

export const metadata: Metadata = {
  title: "AI Chatbots & Website Assistants — Custom-Trained, Done-For-You | Simplified Startup",
  description:
    "Done-for-you AI chatbot development - custom-trained on your website, docs, and FAQs. Answers questions, qualifies leads, books appointments, and hands off to humans. Live in 2-4 weeks.",
};

export default function AiChatbotsPage() {
  return (
    <ResourcePage name="service-detail">
      <AiChatbotsView />
    </ResourcePage>
  );
}
