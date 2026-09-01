"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import {
  AdjacentGrid,
  Callout,
  FeatureGrid,
  NoteCallout,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  StepsRow,
  d,
} from "../ServiceDetailKit";
import "./slg-page.css";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: weekly activity funnel -------- */

const FUNNEL_ROWS = [
  { label: "Researched", w: "100%", count: 240 },
  { label: "Sent", w: "78%", count: 188 },
  { label: "Opened", w: "46%", count: 102 },
  { label: "Replied", w: "22%", count: 24 },
  { label: "Booked", w: "13%", count: 8, book: true },
];

function FunnelCard() {
  const [fill, setFill] = useState(false);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t = setTimeout(() => {
      setFill(true);
      countRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = FUNNEL_ROWS[i].count;
        if (reduce) {
          el.textContent = String(target);
          return;
        }
        let start: number | null = null;
        const tick = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / 1100, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      });
    }, reduce ? 0 : 1000);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <SignatureCard
      ariaLabel="A sample weekly activity report"
      className={`slg-funnel${fill ? " fill" : ""}`}
      live="Weekly report · Verified"
      corner="WEEK 6"
      footLeft="Under your name"
      footRight="your sign-off →"
    >
      <div className="slg-funnel-body">
        {FUNNEL_ROWS.map((row, i) => (
          <div className={`slg-fn-row${row.book ? " book" : ""}`} key={row.label}>
            <span className="fl">{row.label}</span>
            <span className="slg-fn-track">
              <span className="slg-fn-fill" style={{ "--w": row.w } as React.CSSProperties}></span>
            </span>
            <span
              className="fc"
              ref={(el) => {
                countRefs.current[i] = el;
              }}
            >
              0
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- named product / scope -------- */

const SCOPE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "ICP & targeting",
    title: "Who’s actually worth reaching",
    items: [
      "A defined ideal customer profile — industry, size, role, trigger",
      "The disqualifiers written down too, so we don’t waste sends",
      "Signed off by you before a single message goes out",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "List building",
    title: "Real people, verified",
    items: [
      "Prospects researched and contact details verified — not scraped junk",
      "Deliverability protected: warmed domains, checked addresses",
      "The list is yours, exported to your CRM, kept forever",
    ],
    delay: 80,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "Outreach in your voice",
    title: "Sent under your name",
    items: [
      "Sequences written in your voice, approved by you before they run",
      "Cold email and LinkedIn, coordinated — not two disconnected tools",
      "Replies routed to you; nothing impersonates you unsupervised",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "Booked conversations",
    title: "Straight onto your calendar",
    items: [
      "Interested replies handled and booked onto your calendar",
      "A weekly report with the actual counts — sent, opened, replied, booked",
      "Context attached to every booking, so you walk in warm",
    ],
    delay: 80,
  },
];

/* -------- how it runs -------- */

const STEPS = [
  {
    no: "01",
    dur: "Week 1",
    title: "Target",
    blocks: [
      { k: "What happens", v: <>We build the ideal customer profile with you, draft the messaging, and <strong>get both approved before anything sends.</strong></> },
      { k: "You get", v: "A written target profile and message set you signed off — yours to keep." },
    ],
  },
  {
    no: "02",
    dur: "Sequences live",
    title: "Reach",
    blocks: [
      { k: "What happens", v: <>Verified lists built, domains warmed, and sequences run across email and LinkedIn — <strong>replies routed to you, deliverability watched daily.</strong></> },
      { k: "You get", v: "Outreach going out under your name, with a real person on the replies." },
    ],
  },
  {
    no: "03",
    dur: "Every week",
    title: "Book",
    blocks: [
      { k: "What happens", v: <>Interested prospects booked onto your calendar, and a weekly report with <strong>the actual counts — researched, sent, opened, replied, booked.</strong></> },
      { k: "You get", v: "Conversations on your calendar and numbers you can audit." },
    ],
  },
];

/* -------- honest difference -------- */

const DIFFS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "We commit to activity, not outcomes",
    text: <>Sends, follow-ups, replies handled, meetings booked — <strong>numbers we control and can verify.</strong> Whether a deal closes depends on your offer and your call, and we won’t pretend otherwise.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "“Qualified” is defined in writing",
    text: <>Before we start, we agree exactly what a qualified conversation is — <strong>role, fit, and intent</strong> — so nobody moves the goalposts at reporting time.</>,
    delay: 70,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "You own the accounts and the data",
    text: <>Domains, inboxes, lists, and CRM records are yours — <strong>built in your accounts, kept if we part ways.</strong> No hostage lists, no “our platform” lock-in.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Compliant by construction",
    text: <>Opt-outs honored, sending limits respected, domains warmed properly. <strong>Deliverability is a discipline,</strong> not a growth hack that burns your domain in a month.</>,
    delay: 70,
  },
];

/* -------- vs comparison -------- */

const VS_ROWS = [
  { axis: "Price", agency: "“Book a call for pricing.” The meter is the model.", here: "Published bands, fixed in your plan before work starts." },
  { axis: "“Qualified”", agency: "Defined vaguely, then flexed at reporting time.", here: "Agreed in writing up front — role, fit, intent." },
  { axis: "Contract", agency: "Long lock-in, auto-renew, awkward exit.", here: "Short minimum term, then month to month." },
  { axis: "Who does the work", agency: "A junior on ten accounts, or offshore autopilot.", here: "A named specialist — a human on your replies." },
  { axis: "Reporting", agency: "A dashboard of vanity numbers, monthly.", here: "Actual activity counts — verified, every week." },
  { axis: "Data & accounts", agency: "“Our platform.” You leave with nothing.", here: "Your domains, lists, and CRM — kept for good." },
];

function VsMatrix() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <Reveal className="slg-vs-scroll">
      <div className={`slg-vs${inView ? " in" : ""}`} ref={ref}>
        <span className="scan" aria-hidden="true"></span>
        <div className="cell axis"></div>
        <div className="cell head">Typical agency</div>
        <div className="cell head col-here">
          Here <span className="tag">You are here</span>
        </div>
        {VS_ROWS.map((row) => (
          <div style={{ display: "contents" }} key={row.axis}>
            <div className="cell axis">{row.axis}</div>
            <div className="cell">
              <p>{row.agency}</p>
            </div>
            <div className="cell col-here">
              <p>
                <span className="v">{CHECK}</span>
                {row.here}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* -------- services index / faq / adjacent -------- */

const SUBS = [
  { n: "01", h: "Cold email outreach", p: "Verified lists, warmed domains, and sequences in your voice — deliverability watched daily." },
  { n: "02", h: "LinkedIn outreach", p: "Connection and conversation sequences from your profile — human replies, never a bot pretending to be you." },
  { n: "03", h: "Appointment setting", p: "Interested replies worked and booked onto your calendar, with context attached to every meeting." },
  { n: "04", h: "Lead lists & research", p: "Ideal-customer lists researched and verified — exported to your CRM, yours to keep." },
  { n: "05", h: "CRM setup & pipeline", p: "Your pipeline wired so every reply, booking, and follow-up lands somewhere you can see it." },
];

const FAQS = [
  { q: "Can you guarantee a number of leads or deals?", a: <>We guarantee the <strong>activity we control</strong> — the weekly research, sends, follow-ups, and booked conversations, all verifiable. We won’t guarantee closed deals, because those depend on your offer, your pricing, and your sales call. Anyone guaranteeing deals is either overcharging for the risk or planning to redefine “deal” later.</> },
  { q: "Will cold outreach hurt our domain or reputation?", a: <>Not the way we run it. We <strong>warm domains, cap sending, verify every address, and honor opt-outs</strong> — and we typically send from a separate domain, not your primary one, so your main inbox is never at risk. Deliverability is watched daily, because a burned domain ends the program.</> },
  { q: "Who actually writes and sends the messages?", a: <>A named specialist writes them in your voice, and <strong>you approve every sequence before it runs.</strong> AI helps draft and personalize at volume, but a person owns the account and handles the replies — nothing impersonates you unsupervised, and no bot talks to a real prospect on your behalf.</> },
  { q: "How much does B2B lead generation cost?", a: <>Here it’s a retainer, <strong>$2,500–$8,000/mo banded by scope,</strong> fixed in writing before work starts. Market-wide, appointment-setting retainers commonly run $3,000–$10,000/mo, and pay-per-appointment deals $150–$1,000+ per meeting — the latter looks cheaper until you count the no-shows and bad-fit meetings.</> },
  { q: "What do we own if we stop?", a: <><strong>Everything.</strong> The domains, inboxes, verified lists, CRM records, and message templates are built in your accounts and stay with you. There’s no “our platform” you lose access to — the same ownership rule as everything else we make.</> },
];

const ADJACENT = [
  { title: "Give replies somewhere to land", desc: "A website that sells — so the prospects you book arrive somewhere that closes, not a brochure." },
  { title: "Automate the follow-up", desc: "AI & automation wires the sequences, reminders, and CRM updates so nothing slips between sends." },
  { title: "The Scale bundle", desc: "Marketing, pipeline, and automation together.", tag: "Three services — 15% off" },
];

export default function SalesLeadGenView() {
  return (
    <>
      <ServiceDetailHero
        eyebrow="SS-WEB-08 · Practice file · Sales & Lead Gen"
        line1="Fill your"
        line2={<span className="grad-text">pipeline.</span>}
        lead={
          <>
            B2B lead generation and appointment setting for owners who are done chasing. Targeted cold email and
            LinkedIn outreach, written in your voice and sent under your name — with{" "}
            <strong>the activity counts verified every single week.</strong>
          </>
        }
        primary={{ label: "Get your free growth plan", href: "/growth-plan" }}
        secondary={{ label: "See the difference", href: "#compare" }}
        sign="We commit to activity we can count — not outcomes we can’t control"
      >
        <FunnelCard />
      </ServiceDetailHero>

      {/* NAMED PRODUCT / SCOPE */}
      <section className="band tint" id="scope">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Named product · Fixed scope</span>
            <h2>What the engagement includes — in writing.</h2>
            <p>One named product, one fixed scope, one price set in your plan before outreach starts — described in activity you can count, not vague “leads.”</p>
          </Reveal>
          <FeatureGrid cards={SCOPE_CARDS} />
          <Callout label="Scope is written down — both directions">
            Your plan lists the target profile, the channels, and the weekly activity commitment.{" "}
            <strong>We commit to activity we control</strong> — research, sends, follow-ups, bookings — not to a number
            of closed deals, which depends on your offer and your sales call.
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

      {/* HONEST DIFFERENCE (dark) */}
      <section className="band dark" id="diff">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The honest difference</span>
            <h2 className="slg-hd-h">
              Activity you can count. <span className="gt">Promises we can keep.</span>
            </h2>
            <p>Most lead-gen agencies sell “qualified leads” and quietly define the word to suit themselves. We commit to the work we control — and report it honestly.</p>
          </Reveal>
          <div className="slg-hd-grid">
            {DIFFS.map((diff) => (
              <Reveal className="slg-hd" key={diff.title} style={d(diff.delay ?? 0)}>
                <div className="hi">{diff.icon}</div>
                <h3>{diff.title}</h3>
                <p>{diff.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="slg-hd-note">
            <span className="mk">{CHECK}</span>
            <p>
              The whole model rests on one line:{" "}
              <strong>if we can’t control it, we don’t promise it — and if we can count it, we report it every week.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* HONEST COMPARISON */}
      <section className="band tint" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The honest comparison</span>
            <h2>A typical agency, or here.</h2>
            <p>Both will send email. The difference is what’s promised, who does the work, and what you own when it’s over.</p>
          </Reveal>
          <Reveal as="p" className="slg-mx-hint">
            Scroll sideways →
          </Reveal>
          <VsMatrix />
        </div>
      </section>

      {/* RETAINER VS PPA */}
      <section className="band" id="model">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The straight answer</span>
            <h2>Retainer, or pay-per-appointment?</h2>
            <p>People ask for pay-per-appointment because it sounds risk-free. Here’s what each model actually does to the work — and which one we run.</p>
          </Reveal>
          <div className="slg-model-grid">
            <Reveal as="article" className="slg-mc ppa">
              <span className="ml">Pay-per-appointment</span>
              <h3>Sounds risk-free</h3>
              <div className="price">Priced per booked meeting</div>
              <div className="kv">
                <span className="k">What it sounds like</span>
                <span className="val">“I only pay when a meeting lands” — all the risk on the agency.</span>
              </div>
              <div className="kv">
                <span className="k">What it actually means</span>
                <span className="val">
                  The incentive is to <strong>book anyone who’ll say yes</strong> — loose targeting, no-shows, and
                  meetings that waste your morning. You pay for volume, not fit.
                </span>
              </div>
            </Reveal>
            <Reveal as="article" className="slg-mc ret" style={d(80)}>
              <span className="slg-mc-badge">The model we run</span>
              <span className="ml">Retainer</span>
              <h3>Aligned on quality</h3>
              <div className="price">$2,500–$8,000/mo by scope</div>
              <div className="kv">
                <span className="k">What it sounds like</span>
                <span className="val">A fixed monthly fee for a defined activity commitment.</span>
              </div>
              <div className="kv">
                <span className="k">What it actually means</span>
                <span className="val">
                  The incentive is to <strong>book the right conversations,</strong> because we keep the account by
                  keeping you happy — not by inflating a meeting count. Targeting stays tight; you own everything.
                </span>
              </div>
            </Reveal>
          </div>
          <NoteCallout>
            The straight answer:{" "}
            <strong>pay-per-appointment optimizes for the meeting count; a retainer optimizes for meetings worth taking.</strong>{" "}
            If a provider only offers per-appointment, ask how they define “qualified” — the answer tells you everything.
          </NoteCallout>
        </div>
      </section>

      {/* FIVE WAYS / SERVICES */}
      <section className="band tint" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The service index</span>
            <h2>Five ways this gets bought.</h2>
            <p>Most clients start with the channel their buyers actually answer. Each service is scoped and priced on its own — combine any two for an automatic 10% discount.</p>
          </Reveal>
          <Reveal className="slg-subs">
            {SUBS.map((sub) => (
              <a className="slg-sub" href="/growth-plan" key={sub.n}>
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
            <h2>Priced by scope — set before work starts.</h2>
            <p>A monthly retainer, banded by how many channels and how much volume you need. Your exact number is fixed in your free growth plan, in writing, before any outreach begins.</p>
          </Reveal>
          <div className="slg-phero">
            <Reveal as="article" className="slg-pmain">
              <span className="pk">Lead-gen retainer</span>
              <div className="pp">
                $2,500–$8,000 <span className="per">/mo</span>
              </div>
              <p className="pd">Banded by channels, sending volume, and whether appointment setting and CRM are in scope. No per-appointment meter, no “book a call for pricing.”</p>
            </Reveal>
            <div className="slg-disc">
              <Reveal className="slg-dc" style={d(80)}>
                <span className="pct">10%</span>
                <p>
                  <b>Any two services together</b> — applied to both.
                </p>
              </Reveal>
              <Reveal className="slg-dc" style={d(140)}>
                <span className="pct">15%</span>
                <p>
                  <b>Three or more services</b> — applied across all of them.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal as="p" className="sd-price-note">
            Short minimum term, then month to month. Ad and tooling costs, where they apply, are paid at cost in your
            own accounts. Every price is on the <a href="/pricing">price list</a>.
          </Reveal>
        </div>
      </section>

      <ServiceFaq items={FAQS} tint />

      {/* ADJACENT */}
      <section className="band slg-adj" id="adjacent">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Adjacent practices</span>
            <h2>Often bought together.</h2>
          </Reveal>
          <AdjacentGrid cards={ADJACENT} />
        </div>
      </section>

      <CtaBand
        eyebrow="End of file · SS-WEB-08"
        heading="Get your free growth plan."
        copy={
          <>
            A working session on your ideal customer, then a written plan with the exact scope, price, and weekly
            activity we’d commit to —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>free, and yours to keep whether or not you hire us.</strong>
          </>
        }
        primaryLabel="Get your free growth plan"
        primaryHref="/growth-plan"
        secondary={{ label: "See the difference", href: "#compare", arrow: "↗" }}
        id="plan"
      />
    </>
  );
}
