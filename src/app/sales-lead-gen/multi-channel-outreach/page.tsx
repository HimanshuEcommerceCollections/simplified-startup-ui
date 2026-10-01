import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MultiChannelOutreachView from "@/components/service-detail/sales-lead-gen/multi-channel-outreach/MultiChannelOutreachView";

export const metadata: Metadata = {
  title: "Multi-Channel Outreach: Email, LinkedIn, Phone & Video in One Cadence | Simplified Startup",
  description:
    "Done-for-you multi-channel outreach - email, LinkedIn, phone, and video coordinated in one 21-day cadence, with signal-based follow-up, real SDRs, and every meeting synced to your CRM.",
};

export default function MultiChannelOutreachPage() {
  return (
    <ResourcePage name="service-detail">
      <MultiChannelOutreachView />
    </ResourcePage>
  );
}
