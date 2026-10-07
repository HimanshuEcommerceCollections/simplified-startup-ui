"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./qx-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
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
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 13 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_USER = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_USERS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES_A = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES_B = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CARD = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_INVOICE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TABLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M9 20V9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* -------- hero signature: chart of accounts being built -------- */

/* row colours follow the blueprint section: Expenses is the cyan-teal there, purple is Equity */
const COA_ROWS: { color: string; name: string; sub: string }[] = [
  { color: "#2563eb", name: "Assets", sub: "Checking · A/R · Equipment" },
  { color: "#dc2626", name: "Liabilities", sub: "Cards · A/P · Loans" },
  { color: "#14b8a6", name: "Income", sub: "Product · Service · Subscriptions" },
  { color: "#d97706", name: "Cost of sales", sub: "Materials · Shipping" },
  { color: "#0e7490", name: "Expenses", sub: "Rent · Software · Payroll" },
];

function CoaCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the chart is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A clean chart of accounts being built"
      className={`qx-coa${run ? " run" : ""}`}
      live="Chart of accounts"
      corner="SET UP RIGHT"
      footLeft="Feeds & rules connected"
      footRight="reports you can trust →"
    >
      <div className="qx-coa-body">
        {COA_ROWS.map((row) => (
          <div className="qx-ca" key={row.name}>
            <span className="cc" style={{ background: row.color }}></span>
            <span className="cn">
              <b>{row.name}</b>
              <small>{row.sub}</small>
            </span>
            <span className="ck">clean</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_CLOCK, title: "Clean setup saves time", text: <>Bank rules and integrations handle repeat work automatically, <strong>every month.</strong></> },
  { icon: ICON_TREND, title: "Clear accounts, clear reports", text: <>A tidy chart of accounts <strong>makes your P&amp;L easy to read.</strong></> },
  { icon: ICON_DOC_CHECK, title: "Your CPA works faster", text: <>Organized books make <strong>year-end and tax prep smoother.</strong></> },
];

/* -------- two paths -------- */

const PATHS: { key: "a" | "b"; tag: string; title: string; when: ReactNode; items: string[]; delay: number }[] = [
  {
    key: "a",
    tag: "Path A",
    title: "Fresh Setup",
    when: <><b>Choose this if:</b> you’re new to QuickBooks or Xero, or starting a new business.</>,
    items: ["Company profile and settings", "Custom chart of accounts", "Bank and card feeds connected", "Invoice and bill templates", "Integrations connected", "Team training"],
    delay: 0,
  },
  {
    key: "b",
    tag: "Path B",
    title: "Cleanup",
    when: <><b>Choose this if:</b> your file exists but the numbers don’t look right.</>,
    items: ["Full file review", "Chart of accounts cleanup", "Duplicate and error fixes", "Bank rules repaired", "Reconciliations corrected", "Clean-file handoff"],
    delay: 90,
  },
];

/* -------- QuickBooks Online vs Xero -------- */

const PLATFORM_ROWS: { label: string; qb: string; xe: string }[] = [
  { label: "Often chosen by", qb: "Many U.S. small businesses and accountants", xe: "Many small businesses, especially with international ties" },
  { label: "Strengths", qb: "Wide app marketplace, familiar to many U.S. CPAs", xe: "Clean interface, strong bank reconciliation workflow" },
  { label: "Good fit if", qb: "Your CPA already works in QuickBooks", xe: "You prefer a simple layout or work with Xero advisors" },
  { label: "Payroll", qb: "Built-in payroll add-on available in the U.S.", xe: "Connects with payroll apps like Gusto" },
  { label: "Inventory", qb: "Inventory tracking on higher plans", xe: "Basic inventory, with add-on apps for more" },
];

/* -------- chart of accounts blueprint -------- */

const BLUEPRINT: { color: string; title: string; sub: string; items: string[] }[] = [
  { color: "#2563eb", title: "Assets", sub: "What you own", items: ["Checking account", "Savings account", "Accounts receivable", "Equipment"] },
  { color: "#dc2626", title: "Liabilities", sub: "What you owe", items: ["Credit cards", "Accounts payable", "Loans", "Sales tax payable"] },
  { color: "#7c3aed", title: "Equity", sub: "Owner’s stake", items: ["Owner investment", "Owner draws", "Retained earnings"] },
  { color: "#14b8a6", title: "Income", sub: "What you earn", items: ["Product sales", "Service revenue", "Subscriptions"] },
  { color: "#d97706", title: "Cost of Sales", sub: "Direct costs", items: ["Materials", "Shipping", "Contractor costs"] },
  { color: "#0e7490", title: "Expenses", sub: "Running costs", items: ["Rent", "Software", "Marketing", "Payroll"] },
];

/* -------- integrations -------- */

const INTEGRATIONS: { av: string; name: string }[] = [
  { av: "B", name: "Bank feeds" },
  { av: "S", name: "Stripe" },
  { av: "Sh", name: "Shopify" },
  { av: "Sq", name: "Square" },
  { av: "P", name: "PayPal" },
  { av: "G", name: "Gusto" },
  { av: "Bc", name: "Bill.com" },
  { av: "Ex", name: "Expensify" },
  { av: "Az", name: "Amazon" },
  { av: "Hs", name: "HubSpot" },
  { av: "Dx", name: "Dext" },
  { av: "Hd", name: "Hubdoc" },
];

/* -------- cleanup fix table -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Too many or duplicate accounts", fix: "Merged and renamed into a clear, simple chart of accounts." },
  { prob: "Duplicate customers and vendors", fix: "Combined so history and balances stay in one place." },
  { prob: "Bank rules sending items to the wrong place", fix: "Rules reviewed, corrected, or removed." },
  { prob: "Money stuck in “Undeposited Funds”", fix: "Payments matched to the right deposits." },
  { prob: "Old uncleared transactions", fix: "Investigated and resolved or documented." },
  { prob: "Inconsistent invoice and item setup", fix: "Products and services organized with correct accounts." },
];

/* -------- migration paths -------- */

const MIGRATIONS: { from: string; to: string; desc: string }[] = [
  { from: "QuickBooks Desktop", to: "QuickBooks Online", desc: "Customers, vendors, items, and history moved and checked." },
  { from: "QuickBooks Online", to: "Xero", desc: "Opening balances and key records transferred, then reconciled." },
  { from: "Xero", to: "QuickBooks Online", desc: "Lists and balances moved, with reports compared before and after." },
  { from: "Spreadsheets", to: "QuickBooks or Xero", desc: "Your records turned into a proper accounting file." },
];

/* -------- training -------- */

const TRAINING: { icon: ReactNode; title: string; items: ReactNode[] }[] = [
  { icon: ICON_USER, title: "For owners", items: [<>Reading your P&amp;L</>, "Checking cash balances", "Approving bills"] },
  { icon: ICON_USERS, title: "For your team", items: ["Creating invoices", "Recording expenses", "Uploading receipts"] },
  { icon: ICON_DOC_LINES, title: "Handoff docs", items: ["Setup summary", "Bank rule list", "Quick how-to guides"] },
];

/* -------- included -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Review of your business and current file" },
  { icon: ICON_LINES_A, text: "QuickBooks Online or Xero setup or cleanup" },
  { icon: ICON_LINES_B, text: "Custom chart of accounts" },
  { icon: ICON_CARD, text: "Bank and credit card feeds connected" },
  { icon: ICON_LIST_CHECK, text: "Bank rules created or repaired" },
  { icon: ICON_LINK, text: "Key integrations connected" },
  { icon: ICON_INVOICE, text: "Invoice, bill, and product setup" },
  { icon: ICON_LIST_CHECK, text: "Reconciliation check after setup or cleanup" },
  { icon: ICON_USER, text: "Training session and handoff documents" },
];

/* -------- who / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>New businesses</strong> setting up accounting software for the first time.</>, delay: 0 },
  { icon: ICON_SEARCH, text: <><strong>Owners who set up QuickBooks or Xero themselves</strong> and now don’t trust the reports.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Businesses switching platforms</strong> or moving from QuickBooks Desktop to Online.</>, delay: 120 },
  { icon: ICON_TABLE, text: <><strong>Teams moving from spreadsheets</strong> to proper accounting software.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does QuickBooks or Xero setup cost?", a: <>It depends on whether you need setup, cleanup, or migration, and how complex your business is. <strong>We share pricing on the free call.</strong></> },
  { q: "Should I choose QuickBooks Online or Xero?", a: <>Both work well for many small businesses. <strong>We’ll talk through your needs and your CPA’s preference</strong> before recommending one.</> },
  { q: "Will I lose data when migrating?", a: <>We plan the migration carefully and <strong>compare reports before and after</strong> so key balances and records carry over.</> },
  { q: "Do I need to buy the software subscription?", a: <>Yes. The subscription is <strong>in your name and paid directly to Intuit or Xero,</strong> so you always own your file.</> },
  {
    q: "Can you keep the books after setup?",
    a: (
      <>
        Yes. Many businesses move straight into <strong><a href="/bookkeeping/monthly-bookkeeping">monthly bookkeeping</a></strong> once the file is set up or cleaned.
      </>
    ),
  },
  { q: "How long does setup or cleanup take?", a: <>A fresh setup is usually quick; a cleanup depends on file size and how tangled things are. <strong>We give you a timeline after the file review</strong> on the free call.</> },
];

/* -------- page -------- */

export default function QuickbooksXeroSetupView() {
  return (
    <div className="qx-page">
      <ServiceDetailHero
        compact
        className="qx-hero"
        crumb={{ label: "Bookkeeping & Accounting", href: "/bookkeeping" }}
        line1="QuickBooks or Xero,"
        line2={
          <>
            set up <span className="grad-text">right.</span>
          </>
        }
        lead={
          <>
            Setup, cleanup, and migration for QuickBooks Online and Xero, <strong>so your accounting software reflects how your business actually runs.</strong>
          </>
        }
        primary={{ label: "Fix my accounting software", href: "/contact" }}
        secondary={{ label: "Setup or cleanup? ↓", href: "#path" }}
      >
        <CoaCard />
        {/* the kit hero has no slot under the actions; this chip is placed on the grid's second row, left column (see qx-page.css) */}
        <div className="qx-hero-note">
          {ICON_INFO}
          <span>
            We set up and organize your software. <b>Tax settings, sales tax, and filing should be confirmed with your CPA</b>, and we work alongside them.
          </span>
        </div>
      </ServiceDetailHero>

      <TrustBar items={["QuickBooks Online & Xero", "Setup, cleanup & migration", "You own the subscription", "Training & handoff included"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Your software is only as good as its setup.</h2>
            <p>
              Accounting software makes bookkeeping faster, but only when it’s set up to match your business. A messy chart of accounts, broken bank rules, or missing
              integrations lead to reports you can’t trust.
            </p>
          </Reveal>
          <Reveal className="qx-why-grid">
            {WHY.map((item) => (
              <article className="qx-whyc" key={item.title}>
                <div className="wi">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="qx-why-quote">
            Most accounting software problems aren’t software problems. <span>They’re setup problems.</span>
          </Reveal>
        </div>
      </section>

      {/* 2-PATH */}
      <section className="band" id="path">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Choose your path</span>
            <h2>Setup or cleanup: which do you need?</h2>
          </Reveal>
          <div className="qx-path-grid">
            {PATHS.map((path) => (
              <Reveal as="article" className={`qx-path ${path.key}`} key={path.key} style={d(path.delay)}>
                <span className="ptag">{path.tag}</span>
                <h3>{path.title}</h3>
                <p className="pwhen">{path.when}</p>
                <ul>
                  {path.items.map((li) => (
                    <li key={li}>
                      <span className="m">{ICON_CHECK}</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="qx-path-note">
            Not sure which applies? <strong>Many businesses need a bit of both.</strong> We’ll recommend the right starting point on the call.
          </Reveal>
        </div>
      </section>

      {/* QBO VS XERO */}
      <section className="band tint" id="platform">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pick your platform</span>
            <h2>QuickBooks Online vs Xero.</h2>
            <p>Both are strong cloud accounting tools. The right one depends on your business, your team, and your CPA.</p>
          </Reveal>
          <Reveal className="qx-vx-tbl">
            <div className="qx-vx-row head">
              <div></div>
              <div className="qb">QuickBooks Online</div>
              <div className="xe">Xero</div>
            </div>
            {PLATFORM_ROWS.map((row) => (
              <div className="qx-vx-row" key={row.label}>
                <div>{row.label}</div>
                <div className="qb">{row.qb}</div>
                <div className="xe">{row.xe}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="qx-vx-note">
            General comparison only. Features and plans change, so we confirm the details for your situation.
          </Reveal>
        </div>
      </section>

      {/* COA BLUEPRINT */}
      <section className="band" id="coablueprint">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The foundation</span>
            <h2>Chart of accounts blueprint.</h2>
            <p>Your chart of accounts is the list of categories every transaction goes into. We build it around how your business earns and spends money.</p>
          </Reveal>
          <Reveal className="qx-coa-grid">
            {BLUEPRINT.map((card) => (
              <article className="qx-coac" key={card.title}>
                <div className="cbar" style={{ background: card.color }}></div>
                <h3>{card.title}</h3>
                <div className="csub">{card.sub}</div>
                <ul>
                  {card.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="qx-coa-note">
            Example categories only. Your chart of accounts is customized to your industry and reviewed with your CPA.
          </Reveal>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="band tint" id="integrations">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Connected tools</span>
            <h2>Integrations we connect.</h2>
            <p>Connecting your other tools means fewer manual entries and fewer mistakes.</p>
          </Reveal>
          <Reveal className="qx-int-grid">
            {INTEGRATIONS.map((tool) => (
              <article className="qx-intc" key={tool.name}>
                <span className="ii">{tool.av}</span>
                <span>{tool.name}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CLEANUP FIX TABLE */}
      <section className="band" id="fix">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Cleanup</span>
            <h2>What we fix in a messy file.</h2>
          </Reveal>
          <Reveal className="qx-fix-tbl">
            <div className="qx-fix-row head">
              <div>The problem</div>
              <div>How it gets fixed</div>
            </div>
            {FIXES.map((row) => (
              <div className="qx-fix-row" key={row.prob}>
                <div className="prob">
                  <span className="xi">{ICON_X}</span>
                  {row.prob}
                </div>
                <div className="fix">
                  <span className="vi">{ICON_CHECK}</span>
                  {row.fix}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MIGRATION */}
      <section className="band tint" id="migration">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Switching software</span>
            <h2>Migration paths.</h2>
            <p>Moving to new accounting software? We handle the transfer and check the numbers after.</p>
          </Reveal>
          <Reveal className="qx-mig-list">
            {MIGRATIONS.map((row) => (
              <article className="qx-mig" key={`${row.from}-${row.to}`}>
                <span className="mfrom">{row.from}</span>
                <span className="marr">{ICON_ARROW}</span>
                <span className="mto">{row.to}</span>
                <span className="mdesc">{row.desc}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TRAINING */}
      <section className="band" id="training">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">After setup</span>
            <h2>Training &amp; handoff.</h2>
            <p>You and your team learn the parts of the software you’ll actually use.</p>
          </Reveal>
          <Reveal className="qx-tr3-grid">
            {TRAINING.map((card) => (
              <article className="qx-tr3" key={card.title}>
                <h3>
                  <span className="ti">{card.icon}</span>
                  {card.title}
                </h3>
                <ul>
                  {card.items.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every project includes</span>
            <h2>From a file review to training and handoff.</h2>
          </Reveal>
          <Reveal className="qx-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="qx-inc2" key={item.text}>
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
            <span className="eyebrow">Who needs setup or cleanup</span>
            <h2>Set it up once, set it up right.</h2>
          </Reveal>
          <div className="qx-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="qx-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every setup." />

      {/* the CTA heading repeats the #forwho heading in the design; kept as designed */}
      <CtaBand
        id="start"
        eyebrow="QuickBooks & Xero Setup and Cleanup"
        heading="Set it up once. Set it up right."
        copy={
          <>
            Book a free call to review your accounting software and the best next step:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll take a quick look at your file and recommend setup, cleanup, or migration.</strong>
          </>
        }
        primaryLabel="Fix my accounting software"
        primaryHref="/contact"
        secondary={{ label: "Setup or cleanup?", href: "#path", arrow: "↗" }}
      />
    </div>
  );
}
