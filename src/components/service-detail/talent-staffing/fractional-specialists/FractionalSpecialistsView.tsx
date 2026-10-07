"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./fx-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CALENDAR_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const ICON_PERSON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7 1 0 2 .2 2.8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m15 18 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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

/* -------- hero signature: leadership seats -------- */

const SEATS: { av: string; name: string; sub: string; pill: string; empty?: boolean }[] = [
  { av: "CMO", name: "Maya R. · Fractional CMO", sub: "2 days / week · owns the marketing plan", pill: "Matched" },
  { av: "CFO", name: "David K. · Fractional CFO", sub: "1 day / week · fundraising prep", pill: "Matched" },
  { av: "+", name: "Add a seat as you grow", sub: "COO · CRO · CTO · Head of People", pill: "Open", empty: true },
];

function SeatCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the seats are shown in their end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A fractional leader filling a C-suite seat"
      className={`fx-card${run ? " run" : ""}`}
      live="Leadership seats"
      corner="PART-TIME · OWNS RESULTS"
      footLeft="Senior experience, part-time"
      footRight="senior leadership, your terms →"
    >
      <div className="fx-seat-body">
        {SEATS.map((seat) => (
          <div className={`fx-ss ${seat.empty ? "empty" : "filled"}`} key={seat.name}>
            <span className="av">{seat.av}</span>
            <span className="sn">
              <b>{seat.name}</b>
              <small>{seat.sub}</small>
            </span>
            <span className="pill">{seat.pill}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- the rise of fractional leadership (count-ups) -------- */

type Stat = { count: number; decimals?: number; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 110,
    suffix: "K+",
    label: "“Fractional” C-suite profiles",
    text: (
      <>
        LinkedIn profiles pairing “fractional” with a C-suite title by late 2024, up from ~2,000 in 2022. <em>Umbrex; International Finance</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 83,
    suffix: "%",
    label: "Network growth in 2025",
    text: (
      <>
        Year-over-year growth in members of a large fractional talent network. <em>Fractional Jobs, 2026</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 36,
    suffix: "%",
    label: "From early-stage startups",
    text: (
      <>
        Share of tracked fractional job postings coming from early-stage venture-backed startups. <em>Fractional Jobs, 2026</em>
      </>
    ),
    delay: 160,
  },
  {
    // the design splits this as data-count="72" + suffix ".8%", which would read "0.8%" at the start of the
    // count-up; counted here as a true decimal, 0.0 → 72.8
    count: 72.8,
    decimals: 1,
    suffix: "%",
    label: "15+ years of experience",
    text: (
      <>
        Share of fractional leaders surveyed with 15 or more years of experience. <em>Heidrick &amp; Struggles, 2026</em>
      </>
    ),
    delay: 240,
  },
];

/* the design fires the count-ups once the stats block scrolls past 85% of the viewport */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

function formatStat(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

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
    <Reveal className="fx-stat" style={d(stat.delay)}>
      <div className="sv">
        {formatStat(shown, stat.decimals ?? 0)}
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
    <div className="fx-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- roles we place -------- */

const ROLES: { badge: string; title: string; when: string; focus: string }[] = [
  { badge: "CMO", title: "Fractional CMO", when: "Marketing lacks a strategy, or the founder still runs it.", focus: "Positioning, marketing plan, budget, team & agency oversight." },
  { badge: "CFO", title: "Fractional CFO", when: "You’re raising money, planning growth, or need clearer numbers.", focus: "Forecasting, cash flow, fundraising prep, board reporting." },
  { badge: "COO", title: "Fractional COO", when: "The founder is the bottleneck and processes can’t keep up.", focus: "Operations, systems, hiring plans, cross-team execution." },
  { badge: "CRO", title: "Fractional CRO / Head of Sales", when: "Sales depend on the founder, or the pipeline is unpredictable.", focus: "Sales process, pipeline, team coaching, revenue targets." },
  { badge: "CTO", title: "Fractional CTO", when: "You’re building a product without senior technical leadership.", focus: "Tech roadmap, architecture decisions, dev team oversight." },
  { badge: "CPO", title: "Fractional Head of People", when: "You’re growing headcount without HR structure.", focus: "Hiring process, culture, policies, performance reviews." },
];

/* -------- comparison table -------- */

const YES = <span className="yes">Yes</span>;

const COMPARE: { label: string; us: ReactNode; full: ReactNode; consult: ReactNode; interim: ReactNode }[] = [
  { label: "Time commitment", us: "Part-time, ongoing", full: "Full-time, ongoing", consult: "Project-based", interim: "Full-time, temporary" },
  { label: "Owns results", us: <>{YES}, for agreed areas</>, full: YES, consult: "Usually advises only", interim: <>{YES}, during the term</> },
  { label: "Leads your team", us: YES, full: YES, consult: "Rarely", interim: YES },
  { label: "Typical length", us: "Months to years", full: "Long term", consult: "Weeks to months", interim: "A few months" },
  { label: "Often used for", us: "Senior skills before a full-time hire", full: "Long-term leadership", consult: "Specific problems or audits", interim: "Gaps after a departure" },
];

/* -------- signs you're ready -------- */

const SIGNS: { text: string; tag: string }[] = [
  { text: "The founder still runs all the marketing", tag: "CMO" },
  { text: "Cash flow surprises you every month", tag: "CFO" },
  { text: "You’re preparing to raise money", tag: "CFO" },
  { text: "Every decision runs through the founder", tag: "COO" },
  { text: "Sales depend on one or two people", tag: "CRO" },
  { text: "You’re building tech without a tech lead", tag: "CTO" },
  { text: "You’re hiring fast with no HR process", tag: "People" },
  { text: "A full-time executive isn’t in the budget yet", tag: "Any" },
];

/* -------- engagement levels -------- */

const LEVELS: { name: string; days: string; filled: number; text: string; core?: boolean }[] = [
  { name: "Advisory", days: "~1 day / week", filled: 1, text: "Strategy, planning, and guidance for your existing team." },
  { name: "Core · most common", days: "2–3 days / week", filled: 3, text: "Hands-on leadership, team management, and ownership of key goals.", core: true },
  { name: "Intensive", days: "3+ days / week", filled: 5, text: "Deep involvement during a launch, raise, or major change." },
];

const METER_SEGMENTS = [0, 1, 2, 3, 4];

/* -------- every engagement includes -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_CALENDAR, text: "Discovery call to define goals and scope" },
  { icon: ICON_PERSON, text: "Leader matched by role, industry, and company stage" },
  { icon: ICON_PHONE, text: "Introductory call with your matched leader before you commit" },
  { icon: ICON_TREND, text: "Clear 30-, 60-, and 90-day priorities" },
  { icon: ICON_CALENDAR_CHECK, text: "Regular leadership check-ins with you" },
  { icon: ICON_DOC, text: "Monthly progress summary" },
  { icon: ICON_REFRESH, text: "Flexible changes to time commitment" },
  { icon: ICON_PERSON_CHECK, text: "Replacement support if the fit isn’t right" },
  { icon: ICON_SHIELD, text: "Confidentiality agreement (NDA) available" },
];

/* -------- who / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Startups</strong> that need senior experience before they can afford a full-time executive.</>, delay: 0 },
  { icon: ICON_PERSON, text: <><strong>Founder-led businesses</strong> ready to hand off functions the founder has outgrown.</>, delay: 60 },
  { icon: ICON_TREND, text: <><strong>Growing companies</strong> preparing for fundraising, expansion, or a new market.</>, delay: 120 },
  { icon: ICON_CLOCK, text: <><strong>Teams with a leadership gap</strong> while they search for a permanent hire.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does a fractional executive cost?", a: <>It depends on the role, time commitment, and scope. <strong>We share options and pricing on the free call.</strong></> },
  { q: "Fractional executive vs consultant: what’s the difference?", a: <>A consultant usually advises on a specific project. <strong>A fractional executive works as part of your leadership team, leads people, and owns results</strong> in their area.</> },
  { q: "How many hours does a fractional leader work?", a: <>Engagements usually range from about <strong>one day a week to three or more,</strong> depending on your needs.</> },
  { q: "Can a fractional leader become full-time later?", a: <>Sometimes. Some businesses later move the role to full-time, <strong>either with the same person or by hiring someone new with the leader’s help.</strong></> },
  { q: "Can I hire more than one fractional executive?", a: <>Yes. Some companies combine roles, such as a <strong>fractional CMO and CFO,</strong> to cover several leadership gaps at once.</> },
  { q: "Who manages the fractional leader?", a: <>They work as part of <strong>your</strong> leadership team and report to you (or your board). We handle matching, the intro call, check-ins, and replacements if the fit isn’t right.</> },
];

/* -------- page -------- */

export default function FractionalSpecialistsView() {
  const reduce = useReducedMotion();

  return (
    <div className="fx-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Talent & Staffing", href: "/talent-staffing" }}
        line1="Senior leadership, without"
        line2={
          <>
            a full-time <span className="grad-text">hire.</span>
          </>
        }
        lead={
          <>
            Fractional CMOs, CFOs, COOs, and other C-suite leaders who work part-time inside your business to{" "}
            <strong>set strategy, lead teams, and own key results.</strong>
          </>
        }
        primary={{ label: "Find a fractional leader", href: "/contact" }}
        secondary={{ label: "See the roles ↓", href: "#roles" }}
      >
        <SeatCard />
      </ServiceDetailHero>

      <TrustBar items={["CMO, CFO, COO, CRO, CTO, People", "Part-time, owns results", "Leads your team", "Flexible: scale up or down"]} />

      {/* STATS (dark) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The rise of fractional leadership</span>
            <h2>Fractional executive work is growing fast, across startups and established companies.</h2>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="fx-stat-note">
            Figures come from industry reports and surveys and describe the broader market, <strong>not our own placements.</strong>
          </Reveal>
        </div>
      </section>

      {/* ROLES */}
      <section className="band tint" id="roles">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Roles we place</span>
            <h2>The fractional C-suite.</h2>
            <p>Choose one leader or combine roles as your business grows.</p>
          </Reveal>
          <Reveal className="fx-cs-grid">
            {ROLES.map((role) => (
              <article className="fx-csc" key={role.title}>
                <span className="badge">{role.badge}</span>
                <h3>{role.title}</h3>
                <div className="row">
                  <span className="k">Bring in when</span>
                  <span className="v">{role.when}</span>
                </div>
                <div className="row">
                  <span className="k">Typical focus</span>
                  <span className="v">
                    <b>{role.focus}</b>
                  </span>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it compares</span>
            <h2>Fractional vs full-time vs consultant vs interim.</h2>
            <p>Each option solves a different problem. Here’s a simple, general comparison.</p>
          </Reveal>
          <Reveal className="fx-fc-tbl">
            <div className="fx-fc-row head">
              <div></div>
              <div className="us">Fractional leader</div>
              <div>Full-time hire</div>
              <div>Consultant</div>
              <div>Interim executive</div>
            </div>
            {COMPARE.map((row) => (
              <div className="fx-fc-row" key={row.label}>
                <div>{row.label}</div>
                <div className="us">{row.us}</div>
                <div>{row.full}</div>
                <div>{row.consult}</div>
                <div>{row.interim}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SIGNS */}
      <section className="band tint" id="signs">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Signs you’re ready</span>
            <h2>Is it time for a fractional leader?</h2>
            <p>If a few of these sound familiar, a fractional leader may be worth exploring.</p>
          </Reveal>
          <Reveal className="fx-sign-grid">
            {SIGNS.map((sign) => (
              <div className="fx-sign" key={sign.text}>
                <span className="box">{ICON_CHECK}</span>
                <p>{sign.text}</p>
                <span className="tag">{sign.tag}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ENGAGEMENT LEVELS */}
      <section className="band" id="levels">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Time commitment</span>
            <h2>Engagement levels.</h2>
            <p>Fractional leaders work a set amount of time each week. Levels can change as your needs change.</p>
          </Reveal>
          {/* reduced motion: the grid is rendered already "in" so the meters sit at their end state */}
          <Reveal className={`fx-lvl-grid${reduce ? " in" : ""}`}>
            {LEVELS.map((lvl) => (
              <article className={`fx-lvl${lvl.core ? " core" : ""}`} key={lvl.name}>
                <span className="lname">{lvl.name}</span>
                <div className="ldays">{lvl.days}</div>
                <div className="meter" aria-hidden="true">
                  {METER_SEGMENTS.map((i) => (
                    <i className={i < lvl.filled ? "on" : undefined} key={i}></i>
                  ))}
                </div>
                <p>{lvl.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="fx-lvl-note">
            Pricing depends on role, level, and scope, and is <strong>shared on the free call.</strong>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>Matched, introduced, and backed up, with clear priorities.</h2>
          </Reveal>
          <Reveal className="fx-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="fx-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who hires fractional leaders</span>
            <h2>Senior experience, right when you need it.</h2>
          </Reveal>
          <div className="fx-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="fx-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every match." />

      <CtaBand
        id="start"
        eyebrow="Fractional Specialists"
        heading="Get senior leadership on your terms."
        copy={
          <>
            Book a free call to talk through your goals and which fractional leader would fit best.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>We’ll compare fractional, full-time, and project-based options for your situation.</strong>
          </>
        }
        primaryLabel="Find a fractional leader"
        primaryHref="/contact"
        secondary={{ label: "See the roles", href: "#roles", arrow: "↗" }}
      />
    </div>
  );
}
