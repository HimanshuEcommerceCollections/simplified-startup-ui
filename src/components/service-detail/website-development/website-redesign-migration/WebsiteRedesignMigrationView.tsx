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
import "./rm-page.css";

/* -------- icons -------- */

const ARROW_RIGHT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_ICON = (w: number) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={w} strokeLinecap="round" />
  </svg>
);

const CHECK_ICON = (w: number) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- data -------- */

const REDIRECTS = [
  { old: "/old-home", next: "/" },
  { old: "/services.php", next: "/services" },
  { old: "/blog?id=42", next: "/blog/seo-guide" },
  { old: "/products/old", next: "/shop/kit" },
  { old: "/contact-us.html", next: "/contact" },
];

const TRUST = ["SEO-first methodology", "Complete redirect strategy", "Zero-downtime launch", "60 days monitoring"];

type Stat = {
  count?: { target: number; prefix?: string; suffix?: string };
  value?: string;
  label: string;
  text: string;
  delay: number;
};

const STATS: Stat[] = [
  { count: { target: 25, prefix: "10–", suffix: "%" }, label: "Traffic drop", text: "The typical organic dip in the first 30 days after a botched migration.", delay: 0 },
  { value: "2–8mo", label: "Recovery time", text: "How long it takes rankings to stabilize — if they recover at all.", delay: 80 },
  { count: { target: 40, suffix: "%+" }, label: "Never recover", text: "Portion of sites that permanently lose top rankings after a bad migration.", delay: 160 },
];

const WRONG = [
  "SEO called in after design is locked",
  "No URL inventory or redirect map",
  "Content “moved” without parity check",
  "No staging environment or QA",
  "Launched on a Friday afternoon",
  "No post-launch monitoring",
  "Rankings tank silently for weeks",
  "Recovery takes 3–6 months (if ever)",
];

const RIGHT = [
  "SEO involved from day one — before wireframes",
  "Full URL inventory + 1:1 redirect matrix",
  "Every page audited for content parity",
  "Full staging environment with QA sign-off",
  "Launched Tue–Thu, monitored live",
  "60 days of post-launch monitoring included",
  "Ranking movements caught within 48 hours",
  "Traffic dip minimized (usually under 5%)",
];

const WHEN: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <>You&apos;re <strong>replatforming</strong> — WordPress ↔ Webflow, Shopify ↔ WooCommerce, or off Squarespace/Wix.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: <>You&apos;re doing a <strong>full redesign</strong> with new URL structure, navigation, templates, or IA.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3a9 9 0 0 1 0 18M3 12h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    text: <>You&apos;re <strong>changing your domain</strong> — rebrand, acquisition, or consolidating multiple sites into one.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: <>You&apos;re moving <strong>HTTP → HTTPS</strong> or switching hosting providers with URL changes.</>,
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    text: <>You&apos;re <strong>consolidating brands or sites</strong> after a merger, acquisition, or restructure.</>,
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    text: <>You&apos;re migrating <strong>off a proprietary CMS</strong> — locked in and paying too much for every update.</>,
    delay: 60,
  },
];

type Phase = { key: string; n: string; name: string; small: string; role: string; items: string[] };

const PHASES: Phase[] = [
  {
    key: "discover",
    n: "01",
    name: "Discover",
    small: "Understand what you have",
    role: "Understand what you have before you touch anything",
    items: [
      "Full crawl of your current site",
      "Traffic & ranking baseline snapshot",
      "Backlink profile audit",
      "Content inventory + performance scoring",
      "Analytics and tracking audit",
      "Tech stack & integration inventory",
    ],
  },
  {
    key: "map",
    n: "02",
    name: "Map",
    small: "Plan before code changes",
    role: "Plan the move before a single line of code changes",
    items: [
      "1:1 redirect matrix (every old → new)",
      "Content migration plan (move / merge / retire)",
      "URL structure decisions",
      "Schema & structured-data planning",
      "Analytics + conversion tracking plan",
      "Redirect chain audit (no chains > 2 hops)",
    ],
  },
  {
    key: "migrate",
    n: "03",
    name: "Migrate",
    small: "Build, test, launch",
    role: "Build, test, and launch — with no surprises",
    items: [
      "Full staging environment for QA",
      "Design + development on new platform",
      "Content moved with parity check",
      "Redirects implemented and tested at scale",
      "Cross-browser and mobile QA",
      "Zero-downtime launch (mid-week)",
    ],
  },
  {
    key: "monitor",
    n: "04",
    name: "Monitor",
    small: "Watch for 60 days",
    role: "Watch, catch, and fix for 60 days after launch",
    items: [
      "Daily rank & traffic monitoring (wks 1–4)",
      "Weekly monitoring (wks 5–8)",
      "Redirect verification & broken-link cleanup",
      "Core Web Vitals + speed monitoring",
      "Search Console error monitoring & fixes",
      "Full 60-day performance report",
    ],
  },
];

const INCLUDED: { icon: ReactNode; title: string; items: string[] }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "SEO & technical migration",
    items: ["Full pre-migration audit", "URL inventory (up to 10,000)", "1:1 redirect map + implementation", "Schema migration & enhancement", "XML sitemap regeneration", "Core Web Vitals optimization"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Design & development",
    items: ["Design refresh or full rebuild", "Platform migration or rebuild", "Custom component library", "Mobile-first responsive", "CMS setup & content model", "Integration reconnections"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Content & data",
    items: ["Full content migration + parity check", "Blog / resource migration", "Media library migration", "Customer / user data migration", "Product catalog migration", "Comments & authors preserved"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Launch & monitoring",
    items: ["Full staging environment", "Complete QA sign-off", "Mid-week zero-downtime launch", "60 days post-launch monitoring", "Weekly reports (first 8 weeks)", "Slack / email support windows"],
  },
];

const TIMELINE = [
  { no: "Weeks 1–2", title: "Discover", text: "Full audit, URL inventory, ranking snapshot, backlink audit, content scoring — ends with an audit report.", delay: 0 },
  { no: "Weeks 2–3", title: "Map", text: "Redirect matrix built, content plan approved, URL structure locked, analytics plan signed off.", delay: 70 },
  { no: "Weeks 3–7", title: "Migrate", text: "New site built on staging, content moved, redirects implemented & tested, QA on every device.", delay: 140 },
  { no: "Weeks 7–8", title: "Launch", text: "Go live mid-week, live monitoring for 72 hours, immediate fixes for anything unexpected.", delay: 210 },
  { no: "Weeks 8–16", title: "Monitor", text: "60 days of active monitoring, weekly reports, fixes as needed, final performance report at day 60.", delay: 280 },
];

const TIERS = [
  { name: "Starter Migration", best: "Small sites (up to 50 pages) — design refresh, same platform, redirects & SEO preservation.", price: "Published" },
  { name: "Growth Migration", best: "Mid-size (up to 250 pages) — full redesign, platform switch, complete migration + 60-day monitoring.", price: "Published", featured: true, badge: "Most common", delay: 70 },
  { name: "Scale Migration", best: "Large sites (up to 2,000 pages) — e-commerce or content-heavy, complex integrations, phased launch.", price: "Published", delay: 140 },
  { name: "Enterprise / Custom", best: "Over 2,000 pages, multi-domain consolidations, or multi-language — scoped per project.", price: "Contact for quote", delay: 210 },
];

const FAQS = [
  { q: "How long does a migration take?", a: <>Small sites: 4–6 weeks. Mid-size with a redesign: 6–10 weeks. Large and multi-domain: 10–16 weeks. <strong>The 60-day monitoring runs after that</strong> on top.</> },
  { q: "Will my rankings drop after migration?", a: <>Some short-term movement is normal — usually 1–5% in the first 2 weeks. A properly-run migration <strong>recovers within 30–60 days and often ends up better,</strong> because we also improve speed, schema, and internal linking.</> },
  { q: "Do you handle e-commerce migrations?", a: <>Yes — <strong>product catalog, customer accounts, order history, payment integrations, and shipping rules</strong> all migrate. Cart data usually stays with the platform; everything else moves.</> },
  { q: "Can we keep our design and just replatform?", a: <>Yes — pure replatforms (e.g. WordPress → Webflow) where the design stays similar and only the platform changes. <strong>Usually faster and cheaper</strong> than a full redesign.</> },
  { q: "What if a migration goes wrong?", a: <>That&apos;s exactly why the 60-day monitoring exists. If something goes wrong, <strong>we&apos;re on it within 48 hours and fix it as part of the engagement</strong> — no extra invoice.</> },
  { q: "Will my site be down during migration?", a: <>No. We use a staging environment throughout; the old site stays live until launch day, when we swap DNS and redirects in one window. <strong>Downtime is usually zero,</strong> occasionally 5–10 minutes.</> },
  { q: "Do you migrate blog content and comments?", a: <>Yes — all posts, categories, tags, author profiles, and usually comments migrate. Proprietary comment systems (like Disqus) can be migrated or kept as-is.</> },
  { q: "Do we own the new site?", a: <>Yes, completely — built on standard platforms (WordPress, Webflow, Shopify) that you own. <strong>All source files, logins, and documentation are handed over.</strong></> },
  { q: "Can you migrate off a proprietary CMS?", a: <>Yes — HubSpot CMS, Squarespace, Wix, Weebly, Duda, and industry-specific systems. <strong>We rebuild on a standard platform where you&apos;re never locked in again.</strong></> },
  { q: "What if I need to keep the same URLs?", a: <>That&apos;s the easiest scenario — <strong>URL parity means minimal redirect risk.</strong> We still run the full audit and monitoring, but the migration itself is smoother.</> },
];

/* -------- hero signature: redirect map -------- */

function RedirectCard() {
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
      className={`rm-rd${run ? " run" : ""}`}
      ariaLabel="A sample 1:1 redirect map"
      live="Redirect map · 1:1"
      corner="ZERO DOWNTIME"
      footLeft="Every URL mapped"
      footRight="rankings preserved →"
    >
      <div className="rm-rd-head">
        <span>Old URL</span>
        <span></span>
        <span>New URL</span>
      </div>
      <div className="rm-rd-body">
        {REDIRECTS.map((row) => (
          <div className="rm-rdrow" key={row.old}>
            <span className="old">{row.old}</span>
            <span className="arr">{ARROW_RIGHT}</span>
            <span className="new">{row.next}</span>
            <span className="st">301 ✓</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- dark stats with count-up -------- */

function StatValue({ count, value, run, reduce }: { count?: Stat["count"]; value?: string; run: boolean; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!count || !run || reduce || !ref.current) return;
    const { target, prefix = "", suffix = "" } = count;
    let raf: number;
    let start: number | null = null;
    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(eased * target)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, run, reduce]);

  if (!count) return <div className="sv">{value}</div>;
  const finalText = `${count.prefix ?? ""}${count.target}${count.suffix ?? ""}`;
  return (
    <div className="sv" ref={ref}>
      {reduce ? finalText : "0"}
    </div>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  // Design fires the count-up once #stats' top passes 85% of the viewport.
  const [gridRef, gridIn] = useInView<HTMLDivElement>({ threshold: 0, rootMargin: "0px 0px -15% 0px" });

  return (
    <div className="rm-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <Reveal className="rm-stat" key={stat.label} style={d(stat.delay)}>
          <StatValue count={stat.count} value={stat.value} run={gridIn} reduce={reduce} />
          <span className="sk">{stat.label}</span>
          <p>{stat.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- method tabs -------- */

function MethodTabs() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const phase = PHASES[active];

  function focusAndSelect(index: number) {
    const next = (index + PHASES.length) % PHASES.length;
    setActive(next);
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>(".rm-mt-btn");
    buttons?.[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusAndSelect(index + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusAndSelect(index - 1);
    }
  }

  return (
    <Reveal className="rm-mt-wrap">
      <div className="rm-mt-list" role="tablist" aria-label="Phases" ref={listRef}>
        {PHASES.map((p, i) => (
          <button
            className="rm-mt-btn"
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls="rm-mt-panel"
            id={`rm-mt-tab-${p.key}`}
            tabIndex={active === i ? 0 : -1}
            key={p.key}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="mnum">{p.n}</span>
            <span className="mdn">
              <b>{p.name}</b>
              <small>{p.small}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="rm-mt-panel" id="rm-mt-panel" role="tabpanel" aria-labelledby={`rm-mt-tab-${phase.key}`}>
        <div className="rm-mp-top">
          <span className="big">{phase.n}</span>
          <div>
            <h3>{phase.name}</h3>
            <div className="role">{phase.role}</div>
          </div>
        </div>
        <div className="rm-mp-body rm-mp-fade" key={phase.key}>
          <span className="k">What happens</span>
          <div className="rm-mp-list">
            {phase.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- page -------- */

export default function WebsiteRedesignMigrationView() {
  return (
    <>
      <ServiceDetailHero
        crumb={{ label: "Website Development", href: "/website-development" }}
        eyebrow="Redesign · Replatform · Migration"
        line1="Redesign or migrate —"
        line2={
          <>
            without losing <span className="grad-text">rankings.</span>
          </>
        }
        lead={
          <>
            A bad redesign can wipe out years of organic growth in a single weekend. We&apos;ve seen it happen. This
            service exists so it doesn&apos;t happen to you —{" "}
            <strong>SEO-first planning, a complete redirect strategy, zero-downtime launch,</strong> and 60 days of
            post-launch monitoring.
          </>
        }
        primary={{ label: "Book a free migration audit", href: "/start-project" }}
        secondary={{ label: "See our process ↓", href: "#method" }}
        compact
      >
        <RedirectCard />
      </ServiceDetailHero>

      <TrustBar items={TRUST} />

      {/* RISK */}
      <section className="band tint rm-anchor" id="risk">
        <div className="wrap">
          <Reveal className="sec-head" style={{ marginBottom: 34 }}>
            <span className="eyebrow">The riskiest web project you&apos;ll run</span>
            <h2>Building new is easy. Moving live infrastructure isn&apos;t.</h2>
          </Reveal>
          <Reveal className="rm-stmt">
            <p>
              A migration done wrong can <span className="warn">wipe out years of SEO growth in a single weekend</span>{" "}
              — and take 2–8 months to recover.{" "}
              <span className="mut">
                That&apos;s not a scare tactic; it&apos;s the industry data. Most botched migrations cause 10–25% organic
                traffic drops in the first 30 days, and some sites never fully recover — they permanently lose rankings
                on top pages because the redirect map missed a few dozen URLs.
              </span>{" "}
              <b>This service exists so that doesn&apos;t happen to you.</b>
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATS (dark) */}
      <section className="band dark rm-anchor" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What&apos;s actually at risk</span>
            <h2>Three numbers to know before you start.</h2>
            <p>The cost of a mishandled migration — and exactly what this service is built to prevent.</p>
          </Reveal>
          <StatsGrid />
        </div>
      </section>

      {/* WRONG vs RIGHT */}
      <section className="band rm-anchor" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Done wrong vs done right</span>
            <h2>The difference is in the planning — not launch day.</h2>
            <p>Every migration we run follows the &quot;done right&quot; column. Every step.</p>
          </Reveal>
          <div className="rm-vs2">
            <Reveal className="rm-vscol wrong">
              <div className="vh">
                <span className="vi">{X_ICON(2.4)}</span>
                <h3>Migration done wrong</h3>
              </div>
              <ul>
                {WRONG.map((item) => (
                  <li key={item}>
                    <span className="m">{X_ICON(2.6)}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="rm-vscol right" style={d(90)}>
              <div className="vh">
                <span className="vi">{CHECK_ICON(2.4)}</span>
                <h3>Migration done right</h3>
              </div>
              <ul>
                {RIGHT.map((item) => (
                  <li key={item}>
                    <span className="m">{CHECK_ICON(2.6)}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHEN */}
      <section className="band tint rm-anchor" id="when">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">When you need this service</span>
            <h2>Not just a design refresh.</h2>
            <p>You need a full Redesign &amp; Migration engagement if any of these apply.</p>
          </Reveal>
          <div className="rm-when-grid">
            {WHEN.map((item, i) => (
              <Reveal className="rm-when" key={i} style={d(item.delay)}>
                <span className="wk">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD (interactive) */}
      <section className="band rm-anchor" id="method">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our 4-phase methodology</span>
            <h2>Nothing skipped, nothing improvised.</h2>
            <p>Every migration follows the same four phases — refined across every project we&apos;ve run. Pick a phase.</p>
          </Reveal>
          <MethodTabs />
        </div>
      </section>

      {/* INCLUDED (4 groups) */}
      <section className="band tint rm-anchor" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What&apos;s included in every engagement</span>
            <h2>The full methodology — plus these deliverables.</h2>
          </Reveal>
          <Reveal className="rm-inc-grid">
            {INCLUDED.map((group) => (
              <div className="rm-inc" key={group.title}>
                <div className="ih">
                  <span className="ii">{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="band rm-anchor" id="timeline">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Timeline</span>
            <h2>Most migrations run 6–10 weeks.</h2>
            <p>Every step ends with a clear deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="rm-steps">
            {TIMELINE.map((step) => (
              <Reveal as="article" className="rm-step" key={step.title} style={d(step.delay)}>
                <span className="rm-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint rm-anchor" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>Priced by site size, not billed by the hour. No &quot;custom quote after a discovery call.&quot;</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Project fees paid in three installments — <strong>30% at kickoff, 40% at staging sign-off, 30% at launch.</strong>{" "}
            Hosting, platform fees, and premium plugins are separate. Every exact number is on the{" "}
            <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every migration." />

      <CtaBand
        eyebrow="Website Redesign & Migration"
        heading="Migrate or redesign — without the traffic disaster."
        copy={
          <>
            Book a free migration audit. We&apos;ll look at your current site, your goals, and where the risk points are
            — <strong>with a clear plan and price at the end. No obligation, no fear tactics.</strong>
          </>
        }
        primaryLabel="Book a free migration audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
