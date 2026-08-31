import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import TalentStaffingView from "@/components/service-detail/talent-staffing/TalentStaffingView";

export const metadata: Metadata = {
  title: "Marketing Talent & Staffing | Simplified Startup",
  description:
    "Vetted marketing specialists embedded in your team in days — transparent published rates, month-to-month, and the full agency behind every placement.",
};

export default function TalentStaffingPage() {
  return (
    <ResourcePage name="service-detail">
      <TalentStaffingView />
    </ResourcePage>
  );
}
