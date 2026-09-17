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
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./wa-page.css";

/* -------- shared glyphs -------- */

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_MARK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* -------- copy -------- */

const WHY_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M9 7H5v4M15 17h4v-4M5 7l6 6M19 17l-6-6" />
      </svg>
    ),
    title: "Scope is the whole game",
    text: <>Most software projects fail on scope, not code. <strong>We cut hard to a v1 that ships</strong> — then iterate on what you learn.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3v6M12 3 9 6M12 3l3 3M5 13a7 7 0 0 0 14 0" />
      </svg>
    ),
    title: "Build-vs-buy, honestly",
    text: <>Sometimes the right answer is a $50/mo SaaS, not a custom build. <strong>We&apos;ll tell you when</strong> — even if it means less work for us.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      </svg>
    ),
    title: "Boring tech, on purpose",
    text: <>Proven, well-supported stacks — not whatever&apos;s trending. <strong>Boring means maintainable, hireable, and cheap to run.</strong></>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "You own everything",
    text: <>Code, infrastructure, accounts, and documentation — <strong>all yours,</strong> so any developer can pick it up later.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Docs a human can read",
    text: <>Handover docs, architecture notes, and a clean repo — <strong>no black box only we understand.</strong></>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" />
      </svg>
    ),
    title: "Shipped, then improved",
    text: <>Launch the smallest useful version, put it in real hands, <strong>then build what the usage data proves you need.</strong></>,
    delay: 120,
  },
];

const BUY_ITEMS = [
  "A mature tool covers 80%+ of your needs",
  "Your process isn’t a competitive advantage",
  "You need it working next week, not next quarter",
  "The monthly fee is cheaper than maintenance",
];

const BUILD_ITEMS = [
  "Your workflow is the competitive advantage",
  "You’re duct-taping 5 tools + spreadsheets",
  "The product itself is what you’re selling",
  "SaaS fees at your scale exceed a build",
];

const PAINS = [
  { title: "Scope creep", text: "“Can we also add…” a hundred times, until the v1 never ships.", delay: 0 },
  { title: "Building everything at once", text: "Trying to launch with every feature instead of the smallest useful version.", delay: 60 },
  { title: "Trendy tech", text: "The framework nobody will know how to maintain in two years.", delay: 120 },
  { title: "No handover", text: "A black box only the original dev understands — and they’ve moved on.", delay: 0 },
  { title: "Should’ve bought SaaS", text: "Six months building what a $50/mo tool already did better.", delay: 60 },
  { title: "Vendor lock-in", text: "You don’t own the code, so you can’t leave the agency that built it.", delay: 120 },
];

type WbKey = "internal" | "portal" | "saas" | "dashboard" | "marketplace" | "workflow" | "api" | "mobileweb";

type WbItem = {
  key: WbKey;
  icon: ReactNode;
  label: string;
  sub: string;
  name: string;
  tag: string;
  items: string[];
};

const WB_ITEMS: WbItem[] = [
  {
    key: "internal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Internal tools",
    sub: "Ops & admin",
    name: "Internal Tools",
    tag: "Replace the spreadsheet-and-five-tabs chaos with one internal app.",
    items: ["Admin dashboards", "Role-based access", "Bulk data operations", "Approval workflows", "Audit logs", "CSV / API import-export"],
  },
  {
    key: "portal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    label: "Customer portals",
    sub: "Client-facing",
    name: "Customer Portals",
    tag: "A logged-in space for your clients — no more email threads.",
    items: ["Secure client login", "Documents & file sharing", "Status & project updates", "Messaging / support", "Invoices & payments", "Notifications"],
  },
  {
    key: "saas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="1.5" fill="currentColor" />
      </svg>
    ),
    label: "SaaS MVP",
    sub: "Your product",
    name: "SaaS MVP",
    tag: "The smallest version of your product that real users can pay for.",
    items: ["Multi-tenant architecture", "Subscription billing (Stripe)", "Onboarding flow", "Core product workflow", "Usage analytics", "Admin & support tooling"],
  },
  {
    key: "dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    label: "Dashboards",
    sub: "Data & reporting",
    name: "Dashboards & Reporting",
    tag: "Turn scattered data into decisions your team actually uses.",
    items: ["Data pipeline & sync", "Custom charts & KPIs", "Filters & segments", "Scheduled reports", "Export to PDF / CSV", "Role-based views"],
  },
  {
    key: "marketplace",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 9h16l-1 11H5zM8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    label: "Marketplaces",
    sub: "Two-sided",
    name: "Marketplaces",
    tag: "Two-sided platforms connecting buyers and sellers, with payments.",
    items: ["Buyer & seller accounts", "Listings & search", "Payments & payouts (Stripe Connect)", "Reviews & ratings", "Messaging", "Admin moderation"],
  },
  {
    key: "workflow",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M8 7 11 16M16 7l-3 9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    label: "Workflow automation",
    sub: "Process apps",
    name: "Workflow Automation",
    tag: "Apps that move a process forward — steps, states, and handoffs.",
    items: ["Multi-step workflows", "State machines & statuses", "Task assignment", "Automated notifications", "Integrations & triggers", "SLA & deadline tracking"],
  },
  {
    key: "api",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "APIs & integrations",
    sub: "Connect systems",
    name: "APIs & Integrations",
    tag: "Make your systems talk — cleanly, reliably, documented.",
    items: ["REST / GraphQL APIs", "Third-party integrations", "Webhooks & event handling", "Data sync between systems", "Auth & rate limiting", "API documentation"],
  },
  {
    key: "mobileweb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Mobile-web apps",
    sub: "PWA",
    name: "Mobile-Web Apps (PWA)",
    tag: "App-like experiences on the phone — without an app-store build.",
    items: ["Installable PWA", "Offline support", "Push notifications", "Camera / location access", "Responsive, app-like UI", "One codebase, all devices"],
  },
];

const STACK = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Frontend",
    chips: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Backend",
    chips: ["Node", "Python", "PostgreSQL", "REST / GraphQL"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 16a4 4 0 0 1 .5-8 5.5 5.5 0 0 1 10.5 1.5A3.5 3.5 0 0 1 17 16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Infra & hosting",
    chips: ["Vercel", "AWS", "Supabase", "Docker"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 7h13l3 4v6H3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 7V4h5v3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Services",
    chips: ["Stripe", "Auth0 / Clerk", "Twilio", "OpenAI"],
  },
];

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A founder with a SaaS idea</strong> who needs an MVP in real users&apos; hands — not a 12-month build.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M9 4v5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    text: <><strong>An operations team</strong> duct-taping spreadsheets and five SaaS tools that should be one internal app.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A business needing a client portal</strong> — logins, documents, updates — instead of endless email threads.</>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" />
      </svg>
    ),
    text: <><strong>A data-rich company</strong> that needs dashboards and reporting its current tools can&apos;t deliver.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A company with systems that don&apos;t talk</strong> — needing APIs and integrations to connect them.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>An existing product on shaky code</strong> that needs a rebuild or rescue by a team that documents everything.</>,
    delay: 120,
  },
];

const STEPS = [
  { no: "Week 1", title: "Scoping & build-vs-buy", text: "We map the problem, pressure-test build-vs-buy, and define the smallest useful v1. Honest recommendation first.", delay: 0 },
  { no: "Weeks 1–2", title: "Design & architecture", text: "User flows, wireframes, data model, and tech choices — documented and approved before code.", delay: 70 },
  { no: "Weeks 2–8", title: "Build in sprints", text: "Two-week sprints with working demos each time. You see progress you can click, not status decks.", delay: 140 },
  { no: "Pre-launch", title: "Test & harden", text: "QA, security review, performance testing, and real-user testing before anything goes live.", delay: 210 },
  { no: "Launch+", title: "Ship & hand over", text: "Deploy, document, and hand over the repo and accounts. Optional retainer for iteration & support.", delay: 280 },
];

const TIERS = [
  { name: "Discovery Sprint", best: "A paid scoping engagement — problem mapping, build-vs-buy, architecture, and a fixed build quote.", price: "Published" },
  { name: "MVP Build", best: "The smallest useful version of your product or tool — scoped to ship, in real hands fast.", price: "From published", featured: true, badge: "Most common", delay: 70 },
  { name: "Full Build", best: "A complete application — multiple roles, integrations, billing, and a production-grade launch.", price: "Quoted per scope", delay: 140 },
  { name: "Iteration Retainer", best: "Ongoing features, fixes, and support after launch — a flat monthly engagement.", price: "Published /mo", delay: 210 },
];

const FAQS = [
  { q: "How much does a custom app cost?", a: <>It depends entirely on scope — which is why we start with a paid <strong>Discovery Sprint</strong> that produces a fixed-price build quote. A tight internal tool is a fraction of a multi-role SaaS. You&apos;ll never get an open-ended hourly meter from us.</> },
  { q: "Will you tell me not to build it?", a: <>Yes — regularly. <strong>If an off-the-shelf SaaS solves your problem, we&apos;ll say so</strong> and even help you set it up. We only take builds where custom genuinely wins.</> },
  { q: "How long does an MVP take?", a: <>Most MVPs ship in <strong>6–10 weeks</strong> after the Discovery Sprint. The whole point is to get a small useful version into real hands fast, then iterate on what you learn.</> },
  { q: "Do I own the code?", a: <>Completely. <strong>Repo, infrastructure, and every account are in your name,</strong> with documentation so any developer can maintain it. No lock-in, no black box.</> },
  { q: "What tech do you build on?", a: <>Proven, hireable stacks — <strong>React/Next.js, TypeScript, Node or Python, PostgreSQL,</strong> hosted on Vercel/AWS/Supabase. Boring on purpose, so it&apos;s cheap to run and easy to hire for.</> },
  { q: "Can you rescue an existing project?", a: <>Often, yes. We start with a code audit and an honest assessment: <strong>fixable, or better rebuilt.</strong> Either way you get a documented, maintainable result.</> },
  { q: "Do you build mobile apps?", a: <>We focus on web and mobile-web (PWA) apps that work great on phones. For native iOS/Android, <strong>we&apos;ll tell you honestly whether you need it</strong> — most early products don&apos;t.</> },
  { q: "What happens after launch?", a: <>You own everything and can walk away, keep an in-house dev going, or <strong>put us on an iteration retainer</strong> for features, fixes, and support. Your call, month to month.</> },
  { q: "Can you integrate AI?", a: <>Yes — where it earns its place. We wire in models like OpenAI for real jobs (search, drafting, classification), <strong>not AI for a press release.</strong> Often it&apos;s a v2 feature, not v1.</> },
  { q: "Do you work with our in-house devs?", a: <>Yes — we can build alongside your team, hand off cleanly, or take a specific module. <strong>Clean docs and a readable repo make that painless.</strong></> },
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
          <span className="wa-wd" style={{ transitionDelay: `${i * 55}ms` }}>
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
    const grid = document.querySelector<HTMLElement>(".wa-hero .sd-grid-bg");
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

/* -------- hero signature: app window + scope card -------- */

function AppCard() {
  const reduce = useReducedMotion();
  const [rawRun, setRun] = useState(false);
  const run = reduce || rawRun;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setRun(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside className={`wa-app${run ? " run" : ""}`} aria-label="A sample app and its scoped MVP">
      <div className="wa-app-bar">
        <span className="dots">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span className="url">app.yourproduct.com</span>
      </div>
      <div className="wa-app-ui">
        <div className="wa-app-side">
          <span className="si on"></span>
          <span className="si"></span>
          <span className="si"></span>
          <span className="si"></span>
          <span className="si"></span>
        </div>
        <div className="wa-app-main">
          <div className="amrow head">
            <span className="cell"></span>
            <span className="cell w"></span>
            <span className="chip"></span>
          </div>
          <div className="amrow">
            <span className="cell"></span>
            <span className="cell w"></span>
            <span className="chip b"></span>
          </div>
          <div className="amrow">
            <span className="cell"></span>
            <span className="cell w"></span>
            <span className="chip"></span>
          </div>
          <div className="amrow">
            <span className="cell"></span>
            <span className="cell w"></span>
            <span className="chip b"></span>
          </div>
        </div>
      </div>
      <div className="wa-app-scope">
        <span className="sl">MVP scope · build only what earns its place</span>
        <div className="wa-scoperow">
          <span className="mk yes">{CHECK}</span>
          <span className="lab">Auth &amp; core workflow</span>
          <span className="tag">v1</span>
        </div>
        <div className="wa-scoperow">
          <span className="mk yes">{CHECK}</span>
          <span className="lab">Dashboard &amp; records</span>
          <span className="tag">v1</span>
        </div>
        <div className="wa-scoperow">
          <span className="mk yes">{CHECK}</span>
          <span className="lab">Billing (Stripe)</span>
          <span className="tag">v1</span>
        </div>
        <div className="wa-scoperow later">
          <span className="mk no">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="lab">AI recommendations</span>
          <span className="tag">later</span>
        </div>
      </div>
      <div className="wa-app-foot">
        <span>Ship v1, then iterate</span>
        <span className="gt">you own the code →</span>
      </div>
    </aside>
  );
}

/* -------- what we build: tab list + panel -------- */

function WhatWeBuild() {
  const [active, setActive] = useState<WbKey>("internal");
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
    <Reveal className="wa-wb-wrap" id="what-int">
      <div className="wa-wb-list" role="tablist" aria-label="What we build">
        {WB_ITEMS.map((item, i) => (
          <button
            key={item.key}
            className="wa-wb-btn"
            role="tab"
            type="button"
            id={`wa-tab-${item.key}`}
            aria-selected={item.key === active}
            aria-controls="wa-wb-panel"
            tabIndex={item.key === active ? 0 : -1}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setActive(item.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{item.icon}</span>
            <span className="dn">
              <b>{item.label}</b>
              <small>{item.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="wa-wb-panel" id="wa-wb-panel" role="tabpanel" aria-labelledby={`wa-tab-${current.key}`}>
        <div className="wa-wp-top">
          <span className="big">{current.icon}</span>
          <div>
            <h3>{current.name}</h3>
            <div className="tagline">{current.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in re-runs on every tab change, as the design's re-render did */}
        <div className="wa-wp-body" key={current.key}>
          <span className="k">Typically includes</span>
          <div className="wa-wp-list">
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

export default function WebApplicationsView() {
  useHeroGridParallax();

  return (
    <div className="wa-page">
      <ServiceDetailHero
        compact
        className="wa-hero"
        crumb={{ label: "Website Development", href: "/website-development" }}
        eyebrow="Web apps · SaaS · Internal tools · Portals"
        line1="Custom software,"
        line2={
          <>
            scoped to{" "}
            <span className="grad-text">
              <Scramble text="actually ship." />
            </span>
          </>
        }
        lead={
          <>
            Web applications, SaaS products, internal tools, portals, and dashboards —{" "}
            <strong>scoped tight, built to ship, and owned by you.</strong> We start with an honest build-vs-buy answer,
            build only what earns its place, and hand over everything.
          </>
        }
        primary={{ label: "Book a free scoping call", href: "/start-project" }}
        secondary={{ label: "See what we build ↓", href: "#what" }}
      >
        <AppCard />
      </ServiceDetailHero>

      <TrustBar items={["Honest build-vs-buy first", "Scoped to ship", "Transparent published pricing", "You own the code"]} />

      {/* WHY */}
      <section className="band" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why custom software — carefully</span>
            <h2>
              <Words text="The most expensive thing you can build is the wrong thing." />
            </h2>
            <p>Custom software is powerful and risky. Done right it&apos;s a moat; done wrong it&apos;s a money pit. Here&apos;s how we keep it on the right side.</p>
          </Reveal>
          <FeatureGrid cards={WHY_CARDS} columns={3} />
        </div>
      </section>

      {/* BUILD VS BUY */}
      <section className="band tint" id="buildbuy">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Build vs buy — the honest version</span>
            <h2>
              <Words text="We’ll talk you out of it when we should." />
            </h2>
            <p>Before we quote a build, we pressure-test whether you should build at all. Here&apos;s the split.</p>
          </Reveal>
          <div className="wa-bb-grid">
            <Reveal className="wa-bbcol buy">
              <div className="bh">
                <span className="bi">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  </svg>
                </span>
                <h3>Just buy the SaaS</h3>
              </div>
              <p className="bsub">When an off-the-shelf tool already does it</p>
              <ul>
                {BUY_ITEMS.map((item) => (
                  <li key={item}>
                    <span className="m">{CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="wa-bbcol build" style={d(90)}>
              <div className="bh">
                <span className="bi">
                  <svg viewBox="0 0 24 24" {...stroke}>
                    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
                  </svg>
                </span>
                <h3>Build it custom</h3>
              </div>
              <p className="bsub">When the software is the edge</p>
              <ul>
                {BUILD_ITEMS.map((item) => (
                  <li key={item}>
                    <span className="m">{CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="wa-bb-note">
            Our rule: <strong>if buying solves it, we&apos;ll say so — and help you set the tool up instead.</strong> We only
            take builds where custom genuinely beats off-the-shelf. It&apos;s cheaper for you and better for our reputation.
          </Reveal>
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why custom software projects fail</span>
            <h2>
              <Words text="It’s almost never the code." />
            </h2>
            <p>Six ways custom builds go wrong — and how we&apos;re set up to avoid each one.</p>
          </Reveal>
          <div className="wa-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="wa-pain" key={pain.title} style={d(pain.delay)}>
                <span className="pk">{X_MARK}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="wa-pain-note">
            <span className="mk">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p>
              Our process is built to avoid <span className="gt">every one of these.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="band" id="what">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we build</span>
            <h2>
              <Words text="From internal tools to full SaaS." />
            </h2>
            <p>Eight kinds of software we build most. Pick one to see what&apos;s typically inside.</p>
          </Reveal>
          <WhatWeBuild />
          <Reveal as="p" className="wa-wb-note">
            Not sure which bucket you&apos;re in? <strong>That&apos;s what the scoping call is for</strong> — we&apos;ll
            figure out what you actually need (and whether to build it at all).
          </Reveal>
        </div>
      </section>

      {/* STACK */}
      <section className="band tint" id="stack">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our stack</span>
            <h2>
              <Words text="Boring, proven, and yours to hire for." />
            </h2>
            <p>We pick tech by how maintainable and hireable it is — not by what&apos;s trending on tech Twitter.</p>
          </Reveal>
          <Reveal className="wa-stack-grid">
            {STACK.map((group) => (
              <div className="wa-stackc" key={group.title}>
                <div className="sh">
                  <span className="si">{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="chips">
                  {group.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>
              <Words text="The right fit if you’re…" />
            </h2>
          </Reveal>
          <div className="wa-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="wa-who" key={i} style={d(who.delay)}>
                <span className="wi">{who.icon}</span>
                <p>{who.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>
              <Words text="Scope hard, ship fast, iterate." />
            </h2>
            <p>Every step ends with a real deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="wa-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="wa-step" key={step.title} style={d(step.delay)}>
                <span className="wa-step-no">{step.no}</span>
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
            <h2>
              <Words text="Scoped and quoted before we start." />
            </h2>
            <p>Custom software is genuinely custom — so we scope tightly and give you a fixed price per phase. No open-ended hourly meter.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Builds are quoted as fixed-price phases after the Discovery Sprint —{" "}
            <strong>you approve the scope and price before we write production code.</strong> Hosting and third-party
            services are billed at cost in your own accounts. Every rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="Web Applications & SaaS Development"
        heading="Got an idea? Let’s scope it honestly."
        copy={
          <>
            Book a free scoping call. Tell us the problem — we&apos;ll tell you whether to build or buy, and if it&apos;s a
            build, what the smallest useful version looks like,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation.</strong>
          </>
        }
        primaryLabel="Book a free scoping call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
