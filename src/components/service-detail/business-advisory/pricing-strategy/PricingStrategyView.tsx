"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./ps-page.css";

/* -------- icons -------- */

const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TIERS = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="5" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="9.5" y="4" width="5" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="16" y="4" width="5" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROLLOUT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: price -> profit lever -------- */

function LeverCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the lever is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="How a small price change moves profit"
      className={`ps-card${run ? " run" : ""}`}
      live="Price → profit lever"
      corner="S&P 1500 AVG"
      footLeft="Price beats volume 3×+"
      footRight="strategy, not a guess →"
    >
      <div className="ps-lev-hero">
        <span className="in1">
          <span className="n">+1%</span>
          <small>price</small>
        </span>
        <span className="arr">{ICON_ARROW}</span>
        <span className="out">
          <span className="big">+8%</span>
          <small>operating profit</small>
        </span>
      </div>
      <p className="ps-lev-cap">A 1% price rise, volume stable: one of the strongest levers there is.</p>
      <div className="ps-lev-cmp">
        <div className="ps-lc win">
          <span className="lcv">+8%</span>
          <span className="lck">From +1% price</span>
        </div>
        <div className="ps-lc">
          <span className="lcv">+2.5%</span>
          <span className="lck">From +1% volume</span>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why pricing deserves attention (count-ups) -------- */

type Stat = { count: number; prefix?: string; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 8,
    prefix: "~",
    suffix: "%",
    label: "Profit from a 1% price rise",
    text: (
      <>
        Typical increase in operating profit from a 1% price rise when volume stays stable. <em>McKinsey, S&amp;P 1500 avg</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 3,
    suffix: "×+",
    label: "Stronger than volume",
    text: (
      <>
        That impact is more than three times greater than a 1% increase in sales volume. <em>McKinsey</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 18,
    suffix: ".7%",
    label: "To offset a 5% cut",
    text: (
      <>
        Volume increase needed just to make up the profit lost from a 5% price cut. <em>McKinsey</em>
      </>
    ),
    delay: 160,
  },
];

/* the design fires the count-ups once the stats block scrolls past 85% of the viewport */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

function StatCard({ stat, run, reduce }: { stat: Stat; run: boolean; reduce: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || reduce) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(e * stat.count);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, stat.count]);

  // reduced motion: the final figure is derived at render, no animation
  const shown = reduce ? stat.count : value;

  return (
    <Reveal className="ps-stat" style={d(stat.delay)}>
      <div className="sv">
        {stat.prefix}
        {Math.round(shown)}
        {stat.suffix}
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
    <div className="ps-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- services: 8 cards -------- */

const SERVICES: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_SEARCH, title: "Pricing Audit", text: "Review of current prices, discounts, and margins." },
  { icon: ICON_PERSON, title: "Willingness-to-Pay Research", text: "Customer interviews and surveys on value and budget." },
  { icon: ICON_BARS, title: "Competitor Price Review", text: "How alternatives price, package, and position." },
  { icon: ICON_LIST_CHECK, title: "Pricing Model Selection", text: "Choosing the model that fits your offer and buyers." },
  { icon: ICON_TIERS, title: "Packaging & Tier Design", text: "Plans, bundles, and add-ons that guide buyers." },
  { icon: ICON_SHIELD_CHECK, title: "Discount & Approval Rules", text: "Clear limits so discounts don’t erode margin." },
  { icon: ICON_TREND, title: "Price Increase Planning", text: "Timing, messaging, and rollout to existing customers." },
  { icon: ICON_DOC, title: "Pricing Page Copy", text: "Plan names, feature lists, and FAQ for your website." },
];

/* -------- pricing model table -------- */

const MODELS: { name: string; how: string; fits: string; watch: string }[] = [
  { name: "Cost-plus", how: "Cost plus a set markup.", fits: "Simple products, manufacturing.", watch: "Ignores what buyers will pay." },
  { name: "Competitor-based", how: "Priced near alternatives.", fits: "Crowded, similar offers.", watch: "Can trigger price wars." },
  { name: "Value-based", how: "Priced on the value delivered.", fits: "Clear, measurable outcomes.", watch: "Needs solid customer research." },
  { name: "Tiered (Good–Better–Best)", how: "Several plans at rising levels.", fits: "Mixed customer sizes and needs.", watch: "Too many tiers confuse buyers." },
  { name: "Usage-based", how: "Pay for what you use.", fits: "APIs, data, infrastructure.", watch: "Less predictable revenue." },
  { name: "Subscription", how: "Recurring monthly or annual fee.", fits: "Ongoing services and software.", watch: "Must keep delivering value." },
  { name: "Freemium", how: "Free plan with paid upgrades.", fits: "Products users can try alone.", watch: "Many users may never pay." },
];

/* -------- good / better / best -------- */

const TIERS: { badge: string; title: string; sub: string; items: string[]; best?: boolean }[] = [
  { badge: "Good", title: "Entry", sub: "Entry point for smaller buyers.", items: ["Core features only", "Lowers the barrier to start", "Easy upgrade path"] },
  {
    badge: "Better · most popular",
    title: "The pick",
    sub: "The plan most buyers should pick.",
    items: ["Most popular features", "Best value for the price", "Highlighted on the page"],
    best: true,
  },
  { badge: "Best", title: "Premium", sub: "For buyers who want everything.", items: ["Premium features and support", "Makes “Better” look reasonable", "Captures high-value buyers"] },
];

/* -------- revenue leak waterfall -------- */

const LEAKS: { kind: "list" | "cut" | "final"; label: string; sub: string; width: string; value: string }[] = [
  { kind: "list", label: "List price", sub: "The price you publish", width: "100%", value: "100%" },
  { kind: "cut", label: "− Discounts", sub: "One-off deals & negotiated cuts", width: "88%", value: "−12%" },
  { kind: "cut", label: "− Promotions", sub: "Seasonal & first-month offers", width: "80%", value: "−8%" },
  { kind: "cut", label: "− Free extras", sub: "Add-ons & services given away", width: "74%", value: "−6%" },
  { kind: "cut", label: "− Payment terms", sub: "Late payments & early-pay incentives", width: "69%", value: "−5%" },
  { kind: "final", label: "= Realized price", sub: "What you actually keep", width: "69%", value: "69%" },
];

/* -------- what you receive -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Pricing audit summary" },
  { icon: ICON_PERSON, text: "Customer willingness-to-pay findings" },
  { icon: ICON_BARS, text: "Competitor pricing and packaging map" },
  { icon: ICON_LIST_CHECK, text: "Recommended pricing model" },
  { icon: ICON_TIERS, text: "Tier and package structure" },
  { icon: ICON_SHIELD, text: "Discount guidelines" },
  { icon: ICON_ROLLOUT, text: "Rollout and communication plan" },
  { icon: ICON_DOC, text: "Pricing page copy (if included)" },
  { icon: ICON_CALENDAR, text: "Walkthrough session with your team" },
];

/* -------- how / who / faq -------- */

const STEPS = [
  { no: "Step 1 · Week 1", title: "Review", text: "Current prices, margins, discounts, and sales data.", delay: 0 },
  { no: "Step 2 · Weeks 2–3", title: "Research", text: "Customer interviews and competitor review.", delay: 80 },
  { no: "Step 3 · Week 4", title: "Design", text: "Model, tiers, and discount rules drafted.", delay: 160 },
  { no: "Step 4 · Week 5", title: "Roll out", text: "Rollout plan, messaging, and walkthrough.", delay: 240 },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Founders launching a first product</strong> and unsure what to charge.</>, delay: 0 },
  { icon: ICON_CLOCK, text: <><strong>Businesses that haven’t changed prices in years</strong> while costs and value have grown.</>, delay: 60 },
  { icon: ICON_SHIELD, text: <><strong>Teams relying on heavy discounts</strong> to close deals.</>, delay: 120 },
  { icon: ICON_TIERS, text: <><strong>Companies adding new plans or products</strong> that need a clear package structure.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does pricing strategy work cost?", a: <>It depends on scope: how many products, segments, and research steps are included. <strong>We share pricing on the call.</strong></> },
  { q: "Will raising prices make us lose customers?", a: <>Some risk always exists. <strong>Research and a careful rollout plan</strong> help you understand that risk before making changes.</> },
  { q: "Do you need our sales data?", a: <>It helps. Past deals, discounts, and win/loss notes make the analysis more accurate, and <strong>we’re happy to sign an NDA.</strong></> },
  { q: "Can you guarantee more revenue?", a: <>No. Pricing outcomes depend on your market and execution. <strong>Our work gives you clearer evidence for your pricing decisions.</strong></> },
  { q: "How often should we review pricing?", a: <>At least once a year, and <strong>whenever you launch a new offer, enter a new market, or see costs change.</strong></> },
  { q: "Which pricing model will you recommend?", a: <>Whichever fits how your buyers get value: we compare cost-plus, value-based, tiered, usage, subscription, and freemium, then <strong>recommend one with the reasoning behind it.</strong></> },
];

/* -------- page -------- */

export default function PricingStrategyView() {
  return (
    <div className="ps-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Business & Startup Advisory", href: "/business-advisory" }}
        line1="Set prices on the value you"
        line2={
          <>
            deliver, not <span className="grad-text">guesswork.</span>
          </>
        }
        lead={
          <>
            Pricing research, models, and packaging for startups and growing businesses,{" "}
            <strong>launching a new offer or rethinking what you charge.</strong>
          </>
        }
        primary={{ label: "Book a pricing call", href: "/start-project" }}
        secondary={{ label: "See our services ↓", href: "#services" }}
      >
        <LeverCard />
      </ServiceDetailHero>

      <TrustBar items={["Value-based, not guesswork", "Customer willingness-to-pay research", "Model, tiers & discount rules", "Rollout plan included"]} />

      {/* WHY (dark, stats) */}
      <section className="band dark" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why pricing deserves attention</span>
            <h2>Small changes to price often matter more than big changes to volume.</h2>
            <p>Research on large companies shows price is one of the strongest levers on profit, in both directions.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="ps-stat-note">
            Results vary by industry and business model. <strong>But the direction is consistent: pricing deserves a strategy, not a guess.</strong>
          </Reveal>
        </div>
      </section>

      {/* SERVICES: 8 CARDS */}
      <section className="band tint" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we provide</span>
            <h2>Choose one area, or combine them into a full pricing project.</h2>
          </Reveal>
          <Reveal className="ps-svc-grid">
            {SERVICES.map((svc) => (
              <article className="ps-svc" key={svc.title}>
                <span className="si">{svc.icon}</span>
                <div>
                  <h3>{svc.title}</h3>
                  <p>{svc.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MODEL TABLE */}
      <section className="band" id="models">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing models compared</span>
            <h2>There’s no single right model.</h2>
            <p>The best fit depends on how customers get value from what you sell.</p>
          </Reveal>
          <Reveal className="ps-mo-tbl">
            <div className="ps-mo-row head">
              <div>Model</div>
              <div>How it works</div>
              <div className="mc3">Often fits</div>
              <div className="mc4">Watch out for</div>
            </div>
            {MODELS.map((m) => (
              <div className="ps-mo-row" key={m.name}>
                <div className="mn">{m.name}</div>
                <div>{m.how}</div>
                <div className="mc3">{m.fits}</div>
                <div className="mc4">{m.watch}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="ps-mo-note">
            We recommend a model based on <strong>how your buyers actually get value</strong>, not what’s trendy.
          </Reveal>
        </div>
      </section>

      {/* GOOD BETTER BEST */}
      <section className="band tint" id="gbb">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Building Good–Better–Best tiers</span>
            <h2>Three well-designed tiers help buyers choose, without a long sales call.</h2>
            <p>Each tier has a clear job.</p>
          </Reveal>
          <Reveal className="ps-gbb-grid">
            {TIERS.map((tier) => (
              <article className={`ps-gbb${tier.best ? " best" : ""}`} key={tier.title}>
                <span className="gbadge">{tier.badge}</span>
                <h3>{tier.title}</h3>
                <p className="gsub">{tier.sub}</p>
                <ul>
                  {tier.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* REVENUE LEAK */}
      <section className="band" id="leak">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where revenue leaks</span>
            <h2>The price on your page isn’t always the price you collect.</h2>
            <p>Small concessions add up between list price and what lands in the bank.</p>
          </Reveal>
          <Reveal className="ps-leak-wf">
            {LEAKS.map((row) => (
              <div className={`ps-lw ${row.kind}`} key={row.label}>
                <div className="ll">
                  {row.label}
                  <small>{row.sub}</small>
                </div>
                <div className="lbar">
                  <div className="lfill" style={{ width: row.width }}></div>
                </div>
                <div className="lv">{row.value}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="ps-leak-note">
            Illustrative shape only. <strong>A pricing audit shows where your own revenue leaks.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="band tint" id="receive">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you receive</span>
            <h2>Research, a model, and a rollout plan, in plain language.</h2>
          </Reveal>
          <Reveal className="ps-rec-grid">
            {RECEIVE.map((item) => (
              <div className="ps-reci" key={item.text}>
                <span className="rk">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Review → research → design → roll out.</h2>
            <p>Timelines depend on scope and how many products or segments are included.</p>
          </Reveal>
          <div className="ps-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="ps-step" key={step.title} style={d(step.delay)}>
                <span className="ps-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>If you’re guessing at price, or discounting to win, this is for you.</h2>
          </Reveal>
          <div className="ps-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="ps-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every pricing project." />

      <CtaBand
        id="start"
        eyebrow="Pricing Strategy"
        heading="Price with confidence."
        copy={
          <>
            Book a pricing call to talk through your offer, your buyers, and where your pricing could improve:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll look at what you sell and how you set prices today.</strong>
          </>
        }
        primaryLabel="Book a pricing call"
        primaryHref="/start-project"
        secondary={{ label: "See our services", href: "#services", arrow: "↗" }}
      />
    </div>
  );
}
