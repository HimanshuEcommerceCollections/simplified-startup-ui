"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./wcd-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_SERVER = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M7 7h.01M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SERVER_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_WP = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9l4 8 2-5 3 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PENCIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_MIGRATE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_CAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WP_HREF = "/website-development/wordpress-development";
const SHOPIFY_HREF = "/website-development/shopify-development";
const MIGRATION_HREF = "/website-development/website-redesign-migration";

/* -------- hero: scrambled gradient word ("customize.") -------- */

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

/* -------- hero signature: store stack card -------- */

const LAYERS: { icon: ReactNode; name: string; sub: string; woo?: boolean }[] = [
  { icon: ICON_SERVER, name: "Hosting", sub: "Managed host · CDN · backups" },
  { icon: ICON_WP, name: "WordPress", sub: "Theme · block editor · blog" },
  { icon: ICON_BAG, name: "WooCommerce", sub: "Products · cart · checkout · orders", woo: true },
  { icon: ICON_LINK, name: "Plugins", sub: "Payments · subscriptions · SEO" },
];

function StoreStackCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: every layer is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="The layers of a WooCommerce store"
      className={`wcd-card${run ? " run" : ""}`}
      live="Store stack"
      corner="YOU OWN EVERY FILE"
      footLeft="Your code, your data, your host"
      footRight="full control →"
    >
      <div className="wcd-stack">
        {LAYERS.map((layer, i) => (
          <div className={`wcd-wl${layer.woo ? " woo" : ""}`} key={layer.name}>
            <span className="wli">{layer.icon}</span>
            <span className="wln">
              <b>{layer.name}</b>
              <small>{layer.sub}</small>
            </span>
            <span className="lyr">Layer {i + 1}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark) -------- */

const GLANCE = ["Open source and flexible", "Content and commerce together", "Large plugin ecosystem", "You choose your hosting", "Needs ongoing maintenance"];

/* -------- woo vs hosted -------- */

const COMPARE: { k: string; woo: string; host: string }[] = [
  { k: "Ownership", woo: "You own code, data, and hosting", host: "Platform manages hosting and core code" },
  { k: "Flexibility", woo: "Very high, with custom code and plugins", host: "High within platform limits" },
  { k: "Maintenance", woo: "Updates, backups, and security needed", host: "Mostly handled by the platform" },
  { k: "Content", woo: "Strong, thanks to WordPress", host: "Good, with fewer content tools" },
  { k: "Best for", woo: "Content-rich or highly custom stores", host: "Teams wanting less upkeep" },
];

/* -------- stack layers -------- */

const STACK: { icon: ReactNode; title: ReactNode; key: string; items: string[] }[] = [
  { icon: ICON_SERVER, key: "hosting", title: "Hosting", items: ["Managed WordPress host", "Caching and CDN", "Backups"] },
  { icon: ICON_WP, key: "wordpress", title: <a href={WP_HREF}>WordPress</a>, items: ["Theme", "Block editor", "Pages and blog"] },
  { icon: ICON_BAG, key: "woocommerce", title: "WooCommerce", items: ["Products", "Cart and checkout", "Orders"] },
  { icon: ICON_LINK, key: "plugins", title: "Plugins", items: ["Payments", "Subscriptions", "SEO and email"] },
];

/* -------- 6 services -------- */

const SERVICES: { icon: ReactNode; title: ReactNode; text: string }[] = [
  { icon: ICON_BAG, title: <a href="/website-development/ecommerce">New store builds</a>, text: "Custom WooCommerce stores designed around your brand." },
  { icon: ICON_PENCIL, title: "Custom themes", text: "Lightweight themes built for speed and editing." },
  { icon: ICON_LINK, title: "Plugin integrations", text: "Payments, subscriptions, bookings, and more." },
  { icon: ICON_BOLT, title: "Performance tuning", text: "Caching, image optimization, and database cleanup." },
  { icon: ICON_MIGRATE, title: <a href={MIGRATION_HREF}>Migrations</a>, text: "Moving to or from WooCommerce with care." },
  { icon: ICON_SHIELD_CHECK, title: "Care plans", text: "Updates, backups, monitoring, and fixes." },
];

function ServicesGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="wcd-sv6-grid">
        {SERVICES.map((card, i) => (
          <article className="wcd-sv6" key={i} data-tilt>
            <span className="wcd-sv6-spot"></span>
            <div className="s6i">{card.icon}</div>
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
  { no: "1", title: "Plan", text: "Products, features, plugins, and hosting needs.", out: "Project scope" },
  { no: "2", title: "Design", text: "Key pages designed for desktop and mobile.", out: "Approved designs" },
  { no: "3", title: "Build", text: "Theme and store built on a staging site.", out: "Working staging store" },
  { no: "4", title: "Test", text: "Checkout, payments, emails, and speed tested.", out: "Launch-ready store" },
  { no: "5", title: "Launch and care", text: "Go live, then ongoing updates and monitoring.", out: "Live store and care plan" },
];

/* -------- health (3 care cards) -------- */

const CARE: { icon: ReactNode; title: string; items: ReactNode[] }[] = [
  { icon: ICON_REFRESH, title: "Updates", items: [<a href={WP_HREF} key="core">WordPress core</a>, "WooCommerce", "Themes and plugins"] },
  { icon: ICON_SHIELD, title: "Protection", items: ["Daily backups", "Security monitoring", "Firewall and malware checks"] },
  { icon: ICON_BOLT, title: "Performance", items: ["Uptime monitoring", "Speed checks", "Database cleanup"] },
];

/* -------- problems -> fixes (6) -------- */

const PROBLEMS: { prob: string; fix: string }[] = [
  { prob: "Slow pages and checkout", fix: "Better hosting, caching, and fewer heavy plugins." },
  { prob: "Plugin conflicts after updates", fix: "Updates tested on staging first." },
  { prob: "Security worries", fix: "Firewall, monitoring, and regular updates." },
  { prob: "Too many plugins", fix: "Plugins reviewed and replaced where possible." },
  { prob: "Hard-to-edit pages", fix: "Block-based layouts your team can update." },
  { prob: "No backups", fix: "Automatic backups with restore testing." },
];

/* -------- included (10) -------- */

const INCLUDED: { icon: ReactNode; key: string; text: ReactNode }[] = [
  { icon: ICON_SEARCH, key: "discovery", text: "Discovery and platform planning" },
  { icon: ICON_SERVER_PLAIN, key: "hosting", text: "Hosting recommendations and setup" },
  { icon: ICON_PENCIL, key: "theme", text: <>Custom or customized <a href={WP_HREF}>WordPress theme</a></> },
  { icon: ICON_BAG, key: "setup", text: "WooCommerce store setup" },
  { icon: ICON_DOLLAR, key: "payments", text: "Payment and shipping integrations" },
  { icon: ICON_LINK, key: "plugins", text: "Plugin selection and configuration" },
  { icon: ICON_BOLT, key: "speed", text: "Speed and security setup" },
  { icon: ICON_CHART, key: "seo", text: <>SEO basics and <a href={MIGRATION_HREF}>redirects</a></> },
  { icon: ICON_SHIELD_CHECK, key: "testing", text: "Testing and launch" },
  { icon: ICON_CAP, key: "training", text: "Training and optional care plan" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_DOC, text: <><strong>Content-driven brands</strong> that blog, teach, or publish often.</> },
  { icon: ICON_CODE, text: <><strong>Businesses with custom needs</strong> that hosted platforms can’t handle easily.</>, delay: 60 },
  {
    icon: ICON_WP,
    text: (
      <>
        <strong>
          Existing <a href={WP_HREF}>WordPress sites</a>
        </strong>{" "}
        adding a store.
      </>
    ),
    delay: 120,
  },
  { icon: ICON_BOLT, text: <><strong>Store owners frustrated</strong> with slow or unstable WooCommerce sites.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does WooCommerce development cost?", a: <>It depends on design, features, plugins, and hosting needs. <strong>We share pricing on the free call.</strong></> },
  { q: "Is WooCommerce free?", a: <>The core plugin is free, but <strong>hosting, premium plugins, themes, and maintenance have costs.</strong></> },
  { q: "Do you provide hosting?", a: <>We recommend and set up <strong>managed WordPress hosting in your name,</strong> so you stay in control.</> },
  { q: "Can you fix my existing WooCommerce store?", a: <>Yes. We review <strong>speed, plugins, and security,</strong> then fix the biggest issues first.</> },
  { q: "Do I need a care plan?", a: <>It’s strongly recommended. <strong>WooCommerce stores need regular updates, backups, and monitoring.</strong></> },
  {
    q: "Can we move from Shopify to WooCommerce?",
    a: (
      <>
        Yes. We plan{" "}
        <strong>
          product, customer, and <a href={MIGRATION_HREF}>order migration, plus redirects,</a>
        </strong>{" "}
        so the move keeps your SEO and data intact.
      </>
    ),
  },
];

export default function WoocommerceDevelopmentView() {
  return (
    <div className="wcd-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="wcd-hero"
        line1="WooCommerce stores with full"
        line2={
          <>
            control and room to <ScrambleWord text="customize." />
          </>
        }
        lead={
          <>
            Custom WooCommerce stores built on WordPress,{" "}
            <strong>with fast hosting, careful plugin choices, and ongoing care to keep everything running smoothly.</strong>
          </>
        }
        primary={{ label: "Book a WooCommerce call", href: "/contact" }}
        secondary={{ label: "See what we build ↓", href: "#services" }}
      >
        <StoreStackCard />
      </ServiceDetailHero>

      <TrustBar items={["Built on WordPress", "You own every file", "Plugins chosen with care", "Hosting and security planned"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark wcd-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why choose WooCommerce</span>
            <h2>Open-source e-commerce with complete flexibility.</h2>
          </Reveal>
          <Reveal className="wcd-glance">
            <div className="gtxt">
              <p>
                WooCommerce turns WordPress into a full online store. Because it’s open source, <strong>you control your code, data, and hosting.</strong>
              </p>
              <p>That flexibility is powerful for content-heavy stores and custom needs, but it also means hosting, updates, and security need planning.</p>
              <p>
                We build WooCommerce stores that are <strong>stable, fast, and easy for your team to manage.</strong>
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

      {/* VS HOSTED */}
      <section className="band tint wcd-sec" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">WooCommerce vs hosted</span>
            <h2>A general comparison to help you decide.</h2>
          </Reveal>
          <Reveal className="wcd-vx-tbl">
            <div className="wcd-vx-row head">
              <div></div>
              <div className="woo">WooCommerce</div>
              <div className="host">
                <span>
                  Hosted (e.g., <a href={SHOPIFY_HREF}>Shopify</a>)
                </span>
              </div>
            </div>
            {COMPARE.map((row) => (
              <div className="wcd-vx-row" key={row.k}>
                <div>{row.k}</div>
                <div className="woo">{row.woo}</div>
                <div className="host">{row.host}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STACK */}
      <section className="band wcd-sec" id="stack">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it fits together</span>
            <h2>The layers that make up your store.</h2>
          </Reveal>
          <Reveal className="wcd-hubd" threshold={0.15}>
            <div className="wcd-hubd-core">Your WooCommerce Store</div>
            <div className="wcd-hubd-conn" aria-hidden="true">
              {"↓   ↓   ↓   ↓"}
            </div>
            <div className="wcd-hubd-grid">
              {STACK.map((card) => (
                <article className="wcd-hc2" key={card.key}>
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

      {/* SERVICES */}
      <section className="band tint wcd-sec" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we offer</span>
            <h2>From new builds to ongoing care.</h2>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      {/* BUILD */}
      <section className="band wcd-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we build</span>
            <h2>A clear process from planning to launch.</h2>
          </Reveal>
          <Reveal className="wcd-oc-list">
            {STEPS.map((step) => (
              <article className="wcd-oc" key={step.no}>
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

      {/* HEALTH */}
      <section className="band tint wcd-sec" id="health">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Keeping your store healthy</span>
            <h2>WooCommerce stores need regular care. We plan it from day one.</h2>
          </Reveal>
          <Reveal className="wcd-cp-grid">
            {CARE.map((card) => (
              <article className="wcd-cp" key={card.title}>
                <h3>
                  <span className="cpi">{card.icon}</span>
                  {card.title}
                </h3>
                <ul>
                  {card.items.map((item, i) => (
                    <li key={i}>
                      <span className="ck">{ICON_TICK}</span>
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
      <section className="band wcd-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common WooCommerce problems.</h2>
          </Reveal>
          <Reveal className="wcd-fix-tbl">
            <div className="wcd-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {PROBLEMS.map((row) => (
              <div className="wcd-fix-row" key={row.fix}>
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
      <section className="band tint wcd-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From discovery to training and care.</h2>
          </Reveal>
          <Reveal className="wcd-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="wcd-inc2" key={item.key}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band wcd-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Build a WooCommerce store you fully control.</h2>
          </Reveal>
          <div className="wcd-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="wcd-who" key={i} style={d(item.delay ?? 0)}>
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
        eyebrow="WooCommerce Development"
        heading="Build a WooCommerce store you fully control."
        copy={
          <>
            Book a free call to plan your WooCommerce project:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your hosting, plugins, and setup.</strong>
          </>
        }
        primaryLabel="Book a WooCommerce call"
        primaryHref="/contact"
        secondary={{ label: "See what we build", href: "#services", arrow: "↗" }}
      />
    </div>
  );
}
