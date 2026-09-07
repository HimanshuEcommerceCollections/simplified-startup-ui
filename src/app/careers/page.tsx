import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import CareersView from "@/components/resources/careers/CareersView";
import { fetchRoles, withSlugs } from "@/components/resources/careers/careers-api";

export const metadata: Metadata = {
  title: "Careers — Do the Best Work of Your Career | Simplified Startup",
  description:
    "We're a senior, remote team that builds and grows real startups — no bloat, no busywork, no black box. See open roles.",
};

// static page, fresh data each build: force-static + no-store re-fetches instead of
// reusing Next's persistent fetch cache from a previous build
export const dynamic = "force-static";

export default async function CareersPage() {
  // Slugs computed here so each row can link to its /careers/[slug] apply page.
  const roles = withSlugs(await fetchRoles());
  return (
    <ResourcePage name="careers">
      <CareersView roles={roles} />
    </ResourcePage>
  );
}
