"use client";

import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  FeatureGrid,
  NoteCallout,
  PricingTiers,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./ecw-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_BARS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND_DOWN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 13l3 3 3-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
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
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- hero: scrambled gradient word ("sell.") -------- */

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

/* -------- hero signature: storefront mock (PDP → pay → funnel) -------- */

const PAY = ["Apple Pay", "Shop Pay", "Google Pay", "PayPal"];

type Funnel = { target: number; suffix?: string; label: string; delay: number; hl?: boolean };

const FUNNEL: Funnel[] = [
  { target: 1000, label: "Visitors", delay: 1400 },
  { target: 180, label: "Add to cart", delay: 1600 },
  { target: 3, suffix: "%", label: "Convert", delay: 1800, hl: true },
];

const fmt = (n: number, suffix = "") => `${n.toLocaleString("en-US")}${suffix}`;

function StoreCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the card is shown in its end state on first paint
  const run = reduce || ran;

  // funnel count-ups start on the same clock as the design's pop-in delays
  useEffect(() => {
    if (!ran || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const rafs: number[] = [];
    FUNNEL.forEach((f, i) => {
      const el = valueRefs.current[i];
      if (!el) return;
      timers.push(
        setTimeout(() => {
          let start: number | null = null;
          const tick = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / 900, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(Math.round(eased * f.target), f.suffix);
            if (p < 1) rafs[i] = requestAnimationFrame(tick);
          };
          rafs[i] = requestAnimationFrame(tick);
        }, f.delay)
      );
    });
    return () => {
      timers.forEach((t) => clearTimeout(t));
      rafs.forEach((r) => cancelAnimationFrame(r));
    };
  }, [ran, reduce]);

  return (
    <SignatureCard
      ariaLabel="A sample storefront built to convert"
      className={`ecw-store${run ? " run" : ""}`}
      live="Storefront · Live"
      corner="BUILT TO CONVERT"
      footLeft="Mobile-first · SEO from day one"
      footRight="you own the store →"
    >
      <div className="ecw-store-pdp">
        <span className="img">
          <span className="tag">Bestseller</span>
        </span>
        <span className="pd">
          <span className="nm">The Everyday Tote</span>
          <span className="pr">
            $89 <s>$120</s>
          </span>
          <span className="buy">
            {ICON_CART}
            Add to cart
          </span>
        </span>
      </div>
      <div className="ecw-store-pay">
        {PAY.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
      <div className="ecw-store-fun">
        {FUNNEL.map((f, i) => (
          <Fragment key={f.label}>
            {i > 0 && <div className="ar">{ICON_ARROW}</div>}
            <div className={`fn${f.hl ? " hl" : ""}`}>
              <span
                className="v"
                ref={(el) => {
                  valueRefs.current[i] = el;
                }}
              >
                {reduce ? fmt(f.target, f.suffix) : fmt(0, f.suffix)}
              </span>
              <span className="k">{f.label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY = [
  { icon: ICON_TREND, title: "It converts, not just attracts", text: <>Traffic is expensive. A store converting 3% of visitors is worth <strong>3× one that converts 1%.</strong></> },
  { icon: ICON_PHONE, title: "It works mobile-first", text: <>75%+ of e-commerce traffic is mobile. Designed desktop-first? <strong>You’re losing 3 of every 4 visitors.</strong></>, delay: 60 },
  { icon: ICON_SHIELD, title: "It survives ad-driven traffic", text: <>Ads send buyers who don’t know your brand. <strong>Your store has 5 seconds to earn their trust.</strong></>, delay: 120 },
  { icon: ICON_SEARCH, title: "It ranks in search", text: <>Product and category pages that rank drive <strong>free, compounding revenue, forever.</strong></> },
  { icon: ICON_BARS, title: "It scales with your catalog", text: <>A store built for 10 products should still work at 500 or 5,000, <strong>without a rebuild.</strong></>, delay: 60 },
  { icon: ICON_CART, title: "The biggest lever you have", text: <>Done right, your store is <strong>the single biggest lever in your business.</strong></>, delay: 120 },
];

/* -------- problem (dark) -------- */

const PAINS = [
  { title: "Beautiful but doesn’t convert", text: <>Design chases awards; buyers just want the buy button. <strong>Conversions tank.</strong></> },
  { title: "Mobile as an afterthought", text: <>Designed on desktop, “made responsive” at the end. <strong>Mobile buyers get a broken experience.</strong></>, delay: 60 },
  { title: "Checkout not in base package", text: <>The one page that decides whether you make money, <strong>quoted as an upsell.</strong></>, delay: 120 },
  { title: "No SEO built in", text: <>Generic titles, no schema. <strong>You’ll pay someone else to fix it later.</strong></> },
  { title: "Themes only they can update", text: <>Every small change costs $300. <strong>You’re locked in.</strong></>, delay: 60 },
  { title: "Launch and vanish", text: <>Six months to build, zero support after. <strong>Your first three bugs cost more than you saved.</strong></>, delay: 120 },
];

/* -------- what's included (interactive, 9 parts) -------- */

type Included = {
  key: string;
  btnName: string;
  btnSub: string;
  name: string;
  tag: string;
  items: string[];
};

const INCLUDED: Included[] = [
  {
    key: "strategy",
    btnName: "Strategy & planning",
    btnSub: "Before design",
    name: "Strategy & Store Planning",
    tag: "Every project starts here, catalog, journey, and revenue model before anyone opens a design tool.",
    items: ["Business goal + conversion target", "Customer journey mapping (ad click to purchase)", "Competitor store analysis", "Site map & category structure", "Product taxonomy & collection strategy", "Platform recommendation"],
  },
  {
    key: "design",
    btnName: "Custom store design",
    btnSub: "Not a $79 theme",
    name: "Custom Store Design",
    tag: "Not a $79 theme on your logo, custom design that converts on every page.",
    items: ["Homepage for first-time & returning buyers", "Product page templates that sell", "Category / collection pages", "Cart, mini-cart, and checkout flow", "Content pages (About, FAQ, Shipping)", "Design system for consistency"],
  },
  {
    key: "mobile",
    btnName: "Mobile-first design",
    btnSub: "Where buyers are",
    name: "Mobile-First Design",
    tag: "Not “responsive”, designed for the phone first, where 75%+ of buyers are.",
    items: ["Mobile-first wireframes & layouts", "Touch-optimized buttons & forms", "Sticky mobile cart & checkout CTAs", "Optimized mobile product galleries", "Minimal-field mobile checkout", "Fast load on 4G / weak connections"],
  },
  {
    key: "checkout",
    btnName: "Cart & checkout",
    btnSub: "Built to convert",
    name: "Cart & Checkout Optimization",
    tag: "The most important part of your store, built for conversion, not just “it works.”",
    items: ["Streamlined 1–2 step checkout", "Guest checkout on by default", "Apple Pay, Google Pay, Shop Pay, PayPal", "Trust signals at checkout", "Address auto-complete & validation", "Post-purchase upsell setup"],
  },
  {
    key: "products",
    btnName: "Product setup & migration",
    btnSub: "Clean catalog",
    name: "Product Setup & Migration",
    tag: "Your catalog into the store cleanly, whether it’s 20 products or 5,000.",
    items: ["Product uploads or bulk CSV imports", "Photography direction (or optimization)", "SEO-written / optimized descriptions", "Variants, options, inventory setup", "Collections & tag structure", "Migration from Shopify, Woo, Magento, Etsy"],
  },
  {
    key: "ops",
    btnName: "Payments, shipping, tax",
    btnSub: "Ops, day one",
    name: "Payments, Shipping & Tax",
    tag: "The operational side of running a store, configured properly from day one.",
    items: ["Payment gateway setup (Stripe, PayPal, Shopify Payments)", "Shipping rules by zone, weight, type", "Real-time carrier rates (USPS, UPS, FedEx, DHL)", "Tax setup (US states + international)", "Fulfillment workflow (ShipStation, ShipBob)", "Discount & promo code structure"],
  },
  {
    key: "seo",
    btnName: "SEO foundation",
    btnSub: "Rank as you grow",
    name: "E-commerce SEO Foundation",
    tag: "Built in from day one, the store ranks as it builds authority, not fixed later at 3× the cost.",
    items: ["SEO-friendly URL structure", "Meta titles & descriptions on every page", "Product schema markup for rich results", "XML sitemap & robots.txt", "Core Web Vitals (site speed)", "Image compression & alt text"],
  },
  {
    key: "apps",
    btnName: "Apps & integrations",
    btnSub: "Revenue machine",
    name: "App & Integration Setup",
    tag: "The apps that turn a basic store into a revenue machine, selected & configured for you.",
    items: ["Email marketing (Klaviyo, Omnisend, Brevo)", "Reviews (Judge.me, Yotpo, Loox)", "Upsells & cross-sells (Rebuy, Zipify)", "Live chat & support (Gorgias, Tidio)", "Subscriptions (Recharge, if applicable)", "Analytics (GA4, Meta & TikTok Pixel, CAPI)"],
  },
  {
    key: "launch",
    btnName: "Launch & ownership",
    btnSub: "All yours",
    name: "Launch, Training & Ownership",
    tag: "The store is yours, full access, source files, training, not lock-in.",
    items: ["Full domain & hosting setup", "SSL & security hardening", "Analytics + conversion tracking", "Team training on products, orders, content", "Documentation & video walk-throughs", "All logins, files, and API keys handed over"],
  },
];

function IncludedExplorer() {
  // the design's script initialises with a key that doesn't exist ("audit");
  // start on the button it marks aria-selected="true" (Strategy & planning).
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = INCLUDED[active];

  function select(i: number) {
    const next = (i + INCLUDED.length) % INCLUDED.length;
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
    <Reveal className="ecw-wb-wrap" id="included-int">
      <div className="ecw-wb-list" role="tablist" aria-label="What's included">
        {INCLUDED.map((inc, i) => (
          <button
            key={inc.key}
            type="button"
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            className="ecw-wb-btn"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{i + 1}</span>
            <span className="dn">
              <b>{inc.btnName}</b>
              <small>{inc.btnSub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="ecw-wb-panel">
        <div key={item.key}>
          <div className="ecw-wp-top">
            <span className="big">{ICON_CART}</span>
            <div>
              <h3>{item.name}</h3>
              <div className="tagline">{item.tag}</div>
            </div>
          </div>
          <div className="ecw-wp-body ecw-wp-fade">
            <span className="k">What’s inside</span>
            <div className="ecw-wp-list">
              {item.items.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- platforms -------- */

const PLATFORMS = [
  { name: "Shopify", best: "Most e-commerce brands, easy to manage, huge app ecosystem, scales with you." },
  { name: "Shopify Plus", best: "High-volume brands ($1M+/yr), checkout customization, wholesale, multi-store." },
  { name: "WooCommerce", best: "WordPress-based stores wanting maximum flexibility and no monthly platform fee." },
  { name: "BigCommerce", best: "Mid-market brands wanting Shopify-like features with more built-in tools." },
  { name: "Custom (Headless)", best: "Advanced brands needing performance beyond off-the-shelf platforms." },
];

/* -------- who / steps / pricing / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_CART, text: <><strong>Launching a new online store</strong> and want it built properly from day one, not on a $200 template you’ll rebuild in 6 months.</> },
  { icon: ICON_TREND_DOWN, text: <><strong>Running a store that isn’t converting</strong>, traffic’s coming, sales aren’t. Usually a design and checkout problem.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Migrating from Etsy or Amazon</strong> to your own store, keep more margin and own your customers.</>, delay: 120 },
  { icon: ICON_BARS, text: <><strong>Scaling past your DIY store</strong>, a template got you to $10K/mo, but the design is blocking $50K+.</> },
  { icon: ICON_TARGET, text: <><strong>Running paid ads to a weak store</strong>, paying for clicks that bounce because it isn’t built to convert.</>, delay: 60 },
  { icon: ICON_BRIEFCASE, text: <><strong>Launching wholesale / B2B</strong> alongside your DTC store, needs specific catalog and pricing structure.</>, delay: 120 },
];

const STEPS = [
  { no: "Week 1", title: "Strategy & discovery", text: "Kickoff, competitor research, catalog audit, customer journey mapping, and a signed-off project brief." },
  { no: "Week 2", title: "Wireframes & content", text: "Low-fi wireframes for every page. Product data collected. You approve before design starts.", delay: 70 },
  { no: "Weeks 3–4", title: "Design", text: "Custom design for every page, mobile-first. Two rounds of feedback and revisions.", delay: 140 },
  { no: "Weeks 5–7", title: "Development & load", text: "Store built on your platform. Products loaded. Payments, shipping, tax configured. Apps installed. Full QA.", delay: 210 },
  { no: "Week 8", title: "Launch & training", text: "Go live. Analytics and tracking configured. Team trained. Everything handed over, yours.", delay: 280 },
];

const TIERS = [
  { name: "Starter Store", best: "New brands, up to 25 products: Shopify theme customization, essential pages, launch in 3–4 weeks.", price: "Published" },
  { name: "Growth Store", best: "Growing brands, up to 100 products, fully custom design, advanced checkout, app integrations.", price: "Published", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Store", best: "Established brands & Shopify Plus: 500+ products, custom features, wholesale, migrations.", price: "Published", delay: 140 },
  { name: "Store Redesign", best: "Existing stores needing a full refresh, design, UX, and CRO overhaul without changing platforms.", price: "Published", delay: 210 },
];

const FAQS = [
  { q: "Shopify or WooCommerce?", a: <><strong>Shopify</strong> for most brands, easy to manage, huge app ecosystem, reliable hosting. <strong>WooCommerce</strong> if you want more control, no monthly platform fee, and already run WordPress. We’ll recommend the right one.</> },
  { q: "How long to launch?", a: <>Starter 3–4 weeks, Growth 4–6, Scale & migrations 6–8. <strong>Timelines depend on how quickly you approve at each stage</strong>, fastest projects have decisive clients.</> },
  { q: "Can you migrate my existing store?", a: <>Yes, full migrations from Shopify ↔ WooCommerce, Magento, BigCommerce, Squarespace, Wix, Etsy, Amazon. <strong>Product data, customers, orders, redirects, and SEO preserved.</strong></> },
  { q: "Do you handle product uploads?", a: <>Yes, included up to the package limit (25/100/500+). For larger catalogs we use <strong>bulk CSV imports.</strong> Descriptions written by us or provided by you.</> },
  { q: "Will my store be mobile-friendly?", a: <>Every store is <strong>mobile-first</strong>, designed for the phone first, then adapted for desktop. That’s where 75%+ of your buyers are.</> },
  { q: "Do I own the store?", a: <>Yes, completely, all logins, source files, and documentation handed over. No proprietary themes, no “you need us to make changes.” <strong>You can leave with the store anytime.</strong></> },
  { q: "No professional product photos?", a: <>We’ll optimize what you have and give direction to improve them, or refer a product photographer in our network. <strong>Full-service photography can be added.</strong></> },
  { q: "Do you set up email & reviews?", a: <>Yes, we install and configure the core apps every store needs (<strong>Klaviyo/Brevo, Judge.me/Yotpo, upsells, chat</strong>). Ongoing email management is a separate service.</> },
  { q: "What about running ads to the store?", a: <>Handled separately under our Meta Ads and Google Ads services. Many clients <strong>bundle the build with an ads engagement</strong> so traffic flows the day it goes live.</> },
  { q: "Post-launch support?", a: <>Optional monthly maintenance for updates, new products, and small changes, or one-off updates billed as needed. <strong>No forced retainer, no lock-in.</strong></> },
];

export default function EcommerceWebsitesView() {
  return (
    <>
      <ServiceDetailHero
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="ecw-hero"
        compact
        line1="An online store built"
        line2={
          <>
            to <ScrambleWord text="sell." />
          </>
        }
        lead={
          <>
            Custom e-commerce websites on Shopify, WooCommerce, or Shopify Plus, built mobile-first, structured to
            convert, and optimized for search from day one.{" "}
            <strong>Published prices, 4–8 week launch, and you own the store completely.</strong>
          </>
        }
        primary={{ label: "Book a free store strategy call", href: "/contact" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <StoreCard />
      </ServiceDetailHero>

      <TrustBar items={["Conversion-focused design", "Mobile-first", "Transparent published pricing", "You own the store"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why e-commerce design matters</span>
            <h2>Online buyers decide in seconds.</h2>
            <p>Your store earns the sale or loses it, usually before they even reach the product page. Here’s what a great store actually does.</p>
          </Reveal>
          <div className="ecw-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
        </div>
      </section>

      {/* PROBLEM (dark) */}
      <section className="band dark" id="problem">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The problem with most e-commerce agencies</span>
            <h2>Some of these will hit home.</h2>
            <p>If you’ve worked with a Shopify or WooCommerce agency before… we built our service to fix every one of these.</p>
          </Reveal>
          <div className="ecw-dont-grid">
            {PAINS.map((pain) => (
              <Reveal className="ecw-dontc" key={pain.title} style={d(pain.delay ?? 0)}>
                <h3>
                  <span className="x">{ICON_X}</span>
                  {pain.title}
                </h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="ecw-dont-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              We built our E-commerce Website Design to fix <strong>every one of those.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED (interactive) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Everything to launch and run a real store.</h2>
            <p>Strategy, design, development, checkout, SEO, and support, nine parts, one team. Pick one to see inside.</p>
          </Reveal>
          <IncludedExplorer />
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="band tint" id="platforms">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Platforms we build on</span>
            <h2>The right platform for your catalog and plans.</h2>
            <p>Every platform has strengths and trade-offs. We recommend based on your business, not what’s easiest for us.</p>
          </Reveal>
          <Reveal className="ecw-plat-tbl">
            <div className="ecw-plat-row head">
              <div>Platform</div>
              <div>Best for</div>
            </div>
            {PLATFORMS.map((p) => (
              <div className="ecw-plat-row" key={p.name}>
                <div className="pn">{p.name}</div>
                <div>{p.best}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="ecw-plat-note">
            Not sure which platform to pick? <strong>We’ll recommend one during the strategy call.</strong>
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>Biggest return if you’re…</h2>
          </Reveal>
          <div className="ecw-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="ecw-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A structured 4–8 week build.</h2>
            <p>Clear deliverables at every step, you approve before each stage moves forward.</p>
          </Reveal>
          <div className="ecw-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="ecw-step" key={step.no} style={d(step.delay ?? 0)}>
                <span className="ecw-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No “custom quote after a discovery call.” One-time build fee, optional monthly maintenance.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Project fees paid in two installments, <strong>50% at kickoff, 50% at launch.</strong> Optional monthly
            maintenance for updates, product uploads, and small changes. Hosting, platform fees, and app subscriptions
            are separate. Every rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        eyebrow="E-commerce Website Design"
        heading="Ready for a store that actually sells?"
        copy={
          <>
            Book a free store strategy call. We’ll look at what you have (or need), what it should do, and what it would
            take to build,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              with a clear price at the end. No obligation, no jargon, no lock-in.
            </strong>
          </>
        }
        primaryLabel="Book a free store strategy call"
        primaryHref="/contact"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
