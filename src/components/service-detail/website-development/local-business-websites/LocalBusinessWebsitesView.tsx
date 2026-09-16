"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import {
  FeatureGrid,
  NoteCallout,
  PricingTiers,
  ServiceDetailHero,
  ServiceFaq,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./lb-page.css";

/* -------- shared icons -------- */

const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const ICON_MOBILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_FORK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- why (feature cards) -------- */

const WHY_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    kicker: "0.05 seconds",
    title: "People decide instantly",
    text: (
      <>
        Users form an opinion in <strong>0.05 seconds.</strong> If it looks dated or slow, they&apos;re gone.
      </>
    ),
  },
  {
    icon: ICON_PIN,
    title: "Step two of every “near me”",
    text: (
      <>
        First they check Maps, then click through. <strong>Fail the trust check and they call your competitor.</strong>
      </>
    ),
    delay: 60,
  },
  {
    icon: ICON_PHONE,
    title: "Your phone number is #1",
    text: (
      <>
        Local buyers want to call. <strong>Buried at the bottom? You&apos;ve already lost.</strong>
      </>
    ),
    delay: 120,
  },
  {
    icon: ICON_STAR,
    title: "Reviews are your reputation",
    text: (
      <>
        A site without visible reviews is a stranger asking for money. <strong>With them, it&apos;s the trusted local name.</strong>
      </>
    ),
  },
  {
    icon: ICON_MOBILE,
    kicker: "80%+ on mobile",
    title: "Mobile is everything",
    text: (
      <>
        Not built mobile-first? <strong>You&apos;re losing four out of five potential customers.</strong>
      </>
    ),
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "A lead machine",
    text: (
      <>
        Done right, your local website <strong>pays for itself in weeks — not months.</strong>
      </>
    ),
    delay: 120,
  },
];

/* -------- problem (dark) -------- */

const PAINS = [
  { title: "Proprietary CMS lock-in", text: "Trade agencies lock you into systems only they can update. Every change costs $200.", delay: 0 },
  { title: "Looks like everyone else", text: "The same 10 templates across 500 clients. You’re indistinguishable from your competitor.", delay: 60 },
  { title: "Phone number in the footer", text: "The one thing local buyers want, hidden three scrolls down.", delay: 120 },
  { title: "Not built for local search", text: "No location pages, no schema, no GBP integration. You’re invisible on maps.", delay: 0 },
  { title: "Slow on 4G", text: "A 10-second load on a “near me” search is a lost customer. The 2-second site wins.", delay: 60 },
  { title: "No easy way to book", text: "No online booking, no click-to-message, no chat. Just a form no one fills out.", delay: 120 },
];

/* -------- what's included (8) -------- */

const INCLUDED = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3a9 9 0 0 1 0 18M3 12h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    no: "01",
    title: "Strategy & positioning",
    text: "Local competitor analysis, journey mapping, and a signed-off brief.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    no: "02",
    title: "Local-first design",
    text: "Custom, credible design with a prominent, sticky phone number.",
  },
  {
    icon: ICON_MOBILE,
    no: "03",
    title: "Mobile-first & fast",
    text: "One-tap call & directions, under-3-second loads on 4G.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 3v4M16 3v4M9 14l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    no: "04",
    title: "Booking & lead capture",
    text: "Calendar integration, short forms, click-to-call & message CTAs.",
  },
  {
    icon: ICON_PIN,
    no: "05",
    title: "Local SEO foundation",
    text: "LocalBusiness schema, NAP consistency, GBP integration, location pages.",
  },
  {
    icon: ICON_STAR,
    no: "06",
    title: "Reviews & trust signals",
    text: "Live Google reviews widget, testimonials, badges, guarantees.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 11h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    no: "07",
    title: "Payments & integrations",
    text: "Stripe/Square, booking platforms, CRM, call tracking, analytics.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    no: "08",
    title: "Launch, training & ownership",
    text: "Full access, training, and every login handed over. No lock-in.",
  },
];

/* -------- industries (interactive) -------- */

type Industry = { key: string; icon: ReactNode; tab: string; name: string; items: string[] };

const INDUSTRIES: Industry[] = [
  {
    key: "trades",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14 6a4 4 0 0 0-5.5 5.5l-5 5L6 18.5l5-5A4 4 0 0 0 16.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tab: "Plumbing / HVAC / Electrical",
    name: "Plumbing / HVAC / Electrical",
    items: ["Emergency call buttons", "Service-area maps", "Licensing display", "Financing options", "24/7 & same-day badges", "Quote request forms"],
  },
  {
    key: "dental",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8 3c-2 0-3 2-3 5s1 13 3 13 2-5 4-5 2 5 4 5 3-10 3-13-1-5-3-5-2 1.5-4 1.5S10 3 8 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    tab: "Dental / Orthodontic",
    name: "Dental / Orthodontic",
    items: ["Online booking", "Insurance information", "Before/after galleries", "Patient intake forms", "New-patient offers", "Treatment pages"],
  },
  {
    key: "legal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M6 8l-3 6h6zM18 8l-3 6h6zM5 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tab: "Legal (Law Firms)",
    name: "Legal (Law Firms)",
    items: ["Practice-area pages", "Attorney bios", "Case results", "Free-consultation forms", "Trust & credentials", "Client testimonials"],
  },
  {
    key: "medical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    tab: "Medical / Healthcare",
    name: "Medical / Healthcare",
    items: ["HIPAA-compliant forms", "Insurance display", "Appointment booking", "Telehealth links", "Provider profiles", "Condition / service pages"],
  },
  {
    key: "salon",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 8 20 18M8.5 16 20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    tab: "Salons / Spas / Barbers",
    name: "Salons / Spas / Barbers",
    items: ["Vagaro / Booksy booking", "Service menus", "Staff profiles", "Gallery", "Gift cards", "Promotions"],
  },
  {
    key: "restaurant",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M16 3c-1.5 0-2.5 2-2.5 5S15 21 16 21s2.5-10 2.5-13S17.5 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tab: "Restaurants / Cafes",
    name: "Restaurants / Cafes",
    items: ["Menus", "OpenTable / Resy booking", "Order-online links", "Hours & location", "Photo gallery", "Events / catering"],
  },
  {
    key: "gym",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 9v6M20 9v6M7 6v12M17 6v12M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    tab: "Gyms / Fitness",
    name: "Gyms / Fitness Studios",
    items: ["Class schedules", "Membership signup", "Trainer bios", "Free-trial offers", "Tour booking", "Results / testimonials"],
  },
  {
    key: "realestate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 11l8-7 8 7M6 10v9h12v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    tab: "Real Estate",
    name: "Real Estate",
    items: ["Listings", "Agent bios", "Area guides", "Mortgage calculators", "IDX integration", "Home-valuation forms"],
  },
  {
    key: "homeservices",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V10l7-5 7 5v11M10 21v-6h4v6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    tab: "Home Services",
    name: "Home Services",
    items: ["Quote request forms", "Service-area coverage", "Project galleries", "Reviews", "Financing options", "Seasonal offers"],
  },
  {
    key: "professional",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    tab: "Professional Services",
    name: "Professional Services",
    items: ["Booking calendars", "Service tiers", "Case studies", "Testimonials", "Lead-capture forms", "Resource content"],
  },
];

/* -------- who it's for -------- */

const WHO = [
  {
    icon: ICON_PHONE,
    text: (
      <>
        <strong>A local service business</strong> — plumbers, electricians, HVAC — where the phone ringing is what matters.
      </>
    ),
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    text: (
      <>
        <strong>A professional practice</strong> — lawyer, dentist, doctor, accountant — where trust and credibility drive bookings.
      </>
    ),
    delay: 60,
  },
  {
    icon: ICON_FORK,
    text: (
      <>
        <strong>A hospitality or lifestyle business</strong> — restaurant, salon, gym, spa — where visuals and booking are the game.
      </>
    ),
    delay: 120,
  },
  {
    icon: ICON_PIN,
    text: (
      <>
        <strong>A multi-location business</strong> needing individual pages for every city, neighborhood, or service area.
      </>
    ),
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    text: (
      <>
        <strong>Running Google Ads or LSAs</strong> to a site that doesn&apos;t convert — paying for clicks that bounce.
      </>
    ),
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: (
      <>
        <strong>Ready to leave a proprietary CMS</strong> — we build on standard platforms you own forever.
      </>
    ),
    delay: 120,
  },
];

/* -------- how it works (5 steps) -------- */

const STEPS = [
  { no: "Week 1", title: "Strategy & discovery", text: "Kickoff, local competitor research, service & area mapping, and a signed-off brief.", delay: 0 },
  { no: "Week 2", title: "Wireframes & content", text: "Wireframes for every page, content outlined, reviews and photos collected. You approve.", delay: 70 },
  { no: "Weeks 2–3", title: "Design", text: "Custom, mobile-first design on every page. Two rounds of feedback and revisions.", delay: 140 },
  { no: "Weeks 3–4", title: "Development", text: "Booking, phone tracking, Maps, reviews widget, and integrations connected. Full QA.", delay: 210 },
  { no: "Week 5", title: "Launch & training", text: "Go live, analytics & call tracking configured, team trained. 30 days of support.", delay: 280 },
];

/* -------- pricing -------- */

const TIERS = [
  { name: "Starter Local Site", best: "Single-location — up to 5 pages, essential local SEO, booking or lead form, launch in 3 weeks.", price: "Published" },
  { name: "Growth Local Site", best: "Up to 10 pages — multiple service pages, booking integration, review widgets, call tracking.", price: "Published", featured: true, badge: "Most popular", delay: 70 },
  { name: "Multi-Location Site", best: "2+ locations or service areas — location pages, area content, multi-location schema.", price: "Published", delay: 140 },
  { name: "Maintenance", best: "Monthly updates, security, backups, content edits, and small changes.", price: "Published /mo", delay: 210 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How long does it take?", a: <>Starter sites: 3 weeks. Growth: 4 weeks. Multi-location: 4–5 weeks. <strong>Timelines depend on how quickly you review and approve</strong> — the fastest projects have decisive clients.</> },
  { q: "Do I need a separate SEO service?", a: <>The site comes with <strong>local SEO built in</strong> — schema, service-area pages, GBP integration, content structure. For ongoing ranking/content work, that&apos;s our separate Local SEO service most clients add.</> },
  { q: "Can you handle multi-location?", a: <>Yes — individual location pages for each service area, city-specific content, correct schema, and GBP integration for each.</> },
  { q: "What if I already have a GBP?", a: <>We connect it and make sure all NAP details <strong>match exactly</strong> — critical for local rankings. Don&apos;t have one? We&apos;ll set it up.</> },
  { q: "Do you handle online booking?", a: <>Yes — whatever fits your industry: <strong>Calendly, Acuity, Jane, Vagaro, Booksy, OpenTable,</strong> or your own custom system.</> },
  { q: "Will my site work on mobile?", a: <>Every site is <strong>mobile-first</strong> — designed for phone screens first, then desktop. That&apos;s where 80%+ of local searches happen. Phone number is sticky on every page.</> },
  { q: "Do I own the site?", a: <>Yes, completely — standard platforms, no proprietary CMS. <strong>All logins, source files, and docs handed over.</strong> Leave anytime.</> },
  { q: "Can you migrate my current site?", a: <>Yes — full migrations from any platform, including proprietary trade CMSs. <strong>Includes content, images, redirects (to protect SEO), and testimonials.</strong></> },
  { q: "Do you show my Google reviews?", a: <>Yes — a <strong>live Google reviews widget</strong> so your latest reviews show automatically, plus review-request automation for new customers.</> },
  { q: "What about running Google Ads?", a: <>We handle Google Ads (including Local Services Ads) as a separate service. <strong>Many bundle the build with ads</strong> so the phone rings the day the site goes live.</> },
];

/* -------- hero signature: local phone mockup -------- */

function PhoneMockup() {
  return (
    <div className="lb-phone-wrap">
      <div className="lb-phone" aria-label="A local business site on mobile">
        <span className="lb-phone-tag">
          <span className="pt-dot"></span> One-tap call
        </span>
        <span className="lb-phone-tag lb-phone-tag2">
          <span className="pt-dot"></span> ★ 4.9 reviews
        </span>
        <div className="lb-pscreen">
          <div className="lb-psearch">
            <span className="sbox">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>{" "}
              plumber near me<span className="cur"></span>
            </span>
          </div>
          <div className="lb-pbiz">
            <div className="phdr">
              <span className="plogo">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="pnm">
                <b>Rapid Rooter Co.</b>
                <span className="prev">
                  ★★★★★ <span>(312) · Open now</span>
                </span>
              </div>
            </div>
            <div className="lb-pcall">{ICON_PHONE} Call now — (555) 012-3456</div>
            <div className="lb-pcall ghost">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>{" "}
              Book online
            </div>
            <div className="lb-pbadges">
              <span>Licensed</span>
              <span>Insured</span>
              <span>24/7</span>
              <span>Same-day</span>
            </div>
            <div className="lb-psticky">
              <span>Sticky on every page</span>
              <b>(555) 012-3456</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- industries: tab list + panel (arrow-key navigation wraps) -------- */

function IndustryTabs() {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = INDUSTRIES[active];

  function select(i: number) {
    const next = (i + INDUSTRIES.length) % INDUSTRIES.length;
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
    <Reveal className="lb-in-wrap" id="industries-int">
      <div className="lb-in-list" role="tablist" aria-label="Industries">
        {INDUSTRIES.map((ind, i) => (
          <button
            key={ind.key}
            className="lb-in-btn"
            role="tab"
            type="button"
            aria-selected={i === active}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{ind.icon}</span>
            <span className="dn">
              <b>{ind.tab}</b>
            </span>
          </button>
        ))}
      </div>
      <div className="lb-in-panel">
        <div className="lb-ip-top">
          <span className="big">{current.icon}</span>
          <div>
            <h3>{current.name}</h3>
          </div>
        </div>
        {/* keyed on the industry so the fade-in replays on every switch, as the design re-renders the panel */}
        <div className="lb-ip-body lb-ip-fade" key={current.key}>
          <span className="k">Common features we build</span>
          <div className="lb-ip-list">
            {current.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function LocalBusinessWebsitesView() {
  return (
    <>
      <ServiceDetailHero
        crumb={{ label: "Website Development", href: "/website-development" }}
        eyebrow="Local business · Bookings · Calls · Reviews"
        line1="A website that turns local"
        line2={
          <>
            searches into <span className="grad-text">customers.</span>
          </>
        }
        lead={
          <>
            Websites for plumbers, dentists, lawyers, salons, restaurants, gyms — anyone who serves a city or service
            area. <strong>Mobile-first, phone-number-first, review-first</strong> — designed to convert the “near me”
            search into a booked appointment or ringing phone.
          </>
        }
        primary={{ label: "Book a free website call", href: "/start-project" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
        compact
      >
        <PhoneMockup />
      </ServiceDetailHero>

      <TrustBar items={["Built for local search", "Booking & calls built in", "Transparent published pricing", "Launch in 3–5 weeks"]} />

      {/* WHY */}
      <section className="band lb-sec lb-why" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why your local website matters</span>
            <h2>46% of every Google search is local.</h2>
            <p>
              That&apos;s half of all searches — people looking for a business near them, right now, ready to buy. Your
              website either catches that intent or loses it.
            </p>
          </Reveal>
          <FeatureGrid cards={WHY_CARDS} columns={3} />
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark lb-sec" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most local sites</span>
            <h2>Chances are a few of these apply.</h2>
            <p>If you have a website today — and we built our service to fix every one of these.</p>
          </Reveal>
          <div className="lb-pain-grid">
            {PAINS.map((pain) => (
              <Reveal className="lb-pain" key={pain.title} style={d(pain.delay)}>
                <span className="pk">{ICON_X}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lb-pain-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              We built our service to fix <span className="gt">every one of those.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED (8) */}
      <section className="band lb-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What&apos;s included</span>
            <h2>Everything to turn “near me” into customers.</h2>
            <p>Strategy, design, development, local SEO, and booking/lead-capture — all from one team.</p>
          </Reveal>
          <Reveal className="lb-inc-grid">
            {INCLUDED.map((inc) => (
              <div className="lb-inc" key={inc.no}>
                <span className="ii">{inc.icon}</span>
                <span className="no">{inc.no}</span>
                <h3>{inc.title}</h3>
                <p>{inc.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES (interactive) */}
      <section className="band tint lb-sec" id="industries">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Industries we build for</span>
            <h2>Every kind of local business.</h2>
            <p>Different trades need different features. Pick yours — see what we build in.</p>
          </Reveal>
          <IndustryTabs />
          <Reveal as="p" className="lb-in-note">
            Don&apos;t see your industry? <strong>We build for pretty much every kind of local business</strong> — just
            ask.
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band lb-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>The right fit if you&apos;re…</h2>
          </Reveal>
          <div className="lb-who-grid">
            {WHO.map((who, i) => (
              <Reveal className="lb-who" key={i} style={d(who.delay)}>
                <span className="wi">{who.icon}</span>
                <p>{who.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band tint lb-sec" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A structured 3–5 week build.</h2>
            <p>Every step ends with a clear deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="lb-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="lb-step" key={step.title} style={d(step.delay)}>
                <span className="lb-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band lb-sec" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No “custom quote after a discovery call.” One-time project fees for the build, optional monthly maintenance.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Project fees paid in two installments — <strong>50% at kickoff, 50% at launch.</strong> Hosting, domain,
            booking platforms, and call tracking are separate. Every exact number is on the{" "}
            <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        eyebrow="Local Business Websites"
        heading="Ready for a website that makes the phone ring?"
        copy={
          <>
            Book a free website call. We&apos;ll look at what you have, what your local competitors are doing, and what
            it&apos;d take to build a site that actually converts —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation, no lock-in.</strong>
          </>
        }
        primaryLabel="Book a free website call"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
