"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { NoteCallout, PricingTiers, ServiceDetailHero, ServiceFaq, TrustBar, d } from "../../ServiceDetailKit";
import "./b2b-page.css";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CROSS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: always-on sales rep browser card -------- */

const COMMITTEE = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "The champion",
    q: "“This is worth a look.”",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "The end user (Ops)",
    q: "“Can I picture using it?”",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "Security / IT",
    q: "“SOC 2? GDPR? Uptime?”",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "The CFO",
    q: "“What does it cost?”",
  },
];

function RevCard() {
  const reduce = useReducedMotion();
  const [rawRun, setRun] = useState(false);
  const run = reduce || rawRun;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setRun(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside className={`b2b-rev${run ? " run" : ""}`} aria-label="A site that answers the whole buying committee">
      <div className="b2b-rev-bar">
        <span className="dots">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span className="url">yoursaas.com</span>
      </div>
      <div className="b2b-rev-hero">
        <span className="eh">Homepage · 10-second test</span>
        <h4>What it does. Who it’s for. Why care.</h4>
        <p>Answered before they scroll.</p>
        <span className="demo">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>{" "}
          Book a demo
        </span>
      </div>
      <div className="b2b-rev-body">
        <span className="clab">Answers the whole committee</span>
        {COMMITTEE.map((row) => (
          <div className="b2b-crow" key={row.name}>
            <span className="cav">{row.icon}</span>
            <span className="cn">
              <b>{row.name}</b>
              <small>{row.q}</small>
            </span>
            <span className="ck">{CHECK}Answered</span>
          </div>
        ))}
      </div>
      <div className="b2b-rev-foot">
        <span>Never sick, never off</span>
        <span className="gt">selling 24/7 →</span>
      </div>
    </aside>
  );
}

/* -------- stats (count-ups) -------- */

type Stat = { value?: string; count?: number; suffix?: string; label: string; text: string; delay: number };

const STATS: Stat[] = [
  { count: 10, suffix: "s", label: "To land the message", text: "Buyers decide if you’re worth their time in the first 10 seconds.", delay: 0 },
  { value: "5–7", label: "People per decision", text: "B2B deals involve a buying committee. Every persona needs answers.", delay: 80 },
  { count: 40, suffix: "%", label: "Higher close rate", text: "Sales-enabled sites close faster with less discount pressure.", delay: 160 },
  { value: "24/7", label: "Always working", text: "The site sells while you sleep, on weekends, in every timezone.", delay: 240 },
];

function StatsGrid() {
  const reduce = useReducedMotion();
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.14 });
  const countRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!inView) return;
    const rafs: number[] = [];
    STATS.forEach((stat, i) => {
      const el = countRefs.current[i];
      if (!el || stat.count === undefined) return;
      const target = stat.count;
      const suffix = stat.suffix ?? "";
      if (reduce) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      let start: number | null = null;
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.round(eased * target)}${suffix}`;
        if (p < 1) rafs[i] = requestAnimationFrame(tick);
      };
      rafs[i] = requestAnimationFrame(tick);
    });
    return () => rafs.forEach((raf) => cancelAnimationFrame(raf));
  }, [inView, reduce]);

  return (
    <div className="b2b-stat-grid" ref={gridRef}>
      {STATS.map((stat, i) => (
        <Reveal className="b2b-stat" key={stat.label} style={d(stat.delay)}>
          <div
            className="sv"
            ref={(el) => {
              countRefs.current[i] = el;
            }}
          >
            {stat.count !== undefined ? (reduce ? `${stat.count}${stat.suffix ?? ""}` : "0") : stat.value}
          </div>
          <span className="sk">{stat.label}</span>
          <p>{stat.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- problem (dark) -------- */

const PAINS = [
  { title: "Beautiful, zero pipeline", text: "The site wins Awwwards, ships — and demo requests don’t move. Everyone claps, nobody buys.", delay: 0 },
  { title: "One persona, one message", text: "Deals have 5–7 stakeholders. Your site talks to the CMO; the VP Ops, security lead, and CFO leave confused.", delay: 60 },
  { title: "No product visuals", text: "Every screenshot is a generic dashboard. Buyers can’t picture using it, so they don’t book the demo.", delay: 120 },
  { title: "Hidden pricing", text: "Serious buyers screen you out. Only tire-kickers fill out the “request pricing” form.", delay: 0 },
  { title: "No comparison or integration pages", text: "The two searches that convert best — “you vs competitor” and “you integrations” — and nothing ranks.", delay: 60 },
  { title: "$150K, 6 months, locked in", text: "And a proprietary CMS your team can’t edit without a $250/hour developer.", delay: 120 },
];

/* -------- pages explorer -------- */

type PageDef = { key: string; icon: ReactNode; tab: string; name: string; role: string; job: string; items: string[] };

const PAGES: PageDef[] = [
  {
    key: "home",
    icon: <path d="M4 11l8-7 8 7M6 10v9h12v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
    tab: "Homepage",
    name: "Homepage",
    role: "The 10-second test",
    job: "Answer “what does this do, who is it for, and why should I care” in 10 seconds.",
    items: ["Instant value proposition", "Clear primary CTA (book a demo)", "Social proof above the fold", "Path for every persona"],
  },
  {
    key: "product",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    tab: "Product / Features",
    name: "Product / Features",
    role: "Show, don’t tell",
    job: "Show the product with real screenshots or video — not stock hero images. Explain how, not just what.",
    items: ["Real interface visuals", "How it works, step by step", "Feature-to-benefit clarity", "Preview that replaces a demo"],
  },
  {
    key: "usecase",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 8h4M19 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    tab: "Use Cases / Solutions",
    name: "Use Cases / Solutions",
    role: "“This is for me”",
    job: "Speak to specific buyer types — by industry, role, or job-to-be-done — so each persona sees themselves.",
    items: ["Segmented by industry / role", "Job-to-be-done framing", "Persona-specific proof", "Programmatic-page ready"],
  },
  {
    key: "pricing",
    icon: <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    tab: "Pricing",
    name: "Pricing",
    role: "Screen in serious buyers",
    job: "Real numbers, real tiers. No “book a call for pricing” — unless you’re enterprise-only, then a range.",
    items: ["Transparent tiers", "Value framing per plan", "Clear upgrade path", "FAQ to remove objections"],
  },
  {
    key: "vs",
    icon: <path d="M8 4v16M16 4v16M4 8h8M12 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    tab: "Comparison / vs",
    name: "Comparison / vs Pages",
    role: "Highest-intent search",
    job: "Rank for “you vs competitor” — one of the highest-intent B2B searches there is.",
    items: ["Honest side-by-side", "Where you genuinely win", "Template for many competitors", "SEO-structured & schema-ready"],
  },
  {
    key: "integrations",
    icon: (
      <>
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    tab: "Integrations",
    name: "Integrations",
    role: "“Works with our stack”",
    job: "List every tool you integrate with. Buyers filter vendors by whether you work with their stack.",
    items: ["Full integration directory", "Per-integration detail pages", "Filter by category", "Buyer-stack reassurance"],
  },
  {
    key: "cases",
    icon: <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
    tab: "Case Studies",
    name: "Case Studies / Customers",
    role: "The credibility layer",
    job: "Real named customers, real outcomes. This is your credibility layer.",
    items: ["Named customers & logos", "Concrete, quantified outcomes", "Quotes from real buyers", "Segmented by industry / size"],
  },
  {
    key: "resources",
    icon: <path d="M4 5h16v14H4zM4 9h16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
    tab: "Resources / Blog",
    name: "Resources / Blog",
    role: "Feeds every channel",
    job: "Content that ranks for buyer questions and feeds every other channel — SEO, ads, social, email.",
    items: ["Ranks for buyer questions", "Fuels SEO & email", "Content clusters by topic", "CMS your team can run"],
  },
  {
    key: "security",
    icon: (
      <>
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    tab: "Security & Trust",
    name: "Security & Trust",
    role: "Non-negotiable for enterprise",
    job: "SOC 2, GDPR, uptime, data handling. Non-negotiable for enterprise buyers.",
    items: ["Compliance badges (SOC 2, GDPR)", "Uptime & data handling", "Sub-processor transparency", "Answers the security reviewer"],
  },
  {
    key: "about",
    icon: (
      <>
        <circle cx="8" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M3 19c0-2.8 2.2-5 5-5M21 19c0-2.8-2.2-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    tab: "About / Team",
    name: "About / Team",
    role: "The human layer",
    job: "Real people, real story. Especially critical when your product is boring or your category is crowded.",
    items: ["Real team, real faces", "The founding story", "Mission & credibility", "Why-trust-us signals"],
  },
];

function PagesExplorer() {
  const [active, setActive] = useState(PAGES[0].key);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const page = PAGES.find((p) => p.key === active) ?? PAGES[0];

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % PAGES.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + PAGES.length) % PAGES.length;
    if (next < 0) return;
    e.preventDefault();
    btnRefs.current[next]?.focus();
    setActive(PAGES[next].key);
  }

  return (
    <Reveal className="b2b-pg-wrap" id="pages-int">
      <div className="b2b-pg-list" role="tablist" aria-label="Pages">
        {PAGES.map((p, i) => (
          <button
            type="button"
            className="b2b-pg-btn"
            role="tab"
            aria-selected={p.key === active}
            key={p.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setActive(p.key)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="di">
              <svg viewBox="0 0 24 24" fill="none">
                {p.icon}
              </svg>
            </span>
            <span className="dn">
              <b>{p.tab}</b>
            </span>
          </button>
        ))}
      </div>
      <div className="b2b-pg-panel">
        <div key={active}>
          <div className="b2b-gp-top">
            <span className="big">
              <svg viewBox="0 0 24 24" fill="none">
                {page.icon}
              </svg>
            </span>
            <div>
              <h3>{page.name}</h3>
              <div className="role">{page.role}</div>
            </div>
          </div>
          <div className="b2b-gp-body b2b-gp-fade">
            <span className="k">What it has to do</span>
            <div className="job">{page.job}</div>
            <span className="k" style={{ marginTop: 20 }}>
              On the page
            </span>
            <div className="b2b-gp-list">
              {page.items.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- pillars (included) -------- */

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    no: "Pillar 1",
    title: "Positioning & messaging",
    items: ["Positioning & differentiation workshop", "Buyer persona mapping", "Messaging framework by persona", "Competitor teardown (3–5)", "Page-by-page content strategy", "Signed-off messaging doc"],
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    no: "Pillar 2",
    title: "UX & design",
    items: ["Wireframes for every core page", "Custom visual system (Figma)", "Real product screenshots", "Diagrams for complex concepts", "Interactive prototypes", "Mobile-first responsive"],
    delay: 80,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    no: "Pillar 3",
    title: "Development & platform",
    items: ["Webflow / WordPress / Next.js", "Component library for marketing", "CMS for blog, cases, comparisons", "Integrations (HubSpot, Salesforce)", "Analytics + attribution", "Sub-2-second load times"],
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    no: "Pillar 4",
    title: "Growth systems",
    items: ["Demo / trial flow (Chili Piper)", "Lead scoring in HubSpot / SF", "Templates for programmatic pages", "A/B testing framework", "Buyer-intent SEO foundation", "Post-launch CRO roadmap"],
    delay: 80,
  },
];

function PillarsGrid() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div className="b2b-pil-grid" ref={gridRef}>
      {PILLARS.map((pil) => (
        <Reveal as="article" className="b2b-pil" key={pil.no} data-tilt style={d(pil.delay)}>
          <span className="b2b-pil-spot"></span>
          <div className="ph">
            <span className="pi">{pil.icon}</span>
            <span className="pn">{pil.no}</span>
          </div>
          <h3>{pil.title}</h3>
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

/* -------- principles -------- */

const PRINCIPLES = [
  {
    no: "01",
    title: "Clarity beats cleverness — every time",
    text: (
      <>
        If a buyer can’t explain what you do to their boss after 30 seconds, the site failed. We optimize for{" "}
        <strong>“I understand this immediately”</strong> over “wow, cool interaction.”
      </>
    ),
    delay: 0,
  },
  {
    no: "02",
    title: "Show the product. Always.",
    text: (
      <>
        Real screenshots, real interface, real workflow.{" "}
        <strong>Enterprise buyers won’t take a demo if they can’t picture the product first</strong> — they’re protecting
        their time. Give them a preview.
      </>
    ),
    delay: 80,
  },
  {
    no: "03",
    title: "Design for the committee, not the champion",
    text: (
      <>
        Economic, technical, and end users each evaluate differently. A great site{" "}
        <strong>quietly answers each of their questions</strong> on the pages they visit. One-persona messaging kills
        more deals than bad design.
      </>
    ),
    delay: 0,
  },
  {
    no: "04",
    title: "The site is a system, not a project",
    text: (
      <>
        The best-converting sites are edited every week — new comparison pages, use cases, resources.{" "}
        <strong>We build sites your marketing team can ship on</strong> without waiting for developers.
      </>
    ),
    delay: 80,
  },
];

/* -------- who it's for -------- */

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    text: (
      <>
        <strong>A SaaS or AI company</strong> at seed to Series B, where the site is top-of-funnel and demos are the goal.
      </>
    ),
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: (
      <>
        <strong>A B2B services company</strong> with a long sales cycle and higher-ticket deals — consulting, agencies, pro
        services.
      </>
    ),
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: (
      <>
        <strong>A fintech, cybersecurity, or infra company</strong> where technical buyers need security, compliance, and
        product proof.
      </>
    ),
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: (
      <>
        <strong>An AI or ML product</strong> in a category buyers don’t fully understand yet — clarity is everything.
      </>
    ),
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    text: (
      <>
        <strong>Running paid ads or ABM</strong> to a homepage that isn’t converting — the site is bleeding budget.
      </>
    ),
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: (
      <>
        <strong>Ready to move off</strong> Squarespace, Wix, or a proprietary CMS onto a real growth platform.
      </>
    ),
    delay: 120,
  },
];

/* -------- how it works -------- */

const STEPS = [
  { no: "1", dur: "Weeks 1–2", title: "Strategy & positioning", text: "Category & competitor teardown, persona mapping, messaging framework, content strategy — approved doc.", delay: 0 },
  { no: "2", dur: "Weeks 2–3", title: "Wireframes", text: "Wireframes for every core page, content outlined and approved. You sign off before design.", delay: 70 },
  { no: "3", dur: "Weeks 3–5", title: "Design", text: "Custom visual design in Figma with real product visuals. Two rounds of feedback and revisions.", delay: 140 },
  { no: "4", dur: "Weeks 5–8", title: "Development", text: "Build on Webflow, WordPress, or Next.js. CMS collections, integrations, full QA.", delay: 210 },
  { no: "5", dur: "Weeks 9–10", title: "Launch & handover", text: "Redirects, analytics, and tracking configured. Team trained. 30 days post-launch support.", delay: 280 },
];

/* -------- pricing -------- */

const TIERS = [
  { name: "Launch Site", best: "Seed-stage SaaS or new B2B brand — up to 8 pages, positioning + messaging + custom design, Webflow build.", price: "Published" },
  {
    name: "Growth Site",
    best: "Series A/B — up to 15 pages, full architecture (product, pricing, comparison, use cases, integrations), CMS.",
    price: "Published",
    featured: true,
    badge: "Most popular",
    delay: 70,
  },
  { name: "Scale Site", best: "Larger B2B/SaaS — 20+ pages, custom development, headless CMS, complex integrations, migration.", price: "Published", delay: 140 },
  { name: "Growth Retainer", best: "Ongoing pages, A/B testing, CRO — a flat monthly fee.", price: "Published /mo", delay: 210 },
];

/* -------- faq -------- */

const FAQS = [
  {
    q: "How is this different from a regular build?",
    a: (
      <>
        B2B SaaS sites work harder — multiple personas, long cycles, technical buyers, complex products, and a{" "}
        <strong>“demo request” instead of “buy now”</strong> as the goal. Every decision is built around that reality.
      </>
    ),
  },
  {
    q: "Webflow, WordPress, or custom?",
    a: (
      <>
        <strong>Webflow for most</strong> — marketing can ship pages without developers. WordPress if content-heavy or you
        have a WP-savvy team. Custom (Next.js) if you need performance off-the-shelf can’t deliver.
      </>
    ),
  },
  {
    q: "Do you write the content?",
    a: (
      <>
        Yes — messaging, positioning, and page copy are core deliverables.{" "}
        <strong>You provide product expertise; we handle the writing</strong> — or give you approved briefs so it stays
        on-strategy.
      </>
    ),
  },
  {
    q: "Do I have to sign a 12-month retainer?",
    a: (
      <>
        No. The build is a one-time project. The optional growth retainer is{" "}
        <strong>month-to-month with 30 days’ notice</strong> — no lock-in.
      </>
    ),
  },
  {
    q: "Can you migrate our current site?",
    a: (
      <>
        Yes — from Squarespace, Wix, HubSpot CMS, WordPress, Framer, or custom.{" "}
        <strong>Includes 301 redirects to protect SEO,</strong> content migration, and zero-downtime launch.
      </>
    ),
  },
  {
    q: "Do you set up demo scheduling & lead routing?",
    a: (
      <>
        Yes — Chili Piper, Calendly, HubSpot Meetings, or whatever you use,{" "}
        <strong>with lead scoring and round-robin routing</strong> built in.
      </>
    ),
  },
  {
    q: "What about SEO?",
    a: (
      <>
        Foundations are built in: clean URLs, schema, meta, Core Web Vitals, sitemap. Ongoing SEO (content, backlinks,
        comparison pages) is our <strong>separate SEO service</strong> most clients add.
      </>
    ),
  },
  {
    q: "Can you help with “vs” comparison pages?",
    a: (
      <>
        Yes — some of the <strong>highest-converting pages</strong> a B2B SaaS site can have. We build the template and
        structure, and can write the first few or hand over frameworks.
      </>
    ),
  },
  {
    q: "Do you build PLG (self-serve) sites?",
    a: (
      <>
        Yes — trial signup flow, in-product education, pricing calculator, self-serve conversion tracking.{" "}
        <strong>The structure changes; the pillars stay the same.</strong>
      </>
    ),
  },
  {
    q: "What about custom animations?",
    a: (
      <>
        Fine — but only where they help clarity or conversion. <strong>We don’t bolt on animation for its own sake.</strong>{" "}
        When a scroll-triggered animation helps explain a complex product, we build it.
      </>
    ),
  },
];

export default function B2bSaasWebsitesView() {
  return (
    <>
      <ServiceDetailHero
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="b2b-hero"
        compact
        eyebrow="B2B · SaaS · Pipeline-focused · Webflow or WordPress"
        line1="Your website should be your"
        line2={
          <>
            best <span className="grad-text">salesperson.</span>
          </>
        }
        lead={
          <>
            Websites for SaaS, AI, fintech, and B2B — where the deal takes six months, the buying committee has five
            people, and the site has <strong>10 seconds to prove you’re worth a demo.</strong> Built to convert
            pipeline, not just win design awards.
          </>
        }
        primary={{ label: "Book a free website strategy call", href: "/start-project" }}
        secondary={{ label: "See how we do it ↓", href: "#included" }}
      >
        <RevCard />
      </ServiceDetailHero>

      <TrustBar items={["Pipeline-focused, not brochure", "Webflow & WordPress experts", "Transparent published pricing", "Launch in 6–10 weeks"]} />

      {/* STATEMENT */}
      <section className="band tint" id="think">
        <div className="wrap">
          <Reveal className="sec-head" style={{ marginBottom: 34 }}>
            <span className="eyebrow">A different way to think about your site</span>
            <h2>Treat it like a design project — it’ll act like one.</h2>
          </Reveal>
          <Reveal className="b2b-stmt">
            <p>
              Your website isn’t a brochure. <b>It’s the most patient, always-on, never-sick sales rep on your team</b> —
              and it works while you sleep.{" "}
              <span className="mut">
                The best B2B SaaS sites in 2026 aren’t the prettiest — they answer buyer questions before the buyer has
                to ask, show the product without a demo call, and make “book a demo” feel like the obvious next step.
              </span>{" "}
              That’s what we build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="band" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What a great B2B SaaS site does</span>
            <h2>Not what it looks like — what it does.</h2>
            <p>Four things that separate a real revenue-generating site from a nice-looking one.</p>
          </Reveal>
          <StatsGrid />
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What goes wrong on most B2B SaaS sites</span>
            <h2>You’ve probably lived a few of these.</h2>
            <p>If you’ve worked with a B2B SaaS agency before — and we built our service so none of it happens on our watch.</p>
          </Reveal>
          <div className="b2b-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="b2b-pain" key={pain.title} style={d(pain.delay)}>
                <span className="pk">{CROSS}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="b2b-pain-note">
            <span className="mk">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p>
              We built our service so <span className="gt">none of this happens.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* PAGES (interactive) */}
      <section className="band" id="pages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The pages every B2B SaaS site needs</span>
            <h2>Structure beats style.</h2>
            <p>Here’s the page architecture that actually converts pipeline — pick a page to see what it has to do.</p>
          </Reveal>
          <PagesExplorer />
          <Reveal as="p" className="b2b-pg-note">
            Not every SaaS site needs all 10. <strong>Every site we build starts here</strong> — then we prioritize by
            your stage, buyer, and sales motion.
          </Reveal>
        </div>
      </section>

      {/* PILLARS (included) */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Four pillars — how great B2B SaaS sites are built.</h2>
          </Reveal>
          <PillarsGrid />
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="band" id="principles">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we think about B2B SaaS sites</span>
            <h2>Four principles behind every decision.</h2>
          </Reveal>
          <div className="b2b-pr-grid">
            {PRINCIPLES.map((pr) => (
              <Reveal as="article" className="b2b-pr" key={pr.no} style={d(pr.delay)}>
                <div className="prn">{pr.no}</div>
                <h3>{pr.title}</h3>
                <p>{pr.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>The right fit if you’re…</h2>
          </Reveal>
          <div className="b2b-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="b2b-who" key={i} style={d(who.delay)}>
                <span className="wi">{who.icon}</span>
                <p>{who.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A structured 6–10 week build.</h2>
            <p>Every step ends with a real deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="b2b-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="b2b-step" key={step.no} style={d(step.delay)}>
                <span className="step-no">{step.no}</span>
                <span className="stt">{step.dur}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
          <NoteCallout style={{ marginTop: 22 }}>
            Ongoing (optional) — <strong>Growth retainer:</strong> new comparison pages, use-case pages, and A/B tests
            monthly. The site keeps compounding instead of stagnating.
          </NoteCallout>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No “custom quote after a discovery call.” One-time project fees for the build, optional monthly growth retainer.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Project fees paid in three installments — <strong>30% at kickoff, 40% at design signoff, 30% at launch.</strong>{" "}
            Platform fees (Webflow, hosting) are separate. Every exact number is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        eyebrow="B2B & SaaS Websites"
        heading="A site that generates pipeline — not compliments."
        copy={
          <>
            Book a free website strategy call. We’ll look at your current site, your competitors, your buyer, and what
            it’d take to build a site that pulls its weight —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation.</strong>
          </>
        }
        primaryLabel="Book a free website strategy call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
