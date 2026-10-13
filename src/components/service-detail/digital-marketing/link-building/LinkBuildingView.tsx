"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./lkb-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_MID = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X_MID = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 13 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHAT_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 10h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TITLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
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
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_MEGAPHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l14-6v14L3 13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_MEGAPHONE_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l14-6v14L3 13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M17 8h3M17 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_EXPERT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m16 4 1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINK_BROKEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 12a3 3 0 0 1 3-3h2M15 12a3 3 0 0 1-3 3h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m4 4 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LAYERS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l9 4-9 4-9-4 9-4ZM3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_HOME = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 16l2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK_LOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 17l2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES_SHORT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC3 = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOOK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v14H4zM8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TRIO = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="8" r="2.4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="8" r="2.4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="16" r="2.4" stroke="currentColor" strokeWidth="2" />
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

/* -------- hero signature: earned backlink card -------- */

const LINK_CHECKS: { name: string; sub: string }[] = [
  { name: "Relevant site", sub: "Same industry" },
  { name: "Real audience", sub: "Genuine traffic" },
  { name: "Editorial placement", sub: "Chosen, not paid" },
];

function BacklinkCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the arrow and check rows are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A relevant site earning a link to yours"
      className={`lkb-link${run ? " run" : ""}`}
      live="Earned backlink"
      corner="WHITE-HAT"
      footLeft="Earned, not bought"
      footRight="a vote of trust →"
    >
      <div className="lkb-flow">
        <div className="lkb-site src">
          <span className="favi">{ICON_DOC}</span>
          <b>Industry Journal</b>
          <small>DR 78 · relevant</small>
        </div>
        <div className="lkb-arrow" aria-hidden="true">
          <svg viewBox="0 0 46 26">
            <defs>
              <linearGradient id="lkbArrowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#2563eb" />
                <stop offset="1" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            <path className="path" d="M3 13h34" />
            <path className="head2" d="M35 7l8 6-8 6z" />
          </svg>
        </div>
        <div className="lkb-site dst">
          <span className="favi">{ICON_STAR}</span>
          <b>Your Page</b>
          <small>editorial link</small>
        </div>
      </div>
      <div className="lkb-checks">
        {LINK_CHECKS.map((row) => (
          <div className="lkb-lc" key={row.name}>
            <span className="ci">{ICON_CHECK}</span>
            <span className="cn">{row.name}</span>
            <span className="cs">{row.sub}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (3 cards + dark quote) -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_CHECK_CIRCLE, title: "Relevance matters most", text: <>A link from a site in your industry carries more meaning than <strong>a random one.</strong></> },
  { icon: ICON_STAR, title: "Quality beats quantity", text: <>A few strong links can be worth more than <strong>many weak ones.</strong></> },
  { icon: ICON_WARN, title: "Shortcuts carry risk", text: <>Search engines have <strong>clear spam policies against link schemes.</strong></> },
];

/* -------- quality standards (6) -------- */

const STANDARDS: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_CHECK_CIRCLE, title: "Relevant site", items: ["Same or related industry", "Real topic overlap"] },
  { icon: ICON_PEOPLE, title: "Real audience", items: ["Genuine readers and traffic", "Active, maintained site"] },
  { icon: ICON_CHAT_LINES, title: "Editorial placement", items: ["Placed naturally in content", "Chosen by the site owner"] },
  { icon: ICON_TITLE, title: "Natural anchor text", items: ["Brand or descriptive text", "No forced exact matches"] },
  { icon: ICON_SEARCH, title: "Indexed page", items: ["Page visible in search", "Not hidden or orphaned"] },
  { icon: ICON_SHIELD, title: "Lasting value", items: ["Useful to that site’s readers", "Likely to stay live"] },
];

/* -------- methods (8 tilt cards) -------- */

const METHODS: { icon: ReactNode; title: ReactNode; text: string }[] = [
  { icon: ICON_MEGAPHONE_LINES, title: "Digital PR", text: "Story angles, data, and expert commentary pitched to journalists and publications." },
  { icon: ICON_EXPERT, title: "Expert contributions", text: "Helpful articles and quotes for respected sites in your industry." },
  { icon: ICON_DOC_CHECK, title: "Linkable assets", text: "Guides, tools, templates, and research others want to reference." },
  { icon: ICON_LINK, title: "Unlinked mentions", text: "Turning existing mentions of your brand into links." },
  { icon: ICON_LINK_BROKEN, title: "Broken link replacement", text: "Suggesting your relevant content to replace dead links on other sites." },
  { icon: ICON_LAYERS, title: "Partner & supplier links", text: "Links from businesses you already work with." },
  { icon: ICON_HOME, title: <a href="/digital-marketing/local-seo">Local &amp; community links</a>, text: "Chambers, associations, events, and sponsorships." },
  { icon: ICON_LIST_CHECK, title: "Resource page outreach", text: "Getting your best content listed on relevant resource pages." },
];

function MethodsGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="lkb-mth-grid">
        {METHODS.map((card, i) => (
          <article className="lkb-mth" key={i} data-tilt>
            <span className="lkb-mth-spot"></span>
            <div className="mi">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- avoid vs focus (two staggered lists) -------- */

const AVOID = [
  "Private blog networks",
  "Paid links that pass ranking value",
  "Link farms and spammy directories",
  "Mass comment or forum spam",
  "Exact-match anchor stuffing",
  "Low-quality guest post marketplaces",
];
const FOCUS = [
  "Real websites with real audiences",
  "Editorially earned placements",
  "Relevant industry publications",
  "Content worth linking to",
  "Natural, varied anchor text",
  "Relationships that last",
];

const VS_OPTS: IntersectionObserverInit = { threshold: 0.2 };

/* the design observes each list on its own (threshold .2) and staggers its rows in */
function VsCard({ kind, title, items }: { kind: "bad" | "good"; title: string; items: string[] }) {
  const [ref, inView] = useInView<HTMLElement>(VS_OPTS);
  const head = kind === "bad" ? ICON_X : ICON_CHECK_MID;
  const mark = kind === "bad" ? ICON_X_MID : ICON_CHECK_MID;
  return (
    <article className={`lkb-vs ${kind}${inView ? " in" : ""}`} ref={ref}>
      <h3>
        <span className="vh">{head}</span>
        {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <span className="m">{mark}</span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* -------- linkable assets table -------- */

const ASSETS: { icon: ReactNode; name: string; why: string }[] = [
  { icon: ICON_TREND, name: "Original research", why: "Gives writers new information to cite." },
  { icon: ICON_DOC, name: "In-depth guides", why: "Becomes a go-to reference on a topic." },
  { icon: ICON_DOC3, name: "Free tools and calculators", why: "Useful enough that people share them." },
  { icon: ICON_LIST_CHECK_LOW, name: "Templates and checklists", why: "Saves others time, so they recommend it." },
  { icon: ICON_BOOK, name: "Glossaries and explainers", why: "Helpful for defining terms in other content." },
  { icon: ICON_TRIO, name: "Expert roundups", why: "Contributors often share and link to them." },
];

/* -------- 5-step process -------- */

const PROCESS: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_SEARCH, title: "Audit", text: "Review your current backlinks and competitors." },
  { no: "02", icon: ICON_LINES_SHORT, title: "Plan", text: "Choose methods and target sites." },
  { no: "03", icon: ICON_DOC_CHECK, title: "Create", text: "Build or improve linkable content." },
  { no: "04", icon: ICON_MEGAPHONE, title: "Outreach", text: "Personal, relevant pitches to site owners." },
  { no: "05", icon: ICON_TREND, title: "Report", text: "Share earned links and next steps." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Backlink profile audit" },
  { icon: ICON_TREND, text: "Competitor link gap analysis" },
  { icon: ICON_SEARCH_MINUS, text: "Link opportunity research" },
  { icon: ICON_DOC, text: "Linkable asset recommendations" },
  { icon: ICON_MEGAPHONE, text: "Personalized outreach campaigns" },
  { icon: ICON_MEGAPHONE_LINES, text: "Digital PR pitching (when included)" },
  { icon: ICON_LINK, text: "Unlinked mention monitoring" },
  { icon: ICON_SHIELD_CHECK, text: "Toxic link review and disavow guidance when needed" },
  { icon: ICON_DOC, text: "Monthly report of earned links and outreach activity" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_DOC, text: <><strong>Sites with strong content</strong> that isn’t getting the visibility it deserves.</>, delay: 0 },
  { icon: ICON_TREND, text: <><strong>Businesses in competitive industries</strong> where rivals have stronger link profiles.</>, delay: 60 },
  { icon: ICON_PIN, text: <><strong>New websites</strong> building authority from the ground up.</>, delay: 120 },
  { icon: ICON_MEGAPHONE_LINES, text: <><strong>Brands with press-worthy stories</strong> that aren’t being covered yet.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does link building cost?", a: <>It depends on your industry, methods used, and how much content creation is involved. <strong>We share pricing on the free call.</strong></> },
  { q: "Do you buy links?", a: <>No. Buying links that pass ranking value goes against search engine guidelines. <strong>We focus on earned, editorial links.</strong></> },
  { q: "Can you guarantee a number of links?", a: <>No. Earned links depend on site owners choosing to link. <strong>We focus on quality opportunities and consistent outreach.</strong></> },
  { q: "Do I need new content for link building?", a: <>Not always. Existing strong content can be promoted. Often, <strong>one or two new linkable assets help a lot.</strong></> },
  { q: "What is a toxic link?", a: <>A low-quality or spammy link that may look manipulative. <strong>We review your profile and advise if any action is needed.</strong></> },
  { q: "How long until links show an impact?", a: <>Links build authority gradually. <strong>Quality links compound over months:</strong> this is a steady, long-term channel, not an overnight one.</> },
];

/* -------- page -------- */

export default function LinkBuildingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="Earn links from sites your"
        line2={
          <>
            audience already <span className="grad-text">trusts.</span>
          </>
        }
        lead={
          <>
            White-hat link building and digital PR focused on <strong>relevance and quality</strong>, built to stay within search engine
            guidelines.
          </>
        }
        primary={{ label: "Book a link building call", href: "/contact" }}
        secondary={{ label: "See our methods ↓", href: "#methods" }}
      >
        <BacklinkCard />
      </ServiceDetailHero>

      <TrustBar items={["White-hat only", "Relevance over volume", "Digital PR & outreach", "No link schemes"]} />

      {/* WHY */}
      <section className="band tint lkb-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Links are still a vote of trust.</h2>
            <p>
              When reputable websites link to you, it signals that your content is worth referencing. But not all links are equal, and the
              wrong ones can do more harm than good.
            </p>
          </Reveal>
          <Reveal className="lkb-surf-grid">
            {WHY.map((card) => (
              <article className="lkb-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="lkb-why-quote">
            The best links aren’t bought. <span>They’re earned by giving other sites a good reason to point to you.</span>
          </Reveal>
        </div>
      </section>

      {/* QUALITY STANDARDS */}
      <section className="band lkb-sec" id="standards">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Quality standards</span>
            <h2>What makes a good link.</h2>
            <p>Every link opportunity is checked against these standards before outreach.</p>
          </Reveal>
          <Reveal className="lkb-qs-grid">
            {STANDARDS.map((group) => (
              <article className="lkb-qs" key={group.title}>
                <h3>
                  <span className="qi">{group.icon}</span>
                  {group.title}
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="b">{ICON_CHECK}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* METHODS */}
      <section className="band tint lkb-sec" id="methods">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we earn links</span>
            <h2>Link building methods.</h2>
            <p>We use a mix of methods based on your industry and the assets you have.</p>
          </Reveal>
          <MethodsGrid />
        </div>
      </section>

      {/* AVOID VS FOCUS */}
      <section className="band lkb-sec" id="standards2">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our standards</span>
            <h2>What we avoid vs what we focus on.</h2>
          </Reveal>
          <Reveal className="lkb-vs-grid">
            <VsCard kind="bad" title="What we avoid" items={AVOID} />
            <VsCard kind="good" title="What we focus on" items={FOCUS} />
          </Reveal>
        </div>
      </section>

      {/* LINKABLE ASSETS */}
      <section className="band tint lkb-sec" id="assets">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Linkable assets</span>
            <h2>Content that attracts links.</h2>
            <p>
              Some content naturally earns links.{" "}
              <a className="lkb-a" href="/digital-marketing/seo-content-writing">
                We help plan and create these assets.
              </a>
            </p>
          </Reveal>
          <Reveal className="lkb-as-tbl">
            <div className="lkb-as-row head">
              <div>Asset type</div>
              <div>Why people link to it</div>
            </div>
            {ASSETS.map((row) => (
              <div className="lkb-as-row" key={row.name}>
                <div className="asn">
                  <span className="ai2">{row.icon}</span>
                  {row.name}
                </div>
                <div className="asw">{row.why}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="band lkb-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Our link building process.</h2>
            <p>A steady process built around quality, not volume.</p>
          </Reveal>
          <Reveal className="lkb-proc5">
            {PROCESS.map((step, i) => (
              <Fragment key={step.no}>
                {i > 0 && (
                  <span className="p5arr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
                <article className="lkb-p5">
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
      <section className="band tint lkb-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>From backlink audit to monthly reporting.</h2>
          </Reveal>
          <Reveal className="lkb-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="lkb-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band lkb-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs link building</span>
            <h2>Build authority the right way.</h2>
          </Reveal>
          <div className="lkb-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="lkb-who" key={i} style={d(item.delay)}>
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
        eyebrow="Link Building Services"
        heading="Build authority the right way."
        copy={
          <>
            Book a free call to review your backlinks and the link building methods that fit your business:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your current links and where the gaps are.</strong>
          </>
        }
        primaryLabel="Book a link building call"
        primaryHref="/contact"
        secondary={{ label: "See our methods", href: "#methods", arrow: "↗" }}
      />
    </>
  );
}
