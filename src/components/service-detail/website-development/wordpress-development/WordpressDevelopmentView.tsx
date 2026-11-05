"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./wpd-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_HEADING = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 4v16M18 4v16M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_IMAGE_FULL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="m5 18 4-3 3 2 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_COLUMNS = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="7" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="4" width="7" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PARAGRAPH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_INFO = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_WINDOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_BLOCKS = (
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
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOWNLOAD = (
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
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_INFO_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- hero: scrambled gradient word ("last.") -------- */

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

/* -------- hero signature: block editor card -------- */

const BLOCKS: { icon: ReactNode; label: string; body: ReactNode }[] = [
  { icon: ICON_HEADING, label: "Heading block", body: <div className="bh"></div> },
  { icon: ICON_IMAGE, label: "Image block", body: <div className="bimg">{ICON_IMAGE_FULL}</div> },
  {
    icon: ICON_COLUMNS,
    label: "Columns block",
    body: (
      <div className="bcols">
        <div className="wpd-bc"></div>
        <div className="wpd-bc"></div>
      </div>
    ),
  },
  {
    icon: ICON_PARAGRAPH,
    label: "Paragraph block",
    body: (
      <div className="blines">
        <i></i>
        <i></i>
      </div>
    ),
  },
];

function BlockEditorCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the editor rows and accent bars are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="A WordPress block editor layout"
      className={`wpd-wp${run ? " run" : ""}`}
      live="Block editor"
      corner="LIGHTWEIGHT · EDITABLE"
      footLeft="Drag, edit, no code"
      footRight="your team owns it →"
    >
      <div className="wpd-wp-body">
        {BLOCKS.map((blk) => (
          <div className="wpd-blk" key={blk.label}>
            <span className="bt"></span>
            <span className="bk">
              {blk.icon}
              {blk.label}
            </span>
            {blk.body}
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why (dark): at a glance -------- */

const GLANCE = ["Open source and flexible", "Strong for content and SEO", "Huge plugin ecosystem", "You choose your hosting", "Needs regular care"];

/* -------- approaches table -------- */

const APPROACHES: { name: string; href?: string; good: string; mind: string }[] = [
  { name: "Custom theme with blocks", good: "Fast, clean, and easy to edit", mind: "Takes planning to design the blocks" },
  { name: "Page builder (e.g., Elementor)", good: "Visual editing for non-technical teams", mind: "Can add weight and slow pages" },
  { name: "Premium theme, customized", good: "Quicker launch with a proven base", mind: "May include features you don’t need" },
  { name: "Headless WordPress", href: "/website-development/headless-commerce", good: "Custom front ends using WordPress for content", mind: "More complex to build and maintain" },
];

/* -------- 6 services -------- */

const SERVICES: { icon: ReactNode; title: string; href?: string; text: string }[] = [
  { icon: ICON_WINDOW, title: "Custom websites", text: "Sites designed and built around your brand and goals." },
  { icon: ICON_BLOCKS, title: "Custom block development", text: "Reusable blocks your team can mix and match." },
  { icon: ICON_REFRESH, title: "Redesigns", href: "/website-development/website-redesign-migration", text: "Refreshing older sites without losing content or SEO." },
  { icon: ICON_LINK, title: "Plugin integrations", text: "Forms, CRM, booking, membership, and more." },
  { icon: ICON_DOWNLOAD, title: "Migrations", text: "Moving to WordPress or to better hosting." },
  { icon: ICON_SHIELD_CHECK, title: "Care plans", text: "Updates, backups, security, and small fixes." },
];

function ServiceGrid() {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="wpd-sv6-grid">
        {SERVICES.map((svc) => (
          <article className="wpd-sv6" data-tilt key={svc.title}>
            <span className="wpd-sv6-spot"></span>
            <div className="s6i">{svc.icon}</div>
            <h3>{svc.href ? <a href={svc.href}>{svc.title}</a> : svc.title}</h3>
            <p>{svc.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- build process (5 rows) -------- */

const PROCESS: { no: string; title: string; text: string; outcome: string }[] = [
  { no: "1", title: "Discovery", text: "Goals, audience, pages, and must-have features.", outcome: "Sitemap and scope" },
  { no: "2", title: "Design", text: "Key pages designed for desktop and mobile.", outcome: "Approved designs" },
  { no: "3", title: "Build", text: "Custom theme and blocks built on a staging site.", outcome: "Working staging site" },
  { no: "4", title: "Content and SEO", text: "Content added, SEO basics set, and redirects planned.", outcome: "Content-ready site" },
  { no: "5", title: "Launch and care", text: "Testing, launch, training, and ongoing care.", outcome: "Live site and care plan" },
];

/* -------- quality standards (8) -------- */

const QUALITY: { icon: ReactNode; title: string; href?: string; text: string }[] = [
  { icon: ICON_BOLT, title: "Lightweight theme", text: "Clean code and fast loading." },
  { icon: ICON_BLOCKS, title: "Editable blocks", text: "Flexible layouts without code." },
  { icon: ICON_PHONE, title: "Mobile-first design", text: "Built for phones first." },
  { icon: ICON_TREND, title: "SEO foundations", href: "/digital-marketing/seo", text: "Titles, schema, sitemaps, and clean URLs." },
  { icon: ICON_INFO_CIRCLE, title: "Accessibility basics", text: "Readable text, contrast, and alt text." },
  { icon: ICON_LOCK, title: "Secure setup", text: "Strong logins, updates, and backups." },
  { icon: ICON_TREND, title: "Analytics connected", text: "Tracking ready from launch." },
  { icon: ICON_CAP, title: "Training", text: "Your team learns how to edit the site." },
];

/* -------- care plans (3) -------- */

const CARE: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_REFRESH, title: "Updates", items: ["WordPress core", "Themes and plugins", "Tested before applying"] },
  { icon: ICON_SHIELD, title: "Protection", items: ["Daily backups", "Security monitoring", "Malware scanning"] },
  { icon: ICON_CHAT, title: "Support", items: ["Uptime monitoring", "Small content changes", "Monthly health report"] },
];

/* -------- common problems (problem -> fix) -------- */

const PROBLEMS: { prob: string; fix: string }[] = [
  { prob: "Slow pages", fix: "Lighter theme, caching, and image optimization." },
  { prob: "Too many plugins", fix: "Plugins reviewed and reduced." },
  { prob: "Hard-to-edit layouts", fix: "Rebuilt with flexible blocks." },
  { prob: "Security issues", fix: "Updates, firewall, and monitoring." },
  { prob: "Outdated design", fix: "Redesign that keeps your content and SEO." },
  { prob: "No backups", fix: "Automatic backups with restore testing." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_BLOCKS, text: "Discovery and sitemap planning" },
  { icon: ICON_WINDOW, text: "Custom design for key pages" },
  { icon: ICON_CODE, text: "Custom theme and block development" },
  { icon: ICON_LINK, text: "Plugin selection and setup" },
  { icon: ICON_CHAT, text: "Forms and CRM integrations" },
  { icon: ICON_TREND, text: "SEO foundations and redirects" },
  { icon: ICON_BOLT, text: "Speed and security setup" },
  { icon: ICON_SHIELD_CHECK, text: "Testing and launch" },
  { icon: ICON_CAP, text: "Team training and optional care plan" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_WINDOW, text: <><strong>Small businesses</strong> needing a professional, easy-to-edit website.</> },
  { icon: ICON_DOC, text: <><strong>Content-heavy sites</strong> with blogs, resources, or news.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Organizations with existing WordPress sites</strong> that need a rebuild.</>, delay: 120 },
  { icon: ICON_SHIELD, text: <><strong>Teams wanting full ownership</strong> of their website and data.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does a WordPress website cost?", a: <>It depends on design, number of pages, custom features, and integrations. <strong>We share pricing on the free call.</strong></> },
  { q: "Do you use page builders?", a: <>We usually build with custom blocks for speed and flexibility, <strong>but we can work with page builders when they suit your team.</strong></> },
  { q: "Will I be able to edit my site?", a: <>Yes. <strong>We build editable layouts and train your team.</strong></> },
  { q: "Do you provide hosting?", a: <>We recommend and set up <strong>managed WordPress hosting in your name,</strong> so you always own it.</> },
  { q: "Can you take over an existing WordPress site?", a: <>Yes. We start with a review of the <strong>theme, plugins, and security,</strong> then recommend next steps.</> },
  { q: "How long does a WordPress build take?", a: <>It depends on the number of pages and custom features. <strong>We share a timeline after discovery</strong> and keep you updated at each stage.</> },
];

export default function WordpressDevelopmentView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="wpd-hero"
        line1="WordPress websites that are easy"
        line2={
          <>
            to edit and built to <ScrambleWord text="last." />
          </>
        }
        lead={
          <>
            Custom WordPress sites with clean themes, flexible block layouts, and the right plugins,{" "}
            <strong>plus care plans to keep everything secure and fast.</strong>
          </>
        }
        primary={{ label: "Book a WordPress call", href: "/contact" }}
        secondary={{ label: "See what we build ↓", href: "#services" }}
      >
        <BlockEditorCard />
      </ServiceDetailHero>

      <TrustBar items={["Custom, lightweight themes", "Easy block-based editing", "Plugins kept to what’s needed", "Hosting and care planned"]} />

      {/* WHY (dark + glance) */}
      <section className="band dark wpd-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why WordPress still works</span>
            <h2>Flexible, open source, and great for content.</h2>
          </Reveal>
          <Reveal className="wpd-glance">
            <div className="gtxt">
              <p>
                WordPress powers a large share of the web and has <strong>a huge community of tools and developers.</strong>
              </p>
              <p>It’s especially strong for content-heavy sites, blogs, and businesses that want full control over their website.</p>
              <p>
                The quality of the build matters: <strong>clean themes and fewer plugins make a site faster, safer, and easier to manage.</strong>
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

      {/* APPROACHES */}
      <section className="band tint wpd-sec" id="approaches">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Ways to build</span>
            <h2>Ways to build a WordPress site.</h2>
            <p>Different approaches suit different needs.</p>
          </Reveal>
          <Reveal className="wpd-ap-tbl">
            <div className="wpd-ap-row head">
              <div>Approach</div>
              <div>Good for</div>
              <div>Keep in mind</div>
            </div>
            {APPROACHES.map((row) => (
              <div className="wpd-ap-row" key={row.name}>
                <div>
                  {row.href ? (
                    <a href={row.href}>
                      {row.name} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    row.name
                  )}
                </div>
                <div className="good2">
                  <span className="vi">{ICON_CHECK}</span>
                  {row.good}
                </div>
                <div className="mind">
                  <span className="wi2">{ICON_INFO}</span>
                  {row.mind}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="band wpd-sec" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Services we offer</span>
            <h2>WordPress services, from new sites to ongoing care.</h2>
          </Reveal>
          <ServiceGrid />
        </div>
      </section>

      {/* BUILD PROCESS */}
      <section className="band tint wpd-sec" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we build</span>
            <h2>A clear process from planning to launch.</h2>
          </Reveal>
          <Reveal className="wpd-oc-list">
            {PROCESS.map((step) => (
              <article className="wpd-oc" key={step.no}>
                <span className="ocn">{step.no}</span>
                <div className="oct">
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
                <span className="oco">{step.outcome}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* QUALITY */}
      <section className="band wpd-sec" id="quality">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Quality standards</span>
            <h2>What every site we build includes.</h2>
          </Reveal>
          <Reveal className="wpd-ql-grid">
            {QUALITY.map((card) => (
              <article className="wpd-ql" key={card.title}>
                <div className="qli">{card.icon}</div>
                <h3>{card.href ? <a href={card.href}>{card.title}</a> : card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CARE PLANS */}
      <section className="band tint wpd-sec" id="care">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Care plans</span>
            <h2>Keeping your site secure and running well after launch.</h2>
          </Reveal>
          <Reveal className="wpd-cp-grid">
            {CARE.map((plan) => (
              <article className="wpd-cp" key={plan.title}>
                <h3>
                  <span className="cpi">{plan.icon}</span>
                  {plan.title}
                </h3>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>
                      <span className="ck">{ICON_CHECK_BOLD}</span>
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
      <section className="band wpd-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>Common WordPress problems.</h2>
          </Reveal>
          <Reveal className="wpd-fix-tbl">
            <div className="wpd-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {PROBLEMS.map((row) => (
              <div className="wpd-fix-row" key={row.prob}>
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
      <section className="band tint wpd-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>From discovery to team training and care.</h2>
          </Reveal>
          <Reveal className="wpd-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="wpd-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band wpd-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>Build a WordPress site that’s easy to grow.</h2>
          </Reveal>
          <div className="wpd-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="wpd-who" key={i} style={d(item.delay ?? 0)}>
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
        eyebrow="WordPress Development"
        heading="Build a WordPress site that’s easy to grow."
        copy={
          <>
            Book a free call to plan your WordPress project:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your current site and goals.</strong>
          </>
        }
        primaryLabel="Book a WordPress call"
        primaryHref="/contact"
        secondary={{ label: "See what we build", href: "#services", arrow: "↗" }}
      />
    </>
  );
}
