export type Role = { id?: string; title: string; type: string; desc: string; location?: string | null; body?: string | null };

/**
 * Fallback postings — used when the careers API is unreachable at build time.
 * The live list comes from simplifiedstartup-server (GET /api/v1/content/career-roles),
 * managed in the dashboard's Careers screen.
 */
export const ROLES: Role[] = [
  { title: "Growth Marketer", type: "Full-time", desc: "Own SEO, paid, and content programs for a handful of startups end to end." },
  { title: "Web Developer (Front-end)", type: "Full-time", desc: "Design-minded builder shipping fast, conversion-focused sites." },
  { title: "Brand & Content Designer", type: "Contract → Full-time", desc: "Identity systems, landing pages, and content that looks like the leader in the space." },
  { title: "AI Automation Engineer", type: "Full-time", desc: "Build workflows and agents that take real busywork off clients' plates." },
  { title: "Virtual Assistant / Ops Specialist", type: "Full-time", desc: "Senior support across admin, inbox, and client operations." },
];
