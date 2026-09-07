import { ROLES, type Role } from "./careers-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type PublicCareerRole = { id: string; title: string; type: string; location: string | null; description: string; body: string | null };

/**
 * Postings come from simplifiedstartup-server at build time (the dashboard's
 * "Publish to website" triggers a rebuild). If the API is unreachable during
 * the build, the shipped fallback list keeps the pages whole.
 */
export async function fetchRoles(): Promise<Role[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/career-roles`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`career roles fetch failed (${res.status})`);
    const data = (await res.json()) as { ok: boolean; items: PublicCareerRole[] };
    if (!data.ok || !Array.isArray(data.items) || data.items.length === 0) return ROLES;
    return data.items.map((r) => ({ id: r.id, title: r.title, type: r.type, desc: r.description, location: r.location, body: r.body }));
  } catch {
    console.warn("[careers] falling back to bundled roles — API unreachable at build time");
    return ROLES;
  }
}
