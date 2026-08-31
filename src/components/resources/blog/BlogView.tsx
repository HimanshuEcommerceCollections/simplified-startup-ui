"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import ResourceHero from "@/components/resources/ResourceHero";
import CtaBand from "@/components/home/CtaBand";
import BlogDefluffCard from "./BlogDefluffCard";
import "./blog-page.css";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "seo", label: "SEO" },
  { key: "social", label: "Social Media" },
  { key: "ads", label: "Paid Ads" },
  { key: "ai", label: "AI & Automation" },
  { key: "pricing", label: "Pricing & Choosing an Agency" },
];

type Article = {
  cat: string;
  catLabel: string;
  read: string;
  title: string;
  summary: string;
  cover: "seo" | "social" | "pricing";
  featured?: boolean;
  art: ReactNode;
};

const ARTICLES: Article[] = [
  {
    cat: "pricing",
    catLabel: "Pricing & Choosing an Agency",
    read: "6 min read",
    title: "How to Choose a Digital Marketing Agency (Without Getting Burned)",
    summary:
      "What to ask before signing with any agency, the red flags that mean walk away, and why hidden pricing is usually a bad sign. Ends with a short checklist you can use on your own.",
    cover: "pricing",
    featured: true,
    art: (
      <svg className="bl-art" viewBox="0 0 200 140" fill="none">
        <rect className="a" x="30" y="30" width="140" height="82" rx="8" />
        <line className="a" x1="46" y1="52" x2="120" y2="52" />
        <line className="a" x1="46" y1="68" x2="150" y2="68" />
        <line className="a" x1="46" y1="84" x2="104" y2="84" />
        <path className="b" d="M126 88l10 10 20-24" />
        <circle className="c" cx="150" cy="42" r="14" />
      </svg>
    ),
  },
  {
    cat: "pricing",
    catLabel: "Pricing & Choosing an Agency",
    read: "7 min read",
    title: "What Marketing Actually Costs in 2026 (With Real Numbers)",
    summary:
      "A transparent breakdown of typical SEO, social, and ad-management pricing across the industry — so you know whether a quote you received is fair.",
    cover: "pricing",
    art: (
      <svg className="bl-art" viewBox="0 0 200 130" fill="none">
        <line className="a" x1="40" y1="100" x2="164" y2="100" />
        <rect className="b" x="52" y="70" width="20" height="30" rx="3" />
        <rect className="b" x="88" y="54" width="20" height="46" rx="3" />
        <rect className="c" x="124" y="34" width="20" height="66" rx="3" />
        <text className="t" x="40" y="30">
          $
        </text>
      </svg>
    ),
  },
  {
    cat: "seo",
    catLabel: "SEO",
    read: "8 min read",
    title: "SEO Checklist for Small Businesses",
    summary:
      "The exact on-page, technical, and local SEO basics every small-business site needs — a step-by-step list a non-technical owner can follow.",
    cover: "seo",
    art: (
      <svg className="bl-art" viewBox="0 0 200 130" fill="none">
        <circle className="a" cx="88" cy="58" r="30" />
        <line className="b" x1="110" y1="80" x2="140" y2="110" />
        <path className="c" d="M74 58l10 10 20-22" />
      </svg>
    ),
  },
  {
    cat: "social",
    catLabel: "Social Media",
    read: "5 min read",
    title: "5 Social Media Mistakes Quietly Hurting Local Businesses",
    summary:
      "Common, fixable mistakes seen across every industry — posting without a goal, ignoring comments, inconsistent branding, and more.",
    cover: "social",
    art: (
      <svg className="bl-art" viewBox="0 0 200 130" fill="none">
        <rect className="a" x="42" y="40" width="70" height="46" rx="12" />
        <path className="a" d="M64 86l-6 16 22-16" />
        <rect className="c" x="104" y="60" width="54" height="36" rx="11" />
        <circle className="b" cx="120" cy="78" r="2.6" />
        <circle className="b" cx="131" cy="78" r="2.6" />
        <circle className="b" cx="142" cy="78" r="2.6" />
      </svg>
    ),
  },
];

export default function BlogView() {
  const [activeCat, setActiveCat] = useState("all");
  const filterRef = useRef<HTMLDivElement>(null);
  const pillBgRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prevRects = useRef<Map<number, DOMRect>>(new Map());

  const shown = ARTICLES.filter((a) => activeCat === "all" || a.cat === activeCat).length;

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
              {CATEGORIES.map((cat) => (
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
            {ARTICLES.map((article, i) => {
              if (activeCat !== "all" && article.cat !== activeCat) return null;
              const Title = article.featured ? "h2" : "h3";
              return (
                <Reveal
                  as="article"
                  key={article.title}
                  className={`bl-card${article.featured ? " bl-featured" : ""}`}
                  data-index={i}
                >
                  <a className="bl-card-link" href="#" aria-label={article.title}>
                    <div className={`bl-cover bl-cover-${article.cover}`} aria-hidden="true">
                      {article.featured && <span className="bl-cover-tag">Featured</span>}
                      {article.art}
                    </div>
                    <div className="bl-body">
                      <div className="bl-meta">
                        <span className="bl-cat">{article.catLabel}</span>
                        <span className="bl-dot"></span>
                        <span className="bl-read">{article.read}</span>
                      </div>
                      <Title className="bl-title">{article.title}</Title>
                      <p className="bl-sum">{article.summary}</p>
                      <span className="bl-more">
                        Read the article <span className="arw">→</span>
                      </span>
                    </div>
                  </a>
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
