import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import CareersView from "@/components/resources/careers/CareersView";

export const metadata: Metadata = {
  title: "Careers — Do the Best Work of Your Career | Simplified Startup",
  description:
    "We're a senior, remote team that builds and grows real startups — no bloat, no busywork, no black box. See open roles.",
};

export default function CareersPage() {
  return (
    <ResourcePage name="careers">
      <CareersView />
    </ResourcePage>
  );
}
