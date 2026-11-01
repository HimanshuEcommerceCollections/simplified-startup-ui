"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar } from "../../ServiceDetailKit";
import {
  PbBand,
  PbChips,
  PbCompare,
  PbDataTable,
  PbDecisions,
  PbFit,
  PbGlance,
  PbIncluded,
  PbProblems,
  PbProcess,
  PbStack,
  PbStandards,
  PbTiltGrid,
  PbWho,
  ScrambleWord,
  useCardRun,
  type PbCard,
  type PbLayer,
} from "../platform-builds/PlatformBlocks";
import {
  ICON_ARROW_RIGHT,
  ICON_BOLT,
  ICON_CAP,
  ICON_CHAT,
  ICON_DEVICES,
  ICON_DOC,
  ICON_DOWNLOAD,
  ICON_GRID4,
  ICON_INFO,
  ICON_LINK,
  ICON_PALETTE,
  ICON_PEN,
  ICON_REFRESH,
  ICON_SEARCH,
  ICON_SHIELD,
  ICON_SHIELD_CHECK,
  ICON_TAG,
  ICON_TREND,
  ICON_WINDOW,
} from "../platform-builds/icons";
import "./wfd-page.css";

const FRAMER_HREF = "/website-development/framer-development";
const WORDPRESS_HREF = "/website-development/wordpress-development";
const MIGRATION_HREF = "/website-development/website-redesign-migration";

/* -------- hero signature: Webflow Designer canvas + navigator -------- */

const NAV: { label: string; cls?: string }[] = [
  { label: "Section", cls: "sel" },
  { label: "Hero", cls: "ind" },
  { label: "Grid", cls: "ind" },
  { label: "Button", cls: "ind" },
  { label: "Footer" },
];

function WebflowDesignerCard() {
  const run = useCardRun();
  return (
    <SignatureCard
      ariaLabel="A Webflow designer canvas with a clean class system"
      className={`pb-card wfd-wf${run ? " run" : ""}`}
      live="Designer"
      corner="VISUAL DEV · CLEAN CODE"
      footLeft="Named classes, reusable parts"
      footRight="tidy as it grows →"
    >
      <div className="wfd-canvas">
        <div className="wfd-nav">
          {NAV.map((n) => (
            <span className={`wfd-wfn${n.cls ? ` ${n.cls}` : ""}`} key={n.label}>
              <i></i> {n.label}
            </span>
          ))}
        </div>
        <div className="wfd-art">
          <div className="wfd-wfa hero3 sel2">
            <span className="cls">hero-banner</span>
          </div>
          <div className="wfd-wfa grid3">
            <span className="gc"></span>
            <span className="gc"></span>
          </div>
          <div className="wfd-wfa btn3">
            <span className="cls">btn-primary</span>
          </div>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- content -------- */

const GLANCE = [
  "Visual development, clean code",
  "Built-in CMS",
  "Managed hosting and security",
  "Native interactions and animation",
  "Easy editing for marketers",
];

const FIT_NO = [
  "Large online stores with complex catalogs",
  "Sites needing heavy custom app logic",
  "Teams that need many plugins",
  "Very large content libraries with complex relations",
];
const FIT_YES = [
  "Marketing and brand websites",
  "Startup and SaaS websites",
  "Content hubs and blogs",
  "Teams who want to edit pages themselves",
  "Design-led brands with custom layouts",
];

const SERVICES: PbCard[] = [
  { icon: ICON_WINDOW, title: "Custom Webflow builds", text: "Sites built from your designs or ours." },
  { icon: ICON_ARROW_RIGHT, title: "Figma to Webflow", text: "Turning approved designs into a working site." },
  { icon: ICON_DOC, title: "CMS setup", text: "Collections for blogs, case studies, team, and more." },
  { icon: ICON_BOLT, title: "Interactions and animation", text: "Scroll effects and motion that support the story." },
  { icon: ICON_DOWNLOAD, title: "Migrations", href: MIGRATION_HREF, text: "Moving from WordPress, Squarespace, or Wix." },
  { icon: ICON_REFRESH, title: "Support and updates", text: "Ongoing changes, new pages, and improvements." },
];

const COMPARE = [
  { label: "Editing", cells: ["Visual editor for content and pages", "Block editor and plugins", "Visual, design-tool style editing"] },
  { label: "Hosting", cells: ["Managed by Webflow", "You choose and manage", "Managed by Framer"] },
  { label: "CMS", cells: ["Built-in collections", "Very flexible with plugins", "Built-in CMS"] },
  { label: "Maintenance", cells: ["Low", "Regular updates needed", "Low"] },
  { label: "Best for", cells: ["Marketing sites with rich CMS needs", "Content-heavy or plugin-heavy sites", "Fast, design-led marketing sites"] },
];

const LAYERS: PbLayer[] = [
  { icon: ICON_WINDOW, title: "Pages", kicker: "Includes", items: ["Static pages", "Landing pages", "Utility pages"] },
  { icon: ICON_DOC, title: "CMS collections", kicker: "Includes", items: ["Blog posts", "Case studies", "Team and FAQs"] },
  { icon: ICON_GRID4, title: "Components", kicker: "Includes", items: ["Navigation and footer", "Reusable sections", "Buttons and cards"] },
  { icon: ICON_PALETTE, title: "Style system", kicker: "Includes", items: ["Class naming system", "Colors and fonts", "Spacing rules"] },
];

const CLASSES: { icon: ReactNode; tier: string; title: string; text: string }[] = [
  { icon: ICON_SHIELD, tier: "Global styles", title: "The foundation", text: "Typography, colors, and spacing set once and reused." },
  { icon: ICON_TAG, tier: "Utility classes", title: "Small helpers", text: "Margins, alignment, and visibility." },
  { icon: ICON_GRID4, tier: "Component classes", title: "Reusable parts", text: "Cards, buttons, and sections with clear names." },
  { icon: ICON_WINDOW, tier: "Page-specific", title: "Only when needed", text: "Kept to a minimum so the site stays consistent." },
];

const PROCESS = [
  { title: "Discovery", text: "Goals, pages, CMS needs, and integrations.", out: "Sitemap and scope" },
  { title: "Design", text: "Desktop and mobile designs in Figma.", out: "Approved designs" },
  { title: "Build", text: "Webflow build with style system and components.", out: "Staging site" },
  { title: "CMS and content", text: "Collections set up and content added.", out: "Content-ready site" },
  { title: "SEO and testing", text: "Metadata, redirects, speed, and device testing.", out: "Launch-ready site" },
  { title: "Launch and training", text: "Go live and train your team on the Editor.", out: "Live site and handoff" },
];

const STANDARDS = [
  { icon: ICON_DEVICES, title: "Responsive layouts", text: "Tested on phones, tablets, and desktops." },
  { icon: ICON_GRID4, title: "Clean structure", text: "Organized classes and reusable components." },
  { icon: ICON_PEN, title: "Editable content", text: "Text and images your team can change." },
  { icon: ICON_TREND, title: "SEO settings", text: "Titles, descriptions, and Open Graph images." },
  { icon: ICON_BOLT, title: "Fast loading", text: "Optimized images and light interactions." },
  { icon: ICON_INFO, title: "Accessibility basics", text: "Headings, contrast, and alt text." },
  { icon: ICON_CHAT, title: "Forms connected", text: "Forms sent to email or your CRM." },
  { icon: ICON_TREND, title: "Analytics", text: "Tracking set up before launch." },
];

const INTEGRATIONS = [
  "HubSpot",
  "Google Analytics",
  "Zapier",
  "Make",
  "Mailchimp",
  "Calendly",
  "Stripe",
  "Airtable",
  "Hotjar",
  "Intercom",
  "Memberstack",
  "Finsweet Attributes",
];

const MIGRATION: [ReactNode, ReactNode, ReactNode][] = [
  [<a href={WORDPRESS_HREF} key="wp">WordPress</a>, "Pages, blog posts, and media", "URL mapping and redirects"],
  ["Squarespace", "Pages, content, and images", "Redirects and metadata carried over"],
  ["Wix", "Pages and key content", "Redirects and on-page SEO review"],
  ["Custom or legacy sites", "Pages and structured content", "Full redirect plan before launch"],
];

const DECISIONS = [
  { title: "What goes in the CMS?", text: "Content that repeats, like posts or case studies, usually belongs in collections." },
  { title: "Who edits what?", text: "We set up the Editor so each person can safely update their content." },
  { title: "How much animation?", text: "Enough to support the story without slowing the site down." },
  { title: "Which integrations?", text: "Forms, CRM, analytics, and scheduling tools connected from day one." },
];

const PROBLEMS = [
  { prob: "Messy, unnamed classes", fix: "A clear class naming system." },
  { prob: "Hard-to-edit pages", fix: "Content moved into editable fields and CMS." },
  { prob: "Heavy interactions slowing pages", fix: "Animations simplified and optimized." },
  { prob: "Forms going nowhere", fix: "Forms connected to email or CRM." },
  { prob: "Missing SEO settings", fix: "Metadata and Open Graph completed." },
  { prob: "Broken links after migration", fix: "Redirects mapped and tested." },
];

const INCLUDED = [
  { icon: ICON_SEARCH, text: "Discovery and sitemap planning" },
  { icon: ICON_PEN, text: "Design in Figma (or build from your designs)" },
  { icon: ICON_GRID4, text: "Webflow build with a clean class system" },
  { icon: ICON_GRID4, text: "Reusable components" },
  { icon: ICON_DOC, text: "CMS collections and templates" },
  { icon: ICON_BOLT, text: "Interactions and animations" },
  { icon: ICON_LINK, text: "Integrations and form setup" },
  { icon: ICON_TREND, text: "SEO settings and redirects" },
  { icon: ICON_SHIELD_CHECK, text: "Testing and launch" },
  { icon: ICON_CAP, text: "Editor training and handoff guide" },
];

const WHO = [
  { icon: ICON_BOLT, text: <><strong>Startups and SaaS companies</strong> needing a fast-moving marketing site.</> },
  { icon: ICON_PEN, text: <><strong>Marketing teams</strong> who want to edit without developers.</> },
  { icon: ICON_DOWNLOAD, text: <><strong>Brands moving off WordPress</strong> to reduce maintenance.</> },
  { icon: ICON_WINDOW, text: <><strong>Design-led companies</strong> with custom layouts.</> },
];

const FAQS = [
  {
    q: "How much does a Webflow website cost?",
    a: <>It depends on the number of pages, CMS needs, interactions, and integrations. <strong>Webflow plan fees are paid directly to Webflow.</strong> We share our pricing on the free call.</>,
  },
  { q: "Can I edit the site myself?", a: <>Yes. Your team can update <strong>text, images, and CMS content in Webflow’s editing tools.</strong></> },
  { q: "Is Webflow good for SEO?", a: <>Yes. Webflow gives control over <strong>metadata, URLs, and redirects,</strong> and we set up SEO basics before launch.</> },
  { q: "Can you build from our Figma designs?", a: <>Yes. We turn <strong>approved Figma designs into a responsive Webflow site.</strong></> },
  { q: "Who owns the site?", a: <>You do. <strong>The site lives in your Webflow account.</strong></> },
  {
    q: "Webflow or WordPress?",
    a: (
      <>
        Webflow suits <strong>design-led marketing sites with low maintenance;</strong>{" "}
        <a className="pb-link" href={WORDPRESS_HREF}>WordPress</a> suits plugin-heavy or very content-heavy sites. We’ll recommend the better fit.
      </>
    ),
  },
];

export default function WebflowDevelopmentView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="pb-hero wfd-hero"
        line1="Webflow sites that look custom and stay"
        line2={
          <>
            easy for your team to <ScrambleWord text="update." />
          </>
        }
        lead={
          <>
            Custom Webflow builds with clean structure, flexible CMS collections, and smooth interactions,{" "}
            <strong>so marketing can move fast without a developer.</strong>
          </>
        }
        primary={{ label: "Book a Webflow call", href: "/contact" }}
        secondary={{ label: "See what we build ↓", href: "#services" }}
      >
        <WebflowDesignerCard />
      </ServiceDetailHero>

      <TrustBar items={["Pixel-faithful custom builds", "CMS your team can manage", "Clean class naming system", "Hosting & security by Webflow"]} />

      <PbBand id="why" tone="dark" eyebrow="Why teams choose Webflow" heading="Design freedom without the usual maintenance.">
        <PbGlance
          paragraphs={[
            <>
              Webflow is a visual development platform that produces clean code and <strong>hosts your site for you.</strong>
            </>,
            <>Marketing teams can edit pages and publish content without touching code, while designers keep full control over layout.</>,
            <>
              It’s a strong fit for <strong>marketing sites, startups, and content-driven brands</strong> that want to move quickly.
            </>,
          ]}
          items={GLANCE}
        />
      </PbBand>

      <PbBand id="fit" tone="tint" eyebrow="When Webflow fits, and when it doesn’t" heading="An honest view before you commit.">
        <PbFit no={{ title: "Probably not the best fit", items: FIT_NO }} yes={{ title: "Often a great fit", items: FIT_YES }} />
      </PbBand>

      <PbBand id="services" eyebrow="Webflow services we offer" heading="From new builds to ongoing support.">
        <PbTiltGrid items={SERVICES} />
      </PbBand>

      <PbBand id="compare" tone="tint" eyebrow="Webflow vs WordPress vs Framer" heading="A general comparison to help you choose.">
        <PbCompare
          columns={[
            "Webflow",
            <a href={WORDPRESS_HREF} key="wp">
              WordPress <span aria-hidden="true">↗</span>
            </a>,
            <a href={FRAMER_HREF} key="fr">
              Framer <span aria-hidden="true">↗</span>
            </a>,
          ]}
          rows={COMPARE}
        />
      </PbBand>

      <PbBand id="blocks" eyebrow="How a Webflow site is structured" heading="Clean structure makes your site easier to grow.">
        <PbStack head="Your Webflow Site" conn="↓" layers={LAYERS} />
      </PbBand>

      <PbBand id="classes" tone="tint" eyebrow="Our class naming approach" heading="A consistent system keeps the site tidy as it grows.">
        <Reveal className="wfd-cn-list">
          {CLASSES.map((row) => (
            <article className="wfd-cn" key={row.tier}>
              <span className="ck">
                <span className="cki">{row.icon}</span>
                {row.tier}
              </span>
              <div className="cd">
                <b>{row.title}</b>
                <p>{row.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </PbBand>

      <PbBand id="process" eyebrow="How we build your Webflow site" heading="A clear process from planning to launch.">
        <PbProcess steps={PROCESS} />
      </PbBand>

      <PbBand id="standards" tone="tint" eyebrow="Quality standards on every build" heading="What every Webflow site we build includes.">
        <PbStandards items={STANDARDS} />
      </PbBand>

      <PbBand id="integrations" center eyebrow="Integrations" heading="Webflow connects with the tools your team already uses.">
        <PbChips items={INTEGRATIONS} />
      </PbBand>

      <PbBand
        id="migration"
        tone="tint"
        eyebrow={
          <a className="wfd-eyebrow-link" href={MIGRATION_HREF}>
            Migrating to Webflow
          </a>
        }
        heading="We plan every move so content and SEO come with you."
      >
        <PbDataTable head={["Moving from", "What we move", "How we protect SEO"]} rows={MIGRATION} />
      </PbBand>

      <PbBand id="decisions" eyebrow="Decisions we make together" heading="A few early choices shape the whole project.">
        <PbDecisions items={DECISIONS} />
      </PbBand>

      <PbBand id="problems" tone="tint" eyebrow="Common problems" heading="Common Webflow problems we fix.">
        <PbProblems rows={PROBLEMS} />
      </PbBand>

      <PbBand id="included" eyebrow="What’s included" heading="From discovery to Editor training and handoff.">
        <PbIncluded items={INCLUDED} />
      </PbBand>

      <PbBand id="forwho" tone="tint" eyebrow="Who it’s for" heading="Launch a Webflow site your team will love using.">
        <PbWho items={WHO} />
      </PbBand>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="Webflow Development"
        heading="Launch a Webflow site your team will love using."
        copy={
          <>
            Book a free call to plan your Webflow project:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your goals, team, and content needs.</strong>
          </>
        }
        primaryLabel="Book a Webflow call"
        primaryHref="/contact"
        secondary={{ label: "See what we build", href: "#services", arrow: "↗" }}
      />
    </>
  );
}
