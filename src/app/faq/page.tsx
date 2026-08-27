import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import FaqView from "@/components/resources/faq/FaqView";

export const metadata: Metadata = {
  title: "FAQ — Straight Answers on Services, Pricing & Process | Simplified Startup",
  description:
    "Everything people commonly ask — about our services, pricing, process, and how we work. In plain language, not sales pitches.",
};

export default function FaqPage() {
  return (
    <ResourcePage name="faq">
      <FaqView />
    </ResourcePage>
  );
}
