"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import "./service-explorer.css";

type Service = {
  title: string;
  sub: string;
  is: string;
  included: { b: string; rest: string }[];
  get: string;
  for: string;
};

const SERVICES: Service[] = [
  {
    title: "Digital Marketing",
    sub: "Get found and get pipeline",
    is: "Full-funnel demand generation — the channels that turn strangers into booked calls, run as one coordinated program instead of disconnected tactics.",
    included: [
      { b: "SEO & AI-search", rest: "technical fixes, on-page work, content, and authority so you rank in Google and get cited in AI answers." },
      { b: "Paid ads", rest: "Google, Meta, LinkedIn, and YouTube campaigns, with conversion tracking verified before a dollar of spend." },
      { b: "Content & email", rest: "blog, landing pages, and lifecycle sequences that compound over time." },
      { b: "Analytics & reporting", rest: "one dashboard tying every channel to enquiries, calls, and revenue." },
    ],
    get: "a predictable flow of qualified enquiries, and a monthly report that shows which channel earned them.",
    for: "For startups past launch that need pipeline, not just presence.",
  },
  {
    title: "Website Development",
    sub: "A site that sells while you sleep",
    is: "Fast, modern, conversion-focused websites and landing pages — designed from your brand and engineered to turn visitors into customers.",
    included: [
      { b: "Wireframes & mockups", rest: "layout and navigation signed off before a line of code." },
      { b: "Custom design & build", rest: "mobile-first, on brand, no cookie-cutter template." },
      { b: "Conversion & SEO foundations", rest: "speed, schema, analytics, and a clear next step on every page." },
      { b: "Launch & handoff", rest: "QA against a published checklist, plus docs and full ownership of the site." },
    ],
    get: "a website that loads fast, ranks, and converts — and that you own outright, code and all.",
    for: "For founders whose current site is slow, dated, or quietly losing them customers.",
  },
  {
    title: "Branding & Growth",
    sub: "Look like the leader in your space",
    is: "Identity systems and the positioning behind them — the message and look that make the shortlist decision go your way.",
    included: [
      { b: "Brand discovery", rest: "audience, competitors, positioning, and voice, captured in a findings doc." },
      { b: "Messaging framework", rest: "brand promise, value props, and the words your whole team uses." },
      { b: "Logo & identity suite", rest: "primary/stacked logos, favicon, and full-colour + single-colour variants in SVG, PNG, EPS, and PDF." },
      { b: "Brand guidelines", rest: "colour (HEX/RGB/CMYK), type, and usage rules in a shareable PDF." },
    ],
    get: "a brand that looks established and says one clear thing everywhere it appears.",
    for: "For new startups building identity from scratch, or established ones that have outgrown a DIY look.",
  },
  {
    title: "Sales & Lead Generation",
    sub: "A pipeline you can predict",
    is: "Researched, personalized outbound that books real conversations with the buyers you actually want.",
    included: [
      { b: "Ideal-customer profile & list building", rest: "verified prospects matched to a written ICP." },
      { b: "Outbound sequences", rest: "email and LinkedIn in your voice, with your approval, CAN-SPAM compliant." },
      { b: "Appointment setting", rest: "replies triaged same-day, qualified meetings dropped on your calendar." },
      { b: "CRM & reporting", rest: "every touch logged, weekly activity counts you can verify." },
    ],
    get: "qualified meetings on the calendar and a repeatable outbound engine you own.",
    for: "For B2B and considered-purchase startups that need meetings, not more traffic.",
  },
  {
    title: "AI Automation",
    sub: "Automate the busywork",
    is: "Custom AI workflows and agents that handle the repetitive work across your stack — with humans kept on every judgment call.",
    included: [
      { b: "Workflow audit", rest: "we map where the hours actually go and score what's worth automating." },
      { b: "Build & integrate", rest: "automations across your tools (CRM, email, docs, reporting)." },
      { b: "Human-in-the-loop", rest: "a judgment checkpoint on anything customer-facing or risky." },
      { b: "Monitoring & handoff", rest: "error alerts, documentation, and every credential in your name." },
    ],
    get: "hours back every week, fewer manual errors, and a documented system you control.",
    for: "For teams drowning in repetitive ops — reporting, data entry, follow-ups, onboarding.",
  },
  {
    title: "Business & Startup Advisory",
    sub: "A plan, not a pep talk",
    is: "Go-to-market, positioning, pricing, and business-model work from operators who've launched and run companies of their own.",
    included: [
      { b: "Validation", rest: "pressure-test the market before you spend a year finding out." },
      { b: "Numbers-first business plan", rest: "pricing, unit economics, and the path to profit." },
      { b: "Go-to-market", rest: "who you sell to first, the message, the channel, the dated launch." },
      { b: "Funding readiness", rest: "the model and story a bank or investor needs, if you're raising." },
    ],
    get: "a written plan you can execute — and, unlike advice-only firms, a team that can execute it.",
    for: "For pre-launch and early founders who want an honest plan plus execution muscle.",
  },
  {
    title: "Talent & Staffing",
    sub: "Senior capability without the full-time hire",
    is: "Vetted virtual assistants and specialists, scoped to a role scorecard and managed for you — on your business hours.",
    included: [
      { b: "Role scorecard", rest: "the five tasks and the standard, written down before we source." },
      { b: "Vetting & work samples", rest: "structured screening, not two hundred résumés on your desk." },
      { b: "Managed placement", rest: "onboarding, oversight, and replacement handled by us." },
      { b: "Onshore / nearshore / offshore", rest: "placed by task and budget, always your hours." },
    ],
    get: "the capacity of a hire without the recruiting, management, or risk of one.",
    for: "For owners buried in admin, support, or ops who aren't ready for a full-time head.",
  },
  {
    title: "Bookkeeping & Accounting",
    sub: "Finance handled, end to end",
    is: "Clean monthly books, plain-English reporting, and a dated close — organized so tax season is a handoff, not a scramble.",
    included: [
      { b: "Categorize & reconcile", rest: "every transaction sorted, accounts matched to the penny." },
      { b: "Month-end close", rest: "a dated close each month, so you always know the books are final." },
      { b: "Financial statements", rest: "P&L, balance sheet, and cash flow in plain English." },
      { b: "Catch-up & CPA-ready file", rest: "behind-books cleanup as a fixed project, then a clean handoff." },
    ],
    get: "books you can make decisions with, and a calm, cheaper tax season.",
    for: "For founders still doing it in a spreadsheet, or months behind and dreading it.",
  },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const hoverActivate = (i: number) => {
    if (window.matchMedia("(hover: hover)").matches) setActive(i);
  };

  return (
    <section className="band" id="services" aria-label="The services">
      <div className="wrap">
        <Reveal className="sec-head cap-head">
          <span className="eyebrow">— Everything, in detail</span>
          <h2 className="cap-title">Eight services. One team that runs them.</h2>
          <p className="svc-sub">
            Take one, take a bundle, or take the whole stack. Each is named, scoped, and priced up
            front. Below is exactly what each includes and what you walk away with.
          </p>
        </Reveal>
        <div className="cap-explorer">
          <div className="cap-list" role="tablist" aria-label="Services list">
            {SERVICES.map((svc, i) => (
              <button
                key={svc.title}
                className={`cap-row${i === active ? " is-active" : ""}`}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => hoverActivate(i)}
              >
                <span className="cap-num">{pad(i)}</span>
                <span className="cap-row-main">
                  <span className="cap-row-title">{svc.title}</span>
                  <span className="cap-row-sub">{svc.sub}</span>
                </span>
                <span className="cap-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <div className="cap-panel" aria-live="polite">
            {SERVICES.map((svc, i) => (
              <div key={svc.title} className={`cap-view${i === active ? " is-active" : ""}`}>
                <span className="cap-view-num">{pad(i)}</span>
                <h3>{svc.title}</h3>
                <p className="cv-is">{svc.is}</p>
                <span className="cv-label">What&apos;s included</span>
                <ul className="cap-incl">
                  {svc.included.map((item) => (
                    <li key={item.b}>
                      <b>{item.b}</b> — {item.rest}
                    </li>
                  ))}
                </ul>
                <p className="cv-get">
                  <strong>What you get:</strong> {svc.get}
                </p>
                <p className="cv-for">{svc.for}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
