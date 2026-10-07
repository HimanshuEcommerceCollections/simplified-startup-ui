"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./mb-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_INFO = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 11v5M12 8v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BANK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CARD = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_COLLECT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BALANCE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M4 10h16M10 10v10" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINES_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="19" cy="18" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINES_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 17l2 2 3-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 13 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PACKAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
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
const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: month-end close -------- */

const ACCOUNTS: { icon: ReactNode; name: string }[] = [
  { icon: ICON_BANK, name: "Business checking" },
  { icon: ICON_CARD, name: "Credit card" },
  { icon: ICON_DOLLAR, name: "Stripe payouts" },
];

const REPORT_TILES = ["P&L", "Balance", "Cash flow"];

function CloseCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the close is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A month-end close being finished"
      className={`mb-close${run ? " run" : ""}`}
      live="Month-end close"
      corner="OCT · RECONCILED"
      footLeft="Reconciled & tax-ready"
      footRight="delivered on schedule →"
    >
      <div className="mb-close-body">
        {ACCOUNTS.map((acct) => (
          <div className="mb-cl" key={acct.name}>
            <span className="cn">
              <span className="ci">{acct.icon}</span>
              {acct.name}
            </span>
            <span className="ck">{ICON_CHECK}</span>
          </div>
        ))}
      </div>
      <div className="mb-close-rep">
        {REPORT_TILES.map((name) => (
          <div className="mb-cr" key={name}>
            <span className="rn">{name}</span>
            <span className="rs">Ready</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why books matter (count-ups) -------- */

type Stat = { count: number; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 75,
    suffix: "%",
    label: "Rising costs",
    text: (
      <>
        Share of small firms citing rising costs of goods, services, or wages as a financial challenge. <em>Federal Reserve, 2025 SBCS</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 56,
    suffix: "%",
    label: "Paying operating expenses",
    text: (
      <>
        Share citing paying operating expenses as a financial challenge. <em>Federal Reserve, 2025 SBCS</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 51,
    suffix: "%",
    label: "Uneven cash flow",
    text: (
      <>
        Share citing uneven cash flows as a financial challenge. <em>Federal Reserve, 2025 SBCS</em>
      </>
    ),
    delay: 160,
  },
  {
    count: 56,
    suffix: "%",
    label: "Owed on unpaid invoices",
    text: (
      <>
        Share of small businesses owed money on unpaid invoices. <em>Intuit QuickBooks, 2025 Late Payments Report</em>
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
    <Reveal className="mb-stat" style={d(stat.delay)}>
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
    <div className="mb-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- how it works: four weeks -------- */

const WEEKS: { no: string; icon: ReactNode; title: string; items: string[] }[] = [
  { no: "Week 1", icon: ICON_COLLECT, title: "Collect", items: ["Bank and card feeds synced", "Receipts and bills gathered", "Questions sent to you"] },
  { no: "Week 2", icon: ICON_LIST_CHECK, title: "Categorize & reconcile", items: ["Transactions categorized", "Bank and card accounts reconciled", "Uncategorized items cleared"] },
  { no: "Week 3", icon: ICON_SEARCH, title: "Review", items: ["Receivables and payables checked", "Accruals and adjustments posted", "Accuracy review"] },
  { no: "Week 4", icon: ICON_TREND, title: "Report", items: ["Monthly reports delivered", "Summary of key changes", "Optional review call"] },
];

/* -------- monthly report pack -------- */

const REPORTS: { icon: ReactNode; title: string; answer: string }[] = [
  { icon: ICON_TREND, title: "Profit & Loss", answer: "Did we make money this month?" },
  { icon: ICON_BALANCE, title: "Balance Sheet", answer: "What do we own and owe?" },
  { icon: ICON_DOLLAR, title: "Cash Flow Statement", answer: "Where did the cash go?" },
  { icon: ICON_LINES_CIRCLE, title: "A/R Aging", answer: "Who still owes us money?" },
  { icon: ICON_LINES_CHECK, title: "A/P Aging", answer: "Which bills are coming due?" },
  { icon: ICON_DOC_LINES, title: "Monthly Summary", answer: "What changed and what needs attention?" },
];

/* -------- roles table -------- */

const ROLES: { k: string; us: string; cpa: string; tax: string }[] = [
  { k: "Main job", us: "Records & organizes every transaction", cpa: "Analyzes finances and advises on strategy", tax: "Prepares and files tax returns" },
  { k: "How often", us: "Weekly or monthly", cpa: "Monthly, quarterly, or yearly", tax: "Mostly once a year" },
  { k: "Typical work", us: "Categorizing, reconciling, monthly reports", cpa: "Financial review, planning, audits", tax: "Returns, deductions, filings" },
  { k: "How they connect", us: "Keeps your books current every month", cpa: "Relies on accurate books for advice", tax: "Relies on accurate books at tax time" },
];

/* -------- signs / software / included / who -------- */

const SIGNS = [
  "Bank accounts haven’t been reconciled in months",
  "Personal and business expenses are mixed",
  "You don’t know your monthly profit",
  "Tax season means a last-minute scramble",
  "Invoices go unpaid without follow-up",
  "Your CPA keeps asking for cleanup",
  "Receipts live in email and shoeboxes",
  "You’re preparing to raise money or apply for a loan",
];

const SOFTWARE = ["QuickBooks Online", "Xero", "Gusto", "Stripe", "Shopify", "Bill.com"];

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_BANK, text: "Bank and credit card feed setup and monitoring" },
  { icon: ICON_LINES, text: "Transaction categorization" },
  { icon: ICON_LIST_CHECK, text: "Bank and credit card reconciliation" },
  { icon: ICON_DOC_CHECK, text: "Receipt and bill matching" },
  { icon: ICON_LINES_CIRCLE, text: "Accounts receivable and payable tracking" },
  { icon: ICON_TREND, text: "Monthly P&L, Balance Sheet, and Cash Flow Statement" },
  { icon: ICON_DOC_LINES, text: "Monthly summary of key changes" },
  { icon: ICON_PACKAGE, text: "Year-end package for your CPA" },
  { icon: ICON_LOCK, text: "Secure document sharing" },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Startups</strong> that need clean numbers for investors and planning.</>, delay: 0 },
  { icon: ICON_CLOCK, text: <><strong>Small businesses</strong> where the owner is doing the books at night.</>, delay: 60 },
  { icon: ICON_CART, text: <><strong>E-commerce brands</strong> with high transaction volume across platforms.</>, delay: 120 },
  { icon: ICON_CHAT, text: <><strong>Agencies and service businesses</strong> tracking invoices, retainers, and expenses.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does monthly bookkeeping cost?", a: <>It depends on transaction volume, number of accounts, and complexity. <strong>We share pricing on the free call.</strong></> },
  { q: "Do you file my taxes?", a: <>No. Monthly bookkeeping keeps your records ready for tax time. <strong>Your CPA or tax professional handles filing and tax advice</strong>, and we work alongside them.</> },
  { q: "Which software do you use?", a: <>Mainly <strong>QuickBooks Online and Xero,</strong> connected to tools like Gusto, Stripe, Shopify, and Bill.com.</> },
  { q: "What if my books are months behind?", a: <>We start with <strong><a href="/bookkeeping/catch-up-bookkeeping">catch-up bookkeeping</a> to bring everything current,</strong> then move to a monthly schedule.</> },
  { q: "How do I share documents securely?", a: <>We use <strong>secure, permission-based access</strong> to your accounting software and a shared folder for receipts and statements.</> },
  { q: "Will I have the same bookkeeper each month?", a: <>Yes, you work with a <strong>consistent bookkeeper</strong> who learns your business, with team backup and oversight so your close never stalls.</> },
];

/* -------- page -------- */

export default function MonthlyBookkeepingView() {
  return (
    <div className="mb-page">
      <ServiceDetailHero
        compact
        className="mb-hero"
        crumb={{ label: "Bookkeeping & Accounting", href: "/bookkeeping" }}
        line1="Books that are closed,"
        line2={
          <>
            reconciled, and <span className="grad-text">ready.</span>
          </>
        }
        lead={
          <>
            Monthly bookkeeping for small businesses and startups:{" "}
            <strong>categorized transactions, reconciled accounts, and clear reports you can actually use.</strong>
          </>
        }
        primary={{ label: "Get my books in order", href: "/contact" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <CloseCard />
        {/* the kit hero has no slot under the actions; mb-page.css places this under the copy column */}
        <div className="mb-hero-note">
          {ICON_INFO}
          <span>
            Monthly bookkeeping covers your records and reports. <b>Tax filing and tax advice are handled by your CPA</b>, and we’re
            happy to work alongside them.
          </span>
        </div>
      </ServiceDetailHero>

      <TrustBar items={["QuickBooks & Xero", "Reconciled every month", "Reports you can read", "Year-end package for your CPA"]} />

      {/* WHY BOOKS MATTER (dark, stats) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why up-to-date books matter</span>
            <h2>Money pressures are common: clean books make them easier to see.</h2>
            <p>The Federal Reserve’s survey of more than 7,600 small employer firms.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="mb-stat-note">
            Clean, current books won’t remove these pressures, <strong>but they make them far easier to see and plan for.</strong>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS (4 weeks) */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Your monthly close, week by week.</h2>
            <p>Every month follows the same rhythm, so your books are finished on a predictable schedule.</p>
          </Reveal>
          <Reveal className="mb-wk4-grid">
            {WEEKS.map((week) => (
              <article className="mb-wk4" key={week.no}>
                <span className="w4n">{week.no}</span>
                <div className="w4i">{week.icon}</div>
                <h3>{week.title}</h3>
                <ul>
                  {week.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="mb-wk4-note">
            Timing depends on how quickly documents and answers come in each month.
          </Reveal>
        </div>
      </section>

      {/* REPORT PACK */}
      <section className="band" id="reports">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you receive</span>
            <h2>Your monthly report pack.</h2>
            <p>Each month you get a short set of reports that answer the questions owners ask most.</p>
          </Reveal>
          <Reveal className="mb-rep-grid">
            {REPORTS.map((rep) => (
              <article className="mb-repc" key={rep.title}>
                <div className="ri">{rep.icon}</div>
                <h3>{rep.title}</h3>
                <p className="ans">
                  <b>Answers</b>
                  {rep.answer}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ROLES TABLE */}
      <section className="band tint" id="roles">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who does what</span>
            <h2>Bookkeeper vs accountant vs tax preparer.</h2>
            <p>These roles are often confused. Here’s a simple, general breakdown of how they differ.</p>
          </Reveal>
          <Reveal className="mb-rl-tbl">
            <div className="mb-rl-row head">
              <div></div>
              <div className="us">Bookkeeper</div>
              <div>Accountant / CPA</div>
              <div>Tax preparer</div>
            </div>
            {ROLES.map((row) => (
              <div className="mb-rl-row" key={row.k}>
                <div>{row.k}</div>
                <div className="us">{row.us}</div>
                <div>{row.cpa}</div>
                <div>{row.tax}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SIGNS */}
      <section className="band" id="signs">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Signs to watch for</span>
            <h2>Do your books need help?</h2>
            <p>If a few of these sound familiar, monthly bookkeeping may be worth a look.</p>
          </Reveal>
          <Reveal className="mb-sign-grid">
            {SIGNS.map((sign) => (
              <div className="mb-sign" key={sign}>
                <span className="box">{ICON_CHECK}</span>
                <p>{sign}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mb-sign-note">
            Behind by several months?{" "}
            <strong>
              <a href="/bookkeeping/catch-up-bookkeeping">Catch-up bookkeeping</a> can bring your books current first
            </strong>
            , then we move to a monthly schedule.
          </Reveal>
        </div>
      </section>

      {/* SOFTWARE */}
      <section className="band tint" id="software">
        <div className="wrap">
          <Reveal className="sec-head" style={{ margin: "0 auto 36px", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Software
            </span>
            <h2>Platforms we work in.</h2>
          </Reveal>
          <Reveal className="mb-sw-row">
            {SOFTWARE.map((name) => (
              <span className="mb-sw" key={name}>
                <span className="sd"></span>
                {name}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every month includes</span>
            <h2>From feeds to a year-end package for your CPA.</h2>
          </Reveal>
          <Reveal className="mb-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="mb-inc2" key={item.text}>
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
            <span className="eyebrow">Who uses monthly bookkeeping</span>
            <h2>Owners who want their evenings, and their numbers, back.</h2>
          </Reveal>
          <div className="mb-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="mb-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every close." />

      <CtaBand
        id="start"
        eyebrow="Monthly Bookkeeping"
        heading="Start every month with clear numbers."
        copy={
          <>
            Book a free call to talk through your current books and what monthly bookkeeping would look like:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll look at how your books are kept today and what the monthly close would cover.</strong>
          </>
        }
        primaryLabel="Get my books in order"
        primaryHref="/contact"
        secondary={{ label: "See what’s included", href: "#included", arrow: "↗" }}
      />
    </div>
  );
}
