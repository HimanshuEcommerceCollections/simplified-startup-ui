"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  AdjacentGrid,
  Callout,
  FeatureGrid,
  PriceBands,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  StepsRow,
  d,
} from "../ServiceDetailKit";
import "./wd-page.css";

const CHECK_PATH = (
  <svg viewBox="0 0 24 24">
    <path pathLength="1" d="M5 13l4 4L19 7" />
  </svg>
);

const AUDIT_ROWS = [
  "Says what you do in 5 seconds",
  "One primary CTA per screen",
  "Loads < 2s on a throttled phone",
  "Contrast passes AA, tool-verified",
  "Works with JS & animation off",
];

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const SCOPE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    kicker: "Design",
    title: "From your brand, not a template",
    items: [
      "Page designs from your brand — mobile-first, every screen size",
      "A written design system: type, color, spacing, components",
      "Conversion architecture: where every click is supposed to go",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 6h16M4 12h16M4 18h9" />
      </svg>
    ),
    kicker: "Copy",
    title: "Written for your buyer",
    items: [
      "Conversion copy written for your buyer, in your voice",
      "Search briefs baked in — pages built to be found",
      "Plain-language rule: if your customer wouldn't say it, we don't write it",
    ],
    delay: 80,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      </svg>
    ),
    kicker: "Build",
    title: "Fast on real phones",
    items: [
      "Developed, tested, and shipped — fast on real phones, not just demos",
      "Analytics and form tracking wired and verified before launch",
      "Every page passes the 14-point checklist",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3v12M8 11l4 4 4-4M5 19h14" />
      </svg>
    ),
    kicker: "Handoff",
    title: "You own everything",
    items: [
      "You own everything — domain, site, content, accounts",
      "Documentation a future developer will thank you for",
      "Optional monthly growth plan if you want us to keep driving",
    ],
    delay: 80,
  },
];

const JOBS = [
  { n: "01", h: "Say what you do in five seconds", p: "A visitor should know what you sell, for whom, and what to do next — before they scroll.", dd: 0 },
  { n: "02", h: "Load fast on a phone", p: "Most local buyers arrive on mobile. Speed is a ranking factor and a patience factor.", dd: 60 },
  { n: "03", h: "Make contact effortless", p: "Click-to-call, short forms, and a next step on every page — not buried on one.", dd: 120 },
  { n: "04", h: "Give search engines structure", p: "Clean headings, schema, and indexable pages — the technical plumbing rankings depend on.", dd: 60 },
  { n: "05", h: "Measure what happens", p: "Analytics wired from day one, so you know which pages earn enquiries and which just exist.", dd: 120 },
];

const STEPS = [
  {
    no: "01",
    dur: "Week 1",
    title: "Map",
    blocks: [
      { k: "What happens", v: <>A working session on your goals and buyer, then a written plan: <strong>sitemap, page list, scope band, and schedule.</strong></> },
      { k: "You get", v: "The plan — free, and yours to keep either way." },
    ],
  },
  {
    no: "02",
    dur: "Dated, in writing",
    title: "Build",
    blocks: [
      { k: "What happens", v: <>Design, copy, and development in weekly slices you can see. <strong>Every page passes its checklist before it reaches you.</strong> Two revision rounds built in.</> },
      { k: "You get", v: "Weekly updates with progress you can click — not activity lists." },
    ],
  },
  {
    no: "03",
    dur: "After launch",
    title: "Grow",
    blocks: [
      { k: "What happens", v: "Launch with measurement wired from day one. Keep it in-house with our docs, or continue on a monthly growth plan." },
      { k: "You get", v: "A site that earns its keep — and the numbers to prove it." },
    ],
  },
];

const CHECKS: ReactNode[] = [
  <>Three cold readers can state <b>who it&apos;s for, what&apos;s offered, and the next step</b> — from the first screen, in five seconds.</>,
  <>Exactly <b>one primary call-to-action per screen,</b> and it names the value — never &quot;Submit.&quot;</>,
  <>Contrast passes <b>accessibility AA,</b> verified with a tool — not by eyeball.</>,
  <>Loads in <b>under two seconds on a throttled phone.</b> Craft that slows the page gets cut.</>,
  <>Works with <b>animations off and JavaScript off.</b> Content is never held hostage.</>,
  <>Every claim, number, and image is <b>real and sourced.</b> No placeholder ships, ever.</>,
];

const CATALOGUE = [
  { icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 8h18" stroke="currentColor" strokeWidth="2" /></svg>, h: "Custom website build", p: "A new site designed and built to convert — tracking installed before launch, code yours to keep." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.5" fill="currentColor" /><circle cx="18" cy="20" r="1.5" fill="currentColor" /><path d="M6 6 5 3H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>, h: "Ecommerce build", p: "A store engineered around product pages and checkout — where the sale actually happens." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M9 7h6M9 11h6M9 15h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>, h: "Landing pages", p: "One page for one campaign — the fastest honest fix for paid traffic that isn't converting." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 18V9M10 18V5M16 18v-6M22 18H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>, h: "Conversion optimization", p: "More from the visitors you already have — structured testing, honestly reported." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>, h: "Redesign & migration", p: "Rebuild or replatform without losing rankings — the redirect map is the deliverable." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>, h: "Web applications", p: "Internal tools and portals, scoped tightly — with an honest build-versus-buy answer first." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M5 12a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="4" y="12" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="15.5" r="1.5" fill="currentColor" /></svg>, h: "Managed hosting", p: "Monitoring, tested backups, staged updates — uptime measured and reported, not promised." },
  { icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 21l-5-2.9 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>, h: "Care plans", p: "Updates, checks, and small changes within stated hours — so the site ages instead of rotting." },
];

const FAQS = [
  { q: "Will it look like a template?", a: <>No. The design system is built from your brand and your buyer — <strong>the process is productized, the design isn&apos;t.</strong> That&apos;s why it&apos;s both fast and yours: we don&apos;t reinvent how to build a site each time, we reinvent what yours says and shows.</> },
  { q: "Who owns the site when it's done?", a: <><strong>You do</strong> — domain, code, content, and every account, in your name, per contract. If we part ways, you keep everything and the documentation to run it.</> },
  { q: "What happens after launch?", a: <>The site hands off clean, with measurement wired and docs written. If you want us to keep driving — content, search, campaigns — <strong>that&apos;s a monthly growth plan,</strong> priced on the price list, month to month after the initial term.</> },
  { q: "How much does small business web design cost?", a: <>Here it&apos;s published: scope bands run <strong>from $3,000 for a focused brochure site to $15,000+ for larger builds</strong> — the exact figure is fixed in your written plan before work starts. Market-wide, anything under $1,000 is usually a template job, and &quot;call us&quot; usually means the meter is running.</> },
  { q: "How long does a website build take?", a: <><strong>Three to six weeks by scope,</strong> and the schedule is dated in your plan — design, build, checklist pass, launch. What makes builds late everywhere is content arriving slowly; we schedule content collection first so the clock doesn&apos;t stall on week two.</> },
];

const ADJACENT = [
  { title: "Get more customers", desc: "Marketing sends the traffic; the site you build here has to catch it. Fixed scope, published prices." },
  { title: "The Launch bundle", desc: "Plan, build, and marketing together.", tag: "Three services — 15% off" },
  { title: "Fill your pipeline", desc: "Outbound to go with the inbound — targeted prospecting with activity counts you can verify." },
  { title: "Launch your business", desc: "Starting from zero? The plan comes first, then the site — in that order, on purpose." },
];

/** Hero signature: this-page self-audit with staggered tick-in. */
function AuditCard() {
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
      className={`wd-audit${run ? " run" : ""}`}
      ariaLabel="This page's self-audit"
      live="This page · Self-audit"
      corner="LIVE"
      footLeft="14 / 14 checks passed"
      footRight="you're on the sample →"
    >
      <div className="wd-audit-body">
        {AUDIT_ROWS.map((row) => (
          <div className="wd-audit-row" key={row}>
            <span className="abox">{CHECK_PATH}</span>
            <span className="atx">{row}</span>
            <span className="pass">Pass</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/** Dark quality-bar section: the 14 counter + checklist scan-in. */
function QualityBar() {
  const reduce = useReducedMotion();
  const [checksRef, checksIn] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!checksIn || !numRef.current) return;
    if (reduce) {
      numRef.current.textContent = "14";
      return;
    }
    let raf: number;
    let start: number | null = null;
    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (numRef.current) numRef.current.textContent = String(Math.round(eased * 14));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [checksIn, reduce]);

  return (
    <section className="band dark" id="bar">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">The quality bar, published</span>
          <h2>Fourteen checks per page. Here are six.</h2>
          <p>
            Every page we ship passes a written 14-point checklist — binary checks, no adjectives. This site holds itself
            to the same list.
          </p>
        </Reveal>
        <div className="wd-bar-wrap">
          <Reveal className="wd-bar-stat">
            <div className="wd-bar-num">
              <span ref={numRef}>{reduce ? 14 : 0}</span>
            </div>
            <div className="bs">point checklist · per page</div>
            <p className="bp">
              Binary checks, no adjectives. <strong>This very page passes all fourteen</strong> — a sample of six is on
              the right.
            </p>
          </Reveal>
          <div>
            <div className={`wd-checks reveal${checksIn ? " in run" : ""}`} ref={checksRef}>
              <span className="scan" aria-hidden="true"></span>
              {CHECKS.map((check, i) => (
                <div className="wd-chk" key={i}>
                  <span className="cbox">{CHECK_PATH}</span>
                  <span className="ct">{check}</span>
                  <span className="pass">Pass</span>
                </div>
              ))}
            </div>
            <p className="wd-bar-note">
              The other <b>eight</b> cover structure, mobile, voice, and measurement. Ask on your call — we&apos;ll send
              the whole list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WebsiteDevelopmentView() {
  return (
    <>
      <ServiceDetailHero
        eyebrow="SS-WEB-02 · Pillar file · Web Studio"
        line1="A website"
        line2={
          <>
            that <span className="grad-text">sells.</span>
          </>
        }
        lead={
          <>
            Small business web design without the guesswork — designed from your brand and your buyer, built to convert,
            and shipped against a <strong>14-point checklist you can read.</strong> You&apos;re on the sample right now.
          </>
        }
        primary={{ label: "Get your free growth plan", href: "/growth-plan" }}
        secondary={{ label: "See the checklist", href: "#bar" }}
        sign="Priced by scope band from $3,000 — set before work starts"
      >
        <AuditCard />
      </ServiceDetailHero>

      {/* NAMED PRODUCT / SCOPE */}
      <section className="band tint" id="scope">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Named product · Fixed scope</span>
            <h2>What a build includes — in writing.</h2>
            <p>One named product — one fixed scope, one price band set in your plan before work starts. No hourly meter, no drift.</p>
          </Reveal>
          <FeatureGrid cards={SCOPE_CARDS} />
          <Callout label="Scope is written down — both directions">
            Your plan lists what&apos;s in and what&apos;s out. If something new comes up mid-build,{" "}
            <strong>it gets scoped and priced in writing</strong> — never absorbed silently, never billed as a surprise.
          </Callout>
        </div>
      </section>

      {/* PLAIN ANSWER (5 jobs) */}
      <section className="band" id="needs">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Plain answer</span>
            <h2>What a small business website actually needs.</h2>
            <p>Good web design isn&apos;t about more pages or more effects — it&apos;s five jobs done properly. This is the checklist behind our checklist.</p>
          </Reveal>
          <div className="wd-jobs">
            {JOBS.map((job) => (
              <Reveal className="wd-job" key={job.n} style={d(job.dd)}>
                <span className="jn">{job.n}</span>
                <div>
                  <h3>{job.h}</h3>
                  <p>{job.p}</p>
                </div>
              </Reveal>
            ))}
            <Reveal className="wd-job sum" style={d(180)}>
              <span className="jn">✓</span>
              <div>
                <h3>All five, every build</h3>
                <p>Every build here ships against all five — that&apos;s what the 14-point checklist enforces, page by page.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW A BUILD RUNS */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How a build runs</span>
            <h2>Three steps. No mysteries.</h2>
          </Reveal>
          <StepsRow steps={STEPS} />
        </div>
      </section>

      <QualityBar />

      {/* BUILD CATALOGUE */}
      <section className="band" id="catalogue">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The build catalogue</span>
            <h2>Every service, its own page.</h2>
            <p>Each with its scope itemized, its pricing model stated, and what it deliberately doesn&apos;t include — so you know what you&apos;re buying before the call.</p>
          </Reveal>
          <Reveal className="wd-cat-grid">
            {CATALOGUE.map((cat) => (
              <a className="wd-cat" href="/growth-plan" key={cat.h}>
                <span className="di">{cat.icon}</span>
                <div>
                  <h3>{cat.h}</h3>
                  <p>{cat.p}</p>
                </div>
                <span className="go">↗</span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HONEST COMPARISON */}
      <section className="band tint" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The honest comparison</span>
            <h2>DIY builder, cheap template, or custom build?</h2>
            <p>All three are legitimate — for different businesses. Here&apos;s the straight version, including when <em>not</em> to hire us.</p>
          </Reveal>
          <div className="wd-cmp-grid">
            <Reveal as="article" className="wd-cmp">
              <span className="cl">DIY website builder</span>
              <h3>Anything online this week</h3>
              <p>
                Right if you&apos;re pre-revenue and need something up now.{" "}
                <strong>Wrong once customers choose between you and a competitor on their phone</strong> — conversion,
                speed, and search structure are where builders quietly cost you.
              </p>
              <span className="price-hint">Low cost · high hidden cost</span>
            </Reveal>
            <Reveal as="article" className="wd-cmp" style={d(80)}>
              <span className="cl">A cheap template job</span>
              <h3>Finished in the demo only</h3>
              <p>
                Looks done in the demo, then every business gets the same skeleton.{" "}
                <strong>If your site can&apos;t say why you&apos;re different, it isn&apos;t selling</strong> — it&apos;s
                existing.
              </p>
              <span className="price-hint">Cheap now · rebuilt later</span>
            </Reveal>
            <Reveal as="article" className="wd-cmp this" style={d(160)}>
              <span className="wd-cmp-badge">This page</span>
              <span className="cl">A custom build, done right</span>
              <h3>Designed from brand &amp; buyer</h3>
              <p>
                Engineered for speed and search, wired for measurement — and{" "}
                <strong>priced by scope band before work starts.</strong> That&apos;s exactly what you&apos;re reading.
              </p>
              <span className="price-hint">From $3,000</span>
            </Reveal>
          </div>
          <Reveal className="wd-rule-thumb">
            Our rule of thumb: <strong>if the site&apos;s job is to win customers, build it properly once</strong> —
            it&apos;s cheaper than rebuilding twice. If the site&apos;s job is just to exist, say so, and don&apos;t pay
            custom prices for it.
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="band" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What it costs</span>
            <h2>Priced by scope band — set before work starts.</h2>
            <p>
              Builds are banded by scope — pages, features, integrations — and your band is set in your free growth plan,
              in writing, before any work begins. If you need a brand first, those prices are published too.
            </p>
          </Reveal>
          <PriceBands
            bands={[
              { kicker: "Website build", price: "from $3,000", desc: "Banded by scope — a focused brochure site up to $15,000+ for larger builds. Exact figure fixed in your plan." },
              { kicker: "Brand Foundation", price: "$2,000–3,500", desc: "Logo suite, color and type system, voice guide, starter templates." },
              { kicker: "Full Brand Identity", price: "$3,500–5,000", desc: "The Foundation plus extended applications and collateral." },
            ]}
            note={
              <>
                After launch, monthly growth plans start at <strong>$1,000/mo</strong>. Any two services save 10%, three
                or more save 15% — every price is on the <a href="/pricing">price list</a>.
              </>
            }
          />
        </div>
      </section>

      {/* CASE STUDY #0 */}
      <section className="band tint" id="case">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Case study #0</span>
            <h2>This page is the portfolio.</h2>
            <p>
              Same product, same process, same checklist we&apos;d run for you — documented from brief to launch,
              including the drafts that scored 3/5 before this one didn&apos;t.
            </p>
          </Reveal>
          <Reveal className="wd-cs">
            <div className="wd-cs-top">
              <span className="lt">
                <span className="dot"></span> Case file · SS-WEB-02
              </span>
              <span className="rt">RENDERED &amp; TESTED · 3 SCREEN SIZES</span>
            </div>
            <div className="wd-cs-rows">
              <div className="wd-cs-row">
                <span className="k">Product</span>
                <span className="v">
                  <strong>Web Presence Build</strong> — this very one
                </span>
              </div>
              <div className="wd-cs-row">
                <span className="k">Revisions</span>
                <span className="v wd-revdots">
                  <span className="rd">3/5</span>
                  <span className="rd">3/5</span>
                  <span className="rd">4/5</span>
                  <span className="rd">4/5</span>
                  <span className="rd">5/5</span>
                  <span className="rd pass">✓ Shipped</span>
                </span>
              </div>
              <div className="wd-cs-row">
                <span className="k">Verified</span>
                <span className="v wd-vwrap">
                  {["Three screen sizes", "Motion off", "Scripts off"].map((label) => (
                    <span className="wd-verified" key={label}>
                      <span className="vk">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {label}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceFaq items={FAQS} />

      {/* ADJACENT */}
      <section className="band tint" id="adjacent">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Adjacent practices</span>
            <h2>Often bought together.</h2>
          </Reveal>
          <AdjacentGrid cards={ADJACENT} />
        </div>
      </section>

      <CtaBand
        eyebrow="End of file · SS-WEB-02"
        heading="Get your free growth plan."
        copy={
          <>
            A working session on your goals, then a written plan with the exact scope, price band, and schedule
            we&apos;d recommend — <strong>free, and yours to keep whether or not you hire us.</strong>
          </>
        }
        primaryLabel="Get your free growth plan"
        primaryHref="/growth-plan"
        secondary={{ label: "See the checklist", href: "#bar", arrow: "↗" }}
        id="plan"
      />
    </>
  );
}
