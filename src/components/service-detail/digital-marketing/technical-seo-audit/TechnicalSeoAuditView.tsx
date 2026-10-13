"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./tsa-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_TICK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_ALERT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CARD = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GEAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 17l2 2 3-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GRID = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_WINDOW_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 10l-2 2 2 2M12 14h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES_SHORT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES_SHORT_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TICKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND_DOWN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 18l5-6 4 4 3-4 4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 6v12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: site health scan -------- */

const SCAN_PRIORITIES: { kind: "c" | "h" | "m"; label: string; count: string }[] = [
  { kind: "c", label: "Critical", count: "2" },
  { kind: "h", label: "High", count: "6" },
  { kind: "m", label: "Medium", count: "11" },
];

const SCAN_ROWS: { ok: boolean; name: string; status: string }[] = [
  { ok: true, name: "Crawlability & robots.txt", status: "Pass" },
  { ok: false, name: "Indexing, 2 key pages noindex", status: "Fix" },
  { ok: true, name: "Core Web Vitals", status: "Pass" },
];

function ScanCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the ring, priority rows and check rows are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample site health scan"
      className={`tsa-scan${run ? " run" : ""}`}
      live="Site health scan"
      corner="CRAWL & INDEX"
      footLeft="Ranked by impact & effort"
      footRight="prioritized fix list →"
    >
      <div className="tsa-scan-hero">
        <div className="tsa-scan-ring">
          <svg viewBox="0 0 88 88">
            <defs>
              <linearGradient id="tsaRingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2563eb" />
                <stop offset="1" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            <circle className="bg" cx="44" cy="44" r="36" />
            <circle className="fg" cx="44" cy="44" r="36" />
          </svg>
          <span className="num">
            85<small>/100</small>
          </span>
        </div>
        <div className="sd">
          <b>Issues by priority</b>
          <div className="tsa-scan-pri">
            {SCAN_PRIORITIES.map((p) => (
              <span className={`sp ${p.kind}`} key={p.label}>
                <span className="dot"></span>
                {p.label} <b>{p.count}</b>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="tsa-scan-rows">
        {SCAN_ROWS.map((row) => (
          <div className={`scn ${row.ok ? "ok" : "warn"}`} key={row.name}>
            <span className="ci">{row.ok ? ICON_TICK : ICON_ALERT}</span>
            <span className="cn">{row.name}</span>
            <span className="cs">{row.status}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (3 cards + dark quote) -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_CARD, title: "Problems hide in templates", text: <>One issue can affect <strong>every page that uses the same layout.</strong></> },
  { icon: ICON_REFRESH, title: "Changes break things", text: <>Redesigns, plugins, and releases <strong>can introduce new issues.</strong></> },
  { icon: ICON_CODE, title: "Developers need specifics", text: <>A clear, prioritized list beats <strong>a long export of warnings.</strong></> },
];

/* -------- 9 areas (tilt cards) -------- */

const AREAS: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_GEAR, title: "Crawlability", text: "Robots.txt, crawl paths, broken links, and redirect chains." },
  { no: "02", icon: ICON_LIST_CHECK, title: "Indexing", text: "Which pages are indexed, excluded, or duplicated." },
  { no: "03", icon: ICON_GRID, title: "Site architecture", text: "URL structure, depth, internal linking, and orphan pages." },
  { no: "04", icon: ICON_CLOCK, title: "Core Web Vitals", text: "Loading, responsiveness, and layout stability." },
  { no: "05", icon: ICON_PHONE, title: "Mobile experience", text: "Mobile rendering, tap targets, and readability." },
  { no: "06", icon: ICON_CODE, title: "Structured data", text: "Schema markup errors and missed rich result opportunities." },
  { no: "07", icon: ICON_WINDOW_CODE, title: "JavaScript rendering", text: "Whether key content is visible to search engines." },
  { no: "08", icon: ICON_GLOBE, title: "International SEO", text: "Hreflang tags and language or region versions." },
  { no: "09", icon: ICON_LOCK, title: "Security & HTTPS", text: "HTTPS setup, mixed content, and security headers." },
];

function AreaGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="tsa-area-grid">
        {AREAS.map((area) => (
          <article className="tsa-area" data-tilt key={area.no}>
            <span className="tsa-area-spot"></span>
            <span className="an">{area.no}</span>
            <div className="ai">{area.icon}</div>
            <h3>{area.title}</h3>
            <p>{area.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- toolkit (12 chips) -------- */

const TOOLS = [
  "Google Search Console",
  "Screaming Frog",
  "PageSpeed Insights",
  "Ahrefs",
  "Semrush",
  "Sitebulb",
  "Chrome DevTools",
  "Rich Results Test",
  "Google Analytics",
  "Lighthouse",
  "Log file analysis",
  "URL Inspection",
];

/* -------- priority table -------- */

const PRIORITIES: { kind: "crit" | "high" | "med" | "low"; label: string; means: string; example: string }[] = [
  { kind: "crit", label: "Critical", means: "Blocks crawling or indexing of important pages.", example: "Key pages accidentally set to noindex." },
  { kind: "high", label: "High", means: "Weakens rankings across many pages.", example: "Duplicate versions of product or service pages." },
  { kind: "med", label: "Medium", means: "Limits performance on some pages.", example: "Slow-loading images on content pages." },
  { kind: "low", label: "Low", means: "Good practice to tidy up when possible.", example: "Minor missing alt text on decorative images." },
];

/* -------- problem / fix table -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Important pages not indexed", fix: "Indexing rules, canonicals, and sitemaps reviewed and corrected." },
  { prob: "Redirect chains and loops", fix: "Redirects simplified to point straight to the final URL." },
  { prob: "Duplicate URLs", fix: "Canonical tags and parameters handled consistently." },
  { prob: "Slow page templates", fix: "Image, script, and font loading improved at the template level." },
  { prob: "Broken internal links", fix: "Links updated to working, relevant pages." },
  { prob: "Schema errors", fix: "Structured data fixed and validated." },
];

/* -------- 5-step process -------- */

const PROCESS: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_LOCK, title: "Access", text: "Search Console, analytics, and site access." },
  { no: "02", icon: ICON_SEARCH, title: "Crawl", text: "Full crawl plus Google data review." },
  { no: "03", icon: ICON_SHIELD_CHECK, title: "Diagnose", text: "Issues confirmed and root causes found." },
  { no: "04", icon: ICON_LINES_SHORT, title: "Prioritize", text: "Fixes ranked by impact and effort." },
  { no: "05", icon: ICON_CHAT, title: "Walkthrough", text: "Findings reviewed with your team." },
];

/* -------- receive (9) -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_FILE, text: "Full technical SEO audit report in plain language" },
  { icon: ICON_LINES_SHORT_CHECK, text: "Prioritized fix list with clear owner suggestions" },
  { icon: ICON_LINES, text: "Indexing and crawl summary" },
  { icon: ICON_CLOCK, text: "Core Web Vitals and page speed findings" },
  { icon: ICON_CODE, text: "Structured data review" },
  { icon: ICON_REFRESH, text: "Redirect and internal link recommendations" },
  { icon: ICON_TICKET, text: "Developer-ready tickets on request" },
  { icon: ICON_CHAT, text: "Walkthrough call with your marketing and dev teams" },
  { icon: ICON_REFRESH, text: "Optional follow-up check after fixes are made" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_TREND_DOWN, text: <><strong>Sites with traffic drops</strong> that can’t find an obvious cause.</>, delay: 0 },
  { icon: ICON_REFRESH, text: <><strong>Teams planning a redesign or migration</strong> who want a clean starting point.</>, delay: 60 },
  { icon: ICON_GRID, text: <><strong>Large or complex sites</strong> with many templates, filters, or languages.</>, delay: 120 },
  { icon: ICON_WINDOW_CODE, text: <><strong>JavaScript-heavy websites</strong> built on modern frameworks.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does a technical SEO audit cost?", a: <>It depends on site size, platform, and complexity. <strong>We share pricing on the free call.</strong></> },
  {
    q: "Technical audit vs full SEO audit: what’s the difference?",
    a: (
      <>
        A technical audit goes deep on crawling, indexing, speed, and code.{" "}
        <strong>
          A <a className="tsa-faq-link" href="/digital-marketing/seo-audit">full SEO audit</a> also covers content, links, and competitors
        </strong>{" "}
        at a broader level.
      </>
    ),
  },
  { q: "Do you fix the issues too?", a: <>We can. Many teams ask us to implement fixes, <strong>or we work alongside your developers.</strong></> },
  { q: "What access do you need?", a: <>Usually <strong>Google Search Console, analytics, and the ability to crawl your site.</strong> CMS access helps for deeper checks.</> },
  { q: "How long does the audit take?", a: <>It depends on the size of your site. <strong>We confirm a timeline once we’ve seen your site.</strong></> },
  { q: "Will this disrupt my live site?", a: <>No. The audit itself is <strong>read-only: crawling and reviewing data.</strong> Any fixes are planned and applied separately, with your approval.</> },
];

/* -------- page -------- */

export default function TechnicalSeoAuditView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="Find the hidden issues"
        line2={
          <>
            holding your site <span className="grad-text">back.</span>
          </>
        }
        lead={
          <>
            A deep technical review of how search engines crawl, render, and index your site,{" "}
            <strong>with a prioritized fix list your developers can act on.</strong>
          </>
        }
        primary={{ label: "Book a technical audit", href: "/contact" }}
        secondary={{ label: "See what we inspect ↓", href: "#areas" }}
      >
        <ScanCard />
      </ServiceDetailHero>

      <TrustBar items={["Crawl, index & render", "Core Web Vitals", "Prioritized by impact", "Developer-ready fix list"]} />

      {/* WHY */}
      <section className="band tint tsa-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Great content can’t rank if it can’t be found.</h2>
            <p>
              Search engines need to reach, understand, and store your pages before they can rank them. Technical issues often stay
              invisible to visitors while quietly blocking search engines.
            </p>
          </Reveal>
          <Reveal className="tsa-surf-grid">
            {WHY.map((card) => (
              <article className="tsa-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="tsa-why-quote">
            A technical audit doesn’t just list problems. <span>It tells your team which ones matter and what to fix first.</span>
          </Reveal>
        </div>
      </section>

      {/* 9 AREAS */}
      <section className="band tsa-sec" id="areas">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we inspect</span>
            <h2>Nine technical areas.</h2>
            <p>Every audit covers these areas, adjusted to your platform and site size.</p>
          </Reveal>
          <AreaGrid />
        </div>
      </section>

      {/* TOOLKIT */}
      <section className="band tint tsa-sec" id="toolkit">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our toolkit</span>
            <h2>Tools we use.</h2>
            <p>We combine crawling tools with Google’s own data for a complete picture.</p>
          </Reveal>
          <Reveal className="tsa-tk-grid">
            {TOOLS.map((tool) => (
              <article className="tsa-tk" key={tool}>
                <span className="tkd"></span>
                {tool}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRIORITY */}
      <section className="band tsa-sec" id="priority">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we prioritize</span>
            <h2>Every issue gets a priority.</h2>
            <p>Findings are ranked by impact and effort, so your team knows exactly where to start.</p>
          </Reveal>
          <Reveal className="tsa-pr-tbl">
            <div className="tsa-pr-row head">
              <div>Priority</div>
              <div>What it means</div>
              <div>Example</div>
            </div>
            {PRIORITIES.map((row) => (
              <div className={`tsa-pr-row ${row.kind}`} key={row.kind}>
                <div>
                  <span className="pri">{row.label}</span>
                </div>
                <div>{row.means}</div>
                <div className="ex">{row.example}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* COMMON FINDINGS */}
      <section className="band tint tsa-sec" id="findings">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we often find</span>
            <h2>Common technical findings.</h2>
          </Reveal>
          <Reveal className="tsa-fix-tbl">
            <div className="tsa-fix-row head">
              <div>The problem</div>
              <div>How it gets fixed</div>
            </div>
            {FIXES.map((row) => (
              <div className="tsa-fix-row" key={row.prob}>
                <div className="prob">
                  <span className="xi">{ICON_X}</span>
                  {row.prob}
                </div>
                <div className="fix">
                  <span className="vi">{ICON_CHECK}</span>
                  {row.fix}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="band tsa-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>The audit process.</h2>
            <p>A structured process from crawl to walkthrough.</p>
          </Reveal>
          <Reveal className="tsa-proc5">
            {PROCESS.map((step, i) => (
              <Fragment key={step.no}>
                {i > 0 && (
                  <span className="p5arr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
                <article className="tsa-p5">
                  <span className="p5n">{step.no}</span>
                  <div className="p5i">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      {/* RECEIVE */}
      <section className="band tint tsa-sec" id="receive">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">You receive</span>
            <h2>What you receive.</h2>
          </Reveal>
          <Reveal className="tsa-inc2-grid">
            {RECEIVE.map((item) => (
              <div className="tsa-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tsa-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs a technical SEO audit</span>
            <h2>Clear the path for search engines.</h2>
          </Reveal>
          <div className="tsa-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="tsa-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        id="start"
        eyebrow="Technical SEO Audit"
        heading="Clear the path for search engines."
        copy={
          <>
            Book a free call to scope a technical audit for your site:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll take a first look at how your site is being crawled and indexed.</strong>
          </>
        }
        primaryLabel="Book a technical audit"
        primaryHref="/contact"
        secondary={{ label: "See what we inspect", href: "#areas", arrow: "↗" }}
      />
    </>
  );
}
