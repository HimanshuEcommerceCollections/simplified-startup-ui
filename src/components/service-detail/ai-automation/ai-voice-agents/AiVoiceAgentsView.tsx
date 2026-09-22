"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
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
import "./va-page.css";

/* -------- icons -------- */

const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PHONE_OUT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M15 4l5 5M20 4l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_HELP = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7M12 16.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROUTE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 9h16l-1 11H5zM8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 3a9 9 0 0 1 0 18M3 12h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_MIC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="2" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_HANDOFF = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M10 9V5l-7 7 7 7v-4c5 0 8 2 10 5-1-6-5-11-10-11z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TOOTH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M8 3c-2 0-3 2-3 5s1 13 3 13 2-5 4-5 2 5 4 5 3-10 3-13-1-5-3-5-2 1.5-4 1.5S10 3 8 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SCALES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M6 8l-3 6h6zM18 8l-3 6h6zM5 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_WRENCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M14 6a4 4 0 0 0-5.5 5.5l-5 5L6 18.5l5-5A4 4 0 0 0 16.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_HOUSE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 11l8-7 8 7M6 10v9h12v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SCISSORS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8.5 8 20 18M8.5 16 20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CUTLERY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M16 3c-1.5 0-2.5 2-2.5 5S15 21 16 21s2.5-10 2.5-13S17.5 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: live-call card -------- */

/* [height %, animation delay s] for each waveform bar, as in the design */
const WAVE: [number, number][] = [
  [18, 0.28], [27, 0.27], [30, 0.25], [35, 0.24], [44, 0.22], [50, 0.21], [52, 0.2], [57, 0.18], [65, 0.17], [69, 0.15],
  [70, 0.14], [76, 0.13], [82, 0.11], [83, 0.1], [84, 0.08], [89, 0.07], [93, 0.06], [92, 0.04], [93, 0.03], [97, 0.01],
  [97, 0], [94, 0.01], [94, 0.03], [95, 0.04], [91, 0.06], [86, 0.07], [86, 0.08], [85, 0.1], [79, 0.11], [74, 0.13],
  [73, 0.14], [69, 0.15], [61, 0.17], [58, 0.18], [56, 0.2], [49, 0.21], [40, 0.22], [37, 0.24], [33, 0.25], [24, 0.27],
  [16, 0.28],
];

const bar = (h: number, dl: number): CSSProperties => ({ "--h": `${h}%`, "--dl": `${dl}s` } as CSSProperties);

function CallCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the transcript is shown in its end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample AI receptionist call"
      className={`va-call${run ? " run" : ""}`}
      live="Incoming call · Answered"
      corner="1 RING"
      footLeft="Every call answered"
      footRight="24/7, no voicemail →"
    >
      <div className="va-call-hero">
        <span className="ring">{ICON_PHONE}</span>
        <span className="ci">
          <b>“Rapid Rooter, this is Ava”</b>
          <small>AI receptionist · picked up in 1 ring</small>
        </span>
      </div>
      <div className="va-wave" aria-hidden="true">
        {WAVE.map(([h, dl], i) => (
          <i key={i} style={bar(h, dl)}></i>
        ))}
      </div>
      <div className="va-call-body">
        <div className="va-cline">
          <span className="lb you">Caller</span>
          <p>“My water heater’s leaking — can someone come today?”</p>
        </div>
        <div className="va-cline">
          <span className="lb ai">Ava</span>
          <p>“Absolutely — I can get a tech out this afternoon. What’s the address and best number?”</p>
        </div>
        <div className="va-cline">
          <span className="lb you">Caller</span>
          <p>“12 Oak St — 555-0182.”</p>
        </div>
        <span className="va-call-chip">
          {ICON_CHECK_BOLD} Booked 2:00 PM &nbsp;·&nbsp; Lead → CRM &nbsp;·&nbsp; SMS sent
        </span>
      </div>
    </SignatureCard>
  );
}

/* -------- stats (count-ups) -------- */

type Stat = { count: number; prefix?: string; suffix?: string; label: string; text: string; delay: number };

const STATS: Stat[] = [
  { count: 126, prefix: "$", suffix: "K", label: "Lost per year", text: "Average revenue lost annually by small businesses from missed calls alone.", delay: 0 },
  { count: 85, suffix: "%", label: "Don’t call back", text: "Callers who hit voicemail and never dial your number again — they call a competitor.", delay: 80 },
  { count: 62, suffix: "%", label: "Missed at peak", text: "Of inbound calls to small businesses go unanswered during peak business hours.", delay: 160 },
];

/* the design fires the count-ups once #stats scrolls past 85% of the viewport */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

function formatStat(v: number, stat: Stat) {
  const dec = stat.count % 1 !== 0;
  return `${stat.prefix ?? ""}${dec ? v.toFixed(1) : Math.round(v)}${stat.suffix ?? ""}`;
}

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
    <Reveal className="va-stat" style={d(stat.delay)}>
      <div className="sv">{formatStat(shown, stat)}</div>
      <span className="sk">{stat.label}</span>
      <p>{stat.text}</p>
    </Reveal>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  const [gridRef, inView] = useInView<HTMLDivElement>(STATS_IO);
  return (
    <div className="va-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- options table -------- */

const OPTIONS: { name: string; cover: string; cost: string; problem: string }[] = [
  { name: "Voicemail", cover: "24/7", cost: "Free", problem: "85% don’t leave a message. You lose the call." },
  { name: "You / your team", cover: "Business hours", cost: "Your time", problem: "Every call interrupts real work. Off-hours = lost." },
  { name: "Human receptionist", cover: "8 hrs, weekdays", cost: "$50–65K/yr", problem: "Off-hours + weekends + sick days = still missing calls." },
  { name: "Live answering service", cover: "24/7", cost: "$300–1,000+/mo", problem: "Per-minute pricing = unpredictable; quality varies." },
];

/* -------- what we don't build -------- */

const DONTS = [
  { title: "Robotic phone trees", text: "“Press 1 for sales, press 2 for support.” The 1990s want their IVR back. Modern AI agents hold real conversations.", delay: 0 },
  { title: "Generic off-the-shelf bots", text: "The $49/mo tools work for solopreneurs. For real businesses with services, pricing, and industry terms, they fall apart on the first tricky call.", delay: 70 },
  { title: "Obvious robot voices", text: "If customers can tell it’s AI in the first five seconds, they hang up. We use ElevenLabs and modern voice models that sound human.", delay: 0 },
  { title: "No human backup & surprise bills", text: "The AI handles 80–90%; the rest should transfer to a real person with context. And flat monthly pricing — not a $600 bill after a busy week.", delay: 70 },
];

/* -------- capabilities explorer -------- */

type Capability = { key: string; icon: ReactNode; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const CAPABILITIES: Capability[] = [
  {
    key: "booking",
    icon: ICON_CALENDAR,
    btnName: "Appointment booking",
    btnSub: "Straight to calendar",
    name: "AI Appointment Booking",
    tag: "Walks callers through your calendar, books directly, and confirms by email or SMS.",
    items: ["Real-time calendar sync (Google, Outlook, HubSpot)", "Service type and duration selection", "Automatic confirmation email + SMS", "Reschedule and cancel handling", "Multi-provider / multi-location support"],
  },
  {
    key: "lead",
    icon: ICON_LIST_CHECK,
    btnName: "Lead qualification",
    btnSub: "Qualify & route",
    name: "AI Lead Qualification",
    tag: "Asks qualifying questions, captures caller info, and routes hot leads instantly.",
    items: ["Custom qualifying questions per your ICP", "Contact info capture (name, phone, email)", "Instant hot-lead alerts (SMS, email, Slack)", "CRM push (HubSpot, Salesforce, GoHighLevel)", "Lead scoring and priority routing"],
  },
  {
    key: "support",
    icon: ICON_HELP,
    btnName: "Customer service",
    btnSub: "FAQs, hours, pricing",
    name: "AI Customer Service",
    tag: "Answers FAQs, hours, service area, and pricing — without a human.",
    items: ["Trained on your website, docs, FAQs", "Service area + hours + location", "Pricing and package information", "Policy and process questions", "Multi-language support"],
  },
  {
    key: "screen",
    icon: ICON_ROUTE,
    btnName: "Call screening & routing",
    btnSub: "Right person, context",
    name: "AI Call Screening & Routing",
    tag: "Screens callers, identifies intent, and routes to the right person — with context.",
    items: ["Intent detection (sales / support / billing)", "Team-member routing by inquiry type", "Warm transfer with conversation summary", "Priority handling for VIP callers", "Spam / robocall filtering"],
  },
  {
    key: "order",
    icon: ICON_BAG,
    btnName: "Order taking",
    btnSub: "To POS",
    name: "AI Order Taking",
    tag: "For restaurants, delivery, and repeat-order businesses — takes orders, sends to POS.",
    items: ["Menu / product catalog knowledge", "Order confirmation and modifications", "Payment collection (Stripe, Square)", "POS integration (Toast, Square, Clover)", "Delivery vs pickup handling"],
  },
  {
    key: "outbound",
    icon: ICON_PHONE_OUT,
    btnName: "Outbound calls",
    btnSub: "Reminders & win-back",
    name: "AI Outbound Voice Agent",
    tag: "Makes outbound calls — reminders, follow-ups, review requests, win-backs.",
    items: ["Appointment reminders and confirmations", "Post-service follow-up calls", "Review request calls", "Win-back campaigns for lapsed customers", "Survey and feedback calls"],
  },
];

function CapabilitiesExplorer() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cap = CAPABILITIES[active];

  function select(i: number) {
    const next = (i + CAPABILITIES.length) % CAPABILITIES.length;
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
    <Reveal className="va-wb-wrap" id="can-int">
      <div className="va-wb-list" role="tablist" aria-label="Capabilities">
        {CAPABILITIES.map((item, i) => (
          <button
            key={item.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="va-wb-btn"
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{item.icon}</span>
            <span className="dn">
              <b>{item.btnName}</b>
              <small>{item.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="va-wb-panel">
        <div className="va-wp-top">
          {/* the design renders the same phone mark for every capability */}
          <span className="big">{ICON_PHONE}</span>
          <div>
            <h3>{cap.name}</h3>
            <div className="tagline">{cap.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="va-wp-body va-wp-fade" key={cap.key}>
          <span className="k">What’s inside</span>
          <div className="va-wp-list">
            {cap.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- included / industries / steps / pricing / faq -------- */

const INCLUDED: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_GLOBE, title: "Strategy & scoping", text: "Call-flow mapping, use-case priorities, success metrics, escalation rules, and after-hours handling defined." },
  { no: "02", icon: ICON_STAR, title: "Custom AI training", text: "Trained on your services, pricing, hours, availability, policies, and industry-specific language — with ongoing sync." },
  { no: "03", icon: ICON_MIC, title: "Voice & persona", text: "A name, a natural human voice (50+), and a personality that matches your brand. Multi-language. ElevenLabs / OpenAI / Deepgram." },
  { no: "04", icon: ICON_PHONE, title: "Phone number & routing", text: "Use your existing number (forwarding) or a new one. Unlimited simultaneous calls, overflow routing, recording + transcripts." },
  { no: "05", icon: ICON_CALENDAR, title: "Booking integration", text: "Google/Outlook/Apple, Calendly, Acuity, Vagaro, Jane, OpenTable, ServiceTitan, Jobber — with confirmations & reschedules." },
  { no: "06", icon: ICON_LIST_CHECK, title: "CRM & lead capture", text: "Every caller’s name, reason, and full transcript lands in your CRM (HubSpot, Salesforce, GHL, industry CRMs) with hot-lead alerts." },
  { no: "07", icon: ICON_HANDOFF, title: "Human handoff & transfer", text: "Warm transfer with an AI-generated call summary, routing by inquiry type, after-hours message capture, emergency protocols." },
  { no: "08", icon: ICON_TREND, title: "Analytics & optimization", text: "Weekly call review, stuck-conversation retraining, monthly report (calls handled, booked, transferred, leads) + cost-per-recovered-call." },
];

const INDUSTRIES: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_TOOTH, title: "Dental & medical", text: "New patient intake, booking, insurance questions, HIPAA-compliant workflows." },
  { icon: ICON_SCALES, title: "Law firms", text: "Case-intake screening, practice-area routing, consultation booking." },
  { icon: ICON_WRENCH, title: "Home services", text: "Emergency vs scheduled triage, service-area checks, tech dispatch." },
  { icon: ICON_HOUSE, title: "Real estate", text: "Property inquiries, showing scheduling, lender referrals, agent routing." },
  { icon: ICON_SCISSORS, title: "Salons, spas & gyms", text: "Service booking, stylist/trainer selection, memberships, cancellations." },
  { icon: ICON_CUTLERY, title: "Restaurants", text: "Reservations, takeout orders, private dining, event bookings." },
  { icon: ICON_SHIELD, title: "Veterinary & pet", text: "Booking, emergency triage, grooming/boarding, prescription refills." },
  { icon: ICON_BRIEFCASE, title: "Agencies & consultants", text: "Discovery-call booking, service inquiries, ICP qualification, warm transfer." },
];

const STEPS = [
  { no: "Week 1", title: "Strategy & call flows", text: "Discovery locks use cases, KPIs, and escalation. We ingest your site, services, hours, pricing. Voice & persona chosen.", delay: 0 },
  { no: "Week 2", title: "Build & voice setup", text: "AI trained, voice configured, number provisioned (or forwarding set), calendar + CRM connected, call flows built.", delay: 70 },
  { no: "Week 3", title: "Testing & rehearsal", text: "Dozens of real-world call scenarios tested — booking, edge cases, transfers. Retrain on gaps. You approve recordings.", delay: 140 },
  { no: "Week 4", title: "Launch & handover", text: "Go live on your number. Team trained on transfers & dashboard. Analytics set up. 30 days of monitoring included.", delay: 210 },
  { no: "Ongoing", title: "Optimize & scale", text: "Weekly call reviews, monthly retraining, new use cases, performance reports, continuous accuracy gains.", delay: 280 },
];

const TIERS = [
  { name: "Starter Voice Agent", best: "Solo operators & micro-businesses — 1 use case (booking OR lead capture), up to 500 minutes/month.", price: "Published /mo" },
  { name: "Growth Voice Agent", best: "Small businesses & practices — 2–3 use cases, up to 2,000 minutes/month, CRM integration, human transfer.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Voice Agent", best: "Multi-location & higher volume — full use-case suite, unlimited minutes, multi-language, custom integrations.", price: "Published /mo", delay: 140 },
  { name: "Setup Fee", best: "One-time — custom training, voice setup, phone provisioning, and integrations, charged at kickoff.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "How much does an AI receptionist cost?", a: <>Depends on call volume and use cases. Starter suits solo operators; Growth is most popular for small businesses and practices; Scale handles multi-location. <strong>Full pricing is published on this page</strong> — no runaround, no per-minute surprise bills.</> },
  { q: "Will it sound like a robot?", a: <>No — we use ElevenLabs, OpenAI Realtime, and Deepgram voice models. <strong>Most callers can’t tell in the first 30 seconds.</strong> We’ll play live demo recordings on the strategy call so you can hear for yourself.</> },
  { q: "Can I use my existing phone number?", a: <>Yes — we set up call forwarding from your existing number, no port required, no disruption. Or provision a new local/toll-free number if you prefer.</> },
  { q: "What if the AI can’t answer?", a: <>It transfers to a real person with a <strong>warm handoff and full call summary.</strong> Or, after hours, it captures a message and promises a callback. Nothing gets lost.</> },
  { q: "Can it book appointments directly?", a: <>Yes — one of the most popular use cases. It walks callers through your real-time calendar (Google, Outlook, Calendly, Vagaro, Jane, ServiceTitan…), books the slot, and sends confirmation email + SMS.</> },
  { q: "Is it HIPAA-compliant?", a: <>Yes — we can configure HIPAA compliance including <strong>BAAs with underlying vendors,</strong> encrypted recordings, PHI handling, and secure CRM integration. Not every tool supports this — we do.</> },
  { q: "Can it handle multiple calls at once?", a: <>Yes — <strong>unlimited simultaneous calls,</strong> no busy signals, no hold music. If 20 people call at once, all 20 get an immediate answer — a huge advantage over voicemail and human receptionists.</> },
  { q: "Does it work for Spanish speakers?", a: <>Yes — and 30+ other languages. It can <strong>auto-detect the caller’s language</strong> and respond in kind. Great for Spanish-speaking markets across the Southwest and Southeast.</> },
  { q: "How is this different from Rosie or Smith.ai?", a: <>Those are off-the-shelf platforms you configure yourself. This is <strong>done-for-you</strong> — custom-trained on your business, integrated with your CRM and calendar, optimized monthly.</> },
  { q: "What if it misbooks something?", a: <>That’s what monthly optimization catches — we review conversations weekly and retrain on gaps. Plus <strong>you get every call transcript</strong> in your dashboard, so nothing happens in a black box.</> },
  { q: "Can I listen to calls afterwards?", a: <>Yes — every call is recorded (with legal disclosure) and transcribed. A dashboard lets you filter, search, and listen — great for QA, sales training, and catching concerns.</> },
  { q: "What happens to my old phone system?", a: <>Nothing changes — same phone, number, and team. The AI just picks up calls that would go to voicemail or ring endlessly at peak. <strong>A receptionist who never sleeps — not a replacement.</strong></> },
];

/* -------- page -------- */

export default function AiVoiceAgentsView() {
  return (
    <div className="va-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "AI Automation", href: "/ai-automation" }}
        eyebrow="AI receptionist · 24/7 call answering · Live in days"
        line1="An AI receptionist that"
        line2={
          <>
            answers <span className="grad-text">every call.</span>
          </>
        }
        lead={
          <>
            Done-for-you AI voice agents for local services, dental &amp; medical, law firms, real estate — any business
            that loses money when the phone rings and nobody answers.{" "}
            <strong>Trained on your business, works with your existing number,</strong> and pays for itself in the first
            recovered missed call.
          </>
        }
        primary={{ label: "Book a free AI receptionist demo", href: "/start-project" }}
        secondary={{ label: "Hear what it can do ↓", href: "#can" }}
      >
        <CallCard />
      </ServiceDetailHero>

      <TrustBar items={["Custom-trained on YOUR business", "Works with your existing number", "Transparent published pricing", "Month-to-month"]} />

      {/* STATS (dark) */}
      <section className="band dark" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The real cost of missed calls</span>
            <h2>When nobody picks up, 85% don’t call back.</h2>
            <p>
              They call your competitor instead. Missed calls quietly cost small businesses more than almost any other
              single problem — and the math is brutal.
            </p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="va-stat-note">
            Miss six calls a day and you’re losing <strong>$26,000+ every year</strong> — walking straight out the door to
            your competitor. An AI receptionist answers every call, 24/7, in a natural human voice.
          </Reveal>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="band" id="options">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Your options for answering the phone</span>
            <h2>Four ways to answer — honestly compared.</h2>
            <p>If your business gets more than a handful of calls a day, here’s how they really stack up.</p>
          </Reveal>
          <Reveal className="va-opt-tbl">
            <div className="va-opt-row head">
              <div>Option</div>
              <div>Coverage</div>
              <div className="oc3">Cost</div>
              <div className="oc4">The problem</div>
            </div>
            {OPTIONS.map((row) => (
              <div className="va-opt-row" key={row.name}>
                <div className="oname">{row.name}</div>
                <div>{row.cover}</div>
                <div className="oc3">{row.cost}</div>
                <div className="oc4">{row.problem}</div>
              </div>
            ))}
            <div className="va-opt-row win">
              <div className="oname">
                Custom AI voice agent<span className="tag">This</span>
              </div>
              <div>24/7, unlimited</div>
              <div className="oc3">Flat monthly</div>
              <div className="oc4 good">None. This is the fix.</div>
            </div>
          </Reveal>
          <Reveal as="p" className="va-opt-note">
            For most small businesses, an AI receptionist{" "}
            <strong>replaces voicemail entirely and handles 80–90% of calls</strong> without any human touch — at a
            fraction of the cost of a live receptionist.
          </Reveal>
        </div>
      </section>

      {/* DONT BUILD */}
      <section className="band tint" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t build</span>
            <h2>Most of what’s sold isn’t usable.</h2>
            <p>
              The AI voice market in 2026 is crowded. Being honest about what we <em>don’t</em> build — so you know what
              you’re getting.
            </p>
          </Reveal>
          <div className="va-dont-grid">
            {DONTS.map((item) => (
              <Reveal className="va-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{ICON_X}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="va-dont-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              We build voice agents that{" "}
              <strong>sound human, know your business, transfer to your team when they should, and cost the same every month.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES (interactive) */}
      <section className="band" id="can">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What your AI receptionist can do</span>
            <h2>Full front-desk, not just “answer the phone.”</h2>
            <p>Pick the ones that matter — most clients start with booking + qualification + basic support, then add more.</p>
          </Reveal>
          <CapabilitiesExplorer />
        </div>
      </section>

      {/* INCLUDED (8) */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Everything the voice agent needs to work.</h2>
            <p>Strategy, custom training, voice setup, integrations, and ongoing optimization — one team, eight parts.</p>
          </Reveal>
          <Reveal className="va-inc-grid">
            {INCLUDED.map((item) => (
              <div className="va-inc" key={item.no}>
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

      {/* INDUSTRIES */}
      <section className="band" id="industries">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Industries we build for</span>
            <h2>Fastest ROI — often pays for itself in month one.</h2>
          </Reveal>
          <Reveal className="va-ind-grid">
            {INDUSTRIES.map((item) => (
              <div className="va-indc" key={item.title}>
                <span className="ii">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Kickoff to a live receptionist in 2–4 weeks.</h2>
            <p>A structured process — every step ends with a deliverable and your sign-off.</p>
          </Reveal>
          <div className="va-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="va-step" key={step.title} style={d(step.delay)}>
                <span className="va-step-no">{step.no}</span>
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
            <h2>Flat monthly rate, published up front.</h2>
            <p>No per-minute surprise bills. No “call for pricing.” One-time setup + monthly management.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> AI platform costs (voice, LLM, telephony) are usage-based —
            typically $50–$300/mo depending on call volume — passed through at cost with no markup. Every rate is on the{" "}
            <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="AI Voice Agents & Receptionists"
        heading="Ready to stop losing money to missed calls?"
        copy={
          <>
            Book a free AI receptionist demo. We’ll walk through your call volume, your typical missed calls, and play a
            live demo of what a custom-trained AI voice agent could do —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation, no per-minute pricing games.</strong>
          </>
        }
        primaryLabel="Book a free AI receptionist demo"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
