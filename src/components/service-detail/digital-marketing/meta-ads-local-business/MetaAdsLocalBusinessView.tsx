"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./mal-page.css";

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
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CAL_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CAL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PIN_SOLID = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" fill="currentColor" />
    <circle cx="12" cy="9" r="2.5" fill="#fff" />
  </svg>
);
const ICON_PHOTO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_EYE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TITLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_FORK_KNIFE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 3v8a3 3 0 0 0 6 0V3M8 3v18M19 3c-2 0-3 3-3 6s1 4 3 4v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TROPHY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 4v7a6 6 0 0 0 12 0V4M9 20h6M12 17v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
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

/* -------- hero signature: local reach card -------- */

function LocalReachCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: radius, pin, and ad are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A local Meta ad targeted to a neighborhood"
      className={`mal-lm${run ? " run" : ""}`}
      live="Local reach"
      corner="YOUR AREA ONLY"
      footLeft="Nearby, local, easy to act on"
      footRight="seen in your area →"
    >
      <div className="mal-lm-map">
        <span className="rad"></span>
        <span className="pin">{ICON_PIN_SOLID}</span>
      </div>
      <div className="mal-lm-ad">
        <div className="ah">
          <span className="av">S</span>
          <b>Sunrise Cafe</b>
          <small>Sponsored</small>
        </div>
        <div className="abody">
          <b>New weekend brunch, 2 blocks away.</b> Fresh, local, and open till 2pm.
        </div>
        <div className="acta">
          <span className="call">Call</span>
          <span className="msg">Message</span>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why: at a glance (5) -------- */

const GLANCE: ReactNode[] = [
  "Tight location targeting",
  "Real, local-looking creative",
  "Simple offers and events",
  "Calls, messages, and bookings",
  <>
    <a href="/digital-marketing/meta-retargeting">Repeat reach</a> to your neighborhood
  </>,
];

/* -------- 4 goal cards -------- */

const GOALS: { kicker: string; icon: ReactNode; title: string; text: ReactNode; best: string }[] = [
  { kicker: "Get calls", icon: ICON_PHONE, title: "Call ads", text: "Mobile users can tap to call straight from the ad.", best: "Home services and urgent needs" },
  { kicker: "Get messages", icon: ICON_CHAT, title: "Messenger, IG, or WhatsApp ads", text: "Start a chat to answer questions and book.", best: "Salons, studios, and clinics" },
  {
    kicker: "Get bookings",
    icon: ICON_CAL_CHECK,
    title: "Lead or booking ads",
    text: (
      <>
        Collect details or send people to your <a href="/website-development/local-business-websites">booking page</a>.
      </>
    ),
    best: "Appointments and consultations",
  },
  { kicker: "Get visits", icon: ICON_PIN, title: "Awareness and offer ads", text: "Keep your business top of mind with nearby people.", best: "Restaurants, shops, and gyms" },
];

/* -------- location targeting table -------- */

const TARGETING: { opt: string; what: string; when: string }[] = [
  { opt: "Radius around an address", what: "Reaches people near your location", when: "Single-location businesses" },
  { opt: "Cities or ZIP codes", what: "Targets specific areas", when: "Defined service areas" },
  { opt: "Multiple pins", what: "Separate areas for each location", when: "Multi-location brands" },
  { opt: "Location exclusions", what: "Removes areas you don’t serve", when: "To cut wasted reach" },
];

/* -------- local creative (6, tilt) -------- */

const CREATIVE: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_PHOTO, title: "Real photos", text: "Your team, space, and work instead of stock images." },
  { icon: ICON_PIN, title: "Local references", text: "Neighborhood names, landmarks, and community events." },
  { icon: ICON_BOLT, title: "Simple offers", text: "A clear reason to visit, call, or book now." },
  { icon: ICON_STAR, title: "Customer stories", text: "Short quotes or clips from real customers, with permission." },
  { icon: ICON_EYE, title: "Behind the scenes", text: "How you work, prepare, or care for customers." },
  { icon: ICON_CAL, title: "Event promotion", text: "Openings, classes, workshops, and seasonal events." },
];

function CreativeGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="mal-lc6-grid">
        {CREATIVE.map((card) => (
          <article className="mal-lc6" key={card.title} data-tilt>
            <span className="mal-lc6-spot"></span>
            <div className="l6i">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- process (4 rows) -------- */

const PROCESS: { title: string; text: string; out: string }[] = [
  { title: "Set the area and goal", text: "We confirm your service area and the action you want customers to take.", out: "Targeting & goal plan" },
  { title: "Plan offers and creative", text: "Seasonal offers, events, and local photos are planned ahead.", out: "Monthly creative plan" },
  { title: "Launch and track", text: "Calls, messages, and bookings are tracked from day one.", out: "Clear lead tracking" },
  { title: "Refresh and repeat", text: "Creative is updated regularly so your area doesn’t tire of it.", out: "Ongoing refresh schedule" },
];

/* -------- problem / fix table -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Ads reaching people outside the area", fix: "Location targeting and exclusions tightened." },
  { prob: "Messages left unanswered", fix: "Response plan and auto-replies set up." },
  { prob: "Stock images that feel generic", fix: "Real local photos and short videos." },
  { prob: "Boosting posts without a goal", fix: "Campaigns built around calls, messages, or bookings." },
  { prob: "Same ad shown too often", fix: "Creative refreshed on a regular schedule." },
  { prob: "No way to see results", fix: "Call, message, and booking tracking." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Account and page review" },
  { icon: ICON_PIN, text: "Location targeting setup" },
  { icon: ICON_TARGET, text: "Campaign goals matched to your business" },
  { icon: ICON_BOLT, text: "Local offer and event planning" },
  { icon: ICON_TITLE, text: "Ad copy and creative briefs" },
  { icon: ICON_CHAT, text: "Messaging and call ad setup" },
  { icon: ICON_CAL_CHECK, text: "Booking or lead tracking" },
  { icon: ICON_REFRESH, text: "Regular creative refresh" },
  { icon: ICON_TREND, text: "Monthly reporting on calls, messages, and bookings" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_FORK_KNIFE, text: <><strong>Restaurants and cafés</strong> promoting menus, events, and offers.</>, delay: 0 },
  { icon: ICON_TROPHY, text: <><strong>Gyms, studios, and salons</strong> filling classes and appointments.</>, delay: 60 },
  { icon: ICON_HOME, text: <><strong>Home service businesses</strong> reaching homeowners nearby.</>, delay: 120 },
  { icon: ICON_PLUS, text: <><strong>Clinics and practices</strong> building local awareness.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much do local Meta ads cost?", a: <>It depends on your area, goals, and creative needs. <strong>Ad spend is paid directly to Meta.</strong> We share our pricing on the free call.</> },
  { q: "Is boosting a post the same as running ads?", a: <>Boosting is a simple option, but <strong>full campaigns give more control over goals, targeting, and tracking.</strong></> },
  { q: "Do I need professional photos?", a: <>Not always. <strong>Clear, real photos from your phone often work well for local ads.</strong></> },
  { q: "Can you manage ads for multiple locations?", a: <>Yes. <strong>We set up targeting and creative for each location.</strong></> },
  { q: "Can you guarantee more customers?", a: <>No. Results depend on your area, offer, and business. <strong>We focus on targeting, creative, and tracking.</strong></> },
  { q: "What results can we actually see?", a: <>We track <strong>calls, messages, and bookings</strong> from day one, so you can see the real actions your ads drive, not just reach or likes.</> },
];

/* -------- page -------- */

export default function MetaAdsLocalBusinessView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Meta Ads", href: "/digital-marketing/meta-ads" }}
        line1="Become the business your"
        line2={
          <>
            neighbors see, remember, and <span className="grad-text">choose.</span>
          </>
        }
        lead={
          <>
            Facebook and Instagram ads for local businesses:{" "}
            <strong>targeted to your area, built around local offers, and designed to drive calls, messages, and visits.</strong>
          </>
        }
        primary={{ label: "Book a local Meta ads call", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#goals" }}
      >
        <LocalReachCard />
      </ServiceDetailHero>

      <TrustBar items={["Ads only in your area", "Local offers and events", "Calls, messages, and bookings", "Creative that looks local"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark mal-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why Meta works for local</span>
            <h2>Your future customers are scrolling nearby every day.</h2>
          </Reveal>
          <Reveal className="mal-glance">
            <div className="gtxt">
              <p>
                Local customers often discover a new restaurant, gym, salon, or service{" "}
                <strong>
                  while scrolling, not <a href="/digital-marketing/local-seo">searching</a>.
                </strong>
              </p>
              <p>Meta lets you reach people in the areas you serve with ads that feel local and personal.</p>
              <p>
                The best local campaigns use <strong>real photos, clear offers, and an easy next step</strong> like calling, messaging, or
                booking.
              </p>
            </div>
            <div className="gbox">
              <h4>At a glance</h4>
              <ul>
                {GLANCE.map((item, i) => (
                  <li key={i}>
                    <span className="gk">{ICON_CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMPAIGN GOALS */}
      <section className="band tint mal-sec" id="goals">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Local campaign goals</span>
            <h2>We pick the goal that matches what you want customers to do.</h2>
          </Reveal>
          <Reveal className="mal-gc-grid">
            {GOALS.map((card) => (
              <article className="mal-gc" key={card.title}>
                <span className="gck">{card.kicker}</span>
                <div className="gci">{card.icon}</div>
                <h3>{card.title}</h3>
                <p className="gcf">{card.text}</p>
                <div className="best">
                  <b>Great for</b>
                  {card.best}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* LOCATION TARGETING */}
      <section className="band mal-sec" id="targeting">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Location targeting</span>
            <h2>Getting the area right is the first step in local ads.</h2>
          </Reveal>
          <Reveal className="mal-lt-tbl">
            <div className="mal-lt-row head">
              <div>Option</div>
              <div>What it does</div>
              <div>When we use it</div>
            </div>
            {TARGETING.map((row) => (
              <div className="mal-lt-row" key={row.opt}>
                <div>{row.opt}</div>
                <div>{row.what}</div>
                <div className="ours">{row.when}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* LOCAL CREATIVE */}
      <section className="band tint mal-sec" id="creative">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Local creative that works</span>
            <h2>Local ads perform best when they look and feel local.</h2>
          </Reveal>
          <CreativeGrid />
        </div>
      </section>

      {/* PROCESS */}
      <section className="band mal-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we run local campaigns</span>
            <h2>A simple, steady process for local results.</h2>
          </Reveal>
          <Reveal className="mal-oc-list">
            {PROCESS.map((step, i) => (
              <article className="mal-oc" key={step.title}>
                <span className="ocn">{i + 1}</span>
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

      {/* PROBLEMS */}
      <section className="band tint mal-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common local Meta ads problems.</h2>
          </Reveal>
          <Reveal className="mal-fix-tbl">
            <div className="mal-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {FIXES.map((row) => (
              <div className="mal-fix-row" key={row.prob}>
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
      <section className="band mal-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From location setup to calls, messages &amp; booking reporting.</h2>
          </Reveal>
          <Reveal className="mal-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="mal-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint mal-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Be the local business people remember.</h2>
          </Reveal>
          <div className="mal-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="mal-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every campaign." />

      <CtaBand
        id="start"
        eyebrow="Meta Ads for Local Business"
        heading="Be the local business people remember."
        copy={
          <>
            Book a free call to plan your Meta ads:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your area, audience, and goals.</strong>
          </>
        }
        primaryLabel="Book a local Meta ads call"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#goals", arrow: "↗" }}
      />
    </>
  );
}
