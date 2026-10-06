"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./pdi-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_MD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_X_MD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_EYE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_FRAME = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SCREEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="2" />
    <path d="M8 21h8M12 19v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: investor deck -------- */

const DECK_FILES = ["PPT", "Slides", "Keynote", "PDF"];

function DeckCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the deck is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample investor pitch deck"
      className={`pdi-deck${run ? " run" : ""}`}
      live="Investor deck · Ready"
      corner="12 SLIDES"
      footLeft="Story + design + numbers"
      footRight="editable files, yours →"
    >
      <div className="pdi-stage">
        <span className="sl">Slide 01 · Title &amp; Hook</span>
        <span className="co">Northform</span>
        <span className="hk">The RevOps platform that unifies your stack in a week, not six months.</span>
        <span className="badge">
          {ICON_CHECK_BOLD}
          Gets the meeting
        </span>
      </div>
      <div className="pdi-thumbs">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span className={`pdi-dt${i === 0 ? " on" : ""}`} key={i}></span>
        ))}
      </div>
      <div className="pdi-files">
        {DECK_FILES.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why: three tilt feature cards -------- */

const FEATURES: { icon: ReactNode; title: string; text: ReactNode; delay: number }[] = [
  {
    icon: ICON_EYE,
    title: "Clarity wins the skim",
    text: (
      <>
        One idea per slide, in plain language, <strong>beats dense text every time.</strong>
      </>
    ),
    delay: 0,
  },
  {
    icon: ICON_LINES,
    title: "The narrative carries the numbers",
    text: (
      <>
        Traction means more when investors <strong>understand why it’s happening.</strong>
      </>
    ),
    delay: 80,
  },
  {
    icon: ICON_FRAME,
    title: "Design signals seriousness",
    text: (
      <>
        A polished deck tells investors <strong>you sweat the details.</strong>
      </>
    ),
    delay: 160,
  },
];

function FeatureGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div className="pdi-feat-grid" ref={tiltRef}>
      {FEATURES.map((f) => (
        <Reveal as="article" className="pdi-feat" key={f.title} data-tilt style={d(f.delay)}>
          <span className="pdi-feat-spot"></span>
          <div className="fi">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- passed vs meetings -------- */

const PASSED = [
  "25+ slides packed with paragraphs",
  "Problem is vague or too broad",
  "Market size from one big headline number",
  "Traction hidden on slide 14",
  "Financials that don’t match the story",
  "No clear ask or use of funds",
];

const MEETINGS = [
  "10–14 focused slides, one idea each",
  "Sharp, specific problem investors recognize",
  "Bottom-up market sizing (TAM, SAM, SOM)",
  "Traction shown early and visually",
  "Projections tied to real assumptions",
  "Clear raise amount, milestones & use of funds",
];

/* -------- 12-slide structure -------- */

const SLIDES: { title: string; text: string }[] = [
  { title: "Title & Hook", text: "Company name plus one line that says what you do." },
  { title: "Problem", text: "The painful, specific problem your customers face." },
  { title: "Solution", text: "How you solve it, simply and visually." },
  { title: "Product", text: "Screens, demo, or how it works in 3 steps." },
  { title: "Market Size", text: "TAM, SAM, SOM built bottom-up." },
  { title: "Business Model", text: "How you make money and unit economics." },
  { title: "Traction", text: "Revenue, users, growth, pilots, or LOIs." },
  { title: "Go-to-Market", text: "How you reach and win customers." },
  { title: "Competition", text: "Positioning map and why you win." },
  { title: "Team", text: "Why this team is the one to build it." },
  { title: "Financials", text: "3–5 year projections and key assumptions." },
  { title: "The Ask", text: "Raise amount, use of funds, milestones." },
];

/* -------- stage table -------- */

const STAGES: { stage: string; focus: string; materials: string }[] = [
  { stage: "Pre-Seed", focus: "Founders, problem, early signal of demand", materials: "Pitch deck, one-pager, founder story, simple 3-year model" },
  { stage: "Seed", focus: "Early traction, product fit, GTM plan", materials: "Deck, one-pager, 3–5 year model, metrics dashboard" },
  { stage: "Series A", focus: "Repeatable growth, unit economics, scaling", materials: "Full deck + appendix, detailed model, cohort data, data room" },
  { stage: "SBA / Bank Loan", focus: "Cash flow, collateral, repayment ability", materials: "Lender-ready business plan, projections, loan summary" },
  { stage: "Grants & Accelerators", focus: "Mission, impact, team, milestones", materials: "Application narrative, short deck, budget breakdown" },
  { stage: "Strategic Partners", focus: "Fit, shared customers, partnership value", materials: "Partnership deck, one-pager, co-selling materials" },
];

/* -------- what we don't do (dark) -------- */

const DONTS: { title: string; text: ReactNode; delay: number }[] = [
  {
    title: "Invent traction or inflate numbers",
    text: (
      <>
        Investors check. <strong>Every figure in your deck must hold up in due diligence.</strong>
      </>
    ),
    delay: 0,
  },
  {
    title: "Just make slides pretty",
    text: (
      <>
        Design without a clear story is decoration. <strong>Narrative comes first.</strong>
      </>
    ),
    delay: 60,
  },
  {
    title: "Use generic templates",
    text: (
      <>
        Every deck is built around <strong>your brand and your business</strong>, not a marketplace theme.
      </>
    ),
    delay: 0,
  },
  {
    title: "Promise funding",
    text: (
      <>
        No one can. <strong>We make sure your deck gives you the best possible shot.</strong>
      </>
    ),
    delay: 60,
  },
];

/* -------- what's included (explorer) -------- */

type Deliverable = { key: string; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const DELIVERABLES: Deliverable[] = [
  {
    key: "story",
    btnName: "Story & narrative",
    btnSub: "The hook",
    name: "Story & Narrative Development",
    tag: "The foundation: the one-line hook and the storyline every slide flows from.",
    items: ["Founder interview and business deep dive", "Investor audience and stage review", "Core narrative and one-line hook", "Slide-by-slide storyline outline"],
  },
  {
    key: "copy",
    btnName: "Slide copywriting",
    btnSub: "Clear takeaways",
    name: "Slide Copywriting",
    tag: "Headlines written as clear takeaways, not labels investors have to decode.",
    items: ["Headlines written as clear takeaways", "Concise supporting copy for every slide", "Problem, solution, and value-prop wording", "Competitive positioning statements"],
  },
  {
    key: "numbers",
    btnName: "Market & financials",
    btnSub: "Numbers that hold up",
    name: "Market & Financial Slides",
    tag: "Numbers that hold up in due diligence, built bottom-up from your data.",
    items: ["Bottom-up TAM, SAM, SOM calculation", "Business model & unit economics (CAC, LTV, margins)", "3–5 year revenue and expense projections", "Use of funds and milestone plan"],
  },
  {
    key: "design",
    btnName: "Deck design",
    btnSub: "On-brand, visual",
    name: "Deck Design",
    tag: "Custom, on-brand slides built for how investors actually read.",
    items: ["Custom slide design matched to your brand", "Charts, graphs, and data visualizations", "Product screenshots and mockups", "Team slide with photos and credentials", "Send-ahead and live-presenting versions"],
  },
  {
    key: "support",
    btnName: "Supporting materials",
    btnSub: "One-pager, data room",
    name: "Supporting Investor Materials",
    tag: "Everything around the deck that a raise actually needs.",
    items: ["Investor one-pager (executive summary)", "Due diligence appendix", "Cold email to investors + intro blurb", "Data room folder structure"],
  },
  {
    key: "prep",
    btnName: "Pitch preparation",
    btnSub: "Mock & Q&A",
    name: "Pitch Preparation",
    tag: "So you walk into the room ready, not reading your own slides.",
    items: ["Speaker notes for every slide", "Likely investor questions with suggested answers", "Mock pitch session with feedback"],
  },
  {
    key: "files",
    btnName: "File handoff",
    btnSub: "Editable + PDF",
    name: "File Handoff",
    tag: "Everything editable and organized, yours to keep and update.",
    items: ["Editable source files (PowerPoint, Slides, Keynote, Figma)", "PDF versions for sharing", "Organized folder with all assets"],
  },
];

function DeliverablesExplorer() {
  // the design's script initialises on a key that does not exist ("audit"); start on the
  // button it marks aria-selected instead, which is the first one ("story")
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = DELIVERABLES[active];

  function select(i: number) {
    const next = (i + DELIVERABLES.length) % DELIVERABLES.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select(i - 1);
    }
  }

  return (
    <Reveal className="pdi-wb-wrap" id="included-int">
      <div className="pdi-wb-list" role="tablist" aria-label="What's included">
        {DELIVERABLES.map((a, i) => (
          <button
            key={a.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="pdi-wb-btn"
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{i + 1}</span>
            <span className="dn">
              <b>{a.btnName}</b>
              <small>{a.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="pdi-wb-panel">
        <div className="pdi-wp-top">
          {/* the design renders the same screen mark for every deliverable */}
          <span className="big">{ICON_SCREEN}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="pdi-wp-body pdi-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="pdi-wp-list">
            {item.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who / how / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>First-time founders raising pre-seed or seed</strong> who’ve never built an investor deck.</>, delay: 0 },
  { icon: ICON_TREND, text: <><strong>Startups heading into Series A</strong> that need their growth story and metrics tightened.</>, delay: 60 },
  { icon: ICON_DOC, text: <><strong>Small businesses applying for SBA or bank loans</strong> who need lender-ready plans and projections.</>, delay: 120 },
  { icon: ICON_CLOCK, text: <><strong>Founders preparing for accelerators or demo days</strong> with a hard deadline.</>, delay: 180 },
];

const STEPS = [
  { no: "Week 1", title: "Discovery & storyline", text: "Founder interview, review of existing materials, investor audience mapping. We agree on the narrative and slide outline.", delay: 0 },
  { no: "Week 2", title: "Copy & numbers", text: "Slide copy written. Market sizing and financial slides built with your data. You review before design starts.", delay: 80 },
  { no: "Week 3", title: "Design", text: "Full deck designed to match your brand, with charts, product visuals, and team slide. Revision rounds included.", delay: 160 },
  { no: "Week 4", title: "Materials & pitch prep", text: "One-pager, appendix, and investor email finalized. Speaker notes and Q&A prep delivered, plus a mock pitch session.", delay: 240 },
];

const FAQS = [
  { q: "How much does a pitch deck cost?", a: <>Depends on scope: a deck redesign costs less than a full package with financial model, one-pager, and pitch prep. <strong>We share exact pricing on the discovery call</strong> once we know your stage and timeline.</> },
  { q: "How long does it take?", a: <>Most decks take <strong>2–4 weeks</strong> from kickoff. If you have a demo day or investor meeting coming up, tell us the date: rush timelines are often possible.</> },
  { q: "Can you build the financial model too?", a: <>Yes. We build the financial slides and a supporting <strong>3–5 year model</strong> based on your real data and assumptions. For complex models, we work alongside our bookkeeping and CFO advisory team.</> },
  { q: "Will you keep our information confidential?", a: <>Yes. We’re happy to <strong>sign an NDA</strong> before you share any financials, customer data, or product details.</> },
  { q: "Do you introduce us to investors?", a: <>We don’t act as brokers or promise introductions. Our focus is making your materials investor-ready, <strong>so every conversation you get counts.</strong></> },
  { q: "What files do I get?", a: <>Editable source files (<strong>PowerPoint, Google Slides, Keynote, or Figma</strong>), PDF versions for sharing, and an organized folder with all assets, send-ahead and live-presenting versions included.</> },
];

/* -------- page -------- */

export default function PitchDeckInvestorView() {
  return (
    <div className="pdi-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Branding & Growth", href: "/branding-growth" }}
        line1="A deck that gets you"
        line2={
          <>
            the meeting, not the <span className="grad-text">pass.</span>
          </>
        }
        lead={
          <>
            Investor-ready pitch decks, one-pagers, and financial summaries for founders raising pre-seed through Series A, or
            applying for SBA and bank financing. <strong>We shape the narrative, sharpen the numbers, and design every slide</strong>{" "}
            so investors understand your business in minutes.
          </>
        }
        primary={{ label: "Start your pitch deck", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <DeckCard />
      </ServiceDetailHero>

      <TrustBar items={["Story + design + numbers, one team", "Built for how investors read", "Editable source files", "NDA on request"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why your deck decides the first meeting</span>
            <h2>Investors skim a deck in minutes, then decide.</h2>
            <p>
              In that window they’re looking for a clear problem, a credible team, and signs of traction. If the story is buried,
              the answer is usually no, even for a strong business.
            </p>
          </Reveal>
          <FeatureGrid />
          <Reveal as="p" className="pdi-vs-note" style={{ marginTop: 26 }}>
            Investors don’t fund slides. But <strong>a weak deck stops them from ever hearing the rest of your story.</strong>
          </Reveal>
        </div>
      </section>

      {/* PASSED VS MEETINGS */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">A deck that gets passed vs a deck that gets meetings</span>
            <h2>The difference is rarely the business.</h2>
            <p>It’s how clearly the deck explains it. Here’s the split: we build every deck the right-hand way.</p>
          </Reveal>
          <div className="pdi-vs2">
            <Reveal className="pdi-vscol wrong">
              <div className="vh">
                <span className="vi">{ICON_X_MD}</span>
                <h3>Gets passed</h3>
              </div>
              <ul>
                {PASSED.map((line) => (
                  <li key={line}>
                    <span className="m">{ICON_X}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="pdi-vscol right" style={d(90)}>
              <div className="vh">
                <span className="vi">{ICON_CHECK_MD}</span>
                <h3>Gets meetings</h3>
              </div>
              <ul>
                {MEETINGS.map((line) => (
                  <li key={line}>
                    <span className="m">{ICON_CHECK}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="pdi-vs-note">
            The difference is rarely the business itself: <strong>it’s how clearly the deck explains it.</strong>
          </Reveal>
        </div>
      </section>

      {/* 12-SLIDE STRUCTURE */}
      <section className="band tint" id="structure">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 12-slide investor deck structure</span>
            <h2>A proven structure, adapted to your stage.</h2>
            <p>Every deck we build starts here, then adapts to your industry and investor audience.</p>
          </Reveal>
          <Reveal className="pdi-sl-grid">
            {SLIDES.map((slide, i) => {
              const no = String(i + 1).padStart(2, "0");
              return (
                <article className="pdi-slc" key={slide.title}>
                  <span className="num">{no}</span>
                  <span className="sn">Slide {no}</span>
                  <h3>{slide.title}</h3>
                  <p>{slide.text}</p>
                </article>
              );
            })}
          </Reveal>
          <Reveal as="p" className="pdi-sl-note">
            Plus an <strong>appendix</strong> for deeper metrics, customer case studies, and detailed financials, ready for due
            diligence.
          </Reveal>
        </div>
      </section>

      {/* STAGE TABLE */}
      <section className="band" id="stages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Investor materials by funding stage</span>
            <h2>The right package for where you are.</h2>
            <p>
              What investors and lenders expect changes with every stage, so we build for your stage, not a one-size-fits-all
              deck.
            </p>
          </Reveal>
          <Reveal className="pdi-stg-tbl">
            <div className="pdi-stg-row head">
              <div>Stage</div>
              <div className="sc2">What they focus on</div>
              <div>Materials we build</div>
            </div>
            {STAGES.map((row) => (
              <div className="pdi-stg-row" key={row.stage}>
                <div className="sg">{row.stage}</div>
                <div className="sc2">{row.focus}</div>
                <div>{row.materials}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="pdi-stg-note">
            Not sure what your stage needs? <strong>We’ll scope the right package on the discovery call.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do</span>
            <h2>A deck is a financial document as much as a design project.</h2>
            <p>We treat it that way.</p>
          </Reveal>
          <div className="pdi-dont-grid">
            {DONTS.map((item) => (
              <Reveal className="pdi-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{ICON_X_MD}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="pdi-dont-note">
            <span className="mk">{ICON_CHECK_MD}</span>
            <p>
              Honest numbers, narrative-first, custom-built: <strong>investor-ready, not just good-looking.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Story to file handoff, one team.</h2>
            <p>
              Narrative, copy, market &amp; financials, design, supporting materials, pitch prep, and files. Seven parts: pick one
              to see inside.
            </p>
          </Reveal>
          <DeliverablesExplorer />
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>For founders with a real business or a real plan.</h2>
            <p>…that needs to be explained in a way investors and lenders can act on.</p>
          </Reveal>
          <div className="pdi-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="pdi-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A focused 2–4 week process.</h2>
            <p>Faster timelines available for demo-day deadlines, just tell us the date.</p>
          </Reveal>
          <div className="pdi-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="pdi-step" key={step.title} style={d(step.delay)}>
                <span className="pdi-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every deck." />

      <CtaBand
        id="start"
        eyebrow="Pitch Deck & Investor Materials"
        heading="Book a free deck review, no obligation."
        copy={
          <>
            Send us your current deck (or just your idea). We’ll share honest feedback, outline what a stronger version looks
            like, and give you a clear scope and timeline,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>if your deck is already strong, we’ll tell you.</strong>
          </>
        }
        primaryLabel="Start your pitch deck"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
      />
    </div>
  );
}
