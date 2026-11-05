"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./iga-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_REEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m11 10 3 2-3 2z" fill="currentColor" />
  </svg>
);
const ICON_STORY = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M9 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CAROUSEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M18 8v8M21 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CREATOR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m16 4 2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_COLLECTION = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="16" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="10" y="16" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="17" y="16" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_CAPTIONS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CIRCLE_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="m8 12 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PLACEMENTS = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="18" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_COPY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_INSTAGRAM = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TROPHY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 4v7a6 6 0 0 0 12 0V4M9 20h6M12 17v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: Reels ad preview (phone mock) -------- */

function ReelsPreviewCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: hook, caption and CTA are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A Reels ad shown in a phone mockup"
      className={`iga-ig${run ? " run" : ""}`}
      live="Reels ad preview"
      corner="VERTICAL · NATIVE"
      footLeft="Hook, captions, one CTA"
      footRight="made for each placement →"
    >
      <div className="iga-ig-stage">
        <div className="iga-ig-phone">
          <div className="iga-ig-screen">
            <div className="iga-ig-sp head">
              <span className="av"></span>
              <small>yourbrand</small>
              <span className="spon">Sponsored</span>
            </div>
            <div className="iga-ig-sp iga-ig-hook">
              <b>Stop scrolling. This changes everything</b>
            </div>
            <div className="iga-ig-side">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="iga-ig-sp iga-ig-cap">Captions on · built for sound-off</div>
            <div className="iga-ig-sp iga-ig-cta2">Shop now</div>
          </div>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why: at a glance (5 checks) -------- */

const GLANCE = [
  "Vertical, mobile-first creative",
  "Strong hook in the first moments",
  "Native-looking content",
  "Placement-specific design",
  "Creators and real customers",
];

/* -------- placements table (5 rows) -------- */

const PLACEMENTS: { name: string; format: string; best: string; tip: string }[] = [
  { name: "Reels", format: "Full-screen vertical video", best: "Discovery and reach", tip: "Hook fast, add captions" },
  { name: "Stories", format: "Full-screen, short and vertical", best: "Offers and quick actions", tip: "Clear call to action" },
  { name: "Feed", format: "Square or vertical posts", best: "Product and brand ads", tip: "Strong single message" },
  { name: "Explore", format: "Content in the Explore grid", best: "Reaching new audiences", tip: "Eye-catching visuals" },
  { name: "Profile feed", format: "Ads in profile browsing", best: "Extra reach to engaged users", tip: "Match your page style" },
];

/* -------- formats (6 tilt cards) -------- */

const FORMATS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_REEL, title: "Reels ads", text: "Short, vertical videos that play in the Reels feed." },
  { icon: ICON_STORY, title: "Story ads", text: "Full-screen ads between Stories with a swipe or tap action." },
  { icon: ICON_CAROUSEL, title: "Carousel ads", text: "Several images or videos in one swipeable post." },
  { icon: ICON_CREATOR, title: "Partnership ads", text: "Ads run through a creator’s handle with their permission." },
  { icon: ICON_COLLECTION, title: "Collection ads", text: "A main image or video with products below it." },
  { icon: ICON_CHAT, title: "Message ads", text: "Start a DM conversation directly from the ad." },
];

function FormatGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="iga-ft-grid">
        {FORMATS.map((card) => (
          <article className="iga-ft" key={card.title} data-tilt>
            <span className="iga-ft-spot"></span>
            <div className="fti">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- Reels anatomy (6) -------- */

const ANATOMY: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_BOLT, title: "Opening hook", text: "A question, bold visual, or surprising moment right away." },
  { icon: ICON_PERSON, title: "Real person or product", text: "Faces and products in action, not just text." },
  { icon: ICON_STAR, title: "Clear benefit", text: "What the viewer gets, shown simply." },
  { icon: ICON_CAPTIONS, title: "On-screen captions", text: "Easy to follow with the sound off." },
  { icon: ICON_PEN, title: "Native editing", text: "Feels like Instagram content, not a TV ad." },
  { icon: ICON_CIRCLE_CHECK, title: "One call to action", text: "A single clear next step at the end." },
];

/* -------- creators (4 steps) -------- */

const CREATOR_STEPS: { no: string; title: string; text: string; outcome: string }[] = [
  { no: "1", title: "Choose the right creators", text: "Creators whose audience matches your buyers.", outcome: "Creator shortlist" },
  { no: "2", title: "Brief the content", text: "Clear guidance on product, message, and must-haves.", outcome: "Creator briefs" },
  { no: "3", title: "Get permissions", text: "Creators grant access for partnership ads.", outcome: "Approved partnership access" },
  { no: "4", title: "Run and test", text: "Creator content runs as ads alongside brand creative.", outcome: "Performance comparison" },
];

/* -------- problem / fix table (6 rows) -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Horizontal videos cut off", fix: "Creative resized and designed for each placement." },
  { prob: "Slow, unclear openings", fix: "Hooks placed right at the start." },
  { prob: "No captions", fix: "Captions added for sound-off viewing." },
  { prob: "Ads that look too polished", fix: "More native, creator-style content." },
  { prob: "Running only on Feed", fix: "Placements expanded to Reels and Stories." },
  { prob: "No link to sales or leads", fix: "Pixel, Conversions API, and goals set up." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_SEARCH, text: <><a href="/digital-marketing/meta-ads-audit">Instagram account and ads review</a></> },
  { icon: ICON_PLACEMENTS, text: "Placement and format plan" },
  { icon: ICON_REEL, text: "Reels, Stories, and Feed creative briefs" },
  { icon: ICON_COPY, text: "Ad copy and captions" },
  { icon: ICON_CREATOR, text: "Creator partnership ads setup (when included)" },
  { icon: ICON_GRID, text: "Campaign setup and audience strategy" },
  { icon: ICON_WINDOW, text: "Pixel and Conversions API check" },
  { icon: ICON_BOLT, text: "Creative testing and refresh" },
  { icon: ICON_TREND, text: "Monthly reporting on reach, engagement, and conversions" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_INSTAGRAM, text: <><strong>Lifestyle, beauty, and fashion brands</strong> with visual products.</>, delay: 0 },
  { icon: ICON_TROPHY, text: <><strong>Food, fitness, and wellness businesses</strong> reaching younger audiences.</>, delay: 60 },
  { icon: ICON_BAG, text: <><strong>DTC brands</strong> working with creators and influencers.</>, delay: 120 },
  {
    icon: ICON_STAR,
    text: (
      <>
        <strong>
          Businesses with <a href="/digital-marketing/social-media-management">strong organic Instagram</a>
        </strong>{" "}
        ready to add paid reach.
      </>
    ),
    delay: 180,
  },
];

/* -------- faq -------- */

const FAQS = [
  {
    q: "How much does Instagram ads management cost?",
    a: <>It depends on ad spend, creative needs, and number of campaigns. <strong>Ad spend is paid directly to Meta.</strong> We share pricing on the free call.</>,
  },
  {
    q: "Are Instagram ads managed separately from Facebook ads?",
    a: (
      <>
        They run through{" "}
        <a className="iga-faq-link" href="/digital-marketing/meta-ads">Meta Ads Manager</a>. <strong>We can run Instagram-only campaigns or combine placements,</strong> depending on your goals.
      </>
    ),
  },
  { q: "Do I need video for Instagram ads?", a: <>Video often helps, especially for Reels and Stories, <strong>but strong images can work too.</strong></> },
  {
    q: "What are partnership ads?",
    a: <>Ads that run through a creator’s account with their permission, <strong>so they appear from the creator rather than only from your brand.</strong></>,
  },
  { q: "Can you guarantee followers or sales?", a: <>No. Results depend on your product, creative, and audience. <strong>We focus on creative quality, testing, and tracking.</strong></> },
  {
    q: "Do you create the Reels and Stories?",
    a: <>We write briefs and copy, and can produce simple edits, <strong>or work with your creators and existing footage</strong> to build placement-ready creative.</>,
  },
];

/* -------- page -------- */

export default function InstagramAdsView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Meta Ads", href: "/digital-marketing/meta-ads" }}
        line1="Instagram ads that feel native,"
        line2={
          <>
            look great, and get <span className="grad-text">results.</span>
          </>
        }
        lead={
          <>
            Reels, Stories, Feed, and Explore ads built for mobile, <strong>with creative that fits the way people actually use Instagram.</strong>
          </>
        }
        primary={{ label: "Book an Instagram ads call", href: "/contact" }}
        secondary={{ label: "See placements ↓", href: "#placements" }}
      >
        <ReelsPreviewCard />
      </ServiceDetailHero>

      <TrustBar items={["Creative made for each placement", "Reels-first video approach", "Creator partnership ads", "Tracked to real results"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark iga-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Visual-first platform</span>
            <h2>Instagram is a visual-first platform.</h2>
            <p>Ads that look like ads get scrolled past.</p>
          </Reveal>
          <Reveal className="iga-glance">
            <div className="gtxt">
              <p>
                On Instagram, people move fast and <strong>judge content in a moment.</strong>
              </p>
              <p>Ads that blend in with what people already enjoy watching tend to hold attention better.</p>
              <p>
                That means <strong>vertical video, strong first frames, real faces,</strong> and creative designed for each placement.
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

      {/* PLACEMENTS */}
      <section className="band tint iga-sec" id="placements">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Ad placements</span>
            <h2>Instagram ad placements.</h2>
            <p>Each placement has its own format and best use.</p>
          </Reveal>
          <Reveal className="iga-pl-tbl">
            <div className="iga-pl-row head">
              <div>Placement</div>
              <div>Format</div>
              <div>Best for</div>
              <div>Creative tip</div>
            </div>
            {PLACEMENTS.map((row) => (
              <div className="iga-pl-row" key={row.name}>
                <div>{row.name}</div>
                <div>{row.format}</div>
                <div>{row.best}</div>
                <div className="tip">{row.tip}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FORMATS */}
      <section className="band iga-sec" id="formats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Ad formats</span>
            <h2>Instagram ad formats.</h2>
            <p>We choose formats based on your goal and product.</p>
          </Reveal>
          <FormatGrid />
        </div>
      </section>

      {/* REELS ANATOMY */}
      <section className="band tint iga-sec" id="reels">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Reels anatomy</span>
            <h2>Anatomy of a strong Reels ad.</h2>
            <p>Every Reels ad we plan is built around these parts.</p>
          </Reveal>
          <Reveal className="iga-fa-grid">
            {ANATOMY.map((card) => (
              <article className="iga-fa" key={card.title}>
                <div className="fai">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CREATORS */}
      <section className="band iga-sec" id="creators">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Working with creators</span>
            <h2>Creator content often feels more natural than brand-made ads.</h2>
          </Reveal>
          <Reveal className="iga-oc-list">
            {CREATOR_STEPS.map((step) => (
              <article className="iga-oc" key={step.no}>
                <span className="ocn">{step.no}</span>
                <div className="oct">
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
                <span className="oco">{step.outcome}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="band tint iga-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common Instagram ads problems.</h2>
          </Reveal>
          <Reveal className="iga-fix-tbl">
            <div className="iga-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {FIXES.map((row) => (
              <div className="iga-fix-row" key={row.prob}>
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
      <section className="band iga-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From account review to reach, engagement &amp; conversion reporting.</h2>
          </Reveal>
          <Reveal className="iga-inc2-grid">
            {INCLUDED.map((item, i) => (
              <div className="iga-inc2" key={i}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint iga-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Make ads people actually stop for.</h2>
          </Reveal>
          <div className="iga-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="iga-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* the design keeps this FAQ on a plain band: the who section just above it is the tinted one */}
      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every campaign." />

      <CtaBand
        id="start"
        eyebrow="Instagram Ads"
        heading="Make ads people actually stop for."
        copy={
          <>
            Book a free call to plan your Instagram ads:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your creative and placements.</strong>
          </>
        }
        primaryLabel="Book an Instagram ads call"
        primaryHref="/contact"
        secondary={{ label: "See placements", href: "#placements", arrow: "↗" }}
      />
    </>
  );
}
