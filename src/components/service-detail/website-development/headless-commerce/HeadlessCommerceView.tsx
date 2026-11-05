"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./hdc-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_X_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_PLUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_GLOBE_HALF = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M7 7h.01M3 5a2 2 0 0 1 2-2h5l9 9-7 7-9-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_GRID4 = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: headless split card -------- */

function HeadlessSplitCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: nodes, line and API pill are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A headless storefront separated from the commerce engine"
      className={`hdc-hd${run ? " run" : ""}`}
      live="Headless split"
      corner="FRONT-END ↔ ENGINE"
      footLeft="Design free, engine in charge"
      footRight="best of both →"
    >
      <div className="hdc-hd-body">
        <div className="hdc-hd-node front">
          <span className="nk">Front end · custom</span>
          <b>Your storefront</b>
          <small>Next.js · Hydrogen · Catalyst</small>
        </div>
        <div className="hdc-hd-link">
          <span className="api">
            {ICON_PLUS}
            Connected by APIs
          </span>
        </div>
        <div className="hdc-hd-node eng">
          <span className="nk">Commerce engine</span>
          <b>
            Shopify / <a href="/website-development/bigcommerce-development">BigCommerce</a>
          </b>
          <small>Products · cart · checkout · orders</small>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark): at a glance -------- */

const GLANCE = ["Custom front end", "Commerce platform via APIs", "Headless CMS for content", "More design freedom", "More technical upkeep"];

/* -------- stack diagram (4 layers) -------- */

const LAYERS: { icon: ReactNode; title: string; kicker: string; items: string[] }[] = [
  { icon: ICON_WINDOW, title: "Front end", kicker: "Built with", items: ["Next.js", "Shopify Hydrogen", "BigCommerce Catalyst"] },
  { icon: ICON_BAG, title: "Commerce engine", kicker: "Examples", items: ["Shopify", "BigCommerce", "commercetools"] },
  { icon: ICON_DOC, title: "Content (CMS)", kicker: "Examples", items: ["Sanity", "Contentful", "Storyblok"] },
  { icon: ICON_SHIELD, title: "Hosting & services", kicker: "Examples", items: ["Vercel", "Netlify", "Search & reviews APIs"] },
];

/* -------- fit split -------- */

const FIT_NO = [
  "A small catalog and simple needs",
  "A theme already does what you need",
  "No budget for ongoing development",
  "A small team with no developer support",
  "Speed to launch is the main priority",
];
const FIT_YES = [
  "Content-rich brand experiences",
  "Very custom design or interactions",
  "Several storefronts or channels",
  "Strong in-house or partner dev support",
  "Plans that have outgrown themes",
];

/* -------- unlock (6) -------- */

const UNLOCK: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_PEN, title: "Design freedom", text: "Layouts and interactions not limited by a theme system." },
  { icon: ICON_DOC, title: "Content & commerce together", text: "Editorial content and shopping blended in one experience." },
  { icon: ICON_GLOBE, title: "Multiple channels", text: "One commerce engine powering web, apps, and other touchpoints." },
  { icon: ICON_BOLT, title: "Performance control", text: "Modern frameworks with fine control over loading." },
  { icon: ICON_TAG, title: "Flexible tools", text: "Choose best-fit tools for search, content, and more." },
  { icon: ICON_REFRESH, title: "Future flexibility", text: "Swap parts of the stack without rebuilding everything." },
];

function UnlockGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="hdc-un-grid">
        {UNLOCK.map((card) => (
          <article className="hdc-un" key={card.title} data-tilt>
            <span className="hdc-un-spot"></span>
            <div className="uni">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- process (5) -------- */

const STEPS: { no: string; title: string; text: string; out: string }[] = [
  { no: "1", title: "Fit assessment", text: "We confirm headless is the right choice before planning anything.", out: "Go or no-go recommendation" },
  { no: "2", title: "Architecture", text: "Commerce platform, CMS, framework, and hosting chosen.", out: "Technical architecture plan" },
  { no: "3", title: "Design", text: "Experience designed for shoppers and content editors.", out: "Approved designs" },
  { no: "4", title: "Build and connect", text: "Front end built and connected to commerce and CMS APIs.", out: "Working storefront" },
  { no: "5", title: "Launch and support", text: "Testing, launch, and ongoing development support.", out: "Live storefront & support plan" },
];

/* -------- risks table -------- */

const RISKS: { prob: ReactNode; fix: string }[] = [
  { prob: "Higher build and upkeep effort", fix: "Clear scope and a long-term support plan." },
  { prob: "Content editors losing control", fix: "Headless CMS set up with easy-to-use content models." },
  { prob: "Missing features themes include", fix: "Feature checklist reviewed before building." },
  { prob: <><a href="/digital-marketing/technical-seo-audit">SEO gaps</a> on custom front ends</>, fix: "Server rendering, metadata, and sitemaps built in." },
  { prob: "Too many tools to manage", fix: "Lean stack with only what’s needed." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SHIELD_CHECK, text: "Headless fit assessment" },
  { icon: ICON_GRID4, text: "Technical architecture plan" },
  { icon: ICON_BAG, text: "Commerce platform setup or connection" },
  { icon: ICON_DOC, text: "Headless CMS setup and content models" },
  { icon: ICON_WINDOW, text: "Front-end design and development" },
  { icon: ICON_SEARCH, text: "Search, cart, and checkout flows" },
  { icon: ICON_TREND, text: "SEO and performance foundations" },
  { icon: ICON_SHIELD, text: "Hosting and deployment setup" },
  { icon: ICON_SHIELD_CHECK, text: "Testing, launch, and support plan" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_BAG, text: <><strong>Established brands</strong> that have outgrown theme-based stores.</> },
  { icon: ICON_DOC, text: <><strong>Content-led brands</strong> blending storytelling with shopping.</>, delay: 60 },
  { icon: ICON_GLOBE_HALF, text: <><strong>Companies with multiple channels</strong> or storefronts.</>, delay: 120 },
  { icon: ICON_CODE, text: <><strong>Teams with development support</strong> in-house or through a partner.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does headless commerce development cost?", a: <>Headless projects are usually larger than theme builds, and costs depend on scope and stack. <strong>We share pricing after the fit assessment.</strong></> },
  { q: "Do we still use Shopify or BigCommerce?", a: <>Usually, yes. <strong>They handle products, carts, checkout, and orders</strong> while the front end is custom built.</> },
  { q: "Is headless better for SEO?", a: <>It can be when built well, but it needs careful setup. <strong>We include SEO foundations in every build.</strong></> },
  { q: "Can our team still edit content?", a: <>Yes. <strong>A headless CMS gives editors a friendly way to manage pages and content.</strong></> },
  { q: "Will you tell us if we don’t need headless?", a: <>Yes. <strong>If a <a href="/website-development/ecommerce">theme-based build</a> fits better, we’ll say so.</strong> The fit assessment comes first.</> },
  { q: "How long does a headless build take?", a: <>Longer than a theme build, since the front end is custom. <strong>We share a realistic timeline after the architecture plan.</strong></> },
];

export default function HeadlessCommerceView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="hdc-hero"
        line1="Custom shopping experiences,"
        line2={
          <>
            powered by a proven commerce <span className="grad-text">engine.</span>
          </>
        }
        lead={
          <>
            Headless storefronts built with modern frameworks and connected to Shopify, BigCommerce, or another commerce
            platform through APIs, <strong>with honest advice on whether you need it.</strong>
          </>
        }
        primary={{ label: "Book a headless commerce call", href: "/contact" }}
        secondary={{ label: "Is headless right for you? ↓", href: "#fit" }}
      >
        <HeadlessSplitCard />
      </ServiceDetailHero>

      <TrustBar items={["Custom front-end experience", "Commerce platform stays in charge", "Content in a headless CMS", "Honest advice on whether you need it"]} />

      {/* WHAT IT MEANS (dark + glance) */}
      <section className="band dark hdc-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What headless means</span>
            <h2>Separating the shopping experience from the commerce engine.</h2>
          </Reveal>
          <Reveal className="hdc-glance">
            <div className="gtxt">
              <p>
                In a traditional store, the design and the commerce system are <strong>tied together in one platform.</strong>
              </p>
              <p>
                Headless separates them. Your storefront is built as its own application, while products, carts, and orders
                still run on your commerce platform.
              </p>
              <p>
                This gives more design and content freedom, but it also{" "}
                <strong>adds complexity and needs ongoing development support.</strong>
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

      {/* STACK */}
      <section className="band tint hdc-sec" id="stack">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it fits together</span>
            <h2>How a headless stack fits together.</h2>
            <p>Each layer has its own job, connected through APIs.</p>
          </Reveal>
          <Reveal className="hdc-stack">
            <div className="hdc-stack-head">Shoppers on web and mobile</div>
            <div className="hdc-stack-conn" aria-hidden="true">
              ↕ &nbsp; ↕ &nbsp; ↕ &nbsp; ↕
            </div>
            <div className="hdc-stack-layers">
              {LAYERS.map((layer) => (
                <article className="hdc-sl" key={layer.title}>
                  <div className="sli">{layer.icon}</div>
                  <h3>{layer.title}</h3>
                  <span className="slk">{layer.kicker}</span>
                  <ul>
                    {layer.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal as="p" className="hdc-stack-note">
            A headless stack is modular: each layer connects through APIs and can be swapped without rebuilding everything.
          </Reveal>
        </div>
      </section>

      {/* FIT */}
      <section className="band hdc-sec" id="fit">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">When it fits</span>
            <h2>Headless isn’t the right choice for every store.</h2>
          </Reveal>
          <Reveal className="hdc-fit-grid">
            <article className="hdc-fit no">
              <h3>
                <span className="fh">{ICON_X_THIN}</span>Probably not yet
              </h3>
              <ul>
                {FIT_NO.map((item) => (
                  <li key={item}>
                    <span className="m">{ICON_X}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="hdc-fit yes">
              <h3>
                <span className="fh">{ICON_CHECK}</span>Often a good fit
              </h3>
              <ul>
                {FIT_YES.map((item) => (
                  <li key={item}>
                    <span className="m">{ICON_CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* UNLOCK */}
      <section className="band tint hdc-sec" id="unlock">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What headless can unlock</span>
            <h2>Common reasons brands move to headless.</h2>
          </Reveal>
          <UnlockGrid />
        </div>
      </section>

      {/* BUILD */}
      <section className="band hdc-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we build</span>
            <h2>A structured process for a more technical project.</h2>
          </Reveal>
          <Reveal className="hdc-oc-list">
            {STEPS.map((step) => (
              <article className="hdc-oc" key={step.no}>
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

      {/* RISKS */}
      <section className="band tint hdc-sec" id="risks">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Risks we plan for</span>
            <h2>Headless risks we plan for.</h2>
          </Reveal>
          <Reveal className="hdc-fix-tbl">
            <div className="hdc-fix-row head">
              <div>Common risk</div>
              <div>How we reduce it</div>
            </div>
            {RISKS.map((row) => (
              <div className="hdc-fix-row" key={row.fix}>
                <div className="prob">
                  <span className="xi">{ICON_X_THIN}</span>
                  <span>{row.prob}</span>
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
      <section className="band hdc-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From fit assessment to launch and support.</h2>
          </Reveal>
          <Reveal className="hdc-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="hdc-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint hdc-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Build the shopping experience your brand deserves.</h2>
          </Reveal>
          <div className="hdc-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="hdc-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every project." />

      <CtaBand
        id="start"
        eyebrow="Headless Commerce Development"
        heading="Build the shopping experience your brand deserves."
        copy={
          <>
            Book a free call to find out if headless is right for you:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              we’ll review your goals, team, and current platform, and give an honest recommendation.
            </strong>
          </>
        }
        primaryLabel="Book a headless commerce call"
        primaryHref="/contact"
        secondary={{ label: "Is headless right for you?", href: "#fit", arrow: "↗" }}
      />
    </>
  );
}
