"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { FeatureGrid, ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./cmb-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v14H4zM4 9h16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_UP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_HEAVY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero: scrambled gradient word ("compounding.") -------- */

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

/* -------- hero signature: topic-cluster ranking card -------- */

const CLUSTER_NODES = ["Lead routing", "CRM setup", "Forecasting", "Attribution", "Tech stack", "KPIs"];

function ClusterCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the cluster is shown in its end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample topic cluster ranking"
      className={`cmb-clus${run ? " run" : ""}`}
      live="Topic cluster · Ranking"
      corner="BUILT TO COMPOUND"
      footLeft="Human-edited · E-E-A-T"
      footRight="you own every asset →"
    >
      <div className="cmb-clus-map">
        <div className="cmb-clus-pillar">
          {ICON_DOC}
          <b>Pillar: RevOps Guide</b>
        </div>
        <div className="cmb-clus-nodes">
          {CLUSTER_NODES.map((node) => (
            <div className="cn" key={node}>
              {node}
              <small>cluster</small>
            </div>
          ))}
        </div>
      </div>
      <div className="cmb-clus-rank">
        <span className="rk">
          “revops guide”, position <b>#1</b>
        </span>
        <span className="mv">{ICON_UP}#8 → #1</span>
      </div>
      <div className="cmb-clus-cite">
        <span className="ok">{ICON_CHECK_HEAVY}</span> Cited in Google AI Overview
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY = [
  { icon: ICON_TREND, title: "Compounds over time", text: <>Paid ads stop when the budget stops. Ranking content <strong>keeps producing traffic and leads month after month.</strong></> },
  { icon: ICON_BOLT, title: "Feeds AI search too", text: <>Google AI Overviews, ChatGPT search, and Perplexity all cite well-structured content. <strong>GEO is the new SEO.</strong></>, delay: 80 },
  { icon: ICON_SHIELD, title: "Builds real E-E-A-T", text: <>Experience, Expertise, Authoritativeness, Trust, <strong>the factors Google now weights above raw keywords.</strong></>, delay: 160 },
];

/* -------- content types table -------- */

const CONTENT_TYPES = [
  { name: "Pillar Pages", intent: "Informational (broad)", purpose: "Anchor a topic cluster, comprehensive, definitive resource", len: "2,500–5,000+" },
  { name: "Cluster Articles", intent: "Informational (narrow)", purpose: "Long-tail keywords + internal linking to pillar", len: "1,000–2,000" },
  { name: "Product / Solution", intent: "Commercial + transactional", purpose: "BOFU conversion pages tied to buyer-intent keywords", len: "800–1,500" },
  { name: "Comparison Pages", intent: "Commercial investigation", purpose: "“X vs Y”, “alternatives to X”, late-stage decision content", len: "1,500–2,500" },
  { name: "Listicles & How-To", intent: "Informational", purpose: "Featured snippet + rich result targets", len: "1,500–3,000" },
  { name: "Case Studies", intent: "Trust + BOFU", purpose: "E-E-A-T signals, real results, social proof", len: "1,000–2,000" },
  { name: "Landing Page Copy", intent: "Transactional", purpose: "Paid ad landing pages, offer pages, lead magnets", len: "500–1,200" },
  { name: "Thought Leadership", intent: "Brand + authority", purpose: "Founder voice, opinion pieces, industry commentary", len: "1,200–2,500" },
];

/* -------- what we don't do (dark) -------- */

const DONTS = [
  { title: "Publish unedited AI content", text: <>AI drafts fast, but shipping raw output triggers Google’s spam updates and <strong>destroys E-E-A-T.</strong></> },
  { title: "Chase keyword volume alone", text: <>High volume with wrong intent brings traffic that never converts. <strong>We prioritize intent match over raw volume.</strong></>, delay: 60 },
  { title: "Stuff keywords", text: <>Modern search is semantic. We optimize for <strong>entities, topical depth, and natural language</strong>, not density.</>, delay: 120 },
  { title: "Ignore internal linking", text: <>An orphan article ranks for nothing. <strong>Every piece slots into a cluster with strategic anchor text.</strong></> },
  { title: "Buy backlinks from PBNs", text: <>Google penalizes it. We build authority through <strong>digital PR, guest contributions, and link-worthy content.</strong></>, delay: 60 },
  { title: "Lock you into long contracts", text: <>Month-to-month. Cancel anytime. <strong>If content isn’t compounding by month 6, we shouldn’t be your agency.</strong></>, delay: 120 },
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
    key: "strategy",
    btnName: "Strategy & clusters",
    btnSub: "Topical map",
    name: "Content Strategy & Topic Clusters",
    tag: "Every engagement starts with a full audit and a topical map built to compound.",
    items: ["Content audit of existing pages (rankings, traffic, conversions)", "Competitor content gap analysis", "Topic cluster + pillar page architecture", "Editorial calendar (90-day rolling)", "Topical authority roadmap"],
  },
  {
    key: "keyword",
    btnName: "Keyword & SERP research",
    btnSub: "Intent-first",
    name: "Keyword & SERP Research",
    tag: "Intent-first research, every brief starts with a teardown of the current top 10.",
    items: ["Semrush, Ahrefs, SurferSEO research", "Search volume + keyword difficulty (KD)", "Search-intent mapping", "SERP feature analysis (snippets, PAA, AI Overviews)", "Full SERP teardown of top 10 results"],
  },
  {
    key: "brief",
    btnName: "Briefs & SME interviews",
    btnSub: "Real expertise",
    name: "Content Briefs & SME Interviews",
    tag: "Detailed briefs before a word is written, with real expertise injected.",
    items: ["Target keywords + semantic entities", "Search intent + competitor coverage", "Headline + H2 structure", "Internal linking targets", "E-E-A-T signals to include", "SME interviews for real experience"],
  },
  {
    key: "production",
    btnName: "Production (human-edited)",
    btnSub: "Ranks, not penalized",
    name: "Production (AI-Assisted, Human-Edited)",
    tag: "Fast first drafts, then a human editor, the difference between ranking and penalized.",
    items: ["First drafts via Claude, GPT-5, Jasper (your voice)", "Human editor fact-checks against sources", "Structure tightened, original examples added", "E-E-A-T signals layered in", "Brand-voice consistency enforced"],
  },
  {
    key: "onpage",
    btnName: "On-page SEO & schema",
    btnSub: "Rich results",
    name: "On-Page SEO & Structured Data",
    tag: "Every piece ships fully optimized, eligible for rich results and AI citations.",
    items: ["Title tags + meta descriptions", "Header hierarchy (H1–H4)", "Image alt text", "Internal linking with strategic anchors", "Schema (Article, FAQPage, HowTo, BreadcrumbList)"],
  },
  {
    key: "publish",
    btnName: "Publishing & CMS",
    btnSub: "Any platform",
    name: "Publishing & CMS Integration",
    tag: "Direct publishing to your CMS, formatted, imaged, and ready. You approve every piece.",
    items: ["WordPress, Webflow, Framer, Shopify, HubSpot, Ghost", "Image sourcing or AI generation (Midjourney/DALL-E)", "Featured image design", "Readability formatting", "Your approval before anything goes live"],
  },
  {
    key: "distribute",
    btnName: "Distribution & repurposing",
    btnSub: "1 → many",
    name: "Distribution & Repurposing",
    tag: "One long-form piece becomes many assets, automated so content works harder.",
    items: ["Email newsletter (Klaviyo, HubSpot, Brevo, ConvertKit)", "LinkedIn + X + Threads posts from pillar content", "Short-form video scripts (Reels, Shorts, TikTok)", "Podcast outlines from top posts", "Repurposing automation"],
  },
  {
    key: "refresh",
    btnName: "Refresh & pruning",
    btnSub: "+30–50% traffic",
    name: "Content Refresh & Pruning",
    tag: "Old content decays, refresh alone can lift organic traffic 30–50% in 90 days.",
    items: ["Continuous ranking + traffic monitoring", "Refresh top-of-funnel every 6–12 months", "Prune / consolidate underperforming pages", "Boost overall site authority", "Date-signal updates"],
  },
  {
    key: "report",
    btnName: "Reporting & attribution",
    btnSub: "Tied to pipeline",
    name: "Reporting & Attribution",
    tag: "Monthly reports tied to real outcomes, not just “here’s the dashboard.”",
    items: ["Organic traffic growth", "Keyword ranking movement", "Backlinks earned", "Pipeline / revenue attribution", "Live dashboards (GA4, GSC, Semrush)", "Quarterly strategy reviews"],
  },
];

function IncludedExplorer() {
  // the design's script initialises with a non-existent key; start on the tab marked aria-selected
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
    <Reveal className="cmb-wb-wrap" id="included-int">
      <div className="cmb-wb-list" role="tablist" aria-label="What's included">
        {INCLUDED.map((inc, i) => (
          <button
            key={inc.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="cmb-wb-btn"
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
      <div className="cmb-wb-panel">
        <div className="cmb-wp-top">
          <span className="big">{ICON_DOC}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        <div className="cmb-wp-body cmb-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="cmb-wp-list">
            {item.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- who / fit -------- */

const FIT_GOOD = [
  <><strong>B2B SaaS</strong> with a defined ICP and considered sales cycle: SEO content is the #1 lowest-CAC channel long-term.</>,
  <><strong>Agencies &amp; consultants</strong> using thought leadership to attract inbound and shorten sales cycles.</>,
  <><strong>E-commerce brands</strong> needing category pages, product education, buying guides, and comparison content.</>,
  <><strong>Professional services</strong> (legal, financial, healthcare), where E-E-A-T signals directly affect lead quality.</>,
  <><strong>Startups building an audience pre-launch</strong>, seed a market with authority before the product ships.</>,
];

const FIT_BAD = [
  <><strong>Need pipeline in 30 days?</strong> Content is a 6–12 month investment, paid ads are the answer.</>,
  <><strong>Impulse-purchase products</strong> or audiences that don’t search Google, paid social / influencer converts better.</>,
];

/* -------- how it works -------- */

const STEPS = [
  { no: "Week 1", title: "Audit & strategy", text: "Full content audit of existing pages. Competitor gap analysis. Topic cluster architecture. 90-day editorial roadmap delivered." },
  { no: "Week 2", title: "Voice & briefing system", text: "Brand voice training locked, AI prompts customized, first batch of content briefs built, SME interviews scheduled.", delay: 70 },
  { no: "Weeks 3–4", title: "First content wave", text: "First 4–8 pieces drafted, edited, optimized, and published. Distribution activated. First rankings tracked.", delay: 140 },
  { no: "Months 2–3", title: "Publishing cadence", text: "Steady weekly / biweekly publishing. Internal linking builds topical authority. Early long-tail rankings appear.", delay: 210 },
  { no: "Month 4+", title: "Compounding", text: "Head-term rankings move. Refresh cycles begin. Backlinks accrue. Traffic and leads compound month over month.", delay: 280 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How long before I see results?", a: <>First long-tail rankings in <strong>30–60 days;</strong> meaningful traffic growth around month 3–4; compounding organic (where it really pays off) from <strong>month 6 onward.</strong> Anyone promising faster is buying links or misleading you.</> },
  { q: "Will Google penalize AI-generated content?", a: <>Only low-quality AI slop with no human editing. Google rewards high-quality content regardless of how it’s produced. <strong>Our human editorial layer adds fact-checking, original examples, and E-E-A-T</strong>, the difference between ranking and penalized.</> },
  { q: "What is GEO / AI Overview optimization?", a: <>GEO structures content to be cited by Google AI Overviews, ChatGPT search, and Perplexity, it needs clear entities, semantic structure, schema, and E-E-A-T. <strong>We optimize every piece for both traditional SERPs and GEO.</strong></> },
  { q: "Do you handle keyword research and clusters?", a: <>Everything, full research via <strong>Semrush, Ahrefs, and SurferSEO,</strong> mapped to intent and competition. Topic clusters designed to build topical authority. You just approve the roadmap.</> },
  { q: "Do you publish to my CMS?", a: <>Yes: WordPress, Webflow, Framer, Shopify, HubSpot, Ghost, or custom. Includes image sourcing/generation, featured-image design, and formatting. <strong>You approve every piece before it goes live.</strong></> },
  { q: "Do I own the content?", a: <>Yes, 100%, all content, brand-voice training, research, and editorial assets, published on your domain and accounts. <strong>If you leave, you keep everything.</strong></> },
];

export default function ContentMarketingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        line1="Content that ranks"
        line2={
          <>
            and keeps <ScrambleWord text="compounding." />
          </>
        }
        lead={
          <>
            Done-for-you SEO content and blog strategy for B2B SaaS, agencies, e-commerce, and professional services. We
            plan the topic clusters, produce the pillar pages, run the editorial workflow, and optimize for both
            traditional SERPs and AI Overviews. <strong>Human-edited, E-E-A-T aligned, and built to compound.</strong>
          </>
        }
        primary={{ label: "Book a free content audit", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <ClusterCard />
      </ServiceDetailHero>

      <TrustBar items={["Topic cluster strategy", "Human editorial oversight", "E-E-A-T + GEO optimized", "You own every asset"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why content still wins in 2026</span>
            <h2>The only channel where the asset keeps working after you stop paying.</h2>
            <p>A well-optimized pillar page can rank for years, generate compounding organic traffic, feed retargeting, and get cited in AI Overviews, all from one investment.</p>
          </Reveal>
          <div className="cmb-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
          <Reveal as="p" className="cmb-ct-note" style={{ marginTop: 26 }}>
            Every business that stopped writing after ChatGPT launched lost their organic pipeline. The ones that doubled
            down, <strong>with human-edited, E-E-A-T-first content, are dominating SERPs.</strong>
          </Reveal>
        </div>
      </section>

      {/* CONTENT TYPES */}
      <section className="band" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Content types we produce</span>
            <h2>The full funnel, no generic “blog posts.”</h2>
            <p>Different search intents need different formats. We produce the full mix across TOFU, MOFU, and BOFU so nothing in your organic strategy is missing.</p>
          </Reveal>
          <Reveal className="cmb-ct-tbl">
            <div className="cmb-ct-row head">
              <div>Content type</div>
              <div className="cc2">Intent</div>
              <div>Purpose</div>
              <div className="cc4">Length</div>
            </div>
            {CONTENT_TYPES.map((row) => (
              <div className="cmb-ct-row" key={row.name}>
                <div className="cn2">{row.name}</div>
                <div className="cc2">{row.intent}</div>
                <div>{row.purpose}</div>
                <div className="cc4 len">{row.len}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="cmb-ct-note">
            Every piece is written to a specific search intent and mapped to a funnel stage. <strong>No generic “blog posts.”</strong>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do</span>
            <h2>The content space is full of shortcuts that hurt rankings.</h2>
            <p>We don’t take any of them.</p>
          </Reveal>
          <div className="cmb-dont-grid">
            {DONTS.map((item) => (
              <Reveal className="cmb-dontc" key={item.title} style={d(item.delay ?? 0)}>
                <h3>
                  <span className="x">{ICON_X}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="cmb-dont-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              Human-edited, intent-matched, E-E-A-T-first content, <strong>the kind that actually compounds.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Strategy to attribution, one system.</h2>
            <p>End-to-end content marketing: strategy, production, optimization, distribution, and measurement. Nine parts, pick one to see inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* WHO / FIT */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who content marketing is built for</span>
            <h2>Best if you can wait 4–6 months for compounding returns.</h2>
            <p>Content works for businesses with some product/market fit, selling to buyers who research before they buy.</p>
          </Reveal>
          <Reveal className="cmb-fit-grid">
            <div className="cmb-fit good">
              <div className="fh">
                <span className="fi">{ICON_CHECK}</span>
                <h3>Where it works</h3>
              </div>
              <ul>
                {FIT_GOOD.map((line, i) => (
                  <li key={i}>
                    <span className="m">{ICON_CHECK_BOLD}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cmb-fit bad">
              <div className="fh">
                <span className="fi">{ICON_X}</span>
                <h3>Where it doesn’t (yet)</h3>
              </div>
              <ul>
                {FIT_BAD.map((line, i) => (
                  <li key={i}>
                    <span className="m">{ICON_X_BOLD}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A 30-day onboarding, then steady editorial production.</h2>
            <p>Every step ends with a clear deliverable and your sign-off.</p>
          </Reveal>
          <div className="cmb-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="cmb-step" key={step.no} style={d(step.delay ?? 0)}>
                <span className="cmb-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        eyebrow="Content Marketing & Blogging"
        heading="Book a free content marketing audit, no obligation."
        copy={
          <>
            We’ll review your existing content, your topical footprint, and your competitor landscape, then deliver a
            clear 90-day content roadmap with topic clusters, keyword targets, and publishing cadence,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>usually within 48 hours of the call.</strong>
          </>
        }
        primaryLabel="Book a free content audit"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
