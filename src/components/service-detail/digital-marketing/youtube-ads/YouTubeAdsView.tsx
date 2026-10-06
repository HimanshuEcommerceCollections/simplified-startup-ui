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
import "./yta-page.css";

/* -------- icons -------- */

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

const ICON_PLAY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_PANEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="3" stroke="#fff" strokeWidth="2" />
    <path d="M10 9.5v5l4-2.5z" fill="#fff" />
  </svg>
);

/* -------- hero signature: live video ad card -------- */

const RETARGET = ["Search", "Display", "Gmail"];

const METRICS = [
  { v: "42%", k: "View rate" },
  { v: "$18", k: "Cost / acq." },
  { v: "5.1×", k: "ROAS", hl: true },
];

function VideoCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);
  // reduced motion: progress bar, metrics and chips render in their end state on first paint
  const run = reduce || started;
  return (
    <SignatureCard
      ariaLabel="A sample YouTube video ad campaign"
      className={`yta-vid${run ? " run" : ""}`}
      live="Video ad · Live"
      corner="PAY ONLY WHEN WATCHED"
      footLeft="Creative + media, one team"
      footRight="you own the account →"
    >
      <div className="yta-vid-player">
        <span className="hook">“Stop scrolling. 3 seconds…”</span>
        <span className="play">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
        <span className="skip">
          Skip in <b>5</b>
        </span>
        <span className="pbar">
          <i></i>
        </span>
      </div>
      <div className="yta-vid-mx">
        {METRICS.map((m) => (
          <div className={`mx${m.hl ? " hl" : ""}`} key={m.k}>
            <span className="v">{m.v}</span>
            <span className="k">{m.k}</span>
          </div>
        ))}
      </div>
      <div className="yta-vid-rt">
        <span className="rl">Views → retargeting:</span>
        {RETARGET.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why YouTube -------- */

const FEATURES = [
  { icon: ICON_PLAY, title: "Pay only when watched", text: <>Skippable ads cost nothing if the viewer <strong>skips before 30 seconds.</strong></> },
  { icon: ICON_REFRESH, title: "Feeds every Google campaign", text: <>Video views become retargeting audiences across Search, Display, and Gmail, <strong>30× cheaper than cold clicks.</strong></>, delay: 60 },
  { icon: ICON_PHONE, title: "Shorts is exploding", text: <>Shorts ads reach <strong>2B+ monthly users</strong> at roughly half the CPM of feed ads.</>, delay: 120 },
  { icon: ICON_CLOCK, title: "Emotional pull of video", text: <>Video shows, not tells: <strong>the fastest way to build trust</strong> with a cold audience.</> },
  { icon: ICON_LINES, title: "Top of a funnel that compounds", text: <>YouTube isn’t just video. It’s <strong>the top of a funnel that feeds every other Google campaign you run.</strong></>, delay: 60 },
  { icon: ICON_CHART, title: "Improves your overall ROAS", text: <>Most clients see their Google Ads ROAS <strong>improve within 60 days</strong> once YouTube feeds the funnel.</>, delay: 120 },
];

/* -------- ad formats (6) -------- */

type Format = { name: string; tag?: string; len: string; best: string; note: string; win?: boolean };

const FORMATS: Format[] = [
  { name: "Skippable In-Stream", len: "12s–3min", best: "Direct response + awareness (pay only if watched >30s)", note: "Workhorse: start every account here" },
  { name: "Non-Skippable", len: "15s max", best: "Brand recall, launches, event promotion", note: "Higher CPM but 100% view-through" },
  { name: "Bumper Ads", len: "6s max", best: "Frequency + reinforcement", note: "Cheap CPM, perfect for retargeting" },
  { name: "In-Feed Video", len: "Any", best: "Discovery-style intent (search + related)", note: "High-intent viewers, better for consideration" },
  { name: "Shorts Ads", tag: "2026 growth", len: "Up to 60s", best: "Younger audience + mobile-first", note: "⚡ Lower CPMs, huge reach", win: true },
  { name: "Masthead", len: "Homepage", best: "Massive launch moments only", note: "Enterprise budget only ($100K+/day)" },
];

function FormatsTable() {
  return (
    <Reveal className="yta-fmt-tbl" role="table" aria-label="YouTube ad formats">
      <div className="yta-fmt-row head" role="row">
        <div role="columnheader">Format</div>
        <div className="fc2" role="columnheader">
          Length
        </div>
        <div role="columnheader">Best for</div>
        <div className="fc4" role="columnheader">
          2026 note
        </div>
      </div>
      {FORMATS.map((f) => (
        <div className={`yta-fmt-row${f.win ? " win" : ""}`} role="row" key={f.name}>
          <div className="fn" role="cell">
            {f.name}
            {f.tag && <span className="tag">{f.tag}</span>}
          </div>
          <div className="fc2 fl" role="cell">
            {f.len}
          </div>
          <div role="cell">{f.best}</div>
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
  { icon: X_ICON, title: "Charge % of ad spend", text: <>Flat monthly fee: we win when your campaigns win, <strong>not when your budget balloons.</strong></> },
  { icon: X_ICON, title: "Bad creative, blame the algorithm", text: <>90% of YouTube success is the video. We build creative that <strong>hooks in the first 5 seconds.</strong></>, delay: 60 },
  { icon: X_ICON, title: "Optimize for views", text: <>Views are vanity. We optimize for <strong>conversions, cost per acquisition, and ROAS.</strong></>, delay: 120 },
  { icon: X_ICON, title: "Lock you into long contracts", text: <>Month-to-month. <strong>Cancel anytime.</strong></> },
  { icon: X_ICON, title: "Hide behind dashboards", text: <>Weekly Loom walkthroughs and monthly reports <strong>in plain language.</strong></>, delay: 60 },
  { icon: X_ICON, title: "Keep your ad account", text: <>The Google Ads account is in your name from day one. <strong>Leave and everything stays with you.</strong></>, delay: 120 },
];

/* -------- what's included (interactive, 6) -------- */

type Included = { key: string; no: string; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const INCLUDED: Included[] = [
  {
    key: "setup",
    no: "1",
    btnName: "Strategy & setup",
    btnSub: "Tracking + attribution",
    name: "Strategy & Setup",
    tag: "A full audit, ICP discovery, and a plan mapped to real KPIs, with tracking done right.",
    items: [
      "Full audit of your existing account (if any)",
      "ICP + offer discovery",
      "Google Ads account structure build",
      "Conversion tracking connected",
      "Server-side attribution setup",
      "90-day roadmap mapped to KPIs",
    ],
  },
  {
    key: "creative",
    no: "2",
    btnName: "Video creative",
    btnSub: "Hooks in 5 sec",
    name: "Video Creative Production",
    tag: "The single biggest factor in YouTube success, optimized for the first 5 seconds.",
    items: [
      "Short-form ads (5–60s) built to convert",
      "Hook frameworks that beat the 5-second skip",
      "Multiple variations per campaign for A/B testing",
      "Captions, on-screen text, mobile-first framing",
      "Edit around your footage, or shoot / AI-generate fresh",
      "On-brand visuals and clear CTAs",
    ],
  },
  {
    key: "audience",
    no: "3",
    btnName: "Audience building",
    btnSub: "Layered targeting",
    name: "Audience Building",
    tag: "YouTube targeting is unmatched when you layer it right.",
    items: [
      "Demographics, interests, keywords, behaviors",
      "Competitor channel targeting",
      "Retargeting from website + video views",
      "Customer-list match audiences",
      "Multiple audience layers per campaign",
      "See which combinations actually convert",
    ],
  },
  {
    key: "mgmt",
    no: "4",
    btnName: "Launch & management",
    btnSub: "Test & scale",
    name: "Campaign Launch & Management",
    tag: "Launch controlled, monitor daily, scale the winners. Nothing runs stale.",
    items: [
      "Controlled-budget launch + daily ramp monitoring",
      "Weekly A/B testing (creative, hooks, audiences)",
      "Underperformers paused, winners scaled",
      "Ad fatigue monitored (refresh every 2–4 weeks)",
      "Bid & budget optimization",
      "Winning combinations get more budget",
    ],
  },
  {
    key: "retarget",
    no: "5",
    btnName: "Retargeting & amplification",
    btnSub: "Across Google",
    name: "Retargeting & Cross-Google Amplification",
    tag: "Where YouTube pays for itself: every view becomes a cheap retargeting audience.",
    items: [
      "Video views → retargeting audiences",
      "Re-engage on Search, Display, Discovery, Gmail",
      "Fraction of cold-search CPCs",
      "Overall Google ROAS lifts within ~60 days",
      "Sequenced messaging across the funnel",
      "Unified cross-network reporting",
    ],
  },
  {
    key: "report",
    no: "6",
    btnName: "Reporting & optimization",
    btnSub: "ROAS, not views",
    name: "Reporting & Optimization",
    tag: "Plain-language reporting tied to revenue, not views.",
    items: [
      "Weekly Loom walkthrough (5–10 min)",
      "Monthly report: CPA, ROAS, pipeline value",
      "Live dashboard access",
      "Quarterly strategy reviews",
      "Continuous creative refresh",
      "Budget reallocation to winners",
    ],
  },
];

/* The design's script calls renderWb('audit'), a key that doesn't exist, so the
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
    <Reveal className="yta-wb-wrap" id="included-int">
      <div className="yta-wb-list" role="tablist" aria-label="What's included">
        {INCLUDED.map((it, i) => (
          <button
            key={it.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="yta-wb-btn"
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
      <div className="yta-wb-panel">
        <div className="yta-wp-top">
          <span className="big">{ICON_PANEL}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        <div className="yta-wp-body yta-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="yta-wp-list">
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
  <><strong>E-commerce brands</strong> with strong visual products: fashion, home, beauty, health, gadgets.</>,
  <><strong>B2B SaaS</strong> with demo-worthy products where showing the interface converts faster than describing it.</>,
  <><strong>Coaches, course creators &amp; info-product sellers</strong>: YouTube is where their audience lives.</>,
  <><strong>Local service businesses</strong> with a strong founder or team story to tell.</>,
  <><strong>D2C brands scaling past Meta</strong> that need a second big channel without Facebook fatigue.</>,
];

const FIT_BAD: ReactNode[] = [
  <><strong>Highly technical or complex-B2B enterprise</strong>: LinkedIn Ads usually works better.</>,
  <><strong>ACV under $50 with a long sales cycle</strong>, the math rarely holds up.</>,
  <>For those cases, <strong>Google Search Ads</strong> is usually the better first channel.</>,
];

function FitGrid() {
  return (
    <Reveal className="yta-fit-grid">
      <div className="yta-fit good">
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
      <div className="yta-fit bad">
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
  { when: "Week 1", title: "Strategy & setup", text: "Discovery, ICP mapping, account audit. Google Ads setup or takeover. Conversion tracking installed. 90-day roadmap in plain language." },
  { when: "Week 2", title: "Creative production", text: "Video ads scripted, filmed or edited, and finalized. Multiple variations for A/B testing. Hooks tested before launch.", delay: 70 },
  { when: "Week 3", title: "Soft launch", text: "First campaigns at controlled budget. Daily monitoring during ramp. Early data reviewed to catch tracking or targeting issues.", delay: 140 },
  { when: "Week 4", title: "Optimize & scale", text: "Underperformers paused, winners scaled. Retargeting audiences begin firing across the wider Google network. First monthly report.", delay: 210 },
  { when: "Ongoing", title: "Weekly cycles", text: "Weekly A/B testing on creative & audiences, monthly reports tied to ROAS, quarterly deep dives + creative refresh.", delay: 280 },
];

/* -------- pricing -------- */

const TIERS = [
  { name: "Starter YouTube Ads", best: "Testing YouTube: one campaign type, Skippable + Bumper, creative from your assets. Ad spend ~$2K/mo.", price: "Published /mo" },
  { name: "Growth YouTube Ads", best: "Most brands: multi-format, full retargeting across Google, fresh creative & A/B testing. Spend $5K–20K/mo.", price: "Published /mo", featured: true, badge: "Most popular", delay: 80 },
  { name: "Scale + Audit", best: "High-volume & D2C: Shorts, cross-Google amplification, dedicated strategist. Or a one-off account audit.", price: "Published", delay: 160 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much do YouTube Ads cost?", a: <>Two costs: <strong>ad spend + management.</strong> Minimum useful spend is ~$2K/mo; most brands land in $5K–20K/mo. Management is a <strong>flat monthly fee, never a percentage.</strong> Exact number shared on the strategy call.</> },
  { q: "Do you produce the video ads?", a: <>Yes, included in every package. We work with your footage, product shots, or brand assets. Need fresh video shot? <strong>We quote that separately as a one-off production.</strong></> },
  { q: "How is it different from Meta Ads?", a: <>Meta is scroll-first and interruption-based; YouTube is intent-first. YouTube typically has <strong>lower CPMs and better retargeting reach across Google.</strong> Best answer: run both.</> },
  { q: "What if I don’t have any video content?", a: <>Common, and we handle it. We edit around product photos, use AI video tools (Runway, Descript), or quote a fresh shoot. <strong>Most brands then reuse the clips on Meta, TikTok, and their site.</strong></> },
  { q: "Do I own the ad account?", a: <>Yes, 100%: the Google Ads account is in your name, billing on your card, history stays with you. <strong>If you leave, we hand back everything cleanly.</strong></> },
  { q: "How long before I see results?", a: <>Views and data from week one; meaningful CPA/ROAS signal in <strong>2–4 weeks</strong> as the algorithm learns. Retargeting lifts overall Google ROAS usually <strong>within 60 days.</strong></> },
];

export default function YouTubeAdsView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        line1="YouTube Ads that get"
        line2={
          <>
            watched, not <span className="grad-text">skipped.</span>
          </>
        }
        lead={
          <>
            Managed YouTube advertising for e-commerce, B2B SaaS, coaches, and local businesses. We build the video ads,
            run the campaigns across YouTube and Shorts, and turn{" "}
            <strong>2.7 billion monthly viewers into your customer list</strong>, with flat monthly fees and full
            campaign ownership.
          </>
        }
        primary={{ label: "Book a free YouTube Ads audit", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <VideoCard />
      </ServiceDetailHero>

      <TrustBar items={["Flat monthly fee (no % of spend)", "Video creative included", "You own the ad account", "Month-to-month"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why YouTube Ads are different</span>
            <h2>2.7 billion viewers, already looking for something.</h2>
            <p>
              Unlike social platforms, people show up on YouTube with intent. Combined with video’s emotional pull, that
              makes it one of the highest-converting paid channels when the creative is right.
            </p>
          </Reveal>
          <div className="yta-why">
            <FeatureGrid cards={FEATURES} columns={3} />
          </div>
        </div>
      </section>

      {/* AD FORMATS */}
      <section className="band" id="formats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">YouTube ad formats we run</span>
            <h2>Six formats, each solves a different problem.</h2>
            <p>
              We recommend the right mix for your goal, whether that’s awareness, direct response, or retargeting warm
              audiences.
            </p>
          </Reveal>
          <FormatsTable />
          <Reveal as="p" className="yta-fmt-note">
            Most clients start with <strong>Skippable In-Stream + Bumper</strong> for retargeting, then add Shorts once the
            account is producing.
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do</span>
            <h2>The YouTube Ads industry is full of shortcuts.</h2>
            <p>We don’t take any of them.</p>
          </Reveal>
          <div className="yta-dont">
            <ProblemSolve
              items={DONTS}
              columns={3}
              draw
              solve={
                <>
                  Flat fee, creative that converts, and reporting tied to <strong>ROAS, not views.</strong>
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
            <h2>End-to-end YouTube Ads management.</h2>
            <p>Everything a working video campaign needs: six parts, one team. Pick one to see inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* WHO / FIT */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who YouTube Ads is built for</span>
            <h2>Best with a visual product and a funnel to catch warm views.</h2>
            <p>Here’s where it fits, and where we’ll honestly point you to another channel.</p>
          </Reveal>
          <FitGrid />
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A 30-day launch, then steady weekly optimization.</h2>
            <p>Every step ends with a clear deliverable and your sign-off.</p>
          </Reveal>
          <div className="yta-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="yta-step" key={step.when} style={d(step.delay ?? 0)}>
                <span className="yta-step-no">{step.when}</span>
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
            <p>Published up front. Ad spend paid directly to Google from your card, no markup, no hidden fees.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={3} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Ad spend is paid directly to Google from your card, no spend
            markup, no hidden fees. Video editing from your assets is included; fresh video shoots are quoted separately
            as one-off production. Every fee is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="YouTube Ads Services"
        heading="Book a free YouTube Ads audit, no obligation."
        copy={
          <>
            We’ll review your current account (or your goals if starting fresh), share honest feedback in plain language,
            and give you a clear 90-day plan with pricing,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              usually within 48 hours. If we’re not the right fit, we’ll tell you.
            </strong>
          </>
        }
        primaryLabel="Book a free YouTube Ads audit"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
