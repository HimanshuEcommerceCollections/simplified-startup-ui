"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
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
import "./lp-page.css";

const h = (v: string): CSSProperties => ({ "--h": v } as CSSProperties);

/* -------- icons -------- */

const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOOK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v14H4zM4 9h16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

/* -------- content -------- */

const WHEN: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_TARGET, text: <>You&apos;re running <strong>Google or Meta Ads to your homepage,</strong> and half the clicks bounce.</> },
  { icon: ICON_ROCKET, text: <>You&apos;re <strong>launching a new product</strong> and need a focused page, not a distracting full site.</>, delay: 60 },
  { icon: ICON_CALENDAR, text: <>You&apos;re running a <strong>webinar, event, or waitlist</strong> that needs signups, not general info.</> },
  { icon: ICON_BOOK, text: <>You&apos;re <strong>gating a lead magnet</strong> (ebook, template, checklist, demo) behind an email form.</>, delay: 60 },
  { icon: ICON_STAR, text: <>You&apos;re promoting a <strong>special offer or seasonal campaign</strong> that shouldn&apos;t live forever on your site.</> },
  { icon: ICON_REFRESH, text: <>You&apos;re <strong>testing a new market, audience, or message</strong> without rebuilding your whole site.</>, delay: 60 },
];

const PAINS = [
  { title: "Too much on one page", text: "Trying to sell three things at once, so the page sells nothing.", delay: 0 },
  { title: "Ad says one thing, page another", text: <>Buyer clicked &quot;free demo&quot; and lands on &quot;our company.&quot; They bounce.</>, delay: 60 },
  { title: "Slow to load", text: "Every second over 3s drops conversions ~7%. Most pages take 5+.", delay: 120 },
  { title: "Weak headline", text: "The most-read line on the page — vague or generic. Visitors gone in 5 seconds.", delay: 0 },
  { title: "Long forms", text: "Asking for 12 fields when 3 would do. Every extra field drops conversion.", delay: 60 },
  { title: "No testing", text: "One version launched, never touched. No idea what would work better.", delay: 120 },
];

const ANAT_PAGE: { no: string; width?: string; cls?: string }[] = [
  { no: "01", cls: "is-hero is-on" },
  { no: "02", width: "70%" },
  { no: "03", width: "85%" },
  { no: "04", width: "78%" },
  { no: "05", width: "88%" },
  { no: "06", width: "72%" },
  { no: "08", width: "50%", cls: "is-cta" },
  { no: "10", width: "46%" },
];

const ANAT_ROWS = [
  { b: "Above-the-fold hero", s: "Land the message in 5 seconds — headline, sub, visual, primary CTA." },
  { b: "Trust bar", s: "Logos, review count, guarantees — so visitors know you’re legit." },
  { b: "The problem / pain point", s: "Show you understand what they’re trying to solve." },
  { b: "The solution / offer", s: "What you’re offering and why it fixes the problem." },
  { b: "Benefits or features", s: "What they get — expressed as outcomes, not features." },
  { b: "Social proof", s: "Testimonials, case studies, data, or press mentions." },
  { b: "Objection handling", s: "Address the top 2–3 reasons visitors don’t convert." },
  { b: "Second CTA", s: "A reminder to act, after the persuasion has done its work." },
  { b: "FAQ", s: "Cover the last-mile questions so no one leaves confused." },
  { b: "Final CTA", s: "The last push, with a final trust signal and a clear next step." },
];

const INCLUDED: { icon: ReactNode; title: string; items: string[] }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Strategy & copywriting",
    items: ["One-hour strategy call", "Full page copy (headline → CTAs)", "Message match to your source", "Two rounds of revisions"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Design & build",
    items: ["Custom design (not a template)", "Mobile-first responsive", "Load speed under 3 seconds", "Built on your platform"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Conversion elements",
    items: ["Optimized form (only needed fields)", "Trust signals", "Sticky CTA on mobile", "Exit-intent pop-up (optional)"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Tracking & integration",
    items: ["GA4 + conversion tracking", "Meta / Google Ads pixels", "Form + CRM integration", "Heatmap tool setup"],
  },
  {
    icon: ICON_REFRESH,
    title: "Testing & iteration",
    items: ["A/B framework from launch", "One tested variant included", "30 days optimization support", "Reports at day 14 & 30"],
  },
];

type TypeKey = "leadgen" | "ppc" | "launch" | "webinar" | "magnet" | "waitlist";

const TYPES: { key: TypeKey; icon: ReactNode; label: string; sub: string; name: ReactNode; tag: ReactNode; items: ReactNode[] }[] = [
  {
    key: "leadgen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Lead-gen",
    sub: "Calls & quotes",
    name: "Lead-Gen Pages",
    tag: "For service, B2B, and any campaign where the goal is a booked call or quote.",
    items: ["Short, high-converting lead form", "Trust signals (reviews, results)", "Calendar integration for booking", "CRM connection + lead routing", "Thank-you page + confirmation email"],
  },
  {
    key: "ppc",
    icon: ICON_TARGET,
    label: "PPC / Google Ads",
    sub: "1:1 message match",
    name: "PPC / Google Ads Pages",
    tag: "One page per ad group with 1:1 message match — lift Quality Score, cut CPC.",
    items: ["Message match to specific ad copy", "Landing page per audience", "Ad-to-page tracking baked in", "Speed-optimized for Quality Score", "A/B tested vs your current page"],
  },
  {
    key: "launch",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="1.5" fill="currentColor" />
      </svg>
    ),
    label: "Product / SaaS launch",
    sub: "Focused hero",
    name: "Product / SaaS Launch Pages",
    tag: "For launches, feature releases, or upgrades that need a focused hero moment.",
    items: ["Product visuals or interactive demo", "Waitlist / early-access form", "Founder or product-story section", <>Pricing tiers (or &ldquo;coming soon&rdquo;)</>, "Social share & referral options"],
  },
  {
    key: "webinar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Webinar & event",
    sub: "Signups + attendance",
    name: "Webinar & Event Pages",
    tag: "For webinars, live events, and summits — signups plus attendance.",
    items: ["Date, time, and countdown timer", "Speaker bios & topic breakdown", "Signup form with calendar invite", "Reminder email + SMS automation", "Replay-page setup for post-event"],
  },
  {
    key: "magnet",
    icon: ICON_BOOK,
    label: "Lead magnet",
    sub: "Gated content",
    name: "Lead Magnet / Gated Content",
    tag: "For ebooks, checklists, templates, or tools offered for an email.",
    items: ["Preview of the content", "Short opt-in form", "Instant email delivery", "Nurture sequence trigger", "Thank-you page with next-step CTA"],
  },
  {
    key: "waitlist",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Coming soon / waitlist",
    sub: "Capture demand",
    name: "Coming Soon / Waitlist Pages",
    tag: "For pre-launch brands and product waitlists that still capture demand.",
    items: ["Big brand-story hero", "Short waitlist email form", "Countdown or launch date", "Referral / share incentives", "Auto-response confirmation email"],
  },
];

const STEPS = [
  { no: "Day 1", title: "Kickoff & strategy", text: "One-hour call to lock the goal, audience, offer, and destination. Structure and CTA confirmed.", delay: 0 },
  { no: "Days 1–2", title: "Copywriting", text: "Full page copy delivered for review — headline, subhead, body, CTAs. One round of revisions.", delay: 70 },
  { no: "Days 2–4", title: "Design & build", text: "Custom design + development on your platform. Mobile-first, load-time optimized, integrations connected.", delay: 140 },
  { no: "Days 4–5", title: "QA & testing setup", text: "Cross-browser QA, mobile & form testing, A/B variant setup, tracking verified. Ready for traffic.", delay: 210 },
  { no: "Day 5+", title: "Launch & optimize", text: "Page goes live — 30 days of optimization support: A/B tests, form changes, headline swaps.", delay: 280 },
];

const TIERS = [
  { name: "Single Landing Page", best: "One campaign, one page — lead-gen, PPC, webinar, or waitlist.", price: "Published" },
  { name: "3-Page Bundle", best: "Multiple ad groups or campaigns — one message match per audience.", price: "Published", featured: true, badge: "Best value", delay: 70 },
  { name: "5-Page Bundle", best: "Full paid-ads program — variants per persona, product, or offer.", price: "Published", delay: 140 },
  { name: "Landing Page Retainer", best: "Ongoing monthly pages + A/B testing — for teams shipping campaigns every month.", price: "Published /mo", delay: 210 },
];

const FAQS = [
  { q: "How long to get a page live?", a: <>Most single pages: <strong>2–5 business days</strong> from kickoff to launch. Complex pages (long-form, custom integrations) can take 5–7. On a deadline? Tell us up front and we&apos;ll confirm before starting.</> },
  { q: "Do I need a tool like Unbounce?", a: <>Not necessarily. We build on whatever fits: <strong>Unbounce, Instapage, Landingi, Webflow, WordPress/Elementor, Framer, or custom code.</strong> Tell us what you use and we&apos;ll work with it.</> },
  { q: "Do you write the copy?", a: <>Yes — headline, subhead, body, and CTAs all included. Prefer to write it yourself? We give you a <strong>copy brief with structure and formulas</strong> and design around your text.</> },
  { q: "How is this different from a website page?", a: <>A website page has navigation and multiple exit paths. A landing page has <strong>one goal and one CTA</strong> — everything else stripped out. Different design, copy, and measurement. Built to convert, not educate.</> },
  { q: "Will you A/B test after launch?", a: <>Yes — every page includes <strong>one tested variant plus 30 days of optimization.</strong> For ongoing weekly/monthly tests, see the Landing Page Retainer.</> },
  { q: "What if I need a lot of pages?", a: <>Bulk pricing kicks in at 3 pages — same design system, message match per audience, <strong>faster per-page turnaround</strong> because we build at scale. Ask about the 3- and 5-page bundles.</> },
  { q: "Do you handle the ads too?", a: <>That&apos;s a separate service (Google Ads / Meta Ads). <strong>Many clients bundle a landing page with an ads engagement</strong> so page + traffic launch together.</> },
  { q: "Can you integrate my CRM / email?", a: <>Yes — HubSpot, Salesforce, Mailchimp, Klaviyo, Brevo, ConvertKit, Zapier, or anything with a form webhook. <strong>Connected during the build.</strong></> },
  { q: "What if my page doesn’t convert?", a: <>That&apos;s what the 30 days of support is for — we A/B test headlines, offers, and forms until we find what works. <strong>Landing pages almost always need iteration; it&apos;s baked in.</strong></> },
  { q: "Do I own the page?", a: <>Yes — whatever platform we build on, <strong>you&apos;re the account owner.</strong> All files, source, and access handed over. Leave anytime and keep everything.</> },
];

/* -------- hero signature: homepage vs landing conversion card -------- */

function ConversionCard() {
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
      className={`lp-conv${run ? " run" : ""}`}
      ariaLabel="Homepage versus landing page conversion"
      live="Same traffic · Two pages"
      corner="CONVERSION"
      footLeft="Same ad spend"
      footRight="2.5× the leads →"
    >
      <div className="lp-conv-body">
        <div className="lp-cside home">
          <span className="clab">Homepage</span>
          <div className="cwire">
            <i className="strike"></i>
            <i className="strike"></i>
            <i style={{ width: "70%" }}></i>
            <i className="strike"></i>
            <i className="strike" style={{ width: "60%" }}></i>
          </div>
          <div className="cbar-wrap">
            <div className="cbar">
              <div className="cbar-track">
                <span className="cbar-fill" style={h("24%")}></span>
              </div>
              <span className="cpct">2%</span>
            </div>
          </div>
        </div>
        <div className="lp-cside lp">
          <span className="clab">Landing page</span>
          <div className="cwire">
            <i className="big" style={{ width: "80%" }}></i>
            <i style={{ width: "55%" }}></i>
            <i style={{ width: "65%" }}></i>
            <i className="cta"></i>
          </div>
          <div className="cbar-wrap">
            <div className="cbar">
              <div className="cbar-track">
                <span className="cbar-fill" style={h("100%")}></span>
              </div>
              <span className="cpct">5%</span>
            </div>
          </div>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- landing-page types (tabs) -------- */

function TypesExplorer() {
  const [selected, setSelected] = useState<TypeKey>("leadgen");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = TYPES.find((t) => t.key === selected) ?? TYPES[0];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % TYPES.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + TYPES.length) % TYPES.length;
    if (next === null) return;
    e.preventDefault();
    btnRefs.current[next]?.focus();
    setSelected(TYPES[next].key);
  }

  return (
    <Reveal className="lp-ty-wrap" id="types-int">
      <div className="lp-ty-list" role="tablist" aria-label="Landing page types">
        {TYPES.map((t, i) => (
          <button
            key={t.key}
            className="lp-ty-btn"
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
      <div className="lp-ty-panel">
        <div className="lp-tp-top">
          <span className="big">{active.icon}</span>
          <div>
            <h3>{active.name}</h3>
            <div className="tagline">{active.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="lp-tp-body lp-tp-fade" key={active.key}>
          <span className="k">Typical elements</span>
          <div className="lp-tp-list">
            {active.items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- page -------- */

export default function LandingPageDesignView() {
  return (
    <div className="lp-page">
      <ServiceDetailHero
        crumb={{ label: "Website Development", href: "/website-development" }}
        eyebrow="Single-goal pages · Built to convert · Live in days"
        line1="Landing pages designed"
        line2={
          <>
            to <span className="grad-text">convert.</span>
          </>
        }
        lead={
          <>
            One page, one message, one call-to-action — built to turn ad clicks, email traffic, and campaign visitors
            into leads and customers. <strong>Live in 2–5 business days,</strong> tested from launch, and priced by the
            page, not the hour.
          </>
        }
        primary={{ label: "Book a free landing page call", href: "/start-project" }}
        secondary={{ label: "See how we build them ↓", href: "#anatomy" }}
        compact
      >
        <ConversionCard />
      </ServiceDetailHero>

      <TrustBar items={["2–5 business day turnaround", "A/B testing built in", "Ad-to-page message match", "Transparent per-page pricing"]} />

      {/* WHY */}
      <section className="band" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why landing pages beat homepages</span>
            <h2>A homepage is a mall. A landing page is a checkout.</h2>
            <p>
              Sending paid traffic to your homepage asks visitors to figure out what to buy. Landing pages remove every
              distraction and point at one action — which is why they convert 3–10× better.
            </p>
          </Reveal>
          <div className="lp-why-wrap">
            <Reveal className="lp-stmt">
              <p>
                <b>A doubled conversion rate is the same as doubling your ad budget</b> — without spending another dollar.{" "}
                <span className="mut">
                  If your homepage converts at 2% and a proper landing page converts at 5%, you&apos;ve just made every ad
                  dollar 2.5× more valuable. That&apos;s the entire ROI story — and unlike ads or SEO, a good page keeps
                  compounding across every campaign, launch, and audience test.
                </span>
              </p>
            </Reveal>
            <Reveal className="lp-why-stat" style={d(120)}>
              <div className="big">2.5×</div>
              <div className="lab">
                <strong>more value per ad dollar</strong> — from the same traffic, just a better page.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHEN */}
      <section className="band tint" id="when">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">When you need a landing page</span>
            <h2>Not another homepage redesign.</h2>
            <p>If any of these describe your situation, you need a landing page.</p>
          </Reveal>
          <div className="lp-when-grid">
            {WHEN.map((item, i) => (
              <Reveal className="lp-when" key={i} style={d(item.delay ?? 0)}>
                <span className="wk">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most landing pages</span>
            <h2>They fail for the same handful of reasons.</h2>
            <p>Every one of them is fixable — and we fix them before the page ever goes live, then keep testing after.</p>
          </Reveal>
          <div className="lp-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="lp-pain" key={pain.title} style={d(pain.delay)}>
                <span className="pk">{ICON_X}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lp-pain-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              We fix every one before launch — <span className="gt">then keep testing after.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ANATOMY */}
      <section className="band" id="anatomy">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Anatomy of a page that converts</span>
            <h2>Not creativity — structure.</h2>
            <p>Every section has a specific job. Here&apos;s the anatomy we build to.</p>
          </Reveal>
          <Reveal className="lp-anat-wrap">
            <div className="lp-anat-page" aria-hidden="true">
              <div className="apbar">
                <i></i>
                <i></i>
                <i></i>
              </div>
              {ANAT_PAGE.map((row) => (
                <div className={`lp-aprow${row.cls ? ` ${row.cls}` : ""}`} key={row.no}>
                  <span className="an">{row.no}</span>
                  <span className="abar" style={row.width ? { width: row.width } : undefined}></span>
                </div>
              ))}
            </div>
            <div className="lp-anat-list">
              {ANAT_ROWS.map((row, i) => (
                <div className="lp-arow" key={row.b}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <b>{row.b}</b>
                    <small>{row.s}</small>
                  </div>
                </div>
              ))}
              <p className="lp-anat-note">
                Not every page needs all 10. A webinar signup may use 4; a long-form sales page may use all 10 twice.{" "}
                <strong>The structure adapts to the goal.</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED (5 groups) */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What&apos;s included in every page</span>
            <h2>One flat price. Everything below.</h2>
            <p>No upsells, no line-item invoices — every page ships with all of it.</p>
          </Reveal>
          <Reveal className="lp-inc-grid">
            {INCLUDED.map((inc) => (
              <div className="lp-inc" key={inc.title}>
                <span className="ii">{inc.icon}</span>
                <h3>{inc.title}</h3>
                <ul>
                  {inc.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TYPES (interactive) */}
      <section className="band" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Landing pages we build most</span>
            <h2>Different goals, different structures.</h2>
            <p>Six common types — each with a distinct structure, form design, and copy approach. Pick one.</p>
          </Reveal>
          <TypesExplorer />
          <Reveal as="p" className="lp-ty-note">
            Not seeing your exact use case? <strong>We build for pretty much any single-goal campaign</strong> — just tell
            us what you&apos;re trying to convert.
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>&ldquo;We need a page&rdquo; → live, in 2–5 days.</h2>
            <p>A structured process with no missed deadlines.</p>
          </Reveal>
          <div className="lp-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="lp-step" key={step.title} style={d(step.delay)}>
                <span className="lp-step-no">{step.no}</span>
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
            <h2>Flat price per page.</h2>
            <p>No hourly fees, no hidden extras. Order in bulk for a discount.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            One-time projects paid in full at kickoff (they&apos;re fast). Retainers are{" "}
            <strong>month-to-month with 30 days&apos; notice.</strong> Platform fees (Unbounce, Instapage) are separate if
            applicable. Every exact number is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every page." />

      <CtaBand
        id="start"
        eyebrow="Landing Page Design"
        heading="Need a landing page that actually converts?"
        copy={
          <>
            Book a free call. Tell us what you&apos;re running — ads, launch, webinar, waitlist — and we&apos;ll come back
            with a clear plan, price, and timeline, <strong>usually with the page live within a week. No obligation.</strong>
          </>
        }
        primaryLabel="Book a free landing page call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
