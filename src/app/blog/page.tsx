import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BlogView from "@/components/resources/blog/BlogView";
import {
  FALLBACK_ARTICLES,
  FALLBACK_CATEGORIES,
  type BlogCard,
  type BlogCategory,
} from "@/components/resources/blog/blog-fallback";

export const metadata: Metadata = {
  title: "The Blog — Straight Talk on SEO, Social, Ads & AI | Simplified Startup",
  description:
    "SEO, social media, ads, and AI — written for business owners, not marketers. No jargon we won't explain, no fluff to hit a word count.",
};

// static page, fresh data each build: force-static + no-store re-fetches instead of
// reusing Next's persistent fetch cache from a previous build
export const dynamic = "force-static";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchBlog(): Promise<{ categories: BlogCategory[]; articles: BlogCard[] }> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/articles`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`articles fetch failed (${res.status})`);
    const data = (await res.json()) as { ok: boolean; categories: BlogCategory[]; items: BlogCard[] };
    if (!data.ok || data.items.length === 0) throw new Error("empty");
    return { categories: data.categories, articles: data.items };
  } catch {
    console.warn("[blog] falling back to bundled articles — API unreachable at build time");
    return { categories: FALLBACK_CATEGORIES, articles: FALLBACK_ARTICLES };
  }
}

export default async function BlogPage() {
  const { categories, articles } = await fetchBlog();
  return (
    <ResourcePage name="blog">
      <BlogView categories={categories} articles={articles} />
    </ResourcePage>
  );
}
