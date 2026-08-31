"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import {
  FeatureGrid,
  NoteCallout,
  ProblemSolve,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  TrustBar,
  d,
} from "../ServiceDetailKit";
import "./ts-page.css";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: the roster card -------- */

const ROSTER_ROWS = [
  { av: "SE", name: "SEO Specialist", sub: "Organic · technical · local" },
  { av: "PA", name: "Paid Ads Manager", sub: "Google · Meta · LinkedIn" },
  { av: "GD", name: "Graphic Designer", sub: "Ads · social · collateral" },
];

function RosterCard() {
  return (
    <SignatureCard
      ariaLabel="A sample talent roster plugging into your team"
      live="Talent pool · Vetted"
      corner="MATCHED IN ~5 DAYS"
      footLeft="Month-to-month"
      footRight="agency-backed →"
    >
      <div className="ts-roster-body">
        {ROSTER_ROWS.map((row) => (
          <div className="ts-rr" key={row.av}>
            <span className="av">{row.av}</span>
            <span className="nm">
              <b>{row.name}</b>
              <small>{row.sub}</small>
            </span>
            <span className="vt">{CHECK}Vetted</span>
          </div>
        ))}
        <div className="ts-rr plug">
          <span className="av">+</span>
          <span className="nm">
            <b>Plug into your team</b>
            <small>Your Slack · your meetings · your tools</small>
          </span>
          <span className="vt">Embedded</span>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- problem -------- */

const PROBLEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "It takes months",
    text: "Job posts, interviews, offers, notice periods — by the time your hire starts, the campaign you needed them for is over.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "It costs a fortune",
    text: "Salary, benefits, tools, training, and taxes add up to far more than the base-pay figure ever suggests.",
    delay: 70,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 8h4M19 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "One person can’t do it all",
    text: "You hire an “SEO person” and end up needing paid ads. You hire a designer and need copy. Marketing is a team sport.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Freelancers work alone",
    text: "Cheaper, yes — but when something big comes up, they don’t have a team behind them to lean on.",
    delay: 70,
  },
];

/* -------- what makes us different -------- */

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "Vetted, not a marketplace",
    title: "The right person, brought to you",
    text: <>Every specialist is screened by our team and has hit real results on real accounts. <strong>You’re not scrolling a marketplace hoping</strong> — we bring you the match.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M9 9.5 11 14M15 9.5 13 14" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    kicker: "Backed by the full agency",
    title: "A whole team behind them",
    text: <>When your embedded specialist hits a hard question, they pull in our senior team, developers, or strategists — <strong>at no extra cost.</strong> A freelancer works alone; ours don’t.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "Transparent rates",
    title: "Published, not “book a call”",
    text: <>Every role has a clear day, part-time, and full-time rate on our pricing page. <strong>You know the cost before the first meeting.</strong></>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "Month-to-month",
    title: "No lock-in, no drama",
    text: <>If it’s not working, you swap or stop. <strong>No long contracts, no cancellation fees</strong> — the flexibility freelancing promised and rarely delivered.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m8 12 2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "Onboarded & managed",
    title: "A team member, not a task",
    text: <>We handle intros, tool access, first-week ramp-up, and check-ins. <strong>You get a productive team member,</strong> not another thing to manage.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-3v-6h5M4 12v5a2 2 0 0 0 2 2h3v-6H4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "Direct access",
    title: "In your Slack, your meetings",
    text: <>They join your tools and work to your priorities like any team member — <strong>with the whole agency quietly behind them.</strong></>,
    delay: 60,
  },
];

/* -------- roles explorer -------- */

type Role = { key: string; icon: ReactNode; name: string; does: string; best: string };

const ROLES: Role[] = [
  {
    key: "seo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "SEO Specialist",
    does: "On-page, technical, and local SEO; content strategy tied to keyword research; monthly reporting.",
    best: "Businesses that want to grow organic search traffic.",
  },
  {
    key: "ads",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    name: "Paid Ads Manager",
    does: "Google, Meta, LinkedIn, and YouTube Ads: setup, optimization, budget management, and reporting.",
    best: "Businesses running (or planning) paid campaigns.",
  },
  {
    key: "social",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 5h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "Social Media Manager",
    does: "Content calendars, daily posting, community management, engagement, and paid boosting.",
    best: "Businesses that need a consistent, active social presence.",
  },
  {
    key: "content",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "Content Writer / Copywriter",
    does: "Blog posts, website copy, email campaigns, landing pages, and sales content.",
    best: "Businesses that need a steady flow of quality writing.",
  },
  {
    key: "design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    name: "Graphic Designer",
    does: "Social creatives, ad visuals, sales collateral, brand assets, and marketing materials.",
    best: "Businesses that need design faster than a freelancer delivers.",
  },
  {
    key: "web",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Web Designer / Developer",
    does: "Landing pages, site updates, speed and conversion improvements, and integrations.",
    best: "Businesses whose website needs regular attention.",
  },
  {
    key: "email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "Email Marketing Specialist",
    does: "Campaign setup, automation flows, list growth, deliverability, and reporting.",
    best: "Businesses building a list and an email revenue channel.",
  },
  {
    key: "ai",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "AI & Automation Specialist",
    does: "Workflow automation, chatbot setup, AI content pipelines, and internal tools.",
    best: "Businesses wanting to save time with AI without a full tech team.",
  },
  {
    key: "pm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "Marketing Coordinator / PM",
    does: "Keeps campaigns, deadlines, briefs, and reports moving across your team.",
    best: "Businesses with multiple moving pieces that need a point person.",
  },
  {
    key: "cmo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 19V5l6 5 4-6 6 8v7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "Fractional CMO",
    does: "High-level marketing strategy, channel mix, budget planning, and team direction.",
    best: "Businesses that need marketing leadership without a full-time CMO salary.",
  },
];

/* Short labels for the tab list (a couple differ from the panel heading). */
const ROLE_TAB_LABELS: Record<string, string> = {
  content: "Content / Copywriter",
  email: "Email Specialist",
  ai: "AI & Automation",
  pm: "Marketing Coordinator",
};

function RolesExplorer() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const role = ROLES[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % ROLES.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + ROLES.length) % ROLES.length;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    btnRefs.current[next]?.focus();
  };

  return (
    <Reveal className="ts-roles-wrap">
      <div className="ts-role-list" role="tablist" aria-label="Roles">
        {ROLES.map((r, i) => (
          <button
            key={r.key}
            className="ts-role-btn"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
          >
            <span className="ri">{r.icon}</span>
            <span className="rn">{ROLE_TAB_LABELS[r.key] ?? r.name}</span>
          </button>
        ))}
      </div>
      <div className="ts-role-panel">
        <div className="ts-rp-top">
          <span className="big">{role.icon}</span>
          <div>
            <h3>{role.name}</h3>
            <span className="embed">
              <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>{" "}
              Embed part-time · full-time · or per project
            </span>
          </div>
        </div>
        <div className="ts-rp-body ts-rp-fade" key={role.key}>
          <div className="ts-rp-row">
            <span className="k">What they do</span>
            <span className="v">{role.does}</span>
          </div>
          <div className="ts-rp-row">
            <span className="k">Best for</span>
            <span className="v">{role.best}</span>
          </div>
          <div className="ts-rp-row">
            <span className="k">Embed as</span>
            <div className="ts-rp-embed">
              <span>Part-time</span>
              <span>Full-time</span>
              <span>Project</span>
            </div>
          </div>
          <div className="ts-rp-backed">
            <span className="b">{SHIELD}</span> Backed by the full agency — senior team on call at no extra cost.
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- how it works / models / tiers / included -------- */

const HIW_STEPS = [
  { no: "1", hn: "Tell us what you need", title: "A quick scoping call", text: "The role, the goals, the tools you use, and how the person will fit into your team." },
  { no: "2", hn: "We match you", title: "The right person, in days", text: "Within a few days we come back with a vetted specialist who fits — background and rate attached.", delay: 60 },
  { no: "3", hn: "Meet before you commit", title: "A short intro call", text: "If it’s a fit, you move forward. If not, we bring another option — no pressure.", delay: 120 },
  { no: "4", hn: "Onboarding handled", title: "They walk in productive", text: "Contract, tool access, security setup, and first-week ramp-up — all handled for you." },
  { no: "5", hn: "They join your team", title: "Part of the crew", text: "Your Slack, your meetings, your tools, your priorities — with the whole agency backing them.", delay: 60 },
  { no: "6", hn: "Scale, cut, or swap", title: "Anytime, no penalty", text: "More hours? Add them. Slower month? Cut back. Wrong fit? Swap. Month-to-month.", delay: 120 },
];

const MODELS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Hourly",
    text: "Short-term help, overflow work, or trying us out.",
    commit: "From 10 hrs/mo",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 4v3M16 4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Part-time",
    text: "Ongoing work at 10–20 hours per week.",
    commit: "Month-to-month",
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Full-time",
    text: "An embedded team member, 40 hours per week.",
    commit: "Month-to-month",
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Project-based",
    text: "Fixed-scope work with a defined start and end.",
    commit: "One-time fee",
    delay: 180,
  },
];

const TIERS = [
  { name: "Coordinator / Junior Specialist", grad: false, delay: 0 },
  { name: "Mid-level Specialist", grad: false, delay: 70 },
  { name: "Senior Specialist", grad: true, delay: 140 },
  { name: "Fractional CMO / Strategist", grad: true, delay: 210 },
];

const INCLUDED = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "A dedicated specialist",
    text: "Working to your priorities — not shared across ten other accounts.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M9 9.5 11 14M15 9.5 13 14" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Backup from the full team",
    text: "Developers, strategists, and senior specialists on call — at no extra cost.",
    delay: 50,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m8 12 2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Fully managed onboarding",
    text: "Tool access, first-week ramp, and intros to your team — handled.",
    delay: 100,
  },
  { icon: SHIELD, title: "Monthly account check-in", text: "A regular sync with your account manager to keep things on track." },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 5h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Direct access",
    text: "Slack, email, meetings — however your team already works.",
    delay: 50,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M7 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Simple invoicing",
    text: "One clear rate, one line item, no surprises.",
    delay: 100,
  },
];

const FAQS = [
  { q: "How is this different from a freelancer?", a: <>Freelancers work in isolation. Our talent is <strong>backed by the whole team,</strong> vetted through real client work, and comes with managed onboarding — freelancer flexibility with agency-level backup.</> },
  { q: "How is this different from hiring your agency?", a: <>Agency clients get us running the work our way, in the background. Staffing clients get one of us <strong>sitting inside their team</strong> — their Slack, their meetings, their priorities. Some want one, some want both.</> },
  { q: "Can I try someone before committing?", a: <>Yes. Every engagement starts with an intro call, and everything is month-to-month — <strong>if it’s not the fit, swap or stop with no penalty.</strong></> },
  { q: "What if I need someone for a few weeks?", a: "That works — short-term and project-based engagements are available at hourly or fixed project rates." },
  { q: "On-site or remote?", a: "Fully remote. Our talent joins your tools and meetings the same way any remote team member would." },
  { q: "Can I hire them full-time later?", a: <>In most cases, yes. If a placement is going great and you want them permanently, we’ll talk it through — <strong>clear terms, no surprise fees.</strong></> },
  { q: "How quickly can someone start?", a: <>Usually <strong>within 5–10 business days</strong> from the first call — faster for common roles, slightly longer for very specialized ones.</> },
  { q: "What if the match isn’t right?", a: <>Tell us. We swap them at no cost. <strong>Getting the fit right is our job, not yours.</strong></> },
  { q: "What tools do they work with?", a: "Whatever you use — trained across Google Ads, Meta Business, HubSpot, Mailchimp, Klaviyo, Semrush, Ahrefs, Figma, WordPress, Shopify, and more." },
  { q: "Is there a minimum engagement?", a: <>For part-time and full-time roles, a one-month minimum. <strong>Hourly work has no minimum.</strong></> },
];

export default function TalentStaffingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        eyebrow="Marketing talent, on demand"
        line1="Skilled marketing people,"
        line2={
          <>
            embedded in <span className="grad-text">your team.</span>
          </>
        }
        lead={
          <>
            Hiring a marketer takes months, costs a fortune, and often lands the wrong fit. We give you{" "}
            <strong>vetted specialists ready to plug into your team in days</strong> — at rates you can see up front,
            with the flexibility to scale up, down, or swap anytime.
          </>
        }
        primary={{ label: "Book a free talent call", href: "/growth-plan" }}
        secondary={{ label: "See rates & roles ↓", href: "#pricing" }}
      >
        <RosterCard />
      </ServiceDetailHero>

      <TrustBar items={["Vetted specialists", "Transparent published rates", "Month-to-month", "Fully remote"]} />

      {/* PROBLEM */}
      <section className="band tint" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem we solve</span>
            <h2>Hiring an in-house marketer is broken.</h2>
          </Reveal>
          <ProblemSolve
            items={PROBLEMS}
            solve={
              <>
                And if the fit is wrong, swapping is painful and slow.{" "}
                <span className="gt">Talent &amp; Staffing solves all of that.</span>
              </>
            }
          />
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="band" id="different">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What makes us different</span>
            <h2>Freelancer flexibility, agency backup.</h2>
          </Reveal>
          <div className="ts-feats">
            <FeatureGrid cards={FEATURES} columns={3} />
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="band tint" id="roles">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Roles we staff</span>
            <h2>Pick a role. See the fit.</h2>
            <p>Every role can be embedded part-time, full-time, or on a project basis — and every one comes with the full agency behind them.</p>
          </Reveal>
          <RolesExplorer />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>From “we need help” to working — usually within a week.</h2>
          </Reveal>
          <div className="ts-hiw">
            {HIW_STEPS.map((step) => (
              <Reveal className="ts-hstep" key={step.no} style={d(step.delay ?? 0)}>
                <div className="hn">
                  <span className="num">{step.no}</span> {step.hn}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="band tint" id="models">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Engagement models</span>
            <h2>Four ways to work with us.</h2>
            <p>Pick whatever fits — and change it whenever your needs do.</p>
          </Reveal>
          <div className="ts-models">
            {MODELS.map((model) => (
              <Reveal className="ts-mcard" key={model.title} style={d(model.delay ?? 0)}>
                <div className="mn">{model.icon}</div>
                <h3>{model.title}</h3>
                <p>{model.text}</p>
                <span className="commit">{model.commit}</span>
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
            <h2>Every role, a published rate.</h2>
            <p>No “book a call to hear our pricing.” Rates vary by role and seniority — here’s the structure, with exact numbers on the pricing page.</p>
          </Reveal>
          <div className="ts-tiers">
            {TIERS.map((tier) => (
              <Reveal as="article" className="ts-tier" key={tier.name} style={d(tier.delay)}>
                <span className="ts-tier-spot"></span>
                <div className="tn">{tier.name}</div>
                <div className="tprice">
                  <div className="tp">
                    <span className="lab">Part-time /mo</span>
                    <span className={`amt${tier.grad ? " grad" : ""}`}>Published</span>
                  </div>
                  <div className="tp">
                    <span className="lab">Full-time /mo</span>
                    <span className={`amt${tier.grad ? " grad" : ""}`}>Published</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <NoteCallout style={{ marginTop: 24 }}>
            Every role and tier has an <strong>exact number published</strong> — see the full <a href="/pricing">pricing page</a>.
            Bundling is automatic across practices: 10% off any two services, 15% off three or more.
          </NoteCallout>
        </div>
      </section>

      {/* INCLUDED (dark) */}
      <section className="band dark" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>With every engagement.</h2>
          </Reveal>
          <div className="ts-inc-grid">
            {INCLUDED.map((item) => (
              <Reveal className="ts-inc" key={item.title} style={d(item.delay ?? 0)}>
                <div className="ii">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every hire." />

      <CtaBand
        eyebrow="Talent & Staffing"
        heading="Ready to add a specialist to your team?"
        copy={
          <>
            Tell us the role you’re trying to fill. We’ll come back within a couple of days with the right person and a
            clear rate. <strong style={{ color: "#fff", fontWeight: 600 }}>No obligation, no pressure, no sales games.</strong>
          </>
        }
        primaryLabel="Book a free talent call"
        primaryHref="/growth-plan"
        secondary={{ label: "See full pricing", href: "/pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
