import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ContactView from "@/components/resources/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact: Let’s Talk About What You’re Building | Simplified Startup",
  description:
    "Tell us where your business is today and what you need help with - a real person reads every message and replies by email. Free first consultation, one team across marketing, web, brand, sales, AI, and finance.",
};

export default function ContactPage() {
  return (
    <ResourcePage name="service-detail">
      <ContactView />
    </ResourcePage>
  );
}
