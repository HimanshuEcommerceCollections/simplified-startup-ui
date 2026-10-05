"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./bpf-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHEET = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M4 9h16M9 9v11" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TEAM = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M2 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5M12 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: connected financial model -------- */

const FLOW: { icon: ReactNode; label: string }[] = [
  { icon: ICON_LINES, label: "Assumptions" },
  { icon: ICON_SHEET, label: "3 Statements" },
  { icon: ICON_TREND, label: "KPIs" },
];

const KPIS: { v: string; k: string; hl?: boolean }[] = [
  { v: "18 mo", k: "Runway" },
  { v: "Mo 14", k: "Break-even" },
  { v: "72%", k: "Gross margin", hl: true },
];

function ModelCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the model is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample connected financial model"
      className={`bpf-card${run ? " run" : ""}`}
      live="Financial model · Connected"
      corner="3 STATEMENTS"
      footLeft="…every statement updates"
      footRight="auto-linked, editable →"
    >
      <div className="bpf-assum">
        <span className="ak">Change one assumption…</span>
        <div className="ar">
          <span>Price per seat</span>
          <span>
            <b>$40 → $48</b> <span className="chg">edited</span>
          </span>
        </div>
      </div>
      <div className="bpf-flow">
        {FLOW.map((tile, i) => (
          // the arrows are siblings of the tiles, so the tiles keep the design's 1 / 3 / 5 positions
          <Fragment key={tile.label}>
            {i > 0 && <span className="ar">{ICON_ARROW}</span>}
            <div className="bpf-mf">
              <span className="fi">{tile.icon}</span>
              <small>{tile.label}</small>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="bpf-kpi">
        {KPIS.map((kpi) => (
          <div className={`k${kpi.hl ? " hl" : ""}`} key={kpi.k}>
            <span className="v">{kpi.v}</span>
            <span className="kk">{kpi.k}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- planning stats (count-ups) -------- */

type Stat = {
  /** count-up target; omitted for the static "6–12 mo" figure */
  count?: number;
  suffix?: string;
  /** the static figure, used when there is no count */
  value?: string;
  label: string;
  text: ReactNode;
  delay: number;
};

const STATS: Stat[] = [
  {
    count: 16,
    suffix: "%",
    label: "More likely to reach viability",
    text: (
      <>
        Founders who wrote a formal plan vs otherwise similar founders who didn’t. <em>Greene &amp; Hopp, HBR 2017</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 19,
    suffix: "%",
    label: "More likely to plan when raising",
    text: (
      <>
        Founders seeking outside funding were more likely to write a formal plan. <em>Greene &amp; Hopp, HBR 2017</em>
      </>
    ),
    delay: 80,
  },
  {
    value: "6–12 mo",
    label: "The planning sweet spot",
    text: (
      <>
        Plans written 6–12 months after deciding to start were linked to the best outcomes. <em>Greene &amp; Hopp</em>
      </>
    ),
    delay: 160,
  },
  {
    count: 70,
    suffix: "%",
    label: "Ran out of capital",
    text: (
      <>
        Share of shut-down VC-backed startups (known reason) that ran out of capital. <em>CB Insights, 2026</em>
      </>
    ),
    delay: 240,
  },
];

/* the design's script fires the count-ups once the stats block scrolls past 85% of the viewport */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

function StatCard({ stat, run, reduce }: { stat: Stat; run: boolean; reduce: boolean }) {
  const [value, setValue] = useState(0);
  const target = stat.count ?? 0;

  useEffect(() => {
    if (!run || reduce || stat.count === undefined) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(e * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, stat.count, target]);

  // reduced motion: the final figure is derived at render, no animation
  const shown = reduce ? target : value;

  return (
    <Reveal className="bpf-stat" style={d(stat.delay)}>
      <div className="sv">
        {stat.count === undefined ? (
          stat.value
        ) : (
          <>
            {Math.round(shown)}
            {stat.suffix}
          </>
        )}
      </div>
      <span className="sk">{stat.label}</span>
      <p>{stat.text}</p>
    </Reveal>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  const [gridRef, inView] = useInView<HTMLDivElement>(STATS_IO);
  return (
    <div className="bpf-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- services: 8 numbered cards -------- */

const SERVICES: { no: string; title: string; text: string; output: string }[] = [
  { no: "01", title: "Business Plan Writing", text: "A clear written plan covering your market, offer, operations, team, and growth strategy.", output: "Investor- or lender-ready plan document" },
  { no: "02", title: "Three-Statement Financial Model", text: "Connected profit & loss, balance sheet, and cash flow statements that update together.", output: "Editable model in Excel or Google Sheets" },
  { no: "03", title: "Revenue & Unit Economics Build", text: "Bottom-up revenue built from pricing, customers, and conversion, with CAC, LTV, and margins.", output: "Revenue drivers and unit economics tab" },
  { no: "04", title: "Startup Budget & Cost Plan", text: "Launch costs, operating expenses, and hiring plan mapped month by month.", output: "Budget and headcount schedule" },
  { no: "05", title: "Cash Flow Forecast & Runway", text: "Monthly cash projections showing when cash gets tight and how long current funds last.", output: "13-week and 36-month cash view" },
  { no: "06", title: "Scenario & Sensitivity Planning", text: "Conservative, base, and growth cases so you can see how key changes affect results.", output: "Scenario toggle and sensitivity tables" },
  { no: "07", title: "SBA & Bank Loan Plans", text: "Plans and projections structured around what lenders typically review, including debt service.", output: "Lender-ready plan and loan summary" },
  { no: "08", title: "Plan Refresh & Model Updates", text: "Existing plans or models reviewed, cleaned up, and updated with actual results.", output: "Updated plan and actuals vs. forecast" },
];

/* -------- model build flow -------- */

const BUILD: { no: string; icon: ReactNode; title: string; items: string[] }[] = [
  { no: "01", icon: ICON_LINES, title: "Assumptions", items: ["Pricing", "Growth rates", "Costs", "Hiring"] },
  { no: "02", icon: ICON_TREND, title: "Revenue Build", items: ["Customers", "Conversion", "Churn", "Upsell"] },
  { no: "03", icon: ICON_TEAM, title: "Costs & Team", items: ["COGS", "Operating costs", "Salaries", "Tools"] },
  { no: "04", icon: ICON_SHEET, title: "3 Statements", items: ["P&L", "Balance sheet", "Cash flow"] },
  { no: "05", icon: ICON_CLOCK, title: "KPIs & Outputs", items: ["Runway", "Break-even", "Margins", "Funding need"] },
];

/* -------- three scenarios -------- */

const SCENARIOS: { badge: string; title: string; sub: string; base?: boolean; rows: { dt: string; dd: string }[] }[] = [
  {
    badge: "Downside",
    title: "Conservative",
    sub: "If growth is slower than planned.",
    rows: [
      { dt: "Sales", dd: "Slower ramp" },
      { dt: "Costs", dd: "Hiring delayed" },
      { dt: "Shows", dd: "Minimum cash needed" },
    ],
  },
  {
    badge: "Most likely",
    title: "Base",
    sub: "Your most realistic plan.",
    base: true,
    rows: [
      { dt: "Sales", dd: "Expected ramp" },
      { dt: "Costs", dd: "Planned hiring" },
      { dt: "Shows", dd: "Main budget and targets" },
    ],
  },
  {
    badge: "Upside",
    title: "Growth",
    sub: "If demand beats expectations.",
    rows: [
      { dt: "Sales", dd: "Faster ramp" },
      { dt: "Costs", dd: "Earlier hiring" },
      { dt: "Shows", dd: "Capacity and cash to scale" },
    ],
  },
];

/* -------- what you receive -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_DOC, text: "Written business plan (Word or Google Docs)" },
  { icon: ICON_LINES, text: "Executive summary for quick sharing" },
  { icon: ICON_SHEET, text: "Connected three-statement financial model" },
  { icon: ICON_LINES, text: "Assumptions tab with every input in one place" },
  { icon: ICON_TREND, text: "Monthly projections yr 1–2, annual yr 3–5" },
  { icon: ICON_REFRESH, text: "Conservative, base, and growth scenarios" },
  { icon: ICON_CLOCK, text: "Cash runway and break-even analysis" },
  { icon: ICON_DOLLAR, text: "Use of funds breakdown (if raising)" },
  { icon: ICON_CHAT, text: "Model walkthrough call and how-to notes" },
];

/* -------- how / who / faq -------- */

const STEPS = [
  { no: "Step 1 · Week 1", title: "Discover", text: "Kickoff call, review of existing numbers, and who the plan is for.", delay: 0 },
  { no: "Step 2 · Week 2", title: "Assume", text: "Agree on pricing, growth, cost, and hiring assumptions together.", delay: 80 },
  { no: "Step 3 · Weeks 3–4", title: "Build", text: "Model and written plan drafted and shared for your review.", delay: 160 },
  { no: "Step 4 · Week 5", title: "Finalize", text: "Revisions made, scenarios checked, and a walkthrough call held.", delay: 240 },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Founders raising pre-seed or seed</strong> who need a model that matches their pitch.</>, delay: 0 },
  { icon: ICON_FILE, text: <><strong>Small businesses applying for SBA or bank loans</strong> that need lender-ready projections.</>, delay: 60 },
  { icon: ICON_BARS, text: <><strong>Owners planning expansion</strong>, a new location, product line, or hire, who want to test the numbers first.</>, delay: 120 },
  { icon: ICON_REFRESH, text: <><strong>Teams with an outdated plan</strong> that no longer reflects how the business actually runs.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does a plan and model cost?", a: <>It depends on scope: a financial model alone differs from a full written plan with scenarios and lender formatting. <strong>We share pricing on the planning call.</strong></> },
  { q: "Do I need existing financials to start?", a: <>No. For new businesses we build from assumptions and market research. For existing businesses, <strong>past financials help us ground the forecast in real results.</strong></> },
  { q: "Which tools do you build the model in?", a: <><strong>Excel or Google Sheets,</strong> depending on your preference. The model is fully editable and yours to keep updating.</> },
  { q: "Can a plan guarantee funding or a loan?", a: <>No. Funding and lending decisions depend on many factors. A clear plan and model <strong>make it easier for investors and lenders to understand your business.</strong></> },
  { q: "Can you update the model after delivery?", a: <>Yes. Many clients return quarterly to <strong>compare actuals with the forecast</strong> and update assumptions.</> },
  { q: "What makes a model “defensible”?", a: <>Every figure traces to a visible assumption you can explain: <strong>no hard-coded numbers, no black boxes.</strong> When an investor asks “why 20% growth?”, you can point to the input and the logic.</> },
];

/* -------- page -------- */

export default function BusinessPlanFinancialModelView() {
  return (
    <div className="bpf-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Business & Startup Advisory", href: "/business-advisory" }}
        line1="A plan and model built on"
        line2={
          <>
            assumptions you can <span className="grad-text">defend.</span>
          </>
        }
        lead={
          <>
            Clear plans and connected three-statement models for founders raising money, applying for loans, or planning
            their next stage of growth. <strong>Every number traces back to an assumption you can see and change.</strong>
          </>
        }
        primary={{ label: "Book a planning call", href: "/start-project" }}
        secondary={{ label: "See our services ↓", href: "#services" }}
      >
        <ModelCard />
      </ServiceDetailHero>

      <TrustBar items={["Connected three-statement model", "Assumptions you can defend", "Conservative / base / growth", "Editable & yours to keep"]} />

      {/* PLANNING STATS (dark) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What the research says about planning</span>
            <h2>Writing the plan down, and watching cash, matters.</h2>
            <p>Studies of founders and failed startups point to the same lesson.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="bpf-stat-note">
            A plan doesn’t predict the future. <strong>It shows you which assumptions matter most, and what happens when they change.</strong>
          </Reveal>
        </div>
      </section>

      {/* 8 SERVICES */}
      <section className="band tint" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we provide</span>
            <h2>Pick the pieces you need, or one complete package.</h2>
            <p>Each service produces a specific, editable output.</p>
          </Reveal>
          <Reveal className="bpf-svc-grid">
            {SERVICES.map((svc) => (
              <article className="bpf-svc" key={svc.no}>
                <div className="sh">
                  <span className="sn">{svc.no}</span>
                  <h3>{svc.title}</h3>
                </div>
                <p>{svc.text}</p>
                <div className="out">
                  <span className="ok">{ICON_CHECK}</span>
                  <span className="ot">
                    <b>Output</b>
                    {svc.output}
                  </span>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MODEL BUILD FLOW */}
      <section className="band" id="build">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How the financial model is built</span>
            <h2>Every number traces back to an assumption you can change.</h2>
            <p>Five connected layers: change one input and everything downstream updates.</p>
          </Reveal>
          <Reveal className="bpf-bf-grid">
            {BUILD.map((layer) => (
              <article className="bpf-bf" key={layer.no}>
                <span className="bn">{layer.no}</span>
                <div className="bi">{layer.icon}</div>
                <h3>{layer.title}</h3>
                <ul>
                  {layer.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="bpf-bf-note">
            Change one assumption, like price or hiring date, and <strong>every statement and KPI updates automatically.</strong>
          </Reveal>
        </div>
      </section>

      {/* 3 SCENARIOS */}
      <section className="band tint" id="scenarios">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Three scenarios, one model</span>
            <h2>Plans rarely go exactly as written.</h2>
            <p>Building three scenarios shows how the business holds up if things move slower or faster than expected.</p>
          </Reveal>
          <Reveal className="bpf-scn-grid">
            {SCENARIOS.map((scn) => (
              <article className={`bpf-scn${scn.base ? " base" : ""}`} key={scn.title}>
                <span className="sb">{scn.badge}</span>
                <h3>{scn.title}</h3>
                <p className="sd">{scn.sub}</p>
                <dl>
                  {scn.rows.map((row) => (
                    <div key={row.dt}>
                      <dt>{row.dt}</dt>
                      <dd>{row.dd}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="band" id="receive">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you receive</span>
            <h2>A plan, a connected model, and a walkthrough.</h2>
          </Reveal>
          <Reveal className="bpf-rec-grid">
            {RECEIVE.map((item) => (
              <div className="bpf-reci" key={item.text}>
                <span className="rk">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Discover → assume → build → finalize.</h2>
            <p>Timelines depend on scope and how quickly financial information can be shared.</p>
          </Reveal>
          <div className="bpf-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="bpf-step" key={step.title} style={d(step.delay)}>
                <span className="bpf-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>For anyone whose next decision rides on the numbers.</h2>
          </Reveal>
          <div className="bpf-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="bpf-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every engagement." />

      <CtaBand
        id="start"
        eyebrow="Business Plan & Financial Model"
        heading="Plan with numbers you understand."
        copy={
          <>
            Book a planning call to talk through your goals, your audience, and the questions your plan needs to answer,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your current numbers and outline what the model should include.</strong>
          </>
        }
        primaryLabel="Book a planning call"
        primaryHref="/start-project"
        secondary={{ label: "See our services", href: "#services", arrow: "↗" }}
      />
    </div>
  );
}
