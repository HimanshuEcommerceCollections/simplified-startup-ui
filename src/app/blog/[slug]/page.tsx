import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResourcePage from "@/components/resources/ResourcePage";
import Reveal from "@/components/ui/Reveal";
import "./article-page.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type FullArticle = {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  categoryLabel: string;
  body: string | null;
  publishedAt: string;
  images: { url: string; alt: string; isCover: boolean }[];
};

// rendered per request: article edits show up immediately; unknown slugs 404 via notFound()
export const dynamic = "force-dynamic";

async function fetchArticle(slug: string): Promise<FullArticle | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/content/articles/${slug}`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = (await res.json()) as { ok: boolean; article: FullArticle };
    return data.ok ? data.article : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return { title: "Article | Simplified Startup" };
  return { title: `${article.title} | Simplified Startup`, description: article.summary };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article || !article.body) notFound();

  const cover = article.images.find((img) => img.isCover) ?? null;
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <ResourcePage name="blog">
      <article className="band bl-article">
        <div className="wrap bl-article-wrap">
          <Reveal>
            <Link className="bl-article-back" href="/blog">
              ← All articles
            </Link>
            <div className="bl-article-meta">
              <span className="eyebrow">{article.categoryLabel}</span>
              <span className="bl-article-dot" aria-hidden="true"></span>
              <span>{article.readTime}</span>
              <span className="bl-article-dot" aria-hidden="true"></span>
              <time dateTime={article.publishedAt}>{date}</time>
            </div>
            <h1 className="bl-article-title">{article.title}</h1>
            <p className="bl-article-summary">{article.summary}</p>
          </Reveal>
          {cover && (
            <Reveal className="bl-article-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${API_URL}${cover.url}`} alt={cover.alt} />
            </Reveal>
          )}
          {/* body is sanitized server-side against the editor's allowlist */}
          <Reveal className="bl-article-body" dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>
      </article>
    </ResourcePage>
  );
}
