"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./gs-page.css";

/* -------- icons -------- */

const ICON_HOUSE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="2" />
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
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: coverage map -------- */

type Zone = "on" | "near" | "off";

const ZONES: { zone: Zone; tag: string; name: string; sub: string; width: string }[] = [
  { zone: "on", tag: "US", name: "Onshore · United States", sub: "Same hours · client-facing & senior", width: "100%" },
  { zone: "near", tag: "LATAM", name: "Nearshore · Latin America", sub: "0–3 hrs · live overlap", width: "82%" },
  { zone: "off", tag: "ASIA", name: "Offshore · Asia", sub: "U.S. shift or async · coverage", width: "64%" },
];

function GlobeCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the map is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="Three staffing locations and their overlap"
      className={`gs-card${run ? " run" : ""}`}
      live="Coverage map"
      corner="ONE TEAM · THREE ZONES"
      footLeft="Overlap, coverage & cost, balanced"
      footRight="a team without borders →"
    >
      <div className="gs-globe-body">
        {ZONES.map((z) => (
          <div className={`gs-gr ${z.zone}`} key={z.tag}>
            <span className="gp">{z.tag}</span>
            <span className="gn">
              <b>{z.name}</b>
              <small>{z.sub}</small>
            </span>
            <span className="gbar">
              <i style={{ width: z.width }}></i>
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- how companies are sourcing talent (count-ups) -------- */

type Stat = { count: number; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 80,
    suffix: "%",
    label: "Maintaining or increasing",
    text: (
      <>
        Share of executives planning to maintain or increase investment in third-party outsourcing. <em>Deloitte, 2024</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 50,
    suffix: "%",
    label: "Using it for front-office work",
    text: (
      <>
        Share using outsourced services for front-office work like sales, marketing, and R&amp;D. <em>Deloitte, 2024</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 42,
    suffix: "%",
    label: "Driven by specialized talent",
    text: (
      <>
        Share citing access to specialized talent as their top outsourcing driver. <em>Deloitte, via Outsource Accelerator</em>
      </>
    ),
    delay: 160,
  },
  {
    count: 34,
    suffix: "%",
    label: "Prioritizing cost",
    text: (
      <>
        Share prioritizing cost reduction as the main driver, down from 70% in 2020. <em>Deloitte, via Outsource Accelerator</em>
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
    <Reveal className="gs-stat" style={d(stat.delay)}>
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
    <div className="gs-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- three models -------- */

const MODELS: { zone: Zone; icon: ReactNode; title: string; loc: string; rows: { k: string; v: ReactNode }[] }[] = [
  {
    zone: "on",
    icon: ICON_HOUSE,
    title: "Onshore",
    loc: "United States",
    rows: [
      { k: "Time zone", v: <b>Same as your team</b> },
      { k: "Communication", v: "Same language, culture, and business norms" },
      { k: "Relative cost", v: <><b>Highest</b> of the three</> },
      { k: "Often best for", v: "Client-facing, senior, or regulated roles" },
    ],
  },
  {
    zone: "near",
    icon: ICON_REFRESH,
    title: "Nearshore",
    loc: "Latin America (Mexico, Colombia, Argentina)",
    rows: [
      { k: "Time zone", v: <><b>0–3 hrs</b> from most U.S. zones</> },
      { k: "Communication", v: "Real-time collaboration during U.S. hours" },
      { k: "Relative cost", v: <b>Moderate</b> },
      { k: "Often best for", v: "Sales, marketing, dev, and ops roles that need live overlap" },
    ],
  },
  {
    zone: "off",
    icon: ICON_GLOBE,
    title: "Offshore",
    loc: "Asia (the Philippines, India)",
    rows: [
      { k: "Time zone", v: <b>~9–13 hrs ahead</b> },
      { k: "Communication", v: "U.S.-hours shifts or overnight async work" },
      { k: "Relative cost", v: <><b>Lowest</b> of the three</> },
      { k: "Often best for", v: "Support, admin, bookkeeping, and after-hours coverage" },
    ],
  },
];

/* -------- time-zone overlap -------- */

type TzFill = { cls: string; left: string; width: string; text: string };

const TZ_ROWS: { label: string; sub: string; fills: TzFill[] }[] = [
  { label: "Your U.S. team", sub: "9am–5pm ET", fills: [{ cls: "team", left: "37.5%", width: "33%", text: "9am–5pm" }] },
  { label: "Onshore", sub: "U.S.-based, same hours", fills: [{ cls: "on", left: "37.5%", width: "33%", text: "Full overlap" }] },
  { label: "Nearshore", sub: "LatAm, 0–3 hrs", fills: [{ cls: "near", left: "33%", width: "41%", text: "Full or near-full overlap" }] },
  { label: "Offshore (U.S. shift)", sub: "Works U.S. hours", fills: [{ cls: "off", left: "37.5%", width: "33%", text: "Full overlap" }] },
  {
    label: "Offshore (local day)",
    sub: "Philippines, 9am–5pm local",
    fills: [
      { cls: "async", left: "0", width: "29%", text: "Async" },
      { cls: "async", left: "91.5%", width: "8.5%", text: "" },
    ],
  },
];

const TZ_SCALE = ["12am", "6am", "12pm", "6pm"];

/* -------- role matrix -------- */

/** 2 = often a strong fit, 1 = can work well, 0 = less common */
type Fit = 0 | 1 | 2;

const FIT_LABEL: Record<Fit, string> = { 2: "Often a strong fit", 1: "Can work well", 0: "Less common" };

const ROLES: { role: string; href?: string; fit: [Fit, Fit, Fit] }[] = [
  { role: "Executive assistant", href: "/talent-staffing/virtual-assistants", fit: [2, 2, 1] },
  { role: "Customer support", href: "/talent-staffing/customer-support-staffing", fit: [1, 2, 2] },
  { role: "SDR / appointment setting", fit: [2, 2, 1] },
  { role: "Marketing coordinator", fit: [1, 2, 2] },
  { role: "Bookkeeping & admin", fit: [1, 1, 2] },
  { role: "Software development", fit: [1, 2, 2] },
  { role: "Fractional executive", href: "/talent-staffing/fractional-specialists", fit: [2, 1, 0] },
  { role: "After-hours or 24/7 coverage", fit: [0, 1, 2] },
];

/* the design pops the dots in once 15% of the table is visible */
const RM_IO: IntersectionObserverInit = { threshold: 0.15 };

function FitCell({ fit }: { fit: Fit }) {
  if (fit === 0) {
    return (
      <span className="gs-rmdash" aria-label={FIT_LABEL[0]}>
        –
      </span>
    );
  }
  return (
    <span className={`gs-rmdot${fit === 1 ? " one" : ""}`} aria-label={FIT_LABEL[fit]}>
      <i></i>
      {fit === 2 && <i></i>}
    </span>
  );
}

function RoleMatrix() {
  const [tblRef, inView] = useInView<HTMLTableElement>(RM_IO);
  return (
    <table className={`gs-rm-tbl${inView ? " in" : ""}`} ref={tblRef}>
      <thead>
        <tr>
          <th>Role</th>
          <th>Onshore</th>
          <th>Nearshore</th>
          <th>Offshore</th>
        </tr>
      </thead>
      <tbody>
        {ROLES.map((r) => (
          <tr key={r.role}>
            <th>{r.href ? <a href={r.href}>{r.role}</a> : r.role}</th>
            {r.fit.map((f, i) => (
              <td key={i}>
                <FitCell fit={f} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* -------- included / who / faq -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_CALENDAR, text: "Role and location planning call" },
  { icon: ICON_GLOBE, text: "Recommendation on onshore, nearshore, offshore, or a mix" },
  { icon: ICON_PERSON, text: "Candidate matching based on skills, language, and time zone" },
  { icon: ICON_CHECK, text: "Skills test and interview before matching" },
  { icon: ICON_SHIELD, text: "Onboarding plan and tool access setup" },
  { icon: ICON_TREND, text: "Regular check-ins on performance and workload" },
  { icon: ICON_REFRESH, text: "Replacement support if the fit isn’t right" },
  { icon: ICON_SHIELD, text: "Confidentiality agreement (NDA) available" },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Startups</strong> stretching their budget to hire more skills sooner.</>, delay: 0 },
  { icon: ICON_CLOCK, text: <><strong>Growing teams</strong> that need coverage across more hours of the day.</>, delay: 60 },
  { icon: ICON_SEARCH, text: <><strong>Businesses hard-pressed to hire locally</strong> for specific roles.</>, delay: 120 },
  { icon: ICON_PEOPLE, text: <><strong>Companies building a hybrid team</strong> with U.S. leads and remote support.</>, delay: 180 },
];

const FAQS = [
  { q: "Nearshore vs offshore: what’s the difference?", a: <>Nearshore staff are in <strong>nearby countries with similar time zones,</strong> like Latin America for U.S. companies. Offshore staff are farther away, often in Asia, with bigger time differences.</> },
  { q: "How much does offshore or nearshore staffing cost?", a: <>It depends on the role, skills, location, and hours. <strong>We share options and pricing on the free call.</strong></> },
  { q: "Will offshore staff work during U.S. hours?", a: <>They can. Many offshore roles are set up as <strong>U.S.-hours shifts,</strong> or as overnight shifts for async and after-hours work.</> },
  { q: "Can I mix onshore, nearshore, and offshore staff?", a: <>Yes. Many teams combine a <strong>U.S.-based lead with nearshore and offshore support</strong> to balance overlap, coverage, and cost.</> },
  { q: "How do contracts and payroll work?", a: <>Engagement terms, contractor agreements, and payment setup are covered during onboarding. <strong>For employment and tax questions in specific countries, we recommend a qualified advisor.</strong></> },
  { q: "How do you keep quality consistent across locations?", a: <>Every candidate is <strong>skills-tested and interviewed before matching,</strong> with regular check-ins after, and replacement support if the fit isn’t right, wherever they’re based.</> },
];

/* -------- page -------- */

export default function GlobalStaffingView() {
  return (
    <div className="gs-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Talent & Staffing", href: "/talent-staffing" }}
        line1="Build your team in the"
        line2={
          <>
            right <span className="grad-text">location.</span>
          </>
        }
        lead={
          <>
            Remote staffing in the U.S., Latin America, or Asia, for the right role, time zone, and budget.{" "}
            <strong>Choose one model or combine all three into a team that covers the hours and skills you need.</strong>
          </>
        }
        primary={{ label: "Plan my remote team", href: "/contact" }}
        secondary={{ label: "Compare the models ↓", href: "#models" }}
      >
        <GlobeCard />
      </ServiceDetailHero>

      <TrustBar items={["U.S. · Latin America · Asia", "Time-zone aligned", "One model or a mix", "Skills-matched & vetted"]} />

      {/* STATS (dark) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How companies are sourcing talent</span>
            <h2>Outsourcing is shifting from cost-cutting toward skills.</h2>
            <p>Deloitte’s 2024 Global Outsourcing Survey of more than 500 executives.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="gs-stat-note">
            Survey results describe large organizations and vary by company size and industry.{" "}
            <strong>The shift is clear: talent access now beats cost as the reason to go global.</strong>
          </Reveal>
        </div>
      </section>

      {/* MODELS */}
      <section className="band tint" id="models">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Compare the models</span>
            <h2>The three models at a glance.</h2>
            <p>Each balances time zone, communication, and cost differently. There’s no single best option, only the best fit for each role.</p>
          </Reveal>
          <Reveal className="gs-mdl-grid">
            {MODELS.map((m) => (
              <article className={`gs-mdlc ${m.zone}`} key={m.title}>
                <div className="mh">
                  <span className="mi">{m.icon}</span>
                  <div>
                    <h3>{m.title}</h3>
                  </div>
                </div>
                <p className="mloc">{m.loc}</p>
                <dl>
                  {m.rows.map((row) => (
                    <div key={row.k}>
                      <dt className="k">{row.k}</dt>
                      <dd className="v">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="gs-mdl-note">
            Relative cost is a general market comparison, not a price. <strong>Actual cost depends on role, skills, and hours.</strong>
          </Reveal>
        </div>
      </section>

      {/* TIMEZONE */}
      <section className="band" id="timezone">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Time zones</span>
            <h2>Time-zone overlap with a U.S. team.</h2>
            <p>A typical 9–5 workday in each location, mapped to U.S. Eastern time. Offshore staff can also work U.S.-hours shifts.</p>
          </Reveal>
          <Reveal className="gs-tz">
            <div className="gs-tz-scale" aria-hidden="true">
              {TZ_SCALE.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {TZ_ROWS.map((row) => (
              <div className="gs-tzr" key={row.label}>
                <div className="tl">
                  <b>{row.label}</b>
                  <small>{row.sub}</small>
                </div>
                <div className="ttrack">
                  {row.fills.map((f, i) => (
                    <div className={`tfill ${f.cls}`} key={i} style={{ left: f.left, width: f.width } as CSSProperties}>
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="gs-tz-note">
            Times are approximate and shift with daylight saving. Nearshore overlap varies by country.
          </Reveal>
        </div>
      </section>

      {/* ROLE MATRIX */}
      <section className="band tint" id="byrole">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">By role</span>
            <h2>Which model fits which role.</h2>
            <p>A general guide to where each role often works well. Every team is different, so we tailor the mix to you.</p>
          </Reveal>
          <Reveal className="gs-rm-wrap">
            <RoleMatrix />
          </Reveal>
          <Reveal className="gs-rm-legend">
            <span>
              <span className="d2">
                <i></i>
                <i></i>
              </span>{" "}
              Often a strong fit
            </span>
            <span>
              <span className="d1">
                <i></i>
              </span>{" "}
              Can work well
            </span>
            <span>
              <span className="gs-rmdash">–</span> Less common
            </span>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>Planned, matched, onboarded, and backed up.</h2>
          </Reveal>
          <Reveal className="gs-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="gs-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who uses global staffing</span>
            <h2>More skills, more coverage, more budget headroom.</h2>
          </Reveal>
          <div className="gs-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="gs-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every plan." />

      <CtaBand
        id="start"
        eyebrow="Onshore, Nearshore & Offshore Staffing"
        heading="Build a team without borders."
        copy={
          <>
            Book a free call to plan the roles, locations, and hours that fit your business:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll map your working hours and suggest the location mix that covers them.</strong>
          </>
        }
        primaryLabel="Plan my remote team"
        primaryHref="/contact"
        secondary={{ label: "Compare the models", href: "#models", arrow: "↗" }}
      />
    </div>
  );
}
