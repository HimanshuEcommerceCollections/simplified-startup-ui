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
  SignatureCard,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./em-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CART = (
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
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_ENVELOPE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v14H4zM4 9h16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_AUDIT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2M9 11h4M11 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero: scrambled gradient word ("table.") -------- */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/<>*";

function ScrambleWord({ text }: { text: string }) {
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
        setShown(out);
        iters += 0.6;
        if (iters >= text.length) {
          clearInterval(interval);
          setShown(text);
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

/* -------- hero signature: ROI / email-program card -------- */

const FLOWS = [
  { icon: ICON_ENVELOPE, name: "Welcome flow" },
  { icon: ICON_CART, name: "Abandoned cart" },
  { icon: ICON_REFRESH, name: "Win-back" },
];

function RoiCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the card is shown in its end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="Email marketing ROI and program"
      className={`em-roi${run ? " run" : ""}`}
      live="Email program · Live"
      corner="YOU OWN THE LIST"
      footLeft="Campaigns + flows + deliverability"
      footRight="predictable revenue →"
    >
      <div className="em-roi-hero">
        <span className="in1">
          <span className="n">$1</span>
          <small>spent</small>
        </span>
        <span className="arr">{ICON_ARROW}</span>
        <span className="out">
          <span className="big">$42</span>
          <small>avg return</small>
        </span>
      </div>
      <p className="em-roi-cap">Industry average ROI — nothing else comes close.</p>
      <div className="em-roi-flow">
        {FLOWS.map((flow) => (
          <div className="em-rf" key={flow.name}>
            <span className="rfi">{flow.icon}</span>
            <span className="rn">{flow.name}</span>
            <span className="rt">
              <span className="d"></span>Live
            </span>
          </div>
        ))}
      </div>
      <div className="em-roi-auth">
        {["SPF", "DKIM", "DMARC"].map((auth) => (
          <span key={auth}>
            {ICON_CHECK_BOLD}
            {auth}
          </span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY = [
  { icon: ICON_SHIELD, title: "You own your list", text: <>Instagram can shut your account tomorrow. Google can change its algorithm. <strong>Your list is yours forever.</strong></> },
  { icon: ICON_MAIL, title: "Direct-to-inbox access", text: <>No algorithm deciding who sees your message. <strong>If someone opts in, you’re in their inbox.</strong></>, delay: 60 },
  { icon: ICON_REFRESH, title: "Automations pay while you sleep", text: <>A welcome flow set up once <strong>keeps generating sales for years.</strong></>, delay: 120 },
  { icon: ICON_DOLLAR, title: "Cheapest per-lead by miles", text: <>Once a subscriber joins, reaching them costs <strong>a fraction of an ad click.</strong></> },
  { icon: ICON_LINES, title: "Personalization at scale", text: <>Segmented emails perform <strong>3–5× better</strong> than one-size-fits-all blasts.</>, delay: 60 },
  { icon: ICON_TREND, title: "Money on the table", text: <>If you’re not doing email well, <strong>your competitors are already picking up what you leave.</strong></>, delay: 120 },
];

/* -------- problem -------- */

const PAINS = [
  { title: "One newsletter = “strategy”", text: "Real email is 20+ touches a month across campaigns, flows, and segments — not one send." },
  { title: "Zero attention to deliverability", text: "Emails land in spam and nobody notices until opens crater. It’s a working list vs a dead one.", delay: 60 },
  { title: "Set-and-forget automations", text: "Welcome flow built once, never updated — revenue-per-email quietly drops every month.", delay: 120 },
  { title: "No segmentation", text: "Same email to everyone. New subscriber gets the same as your best customer. Both unsubscribe." },
  { title: "They ignore SMS", text: "Email + SMS together can 2× campaign revenue — most agencies only handle email.", delay: 60 },
  { title: "Reports of “opens” & “clicks”", text: "Not revenue-per-email, list churn, or LTV — the numbers that actually matter.", delay: 120 },
];

/* -------- what's included (interactive, 9 parts) -------- */

type Included = {
  key: string;
  btnName: string;
  btnSub: string;
  name: string;
  tag: string;
  items: string[];
};

const INCLUDED: Included[] = [
  {
    key: "audit",
    btnName: "Audit & strategy",
    btnSub: "Revenue baseline",
    name: "Email Audit & Strategy",
    tag: "Every engagement starts here — a clear look at your list, deliverability, campaigns, and flows.",
    items: ["List health check (deliverability, engagement, churn)", "Existing campaign & flow audit", "Competitor & category benchmarking", "Revenue-per-email baseline", "Segmentation opportunity analysis", "90-day + 12-month strategy"],
  },
  {
    key: "platform",
    btnName: "Platform setup / migration",
    btnSub: "The right ESP",
    name: "Platform Setup & Migration",
    tag: "We set up or migrate to the ESP that fits your business — not the one that pays us.",
    items: ["Platform recommendation for your needs", "New setup or migration", "Domain authentication (SPF, DKIM, DMARC)", "IP warm-up for sender reputation", "Website, CRM & store integration", "Team access, permissions, templates"],
  },
  {
    key: "list",
    btnName: "List building & growth",
    btnSub: "Grow it right",
    name: "List Building & Growth",
    tag: "A dying list is a dying business — we grow it every month with subscribers who engage.",
    items: ["Sign-up forms & pop-ups (A/B tested)", "Lead magnets & content upgrades", "Landing page opt-ins", "Referral & viral loops", "List cleaning of disengaged contacts", "List sourcing (for cold programs)"],
  },
  {
    key: "campaign",
    btnName: "Campaign design & copy",
    btnSub: "Opened & clicked",
    name: "Campaign Design & Copywriting",
    tag: "The emails your subscribers actually open — human copy, mobile-first design, one clear action.",
    items: ["Weekly / bi-weekly campaign strategy", "Subject line & preview text", "Copy (promo, educational, story-driven)", "Mobile-first email design", "Branded template library", "A/B testing subject, time, content"],
  },
  {
    key: "flows",
    btnName: "Automation flows",
    btnSub: "Revenue on autopilot",
    name: "Automation Flows",
    tag: "Revenue on autopilot — built once, refined monthly, generating sales every day.",
    items: ["Welcome series for new subscribers", "Abandoned cart & browse abandonment", "Post-purchase + upsell / cross-sell", "Win-back for disengaged subscribers", "Birthday, anniversary, lifecycle triggers", "B2B lead-nurture sequences"],
  },
  {
    key: "segment",
    btnName: "Segmentation",
    btnSub: "Biggest lever",
    name: "Segmentation & Personalization",
    tag: "The single biggest lever — the right message to the right subscriber.",
    items: ["Behavior-based segments (open, click, buy)", "Purchase-history & LTV segments", "Engagement-level segmentation", "Dynamic content blocks per segment", "Personalized product recommendations", "Predictive send-time optimization"],
  },
  {
    key: "deliver",
    btnName: "Deliverability",
    btnSub: "Inbox, not spam",
    name: "Deliverability & Compliance",
    tag: "The invisible work that decides inbox vs spam. Most agencies skip it — we start with it.",
    items: ["Sender authentication (SPF, DKIM, DMARC)", "IP reputation monitoring", "Inbox placement testing", "Bounce & unsubscribe management", "GDPR, CAN-SPAM, CCPA compliance", "Ongoing list hygiene"],
  },
  {
    key: "sms",
    btnName: "SMS & WhatsApp",
    btnSub: "Add-on channel",
    name: "SMS & WhatsApp (Add-on)",
    tag: "Email + SMS together drive dramatically better revenue — one platform, one strategy.",
    items: ["SMS campaign strategy & copywriting", "WhatsApp Business setup & campaigns", "SMS automation flows (cart, updates, promos)", "Compliance (TCPA, opt-in / opt-out)", "Unified email + SMS reporting"],
  },
  {
    key: "report",
    btnName: "Reporting & reviews",
    btnSub: "Tied to revenue",
    name: "Reporting & Strategy Reviews",
    tag: "Never just “here’s the dashboard” — a plain-language report tied to real revenue.",
    items: ["Monthly report (revenue-per-email, growth)", "Campaign & flow performance breakdown", "Segmentation health & opportunities", "Live dashboard access", "Quarterly strategy review", "Direct Slack / email to your manager"],
  },
];

function IncludedExplorer() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = INCLUDED[active];

  function select(i: number) {
    const next = (i + INCLUDED.length) % INCLUDED.length;
    setActive(next);
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
    <Reveal className="em-wb-wrap" id="included-int">
      <div className="em-wb-list" role="tablist" aria-label="What's included">
        {INCLUDED.map((inc, i) => (
          <button
            key={inc.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="em-wb-btn"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{i + 1}</span>
            <span className="dn">
              <b>{inc.btnName}</b>
              <small>{inc.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="em-wb-panel">
        <div className="em-wp-top">
          <span className="big">{ICON_MAIL}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        <div className="em-wp-body em-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="em-wp-list">
            {item.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- business types -------- */

const TYPES: { icon: ReactNode; title: string; desc: string; items: string[] }[] = [
  { icon: ICON_CART, title: "E-commerce", desc: "Email drives 20–40% of total revenue when done right.", items: ["Klaviyo / Shopify Email setup", "Full flow suite (welcome, cart, browse, win-back)", "Weekly campaign calendar", "Product recommendation blocks", "Segmentation by purchase history"] },
  { icon: ICON_PIN, title: "Local businesses", desc: "Email that fills your booking calendar.", items: ["Booking & appointment reminders", "Local promo & event campaigns", "Birthday & anniversary flows", "Review request automations", "Referral campaigns + local growth"] },
  { icon: ICON_BRIEFCASE, title: "B2B & SaaS", desc: "For long sales cycles and high customer values.", items: ["Lead-nurture sequences", "Sales-triggered email flows", "Segment-specific content tracks", "Trial & onboarding sequences", "CRM integration + pipeline reporting"] },
  { icon: ICON_PHONE, title: "Cold email & outbound", desc: "Booking meetings from cold outreach.", items: ["Prospect list building", "Domain warm-up + deliverability", "Multi-step sequence design", "Personalized copy at scale", "Reply management + booked-meeting reporting"] },
  { icon: ICON_ENVELOPE, title: "Newsletter & content", desc: "For creators & media growing a real audience.", items: ["Editorial content strategy", "Weekly / bi-weekly newsletter writing", "Sponsorship & monetization setup", "Beehiiv / Substack / ConvertKit setup", "Referral + cross-promo growth"] },
  { icon: ICON_AUDIT, title: "Email Marketing Audit", desc: "A deep one-off review — no commitment.", items: ["Full list health & deliverability check", "Campaign & flow review", "Segmentation & personalization audit", "Design & copy critique", "Revenue-per-email + prioritized fix list"] },
];

/* -------- platforms -------- */

const PLATFORMS = [
  { name: "Klaviyo", best: "E-commerce (especially Shopify) — the industry standard for online stores" },
  { name: "HubSpot", best: "B2B & SaaS — tight CRM + email integration" },
  { name: "Brevo", best: "Small businesses — 200 emails/day free, great value at scale" },
  { name: "Mailchimp", best: "Established brands — easy templates, wide integrations" },
  { name: "ActiveCampaign", best: "Automation-heavy campaigns — strong flow logic" },
  { name: "ConvertKit", best: "Creators, coaches, and newsletter brands" },
  { name: "Beehiiv & Substack", best: "Content-first newsletters with built-in growth features" },
  { name: "Constant Contact", best: "Small local businesses — simple and affordable" },
];

/* -------- who / steps / pricing / faq -------- */

const WHO = [
  { icon: ICON_CART, text: <><strong>An e-commerce store</strong> with regular customers — email is the highest-ROI channel for online sales, hands down.</> },
  { icon: ICON_PIN, text: <><strong>A local business</strong> with repeat customers — email fills booking calendars and drives referrals cheaply.</>, delay: 60 },
  { icon: ICON_BRIEFCASE, text: <><strong>A B2B or SaaS company</strong> with long sales cycles — nurture keeps you top-of-mind through the buying process.</>, delay: 120 },
  { icon: ICON_SHIELD, text: <><strong>A service business</strong> with an existing customer base — email drives repeat bookings, upsells, and referrals.</> },
  { icon: ICON_ENVELOPE, text: <><strong>A creator or media brand</strong> building a newsletter as a real audience asset.</>, delay: 60 },
  { icon: ICON_TREND, text: <><strong>Any business with a neglected list</strong> — there’s usually 10–30% of monthly revenue sitting in it, unused.</>, delay: 120 },
];

const STEPS = [
  { no: "Week 1", title: "Audit & strategy", text: "Full audit of list, campaigns, flows, and deliverability. A plain-language strategy doc: what to launch, fix, and expect." },
  { no: "Week 2", title: "Setup & foundation", text: "Platform setup or migration. Domain authentication (SPF, DKIM, DMARC). Branded templates built. Segments created.", delay: 70 },
  { no: "Weeks 3–4", title: "First campaigns & flows", text: "First weekly campaigns launched. Highest-priority automations built (welcome + cart, or lead-nurture for B2B).", delay: 140 },
  { no: "Months 2–3", title: "Optimize & expand", text: "A/B test subject lines, send times, content. Add more flows. Segment deeper. Test SMS as an add-on channel.", delay: 210 },
  { no: "Ongoing", title: "Report, review, refine", text: "Monthly plain-language reports, quarterly strategy reviews, continuous testing and list growth.", delay: 280 },
];

const TIERS = [
  { name: "Starter Email", best: "Small businesses — 1–2 campaigns/week, welcome flow, monthly reporting.", price: "Published /mo" },
  { name: "Growth Email", best: "Growing brands — weekly campaigns, full flow suite, segmentation, A/B testing.", price: "Published /mo", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Email", best: "E-commerce & high-volume — multiple weekly campaigns, advanced flows, SMS layer, deep personalization.", price: "Published /mo", delay: 140 },
  { name: "One-off Email Audit", best: "A deep audit + 90-day roadmap for your existing program, no commitment.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "Which email platform should I use?", a: <>Depends on your business — <strong>Klaviyo</strong> for e-commerce, <strong>HubSpot</strong> for B2B, Brevo/Mailchimp for small businesses, ConvertKit/Beehiiv for creators. We’ll recommend the right one on the strategy call — no upsell to the priciest tool.</> },
  { q: "How big does my list need to be?", a: <>No hard minimum. Even a few hundred can generate real revenue with the right automations. <strong>Engagement matters more — an engaged 500 beats a stale 50,000.</strong></> },
  { q: "Email marketing vs email automation?", a: <>Email marketing is the whole program — campaigns, automations, list growth. <strong>Automation is one part:</strong> the flows (welcome, cart, post-purchase) that send themselves based on behavior.</> },
  { q: "How long before I see results?", a: <>For e-commerce with traffic: automation-flow revenue usually shows in the <strong>first 30 days,</strong> campaign revenue in 60. Segmentation and testing gains compound from month 3.</> },
  { q: "Do you handle SMS too?", a: <>Yes — email + SMS together significantly outperform email alone. We run them from the same platform on a combined strategy (see the SMS &amp; WhatsApp Marketing service).</> },
  { q: "What if my emails land in spam?", a: <>A deliverability problem — usually fixable in 2–4 weeks. We audit sender authentication, list hygiene, engagement, and content triggers. <strong>Deliverability is included, not a paid add-on.</strong></> },
  { q: "Do I own my list and account?", a: <>Yes — every list, account, template, and piece of content stays under your ownership. <strong>If you leave, you keep everything.</strong></> },
  { q: "Do you write the emails or do I?", a: <>We handle it — copy, subject lines, and design included at every tier. You always get final approval, and you can write your own with our templates and strategy if you prefer.</> },
  { q: "Can you help grow my list, not just email it?", a: <>Yes — list growth is core to every package: <strong>sign-up forms, pop-ups, lead magnets, referral loops, and landing-page opt-ins.</strong></> },
  { q: "Do you do cold email / outbound?", a: <>Yes — a separate specialized service (see Cold Email &amp; Outbound). It uses <strong>different tools, domains, and rules</strong> than opt-in email marketing.</> },
];

export default function EmailMarketingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        eyebrow="Campaigns · Automations · List growth · Deliverability"
        line1="The $42-per-$1 channel"
        line2={
          <>
            you’re leaving on the <ScrambleWord text="table." />
          </>
        }
        lead={
          <>
            Email marketing that turns your list into predictable revenue — not just newsletters no one reads. Campaign
            strategy, automation flows, copy, design, and deliverability,{" "}
            <strong>all handled by one team at published prices with no long lock-in.</strong>
          </>
        }
        primary={{ label: "Book a free email audit", href: "/start-project" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <RoiCard />
      </ServiceDetailHero>

      <TrustBar items={["Platform-agnostic (Klaviyo, HubSpot, Brevo…)", "Transparent published pricing", "Month-to-month", "You own everything"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why email still beats everything else</span>
            <h2>The oldest digital channel — still the most profitable.</h2>
            <p>Every study puts email ROI between $36 and $45 for every $1 spent. Nothing else comes close. Here’s why.</p>
          </Reveal>
          <div className="em-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most email agencies</span>
            <h2>Most treat email like a checkbox.</h2>
            <p>Here’s what we see over and over — and what we built our service to fix.</p>
          </Reveal>
          <div className="em-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="em-pain" key={pain.title} style={d(pain.delay ?? 0)}>
                <span className="pk">{ICON_X}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="em-pain-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              We built our Email Marketing service to fix <span className="gt">every one of those.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>A revenue program — not monthly newsletters.</h2>
            <p>Everything an email program needs to actually generate revenue, run by one team. Nine parts — pick one to see inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* BUSINESS TYPES */}
      <section className="band tint" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Built for your business type</span>
            <h2>Email works differently by business model.</h2>
            <p>Specialized packages, each built for a specific kind of business.</p>
          </Reveal>
          <Reveal className="em-bt-grid">
            {TYPES.map((type) => (
              <div className="em-bt" key={type.title}>
                <div className="bh">
                  <span className="bi">{type.icon}</span>
                  <h3>{type.title}</h3>
                </div>
                <p className="bd">{type.desc}</p>
                <ul>
                  {type.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="band" id="platforms">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Platforms we work with</span>
            <h2>The right tool — not the one that pays us.</h2>
            <p>We’re platform-agnostic. Common ESPs we set up, migrate to, and run campaigns in:</p>
          </Reveal>
          <Reveal className="em-esp-tbl">
            <div className="em-esp-row head">
              <div>Platform</div>
              <div>Best for</div>
            </div>
            {PLATFORMS.map((esp) => (
              <div className="em-esp-row" key={esp.name}>
                <div className="en">{esp.name}</div>
                <div>{esp.best}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="em-esp-note">
            Not sure which is right for you? <strong>We’ll recommend one during the strategy call — no upsell to the priciest option.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>Biggest return if you’re…</h2>
          </Reveal>
          <div className="em-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="em-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
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
            <h2>Revenue in month one — not “trust us for six.”</h2>
            <p>A structured process — every step ends with a deliverable and your sign-off.</p>
          </Reveal>
          <div className="em-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="em-step" key={step.no} style={d(step.delay ?? 0)}>
                <span className="em-step-no">{step.no}</span>
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
            <h2>One clear price, published up front.</h2>
            <p>No 12-month contracts, no hidden fees, no minimum list size.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> Platform fees (Klaviyo, HubSpot, etc.) are separate, paid directly to
            the vendor. Every rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="Email Marketing"
        heading="Ready to turn your list into real revenue?"
        copy={
          <>
            Book a free email marketing audit. We’ll look at your list, your current campaigns, your automations, and what
            it would take to grow —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              with a clear price at the end. No obligation, no jargon, no minimum list size.
            </strong>
          </>
        }
        primaryLabel="Book a free email audit call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
