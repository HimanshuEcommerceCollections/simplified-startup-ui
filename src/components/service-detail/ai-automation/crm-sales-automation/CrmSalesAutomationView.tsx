"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  NoteCallout,
  PricingTiers,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./crm-page.css";

/* -------- icons -------- */

const ICON_CAPTURE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M7 7h10M7 12h10M7 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 15.5 19.5 17l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_STAGES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h10M4 12h16M4 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8m-8 4h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_HANDOFF = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 12h11M12 8l4 4-4 4M17 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TABLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROUTE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_USER = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SCREEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_ROWS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: automated pipeline card -------- */

const PIPE_STEPS: { icon: ReactNode; title: ReactNode; sub: ReactNode; tag: string; tagClass: "auto" | "score" | "won" }[] = [
  { icon: ICON_CAPTURE, title: "Lead captured", sub: "Website form → CRM", tag: "Auto", tagClass: "auto" },
  { icon: ICON_STAR, title: "AI scored — Tier A", sub: "ICP fit + intent signals", tag: "Hot", tagClass: "score" },
  { icon: ICON_LIST_CHECK, title: "Routed to senior rep", sub: "+ Slack alert & SMS", tag: "Auto", tagClass: "auto" },
  { icon: ICON_CALENDAR, title: "Meeting booked & nurtured", sub: "Sequence + reminders", tag: "Auto", tagClass: "auto" },
  { icon: ICON_CHECK, title: "Deal won", sub: "E-sign → onboarding kickoff", tag: "Won", tagClass: "won" },
];

function PipeCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the pipeline is shown in its end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample automated sales pipeline"
      className={`crm-pipe${run ? " run" : ""}`}
      live="Pipeline · Automating"
      corner="NO HUMAN TOUCH"
      footLeft="Every stage automated"
      footRight="reps just close →"
    >
      <div className="crm-pipe-flow">
        {PIPE_STEPS.map((step, i) => (
          <div className="crm-pstep done" key={i}>
            <span className="pnode">{step.icon}</span>
            <span className="pt">
              <b>{step.title}</b>
              <small>{step.sub}</small>
            </span>
            <span className={`ptag ${step.tagClass}`}>{step.tag}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- stats (count-ups) -------- */

type Stat = { count: number; suffix: string; label: string; text: string; delay: number };

const STATS: Stat[] = [
  { count: 48, suffix: "%", label: "Leads never touched", text: "Of inbound leads that never receive a single follow-up call or email.", delay: 0 },
  { count: 5, suffix: "min", label: "Response window", text: "Leads contacted within 5 minutes are 21× more likely to convert than after 30.", delay: 80 },
  { count: 80, suffix: "%", label: "Deals need 5+ follow-ups", text: "Of sales require five or more follow-ups — but 44% of reps give up after one.", delay: 160 },
];

/* the design fires the count-ups once #stats scrolls past 85% of the viewport */
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
    <Reveal className="crm-stat" style={d(stat.delay)}>
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
    <div className="crm-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- 5-stage framework -------- */

const FRAMEWORK: { no: string; icon: ReactNode; title: string; desc: string; items: string[] }[] = [
  { no: "01", icon: ICON_CAPTURE, title: "Capture", desc: "Every lead into the CRM — no matter the source.", items: ["Website forms", "Ad platforms", "Calls + SMS", "Email replies"] },
  { no: "02", icon: ICON_STAR, title: "Score", desc: "AI + rule-based scoring separates hot from cold.", items: ["ICP fit scoring", "Behavior signals", "Intent data", "Auto-priority"] },
  { no: "03", icon: ICON_LIST_CHECK, title: "Route", desc: "Right lead, right rep, right time — automatically.", items: ["Round-robin", "Territory rules", "Skill-based", "Load balancing"] },
  { no: "04", icon: ICON_CHAT, title: "Nurture", desc: "Follow-up sequences that fire when reps forget.", items: ["Email drip", "SMS follow-up", "Task reminders", "Re-engagement"] },
  { no: "05", icon: ICON_CHECK, title: "Close", desc: "Proposals, contracts, e-sign — triggered from the pipeline.", items: ["Proposal automation", "E-sign integration", "Payment collection", "Onboarding trigger"] },
];

/* -------- CRM comparison -------- */

const CRMS: { name: string; best: string; price: string; win: string; watch: string }[] = [
  { name: "HubSpot", best: "Inbound-heavy teams, mid-market SaaS, marketing + sales alignment", price: "$20/user → $890+/mo", win: "1,500+ integrations, deep reporting, polished UX", watch: "Pricing scales fast with users + contacts" },
  { name: "Salesforce", best: "Enterprise sales orgs, complex pipelines, ERP integrations", price: "$25 → $150+/user", win: "Unmatched customization, custom objects, Flow", watch: "Needs a dedicated admin; steep learning curve" },
  { name: "GoHighLevel", best: "Agencies, local service businesses, all-in-one buyers", price: "$97/mo (unlimited)", win: "Built-in SMS + calling + funnels + AI, no extra tools", watch: "Fewer native integrations; Zapier for niche apps" },
  { name: "Pipedrive", best: "Small sales teams that want a visual, no-fuss pipeline", price: "$14 → $79/user", win: "Simplest pipeline UX on the market", watch: "Weak marketing automation; no built-in SMS" },
];

/* -------- automations explorer -------- */

type Automation = { key: string; icon: ReactNode; btnName: string; btnSub: string; name: string; trigger: string; items: string[] };

const AUTOMATIONS: Automation[] = [
  {
    key: "instant",
    icon: ICON_BOLT,
    btnName: "Instant lead response",
    btnSub: "Form → scored in 60s",
    name: "Instant Lead Response",
    trigger: "New lead submits your website form.",
    items: ["AI scores the lead against your ICP in under 60 seconds", "Hot leads: Slack alert + instant SMS to rep", "Cold leads: added to nurture email sequence", "Rep gets full contact record + form answers", "Calendar link auto-delivered for pre-qualified leads"],
  },
  {
    key: "scoring",
    icon: ICON_STAR,
    btnName: "Scoring + routing",
    btnSub: "A / B / C tiers",
    name: "Lead Scoring + Priority Routing",
    trigger: "Any contact enters the CRM (form, ad, event, import).",
    items: ["AI scores lead against your ICP", "Adds behavior signals (page views, email opens)", "Assigns priority tier (A / B / C)", "Routes A to senior reps, B to junior, C to nurture", "Notifies rep in Slack with priority context"],
  },
  {
    key: "stage",
    icon: ICON_STAGES,
    btnName: "Deal-stage follow-up",
    btnSub: "Stage-triggered",
    name: "Deal Stage Follow-Up",
    trigger: "Deal moves from one pipeline stage to the next.",
    items: ["Stage-specific email sent automatically", "Task created for rep with next action + deadline", "Calendar reminder for follow-up call", "Sales collateral shared with prospect", "Manager notified if deal stalls beyond X days"],
  },
  {
    key: "meeting",
    icon: ICON_CALENDAR,
    btnName: "Meeting booking",
    btnSub: "Auto calendar",
    name: "Meeting Booking Automation",
    trigger: "Prospect requests a meeting or replies “yes”.",
    items: ["Calendar link auto-sent (Calendly, HubSpot, Chili Piper)", "Round-robin routing across team", "Meeting details logged to CRM contact", "Prep brief generated for rep", "Reminder SMS sent 2 hours before"],
  },
  {
    key: "proposal",
    icon: ICON_DOC,
    btnName: "Proposal + e-sign",
    btnSub: "Generate → sign",
    name: "Proposal + E-Sign Automation",
    trigger: "Deal reaches the “Proposal” stage.",
    items: ["Custom proposal generated from template", "Sent via DocuSign / PandaDoc / HelloSign", "Rep notified when opened", "Rep notified when signed", "Deal auto-moves to “Won” + kicks off onboarding"],
  },
  {
    key: "stall",
    icon: ICON_CLOCK,
    btnName: "Deal stall rescue",
    btnSub: "Re-engage",
    name: "Deal Stall Rescue",
    trigger: "Deal sits in the same stage for X days.",
    items: ["AI drafts a personalized re-engagement email", "Rep gets a task to review and send", "Ignored 5 more days: escalate to manager", "Still no movement: auto-move to “Nurture”", "Added to the weekly stalled-deal digest"],
  },
  {
    key: "won",
    icon: ICON_CHECK,
    btnName: "Won → onboarding",
    btnSub: "Kickoff fires",
    name: "Won Deal → Onboarding Kickoff",
    trigger: "Deal marked “Won” in the CRM.",
    items: ["Client folder created (Google Drive / Notion)", "Kickoff email sent with next steps", "Kickoff call auto-booked on calendar", "Invoice generated (QuickBooks / Xero)", "Project created (ClickUp / Asana / Monday)"],
  },
  {
    key: "handoff",
    icon: ICON_HANDOFF,
    btnName: "Sales-marketing handoff",
    btnSub: "MQL → SQL",
    name: "Sales-Marketing Handoff",
    trigger: "Marketing lead hits the qualifying score threshold.",
    items: ["Auto-promoted from Marketing- to Sales-Qualified", "Assigned to rep by territory + capacity", "Full context transferred (source, campaigns, content)", "Slack notification to sales manager", "Marketing sequences paused so sales owns it"],
  },
];

function AutomationsExplorer() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = AUTOMATIONS[active];

  function select(i: number) {
    const next = (i + AUTOMATIONS.length) % AUTOMATIONS.length;
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
    <Reveal className="crm-wb-wrap" id="automations-int">
      <div className="crm-wb-list" role="tablist" aria-label="Automations">
        {AUTOMATIONS.map((a, i) => (
          <button
            key={a.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="crm-wb-btn"
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{a.icon}</span>
            <span className="dn">
              <b>{a.btnName}</b>
              <small>{a.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="crm-wb-panel">
        <div className="crm-wp-top">
          {/* the design renders the same bolt mark for every automation */}
          <span className="big">{ICON_BOLT}</span>
          <div>
            <h3>{item.name}</h3>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="crm-wp-body crm-wp-fade" key={item.key}>
          <span className="crm-trg">{ICON_BOLT}Trigger</span>
          <div className="crm-trg-txt">{item.trigger}</div>
          <span className="k">Auto actions</span>
          <div className="crm-wp-list">
            {item.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- included / who / steps / pricing / faq -------- */

const INCLUDED: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_SEARCH, title: "CRM & process audit", text: "Map your sales process, find where deals leak, and design the automation that fixes it — with a 30-60-90 roadmap." },
  { no: "02", icon: ICON_TABLE, title: "Setup or migration", text: "Full implementation on HubSpot / Salesforce / GHL / Pipedrive — pipeline stages, custom fields, roles, clean data migration." },
  { no: "03", icon: ICON_CAPTURE, title: "Lead capture & routing", text: "Every lead into the CRM in seconds — forms, ad platforms, funnels, call/SMS logging, round-robin & territory routing." },
  { no: "04", icon: ICON_STAR, title: "AI lead scoring", text: "The 2026 differentiator — AI scores every lead against your ICP + behavior + intent, in real time. A/B/C tiers, score decay." },
  { no: "05", icon: ICON_CHAT, title: "Sequence & follow-up", text: "Multi-step email + SMS sequences per stage, task creation, AI-drafted replies, re-engagement and win-back flows." },
  { no: "06", icon: ICON_ROUTE, title: "Sales stack integration", text: "Email & calendar two-way sync, meetings, e-sign, Slack, accounting — your CRM becomes the center, nothing in silos." },
  { no: "07", icon: ICON_TREND, title: "Reporting & dashboards", text: "Dashboards your team actually opens — pipeline health, rep performance, forecast, attribution, deal velocity." },
  { no: "08", icon: ICON_USER, title: "Training & documentation", text: "If the team doesn’t use it, none of it matters — recorded training per role, cheat sheets, docs, ongoing support." },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_SCREEN, text: <><strong>A SaaS or B2B software company</strong> with a growing sales team that needs a real pipeline, not a shared spreadsheet.</>, delay: 0 },
  { icon: ICON_BRIEFCASE, text: <><strong>An agency or service business</strong> using (or wanting) GoHighLevel to unify CRM, funnels, SMS, and client work.</>, delay: 60 },
  { icon: ICON_PHONE, text: <><strong>A local service business</strong> losing leads because response times are slow and follow-ups slip.</>, delay: 120 },
  { icon: ICON_ROWS, text: <><strong>A team stuck in spreadsheets</strong> — you bought HubSpot/Salesforce but nobody uses it because it was never set up right.</>, delay: 0 },
  { icon: ICON_BARS, text: <><strong>A business scaling past 5–10 reps</strong> where the “founder in their inbox” model has broken and you need real systems.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>A team migrating CRMs</strong> — outgrown Pipedrive, moving off Salesforce, or consolidating tools onto GoHighLevel.</>, delay: 120 },
];

const STEPS = [
  { no: "Week 1", title: "Audit + strategy", text: "Discovery with sales leadership, process mapping, CRM health check, platform recommendation, plain-language roadmap.", delay: 0 },
  { no: "Weeks 2–3", title: "Setup or migration", text: "Full implementation, pipeline stages, custom fields, roles, data migrated and cleaned, access verified.", delay: 70 },
  { no: "Weeks 3–5", title: "Automation build", text: "Lead capture from every source, scoring model, routing rules, sequences launched, integrations connected, AI layer added.", delay: 140 },
  { no: "Weeks 5–6", title: "Testing + training", text: "End-to-end testing with real data, recorded rep training, documentation, admin walkthrough, manager reporting review.", delay: 210 },
  { no: "Ongoing", title: "Optimize & grow", text: "Monthly health checks, new automations as you scale, report refinement, API monitoring so nothing breaks silently.", delay: 280 },
];

const TIERS = [
  { name: "CRM Audit", best: "One-off audit + roadmap of your CRM setup and sales process — no commitment.", price: "Published" },
  { name: "Starter CRM Setup", best: "Small teams — implementation, pipeline design, 3–5 core automations, basic integrations.", price: "Published", delay: 70 },
  { name: "Growth CRM & Automation", best: "Growing teams — full setup, 10+ automations, AI lead scoring, sales stack integration.", price: "Published", featured: true, badge: "Most popular", delay: 140 },
  { name: "Scale & Optimization", best: "Larger teams & complex pipelines — multi-pipeline, advanced AI, custom objects. Optional monthly optimization.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "Which CRM is best?", a: <><strong>HubSpot</strong> for inbound-heavy mid-market, <strong>Salesforce</strong> for enterprise, <strong>GoHighLevel</strong> for agencies/local all-in-one, <strong>Pipedrive</strong> for simple pipeline UX. We’re certified across all four and recommend per business — not per commission.</> },
  { q: "How much does it cost?", a: <>Depends on scope. The CRM Audit shows what you actually need. Starter covers 3–5 core automations; Growth (10+ automations, AI scoring) is most popular; Scale handles complex multi-pipeline. <strong>Full pricing is published — no “custom quote” wall.</strong></> },
  { q: "Can you migrate us between CRMs?", a: <>Yes — a core part of what we do. HubSpot ↔ Salesforce, either ↔ GoHighLevel, Pipedrive → anything. <strong>Data migration, deduplication, pipeline rebuild, and team re-training</strong> on the new platform.</> },
  { q: "How long does setup take?", a: <>Starter 3–4 weeks, Growth 5–6, Scale 6–8. Migrations add 1–2 weeks. <strong>Timelines depend on how quickly your team provides access, signs off, and attends training.</strong></> },
  { q: "Do you build AI lead scoring?", a: <>Yes — the 2026 differentiator. We combine ICP-fit signals (Clearbit, ZoomInfo, RB2B) with behavior signals and <strong>score every lead in real time,</strong> so reps know who to call first.</> },
  { q: "Do you set up follow-up automation?", a: <>Yes — one of the biggest revenue-recoverable areas. Multi-step email sequences per stage, SMS follow-ups (Twilio/GHL), task creation, and <strong>AI-drafted reply suggestions.</strong></> },
  { q: "Can you integrate my whole sales stack?", a: <>Yes — email two-way sync, calendars (Calendly/Chili Piper), meetings (Zoom/Meet/Teams), e-sign (DocuSign/PandaDoc), and accounting (QuickBooks/Xero). <strong>Whatever you use, we integrate.</strong></> },
  { q: "What if my team won’t use the CRM?", a: <>Adoption is the #1 killer of CRM projects — so we build training into every engagement. If reps still resist, it usually means it was over-configured. <strong>We simplify until they use it.</strong></> },
  { q: "Can you set up GoHighLevel white-label?", a: <>Yes — a specialty. Sub-account structure, white-label branding, snapshots for client onboarding, agency-level automations, and reseller pricing. <strong>Perfect for agencies serving multiple clients on GHL.</strong></> },
  { q: "Custom Salesforce Flow or Apex?", a: <>For Growth &amp; Scale — custom Flow, custom objects, permission sets, and lightweight Apex where declarative tools can’t. For heavy Apex/LWC, <strong>we partner with certified Salesforce developers.</strong></> },
  { q: "Do I own everything?", a: <>Yes, 100% — all configs, automations, dashboards, and docs are built in your accounts with full admin access. <strong>If you leave, you keep everything.</strong> No lock-in.</> },
  { q: "Ours is already a mess — can you fix it?", a: <>That’s the most common situation we walk into. Our audit maps what’s working, broken, and worth fixing. <strong>Most clients don’t need to switch platforms — they need theirs done right.</strong></> },
];

/* -------- page -------- */

export default function CrmSalesAutomationView() {
  return (
    <div className="crm-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "AI Automation", href: "/ai-automation" }}
        eyebrow="HubSpot · Salesforce · GoHighLevel · Pipedrive · AI-powered"
        line1="A sales pipeline that"
        line2={
          <>
            runs <span className="grad-text">itself.</span>
          </>
        }
        lead={
          <>
            Done-for-you CRM setup and sales automation. We build the pipeline, automate the follow-up, add AI-powered
            lead scoring, and integrate the whole stack —{" "}
            <strong>so leads stop falling through the cracks and reps stop living in spreadsheets.</strong>{" "}
            Platform-agnostic, transparent, and you own everything.
          </>
        }
        primary={{ label: "Book a free CRM audit", href: "/start-project" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <PipeCard />
      </ServiceDetailHero>

      <TrustBar items={["Certified: HubSpot, Salesforce & GHL", "Platform-agnostic recommendations", "Transparent published pricing", "You own everything"]} />

      {/* STATS (dark) */}
      <section className="band dark" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where your sales revenue leaks</span>
            <h2>You don’t have a pipeline problem. You have a system problem.</h2>
            <p>
              Leads come in and disappear. Follow-ups slip. Reports nobody trusts. Every leak in your CRM costs closed
              deals — here’s where the money goes.
            </p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="crm-stat-note">
            A CRM without automation is a spreadsheet with more buttons.{" "}
            <strong>Sales automation is what turns it into a revenue machine</strong> — by automating capture, scoring,
            routing, follow-up, and reporting, so your team does the part that closes deals.
          </Reveal>
        </div>
      </section>

      {/* 5-STAGE FRAMEWORK */}
      <section className="band" id="framework">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 5-stage sales automation framework</span>
            <h2>Every high-performing pipeline runs on the same five.</h2>
            <p>
              We build automation into each stage — so leads flow through without dropping. Miss one and leads leak;
              build all five and revenue compounds.
            </p>
          </Reveal>
          <Reveal className="crm-fw-grid">
            {FRAMEWORK.map((stage) => (
              <article className="crm-fw" key={stage.no}>
                <span className="fn">{stage.no}</span>
                <div className="fi">{stage.icon}</div>
                <h3>{stage.title}</h3>
                <p className="fd">{stage.desc}</p>
                <ul>
                  {stage.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="crm-fw-note">
            Miss any one stage — leads leak. <strong>Build all five right — revenue compounds.</strong>
          </Reveal>
        </div>
      </section>

      {/* CRM COMPARISON */}
      <section className="band tint" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Which CRM is right for you?</span>
            <h2>HubSpot vs Salesforce vs GoHighLevel vs Pipedrive.</h2>
            <p>
              The four dominant platforms for small &amp; mid-market in 2026. We’re certified across all four — and
              recommend based on your business, not our commission.
            </p>
          </Reveal>
          <Reveal className="crm-tbl">
            <div className="crm-row head">
              <div>Platform</div>
              <div>Best for</div>
              <div className="cc3">Starting price</div>
              <div className="cc4">Superpower</div>
              <div className="cc5">Watch for</div>
            </div>
            {CRMS.map((crm) => (
              <div className="crm-row" key={crm.name}>
                <div className="cn">{crm.name}</div>
                <div>{crm.best}</div>
                <div className="cc3 cprice">{crm.price}</div>
                <div className="cc4 cwin">{crm.win}</div>
                <div className="cc5">{crm.watch}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="crm-note">
            Not sure which fits? <strong>Our free CRM audit answers this in plain language</strong> — no upsell to
            whichever pays the biggest commission.
          </Reveal>
        </div>
      </section>

      {/* AUTOMATIONS (interactive) */}
      <section className="band" id="automations">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Sales automations we build most</span>
            <h2>Trigger → auto-actions, no human touch.</h2>
            <p>Real automations we’ve built for real businesses. Pick one to see the trigger and everything that fires from it.</p>
          </Reveal>
          <AutomationsExplorer />
          <Reveal as="p" className="crm-note">
            Every automation is built to your process — not a generic template.{" "}
            <strong>Most clients start with 3–5 and add more as they see the ROI.</strong>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED (8) */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Audit to adoption, one team.</h2>
            <p>Everything a CRM &amp; sales-automation program needs to deliver revenue — eight parts.</p>
          </Reveal>
          <Reveal className="crm-inc-grid">
            {INCLUDED.map((item) => (
              <div className="crm-inc" key={item.no}>
                <div className="ihead">
                  <span className="ii">{item.icon}</span>
                  <div>
                    <span className="in-no">{item.no}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
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
            <span className="eyebrow">Who this is for</span>
            <h2>The right fit if you’re…</h2>
          </Reveal>
          <div className="crm-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="crm-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A structured 3–8 week build.</h2>
            <p>Every phase ends with a working deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="crm-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="crm-step" key={step.title} style={d(step.delay)}>
                <span className="crm-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
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
            <h2>One clear price, published up front.</h2>
            <p>Priced by scope, not billed hourly. No “custom quote” runaround.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Project fees paid in two installments — <strong>50% at kickoff, 50% at launch.</strong> CRM platform
            licenses (HubSpot / Salesforce / GHL / Pipedrive) are separate, paid to the vendor. AI usage costs (if any)
            passed through at cost. Every rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="CRM & Sales Automation"
        heading="Ready to stop losing deals to bad follow-up?"
        copy={
          <>
            Book a free CRM audit. We’ll look at your current setup (or where you’re starting), map your revenue leaks,
            and come back with a clear plan and price —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>usually within 48 hours. No obligation, no jargon, no commission-driven upsell.</strong>
          </>
        }
        primaryLabel="Book a free CRM audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
