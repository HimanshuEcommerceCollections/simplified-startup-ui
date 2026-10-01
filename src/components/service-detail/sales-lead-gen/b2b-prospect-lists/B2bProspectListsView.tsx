"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FeatureGrid, ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./bpl-page.css";

/* -------- shared glyphs -------- */

const CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_HEAVY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_MARK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const ICON_MAIL = (
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

const ICON_LINKEDIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11v5M8 8v.01M12 16v-3a2 2 0 0 1 4 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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

const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- copy -------- */

const REC_ROWS = [
  { icon: ICON_MAIL, value: "jordan@example.com", status: "Deliverable" },
  { icon: ICON_PHONE, value: "(919) 555-0142", status: "Tested" },
  { icon: ICON_LINKEDIN, value: "linkedin.com/in/jordan-ellis", status: "Active" },
  { icon: ICON_BRIEFCASE, value: "B2B Software · 51–200", status: "Firmographic" },
  { icon: ICON_BOLT, value: "Hiring 3 SDRs this quarter", status: "Signal" },
];

const WHY_CARDS = [
  {
    icon: ICON_SHIELD_CHECK,
    title: "Protects deliverability",
    text: <>Verified emails keep bounce rates low and <strong>your sending domain healthy.</strong></>,
  },
  {
    icon: ICON_CLOCK,
    title: "Saves sales time",
    text: <>Reps talk to <strong>real decision-makers</strong>, not gatekeepers or people who left the company.</>,
    delay: 80,
  },
  {
    icon: ICON_LINES,
    title: "Makes personalization possible",
    text: <>Rich data gives you <strong>real reasons to reach out</strong>, not {"“Hi {first_name}.”"}</>,
    delay: 160,
  },
];

const ANATOMY = [
  { field: "Full name", value: "Jordan Ellis", status: "Verified" },
  { field: "Job title & seniority", value: "VP of Marketing · VP level", status: "Matched to ICP" },
  { field: "Business email", value: "jordan@example.com", status: "Deliverable" },
  { field: "Direct dial / mobile", value: "(919) 555-0142", status: "Tested" },
  { field: "LinkedIn profile", value: "linkedin.com/in/jordan-ellis", status: "Active" },
  { field: "Company & website", value: "Example SaaS Co. · example.com", status: "Confirmed" },
  { field: "Industry & size", value: "B2B Software · 51–200", status: "Firmographic" },
  { field: "Tech stack", value: "HubSpot, Salesforce, Slack", status: "Technographic" },
  { field: "Trigger / buying signal", value: "Hiring 3 SDRs this quarter", status: "Under 90 days" },
];

type Waterfall = { no: string; icon: ReactNode; title: string; q: string; items: string[] };

const WATERFALL: Waterfall[] = [
  {
    no: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Source",
    q: "Where do contacts come from?",
    items: ["Multiple databases", "LinkedIn research", "Company websites"],
  },
  {
    no: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    title: "Enrich",
    q: "What else do we know?",
    items: ["Titles & seniority", "Tech stack", "Buying signals"],
  },
  {
    no: "03",
    icon: ICON_SHIELD_CHECK,
    title: "Verify",
    q: "Is the data real?",
    items: ["Email validation", "Phone testing", "Job still current"],
  },
  {
    no: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M6 7l1 12h10l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Clean",
    q: "Is it usable?",
    items: ["Duplicates removed", "Customers suppressed", "Formatting fixed"],
  },
  {
    no: "05",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m16 4 1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Human QA",
    q: "Does it fit your ICP?",
    items: ["Manual spot checks", "Fit review", "Final sign-off"],
  },
];

type Filter = { icon: ReactNode; title: string; sub: string; items: string[] };

const FILTERS: Filter[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Firmographic",
    sub: "Who the company is.",
    items: ["Industry & sub-industry", "Employee count & revenue", "Location and HQ", "Company age & funding"],
  },
  {
    icon: ICON_PERSON,
    title: "Role-Based",
    sub: "Who the person is.",
    items: ["Job title & department", "Seniority level", "Decision-maker vs influencer", "Time in current role"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Technographic",
    sub: "What tools they use.",
    items: ["CRM & marketing platforms", "Website platform", "Competitor tools in use", "Recent tool changes"],
  },
  {
    icon: ICON_BOLT,
    title: "Intent & Triggers",
    sub: "Why now is the right time.",
    items: ["New funding round", "Hiring for key roles", "Leadership changes", "Expansion / new locations"],
  },
];

const SOURCES = [
  { name: "Apollo, ZoomInfo, Lusha", adds: "Core contact and company data at scale" },
  { name: "LinkedIn Sales Navigator", adds: "Current job titles, seniority, and role changes" },
  { name: "Clay enrichment workflows", adds: "Waterfall enrichment across 50+ data providers" },
  { name: "BuiltWith & Wappalyzer", adds: "Tech stack and website platform data" },
  { name: "Crunchbase & job boards", adds: "Funding rounds, hiring activity, and growth signals" },
  { name: "Company websites & news", adds: "Manual research for niche or local markets" },
  { name: "NeverBounce, ZeroBounce", adds: "Email validation and deliverability checks" },
];

const DONT = [
  { title: "Sell recycled lists", text: <>Every list is <strong>built fresh for your ICP</strong>, not a spreadsheet resold to a hundred buyers.</> },
  { title: "Pad lists to hit a number", text: <><strong>500 perfect-fit contacts beat 5,000 random ones.</strong> We optimize for fit, not volume.</>, delay: 60 },
  { title: "Include personal emails", text: <><strong>Business contacts only</strong>, sourced with CAN-SPAM and GDPR requirements in mind.</> },
  { title: "Resell your list", text: <>Your data is <strong>yours alone</strong>, never sold, shared, or reused for another client.</>, delay: 60 },
];

type WbItem = { key: string; label: string; sub: string; name: string; tag: string; items: string[] };

const WB_ITEMS: WbItem[] = [
  {
    key: "icp",
    label: "ICP & targeting",
    sub: "Define the fit",
    name: "ICP & Targeting",
    tag: "We define exactly who counts as a fit before any research begins.",
    items: ["ICP and persona workshop", "Target account criteria", "Title and seniority mapping", "Exclusion rules (customers, competitors, do-not-contact)"],
  },
  {
    key: "build",
    label: "List building",
    sub: "Multi-source research",
    name: "List Building",
    tag: "Fresh research across multiple sources, including niche and local markets big databases miss.",
    items: ["Contact and account research", "Multi-source data collection", "Niche and local market research", "Account-based lists for ABM"],
  },
  {
    key: "enrich",
    label: "Enrichment",
    sub: "Dials, signals, more",
    name: "Enrichment",
    tag: "The extra fields that make personalization and routing possible.",
    items: ["Direct dials and mobile numbers", "LinkedIn profile URLs", "Firmographic and technographic data", "Buying signals and trigger events", "Personalization notes (optional)"],
  },
  {
    key: "verify",
    label: "Verification & cleaning",
    sub: "5-step + human QA",
    name: "Verification & Cleaning",
    tag: "The 5-step waterfall plus a human pass. Bad records never reach you.",
    items: ["Email validation and catch-all handling", "Phone number testing", "Job change checks", "Deduplication and formatting", "Human QA review"],
  },
  {
    key: "deliver",
    label: "Delivery",
    sub: "Straight to your CRM",
    name: "Delivery",
    tag: "Clean, segmented, and ready to use, straight into your stack.",
    items: ["CSV or Google Sheets delivery", "Import into HubSpot, Salesforce, Pipedrive, GoHighLevel, Apollo", "Segmented by persona, industry, or region", "Ready-to-use fields for email and LinkedIn tools"],
  },
  {
    key: "refresh",
    label: "Ongoing refresh",
    sub: "Optional",
    name: "Ongoing Refresh (optional)",
    tag: "Lists decay. Keep yours current every month or quarter.",
    items: ["Monthly or quarterly list refresh", "New contacts added as companies grow", "Bounced and outdated records replaced"],
  },
];

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>Sales teams running cold email or calling</strong> who need fresh, verified contacts every month.</>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <><strong>Founders doing their own outreach</strong> without the time to research prospects.</>,
    delay: 60,
  },
  {
    icon: ICON_BRIEFCASE,
    text: <><strong>Agencies & consultants</strong> targeting a specific niche or region.</>,
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
        <path d="M2 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5M12 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <><strong>Marketing teams running ABM</strong> that need complete buying committees at target accounts.</>,
    delay: 180,
  },
];

const STEPS = [
  { no: "Step 1", title: "Define your ICP", text: "A short call to agree on industries, titles, company size, locations, and exclusions.", delay: 0 },
  { no: "Step 2", title: "Free sample", text: "We build a 25-contact sample so you can check fit and quality before the full build.", delay: 80 },
  { no: "Step 3", title: "Build & verify", text: "The full list runs through our 5-step verification waterfall: automated checks plus human QA.", delay: 160 },
  { no: "Step 4", title: "Deliver & import", text: "Delivered as a clean file or imported straight into your CRM and outreach tools.", delay: 240 },
];

const FAQS = [
  { q: "How much does a B2B prospect list cost?", a: <>Depends on the number of contacts, how niche your ICP is, and which enrichment fields you need. <strong>We share exact pricing on the strategy call</strong> after scoping your list.</> },
  { q: "How accurate is your data?", a: <>Every email is validated and every contact passes human QA before delivery. <strong>If contacts bounce or turn out to be wrong, we replace them.</strong></> },
  { q: "Can you build lists for niche or local markets?", a: <>Yes. For niche industries or local businesses that big databases miss, we add <strong>manual research from websites, directories, and associations.</strong></> },
  { q: "Do you also run the outreach?", a: <>We can. Many clients pair list building with our <strong>cold email, LinkedIn, or multi-channel outreach</strong> services. The list also works on its own if your team runs outreach in-house.</> },
  { q: "Is the data compliant?", a: <>We only collect <strong>business contact information</strong> and build lists with CAN-SPAM and GDPR requirements in mind. We recommend confirming your own outreach practices with legal counsel for regulated regions.</> },
  { q: "What format do I get the list in?", a: <>CSV or Google Sheets, or imported directly into <strong>HubSpot, Salesforce, Pipedrive, GoHighLevel, or Apollo</strong>, segmented by persona, industry, or region, with ready-to-use fields for email and LinkedIn tools.</> },
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
          <span className="bpl-wd" style={{ transitionDelay: `${i * 55}ms` }}>
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
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduce) return;
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
  }, [reduce, text]);

  return <span className="grad-text">{shown}</span>;
}

/** Hero grid drifts slightly with scroll (design's parallax layer). */
function useHeroGridParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const grid = document.querySelector<HTMLElement>(".bpl-hero .sd-grid-bg");
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

/* -------- hero signature: verified contact record -------- */

function RecordCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const run = reduce || started;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <SignatureCard
      className={`bpl-rec${run ? " run" : ""}`}
      ariaLabel="A sample verified contact record"
      live="Contact record · Verified"
      corner="CRM-READY"
      footLeft="Every field, hand-verified"
      footRight="you own the data →"
    >
      <div className="bpl-rec-head">
        <span className="av">JE</span>
        <span className="rn">
          <b>Jordan Ellis</b>
          <small>VP of Marketing · Example SaaS Co.</small>
        </span>
      </div>
      <div className="bpl-rec-rows">
        {REC_ROWS.map((row) => (
          <div className="rr" key={row.value}>
            <span className="ri">{row.icon}</span>
            <span className="rv">{row.value}</span>
            <span className="rs">
              {CHECK_BOLD}
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- what's included: tab list + panel -------- */

function Included() {
  // The design's script initialises on a key that does not exist; the markup marks "icp" selected, so start there.
  const [active, setActive] = useState("icp");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = WB_ITEMS.find((item) => item.key === active) ?? WB_ITEMS[0];

  function select(index: number) {
    const next = (index + WB_ITEMS.length) % WB_ITEMS.length;
    setActive(WB_ITEMS[next].key);
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
    <Reveal className="bpl-wb-wrap" id="included-int">
      <div className="bpl-wb-list" role="tablist" aria-label="What's included">
        {WB_ITEMS.map((item, i) => (
          <button
            key={item.key}
            className="bpl-wb-btn"
            role="tab"
            type="button"
            id={`bpl-tab-${item.key}`}
            aria-selected={item.key === active}
            aria-controls="bpl-wb-panel"
            tabIndex={item.key === active ? 0 : -1}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setActive(item.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{i + 1}</span>
            <span className="dn">
              <b>{item.label}</b>
              <small>{item.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="bpl-wb-panel" id="bpl-wb-panel" role="tabpanel" aria-labelledby={`bpl-tab-${current.key}`}>
        <div className="bpl-wp-top">
          <span className="big">{ICON_LIST_CHECK}</span>
          <div>
            <h3>{current.name}</h3>
            <div className="tagline">{current.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in re-runs on every tab change, as the design's re-render did */}
        <div className="bpl-wp-body" key={active}>
          <span className="k">What’s inside</span>
          <div className="bpl-wp-list">
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

export default function B2bProspectListsView() {
  useHeroGridParallax();

  return (
    <div className="bpl-page">
      <ServiceDetailHero
        compact
        className="bpl-hero"
        crumb={{ label: "Sales & Lead Generation", href: "/sales-lead-gen" }}
        line1="Verified B2B lists built"
        line2={
          <>
            around your exact <Scramble text="ICP." />
          </>
        }
        lead={
          <>
            Real decision-makers, verified emails, and direct dials, ready for your CRM.{" "}
            <strong>Hand-verified through a 5-step waterfall, built fresh for your ICP, and yours alone</strong>, never
            recycled, never resold.
          </>
        }
        primary={{ label: "Get a free sample list", href: "/start-project" }}
        secondary={{ label: "See how we verify ↓", href: "#verify" }}
      >
        <RecordCard />
      </ServiceDetailHero>

      <TrustBar items={["Hand-verified", "CRM-ready", "You own the data", "Never resold"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why list quality decides outreach results</span>
            <h2>
              <Words text="The best copy in the world fails if it lands in the wrong inbox." />
            </h2>
            <p>
              Bounced emails hurt your domain, wrong contacts waste your reps’ time, and outdated data makes you look
              careless. A clean, targeted list fixes all three before you send a single message.
            </p>
          </Reveal>
          <div className="bpl-why">
            <FeatureGrid cards={WHY_CARDS} columns={3} />
          </div>
          <Reveal as="p" className="bpl-an-note" style={{ marginTop: 26 }}>
            Outreach is only as good as the list behind it.{" "}
            <strong>Bad data doesn’t just fail quietly. It damages your domain and your reputation.</strong>
          </Reveal>
        </div>
      </section>

      {/* ANATOMY */}
      <section className="band" id="anatomy">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Anatomy of a verified contact record</span>
            <h2>
              <Words text="Every field your team needs to personalize and route." />
            </h2>
            <p>Here’s what a single record looks like. Fields are customized to your ICP and outreach plan.</p>
          </Reveal>
          <Reveal className="bpl-an-tbl">
            <div className="bpl-an-row head">
              <div>Field</div>
              <div className="ac2">Sample value</div>
              <div>Status</div>
            </div>
            {ANATOMY.map((row) => (
              <div className="bpl-an-row" key={row.field}>
                <div className="fn">{row.field}</div>
                <div className="ac2">{row.value}</div>
                <div>
                  <span className="st">
                    <span className="ok">{CHECK_HEAVY}</span>
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="bpl-an-note">
            Sample record shown with placeholder details. <strong>Fields are customized to your ICP and outreach plan.</strong>
          </Reveal>
        </div>
      </section>

      {/* 5-STEP WATERFALL */}
      <section className="band tint" id="verify">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our 5-step verification waterfall</span>
            <h2>
              <Words text="Every contact passes five checks, or it doesn’t make the list." />
            </h2>
            <p>Automated tools do the heavy lifting. Human reviewers make the final call.</p>
          </Reveal>
          <div className="bpl-wf-grid">
            {WATERFALL.map((step, i) => (
              <Reveal as="article" className="bpl-wf" key={step.no} style={d(i * 70)}>
                <span className="wn">{step.no}</span>
                <div className="wi">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="wq">{step.q}</p>
                <ul>
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="bpl-wf-note">
            Automated tools do the heavy lifting. <strong>Human reviewers make the final call.</strong>
          </Reveal>
        </div>
      </section>

      {/* 4 FILTERS */}
      <section className="band" id="filters">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">4 ways we filter your market</span>
            <h2>
              <Words text="A great list isn’t big. It’s precise." />
            </h2>
            <p>We layer four types of filters so every contact matches the buyers you actually close.</p>
          </Reveal>
          <Reveal className="bpl-fl-grid">
            {FILTERS.map((filter) => (
              <article className="bpl-flc" key={filter.title}>
                <div className="fh">
                  <span className="fi">{filter.icon}</span>
                  <h3>{filter.title}</h3>
                </div>
                <p className="fsub">{filter.sub}</p>
                <ul>
                  {filter.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="band tint" id="sources">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Data sources we combine</span>
            <h2>
              <Words text="No single database is complete." />
            </h2>
            <p>We combine multiple sources, then verify across them, so gaps in one are filled by another.</p>
          </Reveal>
          <Reveal className="bpl-src-tbl">
            <div className="bpl-src-row head">
              <div>Source</div>
              <div>What it adds</div>
            </div>
            {SOURCES.map((src) => (
              <div className="bpl-src-row" key={src.name}>
                <div className="sn">{src.name}</div>
                <div>{src.adds}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="bpl-src-note">
            Gaps in one source are <strong>filled and cross-checked by another</strong>, then every record passes human QA.
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do</span>
            <h2>
              <Words text="Cheap lists are cheap for a reason." />
            </h2>
            <p>We don’t cut these corners.</p>
          </Reveal>
          <div className="bpl-dont-grid">
            {DONT.map((item) => (
              <Reveal className="bpl-dontc" key={item.title} style={d(item.delay ?? 0)}>
                <h3>
                  <span className="x">{X_MARK}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="bpl-dont-note">
            <span className="mk">{CHECK}</span>
            <p>
              Fresh, precise, compliant, and <strong>100% yours.</strong>
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
              <Words text="ICP to delivery: one team." />
            </h2>
            <p>Targeting, building, enrichment, verification, delivery, and optional refresh. Six parts. Pick one to see inside.</p>
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
              <Words text="The right fit if your outreach depends on reaching the right people." />
            </h2>
            <p>…and your current data isn’t getting you there.</p>
          </Reveal>
          <div className="bpl-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="bpl-who" key={i} style={d(who.delay ?? 0)}>
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
              <Words text="Most lists delivered in 5–10 business days." />
            </h2>
            <p>You see the quality before you commit to the full build.</p>
          </Reveal>
          <div className="bpl-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="bpl-step" key={step.no} style={d(step.delay)}>
                <span className="bpl-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every list." />

      <CtaBand
        id="start"
        eyebrow="B2B Prospect List Building"
        heading="Get a free sample list, no obligation."
        copy={
          <>
            Tell us who you sell to. We’ll build 25 verified contacts that match your ICP so you can{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>see the quality for yourself</strong>, then compare it to
            your current data and judge the difference.
          </>
        }
        primaryLabel="Get a free sample list"
        primaryHref="/start-project"
        secondary={{ label: "See how we verify", href: "#verify", arrow: "↗" }}
      />
    </div>
  );
}
