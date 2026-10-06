"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FeatureGrid, ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d, type FeatureCard } from "../../ServiceDetailKit";
import "./bsp-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_MID = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_X_MID = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_PANEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LOGO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* -------- hero signature: positioning statement -------- */

function PositioningCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the statement is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample positioning statement being written"
      className={`bsp-card${run ? " run" : ""}`}
      live="Positioning statement"
      corner="RESEARCH-BACKED"
      footLeft="Customer interviews included"
      footRight="one story, every channel →"
    >
      <div className="bsp-pos-body">
        <span className="fl">One sentence your whole team can use</span>
        <p className="bsp-pos-stmt">
          For <span className="fill">mid-market ops leaders</span> who <span className="fill">drown in disconnected tools</span>,{" "}
          <b>Northform</b> is the <span className="fill">RevOps platform</span> that{" "}
          <span className="fill">unifies your stack in a week</span>. Unlike legacy suites, we{" "}
          <span className="fill">deploy without a 6-month rollout</span>.
        </p>
      </div>
      <div className="bsp-pos-own">
        <span className="ok">{ICON_CHECK_BOLD}</span>
        <span className="ot">
          <b>A position you own</b>, not a slogan you rent.
        </span>
      </div>
    </SignatureCard>
  );
}

/* -------- why positioning comes first -------- */

const WHY_CARDS: FeatureCard[] = [
  { icon: ICON_CHECK_THIN, title: "Clarity beats creativity", text: <>A clear message <strong>outsells a clever one every time.</strong></> },
  { icon: ICON_SHIELD, title: "Positioning protects pricing", text: <>When you’re the obvious choice for a specific buyer, <strong>price becomes a smaller factor.</strong></>, delay: 80 },
  { icon: ICON_LINES, title: "One story, every channel", text: <>Your website, ads, and sales team <strong>stop sending mixed signals.</strong></>, delay: 160 },
];

/* -------- blending in vs positioned to win -------- */

const BLEND = [
  "“We offer quality service at great prices”",
  "Targets “small businesses” or “everyone”",
  "Lists features instead of outcomes",
  "Website, ads, and sales pitch say different things",
  "Wins deals mainly by discounting",
  "Hard to refer: customers can’t explain you",
];

const POSITIONED = [
  "One sharp promise buyers repeat back to you",
  "Clearly defined ideal customer profile (ICP)",
  "Leads with outcomes and proof",
  "One consistent story across every channel",
  "Wins on value: price becomes secondary",
  "Easy to refer: customers know who you’re for",
];

/* -------- 5-layer framework -------- */

const LAYERS: { no: string; icon: ReactNode; title: string; q: string; items: string[] }[] = [
  { no: "01", icon: ICON_SHIELD, title: "Purpose", q: "Why do you exist?", items: ["Mission", "Vision", "Core values"] },
  { no: "02", icon: ICON_PERSON, title: "Audience", q: "Who exactly do you serve?", items: ["ICP", "Buyer personas", "Pain points"] },
  { no: "03", icon: ICON_TARGET, title: "Positioning", q: "Why you over anyone else?", items: ["Market category", "Differentiators", "Proof points"] },
  { no: "04", icon: ICON_STAR, title: "Personality", q: "How do you sound and feel?", items: ["Brand archetype", "Tone of voice", "Words to avoid"] },
  { no: "05", icon: ICON_LINES, title: "Messaging", q: "What do you say, where?", items: ["Value proposition", "Taglines", "Elevator pitch"] },
];

/* -------- 12 archetypes -------- */

const ARCHETYPES: { icon: ReactNode; name: string; text: string; fit: string }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "The Sage",
    text: "Wisdom, expertise, truth.",
    fit: "Consulting · B2B SaaS · education",
  },
  { icon: ICON_STAR, name: "The Hero", text: "Courage, winning, mastery.", fit: "Fitness · performance · sales" },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9M4 20V4M4 8h12M4 14h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m16 4 2 2-6 6-2.5.5.5-2.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "The Creator",
    text: "Innovation, imagination, craft.",
    fit: "Design · creative tools · agencies",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "The Caregiver",
    text: "Support, protection, compassion.",
    fit: "Healthcare · therapy · nonprofits",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 18h16M5 18l1-9 3 4 3-7 3 7 3-4 1 9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "The Ruler",
    text: "Control, stability, leadership.",
    fit: "Finance · enterprise · luxury",
  },
  { icon: ICON_REFRESH, name: "The Explorer", text: "Freedom, discovery, adventure.", fit: "Travel · outdoor · new-market" },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "The Rebel",
    text: "Disruption, breaking rules.",
    fit: "Challengers · category disruptors",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    name: "The Magician",
    text: "Transformation, the impossible made real.",
    fit: "AI · tech · wellness · coaching",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
        <path d="M2 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5M12 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "The Everyman",
    text: "Belonging, down-to-earth, honest.",
    fit: "Local · everyday products",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    name: "The Lover",
    text: "Passion, intimacy, indulgence.",
    fit: "Beauty · fashion · food · hospitality",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    name: "The Jester",
    text: "Fun, humor, lightness.",
    fit: "Consumer apps · snacks · entertainment",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "The Innocent",
    text: "Simplicity, optimism, purity.",
    fit: "Organic · kids · wellness",
  },
];

/* -------- what we don't do -------- */

const DONT: { title: string; text: ReactNode; delay: number }[] = [
  { title: "Base strategy on opinions", text: <>Every decision is backed by <strong>customer interviews, competitor research, and real data</strong>, not a conference-room guess.</>, delay: 0 },
  { title: "Deliver a 100-page deck", text: <>You get a <strong>short, practical playbook</strong> your team will actually use, not a doorstop.</>, delay: 60 },
  { title: "Write jargon-heavy mission statements", text: <>If your customers wouldn’t say it, <strong>we won’t write it.</strong></>, delay: 0 },
  { title: "Stop at strategy", text: <>We show exactly how it applies to your <strong>homepage, ads, and sales pitch</strong>, not just theory.</>, delay: 60 },
];

/* -------- what's included (explorer) -------- */

type Deliverable = { key: string; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const DELIVERABLES: Deliverable[] = [
  {
    key: "research",
    btnName: "Research & discovery",
    btnSub: "Customer interviews",
    name: "Research & Discovery",
    tag: "Strategy backed by evidence: how buyers actually talk about you, not how you assume they do.",
    items: ["Founder & leadership workshop", "5–10 customer interviews", "Competitor messaging & positioning audit", "Market and category analysis", "Review mining (Google, G2, Trustpilot, Reddit)"],
  },
  {
    key: "audience",
    btnName: "Audience definition",
    btnSub: "ICP + personas",
    name: "Audience Definition",
    tag: "Exactly who you serve, and what they’re really trying to get done.",
    items: ["Ideal customer profile (ICP)", "2–4 buyer personas", "Jobs-to-be-done & pain-point mapping", "Buying triggers and objections"],
  },
  {
    key: "positioning",
    btnName: "Positioning",
    btnSub: "The space you own",
    name: "Positioning",
    tag: "The space you can own, and the proof that you own it.",
    items: ["Market category definition", "Competitive positioning map", "Key differentiators and proof points", "Positioning statement (one sentence)"],
  },
  {
    key: "foundation",
    btnName: "Brand foundation",
    btnSub: "Mission & archetype",
    name: "Brand Foundation",
    tag: "What you stand for and the character behind it.",
    items: ["Mission, vision, and core values", "Brand promise", "Primary & secondary brand archetype", "Brand story and founder narrative"],
  },
  {
    key: "voice",
    btnName: "Voice & messaging",
    btnSub: "What you say",
    name: "Voice & Messaging",
    tag: "What you say, how you say it, and to whom, written to be used.",
    items: ["Tone-of-voice guidelines (do’s & don’ts)", "Value proposition & messaging hierarchy", "Tagline options", "Elevator pitch (10-sec, 30-sec, 2-min)", "Messaging per persona"],
  },
  {
    key: "activation",
    btnName: "Activation",
    btnSub: "Applied, not theory",
    name: "Activation",
    tag: "Strategy applied to the places it actually shows up, not left as theory.",
    items: ["Homepage headline & hero rewrite", "Sales pitch & one-pager talking points", "Social bio & profile copy", "Team walkthrough session (recorded)"],
  },
  {
    key: "playbook",
    btnName: "Strategy playbook",
    btnSub: "Short & practical",
    name: "Brand Strategy Playbook",
    tag: "A short, practical playbook your team will actually open.",
    items: ["Short, practical playbook (PDF + editable)", "One-page brand summary for your team", "Handoff-ready brief for designers & copywriters"],
  },
];

function IncludedExplorer() {
  // the design's script initialises on a key that does not exist ("audit"); start on the
  // button it marks aria-selected instead, which is the first one ("research")
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = DELIVERABLES[active];

  function select(i: number) {
    const next = (i + DELIVERABLES.length) % DELIVERABLES.length;
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
    <Reveal className="bsp-wb-wrap" id="included-int">
      <div className="bsp-wb-list" role="tablist" aria-label="What's included">
        {DELIVERABLES.map((a, i) => (
          <button
            key={a.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="bsp-wb-btn"
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{i + 1}</span>
            <span className="dn">
              <b>{a.btnName}</b>
              <small>{a.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="bsp-wb-panel">
        <div className="bsp-wp-top">
          {/* the design renders the same target mark for every part */}
          <span className="big">{ICON_PANEL}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="bsp-wp-body bsp-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="bsp-wp-list">
            {item.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who / how / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Startups before launch or fundraising</strong> who need a clear story for customers and investors.</>, delay: 0 },
  { icon: ICON_DOLLAR, text: <><strong>Businesses stuck competing on price</strong> because buyers can’t see the difference.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Companies entering a new market</strong> or launching a new product line.</>, delay: 120 },
  { icon: ICON_LOGO, text: <><strong>Teams preparing for a rebrand</strong> who want strategy locked before any design work starts.</>, delay: 180 },
];

const STEPS = [
  { no: "Weeks 1–2", title: "Research", text: "Leadership workshop, customer interviews, competitor audit, and review mining. We learn how buyers actually talk about you.", delay: 0 },
  { no: "Week 3", title: "Audience & positioning", text: "ICP, personas, and positioning map presented. We agree on the position you’ll own before writing any messaging.", delay: 80 },
  { no: "Week 4", title: "Foundation & voice", text: "Mission, values, archetype, and tone of voice defined and reviewed with your team.", delay: 160 },
  { no: "Weeks 5–6", title: "Messaging & playbook", text: "Messaging hierarchy, taglines, and pitches written. Homepage and sales copy updated. Playbook delivered with a team walkthrough.", delay: 240 },
];

const FAQS = [
  { q: "How much does brand strategy cost?", a: <>Depends on scope: mainly the number of customer interviews, personas, and activation pieces. <strong>We share exact pricing on the discovery call</strong> once we understand where your business is today.</> },
  { q: "What’s the difference between brand strategy and branding?", a: <>Brand strategy decides <strong>what you stand for, who you serve, and what you say.</strong> Branding is how it looks: logo, colors, design. Strategy should always come first, so the visuals express something real.</> },
  { q: "How long does it take?", a: <>Most engagements take <strong>4–6 weeks.</strong> The biggest factor is how quickly we can schedule customer interviews and get feedback from your team.</> },
  { q: "Do you talk to our customers directly?", a: <>Yes, customer interviews are the most valuable part of the process. <strong>We handle scheduling, run the calls,</strong> and turn what we hear into positioning and messaging.</> },
  { q: "Can you design the visual identity afterward?", a: <>Yes, many clients move straight into logo and <a href="/branding-growth/logo-visual-identity">visual identity</a> once the strategy is locked, <strong>so the design reflects the new positioning from day one.</strong></> },
  { q: "What if we already have strong positioning?", a: <>We’ll tell you. The free positioning session compares your messaging to your top competitors: <strong>if you’re already standing out, we’ll say so</strong> and point you to what would move the needle instead.</> },
];

/* -------- page -------- */

export default function BrandStrategyPositioningView() {
  return (
    <div className="bsp-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Branding & Growth", href: "/branding-growth" }}
        line1="Stop competing on price."
        line2={
          <>
            Own a <span className="grad-text">position.</span>
          </>
        }
        lead={
          <>
            Brand strategy and positioning for startups, small businesses, and growing brands. We define who you serve, why
            you’re different, and exactly what to say,{" "}
            <strong>so your website, ads, sales calls, and pitch deck all tell the same clear story.</strong>
          </>
        }
        primary={{ label: "Book a free positioning session", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <PositioningCard />
      </ServiceDetailHero>

      <TrustBar items={["Research-backed, not opinion-based", "Customer interviews included", "Plain-language brand playbook", "Built for sales, not just design"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why positioning comes before everything else</span>
            <h2>If buyers can’t tell how you’re different in 5 seconds, they default to the cheapest option.</h2>
            <p>Strong positioning fixes that. It makes every marketing dollar work harder because the message finally lands.</p>
          </Reveal>
          <div className="bsp-why">
            <FeatureGrid cards={WHY_CARDS} columns={3} />
          </div>
          <Reveal as="p" className="bsp-vs-note">
            If you try to be for everyone, you end up memorable to no one. <strong>Positioning is deciding who you’re not for.</strong>
          </Reveal>
        </div>
      </section>

      {/* BLEND VS POSITIONED */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Blending in vs positioned to win</span>
            <h2>Most businesses sound almost identical to their competitors.</h2>
            <p>Here’s what separates brands that blend in from brands buyers actually remember.</p>
          </Reveal>
          <div className="bsp-vs2">
            <Reveal className="bsp-vscol wrong">
              <div className="vh">
                <span className="vi">{ICON_X_MID}</span>
                <h3>Blending in</h3>
              </div>
              <ul>
                {BLEND.map((line) => (
                  <li key={line}>
                    <span className="m">{ICON_X}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="bsp-vscol right" style={d(90)}>
              <div className="vh">
                <span className="vi">{ICON_CHECK_MID}</span>
                <h3>Positioned to win</h3>
              </div>
              <ul>
                {POSITIONED.map((line) => (
                  <li key={line}>
                    <span className="m">{ICON_CHECK}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5-LAYER FRAMEWORK */}
      <section className="band tint" id="framework">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 5-layer brand strategy framework</span>
            <h2>Five questions, in order. Skip a layer and the ones above wobble.</h2>
            <p>Every strategy we build answers these five, and rolls them up into one positioning statement your whole team can use.</p>
          </Reveal>
          <Reveal className="bsp-lay-grid">
            {LAYERS.map((layer) => (
              <article className="bsp-lay" key={layer.title}>
                <span className="ln">{layer.no}</span>
                <div className="li">{layer.icon}</div>
                <h3>{layer.title}</h3>
                <p className="lq">{layer.q}</p>
                <ul>
                  {layer.items.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal className="bsp-formula">
            <span className="fk">The positioning statement we write for you</span>
            <p>
              For <span className="v">[ideal customer]</span> who <span className="v">[struggle with a specific problem]</span>,{" "}
              <span className="v">[your brand]</span> is the <span className="v">[market category]</span> that{" "}
              <span className="v">[key benefit]</span>. Unlike <span className="v">[main alternative]</span>, we{" "}
              <span className="v">[proof of difference]</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 12 ARCHETYPES */}
      <section className="band" id="archetypes">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 12 brand archetypes</span>
            <h2>Give your brand a personality people instantly recognize.</h2>
            <p>We use archetypes to set your tone of voice, visuals, and messaging style, so the brand feels like one consistent character.</p>
          </Reveal>
          <Reveal className="bsp-arch-grid">
            {ARCHETYPES.map((arch) => (
              <article className="bsp-arch" key={arch.name}>
                <span className="ai">{arch.icon}</span>
                <h3>{arch.name}</h3>
                <p>
                  {arch.text}
                  <span className="ft">{arch.fit}</span>
                </p>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="bsp-arch-note">
            Most strong brands <strong>lead with one primary archetype</strong> and borrow traits from a secondary one.
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do</span>
            <h2>Brand strategy has a reputation for vague workshops and thick decks nobody reads.</h2>
            <p>We avoid both.</p>
          </Reveal>
          <div className="bsp-dont-grid">
            {DONT.map((item) => (
              <Reveal className="bsp-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{ICON_X_MID}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="bsp-dont-note">
            <span className="mk">{ICON_CHECK_MID}</span>
            <p>
              Research-backed, plain-language, and <strong>built for sales, not just design.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Research to activation: one playbook.</h2>
            <p>Seven parts, one team: research, audience, positioning, foundation, voice, activation, and the playbook. Pick one to see inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>Pays off most at moments of change.</h2>
            <p>Launching, growing fast, or losing deals you should be winning: that’s when positioning matters most.</p>
          </Reveal>
          <div className="bsp-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="bsp-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
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
            <h2>A focused 4–6 week engagement.</h2>
            <p>You review and approve each stage.</p>
          </Reveal>
          <div className="bsp-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="bsp-step" key={step.title} style={d(step.delay)}>
                <span className="bsp-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every engagement." />

      <CtaBand
        id="start"
        eyebrow="Brand Strategy & Positioning"
        heading="Book a free positioning session, no obligation."
        copy={
          <>
            We’ll compare your messaging to your top competitors, show you where you’re blending in, and outline a clear path to a
            position you can own.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>If you already have strong positioning, we’ll tell you.</strong>
          </>
        }
        primaryLabel="Book a free positioning session"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
      />
    </div>
  );
}
