"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  FeatureGrid,
  NoteCallout,
  PricingTiers,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./apt-page.css";

/* -------- shared glyphs -------- */

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const CALENDAR_WHITE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="#fff" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- copy -------- */

const WHY_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Reps close, not chase",
    text: <>Every meeting-booking hour is an hour not spent closing. <strong>Reclaim it and revenue moves.</strong></>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Faster than hiring SDRs",
    text: <>An SDR costs $75K–$120K/yr and takes 3 months to ramp. <strong>Appointment setting produces meetings in weeks.</strong></>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Predictable pipeline math",
    text: <>X meetings → Y opportunities → Z deals. <strong>Once dialed in, you know what more spend produces.</strong></>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Fills the gap while you build",
    text: <>Even if you’ll hire SDRs later, appointment setting <strong>keeps pipeline moving now.</strong></>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Works where cold outreach is hard",
    text: <>Complex products, senior buyers, regulated industries — the ones that need <strong>real qualification, not spray-and-pray.</strong></>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Quality over volume",
    text: <>It’s not about the number of meetings — it’s about <strong>meetings your reps actually want on their calendar.</strong></>,
    delay: 120,
  },
];

const BANTF = [
  { letter: "B", title: "Budget", text: "Can they afford it? Qualified against price range or company revenue that supports your solution." },
  { letter: "A", title: "Authority", text: "Decision-maker — or influences one? Job title + reporting structure verified." },
  { letter: "N", title: "Need", text: "Do they have the pain you solve? Verified against buying signals or explicit stated need." },
  { letter: "T", title: "Timeline", text: "Buying now, next quarter, or “someday”? A time-window filter is applied." },
  { letter: "F", title: "Fit", text: "Match your ICP — industry, size, tech stack, geography? No wrong-fit meetings." },
];

type PricingModel = { kind: "bad" | "good"; title: string; how: string; prob: ReactNode; tag?: string; delay: number };

const PRICING_MODELS: PricingModel[] = [
  {
    kind: "bad",
    title: "Pay-per-meeting",
    how: "$200–$800 per meeting — you pay only for meetings booked.",
    prob: <>Agency is incentivized to book <strong>anything that vaguely fits</strong> — volume over quality. You end up paying for junk meetings your reps hate.</>,
    delay: 0,
  },
  {
    kind: "bad",
    title: "% of closed deals",
    how: "You pay a percentage of revenue closed.",
    prob: <>Sounds fair — but agencies <strong>cherry-pick easy deals,</strong> ignore complex ones, and attribution disputes kill the relationship by month 3.</>,
    delay: 80,
  },
  {
    kind: "good",
    title: "Flat monthly retainer",
    how: "Fixed fee regardless of meeting count.",
    prob: <><strong>No misaligned incentive.</strong> We focus on quality because the contract renews on your success — not on booking volume.</>,
    tag: "Our model",
    delay: 160,
  },
];

type WbKey = "icp" | "research" | "outreach" | "qualify" | "booking" | "noshow" | "report";

type WbItem = {
  key: WbKey;
  n: string;
  label: string;
  sub: string;
  name: string;
  tag: string;
  items: string[];
};

const WB_ITEMS: WbItem[] = [
  {
    key: "icp",
    n: "1",
    label: "ICP & qualification",
    sub: "Define “qualified”",
    name: "ICP & Qualification Framework",
    tag: "The most important step, usually skipped — we define who counts as a qualified meeting before any outreach.",
    items: ["Ideal Customer Profile (industry, size, tech, geo, role)", "BANT-F qualification criteria agreed & locked", "Wrong-fit exclusion list", "Meeting quality scoring model", "Handoff process designed with your sales team"],
  },
  {
    key: "research",
    n: "2",
    label: "Research & list building",
    sub: "Custom, verified",
    name: "Prospect Research & List Building",
    tag: "Custom lists that match your ICP exactly — no random data dumps, no bought lists.",
    items: ["Custom list to your ICP (1,000–5,000+/month)", "Apollo, LinkedIn Sales Nav, ZoomInfo, Clay", "Contact verification and enrichment", "Title + seniority + department mapping", "Intent signals (tech installs, hiring, funding)", "Suppression list management"],
  },
  {
    key: "outreach",
    n: "3",
    label: "Multi-channel outreach",
    sub: "Email + LinkedIn + phone",
    name: "Multi-Channel Outreach",
    tag: "Email + LinkedIn + phone, coordinated as one sequence — not three separate blasts.",
    items: ["Cold email sequences (4–7 per prospect)", "LinkedIn (connection requests + follow-ups)", "Cold calling for high-value accounts (optional)", "Coordinated timing across channels", "Reply tracking across every touchpoint", "Full deliverability infrastructure"],
  },
  {
    key: "qualify",
    n: "4",
    label: "Reply qualification",
    sub: "No junk meetings",
    name: "Reply Qualification & Nurturing",
    tag: "Every reply reviewed and qualified against your criteria before it hits your calendar.",
    items: ["Reply classification (interested, not now, wrong)", "Qualification questions asked before booking", "“Not now” moved to nurture sequences", "Wrong-fit logged for ICP refinement", "Warm hand-off with context to your team"],
  },
  {
    key: "booking",
    n: "5",
    label: "Booking & calendar",
    sub: "With prep briefs",
    name: "Meeting Booking & Calendar",
    tag: "Booked straight onto your calendar with all the context your reps need to walk in prepared.",
    items: ["Calendar integration (Google, Outlook, Calendly, Chili Piper)", "Round-robin routing for multi-rep teams", "Confirmation emails with agenda", "Prep brief per meeting (profile, pain, signals)", "Automatic reschedule handling", "Reminder sequences to reduce no-shows"],
  },
  {
    key: "noshow",
    n: "6",
    label: "No-show reduction",
    sub: "Under 15%",
    name: "No-Show Reduction",
    tag: "Industry no-shows run 30–40%. Our target is under 15% — here’s how.",
    items: ["Confirmation email immediately after booking", "24-hour reminder email", "2-hour reminder SMS (with consent)", "One-click reschedule link", "Weekly no-show audit + follow-up", "Re-engagement flow for no-shows"],
  },
  {
    key: "report",
    n: "7",
    label: "Reporting & feedback",
    sub: "Improve weekly",
    name: "Reporting & Feedback Loop",
    tag: "Reports tied to real outcomes, plus a feedback loop with your reps so we improve weekly.",
    items: ["Weekly meetings-booked report (with qualification detail)", "Monthly review (cost-per-qualified-meeting)", "Feedback loop from your reps on quality", "ICP refinement based on which meetings closed", "Live dashboard access", "Quarterly strategy review + roadmap"],
  },
];

const NO_SHOW = [
  "Confirmation email immediately after booking",
  "24-hour reminder email",
  "2-hour reminder SMS (with consent)",
  "One-click reschedule link",
  "Weekly no-show audit + follow-up",
  "Re-engagement flow for no-shows",
];

const STEPS = [
  { no: "Week 1", title: "ICP + qualification workshop", text: "Define ICP, criteria, and handoff. Lock the “what counts as qualified” definition — a signed-off framework.", delay: 0 },
  { no: "Weeks 2–3", title: "Infrastructure + list build", text: "Sending domains & warm-up, custom prospect list built and verified, LinkedIn profiles optimized for outreach.", delay: 70 },
  { no: "Week 4", title: "Soft launch", text: "First campaign live at controlled volume. First qualified meetings usually book by day 25–35.", delay: 140 },
  { no: "Month 2", title: "Ramp", text: "Volume scaled on deliverability + reply quality. Multi-channel fully engaged. Meeting flow becomes predictable.", delay: 210 },
  { no: "Ongoing", title: "Optimize", text: "Weekly reports and sales-team feedback drive refinement. Criteria tightened based on which meetings actually close.", delay: 280 },
];

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A B2B services business</strong> with a closer or founder-led sales team spending too much time prospecting.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>A SaaS or software company</strong> where demos are the primary revenue-generating event.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>A consulting or agency</strong> selling high-ticket engagements to a defined ICP.</>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 8h4M19 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>A staffing or recruiting firm</strong> booking meetings with hiring managers or decision-makers at target companies.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>A team scaling faster than they can hire SDRs</strong> — needs qualified pipeline now, not in 6 months.</>,
    delay: 60,
  },
  {
    icon: CHECK_HEAD,
    text: <><strong>A business tired of “leads” that never convert</strong> — wants real qualified meetings, not database dumps.</>,
    delay: 120,
  },
];

const TIERS = [
  { name: "Starter Appointments", best: "Small B2B teams — 5–10 qualified meetings/month, single channel (email OR LinkedIn).", price: "Published /mo" },
  { name: "Growth Appointments", best: "Established B2B — 15–25 qualified meetings/month, multi-channel (email + LinkedIn).", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Appointments", best: "Larger teams & complex ICPs — 30+ qualified meetings/month, multi-channel + optional phone, multi-persona.", price: "Published /mo", delay: 140 },
  { name: "Appointment Setting Audit", best: "Deep audit of your existing SDR / appointment-setting program — no commitment.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "How many meetings per month?", a: <>Depends on ICP, offer, and tier: Starter targets <strong>5–10</strong>, Growth <strong>15–25</strong>, Scale <strong>30+</strong> qualified meetings/month. We commit to a target — miss it and we add work until we catch up, no extra charge.</> },
  { q: "How is “qualified” defined?", a: <>Using our <strong>BANT-F framework</strong> (Budget, Authority, Need, Timeline, Fit). Every criterion is locked with you before campaigns start; meetings that don’t meet all five don’t get booked (edge cases flagged transparently).</> },
  { q: "Why not charge per meeting?", a: <>Because it creates the wrong incentive — per-meeting rewards volume, so agencies book anything vaguely qualifying and you pay for junk. <strong>Our flat retainer keeps us focused on quality,</strong> which is what makes the model renew.</> },
  { q: "How long before meetings book?", a: <>First qualified meetings usually book in <strong>weeks 4–5</strong> (after ICP workshop + infrastructure + first campaign). Predictable flow starts month 2; compounding from month 3.</> },
  { q: "Email/LinkedIn only, or phone too?", a: <>Email + LinkedIn is standard in every package. <strong>Phone is optional at Scale</strong> for high-value accounts — US-based callers briefed on your criteria. Not every business needs it; we’ll advise.</> },
  { q: "Do I own the infrastructure?", a: <>Yes, 100% — domains registered to you, inboxes on your accounts, lists delivered monthly. <strong>If you leave, you keep everything</strong> — unusual in this industry.</> },
  { q: "What if the meetings aren’t good enough?", a: <>That’s why the feedback loop matters. Each week your reps tell us what worked; <strong>we tighten qualification based on which meetings actually close.</strong> Quality improves month over month.</> },
  { q: "What about no-shows?", a: <>Industry average is 30–40%; our target is <strong>under 15%.</strong> Confirmation emails, 24-hour reminders, 2-hour SMS (with consent), one-click reschedule, and a re-engagement flow.</> },
  { q: "Can you integrate with my CRM?", a: <>Yes — HubSpot, Salesforce, Pipedrive, GoHighLevel, Zoho, and more. Every booked meeting is logged with <strong>full context</strong> (prospect data, buying signals, prep notes) so reps walk in prepared.</> },
  { q: "I already have SDRs — still useful?", a: <>Great as a complement — we handle top-of-funnel outreach and hand off qualified meetings; <strong>your SDRs focus on deeper qualification, demos, and account-specific outreach.</strong></> },
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
          <span className="apt-wd" style={{ transitionDelay: `${i * 55}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/<>*";

/** Hero gradient word: decodes from random glyphs into the final text (design's text-scramble). */
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
    const grid = document.querySelector<HTMLElement>(".apt-hero .sd-grid-bg");
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

/* -------- hero signature: calendar with qualified meetings booked -------- */

const CAL_DAYS = [
  { day: "Mon", date: "18" },
  { day: "Tue", date: "19" },
  { day: "Wed", date: "20" },
  { day: "Thu", date: "21" },
  { day: "Fri", date: "22" },
];

function CalendarCard() {
  const reduce = useReducedMotion();
  const [rawRun, setRun] = useState(false);
  const run = reduce || rawRun;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setRun(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <SignatureCard
      className={`apt-cal${run ? " run" : ""}`}
      ariaLabel="A sample calendar with qualified meetings booked"
      live="Your calendar · This week"
      corner="QUALIFIED ONLY"
      footLeft="Prep brief attached"
      footRight="closers just close →"
    >
      <div className="apt-cal-week">
        {CAL_DAYS.map((item) => (
          <div className="apt-cal-day" key={item.day}>
            {item.day}
            <span>{item.date}</span>
          </div>
        ))}
      </div>
      <div className="apt-cal-slots">
        <div className="apt-slot free">
          <span className="tm">10:00</span>
          <span className="nm">
            <b>Open</b>
          </span>
          <span></span>
        </div>
        <div className="apt-slot book">
          <span className="tm">11:30</span>
          <span className="nm">
            <b>Sarah Lin · VP Ops, Northwind</b>
            <small>SaaS · 220 staff · buying Q3</small>
          </span>
          <span className="qual">{CHECK}Qualified</span>
        </div>
        <div className="apt-slot free">
          <span className="tm">13:00</span>
          <span className="nm">
            <b>Open</b>
          </span>
          <span></span>
        </div>
        <div className="apt-slot book">
          <span className="tm">15:00</span>
          <span className="nm">
            <b>Marco Diaz · Head of IT, Acme</b>
            <small>Mfg · 500 staff · budget approved</small>
          </span>
          <span className="qual">{CHECK}Qualified</span>
        </div>
      </div>
      <div className="apt-cal-bantf">
        {["B", "A", "N", "T", "F"].map((letter) => (
          <span className="apt-bchip" key={letter}>
            {letter}
            <i>{CHECK_BOLD}</i>
          </span>
        ))}
        <span className="lbl">BANT-F verified</span>
      </div>
    </SignatureCard>
  );
}

/* -------- what's included: tab list + panel -------- */

function Included() {
  const [active, setActive] = useState<WbKey>("icp");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = WB_ITEMS.find((item) => item.key === active) ?? WB_ITEMS[0];

  function select(index: number) {
    const item = WB_ITEMS[index];
    setActive(item.key);
    btnRefs.current[index]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select((i + 1) % WB_ITEMS.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select((i - 1 + WB_ITEMS.length) % WB_ITEMS.length);
    }
  }

  return (
    <Reveal className="apt-wb-wrap" id="included-int">
      <div className="apt-wb-list" role="tablist" aria-label="What's included">
        {WB_ITEMS.map((item, i) => (
          <button
            key={item.key}
            className="apt-wb-btn"
            role="tab"
            type="button"
            id={`apt-tab-${item.key}`}
            aria-selected={item.key === active}
            aria-controls="apt-wb-panel"
            tabIndex={item.key === active ? 0 : -1}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setActive(item.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{item.n}</span>
            <span className="dn">
              <b>{item.label}</b>
              <small>{item.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="apt-wb-panel" id="apt-wb-panel" role="tabpanel" aria-labelledby={`apt-tab-${current.key}`}>
        <div className="apt-wp-top">
          <span className="big">{CALENDAR_WHITE}</span>
          <div>
            <h3>{current.name}</h3>
            <div className="tagline">{current.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in re-runs on every tab change, as the design's re-render did */}
        <div className="apt-wp-body" key={current.key}>
          <span className="k">What’s inside</span>
          <div className="apt-wp-list">
            {current.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- page -------- */

export default function AppointmentSettingView() {
  useHeroGridParallax();

  return (
    <div className="apt-page">
      <ServiceDetailHero
        compact
        className="apt-hero"
        crumb={{ label: "Sales & Lead Generation", href: "/sales-lead-gen" }}
        eyebrow="Qualified meetings · On your calendar · Done-for-you"
        line1="Qualified meetings, booked"
        line2={
          <>
            on your{" "}
            <span className="grad-text">
              <Scramble text="calendar." />
            </span>
          </>
        }
        lead={
          <>
            End-to-end appointment setting for B2B teams. We research prospects, run multi-channel outreach, qualify every
            reply against your ICP, and book meetings straight onto your calendar.{" "}
            <strong>Flat monthly fee, defined qualification criteria, no per-meeting incentive games.</strong>
          </>
        }
        primary={{ label: "Book a free strategy call", href: "/start-project" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <CalendarCard />
      </ServiceDetailHero>

      <TrustBar items={["Qualification criteria defined up front", "Flat retainer (no per-meeting games)", "Multi-channel outreach", "Month-to-month"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why appointment setting exists</span>
            <h2>
              <Words text="Your reps should close — not chase." />
            </h2>
            <p>
              Most B2B teams don’t struggle because the product is weak. They struggle because sales spends 70% of every
              week prospecting instead of closing the deals prospecting produces.
            </p>
          </Reveal>
          <div className="apt-why">
            <FeatureGrid cards={WHY_CARDS} columns={3} />
          </div>
        </div>
      </section>

      {/* BANT-F */}
      <section className="band" id="qualified">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What makes a meeting actually qualified</span>
            <h2>
              <Words text="Five criteria, agreed before we start." />
            </h2>
            <p>
              The biggest failure in appointment setting is booking meetings that aren’t qualified. We define what
              “qualified” means for you with a 5-criterion framework — and only meetings that meet all five get booked.
            </p>
          </Reveal>
          <Reveal className="apt-bantf-grid">
            {BANTF.map((item) => (
              <div className="apt-bcard" key={item.letter}>
                <div className="bl">{item.letter}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="apt-bantf-note">
            Every criterion is agreed with you before any campaign starts.{" "}
            <strong>Meetings that don’t meet all five don’t get booked</strong> — or if an edge case arises, it’s disclosed
            transparently.
          </Reveal>
        </div>
      </section>

      {/* PRICING MODELS */}
      <section className="band tint" id="models">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why we charge a flat fee</span>
            <h2>
              <Words text="Three pricing models — one has aligned incentives." />
            </h2>
            <p>The industry offers three ways to pay. Only one keeps the agency focused on quality instead of volume. The honest breakdown:</p>
          </Reveal>
          <div className="apt-pm-grid">
            {PRICING_MODELS.map((model) => (
              <Reveal className={`apt-pmcard ${model.kind}`} key={model.title} style={d(model.delay)}>
                {model.tag && <span className="tag">{model.tag}</span>}
                <div className="pmh">
                  <span className="pmi">{model.kind === "good" ? CHECK_HEAD : X_HEAD}</span>
                  <h3>{model.title}</h3>
                </div>
                <div className="how">{model.how}</div>
                <p className="prob">{model.prob}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="apt-pm-note">
            <span className="mk">{CHECK_HEAD}</span>
            <p>
              Flat retainer, published price, plus a qualified-meetings target we hit together.{" "}
              <strong>Miss the target and we add work at no cost until we catch up.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>
              <Words text="Research to booking, one team." />
            </h2>
            <p>Everything an appointment-setting program needs — seven parts, nothing handed off. Pick one to see what’s inside.</p>
          </Reveal>
          <Included />
        </div>
      </section>

      {/* NO-SHOW */}
      <section className="band tint" id="noshow">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">No-show reduction</span>
            <h2>
              <Words text="Industry no-shows run 30–40%. Ours: under 15%." />
            </h2>
            <p>
              A booked meeting that doesn’t show is worse than no meeting — it wastes a closer’s prepared hour. Here’s how
              we keep the seat filled.
            </p>
          </Reveal>
          <div className="apt-ns-wrap">
            <Reveal className="apt-ns-stat">
              <div className="big">&lt;15%</div>
              <div className="lab">Our no-show target</div>
              <div className="sub">
                vs an industry average of <s>30–40%</s>
              </div>
            </Reveal>
            <Reveal className="apt-ns-list" style={d(120)}>
              {NO_SHOW.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>
              <Words text="Kickoff to booked meetings, then steady flow." />
            </h2>
            <p>Every step ends with a clear deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="apt-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="apt-step" key={step.title} style={d(step.delay)}>
                <span className="apt-step-no">{step.no}</span>
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
            <h2>
              <Words text="The right fit if you’re…" />
            </h2>
          </Reveal>
          <div className="apt-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="apt-who" key={i} style={d(who.delay)}>
                <span className="wi">{who.icon}</span>
                <p>{who.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>
              <Words text="Flat monthly retainer, published up front." />
            </h2>
            <p>No per-meeting fees, no long lock-in, no misaligned incentives.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Infrastructure costs (domains, inboxes) passed through at cost —
            typically $50–$150/mo. First month includes a setup fee for the ICP workshop and infrastructure build. Every
            rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every engagement." />

      <CtaBand
        id="start"
        eyebrow="Appointment Setting"
        heading="Fill your calendar with meetings that actually close."
        copy={
          <>
            Book a free strategy call. We’ll define your ICP, agree on qualification criteria, and come back with a clear
            plan and price —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              usually within 48 hours. No obligation, no jargon, no misaligned incentives.
            </strong>
          </>
        }
        primaryLabel="Book a free strategy call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
