"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./sld-page.css";

/* -------- icons (shared across sections) -------- */

const STAR_FILLED_PATH = "M12 2l3 6 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.1 20.6l1.1-6.5L2.5 8.9 9 8z";

const ICON_STAR_FILLED = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d={STAR_FILLED_PATH} fill="currentColor" />
  </svg>
);
const ICON_STAR_OUTLINE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.4 5 5.6.7-4 4 1 5.6L12 20.6 6 23.3l1-5.6-4-4 5.6-.7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR_LINE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d={STAR_FILLED_PATH} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TICK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_MEGAPHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l14-6v14L3 13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BUILDING = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TINY = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" />
  </svg>
);
const ICON_HALF = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
  </svg>
);
const ICON_HALF_RIGHT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 3v18" stroke="currentColor" strokeWidth="2" />
    <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
  </svg>
);
const ICON_SQUARE_WIDE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="7" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="12" y="7" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_APP = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
    <rect x="9" y="6" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LAYOUTS = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="6" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);
const ICON_SCALE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M4 20h16M4 10l4-4 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M7 7h.01M3 5a2 2 0 0 1 2-2h5l9 9-7 7-9-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero: scrambled gradient word ("after.") -------- */

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

/* -------- hero signature: logo stress-test card -------- */

const TESTS: { cls: string; label: string; icon: ReactNode }[] = [
  { cls: "c1", label: "Favicon", icon: ICON_STAR_FILLED },
  { cls: "c2", label: "App icon", icon: ICON_STAR_FILLED },
  { cls: "c3", label: "Dark", icon: ICON_STAR_FILLED },
  { cls: "c4", label: "Light", icon: ICON_STAR_FILLED },
  { cls: "c5", label: "One color", icon: ICON_STAR_OUTLINE },
];

function StressTestCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the mark and all five tiles are shown in their end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="One logo mark tested across sizes and backgrounds"
      className={`sld-card${run ? " run" : ""}`}
      live="Logo stress test"
      corner="ONE MARK, EVERY SIZE"
      footLeft="Clear at every size"
      footRight="tested before you see it →"
    >
      <div className="sld-main">
        <div className="sld-mark">{ICON_STAR_FILLED}</div>
        <div className="sld-tests">
          {TESTS.map((t) => (
            <div className={`sld-lgt ${t.cls}`} key={t.label}>
              <div className="box">{t.icon}</div>
              <small>{t.label}</small>
            </div>
          ))}
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark) -------- */

const GLANCE = ["Must look credible early", "Works at tiny sizes", "Fits digital-first products", "Flexible as you grow", "Simple enough to remember"];

/* -------- stages (3) -------- */

const STAGES: { kicker: string; icon: ReactNode; title: string; sub: string; text: string; items: string[]; mid?: boolean }[] = [
  {
    kicker: "Pre-launch",
    icon: ICON_BOLT,
    title: "Idea and MVP stage",
    sub: "Launch essentials",
    text: "A clean, credible mark for your landing page, waitlist, and first deck.",
    items: ["Primary logo and icon", "Basic colors and font", "Social profile images"],
  },
  {
    kicker: "Fundraising",
    icon: ICON_DOLLAR,
    title: "Seed and early growth",
    sub: "Investor ready",
    text: "A logo that holds up in front of investors, partners, and press.",
    items: ["Full logo suite", "Pitch deck ready files", "Simple usage rules"],
    mid: true,
  },
  {
    kicker: "Scaling",
    icon: ICON_CHART,
    title: "Rebrand or refresh",
    sub: "Next chapter",
    text: "An updated logo that matches where the company is heading.",
    items: ["Refresh or new direction", "Transition plan", "Expanded brand assets"],
  },
];

/* -------- touchpoints (4) -------- */

const TOUCHPOINTS: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_PHONE, title: "Product", items: ["App icon", "Favicon and browser tab", "Login and loading screens"] },
  { icon: ICON_DOLLAR, title: "Investors", items: ["Pitch deck", "One-pager", "Data room"] },
  { icon: ICON_MEGAPHONE, title: "Marketing", items: ["Website header", "Social profiles", "Ads and emails"] },
  { icon: ICON_BUILDING, title: "Real world", items: ["Swag and stickers", "Event banners", "Office signage"] },
];

/* -------- stress test (5) -------- */

const STRESS: { icon: ReactNode; k: string; title: string; text: string }[] = [
  { icon: ICON_TINY, k: "Tiny sizes", title: "Favicon and app icon", text: "Still clear and recognizable when very small." },
  { icon: ICON_HALF, k: "One color", title: "Black, white, and single-color", text: "Works without color for print and embossing." },
  { icon: ICON_HALF_RIGHT, k: "Dark and light", title: "Different backgrounds", text: "Readable on dark mode and light layouts." },
  { icon: ICON_SQUARE_WIDE, k: "Square and wide", title: "Different layouts", text: "Works in square icons and wide headers." },
  { icon: ICON_IMAGE, k: "Real context", title: "Mockups", text: "Shown in your app, deck, and website before approval." },
];

/* -------- brief (6) -------- */

const BRIEF: { q: string; text: string }[] = [
  { q: "Who are your first customers?", text: "The people the logo needs to connect with first." },
  { q: "What should people feel?", text: "Trustworthy, bold, friendly, technical, or something else." },
  { q: "Who are your competitors?", text: "So your logo stands apart from them." },
  { q: "Where will it appear most?", text: "App, website, deck, packaging, or physical spaces." },
  { q: "Any names or domains still changing?", text: "So the logo fits your final name." },
  { q: "What do you dislike?", text: "Styles, colors, or symbols to avoid." },
];

/* -------- process (5) -------- */

const STEPS: { no: string; title: string; text: string; out: string }[] = [
  { no: "1", title: "Discovery", text: "Brief call, competitor scan, and brand direction.", out: "Approved creative direction" },
  { no: "2", title: "Concepts", text: "A few distinct logo concepts shown in real mockups.", out: "Concept presentation" },
  { no: "3", title: "Refine", text: "Your chosen direction refined through revision rounds.", out: "Refined logo" },
  { no: "4", title: "Stress test", text: "Final logo tested at all sizes and backgrounds.", out: "Tested logo suite" },
  { no: "5", title: "Handoff", text: "All files, a mini guide, and full ownership.", out: "Final logo package" },
];

/* -------- concept presentation (4) -------- */

const PRESENT: { when: string; title: string; text: string }[] = [
  { when: "First", title: "The idea", text: "The thinking behind each concept, in plain language." },
  { when: "Then", title: "The mark", text: "Logo shown on its own in color and one color." },
  { when: "Next", title: "In context", text: "Mockups on your app icon, website, and pitch deck." },
  { when: "Finally", title: "Your feedback", text: "A clear way to choose and request changes." },
];

/* -------- files (5) -------- */

const FILES: { icon: ReactNode; type: string; use: string; fmt: string }[] = [
  { icon: ICON_STAR_LINE, type: "Vector files", use: "Print, signage, and resizing without blur", fmt: "SVG, AI, EPS, PDF" },
  { icon: ICON_IMAGE, type: "Web files", use: "Websites, social, and email", fmt: "PNG, WebP" },
  { icon: ICON_APP, type: "App and favicon", use: "App stores and browser tabs", fmt: "ICO, PNG icon sizes" },
  { icon: ICON_HALF, type: "Color versions", use: "Different backgrounds", fmt: "Full color, one color, black, white" },
  { icon: ICON_LAYOUTS, type: "Layout versions", use: "Different spaces", fmt: "Primary, horizontal, stacked, icon" },
];

/* -------- qualities (8) -------- */

const QUALITIES: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_TARGET, title: "Simple", text: "Easy to recognize at a glance." },
  { icon: ICON_STAR_LINE, title: "Distinct", text: "Doesn’t look like competitors." },
  { icon: ICON_SCALE, title: "Scalable", text: "Works from favicon to banner." },
  { icon: ICON_CLOCK, title: "Timeless", text: "Avoids trends that will date quickly." },
  { icon: ICON_TAG, title: "Flexible", text: "Fits product, marketing, and print." },
  { icon: ICON_PERSON, title: "On-brand", text: "Matches your tone and audience." },
  { icon: ICON_APP, title: "Icon-ready", text: "Shaped to work as an app icon." },
  { icon: ICON_SHIELD, title: "Credible", text: "Looks established from day one." },
];

/* -------- mistakes (6) -------- */

const MISTAKES: { prob: string; fix: string }[] = [
  { prob: "Too detailed to read when small", fix: "Simplified mark tested at icon sizes." },
  { prob: "Copying a famous tech logo style", fix: "A distinct direction based on your positioning." },
  { prob: "Only one file type", fix: "A full suite of formats and versions." },
  { prob: "Picked before the name is final", fix: "Name confirmed before final design." },
  { prob: "Trend-heavy design", fix: "Timeless choices with room to evolve." },
  { prob: "No rules for using it", fix: "A mini guide for spacing, sizes, and colors." },
];

/* -------- included (10) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_CHAT, text: "Discovery call and logo brief" },
  { icon: ICON_SEARCH, text: "Competitor and category scan" },
  { icon: ICON_BOLT, text: "Several distinct logo concepts" },
  { icon: ICON_IMAGE, text: "Concept mockups on real touchpoints" },
  { icon: ICON_REFRESH, text: "Revision rounds on your chosen direction" },
  { icon: ICON_LAYOUTS, text: "Primary, secondary, and icon versions" },
  { icon: ICON_APP, text: "App icon and favicon files" },
  { icon: ICON_HALF, text: "Full color, one color, black, and white" },
  { icon: ICON_DOC, text: "Mini logo usage guide" },
  { icon: ICON_SHIELD_CHECK, text: "All source files and full ownership" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_BOLT, text: <><strong>Founders preparing to launch</strong> who need a credible first impression.</> },
  { icon: ICON_DOLLAR, text: <><strong>Startups getting ready to raise</strong> with a deck that needs to look sharp.</>, delay: 60 },
  { icon: ICON_APP, text: <><strong>Apps and SaaS products</strong> that need a strong icon.</>, delay: 120 },
  { icon: ICON_CHART, text: <><strong>Early companies outgrowing a DIY logo</strong> and ready to look established.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does startup logo design cost?", a: <>It depends on the number of concepts, versions, and extra brand assets. <strong>We share pricing on the free call.</strong></> },
  { q: "How long does it take?", a: <>It depends on how quickly feedback comes back between rounds. <strong>We share a clear timeline once the brief is complete.</strong></> },
  { q: "Do I own the logo?", a: <>Yes. You receive <strong>all source files and full ownership</strong> once the project is complete.</> },
  {
    q: "Can you help with a full brand identity too?",
    a: (
      <>
        Yes. Many startups add <a href="/branding-growth/logo-visual-identity"><strong>colors, fonts, and templates</strong></a> after the logo is final.
      </>
    ),
  },
  { q: "Do you check trademarks?", a: <>We design original work, but <strong>trademark searches should be done by a trademark attorney.</strong></> },
  {
    q: "How many concepts will I see?",
    a: <>A few distinct directions, each shown in real mockups: <strong>enough for a clear choice without overwhelming you.</strong></>,
  },
];

export default function StartupLogoDesignView() {
  return (
    <div className="sld-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Branding & Growth", href: "/branding-growth" }}
        className="sld-hero"
        line1="A logo that looks ready for launch"
        line2={
          <>
            day, and for what comes <ScrambleWord text="after." />
          </>
        }
        lead={
          <>
            Custom logo design for startups, built to work on your app icon, pitch deck, product,{" "}
            <strong>and everywhere your brand shows up first.</strong>
          </>
        }
        primary={{ label: "Start your startup logo", href: "/contact" }}
        secondary={{ label: "See the process ↓", href: "#process" }}
      >
        <StressTestCard />
      </ServiceDetailHero>

      <TrustBar items={["Built for small sizes first", "Tested on real touchpoints", "Every file format included", "Full ownership at handoff"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark sld-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why startup logos are different</span>
            <h2>Your logo often meets people before your product does.</h2>
          </Reveal>
          <Reveal className="sld-glance">
            <div className="gtxt">
              <p>Investors see it on a pitch deck. Early users see it as a tiny app icon or browser tab. Partners see it in an email signature.</p>
              <p>
                A startup logo has to look credible from day one, <strong>even before you have customers, press, or a big team.</strong>
              </p>
              <p>
                It also needs room to grow, so it <strong>still works when your product, market, or team changes.</strong>
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

      {/* STAGES */}
      <section className="band tint sld-sec" id="stages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Logos built for your stage</span>
            <h2>What you need depends on where your startup is today.</h2>
          </Reveal>
          <Reveal className="sld-sg3-grid">
            {STAGES.map((stage) => (
              <article className={`sld-sg3${stage.mid ? " mid" : ""}`} key={stage.kicker}>
                <span className="sgk">{stage.kicker}</span>
                <div className="sgi">{stage.icon}</div>
                <h3>{stage.title}</h3>
                <span className="sgsub">{stage.sub}</span>
                <p>{stage.text}</p>
                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>
                      <span className="lk">{ICON_TICK}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TOUCHPOINTS */}
      <section className="band sld-sec" id="touchpoints">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where your startup logo will live</span>
            <h2>We design with these real touchpoints in mind from the start.</h2>
          </Reveal>
          <Reveal className="sld-hubd" threshold={0.12}>
            <div className="sld-hubd-core">Your Startup Logo</div>
            <div className="sld-hubd-conn" aria-hidden="true">
              {"↓   ↓   ↓   ↓"}
            </div>
            <div className="sld-hubd-grid">
              {TOUCHPOINTS.map((card) => (
                <article className="sld-hc2" key={card.title}>
                  <div className="hci">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* STRESS TEST */}
      <section className="band tint sld-sec" id="stresstest">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The logo stress test</span>
            <h2>Every concept is tested before you see it as final.</h2>
          </Reveal>
          <Reveal className="sld-ss-list" threshold={0.12}>
            {STRESS.map((row) => (
              <article className="sld-ss" key={row.k}>
                <span className="sk">
                  <span className="ski">{row.icon}</span>
                  {row.k}
                </span>
                <div className="sdx">
                  <b>{row.title}</b>
                  <p>{row.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BRIEF */}
      <section className="band sld-sec" id="brief">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we ask in your logo brief</span>
            <h2>A short brief helps us design with purpose, not guesswork.</h2>
          </Reveal>
          <Reveal className="sld-q-grid">
            {BRIEF.map((item) => (
              <article className="sld-qc" key={item.q}>
                <span className="qi">?</span>
                <div>
                  <h3>{item.q}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="band tint sld-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How your startup logo comes together</span>
            <h2>A focused process with clear checkpoints.</h2>
          </Reveal>
          <Reveal className="sld-oc-list">
            {STEPS.map((step) => (
              <article className="sld-oc" key={step.no}>
                <span className="ocn">{step.no}</span>
                <div className="oct">
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
                <span className="oco">{step.out}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONCEPT PRESENTATION */}
      <section className="band sld-sec" id="present">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we present concepts</span>
            <h2>You see each idea in the places it will actually live.</h2>
          </Reveal>
          <Reveal className="sld-cp4" threshold={0.12}>
            {PRESENT.map((step) => (
              <div className="sld-cp4e" key={step.when}>
                <span className="wn">{step.when}</span>
                <span className="dot3"></span>
                <div className="box">
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FILES */}
      <section className="band tint sld-sec" id="files">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Files you’ll receive</span>
            <h2>Everything you need for digital, print, and your team.</h2>
          </Reveal>
          <Reveal className="sld-ft-tbl">
            <div className="sld-ft-row head">
              <div>File type</div>
              <div>What it’s for</div>
              <div>Formats</div>
            </div>
            {FILES.map((row) => (
              <div className="sld-ft-row" key={row.type}>
                <div>
                  <span className="fti">{row.icon}</span>
                  {row.type}
                </div>
                <div>{row.use}</div>
                <div className="fmt">{row.fmt}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* QUALITIES */}
      <section className="band sld-sec" id="qualities">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What makes a strong startup logo</span>
            <h2>Qualities we design toward on every project.</h2>
          </Reveal>
          <Reveal className="sld-st8-grid">
            {QUALITIES.map((item) => (
              <article className="sld-st8" key={item.title}>
                <span className="s8i">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
          <Reveal className="sld-onote">
            {ICON_WARN}
            <p>
              We design original logos and transfer full ownership to you.{" "}
              <b>Trademark searches and registration are legal matters, so we recommend checking your name and logo with a trademark attorney before launch.</b>
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="band tint sld-sec" id="mistakes">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common mistakes</span>
            <h2>Common startup logo mistakes.</h2>
          </Reveal>
          <Reveal className="sld-fix-tbl">
            <div className="sld-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {MISTAKES.map((row) => (
              <div className="sld-fix-row" key={row.fix}>
                <div className="prob">
                  <span className="xi">{ICON_X}</span>
                  {row.prob}
                </div>
                <div className="fix">
                  <span className="vi">{ICON_CHECK}</span>
                  {row.fix}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band sld-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From discovery call to full ownership.</h2>
          </Reveal>
          <Reveal className="sld-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="sld-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint sld-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Look ready for launch day.</h2>
          </Reveal>
          <div className="sld-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="sld-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every logo." />

      <CtaBand
        id="start"
        eyebrow="Startup Logo Design"
        heading="Look ready for launch day."
        copy={
          <>
            Book a free call to start your startup logo:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your startup, audience, and timeline.</strong>
          </>
        }
        primaryLabel="Start your startup logo"
        primaryHref="/contact"
        secondary={{ label: "See the process", href: "#process", arrow: "↗" }}
      />
    </div>
  );
}
