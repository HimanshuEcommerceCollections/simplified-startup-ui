"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./scw-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_CHECK_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES_WIDE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_FILE_LONG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 10h6M9 13h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LANDING = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M12 13h5M9 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="7" cy="15" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_COMPARE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 4v16M15 4v16M4 9h4M16 9h4M4 15h4M16 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_HELP = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TYPE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 12a3 3 0 0 1 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
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
const ICON_X_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
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
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_FLAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l14-6v14L3 13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero signature: content brief card -------- */

const BRIEF_KEYWORDS: { text: string; hl?: boolean }[] = [
  { text: "project management software", hl: true },
  { text: "for agencies" },
  { text: "commercial intent" },
];
const BRIEF_QUESTIONS = ["What features matter?", "How much?", "Best for teams?"];
const BRIEF_OUTLINE = ["H2", "H2", "H3"];

function BriefCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the three brief sections are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A researched content brief"
      className={`scw-brf${run ? " run" : ""}`}
      live="Content brief"
      corner="RESEARCHED"
      footLeft="Research in, quality out"
      footRight="readers + search →"
    >
      <div className="scw-brf-body">
        <div className="scw-brf-sec">
          <span className="bk">Target keywords &amp; intent</span>
          <div className="scw-brf-chips">
            {BRIEF_KEYWORDS.map((chip) => (
              <span className={chip.hl ? "hl" : undefined} key={chip.text}>
                {chip.text}
              </span>
            ))}
          </div>
        </div>
        <div className="scw-brf-sec">
          <span className="bk">Questions to answer</span>
          <div className="scw-brf-chips">
            {BRIEF_QUESTIONS.map((q) => (
              <span key={q}>{q}</span>
            ))}
          </div>
        </div>
        <div className="scw-brf-sec">
          <span className="bk">Section outline</span>
          <div className="scw-brf-outline">
            {BRIEF_OUTLINE.map((level, i) => (
              <div className="ol" key={i}>
                <span className="n">{level}</span>
                <span className="bar"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="scw-brf-by">
        <span className="av">H</span>
        <span className="by-t">
          <b>Human writer</b> + editor
        </span>
        <span className="badge2">Fact-checked</span>
      </div>
    </SignatureCard>
  );
}

/* -------- why (3 cards + dark quote) -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_CHECK_CIRCLE, title: "Helpfulness comes first", text: <>Content should answer the searcher’s question, <strong>not just repeat keywords.</strong></> },
  { icon: ICON_STAR, title: "Expertise shows", text: <>Real examples and specifics <strong>build trust with readers and search engines.</strong></> },
  { icon: ICON_LINES_WIDE, title: "Structure matters", text: <>Clear headings and short sections <strong>make content easy to scan.</strong></> },
];

/* -------- content types (9 tilt cards) -------- */

const TYPES: { icon: ReactNode; title: string; href?: string; text: string }[] = [
  { icon: ICON_DOC, title: "Service pages", text: "Clear, persuasive pages for each service you offer." },
  { icon: ICON_FILE, title: "Blog posts", text: "Helpful articles that answer real customer questions." },
  { icon: ICON_LANDING, title: "Landing pages", text: "Focused pages built around one offer and one action." },
  { icon: ICON_FILE_LONG, title: "Long-form guides", text: "In-depth resources that cover a topic end to end." },
  { icon: ICON_COMPARE, title: "Comparison pages", text: "Fair, structured comparisons for buyers weighing options." },
  { icon: ICON_GRID, title: "Product & category copy", href: "/digital-marketing/ecommerce-seo", text: "Descriptions that help shoppers decide." },
  { icon: ICON_PIN, title: "Location pages", href: "/digital-marketing/local-seo", text: "Locally relevant pages for each area you serve." },
  { icon: ICON_HELP, title: "FAQ pages", text: "Direct answers to the questions buyers ask most." },
  { icon: ICON_TREND, title: "Case studies", text: "Real customer stories told in a clear structure." },
];

function ContentTypesGrid() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="scw-ct-grid">
        {TYPES.map((card) => (
          <article className="scw-ct" key={card.title} data-tilt>
            <span className="scw-ct-spot"></span>
            <div className="ci">{card.icon}</div>
            <h3>{card.href ? <a href={card.href}>{card.title}</a> : card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- workflow (5 steps, arrow separators) -------- */

const STEPS: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_SEARCH, title: "Research", text: "Keywords, intent, and competing pages." },
  { no: "02", icon: ICON_LINES, title: "Brief", text: "Outline, angle, and key points agreed." },
  { no: "03", icon: ICON_TYPE, title: "Write", text: "A human writer drafts the piece." },
  { no: "04", icon: ICON_PEN, title: "Edit", text: "Editing, fact-checking, and brand voice review." },
  { no: "05", icon: ICON_LINES_CHECK, title: "Optimize", text: "Titles, headings, links, and schema finalized." },
];

/* -------- brief checklist (3 groups) -------- */

const BRIEF_GROUPS: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_SEARCH, title: "Search", items: ["Primary and related keywords", "Search intent", "Questions to answer"] },
  { icon: ICON_LINES, title: "Structure", items: ["Suggested title and H1", "Section outline", "Target length range"] },
  { icon: ICON_SHIELD, title: "Quality", items: ["Sources and examples to include", "Internal links to add", "Calls to action"] },
];

/* -------- E-E-A-T (4 quadrants) -------- */

const EEAT: { letter: string; kicker: string; icon: ReactNode; title: string; text: string }[] = [
  { letter: "E", kicker: "Experience", icon: ICON_PIN, title: "Real-world detail", text: "Practical examples, scenarios, and lessons from doing the work." },
  { letter: "E", kicker: "Expertise", icon: ICON_SHIELD_CHECK, title: "Accurate depth", text: "Correct terms, clear explanations, and subject-matter input from your team." },
  { letter: "A", kicker: "Authoritativeness", icon: ICON_FILE, title: "Credible sources", text: "Reputable references and clear author information." },
  { letter: "T", kicker: "Trust", icon: ICON_CHECK_CIRCLE, title: "Honest and clear", text: "No exaggerated claims, up-to-date information, and transparent details." },
];

/* -------- unedited AI vs our content -------- */

const VS_BAD = ["Generic, repetitive phrasing", "Facts left unchecked", "No real examples", "Off-brand tone", "Thin coverage of the topic", "Same as competitors’ pages"];
const VS_GOOD = ["Clear, natural writing", "Facts and sources checked", "Specific examples and details", "Matches your brand voice", "Covers what searchers need", "A distinct angle for your business"];

/* the design observes each column on its own (threshold .2) and staggers the list items in */
function VsColumn({ kind, title, headIcon, itemIcon, items }: { kind: "bad" | "good"; title: string; headIcon: ReactNode; itemIcon: ReactNode; items: string[] }) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  return (
    <article className={`scw-vs ${kind}${inView ? " in" : ""}`} ref={ref}>
      <h3>
        <span className="vh">{headIcon}</span>
        {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <span className="m">{itemIcon}</span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* -------- included (10) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Keyword and topic research" },
  { icon: ICON_LINES, text: "Detailed content brief" },
  { icon: ICON_TYPE, text: "Human-written first draft" },
  { icon: ICON_PEN, text: "Editing and fact-checking" },
  { icon: ICON_FLAG, text: "Brand voice alignment" },
  { icon: ICON_TYPE, text: "SEO title and meta description" },
  { icon: ICON_LINES_LINK, text: "Heading structure and internal links" },
  { icon: ICON_IMAGE, text: "Image and alt text suggestions" },
  { icon: ICON_HELP, text: "FAQ and schema recommendations" },
  { icon: ICON_REFRESH, text: "Revision round on every piece" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_TYPE, text: <><strong>Businesses without in-house writers</strong> who need consistent, quality content.</> },
  { icon: ICON_PEOPLE, text: <><strong>Marketing teams</strong> that need more output without lowering standards.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Companies relaunching a website</strong> that need new pages written for search.</>, delay: 120 },
  { icon: ICON_STAR, text: <><strong>Founders and experts</strong> who know the subject but lack time to write.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does SEO content writing cost?", a: <>It depends on content type, length, research depth, and volume. <strong>We share pricing on the free call.</strong></> },
  { q: "Do you use AI to write content?", a: <>AI tools may help with research or outlines, but <strong>every piece is written and edited by people,</strong> then checked for accuracy and voice.</> },
  { q: "Can you write in our brand voice?", a: <>Yes. We review your existing content and guidelines, and <strong>create a voice guide if you don’t have one.</strong></> },
  { q: "Do you upload content to our website?", a: <>We can upload to <strong>WordPress, Webflow, Shopify, and other common platforms,</strong> or deliver ready-to-publish documents.</> },
  { q: "Who owns the content?", a: <>You do. <strong>All content we write for you belongs to your business.</strong></> },
  { q: "How many revisions are included?", a: <>Every piece includes a <strong>revision round.</strong> We refine based on your feedback so the final draft matches your expectations and voice.</> },
];

/* -------- page -------- */

export default function SeoContentWritingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="Content written for readers,"
        line2={
          <>
            structured for <span className="grad-text">search.</span>
          </>
        }
        lead={
          <>
            Human-written, edited, and optimized content for service pages, blogs, landing pages, and guides,{" "}
            <strong>built from research, not guesswork.</strong>
          </>
        }
        primary={{ label: "Book a content call", href: "/contact" }}
        secondary={{ label: "See our workflow ↓", href: "#workflow" }}
      >
        <BriefCard />
      </ServiceDetailHero>

      <TrustBar items={["Human writers & editors", "Researched briefs", "On-page SEO built in", "E-E-A-T focused"]} />

      {/* WHY */}
      <section className="band tint scw-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Content has to earn its place.</h2>
            <p>
              Search engines aim to show the most helpful result for each search. Content that ranks well today usually
              answers the question clearly, shows real expertise, and is easy to read.
            </p>
          </Reveal>
          <Reveal className="scw-surf-grid">
            {WHY.map((card) => (
              <article className="scw-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="scw-why-quote">
            The goal isn’t more words on the page. <span>It’s the most useful page for the search.</span>
          </Reveal>
        </div>
      </section>

      {/* CONTENT TYPES */}
      <section className="band scw-sec" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we write</span>
            <h2>Content types we write.</h2>
            <p>Each content type follows its own structure and goal.</p>
          </Reveal>
          <ContentTypesGrid />
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="band tint scw-sec" id="workflow">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Brief-to-publish workflow.</h2>
            <p>Every piece moves through the same steps before it reaches you.</p>
          </Reveal>
          <Reveal className="scw-proc5">
            {STEPS.map((step, i) => (
              <Fragment key={step.no}>
                {i > 0 && (
                  <span className="p5arr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
                <article className="scw-p5">
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

      {/* BRIEF CHECKLIST */}
      <section className="band scw-sec" id="brief">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Inside every brief</span>
            <h2>What’s in every content brief.</h2>
            <p>Briefs keep every piece focused and consistent.</p>
          </Reveal>
          <Reveal className="scw-bc3-grid">
            {BRIEF_GROUPS.map((group) => (
              <article className="scw-bc3" key={group.title}>
                <h3>
                  <span className="bi">{group.icon}</span>
                  {group.title}
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="b">{ICON_TICK}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* E-E-A-T */}
      <section className="band tint scw-sec" id="eeat">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Quality signals</span>
            <h2>E-E-A-T built into every piece.</h2>
            <p>
              Google’s quality guidelines emphasize experience, expertise, authoritativeness, and trust. We build these into
              the writing.
            </p>
          </Reveal>
          <Reveal className="scw-eeat-grid">
            {EEAT.map((card) => (
              <article className="scw-eeat" key={card.kicker}>
                <span className="letter" aria-hidden="true">
                  {card.letter}
                </span>
                <span className="ek">{card.kicker}</span>
                <div className="ei">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* AI VS OUR */}
      <section className="band scw-sec" id="standard">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our standard</span>
            <h2>Unedited AI content vs our content.</h2>
          </Reveal>
          <Reveal className="scw-vs-grid">
            <VsColumn kind="bad" title="Unedited AI content" headIcon={ICON_X_HEAD} itemIcon={ICON_X} items={VS_BAD} />
            <VsColumn kind="good" title="Our content" headIcon={ICON_CHECK} itemIcon={ICON_CHECK} items={VS_GOOD} />
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint scw-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every piece includes</span>
            <h2>From research to a revision round.</h2>
          </Reveal>
          <Reveal className="scw-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="scw-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band scw-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs SEO content writing</span>
            <h2>Publish content worth finding.</h2>
          </Reveal>
          <div className="scw-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="scw-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every project." />

      <CtaBand
        id="start"
        eyebrow="SEO Content Writing Services"
        heading="Publish content worth finding."
        copy={
          <>
            Book a free call to plan the content your buyers are searching for:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              we’ll talk through the pages and topics that matter most for your business.
            </strong>
          </>
        }
        primaryLabel="Book a content call"
        primaryHref="/contact"
        secondary={{ label: "See our workflow", href: "#workflow", arrow: "↗" }}
      />
    </>
  );
}
