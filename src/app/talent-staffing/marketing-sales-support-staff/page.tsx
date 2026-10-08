import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MarketingSalesSupportStaffView from "@/components/service-detail/talent-staffing/marketing-sales-support-staff/MarketingSalesSupportStaffView";

export const metadata: Metadata = {
  title: "Marketing & Sales Support Staff | Remote Marketing Assistants & SDRs | Simplified Startup",
  description:
    "Hire remote marketing coordinators, social media assistants, SDRs, and CRM support staff to help your team publish more, follow up faster, and keep your pipeline organized.",
};

export default function MarketingSalesSupportStaffPage() {
  return (
    <ResourcePage name="service-detail">
      <MarketingSalesSupportStaffView />
    </ResourcePage>
  );
}
