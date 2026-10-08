"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./lseo-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PIN_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PIN_YOU = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" fill="currentColor" />
    <circle cx="12" cy="9" r="2.5" fill="#fff" />
  </svg>
);
const ICON_PIN_OTHER = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" fill="currentColor" />
  </svg>
);
const ICON_GRID = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_MAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CARD = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PROFILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_NAME = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PHOTO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PHOTO_SIMPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_QUESTION = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_FORK_SHORT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 3v8a3 3 0 0 0 6 0V3M8 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* industries */
const ICON_HOME = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PLUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_FORK_KNIFE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 3v8a3 3 0 0 0 6 0V3M8 3v18M19 3c-2 0-3 3-3 6s1 4 3 4v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SCALES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M6 7l6-4 6 4M4 21h16M6 10v8M18 10v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TROPHY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 4v7a6 6 0 0 0 12 0V4M9 20h6M12 17v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_HOUSE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9M10 19v-5h4v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 11l1.5-4h11L19 11M5 11h14v6H5zM7 17v2M17 17v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 8h16l-1 12H5zM8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_BUILDING = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-5h4v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_HEART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: map-pack card -------- */

const PINS: { you?: boolean; style: CSSProperties }[] = [
  { you: true, style: { left: "38%", top: "62%" } },
  { style: { left: "66%", top: "40%" } },
  { style: { left: "80%", top: "72%" } },
];

const RESULTS: { rank: string; name: string; meta: ReactNode; cta: string; you?: boolean }[] = [
  { rank: "1", name: "Your Business", meta: <><span className="stars">★★★★★</span> 4.9 (212) · Open now</>, cta: "Call", you: true },
  { rank: "2", name: "Competitor A", meta: "★ 4.2 (41) · Closed", cta: "Website" },
  { rank: "3", name: "Competitor B", meta: "★ 3.8 (18) · Open", cta: "Directions" },
];

function MapPackCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: pins and results are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample local map pack result"
      className={`lseo-map${run ? " run" : ""}`}
      live="Map pack"
      corner="YOU RANK #1"
      footLeft="Nearby, well-reviewed, clear"
      footRight="you win the call →"
    >
      <div className="lseo-map-search">
        <span className="si">{ICON_SEARCH}</span>
        <span className="st">
          plumber near me<span className="cur"></span>
        </span>
      </div>
      <div className="lseo-map-canvas">
        {PINS.map((pin, i) => (
          <span className={`pin ${pin.you ? "you" : "o"}`} style={pin.style} key={i}>
            {pin.you ? ICON_PIN_YOU : ICON_PIN_OTHER}
          </span>
        ))}
      </div>
      <div className="lseo-map-results">
        {RESULTS.map((r) => (
          <div className={`lseo-mr${r.you ? " you" : ""}`} key={r.rank}>
            <span className="rk">{r.rank}</span>
            <span className="mn">
              <b>{r.name}</b>
              <small>{r.meta}</small>
            </span>
            <span className="cta">{r.cta}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (3 cards + dark quote) -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_PIN, title: "Local intent is high intent", text: <>Searches with “near me” or a city name usually come from <strong>buyers ready to act.</strong></> },
  { icon: ICON_GRID, title: "The map has its own rules", text: <>Map results are <strong>separate from regular organic SEO,</strong> so they need their own work.</> },
  { icon: ICON_STAR, title: "Reputation & distance count", text: <>Reviews, photos, and your location <strong>all affect where you appear.</strong></> },
];

/* -------- 3 surfaces -------- */

const SURFACES: { icon: ReactNode; title: string; text: ReactNode; want: string }[] = [
  { icon: ICON_MAP, title: "The Map Pack", text: "The short list of businesses shown on the map at the top of local search results.", want: "Who’s nearby, open, and well-reviewed." },
  { icon: ICON_CARD, title: "Google Business Profile", text: "Your profile card on Google Search and Maps: photos, hours, services, reviews, posts.", want: "Enough to decide whether to call or visit." },
  { icon: ICON_LINES, title: "Local Organic Results", text: "Normal website results that mention your service in your city or neighborhood.", want: "In-depth info, pricing, and trust signals." },
];

/* -------- 3 pillars -------- */

const PILLARS: { no: string; title: string; q: string; items: string[] }[] = [
  { no: "01", title: "Relevance", q: "How well your business matches the search.", items: ["Clear primary category", "Services and products listed", "Website pages aligned to each service"] },
  { no: "02", title: "Distance", q: "How close your business is to the searcher.", items: ["Accurate address and service area", "Consistent address across the web", "Location pages for each area you serve"] },
  { no: "03", title: "Prominence", q: "How well-known and trusted your business is.", items: ["Reviews on Google and other sites", "Mentions and links from local sites", "Press and community presence"] },
];

/* -------- audit checklist (6 groups) -------- */

const AUDIT: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_PROFILE, title: "Google Business Profile", items: ["Verified and claimed", "Primary and extra categories", "Services, hours, and photos", "Posts and Q&A"] },
  { icon: ICON_WINDOW, title: "Website", items: ["Local keywords on key pages", "Location and service pages", "Mobile and page speed", "LocalBusiness schema"] },
  { icon: ICON_LINES, title: "Citations & Listings", items: ["Consistent name, address, phone", "Top directories claimed", "Duplicates removed", "Industry-specific listings"] },
  { icon: ICON_STAR, title: "Reviews", items: ["Review profiles claimed", "How you request reviews", "How you respond to reviews", "Review themes tracked"] },
  { icon: ICON_DOC, title: "Local Content", items: ["Service-area pages", "Community and city content", "Case studies and FAQs", "Internal linking"] },
  { icon: ICON_SHIELD, title: "Reputation Signals", items: ["Press and mentions", "Local partnerships", "Awards and certifications", "Sponsorships and events"] },
];

/* -------- GBP essentials (8) -------- */

const GBP: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_NAME, title: "Business name", text: "Your real, trademark-safe name, not stuffed with keywords." },
  { icon: ICON_TARGET, title: "Primary category", text: "The most important setting, chosen on your main service." },
  { icon: ICON_LINES, title: "Services list", text: "Every service, written in buyer-friendly language." },
  { icon: ICON_PIN, title: "Service area", text: "Clear coverage area for service-area businesses." },
  { icon: ICON_PHOTO, title: "Photos & videos", text: "Fresh, real photos of your work, team, and location." },
  { icon: ICON_STAR, title: "Reviews & replies", text: "Regular reviews and thoughtful responses to each one." },
  { icon: ICON_CHAT, title: "Posts & updates", text: "Weekly posts about offers, events, or helpful tips." },
  { icon: ICON_QUESTION, title: "Q&A monitoring", text: "Common questions answered by you, not left to strangers." },
];

/* -------- multi-location table -------- */

const MULTILOC: { sit: string; app: string }[] = [
  { sit: "One office, service area only", app: "A single Google Business Profile with a defined service area, plus service-area website pages." },
  { sit: "Two to five locations", app: "A separate Google Business Profile per address, plus a dedicated website page for each location." },
  { sit: "Franchise or regional brand", app: "Consistent name, categories, and templates across every location, with local content for each." },
  { sit: "New location opening", app: "New profile created early, with address, categories, and local content in place before launch." },
];

/* -------- keyword patterns (6) -------- */

const KEYWORDS: { kind: string; icon: ReactNode; q: string }[] = [
  { kind: "Service + city", icon: ICON_SEARCH, q: "“emergency plumber Raleigh”" },
  { kind: "Service + neighborhood", icon: ICON_SEARCH, q: "“pediatric dentist North Hills”" },
  { kind: "“Near me”", icon: ICON_PIN_PLAIN, q: "“best coffee shop near me”" },
  { kind: "Service + “open now”", icon: ICON_CLOCK, q: "“auto repair open now”" },
  { kind: "Buyer intent + location", icon: ICON_DOLLAR, q: "“affordable movers Cary NC”" },
  { kind: "Compare + location", icon: ICON_STAR, q: "“best gyms in downtown Durham”" },
];

/* -------- industries (12) -------- */

const INDUSTRIES: { icon: ReactNode; name: string }[] = [
  { icon: ICON_HOME, name: "Home Services" },
  { icon: ICON_PLUS, name: "Healthcare & Dental" },
  { icon: ICON_FORK_KNIFE, name: "Restaurants & Food" },
  { icon: ICON_SCALES, name: "Legal" },
  { icon: ICON_TROPHY, name: "Fitness & Studios" },
  { icon: ICON_HOUSE, name: "Real Estate" },
  { icon: ICON_CAR, name: "Auto Services" },
  { icon: ICON_BAG, name: "Retail & Boutiques" },
  { icon: ICON_BRIEFCASE, name: "Professional Services" },
  { icon: ICON_BUILDING, name: "Trades & Contractors" },
  { icon: ICON_HEART, name: "Beauty & Wellness" },
  { icon: ICON_CAP, name: "Education & Tutoring" },
];

/* -------- included (10) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Local SEO audit of your current presence" },
  { icon: ICON_PROFILE, text: "Google Business Profile setup or optimization" },
  { icon: ICON_TARGET, text: "Services, categories, and attributes dialed in" },
  { icon: ICON_PHOTO_SIMPLE, text: "Photo and post schedule" },
  { icon: ICON_SEARCH, text: "Local keyword and city research" },
  { icon: ICON_PIN_PLAIN, text: "Location and service-area pages on your website" },
  { icon: ICON_CODE, text: "LocalBusiness and FAQ schema" },
  { icon: ICON_LINES, text: "Citations and directory listings" },
  { icon: ICON_STAR, text: "Review request and response support" },
  { icon: ICON_TREND, text: "Monthly reporting on map and local rankings" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_HOME, text: <><strong>Service businesses</strong> that travel to customers in a specific area.</> },
  { icon: ICON_PIN, text: <><strong>Clinics, offices, and studios</strong> where customers walk in from the neighborhood.</>, delay: 60 },
  { icon: ICON_FORK_SHORT, text: <><strong>Restaurants and retailers</strong> relying on nearby buyers and foot traffic.</>, delay: 120 },
  { icon: ICON_LINK, text: <><strong>Multi-location and franchise brands</strong> that need each location to rank in its own area.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does local SEO cost?", a: <>It depends on how many locations you have, how competitive your industry is, and whether your Google Business Profile needs setup or cleanup. <strong>We share pricing on the free call.</strong></> },
  { q: "How long before I see results?", a: <>Early changes on your Google Business Profile can show up quickly. <strong>Rankings in the map and organic results usually take time to build</strong> and depend on competition.</> },
  { q: "Can you guarantee a spot in the map pack?", a: <>No. Nobody can honestly guarantee specific rankings on Google. <strong>We focus on the signals Google uses to rank local results.</strong></> },
  { q: "Do I need a website for local SEO to work?", a: <>Yes. A website helps Google understand your business and gives buyers somewhere to learn more. <strong>If you don’t have one yet, <a href="/website-development/local-business-websites">our web team can help</a>.</strong></> },
  { q: "How is local SEO different from regular SEO?", a: <>Local SEO focuses on nearby searches, Google Business Profile, and the map results. Regular SEO focuses on broader organic rankings. <strong>Many businesses benefit from both.</strong></> },
  { q: "Do you handle reviews?", a: <>We help you <strong>set up review requests, track review themes, and respond thoughtfully.</strong> Reviews are one of the strongest local ranking and trust signals.</> },
];

export default function LocalSeoView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="Show up when nearby"
        line2={
          <>
            customers <span className="grad-text">search.</span>
          </>
        }
        lead={
          <>
            Local SEO for service businesses, retail, restaurants, clinics, and multi-location brands,{" "}
            <strong>built around Google Business Profile, local search, and your website.</strong>
          </>
        }
        primary={{ label: "Book a local SEO call", href: "/contact" }}
        secondary={{ label: "See the audit checklist ↓", href: "#audit" }}
      >
        <MapPackCard />
      </ServiceDetailHero>

      <TrustBar items={["Google Business Profile", "Map pack rankings", "Citations & reviews", "Location pages"]} />

      {/* WHY */}
      <section className="band tint lseo-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Local search is where buyers decide.</h2>
            <p>
              When someone searches for a nearby service, Google often shows a map, a short list of businesses, and a few
              organic results. Then they call, visit, or move on. Local SEO is how your business shows up in those moments.
            </p>
          </Reveal>
          <Reveal className="lseo-surf-grid">
            {WHY.map((card) => (
              <article className="lseo-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="lseo-why-quote">
            In local search, the business that’s nearby, well-reviewed, and clearly described often{" "}
            <span>wins the call, before the website is even opened.</span>
          </Reveal>
        </div>
      </section>

      {/* 3 SURFACES */}
      <section className="band lseo-sec" id="surfaces">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where buyers find you</span>
            <h2>The local search experience.</h2>
            <p>Local search isn’t just one list. We optimize for the three main surfaces buyers see.</p>
          </Reveal>
          <Reveal className="lseo-surf-grid">
            {SURFACES.map((card) => (
              <article className="lseo-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <p className="want">
                  <b>What buyers want</b>
                  {card.want}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className="band tint lseo-sec" id="pillars">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How local rankings work</span>
            <h2>The 3 local ranking pillars.</h2>
            <p>Google’s own guidance groups local ranking factors into three areas. Strong local SEO improves all three.</p>
          </Reveal>
          <Reveal className="lseo-pil-grid">
            {PILLARS.map((pil) => (
              <article className="lseo-pil" key={pil.no}>
                <span className="pn">{pil.no}</span>
                <h3>{pil.title}</h3>
                <p className="pq">{pil.q}</p>
                <ul>
                  {pil.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* AUDIT CHECKLIST */}
      <section className="band lseo-sec" id="audit">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we check first</span>
            <h2>Local SEO audit checklist.</h2>
            <p>Every engagement starts with a review across these areas.</p>
          </Reveal>
          <Reveal className="lseo-aud6-grid">
            {AUDIT.map((group) => (
              <article className="lseo-aud6" key={group.title}>
                <h3>
                  <span className="ai">{group.icon}</span>
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

      {/* GBP ESSENTIALS */}
      <section className="band tint lseo-sec" id="gbp">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The anchor</span>
            <h2>Google Business Profile essentials.</h2>
            <p>Your Google Business Profile is the single most visible part of local search. These are the pieces we keep sharp.</p>
          </Reveal>
          <Reveal className="lseo-gbp-grid">
            {GBP.map((card) => (
              <article className="lseo-gbp" key={card.title}>
                <div className="gi">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MULTI-LOCATION */}
      <section className="band lseo-sec" id="multiloc">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">More than one location</span>
            <h2>Multi-location setup.</h2>
            <p>Multi-location brands need extra structure so each location can rank for its own area.</p>
          </Reveal>
          <Reveal className="lseo-ml-tbl">
            <div className="lseo-ml-row head">
              <div>Your situation</div>
              <div>How we approach it</div>
            </div>
            {MULTILOC.map((row) => (
              <div className="lseo-ml-row" key={row.sit}>
                <div className="sit">{row.sit}</div>
                <div className="app">{row.app}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* KEYWORD PATTERNS */}
      <section className="band tint lseo-sec" id="keywords">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Local keywords</span>
            <h2>Local keyword patterns.</h2>
            <p>Local searches follow a few common shapes. We build keyword maps around the patterns that match your buyers.</p>
          </Reveal>
          <Reveal className="lseo-kw-grid">
            {KEYWORDS.map((kw) => (
              <article className="lseo-kw" key={kw.kind}>
                <div className="kt">{kw.kind}</div>
                <div className="ke">
                  <span className="mi">{kw.icon}</span>
                  <span className="q">{kw.q}</span>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="band lseo-sec" id="industries">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Industries</span>
            <h2>Industries we work with.</h2>
            <p>Local SEO looks different in every industry. We tailor categories, keywords, and content to yours.</p>
          </Reveal>
          <Reveal className="lseo-ind-grid">
            {INDUSTRIES.map((ind) => (
              <article className="lseo-ind" key={ind.name}>
                <span className="ii">{ind.icon}</span>
                <span className="lbl">{ind.name}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint lseo-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>From audit to monthly local ranking reports.</h2>
          </Reveal>
          <Reveal className="lseo-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="lseo-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band lseo-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs local SEO</span>
            <h2>Be the clear choice for nearby buyers.</h2>
          </Reveal>
          <div className="lseo-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="lseo-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every local SEO call." />

      <CtaBand
        id="start"
        eyebrow="Local SEO Services"
        heading="Be the clear choice for nearby buyers."
        copy={
          <>
            Book a free call to review your local search presence and the right next steps:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll check how your business appears on Google and what’s pulling you down.</strong>
          </>
        }
        primaryLabel="Book a local SEO call"
        primaryHref="/contact"
        secondary={{ label: "See the audit checklist", href: "#audit", arrow: "↗" }}
      />
    </>
  );
}
