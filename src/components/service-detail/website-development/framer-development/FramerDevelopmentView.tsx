"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar } from "../../ServiceDetailKit";
import {
  PbBand,
  PbChips,
  PbCompare,
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
  ICON_ARROW_DOWN,
  ICON_ARROW_NAV,
  ICON_ARROW_RIGHT,
  ICON_BOLT,
  ICON_CAP,
  ICON_CHAT,
  ICON_DEVICES,
  ICON_DOC,
  ICON_DOWNLOAD,
  ICON_GRID4,
  ICON_INFO,
  ICON_LANDING,
  ICON_LINK,
  ICON_PEN,
  ICON_SEARCH,
  ICON_SHIELD_CHECK,
  ICON_SPARK,
  ICON_STYLES,
  ICON_TREND,
  ICON_WINDOW,
} from "../platform-builds/icons";
import "./frd-page.css";

const WEBFLOW_HREF = "/website-development/webflow-development";

/* -------- hero signature: Framer design canvas -------- */

function FramerCanvasCard() {
  const run = useCardRun();
  return (
    <SignatureCard
      ariaLabel="A Framer design canvas building a page with motion"
      className={`pb-card frd-fr${run ? " run" : ""}`}
      live="Design canvas"
      corner="DESIGN & PUBLISH"
      footLeft="Designed, animated, live"
      footRight="one tool, no code →"
    >
      <div className="frd-canvas">
        <div className="frd-layers">
          {["Hero", "Cards", "CTA row", "Footer"].map((layer) => (
            <span className="frd-frl" key={layer}>
              <i></i> {layer}
            </span>
          ))}
        </div>
        <div className="frd-art">
          <span className="frd-badge">
            {ICON_BOLT}
            Scroll reveal
          </span>
          <div className="frd-fra hero2">
            <span className="hl"></span>
          </div>
          <div className="frd-fra cards">
            <span className="fc2"></span>
            <span className="fc2"></span>
            <span className="fc2"></span>
          </div>
          <div className="frd-fra row2"></div>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- content -------- */

const GLANCE = ["Design and publish in one place", "Built-in motion and effects", "Simple CMS", "Managed hosting", "Quick updates"];

const FIT_NO = [
  "Large online stores",
  "Complex content with many relationships",
  "Heavy integrations or custom logic",
  "Very large multi-author blogs",
];
const FIT_YES = [
  "Startup and product launch sites",
  "Portfolios and agency sites",
  "Landing pages and campaigns",
  "Design-focused brand sites",
  "Small to medium content sites",
];

const SERVICES: PbCard[] = [
  { icon: ICON_WINDOW, title: "Full website builds", text: "Multi-page sites designed and built in Framer." },
  { icon: ICON_LANDING, title: "Landing pages", text: "Focused pages for launches and campaigns." },
  { icon: ICON_ARROW_RIGHT, title: "Figma to Framer", text: "Turning your designs into live Framer pages." },
  { icon: ICON_BOLT, title: "Motion and effects", text: "Scroll, hover, and page transitions done tastefully." },
  { icon: ICON_DOC, title: "CMS setup", text: "Collections for blogs, changelogs, or case studies." },
  { icon: ICON_DOWNLOAD, title: "Migrations", text: "Moving from Webflow, WordPress, or other builders." },
];

const LAYERS: PbLayer[] = [
  { icon: ICON_WINDOW, title: "Pages", kicker: "Includes", items: ["Home and core pages", "Landing pages", "Legal pages"] },
  { icon: ICON_GRID4, title: "Components", kicker: "Includes", items: ["Navigation", "Reusable sections", "Buttons and cards"] },
  { icon: ICON_DOC, title: "CMS", kicker: "Includes", items: ["Blog posts", "Case studies", "Changelog"] },
  { icon: ICON_STYLES, title: "Styles", kicker: "Includes", items: ["Color styles", "Text styles", "Breakpoints"] },
];

const MOTION: { kicker: string; icon: ReactNode; title: string; text: string }[] = [
  { kicker: "Entrance", icon: ICON_ARROW_DOWN, title: "Gentle reveals", text: "Content fades or slides in as visitors scroll." },
  { kicker: "Interaction", icon: ICON_SPARK, title: "Responsive details", text: "Hover and press states that feel polished." },
  { kicker: "Navigation", icon: ICON_ARROW_NAV, title: "Smooth transitions", text: "Page and section changes that feel connected." },
  { kicker: "Restraint", icon: ICON_BOLT, title: "Performance first", text: "Motion kept light so pages stay fast and accessible." },
];

const PROCESS = [
  { title: "Discovery", text: "Goals, pages, content, and brand direction.", out: "Sitemap and scope" },
  { title: "Design", text: "Pages designed directly in Framer or Figma.", out: "Approved designs" },
  { title: "Build", text: "Responsive layouts, components, and motion.", out: "Staging site" },
  { title: "CMS and content", text: "Collections set up and content added.", out: "Content-ready site" },
  { title: "SEO and launch", text: "Metadata, redirects, testing, and go-live.", out: "Live site and training" },
];

const STANDARDS = [
  { icon: ICON_DEVICES, title: "Responsive breakpoints", text: "Checked on desktop, tablet, and mobile." },
  { icon: ICON_GRID4, title: "Reusable components", text: "Consistent sections across pages." },
  { icon: ICON_PEN, title: "Editable content", text: "Text and images your team can update." },
  { icon: ICON_TREND, title: "SEO settings", text: "Page titles, descriptions, and social images." },
  { icon: ICON_BOLT, title: "Light motion", text: "Smooth without slowing pages down." },
  { icon: ICON_INFO, title: "Accessibility basics", text: "Readable text, contrast, and alt text." },
  { icon: ICON_CHAT, title: "Forms connected", text: "Sent to email or your tools." },
  { icon: ICON_TREND, title: "Analytics", text: "Tracking ready at launch." },
];

const COMPARE = [
  { label: "Feels like", cells: ["A design tool", "A visual development tool"] },
  { label: "Motion", cells: ["Very smooth and quick to build", "Powerful, more detailed control"] },
  { label: "CMS", cells: ["Simple and easy to manage", "More advanced collections"] },
  { label: "Learning curve", cells: ["Easier for designers", "More technical"] },
  { label: "Best for", cells: ["Launches, portfolios, and design-led sites", "Content-rich marketing sites"] },
];

const INTEGRATIONS = [
  "HubSpot",
  "Google Analytics",
  "Calendly",
  "Zapier",
  "Mailchimp",
  "Typeform",
  "Stripe links",
  "Hotjar",
  "Intercom",
  "Loom",
  "YouTube",
  "Figma",
];

const DECISIONS = [
  { title: "How much motion?", text: "Enough to feel premium without slowing the site." },
  { title: "What needs a CMS?", text: "Repeating content like posts or case studies." },
  { title: "Do you need multiple languages?", text: "We can plan localized versions where Framer supports it." },
  { title: "Who will edit the site?", text: "We set up components so edits are safe and simple." },
];

const PROBLEMS = [
  { prob: "Animations everywhere", fix: "Motion trimmed to what helps the story." },
  { prob: "Layouts breaking on mobile", fix: "Breakpoints rebuilt and tested." },
  { prob: "Repeated sections copied by hand", fix: "Reusable components created." },
  { prob: "Missing page metadata", fix: "SEO settings completed." },
  { prob: "Hard-to-find content", fix: "Clear navigation and page structure." },
];

const INCLUDED = [
  { icon: ICON_SEARCH, text: "Discovery and sitemap planning" },
  { icon: ICON_PEN, text: "Design in Framer or Figma" },
  { icon: ICON_DEVICES, text: "Responsive Framer build" },
  { icon: ICON_GRID4, text: "Reusable components and styles" },
  { icon: ICON_BOLT, text: "Motion and interactions" },
  { icon: ICON_DOC, text: "CMS collections" },
  { icon: ICON_LINK, text: "Integrations and forms" },
  { icon: ICON_TREND, text: "SEO settings and redirects" },
  { icon: ICON_SHIELD_CHECK, text: "Testing and launch" },
  { icon: ICON_CAP, text: "Training and handoff guide" },
];

const WHO = [
  { icon: ICON_BOLT, text: <><strong>Startups</strong> launching a product or raising funds.</> },
  { icon: ICON_WINDOW, text: <><strong>Agencies and studios</strong> showcasing their work.</> },
  { icon: ICON_LANDING, text: <><strong>Brands running campaigns</strong> that need landing pages fast.</> },
  { icon: ICON_DOWNLOAD, text: <><strong>Teams moving from heavier builders</strong> to something simpler.</> },
];

const FAQS = [
  {
    q: "How much does a Framer website cost?",
    a: <>It depends on the number of pages, motion, CMS needs, and integrations. <strong>Framer plan fees are paid directly to Framer.</strong> We share our pricing on the free call.</>,
  },
  { q: "Can my team edit the site?", a: <>Yes. <strong>Framer makes it easy to update text, images, and CMS content.</strong></> },
  { q: "Is Framer good for SEO?", a: <>Framer supports page titles, descriptions, and clean URLs, and <strong>we set up SEO basics before launch.</strong></> },
  {
    q: "Framer or Webflow?",
    a: <>Framer suits fast, design-led sites. <a className="pb-link" href={WEBFLOW_HREF}>Webflow</a> suits more complex CMS needs. <strong>We’ll recommend the better fit.</strong></>,
  },
  { q: "Who owns the site?", a: <>You do. <strong>The site lives in your Framer account.</strong></> },
  {
    q: "How fast can you launch?",
    a: <>Framer is built for speed: <strong>landing pages can move quickly, and full sites depend on pages, content, and motion.</strong> We plan the timeline upfront.</>,
  },
];

export default function FramerDevelopmentView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="pb-hero frd-hero"
        line1="Design-led Framer sites that launch"
        line2={
          <>
            fast and feel <ScrambleWord text="alive." />
          </>
        }
        lead={
          <>
            Framer websites with smooth motion, clean layouts, and a simple CMS,{" "}
            <strong>ideal for startups and brands that want to move quickly.</strong>
          </>
        }
        primary={{ label: "Book a Framer call", href: "/contact" }}
        secondary={{ label: "See what we build ↓", href: "#services" }}
      >
        <FramerCanvasCard />
      </ServiceDetailHero>

      <TrustBar items={["Fast design-to-launch", "Smooth, tasteful motion", "Simple built-in CMS", "Easy edits for your team"]} />

      <PbBand id="why" tone="dark" eyebrow="Why Framer works for modern brands" heading="A design tool and a website builder in one.">
        <PbGlance
          paragraphs={[
            <>
              Framer lets you design and publish real websites from the same tool, <strong>with hosting included.</strong>
            </>,
            <>It’s known for smooth animations and polished layouts that feel premium without heavy code.</>,
            <>
              For startups, launches, and marketing sites, it can <strong>shorten the path from idea to live site.</strong>
            </>,
          ]}
          items={GLANCE}
        />
      </PbBand>

      <PbBand id="fit" tone="tint" eyebrow="When Framer fits, and when it doesn’t" heading="Framer is great for some sites and less ideal for others.">
        <PbFit no={{ title: "Probably not the best fit", items: FIT_NO }} yes={{ title: "Often a great fit", items: FIT_YES }} />
      </PbBand>

      <PbBand id="services" eyebrow="Framer services we offer" heading="From one landing page to a full website.">
        <PbTiltGrid items={SERVICES} />
      </PbBand>

      <PbBand id="blocks" tone="tint" eyebrow="How a Framer site is organized" heading="Simple building blocks make editing easy.">
        <PbStack head="Your Framer Site" conn="↓" layers={LAYERS} />
      </PbBand>

      <PbBand id="motion" eyebrow="Motion with purpose" heading="Animation should guide attention, not distract from it.">
        <Reveal className="frd-g6-grid">
          {MOTION.map((card) => (
            <article className="frd-g6" key={card.title}>
              <span className="g6k">{card.kicker}</span>
              <div className="g6i">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      </PbBand>

      <PbBand id="process" tone="tint" eyebrow="How we build your Framer site" heading="A focused process built for speed.">
        <PbProcess steps={PROCESS} />
      </PbBand>

      <PbBand id="standards" eyebrow="Quality standards on every Framer build" heading="What every site includes.">
        <PbStandards items={STANDARDS} />
      </PbBand>

      <PbBand id="vs" tone="tint" eyebrow="Framer vs Webflow" heading="Both are strong visual builders with different strengths.">
        <PbCompare
          columns={[
            "Framer",
            <a href={WEBFLOW_HREF} key="wf">
              Webflow <span aria-hidden="true">↗</span>
            </a>,
          ]}
          rows={COMPARE}
        />
      </PbBand>

      <PbBand id="integrations" center eyebrow="Integrations" heading="Framer works with many common marketing tools.">
        <PbChips items={INTEGRATIONS} />
      </PbBand>

      <PbBand id="decisions" tone="tint" eyebrow="Decisions we make together" heading="Early choices that shape your Framer site.">
        <PbDecisions items={DECISIONS} />
      </PbBand>

      <PbBand id="problems" eyebrow="Common problems" heading="Common Framer problems we fix.">
        <PbProblems rows={PROBLEMS} />
      </PbBand>

      <PbBand id="included" tone="tint" eyebrow="What’s included" heading="From discovery to training and handoff.">
        <PbIncluded items={INCLUDED} />
      </PbBand>

      <PbBand id="forwho" eyebrow="Who it’s for" heading="Launch a Framer site that feels premium.">
        <PbWho items={WHO} />
      </PbBand>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="Framer Development"
        heading="Launch a Framer site that feels premium."
        copy={
          <>
            Book a free call to plan your Framer project:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              we’ll talk through whether Framer suits your site and plan a build around your timeline.
            </strong>
          </>
        }
        primaryLabel="Book a Framer call"
        primaryHref="/contact"
        secondary={{ label: "See what we build", href: "#services", arrow: "↗" }}
      />
    </>
  );
}
