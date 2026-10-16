"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./mrt-page.css";

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
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_USER_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7 1 0 2 .2 2.8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m15 18 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CAL_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PROFILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16v12H4zM4 11h16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TITLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_USER_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m16 4 2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PHONE_PLAY = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m11 10 3 2-3 2z" fill="currentColor" />
  </svg>
);

/* -------- hero signature: audience → message card -------- */

const ROWS: { name: string; sub: string; msg: ReactNode; cust?: boolean }[] = [
  { name: "Aware", sub: "Saw a video or post", msg: <>Education &amp; story</> },
  { name: "Interested", sub: "Visited your site", msg: "Main offer reminder" },
  { name: "Considering", sub: "Viewed products / pricing", msg: <>Proof &amp; comparison</> },
  { name: "Almost there", sub: "Started checkout / form", msg: "Nudge to finish" },
  { name: "Customer", sub: "Bought or signed up", msg: "Excluded / upsell", cust: true },
];

function AudienceCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the audience rows are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="Retargeting audiences matched to messages by stage"
      className={`mrt-rtg${run ? " run" : ""}`}
      live="Audience → message"
      corner="BY INTENT STAGE"
      footLeft="Right message, right stage"
      footRight="warm, not annoying →"
    >
      <div className="mrt-rtg-body">
        {ROWS.map((row) => (
          <div className={`mrt-rr${row.cust ? " cust" : ""}`} key={row.name}>
            <span className="rdot"></span>
            <span className="rn">
              <b>{row.name}</b>
              <small>{row.sub}</small>
            </span>
            <span className="rmsg">{row.msg}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark band, at a glance) -------- */

const GLANCE = [
  "Audiences built from real behavior",
  "Different messages by stage",
  "Exclusions for recent buyers",
  "Frequency kept in check",
  "Fresh creative for warm audiences",
];

/* -------- audiences table (6) -------- */

const AUDIENCES: { name: string; who: string; msg: string }[] = [
  { name: "Website visitors", who: "People who visited your site", msg: "A reminder of your main offer" },
  { name: "Product / service viewers", who: "People who viewed specific pages", msg: "The product or service they looked at" },
  { name: "Cart / form abandoners", who: "People who started but didn’t finish", msg: "A nudge to complete, or a helpful answer" },
  { name: "Video viewers", who: "People who watched your videos", msg: "A next-step message" },
  { name: "Social engagers", who: "People who engaged with your page or profile", msg: "Proof and offers" },
  { name: "Customer list", who: "Past buyers or leads you upload", msg: "Repeat purchases or upsells" },
];

/* -------- stage ribbon (5) -------- */

const STAGES: { no: string; title: string; text: string }[] = [
  { no: "Stage 1", title: "Aware", text: "Saw a video or post." },
  { no: "Stage 2", title: "Interested", text: "Visited your site." },
  { no: "Stage 3", title: "Considering", text: "Viewed products or pricing." },
  { no: "Stage 4", title: "Almost there", text: "Started checkout or a form." },
  { no: "Stage 5", title: "Customer", text: "Bought or signed up." },
];

/* -------- message types (3) -------- */

const MESSAGES: { kicker: string; icon: ReactNode; title: ReactNode; text: string; late?: boolean }[] = [
  { kicker: "Early stage", icon: ICON_FILE, title: <>Education &amp; story</>, text: "How the product works, who it’s for, and why you exist." },
  { kicker: "Middle stage", icon: ICON_STAR, title: <>Proof &amp; comparison</>, text: "Reviews, testimonials, and how you compare." },
  { kicker: "Late stage", icon: ICON_CLOCK, title: <>Reminder &amp; offer</>, text: "The item they viewed, answers to common doubts, or a time-limited offer.", late: true },
];

/* -------- controls (4) -------- */

const CONTROLS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_USER_CHECK, title: "Exclude recent buyers", text: "Stop showing purchase ads to people who already bought." },
  { icon: ICON_CAL_CHECK, title: "Exclude converted leads", text: "Remove people who already booked or signed up." },
  { icon: ICON_TREND, title: "Watch frequency", text: "Keep an eye on how often people see the same ad." },
  { icon: ICON_REFRESH, title: "Refresh creative", text: "Swap in new ads before warm audiences tune out." },
];

/* -------- setup (5) -------- */

const SETUP: { no: string; title: string; text: string; out: string }[] = [
  { no: "1", title: "Check tracking", text: "Pixel, Conversions API, and key events are confirmed.", out: "Reliable audience data" },
  { no: "2", title: "Build audiences", text: "Audiences are created by behavior and time since last visit.", out: "Audience map" },
  { no: "3", title: "Write stage-based ads", text: "Each audience gets messages that fit its stage.", out: "Ad set per stage" },
  { no: "4", title: "Set exclusions", text: "Recent buyers and converted leads are excluded.", out: "Cleaner delivery" },
  { no: "5", title: "Report and refresh", text: "Results reviewed and creative refreshed regularly.", out: "Ongoing optimization" },
];

/* -------- problem / fix table (6) -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Same ad shown over and over", fix: "Frequency monitored and creative rotated." },
  { prob: "Ads shown to people who already bought", fix: "Purchaser and lead exclusions set up." },
  { prob: "One message for every visitor", fix: "Different messages by stage." },
  { prob: "Audiences too small to deliver", fix: "Audiences combined or windows widened." },
  { prob: "Missing events", fix: "Pixel and Conversions API fixed." },
  { prob: "Retargeting results inflated", fix: "Results compared with prospecting and overall sales." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: ReactNode; key: string }[] = [
  { key: "tracking", icon: ICON_PROFILE, text: "Tracking and audience review" },
  { key: "custom", icon: ICON_PEOPLE, text: "Custom audiences by behavior and stage" },
  { key: "catalog", icon: ICON_BAG, text: <a href="/digital-marketing/meta-ads-ecommerce">Catalog retargeting for online stores</a> },
  { key: "list", icon: ICON_LIST, text: "Customer list audiences" },
  { key: "copy", icon: ICON_TITLE, text: "Stage-based ad copy and creative briefs" },
  { key: "exclusions", icon: ICON_SHIELD, text: "Exclusions and frequency controls" },
  { key: "lookalike", icon: ICON_USER_STAR, text: "Lookalike audiences from your best customers" },
  { key: "refresh", icon: ICON_REFRESH, text: "Creative refresh schedule" },
  { key: "report", icon: ICON_TREND, text: "Monthly reporting on retargeting results" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_BAG, text: <><strong>Online stores</strong> with visitors who browse but don’t buy.</>, delay: 0 },
  { icon: ICON_CLOCK, text: <><strong>Service businesses</strong> with long decision times.</>, delay: 60 },
  { icon: ICON_PHONE_PLAY, text: <><strong>Businesses with video or social content</strong> building warm audiences.</>, delay: 120 },
  { icon: ICON_LIST, text: <><strong>Brands with customer lists</strong> ready for repeat sales.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much do retargeting campaigns cost?", a: <>It depends on your audience sizes, number of campaigns, and creative needs. <strong>Ad spend is paid directly to Meta.</strong> We share pricing on the free call.</> },
  { q: "Do I need a lot of website traffic for retargeting?", a: <>Some traffic or engagement is needed for audiences to build. <strong>We’ll tell you if your audiences are large enough to start.</strong></> },
  { q: "How often should someone see a retargeting ad?", a: <>It depends on your offer and buying cycle. <strong>We monitor frequency and adjust to avoid ad fatigue.</strong></> },
  { q: "Can I upload my customer list?", a: <>Yes. Customer lists can be used to retarget or exclude people, <strong>following Meta’s terms and privacy rules.</strong></> },
  { q: "Can you guarantee more conversions?", a: <>No. Results depend on your offer, audience, and creative. <strong>We focus on audiences, messages, and testing.</strong></> },
  {
    q: "Does retargeting work alongside prospecting?",
    a: (
      <>
        Yes, they work best together.{" "}
        <strong>
          <a className="mrt-faq-link" href="/digital-marketing/meta-ads">Prospecting</a> builds warm audiences, and retargeting follows up.
        </strong>{" "}
        We report on both so results aren’t double-counted.
      </>
    ),
  },
];

/* -------- page -------- */

export default function MetaRetargetingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Meta Ads", href: "/digital-marketing/meta-ads" }}
        line1="Bring back the people who"
        line2={
          <>
            already showed <span className="grad-text">interest.</span>
          </>
        }
        lead={
          <>
            Retargeting campaigns on Facebook and Instagram that follow up with site visitors, engaged followers, and past customers,{" "}
            <strong>with the right message at the right time.</strong>
          </>
        }
        primary={{ label: "Book a retargeting call", href: "/contact" }}
        secondary={{ label: "See the audience map ↓", href: "#stages" }}
      >
        <AudienceCard />
      </ServiceDetailHero>

      <TrustBar items={["Audiences built by intent", "Messages matched to each stage", "Frequency kept in check", "Buyers excluded when they should be"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark mrt-sec mrt-why" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Most don’t act first time</span>
            <h2>Most people don’t act the first time.</h2>
            <p>Retargeting keeps your business in front of interested people.</p>
          </Reveal>
          <Reveal className="mrt-glance">
            <div className="gtxt">
              <p>
                Visitors often leave your site or skip your ad without acting, <strong>even when they’re interested.</strong>
              </p>
              <p>Retargeting shows them a follow-up message on Facebook and Instagram while your business is still fresh in their mind.</p>
              <p>
                The key is <strong>matching the message to how far along they got,</strong> without showing the same ad too often.
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

      {/* AUDIENCES */}
      <section className="band tint mrt-sec" id="audiences">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Retargeting audiences we build</span>
            <h2>Each audience is based on how someone interacted with your business.</h2>
          </Reveal>
          <Reveal className="mrt-au-tbl">
            <div className="mrt-au-row head">
              <div>Audience</div>
              <div>Who’s in it</div>
              <div>Message we show</div>
            </div>
            {AUDIENCES.map((row) => (
              <div className="mrt-au-row" key={row.name}>
                <div>{row.name}</div>
                <div>{row.who}</div>
                <div className="msg">{row.msg}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STAGE RIBBON */}
      <section className="band mrt-sec" id="stages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Matching message to stage</span>
            <h2>As interest grows, the message gets more specific.</h2>
          </Reveal>
          <Reveal className="mrt-stg">
            {STAGES.map((stage, i) => (
              <article className="mrt-sg" key={stage.no}>
                <span className="sgn">{stage.no}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                {i < STAGES.length - 1 && (
                  <span className="arr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MESSAGE TYPES */}
      <section className="band tint mrt-sec" id="messages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Message types by stage</span>
            <h2>We rotate message types so retargeting stays helpful, not annoying.</h2>
          </Reveal>
          <Reveal className="mrt-mt-grid">
            {MESSAGES.map((card) => (
              <article className={`mrt-mt${card.late ? " late" : ""}`} key={card.kicker}>
                <span className="mtk">{card.kicker}</span>
                <div className="mti">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EXCLUSIONS / FREQUENCY */}
      <section className="band mrt-sec" id="controls">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Exclusions &amp; frequency</span>
            <h2>Good retargeting knows when to stop.</h2>
          </Reveal>
          <Reveal className="mrt-ctl-grid">
            {CONTROLS.map((card) => (
              <article className="mrt-ctl" key={card.title}>
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

      {/* SETUP */}
      <section className="band tint mrt-sec" id="setup">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we set up retargeting</span>
            <h2>A clean setup from tracking to reporting.</h2>
          </Reveal>
          <Reveal className="mrt-oc-list">
            {SETUP.map((step) => (
              <article className="mrt-oc" key={step.no}>
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

      {/* PROBLEMS */}
      <section className="band mrt-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common retargeting problems.</h2>
          </Reveal>
          <Reveal className="mrt-fix-tbl">
            <div className="mrt-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {FIXES.map((row) => (
              <div className="mrt-fix-row" key={row.prob}>
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
      <section className="band tint mrt-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From tracking review to monthly retargeting reports.</h2>
          </Reveal>
          <Reveal className="mrt-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="mrt-inc2" key={item.key}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band mrt-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Follow up with the people who already care.</h2>
          </Reveal>
          <div className="mrt-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="mrt-who" key={i} style={d(item.delay)}>
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
        eyebrow="Meta Retargeting Campaigns"
        heading="Follow up with the people who already care."
        copy={
          <>
            Book a free call to plan your Meta retargeting:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your audiences and retargeting setup.</strong>
          </>
        }
        primaryLabel="Book a retargeting call"
        primaryHref="/contact"
        secondary={{ label: "See the audience map", href: "#stages", arrow: "↗" }}
      />
    </>
  );
}
