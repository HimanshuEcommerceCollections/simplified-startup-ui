import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GlossaryView from "@/components/resources/glossary/GlossaryView";
import { GLOSSARY, type GlossaryLetter } from "@/components/resources/glossary/glossary-data";

export const metadata: Metadata = {
  title: "Marketing Glossary — Plain-English Definitions | Simplified Startup",
  description:
    "Every marketing term you've nodded along to, defined in plain English — the way we'd explain it to a friend.",
};

// static page, fresh data each build: force-static + no-store re-fetches instead of
// reusing Next's persistent fetch cache from a previous build
export const dynamic = "force-static";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Groups flat API terms into the A–Z sections the view renders. */
function groupByLetter(terms: { term: string; definition: string }[]): GlossaryLetter[] {
  const groups = new Map<string, GlossaryLetter>();
  for (const t of terms) {
    const first = t.term.match(/[a-zA-Z]/)?.[0]?.toUpperCase() ?? "#";
    if (!groups.has(first)) groups.set(first, { letter: first, terms: [] });
    groups.get(first)!.terms.push({ name: t.term, def: t.definition });
  }
  return [...groups.values()].sort((a, b) => a.letter.localeCompare(b.letter));
}

async function fetchGlossary(): Promise<GlossaryLetter[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/glossary`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`glossary fetch failed (${res.status})`);
    const data = (await res.json()) as { ok: boolean; items: { term: string; definition: string }[] };
    if (!data.ok || data.items.length === 0) throw new Error("empty");
    return groupByLetter(data.items);
  } catch {
    console.warn("[glossary] falling back to bundled terms — API unreachable at build time");
    return GLOSSARY;
  }
}

export default async function GlossaryPage() {
  const glossary = await fetchGlossary();
  return (
    <ResourcePage name="glossary">
      <GlossaryView glossary={glossary} />
    </ResourcePage>
  );
}
