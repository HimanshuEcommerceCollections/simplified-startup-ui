import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import ColdEmailView from "@/components/service-detail/sales-lead-gen/cold-email/ColdEmailView";

export const metadata: Metadata = {
  title: "Cold Email Outreach — Deliverability-First, Done-For-You | Simplified Startup",
  description:
    "End-to-end cold email programs - domain setup, warm-up, list building, personalized copy, sequences, and reply handling. Built on deliverability, priced transparently, month-to-month.",
};

export default function ColdEmailPage() {
  return (
    <ResourcePage name="service-detail">
      <ColdEmailView />
    </ResourcePage>
  );
}
