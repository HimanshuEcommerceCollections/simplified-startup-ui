import type { IndustryData } from "../types";
import {
  ICON_AGING,
  ICON_BANK,
  ICON_CASH,
  ICON_CASH_PLAIN,
  ICON_CLIPBOARD,
  ICON_CODE,
  ICON_DOC,
  ICON_LIST_CIRCLE,
  ICON_LIST_TICK,
  ICON_MINUS,
  ICON_PAIR,
  ICON_PEN,
  ICON_PERSON,
  ICON_TREND,
} from "../icons";

export const AGENCIES: IndustryData = {
  hero: {
    line1: "See which clients and projects",
    line2: (
      <>
        actually make you <span className="grad-text">money.</span>
      </>
    ),
    lead: (
      <>
        <a href="/bookkeeping/monthly-bookkeeping">Monthly bookkeeping</a> for agencies:{" "}
        <strong>retainers, projects, contractors, and client pass-through costs organized so profit is clear.</strong>
      </>
    ),
    primaryLabel: "Book an agency bookkeeping call",
    secondaryHref: "#waterfall",
    card: {
      ariaLabel: "Gross billings reduced to real agency profit",
      live: "Gross → profit",
      corner: "PROFIT BY CLIENT",
      gross: { label: "Gross billings", value: "$40,000" },
      rows: [
        { icon: ICON_MINUS, name: "Pass-through ad spend", value: "−$18,000" },
        { icon: ICON_MINUS, name: "Contractors & delivery", value: "−$9,500" },
      ],
      net: { label: "Real profit · shown by client", value: "$12,500" },
      footLeft: "Earned fees, not billed-back costs",
      footRight: "true margin →",
    },
  },
  trust: ["Profit by client", "Pass-through costs separated", "Contractors organized", "Retainers and projects tracked"],
  why: {
    eyebrow: "Why agency books need extra care",
    heading: "Agency revenue isn’t always what it seems.",
    paras: [
      <>
        Agencies often bill clients for ad spend, software, or printing that <strong>passes straight through.</strong>
      </>,
      <>If those costs are mixed in with your fees, revenue looks bigger and margins look smaller than they really are.</>,
      <>
        Agency bookkeeping <strong>separates your earned fees from pass-through costs and tracks profit by client.</strong>
      </>,
    ],
    glance: ["Retainers and projects", "Client pass-through costs", "Freelancers and contractors", "Profit by client", "Cash flow from receivables"],
  },
  middle: [
    {
      id: "revtypes",
      eyebrow: "Agency revenue types",
      heading: "Each type is recorded so reports make sense.",
      block: {
        kind: "table",
        head: ["Revenue type", "What it is", "How we track it"],
        rows: [
          ["Retainers", "Ongoing monthly fees", "By client, month by month"],
          ["Projects", "One-time or milestone work", "By project and milestone"],
          ["Hourly work", "Billed by time", "Linked to timesheets or invoices"],
          ["Pass-through costs", "Ad spend and client expenses billed back", "Separated from earned fees"],
          ["Markups", "Fees added to pass-through costs", "Recorded as earned revenue"],
        ],
      },
    },
    {
      id: "waterfall",
      eyebrow: "From gross billing to real profit",
      heading: "How we show what your agency truly earns.",
      block: {
        kind: "waterfall",
        steps: [
          { key: "Gross billings", title: "Everything invoiced", text: "All fees and pass-through costs combined.", tag: "Start", tagKind: "base" },
          { key: "Pass-through costs", title: "Removed", text: "Ad spend and client expenses billed back.", tag: "− Remove", tagKind: "minus" },
          { key: "Agency revenue", title: "Your earned fees", text: "What your team actually earned.", tag: "Earned", tagKind: "base", variant: "plus" },
          { key: "Delivery costs", title: "Team and contractors", text: "People and tools used to deliver work.", tag: "− Remove", tagKind: "minus" },
          { key: "Profit", title: "What’s left", text: "Shown by client or project.", tag: "Profit", tagKind: "pr", variant: "profit" },
        ],
      },
    },
    {
      id: "contractors",
      eyebrow: "Contractors and freelancers",
      heading: "Many agencies rely on freelancers. We keep it organized.",
      block: {
        kind: "cards",
        cards: [
          { icon: ICON_CLIPBOARD, title: "W-9 collection", text: "Contractor details gathered for year-end forms." },
          { icon: ICON_LIST_CIRCLE, title: "Payments tracked", text: "Payments recorded by contractor and project." },
          { icon: ICON_DOC, title: "Year-end support", text: "Contractor totals ready for 1099 filing with your CPA or payroll provider." },
        ],
      },
    },
    {
      id: "close",
      eyebrow: "Your monthly agency close",
      heading: "A steady rhythm so books are ready every month.",
      block: {
        kind: "timeline",
        steps: [
          { when: "Early in the month", title: "Invoices and payments", text: "Client invoices and payments reconciled." },
          { when: "Next", title: "Costs and contractors", text: "Expenses and contractor payments categorized." },
          { when: "Then", title: "Client tagging", text: "Revenue and costs tagged by client or project." },
          { when: "Finally", title: "Reports", text: "Profit and loss with client profitability delivered." },
        ],
      },
    },
    {
      id: "reports",
      eyebrow: "Agency reports we prepare",
      heading: "Reports that show where profit really comes from.",
      block: {
        kind: "reports",
        items: [
          { icon: ICON_TREND, title: "Profit by client", text: "Which clients and retainers are most profitable." },
          { icon: ICON_LIST_TICK, title: "Revenue vs pass-through", text: "Earned fees separated from billed-back costs." },
          { icon: ICON_AGING, title: "Receivables aging", text: "Who owes you money and for how long." },
          { icon: ICON_CASH, title: "Cash flow", text: "Cash in and out, including client payments." },
        ],
      },
    },
  ],
  tools: {
    names: ["QuickBooks Online", "Xero", "Harvest", "Toggl", "Bill.com", "Gusto", "Deel", "HubSpot", "Stripe", "Brex", "Ramp", "Dext"],
    note: (
      <>
        We handle bookkeeping and reporting.{" "}
        <b>Tax filing, tax planning, and sales tax decisions are handled by your CPA or tax professional,</b> and we’re happy to work
        alongside them.
      </>
    ),
  },
  problems: {
    heading: "Common agency bookkeeping problems.",
    rows: [
      ["Ad spend counted as revenue", "Pass-through costs separated."],
      ["No profit by client", "Client and project tracking."],
      ["Contractor details missing at year-end", "W-9s collected throughout the year."],
      ["Late client payments unnoticed", "Receivables aging reviewed monthly."],
      ["Retainers and projects mixed", "Revenue grouped by type."],
    ],
  },
  included: {
    heading: "From client tracking to a year-end CPA package.",
    items: [
      { icon: ICON_BANK, text: "Monthly bookkeeping and reconciliations" },
      { icon: ICON_PERSON, text: "Client and project tracking" },
      { icon: ICON_LIST_CIRCLE, text: "Pass-through cost separation" },
      { icon: ICON_TREND, text: "Retainer and project revenue tracking" },
      { icon: ICON_CLIPBOARD, text: "Contractor payment tracking and W-9 collection" },
      { icon: ICON_AGING, text: "Receivables follow-up reports" },
      { icon: ICON_TREND, text: "Monthly profit and loss by client" },
      { icon: ICON_CASH_PLAIN, text: "Balance sheet and cash flow reports" },
      { icon: ICON_DOC, text: "Year-end package for your CPA" },
    ],
  },
  who: {
    heading: "Know where your agency’s profit really comes from.",
    items: [
      { icon: ICON_TREND, text: <><strong>Marketing and advertising agencies</strong> managing client ad spend.</> },
      { icon: ICON_PEN, text: <><strong>Creative and design studios</strong> working on projects.</> },
      { icon: ICON_CODE, text: <><strong>Web and development agencies</strong> with retainers and builds.</> },
      { icon: ICON_PAIR, text: <><strong>Agencies using freelancers</strong> who need contractor tracking.</> },
    ],
  },
  faq: {
    heading: "Agency bookkeeping: asked a lot.",
    items: [
      {
        q: "How much does agency bookkeeping cost?",
        a: <>It depends on number of clients, transaction volume, and reporting needs. <strong>We share pricing on the free call.</strong></>,
      },
      { q: "Can you show profit by client?", a: <>Yes. We <strong>tag revenue and costs by client or project in your accounting software.</strong></> },
      { q: "How do you handle client ad spend?", a: <>We separate pass-through costs from your earned fees so <strong>revenue and margins are accurate.</strong></> },
      { q: "Do you handle 1099s?", a: <>We collect contractor details and <strong>prepare totals for your CPA or payroll provider to file.</strong></> },
      { q: "Can you work with Harvest or other time tracking tools?", a: <>Yes. We can use <strong>time tracking data to support project reporting.</strong></> },
      {
        q: "Can you clean up past months?",
        a: (
          <>
            Yes. We can start with{" "}
            <strong>
              <a href="/bookkeeping/catch-up-bookkeeping">catch-up bookkeeping</a>
            </strong>
            , separating pass-through costs and tagging clients, before moving to monthly.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "Bookkeeping for Agencies",
    heading: "Know where your agency’s profit really comes from.",
    copy: (
      <>
        Book a free call to talk through your agency books:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review how your revenue and costs are tracked.</strong>
      </>
    ),
    primaryLabel: "Book an agency bookkeeping call",
    secondaryHref: "#waterfall",
  },
};
