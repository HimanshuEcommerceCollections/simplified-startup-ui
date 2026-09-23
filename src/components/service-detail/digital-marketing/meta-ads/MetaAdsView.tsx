"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  FeatureGrid,
  NoteCallout,
  PricingTiers,
  ProblemSolve,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./meta-page.css";

/* -------- icons -------- */

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const ICON_PLAY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M8 5v14l11-7z" fill="currentColor" />
  </svg>
);

const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const ICON_TARGET_PANEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_LINES_TAPER = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_AUDIT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2M9 11h4M11 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_PERSON_PLUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 8h4M19 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_CART = (
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
  </svg>
);

const ICON_ROCKET_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: live campaign card -------- */

const METRICS = [
  { k: "Spend", v: "$2,400" },
  { k: "Revenue", v: "$11,280" },
  { k: "ROAS", v: "4.7×", hl: true },
];

function CampaignCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);
  // reduced motion: the metrics and chips are shown in their end state on first paint
  const run = reduce || started;
  return (
    <SignatureCard
      ariaLabel="A sample Meta ads campaign performance"
      className={`meta-camp${run ? " run" : ""}`}
      live="Campaign · Live"
      corner="FLAT FEE · NO % OF SPEND"
      footLeft="Creative + media buying"
      footRight="one team →"
    >
      <div className="meta-camp-cre">
        <span className="thumb">
          <span className="rl">Reel</span>
          <span className="pl">{ICON_PLAY}</span>
        </span>
        <span className="cc">
          <span className="adname">Summer Drop — UGC video</span>
          <span className="adtxt">“The tote everyone’s asking about — back in stock.”</span>
          <span className="cta">Shop now</span>
        </span>
      </div>
      <div className="meta-camp-mx">
        {METRICS.map((m) => (
          <div className={`meta-mx${m.hl ? " hl" : ""}`} key={m.k}>
            <span className="mk">{m.k}</span>
            <span className="mv">{m.v}</span>
          </div>
        ))}
      </div>
      <div className="meta-camp-chips">
        <span className="meta-cchip">{CHECK}Pixel</span>
        <span className="meta-cchip">{CHECK}CAPI</span>
        <span className="meta-cchip win">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Winning · scaling
        </span>
      </div>
    </SignatureCard>
  );
}

/* -------- why Meta ads still deliver -------- */

const FEATURES = [
  { icon: ICON_TARGET, title: "Massive reach, precise targeting", text: <>Reach almost any US audience by <strong>interest, behavior, location, or lookalike.</strong></> },
  { icon: ICON_BOLT, title: "Creative is the unfair advantage", text: <>Great creative beats a big budget with weak creative. <strong>Small brands win here every day.</strong></>, delay: 60 },
  { icon: ICON_LINES, title: "Full-funnel in one platform", text: <>Awareness with Reels, consideration with carousels, conversion with retargeting — <strong>one ad account.</strong></>, delay: 120 },
  { icon: ICON_CLOCK, title: "Fast feedback loop", text: <>Test five creatives Monday, know the winner by Friday. <strong>Nothing compares for speed.</strong></> },
  { icon: ICON_REFRESH, title: "Retargeting that closes", text: <>80% don’t buy on the first visit. Retargeting brings them back <strong>at a fraction of the CPC.</strong></>, delay: 60 },
  { icon: ICON_CHART, title: "Fastest way to scale", text: <>Sales for e-commerce, leads for services, awareness for new brands — <strong>done right, nothing’s faster.</strong></>, delay: 120 },
];

/* -------- stats (dark, count-up) -------- */

type Stat = {
  /** Counts up on view when set; otherwise `value` is shown as-is. */
  target?: number;
  suffix?: string;
  value?: string;
  label: string;
  text: string;
  delay: number;
};

const STATS: Stat[] = [
  { target: 3, suffix: "B+", label: "Monthly reach", text: "People on Facebook & Instagram every month — whatever your buyer looks like, they’re here.", delay: 0 },
  { target: 76, suffix: "%", label: "Of spend wasted", text: "By Meta’s own numbers — because most agencies set campaigns once and let the algorithm coast.", delay: 80 },
  { value: "30–50%", label: "Data lost since iOS 14", text: "The Pixel alone loses this much conversion data. Only a proper Conversions API setup recovers it.", delay: 160 },
];

function formatStat(value: number, decimals: boolean, suffix: string) {
  return `${decimals ? value.toFixed(1) : Math.round(value)}${suffix}`;
}

function StatValue({ target, suffix, run, reduce }: { target: number; suffix: string; run: boolean; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const decimals = target % 1 !== 0;

  useEffect(() => {
    if (!run || reduce) return;
    let start: number | null = null;
    let raf = 0;
    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = formatStat(eased * target, decimals, suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, suffix, decimals, run, reduce]);

  return (
    <div className="sv" ref={ref}>
      {reduce ? formatStat(target, decimals, suffix) : "0"}
    </div>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  // Design fires the count-up once #stats' top passes 85% of the viewport.
  const [gridRef, gridIn] = useInView<HTMLDivElement>({ threshold: 0, rootMargin: "0px 0px -15% 0px" });

  return (
    <div className="meta-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <Reveal className="meta-stat" key={stat.label} style={d(stat.delay)}>
          {stat.target !== undefined ? (
            <StatValue target={stat.target} suffix={stat.suffix ?? ""} run={gridIn} reduce={reduce} />
          ) : (
            <div className="sv">{stat.value}</div>
          )}
          <span className="sk">{stat.label}</span>
          <p>{stat.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- the problem with most Meta ads agencies -------- */

const PROBLEMS = [
  { icon: X_ICON, title: "They charge % of ad spend", text: <>They win when you <strong>spend more</strong> — not when you make more. Misaligned incentives by design.</> },
  { icon: X_ICON, title: "76% of spend wasted", text: <>Meta’s own number. Most agencies set campaigns up once and <strong>let the algorithm coast.</strong></>, delay: 60 },
  { icon: X_ICON, title: "Creative split from media buying", text: <>Two agencies who <strong>blame each other</strong> when performance drops. Nobody owns the result.</>, delay: 120 },
  { icon: X_ICON, title: "They ignore iOS / CAPI tracking", text: <>The Pixel alone loses 30–50% of conversion data. <strong>Most never set up the Conversions API properly.</strong></> },
  { icon: X_ICON, title: "They report vanity metrics", text: <>Reach, impressions, CPMs — numbers that look big but <strong>don’t pay the bills.</strong></>, delay: 60 },
  { icon: X_ICON, title: "$5K–$10K minimum spends", text: <>Which <strong>prices out most small businesses</strong> that could actually benefit from Meta ads.</>, delay: 120 },
];

/* -------- what's included (8) -------- */

const INCLUDED = [
  { icon: ICON_AUDIT, no: "01", title: "Free ads account audit", text: "Structure review, wasted-spend + audience-overlap analysis, Pixel/CAPI accuracy check, and a plain-language fix list." },
  { icon: ICON_LINES_TAPER, no: "02", title: "Strategy & structure", text: "KPI definition, full-funnel campaign structure, audience segmentation, budget allocation, bid strategy, testing framework." },
  { icon: ICON_BOLT, no: "03", title: "Creative production", text: "Creative is 80% of performance — static, carousel, video, Reels-native, UGC-style ads, hooks, and weekly refresh." },
  { icon: ICON_PERSON_PLUS, no: "04", title: "Audience & targeting", text: "Custom + lookalike audiences, interest/behavior targeting, retargeting layers, Advantage+ testing, and exclusions." },
  { icon: ICON_SHIELD_CHECK, no: "05", title: "Tracking (Pixel + CAPI)", text: "The #1 reason ads underperform — Pixel + Conversions API, server-side tracking, enhanced match, GA4 + CRM." },
  { icon: ICON_REFRESH, no: "06", title: "Ongoing optimization", text: "Weekly creative rotation, audience scaling, bid/budget adjustments, ad-set consolidation, placement optimization." },
  { icon: ICON_PHONE, no: "07", title: "Landing pages & post-click", text: "The best ad can’t save a bad landing page — audit, optional build, A/B testing, mobile-first (90% of traffic)." },
  { icon: ICON_CHART, no: "08", title: "Reporting & reviews", text: "Monthly plain-language report (revenue, leads, ROAS, CPA), creative breakdown, live dashboard, quarterly reviews." },
];

/* -------- business types (interactive) -------- */

type BusinessType = { key: string; icon: ReactNode; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const TYPES: BusinessType[] = [
  {
    key: "ecom",
    icon: ICON_CART,
    btnName: "E-commerce",
    btnSub: "Scalable sales",
    name: "Meta Ads for E-commerce",
    tag: "For online stores that need scalable sales, not just cheap traffic.",
    items: [
      "Catalog + Shop setup & product feed sync",
      "Advantage+ Shopping Campaigns (ASC)",
      "Dynamic product retargeting",
      "ROAS-focused creative testing",
      "Cart abandonment funnels",
      "Seasonal & promo campaign planning",
    ],
  },
  {
    key: "local",
    icon: ICON_PIN,
    btnName: "Local businesses",
    btnSub: "Bookings & walk-ins",
    name: "Meta Ads for Local Businesses",
    tag: "For salons, gyms, restaurants, clinics — anyone drawing local customers.",
    items: [
      "Radius & location-based targeting",
      "Click-to-message & lead form ads",
      "Local awareness + retargeting layer",
      "Reels & short-form video for reach",
      "Instagram profile optimization",
      "Booking-focused landing pages",
    ],
  },
  {
    key: "lead",
    icon: ICON_LIST_CHECK,
    btnName: "Lead generation",
    btnSub: "Qualified, at a CPL",
    name: "Meta Ads for Lead Generation",
    tag: "For service businesses that need qualified leads at a defined CPL.",
    items: [
      "Instant Form (lead form) campaigns",
      "Landing page + form optimization",
      "Lead quality scoring",
      "CRM + Zapier integration",
      "Retargeting for warm leads",
      "Cost-per-qualified-lead reporting",
    ],
  },
  {
    key: "b2b",
    icon: ICON_BRIEFCASE,
    btnName: "B2B & SaaS",
    btnSub: "High LTV, long cycle",
    name: "Meta Ads for B2B & SaaS",
    tag: "For businesses with high customer values and long sales cycles.",
    items: [
      "Job title & industry-based audiences",
      "Content-driven top-of-funnel campaigns",
      "Retargeting across the buying committee",
      "LTV-based budget modeling",
      "Pipeline (not just lead) reporting",
      "HubSpot / Salesforce integration",
    ],
  },
  {
    key: "launch",
    icon: ICON_ROCKET,
    btnName: "New brand launches",
    btnSub: "Awareness fast",
    name: "Meta Ads for New Brand Launches",
    tag: "For startups and new products that need to build awareness fast.",
    items: [
      "Founder / brand-story creative",
      "Reels & short-form video for reach",
      "Broad audience testing to find winners",
      "Influencer whitelisting (partnership ads)",
      "Waitlist & pre-launch campaigns",
      "Momentum-focused reporting",
    ],
  },
  {
    key: "audit",
    icon: ICON_AUDIT,
    btnName: "Meta Ads Audit",
    btnSub: "One-off review",
    name: "Meta Ads Audit",
    tag: "A deep one-off review of your existing account — no commitment.",
    items: [
      "Full account structure review",
      "Wasted spend & audience overlap analysis",
      "Pixel + Conversions API accuracy check",
      "Creative performance breakdown",
      "iOS 14+ tracking review",
      "Prioritized fix list + strategy doc",
    ],
  },
];

/* The design's script renders the "audit" panel on load, so that is the initial tab. */
const INITIAL_TYPE = TYPES.findIndex((t) => t.key === "audit");

function TypesExplorer() {
  const [active, setActive] = useState(INITIAL_TYPE);
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
    <Reveal className="meta-ty-wrap" id="types-int">
      <div className="meta-ty-list" role="tablist" aria-label="Business types">
        {TYPES.map((item, i) => (
          <button
            key={item.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="meta-ty-btn"
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
      <div className="meta-ty-panel">
        <div className="meta-tp-top">
          <span className="big">{ICON_TARGET_PANEL}</span>
          <div>
            <h3>{ty.name}</h3>
            <div className="tagline">{ty.tag}</div>
          </div>
        </div>
        <div className="meta-tp-body meta-tp-fade" key={ty.key}>
          <span className="k">What’s inside</span>
          <div className="meta-tp-list">
            {ty.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who it's for -------- */

const WHO = [
  { icon: ICON_CART, text: <><strong>An e-commerce brand</strong> with a real product and margins — Meta is the top channel for scaling online sales.</> },
  { icon: ICON_PIN, text: <><strong>A local service business</strong> — gym, salon, restaurant, clinic — where visual, location-based ads drive bookings.</>, delay: 60 },
  { icon: ICON_PERSON, text: <><strong>A B2C or DTC brand</strong> selling to consumers who make lifestyle-driven purchase decisions.</>, delay: 120 },
  { icon: ICON_LINES, text: <><strong>A lead-gen business</strong> with a defined CPL you can pay and still hit margin.</> },
  { icon: ICON_ROCKET_PLAIN, text: <><strong>A new brand or product</strong> that needs to build awareness fast — nothing scales reach like Meta.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>“Already running Meta ads”</strong> with mediocre results — and want a real audit and creative strategy, not another report.</>, delay: 120 },
];

/* -------- how it works -------- */

const STEPS = [
  { when: "Week 1", title: "Audit & strategy", text: "Free audit of your account (or competitors if starting fresh). A plain-language strategy doc: what to launch, fix, and expect." },
  { when: "Week 2", title: "Tracking & foundation", text: "Pixel + Conversions API rebuilt properly. Audiences created. Creative brief locked. Landing pages reviewed.", delay: 70 },
  { when: "Weeks 3–4", title: "Creative + launch", text: "First creative batch (static, carousel, video) produced. Campaigns launched. Daily monitoring begins.", delay: 140 },
  { when: "Months 2–3", title: "Test & scale", text: "Weekly creative refreshes. Winning audiences scaled, underperformers cut. Retargeting layered on prospecting.", delay: 210 },
  { when: "Ongoing", title: "Report, review, refine", text: "Monthly plain-language reports, quarterly strategy reviews, continuous creative testing.", delay: 280 },
];

/* -------- pricing -------- */

const TIERS = [
  { name: "Starter Meta", best: "Under $2K/month on ads — one funnel stage, monthly creative refresh.", price: "Published /mo" },
  { name: "Growth Meta", best: "Growing accounts — full funnel, weekly creative testing, retargeting layer.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Meta", best: "Larger accounts & e-commerce — Advantage+ Shopping, catalog work, daily optimization, high creative volume.", price: "Published /mo", delay: 140 },
  { name: "One-off Meta Ads Audit", best: "A deep audit + strategy doc for your existing account, no commitment.", price: "Published", delay: 210 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much should I spend on Meta ads?", a: <>Enough to generate <strong>50+ conversions per week per campaign</strong> so the algorithm can optimize. For most small businesses that’s $1K–$3K/month; for e-commerce or scaling brands, $5K–$100K+.</> },
  { q: "Do you have a minimum ad spend?", a: <>No. Most agencies won’t take clients under $5K–$10K/month. <strong>We work at whatever spend makes sense</strong> — including under $1K/month.</> },
  { q: "Do you take a percentage of my ad spend?", a: <>No — a flat monthly management fee, published up front. Your ad spend goes directly to Meta; we never mark it up or take a cut. <strong>Our incentives stay aligned with your ROI, not your spend.</strong></> },
  { q: "How long before I see results?", a: <>Traffic and engagement day one. Meaningful ROAS/CPL data in <strong>2–4 weeks</strong> as the algorithm learns. Real compounding growth usually starts month 2–3.</> },
  { q: "Do you handle the creative?", a: <>Yes — strategy, briefs, and production included: static, carousel, video, and Reels-native. If you have brand assets or content, <strong>even better; we work with what you have.</strong></> },
  { q: "What about the iOS 14 privacy changes?", a: <>Ads still work — but only with correct tracking. The Pixel alone loses 30–50% of data since iOS 14. <strong>We fix it with the Conversions API and server-side tracking</strong> — which most agencies still skip.</> },
  { q: "Facebook and Instagram both?", a: <>Yes — that’s what “Meta ads” means. Facebook Feed & Stories, Instagram Feed, Reels & Stories, plus Messenger and Audience Network. <strong>We place them where they perform best.</strong></> },
  { q: "Do you run TikTok or LinkedIn ads?", a: <>LinkedIn Ads is a separate service; TikTok can be added on request. <strong>Meta remains the largest paid social channel</strong> for most businesses — which is why it gets its own service.</> },
  { q: "I’m already running ads with another agency — switch?", a: <>Start with our free audit. Most accounts have preventable issues — audience overlap, weak CAPI, ad fatigue, wrong bid strategy. <strong>Often the fixes alone cover our fee.</strong></> },
  { q: "Do I own the ad account?", a: <>Yes — every account we build or manage is under your ownership. You’re the primary owner, we’re a partner. <strong>If you leave, you keep everything.</strong></> },
];

export default function MetaAdsView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        eyebrow="Facebook · Instagram · Reels · Messenger · WhatsApp"
        line1="Ads people actually"
        line2={
          <>
            watch — that <span className="grad-text">sell.</span>
          </>
        }
        lead={
          <>
            Facebook and Instagram ads that drive sales, leads, and repeat customers — not just cheap impressions. Creative
            that stops the scroll, targeting that finds the buyer, tracking that survives iOS updates.{" "}
            <strong>Managed by one team, at published prices, with no minimum spend.</strong>
          </>
        }
        primary={{ label: "Book a free ads audit", href: "/start-project" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <CampaignCard />
      </ServiceDetailHero>

      <TrustBar items={["Creative + media buying, one roof", "Flat fee (no % of ad spend)", "No minimum spend", "Month-to-month"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why Meta ads still deliver</span>
            <h2>3+ billion people, every month — your buyer is one of them.</h2>
            <p>Whatever your customer looks like, they’re there — scrolling, watching Reels, DMing, and shopping. Meta ads show up where their attention already is.</p>
          </Reveal>
          <div className="meta-why">
            <FeatureGrid cards={FEATURES} columns={3} />
          </div>
        </div>
      </section>

      {/* STATS (dark) */}
      <section className="band dark" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The numbers behind the platform</span>
            <h2>Reach is huge — but most spend leaks.</h2>
            <p>Three numbers that explain why Meta is the top paid channel — and why most accounts still underperform.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="meta-stat-note">
            Done right — clean structure, strong creative, and recovered tracking — Meta is the fastest way to scale.{" "}
            <strong>We built our service to fix the leaks most agencies ignore.</strong>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM (amber) */}
      <section className="band" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most Meta ads agencies</span>
            <h2>Overpromise, underdeliver — the pattern we see over and over.</h2>
            <p>The Meta ads space is full of it. Here’s exactly what goes wrong — and what we built our service to fix.</p>
          </Reveal>
          <div className="meta-problem">
            <ProblemSolve
              items={PROBLEMS}
              columns={3}
              draw
              solve={
                <>
                  We built our Meta Ads service to fix <strong>every one of those</strong> — flat fee, one team, proper tracking, no
                  minimum spend.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Strategy to reporting — one team.</h2>
            <p>Everything a Meta ads program needs: strategy, creative, media buying, tracking, and reporting. Eight parts.</p>
          </Reveal>
          <Reveal className="meta-inc-grid">
            {INCLUDED.map((item) => (
              <div className="meta-inc" key={item.no}>
                <div className="ihead">
                  <span className="ii">{item.icon}</span>
                  <div>
                    <span className="in-no">{item.no}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TYPES (interactive) */}
      <section className="band" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Built for your business type</span>
            <h2>Meta ads work differently for everyone.</h2>
            <p>It depends on who you’re selling to and what you sell. Pick your type — see the package built for it.</p>
          </Reveal>
          <TypesExplorer />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>Biggest return if you’re…</h2>
          </Reveal>
          <div className="meta-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="meta-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Early wins, then durable compounding performance.</h2>
            <p>A structured process — every step ends with a deliverable and your sign-off.</p>
          </Reveal>
          <div className="meta-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="meta-step" key={step.when} style={d(step.delay ?? 0)}>
                <span className="meta-step-no">{step.when}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No 12-month contracts, no hidden fees, no minimum ad spend, no % of ad spend.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Ad spend is separate from management fees — paid directly to Meta,
            never marked up. Creative production is included at each tier; heavy video production may be quoted separately.
            Every rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="Meta Ads — Facebook & Instagram"
        heading="Ready for Meta ads that actually deliver customers?"
        copy={
          <>
            Book a free Meta ads audit. We’ll look at where your budget is going, what creative is working, what’s wasting
            spend, and what it would take to grow —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation, no jargon, no minimum spend.</strong>
          </>
        }
        primaryLabel="Book a free ads audit call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
