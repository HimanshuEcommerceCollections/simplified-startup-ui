"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./gtm-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 3a9 9 0 0 1 0 18M3 12h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: GTM decision board -------- */

const BOARD: { k: string; v: string }[] = [
  { k: "Who", v: "Mid-market ops leaders" },
  { k: "What", v: "RevOps platform · Pro tier" },
  { k: "Why", v: "Live in a week, not months" },
  { k: "Where", v: "LinkedIn + content" },
  { k: "How much", v: "$800/mo · 3 tiers" },
  { k: "How", v: "Sales-led + PLG trial" },
];

function BoardCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the board is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample GTM decision board"
      className={`gtm-card${run ? " run" : ""}`}
      live="GTM decision board"
      corner="6 DECISIONS"
      footLeft="Six decisions, written down"
      footRight="a plan your team can run →"
    >
      <div className="gtm-board">
        {BOARD.map((cell) => (
          <div className="gtm-gb" key={cell.k}>
            <span className="gk">{cell.k}</span>
            <span className="gv">{cell.v}</span>
          </div>
        ))}
      </div>
      <div className="gtm-plan">
        <span className="pk">{ICON_CHECK}</span>
        <span className="pt">
          <b>90-day launch plan ready</b>, owners, weeks, and budget.
        </span>
      </div>
    </SignatureCard>
  );
}

/* -------- how buyers buy (count-ups) -------- */

type Stat = { count: number; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 17,
    suffix: "%",
    label: "Time with suppliers",
    text: (
      <>
        Share of a B2B buying process spent meeting with potential suppliers. <em>Gartner</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 5,
    suffix: "–6%",
    label: "Time with any one seller",
    text: (
      <>
        When buyers compare several suppliers, time with any single rep can drop this low. <em>Gartner</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 27,
    suffix: "%",
    label: "Independent online research",
    text: (
      <>
        Share of B2B buying time spent researching online, the largest single activity. <em>Gartner</em>
      </>
    ),
    delay: 160,
  },
  {
    count: 29,
    suffix: "%",
    label: "Failed on bad timing",
    text: (
      <>
        Share of shut-down VC-backed startups (known reason) where timing was a factor. <em>CB Insights, 2026</em>
      </>
    ),
    delay: 240,
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
    <Reveal className="gtm-stat" style={d(stat.delay)}>
      <div className="sv">
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
    <div className="gtm-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- services: three stages -------- */

const STAGES: { icon: ReactNode; title: string; sub: string; items: { b: string; s: string }[] }[] = [
  {
    icon: ICON_SEARCH,
    title: "Research",
    sub: "Understand the market.",
    items: [
      { b: "ICP & persona definition", s: "Who buys, who influences, and why." },
      { b: "Competitor review", s: "How alternatives are positioned and priced." },
      { b: "Buyer journey mapping", s: "How your buyers research and decide." },
    ],
  },
  {
    icon: ICON_STAR,
    title: "Strategy",
    sub: "Decide how to win.",
    items: [
      { b: "Positioning & messaging", s: "Your value proposition and key messages." },
      { b: "Pricing & packaging", s: "Plans, tiers, and offer structure." },
      { b: "Channel & motion selection", s: "Where and how you reach buyers." },
    ],
  },
  {
    icon: ICON_ROCKET,
    title: "Launch",
    sub: "Turn the plan into action.",
    items: [
      { b: "90-day launch plan", s: "Weekly priorities, owners, and budget." },
      { b: "Sales & marketing alignment", s: "Lead definitions, handoffs, and enablement." },
      { b: "GTM metrics dashboard", s: "The numbers to track from day one." },
    ],
  },
];

/* -------- six-decision board -------- */

const DECISIONS: { q: string; small?: boolean; title: string; label: string; text: string }[] = [
  { q: "WHO", title: "Target customer", label: "The segment you focus on first", text: "The specific segment you’ll focus on first, and who you’ll ignore for now." },
  { q: "WHAT", title: "The offer", label: "What you sell", text: "What you sell, in what package, and what problem it solves." },
  { q: "WHY", title: "Reason to choose you", label: "Positioning & proof", text: "Your positioning and proof against the alternatives." },
  { q: "WHERE", title: "Channels", label: "Where buyers already are", text: "The two or three channels where your buyers already spend time." },
  { q: "HOW MUCH", small: true, title: "Pricing", label: "Price to value", text: "Price points and packaging that match value and buyer budgets." },
  { q: "HOW", title: "Sales motion", label: "How buyers buy", text: "Self-serve, sales-led, partner-led, or a mix." },
];

/* -------- motion table -------- */

const MOTIONS: { name: string; fits: string; needs: string; watch: string }[] = [
  { name: "Sales-led", fits: "Deals are larger and buyers need guidance", needs: "Sales team, outbound, demos", watch: "Higher cost per customer" },
  { name: "Product-led", fits: "Buyers can try and see value on their own", needs: "Free trial / freemium, strong onboarding", watch: "Low conversion from free users" },
  { name: "Marketing-led", fits: "Buyers search and research online first", needs: "Content, SEO, paid ads, email", watch: "Slower to build momentum" },
  { name: "Partner-led", fits: "Others already sell to your buyers", needs: "Referral, reseller, integration partners", watch: "Less control over the sale" },
  { name: "Community-led", fits: "Buyers trust peers more than vendors", needs: "Events, groups, user communities", watch: "Takes time and consistency" },
];

/* -------- 90-day plan -------- */

const PHASES: { days: string; title: string; items: string[]; delay: number }[] = [
  { days: "Days 1–30", title: "Prepare", items: ["Messaging finalized", "Website and sales assets updated", "Tracking and CRM set up", "First channel tests planned"], delay: 0 },
  { days: "Days 31–60", title: "Launch", items: ["Channels go live", "Outreach and campaigns start", "First customer conversations", "Weekly results review"], delay: 80 },
  { days: "Days 61–90", title: "Learn & adjust", items: ["Double down on working channels", "Refine pricing and messaging", "Update targets and budget", "Next 90-day plan drafted"], delay: 160 },
];

/* -------- what you receive (explorer) -------- */

type Deliverable = { key: string; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const DELIVERABLES: Deliverable[] = [
  {
    key: "icp",
    btnName: "ICP & personas",
    btnSub: "Who to target",
    name: "ICP & Buyer Persona Profiles",
    tag: "The specific people you’ll focus on first, and who you’ll ignore for now.",
    items: ["Ideal customer profile (firmographics)", "2–4 buyer + influencer personas", "Pain points and buying triggers", "Who to deprioritize for now"],
  },
  {
    key: "comp",
    btnName: "Competitor summary",
    btnSub: "The alternatives",
    name: "Competitor & Alternatives Summary",
    tag: "How the alternatives position and price, including “do nothing.”",
    items: ["Direct & indirect competitor map", "How each is positioned and priced", "Gaps you can own", "Status-quo / “do nothing” alternative"],
  },
  {
    key: "pos",
    btnName: "Positioning & messaging",
    btnSub: "What to say",
    name: "Positioning Statement & Messaging Guide",
    tag: "One clear story your whole team can use, with proof against the alternatives.",
    items: ["Positioning statement (one sentence)", "Value proposition & key messages", "Messaging per persona", "Proof points and objection handling"],
  },
  {
    key: "price",
    btnName: "Pricing & packaging",
    btnSub: "How to charge",
    name: "Pricing & Packaging Recommendations",
    tag: "Price points and tiers that match value and buyer budgets.",
    items: ["Plans and tier structure", "Price points tied to value", "Packaging & offer design", "Discount and trial guidance"],
  },
  {
    key: "chan",
    btnName: "Channel & motion plan",
    btnSub: "How to reach them",
    name: "Channel & GTM Motion Plan",
    tag: "The two or three channels your buyers already use, and the motion that fits.",
    items: ["Priority channels (2–3)", "GTM motion recommendation", "Channel test plan", "Budget allocation guidance"],
  },
  {
    key: "plan90",
    btnName: "90-day launch plan",
    btnSub: "Owners & milestones",
    name: "90-Day Launch Plan",
    tag: "Strategy turned into weekly priorities your team can actually follow.",
    items: ["Prepare → Launch → Learn phases", "Weekly priorities with owners", "Milestones and checkpoints", "Budget by phase"],
  },
  {
    key: "metrics",
    btnName: "Metrics & dashboard",
    btnSub: "What to track",
    name: "GTM Metrics List & Dashboard Outline",
    tag: "The numbers to track from day one, plus a walkthrough with your team.",
    items: ["Core GTM metrics to track", "Dashboard outline (what goes where)", "Targets by phase", "Team walkthrough session"],
  },
];

function DeliverablesExplorer() {
  // the design's script initialises on a key that does not exist ("audit"); start on the
  // button it marks aria-selected instead, which is the first one ("icp")
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = DELIVERABLES[active];

  function select(i: number) {
    const next = (i + DELIVERABLES.length) % DELIVERABLES.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select(i - 1);
    }
  }

  return (
    <Reveal className="gtm-wb-wrap" id="included-int">
      <div className="gtm-wb-list" role="tablist" aria-label="What you receive">
        {DELIVERABLES.map((a, i) => (
          <button
            key={a.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="gtm-wb-btn"
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{i + 1}</span>
            <span className="dn">
              <b>{a.btnName}</b>
              <small>{a.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="gtm-wb-panel">
        <div className="gtm-wp-top">
          {/* the design renders the same globe mark for every deliverable */}
          <span className="big">{ICON_GLOBE}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="gtm-wp-body gtm-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="gtm-wp-list">
            {item.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who / how / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Startups preparing to launch a first product</strong> and needing a focused plan.</>, delay: 0 },
  { icon: ICON_GLOBE, text: <><strong>Businesses entering a new market</strong>: a new region, industry, or customer segment.</>, delay: 60 },
  { icon: ICON_CART, text: <><strong>Companies launching a new product line</strong> alongside an existing offer.</>, delay: 120 },
  { icon: ICON_TREND, text: <><strong>Teams whose growth has stalled</strong> and want to rethink audience, channels, or pricing.</>, delay: 180 },
];

const STEPS = [
  { no: "Week 1", title: "Discover", text: "Kickoff workshop and review of your product, data, and goals.", delay: 0 },
  { no: "Weeks 2–3", title: "Research", text: "Buyer, competitor, and channel research: the evidence base for every decision.", delay: 80 },
  { no: "Week 4", title: "Decide", text: "Work through the six GTM decisions together and write down the answers.", delay: 160 },
  { no: "Week 5", title: "Plan", text: "90-day launch plan delivered and walked through with your team.", delay: 240 },
];

const FAQS = [
  { q: "How much does a GTM strategy cost?", a: <>It depends on scope: how many products, markets, and buyer segments are involved. <strong>We share pricing on the strategy call.</strong></> },
  { q: "GTM strategy vs a marketing plan?", a: <>A marketing plan focuses on campaigns and channels. <strong>GTM strategy comes first</strong> and also covers who to target, how to price, and how sales and marketing work together.</> },
  { q: "Can you help carry out the plan too?", a: <>Yes. The plan is yours to run with any team, and many clients also bring in our <strong>marketing, sales, or web teams</strong> to help execute it.</> },
  { q: "Does a GTM strategy guarantee a successful launch?", a: <>No plan can guarantee results. A clear strategy helps you <strong>focus spending, test the right things first, and adjust faster</strong> based on what you learn.</> },
  { q: "How often should a GTM plan be updated?", a: <>We recommend reviewing it <strong>every 90 days,</strong> using real results to update targets, channels, and messaging.</> },
  { q: "Which stage should we start with?", a: <>You can use one stage or all three. If you’re unsure, most teams start with <strong>Research</strong>. It’s cheaper than building a strategy on the wrong assumptions.</> },
];

/* -------- page -------- */

export default function GoToMarketStrategyView() {
  return (
    <div className="gtm-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Business & Startup Advisory", href: "/business-advisory" }}
        line1="Who you sell to, how you"
        line2={
          <>
            reach them, what you do <span className="grad-text">first.</span>
          </>
        }
        lead={
          <>
            Go-to-market strategy for new products, new markets, and businesses ready to grow, covering{" "}
            <strong>audience, positioning, pricing, channels, and a 90-day launch plan.</strong> One clear plan your
            team can actually follow.
          </>
        }
        primary={{ label: "Book a GTM strategy call", href: "/contact" }}
        secondary={{ label: "See our services ↓", href: "#services" }}
      >
        <BoardCard />
      </ServiceDetailHero>

      <TrustBar items={["Audience + positioning + pricing", "Channel & motion selection", "90-day launch plan", "The plan is yours to run"]} />

      {/* HOW BUYERS BUY (dark, stats) */}
      <section className="band dark" id="buyers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How buyers buy today</span>
            <h2>Buyers decide before they ever talk to you.</h2>
            <p>They do most of their research independently, so a go-to-market plan has to reach them before your sales team does.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="gtm-stat-note">
            If buyers decide before they talk to you, <strong>your go-to-market plan has to reach them before your sales team does.</strong>
          </Reveal>
        </div>
      </section>

      {/* SERVICES: 3 STAGES */}
      <section className="band tint" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we provide</span>
            <h2>Grouped into three stages: use one, or all three.</h2>
            <p>Research the market, decide how to win, then turn the plan into action.</p>
          </Reveal>
          <Reveal className="gtm-stage-grid">
            {STAGES.map((stage) => (
              <article className="gtm-stg" key={stage.title}>
                <div className="sh">
                  <span className="si">{stage.icon}</span>
                </div>
                <div className="stt">{stage.title}</div>
                <p className="ssub">{stage.sub}</p>
                <ul>
                  {stage.items.map((li) => (
                    <li key={li.b}>
                      <b>{li.b}</b>
                      <span>{li.s}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* DECISION BOARD */}
      <section className="band" id="board">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The GTM decision board</span>
            <h2>Every plan comes down to six decisions.</h2>
            <p>We work through each one with you, and write down the answer.</p>
          </Reveal>
          <Reveal className="gtm-dec-grid">
            {DECISIONS.map((dec) => (
              <article className="gtm-dec" key={dec.title}>
                <span className={`dq${dec.small ? " dq-sm" : ""}`}>{dec.q}</span>
                <h3>{dec.title}</h3>
                <div className="dl">{dec.label}</div>
                <p>{dec.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MOTION TABLE */}
      <section className="band tint" id="motion">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Choosing your GTM motion</span>
            <h2>The “motion” is how buyers move from first touch to purchase.</h2>
            <p>Most businesses lead with one and support it with another. Here’s how the five compare.</p>
          </Reveal>
          <Reveal className="gtm-mo-tbl">
            <div className="gtm-mo-row head">
              <div>Motion</div>
              <div>Often fits when…</div>
              <div className="mc3">Needs</div>
              <div className="mc4">Watch out for</div>
            </div>
            {MOTIONS.map((m) => (
              <div className="gtm-mo-row" key={m.name}>
                <div className="mn">{m.name}</div>
                <div>{m.fits}</div>
                <div className="mc3">{m.needs}</div>
                <div className="mc4">{m.watch}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="gtm-mo-note">
            Not sure which fits? <strong>We’ll look at your buyers, price point, and team, and pick which motion to test first.</strong>
          </Reveal>
        </div>
      </section>

      {/* 90-DAY PLAN (dark) */}
      <section className="band dark" id="plan">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 90-day launch plan</span>
            <h2>Strategy turns into a plan your team follows week by week.</h2>
            <p>Here’s the typical shape: three phases, each with clear checkpoints.</p>
          </Reveal>
          <div className="gtm-day-grid">
            {PHASES.map((phase) => (
              <Reveal as="article" className="gtm-dayc" key={phase.title} style={d(phase.delay)}>
                <span className="dd">{phase.days}</span>
                <h3>{phase.title}</h3>
                <ul>
                  {phase.items.map((li) => (
                    <li key={li}>
                      <span className="m">{ICON_CHECK}</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you receive</span>
            <h2>Everything written down, and yours to run.</h2>
            <p>The full deliverable set. Pick one to see what’s inside.</p>
          </Reveal>
          <DeliverablesExplorer />
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>Best when you’re launching, expanding, or resetting growth.</h2>
          </Reveal>
          <div className="gtm-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="gtm-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A focused process: discovery to a plan you can run.</h2>
            <p>Timelines depend on how many markets or products are included.</p>
          </Reveal>
          <div className="gtm-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="gtm-step" key={step.title} style={d(step.delay)}>
                <span className="gtm-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every engagement." />

      <CtaBand
        id="start"
        eyebrow="Go-to-Market Strategy"
        heading="Go to market with a clear plan."
        copy={
          <>
            Book a GTM strategy call to talk through your product, your buyers, and your first 90 days,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>and see what a focused launch plan could look like for your business.</strong>
          </>
        }
        primaryLabel="Book a GTM strategy call"
        primaryHref="/start-project"
        secondary={{ label: "See our services", href: "#services", arrow: "↗" }}
      />
    </div>
  );
}
