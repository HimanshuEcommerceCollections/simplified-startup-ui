"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import {
  AdjacentGrid,
  Callout,
  FeatureGrid,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  StepsRow,
  d,
} from "../ServiceDetailKit";
import "./dm-page.css";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GO_ARROW = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

/* -------- hero signature: the published ledger -------- */

function LedgerCard() {
  return (
    <SignatureCard
      ariaLabel="A sample monthly report"
      className="dm-ledger"
      live="Monthly report"
      corner="NO MYSTERY HOURS"
      footLeft="Judged against one metric"
      footRight="Enquiries, not impressions"
    >
      <span className="scan"></span>
      <div className="dm-ledger-body">
        <div className="dm-lrow">
          <div>
            <span className="lr-k">What we did</span>
            <div className="lr-v">Technical SEO + Google Business Profile</div>
          </div>
          <span className="lr-amt">Shipped</span>
        </div>
        <div className="dm-lrow">
          <div>
            <span className="lr-k">What it cost</span>
            <div className="lr-v">Growth retainer — fixed in your plan</div>
          </div>
          <span className="lr-amt">$2,400/mo</span>
        </div>
        <div className="dm-lrow">
          <div>
            <span className="lr-k">What it moved</span>
            <div className="lr-v">Qualified enquiries from local search</div>
          </div>
          <span className="lr-amt up">+38%</span>
        </div>
        <div className="dm-lrow">
          <div>
            <span className="lr-k">What changes next</span>
            <div className="lr-v">Named by us first, in plain language</div>
          </div>
          <span className="lr-amt">On the call</span>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- named services -------- */

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "Get found",
    title: "Show up when they search",
    items: [
      "Technical SEO, on-page work, local search, and Google Business Profile",
      "Keyword architecture built around what your buyers actually search",
      "Not what’s easy to rank for — what’s worth ranking for",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 12h4l3-7 4 14 3-7h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "Get in front of them",
    title: "Paid campaigns, tracked first",
    items: [
      "Google, Meta, LinkedIn, and YouTube campaigns",
      "Tracking verified firing before a dollar of spend — no exceptions",
      "You pay platforms directly, so you own the account and its history",
    ],
    delay: 80,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "Read, watch, trust",
    title: "Content made by a person",
    items: [
      "Blog, short-form video, social, and email",
      "Written by a person, finished by a person, in your voice",
      "If a reader could tell it was machine-made, it doesn’t ship",
    ],
    delay: 160,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3 4 7v5c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V7l-8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "Look like a business worth hiring",
    title: "Brand that stays consistent",
    items: [
      "Brand foundation and identity systems",
      "The design assets that keep everything consistent",
      "Voice guide and templates your whole team can use",
    ],
    delay: 240,
  },
];

/* -------- five jobs -------- */

const JOBS = [
  { n: "01", title: "Being findable", text: "Search rankings, local results, and your Google Business Profile — showing up when someone types the problem you solve." },
  { n: "02", title: "Being visible", text: "Paid campaigns on Google, Meta, LinkedIn, or YouTube that put you in front of buyers you haven’t met yet.", delay: 90 },
  { n: "03", title: "Being credible", text: "Content, reviews, and a brand that make the shortlist decision go your way.", delay: 180 },
  { n: "04", title: "Staying in touch", text: "Email and lifecycle sends to the people who said yes to hearing from you.", delay: 270 },
  { n: "05", title: "Knowing what worked", text: "Tracking and reporting that tie every dollar to an enquiry, a call, or a sale.", delay: 360 },
];

function JobsGrid() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div className="dm-jobs" ref={gridRef}>
      {JOBS.map((job) => (
        <Reveal className="dm-job" key={job.n} data-tilt style={d(job.delay ?? 0)}>
          <span className="jn">{job.n}</span>
          <h3>{job.title}</h3>
          <p>{job.text}</p>
          <span className="go" aria-hidden="true">
            {GO_ARROW}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- process -------- */

const STEPS = [
  {
    no: "01",
    dur: "2 weeks",
    title: "Map",
    blocks: [
      { k: "What happens", v: <>We audit what exists, pull real numbers from your analytics and ad accounts, and interview you about who actually buys. If the honest answer is <strong>“you don’t need marketing yet, you need a better offer,”</strong> that’s what the plan says.</> },
      { k: "You get", v: "A written plan naming the channels, the scope, the price, and the metric we’ll judge it by." },
    ],
  },
  {
    no: "02",
    dur: "3–6 weeks by scope",
    title: "Build",
    blocks: [
      { k: "What happens", v: <><strong>Tracking and analytics first, always.</strong> Then the assets: pages, campaigns, content, creative. Everything runs through the checklist for its type before it goes live.</> },
      { k: "You get", v: "Working assets — and you see them before your customers do." },
    ],
  },
  {
    no: "03",
    dur: "Monthly, ongoing",
    title: "Grow",
    blocks: [
      { k: "What happens", v: <>The work runs on a published cadence. <strong>Underperformance gets named by us first,</strong> in plain language, with what changes next month.</> },
      { k: "You get", v: "A report that leads with the numbers and a call to walk it — not a list of tasks performed." },
    ],
  },
];

/* -------- strategy sequence -------- */

const SEQUENCE = [
  { t: "Fix the offer and the tracking", s: "Before spend goes anywhere, make sure there’s something worth selling and a way to measure it." },
  { t: "Be findable for existing demand", s: "Capture the buyers already searching — SEO, local, and Google Business Profile." },
  { t: "Turn the site into a place that converts", s: "Traffic is wasted if the page can’t catch it." },
  { t: "Build credibility with content and brand", s: "Win the shortlist decision before the sales conversation starts." },
  { t: "Buy visibility once the funnel holds", s: "Paid campaigns amplify a machine that already works — not a leaky one." },
  { t: "Keep in touch and compound", s: "Email, lifecycle, and reporting turn one-time wins into a repeatable engine." },
];

/* -------- pricing -------- */

const TIERS = [
  {
    name: "Starter",
    price: "$1,000–1,500",
    desc: "One channel, done properly, with monthly reporting.",
    list: ["Core channel management", "Monthly content calendar, written and shipped", "Monthly results report"],
    cta: { label: "Start here", primary: false },
  },
  {
    name: "Growth",
    price: "$2,000–4,000",
    desc: "Multiple channels, content production, and active optimization.",
    list: ["Everything in Starter", "Search visibility and conversion work", "Quarterly strategy session with your plan owner"],
    cta: { label: "Choose Growth", primary: true },
    featured: true,
    badge: "Most chosen",
    delay: 80,
  },
  {
    name: "Full-Service",
    price: "$4,000–8,000",
    desc: "The full stack, coordinated, with priority delivery.",
    list: ["Everything in Growth", "Paid campaigns and full-funnel measurement", "Every channel under one plan owner"],
    cta: { label: "Go full-service", primary: false },
    delay: 160,
  },
];

const RATE_GROUPS = [
  {
    label: "SEO, standalone — if search is the only thing you need",
    rows: [
      { title: "SEO Audit", desc: "One-time. Technical, on-page, and content gaps, with a prioritized fix list.", price: "$1,500–3,000" },
      { title: "Monthly SEO", desc: "Ongoing optimization and content. Six-month minimum — real search work needs runway.", price: "$1,500–3,000", per: "/mo" },
      { title: "Aggressive SEO", desc: "For competitive markets: more content, more targets, faster cycles.", price: "$3,000–6,000", per: "/mo" },
    ],
  },
  {
    label: "Brand — if you need to look like a business first",
    rows: [
      { title: "Brand Foundation", desc: "Logo suite, color and type systems, voice guide, starter templates.", price: "$2,000–3,500" },
      { title: "Full Brand Identity", desc: "Everything above plus extended applications and a complete asset library.", price: "$3,500–5,000" },
    ],
  },
];

const TERMS = [
  { label: "Runway", text: <><strong>Three-month minimum</strong> on retainers, six months on standalone SEO — real work needs runway to show.</> },
  { label: "Ownership", text: <>You pay ad platforms directly, so you own the account and the history. <strong>You own everything we make.</strong></> },
  { label: "Tools", text: <>Tools are <strong>included in the price.</strong> No separate software line item to reconcile later.</> },
  { label: "No surprises", text: <>No lock-in past the initial term, <strong>no setup fee,</strong> no surprises on the invoice.</> },
];

/* -------- hood -------- */

const HOOD_GROUPS = [
  {
    label: "Get found",
    full: false,
    items: [
      { name: "SEO", desc: "Technical, on-page, and content — built around what buyers actually search." },
      { name: "Local SEO", desc: "Show up where your customers are standing — maps, local packs, citations." },
      { name: "Technical SEO", desc: "Speed, structure, indexing, and the plumbing rankings quietly depend on." },
      { name: "Google Business Profile", desc: "The listing customers see first, kept accurate, active, and answering." },
      { name: "AI search optimization", desc: "Structured, extractable answers for the search engines that now write answers." },
    ],
  },
  {
    label: "Paid",
    full: false,
    delay: 80,
    items: [
      { name: "Google Ads", desc: "Search intent captured — tracking verified before a dollar of spend." },
      { name: "Meta Ads", desc: "Facebook and Instagram campaigns with creative that earns the stop-scroll." },
      { name: "LinkedIn Ads", desc: "For when your buyer is a title, not a demographic." },
      { name: "YouTube Ads", desc: "Video reach with frequency caps and measurement, not spray-and-pray." },
      { name: "Retargeting", desc: "Reminding warm visitors, with frequency capping mandatory — never stalking." },
    ],
  },
  {
    label: "Social & content",
    full: false,
    items: [
      { name: "Social media management", desc: "Calendar, creation, posting, and community — run as one service, on a stated cadence." },
      { name: "Influencer marketing", desc: "Creator partnerships with disclosure requirements built into every brief." },
      { name: "Content marketing", desc: "Articles and resources that answer what your buyers are already asking." },
      { name: "Copywriting", desc: "Pages, ads, and emails written for your buyer, in your voice." },
      { name: "Video marketing", desc: "Short-form and explainer video, planned for the platforms it runs on." },
    ],
  },
  {
    label: "Brand & design",
    full: false,
    delay: 80,
    items: [
      { name: "Branding", desc: "Foundation to full identity — the published bands are above." },
      { name: "Logo design", desc: "A mark built to work at every size, delivered as a full suite." },
      { name: "Graphic design", desc: "The assets that keep everything consistent — social, print, presentation." },
    ],
  },
  {
    label: "Lifecycle & measurement",
    full: true,
    items: [
      { name: "Email marketing", desc: "Opted-in lists only — welcome flows, campaigns, and lifecycle sends." },
      { name: "Analytics & reporting", desc: "The monthly report that leads with numbers — what we did, what it moved, what changes." },
      { name: "Reputation management", desc: "Review generation done right — never bought, written, incentivized, or gated." },
    ],
  },
];

const FAQS = [
  { q: "Why do you publish prices when nobody else does?", a: <>Because hiding them wastes your time and ours. You should be able to tell in ninety seconds whether we’re in your range. The published number is <strong>a band, not a bait</strong> — the exact price gets fixed in writing before any work starts, and it doesn’t move unless you change the scope.</> },
  { q: "You’re a remote team. Who’s actually accountable?", a: <><strong>One named person owns your account</strong> and is named in your written plan before you sign. You’re not managing a pool of contractors. The team works US Eastern hours, and every deliverable passes a written checklist you’re allowed to read.</> },
  { q: "What if it doesn’t work?", a: <>You’ll know early, because the report leads with numbers rather than activity. If a channel is underperforming, we say so and change it — that’s the monthly call. What we won’t do is promise a result no honest agency can promise. <strong>We commit to the scope, the cadence, and the quality bar,</strong> and we hold to those.</> },
  { q: "What do digital marketing services for small business cost?", a: <>Here, the numbers are published: retainers run $1,000–1,500/mo (Starter), $2,000–4,000/mo (Growth), or $4,000–8,000/mo (Full-Service). Standalone SEO runs $1,500–6,000/mo by intensity, and brand work is $2,000–5,000 as a project. <strong>Your exact figure is fixed in a written plan before work starts</strong> — the market’s typical “it depends, book a call” is exactly what this page was built to avoid.</> },
  { q: "Do I need a marketing consultant or a full agency?", a: <>A consultant tells you what to do; an agency does it. If you have a team to execute, our Map phase works as exactly that, and the plan is yours to run with anyone. If you don’t have executing hands, the retainer is the consultant and the execution together: senior-led strategy, then the same team ships the work. <strong>You shouldn’t pay twice for thinking and doing.</strong></> },
];

const ADJACENT = [
  { title: "A website that converts", desc: "Marketing sends the traffic; the site has to catch it. Built to a published checklist." },
  { title: "Outbound to go with the inbound", desc: "We bring them to you; that team goes and gets them. Coordinated, not competing." },
  { title: "Automate what’s repetitive", desc: "Reporting, follow-up, and lifecycle work that shouldn’t need a human every time." },
  { title: "Two bundles marketing belongs to", desc: "Launch (plan, build, market — in that order) and Scale (inbound, outbound, and automation together).", tag: "Three services — 15% off" },
];

export default function DigitalMarketingView() {
  return (
    <>
      <ServiceDetailHero
        className="dm-hero"
        aboveTitle={
          <>
            <span className="dm-hero-tag">
              SS-WEB-13 <span className="sep"></span> Pillar file <span className="sep"></span> Digital marketing
            </span>
            <ul className="dm-cliches" aria-label="The agency lines you're tired of hearing">
              <li>“We’re optimizing.”</li>
              <li>“Impressions are up.”</li>
              <li>“Let’s circle back next quarter.”</li>
            </ul>
          </>
        }
        line1="Get more"
        line2={<span className="grad-text">customers.</span>}
        lead={
          <>
            Digital marketing for small business, with the black box removed. You’ll know{" "}
            <strong>what we did, what it cost, and what it moved</strong> — fixed scope, published prices, and a report
            you can actually read. Built for owners who’ve been burned by an agency before.
          </>
        }
        primary={{ label: "Get a written plan", href: "/growth-plan" }}
        secondary={{ label: "See published pricing", href: "#pricing" }}
        chips={[
          "Published pricing — every plan, on this page",
          "A written checklist per deliverable",
          "Results published only with client sign-off",
        ]}
      >
        <LedgerCard />
      </ServiceDetailHero>

      {/* NAMED SERVICES */}
      <section className="band tint" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Named services · Fixed scope</span>
            <h2>What’s included — in writing.</h2>
            <p>Our digital marketing services for small business are a fixed set of named products. You pick what you need, we price it before we start, and you get a monthly report tied to the goal.</p>
          </Reveal>
          <div className="dm-svc">
            <FeatureGrid cards={SERVICES} />
          </div>
          <Callout label="Explicitly out of scope — and we’ll say so on the call">
            We don’t manage your sales calls, we don’t write your legal or medical copy without your review, we don’t
            buy followers or reviews, and we <strong>don’t run campaigns for claims we can’t substantiate.</strong>
          </Callout>
        </div>
      </section>

      {/* PLAIN ANSWER */}
      <section className="band" id="meaning">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Plain answer</span>
            <h2>What digital marketing for a small business actually means.</h2>
          </Reveal>
          <Reveal as="p" className="dm-meaning-lead">
            It’s the work of getting found by people already looking for what you sell, staying in front of the ones who
            aren’t ready yet, and <strong>being able to prove which of it paid.</strong> In practice, that’s five jobs:
          </Reveal>
          <JobsGrid />
          <Reveal as="p" className="dm-meaning-foot">
            A small business rarely needs all five at once — which is why the plan{" "}
            <strong>names the two or three worth doing first,</strong> prices them, and skips the rest until the numbers
            say otherwise.
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="band tint" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How the work runs</span>
            <h2>Three steps. No mysteries.</h2>
          </Reveal>
          <StepsRow steps={STEPS} />
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="band dark dm-diff" id="difference">
        <div className="wrap">
          <div className="dm-diff-wrap">
            <Reveal>
              <span className="eyebrow">The difference, plainly</span>
              <h2 className="dm-diff-h">
                No mystery hours<span className="dot">.</span>
              </h2>
            </Reveal>
            <Reveal className="dm-diff-body" style={d(90)}>
              <p>Most agencies sell you a retainer and a vibe. You never learn what the scope actually was, so you can never tell whether you got it.</p>
              <p>
                We publish the scope before you sign, we publish the price, and we publish the checklist each deliverable
                has to pass. When something underperforms, <strong>you hear it from us first</strong> — in the monthly
                report, in plain language, with what we’re changing.
              </p>
              <div className="dm-diff-marks">
                <div className="dm-diff-mark">
                  <span className="mk">{CHECK}</span>Scope, price, and quality bar — all published before you sign.
                </div>
                <div className="dm-diff-mark">
                  <span className="mk">{CHECK}</span>We commit to activities and a cadence, and we hit them.
                </div>
                <div className="dm-diff-mark">
                  <span className="mk">{CHECK}</span>Nobody honest guarantees a ranking or lead volume — we won’t pretend otherwise.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="band" id="strategy">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Marketing strategy, sequenced</span>
            <h2>What’s worth doing first.</h2>
          </Reveal>
          <Reveal as="p" className="dm-strat-lead">
            A marketing strategy for a small business isn’t a 40-page deck — <strong>it’s an honest sequence.</strong>{" "}
            Ours usually runs in this order, and your written plan says which steps apply to you and which to skip:
          </Reveal>
          <Reveal as="ol" className="dm-seq">
            {SEQUENCE.map((item, i) => (
              <li key={item.t}>
                <span className="sq-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="sq-t">
                  {item.t}
                  <span>{item.s}</span>
                </div>
              </li>
            ))}
          </Reveal>
          <Reveal as="p" className="dm-strat-note">
            If a step doesn’t apply to your business, the plan says so — the same way it says if you don’t need marketing
            yet. <strong>That’s what a strategy is for.</strong>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Published pricing</span>
            <h2>What marketing costs here.</h2>
            <p>The Monthly Growth Retainer is the recurring engine. Three tiers — and your exact number is fixed in your plan before work starts.</p>
          </Reveal>

          <DmTiers />

          <Reveal className="dm-rate-block">
            {RATE_GROUPS.map((group) => (
              <div className="dm-rate-group" key={group.label}>
                <div className="dm-rate-glabel">{group.label}</div>
                {group.rows.map((row) => (
                  <div className="dm-rate-row" key={row.title}>
                    <div className="dm-rate-main">
                      <div className="dm-rate-title">{row.title}</div>
                      <p>{row.desc}</p>
                    </div>
                    <div className="dm-rate-price">
                      {row.price}
                      {row.per && <span className="per"> {row.per}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Reveal>

          <Reveal className="dm-bundles">
            <div className="dm-bnd">
              <div className="pct">10% off</div>
              <h3>Any two services</h3>
              <p>Bundling is automatic — inside marketing or across every other practice.</p>
            </div>
            <div className="dm-bnd">
              <div className="pct">15% off</div>
              <h3>Three or more services</h3>
              <p>So a website build plus a retainer plus bookkeeping is 15% off all three.</p>
            </div>
          </Reveal>

          <Reveal className="dm-terms">
            {TERMS.map((term) => (
              <div className="term" key={term.label}>
                <span className="t-label">{term.label}</span>
                <p>{term.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EVERYTHING UNDER THE HOOD */}
      <section className="band" id="everything">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Everything under the hood</span>
            <h2>The full service list, grouped.</h2>
            <p>Every service is delivered inside the retainer tiers or as scoped standalone work — each with a written scope and a defined finish line.</p>
          </Reveal>
          <div className="dm-hood">
            {HOOD_GROUPS.map((group) => (
              <Reveal className={`dm-hood-group${group.full ? " full" : ""}`} key={group.label} style={d(group.delay ?? 0)}>
                <div className="hg-label">{group.label}</div>
                {group.items.map((item) => (
                  <div className="dm-hood-item" key={item.name}>
                    <span className="hi-dot"></span>
                    <div>
                      <div className="hi-name">{item.name}</div>
                      <div className="hi-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} tint eyebrow="Fair questions" heading="Asked by every burned buyer." />

      {/* ADJACENT */}
      <section className="band" id="adjacent">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Adjacent practices</span>
            <h2>Often bought together.</h2>
          </Reveal>
          <AdjacentGrid cards={ADJACENT} />
        </div>
      </section>

      {/* RESOURCES */}
      <section className="band tint" id="resources">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">From the resources desk</span>
            <h2>Read before you decide.</h2>
            <p>Two guides worth the read before any agency conversation — including this one.</p>
          </Reveal>
          <div className="dm-res-grid">
            <Reveal>
              <Link className="dm-res-card" href="/blog">
                <span className="r-kicker">Guide</span>
                <h3>How to choose a marketing agency</h3>
                <p>The four questions that matter — run on us at the end.</p>
                <span className="r-go">
                  Read the guide <span className="arw">↗</span>
                </span>
              </Link>
            </Reveal>
            <Reveal style={d(80)}>
              <Link className="dm-res-card" href="/blog">
                <span className="r-kicker">Guide</span>
                <h3>What marketing actually costs</h3>
                <p>Every market figure sourced and dated — so you can sanity-check any quote.</p>
                <span className="r-go">
                  Read the guide <span className="arw">↗</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="End of file · SS-WEB-13"
        heading="Find out what’s actually worth doing."
        copy="You’ll get a written marketing plan — the channels worth your money, the scope, the price, and the number we’d judge it by. No retainer required to get it, and no chasing afterward if the answer is no."
        primaryLabel="Get your written plan"
        primaryHref="/growth-plan"
        secondary={{ label: "See published pricing", href: "#pricing" }}
        id="book"
      />
    </>
  );
}

function DmTiers() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div className="dm-tiers" ref={gridRef}>
      {TIERS.map((tier) => (
        <Reveal
          as="article"
          className={`dm-tier${tier.featured ? " is-feature" : ""}`}
          key={tier.name}
          data-tilt
          style={d(tier.delay ?? 0)}
        >
          {tier.badge && <span className="dm-tier-badge">{tier.badge}</span>}
          <span className="dm-tier-spot"></span>
          <div className="dm-tier-name">{tier.name}</div>
          <div className="dm-tier-price">
            {tier.price} <span className="per">/mo</span>
          </div>
          <p className="dm-tier-desc">{tier.desc}</p>
          <div className="dm-tier-div"></div>
          <ul className="dm-tier-list">
            {tier.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="dm-tier-cta">
            <a className={`btn ${tier.cta.primary ? "btn-primary" : "btn-ghost"}`} href="/growth-plan">
              {tier.cta.label}
              {tier.cta.primary && <span className="arw"> ↗</span>}
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
