"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./bseo-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH_MINUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BUILDING = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BUILDING_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21V9l9-6 9 6v12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 14h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_WINDOW_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_COMPARE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 4v16M15 4v16M4 9h4M16 9h4M4 15h4M16 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_COLUMNS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 4v16M15 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_SHORT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7 1 0 2 .2 2.8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m15 18 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LAPTOP = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: search-to-pipeline funnel -------- */

const FUNNEL: { label: string; sub: string; value: string }[] = [
  { label: "Organic visit", sub: "Visitors from search", value: "1,000" },
  { label: "Conversion", sub: "Trial / demo request", value: "90" },
  { label: "Qualified lead", sub: "Sales accepts the fit", value: "34" },
  { label: "Opportunity", sub: "Deal opened in CRM", value: "16" },
  { label: "Customer", sub: "Revenue attributed", value: "6" },
];

function FunnelCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the funnel rows are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="Organic search turning into pipeline"
      className={`bseo-fun${run ? " run" : ""}`}
      live="Search → pipeline"
      corner="PIPELINE-FIRST"
      footLeft="Not pageviews: pipeline"
      footRight="tracked to revenue →"
    >
      <div className="bseo-fun-body">
        {FUNNEL.map((row) => (
          <div className="fs" key={row.label}>
            <span className="fl">
              {row.label}
              <small>{row.sub}</small>
            </span>
            <span className="fv">{row.value}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (3 cards + dark quote) -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_SEARCH, title: "Smaller keywords, bigger deals", text: <>A niche search with few visitors can still lead to <strong>your best customers.</strong></> },
  { icon: ICON_PEOPLE, title: "Many people, one decision", text: <>Users, managers, technical reviewers, and finance <strong>all search differently.</strong></> },
  { icon: ICON_TREND, title: "Pipeline beats pageviews", text: <>Traffic only matters if it turns into <strong>trials, demos, and revenue.</strong></> },
];

/* -------- buying committee (4 personas) -------- */

const COMMITTEE: { icon: ReactNode; role: string; title: string; wants: string; query: string }[] = [
  { icon: ICON_PERSON, role: "The User", title: "Day-to-day user", wants: "Wants to know if your product makes their work easier.", query: "“how to automate client reporting”" },
  { icon: ICON_BUILDING, role: "The Decision-maker", title: "Manager or executive", wants: "Wants outcomes, risk, and fit with team goals.", query: "“best reporting software for agencies”" },
  { icon: ICON_CODE, role: "The Evaluator", title: "Technical reviewer", wants: "Checks security, integrations, and how setup works.", query: "“[your product] API documentation”" },
  { icon: ICON_DOLLAR, role: "The Approver", title: "Finance or procurement", wants: "Compares cost, contracts, and alternatives.", query: "“[your product] vs [competitor] pricing”" },
];

/* -------- content by stage (5-row table) -------- */

const STAGES: { stage: string; mind: string; content: string }[] = [
  { stage: "Problem aware", mind: "“We have a problem.”", content: "Educational guides, explainers, and industry content." },
  { stage: "Solution aware", mind: "“What are our options?”", content: "Use-case pages, how-to content, and category pages." },
  { stage: "Comparing", mind: "“Which option is best?”", content: "Comparison, alternatives, and “best tools” pages." },
  { stage: "Deciding", mind: "“Is this the right choice?”", content: "Feature, pricing, integration, and case study pages." },
  { stage: "Customer", mind: "“How do I get more value?”", content: "Help docs, tutorials, and template libraries." },
];

/* -------- page types (6 tilt cards) -------- */

const PAGE_TYPES: { icon: ReactNode; title: ReactNode; text: string }[] = [
  { icon: ICON_WINDOW, title: "Feature pages", text: "One page per core feature, built around the problem it solves." },
  { icon: ICON_PEOPLE, title: "Use-case pages", text: "Pages for each job, team, or industry your product serves." },
  { icon: ICON_LINK, title: "Integration pages", text: "Pages for each tool you connect with, matching “[tool] integration” searches." },
  { icon: ICON_COMPARE, title: <a href="/website-development/b2b-saas-websites">Comparison pages</a>, text: "Honest “[you] vs [competitor]” pages for buyers comparing options." },
  { icon: ICON_LIST_CHECK, title: <a href="/website-development/b2b-saas-websites">Alternatives pages</a>, text: "Pages for buyers searching for alternatives to a known tool." },
  { icon: ICON_BOLT, title: "Templates & free tools", text: "Useful resources that attract searches and lead into your product." },
];

function PageTypeGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="bseo-pt6-grid">
        {PAGE_TYPES.map((card, i) => (
          <article className="bseo-pt6" key={i} data-tilt>
            <span className="pt6-spot"></span>
            <div className="p6i">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- measurement flow (5 steps with arrows) -------- */

const MEASURE: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_SEARCH, title: "Organic visit", text: "Visitors from search land on your pages." },
  { no: "02", icon: ICON_CHECK, title: "Conversion", text: "Trial, signup, or demo request." },
  { no: "03", icon: ICON_PERSON_CHECK, title: "Qualified lead", text: "Sales accepts the lead as a fit." },
  { no: "04", icon: ICON_LIST_SHORT, title: "Opportunity", text: "A deal is opened in your CRM." },
  { no: "05", icon: ICON_DOLLAR, title: "Customer", text: "Revenue attributed to organic search." },
];

/* -------- included (10) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "B2B SEO audit and competitor review" },
  { icon: ICON_SEARCH_MINUS, text: "Keyword research mapped to buyer stages" },
  { icon: ICON_PEOPLE, text: "Buying committee and persona mapping" },
  { icon: ICON_WINDOW_PLAIN, text: "Feature, use-case, and integration page plan" },
  { icon: ICON_COLUMNS, text: "Comparison and alternatives page strategy" },
  { icon: ICON_DOC, text: "SEO content briefs and writing" },
  { icon: ICON_CODE, text: "Technical SEO for marketing sites and docs" },
  { icon: ICON_LINK, text: "Internal linking between content and product pages" },
  { icon: ICON_TREND, text: "Conversion tracking tied to your CRM" },
  { icon: ICON_DOC, text: "Monthly reporting on rankings, signups, and pipeline" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_LAPTOP, text: <><strong>SaaS companies</strong> that want a growth channel beyond paid ads.</>, delay: 0 },
  { icon: ICON_BUILDING_PLAIN, text: <><strong>B2B service firms</strong> selling to managers and executives.</>, delay: 60 },
  { icon: ICON_BOLT, text: <><strong>Startups after early traction</strong> ready to build organic demand.</>, delay: 120 },
  { icon: ICON_PERSON, text: <><strong>Product-led companies</strong> turning free users and trials into customers.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does B2B SaaS SEO cost?", a: <>It depends on your market, the number of pages needed, and how much content we produce. <strong>We share pricing on the free call.</strong></> },
  { q: "How is B2B SEO different from regular SEO?", a: <>B2B SEO targets smaller, high-value keywords, plans content for several decision-makers, and <strong>measures success by pipeline instead of traffic alone.</strong></> },
  { q: "Should we create comparison pages about competitors?", a: <>Often, yes. Buyers search for comparisons anyway. <strong>Fair, accurate comparison pages help you be part of that decision.</strong></> },
  { q: "How long does B2B SEO take?", a: <>SEO builds over time and depends on competition and your site’s current authority. <strong>We share a realistic plan after the audit.</strong></> },
  { q: "Can you guarantee rankings or leads?", a: <>No. Nobody can honestly guarantee search results. <strong>We focus on the strategy, content, and technical work that search engines reward.</strong></> },
  {
    q: "Do you write the content, or just the strategy?",
    a: (
      <>
        Both: we create{" "}
        <strong>
          <a className="bseo-faq-link" href="/digital-marketing/seo-content-writing">SEO content briefs and the writing</a>
        </strong>{" "}
        for feature, use-case, comparison, and alternatives pages, mapped to each buyer stage.
      </>
    ),
  },
];

/* -------- page -------- */

export default function B2bSaasSeoView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="SEO that reaches every"
        line2={
          <>
            buyer, and feeds your <span className="grad-text">pipeline.</span>
          </>
        }
        lead={
          <>
            B2B and SaaS SEO for software and service companies with{" "}
            <strong>longer sales cycles, multiple decision-makers, and high-value keywords.</strong>
          </>
        }
        primary={{ label: "Book a B2B SEO call", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#measure" }}
      >
        <FunnelCard />
      </ServiceDetailHero>

      <TrustBar items={["Feature & use-case pages", "Comparison & alternatives", "Buying-committee content", "CRM-tied reporting"]} />

      {/* WHY */}
      <section className="band tint bseo-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>B2B search is a different game.</h2>
            <p>
              B2B buyers research for weeks or months, often as a group. Search volumes are smaller, but each visitor can be
              worth far more. That changes how keywords are chosen, how content is written, and how success is measured.
            </p>
          </Reveal>
          <Reveal className="bseo-surf-grid">
            {WHY.map((card) => (
              <article className="bseo-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="bseo-why-quote">
            In B2B, the right ten visitors can matter more than <span>a thousand of the wrong ones.</span>
          </Reveal>
        </div>
      </section>

      {/* BUYING COMMITTEE */}
      <section className="band bseo-sec" id="committee">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who you’re reaching</span>
            <h2>The B2B buying committee.</h2>
            <p>Each person in a buying group searches with different questions. We plan content for all of them.</p>
          </Reveal>
          <Reveal className="bseo-bc-grid">
            {COMMITTEE.map((person) => (
              <article className="bseo-bc" key={person.role}>
                <div className="bch">
                  <span className="bci">{person.icon}</span>
                  <div>
                    <span className="bcr">{person.role}</span>
                    <h3>{person.title}</h3>
                  </div>
                </div>
                <p className="bwant">{person.wants}</p>
                <p className="bq">
                  <b>Searches like</b>
                  {person.query}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTENT BY STAGE */}
      <section className="band tint bseo-sec" id="stages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Content by stage</span>
            <h2>Content mapped to the funnel.</h2>
            <p>Every keyword is matched to a stage of the buying journey and the page type that fits it.</p>
          </Reveal>
          <Reveal className="bseo-st-tbl">
            <div className="bseo-st-row head">
              <div>Stage</div>
              <div>Buyer mindset</div>
              <div>Content we create</div>
            </div>
            {STAGES.map((row) => (
              <div className="bseo-st-row" key={row.stage}>
                <div className="stg">
                  <span className="sd"></span>
                  {row.stage}
                </div>
                <div className="mind">{row.mind}</div>
                <div>{row.content}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PAGE TYPES */}
      <section className="band bseo-sec" id="pages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Page types</span>
            <h2>SaaS pages that win search.</h2>
            <p>These page types often match high-intent B2B searches. We plan, write, and optimize each one.</p>
          </Reveal>
          <PageTypeGrid />
        </div>
      </section>

      {/* MEASUREMENT */}
      <section className="band tint bseo-sec" id="measure">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we measure</span>
            <h2>Pipeline-first measurement.</h2>
            <p>We track organic search from the first visit to closed revenue, not just rankings.</p>
          </Reveal>
          <Reveal className="bseo-mf5">
            {MEASURE.map((step, i) => (
              <Fragment key={step.no}>
                {i > 0 && (
                  <span className="m5arr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
                <article className="bseo-m5">
                  <span className="m5n">{step.no}</span>
                  <div className="m5i">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Fragment>
            ))}
          </Reveal>
          <Reveal as="p" className="bseo-mf5-note">
            Connected through Google Analytics, Search Console, and your CRM, <strong>such as HubSpot or Salesforce.</strong>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band bseo-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>From audit to pipeline reporting.</h2>
          </Reveal>
          <Reveal className="bseo-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="bseo-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint bseo-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs B2B &amp; SaaS SEO</span>
            <h2>Turn organic search into pipeline.</h2>
          </Reveal>
          <div className="bseo-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="bseo-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every B2B SEO call." />

      <CtaBand
        id="start"
        eyebrow="B2B & SaaS SEO Services"
        heading="Turn organic search into pipeline."
        copy={
          <>
            Book a free call to review your site, your buyers, and the pages that would help most:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              we’ll look at which pages bring visitors today and whether they match the buyers you want.
            </strong>
          </>
        }
        primaryLabel="Book a B2B SEO call"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#measure", arrow: "↗" }}
      />
    </>
  );
}
