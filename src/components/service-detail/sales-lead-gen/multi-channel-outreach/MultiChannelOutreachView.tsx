"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FeatureGrid, ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./mco-page.css";

/* -------- channel palette (design's --ch-* tokens) -------- */

const CH = {
  email: "#2563eb",
  li: "#0e7490",
  phone: "#d97706",
  video: "#7c3aed",
  sms: "#0891b2",
  ads: "#4f46e5",
} as const;

type Channel = keyof typeof CH;

/* -------- shared glyphs -------- */

const ICON_LI = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11v5M8 8v.01M12 16v-3a2 2 0 0 1 4 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_EMAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_VIDEO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m16 10 5-3v10l-5-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_SMS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h13v9H8l-4 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const ICON_CAL_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const ICON_LIST = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CHANNEL_ICON: Record<Channel, ReactNode> = {
  email: ICON_EMAIL,
  li: ICON_LI,
  phone: ICON_PHONE,
  video: ICON_VIDEO,
  sms: ICON_SMS,
  ads: ICON_TARGET,
};

const CHANNEL_NAME: Record<Channel, string> = {
  email: "Email",
  li: "LinkedIn",
  phone: "Phone",
  video: "Video",
  sms: "SMS",
  ads: "Retargeting Ads",
};

const cc = (channel: Channel): CSSProperties => ({ "--cc": CH[channel] } as CSSProperties);

/* -------- copy -------- */

const SEQ_STEPS: { ch: Channel; title: string; sub: string; day: string }[] = [
  { ch: "li", title: "Profile view + follow", sub: "Your name shows up first", day: "Day 1" },
  { ch: "email", title: "Personalized email", sub: "Tied to a real trigger", day: "Day 2" },
  { ch: "phone", title: "First call + voicemail", sub: "Brief, no pitch", day: "Day 5" },
  { ch: "video", title: "60-sec personalized video", sub: "Pattern interrupt", day: "Day 8" },
];

const WHY_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Familiarity drives replies",
    text: <>A buyer who saw your profile, then your email, then your voicemail is <strong>far more likely to respond.</strong></>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Every buyer has a favorite",
    text: <>Some live in email, some on LinkedIn, <strong>some only pick up the phone.</strong></>,
    delay: 80,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Less pressure on any one channel",
    text: <>Fewer emails per prospect <strong>protects deliverability and your domain.</strong></>,
    delay: 160,
  },
];

const CADENCE: { day: string; ch: Channel; text: string }[] = [
  { day: "Day 1", ch: "li", text: "Profile view and follow. Your name shows up first." },
  { day: "Day 2", ch: "email", text: "Short, personalized first email tied to a real trigger." },
  { day: "Day 3", ch: "li", text: "Connection request, no pitch attached." },
  { day: "Day 5", ch: "phone", text: "First call. Brief voicemail if no answer." },
  { day: "Day 6", ch: "email", text: "Follow-up that references the voicemail." },
  { day: "Day 8", ch: "video", text: "60-second personalized video about their business." },
  { day: "Day 10", ch: "li", text: "Helpful message with an insight or resource." },
  { day: "Day 12", ch: "phone", text: "Second call at a different time of day." },
  { day: "Day 14", ch: "email", text: "Short case study from a similar company." },
  { day: "Day 16", ch: "li", text: "Comment on their post or send a voice note." },
  { day: "Day 19", ch: "phone", text: "Final call attempt with a clear next step." },
  { day: "Day 21", ch: "email", text: "Polite breakup email that leaves the door open." },
];

const CADENCE_KEY: Channel[] = ["email", "li", "phone", "video"];

const ROLES: { ch: Channel; role: string; text: string }[] = [
  { ch: "email", role: "Role: Scale & detail", text: "Carries the core message, proof, and case studies. Reaches the most prospects with the most context." },
  { ch: "li", role: "Role: Credibility", text: "Puts a real face behind the email. Buyers check your profile before they reply, so it has to look sharp." },
  { ch: "phone", role: "Role: Conversation", text: "The fastest route to a real conversation. Great for qualifying and handling objections live." },
  { ch: "video", role: "Role: Pattern interrupt", text: "A short personalized video stands out in a crowded inbox and shows you did your homework." },
  { ch: "sms", role: "Role: Confirmation", text: "Used only after opt-in or a booked meeting, to confirm times and cut no-shows." },
  { ch: "ads", role: "Role: Air cover", text: "Keeps your brand in front of prospects between touches, so every message feels familiar." },
];

const SIGNALS: { if: string; then: ReactNode; done?: boolean }[] = [
  { if: "Open your email 3+ times", then: <>Move them to the <b>top of the call list</b> for that day.</> },
  { if: "View your LinkedIn profile", then: <>Send a short, relevant message <b>within 24 hours.</b></> },
  { if: "Visit your pricing or case-study page", then: <>Switch them into a <b>priority sequence</b> with a direct meeting ask.</> },
  { if: "Reply “not right now”", then: <>Pause outreach and <b>schedule a check-in</b> for the month they suggest.</> },
  { if: "Change jobs", then: <>Congratulate them and <b>restart outreach at their new company.</b></> },
  { if: "Book a meeting", then: <>Stop all sequences, send confirmations, and <b>hand your team a prep brief.</b></>, done: true },
];

const MIX_ROWS = [
  { buyer: "SMB founders & owners", lead: "Email, Phone", support: "LinkedIn, Video", why: "Owners answer their own phones and inboxes" },
  { buyer: "Mid-market VPs & Directors", lead: "Email, LinkedIn", support: "Phone, Video", why: "Active on LinkedIn, busy on calls" },
  { buyer: "Enterprise C-suite", lead: "LinkedIn, Video", support: "Email, Retargeting", why: "Needs personalized, low-volume outreach" },
  { buyer: "Agency & consulting buyers", lead: "LinkedIn, Email", support: "Video", why: "Relationship-driven, value credibility" },
  { buyer: "Local & service businesses", lead: "Phone, Email", support: "SMS (opt-in)", why: "Phone is still the fastest path to a decision" },
];

const DONT = [
  { title: "Blast the same message everywhere", text: <><strong>Each touch adds something new</strong>, never the same pitch copy-pasted across four channels.</>, delay: 0 },
  { title: "Chase after a clear no", text: <><strong>Opt-outs are honored across every channel instantly.</strong> No means no, everywhere.</>, delay: 60 },
  { title: "Send SMS without consent", text: <>Texts are only used <strong>after opt-in or a booked meeting</strong>, never cold.</>, delay: 0 },
  { title: "Outsource calls to script-only centers", text: <><strong>Trained SDRs who understand your offer</strong> handle every call, not a call-center reading a script.</>, delay: 60 },
];

type WbKey = "strategy" | "data" | "setup" | "copy" | "exec" | "crm" | "report";

type WbItem = { key: WbKey; n: string; label: string; sub: string; name: string; tag: string; items: string[] };

const WB_ITEMS: WbItem[] = [
  {
    key: "strategy",
    n: "1",
    label: "Strategy & ICP",
    sub: "Channel mix & cadence",
    name: "Strategy & ICP",
    tag: "The plan behind the sequence: who we target, on which channels, in what order.",
    items: ["ICP and buyer persona definition", "Channel mix and cadence design", "Messaging angles per persona", "Success metrics and meeting criteria"],
  },
  {
    key: "data",
    n: "2",
    label: "Data & list building",
    sub: "Verified + enriched",
    name: "Data & List Building",
    tag: "Verified, enriched prospect lists, with the triggers that make outreach relevant.",
    items: ["Targeted lists (Apollo, Clay, Sales Navigator)", "Verified emails and direct-dial numbers", "Trigger and intent data enrichment", "Do-not-contact & existing-customer suppression"],
  },
  {
    key: "setup",
    n: "3",
    label: "Channel setup",
    sub: "Domains, LI, calling, video",
    name: "Channel Setup",
    tag: "Every channel configured to send safely and look sharp before launch.",
    items: ["Email domains, inboxes, SPF/DKIM/DMARC, warmup", "LinkedIn profile optimization for senders", "Calling setup with local-presence numbers", "Video tool setup (Loom, Vidyard, Sendspark)", "Retargeting audience sync (optional)"],
  },
  {
    key: "copy",
    n: "4",
    label: "Copy & content",
    sub: "Per channel",
    name: "Copy & Content",
    tag: "Every channel gets its own message, each touch adds something new.",
    items: ["Email sequences with personalization variables", "LinkedIn connection notes and messages", "Call scripts, voicemail scripts, objection handling", "Personalized video scripts"],
  },
  {
    key: "exec",
    n: "5",
    label: "Execution",
    sub: "Live SDRs + triggers",
    name: "Execution",
    tag: "Coordinated across channels and reacting to signals, with real people on the calls.",
    items: ["Coordinated sequences across all channels", "Signal-based triggers and routing", "Live calling by trained SDRs", "Reply handling and meeting booking"],
  },
  {
    key: "crm",
    n: "6",
    label: "CRM & handoff",
    sub: "Prep brief per meeting",
    name: "CRM & Handoff",
    tag: "Every touch logged, every meeting handed over ready to run.",
    items: ["Every touch logged (HubSpot, Salesforce, Pipedrive, GoHighLevel)", "Meeting prep brief for every booked call", "Calendar invites and reminders"],
  },
  {
    key: "report",
    n: "7",
    label: "Reporting",
    sub: "By channel",
    name: "Reporting",
    tag: "See what’s working by channel, and what we’re changing next.",
    items: ["Weekly performance summary by channel", "Meetings booked, held, and qualified", "Channel and message A/B test results", "Monthly strategy review"],
  },
];

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>B2B SaaS companies</strong> that need a steady flow of demos beyond inbound.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>Agencies & consultancies</strong> selling high-value retainers to decision-makers.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>Teams whose cold email has plateaued</strong> and need new channels to lift reply rates.</>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>Founders without an SDR team</strong> who want pipeline without hiring and training reps.</>,
    delay: 180,
  },
];

const STEPS = [
  { no: "Week 1", title: "Strategy & setup", text: "ICP workshop, channel mix, and cadence design. Domains, inboxes, and calling numbers set up and warming.", delay: 0 },
  { no: "Week 2", title: "Lists & copy", text: "Prospect lists built and verified. Emails, LinkedIn messages, call scripts, and video scripts written and approved by you.", delay: 80 },
  { no: "Week 3", title: "Launch", text: "First sequences go live across all channels. Signal triggers switched on. Daily monitoring during ramp-up.", delay: 160 },
  { no: "Ongoing", title: "Optimize", text: "Weekly testing on messages, timing, and channel mix. Winning combinations scaled, weak ones cut.", delay: 240 },
];

const FAQS = [
  {
    q: "How much does multi-channel outreach cost?",
    a: <>It depends on the number of channels, prospects per month, and whether live calling is included. <strong>We share exact pricing on the strategy call</strong> once we understand your goals.</>,
  },
  {
    q: "How is this different from cold email or LinkedIn alone?",
    a: <>Single-channel outreach relies on one touchpoint to do all the work. Multi-channel coordinates email, LinkedIn, phone, and video so <strong>each touch reinforces the others</strong>, usually more replies from the same list.</>,
  },
  {
    q: "Who makes the phone calls?",
    a: <><strong>Trained SDRs on our team</strong> who learn your offer, ICP, and objections before making a single call. Calls are recorded and reviewed for quality.</>,
  },
  {
    q: "Will this hurt my domain or LinkedIn account?",
    a: <>No. We use <strong>separate sending domains, proper warmup, and safe daily limits</strong> on LinkedIn. Spreading touches across channels also means fewer emails per prospect.</>,
  },
  {
    q: "How soon will we see meetings?",
    a: <>Most clients see first replies in the <strong>first week after launch</strong> and booked meetings within 2–4 weeks. Results improve as we learn which channels and messages work for your buyers.</>,
  },
  {
    q: "Do you sync everything to our CRM?",
    a: <>Yes: every touch is logged in <strong>HubSpot, Salesforce, Pipedrive, or GoHighLevel,</strong> with a meeting prep brief, calendar invites, and reminders for every booked call.</>,
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
          <span className="mco-wd" style={{ transitionDelay: `${i * 55}ms` }}>
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
    const grid = document.querySelector<HTMLElement>(".mco-hero .sd-grid-bg");
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

/* -------- hero signature: coordinated sequence card -------- */

function SequenceCard() {
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
      className={`mco-seq${run ? " run" : ""}`}
      ariaLabel="A sample coordinated outreach sequence"
      live="Coordinated sequence"
      corner="4 CHANNELS · 1 CADENCE"
      footLeft="Signal-based, human, not spammy"
      footRight="synced to your CRM →"
    >
      <div className="mco-seq-body">
        {SEQ_STEPS.map((step) => (
          <div className={`mco-st ${step.ch}`} key={step.day}>
            <span className="ic">{CHANNEL_ICON[step.ch]}</span>
            <span className="sc">
              <b>{step.title}</b>
              <small>{step.sub}</small>
            </span>
            <span className="day">{step.day}</span>
          </div>
        ))}
      </div>
      <div className="mco-seq-book">
        <span className="bk">{ICON_CAL_CHECK}</span>
        <span className="bt">
          <b>Meeting booked:</b> all sequences stop, prep brief sent.
        </span>
      </div>
    </SignatureCard>
  );
}

/* -------- what's included: tab list + panel -------- */

function Included() {
  // The design's script initialises on a key that does not exist ("audit"); the
  // button marked aria-selected in the markup is "strategy", so we start there.
  const [active, setActive] = useState<WbKey>("strategy");
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
    <Reveal className="mco-wb-wrap" id="included-int">
      <div className="mco-wb-list" role="tablist" aria-label="What's included">
        {WB_ITEMS.map((item, i) => (
          <button
            key={item.key}
            className="mco-wb-btn"
            role="tab"
            type="button"
            id={`mco-tab-${item.key}`}
            aria-selected={item.key === active}
            aria-controls="mco-wb-panel"
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
      <div className="mco-wb-panel" id="mco-wb-panel" role="tabpanel" aria-labelledby={`mco-tab-${current.key}`}>
        <div className="mco-wp-top">
          <span className="big">{ICON_LIST}</span>
          <div>
            <h3>{current.name}</h3>
            <div className="tagline">{current.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in re-runs on every tab change, as the design's re-render did */}
        <div className="mco-wp-body" key={active}>
          <span className="k">What’s inside</span>
          <div className="mco-wp-list">
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

export default function MultiChannelOutreachView() {
  useHeroGridParallax();

  return (
    <div className="mco-page">
      <ServiceDetailHero
        compact
        className="mco-hero"
        crumb={{ label: "Sales & Lead Generation", href: "/sales-lead-gen" }}
        line1="Show up where your"
        line2={
          <>
            buyers{" "}
            <span className="grad-text">
              <Scramble text="are." />
            </span>
          </>
        }
        lead={
          <>
            Done-for-you multi-channel outreach for B2B companies, agencies, and consultants. We coordinate every touch
            across email, LinkedIn, phone, and video, react to buyer signals in real time, and{" "}
            <strong>book qualified meetings straight onto your calendar</strong>, without burning your domain or your
            reputation.
          </>
        }
        primary={{ label: "Book a free outreach strategy call", href: "/start-project" }}
        secondary={{ label: "See the 21-day cadence ↓", href: "#cadence" }}
      >
        <SequenceCard />
      </ServiceDetailHero>

      <TrustBar items={["4 channels, 1 sequence", "Signal-based follow-up", "Real SDRs on the phones", "Every lead synced to your CRM"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why one channel isn&apos;t enough anymore</span>
            <h2>
              <Words text="Inboxes are crowded. DMs get ignored. Calls go to voicemail." />
            </h2>
            <p>
              On their own, each channel is getting harder. Together, they make your name familiar, so by the time a buyer
              replies, they already know who you are.
            </p>
          </Reveal>
          <div className="mco-why">
            <FeatureGrid cards={WHY_CARDS} columns={3} />
          </div>
          <Reveal as="p" className="mco-mix-note" style={{ marginTop: 26 }}>
            Multi-channel isn&apos;t about sending more messages.{" "}
            <strong>It&apos;s about sending the right message, on the right channel, at the right moment.</strong>
          </Reveal>
        </div>
      </section>

      {/* 21-DAY CADENCE */}
      <section className="band" id="cadence">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 21-day multi-channel cadence</span>
            <h2>
              <Words text="Twelve touches, three weeks, four channels." />
            </h2>
            <p>Here&apos;s a typical sequence for one prospect, each touch building on the last.</p>
          </Reveal>
          <Reveal className="mco-cad-grid">
            {CADENCE.map((touch) => (
              <article className="mco-cad" key={touch.day} style={cc(touch.ch)}>
                <div className="cd">
                  <span className="dn">{touch.day}</span>
                  <span className="ci">{CHANNEL_ICON[touch.ch]}</span>
                </div>
                <span className="ch">{CHANNEL_NAME[touch.ch]}</span>
                <p>{touch.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="mco-cad-key">
            {CADENCE_KEY.map((ch) => (
              <span key={ch}>
                <i style={{ background: CH[ch] }}></i> {CHANNEL_NAME[ch]}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EACH CHANNEL HAS A JOB */}
      <section className="band tint" id="roles">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Each channel has a job</span>
            <h2>
              <Words text="Throwing the same pitch at every channel doesn’t work." />
            </h2>
            <p>In our sequences, each channel plays a specific role, reinforcing the others instead of repeating them.</p>
          </Reveal>
          <Reveal className="mco-role-grid">
            {ROLES.map((role) => (
              <article className="mco-role" key={role.ch}>
                <div className="ri" style={{ background: CH[role.ch] }}>
                  {CHANNEL_ICON[role.ch]}
                </div>
                <h3>{CHANNEL_NAME[role.ch]}</h3>
                <div className="rr">{role.role}</div>
                <p>{role.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* IF THIS THEN THAT */}
      <section className="band" id="signals">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">If they do this, we do that</span>
            <h2>
              <Words text="Sequences that react to what buyers actually do." />
            </h2>
            <p>Static sequences treat every prospect the same. Ours move hot prospects up fast, and stop pestering cold ones.</p>
          </Reveal>
          <Reveal className="mco-itt">
            {SIGNALS.map((rule) => (
              <div className="mco-itr" key={rule.if}>
                <div className="if">
                  <span className="k">If they…</span>
                  <b>{rule.if}</b>
                </div>
                <span className="ar">{rule.done ? ICON_CHECK : ICON_ARROW}</span>
                <div className="then">
                  <span className="k">We automatically…</span>
                  {rule.then}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BUYER MIX TABLE */}
      <section className="band tint" id="mix">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Channel mix by buyer type</span>
            <h2>
              <Words text="The right mix depends on who you’re selling to." />
            </h2>
            <p>Here&apos;s where we usually start, then we let the data decide.</p>
          </Reveal>
          <Reveal className="mco-mix-tbl" role="table" aria-label="Channel mix by buyer type">
            <div className="mco-mix-row head" role="row">
              <div role="columnheader">Buyer type</div>
              <div role="columnheader">Lead channels</div>
              <div className="mc3" role="columnheader">
                Supporting
              </div>
              <div className="mc4" role="columnheader">
                Why
              </div>
            </div>
            {MIX_ROWS.map((row) => (
              <div className="mco-mix-row" key={row.buyer} role="row">
                <div className="bt" role="cell">
                  {row.buyer}
                </div>
                <div className="lead" role="cell">
                  {row.lead}
                </div>
                <div className="mc3" role="cell">
                  {row.support}
                </div>
                <div className="mc4" role="cell">
                  {row.why}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="mco-mix-note">
            We start with the mix that fits your buyer, then <strong>let real reply and meeting data reshape it.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don&apos;t do</span>
            <h2>
              <Words text="Multi-channel done badly feels like being stalked." />
            </h2>
            <p>We keep it respectful.</p>
          </Reveal>
          <div className="mco-dont-grid">
            {DONT.map((item) => (
              <Reveal className="mco-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{ICON_X}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mco-dont-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              Right message, right channel, right moment: <strong>human, not spammy.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What&apos;s included</span>
            <h2>
              <Words text="Strategy to reporting: one team runs it all." />
            </h2>
            <p>Seven parts: strategy, data, setup, copy, execution, CRM, and reporting. Pick one to see inside.</p>
          </Reveal>
          <Included />
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>
              <Words text="Best with a clear offer, a defined buyer, and deals worth a personal approach." />
            </h2>
          </Reveal>
          <div className="mco-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="mco-who" key={i} style={d(who.delay)}>
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
              <Words text="Live in about three weeks, improving every week after." />
            </h2>
          </Reveal>
          <div className="mco-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="mco-step" key={step.title} style={d(step.delay)}>
                <span className="mco-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every launch." />

      <CtaBand
        id="start"
        eyebrow="Multi-Channel Outreach"
        heading="Book a free outreach strategy call, no obligation."
        copy={
          <>
            We&apos;ll review your current prospecting, recommend the right channel mix for your buyers, and{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>show you a sample 21-day cadence built for your business.</strong>
          </>
        }
        primaryLabel="Book a free strategy call"
        primaryHref="/start-project"
        secondary={{ label: "See the 21-day cadence", href: "#cadence", arrow: "↗" }}
      />
    </div>
  );
}
