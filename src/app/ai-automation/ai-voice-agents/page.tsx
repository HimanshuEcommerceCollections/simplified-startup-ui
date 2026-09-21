import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiVoiceAgentsView from "@/components/service-detail/ai-automation/ai-voice-agents/AiVoiceAgentsView";

export const metadata: Metadata = {
  title: "AI Voice Agents & AI Receptionists — 24/7 Call Answering | Simplified Startup",
  description:
    "Custom AI receptionist that answers every call, books appointments, and captures every lead 24/7 - trained on your business, works with your existing number, flat monthly pricing.",
};

export default function AiVoiceAgentsPage() {
  return (
    <ResourcePage name="service-detail">
      <AiVoiceAgentsView />
    </ResourcePage>
  );
}
