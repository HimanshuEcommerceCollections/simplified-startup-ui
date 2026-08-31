"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import {
  AdjacentGrid,
  Callout,
  FeatureGrid,
  PriceBands,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  StepsRow,
  d,
} from "../ServiceDetailKit";
import "./aa-page.css";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SCOPE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 5h16M4 12h10M4 19h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18.5" cy="17.5" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    kicker: "Process audit",
    title: "Find where the hours actually go",
    items: [
      "We map where the hours actually go — not where everyone assumes they go",
      "Each candidate process scored: time saved, risk, and build effort",
      "A prioritized list you could hand to any builder — including not-us",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 6H15a3 3 0 0 1 3 3v6.5M6 8.5V15a3 3 0 0 0 3 3h6.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    kicker: "Automations, built",
    title: "Workflows across your existing tools",
    items: [
      "Integrations and workflows across the tools you already use",
      "Reporting pipelines that fill themselves and land on schedule",
      "Error handling and alerts built in — silent failure is the enemy",
    ],
    delay: 80,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "AI where it earns its place",
    title: "The work AI is actually good at",
    items: [
      "Drafting, triage, summarization, and classification",
      "Every AI workflow ships with an explicit human-judgment step, marked in the docs",
      "No black boxes: you can see what it does and why",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 3v5h5M10 13h5M10 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "Documentation & handoff",
    title: "Built in your accounts, owned by you",
    items: [
      "Every automation documented: purpose, dependencies, failure modes, maintenance",
      "Built in your accounts, owned by you — leave anytime and keep everything",
      "Run it in-house with our docs, or we monitor and maintain it monthly",
    ],
    delay: 80,
  },
];

const STEPS = [
  {
    no: "01",
    dur: "Week 1",
    title: "Audit",
    blocks: [
      { k: "What happens", v: <>A working session plus a look at the real workflows — then a written map of where the hours go and <strong>what&apos;s worth automating first.</strong></> },
      { k: "You get", v: "The prioritized list with time-saved estimates — free either way." },
    ],
  },
  {
    no: "02",
    dur: "In weekly slices",
    title: "Build",
    blocks: [
      { k: "What happens", v: <>Automations ship one at a time, tested against the real work, with <strong>error handling and documentation from day one.</strong></> },
      { k: "You get", v: "Working automations you can watch run — not a big-bang reveal." },
    ],
  },
  {
    no: "03",
    dur: "Your call",
    title: "Run",
    blocks: [
      { k: "What happens", v: <>Keep it in-house with the docs, or <strong>we monitor, maintain, and keep tuning</strong> as your tools and volume change.</> },
      { k: "You get", v: "Systems that keep working after the applause." },
    ],
  },
];

const stroke2 = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const WORKFLOWS = [
  { icon: <svg viewBox="0 0 24 24" {...stroke2}><path d="M4 7h16M4 12h16M4 17h10" /></svg>, title: "Lead routing & CRM", text: "New enquiry lands, gets scored, assigned, logged — with the follow-up already booked. Nobody types it in twice." },
  { icon: <svg viewBox="0 0 24 24" {...stroke2}><path d="M5 19V5M5 19h14M9 15l3-4 3 2 3-5" /></svg>, title: "Reporting", text: "Weekly and monthly reports assembled from every source you already pay for — the numbers you spend Friday copy-pasting.", delay: 60 },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>, title: "Client onboarding", text: "Contract signed → intake sent → project created → kickoff scheduled → welcome emails firing, in the same sequence every time.", delay: 120 },
  { icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 10h18" stroke="currentColor" strokeWidth="2" /></svg>, title: "Invoicing & AP/AR", text: "Draft the invoice from the deal, chase the overdue, reconcile the payment — finance-team work a small business rarely staffs." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>, title: "Follow-up & lifecycle", text: "Post-purchase, post-appointment, quarterly check-ins — the touches you know you should do and never remember.", delay: 60 },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M13 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>, title: "Document handling", text: "Extract data from PDFs, invoices, or forms; drop it in the right system; file the source in the right folder.", delay: 120 },
];

const MATRIX_COLUMNS = [
  { h: "DIY workflow tool", sub: "Zapier / Make" },
  { h: "AI agency", sub: "Strategy only" },
  { h: "Automation build", sub: "This", tag: "You are here", isThis: true },
];

const MATRIX_ROWS: { axis: string; cells: string[] }[] = [
  { axis: "Right if", cells: ["Simple, stable workflow; someone in-house comfortable with no-code tools.", "You need a plan or opportunity map, not a build.", "You want it built, tested, documented, and owned by you."] },
  { axis: "Watch for", cells: ["Volume pricing that quietly balloons; brittle API changes; nobody to call when it breaks.", "Decks that stop at “here's what you could automate” and never ship.", "A senior specialist owns your build by name, in the plan, before you sign."] },
  { axis: "Judgment steps", cells: ["Skipped or half-handled with best-guess rules.", "Documented in the plan; not implemented.", "Kept human — flagged and routed, not simulated."] },
  { axis: "Ownership", cells: ["You own the account and the recipe.", "You own the recommendation.", "You own accounts, connections, docs, and every workflow."] },
  { axis: "Price signal", cells: ["Advertised $20/mo often 20–40% of real first-year cost.", "Strategy engagements $3,000–$15,000.", "Single automations from $2,000; packages $8,000–$20,000; managed $1,000–$3,000/mo."] },
];

const SUBS = [
  { n: "01", h: "Workflow automation", p: "Repetitive processes mapped and automated, with the human-judgment steps kept explicit." },
  { n: "02", h: "AI chatbot development", p: "Disclosed bots grounded in your real content, escalating to humans by design." },
  { n: "03", h: "Document automation", p: "Proposals, invoices, and reports assembled from live data — reviewed where judgment lives." },
  { n: "04", h: "Reporting automation", p: "Your weekly numbers delivered on schedule, validated against manual pulls before trust." },
  { n: "05", h: "Systems integration", p: "Your tools connected so data entered once is correct everywhere — documented and monitored." },
];

const FAQS = [
  { q: "Will it all break when a tool updates?", a: <>Sometimes tools change — that&apos;s why every automation ships with error alerts, documentation, and a maintenance path. <strong>Silent failure is the real risk, and it&apos;s designed out:</strong> when something breaks, you (or we) know the same day, not at month-end.</> },
  { q: "Who owns the automations?", a: <><strong>You do.</strong> Everything is built in your accounts, documented, and yours if we part ways — the same ownership rule as everything else we make.</> },
  { q: "Is this about replacing my team?", a: <>It&apos;s about replacing their busywork. The hours that come back go to the work that actually needs a human — customers, judgment, growth. <strong>Nobody&apos;s job is a data-entry queue.</strong></> },
  { q: "How much does AI automation cost for a small business?", a: <>Published here: single builds start at $2,000, three-to-five-workflow packages run $8,000–$20,000, and managed retainers are $1,000–$3,000/mo. Market-wide, builds run $5,000–$50,000 with $500–$2,000/mo ongoing — most agencies won&apos;t tell you until a discovery call. <strong>Payback for a well-scoped build is typically 60–90 days.</strong></> },
  { q: "Do I need an agency or is Zapier enough?", a: <>If the workflow is small, stable, and someone in-house can maintain it — Zapier or Make is often enough, and <strong>we&apos;ll say so in your plan.</strong> You need a build partner when the workflow crosses several systems, has judgment steps, involves customer data, or nobody in-house has time to own it when an API changes.</> },
];

const ADJACENT = [
  { title: "Know what AI is worth to you", desc: "Not sure what to automate? Start with the assessment — a ranked roadmap, including what to skip." },
  { title: "Get more customers", desc: "Automation keeps the engine running; marketing keeps it fed. They compound." },
  { title: "Fill your pipeline", desc: "Outbound plus automation is how follow-up stops depending on someone remembering." },
  { title: "The Scale bundle", desc: "Marketing, pipeline, and automation together.", tag: "Three services — 15% off" },
];

const RULES: ReactNode[] = [
  <>Every AI workflow has an <strong>explicit human-judgment step</strong> — marked in the docs, not left to habit.</>,
  <>AI handles volume; <strong>people handle meaning</strong> — approval, exceptions, anything a customer sees.</>,
  <>If output could embarrass you in front of a customer, <strong>it does not ship without a human gate.</strong></>,
  <>You can read what every automation does. <strong>No black boxes in your business.</strong></>,
];

/** Hero signature: the live automation pipeline (pure CSS animation). */
function PipeCard() {
  return (
    <SignatureCard
      ariaLabel="A sample automated workflow"
      live="Automation · Running"
      corner="NO BLACK BOXES"
      footLeft={
        <>
          AI drafts <span className="gt">·</span> humans finish
        </>
      }
      footRight="You own every step"
    >
      <div className="aa-pipe-body">
        <div className="aa-pnode">
          <span className="ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="2" />
              <path d="M4 9h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span className="tx">
            <b>New enquiry lands</b>
            <small>Trigger — form, inbox, or CRM</small>
          </span>
          <span className="tag">Trigger</span>
        </div>
        <div className="aa-flow"><i></i></div>
        <div className="aa-pnode ai">
          <span className="ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span className="tx">
            <b>AI scores &amp; drafts the reply</b>
            <small>Volume work — sort, summarise, first pass</small>
          </span>
          <span className="tag">AI</span>
        </div>
        <div className="aa-flow f2"><i></i></div>
        <div className="aa-pnode gate">
          <span className="ic">
            <span className="ring"></span>
            {CHECK}
          </span>
          <span className="tx">
            <b>A human approves</b>
            <small>Judgment step — anything a customer sees</small>
          </span>
          <span className="tag">Human gate</span>
        </div>
        <div className="aa-flow f3"><i></i></div>
        <div className="aa-pnode">
          <span className="ic">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="tx">
            <b>Logged · follow-up booked</b>
            <small>Documented — you own it all</small>
          </span>
          <span className="tag">Done</span>
        </div>
      </div>
    </SignatureCard>
  );
}

export default function AiAutomationView() {
  return (
    <>
      <ServiceDetailHero
        eyebrow="SS-WEB-07 · Practice file · AI & Automation"
        line1="Automate"
        line2={
          <>
            the <span className="grad-text">busywork.</span>
          </>
        }
        lead={
          <>
            AI and workflow automation for small business — the reports that eat your Friday, the data entry nobody
            checks, the follow-ups that slip. <strong>Automated, documented, and owned by you.</strong>
          </>
        }
        primary={{ label: "Get your free growth plan", href: "/growth-plan" }}
        secondary={{ label: "See what it costs", href: "#pricing" }}
        sign="AI where it earns its place — humans where judgment lives"
      >
        <PipeCard />
      </ServiceDetailHero>

      {/* NAMED PRODUCT / SCOPE */}
      <section className="band tint" id="scope">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Named product · Fixed scope</span>
            <h2>What the engagement includes — in writing.</h2>
            <p>One named product, one fixed scope, one price fixed in your plan before work starts — described in named workflows, not vague retainers.</p>
          </Reveal>
          <FeatureGrid cards={SCOPE_CARDS} />
          <Callout label="Scope is written down — both directions">
            Your plan lists exactly which processes are in scope. <strong>New automation ideas mid-build get scoped and priced in writing</strong> as their own decisions.
          </Callout>
        </div>
      </section>

      {/* HOW IT RUNS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it runs</span>
            <h2>Three steps. No mysteries.</h2>
          </Reveal>
          <StepsRow steps={STEPS} />
        </div>
      </section>

      {/* HOUSE RULE */}
      <section className="band dark" id="rule">
        <div className="wrap">
          <div className="aa-rule-wrap">
            <Reveal>
              <span className="eyebrow">The house rule</span>
              <h2 className="aa-rule-h" style={{ marginTop: 16 }}>
                AI drafts. <span className="gt">Humans finish.</span>
              </h2>
              <ul className="aa-rule-list">
                {RULES.map((rule, i) => (
                  <li key={i}>
                    <span className="mk">{CHECK}</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="aa-lanes" style={d(90)}>
              <div className="aa-lane">
                <span className="cap">AI · volume</span>
                <div className="cards">
                  <span className="aa-chip">Drafting</span>
                  <span className="aa-chip">Sorting</span>
                  <span className="aa-chip">Summarising</span>
                  <span className="aa-chip">First-pass triage</span>
                </div>
              </div>
              <div className="aa-lane-flow">
                <i></i>
                <span className="lab">flagged &amp; routed →</span>
              </div>
              <div className="aa-gatebar">
                <span className="g">{CHECK}</span>
                <div>
                  <b>Human judgment gate</b>
                  <small>Approval · exceptions · customer-facing</small>
                </div>
              </div>
              <div className="aa-lane-flow">
                <i style={{ animationDelay: ".9s" }}></i>
                <span className="lab">→ meaning</span>
              </div>
              <div className="aa-lane human">
                <span className="cap">People · meaning</span>
                <div className="cards">
                  <span className="aa-chip">Approval</span>
                  <span className="aa-chip">Exceptions</span>
                  <span className="aa-chip">Anything a customer sees</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT TO AUTOMATE FIRST */}
      <section className="band tint" id="first">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Plain answer</span>
            <h2>What to automate first.</h2>
            <p>
              The workflows that survive in production are high-frequency, rule-heavy, and low-variance — the ones you do
              the same way every week. Six show up on almost every small-business list.
            </p>
          </Reveal>
          <FeatureGrid cards={WORKFLOWS.map((w) => ({ icon: w.icon, title: w.title, text: w.text, delay: w.delay }))} columns={3} />
          <Callout label="In your free growth plan">
            We score each candidate on <strong>frequency, rule clarity, and exception rate</strong> — then automate the ones that clear the bar first.
          </Callout>
        </div>
      </section>

      {/* HONEST COMPARISON MATRIX */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The honest comparison</span>
            <h2>A workflow tool, an AI agency, or an automation build?</h2>
            <p>All three are legitimate — for different situations. Here&apos;s the straight version, including when <em>not</em> to hire us.</p>
          </Reveal>
          <Reveal as="p" className="aa-mx-hint">
            Scroll the table sideways →
          </Reveal>
          <Reveal className="aa-matrix-scroll">
            <div className="aa-matrix">
              <div className="aa-mx-cell aa-mx-axis" style={{ background: "var(--surface-2)" }}></div>
              {MATRIX_COLUMNS.map((col) => (
                <div className={`aa-mx-cell aa-mx-h${col.isThis ? " aa-mx-col-this" : ""}`} key={col.h}>
                  {col.h}
                  <small>
                    {col.sub}
                    {col.tag && <span className="aa-mx-tag">{col.tag}</span>}
                  </small>
                </div>
              ))}
              {MATRIX_ROWS.map((row) => (
                <div style={{ display: "contents" }} key={row.axis}>
                  <div className="aa-mx-cell aa-mx-axis">{row.axis}</div>
                  {row.cells.map((cell, i) => (
                    <div className={`aa-mx-cell${i === 2 ? " aa-mx-col-this" : ""}`} key={i}>
                      <p>{cell}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="aa-mx-test">
            Simplest test: <strong>if you already know exactly what you&apos;d automate, you want a build.</strong> If
            you&apos;re still figuring out where AI belongs, start with AI consulting first — it&apos;s cheaper than
            building the wrong thing.
          </Reveal>
        </div>
      </section>

      {/* FIVE WAYS / SERVICES */}
      <section className="band tint" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The service index</span>
            <h2>Five ways this gets bought.</h2>
            <p>
              Most clients start with the workflow that eats the most hours. Each service is scoped and priced on its own
              — combine any two for an automatic 10% discount.
            </p>
          </Reveal>
          <Reveal className="aa-subs">
            {SUBS.map((sub) => (
              <a className="aa-sub" href="/growth-plan" key={sub.n}>
                <span className="sn">{sub.n}</span>
                <div className="st">
                  <h3>{sub.h}</h3>
                  <p>{sub.p}</p>
                </div>
                <span className="go">↗</span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="band" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What it costs</span>
            <h2>Priced by scope band — set before work starts.</h2>
            <p>
              Your free growth plan scopes the work and fixes the exact price in writing before anything begins. No hourly
              meter, no surprise line items — and the number doesn&apos;t move after that.
            </p>
          </Reveal>
          <PriceBands
            bands={[
              { kicker: "Single automation", price: "from $2,000", desc: "One workflow, built, tested, documented, and handed to you." },
              { kicker: "Package", price: "$8,000–$20,000", desc: "Three-to-five workflows scoped together as one coordinated build." },
              { kicker: "Managed", price: "$1,000–$3,000", per: "/mo", desc: "We monitor, maintain, and keep tuning as your tools and volume change." },
            ]}
            discounts={[
              { pct: "10%", text: <><b>Any two services together</b> — applied to both.</> },
              { pct: "15%", text: <><b>Three or more services</b> — applied across all of them.</> },
            ]}
            note={
              <>
                Payback for a well-scoped build is typically 60–90 days. The full pricing model — published bands, terms,
                and how ranges work — is on the <a href="/pricing">price list</a>.
              </>
            }
          />
        </div>
      </section>

      <ServiceFaq items={FAQS} />

      {/* ADJACENT */}
      <section className="band" id="adjacent">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Adjacent practices</span>
            <h2>Often bought together.</h2>
          </Reveal>
          <AdjacentGrid cards={ADJACENT} />
        </div>
      </section>

      <CtaBand
        eyebrow="End of file · SS-WEB-07"
        heading="Get your free growth plan."
        copy={
          <>
            A working session on your goals, then a written plan with the exact scope, price, and sequence we&apos;d
            recommend — <strong>free, and yours to keep whether or not you hire us.</strong>
          </>
        }
        primaryLabel="Get your free growth plan"
        primaryHref="/growth-plan"
        secondary={{ label: "See what it costs", href: "#pricing", arrow: "↗" }}
        id="plan"
      />
    </>
  );
}
