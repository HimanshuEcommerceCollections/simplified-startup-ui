import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiAutomationView from "@/components/service-detail/ai-automation/AiAutomationView";

export const metadata: Metadata = {
  title: "AI & Workflow Automation for Small Business | Simplified Startup",
  description:
    "AI and workflow automation for small business — reports, data entry, and follow-ups automated, documented, and owned by you. Humans kept on every judgment call.",
};

export default function AiAutomationPage() {
  return (
    <ResourcePage name="service-detail">
      <AiAutomationView />
    </ResourcePage>
  );
}
