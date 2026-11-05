"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./maud-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_BROWSER = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
    <circle cx="7" cy="6.5" r="0.6" fill="currentColor" />
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
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DEVICES = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="18" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: account scorecard -------- */

type ScoreTone = "good" | "warn" | "bad";

const SCORES: { label: string; pct: number; tone: ScoreTone; verdict: string }[] = [
  { label: "Tracking (Pixel/CAPI)", pct: 36, tone: "bad", verdict: "Fix first" },
  { label: "Account structure", pct: 54, tone: "warn", verdict: "Needs work" },
  { label: "Creative", pct: 42, tone: "bad", verdict: "Tired / fatigued" },
  { label: "Audiences", pct: 74, tone: "good", verdict: "Strong" },
  { label: "Offers & messaging", pct: 50, tone: "warn", verdict: "Needs work" },
  { label: "Landing pages", pct: 70, tone: "good", verdict: "Strong" },
];

const barWidth = (pct: number): CSSProperties => ({ "--w": `${pct}%` } as CSSProperties);

function ScorecardCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: rows, bars and the flag are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample Meta ads account scorecard"
      className={`maud-score${run ? " run" : ""}`}
      live="Account scorecard"
      corner="6 AREAS"
      footLeft="Every area scored & ranked"
      footRight="prioritized action plan →"
    >
      <div className="maud-score-body">
        {SCORES.map((row) => (
          <div className={`maud-sb ${row.tone}`} key={row.label}>
            <span className="sl">{row.label}</span>
            <span className="st">
              <i style={barWidth(row.pct)}></i>
            </span>
            <span className="sv">{row.verdict}</span>
          </div>
        ))}
      </div>
      <div className="maud-score-flag">
        {ICON_WARN}
        Tracking gaps &amp; creative fatigue found
      </div>
    </SignatureCard>
  );
}

/* -------- what we review (8 numbered tilt cards) -------- */

const AREAS: { no: string; icon: ReactNode; title: ReactNode; text: string }[] = [
  { no: "01", icon: ICON_BROWSER, title: "Tracking", text: "Pixel, Conversions API, and event setup." },
  { no: "02", icon: ICON_GRID, title: "Account structure", text: "How campaigns and ad sets are organized." },
  { no: "03", icon: ICON_PEOPLE, title: "Audiences", text: "Prospecting, retargeting, and exclusions." },
  { no: "04", icon: ICON_IMAGE, title: "Creative", text: "Formats, hooks, variety, and fatigue." },
  { no: "05", icon: ICON_LINES, title: "Offers & messaging", text: "Whether offers match each audience." },
  { no: "06", icon: ICON_DEVICES, title: "Placements", text: "Where ads appear and how they look there." },
  { no: "07", icon: ICON_PAGE, title: "Landing pages", text: "Whether pages match the ads and convert well." },
  {
    no: "08",
    icon: ICON_BAG,
    title: (
      <>
        <a href="/website-development/ecommerce">Catalog</a> or lead forms
      </>
    ),
    text: "Catalog health for stores, or form quality for leads.",
  },
];

function AreasGrid() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="maud-ar8-grid">
        {AREAS.map((area) => (
          <article className="maud-ar8" key={area.no} data-tilt>
            <span className="maud-ar8-spot"></span>
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

/* -------- questions the audit answers (6) -------- */

const QUESTIONS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_SHIELD_CHECK, title: "Can we trust our tracking?", text: "Whether results in Ads Manager reflect reality." },
  { icon: ICON_GRID, title: "Is our structure helping or hurting?", text: "Whether campaigns get enough data to learn." },
  { icon: ICON_IMAGE, title: "Is our creative tired?", text: "Which ads need refreshing first." },
  { icon: ICON_PERSON, title: "Are we reaching the right people?", text: "How audiences and exclusions are set up." },
  { icon: ICON_DOLLAR, title: "Where is spend being wasted?", text: "Campaigns or ad sets that don’t pay off." },
  { icon: ICON_LIST_CHECK, title: "What should we fix first?", text: "A clear order of priorities." },
];

/* -------- what you get (6) -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_GRID, text: "Review of all eight areas" },
  { icon: ICON_DOC, text: "Plain-language findings" },
  { icon: ICON_IMAGE, text: "Creative review with refresh ideas" },
  { icon: ICON_BOLT, text: "Quick fixes you can make right away" },
  { icon: ICON_LIST_CHECK, text: "Prioritized action plan" },
  { icon: ICON_CHAT, text: "Walkthrough call to review findings" },
];

/* -------- how it works (3 steps) -------- */

const STEPS: { no: string; title: string; text: string; delay: number }[] = [
  { no: "Step 1 · Access", title: "Access", text: "Short kickoff call and view-only access to Ads Manager and Events Manager.", delay: 0 },
  { no: "Step 2 · Review", title: "Review", text: "We review your account across all eight areas.", delay: 90 },
  { no: "Step 3 · Plan", title: "Plan", text: "You get the findings, the action plan, and a walkthrough call.", delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does a Meta ads audit cost?", a: <>It depends on account size and complexity. <strong>We share pricing on the intro call.</strong></> },
  { q: "Do we have to hire you afterward?", a: <>No. <strong>The plan is yours to use</strong> with your own team or any partner.</> },
  { q: "What access do you need?", a: <><strong>View-only access to Ads Manager and Events Manager</strong> is usually enough.</> },
  { q: "Will you change anything in our account?", a: <><strong>No changes are made during the audit</strong> unless you ask us to.</> },
];

/* -------- page -------- */

export default function MetaAdsAuditView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Meta Ads", href: "/digital-marketing/meta-ads" }}
        line1="Find out what’s working in your"
        line2={
          <>
            Meta ads, and what <span className="grad-text">isn’t.</span>
          </>
        }
        lead={
          <>
            A focused review of your Facebook and Instagram ads <strong>with a clear, prioritized action plan.</strong>
          </>
        }
        primary={{ label: "Book your Meta ads audit", href: "/contact" }}
        secondary={{ label: "What we review ↓", href: "#review" }}
      >
        <ScorecardCard />
      </ServiceDetailHero>

      <TrustBar items={["Plain-language findings", "Prioritized action plan", "View-only access is enough", "No obligation to hire us"]} />

      {/* WHAT WE REVIEW */}
      <section className="band tint maud-sec" id="review">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we review</span>
            <h2>Eight areas that shape your Meta ads results.</h2>
          </Reveal>
          <AreasGrid />
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="band maud-sec" id="answers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Questions the audit answers</span>
            <h2>Clear answers, not just a list of warnings.</h2>
          </Reveal>
          <Reveal className="maud-q-grid">
            {QUESTIONS.map((item) => (
              <article className="maud-qc" key={item.title}>
                <span className="qi">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* YOU GET */}
      <section className="band tint maud-sec" id="get">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you get</span>
            <h2>Findings, creative ideas, and a prioritized plan.</h2>
          </Reveal>
          <Reveal className="maud-inc2-grid">
            {RECEIVE.map((item) => (
              <div className="maud-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band maud-sec" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Access → review → plan.</h2>
            <p>A simple, three-step process.</p>
          </Reveal>
          <div className="maud-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="maud-step" key={step.title} style={d(step.delay)}>
                <span className="maud-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        id="start"
        eyebrow="Meta Ads Audit"
        heading="Know exactly where to start."
        copy={
          <>
            No obligation. Just a clear picture of your Meta ads and what to fix first.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>You’ll get plain-language findings and a prioritized action plan.</strong>
          </>
        }
        primaryLabel="Book your Meta ads audit"
        primaryHref="/contact"
        secondary={{ label: "What we review", href: "#review", arrow: "↗" }}
      />
    </>
  );
}
