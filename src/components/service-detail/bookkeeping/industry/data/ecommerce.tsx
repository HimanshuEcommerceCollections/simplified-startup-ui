import type { IndustryData } from "../types";
import {
  ICON_BAG,
  ICON_BANK,
  ICON_BOX,
  ICON_CART,
  ICON_CASH,
  ICON_CASH_PLAIN,
  ICON_COUNT,
  ICON_DOC,
  ICON_GRID4,
  ICON_LIST_CIRCLE,
  ICON_MAIL,
  ICON_MINUS,
  ICON_PIE,
  ICON_SHIELD,
  ICON_TREND,
  ICON_TRUCK,
} from "../icons";

export const ECOMMERCE: IndustryData = {
  hero: {
    line1: "Bookkeeping that shows what your",
    line2: (
      <>
        store really <span className="grad-text">earns.</span>
      </>
    ),
    lead: (
      <>
        <a href="/bookkeeping/monthly-bookkeeping">Monthly bookkeeping</a> for online stores:{" "}
        <strong>payouts reconciled, fees and refunds tracked, and inventory costs recorded so your profit is real.</strong>
      </>
    ),
    primaryLabel: "Book an e-commerce bookkeeping call",
    // the design points this at #close; the family's other pages target their signature section
    secondaryHref: "#breakdown",
    card: {
      ariaLabel: "A Shopify payout broken into its real parts",
      live: "Payout breakdown",
      corner: "NET, NOT GROSS",
      gross: { label: "Gross sales", value: "$10,000" },
      rows: [
        { icon: ICON_MINUS, name: "Refunds & discounts", value: "−$820" },
        { icon: ICON_MINUS, name: "Platform & payment fees", value: "−$390" },
        { icon: ICON_MINUS, name: "Shipping & tax collected", value: "tracked" },
      ],
      net: { label: "Net payout · matched to bank", value: "$8,790" },
      footLeft: "Every payout split into real parts",
      footRight: "true profit →",
    },
  },
  trust: ["Payouts matched to real sales", "Fees and refunds tracked", "Inventory and COGS recorded", "Profit by channel"],
  why: {
    eyebrow: "Why e-commerce books get messy",
    heading: "Your bank deposits don’t tell the whole story.",
    paras: [
      <>
        Platforms like Shopify, Amazon, and Stripe send payouts <strong>after taking fees, refunds, and adjustments.</strong>
      </>,
      <>If only the payout is recorded, your sales, fees, and profit all look wrong.</>,
      <>
        E-commerce bookkeeping <strong>breaks each payout into its real parts and tracks inventory costs,</strong> so your reports
        reflect reality.
      </>,
    ],
    glance: [
      "Payouts are net, not gross",
      "Fees and refunds hide inside payouts",
      "Inventory changes cost of goods",
      "Several sales channels",
      "Sales tax across locations",
    ],
  },
  middle: [
    {
      id: "breakdown",
      eyebrow: "Breaking down a payout",
      heading: "Every payout is split into its real parts.",
      block: {
        kind: "payout",
        steps: [
          { key: "Gross sales", title: "What customers paid", text: "Total product sales before deductions." },
          { key: "Discounts & refunds", title: "What came back", text: "Returns, refunds, and promo codes." },
          { key: "Shipping & taxes", title: "Pass-through amounts", text: "Shipping and taxes collected, recorded separately from sales." },
          { key: "Platform fees", title: "What the platform kept", text: "Transaction, payment, and selling fees." },
          { key: "Net payout", title: "What hit your bank", text: "Matched to the bank deposit.", net: true },
        ],
      },
    },
    {
      id: "channels",
      eyebrow: "Sales channels we reconcile",
      heading: "Each channel pays out differently.",
      block: {
        kind: "table",
        head: ["Channel", "What we track", "How we reconcile"],
        rows: [
          ["Shopify", "Sales, discounts, refunds, and Shopify Payments fees", "Payouts matched to orders and bank deposits"],
          ["Amazon", "Sales, FBA fees, ads, and reimbursements", "Settlement reports broken into categories"],
          ["Stripe & PayPal", "Charges, refunds, and processing fees", "Payouts matched to transactions"],
          ["Etsy, eBay & others", "Sales, listing and transaction fees", "Monthly statements reconciled"],
          ["Wholesale", "Invoices and payments", "Tracked through receivables"],
        ],
      },
    },
    {
      id: "inventory",
      eyebrow: "Inventory and cost of goods",
      heading: "Profit depends on knowing what your products really cost.",
      block: {
        kind: "cards",
        cards: [
          { icon: ICON_BOX, title: "Product costs", text: "Purchase cost of goods from suppliers." },
          { icon: ICON_TRUCK, title: "Landed costs", text: "Freight, duties, and inbound shipping where relevant." },
          { icon: ICON_COUNT, title: "Inventory counts", text: "Regular counts or platform data used to update inventory." },
        ],
      },
    },
    {
      id: "close",
      eyebrow: "Your monthly e-commerce close",
      heading: "A steady rhythm so books are ready every month.",
      block: {
        kind: "timeline",
        steps: [
          { when: "Early in the month", title: "Sync and import", text: "Bank, cards, and sales channel data brought in." },
          { when: "Next", title: "Reconcile payouts", text: "Payouts split into sales, fees, refunds, and taxes." },
          { when: "Then", title: "Inventory and COGS", text: "Cost of goods updated from inventory records." },
          { when: "Finally", title: "Review and report", text: "Profit and loss by channel delivered with notes." },
        ],
      },
    },
    {
      id: "reports",
      eyebrow: "Reports you’ll get",
      heading: "Clear reports built for store owners.",
      block: {
        kind: "reports",
        items: [
          { icon: ICON_TREND, title: "Profit and loss by channel", text: "See which channels are actually profitable." },
          { icon: ICON_PIE, title: "Gross margin", text: "Sales minus cost of goods, explained simply." },
          { icon: ICON_LIST_CIRCLE, title: "Fees summary", text: "Platform, payment, and shipping costs in one view." },
          { icon: ICON_CASH, title: "Cash flow overview", text: "Where cash went, including inventory purchases." },
        ],
      },
    },
  ],
  tools: {
    names: [
      "QuickBooks Online",
      "Xero",
      "A2X",
      "Shopify",
      "Amazon Seller Central",
      "Stripe",
      "PayPal",
      "Link My Books",
      "Inventory Planner",
      "Cin7",
      "Dext",
      "Gusto",
    ],
    note: (
      <>
        We handle bookkeeping and reporting.{" "}
        <b>Tax filing, tax planning, and sales tax decisions are handled by your CPA or tax professional,</b> and we’re happy to work
        alongside them. Sales tax rules vary by location, so your CPA should confirm where you need to collect and file.
      </>
    ),
  },
  problems: {
    heading: "Common e-commerce bookkeeping problems.",
    rows: [
      ["Recording payouts as sales", "Payouts split into sales, fees, and refunds."],
      ["No cost of goods recorded", "Inventory and COGS tracked monthly."],
      ["Sales tax mixed into revenue", "Sales tax recorded as a liability."],
      ["Channels lumped together", "Reporting by channel."],
      ["Refunds not tracked", "Refunds and chargebacks recorded properly."],
    ],
  },
  included: {
    heading: "From payout reconciliation to a year-end CPA package.",
    items: [
      { icon: ICON_MAIL, text: "Sales channel and payout reconciliation" },
      { icon: ICON_BANK, text: "Bank and credit card reconciliation" },
      { icon: ICON_LIST_CIRCLE, text: "Platform fee and refund tracking" },
      { icon: ICON_BOX, text: "Inventory and cost of goods updates" },
      { icon: ICON_SHIELD, text: "Sales tax liability tracking" },
      { icon: ICON_GRID4, text: "Chart of accounts built for e-commerce" },
      { icon: ICON_TREND, text: "Monthly profit and loss by channel" },
      { icon: ICON_CASH_PLAIN, text: "Balance sheet and cash flow reports" },
      { icon: ICON_DOC, text: "Year-end package for your CPA" },
    ],
  },
  who: {
    heading: "Know your real profit every month.",
    items: [
      { icon: ICON_BAG, text: <><strong>Shopify and WooCommerce stores</strong> selling direct to customers.</> },
      { icon: ICON_CART, text: <><strong>Amazon and marketplace sellers</strong> with complex settlement reports.</> },
      { icon: ICON_TREND, text: <><strong>Brands selling on several channels</strong> that need profit by channel.</> },
      { icon: ICON_BOX, text: <><strong>Growing stores buying inventory</strong> in larger amounts.</> },
    ],
  },
  faq: {
    heading: "E-commerce bookkeeping: asked a lot.",
    items: [
      {
        q: "How much does e-commerce bookkeeping cost?",
        a: <>It depends on order volume, number of channels, and inventory complexity. <strong>We share pricing on the free call.</strong></>,
      },
      { q: "Do you use A2X or similar tools?", a: <>Often, yes. Tools like A2X help <strong>split payouts into the right categories automatically.</strong></> },
      { q: "Can you track inventory?", a: <>We record inventory and cost of goods in your books <strong>using your platform or inventory system data.</strong></> },
      {
        q: "Do you handle sales tax filing?",
        a: <>We track sales tax in your books. <strong>Filing and nexus decisions are handled by your CPA or a sales tax service.</strong></>,
      },
      {
        q: "Can you clean up past months?",
        a: (
          <>
            Yes. We can start with{" "}
            <strong>
              <a href="/bookkeeping/catch-up-bookkeeping">catch-up bookkeeping</a> before moving to monthly.
            </strong>
          </>
        ),
      },
      {
        q: "Will I see profit by channel?",
        a: <>Yes. Your monthly profit and loss is <strong>broken out by channel</strong> so you can see which ones actually make money.</>,
      },
    ],
  },
  cta: {
    eyebrow: "Bookkeeping for E-commerce",
    heading: "Know your real profit every month.",
    copy: (
      <>
        Book a free call to talk through your store’s books:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review how sales and payouts are recorded today.</strong>
      </>
    ),
    primaryLabel: "Book an e-commerce bookkeeping call",
    secondaryHref: "#breakdown",
  },
};
