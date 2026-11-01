import type { IndustryData } from "../types";
import {
  ICON_BANK,
  ICON_BOLT,
  ICON_CALENDAR,
  ICON_CASH_WIDE,
  ICON_CLOUD,
  ICON_DOC,
  ICON_DOLLAR,
  ICON_GEAR,
  ICON_GRID4,
  ICON_LEDGER,
  ICON_LIST_TICK_LOW,
  ICON_MAIL,
  ICON_PERSON,
  ICON_PIE,
  ICON_SHIELD_CHECK,
  ICON_TABLE,
  ICON_TARGET,
  ICON_TREND,
} from "../icons";

export const SAAS: IndustryData = {
  hero: {
    line1: "Books that match how subscription",
    line2: (
      <>
        businesses really <span className="grad-text">work.</span>
      </>
    ),
    lead: (
      <>
        <a href="/bookkeeping/monthly-bookkeeping">Monthly bookkeeping</a> for SaaS companies:{" "}
        <strong>subscription revenue, deferred revenue, and investor-ready reports your board will understand.</strong>
      </>
    ),
    primaryLabel: "Book a SaaS bookkeeping call",
    secondaryHref: "#annual",
    card: {
      ariaLabel: "An annual plan recognized over 12 months",
      live: "Deferred revenue",
      corner: "CASH ≠ REVENUE",
      gross: { label: "Annual plan · paid upfront", value: "$12,000" },
      bars: [
        { label: "Month 1", width: "9%", value: "$1,000 earned" },
        { label: "Month 3", width: "25%", value: "$3,000 earned" },
        { label: "Month 6", width: "50%", value: "$6,000 earned" },
        { label: "Month 12", width: "100%", value: "$12,000 earned" },
      ],
      net: { label: "Recognized monthly, not all at once", value: "accrual" },
      footLeft: "Revenue earned over time",
      footRight: "investor-ready →",
    },
  },
  trust: ["Accrual-based books", "Deferred revenue tracked", "Stripe and billing reconciled", "Runway and burn reported"],
  why: {
    eyebrow: "Why SaaS bookkeeping is different",
    heading: "Cash received isn’t always revenue earned.",
    paras: [
      <>
        When a customer pays upfront for a year, you’ve received cash, but <strong>you earn that revenue over time.</strong>
      </>,
      <>SaaS books usually use accrual accounting, so revenue and expenses line up with the period they belong to.</>,
      <>
        That makes your numbers <strong>more meaningful for investors, planning, and decisions.</strong>
      </>,
    ],
    glance: ["Accrual accounting", "Deferred revenue", "Subscription billing data", "Investor-ready reports", "Runway and burn visibility"],
  },
  middle: [
    {
      id: "annual",
      eyebrow: "How an annual plan is recorded",
      heading: "A simple example of deferred revenue.",
      block: {
        kind: "timeline",
        steps: [
          { when: "When paid", title: "Cash received", text: "The full payment lands in your bank." },
          { when: "Same day", title: "Deferred revenue", text: "The amount is recorded as revenue not yet earned." },
          { when: "Each month", title: "Revenue recognized", text: "A portion moves from deferred to earned revenue." },
          { when: "End of term", title: "Fully earned", text: "All revenue for that plan has been recognized." },
        ],
      },
    },
    {
      id: "cashaccrual",
      eyebrow: "Cash vs accrual for SaaS",
      heading: "Why most SaaS companies use accrual books.",
      block: {
        kind: "compare",
        head: ["Cash basis", "Accrual basis"],
        rows: [
          { k: "Revenue", cash: "Recorded when cash arrives", acc: "Recorded when earned" },
          { k: "Expenses", cash: "Recorded when paid", acc: "Recorded when incurred" },
          { k: "Annual plans", cash: "Show as a large spike", acc: "Spread across the service period" },
          { k: "Investor view", cash: "Harder to compare month to month", acc: "Clearer trends and margins" },
        ],
      },
    },
    {
      id: "coa",
      eyebrow: "A SaaS chart of accounts",
      heading: "Accounts organized so reports answer SaaS questions.",
      block: {
        kind: "accounts",
        cards: [
          { kicker: "Revenue", icon: ICON_TREND, title: "By type", text: "Subscriptions, services, and other income." },
          { kicker: "Cost of revenue", icon: ICON_CLOUD, title: "Delivering the product", text: "Hosting, support, and third-party tools." },
          { kicker: "Operating expenses", icon: ICON_GEAR, title: "Running the business", text: "Sales and marketing, R&D, and general admin." },
          { kicker: "Balance sheet", icon: ICON_CASH_WIDE, title: "What you own and owe", text: "Cash, deferred revenue, and payables." },
        ],
      },
    },
    {
      id: "reports",
      eyebrow: "SaaS reports we prepare",
      heading: "Reports that help founders and boards make decisions.",
      block: {
        kind: "reports6",
        items: [
          { icon: ICON_TREND, title: "Profit and loss", text: "Accrual-based, with clear expense groups." },
          { icon: ICON_TARGET, title: "Burn and runway", text: "How fast cash is used and how long it lasts." },
          { icon: ICON_LIST_TICK_LOW, title: "Revenue summary", text: "Recognized and deferred revenue explained." },
          { icon: ICON_PIE, title: "Gross margin", text: "Revenue minus cost of revenue." },
          { icon: ICON_TABLE, title: "Budget vs actuals", text: "How spending compares to plan." },
          { icon: ICON_DOC, title: "Board-ready pack", text: "A tidy monthly or quarterly summary." },
        ],
      },
    },
    {
      id: "founderq",
      eyebrow: "Questions founders ask us",
      heading: "Books built to answer the questions that matter.",
      block: {
        kind: "founderQs",
        items: [
          { q: "How much runway do we have?", a: "A clear view based on current cash and spending." },
          { q: "Is our gross margin healthy?", a: "Cost of revenue tracked so margin is meaningful." },
          { q: "Where is spending growing?", a: "Expenses grouped by function." },
          { q: "Are we ready for due diligence?", a: "Clean, reconciled, accrual-based books." },
        ],
      },
    },
  ],
  tools: {
    names: ["QuickBooks Online", "Xero", "Stripe", "Chargebee", "Recurly", "Brex", "Ramp", "Mercury", "Gusto", "Rippling", "Bill.com", "Expensify"],
    note: (
      <>
        We handle bookkeeping and reporting.{" "}
        <b>Tax filing, tax planning, and sales tax decisions are handled by your CPA or tax professional,</b> and we’re happy to work
        alongside them. Revenue recognition and tax credits, like research credits, should be reviewed with your CPA.
      </>
    ),
  },
  problems: {
    heading: "Common SaaS bookkeeping problems.",
    rows: [
      ["Annual payments counted as one month’s revenue", "Deferred revenue recorded and recognized monthly."],
      ["Cash-basis books for investors", "Accrual-based books."],
      ["Hosting mixed with operating costs", "Cost of revenue tracked separately."],
      ["Stripe not reconciled", "Payouts matched to charges and fees."],
      ["No runway view", "Burn and runway reported monthly."],
    ],
  },
  included: {
    heading: "From accrual books to a year-end CPA package.",
    items: [
      { icon: ICON_LEDGER, text: "Accrual-based monthly bookkeeping" },
      { icon: ICON_MAIL, text: "Stripe and billing system reconciliation" },
      { icon: ICON_CALENDAR, text: "Deferred revenue schedule" },
      { icon: ICON_GRID4, text: "SaaS-ready chart of accounts" },
      { icon: ICON_BANK, text: "Bank, card, and payroll reconciliation" },
      { icon: ICON_TREND, text: "Monthly profit and loss and balance sheet" },
      { icon: ICON_TARGET, text: "Burn and runway reporting" },
      { icon: ICON_TABLE, text: "Budget vs actuals (optional)" },
      { icon: ICON_DOC, text: "Board and investor report support, plus year-end CPA package" },
    ],
  },
  who: {
    heading: "Get books your investors can trust.",
    items: [
      { icon: ICON_BOLT, text: <><strong>Pre-seed and seed SaaS startups</strong> setting up books properly.</> },
      { icon: ICON_DOLLAR, text: <><strong>Venture-backed companies</strong> reporting to investors and boards.</> },
      { icon: ICON_PERSON, text: <><strong>Founders handling books themselves</strong> who need it off their plate.</> },
      { icon: ICON_SHIELD_CHECK, text: <><strong>SaaS teams preparing to raise</strong> or go through due diligence.</> },
    ],
  },
  faq: {
    heading: "SaaS bookkeeping: asked a lot.",
    items: [
      {
        q: "How much does SaaS bookkeeping cost?",
        a: <>It depends on transaction volume, billing complexity, and reporting needs. <strong>We share pricing on the free call.</strong></>,
      },
      { q: "Do you track deferred revenue?", a: <>Yes. We maintain a <strong>deferred revenue schedule and recognize revenue monthly.</strong></> },
      { q: "Can you report MRR or ARR?", a: <>We can include subscription metrics in reports, <strong>based on your billing data and definitions.</strong></> },
      { q: "Do you work with our CPA and investors?", a: <>Yes. We prepare <strong>clean books and reports your CPA and investors can rely on.</strong></> },
      {
        q: "Do you provide CFO services?",
        a: (
          <>
            We can connect you with our{" "}
            <strong>
              <a href="/talent-staffing/fractional-specialists">CFO advisory</a> services for forecasting and strategy.
            </strong>
          </>
        ),
      },
      {
        q: "Can you clean up past months?",
        a: (
          <>
            Yes. We can start with{" "}
            <strong>
              <a href="/bookkeeping/catch-up-bookkeeping">catch-up bookkeeping</a> to get your books accrual-based and investor-ready
            </strong>{" "}
            before moving to monthly.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "Bookkeeping for SaaS",
    heading: "Get books your investors can trust.",
    copy: (
      <>
        Book a free call to talk through your SaaS books:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review how your revenue and expenses are recorded.</strong>
      </>
    ),
    primaryLabel: "Book a SaaS bookkeeping call",
    secondaryHref: "#annual",
  },
};
