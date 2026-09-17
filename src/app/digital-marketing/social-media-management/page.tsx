import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SocialMediaManagementView from "@/components/service-detail/digital-marketing/social-media-management/SocialMediaManagementView";

export const metadata: Metadata = {
  title: "Social Media Management — Strategy, Content & Growth | Simplified Startup",
  description:
    "Full-service social media management - strategy, content, posting, engagement, and reporting. Short-form video, real community management, published pricing, month-to-month.",
};

export default function SocialMediaManagementPage() {
  return (
    <ResourcePage name="service-detail">
      <SocialMediaManagementView />
    </ResourcePage>
  );
}
