"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
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
import "./lia-page.css";

/* -------- icons -------- */

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_LI = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const X_LI = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_PANEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="2" />
    <path d="M7 10v5M11 8v7M15 12v3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: live campaign card -------- */

const TARGETS = ["VP / Director", "SaaS · 200–2k", "ABM list", "Retargeting"];

const METRICS = [
  { v: "7.2%", k: "Form conv." },
  { v: "$180", k: "Cost / SQL" },
  { v: "9.4×", k: "Pipeline : spend", hl: true },
];

function CampaignCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);
  // reduced motion: chips and metrics render in their end state on first paint
  const run = reduce || started;
  return (
    <SignatureCard
      ariaLabel="A sample LinkedIn Ads campaign"
      className={`lia-camp${run ? " run" : ""}`}
      live="Campaign · Live"
      corner="FLAT FEE · NO % OF SPEND"
      footLeft="Pipeline, not vanity metrics"
      footRight="you own the account →"
    >
      <div className="lia-camp-ad">
        <span className="co">N</span>
        <span className="cc">
          <b>Northform · Sponsored</b>
          <small>“The RevOps playbook 200+ teams use”</small>
          <span className="cta">Download guide</span>
        </span>
      </div>
      <div className="lia-camp-tgt">
        {TARGETS.map((t) => (
          <span key={t}>
            {CHECK}
            {t}
          </span>
        ))}
      </div>
      <div className="lia-camp-mx">
        {METRICS.map((m) => (
          <div className={`mx${m.hl ? " hl" : ""}`} key={m.k}>
            <span className="v">{m.v}</span>
            <span className="k">{m.k}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why LinkedIn -------- */

const FEATURES = [
  { icon: ICON_PERSON, title: "Reach decision-makers directly", text: <>CEOs, VPs, Directors, Founders, <strong>on a platform they actually check every morning.</strong></> },
  { icon: ICON_TARGET, title: "Target by role, not keyword", text: <>You’re not hoping the right person sees the ad. <strong>You’re guaranteeing it.</strong></>, delay: 60 },
  { icon: ICON_CHART, title: "Bigger deals per lead", text: <>LinkedIn-sourced deals are <strong>28–35% larger</strong> than Google Ads-sourced deals on average.</>, delay: 120 },
  { icon: ICON_SHIELD, title: "Higher intent than social", text: <>People come to LinkedIn to <strong>solve business problems</strong>, not to scroll cat videos.</> },
  { icon: ICON_BRIEFCASE, title: "Perfect for ABM", text: <>Upload your 500 target accounts and <strong>only serve ads to people at those companies.</strong></>, delay: 60 },
  { icon: ICON_DOLLAR, title: "CPCs look expensive: until deal size", text: <>A $200 lead that becomes a $50K contract <strong>beats a $30 lead that becomes a $500 sale, every time.</strong></>, delay: 120 },
];

/* -------- ad formats (8) -------- */

type Format = { name: string; tag?: string; best: string; ctr: string; note: string; win?: boolean };

const FORMATS: Format[] = [
  { name: "Single Image", best: "Everyday feed, all objectives", ctr: "0.44–0.55%", note: "Most-used format, solid baseline" },
  { name: "Video", best: "Brand awareness, product demos", ctr: "0.44–0.65%", note: "Great for view-through recall" },
  { name: "Carousel", best: "Multi-message storytelling", ctr: "0.55%+", note: "Higher engagement per impression" },
  { name: "Document Ads", best: "Mid-funnel lead gen (reports, guides)", ctr: "1.2–2.5%", note: "CPL 30–40% lower than generic forms" },
  { name: "Thought Leader Ads", tag: "2026 winner", best: "Boost an exec’s organic post", ctr: "2.0–5.0%", note: "⚡ ~6× more efficient than standard ads", win: true },
  { name: "Message / Conversation", best: "1-to-1 DM campaigns", ctr: "2–3% open", note: "High-intent, great for demo requests" },
  { name: "Lead Gen Forms", best: "Pre-filled native forms", ctr: "6–12% conv.", note: "2–4× higher conversion than landing pages" },
  { name: "Dynamic / Follower", best: "Grow page followers, employer brand", ctr: "0.3–0.6%", note: "Best for talent / employer campaigns" },
];

function FormatsTable() {
  return (
    <Reveal className="lia-fmt-tbl" role="table" aria-label="LinkedIn ad formats">
      <div className="lia-fmt-row head" role="row">
        <div role="columnheader">Format</div>
        <div role="columnheader">Best for</div>
        <div className="fc3" role="columnheader">CTR</div>
        <div className="fc4" role="columnheader">2026 note</div>
      </div>
      {FORMATS.map((f) => (
        <div className={`lia-fmt-row${f.win ? " win" : ""}`} role="row" key={f.name}>
          <div className="fn" role="cell">
            {f.name}
            {f.tag && <span className="tag">{f.tag}</span>}
          </div>
          <div role="cell">{f.best}</div>
          <div className="fc3 ct" role="cell">
            {f.ctr}
          </div>
          <div className="fc4" role="cell">
            {f.note}
          </div>
        </div>
      ))}
    </Reveal>
  );
}

/* -------- what we don't do (dark) -------- */

const DONTS = [
  { icon: X_ICON, title: "Charge a % of ad spend", text: <>That model incentivizes agencies to spend more of your money, <strong>not to make it work harder.</strong></> },
  { icon: X_ICON, title: "Use Audience Expansion by default", text: <>It broadens targeting past your ICP and <strong>quietly wastes budget.</strong></>, delay: 60 },
  { icon: X_ICON, title: "Send a dashboard and disappear", text: <>Weekly Loom walkthroughs, monthly plain-language reports, <strong>real conversations.</strong></>, delay: 120 },
  { icon: X_ICON, title: "Optimize for CTR alone", text: <>High CTR usually means broad targeting = bad leads. We optimize for <strong>cost per SQL and pipeline value.</strong></> },
  { icon: X_ICON, title: "Lock you into long contracts", text: <>Month-to-month, cancel anytime. <strong>If we’re not producing, we shouldn’t be your agency.</strong></>, delay: 60 },
  { icon: X_ICON, title: "Keep the ad account", text: <>It’s yours from day one, login, billing, campaign history. <strong>If you leave, everything stays with you.</strong></>, delay: 120 },
];

/* -------- what's included (interactive, 6) -------- */

type Included = { key: string; no: string; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const INCLUDED: Included[] = [
  {
    key: "setup",
    no: "1",
    btnName: "Strategy & setup",
    btnSub: "Tracking done right",
    name: "Strategy & Account Setup",
    tag: "The foundation, including the 2026 server-side tracking most agencies skip.",
    items: [
      "LinkedIn Ads audit (if you have campaigns)",
      "ICP + persona mapping",
      "Ad account creation or takeover",
      "LinkedIn Insight Tag installation",
      "Conversion tracking + Lead Gen Form setup",
      "CAPI / server-side tracking (2026 requirement)",
    ],
  },
  {
    key: "audience",
    no: "2",
    btnName: "Audience building",
    btnSub: "ICP-tight + ABM",
    name: "Audience Building",
    tag: "ICP-tight targeting + ABM, not broad audiences that quietly waste budget.",
    items: [
      "Title, seniority, function, industry, size targeting",
      "Matched Audiences (upload account lists for ABM)",
      "Website retargeting from Insight Tag",
      "Lookalike + Predictive Audience testing",
      "Suppression lists (customers, past leads)",
      "Intent data integration (6sense, Bombora, optional)",
    ],
  },
  {
    key: "creative",
    no: "3",
    btnName: "Ad creative",
    btnSub: "Copy + design + video",
    name: "Ad Creative",
    tag: "Copy, design, and video built to earn the click from busy decision-makers.",
    items: [
      "Ad copy (multiple variations per audience)",
      "Static image design (Canva Pro / Figma)",
      "Video ad editing (up to 60 seconds)",
      "Carousel design (up to 10 slides)",
      "Document Ad creation",
      "Thought Leader Ad amplification setup",
    ],
  },
  {
    key: "mgmt",
    no: "4",
    btnName: "Campaign management",
    btnSub: "Test & scale weekly",
    name: "Campaign Management",
    tag: "Daily monitoring, weekly testing, winners scaled, fatigue managed.",
    items: [
      "Campaign structure per objective + audience",
      "Daily bid + budget monitoring",
      "Weekly A/B testing (creative, copy, audiences)",
      "Underperformer pausing + winner scaling",
      "Ad fatigue monitoring (refresh every 2–4 weeks)",
      "Frequency capping to protect ICP audience",
    ],
  },
  {
    key: "leadgen",
    no: "5",
    btnName: "Lead Gen + landing",
    btnSub: "Sync to CRM",
    name: "Lead Gen Form + Landing Page",
    tag: "Native forms + aligned landing pages, synced straight to your CRM.",
    items: [
      "Native LinkedIn Lead Gen Form design + copy",
      "Landing page copy alignment",
      "Progressive forms (short cold, longer warm)",
      "Auto-sync from forms to CRM",
      "Real-time hot-lead alerts (Slack / email / SMS)",
    ],
  },
  {
    key: "report",
    no: "6",
    btnName: "Reporting & optimization",
    btnSub: "Pipeline metrics",
    name: "Reporting & Optimization",
    tag: "Weekly Loom walkthroughs and reports tied to pipeline, not vanity metrics.",
    items: [
      "Weekly Loom walkthrough (5–10 min, plain language)",
      "Monthly report tied to pipeline metrics",
      "Live dashboard (Looker Studio / native)",
      "Cost per SQL + pipeline-to-spend tracking",
      "Full-funnel attribution modeling",
      "Quarterly strategy review + budget reset",
    ],
  },
];

/* The design's script calls renderWb('audit') — a key that doesn't exist — so the
   panel starts on the button marked aria-selected="true" ("setup"). */
const INITIAL_INCLUDED = 0;

function IncludedExplorer() {
  const [active, setActive] = useState(INITIAL_INCLUDED);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = INCLUDED[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = INCLUDED.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    btnRefs.current[next]?.focus();
  }

  return (
    <Reveal className="lia-wb-wrap" id="included-int">
      <div className="lia-wb-list" role="tablist" aria-label="What's included">
        {INCLUDED.map((it, i) => (
          <button
            key={it.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="lia-wb-btn"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{it.no}</span>
            <span className="dn">
              <b>{it.btnName}</b>
              <small>{it.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="lia-wb-panel">
        <div className="lia-wp-top">
          <span className="big">{ICON_PANEL}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        <div className="lia-wp-body lia-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="lia-wp-list">
            {item.items.map((x) => (
              <div key={x}>{x}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who / fit -------- */

const FIT_GOOD: ReactNode[] = [
  <><strong>B2B SaaS</strong> with an ACV over $5K/year, the math almost always works.</>,
  <><strong>Consulting &amp; professional services</strong> with a defined ideal client (industry, revenue, title).</>,
  <><strong>B2B agencies &amp; staffing firms</strong> reaching hiring managers, CMOs, or founders at target companies.</>,
  <><strong>Enterprise tech, cybersecurity, fintech</strong>, large deals, ABM strategy essential.</>,
  <><strong>B2B event marketers</strong> promoting webinars, summits, conferences to specific audiences.</>,
  <><strong>Talent acquisition &amp; employer branding</strong>, LinkedIn is the only game in town.</>,
];

const FIT_BAD: ReactNode[] = [
  <><strong>B2C / consumer brands</strong>, use Meta Ads or Google Ads instead.</>,
  <><strong>Low-ticket products (&lt;$500 ACV)</strong>, the CPC math doesn’t hold up.</>,
  <><strong>Local service businesses</strong> without a B2B arm: Google Local &amp; Meta convert cheaper.</>,
];

function FitGrid() {
  return (
    <Reveal className="lia-fit-grid">
      <div className="lia-fit good">
        <div className="fh">
          <span className="fi">{CHECK_THIN}</span>
          <h3>Where it works</h3>
        </div>
        <ul>
          {FIT_GOOD.map((x, i) => (
            <li key={i}>
              <span className="m">{CHECK_LI}</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="lia-fit bad">
        <div className="fh">
          <span className="fi">{X_ICON}</span>
          <h3>Where it doesn’t</h3>
        </div>
        <ul>
          {FIT_BAD.map((x, i) => (
            <li key={i}>
              <span className="m">{X_LI}</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* -------- how it works -------- */

const STEPS = [
  { when: "Week 1", title: "Strategy + setup", text: "Discovery call, ICP + persona mapping, account audit, Insight Tag + conversion tracking, a 90-day roadmap in plain language." },
  { when: "Week 2", title: "Audiences + creative", text: "Target audiences built (title, company, matched accounts). Ad copy written per persona. Static + video ads designed. Forms configured.", delay: 70 },
  { when: "Week 3", title: "Soft launch", text: "First campaigns at controlled budget. Daily monitoring during ramp. Early leads reviewed with your sales team, feedback loop opened.", delay: 140 },
  { when: "Week 4", title: "Optimize + scale", text: "Kill underperformers, scale winning creatives, refine audiences on early signals. First monthly report + strategy review.", delay: 210 },
  { when: "Ongoing", title: "Weekly cycles", text: "Weekly A/B tests, monthly reports, quarterly deep dives + budget reallocation, creative refresh every 2–4 weeks.", delay: 280 },
];

/* -------- pricing -------- */

const TIERS = [
  { name: "Starter LinkedIn Ads", best: "Small B2B teams testing LinkedIn, single audience, 1–2 ad formats. Ad spend $2K–5K/mo.", price: "Published /mo" },
  { name: "Growth LinkedIn Ads", best: "Most B2B businesses: 3–5 audiences, multi-format, full-funnel with retargeting. Spend $5K–20K/mo.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale LinkedIn Ads", best: "Enterprise + ABM: 10+ audiences, matched account lists, Thought Leader Ads, dedicated strategist. Spend $20K+/mo.", price: "Published /mo", delay: 140 },
  { name: "LinkedIn Ads Audit", best: "One-off deep audit of your existing account, no commitment.", price: "Published", delay: 210 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much do LinkedIn Ads actually cost?", a: <>Two costs: <strong>ad spend + management.</strong> Ad spend starts around $2K/mo minimum for meaningful data, most B2B teams land in $5K–20K/mo. Management fees are published here (Starter/Growth/Scale). <strong>No % of ad spend, ever.</strong></> },
  { q: "What deal size makes it worth it?", a: <>Typically <strong>$5K+ ACV</strong> per customer. Below that the math rarely works: LinkedIn CPCs are 2–3× Google’s. For sub-$5K deals, Google or Meta usually convert better.</> },
  { q: "How is it different from Google Ads?", a: <>Google captures people <strong>actively searching;</strong> LinkedIn reaches people <strong>by job title / company.</strong> LinkedIn CPCs are higher but deals close 28–35% larger. Best answer: run both.</> },
  { q: "Can you run ABM campaigns?", a: <>Yes, one of LinkedIn’s strongest features. Upload a list of <strong>100–2,000 target accounts</strong> and only serve ads to people at those companies. We build ABM for enterprise clients regularly.</> },
  { q: "What are Thought Leader Ads (TLAs)?", a: <>TLAs boost an executive’s organic post as an ad. In 2026 they’re the highest-performing format, <strong>2–5% CTR, ~6× more efficient</strong> than standard image ads. Requires your exec to post regularly.</> },
  { q: "Do I own the ad account?", a: <>Yes, from day one. Login, billing, campaign history all yours. <strong>If you leave, everything stays with you.</strong></> },
];

export default function LinkedInAdsView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        eyebrow="LinkedIn Ads for B2B · SaaS · Consulting · ABM"
        line1="LinkedIn Ads that reach"
        line2={
          <>
            real <span className="grad-text">decision-makers.</span>
          </>
        }
        lead={
          <>
            Managed LinkedIn Ads for B2B, SaaS, consulting, and professional services. We build the campaigns, write the
            ads, launch the funnels, and manage the spend,{" "}
            <strong>with flat monthly fees, transparent reporting, and pipeline metrics that mean something.</strong>
          </>
        }
        primary={{ label: "Book a free LinkedIn Ads audit", href: "/start-project" }}
        secondary={{ label: "See LinkedIn Ads pricing ↓", href: "#pricing" }}
      >
        <CampaignCard />
      </ServiceDetailHero>

      <TrustBar items={["Flat monthly fee (no % of spend)", "Full-funnel attribution", "You own the ad account & data", "Month-to-month"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why LinkedIn is the best B2B paid channel</span>
            <h2>Target by role, not by keyword.</h2>
            <p>
              LinkedIn is the only place you can target by job title, seniority, industry, company size, and skills all at
              once. That precision costs more per click, but the leads are dramatically more qualified.
            </p>
          </Reveal>
          <div className="lia-why">
            <FeatureGrid cards={FEATURES} columns={3} />
          </div>
        </div>
      </section>

      {/* AD FORMATS */}
      <section className="band" id="formats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">LinkedIn ad formats we run</span>
            <h2>Eight formats, each solves a different problem.</h2>
            <p>
              We pick the right mix based on your goals, not what’s trending, usually launching 2–3 formats, testing, and
              scaling the winners.
            </p>
          </Reveal>
          <FormatsTable />
          <Reveal as="p" className="lia-fmt-note">
            We usually launch with <strong>2–3 formats per campaign,</strong> test which perform, and scale the winners.
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do, and why that matters</span>
            <h2>The LinkedIn Ads space is full of budget-wasting shortcuts.</h2>
            <p>We don’t take any of them.</p>
          </Reveal>
          <div className="lia-dont">
            <ProblemSolve
              items={DONTS}
              columns={3}
              draw
              solve={
                <>
                  Flat fee, ICP-tight targeting, real reporting, and <strong>your account, always.</strong>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>End-to-end LinkedIn Ads management.</h2>
            <p>Every piece a working B2B paid program needs, six parts, one team. Pick one to see inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* WHO / FIT */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who LinkedIn Ads is built for</span>
            <h2>Not every business belongs on LinkedIn Ads.</h2>
            <p>Here’s where it works best, and where we’ll honestly point you elsewhere.</p>
          </Reveal>
          <FitGrid />
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A 30-day launch, then steady optimization.</h2>
            <p>Every step ends with a clear deliverable and your sign-off.</p>
          </Reveal>
          <div className="lia-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="lia-step" key={step.when} style={d(step.delay ?? 0)}>
                <span className="lia-step-no">{step.when}</span>
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
            <h2>Flat monthly management fee. No % of spend.</h2>
            <p>Published up front. Ad spend paid directly to LinkedIn from your card, no markup, no hidden fees.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Ad spend is paid directly to LinkedIn from your card, no spend
            markup, no hidden fees. Every management fee is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="LinkedIn Ads Services"
        heading="Book a free LinkedIn Ads audit, no obligation."
        copy={
          <>
            We’ll review your current account (or your goals if starting fresh), share honest feedback in plain language,
            and give you a clear 90-day plan with pricing,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              usually within 48 hours. If we’re not the right fit, we’ll tell you.
            </strong>
          </>
        }
        primaryLabel="Book a free LinkedIn Ads audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
