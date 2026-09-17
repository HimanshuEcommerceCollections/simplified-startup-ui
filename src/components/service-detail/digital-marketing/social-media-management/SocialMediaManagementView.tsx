"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import {
  FeatureGrid,
  NoteCallout,
  PricingTiers,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  StepCards,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./smm-page.css";

/* -------- shared icon fragments -------- */

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CROSS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_PLAY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    <path d="M6 6 5 3H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_CART_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
  </svg>
);

const ICON_ROCKET_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_AUDIT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2M9 11h4M11 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: the content calendar -------- */

const CAL_DAYS = [
  { l: "M", on: false },
  { l: "T", on: true },
  { l: "W", on: false },
  { l: "T", on: true },
  { l: "F", on: true },
  { l: "S", on: false },
  { l: "S", on: false },
];

const CAL_POSTS = [
  {
    icon: ICON_PLAY,
    title: "Reel · trend hook",
    meta: "Instagram & TikTok · Tue 9:00",
    status: "ok" as const,
    label: "Approved",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 15l4-4 3 3 3-3 6 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Carousel · 5 tips",
    meta: "Instagram · LinkedIn · Thu 12:30",
    status: "ok" as const,
    label: "Approved",
  },
  {
    icon: ICON_CLOCK,
    title: "Story · behind-the-scenes",
    meta: "Instagram · Fri 17:00",
    status: "wait" as const,
    label: "Scheduled",
  },
];

const WAIT_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function CalendarCard() {
  return (
    <SignatureCard
      ariaLabel="A sample content calendar"
      live="Content calendar · This week"
      corner="YOU APPROVE"
      footLeft="Posted & engaged for you"
      footRight="you own it all →"
    >
      <div className="smm-cal-days">
        {CAL_DAYS.map((day, i) => (
          <span className={`smm-cal-day${day.on ? " on" : ""}`} key={i}>
            {day.l}
          </span>
        ))}
      </div>
      <div className="smm-cal-body">
        {CAL_POSTS.map((post) => (
          <div className="smm-cpost" key={post.title}>
            <span className="pic">{post.icon}</span>
            <span className="pt">
              <b>{post.title}</b>
              <small>{post.meta}</small>
            </span>
            <span className={`st ${post.status}`}>
              {post.status === "ok" ? CHECK_BOLD : WAIT_ICON}
              {post.label}
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY = [
  {
    icon: ICON_SHIELD,
    title: "Social is where trust is built",
    text: (
      <>
        Before someone buys, they check your profile. <strong>If it&apos;s empty or dated, so is their opinion of you.</strong>
      </>
    ),
  },
  {
    icon: ICON_PLAY,
    title: "Short-form video is the opening",
    text: (
      <>
        Reels, TikToks, and Shorts reach people <strong>your competitors haven&apos;t figured out how to target yet.</strong>
      </>
    ),
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4a3 3 0 0 1 0 6M21 20c0-2.5-1.6-4.6-4-5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Community is a moat",
    text: (
      <>
        An engaged audience is worth more than a big cold list — <strong>and it compounds every month.</strong>
      </>
    ),
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "It feeds every other channel",
    text: "Organic content becomes ad creative, blog content, email content, and sales enablement.",
  },
  {
    icon: ICON_CLOCK,
    title: "Cheapest way to stay top-of-mind",
    text: (
      <>
        Consistent posting keeps you present for buyers <strong>who aren&apos;t ready today — but will be soon.</strong>
      </>
    ),
    delay: 60,
  },
  {
    icon: ICON_CHART,
    title: "A compounding brand asset",
    text: (
      <>
        Done right, social is the compounding asset <strong>every other channel benefits from.</strong>
      </>
    ),
    delay: 120,
  },
];

/* -------- problem (dark) -------- */

const PAINS = [
  { title: "Recycled generic content", text: "The same “Monday motivation” graphic every competitor posts. Zero personality, zero engagement." },
  { title: "Junior team, senior invoice", text: "You met the founder in the sales call — now a 23-year-old intern runs your brand.", delay: 60 },
  { title: "Posting without strategy", text: "A calendar with nothing tying it to what your business actually wants to achieve.", delay: 120 },
  { title: "Zero engagement work", text: "Posts go up, comments and DMs sit for days. The whole point of social is the social part." },
  { title: "Vanity-metric reports", text: "Impressions and reach that mean nothing. No mention of leads or followers gained.", delay: 60 },
  { title: "Long lock-in contracts", text: "12-month deals, so you can’t leave when content quality slips in month three.", delay: 120 },
];

/* -------- what's included -------- */

const INCLUDED: { icon: ReactNode; no: string; title: string; text: ReactNode }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    no: "01",
    title: "Audit & strategy",
    text: (
      <>
        Account audit, competitor benchmarking, platform selection, content pillars, and a{" "}
        <strong>90-day plan + 12-month strategy.</strong>
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 15l4-4 3 3 3-3 6 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="15" cy="9" r="1.4" fill="currentColor" />
      </svg>
    ),
    no: "02",
    title: "Content creation",
    text: (
      <>
        Graphics, carousels, <strong>short-form video (Reels/TikToks/Shorts),</strong> stories, UGC-style content, and
        captions with a hook.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    no: "03",
    title: "Calendar & scheduling",
    text: "A monthly calendar for your approval, optimal-time posting per platform, hashtag rotation, and cross-platform adaptation.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    no: "04",
    title: "Community & engagement",
    text: (
      <>
        Daily comment and DM responses, follower outreach, trend monitoring, and{" "}
        <strong>escalation of leads to your sales team.</strong>
      </>
    ),
  },
  {
    icon: ICON_CHART,
    no: "05",
    title: "Organic growth",
    text: (
      <>
        Discovery optimization, collaborations, UGC campaigns, contests, and cross-promotion —{" "}
        <strong>the right followers, not just any.</strong>
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8h8M8 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m9 17 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    no: "06",
    title: "Analytics & reporting",
    text: "Plain-language monthly reports tied to outcomes — followers, engagement, reach, leads — plus a live dashboard.",
  },
];

/* -------- business types (interactive) -------- */

type TypeKey = "ecom" | "local" | "b2b" | "personal" | "launch" | "audit";

type BusinessType = {
  key: TypeKey;
  icon: ReactNode;
  label: string;
  sub: string;
  name: string;
  tag: string;
  items: string[];
};

const TYPES: BusinessType[] = [
  {
    key: "ecom",
    icon: ICON_CART,
    label: "E-commerce",
    sub: "Drive product sales",
    name: "Social for E-commerce",
    tag: "For online stores that need social to drive real product sales.",
    items: [
      "Shoppable posts & product tagging",
      "Reels & TikToks that convert",
      "UGC & customer content campaigns",
      "Instagram Shop & catalog setup",
      "Influencer seeding for launches",
      "Sales-attributable reporting",
    ],
  },
  {
    key: "local",
    icon: ICON_PIN,
    label: "Local businesses",
    sub: "Build a local following",
    name: "Social for Local Businesses",
    tag: "For salons, restaurants, gyms, and clinics building a local following.",
    items: [
      "Local content & community posts",
      "Google Business Profile updates",
      "Customer spotlight & review content",
      "Event & promotion posting",
      "Location-tagged content strategy",
      "Booking & inquiry-focused CTAs",
    ],
  },
  {
    key: "b2b",
    icon: ICON_BRIEFCASE,
    label: "B2B",
    sub: "Authority & pipeline",
    name: "Social for B2B",
    tag: "For business-to-business brands building authority and pipeline.",
    items: [
      "LinkedIn-first content strategy",
      "Thought leadership for founders/execs",
      "Case study & testimonial content",
      "Industry conversation participation",
      "Employee advocacy programs",
      "Pipeline-tied reporting",
    ],
  },
  {
    key: "personal",
    icon: ICON_PERSON,
    label: "Personal brands",
    sub: "Founders & creators",
    name: "Social for Personal Brands",
    tag: "For founders, consultants, and creators building an audience.",
    items: [
      "Personal positioning & voice development",
      "Content pillars tied to your expertise",
      "Ghostwritten posts (LinkedIn, X, Instagram)",
      "Video content coaching & editing",
      "Audience growth strategy",
      "Engagement & DM management",
    ],
  },
  {
    key: "launch",
    icon: ICON_ROCKET,
    label: "New launches",
    sub: "Build presence fast",
    name: "Social for New Brand Launches",
    tag: "For startups and new products that need to build presence fast.",
    items: [
      "Brand voice & visual identity for social",
      "Launch campaign content series",
      "Founder-story & behind-the-scenes",
      "Waitlist & pre-launch content",
      "Influencer & creator seeding",
      "Community-building from day one",
    ],
  },
  {
    key: "audit",
    icon: ICON_AUDIT,
    label: "Social audit",
    sub: "One-off review",
    name: "Social Media Audit",
    tag: "A deep one-off review of your existing presence — no commitment.",
    items: [
      "Full audit across all platforms",
      "Competitor & category benchmarking",
      "Content, voice, & visual review",
      "Audience & engagement analysis",
      "Content gap analysis",
      "Prioritized fix list + 90-day plan",
    ],
  },
];

function TypesTabs() {
  const [active, setActive] = useState<TypeKey>("ecom");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = TYPES.find((t) => t.key === active) ?? TYPES[0];

  function move(i: number) {
    const next = TYPES[(i + TYPES.length) % TYPES.length];
    btnRefs.current[TYPES.indexOf(next)]?.focus();
    setActive(next.key);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      move(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(i - 1);
    }
  }

  return (
    <Reveal className="smm-ty-wrap" id="types-int">
      <div className="smm-ty-list" role="tablist" aria-label="Business types">
        {TYPES.map((t, i) => (
          <button
            type="button"
            className="smm-ty-btn"
            role="tab"
            id={`smm-tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls="smm-ty-panel"
            key={t.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setActive(t.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{t.icon}</span>
            <span className="dn">
              <b>{t.label}</b>
              <small>{t.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="smm-ty-panel" id="smm-ty-panel" role="tabpanel" aria-labelledby={`smm-tab-${current.key}`}>
        <div className="smm-tp-top">
          <span className="big">{current.icon}</span>
          <div>
            <h3>{current.name}</h3>
            <div className="tagline">{current.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in re-runs on every switch, as the design re-rendered the body */}
        <div className="smm-tp-body" key={current.key}>
          <span className="k">What’s included</span>
          <div className="smm-tp-list">
            {current.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <a className="smm-tp-cta" href="#start">
            See full details <span className="arw">↗</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- platforms -------- */

const PLATFORMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
    name: "Instagram",
    tag: "B2C · DTC · local",
    text: "Feed, Reels, Stories, DMs, and Instagram Shop.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.6c0-.4.2-.6.6-.6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    name: "Facebook",
    tag: "Local · community",
    text: "Feed, Groups, events, and community management.",
    delay: 50,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 9v7a3 3 0 1 0 3 3V4c1 2 2.5 3 5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "TikTok",
    tag: "Reach · awareness",
    text: "Short-form video, trends, creator collaborations.",
    delay: 100,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M8 10v6M8 7.5v.01M12 16v-3.5a1.5 1.5 0 0 1 3 0V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "LinkedIn",
    tag: "B2B · thought leadership",
    text: "Company page, founder content, employee advocacy.",
    delay: 150,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9.5v5l4-2.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "YouTube",
    tag: "Long-form · evergreen",
    text: "Full videos + Shorts, SEO-driven content.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "X (Twitter)",
    tag: "B2B · real-time",
    text: "Written content, live posting, industry conversations.",
    delay: 50,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8c-2 0-3 1.4-3 3 0 1 .5 2 1.5 2.3M12 8c2.2 0 3 1.6 3 3.2 0 2.2-1.3 3.8-3 3.8-.6 0-1.2-.3-1.5-.8m0 0L9.5 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    name: "Pinterest",
    tag: "E-com · home · food",
    text: "Pin-first product discovery, seasonal content.",
    delay: 100,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 9c0-3 6-3 6 0s-6 2-6 6c0 2 3 3 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Threads",
    tag: "Community · voice",
    text: "Conversational content, engagement with followers.",
    delay: 150,
  },
];

/* -------- who it's for -------- */

const WHO: { icon: ReactNode; lead: string; text: string; delay?: number }[] = [
  { icon: ICON_PIN, lead: "A local business", text: " that needs a visible, active presence customers can trust before they walk in." },
  { icon: ICON_CART_PLAIN, lead: "An e-commerce brand", text: " turning social into a real sales channel through Reels, UGC, and shoppable posts.", delay: 60 },
  { icon: ICON_SHIELD, lead: "A service business", text: " where trust and consistency drive inbound leads.", delay: 120 },
  { icon: ICON_BRIEFCASE, lead: "A B2B company", text: " building thought leadership and pipeline through LinkedIn." },
  { icon: ICON_PERSON, lead: "A founder or personal brand", text: " growing an audience without spending 3 hours a day on it.", delay: 60 },
  { icon: ICON_ROCKET_PLAIN, lead: "A new business or launch", text: " that needs to build presence and community fast.", delay: 120 },
];

/* -------- how it works -------- */

const STEPS = [
  { no: "1", dur: "Week 1", title: "Audit & strategy", text: "Full audit of your presence, competitors, and audience — a strategy doc with platform picks and a 90-day plan." },
  { no: "2", dur: "Week 2", title: "Brand & content foundation", text: "Visual identity for social, content templates, hashtag banks, voice guidelines, first month of content.", delay: 70 },
  { no: "3", dur: "Weeks 3–4", title: "Calendar & launch", text: "First calendar approved by you, posting begins across chosen platforms, community management from day one.", delay: 140 },
  { no: "4", dur: "Months 2–3", title: "Test, learn & grow", text: "Double down on winning formats, test new ones, grow engaged followers steadily.", delay: 210 },
  { no: "5", dur: "Ongoing", title: "Report & refine", text: "Monthly plain-language reports, quarterly strategy reviews, continuous testing.", delay: 280 },
];

/* -------- pricing -------- */

const TIERS = [
  { name: "Starter Social", best: "1–2 platforms, 3–4 posts/week, basic engagement.", price: "Published /mo" },
  { name: "Growth Social", best: "2–3 platforms, daily posting, Reels/short-form video, full engagement.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Social", best: "All major platforms, high-volume content, UGC campaigns, influencer coordination.", price: "Published /mo", delay: 140 },
  { name: "One-off Audit", best: "A deep audit + 90-day strategy doc for your existing accounts, no commitment.", price: "Published", delay: 210 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "Which platforms should my business be on?", a: <>Almost never “all of them.” Most businesses win by <strong>focusing on the two platforms where their customers actually are</strong> — we help you pick during the strategy call.</> },
  { q: "How often will you post?", a: <>Usually 3–4×/week for smaller accounts, daily for growing ones, multiple times daily at scale. <strong>The right cadence is what you can sustain quality-wise,</strong> not the maximum.</> },
  { q: "Do you handle short-form video?", a: <>Yes — it&apos;s the biggest organic reach opportunity in 2026, so it&apos;s core to every package. We handle scripting, filming direction, editing, captions, and posting.</> },
  { q: "Do I approve content before it goes live?", a: <>Yes — every month you get a full content calendar to <strong>review and approve before anything goes out.</strong> You&apos;re never surprised by your own feed.</> },
  { q: "How do I know if it’s working?", a: <>A plain-language monthly report tied to real outcomes — <strong>followers, engagement, DMs, website clicks, and leads</strong> from social, not just impressions.</> },
  { q: "Do you run paid ads too?", a: <>Paid social is a separate service, but the two work brilliantly together — <strong>organic content that&apos;s performing becomes ad creative,</strong> and paid amplifies your best posts.</> },
  { q: "Who owns the content and accounts?", a: <>You do. All accounts stay in your ownership — you&apos;re the primary owner, we&apos;re a manager. <strong>All content is yours; if you leave, you keep everything.</strong></> },
  { q: "Do you handle influencer marketing?", a: <>Basic influencer seeding and creator collaborations are part of the Scale package. <strong>Larger campaigns</strong> are handled under our dedicated Influencer Marketing service.</> },
  { q: "Can you support my existing social team?", a: <>Yes — we work as an extension of your team, <strong>handling content production, strategy, or specific platforms</strong> while your in-house team handles the rest.</> },
  { q: "How long to see results?", a: <>Consistent posting immediately; real audience growth in <strong>60–90 days;</strong> meaningful lead flow compounds from month 4–6. Social is a compounding brand asset, not an instant lead channel.</> },
];

export default function SocialMediaManagementView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        eyebrow="Strategy · Content · Posting · Community · Growth"
        line1="Show up on social every day"
        line2={
          <>
            — without <span className="grad-text">living on it.</span>
          </>
        }
        lead={
          <>
            Full-service social media management for businesses that want to be{" "}
            <strong>visible, credible, and consistent</strong> — without hiring a full-time team. Strategy, content,
            posting, engagement, and reporting, all handled — at published prices, no long lock-in.
          </>
        }
        primary={{ label: "Book a free social strategy call", href: "/start-project" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <CalendarCard />
      </ServiceDetailHero>

      <div className="smm-trust">
        <TrustBar items={["Content + posting + engagement", "Transparent published pricing", "Month-to-month", "You own everything"]} />
      </div>

      {/* WHY */}
      <section className="band smm-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why social still matters</span>
            <h2>Before someone buys, they check your Instagram.</h2>
            <p>Your customers spend hours on social every day. Show up consistently, or lose them to competitors who do.</p>
          </Reveal>
          <div className="smm-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark smm-sec" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most social agencies</span>
            <h2>Some of these will sound painfully familiar.</h2>
            <p>If you&apos;ve worked with a social agency before — and we built our service to fix every one.</p>
          </Reveal>
          <div className="smm-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="smm-pain" key={pain.title} style={d(pain.delay ?? 0)}>
                <span className="pk">{CROSS}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="smm-pain-note">
            <span className="mk">{CHECK}</span>
            <p>
              We built our service to fix <span className="gt">every one of those.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="band smm-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What&apos;s included</span>
            <h2>Everything a social program needs to work.</h2>
            <p>Strategy, content, posting, engagement, and reporting — run by one team, not scattered across three.</p>
          </Reveal>
          <Reveal className="smm-inc-grid">
            {INCLUDED.map((inc) => (
              <div className="smm-inc" key={inc.no}>
                <span className="ii">{inc.icon}</span>
                <div>
                  <span className="in-no">{inc.no}</span>
                  <h3>{inc.title}</h3>
                  <p>{inc.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TYPES (interactive) */}
      <section className="band tint smm-sec" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Built for your business type</span>
            <h2>Social works differently for everyone.</h2>
            <p>It depends on your business and who you&apos;re reaching. Pick your type — see the package built for it.</p>
          </Reveal>
          <TypesTabs />
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="band smm-sec" id="platforms">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Platforms we manage</span>
            <h2>Strategy first — then the right channels.</h2>
            <p>We&apos;re platform-agnostic. We&apos;d rather see you win big on the right two than lose slowly on all of them.</p>
          </Reveal>
          <div className="smm-plat-grid">
            {PLATFORMS.map((plat) => (
              <Reveal className="smm-platc" key={plat.name} style={d(plat.delay ?? 0)}>
                <span className="pi">{plat.icon}</span>
                <h3>{plat.name}</h3>
                <span className="pb">{plat.tag}</span>
                <p>{plat.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="smm-plat-note">
            Not every business needs every platform.{" "}
            <strong>We&apos;ll tell you which ones are worth your time — and which to skip.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band tint smm-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>You get the biggest return if you&apos;re…</h2>
          </Reveal>
          <div className="smm-who-grid">
            {WHO.map((who) => (
              <Reveal className="smm-who" key={who.lead} style={d(who.delay ?? 0)}>
                <span className="wi">{who.icon}</span>
                <p>
                  <strong>{who.lead}</strong>
                  {who.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band smm-sec" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Posting in weeks — growing in months.</h2>
          </Reveal>
          <div className="smm-how">
            <StepCards steps={STEPS} />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint smm-sec" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No 12-month contracts, no hidden fees, no “custom quote” after a discovery call.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Content production is included at each tier; heavy video
            production or major creator campaigns may be quoted separately. Every exact number is on the{" "}
            <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <div className="smm-faq">
        <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every strategy call." />
      </div>

      <CtaBand
        id="start"
        eyebrow="Social Media Management"
        heading="Show up on social — without living on it."
        copy={
          <>
            Book a free social strategy call. We&apos;ll look at where you stand today, which platforms are worth your
            time, and what it&apos;d take to grow —{" "}
            <strong>with a clear price at the end. No obligation, no long contract.</strong>
          </>
        }
        primaryLabel="Book a free social strategy call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </>
  );
}
