"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
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
import "./mvp-page.css";

/* -------- icons -------- */

const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DESIGN = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- content -------- */

const REALITY = [
  {
    icon: ICON_CLOCK,
    title: "You don’t have six months",
    text: (
      <>
        Traditional agencies quote 3–6 month timelines — longer than most startups take to pivot.{" "}
        <strong>We ship in 2–4 weeks.</strong>
      </>
    ),
    delay: 0,
  },
  {
    icon: ICON_DOLLAR,
    title: "You don’t have $50K",
    text: (
      <>
        Most “startup web agencies” have $25K–$150K minimums — written for Series A, not founders.{" "}
        <strong>We’re priced for reality.</strong>
      </>
    ),
    delay: 80,
  },
  {
    icon: ICON_CHECK,
    title: "You don’t need 47 pages",
    text: (
      <>
        You need one thing to work: sign-ups, demos, or investor interest. <strong>We build for that one job.</strong>
      </>
    ),
    delay: 160,
  },
];

const LAUNCH_TYPES = [
  {
    badge: "2 weeks",
    title: "Waitlist / Pre-Launch",
    lead: "For products still in build — capture demand before you ship.",
    items: ["Brand-story hero", "Waitlist email form", "Countdown or launch date", "Referral / share loops", "Auto-confirm email setup", "Social preview cards"],
    delay: 0,
  },
  {
    badge: "2–3 weeks",
    title: "Demo / Investor Site",
    lead: "For pitching investors, running demos, or booking initial calls.",
    items: ["Founder + team credibility", "Product story with visuals", "Traction and metrics section", "Investor deck download", "Calendly / call booking", "Contact-first design"],
    delay: 80,
  },
  {
    badge: "3–4 weeks",
    title: "Product Launch Site",
    lead: "For live products — shipping the first real marketing site.",
    items: ["Homepage + product page", "Pricing (or coming-soon tier)", "Signup / trial flow", "Case study or beta users", "FAQ + integrations", "Analytics from day one"],
    delay: 160,
  },
];

type IncludedKey = "strategy" | "copy" | "design" | "dev" | "launch";

const INCLUDED: { key: IncludedKey; icon: ReactNode; label: string; sub: string; name: string; tag: string; items: string[] }[] = [
  {
    key: "strategy",
    icon: ICON_TARGET,
    label: "Strategy",
    sub: "Short, sharp",
    name: "Strategy (short, sharp)",
    tag: "One call replaces a $10K discovery phase — we lock the goal and move.",
    items: ["One 60-minute kickoff call: goal, audience, offer", "Positioning and one-line pitch", "Site map — usually one or two pages, no bloat"],
  },
  {
    key: "copy",
    icon: ICON_LINES,
    label: "Copy that sells",
    sub: "Founder voice",
    name: "Copy That Sells",
    tag: "Full page copy in founder voice — not agency-speak.",
    items: ["Headline, subhead, body, and CTAs", "Founder-voice tone, not agency jargon", "One round of revisions"],
  },
  {
    key: "design",
    icon: ICON_DESIGN,
    label: "Design that ships",
    sub: "Custom, mobile-first",
    name: "Design That Ships",
    tag: "Custom design, mobile-first, launch-ready — not a template.",
    items: ["Custom design (not a template)", "Mobile-first, launch-ready", "One round of revisions"],
  },
  {
    key: "dev",
    icon: ICON_CODE,
    label: "Development",
    sub: "Webflow / Framer",
    name: "Development on Webflow / Framer",
    tag: "Built on a platform you can edit yourself — fast, CMS-ready, no lock-in.",
    items: ["Webflow (default) or Framer", "CMS-ready so you can update yourself", "Fast load (Core Web Vitals green from day one)", "Domain, SSL, and hosting setup"],
  },
  {
    key: "launch",
    icon: ICON_ROCKET,
    label: "Launch essentials",
    sub: "Tracking + CRM",
    name: "Launch Essentials",
    tag: "Everything wired so the site works and you can measure it from day one.",
    items: ["Google Analytics 4 + conversion tracking", "Form + CRM connection (HubSpot, Mailchimp, Brevo, Zapier)", "Social preview cards (Open Graph, Twitter Card)", "Sitemap and basic SEO structure"],
  },
];

const DONT = [
  { title: "Custom 3D / illustration", text: <>Beautiful, but slow — and <strong>nobody signs up because of your animations.</strong></>, delay: 0 },
  { title: "20+ pages of content", text: <>You need the front page to work. <strong>Add pages after you have users.</strong></>, delay: 60 },
  { title: "50-page strategy doc", text: <>One 60-minute call replaces a $10K discovery phase. <strong>We move fast.</strong></>, delay: 120 },
  { title: "Full brand identity system", text: <>No logo yet? We’ll use something clean. <strong>Full branding is a separate service</strong> when you’re ready.</>, delay: 0 },
  { title: "Complex backend / accounts", text: <>Building a full product? You need a product team, not a marketing site. <strong>This is the marketing site only.</strong></>, delay: 60 },
  { title: "SEO retainer / ads mgmt", text: <>Both are separate services for when you’re ready to drive traffic. <strong>Ship first, scale later.</strong></>, delay: 120 },
];

const SPRINTS = [
  { no: "Sprint 01 · Days 1–3", title: "Strategy + wireframes", text: "60-minute kickoff (goal, audience, offer, launch type). Positioning + one-line pitch. Site map locked (1–2 pages). Low-fi wireframes for approval.", delay: 0 },
  { no: "Sprint 02 · Days 4–12", title: "Copy + design + build", text: "Full copy by Day 5, custom mobile-first design by Day 8, one round of revisions, development on Webflow/Framer, integrations connected.", delay: 90 },
  { no: "Sprint 03 · Days 13–14", title: "QA + launch", text: "Full QA (mobile, desktop, tablet), form + tracking verification, domain/DNS/SSL setup, go-live walkthrough, and 14 days of post-launch support.", delay: 180 },
];

const WHO = [
  { icon: ICON_ROCKET, text: <><strong>A first-time founder</strong> with a product, an idea, or a pitch — and no time to spend six months on a website.</>, delay: 0 },
  { icon: ICON_CHAT, text: <><strong>A pre-launch startup</strong> building a waitlist to gauge demand and warm up an audience before shipping.</>, delay: 60 },
  { icon: ICON_WINDOW, text: <><strong>A SaaS or AI startup</strong> at seed / pre-seed — the site needs to look real, sound clear, and get demos booked.</>, delay: 120 },
  { icon: ICON_SHIELD, text: <><strong>A founder preparing to fundraise</strong> who needs a credible site alongside the pitch deck.</>, delay: 0 },
  { icon: ICON_REFRESH, text: <><strong>A team migrating off a lousy DIY site</strong> (Squarespace, Wix, template) that’s costing them credibility.</>, delay: 60 },
  { icon: ICON_BOLT_THIN, text: <><strong>A founder who just needs to ship</strong> — and is tired of agencies who schedule a call to schedule the discovery call.</>, delay: 120 },
];

const TIERS = [
  { name: "Waitlist / Pre-Launch", best: "1 page — waitlist capture. Live in 2 weeks.", price: "Published" },
  { name: "Demo / Investor Site", best: "1–2 pages — pitch + booking. Live in 2–3 weeks.", price: "Published", featured: true, badge: "Most popular", delay: 70 },
  { name: "Product Launch Site", best: "3–5 pages — homepage, product, pricing, contact. 3–4 weeks.", price: "Published", delay: 140 },
  { name: "Founder + Advisory Bundle", best: "Any package + our Business Startup & Advisory service. Custom scope.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "Can I really launch in 2 weeks?", a: <>Yes — for a waitlist or pre-launch page, absolutely. Demo sites take 2–3 weeks; full product sites 3–4. <strong>The speed comes from doing exactly the right amount of work</strong> — decisive founders get the fastest results.</> },
  { q: "Which platform do you build on?", a: <><strong>Webflow by default</strong> — you can edit and add pages yourself without a developer. Framer if you want something more design-driven. Both industry-leading, no proprietary lock-ins.</> },
  { q: "Do you write the copy?", a: <>Yes — headline, subhead, body, and CTAs, all included. <strong>Founder-voice tone, not agency jargon.</strong> Prefer to write your own? We’ll design around it and give feedback.</> },
  { q: "What if I don’t have a logo or brand yet?", a: <>We can launch with clean typography and a simple mark. Full brand identity is a separate service — <strong>you don’t need a full brand to launch a waitlist.</strong></> },
  { q: "Can I add pages later?", a: <>Yes — once on Webflow/Framer, your team can add pages using the components we built. Or we add them as needed. <strong>No lock-in, no forced retainer.</strong></> },
  { q: "Do you build the actual product / app?", a: <>No — this is the <strong>marketing website only.</strong> Building the product itself needs a product engineering team; we can refer trusted partners in our network.</> },
  { q: "Do I own the site?", a: <>Yes, 100% — all logins, source files, and access handed over at launch. <strong>If you leave, you keep everything.</strong></> },
  { q: "Changing the design after launch?", a: <>Small changes are included in the 14 days of post-launch support. Bigger changes or new pages are billed as needed — <strong>no forced monthly retainer.</strong></> },
  { q: "Help with strategy / investor prep too?", a: <>Yes — that’s our Business Startup &amp; Advisory service. <strong>Bundle it with your site build for a discount</strong> — great for founders raising or clarifying their story.</> },
  { q: "What if I need to move faster than 2 weeks?", a: <>For urgent launches (48–72 hour turnaround), tell us up front. We can accommodate rush jobs with a rush fee and a locked scope. <strong>Message us first — not every project can be rushed responsibly.</strong></> },
];

/* -------- hero signature: three-sprint ship card -------- */

const SHIP_SPRINTS = [
  { no: "01", title: "Strategy + wireframes", days: "Days 1–3", state: "Done" },
  { no: "02", title: "Copy + design + build", days: "Days 4–12", state: "Done" },
  { no: "03", title: "QA + launch", days: "Days 13–14", state: "Live" },
];

function ShipCard() {
  const reduce = useReducedMotion();
  const [rawRun, setRun] = useState(false);
  // reduced motion: render the finished state straight away instead of animating to it
  const run = reduce || rawRun;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setRun(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <SignatureCard
      className={`mvp-ship${run ? " run" : ""}`}
      ariaLabel="A startup site shipping in three sprints"
      live="Build · Shipping"
      corner="FIXED PRICE"
      footLeft="Webflow / Framer · you own it"
      footRight="live in 2 weeks →"
    >
      <div className="mvp-ship-prev" aria-hidden="true">
        <div className="bar">
          <i></i>
          <i></i>
          <i></i>
          <span className="url">yourstartup.com</span>
        </div>
        <div className="body">
          <span className="h"></span>
          <span className="s"></span>
          <span className="s2"></span>
          <span className="cta">Join the waitlist</span>
        </div>
      </div>
      <div className="mvp-ship-sprints">
        {SHIP_SPRINTS.map((sp) => (
          <div className="mvp-sp" key={sp.no}>
            <span className="spn">{sp.no}</span>
            <span className="spt">
              {sp.title}
              <small>{sp.days}</small>
            </span>
            <span className="spc">{sp.state}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- launch types (tilt cards) -------- */

function LaunchTypes() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <Reveal className="mvp-lt-grid">
      <div className="mvp-lt-inner" ref={gridRef}>
        {LAUNCH_TYPES.map((lt) => (
          <article className="mvp-ltc" key={lt.title} data-tilt style={d(lt.delay)}>
            <span className="mvp-ltc-spot"></span>
            <span className="badge">{lt.badge}</span>
            <h3>{lt.title}</h3>
            <p className="ld">{lt.lead}</p>
            <ul>
              {lt.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Reveal>
  );
}

/* -------- what every package includes (tabs) -------- */

function IncludedExplorer() {
  const [selected, setSelected] = useState<IncludedKey>("strategy");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = INCLUDED.find((t) => t.key === selected) ?? INCLUDED[0];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % INCLUDED.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + INCLUDED.length) % INCLUDED.length;
    if (next === null) return;
    e.preventDefault();
    btnRefs.current[next]?.focus();
    setSelected(INCLUDED[next].key);
  }

  return (
    <Reveal className="mvp-wb-wrap" id="included-int">
      <div className="mvp-wb-list" role="tablist" aria-label="What every package includes">
        {INCLUDED.map((t, i) => (
          <button
            key={t.key}
            className="mvp-wb-btn"
            role="tab"
            type="button"
            aria-selected={t.key === selected}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setSelected(t.key)}
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
      <div className="mvp-wb-panel">
        <div className="mvp-wp-top">
          <span className="big">{active.icon}</span>
          <div>
            <h3>{active.name}</h3>
            <div className="tagline">{active.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="mvp-wp-body mvp-wp-fade" key={active.key}>
          <span className="k">What’s inside</span>
          <div className="mvp-wp-list">
            {active.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- page -------- */

export default function StartupMvpWebsitesView() {
  return (
    <div className="mvp-page">
      <ServiceDetailHero
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="mvp-hero"
        compact
        eyebrow="Built for founders · Launch in 2–4 weeks · Fixed price"
        line1="A startup site that’s"
        line2={
          <>
            live in <span className="grad-text">weeks.</span>
          </>
        }
        lead={
          <>
            Waitlist pages, investor sites, product launches, MVP marketing sites — built for founders on real deadlines
            and real budgets. <strong>Fixed price, 2–4 week turnaround,</strong> and none of the enterprise agency
            overhead you’re not ready to pay for.
          </>
        }
        primary={{ label: "Book a free founder call", href: "/start-project" }}
        secondary={{ label: "See what you get ↓", href: "#included" }}
      >
        <ShipCard />
      </ServiceDetailHero>

      <TrustBar items={["Fixed-price packages", "2–4 week launch", "Founder-first pricing (no $50K min)", "You own everything"]} />

      {/* REALITY CHECK */}
      <section className="band tint" id="reality">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Founder reality check</span>
            <h2>You’re not a Series B company.</h2>
            <p>You don’t need a 20-page site. You need something live, credible, and shippable — fast. Three truths we work from.</p>
          </Reveal>
          <FeatureGrid cards={REALITY} columns={3} />
          <Reveal as="p" className="mvp-lt-note" style={{ marginTop: 26 }}>
            The best startup site is the one that’s <strong>live</strong> — not the one that’s “almost done” for the third
            month running.
          </Reveal>
        </div>
      </section>

      {/* LAUNCH TYPES */}
      <section className="band" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pick your launch type</span>
            <h2>Every founder site is really one of three things.</h2>
            <p>We’ve built a dedicated package for each. Pick the one that matches where you are.</p>
          </Reveal>
          <LaunchTypes />
          <Reveal as="p" className="mvp-lt-note">
            Not sure which one you need?{" "}
            <strong>
              <a href="/start-project">Book a free call — we’ll help you pick.</a>
            </strong>
          </Reveal>
        </div>
      </section>

      {/* WHAT EVERY PACKAGE INCLUDES (interactive) */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What every package includes</span>
            <h2>Whichever type you pick, the foundations are the same.</h2>
            <p>Five foundations under every founder site — pick one to see what’s inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* WHAT YOU DON'T GET */}
      <section className="band" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you don’t get — and why that’s OK</span>
            <h2>Trying to include everything is what makes agencies slow.</h2>
            <p>
              Being honest about what we <em>don’t</em> include at launch. Need any of these later? We’ll help — but you
              don’t need them to ship.
            </p>
          </Reveal>
          <div className="mvp-dont-grid">
            {DONT.map((item) => (
              <Reveal className="mvp-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{ICON_X}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mvp-dont-note">
            <span className="mk">{ICON_BOLT}</span>
            <p>
              We ship what matters. <strong>Skip what doesn’t.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3-SPRINT PROCESS */}
      <section className="band tint" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 3-sprint process</span>
            <h2>Move fast without cutting corners.</h2>
            <p>Every sprint ends with something you can review and approve.</p>
          </Reveal>
          <div className="mvp-steps">
            {SPRINTS.map((step) => (
              <Reveal as="article" className="mvp-step" key={step.title} style={d(step.delay)}>
                <span className="mvp-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>The right fit if you’re…</h2>
          </Reveal>
          <div className="mvp-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="mvp-who" key={i} style={d(who.delay)}>
                <span className="wi">{who.icon}</span>
                <p>{who.text}</p>
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
            <h2>Fixed price. Pick your type, know the price.</h2>
            <p>No hourly billing. No “custom quotes” after discovery calls.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Paid in two installments — <strong>50% at kickoff, 50% at launch.</strong> Webflow / Framer platform fees are
            separate, paid directly to the platform. Domain and hosting billed to you at cost. Every rate is on the{" "}
            <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="Startup & MVP Websites"
        heading="Ready to actually launch?"
        copy={
          <>
            Book a free founder call. Tell us what you’re building, where you are, and what you need shipped. We’ll come
            back with a clear plan, fixed price, and launch date —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>usually within the same day. No obligation, no jargon.</strong>
          </>
        }
        primaryLabel="Book a free founder call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
