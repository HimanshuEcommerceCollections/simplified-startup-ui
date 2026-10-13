"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./ops-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_TICK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X_LIST = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TITLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_META = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_H1 = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 4v16M18 4v16M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_HEADERS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_OPENING = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16M4 10h16M4 15h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 16l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BODY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 10h16M4 14h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PILLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M12 10v2M12 12H6.5v2M12 12h5.5v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CLUSTER = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="5" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m7 7 3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_EYE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_RECOMMEND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SWAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h4v4M20 17h-4v-4M8 7s2 4 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* -------- hero signature: page-optimization document -------- */

const DOC_ROWS: { tag: string; body: ReactNode }[] = [
  { tag: "Title", body: <div className="t-title"></div> },
  { tag: "Meta", body: <div className="t-meta"></div> },
  { tag: "H1", body: <div className="t-h1"></div> },
  {
    tag: "Content",
    body: (
      <div className="t-lines">
        <div className="t-line"></div>
        <div className="t-line"></div>
      </div>
    ),
  },
  { tag: "Links + schema", body: <span className="t-link"></span> },
];

function DocCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the skeleton rows and tick tags are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A page being optimized element by element"
      className={`ops-doc${run ? " run" : ""}`}
      live="Page optimization"
      corner="ELEMENT BY ELEMENT"
      footLeft="Every element, one clear job"
      footRight="matched to intent →"
    >
      <div className="ops-doc-body">
        {DOC_ROWS.map((row) => (
          <div className="dl" key={row.tag}>
            {row.body}
            <span className="tag">
              {ICON_TICK}
              {row.tag}
            </span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (3 cards) -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_PIN, title: "It’s fully in your control", text: <>Unlike links, every on-page element <strong>can be improved directly.</strong></> },
  { icon: ICON_TREND, title: "Small changes add up", text: <>Clearer titles, headings, and links <strong>improve many pages at once.</strong></> },
  { icon: ICON_CHECK_BOLD, title: "It helps conversions too", text: <>Pages that answer questions clearly <strong>also persuade better.</strong></> },
];

/* -------- page anatomy (10) -------- */

const ANATOMY: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_TITLE, title: "Title tag", text: "Clear, specific, written to earn the click." },
  { no: "02", icon: ICON_META, title: "Meta description", text: "A short summary that sets expectations." },
  { no: "03", icon: ICON_CODE, title: "URL", text: "Short, readable, and descriptive." },
  { no: "04", icon: ICON_H1, title: "H1 heading", text: "One clear headline matching the topic." },
  { no: "05", icon: ICON_HEADERS, title: "Header structure", text: "Logical H2/H3 sections that scan well." },
  { no: "06", icon: ICON_OPENING, title: "Opening paragraph", text: "Answers the main question early." },
  { no: "07", icon: ICON_BODY, title: "Body content", text: "Covers the topic fully, in plain language." },
  { no: "08", icon: ICON_LINK, title: "Internal links", text: "Descriptive anchors to related pages." },
  { no: "09", icon: ICON_IMAGE, title: "Images", text: "Compressed, with file names and alt text." },
  { no: "10", icon: ICON_CODE, title: "Schema markup", text: "Structured data that helps engines read it." },
];

/* -------- intent table -------- */

const INTENTS: { name: string; wants: string; best: string }[] = [
  { name: "Informational", wants: "To learn or understand something.", best: "Guides, explainers, and blog posts." },
  { name: "Commercial", wants: "To compare options before buying.", best: "Comparison, review, and “best” pages." },
  { name: "Transactional", wants: "To buy, book, or sign up.", best: "Service, product, and landing pages." },
  { name: "Navigational", wants: "To find a specific brand or page.", best: "Homepage, brand, and login pages." },
];

/* -------- under-optimized vs optimized -------- */

const VS_BAD = [
  "Generic title like “Services”",
  "Several H1s or none at all",
  "Main answer buried at the bottom",
  "Few or no internal links",
  "Large, unnamed images",
  "No structured data",
];
const VS_GOOD = [
  "Specific, descriptive title",
  "One clear H1 and logical sections",
  "Main answer near the top",
  "Helpful links to related pages",
  "Compressed images with alt text",
  "Relevant schema markup",
];

/* -------- linking (3 centred cards) -------- */

const LINKING: { icon: ReactNode; title: ReactNode; text: string }[] = [
  { icon: ICON_PILLAR, title: <a href="/digital-marketing/content-marketing">Pillar pages</a>, text: "Broad pages that cover a main topic and link out to related detail pages." },
  { icon: ICON_CLUSTER, title: <a href="/digital-marketing/content-marketing">Cluster pages</a>, text: "Focused pages that go deep on one subtopic and link back to the pillar." },
  { icon: ICON_LINK, title: "Contextual links", text: "Natural links within content that guide readers to the next useful page." },
];

/* -------- 5-step process -------- */

const PROCESS: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_SEARCH, title: "Research", text: "Keywords and intent for each page." },
  { no: "02", icon: ICON_EYE, title: "Review", text: "Current page compared with top results." },
  { no: "03", icon: ICON_RECOMMEND, title: "Recommend", text: "Clear edits for each element." },
  { no: "04", icon: ICON_SWAP, title: "Implement", text: "Changes made in your CMS or by your team." },
  { no: "05", icon: ICON_TREND, title: "Track", text: "Rankings and engagement monitored." },
];

/* -------- included (10) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Keyword and intent mapping for key pages" },
  { icon: ICON_TITLE, text: "Title tag and meta description rewrites" },
  { icon: ICON_H1, text: "Heading structure improvements" },
  { icon: ICON_LINES, text: "Content gap and clarity edits" },
  { icon: ICON_LINK, text: "Internal linking recommendations" },
  { icon: ICON_IMAGE, text: "Image optimization and alt text" },
  { icon: ICON_CODE, text: "Schema markup recommendations" },
  { icon: ICON_CODE, text: "URL and on-page technical checks" },
  { icon: ICON_SWAP, text: "Implementation in your CMS (optional)" },
  { icon: ICON_TREND, text: "Monthly progress reporting" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_TREND, text: <><strong>Businesses with existing traffic</strong> that want more from the pages they already have.</>, delay: 0 },
  { icon: ICON_REFRESH, text: <><strong>Sites after a redesign</strong> that need pages tuned for search.</>, delay: 60 },
  { icon: ICON_FILE, text: <><strong>Teams publishing regularly</strong> who want a consistent optimization standard.</>, delay: 120 },
  { icon: ICON_CALENDAR, text: <><strong>Service businesses</strong> whose service pages aren’t showing up for key searches.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does on-page SEO cost?", a: <>It depends on the number of pages and how much content needs to change. <strong>We share pricing on the free call.</strong></> },
  {
    q: "On-page vs technical SEO: what’s the difference?",
    a: (
      <>
        On-page SEO focuses on content and page elements like titles and headings.{" "}
        <strong>
          <a className="ops-faq-link" href="/digital-marketing/technical-seo-audit">Technical SEO</a> focuses on how search engines crawl and index the site.
        </strong>
      </>
    ),
  },
  { q: "Will you rewrite my content?", a: <>When needed. Sometimes small edits are enough; other pages need larger rewrites. <strong>We’ll recommend what fits each page.</strong></> },
  { q: "Can you work in our CMS?", a: <>Yes. We work in <strong>WordPress, Webflow, Shopify, and other common platforms,</strong> or hand off edits to your team.</> },
  { q: "Can you guarantee rankings?", a: <>No. Nobody can honestly guarantee rankings. <strong>On-page SEO improves the signals search engines use to judge relevance.</strong></> },
  { q: "How many pages do you optimize at once?", a: <>We usually start with your <strong>highest-value pages,</strong> then work through the rest in priority order, so the pages that matter most improve first.</> },
];

/* -------- page -------- */

export default function OnPageSeoView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="Make every page clear to"
        line2={
          <>
            searchers and <span className="grad-text">engines.</span>
          </>
        }
        lead={
          <>
            On-page SEO that aligns each page with search intent:{" "}
            <strong>from titles and headings to content, links, images, and structured data.</strong>
          </>
        }
        primary={{ label: "Book an on-page SEO call", href: "/contact" }}
        secondary={{ label: "See the page anatomy ↓", href: "#anatomy" }}
      >
        <DocCard />
      </ServiceDetailHero>

      <TrustBar items={["Titles, headings & content", "Internal links", "Images & schema", "Matched to search intent"]} />

      {/* WHY */}
      <section className="band tint ops-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Every page needs a clear job.</h2>
            <p>
              On-page SEO is about making each page obviously relevant for the searches it targets. When a page’s purpose,
              content, and structure line up, search engines and visitors both understand it faster.
            </p>
          </Reveal>
          <Reveal className="ops-surf-grid">
            {WHY.map((card) => (
              <article className="ops-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PAGE ANATOMY */}
      <section className="band ops-sec" id="anatomy">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Page anatomy</span>
            <h2>Anatomy of an optimized page.</h2>
            <p>Every page we optimize is reviewed against these elements.</p>
          </Reveal>
          <Reveal className="ops-pa-grid">
            {ANATOMY.map((item) => (
              <article className="ops-pa" key={item.no}>
                <span className="pan">{item.no}</span>
                <div className="pai">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INTENT */}
      <section className="band tint ops-sec" id="intent">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Search intent</span>
            <h2>Matching pages to search intent.</h2>
            <p>The same topic can have different intents. We make sure each page matches the right one.</p>
          </Reveal>
          <Reveal className="ops-int-tbl">
            <div className="ops-int-row head">
              <div>Intent</div>
              <div>What the searcher wants</div>
              <div>Best page type</div>
            </div>
            {INTENTS.map((row) => (
              <div className="ops-int-row" key={row.name}>
                <div className="intn">
                  <span className="id"></span>
                  {row.name}
                </div>
                <div>{row.wants}</div>
                <div className="best">{row.best}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* UNDER VS OPTIMIZED */}
      <section className="band ops-sec" id="difference">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The difference</span>
            <h2>Under-optimized vs optimized.</h2>
          </Reveal>
          <Reveal className="ops-vs-grid">
            <article className="ops-vs bad">
              <h3>
                <span className="vh">{ICON_X}</span>Under-optimized page
              </h3>
              <ul>
                {VS_BAD.map((item) => (
                  <li key={item}>
                    <span className="m">{ICON_X_LIST}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="ops-vs good">
              <h3>
                <span className="vh">{ICON_CHECK}</span>Optimized page
              </h3>
              <ul>
                {VS_GOOD.map((item) => (
                  <li key={item}>
                    <span className="m">{ICON_CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* LINKING */}
      <section className="band tint ops-sec" id="linking">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Linking structure</span>
            <h2>How we approach internal linking.</h2>
            <p>Internal links show search engines which pages matter and how topics connect.</p>
          </Reveal>
          <Reveal className="ops-lk3-grid">
            {LINKING.map((card) => (
              <article className="ops-lk3" key={card.text}>
                <div className="lki">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="band ops-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Our on-page process.</h2>
            <p>A repeatable process we apply page by page.</p>
          </Reveal>
          <Reveal className="ops-proc5">
            {PROCESS.map((step, i) => (
              <Fragment key={step.no}>
                {i > 0 && (
                  <span className="p5arr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
                <article className="ops-p5">
                  <span className="p5n">{step.no}</span>
                  <div className="p5i">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint ops-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>From intent mapping to monthly reporting.</h2>
          </Reveal>
          <Reveal className="ops-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="ops-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band ops-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs on-page SEO</span>
            <h2>Give every page a clear purpose.</h2>
          </Reveal>
          <div className="ops-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="ops-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every on-page project." />

      <CtaBand
        id="start"
        eyebrow="On-Page SEO Services"
        heading="Give every page a clear purpose."
        copy={
          <>
            Book a free call to review your key pages and where on-page SEO would help most:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review a few key pages and show you what could be clearer.</strong>
          </>
        }
        primaryLabel="Book an on-page SEO call"
        primaryHref="/contact"
        secondary={{ label: "See the page anatomy", href: "#anatomy", arrow: "↗" }}
      />
    </>
  );
}
