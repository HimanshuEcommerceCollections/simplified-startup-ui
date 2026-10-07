import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GlobalStaffingView from "@/components/service-detail/talent-staffing/global-staffing/GlobalStaffingView";

export const metadata: Metadata = {
  title: "Onshore, Nearshore & Offshore Staffing | Remote Teams | Simplified Startup",
  description:
    "Compare onshore, nearshore, and offshore staffing. Build remote teams in the U.S., Latin America, or Asia with time zones, skills, and coverage that fit your business.",
};

export default function GlobalStaffingPage() {
  return (
    <ResourcePage name="service-detail">
      <GlobalStaffingView />
    </ResourcePage>
  );
}
