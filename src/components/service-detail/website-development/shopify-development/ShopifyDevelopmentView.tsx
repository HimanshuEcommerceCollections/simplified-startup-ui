"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./shd-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_STOREFRONT = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PENCIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_MIGRATE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_NAV = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_CHART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_INFO = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const WOO_HREF = "/website-development/woocommerce-development";
const MIGRATION_HREF = "/website-development/website-redesign-migration";

/* -------- hero: scrambled gradient word ("you.") -------- */

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

/* -------- hero signature: store blocks hub -------- */

const BLOCKS: { icon: ReactNode; name: string; items: string[] }[] = [
  { icon: ICON_STOREFRONT, name: "Theme", items: ["Sections & blocks", "Brand styles"] },
  { icon: ICON_LINES, name: "Catalog", items: ["Products", "Collections"] },
  { icon: ICON_LINK, name: "Apps", items: ["Reviews", "Email & SMS"] },
  { icon: ICON_DOLLAR, name: "Operations", items: ["Payments", "Shipping & tax"] },
];

function StoreBlocksCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the core and block tiles are shown in their end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="The building blocks of a Shopify store"
      className={`shd-card${run ? " run" : ""}`}
      live="Store blocks"
      corner="YOU MANAGE IT"
      footLeft="Sharp, fast, easy to run"
      footRight="no developer needed →"
    >
      <div className="shd-hub">
        <div className="shd-core">
          <b>Your Shopify store</b>
          <small>Hosted &amp; secure</small>
        </div>
        <div className="shd-blocks">
          {BLOCKS.map((b) => (
            <div className="shd-shb" key={b.name}>
              <div className="shh">
                <span className="shi">{b.icon}</span>
                <b>{b.name}</b>
              </div>
              <ul>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark) -------- */

const GLANCE = ["Hosted and secure", "Built-in checkout", "Large app ecosystem", "Online Store 2.0 sections", "Scales to Shopify Plus"];

/* -------- 6 services -------- */

const SERVICES: { icon: ReactNode; title: ReactNode; text: ReactNode }[] = [
  { icon: ICON_BAG, title: "New store setup", text: "Store settings, payments, shipping, taxes, and launch checklist." },
  { icon: ICON_PENCIL, title: "Custom theme design", text: "A theme designed and built for your brand from scratch." },
  { icon: ICON_CODE, title: "Theme customization", text: "Changes to an existing theme to fit your needs." },
  { icon: ICON_LINK, title: "App integrations", text: "Reviews, subscriptions, loyalty, email, and more." },
  {
    icon: ICON_MIGRATE,
    title: <a href={MIGRATION_HREF}>Store migration</a>,
    text: (
      <>
        Moving from <a href={WOO_HREF}>WooCommerce</a>, <a href="/website-development/bigcommerce-development">BigCommerce</a>, or another platform.
      </>
    ),
  },
  { icon: ICON_BOLT, title: "Speed and cleanup", text: "Removing unused apps and code that slow your store down." },
];

function ServicesGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="shd-sv6-grid">
        {SERVICES.map((card, i) => (
          <article className="shd-sv6" key={i} data-tilt>
            <span className="shd-sv6-spot"></span>
            <div className="s6i">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- theme approach table -------- */

const APPROACHES: { name: string; good: string; mind: string }[] = [
  { name: "Premium theme, customized", good: "Faster launches with a proven base", mind: "Some layouts may be limited by the theme" },
  { name: "Custom theme", good: "Unique brand experience and full control", mind: "Takes longer to design and build" },
  { name: "Theme refresh", good: "Updating an older store without starting over", mind: "Older themes may need bigger changes" },
];

/* -------- blocks hub -------- */

const HUB: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_STOREFRONT, title: "Theme", items: ["Sections and blocks", "Templates", "Brand styles"] },
  { icon: ICON_LINES, title: "Catalog", items: ["Products and variants", "Collections", "Metafields"] },
  { icon: ICON_LINK, title: "Apps", items: ["Reviews", "Subscriptions", "Email and SMS"] },
  { icon: ICON_DOLLAR, title: "Operations", items: ["Payments", "Shipping", "Taxes and markets"] },
];

/* -------- process (5) -------- */

const STEPS: { no: string; title: string; text: string; out: string }[] = [
  { no: "1", title: "Discovery", text: "We learn your products, customers, and must-have features.", out: "Project scope and sitemap" },
  { no: "2", title: "Design", text: "Page designs for home, collections, products, and key pages.", out: "Approved designs" },
  { no: "3", title: "Build", text: "Theme development with editable sections for your team.", out: "Working development theme" },
  { no: "4", title: "Setup and content", text: "Products, apps, payments, and shipping configured.", out: "Store ready for testing" },
  { no: "5", title: "Test and launch", text: "Testing on mobile and desktop, then a careful launch.", out: "Live store and handoff" },
];

/* -------- essentials (8) -------- */

const ESSENTIALS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_BOLT, title: "Fast-loading pages", text: "Optimized images and only the apps you need." },
  { icon: ICON_NAV, title: "Clear navigation", text: "Easy for shoppers to find products." },
  { icon: ICON_PAGE, title: "Strong product pages", text: "Images, details, reviews, and clear add-to-cart." },
  { icon: ICON_PHONE, title: "Mobile-first design", text: "Built for shoppers on phones." },
  { icon: ICON_GRID4, title: "Editable sections", text: "Your team can update content without code." },
  { icon: ICON_CHART, title: "SEO basics", text: "Clean titles, URLs, and structured data." },
  { icon: ICON_INFO, title: "Accessible design", text: "Readable text, contrast, and alt text." },
  { icon: ICON_CHART, title: "Analytics connected", text: "Tracking set up for sales and behavior." },
];

/* -------- problems -> fixes (6) -------- */

const PROBLEMS: { prob: ReactNode; fix: string }[] = [
  { prob: "Too many apps slowing the store", fix: "Apps reviewed and unused ones removed." },
  { prob: "Theme hard to edit", fix: "Rebuilt with flexible sections and blocks." },
  { prob: "Messy product data", fix: "Products, variants, and collections organized." },
  { prob: "Poor mobile layout", fix: "Templates redesigned for mobile shoppers." },
  { prob: "Leftover code from old apps", fix: "Old code cleaned out of the theme." },
  { prob: <a href={MIGRATION_HREF}>Lost SEO after migration</a>, fix: "Redirects and URLs mapped before launch." },
];

/* -------- included (10) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Discovery and project planning" },
  { icon: ICON_STOREFRONT, text: "Store design for key templates" },
  { icon: ICON_PENCIL, text: "Theme build or customization" },
  { icon: ICON_GRID4, text: "Online Store 2.0 sections for easy editing" },
  { icon: ICON_LINK, text: "App selection and setup" },
  { icon: ICON_DOLLAR, text: "Payments, shipping, and tax setup" },
  { icon: ICON_LINES, text: "Product and collection setup support" },
  { icon: ICON_CHART, text: "SEO basics and redirects" },
  { icon: ICON_SHIELD_CHECK, text: "Testing on mobile and desktop" },
  { icon: ICON_CAP, text: "Launch support and team training" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  {
    icon: ICON_BAG,
    text: (
      <>
        <strong>New brands</strong> launching their <a href="/website-development/ecommerce">first online store</a>.
      </>
    ),
  },
  { icon: ICON_CHART, text: <><strong>Growing stores</strong> that have outgrown their current theme.</>, delay: 60 },
  {
    icon: ICON_MIGRATE,
    text: (
      <>
        <strong>Businesses moving</strong> from <a href={WOO_HREF}>WooCommerce</a> or BigCommerce.
      </>
    ),
    delay: 120,
  },
  { icon: ICON_STAR, text: <><strong>Shopify Plus merchants</strong> needing custom features.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  {
    q: "How much does Shopify development cost?",
    a: <>It depends on whether you need a custom theme, theme customization, or a migration, plus integrations. <strong>We share pricing on the free call.</strong></>,
  },
  { q: "Do I own my Shopify store?", a: <>Yes. The store is in <strong>your Shopify account,</strong> and your subscription is paid directly to Shopify.</> },
  {
    q: "Can you migrate my store to Shopify?",
    a: (
      <>
        Yes. We <a href={MIGRATION_HREF}>move products, customers, and order history</a> where possible, and <strong>set up redirects to protect your SEO.</strong>
      </>
    ),
  },
  { q: "Will I be able to update the store myself?", a: <>Yes. We build with <strong>editable sections and provide training</strong> so your team can manage content.</> },
  { q: "Do you work with Shopify Plus?", a: <>Yes. We can help with <strong>Plus features and more advanced customizations.</strong></> },
  {
    q: "How long does a Shopify build take?",
    a: <>It depends on whether it’s a customized premium theme or a fully custom build. <strong>We share a timeline after discovery.</strong></>,
  },
];

export default function ShopifyDevelopmentView() {
  return (
    <div className="shd-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="shd-hero"
        line1="Shopify stores built to look sharp,"
        line2={
          <>
            load fast, and grow with <ScrambleWord text="you." />
          </>
        }
        lead={
          <>
            Shopify setup, custom themes, app integrations, and migrations,{" "}
            <strong>built so your team can manage products and content without calling a developer.</strong>
          </>
        }
        primary={{ label: "Book a Shopify call", href: "/contact" }}
        secondary={{ label: "See what we build ↓", href: "#services" }}
      >
        <StoreBlocksCard />
      </ServiceDetailHero>

      <TrustBar items={["Custom or customized themes", "Editable sections for your team", "Apps chosen with care", "Migration from other platforms"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark shd-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why brands choose Shopify</span>
            <h2>A hosted platform that handles the hard parts of running a store.</h2>
          </Reveal>
          <Reveal className="shd-glance">
            <div className="gtxt">
              <p>
                Shopify takes care of hosting, security, checkout, and updates, <strong>so you can focus on products and customers.</strong>
              </p>
              <p>Its theme system and app ecosystem make it flexible, but the right setup still matters for speed and ease of use.</p>
              <p>
                We build Shopify stores that <strong>look on-brand, stay fast, and are easy for your team to run day to day.</strong>
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

      {/* SERVICES */}
      <section className="band tint shd-sec" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we offer</span>
            <h2>Pick one service or combine them into a full project.</h2>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      {/* APPROACH */}
      <section className="band shd-sec" id="approach">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Choosing the right theme approach</span>
            <h2>There’s no single right answer. It depends on your brand, budget, and timeline.</h2>
          </Reveal>
          <Reveal className="shd-ap-tbl">
            <div className="shd-ap-row head">
              <div>Approach</div>
              <div>Good for</div>
              <div>Keep in mind</div>
            </div>
            {APPROACHES.map((row) => (
              <div className="shd-ap-row" key={row.name}>
                <div>{row.name}</div>
                <div>
                  <span className="vi">{ICON_CHECK}</span>
                  {row.good}
                </div>
                <div>
                  <span className="wi2">{ICON_WARN}</span>
                  {row.mind}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BLOCKS HUB */}
      <section className="band tint shd-sec" id="blocks">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it fits together</span>
            <h2>The main building blocks of your store.</h2>
          </Reveal>
          <Reveal className="shd-hubd" threshold={0.15}>
            <div className="shd-hubd-core">Your Shopify Store</div>
            <div className="shd-hubd-conn" aria-hidden="true">
              {"↓   ↓   ↓   ↓"}
            </div>
            <div className="shd-hubd-grid">
              {HUB.map((card) => (
                <article className="shd-hc2" key={card.title}>
                  <div className="hci">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <span className="hck">Includes</span>
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

      {/* BUILD */}
      <section className="band shd-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we build</span>
            <h2>A clear process from planning to launch.</h2>
          </Reveal>
          <Reveal className="shd-oc-list">
            {STEPS.map((step) => (
              <article className="shd-oc" key={step.no}>
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

      {/* ESSENTIALS */}
      <section className="band tint shd-sec" id="essentials">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What makes a great store</span>
            <h2>Every store we build is checked against these essentials.</h2>
          </Reveal>
          <Reveal className="shd-es-grid">
            {ESSENTIALS.map((item) => (
              <article className="shd-es" key={item.title}>
                <span className="esc">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="band shd-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common Shopify store problems.</h2>
          </Reveal>
          <Reveal className="shd-fix-tbl">
            <div className="shd-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {PROBLEMS.map((row) => (
              <div className="shd-fix-row" key={row.fix}>
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
      <section className="band tint shd-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From discovery to launch and team training.</h2>
          </Reveal>
          <Reveal className="shd-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="shd-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band shd-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Build a Shopify store that’s ready to grow.</h2>
          </Reveal>
          <div className="shd-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="shd-who" key={i} style={d(item.delay ?? 0)}>
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
        eyebrow="Shopify Development"
        heading="Build a Shopify store that’s ready to grow."
        copy={
          <>
            Book a free call to talk through your store plans:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your products, goals, and current setup.</strong>
          </>
        }
        primaryLabel="Book a Shopify call"
        primaryHref="/contact"
        secondary={{ label: "See what we build", href: "#services", arrow: "↗" }}
      />
    </div>
  );
}
