"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./sa-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_GEAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_COMPARE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 4v16M15 4v16M4 9h4M16 9h4M4 15h4M16 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND_DOWN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 18l5-6 4 4 3-4 4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 6v12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_HOME = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: SEO scorecard -------- */

type ScoreTone = "good" | "warn" | "bad";

const SCORES: { label: string; pct: number; tone: ScoreTone; verdict: string }[] = [
  { label: "Technical", pct: 82, tone: "good", verdict: "Strong" },
  { label: "On-page", pct: 54, tone: "warn", verdict: "Needs work" },
  { label: "Content", pct: 38, tone: "bad", verdict: "Fix first" },
  { label: "Backlinks", pct: 60, tone: "warn", verdict: "Needs work" },
  { label: "Local", pct: 88, tone: "good", verdict: "Strong" },
  { label: "Competitors", pct: 50, tone: "warn", verdict: "Behind" },
];

const LEGEND: { tone: ScoreTone; label: string }[] = [
  { tone: "good", label: "Helping" },
  { tone: "warn", label: "Needs work" },
  { tone: "bad", label: "Fix first" },
];

const barWidth = (pct: number): CSSProperties => ({ "--w": `${pct}%` } as CSSProperties);

function ScorecardCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: rows and bars are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample SEO scorecard across six areas"
      className={`sa-score${run ? " run" : ""}`}
      live="SEO scorecard"
      corner="6 AREAS"
      footLeft="Every area scored & ranked"
      footRight="prioritized action plan →"
    >
      <div className="sa-score-body">
        {SCORES.map((row) => (
          <div className={`sa-sb ${row.tone}`} key={row.label}>
            <span className="sl">{row.label}</span>
            <span className="st">
              <i style={barWidth(row.pct)}></i>
            </span>
            <span className="sv">{row.verdict}</span>
          </div>
        ))}
      </div>
      <div className="sa-score-legend">
        {LEGEND.map((item) => (
          <span className={item.tone} key={item.tone}>
            <span className="d3"></span>
            {item.label}
          </span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- what the audit covers (6 numbered tilt cards) -------- */

const AREAS: { no: string; icon: ReactNode; title: ReactNode; text: string }[] = [
  { no: "01", icon: ICON_GEAR, title: "Technical health", text: "Crawling, indexing, speed, and mobile experience." },
  { no: "02", icon: ICON_LINES, title: "On-page SEO", text: "Titles, headings, content structure, and internal links." },
  { no: "03", icon: ICON_DOC, title: "Content", text: "Gaps, overlaps, outdated pages, and search intent match." },
  { no: "04", icon: ICON_LINK, title: "Backlinks", text: "Link quality, relevance, and gaps against competitors." },
  { no: "05", icon: ICON_PIN, title: <a href="/digital-marketing/local-seo">Local presence</a>, text: "Google Business Profile and local listings, where relevant." },
  { no: "06", icon: ICON_BARS, title: "Competitors", text: "Who ranks for your key searches and why." },
];

function AreasGrid() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="sa-ar6-grid">
        {AREAS.map((area) => (
          <article className="sa-ar6" key={area.no} data-tilt>
            <span className="sa-ar6-spot"></span>
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

/* -------- which audit (3-col comparison table) -------- */

const WHICH: { k: string; full: ReactNode; tech: string }[] = [
  { k: "Best for", full: "A complete picture of your SEO", tech: "Deep diagnosis of technical issues" },
  { k: "Covers", full: "Technical, content, links, local, competitors", tech: "Crawling, indexing, speed, code, schema" },
  { k: "Depth", full: "Broad review across all areas", tech: "Detailed review of technical areas" },
  { k: "Typical next step", full: <a href="/digital-marketing/seo">SEO strategy or ongoing SEO</a>, tech: "Developer fixes and re-check" },
];

/* -------- you receive (6) -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_BARS, text: "Review of all six SEO areas" },
  { icon: ICON_DOC, text: "Plain-language findings for each area" },
  { icon: ICON_COMPARE, text: "Competitor comparison for key searches" },
  { icon: ICON_BOLT, text: "Quick wins you can act on right away" },
  { icon: ICON_LIST_CHECK, text: "Prioritized action plan" },
  { icon: ICON_CHAT, text: "Walkthrough call to review findings" },
];

/* -------- how it works (3 steps) -------- */

const STEPS: { no: string; title: string; text: string; delay: number }[] = [
  { no: "Step 1 · Access", title: "Access", text: "Short kickoff call and access to Search Console and analytics.", delay: 0 },
  { no: "Step 2 · Review", title: "Review", text: "We review all six areas of your SEO.", delay: 90 },
  { no: "Step 3 · Plan", title: "Plan", text: "You get the findings, action plan, and a walkthrough call.", delay: 180 },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_TREND_DOWN, text: <><strong>Sites not ranking as expected</strong> that need to know why.</>, delay: 0 },
  { icon: ICON_REFRESH, text: <><strong>Teams planning an SEO push</strong> who want a clear starting point.</>, delay: 60 },
  { icon: ICON_HOME, text: <><strong>Businesses hiring an SEO partner</strong> who want an independent baseline first.</>, delay: 120 },
  { icon: ICON_SHIELD, text: <><strong>Owners burned by vague SEO reports</strong> who want plain answers and a plan.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does an SEO audit cost?", a: <>It depends on site size and complexity. <strong>We share pricing on the intro call.</strong></> },
  { q: "Do we have to hire you to fix the issues?", a: <>No. <strong>The plan is yours to keep</strong> and use with your own team or any partner.</> },
  { q: "What access do you need?", a: <>Usually <strong>Google Search Console and analytics.</strong> Your Google Business Profile is helpful for local businesses.</> },
  { q: "How is this different from a free online SEO checker?", a: <>Automated tools list warnings. <strong>Our audit explains what actually matters for your business and what to do first.</strong></> },
];

/* -------- page -------- */

export default function SeoAuditView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="See what’s helping, what’s"
        line2={
          <>
            hurting, and what to <span className="grad-text">fix first.</span>
          </>
        }
        lead={
          <>
            A complete review of your website’s SEO: technical health, on-page, content, backlinks, local, and competitors,{" "}
            <strong>with a clear, prioritized action plan.</strong>
          </>
        }
        primary={{ label: "Book your SEO audit", href: "/contact" }}
        secondary={{ label: "What we review ↓", href: "#covers" }}
      >
        <ScorecardCard />
      </ServiceDetailHero>

      <TrustBar items={["Plain-language report", "Prioritized action plan", "No obligation to hire us", "The plan is yours to keep"]} />

      {/* WHAT WE REVIEW */}
      <section className="band tint sa-sec" id="covers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we review</span>
            <h2>What the audit covers.</h2>
            <p>We look at six areas that shape how your site performs in search.</p>
          </Reveal>
          <AreasGrid />
        </div>
      </section>

      {/* WHICH AUDIT */}
      <section className="band sa-sec" id="which">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Which audit fits</span>
            <h2>Full SEO audit vs technical SEO audit.</h2>
            <p>Choose the audit that matches what you need to know.</p>
          </Reveal>
          <Reveal className="sa-wa-tbl">
            <div className="sa-wa-row head">
              <div></div>
              <div className="full">Full SEO Audit</div>
              <div className="tech">
                <a href="/digital-marketing/technical-seo-audit">Technical SEO Audit</a>
              </div>
            </div>
            {WHICH.map((row) => (
              <div className="sa-wa-row" key={row.k}>
                <div>{row.k}</div>
                <div className="full">{row.full}</div>
                <div className="tech">{row.tech}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* YOU RECEIVE */}
      <section className="band tint sa-sec" id="receive">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">You receive</span>
            <h2>What you get.</h2>
          </Reveal>
          <Reveal className="sa-inc2-grid">
            {RECEIVE.map((item) => (
              <div className="sa-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band sa-sec" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Access → review → plan.</h2>
            <p>A simple, three-step process.</p>
          </Reveal>
          <div className="sa-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="sa-step" key={step.title} style={d(step.delay)}>
                <span className="sa-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint sa-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Know exactly where to start.</h2>
          </Reveal>
          <div className="sa-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="sa-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        id="start"
        eyebrow="SEO Audit"
        heading="Know exactly where to start."
        copy={
          <>
            No obligation: just a clear picture of your SEO and a plan to improve it.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>You’ll get clear findings and a prioritized action plan.</strong>
          </>
        }
        primaryLabel="Book your SEO audit"
        primaryHref="/contact"
        secondary={{ label: "What we review", href: "#covers", arrow: "↗" }}
      />
    </>
  );
}
