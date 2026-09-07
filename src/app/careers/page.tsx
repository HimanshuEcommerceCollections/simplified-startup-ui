import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import CareersView from "@/components/resources/careers/CareersView";
import { fetchRoles, withSlugs } from "@/components/resources/careers/careers-api";

export const metadata: Metadata = {
  title: "Careers — Do the Best Work of Your Career | Simplified Startup",
  description:
    "We're a senior, remote team that builds and grows real startups — no bloat, no busywork, no black box. See open roles.",
};

// rendered per request: dashboard edits show up immediately, no publish/rebuild needed
export const dynamic = "force-dynamic";

export default async function CareersPage() {
  // Slugs computed here so each row can link to its /careers/[slug] apply page.
  const roles = withSlugs(await fetchRoles());
  return (
    <ResourcePage name="careers">
      <CareersView roles={roles} />
    </ResourcePage>
  );
}
