"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./cb-page.css";

/* -------- icons -------- */

const check = (width: string) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_CARD = check("2.8");
const ICON_CHECK_FIX = check("2.6");
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_INFO = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 11v5M12 8v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GATHER = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REBUILD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 15v6M16 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CATEGORIZE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_RECONCILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_HANDOFF = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 13 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CARD = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLEANUP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h4v4M20 17h-4v-4M8 7s2 4 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

/* -------- hero signature: backlog -> current -------- */

const MONTHS = ["July", "August", "September", "October"];

function CatchUpCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the card is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="Months of backlog being brought current"
      className={`cb-card${run ? " run" : ""}`}
      live="Backlog → current"
      corner="REBUILT & RECONCILED"
      footLeft="Month by month, until it matches"
      footRight="caught up & CPA-ready →"
    >
      <div className="cb-card-body">
        {MONTHS.map((month) => (
          <div className="cb-cm" key={month}>
            <span className="cmbar"></span>
            <span className="cmn">
              {month} <span className="tag">reconciled</span>
            </span>
            <span className="cmk">{ICON_CHECK_CARD}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- penalty stats (count-ups, decimals handled) -------- */

type Stat = { count: number; decimals: number; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 5,
    decimals: 0,
    suffix: "% / mo",
    label: "Failure-to-file penalty",
    text: (
      <>
        Of unpaid tax for each month or part of a month a return is late, up to 25%. <em>IRS.gov</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 0.5,
    decimals: 1,
    suffix: "% / mo",
    label: "Failure-to-pay penalty",
    text: (
      <>
        Of unpaid tax for each month or part of a month it stays unpaid, up to 25%. <em>IRS.gov</em>
      </>
    ),
    delay: 80,
  },
  {
    // the design counts 47 with a ".5%" suffix, so the figure reads "0.5%" while it climbs;
    // counting the real value with one decimal keeps every frame an honest number
    count: 47.5,
    decimals: 1,
    suffix: "%",
    label: "Combined maximum",
    text: (
      <>
        The highest combined late-filing and late-payment penalty on the tax owed. <em>IRS.gov</em>
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
    <Reveal className="cb-stat" style={d(stat.delay)}>
      <div className="sv">
        {shown.toFixed(stat.decimals)}
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
    <div className="cb-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- where you stand -------- */

const SCOPES: { head: string; range: string; lit: number; items: string[] }[] = [
  { head: "A little behind", range: "1–3 months", lit: 1, items: ["Recent statements are easy to get", "Mostly categorizing and reconciling", "Often the quickest to finish"] },
  { head: "Most of a year", range: "3–12 months", lit: 3, items: ["More documents to gather", "Some errors to fix", "Usually done in stages"] },
  { head: "Several years", range: "1+ years", lit: 5, items: ["Older records may be missing", "Year-by-year rebuild", "Close coordination with your CPA"] },
];

/* -------- how it works -------- */

const STEPS: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_GATHER, title: "Gather", text: "Collect statements, receipts, and past records." },
  { no: "02", icon: ICON_REBUILD, title: "Rebuild", text: "Enter or import missing transactions." },
  { no: "03", icon: ICON_CATEGORIZE, title: "Categorize", text: "Assign every transaction to the right account." },
  { no: "04", icon: ICON_RECONCILE, title: "Reconcile", text: "Match books to bank and card statements." },
  { no: "05", icon: ICON_HANDOFF, title: "Hand-off", text: "Reports and a summary ready for your CPA." },
];

/* -------- documents -------- */

const DOCS: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_CARD, title: "Banking", items: ["Bank statements", "Credit card statements", "Loan statements", "Merchant processor reports"] },
  { icon: ICON_TREND, title: "Income & Expenses", items: ["Sales and invoice records", "Receipts and bills", "Recurring vendor list", "Payroll reports"] },
  { icon: ICON_FILE, title: "Background", items: ["Prior tax returns", "Last known accurate balances", "Accounting software access", "Notes on unusual items"] },
];

/* -------- problem -> fix -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Duplicate transactions", fix: "Removed after matching against bank statements." },
  { prob: "Hundreds of uncategorized items", fix: "Sorted into the right accounts with clear rules." },
  { prob: "Personal and business spending mixed", fix: "Separated and flagged for owner review." },
  { prob: "Accounts that don’t reconcile", fix: "Traced month by month until balances match." },
  { prob: "Missing receipts", fix: "Listed and requested, with gaps noted for your CPA." },
  { prob: "Wrong opening balances", fix: "Corrected using statements and prior returns." },
];

/* -------- included -------- */

const INCLUDED: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_SEARCH, text: "Review of your current books and missing periods" },
  { icon: ICON_FILE, text: "Document checklist and collection support" },
  { icon: ICON_REBUILD, text: "Missing transactions entered or imported" },
  { icon: ICON_LINES, text: "Categorization of all transactions" },
  { icon: ICON_RECONCILE, text: "Bank and credit card reconciliation for every month" },
  { icon: ICON_CLEANUP, text: "Cleanup of duplicates and errors" },
  { icon: ICON_TREND, text: "Profit & Loss and Balance Sheet for each period" },
  { icon: ICON_FILE, text: "Summary of open items for your CPA" },
  {
    icon: ICON_REFRESH,
    text: (
      <>
        Option to move straight into <a href="/bookkeeping/monthly-bookkeeping">monthly bookkeeping</a>
      </>
    ),
  },
];

/* -------- who / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_CLOCK, text: <><strong>Owners who fell behind</strong> during a busy season or a big change.</>, delay: 0 },
  { icon: ICON_CALENDAR, text: <><strong>Businesses facing a tax deadline</strong> with books that aren’t ready.</>, delay: 60 },
  { icon: ICON_ROCKET, text: <><strong>Founders preparing to raise money or apply for a loan</strong> who need clean historical numbers.</>, delay: 120 },
  { icon: ICON_REFRESH, text: <><strong>Companies switching bookkeepers</strong> and inheriting messy records.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does catch-up bookkeeping cost?", a: <>It depends on how many months are behind, the number of accounts, and transaction volume. <strong>We share pricing after reviewing your books on the free call.</strong></> },
  { q: "How long does catch-up take?", a: <>It depends on how far behind you are and how quickly documents come in. Smaller catch-ups move faster; <strong>multi-year work is usually done in stages.</strong></> },
  { q: "Can you help with back taxes?", a: <>We prepare accurate books that your CPA or tax professional can use for past-due or amended returns. <strong>Tax filing and IRS matters are handled by them.</strong></> },
  { q: "What if I’m missing statements or receipts?", a: <>We help you request copies from banks and vendors, and <strong>note any gaps so your CPA knows how they were handled.</strong></> },
  { q: "What happens after my books are caught up?", a: <>You can keep them current with <strong><a href="/bookkeeping/monthly-bookkeeping">monthly bookkeeping</a>,</strong> so you don’t fall behind again.</> },
  { q: "Will this affect my current accounting software?", a: <>We work inside your existing <strong>QuickBooks or Xero</strong> (or set it up if needed), rebuilding history cleanly without disrupting what’s already there.</> },
];

/* -------- page -------- */

export default function CatchUpBookkeepingView() {
  return (
    <div className="cb-page">
      <ServiceDetailHero
        compact
        className="cb-hero"
        crumb={{ label: "Bookkeeping & Accounting", href: "/bookkeeping" }}
        line1="Behind on your books?"
        line2={
          <>
            Let’s get them <span className="grad-text">current.</span>
          </>
        }
        lead={
          <>
            Catch-up bookkeeping that rebuilds, categorizes, and reconciles past months or years,{" "}
            <strong>so your records are accurate and ready for your CPA.</strong> Without the stress.
          </>
        }
        primary={{ label: "Get caught up", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <CatchUpCard />
        <div className="cb-hero-note">
          {ICON_INFO}
          <span>
            Catch-up brings your <b>records</b> up to date. Tax filing, amended returns, and IRS matters are handled by your CPA, and we
            work alongside them.
          </span>
        </div>
      </ServiceDetailHero>

      <TrustBar items={["Rebuilt & reconciled", "Months or years", "Ready for your CPA", "Then stay current monthly"]} />

      {/* WHY (penalty stats, dark) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>The cost of falling behind.</h2>
            <p>Messy books often lead to late tax returns. Under general IRS rules, late filing and late payment add up quickly.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="cb-stat-note">
            Source: IRS.gov, Collection Procedural Questions. Interest may also apply.{" "}
            <strong>Your CPA can confirm what applies to your situation.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHERE YOU STAND */}
      <section className="band tint" id="stand">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where you stand</span>
            <h2>How far behind are you?</h2>
            <p>Catch-up work is scoped by how many months are missing and how complex your accounts are.</p>
          </Reveal>
          <Reveal className="cb-tier3-grid">
            {SCOPES.map((scope) => (
              <article className="cb-t3" key={scope.head}>
                <span className="t3h">{scope.head}</span>
                <div className="t3r">{scope.range}</div>
                <div className="meter" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <i className={i < scope.lit ? "on" : undefined} key={i}></i>
                  ))}
                </div>
                <ul>
                  {scope.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS (5 steps) */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>The catch-up process.</h2>
            <p>Each step builds on the last, so every month is checked before your books are handed off.</p>
          </Reveal>
          <Reveal className="cb-proc5">
            {STEPS.map((step, i) => (
              // the arrow separators are siblings of the cards, as in the design
              <StepPair key={step.no} step={step} last={i === STEPS.length - 1} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="band tint" id="docs">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Before we start</span>
            <h2>Documents we’ll need.</h2>
            <p>Don’t worry if some are missing: we’ll help you track down what we can.</p>
          </Reveal>
          <Reveal className="cb-doc-grid">
            {DOCS.map((doc) => (
              <article className="cb-docc" key={doc.title}>
                <h3>
                  <span className="di">{doc.icon}</span>
                  {doc.title}
                </h3>
                <ul>
                  {doc.items.map((li) => (
                    <li key={li}>
                      <span className="db">{ICON_CHECK_CARD}</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="cb-doc-note">
            Missing a few? We request copies from banks and vendors, and note any gaps for your CPA.
          </Reveal>
        </div>
      </section>

      {/* PROBLEM -> FIX */}
      <section className="band" id="fix">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we fix</span>
            <h2>Common problems we untangle.</h2>
          </Reveal>
          <Reveal className="cb-fix-tbl">
            <div className="cb-fix-row head">
              <div>The problem</div>
              <div>How it gets fixed</div>
            </div>
            {FIXES.map((row) => (
              <div className="cb-fix-row" key={row.prob}>
                <div className="prob">
                  <span className="xi">{ICON_X}</span>
                  {row.prob}
                </div>
                <div className="fix">
                  <span className="vi">{ICON_CHECK_FIX}</span>
                  {row.fix}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every catch-up includes</span>
            <h2>From a backlog review to a clean hand-off, and a way to stay current.</h2>
          </Reveal>
          <Reveal className="cb-inc2-grid">
            {INCLUDED.map((item, i) => (
              <div className="cb-inc2" key={i}>
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
            <span className="eyebrow">Who needs catch-up bookkeeping</span>
            <h2>If the backlog is keeping you up at night…</h2>
          </Reveal>
          <div className="cb-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="cb-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every cleanup." />

      <CtaBand
        id="start"
        eyebrow="Catch-Up Bookkeeping"
        heading="Clear the backlog and start fresh."
        copy={
          <>
            Book a free call to review where your books stand and what it will take to bring them current:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll look at how many months need work and what’s involved.</strong>
          </>
        }
        primaryLabel="Get caught up"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
      />
    </div>
  );
}

/* a step card plus the arrow that follows it (none after the last) */
function StepPair({ step, last }: { step: (typeof STEPS)[number]; last: boolean }) {
  return (
    <>
      <article className="cb-p5">
        <span className="p5n">{step.no}</span>
        <div className="p5i">{step.icon}</div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </article>
      {!last && (
        <span className="cb-p5arr" aria-hidden="true">
          {ICON_ARROW}
        </span>
      )}
    </>
  );
}
