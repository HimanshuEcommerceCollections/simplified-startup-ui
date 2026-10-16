"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./mae-page.css";

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
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BAG_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
const ICON_BAG_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_VIDEO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m11 10 3 2-3 2z" fill="currentColor" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CAROUSEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M18 8v8M21 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PIXEL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
    <circle cx="7" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
const ICON_CAPI = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="7" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="4" width="7" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M10 12h4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
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
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TITLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: in-feed catalog ad -------- */

const FEED_TAGS = ["Catalog synced", "Pixel + CAPI", "Order value tracked"];

function FeedCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the ad tile and chips are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A catalog ad in a social feed"
      className={`mae-feed${run ? " run" : ""}`}
      live="In-feed catalog ad"
      corner="FB & IG"
      footLeft="Discovery that sells"
      footRight="scrollers → customers →"
    >
      <div className="mae-feed-ad">
        <div className="ad-head">
          <span className="ad-av">S</span>
          <span className="ad-nm">
            <b>yourstore</b>
            <small>Sponsored</small>
          </span>
        </div>
        <div className="ad-img">
          {ICON_BAG_THIN}
          <span className="caro">
            <i className="on"></i>
            <i></i>
            <i></i>
          </span>
        </div>
        <div className="ad-cta">
          <span className="pc">
            <b>Bestseller Hoodie, $68</b>
            <small>Free shipping over $50</small>
          </span>
          <span className="shop">Shop now</span>
        </div>
      </div>
      <div className="mae-feed-tags">
        {FEED_TAGS.map((tag) => (
          <span key={tag}>
            {ICON_TICK}
            {tag}
          </span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why: at a glance -------- */

const GLANCE = [
  "Creative drives discovery",
  "Catalog powers product ads",
  "Pixel plus Conversions API for tracking",
  "Advantage+ helps scale what works",
  "Retargeting brings shoppers back",
];

/* -------- campaign mix table -------- */

const MIX: { type: string; role: string; use: ReactNode }[] = [
  { type: "Advantage+ sales", role: "Broad prospecting with automation", use: "Scale proven creative to new shoppers" },
  { type: "Manual sales", role: "More control over audiences and placements", use: "Test new angles, offers, and products" },
  {
    type: "Catalog ads",
    role: "Show products people viewed or may like",
    use: (
      <>
        <a href="/digital-marketing/meta-retargeting">Retarget</a> browsers and cart abandoners
      </>
    ),
  },
  { type: "Collection & Instant Experience", role: "Immersive mobile shopping view", use: "Launches, collections, and lookbooks" },
  { type: "Engagement & video", role: "Build awareness and warm audiences", use: "Feed retargeting pools with video viewers" },
];

/* -------- account structure diagram -------- */

const CAMPAIGNS: { ct: string; title: string; items: string[] }[] = [
  { ct: "Campaign · audiences", title: "Prospecting", items: ["Broad / Advantage+", "Interest themes", "Lookalikes"] },
  { ct: "Campaign · ad sets", title: "Creative Testing", items: ["New hooks", "New formats", "New offers"] },
  { ct: "Campaign · audiences", title: "Retargeting", items: ["Product viewers", "Add to cart", "Engaged visitors"] },
  { ct: "Campaign · audiences", title: "Retention", items: ["Past buyers", "Repeat buyers", "Customer list"] },
];

/* -------- creative formats (6 tilt cards) -------- */

const FORMATS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_VIDEO, title: "Short-form video", text: "Quick product demos, unboxings, and before-and-after clips for Reels and Stories." },
  { icon: ICON_PERSON, title: "User-generated style", text: "Real-feeling content from customers or creators talking about the product." },
  { icon: ICON_CAROUSEL, title: "Carousel", text: "Several products or features in one swipeable ad." },
  { icon: ICON_IMAGE, title: "Static product images", text: "Clean product shots with a clear benefit or offer." },
  { icon: ICON_BAG, title: "Catalog ads", text: "Automatically show the right product from your catalog." },
  { icon: ICON_PIN, title: "Founder or brand story", text: "The person or reason behind the brand, told simply." },
];

function FormatGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="mae-cf-grid">
        {FORMATS.map((card) => (
          <article className="mae-cf" data-tilt key={card.title}>
            <span className="mae-cf-spot"></span>
            <div className="cfi">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- creative testing (5 steps) -------- */

const TESTING: { title: string; text: string; out: string }[] = [
  { title: "Find the angles", text: "We review reviews, comments, and competitors to find what buyers care about.", out: "A list of test angles" },
  { title: "Brief the creative", text: "Clear briefs for your team, creators, or our designers.", out: "Creative briefs per angle" },
  { title: "Test in a controlled way", text: "New ads run in a testing campaign with a set budget.", out: "Early performance signals" },
  { title: "Promote the winners", text: "Ads that perform move into scaling campaigns.", out: "Proven ads in prospecting" },
  { title: "Refresh regularly", text: "Tired ads are replaced before results slip.", out: "Ongoing creative calendar" },
];

/* -------- tracking checklist (3 groups) -------- */

const TRACKING: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_PIXEL, title: "Meta Pixel", items: ["Installed on every page", "Key events firing", "Events tested"] },
  { icon: ICON_CAPI, title: "Conversions API", items: ["Server-side events connected", "Event matching checked", "Duplicate events handled"] },
  { icon: ICON_BAG, title: "Catalog", items: ["Synced with your store", "Products and prices current", "Product sets organized"] },
];

/* -------- problem / fix table -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Same ads running for months", fix: "Regular creative testing and refresh schedule." },
  { prob: "Purchases under-reported", fix: "Conversions API added alongside the Pixel." },
  { prob: "Catalog out of sync", fix: "Feed connection checked and errors fixed." },
  { prob: "Retargeting and prospecting mixed together", fix: "Campaigns separated by funnel stage." },
  { prob: "Too many small ad sets", fix: "Simpler structure so each ad set gets enough data." },
  { prob: "Discounts as the only angle", fix: "Testing benefits, social proof, and story angles too." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Account, Pixel, and catalog audit" },
  { icon: ICON_WINDOW, text: "Pixel and Conversions API setup or review" },
  { icon: ICON_BAG, text: "Catalog connection and product set setup" },
  { icon: ICON_GRID, text: "Campaign structure by funnel stage" },
  { icon: ICON_REFRESH, text: "Advantage+ and manual campaign management" },
  { icon: ICON_BOLT, text: "Creative strategy and monthly testing plan" },
  { icon: ICON_TITLE, text: "Ad copy and creative briefs" },
  { icon: ICON_PERSON, text: "Retargeting and retention audiences" },
  { icon: ICON_TREND, text: "Monthly reporting on orders, revenue, and return on ad spend" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_BAG, text: <><strong>Shopify and WooCommerce stores</strong> ready to grow with paid social.</>, delay: 0 },
  { icon: ICON_BOLT, text: <><strong>DTC brands</strong> launching new products or collections.</>, delay: 60 },
  { icon: ICON_BAG_PLAIN, text: <><strong>Stores with strong products</strong> but inconsistent ad results.</>, delay: 120 },
  { icon: ICON_GRID, text: <><strong>Brands managing ads in-house</strong> who want a clearer system.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does Meta ads management for e-commerce cost?", a: <>It depends on ad spend, number of campaigns, and creative needs. <strong>Ad spend is paid directly to Meta.</strong> We share our pricing on the free call.</> },
  { q: "Do you create the ad creative?", a: <>We can. We write briefs and copy, and our design team can produce static and simple video ads. <strong>We also work with your existing creators.</strong></> },
  { q: "What is the Conversions API?", a: <>It sends purchase and other events from your server to Meta, which <strong>helps tracking stay more complete alongside the Pixel.</strong></> },
  { q: "Should we use Advantage+ campaigns?", a: <>Often, yes, once you have reliable tracking and creative that works. <strong>We usually run them alongside more controlled campaigns.</strong></> },
  {
    q: "Can you guarantee a specific return on ad spend?",
    a: (
      <>
        No. Results depend on your products, pricing, creative, and{" "}
        <a className="mae-faq-link" href="/website-development/ecommerce">website</a>. <strong>We focus on structure, tracking, and steady testing.</strong>
      </>
    ),
  },
  { q: "How often do you refresh creative?", a: <>We run a <strong>monthly testing rhythm</strong> and replace tired ads before results slip. The exact pace depends on your spend and how fast ads fatigue.</> },
];

/* -------- page -------- */

export default function MetaAdsEcommerceView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Meta Ads", href: "/digital-marketing/meta-ads" }}
        line1="Facebook and Instagram ads"
        line2={
          <>
            that turn scrollers into <span className="grad-text">customers.</span>
          </>
        }
        lead={
          <>
            Meta ads for online stores: catalog ads, Advantage+ campaigns, and steady creative testing,{" "}
            <strong>measured by real orders and order value.</strong>
          </>
        }
        primary={{ label: "Book an e-commerce Meta ads call", href: "/contact" }}
        secondary={{ label: "See the campaign mix ↓", href: "#mix" }}
      >
        <FeedCard />
      </ServiceDetailHero>

      <TrustBar items={["Catalog connected & synced", "Pixel + Conversions API", "Creative tested every month", "Reporting based on real orders"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark mae-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why Meta works</span>
            <h2>Why Meta works well for online stores.</h2>
            <p>People discover products on Facebook and Instagram before they search for them.</p>
          </Reveal>
          <Reveal className="mae-glance">
            <div className="gtxt">
              <p>
                Most shoppers on Meta aren’t searching for your product yet. <strong>Your ad is what introduces it.</strong>
              </p>
              <p>That makes creative the biggest lever: the right hook, product shot, or short video can do more than any targeting setting.</p>
              <p>
                Good e-commerce campaigns pair <strong>strong creative with a synced catalog and reliable tracking.</strong>
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

      {/* CAMPAIGN MIX */}
      <section className="band tint mae-sec" id="mix">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The campaign mix</span>
            <h2>The e-commerce campaign mix on Meta.</h2>
            <p>Each campaign type plays a different role in growing your store.</p>
          </Reveal>
          <Reveal className="mae-cm-tbl">
            <div className="mae-cm-row head">
              <div>Campaign type</div>
              <div>Main role</div>
              <div>How we use it</div>
            </div>
            {MIX.map((row) => (
              <div className="mae-cm-row" key={row.type}>
                <div>{row.type}</div>
                <div>{row.role}</div>
                <div>{row.use}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ACCOUNT STRUCTURE */}
      <section className="band mae-sec" id="structure">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Account structure</span>
            <h2>A typical e-commerce account structure.</h2>
            <p>Campaigns are organized by funnel stage so budget and results stay clear.</p>
          </Reveal>
          <Reveal className="mae-acct">
            <div className="mae-acct-root">
              <b>Your Meta Ads Account</b>
            </div>
            <div className="mae-acct-conn"></div>
            <div className="mae-acct-camps">
              {CAMPAIGNS.map((camp) => (
                <article className="mae-acamp" key={camp.title}>
                  <span className="ct">{camp.ct}</span>
                  <h3>{camp.title}</h3>
                  <ul>
                    {camp.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal as="p" className="mae-acct-note">
            Example structure. Your setup is planned around your catalog, budget, and goals.
          </Reveal>
        </div>
      </section>

      {/* CREATIVE FORMATS */}
      <section className="band tint mae-sec" id="formats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Creative formats</span>
            <h2>Creative formats that sell products.</h2>
            <p>We test a mix of formats, because different shoppers respond to different styles.</p>
          </Reveal>
          <FormatGrid />
        </div>
      </section>

      {/* CREATIVE TESTING */}
      <section className="band mae-sec" id="testing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Creative testing</span>
            <h2>Our creative testing process.</h2>
            <p>A steady testing rhythm keeps campaigns from going stale.</p>
          </Reveal>
          <Reveal className="mae-oc-list">
            {TESTING.map((step, i) => (
              <article className="mae-oc" key={step.title}>
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

      {/* TRACKING CHECKLIST */}
      <section className="band tint mae-sec" id="tracking">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Tracking setup</span>
            <h2>Tracking setup checklist.</h2>
            <p>Accurate tracking helps Meta find more buyers like your best customers.</p>
          </Reveal>
          <Reveal className="mae-tc-grid">
            {TRACKING.map((card) => (
              <article className="mae-tc" key={card.title}>
                <h3>
                  <span className="tci">{card.icon}</span>
                  {card.title}
                </h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>
                      <span className="tb">{ICON_TICK}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="band mae-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common Meta e-commerce problems.</h2>
          </Reveal>
          <Reveal className="mae-fix-tbl">
            <div className="mae-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {FIXES.map((row) => (
              <div className="mae-fix-row" key={row.prob}>
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
      <section className="band tint mae-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From catalog audit to revenue &amp; ROAS reporting.</h2>
          </Reveal>
          <Reveal className="mae-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="mae-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band mae-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Turn scrollers into customers.</h2>
          </Reveal>
          <div className="mae-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="mae-who" key={i} style={d(item.delay)}>
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
        eyebrow="Meta Ads for E-commerce"
        heading="Turn scrollers into customers."
        copy={
          <>
            Book a free call: <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your campaigns, catalog, and tracking setup.</strong>
          </>
        }
        primaryLabel="Book an e-commerce Meta ads call"
        primaryHref="/contact"
        secondary={{ label: "See the campaign mix", href: "#mix", arrow: "↗" }}
      />
    </>
  );
}
