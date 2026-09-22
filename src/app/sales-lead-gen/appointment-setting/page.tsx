import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import AppointmentSettingView from "@/components/service-detail/sales-lead-gen/appointment-setting/AppointmentSettingView";

export const metadata: Metadata = {
  title: "Appointment Setting — Qualified B2B Meetings, Done-For-You | Simplified Startup",
  description:
    "Done-for-you B2B appointment setting - prospect research, multi-channel outreach, BANT-F qualification, and meetings booked on your calendar. Flat monthly fee, no per-meeting games.",
};

export default function AppointmentSettingPage() {
  return (
    <ResourcePage name="service-detail">
      <AppointmentSettingView />
    </ResourcePage>
  );
}
