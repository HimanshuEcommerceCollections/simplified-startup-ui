"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./eseo-page.css";

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
const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHOE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2 17c2 0 3-1 5-1s3 2 6 2 4-1 4-3-2-2-4-3-2-3-5-3-3 2-3 4-1 3-3 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 17h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_COMPARE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 4v16M15 4v16M4 9h4M16 9h4M4 15h4M16 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC3 = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TITLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7V5h16v2M9 19h6M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TABLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h16M8 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_HELP = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CRUMB = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h4l1 2M4 7h16M8 7v10h12V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GEAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH_MINUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SWAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h4v4M20 17h-4v-4M8 7s2 4 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: rich product result -------- */

const SERP_TAGS = ["Title", "Price schema", "Review stars", "In-stock", "Breadcrumb"];

function SerpCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the tick chips are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A sample optimized product search result"
      className={`eseo-serp${run ? " run" : ""}`}
      live="Product result"
      corner="OPTIMIZED"
      footLeft="Fixed in the template, once"
      footRight="every product benefits →"
    >
      <div className="eseo-serp-crumb">
        Home <span>›</span> Women’s Shoes <span>›</span> <b>Trail Running</b>
      </div>
      <div className="eseo-serp-prod">
        <span className="img">{ICON_SHOE}</span>
        <span className="pd">
          <b>Trailblaze Women’s Trail Running Shoe</b>
          <span className="price">
            $128 <s>$160</s>
          </span>
          <span className="stars">
            ★★★★★ <span>4.8 · 316 reviews · In stock</span>
          </span>
        </span>
      </div>
      <div className="eseo-serp-tags">
        {SERP_TAGS.map((tag) => (
          <span key={tag}>
            {ICON_TICK}
            {tag}
          </span>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_LINES, title: "Category pages do the heavy lifting", text: <>They often match broad shopping searches <strong>better than single products.</strong></> },
  { icon: ICON_GRID, title: "Scale needs structure", text: <>Clean architecture and templates matter more than <strong>one-off page edits.</strong></> },
  { icon: ICON_WARN, title: "Technical issues multiply", text: <>A small problem in one template <strong>can affect every product at once.</strong></> },
];

/* -------- search journey (5 stages) -------- */

const JOURNEY: { stage: string; icon: ReactNode; title: string; query: string; page: string }[] = [
  { stage: "Research", icon: ICON_FILE, title: "Buying guides", query: "“best running shoes for flat feet”", page: "→ Blog / guide" },
  { stage: "Compare", icon: ICON_COMPARE, title: "Comparison", query: "“trail vs road running shoes”", page: "→ Comparison post" },
  { stage: "Browse", icon: ICON_GRID, title: "Category pages", query: "“women’s trail running shoes”", page: "→ Category page" },
  { stage: "Choose", icon: ICON_DOC3, title: "Product pages", query: "“[brand] [model] women’s size 8”", page: "→ Product page" },
  { stage: "Return", icon: ICON_SHIELD, title: "Brand pages", query: "“[your store] running shoes”", page: "→ Brand page" },
];

/* -------- store architecture tree -------- */

const TREE_ROW1: { b: string; s: string }[] = [
  { b: "Category", s: "Women’s Shoes" },
  { b: "Category", s: "Men’s Shoes" },
  { b: "Buying Guides", s: "Blog linking to categories" },
];
const TREE_ROW2: { b: string; s: string }[] = [
  { b: "Subcategory", s: "Trail Running" },
  { b: "Subcategory", s: "Road Running" },
  { b: "Filters", s: "Size, color, price: crawl-controlled" },
];

/* -------- page types table -------- */

const PAGE_TYPES: { name: string; matches: string; what: string }[] = [
  { name: "Homepage", matches: "Your brand and main categories", what: "Clear category links, brand messaging, and trust signals." },
  { name: "Category pages", matches: "Broad shopping searches", what: "Unique intro copy, smart filters, internal links, and FAQs." },
  { name: "Product pages", matches: "Specific product searches", what: "Original descriptions, specs, images, reviews, and Product schema." },
  { name: "Collection pages", matches: "Seasonal and themed searches", what: "Curated collections with their own copy and purpose." },
  { name: "Buying guides & blog", matches: "Research and comparison searches", what: "Helpful content that links shoppers to the right categories." },
  { name: "Brand pages", matches: "Searches for brands you carry", what: "Brand overviews linking to that brand’s products." },
];

/* -------- product page anatomy (8) -------- */

const ANATOMY: { no: string; icon: ReactNode; title: string; text: string }[] = [
  { no: "01", icon: ICON_TITLE, title: "Search-friendly title", text: "Product name, key attribute, and brand in plain language." },
  { no: "02", icon: ICON_LINES, title: "Original description", text: "Written for shoppers, not copied from the manufacturer." },
  { no: "03", icon: ICON_TABLE, title: "Specs and details", text: "Size, materials, dimensions, and care in a clear format." },
  { no: "04", icon: ICON_IMAGE, title: "Optimized images", text: "Descriptive file names, alt text, and fast-loading formats." },
  { no: "05", icon: ICON_STAR, title: "Reviews and ratings", text: "Real customer feedback shown on the page." },
  { no: "06", icon: ICON_HELP, title: "Product FAQs", text: "Answers to common questions about fit, use, or shipping." },
  { no: "07", icon: ICON_CODE, title: "Product schema", text: "Structured data for price, availability, and reviews." },
  { no: "08", icon: ICON_CRUMB, title: "Breadcrumbs & related", text: "Links back to categories and to similar products." },
];

/* -------- problem / fix table -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Duplicate pages from variants", fix: "Canonical tags point variants to one main product URL." },
  { prob: "Filters creating endless URLs", fix: "Filter pages controlled so search engines crawl what matters." },
  { prob: "Out-of-stock and discontinued products", fix: "Clear rules: keep, redirect, or retire each page." },
  { prob: "Copied manufacturer descriptions", fix: "Original copy written for your top products first." },
  { prob: "Slow, image-heavy pages", fix: "Images compressed and resized, with lazy loading." },
  { prob: "Missing product structured data", fix: "Product, Review, and Breadcrumb schema added to templates." },
  { prob: "Thin category pages", fix: "Helpful intro copy, FAQs, and internal links added." },
];

/* -------- merchant center -------- */

const MERCHANT: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_GEAR, title: "Setup", items: ["Merchant Center account", "Store verification", "Shipping and return settings"] },
  { icon: ICON_LINES, title: "Product feed", items: ["Feed connected from your platform", "Titles and attributes cleaned up", "Product categories mapped"] },
  { icon: ICON_REFRESH, title: "Ongoing care", items: ["Feed errors monitored", "Disapproved items fixed", "Feed matches site prices"] },
];

/* -------- platforms / included / who / faq -------- */

const PLATFORMS = ["Shopify", "WooCommerce", "BigCommerce", "Adobe Commerce", "Wix", "Squarespace", "Headless"];

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "E-commerce SEO audit of your store" },
  { icon: ICON_SEARCH_MINUS, text: "Keyword research by category and product type" },
  { icon: ICON_GRID, text: "Store architecture and internal linking plan" },
  { icon: ICON_LINES, text: "Category page copy and on-page optimization" },
  { icon: ICON_DOC3, text: "Product page template improvements" },
  { icon: ICON_CODE, text: "Product, Review, and Breadcrumb schema" },
  { icon: ICON_SWAP, text: "Duplicate content and filter crawl controls" },
  { icon: ICON_BOLT, text: "Image and page speed improvements" },
  { icon: ICON_LINES, text: "Google Merchant Center setup or feed review" },
  { icon: ICON_TREND, text: "Monthly reporting on organic traffic and product rankings" },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_CHAT, text: <><strong>Shopify and WooCommerce stores</strong> relying heavily on paid ads for sales.</>, delay: 0 },
  { icon: ICON_TREND, text: <><strong>Growing catalogs</strong> where new products aren’t getting found.</>, delay: 60 },
  {
    icon: ICON_REFRESH,
    text: (
      <>
        <strong>
          <a href="/website-development/ecommerce">Stores replatforming or redesigning</a>
        </strong>{" "}
        that need to protect existing search visibility.
      </>
    ),
    delay: 120,
  },
  { icon: ICON_BAG, text: <><strong>Direct-to-consumer brands</strong> who want to compete beyond marketplaces.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does e-commerce SEO cost?", a: <>It depends on catalog size, platform, and how much technical work your store needs. <strong>We share pricing on the free call.</strong></> },
  { q: "Is Shopify good for SEO?", a: <>Shopify can work well for SEO, but it has some built-in limits, such as fixed URL structures. <strong>We work within those limits and fix what can be changed.</strong></> },
  { q: "Should I write unique descriptions for every product?", a: <>Ideally, yes. With large catalogs, we usually <strong>start with top-selling or high-potential products,</strong> then expand from there.</> },
  { q: "What happens to SEO when products go out of stock?", a: <>It depends on whether the product is coming back. <strong>We set clear rules for keeping, redirecting, or retiring those pages.</strong></> },
  { q: "Can you guarantee first-page rankings?", a: <>No. Nobody can honestly guarantee specific rankings. <strong>We focus on the structure, content, and technical work that search engines reward.</strong></> },
  {
    q: "Can you protect rankings during a replatform?",
    a: (
      <>
        Yes. We map old URLs to new ones, set up redirects, and <strong>compare rankings before and after</strong> so visibility carries over to the{" "}
        <a className="eseo-faq-link" href="/website-development/ecommerce">new store</a>.
      </>
    ),
  },
];

/* -------- page -------- */

export default function EcommerceSeoView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="Get your products found"
        line2={
          <>
            by shoppers ready to <span className="grad-text">buy.</span>
          </>
        }
        lead={
          <>
            E-commerce SEO for online stores: <strong>category pages, product pages, site structure, and technical fixes</strong> that
            help search engines understand and surface what you sell.
          </>
        }
        primary={{ label: "Book an e-commerce SEO call", href: "/contact" }}
        secondary={{ label: "See what we optimize ↓", href: "#pages" }}
      >
        <SerpCard />
      </ServiceDetailHero>

      <TrustBar items={["Shopify · WooCommerce · BigCommerce", "Category & product pages", "Product schema", "Merchant Center"]} />

      {/* WHY */}
      <section className="band tint eseo-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Store SEO works differently.</h2>
            <p>
              Online stores have problems most websites don’t: hundreds or thousands of product pages, filters that create endless
              URLs, variants, out-of-stock items, and descriptions copied from manufacturers. E-commerce SEO is built to handle that.
            </p>
          </Reveal>
          <Reveal className="eseo-surf-grid">
            {WHY.map((card) => (
              <article className="eseo-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="eseo-why-quote">
            In e-commerce, you rarely fix one page at a time. <span>You fix the template, and every product benefits.</span>
          </Reveal>
        </div>
      </section>

      {/* SEARCH JOURNEY */}
      <section className="band eseo-sec" id="journey">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How shoppers search</span>
            <h2>The e-commerce search journey.</h2>
            <p>Shoppers search differently at each stage. Each stage maps to a different type of page on your store.</p>
          </Reveal>
          <Reveal className="eseo-jny">
            {JOURNEY.map((step, i) => (
              <Fragment key={step.stage}>
                {i > 0 && (
                  <span className="jarr" aria-hidden="true">
                    {ICON_ARROW}
                  </span>
                )}
                <article className="eseo-jn">
                  <span className="js">{step.stage}</span>
                  <div className="ji">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p className="jq">{step.query}</p>
                  <div className="jpage">{step.page}</div>
                </article>
              </Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ARCHITECTURE TREE */}
      <section className="band tint eseo-sec" id="architecture">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Site structure</span>
            <h2>Store architecture.</h2>
            <p>A clear hierarchy helps shoppers and search engines move from broad categories to specific products.</p>
          </Reveal>
          <Reveal className="eseo-tree">
            <div className="eseo-tnode home">
              <b>Homepage</b>
              <small>Links to top categories</small>
            </div>
            <div className="eseo-tconn"></div>
            <div className="eseo-trow">
              {TREE_ROW1.map((node) => (
                <div className="eseo-tnode" key={node.s}>
                  <b>{node.b}</b>
                  <small>{node.s}</small>
                </div>
              ))}
            </div>
            <div className="eseo-tconn"></div>
            <div className="eseo-trow2">
              {TREE_ROW2.map((node) => (
                <div className="eseo-tnode" key={node.s}>
                  <b>{node.b}</b>
                  <small>{node.s}</small>
                </div>
              ))}
            </div>
            <div className="eseo-tconn"></div>
            <div className="eseo-tnode leaf">
              <b>Product pages</b>
              <small>Breadcrumbs up · linked to related products</small>
            </div>
          </Reveal>
          <Reveal as="p" className="eseo-tree-note">
            Example structure only. Your architecture is planned around your catalog and how your customers shop.
          </Reveal>
        </div>
      </section>

      {/* PAGE TYPES */}
      <section className="band eseo-sec" id="pages">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where we focus</span>
            <h2>Page types we optimize.</h2>
          </Reveal>
          <Reveal className="eseo-pt-tbl">
            <div className="eseo-pt-row head">
              <div>Page type</div>
              <div>Matches searches for</div>
              <div>What we optimize</div>
            </div>
            {PAGE_TYPES.map((row) => (
              <div className="eseo-pt-row" key={row.name}>
                <div className="pn2">{row.name}</div>
                <div>{row.matches}</div>
                <div>{row.what}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRODUCT ANATOMY */}
      <section className="band tint eseo-sec" id="anatomy">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Product pages</span>
            <h2>Product page anatomy.</h2>
            <p>Every product page template is built around these elements.</p>
          </Reveal>
          <Reveal className="eseo-pa-grid">
            {ANATOMY.map((item) => (
              <article className="eseo-pa" key={item.no}>
                <span className="pan">{item.no}</span>
                <div className="pai">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TECHNICAL FIX */}
      <section className="band eseo-sec" id="technical">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Technical SEO</span>
            <h2>Common store SEO issues.</h2>
            <p>These problems show up in many online stores. We find them and fix them at the template level.</p>
          </Reveal>
          <Reveal className="eseo-fix-tbl">
            <div className="eseo-fix-row head">
              <div>The problem</div>
              <div>How it gets fixed</div>
            </div>
            {FIXES.map((row) => (
              <div className="eseo-fix-row" key={row.prob}>
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

      {/* MERCHANT CENTER */}
      <section className="band tint eseo-sec" id="merchant">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Shopping results</span>
            <h2>Google Merchant Center &amp; free listings.</h2>
            <p>
              Products can appear in Google’s shopping results through Merchant Center. We help connect your store and keep your
              product feed healthy.
            </p>
          </Reveal>
          <Reveal className="eseo-mc-grid">
            {MERCHANT.map((card) => (
              <article className="eseo-mc" key={card.title}>
                <h3>
                  <span className="mci">{card.icon}</span>
                  {card.title}
                </h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>
                      <span className="v">{ICON_TICK}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
          <Reveal as="p" className="eseo-mc-note">
            Eligibility for shopping results depends on Google’s policies and your product feed.
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="band eseo-sec" id="platforms">
        <div className="wrap">
          <Reveal className="sec-head" style={{ margin: "0 auto 36px", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Software
            </span>
            <h2>Platforms we work with.</h2>
          </Reveal>
          <Reveal className="eseo-plat-row">
            {PLATFORMS.map((name) => (
              <span className="eseo-plat" key={name}>
                <span className="pd2"></span>
                {name}
              </span>
            ))}
          </Reveal>
          <Reveal as="p" className="eseo-plat-note">
            Each platform has its own SEO settings and limits. <strong>We work within yours.</strong>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint eseo-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>From a store audit to monthly ranking reports.</h2>
          </Reveal>
          <Reveal className="eseo-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="eseo-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band eseo-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs e-commerce SEO</span>
            <h2>Help shoppers find what you sell.</h2>
          </Reveal>
          <div className="eseo-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="eseo-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every store audit." />

      <CtaBand
        id="start"
        eyebrow="E-commerce SEO Services"
        heading="Help shoppers find what you sell."
        copy={
          <>
            Book a free call to review your store and the SEO steps that would make the biggest difference:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              we’ll look at how your store is structured and where search engines are getting stuck.
            </strong>
          </>
        }
        primaryLabel="Book an e-commerce SEO call"
        primaryHref="/contact"
        secondary={{ label: "See what we optimize", href: "#pages", arrow: "↗" }}
      />
    </>
  );
}
