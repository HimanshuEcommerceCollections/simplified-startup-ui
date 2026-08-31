"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import {
  GetGrid,
  NoteCallout,
  PricingTiers,
  ProblemSolve,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  StepCards,
  TrustBar,
  WhoGrid,
} from "../ServiceDetailKit";
import "./ba-page.css";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* deliverable icons, shared between the hero card and the explorer */
const ICON_PLAN = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_MODEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GTM = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 3a9 9 0 0 1 0 18M3 12h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: founder-plan assembling card -------- */

const FPLAN_ROWS = [
  { icon: ICON_PLAN, name: "Business plan", sub: "Lenders · partners · team" },
  { icon: ICON_DECK, name: "Pitch deck", sub: "10–15 slides · custom" },
  { icon: ICON_MODEL, name: "Financial model", sub: "3-year · scenarios" },
  { icon: ICON_GTM, name: "Go-to-market", sub: "First 90 days" },
];

function FplanCard() {
  const [run, setRun] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setRun(true), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <SignatureCard
      ariaLabel="A sample founder plan being assembled"
      className={`ba-fplan${run ? " run" : ""}`}
      live="Founder plan · Assembling"
      corner="INVESTOR-READY"
      footLeft="You own everything"
      footRight="no equity taken →"
    >
      <div className="ba-fplan-body">
        {FPLAN_ROWS.map((row) => (
          <div className="ba-pl-row" key={row.name}>
            <span className="ic">{row.icon}</span>
            <span className="nm">
              <b>{row.name}</b>
              <small>{row.sub}</small>
            </span>
            <span className="rd">
              {CHECK}
              Ready
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why founders get stuck -------- */

const PROBLEMS = [
  { icon: X_ICON, title: "The plan lives in your head", text: "No one else can back it, invest in it, or execute against it while it’s only in your head." },
  { icon: X_ICON, title: "The deck blends in", text: "Investors sit through 20 a week. A template deck that looks like the rest kills the meeting.", delay: 70 },
  { icon: X_ICON, title: "The market wasn’t what you assumed", text: "Real research often shows the opportunity is smaller — or bigger — than the gut said.", delay: 140 },
  { icon: X_ICON, title: "The numbers don’t add up", text: "Investors read your model as a test of discipline. Weak numbers read as a weak founder." },
  { icon: X_ICON, title: "The GTM is a hope", text: "“We’ll do social media and word of mouth” is not a strategy — it’s a wish.", delay: 70 },
  { icon: X_ICON, title: "Consultants cost a fortune", text: "Big firms want $50K+ retainers; advisors want 1–2% equity. Most founders can afford neither.", delay: 140 },
];

/* -------- deliverables explorer -------- */

type Deliverable = { key: string; icon: ReactNode; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const DELIVERABLES: Deliverable[] = [
  {
    key: "plan",
    icon: ICON_PLAN,
    btnName: "Business plan",
    btnSub: "Usable, not a thesis",
    name: "Business Plan Development",
    tag: "A working document, not a 60-page thesis.",
    items: [
      "Executive summary",
      "Company, mission & values",
      "Product / service breakdown",
      "Market & competitor analysis",
      "Marketing & sales strategy",
      "Operations plan",
      "3-year monthly projections",
      "Funding request & use of funds",
    ],
  },
  {
    key: "deck",
    icon: ICON_DECK,
    btnName: "Pitch deck",
    btnSub: "10–15 slides",
    name: "Pitch Deck Design & Strategy",
    tag: "The 10–15 slides investors actually pay attention to.",
    items: [
      "Narrative & story structure",
      "Problem, solution, market, model",
      "Traction, team & the ask",
      "Financial highlights",
      "Custom design on your brand",
      "Speaker notes & Q&A prep",
      "Editable Slides / Keynote / PPT",
    ],
  },
  {
    key: "research",
    icon: ICON_SEARCH,
    btnName: "Market research",
    btnSub: "The evidence base",
    name: "Market & Competitor Research",
    tag: "The evidence base under every good decision.",
    items: [
      "Market size (TAM, SAM, SOM)",
      "Trends, drivers & constraints",
      "Direct & indirect competitors",
      "Positioning gap analysis",
      "Findings document with sources",
    ],
  },
  {
    key: "model",
    icon: ICON_MODEL,
    btnName: "Financial model",
    btnSub: "Numbers that hold up",
    name: "Financial Modeling",
    tag: "Numbers investors trust and you can run on.",
    items: [
      "Revenue drivers & pricing",
      "CAC and LTV",
      "Operating cost breakdown",
      "Runway & burn rate",
      "Best / base / worst scenarios",
      "Editable spreadsheet you own",
    ],
  },
  {
    key: "gtm",
    icon: ICON_GTM,
    btnName: "Go-to-market",
    btnSub: "First 100 customers",
    name: "Go-to-Market Strategy",
    tag: "How you get your first hundred customers.",
    items: [
      "Target customer definition",
      "Positioning & messaging",
      "Channel selection & priority",
      "Launch plan with milestones",
      "First 90-day roadmap",
    ],
  },
  {
    key: "setup",
    icon: SHIELD,
    btnName: "Setup & registration",
    btnSub: "Actually start operating",
    name: "Business Setup & Registration",
    tag: "The practical steps to actually start operating.",
    items: [
      "Entity structure (LLC, S-corp, C-corp)",
      "Registration walkthrough",
      "EIN & basic tax setup",
      "Compliance & licensing overview",
      "Legal & accounting referrals",
    ],
  },
  {
    key: "advisory",
    icon: ICON_CHAT,
    btnName: "Founder advisory",
    btnSub: "Between milestones",
    name: "Founder Advisory Sessions",
    tag: "Office-hours support between milestones.",
    items: [
      "Monthly strategy call",
      "Slack / email for quick questions",
      "Review decisions before you commit",
      "Intros to partners & vendors",
      "Quarterly business reviews",
    ],
  },
];

function DeliverablesExplorer() {
  const [active, setActive] = useState(0);
  const dv = DELIVERABLES[active];
  return (
    <Reveal className="ba-dv-wrap" id="deliver">
      <div className="ba-dv-list" role="tablist" aria-label="Deliverables">
        {DELIVERABLES.map((item, i) => (
          <button key={item.key} className="ba-dv-btn" role="tab" aria-selected={i === active} onClick={() => setActive(i)}>
            <span className="di">{item.icon}</span>
            <span className="dn">
              <b>{item.btnName}</b>
              <small>{item.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="ba-dv-panel">
        <div className="ba-dp-top">
          <span className="big">{dv.icon}</span>
          <div>
            <h3>{dv.name}</h3>
            <div className="tagline">{dv.tag}</div>
          </div>
        </div>
        <div className="ba-dp-body ba-dp-fade" key={dv.key}>
          <span className="k">What’s inside</span>
          <div className="ba-dp-list">
            {dv.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <div className="ba-dp-own">
            <span className="b">{SHIELD}</span> Editable and yours to keep — no equity, no lock-in.
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- what you get / who / steps / pricing -------- */

const GETS = [
  { text: <><strong>A working business plan</strong> you can use with lenders, partners, and your own team.</> },
  { text: <><strong>An investor-ready pitch deck</strong> that stands out from the 20 others they saw that week.</>, delay: 60 },
  { text: <><strong>Real market &amp; competitor data</strong> to back up every claim you make.</> },
  { text: <><strong>Numbers that add up</strong> — an editable financial model you own and can update.</>, delay: 60 },
  { text: <><strong>A go-to-market plan</strong> with clear channels, milestones, and a first-90-day roadmap.</> },
  { text: <><strong>Ongoing advisor access</strong> for the questions that come up between milestones.</>, delay: 60 },
];

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v3m0 12v3M3 12h3m12 0h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "A first-time founder",
    text: "An idea but no clear plan — you need structure, not more inspiration.",
  },
  { icon: ICON_MODEL, title: "Preparing to raise", text: "You need a deck, plan, and financials that hold up to investor questions.", delay: 60 },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M9 4v5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Launching a new line",
    text: "Inside an existing company — startup rigor without the trial and error.",
    delay: 120,
  },
  { icon: SHIELD, title: "Formalizing", text: "Register the entity, structure it properly, and set up a business you’ve run informally.", delay: 180 },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Pivoting",
    text: "Changing what you sell or who you sell to — and need to re-plan the whole thing.",
    delay: 240,
  },
];

const STEPS = [
  { no: "1", dur: "Week 1", title: "Discovery & direction", text: "Founder call, kickoff workshop, and a written brief outlining goals, scope, and questions. You approve." },
  { no: "2", dur: "Week 2", title: "Research & numbers", text: "Market sizing, competitor mapping, and the first draft of the financial model — ends with a findings doc.", delay: 80 },
  { no: "3", dur: "Weeks 3–4", title: "Plan & deck", text: "Business plan and pitch deck drafted in parallel, two rounds of revisions each, ending in approved finals.", delay: 160 },
  { no: "4", dur: "Week 5", title: "GTM & handover", text: "90-day roadmap, setup guidance, and a handover call — you walk away with everything editable and owned.", delay: 240 },
];

const TIERS = [
  { name: "Founder Starter", best: "The essentials — business plan, basic financials, and a 90-day GTM plan.", price: "Published rate" },
  { name: "Full Founder Package", best: "Plan, pitch deck, market research, financial model, GTM strategy, and setup guidance.", price: "Published rate", featured: true, badge: "Most complete", delay: 70 },
  { name: "Founder + Advisory", best: "Full package plus 3 or 6 months of advisory calls, Slack access, and decision reviews.", price: "Published rate", delay: 140 },
  { name: "Advisory Retainer", best: "For founders who’ve built the plan — ongoing monthly strategy support.", price: "Published rate", delay: 210 },
];

const FAQS = [
  { q: "Do you take equity for advisory work?", a: <>No. Everything is priced in dollars, published up front, and paid like any other vendor. <strong>You keep 100% of your company.</strong></> },
  { q: "How long does the full process take?", a: <>Usually <strong>4–6 weeks</strong> for the Full Founder Package; the Starter can move in ~3 weeks. Advisory retainers are ongoing.</> },
  { q: "Do you help me actually raise the money?", a: <>We build the deck, plan, and financials investors need, and help you prep for meetings. <strong>We’re not a broker</strong> and take no placement fee — investor-list research is an optional add-on.</> },
  { q: "Are you a law or accounting firm?", a: <>No — we handle strategy, planning, and setup guidance, and <strong>refer you to trusted legal and accounting partners</strong> for licensed work. Keeps costs down; you always know who does what.</> },
  { q: "What if I already have a plan or deck?", a: <>Even better — we review, refine, and level them up rather than start from scratch. <strong>Priced by scope,</strong> usually less than a full engagement.</> },
  { q: "Can I hire you for just one piece?", a: <>Yes. Business plan, pitch deck, market research, and financial model can all be <strong>booked standalone</strong> — ask for a scoped quote.</> },
  { q: "How is this different from a big consulting firm?", a: <>Price and focus. We’re <strong>a fraction of a McKinsey-style engagement,</strong> and built for founders who execute the advice themselves — not delegate it to a 12-person team.</> },
  { q: "How is this different from an accelerator?", a: <>Accelerators trade equity for structure and network. <strong>We’re priced in dollars and take no equity.</strong> Some founders use both — an accelerator for community, us for the deliverables.</> },
  { q: "Do you work with non-tech businesses?", a: <>Absolutely — restaurants, services, retail, professional practices, e-commerce, software. <strong>The fundamentals are the same</strong> across industries.</> },
  { q: "What happens after the engagement?", a: <>You own everything — plan, deck, model, and research, all editable. Want ongoing support? <strong>The Advisory Retainer keeps us in your corner monthly.</strong></> },
];

export default function BusinessAdvisoryView() {
  return (
    <>
      <ServiceDetailHero
        compact
        eyebrow="Strategy, planning & advisory for founders"
        line1="Turn your idea into"
        line2={
          <>
            a <span className="grad-text">real plan.</span>
          </>
        }
        lead={
          <>
            Business plans, pitch decks, market research, and honest advice — built for founders who want to{" "}
            <strong>launch faster and pitch stronger,</strong> without paying enterprise consulting rates for it.
          </>
        }
        primary={{ label: "Book a free founder call", href: "/growth-plan" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <FplanCard />
      </ServiceDetailHero>

      <TrustBar items={["Founder-led", "Investor-ready deliverables", "Transparent published pricing", "No equity taken"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why founders get stuck</span>
            <h2>Most early businesses fail for reasons that aren’t about ability.</h2>
            <p>They fail because the plan, the deck, the numbers, or the go-to-market never got real. Here’s the pattern — and the gap we fill.</p>
          </Reveal>
          <ProblemSolve
            items={PROBLEMS}
            columns={3}
            draw
            solve={
              <>
                That’s the gap we fill:{" "}
                <span className="gt">real strategy work, done fast, at published prices — with no equity ask.</span>
              </>
            }
          />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Pick a deliverable. See what’s inside.</h2>
            <p>Everything is a working document you own and can run the business on — not a 60-page thesis that sits in a drawer.</p>
          </Reveal>
          <DeliverablesExplorer />
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="band tint" id="getyou">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you get</span>
            <h2>A launch-ready business, backed by real strategy.</h2>
          </Reveal>
          <GetGrid items={GETS} />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band dark" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>The right fit if you’re…</h2>
          </Reveal>
          <WhoGrid items={WHO} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A structured 4–6 week engagement.</h2>
            <p>Every step ends with a real deliverable and your sign-off before we move on.</p>
          </Reveal>
          <StepCards steps={STEPS} />
          <NoteCallout style={{ marginTop: 22 }}>
            Ongoing (optional) — <strong>Advisory Retainer:</strong> monthly strategy calls plus Slack access for quick
            questions, priced separately. No long-term contract.
          </NoteCallout>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No equity taken, no “book a call to hear our pricing.” Project packages paid in two installments; advisory retainers billed monthly.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <Reveal className="ba-noeq">
            You keep 100% of your company <span className="pill">No equity taken</span>
          </Reveal>
          <NoteCallout>
            Project packages paid in two installments — <strong>50% at kickoff, 50% at handover.</strong> Advisory
            retainers billed monthly, no long-term contract. Every exact number is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked by every founder." />

      <CtaBand
        eyebrow="Business Startup & Advisory"
        heading="Have an idea? Let’s turn it into a plan."
        copy={
          <>
            Book a free founder call. We’ll talk about where you are, where you’re going, and what it’d take to get
            there —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation, no equity ask, no jargon.</strong>
          </>
        }
        primaryLabel="Book a free founder call"
        primaryHref="/growth-plan"
        secondary={{ label: "See full pricing", href: "/pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
