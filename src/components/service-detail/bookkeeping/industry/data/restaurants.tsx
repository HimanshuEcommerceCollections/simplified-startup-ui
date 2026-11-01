import type { IndustryData } from "../types";
import {
  ICON_BANK,
  ICON_CASH,
  ICON_CASH_PLAIN,
  ICON_COIN,
  ICON_DOC,
  ICON_FORK,
  ICON_GLASS,
  ICON_GRID4,
  ICON_LIST_CIRCLE_7,
  ICON_PIE,
  ICON_RECEIPT,
  ICON_ROOF,
  ICON_TEAM,
  ICON_TEAM_SHORT,
  ICON_TICKET,
  ICON_TREND,
} from "../icons";

export const RESTAURANTS: IndustryData = {
  hero: {
    line1: "Bookkeeping that keeps up with",
    line2: (
      <>
        a busy <span className="grad-text">kitchen.</span>
      </>
    ),
    lead: (
      <>
        <a href="/bookkeeping/monthly-bookkeeping">Monthly bookkeeping</a> for restaurants, cafés, and bars:{" "}
        <strong>POS sales, delivery apps, food costs, and labor organized into reports you can act on.</strong>
      </>
    ),
    primaryLabel: "Book a restaurant bookkeeping call",
    secondaryHref: "#prime",
    card: {
      ariaLabel: "Daily sales and prime cost at a glance",
      live: "Prime cost",
      corner: "FOOD + BEV + LABOR",
      gross: { label: "Monthly sales", value: "$84,000" },
      rows: [
        { icon: ICON_FORK, name: "Food cost", value: "28%", tone: "blue" },
        { icon: ICON_GLASS, name: "Beverage cost", value: "8%", tone: "cyan" },
        { icon: ICON_TEAM, name: "Labor cost", value: "30%", tone: "teal" },
      ],
      net: { label: "Prime cost · combined", value: "66%" },
      footLeft: "One number to watch",
      footRight: "run the business →",
    },
  },
  trust: ["POS sales reconciled", "Delivery apps tracked", "Food and labor costs clear", "Tips recorded properly"],
  why: {
    eyebrow: "Why restaurant books need special attention",
    heading: "Lots of daily transactions, thin margins, and many moving parts.",
    paras: [
      <>
        Restaurants handle sales every day across cards, cash, and delivery apps, <strong>each with its own fees and timing.</strong>
      </>,
      <>Food and labor costs move quickly, so small errors can hide real problems.</>,
      <>
        Restaurant bookkeeping <strong>turns daily activity into clear monthly numbers you can use to run the business.</strong>
      </>,
    ],
    glance: ["Daily POS sales", "Delivery app payouts", "Tips and gratuities", "Food and beverage costs", "Labor costs"],
  },
  middle: [
    {
      id: "sources",
      eyebrow: "Sales sources we reconcile",
      heading: "Each sales source pays you differently.",
      block: {
        kind: "table",
        head: ["Source", "What we track", "How we reconcile"],
        rows: [
          ["POS card sales", "Sales, tips, and processing fees", "Daily sales matched to deposits"],
          ["Cash sales", "Cash collected and deposited", "Compared to POS reports"],
          ["Delivery apps", "Orders, commissions, and adjustments", "Payouts matched to app reports"],
          ["Online ordering", "Sales and processing fees", "Matched to platform payouts"],
          ["Gift cards", "Sold and redeemed amounts", "Tracked as a liability until used"],
        ],
      },
    },
    {
      id: "prime",
      eyebrow: "Understanding prime cost",
      heading: "Prime cost combines your biggest expenses into one number to watch.",
      block: {
        kind: "primeCost",
        bars: [
          { icon: ICON_FORK, label: "Food cost", fill: "food", width: "42%", value: "on the plate" },
          { icon: ICON_GLASS, label: "Beverage cost", fill: "bev", width: "14%", value: "in the glass" },
          { icon: ICON_TEAM, label: "Labor cost", fill: "labor", width: "46%", value: "your team" },
        ],
        total: { title: "Prime cost", text: "Food, beverage, and labor together", value: "one number" },
      },
    },
    {
      id: "tips",
      eyebrow: "Tips and gratuities",
      heading: "Tips need to be recorded and passed through correctly.",
      block: {
        kind: "cards",
        cards: [
          { icon: ICON_BANK, title: "Card tips", text: "Recorded from POS and paid out through payroll." },
          { icon: ICON_COIN, title: "Cash tips", text: "Reported according to your payroll process." },
          { icon: ICON_TICKET, title: "Service charges", text: "Tracked separately from tips where applicable." },
        ],
      },
    },
    {
      id: "close",
      eyebrow: "Your monthly restaurant close",
      heading: "A steady rhythm so books are ready every month.",
      block: {
        kind: "timeline",
        steps: [
          { when: "Throughout the month", title: "Daily sales", text: "POS and delivery sales recorded." },
          { when: "Early next month", title: "Reconcile", text: "Deposits, cards, and apps matched." },
          { when: "Then", title: "Costs and inventory", text: "Food, beverage, and supply costs updated." },
          { when: "Finally", title: "Reports", text: "Profit and loss with prime cost delivered." },
        ],
      },
    },
    {
      id: "reports",
      eyebrow: "Restaurant reports we prepare",
      heading: "Reports grouped the way restaurant owners think.",
      block: {
        kind: "reports",
        items: [
          { icon: ICON_TREND, title: "Profit and loss", text: "Grouped the way restaurant owners think." },
          { icon: ICON_PIE, title: "Prime cost summary", text: "Food, beverage, and labor in one view." },
          { icon: ICON_LIST_CIRCLE_7, title: "Sales by channel", text: "Dine-in, takeout, and delivery compared." },
          { icon: ICON_CASH, title: "Cash flow", text: "Cash in and out, including vendor payments." },
        ],
      },
    },
  ],
  tools: {
    names: ["QuickBooks Online", "Xero", "Toast", "Square", "Clover", "DoorDash", "Uber Eats", "Grubhub", "7shifts", "Gusto", "MarginEdge", "Restaurant365"],
    note: (
      <>
        We handle bookkeeping and reporting.{" "}
        <b>Tax filing, tax planning, and sales tax decisions are handled by your CPA or tax professional,</b> and we’re happy to work
        alongside them. Tip reporting and sales tax rules vary by location, so confirm requirements with your CPA and payroll provider.
      </>
    ),
  },
  problems: {
    heading: "Common restaurant bookkeeping problems.",
    rows: [
      ["Deposits recorded as sales", "Sales recorded from POS reports, then matched."],
      ["Delivery app fees hidden", "Commissions and fees recorded separately."],
      ["Tips mixed into revenue", "Tips recorded as pass-through."],
      ["Food costs not updated", "Supplier invoices and inventory reviewed monthly."],
      ["Gift cards counted as sales", "Recorded as a liability until redeemed."],
    ],
  },
  included: {
    heading: "From daily POS sales to a year-end CPA package.",
    items: [
      { icon: ICON_RECEIPT, text: "Daily POS sales recording" },
      { icon: ICON_ROOF, text: "Delivery and online order reconciliation" },
      { icon: ICON_BANK, text: "Bank and card reconciliation" },
      { icon: ICON_FORK, text: "Food, beverage, and supply cost tracking" },
      { icon: ICON_COIN, text: "Tip and gift card tracking" },
      { icon: ICON_TEAM_SHORT, text: "Payroll reconciliation" },
      { icon: ICON_TREND, text: "Monthly profit and loss with prime cost" },
      { icon: ICON_CASH_PLAIN, text: "Balance sheet and cash flow reports" },
      { icon: ICON_DOC, text: "Year-end package for your CPA" },
    ],
  },
  who: {
    heading: "Know your numbers, not just your covers.",
    items: [
      { icon: ICON_FORK, text: <><strong>Independent restaurant owners</strong> doing books after closing time.</> },
      { icon: ICON_GLASS, text: <><strong>Cafés, bakeries, and bars</strong> with high daily transaction volume.</> },
      { icon: ICON_ROOF, text: <><strong>Restaurants using delivery apps</strong> that need clear payout tracking.</> },
      { icon: ICON_GRID4, text: <><strong>Multi-location operators</strong> comparing locations.</> },
    ],
  },
  faq: {
    heading: "Restaurant bookkeeping: asked a lot.",
    items: [
      {
        q: "How much does restaurant bookkeeping cost?",
        a: <>It depends on number of locations, sales channels, and transaction volume. <strong>We share pricing on the free call.</strong></>,
      },
      { q: "Which POS systems do you work with?", a: <>Common ones include <strong>Toast, Square, and Clover. We can work with others too.</strong></> },
      { q: "Do you track food cost?", a: <>Yes. We record food and beverage costs <strong>from supplier invoices and inventory updates.</strong></> },
      { q: "Can you handle multiple locations?", a: <>Yes. We can <strong>track each location separately and combine reports.</strong></> },
      {
        q: "Do you run payroll?",
        a: (
          <>
            We reconcile payroll in your books, and{" "}
            <strong>
              our <a href="/bookkeeping/payroll-services">payroll team</a> can help with payroll setup if needed.
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
              <a href="/bookkeeping/catch-up-bookkeeping">catch-up bookkeeping</a>
            </strong>
            , reconciling POS, apps, and costs, before moving to monthly.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "Bookkeeping for Restaurants",
    heading: "Know your numbers, not just your covers.",
    copy: (
      <>
        Book a free call to talk through your restaurant books:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review how sales and costs are recorded today.</strong>
      </>
    ),
    primaryLabel: "Book a restaurant bookkeeping call",
    secondaryHref: "#prime",
  },
};
