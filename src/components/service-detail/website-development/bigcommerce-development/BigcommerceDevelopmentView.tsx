"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./bcd-page.css";

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
const ICON_BACKOFFICE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_MEGAPHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l14-6v14L3 13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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
const ICON_PENCIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 16l2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_MIGRATE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* -------- hero: scrambled gradient word ("selling.") -------- */

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

/* -------- hero signature: store hub card -------- */

const CONNECTORS: { icon: ReactNode; name: string; sub: string }[] = [
  { icon: ICON_STOREFRONT, name: "Storefront", sub: "Theme · headless" },
  { icon: ICON_LINES, name: "Catalog", sub: "Products · price lists" },
  { icon: ICON_BACKOFFICE, name: "Back office", sub: "ERP · inventory" },
  { icon: ICON_MEGAPHONE, name: "Marketing", sub: "Email · feeds" },
];

function StoreHubCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the core and connector tiles are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A BigCommerce store connected to business systems"
      className={`bcd-card${run ? " run" : ""}`}
      live="Store hub"
      corner="CONNECTED SYSTEMS"
      footLeft="One store, every system"
      footRight="more built in →"
    >
      <div className="bcd-hub">
        <div className="bcd-core">
          <b>Your BigCommerce store</b>
          <small>At the center</small>
        </div>
        <div className="bcd-conns">
          {CONNECTORS.map((c) => (
            <div className="bcd-cn" key={c.name}>
              <span className="bci">{c.icon}</span>
              <span>
                <b>{c.name}</b>
                <small>{c.sub}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark) -------- */

const GLANCE = ["Hosted and secure", "Many native features", "Strong for B2B and wholesale", "Multi-storefront support", "Headless-ready"];

/* -------- 6 services -------- */

const SERVICES: { icon: ReactNode; title: ReactNode; text: string }[] = [
  { icon: ICON_STOREFRONT, title: "Store setup", text: "Settings, payments, shipping, and launch preparation." },
  { icon: ICON_PENCIL, title: "Stencil theme development", text: "Custom or customized themes built for your brand." },
  { icon: ICON_LIST_CHECK, title: "B2B and wholesale", text: "Customer groups, price lists, and quote workflows." },
  { icon: ICON_GRID4, title: "Multi-storefront", text: "Several storefronts managed from one account." },
  { icon: ICON_LINK, title: "Integrations", text: "ERP, inventory, shipping, and marketing tools." },
  { icon: ICON_MIGRATE, title: <a href="/website-development/website-redesign-migration">Migrations</a>, text: "Moving from Magento, WooCommerce, Shopify, and others." },
];

function ServicesGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="bcd-sv6-grid">
        {SERVICES.map((card, i) => (
          <article className="bcd-sv6" key={i} data-tilt>
            <span className="bcd-sv6-spot"></span>
            <div className="s6i">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- selling models table -------- */

const MODELS: { need: string; how: string; set: string }[] = [
  { need: "Direct-to-consumer", how: "Standard storefront and checkout", set: "Brand-focused theme and product pages" },
  { need: "Wholesale pricing", how: "Customer groups and price lists", set: "Pricing rules by customer type" },
  { need: "B2B buying", how: "B2B features for accounts and quotes", set: "Company accounts and quote requests" },
  { need: "Multiple brands or regions", how: "Multi-storefront from one account", set: "Separate storefronts with shared catalog" },
];

/* -------- connection hub -------- */

const HUB: { icon: ReactNode; title: string; items: ReactNode[] }[] = [
  { icon: ICON_STOREFRONT, title: "Storefront", items: ["Stencil theme", <a href="/website-development/headless-commerce" key="headless">Headless option</a>, "Multiple storefronts"] },
  { icon: ICON_LINES, title: "Catalog", items: ["Products and variants", "Price lists", "Customer groups"] },
  { icon: ICON_BACKOFFICE, title: "Back office", items: ["ERP", "Inventory", "Accounting"] },
  { icon: ICON_MEGAPHONE, title: "Marketing", items: ["Email", "Reviews", "Product feeds"] },
];

/* -------- process (5) -------- */

const STEPS: { no: string; title: string; text: string; out: string }[] = [
  { no: "1", title: "Discovery", text: "Catalog, customer types, systems, and must-have features.", out: "Requirements and scope" },
  { no: "2", title: "Architecture", text: "Storefronts, integrations, and data flow planned.", out: "Technical plan" },
  { no: "3", title: "Design and build", text: "Theme designed and developed on a sandbox store.", out: "Working sandbox store" },
  { no: "4", title: "Integrations and data", text: "Systems connected and data migrated.", out: "Connected, tested store" },
  { no: "5", title: "Launch", text: "Final testing, redirects, and go-live support.", out: "Live store and handoff" },
];

/* -------- problems -> fixes (6) -------- */

const PROBLEMS: { prob: ReactNode; fix: string }[] = [
  { prob: "Theme doesn’t match the brand", fix: "Custom or customized Stencil theme." },
  { prob: "Manual order and inventory work", fix: "ERP and inventory integrations." },
  { prob: "Wholesale handled outside the store", fix: "Customer groups and price lists set up." },
  { prob: "Duplicate work across brands", fix: "Multi-storefront from one account." },
  { prob: <a href="/website-development/website-redesign-migration">Lost SEO after migration</a>, fix: "URL mapping and redirects planned early." },
  { prob: "Underused native features", fix: "Features reviewed and put to work." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Discovery and requirements" },
  { icon: ICON_GRID4, text: "Store and storefront architecture" },
  { icon: ICON_PENCIL, text: "Stencil theme design and development" },
  { icon: ICON_LIST_CHECK, text: "B2B and wholesale configuration" },
  { icon: ICON_GRID4, text: "Multi-storefront setup (if needed)" },
  { icon: ICON_LINK, text: "System integrations" },
  { icon: ICON_MIGRATE, text: "Data migration and redirects" },
  { icon: ICON_SHIELD_CHECK, text: "Testing and launch support" },
  { icon: ICON_CAP, text: "Team training" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_LINES, text: <><strong>Brands with large catalogs</strong> and many product variants.</> },
  { icon: ICON_LIST_CHECK, text: <><strong>B2B and wholesale sellers</strong> needing pricing by customer group.</>, delay: 60 },
  { icon: ICON_GLOBE, text: <><strong>Companies with multiple brands or regions</strong> on one platform.</>, delay: 120 },
  { icon: ICON_MIGRATE, text: <><strong>Merchants moving from Magento</strong> or other platforms.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does BigCommerce development cost?", a: <>It depends on theme work, integrations, B2B needs, and migration scope. <strong>We share pricing on the free call.</strong></> },
  { q: "Is BigCommerce good for B2B?", a: <>It offers B2B features like <strong>customer groups, price lists, and quote workflows</strong> that suit many wholesale businesses.</> },
  { q: "Can BigCommerce run headless?", a: <>Yes. BigCommerce can power a <a href="/website-development/headless-commerce">headless front end</a>. <strong>We’ll advise whether that’s worth it for you.</strong></> },
  { q: "Can you migrate us from Magento?", a: <>Yes. We plan <strong>data migration, redirects, and integrations</strong> to keep the move smooth.</> },
  { q: "Do I own my store?", a: <>Yes. The store is in <strong>your BigCommerce account,</strong> and your subscription is paid directly to BigCommerce.</> },
  { q: "How long does a BigCommerce build take?", a: <>It depends on catalog size, integrations, and B2B needs. <strong>We share a timeline after the architecture plan.</strong></> },
];

export default function BigcommerceDevelopmentView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="bcd-hero"
        line1="BigCommerce stores built for growing"
        line2={
          <>
            catalogs and complex <ScrambleWord text="selling." />
          </>
        }
        lead={
          <>
            Custom BigCommerce themes, multi-storefront setups, B2B features, and integrations,{" "}
            <strong>for brands that need more built in.</strong>
          </>
        }
        primary={{ label: "Book a BigCommerce call", href: "/contact" }}
        secondary={{ label: "See what we build ↓", href: "#services" }}
      >
        <StoreHubCard />
      </ServiceDetailHero>

      <TrustBar items={["Custom Stencil themes", "B2B and wholesale features", "Multi-storefront setups", "ERP and system integrations"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark bcd-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why choose BigCommerce</span>
            <h2>A hosted platform with many features built in.</h2>
          </Reveal>
          <Reveal className="bcd-glance">
            <div className="gtxt">
              <p>
                BigCommerce is a hosted platform with many features included out of the box,{" "}
                <strong>which can mean fewer apps to manage.</strong>
              </p>
              <p>It’s often a strong fit for larger catalogs, B2B or wholesale selling, and brands running more than one storefront.</p>
              <p>
                We build BigCommerce stores that <strong>use these features well and connect cleanly to your other systems.</strong>
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
      <section className="band tint bcd-sec" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we offer</span>
            <h2>From theme work to complex integrations.</h2>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      {/* B2C / B2B / BOTH */}
      <section className="band bcd-sec" id="models">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">B2C, B2B, or both</span>
            <h2>BigCommerce can support different selling models.</h2>
          </Reveal>
          <Reveal className="bcd-md-tbl">
            <div className="bcd-md-row head">
              <div>Need</div>
              <div>How BigCommerce supports it</div>
              <div>What we set up</div>
            </div>
            {MODELS.map((row) => (
              <div className="bcd-md-row" key={row.need}>
                <div>{row.need}</div>
                <div>{row.how}</div>
                <div className="set">{row.set}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONNECTION HUB */}
      <section className="band tint bcd-sec" id="connects">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it connects</span>
            <h2>Your store at the center of your business systems.</h2>
          </Reveal>
          <Reveal className="bcd-hubd" threshold={0.15}>
            <div className="bcd-hubd-core">Your BigCommerce Store</div>
            <div className="bcd-hubd-conn" aria-hidden="true">
              {"↕   ↕   ↕   ↕"}
            </div>
            <div className="bcd-hubd-grid">
              {HUB.map((card) => (
                <article className="bcd-hc2" key={card.title}>
                  <div className="hci">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <span className="hck">Includes</span>
                  <ul>
                    {card.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BUILD */}
      <section className="band bcd-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we build</span>
            <h2>A structured process for more complex projects.</h2>
          </Reveal>
          <Reveal className="bcd-oc-list">
            {STEPS.map((step) => (
              <article className="bcd-oc" key={step.no}>
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
      <section className="band tint bcd-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common BigCommerce problems.</h2>
          </Reveal>
          <Reveal className="bcd-fix-tbl">
            <div className="bcd-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {PROBLEMS.map((row) => (
              <div className="bcd-fix-row" key={row.fix}>
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
      <section className="band bcd-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From discovery to team training.</h2>
          </Reveal>
          <Reveal className="bcd-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="bcd-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint bcd-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Build a BigCommerce store that scales with you.</h2>
          </Reveal>
          <div className="bcd-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="bcd-who" key={i} style={d(item.delay ?? 0)}>
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
        eyebrow="BigCommerce Development"
        heading="Build a BigCommerce store that scales with you."
        copy={
          <>
            Book a free call about your BigCommerce project:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your catalog, customers, and systems.</strong>
          </>
        }
        primaryLabel="Book a BigCommerce call"
        primaryHref="/contact"
        secondary={{ label: "See what we build", href: "#services", arrow: "↗" }}
      />
    </>
  );
}
