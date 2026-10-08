import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import FractionalSpecialistsView from "@/components/service-detail/talent-staffing/fractional-specialists/FractionalSpecialistsView";

export const metadata: Metadata = {
  title: "Hire a Fractional CMO, CFO, COO & More | Fractional Executives | Simplified Startup",
  description:
    "Hire fractional C-suite leaders - CMO, CFO, COO, CRO, CTO, and Head of People - part-time, without a full-time executive hire. Flexible engagements for startups and growing businesses.",
};

export default function FractionalSpecialistsPage() {
  return (
    <ResourcePage name="service-detail">
      <FractionalSpecialistsView />
    </ResourcePage>
  );
}
