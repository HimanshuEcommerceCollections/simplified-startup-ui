import type { IndustryData } from "../types";
import {
  ICON_BANK,
  ICON_CABIN,
  ICON_CASH,
  ICON_CODE,
  ICON_DOC,
  ICON_GRID4,
  ICON_HOUSE,
  ICON_HOUSE_DOOR,
  ICON_HOUSE_DOOR_SPLIT,
  ICON_LIST_CIRCLE,
  ICON_PERSON,
  ICON_PERSON_ARMS,
  ICON_ROOF,
  ICON_SHIELD,
  ICON_TREND,
} from "../icons";

export const REAL_ESTATE: IndustryData = {
  hero: {
    line1: "Bookkeeping organized by deal,",
    line2: (
      <>
        property, and <span className="grad-text">portfolio.</span>
      </>
    ),
    lead: (
      <>
        <a href="/bookkeeping/monthly-bookkeeping">Monthly bookkeeping</a> for real estate agents, investors, and landlords:{" "}
        <strong>commissions, rents, and expenses tracked so every property tells a clear story.</strong>
      </>
    ),
    primaryLabel: "Book a real estate bookkeeping call",
    secondaryHref: "#portfolio",
    card: {
      ariaLabel: "A real estate portfolio tracked by property",
      live: "By property",
      corner: "DEAL · PROPERTY · PORTFOLIO",
      rows: [
        { icon: ICON_HOUSE, name: "Property A · rent, repairs, mortgage", value: "+$2,100", tone: "teal" },
        { icon: ICON_HOUSE, name: "Property B · rent, utilities, insurance", value: "+$1,450", tone: "teal" },
        { icon: ICON_HOUSE, name: "Property C · payouts, cleaning", value: "+$980", tone: "teal" },
      ],
      net: { label: "Portfolio · all properties combined", value: "$4,530" },
      footLeft: "Every property, its own clear view",
      footRight: "plus the whole portfolio →",
    },
  },
  trust: ["Tracking by property", "Commissions recorded clearly", "Mortgage payments split", "Deposits handled properly"],
  why: {
    eyebrow: "Real estate books have their own rules",
    heading: "Agents, investors, and landlords each need a different setup.",
    paras: [
      <>
        Agents earn commissions with splits and fees. Investors and landlords manage{" "}
        <strong>rents, repairs, loans, and deposits across properties.</strong>
      </>,
      <>When everything sits in one account, it’s hard to see which deals or properties perform well.</>,
      <>
        Real estate bookkeeping <strong>organizes your books by deal or property so the numbers make sense.</strong>
      </>,
    ],
    glance: ["Commission splits and fees", "Income by property", "Mortgage principal and interest", "Security deposits", "Repairs vs improvements"],
  },
  middle: [
    {
      id: "support",
      eyebrow: "Who we support in real estate",
      heading: "Each type of real estate business is set up differently.",
      block: {
        kind: "cards",
        cards: [
          {
            kicker: "Agents & brokers",
            icon: ICON_PERSON,
            title: "Commission-based income",
            sub: "Deals, not properties",
            text: "Commissions, splits, referral fees, and marketing costs.",
          },
          {
            kicker: "Investors & landlords",
            icon: ICON_HOUSE_DOOR,
            title: "Rental portfolios",
            sub: "Many properties",
            text: "Rent, expenses, loans, and deposits by property.",
          },
          {
            kicker: "Short-term rentals",
            icon: ICON_CABIN,
            title: "Vacation and Airbnb hosts",
            sub: "Platform payouts",
            text: "Platform payouts, cleaning, and supplies by property.",
          },
        ],
      },
    },
    {
      id: "portfolio",
      eyebrow: "Books organized by property",
      heading: "Each property gets its own clear view.",
      block: {
        kind: "propertyTree",
        head: "Your Real Estate Portfolio",
        nodes: [
          { kicker: "Property", title: "Property A", label: "Tracks", items: ["Rent collected", "Repairs and maintenance", "Mortgage and taxes"] },
          { kicker: "Property", title: "Property B", label: "Tracks", items: ["Rent collected", "Utilities", "Insurance"] },
          { kicker: "Property", title: "Property C", label: "Tracks", items: ["Platform payouts", "Cleaning and supplies", "Management fees"] },
          { kicker: "Portfolio", title: "Portfolio", label: "Combines", items: ["Total income", "Total expenses", "Overall cash flow"], portfolio: true },
        ],
      },
    },
    {
      id: "transactions",
      eyebrow: "Common real estate transactions",
      heading: "How we record the items that often cause confusion.",
      block: {
        kind: "txTable",
        head: ["Transaction", "Common mistake", "How we record it"],
        rows: [
          { item: "Mortgage payment", mistake: "Recorded as one expense", fix: "Split into principal, interest, and escrow" },
          { item: "Security deposit", mistake: "Recorded as income", fix: "Held as a liability until returned or applied" },
          { item: "Commission check", mistake: "Recorded at net only", fix: "Gross commission, splits, and fees shown" },
          { item: "Repairs vs improvements", mistake: "All treated the same", fix: "Categorized and flagged for your CPA" },
          { item: "Platform payouts", mistake: "Recorded as one deposit", fix: "Split into bookings, fees, and taxes" },
        ],
      },
    },
    {
      id: "close",
      eyebrow: "Your monthly real estate close",
      heading: "A steady rhythm so books are ready every month.",
      block: {
        kind: "timeline",
        steps: [
          { when: "Early in the month", title: "Collect and import", text: "Bank, card, and platform data brought in." },
          { when: "Next", title: "Rent and commissions", text: "Income matched to properties or deals." },
          { when: "Then", title: "Expenses and loans", text: "Expenses and loan payments recorded by property." },
          { when: "Finally", title: "Reports", text: "Profit and loss by property delivered." },
        ],
      },
    },
    {
      id: "reports",
      eyebrow: "Reports we prepare",
      heading: "Clear reports for every property and the whole portfolio.",
      block: {
        kind: "reports",
        items: [
          { icon: ICON_HOUSE_DOOR_SPLIT, title: "Profit and loss by property", text: "Income and expenses for each property." },
          { icon: ICON_GRID4, title: "Portfolio summary", text: "All properties combined in one view." },
          { icon: ICON_PERSON_ARMS, title: "Commission summary", text: "For agents: deals, splits, and fees." },
          { icon: ICON_CASH, title: "Cash flow", text: "Cash in and out across properties." },
        ],
      },
    },
  ],
  tools: {
    names: ["QuickBooks Online", "Xero", "Stessa", "AppFolio", "Buildium", "Airbnb", "Vrbo", "Dotloop", "Brokermint", "Dext", "Gusto", "Bill.com"],
    note: (
      <>
        We handle bookkeeping and reporting.{" "}
        <b>Tax filing, tax planning, and sales tax decisions are handled by your CPA or tax professional,</b> and we’re happy to work
        alongside them. Property management trust accounts follow state rules, so confirm requirements with your broker, CPA, or attorney.
      </>
    ),
  },
  problems: {
    heading: "Common real estate bookkeeping problems.",
    rows: [
      ["All properties in one bucket", "Tracking by property."],
      ["Full mortgage payment as expense", "Principal and interest split."],
      ["Security deposits counted as income", "Recorded as liabilities."],
      ["Commissions recorded at net only", "Gross commission and splits shown."],
      ["Personal and business mixed", "Separate accounts and clean categories."],
    ],
  },
  included: {
    heading: "From property tracking to a year-end CPA package.",
    items: [
      { icon: ICON_HOUSE, text: "Property or deal-level tracking" },
      { icon: ICON_BANK, text: "Bank and card reconciliation" },
      { icon: ICON_LIST_CIRCLE, text: "Rent and commission recording" },
      { icon: ICON_CODE, text: "Mortgage and loan payment splits" },
      { icon: ICON_SHIELD, text: "Security deposit tracking" },
      { icon: ICON_ROOF, text: "Short-term rental payout reconciliation" },
      { icon: ICON_TREND, text: "Monthly profit and loss by property" },
      { icon: ICON_GRID4, text: "Portfolio summary and cash flow" },
      { icon: ICON_DOC, text: "Year-end package for your CPA" },
    ],
  },
  who: {
    heading: "See every property clearly.",
    items: [
      { icon: ICON_PERSON, text: <><strong>Real estate agents and brokers</strong> tracking commissions and expenses.</> },
      { icon: ICON_HOUSE_DOOR, text: <><strong>Landlords and property investors</strong> with one or many properties.</> },
      { icon: ICON_CABIN, text: <><strong>Short-term rental hosts</strong> managing platform payouts.</> },
      { icon: ICON_TREND, text: <><strong>Investors growing a portfolio</strong> who need clear property-level numbers.</> },
    ],
  },
  faq: {
    heading: "Real estate bookkeeping: asked a lot.",
    items: [
      {
        q: "How much does real estate bookkeeping cost?",
        a: <>It depends on the number of properties or deals and transaction volume. <strong>We share pricing on the free call.</strong></>,
      },
      { q: "Can you track each property separately?", a: <>Yes. We set up tracking by property <strong>using classes, locations, or a tool like Stessa.</strong></> },
      {
        q: "Do you handle security deposits?",
        a: <>We record deposits as liabilities in your books. <strong>Trust account rules should be confirmed with your broker or CPA.</strong></>,
      },
      { q: "Do you work with short-term rentals?", a: <>Yes. We reconcile <strong>Airbnb and Vrbo payouts and track costs by property.</strong></> },
      { q: "Can you help at tax time?", a: <>We prepare <strong>clean books and a year-end package for your CPA.</strong></> },
      {
        q: "Can you clean up past months?",
        a: (
          <>
            Yes. We can start with{" "}
            <strong>
              <a href="/bookkeeping/catch-up-bookkeeping">catch-up bookkeeping</a>
            </strong>
            , setting up property tracking and fixing miscategorized items, before moving to monthly.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "Bookkeeping for Real Estate",
    heading: "See every property clearly.",
    copy: (
      <>
        Book a free call to talk through your real estate books:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review how your books are set up today.</strong>
      </>
    ),
    primaryLabel: "Book a real estate bookkeeping call",
    secondaryHref: "#portfolio",
  },
};
