import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import SmsWhatsappMarketingView from "@/components/service-detail/digital-marketing/sms-whatsapp-marketing/SmsWhatsappMarketingView";

export const metadata: Metadata = {
  title: "SMS & WhatsApp Marketing | Permission-Based Text Messaging | Simplified Startup",
  description:
    "SMS and WhatsApp marketing built on consent. Opt-in setup, automated messages, campaigns, two-way conversations, and compliance-minded best practices.",
};

export default function SmsWhatsappMarketingPage() {
  return (
    <ResourcePage name="service-detail">
      <SmsWhatsappMarketingView />
    </ResourcePage>
  );
}
