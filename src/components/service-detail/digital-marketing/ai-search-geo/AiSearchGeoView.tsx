"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FeatureGrid, NoteCallout, ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./geo-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH_MINUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT_FILL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_SCHEMA = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_AUTHOR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m16 4 1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_ENTITY = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="2" />
    <path d="M8 7 11 16M16 7l-3 9M8 6h8" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 15l6-6M8 10a3 3 0 0 1 0-4l1-1a3 3 0 0 1 4 4M16 14a3 3 0 0 1 0 4l-1 1a3 3 0 0 1-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_HEAVY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero: scrambled gradient word ("search.") -------- */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/<>*";

function ScrambleWord({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      let iters = 0;
      interval = setInterval(() => {
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < Math.floor(iters)) out += text[i];
          else if (text[i] === " ") out += " ";
          else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setShown(out);
        iters += 0.6;
        if (iters >= text.length) {
          clearInterval(interval);
          setShown(text);
        }
      }, 42);
    }, 1550);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduce, text]);

  return <span className="grad-text">{shown}</span>;
}

/* -------- count-up number (the "47%" in the why heading) -------- */

function GeoCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.5 });
  // server + reduced motion: the final number is shown on first paint
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  return (
    <span className="geo-count" ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* -------- hero signature: AI answer card -------- */

const LLMS = ["AI Overviews", "ChatGPT", "Perplexity", "Claude", "Gemini"];

function AnswerCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the citation is shown in its end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample AI answer citing your brand"
      className={`geo-ans${run ? " run" : ""}`}
      live="AI answer · Live"
      corner="CITED, NOT INVISIBLE"
      footLeft="Cited across every LLM"
      footRight="you own every asset →"
    >
      <div className="geo-ans-q">
        <span className="qi">{ICON_SEARCH}</span>
        <span className="qt">
          “best RevOps platform for mid-market SaaS”<span className="cur"></span>
        </span>
      </div>
      <div className="geo-ans-body">
        <span className="al">
          <span className="sp">{ICON_BOLT_FILL}</span>AI Overview
        </span>
        <span className="geo-aline w1"></span>
        <span className="geo-aline w2"></span>
        <div className="geo-ans-cite">
          <span className="num">1</span>
          <span className="ct">
            <b>Northform</b>
            <small>northform.com · cited as a top pick</small>
          </span>
          <span className="badge">{ICON_CHECK_HEAVY}Cited</span>
        </div>
      </div>
      <div className="geo-ans-llms">
        {LLMS.map((llm) => (
          <span key={llm}>{llm}</span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY = [
  { icon: ICON_SEARCH_MINUS, title: "Zero-click is the default", text: <>Users get answers straight from LLMs. Blue links are becoming <strong>a fallback, not the front door.</strong></> },
  { icon: ICON_BOLT, title: "LLMs cite differently than Google ranks", text: <>Different signals, formats, and sources. <strong>Traditional SEO tactics don’t automatically translate.</strong></>, delay: 80 },
  { icon: ICON_STAR, title: "First-mover advantage is real", text: <>Training cycles are still forming. <strong>Businesses cited today become the default answer for years.</strong></>, delay: 160 },
];

/* -------- engines (LLM table) -------- */

const ENGINES = [
  { name: "Google AI Overviews", source: "Google index + snippets + E-E-A-T", priority: "Highest — 47% of queries", hi: true },
  { name: "ChatGPT Search", source: "Bing index + high-authority + fresh content", priority: "High — 800M+ weekly users", hi: true },
  { name: "Perplexity", source: "Live web + academic + citation transparency", priority: "High — researchers & B2B", hi: true },
  { name: "Claude (web search)", source: "High-quality, well-structured, cited sources", priority: "Medium — enterprise / technical", hi: false },
  { name: "Google Gemini", source: "Google Search + YouTube + Knowledge Graph", priority: "High — default on Android + Workspace", hi: true },
  { name: "Microsoft Copilot", source: "Bing index + Microsoft Graph + LinkedIn", priority: "Medium — B2B / enterprise", hi: false },
];

/* -------- 7 signals -------- */

const SIGNALS = [
  { no: "01", icon: ICON_SCHEMA, title: "Structured data & schema", text: "Schema.org markup (Article, FAQPage, HowTo, Product, Organization) makes content machine-readable so LLMs understand entities & relationships." },
  { no: "02", icon: ICON_LINES, title: "Direct-answer formatting", text: "TL;DR summaries, clear definitions, short first paragraphs, question-based headers. LLMs favor content that answers in the first 50 words." },
  { no: "03", icon: ICON_TREND, title: "Quotable statistics", text: "Original numbers, data points, named research. LLMs disproportionately cite content with concrete statistics, dates, and specific claims." },
  { no: "04", icon: ICON_AUTHOR, title: "Author authority & E-E-A-T", text: "Named authors with credentials, bios, and verifiable expertise. LLMs weigh source authority heavily — anonymous content rarely gets cited." },
  { no: "05", icon: ICON_CLOCK, title: "Freshness signals", text: "Recent publish dates, updated content, current data. LLMs prefer 2025–2026 sources over outdated ones — date signals matter." },
  { no: "06", icon: ICON_ENTITY, title: "Semantic entity density", text: "Related concepts, entities, and topical breadth. Depth beats keyword stuffing — LLMs measure how completely a source covers a topic." },
  { no: "07", icon: ICON_LINK, title: "Third-party citations", text: "Being cited on Wikipedia, industry publications, and authority sites. LLMs use external citation graphs as trust — digital PR is now GEO." },
];

/* -------- what we don't do (dark) -------- */

const DONTS = [
  { title: "Promise #1 in AI Overviews", text: <>LLMs pick multiple sources per query. <strong>Anyone guaranteeing the top spot is lying.</strong></> },
  { title: "Chase LLM prompt hacks", text: <>Hidden text, cloaking, “prompt injection” — <strong>get sites blacklisted from AI indexes fast.</strong></>, delay: 60 },
  { title: "Ignore traditional SEO", text: <>GEO and SEO overlap heavily — same technical foundations. <strong>Selling GEO as fully separate is oversimplifying.</strong></>, delay: 120 },
  { title: "Use tools that fake citations", text: <>Some “GEO tools” generate fake authority signals. <strong>LLMs detect and demote them within weeks.</strong></> },
  { title: "Lock you into long contracts", text: <>Month-to-month. Cancel anytime. <strong>GEO is measurable within 60–90 days.</strong></>, delay: 60 },
  { title: "Keep your assets", text: <>All schema, content, author profiles, and PR placements are yours. <strong>Leave and you keep everything.</strong></>, delay: 120 },
];

/* -------- what's included (interactive, 7 parts) -------- */

type Included = {
  key: string;
  btnName: string;
  btnSub: string;
  name: string;
  tag: string;
  items: string[];
};

const INCLUDED: Included[] = [
  {
    key: "audit",
    btnName: "Full GEO audit",
    btnSub: "7-signal scorecard",
    name: "Full GEO Audit",
    tag: "Where your brand stands in AI search today — and exactly where the gaps are.",
    items: ["LLM citation baseline (ChatGPT, Perplexity, Claude, Gemini, Copilot)", "AI Overview trigger audit for your keywords", "7-signal scorecard for your site", "Competitor GEO benchmarking", "Prioritized 90-day roadmap"],
  },
  {
    key: "tech",
    btnName: "Technical foundation",
    btnSub: "Schema + llms.txt",
    name: "Technical GEO Foundation",
    tag: "The machine-readable base LLMs need to understand and trust your site.",
    items: ["Schema.org markup (Article, FAQPage, HowTo, Product, Org, Person)", "llms.txt creation and maintenance", "robots.txt for AI crawlers (GPTBot, Claude-Web, PerplexityBot)", "Sitemap optimization for LLM discovery", "Core Web Vitals baseline (INP, LCP, CLS)", "Structured data testing + validation"],
  },
  {
    key: "content",
    btnName: "Content for citation",
    btnSub: "Direct-answer",
    name: "Content Optimization for Citation",
    tag: "Rewritten so LLMs can lift the answer straight from your page.",
    items: ["Direct-answer rewrites (TL;DR, definition-first)", "Question-based header restructuring", "Original statistics and data insertion", "Table + list formatting (cited 3× more)", "FAQ blocks with FAQPage schema", "Entity + semantic keyword expansion"],
  },
  {
    key: "author",
    btnName: "Author authority",
    btnSub: "E-E-A-T signals",
    name: "Author Authority & E-E-A-T",
    tag: "LLMs weigh source authority heavily — anonymous content rarely gets cited.",
    items: ["Author bio pages with credentials + social proof", "Author schema markup (Person entity)", "LinkedIn profile optimization for cited authors", "Wikipedia / Wikidata presence audit + correction", "Google Knowledge Panel setup"],
  },
  {
    key: "fresh",
    btnName: "Freshness cycles",
    btnSub: "Stay current",
    name: "Freshness & Update Cycles",
    tag: "LLMs prefer current sources — date signals decide which version gets cited.",
    items: ["Content freshness audit (identify stale pages)", "Quarterly refresh cycles for top pages", "Date signal optimization (published, updated, reviewed)", "Version tracking on statistical claims"],
  },
  {
    key: "pr",
    btnName: "Digital PR & citations",
    btnSub: "Third-party trust",
    name: "Digital PR & Third-Party Citations",
    tag: "External citation graphs are a trust signal — digital PR is now GEO.",
    items: ["Wikipedia and Wikidata citation strategy", "Industry publication placements (guest posts, quotes)", "HARO / Qwoted / Featured.com pitching", "Podcast interview placements", "Original research & studies for backlinks"],
  },
  {
    key: "report",
    btnName: "Monitoring & reporting",
    btnSub: "Citation tracking",
    name: "Monitoring & Reporting",
    tag: "See your citation share grow across all six LLMs, month over month.",
    items: ["Monthly LLM citation tracking (all 6 engines)", "AI Overview appearance monitoring", "Share-of-voice benchmarking vs competitors", "Traffic + conversion attribution from AI search", "Quarterly reviews with signal-by-signal breakdown"],
  },
];

function IncludedExplorer() {
  // the design initialises on "audit", which is also the button marked aria-selected
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = INCLUDED[active];

  function select(i: number) {
    const next = (i + INCLUDED.length) % INCLUDED.length;
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
    <Reveal className="geo-wb-wrap" id="included-int">
      <div className="geo-wb-list" role="tablist" aria-label="What's included">
        {INCLUDED.map((inc, i) => (
          <button
            key={inc.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="geo-wb-btn"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{i + 1}</span>
            <span className="dn">
              <b>{inc.btnName}</b>
              <small>{inc.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="geo-wb-panel">
        <div className="geo-wp-top">
          <span className="big">{ICON_BOLT}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        <div className="geo-wp-body geo-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="geo-wp-list">
            {item.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who / fit -------- */

const FIT_GOOD: ReactNode[] = [
  <><strong>B2B SaaS</strong> — buyers query ChatGPT &amp; Perplexity for comparison research before Google.</>,
  <><strong>Professional services</strong> (legal, financial, healthcare) — where E-E-A-T directly determines citation eligibility.</>,
  <><strong>E-commerce with research queries</strong> — “best X for Y” now surfaces AI Overviews above listings.</>,
  <><strong>Agencies &amp; consultants</strong> needing to be cited as the authority before competitors lock it in.</>,
  <><strong>Content-heavy publishers</strong> watching AI Overviews erode traffic — GEO rebuilds the funnel.</>,
];

const FIT_BAD: ReactNode[] = [
  <><strong>No website content, no domain authority, no editorial capacity</strong> — start with foundational SEO first.</>,
  <><strong>Audiences that don’t search AI</strong> (rare in 2026) — traditional SEO still delivers most of the ROI.</>,
];

/* -------- how / faq -------- */

const STEPS = [
  { no: "Week 1", title: "Audit & roadmap", text: "Full 7-signal audit, LLM citation baseline, AI Overview trigger analysis, competitor benchmark, prioritized 90-day roadmap." },
  { no: "Week 2", title: "Technical foundation", text: "Schema markup, llms.txt, robots.txt for AI crawlers, Core Web Vitals baseline, author schema setup.", delay: 70 },
  { no: "Weeks 3–4", title: "Content wave 1", text: "Direct-answer rewrites on top pages, statistics inserted, FAQ blocks added, structured formatting, author bios updated.", delay: 140 },
  { no: "Month 2", title: "Digital PR + citations", text: "HARO pitching, guest posts, Wikipedia strategy, original research published. First LLM citations start appearing.", delay: 210 },
  { no: "Month 3+", title: "Monitor, refine, scale", text: "Monthly LLM tracking, refresh cycles on winning content, new pages built to GEO standards. Share of voice grows.", delay: 280 },
];

const FAQS = [
  { q: "What’s the difference between SEO and GEO?", a: <>SEO optimizes for Google’s ranking algorithm; GEO optimizes for <strong>LLM citation logic</strong> — different signals, formats, and sources. There’s overlap (both need strong technical foundations), but GEO adds schema depth, direct-answer formatting, author authority, and third-party citations SEO often skips.</> },
  { q: "How long before I see LLM citations?", a: <>Technical wins (schema, llms.txt) can show in <strong>30–60 days;</strong> content-driven citations in months 2–4; digital PR compounds from month 3. Perplexity indexes live; Claude &amp; Gemini update more slowly.</> },
  { q: "Can you guarantee I’ll be in AI Overviews?", a: <>No — anyone who guarantees it is lying. LLMs pick multiple rotating sources per query. <strong>What we guarantee is executing all 7 GEO signals correctly,</strong> which dramatically increases citation frequency across all 6 LLMs.</> },
  { q: "Do I need GEO if I already have strong SEO?", a: <>Yes. AI Overviews appear on <strong>47% of Google queries</strong> — and being #1 in traditional results no longer guarantees you’re cited in the AI Overview above them. GEO builds on your SEO, but the layers differ.</> },
  { q: "Do you also do traditional SEO?", a: <>Yes — GEO and SEO share the same technical foundations, and we handle both. <strong>We won’t sell you GEO in isolation if your SEO base isn’t there</strong> — we’ll tell you where to start.</> },
  { q: "Do I own everything?", a: <>Yes, 100% — all schema, content, author profiles, and PR placements are yours. <strong>If you leave, you keep everything</strong> — no lock-in, no proprietary layer.</> },
];

export default function AiSearchGeoView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        eyebrow="GEO · AI Overviews · ChatGPT · Perplexity · Claude · Gemini"
        line1="Get cited in the AI answers"
        line2={
          <>
            your buyers now <ScrambleWord text="search." />
          </>
        }
        lead={
          <>
            Generative Engine Optimization (GEO) for B2B, SaaS, e-commerce, and professional services. We optimize your
            entire digital footprint — schema, entities, citations, freshness, author authority —{" "}
            <strong>
              so LLMs surface your brand when buyers ask the questions your competitors still answer with old-school SEO.
            </strong>
          </>
        }
        primary={{ label: "Book a free GEO audit", href: "/start-project" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <AnswerCard />
      </ServiceDetailHero>

      <TrustBar items={["Rank in AI Overviews", "Cited by ChatGPT, Perplexity, Claude", "Full technical + content GEO", "You own every asset"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why GEO is the new SEO</span>
            <h2>
              AI Overviews now appear on <GeoCount target={47} suffix="%" /> of Google queries.
            </h2>
            <p>
              ChatGPT, Perplexity, Claude, and Gemini answer millions of buyer questions daily — without ever sending a
              click to your site. If you’re not cited in those answers, you’re invisible to the audience you spent years
              ranking for.
            </p>
          </Reveal>
          <div className="geo-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
          <NoteCallout>
            If ChatGPT and Perplexity don’t know your brand exists, half your future customers won’t either.{" "}
            <strong>GEO is how you fix that — before your competitors do.</strong>
          </NoteCallout>
        </div>
      </section>

      {/* ENGINES (LLM table) */}
      <section className="band" id="engines">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 6 LLM search engines you need to rank in</span>
            <h2>Every LLM is now a search engine — with its own citation logic.</h2>
            <p>Buyers no longer search in one place. Here’s where you need to appear, and how each one picks its sources.</p>
          </Reveal>
          <Reveal className="geo-llm-tbl">
            <div className="geo-llm-row head">
              <div>LLM / AI search</div>
              <div className="lc2">Citation source</div>
              <div>Priority</div>
            </div>
            {ENGINES.map((engine) => (
              <div className="geo-llm-row" key={engine.name}>
                <div className="ln">{engine.name}</div>
                <div className="lc2">{engine.source}</div>
                <div className={`pr${engine.hi ? " hi" : ""}`}>{engine.priority}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="geo-llm-note">
            Every LLM has different citation logic. <strong>We optimize for all six — not just Google.</strong>
          </Reveal>
        </div>
      </section>

      {/* 7 SIGNALS */}
      <section className="band tint" id="signals">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 7 GEO signals that trigger AI citations</span>
            <h2>Getting cited isn’t random.</h2>
            <p>LLMs weigh seven core signals when deciding which sources to reference. Our framework audits and builds all seven.</p>
          </Reveal>
          <Reveal className="geo-sig-grid">
            {SIGNALS.map((sig) => (
              <article className="geo-sig" key={sig.no}>
                <span className="sn">{sig.no}</span>
                <div className="si">{sig.icon}</div>
                <h3>{sig.title}</h3>
                <p>{sig.text}</p>
              </article>
            ))}
          </Reveal>
          <NoteCallout style={{ marginTop: 24 }}>
            Miss any one signal and you leave citations on the table. <strong>Every GEO engagement audits and builds all seven.</strong>
          </NoteCallout>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do</span>
            <h2>GEO is new — and shortcuts are everywhere.</h2>
            <p>We don’t take any of them.</p>
          </Reveal>
          <div className="geo-dont-grid">
            {DONTS.map((item) => (
              <Reveal className="geo-dontc" key={item.title} style={d(item.delay ?? 0)}>
                <h3>
                  <span className="x">{ICON_X}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="geo-dont-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              All 7 signals, executed properly — the real way to <strong>increase citation frequency across every LLM.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>End-to-end GEO across all 7 signals.</h2>
            <p>Everything a working GEO program needs — seven parts, one team. Pick one to see inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* WHO / FIT */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who GEO is built for</span>
            <h2>Highest ROI when your buyers already use AI search.</h2>
            <p>Here’s where GEO fits — and where we’ll tell you to start with foundational SEO first.</p>
          </Reveal>
          <Reveal className="geo-fit-grid">
            <div className="geo-fit good">
              <div className="fh">
                <span className="fi">{ICON_CHECK}</span>
                <h3>Where it works</h3>
              </div>
              <ul>
                {FIT_GOOD.map((line, i) => (
                  <li key={i}>
                    <span className="m">{ICON_CHECK_BOLD}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="geo-fit bad">
              <div className="fh">
                <span className="fi">{ICON_X}</span>
                <h3>Where it doesn’t (yet)</h3>
              </div>
              <ul>
                {FIT_BAD.map((line, i) => (
                  <li key={i}>
                    <span className="m">{ICON_X_BOLD}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A 30-day onboarding, then continuous optimization.</h2>
            <p>Every step ends with a clear deliverable and your sign-off.</p>
          </Reveal>
          <div className="geo-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="geo-step" key={step.no} style={d(step.delay ?? 0)}>
                <span className="geo-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="AI Search & GEO Optimization"
        heading="Book a free GEO audit — no obligation."
        copy={
          <>
            We’ll query the top 6 LLMs with your target buyer questions, run a full 7-signal audit on your site, and
            deliver a 90-day GEO roadmap —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              usually within 48 hours. If we’re not the right fit, we’ll tell you.
            </strong>
          </>
        }
        primaryLabel="Book a free GEO audit"
        primaryHref="/start-project"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
