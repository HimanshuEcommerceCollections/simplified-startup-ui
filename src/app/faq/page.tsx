import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import FaqView from "@/components/resources/faq/FaqView";
import { FAQ_CATEGORIES, type FaqCategory } from "@/components/resources/faq/faq-data";

export const metadata: Metadata = {
  title: "FAQ — Straight Answers on Services, Pricing & Process | Simplified Startup",
  description:
    "Everything people commonly ask — about our services, pricing, process, and how we work. In plain language, not sales pitches.",
};

// rendered per request: dashboard edits show up immediately, no publish/rebuild needed
export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchFaqs(): Promise<FaqCategory[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/faqs`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`faqs fetch failed (${res.status})`);
    const data = (await res.json()) as { ok: boolean; categories: { key: string; label: string; items: { q: string; a: string }[] }[] };
    if (!data.ok || data.categories.length === 0) throw new Error("empty");
    return data.categories.map((c, i) => ({ key: c.key, label: c.label, num: String(i + 1).padStart(2, "0"), items: c.items }));
  } catch {
    console.warn("[faq] falling back to bundled questions — API unreachable at build time");
    return FAQ_CATEGORIES;
  }
}

export default async function FaqPage() {
  const categories = await fetchFaqs();
  return (
    <ResourcePage name="faq">
      <FaqView categories={categories} />
    </ResourcePage>
  );
}
