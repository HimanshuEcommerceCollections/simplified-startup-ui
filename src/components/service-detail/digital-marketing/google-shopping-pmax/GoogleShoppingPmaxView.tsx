"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./gsp-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_GLOBE_HALF = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_GRID = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_TITLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h4l1 2M4 7h16M8 7v10h12V9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TRUCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h11v8H4zM15 10h3l3 3v2h-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="7.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8.5 8.5l5 5M13.5 8.5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SCREEN_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: inputs -> automation card -------- */

const PMX_INPUTS: { icon: ReactNode; label: string }[] = [
  { icon: ICON_BAG, label: "Product feed" },
  { icon: ICON_IMAGE, label: "Creative assets" },
  { icon: ICON_PERSON, label: "Audience signals" },
  { icon: ICON_TARGET, label: "Goals & value" },
];

const PMX_CHANNELS = ["Search", "Shopping", "YouTube", "Display", "Discover", "Gmail"];

function PmaxCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: inputs, the automation block, and the channel chips are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="Inputs flowing into Performance Max automation and out to channels"
      className={`gsp-pmx${run ? " run" : ""}`}
      live="Inputs → automation"
      corner="STRUCTURE YOU CONTROL"
      footLeft="Strong inputs, clear structure"
      footRight="automation for your goals →"
    >
      <div className="gsp-pmx-body">
        <div className="gsp-pmx-ins">
          {PMX_INPUTS.map((item) => (
            <span className="gsp-pin" key={item.label}>
              <span className="pii">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
        <div className="gsp-pmx-conn"></div>
        <div className="gsp-pmx-auto">⚙ Performance Max automation</div>
        <div className="gsp-pmx-ch">
          {PMX_CHANNELS.map((ch) => (
            <span key={ch}>{ch}</span>
          ))}
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark band, at a glance) -------- */

const GLANCE = ["Product feed quality", "Creative assets and copy", "Audience signals", "Conversion goals and value", "Structure and controls"];

/* -------- standard shopping vs pmax -------- */

const COMPARE: { k: string; ss: string; pm: string }[] = [
  { k: "Where ads show", ss: "Shopping results and Shopping tab", pm: "Search, Shopping, YouTube, Display, Discover, Gmail, Maps" },
  { k: "Control", ss: "More control over bids and products", pm: "More automation, fewer manual levers" },
  { k: "Inputs needed", ss: "Product feed", pm: "Product feed, assets, and audience signals" },
  { k: "Reporting detail", ss: "Detailed product and search data", pm: "Less detail, with growing insights reports" },
  { k: "Often best for", ss: "Testing and protecting key products", pm: "Scaling a strong feed across channels" },
];

/* -------- how pmax works (5 stages) -------- */

const HOW: { icon: ReactNode; title: string; text: string; out?: boolean }[] = [
  { icon: ICON_BAG, title: "Product feed", text: "Products and data from Merchant Center." },
  { icon: ICON_IMAGE, title: "Assets", text: "Images, videos, headlines, and descriptions." },
  { icon: ICON_PERSON, title: "Audience signals", text: "Hints about who your buyers are." },
  { icon: ICON_TARGET, title: "Goals", text: "Conversions and their value." },
  { icon: ICON_GLOBE, title: "Automation → channels", text: "Google matches ads to people across its networks.", out: true },
];

/* -------- asset groups (3 options) -------- */

const ASSET_GROUPS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_GRID, title: "By category", text: "One asset group per main product category, with matching creative." },
  { icon: ICON_PEOPLE, title: "By audience", text: "Separate creative and signals for different buyer types." },
  { icon: ICON_STAR, title: "By theme or season", text: "Groups for collections, launches, or seasonal ranges." },
];

/* -------- feed optimization (8) -------- */

const FEED: { icon: ReactNode; title: ReactNode; text: ReactNode }[] = [
  { icon: ICON_TITLE, title: <a href="/digital-marketing/ecommerce-seo">Product titles</a>, text: "Rewritten with brand, product type, and key attributes." },
  { icon: ICON_LINES, title: <a href="/digital-marketing/ecommerce-seo">Descriptions</a>, text: "Clear, accurate, and relevant to how people search." },
  { icon: ICON_TAG, title: "GTINs & brands", text: "Filled in so products are identified correctly." },
  { icon: ICON_GRID, title: "Product types", text: "Your own category structure, kept consistent." },
  { icon: ICON_TARGET, title: "Google category", text: "Mapped to the closest category." },
  { icon: ICON_IMAGE, title: "Images", text: "High quality, with no promotional overlays." },
  {
    icon: ICON_DOLLAR,
    title: "Price & availability",
    text: (
      <>
        Kept in sync with <a href="/website-development/ecommerce">your website</a>.
      </>
    ),
  },
  { icon: ICON_TRUCK, title: "Shipping & returns", text: "Set correctly in Merchant Center." },
];

/* -------- custom labels -------- */

const LABELS: { label: string; groups: string; use: string }[] = [
  { label: "Margin level", groups: "High, medium, and low margin products", use: "Put more budget behind profitable items" },
  { label: "Best sellers", groups: "Proven top products", use: "Protect and scale what already sells" },
  { label: "Seasonal", groups: "Products tied to seasons or events", use: "Push at the right time of year" },
  { label: "New arrivals", groups: "Recently added products", use: "Give new items a chance to gather data" },
  { label: "Clearance", groups: "Items you want to move", use: "Separate goals and budgets" },
];

/* -------- controls (4) -------- */

const CONTROLS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_SHIELD_CHECK, title: "Brand exclusions", text: "Limit brand searches in PMax so brand and non-brand results stay clearer." },
  { icon: ICON_SEARCH_X, title: "Negative keywords", text: "Applied at the account or campaign level where Google allows." },
  { icon: ICON_LINK, title: "Final URL settings", text: "Control whether Google can send traffic to other pages on your site." },
  { icon: ICON_SCREEN_CHECK, title: "Placement & content settings", text: "Exclusions applied where available to protect your brand." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_BAG, text: "Merchant Center setup or review" },
  { icon: ICON_SEARCH, text: "Product feed audit and optimization" },
  { icon: ICON_TAG, text: "Custom label strategy" },
  { icon: ICON_GRID, text: "Standard Shopping and Performance Max campaign builds" },
  { icon: ICON_IMAGE, text: "Asset groups with images, video, and copy" },
  { icon: ICON_PERSON, text: "Audience signal setup" },
  { icon: ICON_SHIELD, text: "Brand exclusions and available negative controls" },
  { icon: ICON_LINES_CHECK, text: "Conversion and value tracking check" },
  { icon: ICON_TREND, text: "Monthly reporting with product and channel insights" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_BAG, text: <><strong>Online stores</strong> selling physical products through Google.</>, delay: 0 },
  {
    icon: ICON_GLOBE_HALF,
    text: (
      <>
        <strong>
          <a href="/digital-marketing/google-ads-audit">Brands already running PMax</a>
        </strong>{" "}
        that want more clarity and control.
      </>
    ),
    delay: 60,
  },
  { icon: ICON_WARN, text: <><strong>Stores with feed issues</strong> or many disapproved products.</>, delay: 120 },
  { icon: ICON_TREND, text: <><strong>Growing catalogs</strong> that need smarter product grouping.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does Shopping and PMax management cost?", a: <>It depends on catalog size, number of campaigns, and feed work needed. <strong>Ad spend is paid directly to Google.</strong> We share pricing on the free call.</> },
  { q: "Is Performance Max right for every store?", a: <>Not always. It works best with a <strong>healthy feed, good creative, and reliable conversion data.</strong> We’ll tell you if it’s a good fit.</> },
  { q: "Can I see which search terms PMax uses?", a: <>Google provides search term insights and reporting for PMax. <strong>We review what’s available and report on it in plain language.</strong></> },
  { q: "Do I need video for Performance Max?", a: <>Video helps, but it’s not required to start. <strong>We can recommend simple video options if you don’t have any.</strong></> },
  { q: "Can you guarantee a specific return on ad spend?", a: <>No. Results depend on your products, pricing, and competition. <strong>We focus on strong inputs, structure, and optimization.</strong></> },
  { q: "Should we run Standard Shopping and PMax together?", a: <>Often, yes. Many stores use <strong>Standard Shopping to protect and test key products</strong> while PMax scales the rest. We set the balance based on your feed and goals.</> },
];

/* -------- page -------- */

export default function GoogleShoppingPmaxView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Google Ads", href: "/digital-marketing/google-ads" }}
        line1="Shopping and Performance Max"
        line2={
          <>
            campaigns with structure you can <span className="grad-text">trust.</span>
          </>
        }
        lead={
          <>
            Feed optimization, asset groups, audience signals, and smart product segmentation,{" "}
            <strong>so automation works for your goals, not against them.</strong>
          </>
        }
        primary={{ label: "Book a shopping ads call", href: "/contact" }}
        secondary={{ label: "See how PMax works ↓", href: "#how" }}
      >
        <PmaxCard />
      </ServiceDetailHero>

      <TrustBar items={["Feed cleaned and enriched", "Products grouped with custom labels", "Asset groups built with care", "Brand and search controls applied"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark gsp-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Automation needs inputs</span>
            <h2>Automation needs good inputs.</h2>
            <p>Performance Max relies on what you give it.</p>
          </Reveal>
          <Reveal className="gsp-glance">
            <div className="gtxt">
              <p>Performance Max uses Google’s automation to place ads across many channels from one campaign.</p>
              <p>
                That can work well, but <strong>it depends on the quality of your feed, your creative assets, your conversion data, and your goals.</strong>
              </p>
              <p>
                Our job is to give the system <strong>strong inputs and clear structure,</strong> then review what it does with them.
              </p>
            </div>
            <div className="gbox">
              <h4>At a glance</h4>
              <ul>
                {GLANCE.map((item) => (
                  <li key={item}>
                    <span className="gk">{ICON_CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STANDARD VS PMAX */}
      <section className="band tint gsp-sec" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Standard Shopping vs PMax</span>
            <h2>Both have a place. Many stores use them together.</h2>
          </Reveal>
          <Reveal className="gsp-vx-tbl">
            <div className="gsp-vx-row head">
              <div></div>
              <div className="ss">Standard Shopping</div>
              <div className="pm">Performance Max</div>
            </div>
            {COMPARE.map((row) => (
              <div className="gsp-vx-row" key={row.k}>
                <div>{row.k}</div>
                <div className="ss">{row.ss}</div>
                <div className="pm">{row.pm}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW PMAX WORKS */}
      <section className="band gsp-sec" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>How Performance Max works.</h2>
            <p>Your inputs go in. Google’s automation decides where and when to show ads.</p>
          </Reveal>
          <Reveal className="gsp-hw6">
            {HOW.map((step, i) => (
              <Fragment key={step.title}>
                {i > 0 && (
                  <span className="harr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
                <article className={`gsp-hw${step.out ? " out" : ""}`}>
                  <div className="hi">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ASSET GROUPS */}
      <section className="band tint gsp-sec" id="assetgroups">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Asset groups</span>
            <h2>How we build asset groups.</h2>
            <p>Asset groups should be organized around how people shop, not just how your catalog is listed.</p>
          </Reveal>
          <Reveal className="gsp-ag-grid">
            {ASSET_GROUPS.map((card) => (
              <article className="gsp-ag" key={card.title}>
                <span className="agk">Option</span>
                <div className="agi">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FEED OPTIMIZATION */}
      <section className="band gsp-sec" id="feed">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Feed optimization</span>
            <h2>Feed optimization essentials.</h2>
            <p>A better feed helps your products match more relevant searches.</p>
          </Reveal>
          <Reveal className="gsp-fo-grid">
            {FEED.map((card, i) => (
              <article className="gsp-fo" key={i}>
                <div className="foi">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CUSTOM LABELS */}
      <section className="band tint gsp-sec" id="labels">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Custom labels</span>
            <h2>Custom label strategy.</h2>
            <p>Custom labels let us group products by business value, not just category.</p>
          </Reveal>
          <Reveal className="gsp-cl-tbl">
            <div className="gsp-cl-row head">
              <div>Custom label</div>
              <div>What it groups</div>
              <div>How we use it</div>
            </div>
            {LABELS.map((row) => (
              <div className="gsp-cl-row" key={row.label}>
                <div>
                  <span className="cll">{row.label}</span>
                </div>
                <div>{row.groups}</div>
                <div>{row.use}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="band gsp-sec" id="controls">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Controls</span>
            <h2>Controls we apply.</h2>
            <p>Performance Max has fewer levers, so we use the ones available carefully.</p>
          </Reveal>
          <Reveal className="gsp-ctl-grid">
            {CONTROLS.map((card) => (
              <article className="gsp-ctl" key={card.title}>
                <span className="ctli">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint gsp-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From Merchant Center to channel insights.</h2>
          </Reveal>
          <Reveal className="gsp-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="gsp-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band gsp-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Give automation the inputs it needs.</h2>
          </Reveal>
          <div className="gsp-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="gsp-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every campaign." />

      <CtaBand
        id="start"
        eyebrow="Google Shopping & Performance Max"
        heading="Give automation the inputs it needs."
        copy={
          <>
            Book a free call to review your feed, Shopping, and Performance Max campaigns:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your setup and show you what’s really driving results.</strong>
          </>
        }
        primaryLabel="Book a shopping ads call"
        primaryHref="/contact"
        secondary={{ label: "See how PMax works", href: "#how", arrow: "↗" }}
      />
    </>
  );
}
