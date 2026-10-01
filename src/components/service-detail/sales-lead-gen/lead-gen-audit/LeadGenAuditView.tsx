"use client";

import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { GetGrid, ServiceDetailHero, ServiceFaq, SignatureCard, StepCards, TrustBar } from "../../ServiceDetailKit";
import "./lga-page.css";

/* -------- shared glyphs -------- */

const DROP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ARROW_RIGHT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The design's bar width lives in a `--w` custom property that the fill animation reads. */
const w = (pct: string): CSSProperties => ({ "--w": pct } as CSSProperties);

/* -------- copy -------- */

type Leak = { n: string; width: string; label: string; leaking?: boolean };

const LEAKS: Leak[] = [
  { n: "1", width: "90%", label: "Target" },
  { n: "2", width: "82%", label: "Reach" },
  { n: "3", width: "38%", label: "Engage", leaking: true },
  { n: "4", width: "70%", label: "Qualify" },
  { n: "5", width: "44%", label: "Book", leaking: true },
  { n: "6", width: "66%", label: "Hand off" },
];

type Stage = { n: string; icon: ReactNode; title: string; q: string };

const STAGES: Stage[] = [
  {
    n: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Target",
    q: "Right buyers?",
  },
  {
    n: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Reach",
    q: "Right channels?",
  },
  {
    n: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Engage",
    q: "Messages land?",
  },
  {
    n: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Qualify",
    q: "Good fit?",
  },
  {
    n: "05",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Book",
    q: "Meetings held?",
  },
  {
    n: "06",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8 7h11M8 12h11M8 17h7M4 7h.01M4 12h.01M4 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Hand off",
    q: "Sales follow-up?",
  },
];

type AuditCard = { icon: ReactNode; title: string; text: string };

const AUDIT_CARDS: AuditCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "ICP & Targeting",
    text: "Who you target, how lists are built, and how well they match your best customers.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 7c0-1.5 3.6-3 8-3s8 1.5 8 3-3.6 3-8 3-8-1.5-8-3ZM4 7v10c0 1.5 3.6 3 8 3s8-1.5 8-3V7" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Data Quality",
    text: "Bounce rates, outdated contacts, missing fields, and duplicates.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Email Deliverability",
    text: "Domains, SPF/DKIM/DMARC, warmup, and inbox placement.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Messaging & Sequences",
    text: "Copy, personalization, cadence, and channel mix.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Lead Handling",
    text: "Response times, qualification, routing, and meeting booking.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "CRM & Reporting",
    text: "How leads are tracked, attributed, and reported.",
  },
];

const DELIVERABLES = [
  "Review of your current outreach setup across channels",
  "Targeting and list quality findings",
  "Deliverability and domain health check",
  "Messaging and sequence feedback",
  "Lead handling and follow-up review",
  "Quick fixes you can make in the next 30 days",
  "Prioritized 90-day improvement plan",
  "Walkthrough call to review findings",
].map((text, i) => ({ text, delay: i * 50 }));

const STEPS = [
  { no: "01", dur: "Days 1–2", title: "Access", text: "Short kickoff call and view access to your outreach tools and CRM.", delay: 0 },
  { no: "02", dur: "Days 3–8", title: "Review", text: "We review targeting, data, deliverability, messaging, and follow-up.", delay: 90 },
  { no: "03", dur: "Days 9–10", title: "Plan", text: "You get the findings, the prioritized plan, and a walkthrough call.", delay: 180 },
];

const FAQS = [
  {
    q: "How much does the lead gen audit cost?",
    a: <>It depends on how many channels and tools we review. <strong>We share exact pricing on the intro call.</strong></>,
  },
  {
    q: "Do we have to hire you to make the changes?",
    a: <>No. <strong>The plan is yours to keep</strong> and use with your own team or any partner.</>,
  },
  {
    q: "Which tools do you review?",
    a: (
      <>
        Common ones include{" "}
        <strong>Apollo, Instantly, Smartlead, lemlist, Sales Navigator, HubSpot, Salesforce, Pipedrive, and GoHighLevel.</strong>{" "}
        If you use something else, we’ll review that too.
      </>
    ),
  },
  {
    q: "Is our data safe?",
    a: <>Yes. We only need <strong>view access,</strong> and we’re happy to sign an NDA.</>,
  },
];

/* -------- motion helpers -------- */

/** Section headings rise word by word once the sec-head reveals (design's `.wd` split). */
function Words({ text }: { text: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
  const words = text.split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="lga-wd" style={{ transitionDelay: `${i * 55}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/<>*";

/** Hero gradient words: decode from random glyphs into the final text (design's text-scramble). */
function Scramble({ text }: { text: string }) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      let iters = 0;
      interval = setInterval(() => {
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < Math.floor(iters)) out += text[i];
          else if (text[i] === " ") out += " ";
          else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        iters += 0.6;
        if (iters >= text.length) {
          clearInterval(interval);
          setShown(text);
        } else {
          setShown(out);
        }
      }, 42);
    }, 1550);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text]);

  return <>{shown}</>;
}

/** Hero grid drifts slightly with scroll (design's parallax layer). */
function useHeroGridParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const grid = document.querySelector<HTMLElement>(".lga-hero .sd-grid-bg");
    if (!grid) return;
    let ticking = false;
    function onScroll() {
      const y = window.scrollY || 0;
      if (y < 1000) grid!.style.transform = `translateY(${(y * 0.09).toFixed(1)}px)`;
      ticking = false;
    }
    function onScrollRaf() {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScrollRaf);
      grid.style.transform = "";
    };
  }, []);
}

/* -------- hero signature: pipeline leak scan -------- */

function LeakCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const run = reduce || started;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <SignatureCard
      className={`lga-leak${run ? " run" : ""}`}
      ariaLabel="A sample pipeline leak scorecard"
      live="Pipeline leak scan"
      corner="WHERE IT LEAKS"
      footLeft="2 leaks found, prioritized"
      footRight="fix these first →"
    >
      <div className="lga-leak-body">
        {LEAKS.map((leak) => (
          <div className={`lga-lk${leak.leaking ? " leaking" : ""}`} key={leak.n}>
            <span className="ln">{leak.n}</span>
            <span className="bar">
              <i style={w(leak.width)}></i>
            </span>
            <span className="lv">
              {leak.leaking ? (
                <span className="drop">
                  {DROP}
                  {leak.label}
                </span>
              ) : (
                leak.label
              )}
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- what we audit: six tilt cards -------- */

function AuditGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="lga-aud-grid">
        {AUDIT_CARDS.map((card) => (
          <article className="lga-audc" data-tilt key={card.title}>
            <span className="lga-audc-spot"></span>
            <div className="ai">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- page -------- */

export default function LeadGenAuditView() {
  useHeroGridParallax();

  return (
    <div className="lga-page">
      <ServiceDetailHero
        compact
        className="lga-hero"
        crumb={{ label: "Sales & Lead Generation", href: "/sales-lead-gen" }}
        line1="Find out where your"
        line2={
          <>
            leads are{" "}
            <span className="grad-text">
              <Scramble text="slipping away." />
            </span>
          </>
        }
        lead={
          <>
            A focused review of your outreach, targeting, and follow-up, <strong>with a clear, prioritized plan</strong> of
            what to fix first. Channel-agnostic, plain-language, and no obligation to hire us.
          </>
        }
        primary={{ label: "Book your lead gen audit", href: "/start-project" }}
        secondary={{ label: "What we audit ↓", href: "#audit" }}
      >
        <LeakCard />
      </ServiceDetailHero>

      <TrustBar items={["Channel-agnostic", "Plain-language report", "No obligation to hire us", "The plan is yours to keep"]} />

      {/* PIPELINE */}
      <section className="band tint" id="pipeline">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The pipeline we review</span>
            <h2>
              <Words text="We follow a lead from first touch to closed deal, and find where it stalls." />
            </h2>
          </Reveal>
          <Reveal className="lga-pipe">
            {STAGES.map((stage, i) => (
              <Fragment key={stage.n}>
                {i > 0 && (
                  <span className="lga-parr" aria-hidden="true">
                    {ARROW_RIGHT}
                  </span>
                )}
                <article className="lga-pp">
                  <span className="pn">{stage.n}</span>
                  <div className="pi">{stage.icon}</div>
                  <h3>{stage.title}</h3>
                  <p>{stage.q}</p>
                </article>
              </Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHAT WE AUDIT */}
      <section className="band" id="audit">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we audit</span>
            <h2>
              <Words text="Six places leads leak, checked one by one." />
            </h2>
          </Reveal>
          <AuditGrid />
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="band tint" id="get">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you get</span>
            <h2>
              <Words text="Findings, quick wins, and a prioritized plan, in plain language." />
            </h2>
          </Reveal>
          <div className="lga-get">
            <GetGrid items={DELIVERABLES} />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>
              <Words text="Access → review → plan, in about 10 days." />
            </h2>
          </Reveal>
          <div className="lga-steps">
            <StepCards steps={STEPS} />
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        id="start"
        eyebrow="Lead Gen Audit"
        heading="Fix the leaks before you add more leads."
        copy={
          <>
            No obligation: just a clear picture of what’s working, what isn’t, and where to start.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>You’ll get findings and a prioritized plan within 1–2 weeks.</strong>
          </>
        }
        primaryLabel="Book your lead gen audit"
        primaryHref="/start-project"
        secondary={{ label: "See what we audit", href: "#audit", arrow: "↗" }}
      />
    </div>
  );
}
