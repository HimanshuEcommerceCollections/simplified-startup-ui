import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AiContentMarketingView from "@/components/service-detail/ai-automation/ai-content-marketing/AiContentMarketingView";

export const metadata: Metadata = {
  title: "AI Content & Marketing Automation — At Scale, On-Brand | Simplified Startup",
  description:
    "Done-for-you AI content marketing - blogs, email, social, and ads at 10x speed, edited by real humans so it stays on-brand and accurate. Trained on your voice, priced transparently.",
};

export default function AiContentMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <AiContentMarketingView />
    </ResourcePage>
  );
}
