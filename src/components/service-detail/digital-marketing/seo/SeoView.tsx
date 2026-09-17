"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  FeatureGrid,
  NoteCallout,
  PricingTiers,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./seo-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SPARK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHAT_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES_SHORT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES_LONG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC3 = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC2 = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_REPORT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 16v-4M13 16V9M17 16v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_AUDIT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2M9 11h4M11 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LAUNCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M6 9l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CITED = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: search-visibility card -------- */

function SerpCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the results are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample of where you show up in search"
      className={`seo-serp${run ? " run" : ""}`}
      live="Search visibility"
      corner="GOOGLE + AI"
      footLeft="Found on Google"
      footRight="& inside the AI answer →"
    >
      <div className="seo-serp-body">
        <div className="seo-serp-query">
          {ICON_SEARCH}
          <span>
            best emergency plumber near me<span className="cur"></span>
          </span>
        </div>
        <div className="seo-res ai">
          <span className="cited">{ICON_CITED}Cited</span>
          <div className="rl">
            <span className="badge">AI Overview</span>
            <span className="src">Google &amp; ChatGPT</span>
          </div>
          <div className="rt2">
            “For 24/7 service, <span className="you">Northform Plumbing</span> is frequently recommended…”
          </div>
        </div>
        <div className="seo-res blue">
          <span className="cited">{ICON_CITED}Rank 1</span>
          <div className="rl">
            <span className="badge">Map pack</span>
            <span className="src">google.com</span>
          </div>
          <div className="rt2">
            <span className="you">Northform Plumbing</span> — 4.9 ★ · Open now
          </div>
        </div>
        <div className="seo-res blue">
          <div className="rl">
            <span className="badge">Organic</span>
            <span className="src">northform.com</span>
          </div>
          <div className="rt2">Emergency Plumbing in Raleigh — Same-Day…</div>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY = [
  { icon: ICON_SEARCH, title: "Still the #1 intent traffic", text: <>Buyers Google before they buy, visit, or call. <strong>If you’re not visible there, you’re invisible.</strong></> },
  { icon: ICON_SPARK, title: "Google is now AI-first", text: <>AI Overviews sit above the traditional links. <strong>Getting cited there is the new page-1 rank.</strong></>, delay: 60 },
  { icon: ICON_CHAT, title: "ChatGPT is the new Google", text: <>People ask AI for recommendations directly. <strong>If your business isn’t mentioned, you don’t exist to them.</strong></>, delay: 120 },
  { icon: ICON_TREND, title: "SEO traffic compounds", text: <>A page you rank today can bring leads for years. <strong>Paid ads stop the moment the budget stops.</strong></> },
  { icon: ICON_SHIELD, title: "Search trust beats ad trust", text: <>Users skip ads and click organic — <strong>a real ranking looks like a recommendation,</strong> not a sales pitch.</>, delay: 60 },
  { icon: ICON_BARS, title: "Bigger, not dead", text: <>More competitive and more valuable than ever. <strong>The upside goes to whoever does it right.</strong></>, delay: 120 },
];

/* -------- problem -------- */

const PAINS = [
  { title: "Hidden pricing", text: "Book a call, sit through a pitch, get a “custom quote” of $3K–$10K/mo." },
  { title: "Vanity reports", text: "Rankings for keywords no one searches; traffic that never turns into leads.", delay: 60 },
  { title: "12-month lock-ins", text: "Because they know it takes them six months to do anything worth showing.", delay: 120 },
  { title: "Siloed teams", text: "Content, technical, and links as separate teams and invoices — nothing works together." },
  { title: "They ignore AI search", text: "Retooling for GEO is hard — so they keep doing what worked in 2019.", delay: 60 },
  { title: "Six months of “trust us”", text: "No quick wins, no transparency — just an invoice and a promise.", delay: 120 },
];

/* -------- what's included (9) -------- */

const INCLUDED: { no: string; icon: ReactNode; title: string; text: string; geo?: boolean; tag?: string }[] = [
  { no: "01", icon: ICON_SEARCH, title: "Audit & strategy", text: "Full site crawl, ranking audit, backlink and content-gap review — a prioritized 90-day and 12-month plan." },
  { no: "02", icon: ICON_LINES_SHORT, title: "Keyword research", text: "Buyer-intent keywords grouped by intent, mapped to pages, and prioritized by revenue — not just volume." },
  { no: "03", icon: ICON_DOC3, title: "On-page SEO", text: "Titles, meta, headers, content, internal links, alt text, and URLs — so Google and AI understand every page." },
  { no: "04", icon: ICON_CODE, title: "Technical SEO", text: "Core Web Vitals, crawlability, indexation, schema, redirects, and architecture — the foundation everything rests on." },
  { no: "05", icon: ICON_LINK, title: "Off-page & authority", text: "White-hat link building, digital PR, citations, and toxic-link disavow — quality and relevance, not volume." },
  { no: "06", icon: ICON_PIN, title: "Local SEO", text: "Google Business Profile, the map pack, NAP consistency, location pages, and reviews — often the fastest wins." },
  { no: "07", icon: ICON_SPARK, title: "AI Search / GEO", text: "Content structured for AI extraction, entity signals, and mention monitoring across ChatGPT, Gemini, Claude, Perplexity.", geo: true, tag: "The 2026 differentiator" },
  { no: "08", icon: ICON_LINES_LONG, title: "Content SEO", text: "Pillar and cluster planning, blog and money-page writing, and refreshes — built to rank and get cited." },
  { no: "09", icon: ICON_REPORT, title: "Analytics & reporting", text: "GA4 and Search Console, conversion tracking, AI-referral tracking, and plain-language monthly reports." },
];

/* -------- services explorer -------- */

type SeoService = {
  key: string;
  icon: ReactNode;
  btnName: string;
  btnSub: string;
  name: string;
  tag: string;
  items: string[];
};

const SERVICES: SeoService[] = [
  {
    key: "local",
    icon: ICON_PIN,
    btnName: "Local SEO",
    btnSub: "Map pack",
    name: "Local SEO",
    tag: "Rank in the map pack for your city and service area.",
    items: ["Google Business Profile optimization", "Local pack ranking improvements", "NAP consistency clean-up", "Location pages for multi-location", "Local link building", "Review generation & response"],
  },
  {
    key: "technical",
    icon: ICON_CODE,
    btnName: "Technical SEO",
    btnSub: "Speed & structure",
    name: "Technical SEO",
    tag: "Speed, crawlability, and structure fixes Google rewards.",
    items: ["Core Web Vitals & page speed", "Mobile responsiveness fixes", "Crawlability & indexation cleanup", "Schema markup implementation", "Site architecture & URL restructuring", "JavaScript rendering fixes"],
  },
  {
    key: "onpage",
    icon: ICON_DOC2,
    btnName: "On-page SEO",
    btnSub: "Every page ranks",
    name: "On-Page SEO",
    tag: "Titles, headings, and content that rank every page.",
    items: ["Meta title & description writing", "Header structure optimization", "Content optimization for keywords", "Internal linking strategy", "Image alt text & optimization", "URL structure clean-up"],
  },
  {
    key: "offpage",
    icon: ICON_LINK,
    btnName: "Off-page & links",
    btnSub: "Real authority",
    name: "Off-Page SEO & Link Building",
    tag: "White-hat backlinks that build real authority.",
    items: ["White-hat guest posting", "Digital PR & outreach", "Resource-page & broken-link building", "Local citation building", "Brand mention monitoring", "Toxic backlink disavow"],
  },
  {
    key: "keyword",
    icon: ICON_LINES_SHORT,
    btnName: "Keyword research",
    btnSub: "The right terms",
    name: "Keyword Research",
    tag: "Find the exact terms your buyers are searching for.",
    items: ["Buyer-intent keyword research", "Long-tail keyword discovery", "Competitor keyword gap analysis", "Keyword-to-page mapping", "Search intent classification", "Priority scoring by revenue"],
  },
  {
    key: "content",
    icon: ICON_LINES_LONG,
    btnName: "Content SEO",
    btnSub: "Rank & get cited",
    name: "Content SEO",
    tag: "Blog posts and pages built to rank and get cited.",
    items: ["Content pillar & cluster planning", "SEO blog post writing", "Money page creation (service × industry × location)", "Existing content refresh & re-optimization", "Content briefs for in-house writers", "Topic authority building"],
  },
  {
    key: "geo",
    icon: ICON_SPARK,
    btnName: "AI Search / GEO",
    btnSub: "ChatGPT & more",
    name: "AI Search / GEO",
    tag: "Get mentioned inside ChatGPT, Gemini, and Perplexity.",
    items: ["AI-first content restructuring", "Entity optimization for AI understanding", "AI mention tracking (ChatGPT, Gemini, Claude, Perplexity)", "Featured answer / AEO optimization", "AI-optimized schema markup", "AI referral traffic reporting"],
  },
  {
    key: "ecom",
    icon: ICON_CART,
    btnName: "E-commerce SEO",
    btnSub: "Product & category",
    name: "E-commerce SEO",
    tag: "Rank product and category pages for buyer-intent searches.",
    items: ["Product page optimization", "Category page SEO", "Product schema markup", "Faceted navigation fixes", "Internal search optimization", "Site-wide e-commerce technical audit"],
  },
  {
    key: "audit",
    icon: ICON_AUDIT,
    btnName: "SEO Audit",
    btnSub: "One-off review",
    name: "SEO Audit",
    tag: "One-off deep audit + strategy doc, no ongoing commitment.",
    items: ["Full site crawl & technical health check", "Current keyword ranking audit", "Backlink profile review", "Content gap analysis vs competitors", "Prioritized 90-day & 12-month roadmap", "Delivered as a shareable strategy doc"],
  },
];

function ServicesExplorer() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sv = SERVICES[active];

  function select(i: number) {
    const next = (i + SERVICES.length) % SERVICES.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select(i - 1);
    }
  }

  return (
    <Reveal className="seo-sv-wrap" id="services-int">
      <div className="seo-sv-list" role="tablist" aria-label="SEO services">
        {SERVICES.map((item, i) => (
          <button
            key={item.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="seo-sv-btn"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{item.icon}</span>
            <span className="dn">
              <b>{item.btnName}</b>
              <small>{item.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="seo-sv-panel">
        <div className="seo-sp-top">
          <span className="big">{sv.icon}</span>
          <div>
            <h3>{sv.name}</h3>
            <div className="tagline">{sv.tag}</div>
          </div>
        </div>
        <div className="seo-sp-body seo-sp-fade" key={sv.key}>
          <span className="k">What’s included</span>
          <div className="seo-sp-list">
            {sv.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <a className="seo-sp-cta" href="#start">
            See full details <span className="arw">↗</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who / steps / pricing / faq -------- */

const WHO = [
  { icon: ICON_PIN, text: <><strong>A local business</strong> — restaurants, salons, home services, medical, professional services. Show up when nearby customers search.</> },
  { icon: ICON_CART, text: <><strong>An e-commerce store</strong> competing for product searches, category rankings, and buyer-intent traffic.</>, delay: 60 },
  { icon: ICON_CHAT_PLAIN, text: <><strong>A service business</strong> with a long sales cycle where educational content and trust-building drive leads.</>, delay: 120 },
  { icon: ICON_BRIEFCASE, text: <><strong>A B2B or SaaS company</strong> whose buyers research extensively before buying, and where comparison content ranks.</> },
  { icon: ICON_LAUNCH, text: <><strong>A new site</strong> that wants to launch with SEO built in from day one, not bolted on later.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Doing “SEO” for years</strong> with nothing to show — and wants a real strategy, not another vanity report.</>, delay: 120 },
];

const STEPS = [
  { no: "1", dur: "Month 1", title: "Audit, strategy & quick wins", text: "Full audit, a prioritized 90-day/12-month plan, and technical quick wins that move rankings in weeks." },
  { no: "2", dur: "Month 2", title: "On-page & content foundation", text: "Core pages rewritten, first SEO content launched, internal linking fixed so authority flows right.", delay: 70 },
  { no: "3", dur: "Months 3–6", title: "Content engine & authority", text: "Consistent publishing, link building and digital PR begin — first real ranking gains land here.", delay: 140 },
  { no: "4", dur: "Month 6+", title: "Compounding growth", text: "Content refreshed, clusters expanded, AI search deepened — rankings and leads compound month over month.", delay: 210 },
  { no: "5", dur: "Every month", title: "Report & review", text: "Plain-language monthly report on what we did and what’s next, plus a quarterly strategy call.", delay: 280 },
];

const TIERS = [
  { name: "Starter SEO", best: "Small local businesses — audit, on-page, GBP, monthly reporting.", price: "Published /mo" },
  { name: "Growth SEO", best: "Everything in Starter plus content SEO, link building, and AI search optimization.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale SEO", best: "Larger sites & competitive markets — advanced technical, e-commerce, multi-location.", price: "Published /mo", delay: 140 },
  { name: "One-off Audit", best: "A deep audit + strategy doc, no ongoing commitment.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "How long does SEO take to work?", a: <>Some technical and on-page wins move rankings <strong>within weeks.</strong> Meaningful traffic growth usually starts around month 3–6, with compounding growth from month 6 on. Anyone promising rankings in 30 days is lying.</> },
  { q: "Do you guarantee #1 rankings?", a: <>No — and neither should anyone else. Google explicitly says no one can guarantee rankings. <strong>We guarantee the work and the strategy,</strong> not the algorithm.</> },
  { q: "SEO vs Google Ads?", a: <>SEO is free organic traffic that compounds but takes months; Ads show up immediately but stop when you stop paying. <strong>Most businesses do both.</strong></> },
  { q: "How is AI search / GEO different?", a: <>Regular SEO ranks in Google’s blue links; GEO gets you <strong>cited when ChatGPT, Gemini, Claude, or Perplexity answer</strong> a question. Same content skills, different structuring and measurement.</> },
  { q: "Do I need a long contract?", a: <>No. All retainers are <strong>month-to-month</strong> — 30 days’ notice to wrap up cleanly, no 12-month lock-in.</> },
  { q: "Will you show me the actual work?", a: <>Yes — every month, a plain-language report showing exactly what we did and what’s next, <strong>not a dashboard of vanity metrics.</strong></> },
  { q: "What if I have an in-house SEO?", a: <>Great — we work alongside them, delivering specialist work they don’t have time for or providing briefs their team executes. <strong>An extension of your team, not a replacement.</strong></> },
  { q: "Do you do link building?", a: <>Yes, but <strong>only white-hat</strong> — guest posts, digital PR, resource placements, citation cleanup. No PBNs, no link farms, nothing that gets sites penalized.</> },
  { q: "Can you fix a penalized site?", a: <>In most cases, yes. We audit the cause (usually toxic backlinks or thin content), clean it up, submit reconsideration where appropriate, and <strong>rebuild authority the right way.</strong></> },
  { q: "Does SEO still work for small business?", a: <>Especially well — particularly local SEO, where you’re not competing with national brands. <strong>More leads per dollar than almost any other channel.</strong></> },
];

export default function SeoView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        eyebrow="Organic search · Content · AI discoverability"
        line1="Show up where your"
        line2={
          <>
            customers are <span className="grad-text">searching.</span>
          </>
        }
        lead={
          <>
            SEO built for how people search in 2026 — not just Google’s blue links, but{" "}
            <strong>Google’s AI Overviews, ChatGPT, Gemini, Claude, and Perplexity.</strong> One team on the content,
            the technical, the local, and the AI side — at published prices.
          </>
        }
        primary={{ label: "Book a free SEO audit", href: "/start-project" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <SerpCard />
      </ServiceDetailHero>

      <TrustBar items={["On-page + Technical + Off-page", "AI Search / GEO ready", "Transparent published pricing", "Month-to-month"]} />

      {/* WHY */}
      <section className="band seo-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why SEO matters more than ever</span>
            <h2>“SEO is dead” — every year for ten years.</h2>
            <p>In reality it’s bigger, more competitive, and more valuable than ever — which is exactly why doing it right matters more than ever.</p>
          </Reveal>
          <div className="seo-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark seo-sec" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most SEO agencies</span>
            <h2>You’ve probably heard the horror stories.</h2>
            <p>Most SEO buyers have too — and we built our service to fix every one of these.</p>
          </Reveal>
          <div className="seo-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="seo-pain" key={pain.title} style={d(pain.delay ?? 0)}>
                <span className="pk">{ICON_X}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="seo-pain-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              We built our SEO service to fix <span className="gt">every one of those.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED (9) */}
      <section className="band seo-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Every part of SEO, one team.</h2>
            <p>No hand-offs, no separate invoices, no gaps between what content is writing and what the technical side is doing.</p>
          </Reveal>
          <Reveal className="seo-inc-grid">
            {INCLUDED.map((item) => (
              <div className={`seo-inc${item.geo ? " geo" : ""}`} key={item.no}>
                <div className="ihead">
                  <span className="ii">{item.icon}</span>
                  <div>
                    <span className="in-no">{item.no}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <p>
                  {item.text}
                  {item.tag && <span className="tagx">{item.tag}</span>}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SERVICES (interactive) */}
      <section className="band tint seo-sec" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Explore each SEO service</span>
            <h2>SEO isn’t one thing — it’s a set.</h2>
            <p>Specialist services that work together. Pick one to see exactly what’s inside.</p>
          </Reveal>
          <ServicesExplorer />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band seo-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>You get the biggest return if you’re…</h2>
          </Reveal>
          <div className="seo-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="seo-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band tint seo-sec" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Wins in month one — not “trust us for six.”</h2>
          </Reveal>
          <div className="seo-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="seo-step" key={step.no} style={d(step.delay ?? 0)}>
                <span className="seo-step-no">{step.no}</span>
                <span className="stt">{step.dur}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band seo-sec" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No 12-month contracts, no hidden fees, no “custom quote after a discovery call.”</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month</strong> — cancel anytime with 30 days’ notice. No 12-month lock-in, no
            setup fee. Every exact number is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="SEO · Search & AI"
        heading="Show up where your customers are searching."
        copy={
          <>
            Book a free SEO audit call. We’ll look at where your site stands, what’s holding it back, and what it’d take
            to grow —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation, no long contract.</strong>
          </>
        }
        primaryLabel="Book a free SEO audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
