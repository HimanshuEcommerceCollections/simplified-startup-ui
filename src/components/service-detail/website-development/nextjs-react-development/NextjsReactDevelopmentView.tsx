"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { ServiceDetailHero, ServiceFaq, TrustBar } from "../../ServiceDetailKit";
import {
  PbBand,
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
  ICON_APP,
  ICON_BAG,
  ICON_BOLT,
  ICON_CHECK_SM,
  ICON_CLOUD,
  ICON_CODE,
  ICON_DATABASE,
  ICON_DESKTOP,
  ICON_DOC,
  ICON_GIT,
  ICON_GRID4,
  ICON_INFO,
  ICON_LINK,
  ICON_LOCK,
  ICON_REFRESH,
  ICON_ROUTES,
  ICON_SEARCH,
  ICON_SHIELD_CHECK,
  ICON_STAGING,
  ICON_TAG,
  ICON_TEXT,
  ICON_TREND,
  ICON_USER_LOCK,
  ICON_USERS,
  ICON_WINDOW,
} from "../platform-builds/icons";
import "./nxd-page.css";

/* -------- hero signature: page.tsx code editor --------
   Built on the kit's .sd-card shell directly: the header's right side is window dots, not a text corner. */

function CodeEditorCard() {
  const run = useCardRun();
  return (
    <aside className={`sd-card pb-card nxd-nx${run ? " run" : ""}`} aria-label="A Next.js component being built">
      <div className="sd-card-top">
        <span className="lt">
          <span className="dot"></span> page.tsx
        </span>
        <span className="nxd-dots" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
      <div className="nxd-code">
        <span className="nxd-nxl">
          <span className="kw">export default function</span> <span className="fn">Page</span>() {"{"}
        </span>
        <span className="nxd-nxl ind">
          <span className="kw">return</span> (
        </span>
        <span className="nxd-nxl ind2">
          &lt;<span className="fn">Hero</span> title=<span className="st2">&quot;Fast by default&quot;</span> /&gt;
        </span>
        <span className="nxd-nxl ind2">
          &lt;<span className="fn">Content</span> source=<span className="st2">&quot;cms&quot;</span> /&gt;
        </span>
        <span className="nxd-nxl ind">
          ) <span className="cm">{"// server-rendered"}</span>
        </span>
        <span className="nxd-nxl">{"}"}</span>
      </div>
      <div className="nxd-build">
        {ICON_CHECK_SM}
        Build complete · SSR + static<span className="ms">0.8s</span>
      </div>
      <div className="sd-card-foot">
        <span>Typed, tested, documented</span>
        <span className="gt">you own the code →</span>
      </div>
    </aside>
  );
}

/* -------- content -------- */

const GLANCE = [
  "Full design and feature control",
  "Server rendering for SEO",
  "App-like features",
  "Headless CMS for content",
  "Needs developer support",
];

const FIT_NO = ["A standard marketing site", "A small team with no developer support", "A tight timeline", "Simple content and forms"];
const FIT_YES = [
  "Custom features or user accounts",
  "Complex integrations and data",
  "Strict performance or security needs",
  "Web apps or product dashboards",
  "Long-term growth plans",
];

const BUILDS: PbCard[] = [
  { icon: ICON_WINDOW, title: "Marketing websites", text: "Fast, SEO-friendly sites with a headless CMS." },
  { icon: ICON_APP, title: "Web apps", href: "/website-development/web-applications", text: "Dashboards, portals, and tools for your users." },
  { icon: ICON_BAG, title: "Headless commerce", href: "/website-development/headless-commerce", text: "Custom storefronts connected to Shopify or BigCommerce." },
  { icon: ICON_USER_LOCK, title: "Customer portals", href: "/website-development/web-applications", text: "Logins, accounts, and secure areas." },
  { icon: ICON_TAG, title: "Internal tools", text: "Tools that connect your data and teams." },
  { icon: ICON_REFRESH, title: "Rebuilds and upgrades", text: "Modernizing older React or legacy sites." },
];

const LAYERS: PbLayer[] = [
  { icon: ICON_WINDOW, title: "Front end", kicker: "Examples", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { icon: ICON_DOC, title: "Content", kicker: "Examples", items: ["Sanity", "Contentful", "Payload", "Strapi"] },
  { icon: ICON_DATABASE, title: "Data and services", kicker: "Examples", items: ["APIs", "Databases", "Authentication"] },
  { icon: ICON_CLOUD, title: "Hosting", kicker: "Examples", items: ["Vercel", "Netlify", "Cloud platforms"] },
];

const RENDERING: [ReactNode, ReactNode, ReactNode][] = [
  ["Static generation", "Pages built ahead of time", "Marketing and content pages"],
  ["Incremental updates", "Static pages refreshed as content changes", "Blogs and large content sites"],
  ["Server rendering", "Pages built on each request", "Personalized or frequently changing pages"],
  ["Client rendering", "Content loaded in the browser", "Dashboards and interactive tools"],
];

const SEO: { kicker: string; icon: ReactNode; title: string; text: string }[] = [
  { kicker: "Rendering", icon: ICON_WINDOW, title: "Search-friendly pages", text: "Important content rendered on the server or at build time." },
  { kicker: "Metadata", icon: ICON_TEXT, title: "Titles and descriptions", text: "Set per page, including social sharing images." },
  { kicker: "Structure", icon: ICON_ROUTES, title: "Clean URLs and sitemaps", text: "Logical routes, sitemaps, and robots rules." },
  { kicker: "Speed", icon: ICON_BOLT, title: "Core Web Vitals", text: "Optimized images, fonts, and scripts." },
  { kicker: "Schema", icon: ICON_GRID4, title: "Structured data", text: "Added where it helps search engines understand pages." },
  { kicker: "Foundations", icon: ICON_SHIELD_CHECK, title: "Planned from day one", text: "SEO is part of the build, not an afterthought." },
];

const PROCESS = [
  { title: "Discovery", text: "Goals, features, integrations, and content needs.", out: "Requirements and scope" },
  { title: "Architecture", text: "Framework, CMS, hosting, and data flow chosen.", out: "Technical plan" },
  { title: "Design", text: "User flows and interface designs.", out: "Approved designs" },
  { title: "Development", text: "Front end, CMS, and integrations built in stages.", out: "Working staging site" },
  { title: "Testing", text: "Performance, accessibility, and cross-device checks.", out: "Launch-ready build" },
  { title: "Launch and support", text: "Deployment, monitoring, and ongoing development.", out: "Live site and support plan" },
];

const STANDARDS = [
  { icon: ICON_CODE, title: "TypeScript", text: "Safer, easier-to-maintain code." },
  { icon: ICON_GIT, title: "Version control", text: "Code stored in your Git repository." },
  { icon: ICON_SHIELD_CHECK, title: "Code reviews", text: "Changes reviewed before merging." },
  { icon: ICON_STAGING, title: "Staging environments", text: "Test before anything goes live." },
  { icon: ICON_INFO, title: "Accessibility", text: "Built with semantic HTML and keyboard support." },
  { icon: ICON_BOLT, title: "Performance checks", text: "Monitored before and after launch." },
  { icon: ICON_DOC, title: "Documentation", text: "Setup and deployment notes for your team." },
  { icon: ICON_LOCK, title: "Security basics", text: "Safe handling of keys and user data." },
];

const AFTER = [
  { when: "Launch week", title: "Monitoring", text: "Errors, speed, and analytics watched closely." },
  { when: "First weeks", title: "Fixes and tweaks", text: "Small issues resolved and feedback applied." },
  { when: "Ongoing", title: "Updates", text: "Dependencies and security updates kept current." },
  { when: "As you grow", title: "New features", text: "Features added in planned releases." },
];

const EARLY = [
  { title: "Which CMS fits your editors?", text: "We match the CMS to how your team works." },
  { title: "Where will it be hosted?", text: "Hosting is chosen for speed, cost, and support needs." },
  { title: "What needs to connect?", text: "CRM, payments, analytics, or internal systems." },
  { title: "Who maintains it long term?", text: "Your team, our team, or a mix, planned upfront." },
];

const PROBLEMS = [
  { prob: "Slow pages from heavy scripts", fix: "Code splitting and optimized loading." },
  { prob: "Content changes need a developer", fix: "Headless CMS for editors." },
  { prob: "SEO issues on client-rendered pages", fix: "Server or static rendering for key pages." },
  { prob: "Outdated dependencies", fix: "Upgrades and regular maintenance." },
  { prob: "No documentation", fix: "Clear setup and deployment notes." },
];

const INCLUDED = [
  { icon: ICON_SEARCH, text: "Discovery and technical planning" },
  { icon: ICON_GRID4, text: "Architecture and stack selection" },
  { icon: ICON_WINDOW, text: "UI design or build from your designs" },
  { icon: ICON_CODE, text: "Next.js and React development" },
  { icon: ICON_DOC, text: "Headless CMS setup" },
  { icon: ICON_LINK, text: "Integrations and APIs" },
  { icon: ICON_TREND, text: "SEO and performance foundations" },
  { icon: ICON_SHIELD_CHECK, text: "Testing and accessibility checks" },
  { icon: ICON_CLOUD, text: "Deployment and hosting setup" },
  { icon: ICON_DOC, text: "Documentation and support plan" },
];

const WHO = [
  { icon: ICON_DESKTOP, text: <><strong>SaaS and tech companies</strong> needing marketing sites and web apps.</> },
  { icon: ICON_CODE, text: <><strong>Businesses with custom features</strong> that builders can’t handle.</> },
  { icon: ICON_USERS, text: <><strong>Teams with in-house developers</strong> who want a solid foundation.</> },
  { icon: ICON_REFRESH, text: <><strong>Companies replacing legacy sites</strong> with modern code.</> },
];

const FAQS = [
  {
    q: "How much does a custom Next.js website cost?",
    a: <>Custom builds vary widely by features, integrations, and design. <strong>We share pricing after scoping your project.</strong></>,
  },
  { q: "Can our team edit content without a developer?", a: <>Yes. We connect a <strong>headless CMS so editors can manage content easily.</strong></> },
  { q: "Is Next.js good for SEO?", a: <>It can be very strong for SEO when pages are rendered correctly. <strong>We plan SEO into the build.</strong></> },
  { q: "Who owns the code?", a: <>You do. <strong>Code lives in your repository and hosting accounts.</strong></> },
  {
    q: "Will you tell us if a builder is better?",
    a: (
      <>
        Yes. If{" "}
        <strong>
          <a className="pb-link" href="/website-development/webflow-development">Webflow</a> or{" "}
          <a className="pb-link" href="/website-development/framer-development">Framer</a> suits your needs better, we’ll say so.
        </strong>
      </>
    ),
  },
  { q: "Do you work with our existing designs?", a: <>Yes. We can <strong>build from your Figma designs</strong> or handle UI design as part of the project.</> },
];

export default function NextjsReactDevelopmentView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Website Development", href: "/website-development" }}
        className="pb-hero nxd-hero"
        line1="Custom-coded websites built for"
        line2={
          <>
            speed, scale, and <ScrambleWord text="flexibility." />
          </>
        }
        lead={
          <>
            Next.js and React builds for teams that need more than a website builder,{" "}
            <strong>with headless CMS, strong SEO foundations, and modern hosting.</strong>
          </>
        }
        primary={{ label: "Book a Next.js call", href: "/contact" }}
        secondary={{ label: "Is custom right for you? ↓", href: "#fit" }}
      >
        <CodeEditorCard />
      </ServiceDetailHero>

      <TrustBar items={["Fast, modern framework", "Headless CMS for editors", "SEO built into the code", "Clean, documented codebase"]} />

      <PbBand id="why" tone="dark" eyebrow="When a custom build makes sense" heading="Full control for sites that have outgrown builders.">
        <PbGlance
          paragraphs={[
            <>
              Website builders are great for many sites, but some projects need{" "}
              <strong>custom features, integrations, or performance control.</strong>
            </>,
            <>Next.js is a popular React framework that supports fast pages, strong SEO, and app-like features in one codebase.</>,
            <>
              A custom build gives you full flexibility, but it also means <strong>ongoing development support is part of the plan.</strong>
            </>,
          ]}
          items={GLANCE}
        />
      </PbBand>

      <PbBand id="fit" tone="tint" eyebrow="Custom code vs website builder" heading="Honest guidance before you choose.">
        <PbFit no={{ title: "A builder may be better", items: FIT_NO }} yes={{ title: "Custom often fits", items: FIT_YES }} />
      </PbBand>

      <PbBand id="builds" eyebrow="What we build" heading="From marketing sites to web apps.">
        <PbTiltGrid items={BUILDS} />
      </PbBand>

      <PbBand id="stack" tone="tint" eyebrow="A typical custom stack" heading="Each layer is chosen to fit your project.">
        <PbStack head="Your Next.js Website" conn="⇅" layers={LAYERS} />
      </PbBand>

      <PbBand id="rendering" eyebrow="Rendering options" heading="Next.js lets each page load in the way that suits it best.">
        <PbDataTable head={["Approach", "What it means", "Often used for"]} rows={RENDERING} />
      </PbBand>

      <PbBand id="seo" tone="tint" eyebrow="SEO built into the code" heading="Custom sites need SEO planned from the start.">
        <Reveal className="nxd-g6-grid">
          {SEO.map((card) => (
            <article className="nxd-g6" key={card.title}>
              <span className="g6k">{card.kicker}</span>
              <div className="g6i">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      </PbBand>

      <PbBand id="process" eyebrow="How we build" heading="A structured process for a technical project.">
        <PbProcess steps={PROCESS} />
      </PbBand>

      <PbBand id="standards" tone="tint" eyebrow="Engineering standards" heading="What every custom build includes.">
        <PbStandards items={STANDARDS} />
      </PbBand>

      <PbBand id="after" eyebrow="What happens after launch" heading="Custom sites keep improving after go-live.">
        <Reveal className="nxd-ct4">
          {AFTER.map((row) => (
            <div className="nxd-cte" key={row.title}>
              <span className="when">{row.when}</span>
              <span className="dot3"></span>
              <div className="box">
                <b>{row.title}</b>
                <p>{row.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </PbBand>

      <PbBand id="early" tone="tint" eyebrow="Questions we answer early" heading="Clear answers before we write code.">
        <PbDecisions items={EARLY} />
      </PbBand>

      <PbBand id="problems" eyebrow="Common problems" heading="Common custom site problems we fix.">
        <PbProblems rows={PROBLEMS} />
      </PbBand>

      <PbBand id="included" tone="tint" eyebrow="What’s included" heading="From discovery to documentation and support.">
        <PbIncluded items={INCLUDED} />
      </PbBand>

      <PbBand id="forwho" eyebrow="Who it’s for" heading="Build a website with no limits.">
        <PbWho items={WHO} />
      </PbBand>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="Custom Next.js & React Websites"
        heading="Build a website with no limits."
        copy={
          <>
            Book a free call to talk through your custom website or web app:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your requirements and suggest an approach.</strong>
          </>
        }
        primaryLabel="Book a Next.js call"
        primaryHref="/contact"
        secondary={{ label: "Is custom right for you?", href: "#fit", arrow: "↗" }}
      />
    </>
  );
}
