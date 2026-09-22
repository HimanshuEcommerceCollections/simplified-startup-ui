"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
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
import "./ce-page.css";

/* -------- shared glyphs -------- */

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_MARK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

const X_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const REPLY_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M10 9V5l-7 7 7 7v-4c5 0 8 2 10 5-1-6-5-11-10-11z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- copy -------- */

const WHY_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Direct to the decision-maker",
    text: <>No algorithms, no ad platforms, no gatekeepers. <strong>Straight into the inbox</strong> of the person who can say yes.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Cheapest cost-per-meeting",
    text: <>Compared to paid ads or SDR salaries, cold email books qualified meetings <strong>at a fraction of the cost.</strong></>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Scales without hiring",
    text: <>One well-run system can <strong>outperform 3–4 SDRs</strong> at 20% of the cost — no headcount, no ramp.</>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Predictable pipeline math",
    text: <>X sent → Y replies → Z meetings. <strong>Once dialed in, you know exactly what more spend produces.</strong></>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Works while you sleep",
    text: <>Sequences run automatically, replies land in your inbox. <strong>You focus on closing, not chasing.</strong></>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Infrastructure decides everything",
    text: <>Cold email in 2026 lives or dies on setup. <strong>Get it right and it works; skip it and every campaign is dead on arrival.</strong></>,
    delay: 120,
  },
];

type Stat = { target: number; suffix: string; label: string; text: string; delay: number };

const STATS: Stat[] = [
  { target: 3.4, suffix: "%", label: "Industry avg reply", text: "The average B2B cold email reply rate across all industries in 2026.", delay: 0 },
  { target: 10.7, suffix: "%+", label: "Top-decile reply", text: "What well-run campaigns with strong infrastructure achieve.", delay: 80 },
  { target: 3, suffix: " wks", label: "Domain warm-up", text: "The minimum time to warm a new sending domain before scaling volume.", delay: 160 },
];

const WRONG = [
  "Sending from your primary company domain (kills reputation)",
  "One inbox, one domain — no scale",
  "Skipped warm-up, straight into cold sends",
  "No SPF / DKIM / DMARC setup",
  "Bought a random list from a “lead vendor”",
  "Templated, generic copy sent to everyone",
  "No reply management — hot leads go cold",
  "80%+ of emails land in spam within 2 weeks",
];

const RIGHT = [
  "Secondary domains, isolated from primary reputation",
  "Multiple domains + inboxes for scale (10–20+)",
  "3-week warm-up before every campaign",
  "SPF, DKIM, DMARC set up on every domain",
  "Custom-built prospect list, verified line-by-line",
  "Personalized copy per persona / industry",
  "Reply management + real-time hot-lead alerts",
  "Sustained inbox placement over 3–6–12 months",
];

type WbKey = "audit" | "infra" | "list" | "copy" | "launch" | "reply" | "report";

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
    key: "audit",
    n: "1",
    label: "Audit & strategy",
    sub: "ICP, offer, roadmap",
    name: "Cold Email Audit & Strategy",
    tag: "Every engagement starts here — goals, ICP, offer, and a plan to hit real reply targets.",
    items: ["ICP definition and refinement", "Offer and messaging audit", "Existing infrastructure & domain review", "Volume + reply-rate targets by month", "90-day roadmap in plain language"],
  },
  {
    key: "infra",
    n: "2",
    label: "Deliverability infra",
    sub: "The 80% that matters",
    name: "Deliverability Infrastructure",
    tag: "The 80% of the work that decides whether every email lands — where competitors cut corners.",
    items: ["Secondary sending domains (never your primary)", "SPF, DKIM, and DMARC authentication", "Google Workspace / Microsoft 365 inboxes", "3-week warm-up period per domain", "Multi-domain, multi-inbox setup for scale", "Ongoing deliverability & blacklist monitoring"],
  },
  {
    key: "list",
    n: "3",
    label: "Prospect list building",
    sub: "Custom, verified",
    name: "Prospect List Building",
    tag: "No bought lists. A custom list matching your ICP exactly — verified, enriched, clean.",
    items: ["Custom list build (up to 5,000/campaign)", "Apollo, Sales Nav, ZoomInfo, Clay sourcing", "Contact verification (bounces under 3%)", "Enrichment: title, size, tech stack, industry", "Intent-signal targeting when available", "Suppression list management"],
  },
  {
    key: "copy",
    n: "4",
    label: "Copy & sequences",
    sub: "Written to be opened",
    name: "Copywriting & Sequence Design",
    tag: "The emails prospects actually open — written for the person, not the persona.",
    items: ["4–7 email sequence structure", "Personalized subject & opening lines", "Custom copy per persona / industry", "Value-first messaging (not pitchy)", "Multiple variations for A/B testing", "CTA optimization (soft ask, hard ask, calendar)"],
  },
  {
    key: "launch",
    n: "5",
    label: "Launch & sending",
    sub: "Monitored daily",
    name: "Campaign Launch & Sending",
    tag: "Launched, monitored, and adjusted daily — no “set it and forget it.”",
    items: ["Platform setup (Instantly, Smartlead, Lemlist, Apollo)", "Volume ramp-up over first 2 weeks", "Daily sending caps per inbox", "Signal-based sending (right time, right prospect)", "Sequence pacing & follow-up automation", "Real-time delivery + open + reply tracking"],
  },
  {
    key: "reply",
    n: "6",
    label: "Reply management",
    sub: "Hot leads, routed",
    name: "Reply Management & Routing",
    tag: "The most-skipped step — so hot leads never sit in an inbox for 3 days.",
    items: ["Reply monitoring & classification", "Hot-lead alerts to your team in real-time", "Calendar link delivery for interested replies", "Follow-up sequences for “not now”", "Automatic suppression of unsubscribes", "CRM logging (HubSpot, Pipedrive, Salesforce)"],
  },
  {
    key: "report",
    n: "7",
    label: "Testing & reporting",
    sub: "Plain-language",
    name: "Testing, Optimization & Reporting",
    tag: "Never just “here’s the dashboard.” A plain-language report every month.",
    items: ["Weekly A/B testing (subjects, hooks, CTAs)", "Monthly deliverability audit & rotation", "Reply-rate & meetings-booked reporting", "Cost-per-meeting tracking", "Live dashboard access", "Quarterly strategy review + roadmap"],
  },
];

type StackItem = { icon: ReactNode; title: string; text: ReactNode; chips: string[] };

const STACK: StackItem[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3a9 9 0 0 1 0 18M3 12h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Sending domains",
    text: "Secondary domains isolated from your primary company reputation.",
    chips: ["Namecheap", "Cloudflare", "GoDaddy"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Inbox providers",
    text: "Verified Google Workspace or Microsoft 365 inboxes on your sending domains.",
    chips: ["Google Workspace", "Microsoft 365"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "DNS authentication",
    text: <>SPF, DKIM, and DMARC records to prove you&apos;re legitimate.</>,
    chips: ["Manual DNS setup", "Monitored monthly"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v6M12 3 9 6M12 3l3 3M5 13a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Warm-up",
    text: "3-week automated warm-up before every campaign or new inbox.",
    chips: ["Instantly Warm-up", "Lemwarm", "Smartlead"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Sending platform",
    text: "Sequence automation, tracking, and inbox rotation.",
    chips: ["Instantly", "Smartlead", "Apollo", "Lemlist"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "List building",
    text: "ICP-matched prospect data, verified and enriched.",
    chips: ["Apollo", "LinkedIn Sales Nav", "ZoomInfo", "Clay"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Deliverability monitoring",
    text: "Weekly reputation, blacklist, and bounce checks.",
    chips: ["Google Postmaster", "MXToolbox", "GlockApps"],
  },
  {
    icon: REPLY_ICON,
    title: "Reply management",
    text: "Real-time reply classification and hot-lead routing.",
    chips: ["Native inboxes", "Zapier", "Your CRM"],
  },
];

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    text: <><strong>A B2B services business</strong> — agency, consultant, freelancer, staffing — booking meetings with target accounts.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A SaaS or software company</strong> driving demos of your product to specific job titles at specific companies.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 8h4M19 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>A recruiting or staffing firm</strong> reaching hiring managers or candidates for open roles.</>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A high-ticket coach or consultant</strong> with a defined offer and a clear target buyer.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M6 9l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A startup validating a market</strong> that needs conversations with real buyers to sharpen the product.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>A team with a strong offer but no engine</strong> — sending manually, on a burned domain, or “doing it in-house” with poor results.</>,
    delay: 120,
  },
];

const STEPS = [
  { no: "Week 1", title: "Audit & setup", text: "ICP and offer audit. Domains registered, inboxes provisioned, SPF/DKIM/DMARC set up. Warm-up begins.", delay: 0 },
  { no: "Weeks 2–3", title: "List build + copy", text: "Custom prospect list built and verified. Sequence copy written and approved. Warm-up continues.", delay: 70 },
  { no: "Week 4", title: "Launch (soft)", text: "First campaign at controlled volume. Deliverability monitored daily. First replies handled.", delay: 140 },
  { no: "Month 2", title: "Ramp", text: "Volume scaled on deliverability signals. A/B tests kick in. Winning sequences expanded.", delay: 210 },
  { no: "Ongoing", title: "Optimize & scale", text: "Weekly A/B tests, monthly deliverability audits, quarterly reviews. Volume grows as reputation compounds.", delay: 280 },
];

const TIERS = [
  { name: "Starter Cold Email", best: "Small businesses or first-time outbound — 2 domains, 4 inboxes, 500 prospects/month.", price: "Published /mo" },
  { name: "Growth Cold Email", best: "Established B2B — 5 domains, 10 inboxes, 2,000 prospects/month, weekly A/B testing.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Cold Email", best: "High-volume outbound — 10+ domains, 20+ inboxes, 5,000+ prospects/month, multi-persona campaigns.", price: "Published /mo", delay: 140 },
  { name: "Cold Email Audit", best: "Deep audit of your existing program — deliverability, copy, list, sequences — no commitment.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "How long before I see results?", a: <>First meetings usually book in <strong>weeks 4–6</strong> (after warm-up + first campaign). Steady monthly flow starts in month 2. Compounding results — better reply rates as sequences optimize — kick in from month 3 onward.</> },
  { q: "How many meetings will I book per month?", a: <>Depends on ICP, offer, and volume. Rough benchmark: <strong>2,000 prospects/month at a 3–5% reply rate + 30% meeting conversion = 20–30 booked meetings.</strong> Better ICPs and offers can double this.</> },
  { q: "Won’t cold email hurt my domain reputation?", a: <>Not if it&apos;s done right. We use <strong>secondary sending domains — never your primary company domain</strong> — so your main reputation is protected. If a secondary domain ever burns out, we rotate it with no impact on your business.</> },
  { q: "Do you buy lists?", a: <>Never. Bought lists are the fastest way to get spam-flagged and destroy your infrastructure. <strong>We build every list custom,</strong> from verified sources (Apollo, LinkedIn Sales Nav, ZoomInfo, Clay), and verify every contact before sending.</> },
  { q: "Is cold email legal?", a: <>In the US, yes — under CAN-SPAM. In the EU, GDPR has strict rules. <strong>We follow the legal requirements for every region we send to</strong> — clear identification, opt-out language, opt-outs honored immediately, no deception.</> },
  { q: "What if my emails still go to spam?", a: <>That&apos;s the deliverability layer we handle constantly. If placement drops, we adjust: <strong>rotate inboxes, refresh warm-up, tighten copy, or swap domains.</strong> It&apos;s baked into the service, not a separate fee.</> },
  { q: "Do I own the domains and lists?", a: <>Yes, 100%. Every domain is registered under your name and paid on your card (at cost). Every list is delivered to you monthly. <strong>If you leave, you keep the entire infrastructure.</strong></> },
  { q: "Can I use my own sending platform?", a: <>Yes — we work with <strong>Instantly, Smartlead, Apollo, Lemlist,</strong> and most modern cold email platforms. Already have a subscription? We plug into it. If not, we&apos;ll recommend one.</> },
  { q: "My current program is underperforming — can you help?", a: <>Start with our audit. Most programs we review have preventable issues — no warm-up, weak SPF/DKIM, terrible copy, bought lists. <strong>The fix list alone usually justifies the audit fee.</strong></> },
  { q: "Do you handle LinkedIn outreach too?", a: <>Yes, as a separate service. Many clients bundle both — <strong>email + LinkedIn together outperforms either channel alone,</strong> especially for high-ticket B2B.</> },
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
          <span className="ce-wd" style={{ transitionDelay: `${i * 55}ms` }}>
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
    const grid = document.querySelector<HTMLElement>(".ce-hero .sd-grid-bg");
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

/* -------- hero signature: inbox / deliverability card -------- */

function InboxCard() {
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
      className={`ce-inbox${run ? " run" : ""}`}
      ariaLabel="A sample email landing in the inbox"
      live="Deliverability · Live"
      corner="PRIMARY, NOT SPAM"
      footLeft="Lands in the inbox"
      footRight="qualified replies →"
    >
      <div className="ce-inbox-tabs">
        <span className="on">Primary</span>
        <span>Promotions</span>
        <span>Spam</span>
      </div>
      <div className="ce-mail">
        <span className="av">A</span>
        <span className="mt">
          <b>Alex — Simplified</b>
          <small>Quick question about your Q3 pipeline…</small>
        </span>
        <span className="land">{CHECK}Inbox</span>
      </div>
      <div className="ce-inbox-auth">
        {["SPF", "DKIM", "DMARC"].map((auth) => (
          <span className="ce-authchip" key={auth}>
            <span className="ok">{CHECK_BOLD}</span> {auth}
          </span>
        ))}
      </div>
      <div className="ce-inbox-place">
        <div className="pl">
          <span>Inbox placement</span>
          <b>98%</b>
        </div>
        <span className="ce-place-track">
          <span className="ce-place-fill"></span>
        </span>
      </div>
      <div className="ce-inbox-reply">
        <span className="ri">{REPLY_ICON}</span>
        <span className="rtx">
          <b>“Happy to chat — how’s Thursday?”</b>
        </span>
        <span className="rtag">Interested</span>
      </div>
    </SignatureCard>
  );
}

/* -------- dark stats with count-up (supports decimals) -------- */

function formatStat(value: number, decimals: boolean, suffix: string) {
  return `${decimals ? value.toFixed(1) : Math.round(value)}${suffix}`;
}

function StatValue({ target, suffix, run, reduce }: { target: number; suffix: string; run: boolean; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const decimals = target % 1 !== 0;

  useEffect(() => {
    if (!run || reduce || !ref.current) return;
    let raf: number;
    let start: number | null = null;
    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = formatStat(eased * target, decimals, suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, suffix, decimals, run, reduce]);

  return (
    <div className="sv" ref={ref}>
      {reduce ? formatStat(target, decimals, suffix) : "0"}
    </div>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  // Design fires the count-up once #stats' top passes 85% of the viewport.
  const [gridRef, gridIn] = useInView<HTMLDivElement>({ threshold: 0, rootMargin: "0px 0px -15% 0px" });

  return (
    <div className="ce-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <Reveal className="ce-stat" key={stat.label} style={d(stat.delay)}>
          <StatValue target={stat.target} suffix={stat.suffix} run={gridIn} reduce={reduce} />
          <span className="sk">{stat.label}</span>
          <p>{stat.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- what's included: tab list + panel -------- */

function Included() {
  const [active, setActive] = useState<WbKey>("audit");
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
    <Reveal className="ce-wb-wrap" id="included-int">
      <div className="ce-wb-list" role="tablist" aria-label="What's included">
        {WB_ITEMS.map((item, i) => (
          <button
            key={item.key}
            className="ce-wb-btn"
            role="tab"
            type="button"
            id={`ce-tab-${item.key}`}
            aria-selected={item.key === active}
            aria-controls="ce-wb-panel"
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
      <div className="ce-wb-panel" id="ce-wb-panel" role="tabpanel" aria-labelledby={`ce-tab-${current.key}`}>
        <div className="ce-wp-top">
          <span className="big">{current.n}</span>
          <div>
            <h3>{current.name}</h3>
            <div className="tagline">{current.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in re-runs on every tab change, as the design's re-render did */}
        <div className="ce-wp-body" key={current.key}>
          <span className="k">What’s inside</span>
          <div className="ce-wp-list">
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

export default function ColdEmailView() {
  useHeroGridParallax();

  return (
    <div className="ce-page">
      <ServiceDetailHero
        compact
        className="ce-hero"
        crumb={{ label: "Sales & Lead Generation", href: "/sales-lead-gen" }}
        eyebrow="Deliverability-first · Done-for-you · Qualified replies"
        line1="Cold email that lands"
        line2={
          <>
            in the{" "}
            <span className="grad-text">
              <Scramble text="inbox." />
            </span>
          </>
        }
        lead={
          <>
            End-to-end cold email programs — domain setup, inbox warm-up, list building, personalized copy, sequence
            management, and reply handling.{" "}
            <strong>Built on deliverability, priced transparently, month-to-month with no lock-in</strong> — and qualified
            replies you can actually close.
          </>
        }
        primary={{ label: "Book a free cold email audit", href: "/start-project" }}
        secondary={{ label: "See how it works ↓", href: "#included" }}
      >
        <InboxCard />
      </ServiceDetailHero>

      <TrustBar items={["Full deliverability stack included", "Transparent published pricing", "Month-to-month", "You own the domains, lists & replies"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why cold email still works</span>
            <h2>
              <Words text="The highest-ROI outbound channel — when done right." />
            </h2>
            <p>
              Cold email got a bad reputation because most people do it badly. With the right infrastructure, targeting, and
              personalization, it&apos;s still the best outbound channel for B2B, agencies, and service businesses.
            </p>
          </Reveal>
          <div className="ce-why">
            <FeatureGrid cards={WHY_CARDS} columns={3} />
          </div>
        </div>
      </section>

      {/* STATS (dark) */}
      <section className="band dark" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The numbers that matter</span>
            <h2>
              <Words text="Three benchmarks to know before you start." />
            </h2>
            <p>What average looks like, what great looks like, and the one timeline you can&apos;t rush.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="ce-stat-note">
            Our target: get every client into the <strong>top decile</strong> — which requires doing the work most agencies
            skip.
          </Reveal>
        </div>
      </section>

      {/* WRONG VS RIGHT */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why most campaigns fail</span>
            <h2>
              <Words text="Cold email doesn’t stop working — it stops landing." />
            </h2>
            <p>
              Most campaigns just stop reaching the inbox. Here&apos;s how the two paths look — we run every campaign the
              &ldquo;done right&rdquo; way.
            </p>
          </Reveal>
          <div className="ce-vs2">
            <Reveal className="ce-vscol wrong">
              <div className="vh">
                <span className="vi">{X_HEAD}</span>
                <h3>Cold email done wrong</h3>
              </div>
              <ul>
                {WRONG.map((item) => (
                  <li key={item}>
                    <span className="m">{X_MARK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="ce-vscol right" style={d(90)}>
              <div className="vh">
                <span className="vi">{CHECK_HEAD}</span>
                <h3>Cold email done right</h3>
              </div>
              <ul>
                {RIGHT.map((item) => (
                  <li key={item}>
                    <span className="m">{CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="ce-vs-note">
            Every campaign we run follows the <strong>&ldquo;done right&rdquo; column.</strong> Every step — because inbox
            placement is the whole game.
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What&apos;s included</span>
            <h2>
              <Words text="The whole program, run by one team." />
            </h2>
            <p>
              Infrastructure, targeting, messaging, sequences, replies — seven parts, nothing handed off. Pick one to see
              what&apos;s inside.
            </p>
          </Reveal>
          <Included />
        </div>
      </section>

      {/* STACK */}
      <section className="band" id="stack">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our infrastructure stack</span>
            <h2>
              <Words text="The technical foundation, managed for you." />
            </h2>
            <p>Everything below is set up and run for you — no DIY, no separate vendor bills. You own it all at the end.</p>
          </Reveal>
          <Reveal className="ce-stack-grid">
            {STACK.map((item) => (
              <div className="ce-stackc" key={item.title}>
                <span className="si">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="chips">
                    {item.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="ce-stack-note">
            <strong>You own everything at the end</strong> — domains, inboxes, lists, and sequences — if you ever want to
            bring it in-house.
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>
              <Words text="Biggest return if you’re…" />
            </h2>
          </Reveal>
          <div className="ce-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="ce-who" key={i} style={d(who.delay)}>
                <span className="wi">{who.icon}</span>
                <p>{who.text}</p>
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
            <h2>
              <Words text="A 4-week ramp to first meetings, then steady flow." />
            </h2>
            <p>Every step ends with a clear deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="ce-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="ce-step" key={step.title} style={d(step.delay)}>
                <span className="ce-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>
              <Words text="One clear price, published up front." />
            </h2>
            <p>No &ldquo;custom quote after a discovery call,&rdquo; no pay-per-lead traps, no long lock-ins.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Domain and inbox costs are separate (typically $50–$150/mo
            depending on scale), passed through at cost. First month may include a one-time setup fee for infrastructure.
            Every rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every program." />

      <CtaBand
        id="start"
        eyebrow="Cold Email Outreach"
        heading="Ready for cold email that actually books meetings?"
        copy={
          <>
            Book a free cold email audit. We&apos;ll look at your current setup (or start fresh), review your ICP and offer,
            and come back with a clear plan and price —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              usually within 48 hours. No obligation, no jargon, no minimum commitment.
            </strong>
          </>
        }
        primaryLabel="Book a free cold email audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
