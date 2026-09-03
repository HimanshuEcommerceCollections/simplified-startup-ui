import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import CareersView from "@/components/resources/careers/CareersView";
import { ROLES, type Role } from "@/components/resources/careers/careers-data";

export const metadata: Metadata = {
  title: "Careers — Do the Best Work of Your Career | Simplified Startup",
  description:
    "We're a senior, remote team that builds and grows real startups — no bloat, no busywork, no black box. See open roles.",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type PublicCareerRole = { id: string; title: string; type: string; location: string | null; description: string };

/**
 * Postings come from simplifiedstartup-server at build time (the dashboard's
 * "Publish to website" triggers a rebuild). If the API is unreachable during
 * the build, the shipped fallback list keeps the page whole.
 */
async function fetchRoles(): Promise<Role[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/career-roles`, {
      cache: "force-cache",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`career roles fetch failed (${res.status})`);
    const data = (await res.json()) as { ok: boolean; items: PublicCareerRole[] };
    if (!data.ok || !Array.isArray(data.items) || data.items.length === 0) return ROLES;
    return data.items.map((r) => ({ id: r.id, title: r.title, type: r.type, desc: r.description, location: r.location }));
  } catch {
    console.warn("[careers] falling back to bundled roles — API unreachable at build time");
    return ROLES;
  }
}

export default async function CareersPage() {
  const roles = await fetchRoles();
  return (
    <ResourcePage name="careers">
      <CareersView roles={roles} />
    </ResourcePage>
  );
}
