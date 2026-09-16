"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
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
import "./ads-page.css";

/* -------- icons -------- */

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_UP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M6 9l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_NODES = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_SPARK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_LAYOUT = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M4 9h16M9 9v11" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_DOC_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m9 17 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    <path d="M6 6 5 3H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_CART_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_LIST = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    <path d="M8 19c-1 1-1 2-1 2s1 0 2-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_ROCKET_PANEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
  </svg>
);

const ICON_ROCKET_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_AUDIT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2M9 11h4M11 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: performance card -------- */

function useCountUp(target: number, active: boolean, instant: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || instant) return;
    let start: number | null = null;
    let raf = 0;
    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, instant, target]);
  return instant ? target : value;
}

const FUNNEL = [
  { label: "Clicks", w: "100%", count: 1840 },
  { label: "Leads", w: "34%", count: 126 },
  { label: "Sales", w: "15%", count: 41 },
];

function FunnelRow({ label, w, count, active, instant }: { label: string; w: string; count: number; active: boolean; instant: boolean }) {
  const value = useCountUp(count, active, instant);
  return (
    <div className="ads-pf-row">
      <span className="fl">{label}</span>
      <span className="ads-pf-track">
        <span className="ads-pf-fill" style={{ "--w": w } as CSSProperties}></span>
      </span>
      <span className="fc">{value.toLocaleString()}</span>
    </div>
  );
}

function PerfCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1000);
    return () => clearTimeout(t);
  }, []);
  const run = reduce || started;
  return (
    <SignatureCard
      ariaLabel="A sample performance snapshot"
      className={`ads-perf${run ? " run" : ""}`}
      live="Performance · This month"
      corner="LEADS, NOT CLICKS"
      footLeft="Every dollar traced"
      footRight="to a customer →"
    >
      <div className="ads-perf-stats">
        <div className="ads-pstat">
          <span className="k">Ad spend</span>
          <span className="v">$4,200</span>
        </div>
        <div className="ads-pstat hl">
          <span className="k">Revenue</span>
          <span className="v">$27,700</span>
          <span className="sub">6.6× ROAS</span>
        </div>
      </div>
      <div className="ads-perf-fun">
        {FUNNEL.map((row) => (
          <FunnelRow key={row.label} label={row.label} w={row.w} count={row.count} active={run} instant={reduce} />
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why Google Ads still wins -------- */

const FEATURES = [
  { icon: ICON_SEARCH, title: "Buyers, not browsers", text: <>Search ads catch people at <strong>the exact moment</strong> they’re looking for what you sell.</> },
  { icon: ICON_UP, title: "Immediate visibility", text: <>SEO takes months. Google Ads puts you at the top <strong>the same day</strong> the campaign goes live.</>, delay: 60 },
  { icon: ICON_CHART, title: "Measurable, dollar-for-dollar", text: <>You know exactly what you spent, <strong>how many leads it produced,</strong> and what each cost.</>, delay: 120 },
  { icon: ICON_BARS, title: "Scales when you scale", text: <>More budget = more leads. <strong>Try that with organic traffic.</strong></> },
  { icon: ICON_NODES, title: "Works with everything else", text: "Paid search fills the gap while SEO builds; retargeting brings back leads other channels didn’t close.", delay: 60 },
  { icon: ICON_SPARK, title: "Fastest paid channel to ROI", text: <>Done right, it’s the fastest route to positive ROI. <strong>Done wrong, the fastest way to burn a budget.</strong></>, delay: 120 },
];

/* -------- the problem with most ads agencies -------- */

const PAINS = [
  { title: "Hidden pricing", text: "“Book a call for a quote” — then $3K–$15K/mo minimum on a 12-month contract." },
  { title: "High minimum spend", text: "Many won’t take you under $10K+/mo on ads — which kills small-business budgets.", delay: 60 },
  { title: "“Set and forget”", text: "Built in month one, then coasting on autopilot while you’re invoiced monthly.", delay: 120 },
  { title: "Vanity reports", text: "Full of impressions and clicks — zero mention of leads, revenue, or ROAS." },
  { title: "Wasted spend", text: "Broad match with no negative lists eats budget — and most agencies never clean it up.", delay: 60 },
  { title: "No landing page work", text: "Great ad, weak homepage. Ads team blames the site; site team blames the ads.", delay: 120 },
];

/* -------- what's included -------- */

const INCLUDED = [
  { icon: ICON_SEARCH, no: "01 · Free", title: "Ads account audit", text: <>Structure, wasted spend, search terms, tracking accuracy, and Quality Score — <strong>a prioritized fix list before we ever charge you.</strong></> },
  { icon: ICON_LAYOUT, no: "02", title: "Strategy & campaign build", text: <>Goals and KPIs defined, buyer-intent keywords, brand vs non-brand separation, bid strategy, and budget pacing — <strong>not a template.</strong></> },
  { icon: ICON_LINES, no: "03", title: "Ad creation & copywriting", text: <>Responsive search ads, extensions, A/B testing, plus display, video, and Shopping copy — <strong>written to match intent.</strong></> },
  { icon: ICON_SHIELD_CHECK, no: "04", title: "Conversion tracking", text: <>GA4, enhanced conversions, call tracking, CRM/offline imports, Consent Mode v2 — <strong>the #1 reason accounts underperform, fixed.</strong></> },
  { icon: ICON_REFRESH, no: "05", title: "Ongoing optimization", text: <>Smart Bidding tuning, search-term mining, negative keywords, audience testing, and budget shifts — <strong>weekly, not autopilot.</strong></> },
  { icon: ICON_DOC_CHECK, no: "06", title: "Landing pages & CRO", text: "We optimize the destination alongside the ad — audits, new builds, and A/B testing of headlines, offers, and CTAs." },
];

/* -------- business types (interactive) -------- */

type BusinessType = { key: string; icon: ReactNode; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const TYPES: BusinessType[] = [
  {
    key: "ecom",
    icon: ICON_CART,
    btnName: "E-commerce",
    btnSub: "Shopping & PMax",
    name: "Google Ads for E-commerce",
    tag: "Shopping, Performance Max, and product-feed work for online stores.",
    items: [
      "Merchant Center setup & feed optimization",
      "Shopping structure by product margin",
      "Performance Max with brand exclusions",
      "ROAS-focused bidding",
      "Cart-abandonment retargeting",
      "Seasonal & promo campaign planning",
    ],
  },
  {
    key: "local",
    icon: ICON_PIN,
    btnName: "Local businesses",
    btnSub: "Service-area",
    name: "Google Ads for Local Businesses",
    tag: "For plumbers, dentists, lawyers, salons — anyone with a service area.",
    items: [
      "Local Services Ads (Google Guaranteed)",
      "High-intent local keyword targeting",
      "Call-only & call-extension campaigns",
      "Service-area & radius targeting",
      "Google Business Profile integration",
      "Local landing-page optimization",
    ],
  },
  {
    key: "leadgen",
    icon: ICON_LIST_CHECK,
    btnName: "Lead generation",
    btnSub: "Qualified leads",
    name: "Google Ads for Lead Generation",
    tag: "For service businesses that need qualified leads, not just clicks.",
    items: [
      "Cost-per-lead (CPL) target modeling",
      "High-intent keyword strategy",
      "Landing page + form optimization",
      "CRM & offline conversion imports",
      "Lead-quality scoring & feedback loops",
      "Remarketing to warm leads",
    ],
  },
  {
    key: "b2b",
    icon: ICON_BRIEFCASE,
    btnName: "B2B & SaaS",
    btnSub: "Long sales cycles",
    name: "Google Ads for B2B & SaaS",
    tag: "For businesses with long sales cycles and high customer values.",
    items: [
      "LTV & payback-period based budgeting",
      "Company & job-title audience targeting",
      "Content-driven top-of-funnel campaigns",
      "Retargeting the full buying committee",
      "Pipeline reporting (not just leads)",
      "HubSpot / Salesforce integration",
    ],
  },
  {
    key: "startup",
    icon: ICON_ROCKET,
    btnName: "Startups",
    btnSub: "Traction fast",
    name: "Google Ads for Startups",
    tag: "For new businesses that need traction fast without wasting a small budget.",
    items: [
      "Low-minimum-spend campaign structure",
      "Fast validation of buyer intent & channels",
      "Quick-win keyword targeting",
      "Landing-page A/B testing from day one",
      "Weekly (not monthly) optimization",
      "Runway-aware budget pacing",
    ],
  },
  {
    key: "audit",
    icon: ICON_AUDIT,
    btnName: "Ads audit",
    btnSub: "One-off review",
    name: "Google Ads Audit",
    tag: "A deep, one-off review of your existing account — no commitment.",
    items: [
      "Full account structure review",
      "Wasted spend & search-term analysis",
      "Conversion-tracking accuracy check",
      "Quality Score & landing-page review",
      "Competitor & auction insights",
      "Prioritized fix list + strategy doc",
    ],
  },
];

/* the panel's big icon for "Startups" drops the flame stroke, as in the design's tyData */
const PANEL_ICONS: Record<string, ReactNode> = { startup: ICON_ROCKET_PANEL };

function TypesExplorer() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ty = TYPES[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = TYPES.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    btnRefs.current[next]?.focus();
  }

  return (
    <Reveal className="ads-ty-wrap" id="types-int">
      <div className="ads-ty-list" role="tablist" aria-label="Business types">
        {TYPES.map((item, i) => (
          <button
            key={item.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="ads-ty-btn"
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
      <div className="ads-ty-panel">
        <div className="ads-tp-top">
          <span className="big">{PANEL_ICONS[ty.key] ?? ty.icon}</span>
          <div>
            <h3>{ty.name}</h3>
            <div className="tagline">{ty.tag}</div>
          </div>
        </div>
        <div className="ads-tp-body ads-tp-fade" key={ty.key}>
          <span className="k">What’s included</span>
          <div className="ads-tp-list">
            {ty.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <a className="ads-tp-cta" href="#start">
            See full details <span className="arw">↗</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who it's for -------- */

const WHO = [
  { icon: ICON_PIN, text: <><strong>A local service business</strong> — plumbers, HVAC, legal, dental. High-intent local searches convert fast.</> },
  { icon: ICON_CART_PLAIN, text: <><strong>An e-commerce store</strong> with a real catalog and margins to support paid traffic. Shopping is especially strong.</>, delay: 60 },
  { icon: ICON_LIST, text: <><strong>A lead-gen business</strong> with a defined cost-per-lead you can pay and still hit margin.</>, delay: 120 },
  { icon: ICON_BRIEFCASE, text: <><strong>A B2B or SaaS company</strong> with buyers who search for solutions to a known problem.</> },
  { icon: ICON_ROCKET_PLAIN, text: <><strong>A new business</strong> that needs immediate visibility while SEO builds in the background.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Already running ads</strong> with mediocre results — and want a real audit, not another monthly report.</>, delay: 120 },
];

/* -------- how it works -------- */

const STEPS = [
  { no: "1", when: "Week 1", title: "Audit & strategy", text: "Free audit, then a plain-language strategy doc: what to launch, what to fix, what to expect." },
  { no: "2", when: "Week 2", title: "Tracking & foundation", text: "Conversion tracking rebuilt, Merchant Center configured, audiences created, landing pages reviewed.", delay: 70 },
  { no: "3", when: "Weeks 3–4", title: "Campaign launch", text: "Campaigns built, tested, and live. Small budget tweaks daily; bigger shifts weekly.", delay: 140 },
  { no: "4", when: "Months 2–3", title: "Optimize & scale", text: "Shift budget to winners, expand top keywords, launch remarketing, test new campaign types.", delay: 210 },
  { no: "5", when: "Ongoing", title: "Report & refine", text: "Monthly plain-language reports, quarterly strategy reviews, continuous testing.", delay: 280 },
];

/* -------- pricing -------- */

const TIERS = [
  { name: "Starter Ads", best: "Under $2K/mo on ads — one campaign type, monthly reporting.", price: "Published /mo" },
  { name: "Growth Ads", best: "Growing accounts — multiple campaign types, remarketing, weekly optimization.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Ads", best: "Larger accounts & e-commerce — Shopping/PMax, feed management, daily optimization.", price: "Published /mo", delay: 140 },
  { name: "One-off Audit", best: "A deep audit + strategy doc for your existing account — no ongoing commitment.", price: "Published", delay: 210 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much should I spend on Google Ads?", a: <>Enough to generate <strong>15–30 conversions/month per campaign</strong> so Google’s AI has data to optimize. For most small businesses that’s $1K–$3K/mo; for e-commerce or competitive B2B, $5K–$50K+.</> },
  { q: "Do you have a minimum ad spend?", a: <>No. Most agencies won’t take clients under $5K–$10K/mo. <strong>We’ll work with whatever spend makes sense</strong> — including under $1K/mo.</> },
  { q: "How long before I see results?", a: <>Traffic and clicks day one. Real conversion data usually takes <strong>30–90 days;</strong> meaningful ROAS improvements typically compound from month 2 onward.</> },
  { q: "Do you take a percentage of ad spend?", a: <>No. A <strong>flat monthly management fee,</strong> published on our pricing page. Your ad spend goes directly to Google — we never mark it up.</> },
  { q: "Already running ads with another agency?", a: <>Start with our free audit. Most accounts waste <strong>20–40% of spend</strong> on preventable issues — the savings alone often cover our fee.</> },
  { q: "Do I own the account?", a: <>Yes. Every account is <strong>under your ownership</strong> — you’re the primary holder, we’re a manager. If you leave, you keep everything.</> },
  { q: "Google Ads vs SEO?", a: <>Ads are paid — instant, but stop when you stop paying. SEO is organic — slower to build but compounds. <strong>Most businesses do both.</strong></> },
  { q: "Do you work with e-commerce?", a: <>Yes — Shopping and Performance Max are core, including <strong>feed optimization, Merchant Center setup, and ROAS-focused bidding.</strong></> },
  { q: "Do you handle landing pages?", a: <>Yes — landing pages are part of every engagement. We review, recommend, and (if needed) <strong>build new pages designed to convert paid traffic.</strong></> },
  { q: "Can you run Microsoft (Bing) Ads too?", a: <>Yes — often underused with <strong>lower CPCs.</strong> We can add it to any engagement at a reduced fee since much of the setup mirrors Google.</> },
];

export default function GoogleAdsView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        eyebrow="Search · Shopping · Performance Max · YouTube"
        line1="Turn ad spend into"
        line2={
          <>
            actual <span className="grad-text">customers.</span>
          </>
        }
        lead={
          <>
            Google Ads measured in <strong>leads, revenue, and ROAS</strong> — not impressions and CPCs no one can spend.
            Search, Shopping, Performance Max, YouTube, and remarketing — one team, published prices, no minimum spend, no
            long lock-in.
          </>
        }
        primary={{ label: "Book a free ads audit", href: "/start-project" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <PerfCard />
      </ServiceDetailHero>

      <TrustBar items={["Certified Google Ads specialists", "Transparent published pricing", "No minimum ad spend", "Month-to-month"]} />

      {/* WHY */}
      <section className="band" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why Google Ads still wins</span>
            <h2>The highest-intent traffic on the internet.</h2>
            <p>Someone typing “emergency plumber Raleigh” isn’t browsing — they’re ready to buy. Google Ads puts you in front of that person immediately.</p>
          </Reveal>
          <div className="ads-why">
            <FeatureGrid cards={FEATURES} columns={3} />
          </div>
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most ads agencies</span>
            <h2>You’ve probably seen a few of these.</h2>
            <p>If you’ve worked with an ads agency before, these will look familiar — and we built our service to fix every one.</p>
          </Reveal>
          <div className="ads-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="ads-pain" key={pain.title} style={d(pain.delay ?? 0)}>
                <span className="pk">{X_ICON}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="ads-pain-note">
            <span className="mk">{CHECK}</span>
            <p>
              We built our Google Ads service to fix <span className="ads-gt">every one of those.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>The whole program, run by one team.</h2>
            <p>Strategy, campaign build, optimization, tracking, and reporting — nothing handed off, nothing on autopilot.</p>
          </Reveal>
          <Reveal className="ads-inc-grid">
            {INCLUDED.map((item) => (
              <div className="ads-inc" key={item.title}>
                <span className="ii">{item.icon}</span>
                <div>
                  <span className="in-no">{item.no}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <NoteCallout style={{ marginTop: 22 }}>
            07 — <strong>Reporting & strategy reviews:</strong> monthly plain-language reports (revenue, leads, ROAS, CPA),
            live dashboard access, quarterly strategy reviews, and direct Slack or email access to your account manager.
            Never just “here’s the dashboard.”
          </NoteCallout>
        </div>
      </section>

      {/* TYPES (interactive) */}
      <section className="band tint" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Built for your business type</span>
            <h2>Google Ads works differently for everyone.</h2>
            <p>It depends on who you’re selling to and what you’re selling. Pick your type — see the package built for it.</p>
          </Reveal>
          <TypesExplorer />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>You get the biggest return if you’re…</h2>
          </Reveal>
          <div className="ads-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="ads-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Wins fast — built for durable performance.</h2>
          </Reveal>
          <div className="ads-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="ads-step" key={step.no} style={d(step.delay ?? 0)}>
                <span className="ads-step-no">{step.no}</span>
                <span className="stt">{step.when}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No 12-month contracts, no hidden fees, no minimum ad spend. Retainers are month-to-month.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Ad spend is separate from management fees and paid directly to
            Google — we never mark it up or take a cut. Every exact number is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="Google Ads · Paid Search"
        heading="Stop guessing what your ad spend is doing."
        copy={
          <>
            Book a free Google Ads audit. We’ll show where your budget goes, what’s working, what’s wasting spend, and what
            it’d take to grow —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation, no minimum spend.</strong>
          </>
        }
        primaryLabel="Book a free ads audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
