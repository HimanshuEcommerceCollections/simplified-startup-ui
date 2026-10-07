import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import VirtualAssistantsView from "@/components/service-detail/talent-staffing/virtual-assistants/VirtualAssistantsView";

export const metadata: Metadata = {
  title: "Virtual Assistant Services for Small Businesses | Simplified Startup",
  description:
    "Hire a dedicated virtual assistant for inbox, calendar, admin, and customer support tasks. Part-time or full-time remote support for founders and small teams.",
};

export default function VirtualAssistantsPage() {
  return (
    <ResourcePage name="service-detail">
      <VirtualAssistantsView />
    </ResourcePage>
  );
}
