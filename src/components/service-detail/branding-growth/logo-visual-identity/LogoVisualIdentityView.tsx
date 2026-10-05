"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./lvi-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_X_HEAD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_EYE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_REPEAT = (
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
const ICON_LOGO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_STACK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="12" height="4" rx="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_RINGS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_DOTS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TYPE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 6h14M12 6v12M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_WAVES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 7c3 0 3 4 6 4s3-4 6-4 3 4 6 4M3 15c3 0 3 4 6 4s3-4 6-4 3 4 6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_GRID = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: identity system card -------- */

const VARIANTS: { cls: string; label: string }[] = [
  { cls: "c1", label: "full-colour" },
  { cls: "c2", label: "one-colour" },
  { cls: "c3", label: "reversed" },
  { cls: "c4", label: "icon" },
];
const PALETTE = ["#1e3a8a", "#2563eb", "#14b8a6", "#5eead4", "#0f172a"];
const FILES = ["AI", "EPS", "SVG", "PNG", "PDF"];

function IdentityCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the card is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample visual identity system"
      className={`lvi-card${run ? " run" : ""}`}
      live="Identity system"
      corner="100% CUSTOM"
      footLeft="Every file, every format"
      footRight="full copyright, yours →"
    >
      <div className="lvi-lock">
        <span className="mk">N</span>
        <span className="wm">
          Northform<small>Visual identity</small>
        </span>
      </div>
      <div className="lvi-vars">
        {VARIANTS.map((v) => (
          <span className={`lvi-iv ${v.cls}`} key={v.cls}>
            N<small>{v.label}</small>
          </span>
        ))}
      </div>
      <div className="lvi-row">
        <span className="rl">Palette</span>
        <div className="lvi-pal">
          {PALETTE.map((hex) => (
            <span key={hex} style={{ background: hex }}></span>
          ))}
        </div>
      </div>
      <div className="lvi-files">
        {FILES.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why: three tilt feature cards -------- */

const FEATURES: { icon: ReactNode; title: string; text: ReactNode; delay: number }[] = [
  {
    icon: ICON_EYE,
    title: "First impressions are visual",
    text: (
      <>
        Your logo, colours, and type <strong>set expectations before your offer does.</strong>
      </>
    ),
    delay: 0,
  },
  {
    icon: ICON_REPEAT,
    title: "Consistency builds recognition",
    text: (
      <>
        The same look across website, ads, and social <strong>makes you memorable.</strong>
      </>
    ),
    delay: 80,
  },
  {
    icon: ICON_DOLLAR,
    title: "Good design supports premium pricing",
    text: (
      <>
        Brands that look established <strong>can charge like they are.</strong>
      </>
    ),
    delay: 160,
  },
];

function FeatureGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div className="lvi-feat-grid" ref={tiltRef}>
      {FEATURES.map((card) => (
        <Reveal as="article" className="lvi-feat" key={card.title} data-tilt style={d(card.delay)}>
          <span className="lvi-feat-spot"></span>
          <div className="fi">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- just a logo vs a full system -------- */

const JUST_LOGO = [
  "One file, often only a PNG",
  "No rules on colours or fonts",
  "Breaks when resized or on dark backgrounds",
  "Every designer interprets it differently",
  "Social, website, and ads all look slightly different",
  "Brand drifts within 12 months",
];
const FULL_SYSTEM = [
  "Logo suite for every size and background",
  "Defined colour palette with HEX, RGB, CMYK",
  "Typography system for headings and body",
  "Patterns, icons, and graphic elements",
  "Ready-to-use templates for social and docs",
  "Consistent brand for years, not months",
];

/* -------- logo type table -------- */

const LOGO_TYPES: { name: string; what: string; best: string }[] = [
  { name: "Wordmark", what: "Your business name in custom lettering", best: "Short, distinctive names: SaaS, consumer brands" },
  { name: "Lettermark", what: "Initials only, stylized (monogram)", best: "Long names: professional services, law & finance" },
  { name: "Pictorial Mark", what: "A recognizable symbol or icon", best: "Established brands, app icons, strong visual concepts" },
  { name: "Abstract Mark", what: "A unique geometric shape, no literal meaning", best: "Tech, startups, global brands needing flexibility" },
  { name: "Combination Mark", what: "Symbol + wordmark (usable apart)", best: "Most startups & small businesses: the safest choice" },
  { name: "Emblem", what: "Name inside a badge, crest, or seal", best: "Restaurants, craft, schools, heritage businesses" },
  { name: "Mascot", what: "An illustrated character representing the brand", best: "Family brands, food, sports, community businesses" },
];

/* -------- eight building blocks -------- */

const BLOCKS: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_LOGO, title: "Primary Logo", text: "Main version for your website, signage, and documents." },
  { no: "02", icon: ICON_STACK, title: "Secondary Logo", text: "Stacked or horizontal layout for tight spaces." },
  { no: "03", icon: ICON_RINGS, title: "Logomark / Icon", text: "Standalone symbol for favicons, app icons, and avatars." },
  { no: "04", icon: ICON_DOTS, title: "Colour Palette", text: "Primary, secondary, and accent colours with exact codes." },
  { no: "05", icon: ICON_TYPE, title: "Typography", text: "Heading and body fonts with sizes and pairing rules." },
  { no: "06", icon: ICON_WAVES, title: "Graphic Elements", text: "Patterns, shapes, and textures that extend the brand." },
  { no: "07", icon: ICON_GRID, title: "Iconography", text: "A matching icon style for your website and decks." },
  { no: "08", icon: ICON_WINDOW, title: "Brand Templates", text: "Social posts, business cards, letterhead, and slides." },
];

/* -------- what we don't do (dark) -------- */

const DONTS: { title: string; text: ReactNode; delay: number }[] = [
  {
    title: "Use templates or stock icons",
    text: (
      <>
        Every mark is <strong>drawn from scratch</strong> for your business, never a marketplace template on your name.
      </>
    ),
    delay: 0,
  },
  {
    title: "Generate your logo with AI and call it done",
    text: (
      <>
        AI can explore ideas, but final marks are <strong>designed by humans</strong> so you can own and trademark them.
      </>
    ),
    delay: 60,
  },
  {
    title: "Skip strategy",
    text: (
      <>
        Designing before understanding your audience and competitors is <strong>just guessing.</strong>
      </>
    ),
    delay: 0,
  },
  {
    title: "Hold your files hostage",
    text: (
      <>
        Every source file and <strong>full copyright are yours at handoff</strong>, no “pay more to unlock the vectors.”
      </>
    ),
    delay: 60,
  },
];

/* -------- what's included (explorer) -------- */

type Deliverable = { key: string; btnName: string; btnSub: string; name: string; tag: string; items: string[] };

const DELIVERABLES: Deliverable[] = [
  {
    key: "discovery",
    btnName: "Discovery & strategy",
    btnSub: "Before design",
    name: "Brand Discovery & Strategy",
    tag: "We understand your business, audience, and market before drawing a single mark.",
    items: [
      "Discovery workshop (60–90 minutes)",
      "Audience & customer persona review",
      "Competitor visual audit",
      "Brand personality & positioning keywords",
      "Moodboard & visual direction",
    ],
  },
  {
    key: "logo",
    btnName: "Logo design",
    btnSub: "2–3 concepts",
    name: "Logo Design",
    tag: "2–3 unique concepts in real mockups, refined into a full logo suite.",
    items: [
      "2–3 unique logo concepts",
      "Rounds of revisions on your chosen direction",
      "Primary, secondary, and icon versions",
      "Full-colour, one-colour, black & white variations",
      "Tested at favicon size and signage size",
    ],
  },
  {
    key: "color",
    btnName: "Colour & typography",
    btnSub: "With codes",
    name: "Colour & Typography System",
    tag: "A palette and type system with exact codes, and accessibility built in.",
    items: [
      "Primary, secondary, and accent palette",
      "HEX, RGB, CMYK, and Pantone codes",
      "Accessibility contrast check (WCAG)",
      "Heading & body fonts with licensing notes",
      "Type hierarchy for web and print",
    ],
  },
  {
    key: "assets",
    btnName: "Brand assets & graphics",
    btnSub: "Patterns & icons",
    name: "Brand Assets & Graphics",
    tag: "The supporting elements that extend your logo into a full look.",
    items: ["Custom patterns and graphic elements", "Icon style set", "Photography & image style direction", "Social profile and cover images"],
  },
  {
    key: "templates",
    btnName: "Brand templates",
    btnSub: "Ready to use",
    name: "Brand Templates",
    tag: "Ready-to-use templates so every future piece stays on-brand.",
    items: ["Business cards and email signature", "Letterhead and document templates", "Social post templates (Canva or Figma)", "Presentation slide template"],
  },
  {
    key: "guide",
    btnName: "Mini brand guide",
    btnSub: "The rulebook",
    name: "Mini Brand Guide",
    tag: "The rulebook that keeps everything consistent, whoever makes the next piece.",
    items: [
      "Logo usage rules (spacing, min size, do’s & don’ts)",
      "Colour and typography rules",
      "Real examples of the brand in use",
      "Shareable PDF for any partner or printer",
    ],
  },
  {
    key: "files",
    btnName: "File handoff",
    btnSub: "Every format + copyright",
    name: "File Handoff",
    tag: "Everything organized, every format, and full copyright, yours forever.",
    items: [
      "Vector source files (AI, EPS, SVG, PDF)",
      "Web-ready files (PNG, JPG, WebP, favicon)",
      "Organized brand folder (Google Drive / Dropbox)",
      "Full copyright transfer",
    ],
  },
];

function DeliverablesExplorer() {
  // the design's script initialises on a key that does not exist ("audit"); start on the
  // button it marks aria-selected instead, which is the first one ("discovery")
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
    <Reveal className="lvi-wb-wrap" id="included-int">
      <div className="lvi-wb-list" role="tablist" aria-label="What's included">
        {DELIVERABLES.map((a, i) => (
          <button
            key={a.key}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="lvi-wb-btn"
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
      <div className="lvi-wb-panel">
        <div className="lvi-wp-top">
          {/* the design renders the same logo mark for every deliverable */}
          <span className="big">{ICON_LOGO}</span>
          <div>
            <h3>{item.name}</h3>
            <div className="tagline">{item.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="lvi-wp-body lvi-wp-fade" key={item.key}>
          <span className="k">What’s inside</span>
          <div className="lvi-wp-list">
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
  { icon: ICON_ROCKET, text: <><strong>Startups before launch</strong> who want to look credible to customers and investors from day one.</>, delay: 0 },
  { icon: ICON_LOGO, text: <><strong>Small businesses with a DIY logo</strong> that no longer matches the quality of their work.</>, delay: 60 },
  { icon: ICON_BARS, text: <><strong>Growing brands</strong> whose website, social, and sales materials all look different.</>, delay: 120 },
  { icon: ICON_SHIELD, text: <><strong>Founders building a new product line</strong> that needs its own look under the parent brand.</>, delay: 180 },
];

const STEPS = [
  { no: "Week 1", title: "Discovery & direction", text: "Discovery workshop, competitor audit, and moodboard. We agree on the visual direction before any logo is drawn.", delay: 0 },
  { no: "Weeks 2–3", title: "Concepts & revisions", text: "2–3 distinct concepts in real mockups. Pick one, and we refine it through revision rounds.", delay: 80 },
  { no: "Week 4", title: "Identity system", text: "Colours, typography, graphic elements, and templates built around the final logo.", delay: 160 },
  { no: "Week 5", title: "Guide & handoff", text: "Mini brand guide delivered with every file format in one shared folder. Copyright transferred.", delay: 240 },
];

const FAQS = [
  { q: "How much does it cost?", a: <>Depends on scope: a logo suite alone costs less than a full identity system with templates and a brand guide. <strong>We share exact pricing on the discovery call</strong> once we understand what you need.</> },
  { q: "How long does it take?", a: <>A logo suite typically takes 2–3 weeks; a full visual identity system 3–5 weeks. <strong>Timelines depend mostly on how quickly feedback comes back</strong> between rounds.</> },
  { q: "Do I own the logo and all the files?", a: <>Yes, 100%: every source file and full copyright at handoff, so you can <strong>trademark the logo and use it anywhere</strong> without restrictions.</> },
  { q: "What if I don’t like any of the concepts?", a: <>Rare, because we agree on direction before designing. But if it happens, we revisit the brief and create new concepts. <strong>We don’t move forward until you’re confident in the direction.</strong></> },
  { q: "Can you refresh my existing logo instead?", a: <>Yes. If your current logo has recognition worth keeping, we can modernize it and build a proper identity system around it. <strong>We’ll recommend refresh vs rebuild on the discovery call.</strong></> },
  { q: "Do you use AI to design the logo?", a: <>AI can help explore directions early, but every <strong>final mark is designed by a human.</strong> That’s what makes it ownable and trademark-able. You’re not buying a prompt output.</> },
];

/* -------- page -------- */

export default function LogoVisualIdentityView() {
  return (
    <div className="lvi-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Branding & Growth", href: "/branding-growth" }}
        line1="Look like the leader"
        line2={
          <>
            in your space, <span className="grad-text">day one.</span>
          </>
        }
        lead={
          <>
            Custom logo design and complete visual identity systems for startups, small businesses, and growing brands.{" "}
            <strong>Strategy-first, designed by real designers, delivered with every file format you’ll ever need</strong>, and
            full copyright ownership from the moment you sign off.
          </>
        }
        primary={{ label: "Start your brand identity", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <IdentityCard />
      </ServiceDetailHero>

      <TrustBar items={["100% custom (no templates)", "Strategy before design", "All source files included", "Full copyright ownership"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why your visual identity matters</span>
            <h2>Buyers judge your business in seconds, usually before a single word.</h2>
            <p>A sharp, consistent identity signals you’re established, trustworthy, and worth the price. A generic or inconsistent one quietly costs you deals.</p>
          </Reveal>
          <FeatureGrid />
          <Reveal as="p" className="lvi-vs-note lvi-why-note">
            A logo is a signature. A visual identity is the whole handwriting. <strong>Buyers remember the handwriting.</strong>
          </Reveal>
        </div>
      </section>

      {/* JUST A LOGO VS SYSTEM */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Just a logo vs a full visual identity</span>
            <h2>Most businesses buy a logo and stop there.</h2>
            <p>
              Then every new flyer, ad, and web page gets designed from scratch, and the brand slowly drifts. Here’s the difference. Every
              project we deliver is a system, not a single file.
            </p>
          </Reveal>
          <div className="lvi-vs2">
            <Reveal className="lvi-vscol wrong">
              <div className="vh">
                <span className="vi">{ICON_X_HEAD}</span>
                <h3>Just a logo</h3>
              </div>
              <ul>
                {JUST_LOGO.map((li) => (
                  <li key={li}>
                    <span className="m">{ICON_X}</span>
                    {li}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="lvi-vscol right" style={d(90)}>
              <div className="vh">
                <span className="vi">{ICON_CHECK_HEAD}</span>
                <h3>A full visual identity system</h3>
              </div>
              <ul>
                {FULL_SYSTEM.map((li) => (
                  <li key={li}>
                    <span className="m">{ICON_CHECK}</span>
                    {li}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="lvi-vs-note">
            Every project we deliver is a <strong>system, not a single file.</strong>
          </Reveal>
        </div>
      </section>

      {/* 7 LOGO TYPES */}
      <section className="band tint" id="types">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The 7 logo types (and which fits you)</span>
            <h2>There’s no single “best” logo style.</h2>
            <p>The right type depends on your name, your industry, and where the logo lives most often. We recommend one based on strategy, not trends.</p>
          </Reveal>
          <Reveal className="lvi-lt-tbl">
            <div className="lvi-lt-row head">
              <div>Logo type</div>
              <div>What it is</div>
              <div className="lc3">Best for</div>
            </div>
            {LOGO_TYPES.map((t) => (
              <div className="lvi-lt-row" key={t.name}>
                <div className="ln">{t.name}</div>
                <div>{t.what}</div>
                <div className="lc3">{t.best}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="lvi-lt-note">
            Not sure which fits your name and market? <strong>We’ll recommend one on the discovery call.</strong>
          </Reveal>
        </div>
      </section>

      {/* 8 BUILDING BLOCKS */}
      <section className="band" id="blocks">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What your identity system contains</span>
            <h2>Eight building blocks make a complete identity.</h2>
            <p>Together, they make your brand look the same everywhere, whoever designs the next piece.</p>
          </Reveal>
          <Reveal className="lvi-blk-grid">
            {BLOCKS.map((b) => (
              <article className="lvi-blk" key={b.no}>
                <span className="bn">{b.no}</span>
                <div className="bi">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DON'T DO (dark) */}
      <section className="band dark" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t do</span>
            <h2>Cheap logo shops cut corners that cost you later.</h2>
            <p>We don’t.</p>
          </Reveal>
          <div className="lvi-dont-grid">
            {DONTS.map((item) => (
              <Reveal className="lvi-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{ICON_X_HEAD}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lvi-dont-note">
            <span className="mk">{ICON_CHECK_HEAD}</span>
            <p>
              Custom, human-designed, strategy-first, and <strong>100% owned by you.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Discovery to handoff: the full system.</h2>
            <p>Seven parts, one team: strategy, logo, colour & type, assets, templates, guide, and files. Pick one to see inside.</p>
          </Reveal>
          <DeliverablesExplorer />
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>Best right before more people see you.</h2>
            <p>A launch, a raise, a rebrand, or a new market: that’s when identity work pays off most.</p>
          </Reveal>
          <div className="lvi-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="lvi-who" key={i} style={d(item.delay)}>
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
            <h2>A focused 3–5 week process.</h2>
            <p>You approve every stage before we move on.</p>
          </Reveal>
          <div className="lvi-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="lvi-step" key={step.title} style={d(step.delay)}>
                <span className="lvi-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every project." />

      <CtaBand
        id="start"
        eyebrow="Logo & Visual Identity"
        heading="Book a free discovery call, no obligation."
        copy={
          <>
            Tell us about your business and where the brand needs to show up. We’ll come back with a clear scope, timeline, and next steps,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              usually within 48 hours. If a refresh makes more sense than a new identity, we’ll say so.
            </strong>
          </>
        }
        primaryLabel="Start your brand identity"
        primaryHref="/start-project"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
      />
    </div>
  );
}
