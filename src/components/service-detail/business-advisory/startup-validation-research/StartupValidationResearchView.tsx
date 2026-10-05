"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./svr-page.css";

/* -------- icons -------- */

const ICON_DOC_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_MAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BUBBLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h13v9H8l-4 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 13 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PIVOT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PITCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 21h8M12 19v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: evidence ladder -------- */

const RUNGS: { n: string; title: string; sub: string; grade: string; hot?: boolean }[] = [
  { n: "1", title: "Opinions", sub: "Friends say it’s a good idea", grade: "Weakest" },
  { n: "2", title: "Stated interest", sub: "Strangers say they’d use it", grade: "Weak" },
  { n: "3", title: "Shared pain", sub: "They describe the problem unprompted", grade: "Moderate" },
  { n: "4", title: "Action taken", sub: "Joined waitlist / booked a demo", grade: "You’re here", hot: true },
  { n: "5", title: "Commitment", sub: "Signed LOI or agreed to a pilot", grade: "Stronger" },
  { n: "6", title: "Payment", sub: "Pre-order or paid early access", grade: "Strongest" },
];

function LadderCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the ladder is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample validation evidence ladder"
      className={`svr-card${run ? " run" : ""}`}
      live="Evidence ladder"
      corner="WEAK → STRONG"
      footLeft="Turn assumptions into evidence"
      footRight="proceed, pivot, or pause →"
    >
      {/* column-reverse: rung 6 sits at the top, rung 1 at the bottom, like the design */}
      <div className="svr-ladder">
        {RUNGS.map((r) => (
          <div className={`svr-vr${r.hot ? " hot" : ""}`} key={r.n}>
            <span className="vn">{r.n}</span>
            <span className="vt">
              <b>{r.title}</b>
              <small>{r.sub}</small>
            </span>
            <span className="vg">{r.grade}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- failure stats (count-ups) -------- */

type Stat = { count?: number; suffix?: string; value?: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 43,
    suffix: "%",
    label: "Poor product-market fit",
    text: (
      <>
        Share of shut-down VC-backed startups (known reason) where poor PMF was a cause. <em>CB Insights, 2026</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 29,
    suffix: "%",
    label: "Bad timing",
    text: (
      <>
        Where launching too early or too late played a role. <em>CB Insights, 2026</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 19,
    suffix: "%",
    label: "Unit economics",
    text: (
      <>
        Closures linked to costs outweighing what each customer brought in. <em>CB Insights, 2026</em>
      </>
    ),
    delay: 160,
  },
  {
    value: "~1 in 2",
    label: "Five-year survival",
    text: (
      <>
        Roughly half of new U.S. businesses are still operating five years on. <em>U.S. BLS</em>
      </>
    ),
    delay: 240,
  },
];

/* the design fires the count-ups once the stats block scrolls past 85% of the viewport */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

function StatCard({ stat, run, reduce }: { stat: Stat; run: boolean; reduce: boolean }) {
  const [value, setValue] = useState(0);
  const target = stat.count ?? 0;

  useEffect(() => {
    if (!run || reduce || stat.count === undefined) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(e * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, stat.count, target]);

  // reduced motion: the final figure is derived at render, no animation
  const shown = reduce ? target : value;

  return (
    <Reveal className="svr-stat" style={d(stat.delay)}>
      <div className="sv">
        {stat.value !== undefined ? (
          stat.value
        ) : (
          <>
            {Math.round(shown)}
            {stat.suffix}
          </>
        )}
      </div>
      <span className="sk">{stat.label}</span>
      <p>{stat.text}</p>
    </Reveal>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  const [gridRef, inView] = useInView<HTMLDivElement>(STATS_IO);
  return (
    <div className="svr-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- services: eight rows -------- */

const SERVICES: { no: string; title: string; text: string; answers: string }[] = [
  {
    no: "01",
    title: "Problem & Customer Discovery Interviews",
    text: "One-on-one interviews with people in your target market about their problems, habits, and current solutions.",
    answers: "Is this problem real and painful enough?",
  },
  {
    no: "02",
    title: "Market Sizing (TAM, SAM, SOM)",
    text: "Bottom-up estimates of your total, serviceable, and reachable market using public data and industry sources.",
    answers: "Is the market big enough to build in?",
  },
  {
    no: "03",
    title: "Competitor & Alternative Analysis",
    text: "Review of direct competitors, indirect alternatives, and “do nothing” options, including pricing and positioning.",
    answers: "Who else solves this, and where are the gaps?",
  },
  {
    no: "04",
    title: "Customer Surveys",
    text: "Structured surveys to measure how common a problem is across a wider group of potential buyers.",
    answers: "How many people share this need?",
  },
  {
    no: "05",
    title: "Demand Testing",
    text: "Landing pages, waitlists, or small ad tests that measure whether people take action, not just say yes.",
    answers: "Will people actually sign up or click?",
  },
  {
    no: "06",
    title: "Pricing Research",
    text: "Willingness-to-pay questions and pricing tests to find a price range buyers accept.",
    answers: "What will customers pay?",
  },
  {
    no: "07",
    title: "Industry & Trend Research",
    text: "Desk research on market trends, regulations, and timing factors that affect your idea.",
    answers: "Is now the right time?",
  },
  {
    no: "08",
    title: "Validation Report & Decision Memo",
    text: "All findings summarized in plain language with a recommended next step.",
    answers: "Should we proceed, pivot, or pause?",
  },
];

/* -------- evidence ladder (big, weak -> strong) -------- */

const LADDER: { s: number; rung: string; title: string; text: string; badge: string }[] = [
  { s: 1, rung: "Rung 1", title: "Opinions", text: "Friends and family say it’s a good idea.", badge: "Weakest" },
  { s: 2, rung: "Rung 2", title: "Stated interest", text: "Strangers in interviews say they would use it.", badge: "Weak" },
  { s: 3, rung: "Rung 3", title: "Shared pain", text: "Interviewees describe the problem unprompted and what it costs them.", badge: "Moderate" },
  { s: 4, rung: "Rung 4", title: "Action taken", text: "People join a waitlist, book a demo, or give their email.", badge: "Strong" },
  { s: 5, rung: "Rung 5", title: "Commitment", text: "Prospects sign a letter of intent or agree to a pilot.", badge: "Stronger" },
  { s: 6, rung: "Rung 6", title: "Payment", text: "Customers pre-order or pay for an early version.", badge: "Strongest" },
];

/* -------- what you receive -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_DOC_LINES, text: "Interview guide and screened interview list" },
  { icon: ICON_LIST, text: "Interview notes and recurring themes" },
  { icon: ICON_TREND, text: "Market size estimate with sources and assumptions" },
  { icon: ICON_MAP, text: "Competitor and alternatives map" },
  { icon: ICON_BUBBLE, text: "Survey and demand test results (if included)" },
  { icon: ICON_DOLLAR, text: "Pricing range findings (if included)" },
  { icon: ICON_DOC_CHECK, text: "Plain-language validation report" },
  { icon: ICON_PIVOT, text: "Decision memo: proceed, pivot, or pause" },
  { icon: ICON_CHAT, text: "Walkthrough call to review findings" },
];

/* -------- how / who / faq -------- */

const STEPS = [
  { no: "Step 1 · Week 1", title: "Frame", text: "List your riskiest assumptions and agree on exactly what to test first.", delay: 0 },
  { no: "Step 2 · Weeks 2–3", title: "Research", text: "Run interviews, desk research, and competitor analysis.", delay: 80 },
  { no: "Step 3 · Weeks 3–4", title: "Test", text: "Launch surveys, demand tests, or pricing tests where useful.", delay: 160 },
  { no: "Step 4 · Weeks 4–5", title: "Decide", text: "Review the report and decide your next step together: proceed, pivot, or pause.", delay: 240 },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>First-time founders</strong> with an idea they want to test before quitting a job or raising money.</>, delay: 0 },
  { icon: ICON_BARS, text: <><strong>Existing businesses</strong> exploring a new product, service, or market.</>, delay: 60 },
  { icon: ICON_PITCH, text: <><strong>Founders preparing to fundraise</strong> who need customer evidence and market data for their pitch.</>, delay: 120 },
  { icon: ICON_PIVOT, text: <><strong>Teams unsure whether to pivot</strong> and wanting outside research before deciding.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does startup validation cost?", a: <>It depends on which services you choose and how many interviews or tests are involved. <strong>We share pricing on the validation call</strong> after understanding your idea.</> },
  { q: "How many customer interviews do you run?", a: <>Most projects include <strong>10–20 interviews,</strong> depending on how broad your target market is. We agree on the number during scoping.</> },
  { q: "Can validation tell me for sure if my idea will work?", a: <>No research can guarantee success. Validation <strong>reduces uncertainty</strong> by showing where the evidence is strong, where it’s weak, and what still needs testing.</> },
  { q: "What if the research shows my idea needs to change?", a: <>That’s a useful result. The report highlights what buyers responded to, so you can <strong>adjust the idea, target a different customer, or pause</strong> before spending more.</> },
  { q: "Will you keep my idea confidential?", a: <>Yes. We’re happy to <strong>sign an NDA</strong> before you share any details.</> },
  { q: "Which service should I start with?", a: <>Most ideas start with <strong>discovery interviews</strong>: they answer the biggest question (is the problem real?) cheapest and fastest. We’ll recommend the right mix on the call.</> },
];

/* -------- page -------- */

export default function StartupValidationResearchView() {
  return (
    <div className="svr-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Business & Startup Advisory", href: "/business-advisory" }}
        line1="Test your idea with real"
        line2={
          <>
            buyers before you <span className="grad-text">build.</span>
          </>
        }
        lead={
          <>
            Customer interviews, market sizing, and competitor research that turn assumptions into evidence,{" "}
            <strong>so you can decide your next step with clearer information,</strong> not a gut feeling.
          </>
        }
        primary={{ label: "Book a validation call", href: "/contact" }}
        secondary={{ label: "See our services ↓", href: "#services" }}
      >
        <LadderCard />
      </ServiceDetailHero>

      <TrustBar items={["Real customer interviews", "Bottom-up market sizing", "Evidence, not opinions", "Proceed / pivot / pause memo"]} />

      {/* FAILURE STATS (dark) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The numbers behind startup failure</span>
            <h2>Demand, timing, and economics need testing early.</h2>
            <p>Research on closed startups points to the same lesson, and most of these risks can be tested cheaply before launch.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="svr-stat-note">
            Most of these risks can be tested cheaply before launch. <strong>Validation is how you test them.</strong>
          </Reveal>
        </div>
      </section>

      {/* 8 SERVICES */}
      <section className="band tint" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we provide</span>
            <h2>Each service answers one specific question.</h2>
            <p>Choose a single service or combine several into one validation project.</p>
          </Reveal>
          <Reveal className="svr-svc-list">
            {SERVICES.map((svc) => (
              <div className="svr-row" key={svc.no}>
                <span className="sq">{svc.no}</span>
                <div className="sm">
                  <h3>{svc.title}</h3>
                  <p>{svc.text}</p>
                </div>
                <div className="sa">
                  <span className="ak">Answers</span>
                  <span className="av">{svc.answers}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EVIDENCE LADDER */}
      <section className="band" id="ladder">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The validation evidence ladder</span>
            <h2>Compliments are easy to give. Money and time are not.</h2>
            <p>Not all evidence is equal. The goal is to move your idea as high up this ladder as your timeline allows.</p>
          </Reveal>
          {/* column-reverse: rung 6 renders at the top, rung 1 at the bottom */}
          <Reveal className="svr-lad">
            {LADDER.map((rung) => (
              <div className={`svr-ld s${rung.s}`} key={rung.s}>
                <span className="str"></span>
                <span className="rn">{rung.rung}</span>
                <span className="rt">
                  <b>{rung.title}</b>
                  <span>{rung.text}</span>
                </span>
                <span className="rb">{rung.badge}</span>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="svr-lad-note">
            Your validation report shows <strong>which rung your idea reached</strong>, and what it would take to climb higher.
          </Reveal>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="band tint" id="receive">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you receive</span>
            <h2>Evidence, findings, and a clear decision, in plain language.</h2>
          </Reveal>
          <Reveal className="svr-rec-grid">
            {RECEIVE.map((item) => (
              <div className="svr-reci" key={item.text}>
                <span className="rk">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Frame → research → test → decide.</h2>
            <p>Timelines depend on the services selected and how quickly interviews can be scheduled.</p>
          </Reveal>
          <div className="svr-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="svr-step" key={step.title} style={d(step.delay)}>
                <span className="svr-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>For anyone about to spend real money on an unproven idea.</h2>
          </Reveal>
          <div className="svr-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="svr-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every project." />

      <CtaBand
        id="start"
        eyebrow="Startup Validation & Market Research"
        heading="Test before you build."
        copy={
          <>
            Book a validation call to talk through your idea and the questions that need answers first:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll look at the evidence you already have and suggest the fastest way to strengthen it.</strong>
          </>
        }
        primaryLabel="Book a validation call"
        primaryHref="/start-project"
        secondary={{ label: "See our services", href: "#services", arrow: "↗" }}
      />
    </div>
  );
}
