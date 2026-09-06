"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ResourceHero from "@/components/resources/ResourceHero";
import CtaBand from "@/components/home/CtaBand";
import BlogDefluffCard from "./BlogDefluffCard";
import { ART_PRESETS, DEFAULT_ART_KEY } from "./blog-artwork";
import { FALLBACK_ARTICLES, FALLBACK_CATEGORIES, type BlogCard, type BlogCategory } from "./blog-fallback";
import "./blog-page.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function CardCover({ article }: { article: BlogCard }) {
  const preset = ART_PRESETS[article.artwork] ?? ART_PRESETS[DEFAULT_ART_KEY];
  if (article.cover) {
    return (
      <div className="bl-cover bl-cover-photo" aria-hidden="true">
        {article.featured && <span className="bl-cover-tag">Featured</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bl-cover-img" src={`${API_URL}${article.cover.url}`} alt={article.cover.alt} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`bl-cover bl-cover-${preset.cover}`} aria-hidden="true">
      {article.featured && <span className="bl-cover-tag">Featured</span>}
      {preset.art}
    </div>
  );
}

export default function BlogView({
  categories = FALLBACK_CATEGORIES,
  articles = FALLBACK_ARTICLES,
}: {
  categories?: BlogCategory[];
  articles?: BlogCard[];
}) {
  const [activeCat, setActiveCat] = useState("all");
  const filterRef = useRef<HTMLDivElement>(null);
  const pillBgRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prevRects = useRef<Map<number, DOMRect>>(new Map());

  const chips: BlogCategory[] = [{ key: "all", label: "All" }, ...categories];
  const shown = articles.filter((a) => activeCat === "all" || a.categoryKey === activeCat).length;

  // slide the gradient pill behind the active filter
  useEffect(() => {
    function movePill() {
      const bar = filterRef.current;
      const bg = pillBgRef.current;
      if (!bar || !bg) return;
      const active = bar.querySelector<HTMLElement>(".bl-pill.is-active") ?? bar.querySelector<HTMLElement>(".bl-pill");
      if (!active) return;
      bg.style.width = `${active.offsetWidth}px`;
      bg.style.transform = `translateX(${active.offsetLeft - 6}px)`;
    }
    const t = setTimeout(movePill, 300);
    document.fonts?.ready.then(movePill);
    window.addEventListener("resize", movePill);
    movePill();
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", movePill);
    };
  }, [activeCat]);

  // FLIP: animate surviving cards to their new positions, fade new ones in
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".bl-card"));
    if (!reduce && prevRects.current.size) {
      cards.forEach((c) => {
        const idx = Number(c.dataset.index);
        const last = c.getBoundingClientRect();
        const first = prevRects.current.get(idx);
        if (first) {
          const dx = first.left - last.left;
          const dy = first.top - last.top;
          if (dx || dy) {
            c.animate(
              [{ transform: `translate(${dx}px,${dy}px)` }, { transform: "translate(0,0)" }],
              { duration: 460, easing: "cubic-bezier(.16,.84,.44,1)" }
            );
          }
        } else {
          c.animate(
            [{ opacity: 0, transform: "translateY(10px) scale(.97)" }, { opacity: 1, transform: "none" }],
            { duration: 420, easing: "cubic-bezier(.16,.84,.44,1)" }
          );
        }
      });
    }
    prevRects.current = new Map(cards.map((c) => [Number(c.dataset.index), c.getBoundingClientRect()]));
  }, [activeCat]);

  return (
    <>
      <ResourceHero
        variant="blog"
        eyebrow="The blog"
        ariaTitle="Straight talk. No fluff."
        line1="Straight talk."
        line2={
          <>
            No <span className="grad-text">fluff.</span>
          </>
        }
        lead="SEO, social media, ads, and AI — written for business owners, not marketers. No jargon we won't explain, no fluff to hit a word count."
      >
        <BlogDefluffCard />
      </ResourceHero>

      <section className="band bl-feed" id="articles">
        <div className="wrap">
          <Reveal className="bl-filter" role="tablist" aria-label="Filter articles by category">
            <div ref={filterRef} style={{ display: "contents" }}>
              <span className="bl-pillbg" ref={pillBgRef} aria-hidden="true"></span>
              {chips.map((cat) => (
                <button
                  key={cat.key}
                  className={`bl-pill${activeCat === cat.key ? " is-active" : ""}`}
                  onClick={() => setActiveCat(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
          <p className="bl-count" aria-live="polite">
            {shown === 1 ? "1 article" : `${shown} articles`}
          </p>

          <div className="bl-grid" ref={gridRef}>
            {articles.map((article, i) => {
              if (activeCat !== "all" && article.categoryKey !== activeCat) return null;
              const Title = article.featured ? "h2" : "h3";
              const inner = (
                <>
                  <CardCover article={article} />
                  <div className="bl-body">
                    <div className="bl-meta">
                      <span className="bl-cat">{article.categoryLabel}</span>
                      <span className="bl-dot"></span>
                      <span className="bl-read">{article.readTime}</span>
                    </div>
                    <Title className="bl-title">{article.title}</Title>
                    <p className="bl-sum">{article.summary}</p>
                    <span className="bl-more">
                      Read the article <span className="arw">→</span>
                    </span>
                  </div>
                </>
              );
              return (
                <Reveal
                  as="article"
                  key={article.slug}
                  className={`bl-card${article.featured ? " bl-featured" : ""}`}
                  data-index={i}
                >
                  {article.hasBody ? (
                    <Link className="bl-card-link" href={`/blog/${article.slug}`} aria-label={article.title}>
                      {inner}
                    </Link>
                  ) : (
                    <a className="bl-card-link" href="#" aria-label={article.title}>
                      {inner}
                    </a>
                  )}
                </Reveal>
              );
            })}
          </div>

          {shown === 0 && (
            <div className="bl-empty">
              <p>No articles in this category yet — more are on the way.</p>
              <button className="btn btn-ghost" onClick={() => setActiveCat("all")}>
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Prefer it done for you?"
        heading="Read all you like — free."
        copy={
          <>
            When you&apos;re ready for a team to run it, we&apos;re here.{" "}
            <strong>Published prices, senior people, work you own.</strong>
          </>
        }
        primaryLabel="See services & pricing"
        primaryHref="/pricing"
        secondary={{ label: "Keep reading", href: "#articles" }}
      />
    </>
  );
}
