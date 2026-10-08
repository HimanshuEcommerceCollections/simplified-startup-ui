"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./vas-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PERSON_SPARK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m16 4 1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TEAM = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M2 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5M12 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_HOUSE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

/* -------- hero signature: task handoff -------- */

const HANDOFF: { icon: ReactNode; name: string }[] = [
  { icon: ICON_MAIL, name: "Inbox & calendar" },
  { icon: ICON_DOC, name: "Admin & data entry" },
  { icon: ICON_SEARCH, name: "Research" },
  { icon: ICON_CHAT, name: "Customer support" },
];

function HandoffCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: every task is shown as handled on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="Admin tasks handed off to a virtual assistant"
      className={`vas-hand${run ? " run" : ""}`}
      live="Task handoff"
      corner="DEDICATED VA"
      footLeft="You keep the judgment calls"
      footRight="your hours, your tools →"
    >
      <div className="vas-hand-body">
        {HANDOFF.map((task) => (
          <div className="vas-ht" key={task.name}>
            <span className="hi">{task.icon}</span>
            <span className="hn">{task.name}</span>
            <span className="hs">
              {ICON_CHECK}
              Handled
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- how much time admin takes (count-ups) -------- */

type Stat = { count: number; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 36,
    suffix: "%",
    label: "Of the week on admin",
    text: (
      <>
        Average share of the work week entrepreneurs spend on tasks like invoicing, data entry, and ordering supplies.{" "}
        <em>Time etc, 251 entrepreneurs</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 29,
    suffix: "%",
    label: "Working 50+ hours",
    text: (
      <>
        Share of entrepreneurs in the same survey working more than 50 hours a week. <em>Time etc</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 11,
    suffix: " hrs",
    label: "Per week on admin / finance",
    text: (
      <>
        Average time small business owners estimate they spend on admin or finance tasks.{" "}
        <em>Amex &amp; Small Business Saturday UK, 2026</em>
      </>
    ),
    delay: 160,
  },
  {
    count: 54,
    suffix: "%",
    label: "Say paperwork gets in the way",
    text: (
      <>
        Share of owners who say paperwork gets in the way of running their business. <em>Amex SME Barometer, 2026</em>
      </>
    ),
    delay: 240,
  },
];

/* the design means to fire the count-ups once the stats block scrolls past 85% of the viewport */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

function StatCard({ stat, run, reduce }: { stat: Stat; run: boolean; reduce: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || reduce) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(e * stat.count);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, stat.count]);

  // reduced motion: the final figure is derived at render, no animation
  const shown = reduce ? stat.count : value;

  return (
    <Reveal className="vas-stat" style={d(stat.delay)}>
      <div className="sv">
        {Math.round(shown)}
        {stat.suffix}
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
    <div className="vas-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- task menu (6 categories) -------- */

const MENU: { icon: ReactNode; title: string; items: string[] }[] = [
  {
    icon: ICON_MAIL,
    title: "Inbox & Calendar",
    items: ["Email sorting and replies", "Meeting scheduling", "Calendar management", "Travel booking", "Reminders and follow-ups"],
  },
  {
    icon: ICON_DOC,
    title: "Admin & Operations",
    items: ["Data entry and CRM updates", "Document and file organization", "Invoice preparation", "Vendor coordination", "SOP documentation"],
  },
  {
    icon: ICON_CHAT,
    title: "Customer Support",
    items: ["Support inbox and live chat", "Order and booking updates", "FAQ replies", "Review monitoring", "Customer follow-ups"],
  },
  {
    icon: ICON_SEARCH,
    title: "Research",
    items: ["Market and competitor research", "Lead and prospect lists", "Supplier research", "Event and venue research", "Summary reports"],
  },
  {
    icon: ICON_BOLT,
    title: "Marketing Support",
    items: ["Social media scheduling", "Newsletter formatting", "Blog uploads", "Basic Canva graphics", "Content calendar updates"],
  },
  {
    icon: ICON_LIST_CHECK,
    title: "Sales Support",
    items: ["CRM pipeline updates", "Proposal formatting", "Lead follow-up emails", "Meeting prep notes", "LinkedIn connection outreach"],
  },
];

/* -------- keep / delegate / automate -------- */

const KDA: { kind: "you" | "va" | "tool"; mid?: boolean; tag: string; icon: ReactNode; title: string; desc: string; items: string[] }[] = [
  {
    kind: "you",
    tag: "You",
    icon: ICON_PERSON,
    title: "Keep",
    desc: "Tasks that need your judgment or relationships.",
    items: ["Strategy and decisions", "Key client calls", "Hiring decisions", "Final approvals"],
  },
  {
    kind: "va",
    mid: true,
    tag: "Your VA",
    icon: ICON_PERSON_SPARK,
    title: "Delegate",
    desc: "Repeatable tasks that need a human touch.",
    items: ["Inbox and scheduling", "Customer replies", "Research", "CRM and data updates"],
  },
  {
    kind: "tool",
    tag: "Your tools",
    icon: ICON_BOLT,
    title: "Automate",
    desc: "Rule-based tasks software can run alone.",
    items: ["Reminders", "Form-to-CRM syncing", "Recurring reports", "Invoice sending"],
  },
];

/* -------- engagement options -------- */

const OPTIONS: { name: string; fit: string; how: string }[] = [
  { name: "Part-time VA", fit: "Founders who need help a few hours a day.", how: "A dedicated assistant on a set weekly schedule." },
  { name: "Full-time VA", fit: "Busy owners and teams with daily admin needs.", how: "A dedicated assistant working your business hours." },
  { name: "Task-based support", fit: "Occasional or overflow work.", how: "Tasks sent as needed and handled by the team." },
  { name: "Project support", fit: "One-off projects like data cleanup or research.", how: "Scoped project with a clear deadline." },
];

/* -------- first 30 days -------- */

const WEEKS: { no: string; title: string; items: string[]; delay: number }[] = [
  { no: "Week 1", title: "Match", items: ["Discovery call", "Task list agreed", "VA matched to your needs"], delay: 0 },
  { no: "Week 2", title: "Onboard", items: ["Tool access set up", "Processes walked through", "First tasks assigned"], delay: 80 },
  { no: "Week 3", title: "Settle in", items: ["Daily task routine", "Feedback check-in", "SOPs documented"], delay: 160 },
  { no: "Week 4", title: "Expand", items: ["30-day review", "New tasks added", "Hours adjusted if needed"], delay: 240 },
];

/* -------- included / who / faq -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_CALENDAR, text: "Discovery call and task list planning" },
  { icon: ICON_PERSON, text: "Candidate matching based on skills and time zone" },
  { icon: ICON_CHECK_THIN, text: "Skills test and interview before matching" },
  { icon: ICON_SHIELD, text: "Onboarding support and tool setup" },
  { icon: ICON_LIST_CHECK, text: "Shared task tracker (Asana, ClickUp, Trello, or your tool)" },
  { icon: ICON_CLOCK, text: "Regular check-ins on workload and priorities" },
  { icon: ICON_REFRESH, text: "Replacement support if the fit isn’t right" },
  { icon: ICON_SHIELD_CHECK, text: "Confidentiality agreement (NDA) available" },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Founders and solo owners</strong> who spend evenings on email and admin.</>, delay: 0 },
  { icon: ICON_TEAM, text: <><strong>Small teams</strong> without a full-time office manager or operations hire.</>, delay: 60 },
  { icon: ICON_HOUSE, text: <><strong>Real estate agents, coaches, and consultants</strong> juggling clients, scheduling, and follow-ups.</>, delay: 120 },
  { icon: ICON_CART, text: <><strong>E-commerce brands</strong> needing help with orders, support, and listings.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does a virtual assistant cost?", a: <>It depends on hours, skills, and location. <strong>We share options and pricing on the free call</strong> once we understand your needs.</> },
  { q: "VA vs executive assistant: what’s the difference?", a: <>A virtual assistant usually handles <strong>admin, inbox, and support tasks.</strong> An executive assistant supports a leader more closely with priorities, communication, and decision prep.</> },
  { q: "Will my VA work in my time zone?", a: <>We match based on <strong>the hours you need covered,</strong> including U.S. business hours.</> },
  { q: "How do I share passwords and accounts safely?", a: <>We recommend a password manager like <strong>1Password or LastPass</strong> so your VA can access tools without seeing passwords directly.</> },
  { q: "What if my VA isn’t the right fit?", a: <>Tell us early. <strong>We’ll review what isn’t working and help with a replacement match</strong> if needed.</> },
  { q: "Is my information kept confidential?", a: <>Yes. A <strong>confidentiality agreement (NDA) is available,</strong> and we set up secure, password-manager-based access from day one.</> },
];

/* -------- page -------- */

export default function VirtualAssistantsView() {
  return (
    <div className="vas-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Talent & Staffing", href: "/talent-staffing" }}
        line1="A dedicated VA who takes"
        line2={
          <>
            admin work off your <span className="grad-text">plate.</span>
          </>
        }
        lead={
          <>
            Remote virtual assistant services for founders and small teams:{" "}
            <strong>inbox, calendar, research, customer support, and the daily tasks that slow you down.</strong>
          </>
        }
        primary={{ label: "Find my virtual assistant", href: "/contact" }}
        secondary={{ label: "See what a VA can do ↓", href: "#menu" }}
      >
        <HandoffCard />
      </ServiceDetailHero>

      <TrustBar items={["Dedicated, not shared", "Your time zone & hours", "Skills-tested & interviewed", "Replacement support if needed"]} />

      {/* STATS (dark) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How much time admin takes</span>
            <h2>Your week is quietly filling up with tasks a VA could handle.</h2>
            <p>Surveys of business owners show just how much of the week goes to admin.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="vas-stat-note">
            Survey results reflect the groups surveyed and vary by business.{" "}
            <strong>But the pattern is clear: admin eats the week that could go to growth.</strong>
          </Reveal>
        </div>
      </section>

      {/* TASK MENU */}
      <section className="band tint" id="menu">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The virtual assistant task menu</span>
            <h2>Pick the tasks you want to hand off.</h2>
            <p>Starting with two or three categories and adding more over time keeps onboarding simple.</p>
          </Reveal>
          <Reveal className="vas-menu-grid">
            {MENU.map((card) => (
              <article className="vas-menu" key={card.title}>
                <div className="mh">
                  <span className="mi">{card.icon}</span>
                  <h3>{card.title}</h3>
                </div>
                <ul>
                  {card.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* KEEP / DELEGATE / AUTOMATE */}
      <section className="band" id="kda">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Keep, delegate, or automate</span>
            <h2>Not every task belongs with a VA.</h2>
            <p>This simple framework helps you decide where each task should go.</p>
          </Reveal>
          <Reveal className="vas-kda-grid">
            {KDA.map((card) => (
              <article className={`vas-kda vas-kda-${card.kind}${card.mid ? " mid" : ""}`} key={card.title}>
                <span className="kt">{card.tag}</span>
                <div className="ki">{card.icon}</div>
                <h3>{card.title}</h3>
                <p className="kd">{card.desc}</p>
                <ul>
                  {card.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ENGAGEMENT OPTIONS */}
      <section className="band tint" id="options">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Ways to work together</span>
            <h2>Choose the level of support that matches your workload.</h2>
            <p>You can change it as your needs grow.</p>
          </Reveal>
          <Reveal className="vas-eng-tbl">
            <div className="vas-eng-row head">
              <div>Option</div>
              <div className="ec2">Often a good fit for</div>
              <div>How it works</div>
            </div>
            {OPTIONS.map((o) => (
              <div className="vas-eng-row" key={o.name}>
                <div className="en">{o.name}</div>
                <div className="ec2">{o.fit}</div>
                <div>{o.how}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="vas-eng-note">
            Pricing depends on hours, skills, and time zone, and is <strong>shared on the free call.</strong>
          </Reveal>
        </div>
      </section>

      {/* FIRST 30 DAYS */}
      <section className="band" id="days">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Getting started</span>
            <h2>Your first 30 days with a VA.</h2>
          </Reveal>
          <div className="vas-wk-grid">
            {WEEKS.map((wk) => (
              <Reveal as="article" className="vas-wk" key={wk.title} style={d(wk.delay)}>
                <span className="wkn">{wk.no}</span>
                <h3>{wk.title}</h3>
                <ul>
                  {wk.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>A matched VA, onboarded and supported.</h2>
          </Reveal>
          <Reveal className="vas-inc-grid">
            {INCLUDED.map((item) => (
              <div className="vas-inc" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who hires a virtual assistant</span>
            <h2>If admin is eating your evenings, this is for you.</h2>
          </Reveal>
          <div className="vas-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="vas-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every match." />

      <CtaBand
        id="start"
        eyebrow="Virtual Assistant Services"
        heading="Get your time back."
        copy={
          <>
            Book a free call to talk through your tasks, the hours you need, and how a virtual assistant could help:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll build a starter task list with you on the call.</strong>
          </>
        }
        primaryLabel="Find my virtual assistant"
        primaryHref="/contact"
        secondary={{ label: "See what a VA can do", href: "#menu", arrow: "↗" }}
      />
    </div>
  );
}
