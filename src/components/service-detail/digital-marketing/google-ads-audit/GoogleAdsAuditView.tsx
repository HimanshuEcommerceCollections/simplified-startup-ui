"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./gaud-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TYPE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_MINUS_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PLUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
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
  { label: "Conversion tracking", pct: 34, tone: "bad", verdict: "Fix first" },
  { label: "Account structure", pct: 56, tone: "warn", verdict: "Needs work" },
  { label: "Search terms", pct: 40, tone: "bad", verdict: "Wasted spend" },
  { label: "Ads & assets", pct: 78, tone: "good", verdict: "Strong" },
  { label: "Landing pages", pct: 52, tone: "warn", verdict: "Needs work" },
  { label: "Audiences", pct: 72, tone: "good", verdict: "Strong" },
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
      ariaLabel="A sample Google Ads account scorecard"
      className={`gaud-score${run ? " run" : ""}`}
      live="Account scorecard"
      corner="6 AREAS"
      footLeft="Every area scored & ranked"
      footRight="prioritized action plan →"
    >
      <div className="gaud-score-body">
        {SCORES.map((row) => (
          <div className={`gaud-sb ${row.tone}`} key={row.label}>
            <span className="sl">{row.label}</span>
            <span className="st">
              <i style={barWidth(row.pct)}></i>
            </span>
            <span className="sv">{row.verdict}</span>
          </div>
        ))}
      </div>
      <div className="gaud-score-flag">
        {ICON_WARN}
        Wasted spend found in search terms &amp; tracking
      </div>
    </SignatureCard>
  );
}

/* -------- what we review (8 numbered tilt cards) -------- */

const AREAS: { no: string; icon: ReactNode; title: ReactNode; text: string }[] = [
  { no: "01", icon: ICON_LIST_CHECK, title: "Conversion tracking", text: "Are the right actions tracked, and are they counted correctly?" },
  { no: "02", icon: ICON_GRID, title: "Account structure", text: "Are campaigns and ad groups organized for control and clarity?" },
  { no: "03", icon: ICON_SEARCH, title: "Keywords & search terms", text: "Are you paying for the searches you actually want?" },
  { no: "04", icon: ICON_CHART, title: "Bidding & budgets", text: "Do bid strategies and budgets match your goals?" },
  { no: "05", icon: ICON_TYPE, title: "Ads & assets", text: "Are ads relevant, complete, and using available assets?" },
  { no: "06", icon: ICON_PAGE, title: "Landing pages", text: "Do pages match the ads and make it easy to convert?" },
  { no: "07", icon: ICON_PEOPLE, title: "Audiences", text: "Are remarketing lists and exclusions set up well?" },
  { no: "08", icon: ICON_BAG, title: <a href="/digital-marketing/google-shopping-pmax">Feeds &amp; PMax</a>, text: "For stores: feed health and Performance Max setup." },
];

function AreasGrid() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="gaud-ar8-grid">
        {AREAS.map((area) => (
          <article className="gaud-ar8" key={area.no} data-tilt>
            <span className="gaud-ar8-spot"></span>
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

/* -------- questions the audit answers (6, 2-col) -------- */

const ANSWERS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_SHIELD_CHECK, title: "Can we trust our conversion data?", text: "Whether results in Google Ads reflect reality." },
  { icon: ICON_DOLLAR, title: "Where is budget being wasted?", text: "Search terms, placements, or campaigns that don’t pay off." },
  { icon: ICON_MINUS_CIRCLE, title: "What should we stop doing?", text: "Settings or campaigns worth pausing or changing." },
  { icon: ICON_PLUS, title: "What should we do more of?", text: "Areas with room to grow." },
  { icon: ICON_WINDOW, title: "Are our landing pages helping?", text: "Whether pages support or hold back results." },
  { icon: ICON_LIST_CHECK, title: "What should we fix first?", text: "A clear order of priorities." },
];

/* -------- what you get (5) -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_GRID, text: "Review of all eight areas" },
  { icon: ICON_DOC, text: "Plain-language findings for each area" },
  { icon: ICON_BOLT, text: "Quick fixes you can make right away" },
  { icon: ICON_LIST_CHECK, text: "Prioritized action plan" },
  { icon: ICON_CHAT, text: "Walkthrough call to review findings" },
];

/* -------- how it works (3 steps) -------- */

const STEPS: { no: string; title: string; text: string; delay: number }[] = [
  { no: "Step 1 · Access", title: "Access", text: "Short kickoff call and view-only access to Google Ads and analytics.", delay: 0 },
  { no: "Step 2 · Review", title: "Review", text: "We review your account across all eight areas.", delay: 90 },
  { no: "Step 3 · Plan", title: "Plan", text: "You get the findings, the action plan, and a walkthrough call.", delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does a Google Ads audit cost?", a: <>It depends on account size and complexity. <strong>We share pricing on the intro call.</strong></> },
  { q: "Do we have to hire you afterward?", a: <>No. <strong>The plan is yours to use</strong> with your own team or any partner.</> },
  {
    q: "What access do you need?",
    a: (
      <>
        <strong>View-only access to Google Ads and analytics</strong> is usually enough.{" "}
        <a className="gaud-link" href="/digital-marketing/google-shopping-pmax">Merchant Center</a> access helps for online stores.
      </>
    ),
  },
  { q: "Will you make changes to our account?", a: <><strong>No changes are made during the audit</strong> unless you ask us to.</> },
];

/* -------- page -------- */

export default function GoogleAdsAuditView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Google Ads", href: "/digital-marketing/google-ads" }}
        line1="Find out where your Google Ads"
        line2={
          <>
            budget is working, and where it <span className="grad-text">isn’t.</span>
          </>
        }
        lead={
          <>
            A focused review of your account <strong>with a clear, prioritized action plan.</strong>
          </>
        }
        primary={{ label: "Book your Google Ads audit", href: "/contact" }}
        secondary={{ label: "What we review ↓", href: "#review" }}
      >
        <ScorecardCard />
      </ServiceDetailHero>

      <TrustBar items={["Plain-language findings", "Prioritized action plan", "View-only access is enough", "No obligation to hire us"]} />

      {/* WHAT WE REVIEW */}
      <section className="band tint gaud-sec" id="review">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we review</span>
            <h2>Eight areas that shape how well your ad spend performs.</h2>
          </Reveal>
          <AreasGrid />
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="band gaud-sec" id="answers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Questions the audit answers</span>
            <h2>You’ll come away with clear answers, not just a list of warnings.</h2>
          </Reveal>
          <Reveal className="gaud-q-grid">
            {ANSWERS.map((item) => (
              <article className="gaud-qc" key={item.title}>
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
      <section className="band tint gaud-sec" id="get">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you get</span>
            <h2>Findings, quick wins, and a prioritized plan.</h2>
          </Reveal>
          <Reveal className="gaud-inc2-grid">
            {RECEIVE.map((item) => (
              <div className="gaud-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band gaud-sec" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Access → review → plan.</h2>
            <p>A simple, three-step process.</p>
          </Reveal>
          <div className="gaud-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="gaud-step" key={step.title} style={d(step.delay)}>
                <span className="gaud-step-no">{step.no}</span>
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
        eyebrow="Google Ads Audit"
        heading="Know exactly where to start."
        copy={
          <>
            No obligation. Just a clear picture of your Google Ads account and what to fix first.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>You’ll get plain-language findings and a prioritized action plan.</strong>
          </>
        }
        primaryLabel="Book your Google Ads audit"
        primaryHref="/contact"
        secondary={{ label: "What we review", href: "#review", arrow: "↗" }}
      />
    </>
  );
}
