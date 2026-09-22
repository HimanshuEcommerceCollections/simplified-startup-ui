"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
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
import "./lio-page.css";

/* -------- shared glyphs -------- */

const PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PERSON_ADD = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 8h4M19 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const X_DRAW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const CHECK_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- copy -------- */

const WHY_CARDS = [
  {
    icon: SHIELD,
    title: "Buyers trust the platform",
    text: <>Cold email lands in a spam-suspicious inbox. A connection request lands <strong>where buyers actively check.</strong></>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M6 9l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Reach the decision-maker",
    text: <>No gatekeepers, no shared inboxes. <strong>A direct line to VPs, C-suite, and founders.</strong></>,
    delay: 60,
  },
  {
    icon: PERSON,
    title: "Profile builds credibility first",
    text: <>A polished profile with content behind it turns <strong>“who is this?” into “I already know this person.”</strong></>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Signal-based targeting",
    text: <>Job changes, funding, competitor engagement, hiring — LinkedIn shows you <strong>exactly who’s in-market right now.</strong></>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Content amplifies everything",
    text: <>Prospects see your posts, warm up over weeks, then respond to outreach <strong>ready to talk.</strong></>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Right 100, not most DMs",
    text: <>The teams winning in 2026 aren’t sending more — they’re <strong>sending to the right people, from a profile worth trusting.</strong></>,
    delay: 120,
  },
];

type Stat = {
  /** Counts up on view when set; otherwise `value` is shown as-is. */
  target?: number;
  suffix?: string;
  value?: string;
  label: string;
  text: string;
  delay: number;
};

const STATS: Stat[] = [
  { target: 100, suffix: "/wk", label: "Connection cap", text: "LinkedIn now hard-caps connection requests — quality beats quantity by design.", delay: 0 },
  { value: "18–25%", label: "Acceptance rate", text: "What personalized, targeted requests achieve. Generic requests: 5–10%.", delay: 80 },
  { value: "40–60", label: "Signal-triggered conns", text: "New connections/week targeting post-engagers — vs 10–20 from cold Sales Nav lists.", delay: 160 },
];

const FAILS = [
  { title: "Profiles that scream “sales rep”", text: "Lead with a quota-chasing job title and nobody accepts. The profile has to earn the connection.", delay: 0 },
  { title: "Static lists + spray", text: "Export 5,000 prospects, send everyone the same message, watch acceptance crater at 5%.", delay: 60 },
  { title: "Aggressive automation", text: "Cloud tools that mimic behavior still violate ToS. Ban risk is real — and permanent.", delay: 120 },
  { title: "Pitching in the request", text: "The fastest way to get declined. The request opens the door; it doesn’t make the sale.", delay: 0 },
  { title: "No content behind it", text: "Prospects click your profile, see zero posts, decide you’re just another cold DM, and ignore you.", delay: 60 },
  { title: "Reply management drops it", text: "Hot leads sit for 3 days. By the time you reply, they’ve already moved on.", delay: 120 },
];

const PILLARS = [
  {
    n: "1",
    title: "Profile",
    desc: "A profile that earns the click, the accept, and the reply — before you send anything.",
    items: ["Headline rewrite (results, not job title)", "About section optimized", "Featured section built out", "Banner + photo refresh", "Recommendations strategy"],
    delay: 0,
  },
  {
    n: "2",
    title: "Outreach",
    desc: "Signal-based prospecting + personalized sequences — sent safely from your profile.",
    items: ["Sales Nav prospecting", "Signal-based targeting", "Connection request writing", "Follow-up sequences", "InMail campaigns"],
    delay: 80,
  },
  {
    n: "3",
    title: "Content",
    desc: "Posts and comments that warm prospects up before outreach even hits them.",
    items: ["Ghostwritten thought leadership", "Weekly post cadence", "Strategic comment engagement", "Video and voice notes", "Content-to-DM funnels"],
    delay: 160,
  },
];

type WbKey = "audit" | "profile" | "prospect" | "seq" | "content" | "safe" | "reply" | "report";

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
    sub: "SSI baseline, ICP",
    name: "LinkedIn Audit & Strategy",
    tag: "Every engagement starts here — a full look at your profile, activity, ICP, and offer.",
    items: ["Profile audit + Social Selling Index (SSI) baseline", "Existing outreach activity review", "ICP definition and refinement", "Offer and messaging audit", "90-day roadmap in plain language", "Meeting and connection targets locked"],
  },
  {
    key: "profile",
    n: "2",
    label: "Profile optimization",
    sub: "Earn the click",
    name: "Profile Optimization",
    tag: "Before any outreach, we make your profile earn the click — because a weak profile sinks every campaign.",
    items: ["Headline rewrite (results, not job title)", "About section rewrite (buyer-focused)", "Experience section optimization", "Featured section (lead magnets / case studies)", "Custom banner design", "Recommendations request strategy"],
  },
  {
    key: "prospect",
    n: "3",
    label: "Sales Nav prospecting",
    sub: "The right 100",
    name: "Sales Navigator Prospecting",
    tag: "The right 100 prospects per week — not just any 100.",
    items: ["Sales Navigator setup and search build", "ICP-precise lists (50+ filters)", "Boolean search strings", "Signal-based lists (job change, funding, hiring)", "Group + Event member sourcing", "Suppression list management"],
  },
  {
    key: "seq",
    n: "4",
    label: "Requests & sequences",
    sub: "Accepted & replied",
    name: "Connection Requests & Sequences",
    tag: "The words that get you accepted and get a reply — personalized, human-approved.",
    items: ["Personalized connection request (with note)", "3–4 touch DM sequence", "InMail for 2nd/3rd-degree targets", "Voice note templates for warm threads", "Video message support (Vidyard, Loom)", "A/B testing hooks, angles, CTAs"],
  },
  {
    key: "content",
    n: "5",
    label: "Content & branding",
    sub: "Warm before outreach",
    name: "Content & Personal Branding",
    tag: "Content is what makes outreach work — prospects check your profile before they reply.",
    items: ["Weekly ghostwritten posts (2–4/week)", "Content pillars aligned to ICP pain points", "Comment campaigns on prospect posts", "Engagement pods coordination (optional)", "Repurposing top posts into DM openers", "Founder / exec content development"],
  },
  {
    key: "safe",
    n: "6",
    label: "Compliant sending",
    sub: "Account safety",
    name: "Safe LinkedIn-Compliant Sending",
    tag: "Account safety is non-negotiable — healthy profile, not aggressive automation.",
    items: ["Under-the-cap sending (80–100/week max)", "Human-approved messaging (no auto-send)", "Dedicated residential IPs when tools are used", "SSI score monitoring", "Warm-up for new or dormant profiles", "Full compliance with LinkedIn ToS"],
  },
  {
    key: "reply",
    n: "7",
    label: "Reply management",
    sub: "Hot leads, routed",
    name: "Reply Management & Lead Routing",
    tag: "Every reply reviewed and either progressed or handed to you — hot leads never sit for days.",
    items: ["Daily reply monitoring & classification", "Interested-lead escalation same day", "Calendar link delivery for qualified prospects", "Nurture sequences for “not now”", "CRM logging (HubSpot, Salesforce, Pipedrive, GHL)", "Meeting booking direct to your calendar"],
  },
  {
    key: "report",
    n: "8",
    label: "Reporting",
    sub: "Real outcomes",
    name: "Reporting & Optimization",
    tag: "Reports tied to real outcomes — connections, replies, meetings, pipeline.",
    items: ["Weekly snapshot (connects, replies, meetings)", "Monthly campaign report + strategy review", "A/B test results and winning sequences", "SSI tracking", "Cost-per-meeting reporting", "Live dashboard access"],
  },
];

type StackItem = { icon: ReactNode; title: string; text: string; chips: string[] };

const STACK: StackItem[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Prospecting",
    text: "ICP-precise list building with advanced filters and signals.",
    chips: ["Sales Navigator", "Apollo", "Clay"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16v13H4zM4 7l3-3h10l3 3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Data enrichment",
    text: "Verify emails, phones, and company data for cross-channel outreach.",
    chips: ["Apollo", "Clay", "ZoomInfo", "RocketReach"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Outreach automation",
    text: "Human-behavior tools that stay within LinkedIn limits.",
    chips: ["Heyreach", "Expandi", "Dripify", "La Growth Machine"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Signal detection",
    text: "Real-time alerts for job changes, funding, hiring, engagement.",
    chips: ["Sales Nav alerts", "Clay", "RB2B"],
  },
  {
    icon: CALENDAR,
    title: "Content scheduling",
    text: "Post scheduling and analytics for LinkedIn content.",
    chips: ["Taplio", "Buffer", "Hootsuite", "Native"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 2v4M16 2v4M3 9h18m-11 4 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "CRM & booking",
    text: "Route qualified replies to your calendar and CRM.",
    chips: ["HubSpot", "Salesforce", "Chili Piper", "Calendly"],
  },
];

const STEPS = [
  { no: "Week 1", title: "Audit + profile overhaul", text: "Full audit & rewrite (headline, about, featured, banner). ICP workshop. Sales Nav setup. Signal-based list built.", delay: 0 },
  { no: "Week 2", title: "Sequences + content", text: "Connection & follow-up sequences written and approved. First posts scheduled. Comment campaign begins.", delay: 70 },
  { no: "Weeks 3–4", title: "Soft launch", text: "First 100 requests sent (well under the cap). Replies handled daily. First meetings usually book by week 4.", delay: 140 },
  { no: "Month 2", title: "Ramp", text: "Volume scaled on acceptance & reply quality. Winning sequences expanded. Content cadence maintained.", delay: 210 },
  { no: "Ongoing", title: "Optimize & scale", text: "Weekly A/B tests, monthly reviews, signal-based targeting expanded. Content compounds warm interest.", delay: 280 },
];

const WHO = [
  {
    icon: SHIELD,
    text: <><strong>A B2B services business</strong> — agency, consultant, freelancer, staffing — selling to decision-makers who live on LinkedIn.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>A SaaS or software company</strong> booking demos with specific job titles at specific companies.</>,
    delay: 60,
  },
  {
    icon: PERSON,
    text: <><strong>A founder or exec</strong> who wants a personal brand that generates inbound and outbound at the same time.</>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A high-ticket coach or consultant</strong> with a defined offer and an audience active on LinkedIn.</>,
    delay: 0,
  },
  {
    icon: PERSON_ADD,
    text: <><strong>A recruiting or staffing firm</strong> reaching hiring managers or passive candidates.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>A team burned by risky automation</strong> that wants LinkedIn done right — without a banned account.</>,
    delay: 120,
  },
];

const TIERS = [
  { name: "Starter LinkedIn", best: "Solo founders + small teams — profile optimization, outreach only, 1 profile.", price: "Published /mo" },
  { name: "Growth LinkedIn", best: "Growing teams — outreach + weekly content, up to 3 profiles, signal-based targeting.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale LinkedIn", best: "Larger teams — full 3-pillar system, 5+ profiles, comment & InMail campaigns, multi-persona.", price: "Published /mo", delay: 140 },
  { name: "LinkedIn Audit", best: "Deep audit of your profile, content, and outreach — no commitment.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "How many meetings per month?", a: <>Rough benchmark: 100 well-targeted connections/week + 20% acceptance + 15% reply = <strong>3–6 meetings/month.</strong> Growth and Scale tiers with content and signal-based targeting typically book <strong>8–15+</strong>.</> },
  { q: "Will my account get banned?", a: <>Not if it’s done right. We stay well under the cap (<strong>80–100 requests/week,</strong> not the 200 hard limit), use compliant patterns, approved tools, and residential IPs. Bans happen when agencies push volume — we don’t.</> },
  { q: "Do you post on my behalf?", a: <>Yes — that’s the Content pillar. We ghostwrite posts in your voice, aligned to your ICP’s pain points. <strong>You review and approve before anything goes live.</strong></> },
  { q: "Do I need Sales Navigator?", a: <>Yes — it’s essential for advanced prospecting, filters, and lead alerts. Roughly <strong>$99/mo per profile, paid directly to LinkedIn</strong> (not marked up). We set it up during onboarding.</> },
  { q: "Do you take over my account?", a: <>We use secure access (approved tools or shared access if you prefer). <strong>You retain full ownership and control</strong> — we never change your password or lock you out.</> },
  { q: "How is this different from cold email?", a: <>LinkedIn wins when your buyer is spam-suspicious of email or checks LinkedIn more. Email wins on volume and inbox placement. <strong>Best answer: run both together</strong> — they outperform either alone.</> },
  { q: "I already have a strong presence — still useful?", a: <>Great — we build on it. If your profile and content are solid, we focus on <strong>Sales Nav prospecting, signal-based targeting, and DM sequences,</strong> priced accordingly.</> },
  { q: "Do you use aggressive automation?", a: <>No. Cloud tools that mimic behavior still violate ToS and risk permanent bans. We use <strong>manual review, human approval, under-cap sending, and residential IPs</strong> when tools are needed.</> },
  { q: "Can this work for my whole team?", a: <>Yes — Growth covers up to 3 profiles, Scale covers 5+. <strong>Each profile gets its own optimization, prospecting, and messaging</strong> — great for founder + sales team or multi-persona.</> },
  { q: "What if my profile gets restricted?", a: <>Rare with our compliant approach — but if it happens we <strong>pause immediately, work with LinkedIn to lift it, and adjust.</strong> Ban risk is exactly why we don’t use aggressive automation.</> },
  { q: "Do I own everything if I leave?", a: <>Yes — you keep every tool subscription, account, and all your data. <strong>No lock-in.</strong></> },
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
          <span className="lio-wd" style={{ transitionDelay: `${i * 55}ms` }}>
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
    const grid = document.querySelector<HTMLElement>(".lio-hero .sd-grid-bg");
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

/* -------- hero signature: optimized profile + outreach flow -------- */

function ProfileCard() {
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
      className={`lio-li${run ? " run" : ""}`}
      ariaLabel="A sample optimized LinkedIn profile and outreach flow"
      live="Your profile · Optimized"
      corner="UNDER THE CAP"
      footLeft="Profile + outreach + content"
      footRight="compliant, from your profile →"
    >
      <div className="lio-li-banner"></div>
      <div className="lio-li-prof">
        <span className="pfp">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="2" />
            <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="pn">
          <b>Jordan Reyes</b>
          <small>Helping B2B ops teams cut cost-per-lead 40% · Founder</small>
        </span>
      </div>
      <div className="lio-li-ssi">
        <span className="ss-lab">Social Selling Index</span>
        <span className="ss-track">
          <span className="ss-fill"></span>
        </span>
        <span className="ss-val">87</span>
      </div>
      <div className="lio-li-flow">
        <div className="lio-lf">
          <span className="lfi">{PERSON_ADD}</span>
          <span className="lft">
            Connection request — <b>Sarah, VP Ops</b>
            <small>personalized, signal-based</small>
          </span>
          <span className="lst ok">Accepted</span>
        </div>
        <div className="lio-lf">
          <span className="lfi">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="lft">“Saw your post on RevOps — would love to compare notes.”</span>
          <span className="lst ok">Replied</span>
        </div>
        <div className="lio-lf">
          <span className="lfi">{CALENDAR}</span>
          <span className="lft">
            Meeting — <b>Thu 2:00 PM</b>
          </span>
          <span className="lst book">Booked</span>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- dark stats with count-up -------- */

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
    <div className="lio-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <Reveal className="lio-stat" key={stat.label} style={d(stat.delay)}>
          {stat.target !== undefined ? (
            <StatValue target={stat.target} suffix={stat.suffix ?? ""} run={gridIn} reduce={reduce} />
          ) : (
            <div className="sv">{stat.value}</div>
          )}
          <span className="sk">{stat.label}</span>
          <p>{stat.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- 3-pillar system (tilt cards) -------- */

function Pillars() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div className="lio-pil-grid" ref={gridRef}>
      {PILLARS.map((pil) => (
        <Reveal as="article" className="lio-pil" key={pil.title} data-tilt style={d(pil.delay)}>
          <span className="lio-pil-spot"></span>
          <div className="pnum">{pil.n}</div>
          <h3>{pil.title}</h3>
          <p className="pd">{pil.desc}</p>
          <ul>
            {pil.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
    <Reveal className="lio-wb-wrap" id="included-int">
      <div className="lio-wb-list" role="tablist" aria-label="What's included">
        {WB_ITEMS.map((item, i) => (
          <button
            key={item.key}
            className="lio-wb-btn"
            role="tab"
            type="button"
            id={`lio-tab-${item.key}`}
            aria-selected={item.key === active}
            aria-controls="lio-wb-panel"
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
      <div className="lio-wb-panel" id="lio-wb-panel" role="tabpanel" aria-labelledby={`lio-tab-${current.key}`}>
        <div className="lio-wp-top">
          {/* the design renders a fixed person glyph here for every tab */}
          <span className="big">{PERSON}</span>
          <div>
            <h3>{current.name}</h3>
            <div className="tagline">{current.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in re-runs on every tab change, as the design's re-render did */}
        <div className="lio-wp-body" key={current.key}>
          <span className="k">What’s inside</span>
          <div className="lio-wp-list">
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

export default function LinkedinOutreachView() {
  useHeroGridParallax();

  return (
    <div className="lio-page">
      <ServiceDetailHero
        compact
        className="lio-hero"
        crumb={{ label: "Sales & Lead Generation", href: "/sales-lead-gen" }}
        eyebrow="Profile · Outreach · Content · One complete system"
        line1="LinkedIn lead gen that"
        line2={
          <>
            gets{" "}
            <span className="grad-text">
              <Scramble text="meetings." />
            </span>
          </>
        }
        lead={
          <>
            Managed LinkedIn outreach for B2B teams — profile optimization, Sales Navigator prospecting, signal-based
            targeting, personalized messaging, and content behind every campaign.{" "}
            <strong>Run safely from your own profile. Flat monthly fee, no risk-your-account automation.</strong>
          </>
        }
        primary={{ label: "Book a free LinkedIn audit", href: "/start-project" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <ProfileCard />
      </ServiceDetailHero>

      <TrustBar items={["LinkedIn-compliant outreach", "Profile + outreach + content together", "Transparent published pricing", "Month-to-month"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why LinkedIn is still your best B2B channel</span>
            <h2>
              <Words text="1.3 billion members — your buyer is one of them." />
            </h2>
            <p>
              They’re checking the feed every morning, reviewing profiles before meetings, judging vendors by their
              presence. Here’s why LinkedIn still beats every other B2B channel when it’s done right.
            </p>
          </Reveal>
          <div className="lio-why">
            <FeatureGrid cards={WHY_CARDS} columns={3} />
          </div>
        </div>
      </section>

      {/* STATS (dark) */}
      <section className="band dark" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 2026 LinkedIn numbers</span>
            <h2>
              <Words text="Everyone caps at 100. It’s who sends to the right 100." />
            </h2>
            <p>Three benchmarks every LinkedIn outreach buyer should know before starting a program.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="lio-stat-note">
            The differentiator in 2026 isn’t “who sends the most.” Everyone caps at 100.{" "}
            <strong>It’s who sends to the right 100.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHY FAILS */}
      <section className="band" id="fails">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why most LinkedIn outreach fails</span>
            <h2>
              <Words text="Most agencies still run the 2021 playbook." />
            </h2>
            <p>
              Here’s what goes wrong — and what actually works in 2026. We fix every one of these; that’s the whole
              service.
            </p>
          </Reveal>
          <div className="lio-dont-grid">
            {FAILS.map((item) => (
              <Reveal className="lio-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{X_DRAW}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lio-dont-note">
            <span className="mk">{CHECK_HEAD}</span>
            <p>
              We fix <strong>every one of these.</strong> That’s the whole service.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3-PILLAR SYSTEM */}
      <section className="band tint" id="system">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 3-pillar LinkedIn system</span>
            <h2>
              <Words text="Profile + outreach + content — together." />
            </h2>
            <p>Any one on its own underperforms. All three together compound. That’s the whole point.</p>
          </Reveal>
          <Pillars />
          <Reveal as="p" className="lio-pil-note">
            Outreach without content gets ignored. Content without outreach produces no meetings.{" "}
            <strong>The combination is the whole point.</strong>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>
              <Words text="Every part, run by one team." />
            </h2>
            <p>Profile, prospecting, messaging, content, replies — eight parts, nothing handed off. Pick one to see inside.</p>
          </Reveal>
          <Included />
        </div>
      </section>

      {/* TOOLS */}
      <section className="band tint" id="tools">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Tools &amp; platforms we use</span>
            <h2>
              <Words text="Only LinkedIn-compliant tools — no black-hat." />
            </h2>
            <p>
              The stack we run every program on. You keep ownership of every subscription — leave and you keep the
              accounts and data.
            </p>
          </Reveal>
          <Reveal className="lio-stack-grid">
            {STACK.map((item) => (
              <div className="lio-stackc" key={item.title}>
                <div className="sh">
                  <span className="si">{item.icon}</span>
                  <h3>{item.title}</h3>
                </div>
                <p className="sd">{item.text}</p>
                <div className="chips">
                  {item.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="lio-stack-note">
            <strong>You keep ownership of every tool subscription.</strong> If you leave, you keep the accounts and data
            — no lock-in.
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>
              <Words text="A 30-day ramp to first meetings." />
            </h2>
            <p>Every step ends with a clear deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="lio-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="lio-step" key={step.title} style={d(step.delay)}>
                <span className="lio-step-no">{step.no}</span>
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
          <div className="lio-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="lio-who" key={i} style={d(who.delay)}>
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
              <Words text="One clear price, published up front." />
            </h2>
            <p>No per-meeting fees, no long lock-ins, no aggressive automation shortcuts.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Sales Navigator (~$99/mo per profile) and outreach-tool
            subscriptions passed through at cost. First month may include a one-time setup fee for the profile overhaul.
            Every rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        id="start"
        eyebrow="LinkedIn Outreach & Lead Generation"
        heading="Ready for LinkedIn that actually books meetings?"
        copy={
          <>
            Book a free LinkedIn audit. We’ll review your profile, your ICP, and your current activity, and come back with
            a clear plan and price —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              usually within 48 hours. No obligation, no jargon, no risk-your-account tactics.
            </strong>
          </>
        }
        primaryLabel="Book a free LinkedIn audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
