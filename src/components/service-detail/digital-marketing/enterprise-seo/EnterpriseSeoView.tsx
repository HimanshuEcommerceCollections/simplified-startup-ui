"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./ent-page.css";

/* -------- icons (shared across sections) -------- */

const ICON_TEMPLATE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 4v16" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_GEAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_GEAR_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_FILE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TICKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

/* -------- hero signature: SEO at scale card -------- */

const RIPPLE_CELLS = Array.from({ length: 16 }, (_, i) => i);
const TEAMS = ["Marketing", "Product", "Engineering", "Legal"];

function ScaleCard() {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: counter, ripple cells and team chips are shown in their end state on first paint
  const run = reduce || ran;

  return (
    <SignatureCard
      ariaLabel="How one template change ripples across thousands of pages"
      className={`ent-scl${run ? " run" : ""}`}
      live="SEO at scale"
      corner="SYSTEMS, NOT PAGES"
      footLeft="One change, thousands of pages"
      footRight="part of how you ship →"
    >
      <div className="ent-scl-body">
        <div className="ent-scl-tpl">
          <span className="ti">{ICON_TEMPLATE}</span>
          <span>
            <b>One template fix</b>
            <small>Product page layout</small>
          </span>
          <span className="cnt">×12,400</span>
        </div>
        <div className="ent-scl-ripple" aria-hidden="true">
          {RIPPLE_CELLS.map((i) => (
            <i key={i}></i>
          ))}
        </div>
        <div className="ent-scl-teams">
          {TEAMS.map((team) => (
            <span key={team}>{team}</span>
          ))}
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why (3 cards + dark quote) -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_PEOPLE, title: "Many teams touch the site", text: <>Marketing, product, engineering, and legal <strong>all shape what goes live.</strong></> },
  { icon: ICON_CALENDAR, title: "Releases follow schedules", text: <>SEO work has to fit <strong>sprint cycles and approval processes.</strong></> },
  { icon: ICON_TREND, title: "Leadership needs clarity", text: <>Reporting must <strong>connect search to business goals.</strong></> },
];

/* -------- challenges table -------- */

const CHALLENGES: { prob: string; fix: string }[] = [
  { prob: "Large sites search engines can’t fully crawl", fix: "Crawl priorities set through architecture, sitemaps, and internal links." },
  { prob: "SEO requests stuck in the dev backlog", fix: "Clear tickets with impact and effort, written for engineering teams." },
  { prob: "Inconsistent pages across teams", fix: "Shared templates, standards, and review checklists." },
  { prob: "Multiple countries and languages", fix: "Hreflang, regional structure, and localized content plans." },
  { prob: "Risky migrations and replatforms", fix: "Redirect mapping, pre-launch checks, and post-launch monitoring." },
  { prob: "Reports leadership doesn’t use", fix: "Dashboards tied to revenue, pipeline, or business goals." },
];

/* -------- 6 workstreams (tilt cards) -------- */

const WORKSTREAMS: { icon: ReactNode; title: ReactNode; text: string }[] = [
  { icon: ICON_GEAR, title: "Technical SEO at scale", text: "Templates, crawl management, rendering, and site performance." },
  { icon: ICON_FILE, title: "Content operations", text: "Content standards, briefs, and workflows across teams." },
  { icon: ICON_GLOBE, title: "International SEO", text: "Hreflang, country sites, and localization planning." },
  {
    icon: ICON_REFRESH,
    title: <a href="/website-development/website-redesign-migration">Migrations &amp; replatforming</a>,
    text: "Planning and protecting search visibility through big changes.",
  },
  { icon: ICON_TREND, title: "Reporting & dashboards", text: "Executive and team-level reporting in your BI tools." },
  { icon: ICON_CAP, title: "Training & enablement", text: "SEO training for writers, developers, and product teams." },
];

function WorkstreamGrid() {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="ent-ws-grid">
        {WORKSTREAMS.map((ws, i) => (
          <article className="ent-ws" key={i} data-tilt>
            <span className="ent-ws-spot"></span>
            <div className="wi">{ws.icon}</div>
            <h3>{ws.title}</h3>
            <p>{ws.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- RACI matrix -------- */

type Role = "lead" | "sup" | "na";

const RACI_TEAMS = ["SEO team", "Engineering", "Content", "Leadership"];
const RACI: { activity: string; roles: Role[] }[] = [
  { activity: "SEO strategy & priorities", roles: ["lead", "sup", "sup", "lead"] },
  { activity: "Technical fixes & releases", roles: ["sup", "lead", "na", "na"] },
  { activity: "Content creation & updates", roles: ["sup", "na", "lead", "na"] },
  { activity: "Template & design changes", roles: ["sup", "lead", "sup", "na"] },
  { activity: "Reporting & goals", roles: ["lead", "na", "sup", "lead"] },
];

function RaciCell({ role }: { role: Role }) {
  if (role === "lead") {
    return (
      <span className="lead">
        <i></i>
        <i></i>
        <span className="ent-vh">Leads</span>
      </span>
    );
  }
  if (role === "sup") {
    return (
      <span className="sup">
        <i></i>
        <span className="ent-vh">Supports</span>
      </span>
    );
  }
  return (
    <span className="na">
      <span aria-hidden="true">–</span>
      <span className="ent-vh">Not usually involved</span>
    </span>
  );
}

function RaciTable() {
  // the design observes the table itself (threshold .15) and pops the dots in once
  const [ref, inView] = useInView<HTMLTableElement>({ threshold: 0.15 });
  return (
    <Reveal className="ent-raci-wrap">
      <table className={`ent-raci${inView ? " in" : ""}`} ref={ref}>
        <thead>
          <tr>
            <th scope="col">Activity</th>
            {RACI_TEAMS.map((team) => (
              <th scope="col" key={team}>
                {team}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RACI.map((row) => (
            <tr key={row.activity}>
              <th scope="row">{row.activity}</th>
              {row.roles.map((role, i) => (
                <td key={i}>
                  <RaciCell role={role} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

/* -------- rhythm (3 cards) -------- */

const RHYTHM: { cadence: string; title: string; items: string[] }[] = [
  { cadence: "Weekly", title: "Working sessions", items: ["Ticket reviews with engineering", "Content priorities", "Issue monitoring"] },
  { cadence: "Monthly", title: "Performance review", items: ["Dashboard walkthrough", "Wins and blockers", "Next month’s priorities"] },
  { cadence: "Quarterly", title: "Strategy review", items: ["Leadership update", "Roadmap refresh", "Goal setting"] },
];

/* -------- tools (12) -------- */

const TOOLS = [
  "Google Search Console",
  "GA4",
  "Adobe Analytics",
  "Looker Studio",
  "BigQuery",
  "Jira",
  "Confluence",
  "Screaming Frog",
  "Ahrefs",
  "Semrush",
  "Botify",
  "Slack",
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_LIST_CHECK, text: "Enterprise SEO audit and roadmap" },
  { icon: ICON_GEAR_PLAIN, text: "Technical SEO recommendations at the template level" },
  { icon: ICON_TICKET, text: "Developer-ready tickets in your project tool" },
  { icon: ICON_FILE, text: "SEO standards and governance documentation" },
  { icon: ICON_GLOBE, text: "International SEO review (if applicable)" },
  { icon: ICON_REFRESH, text: "Migration planning and monitoring (when needed)" },
  { icon: ICON_TREND, text: "Executive and team dashboards" },
  { icon: ICON_CAP, text: "Training sessions for internal teams" },
  { icon: ICON_CALENDAR, text: "Weekly, monthly, and quarterly check-ins" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay?: number }[] = [
  { icon: ICON_GRID, text: <><strong>Large websites</strong> with many templates, sections, or product pages.</> },
  { icon: ICON_GLOBE, text: <><strong>Companies with multiple brands or regions</strong> managing several sites.</>, delay: 60 },
  { icon: ICON_REFRESH, text: <><strong>Organizations planning a migration</strong> or major redesign.</>, delay: 120 },
  { icon: ICON_PEOPLE, text: <><strong>In-house SEO teams</strong> that need extra capacity or specialist support.</>, delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does enterprise SEO cost?", a: <>It depends on site size, workstreams, and level of involvement. <strong>We share pricing after an initial discovery call.</strong></> },
  { q: "Can you work with our in-house SEO team?", a: <>Yes. We can <strong>lead, support, or fill specific gaps</strong> alongside your team.</> },
  { q: "Do you work within our development process?", a: <>Yes. We write tickets for your tools, join planning sessions, and <strong>fit your release cycles.</strong></> },
  {
    q: "Can you help with a site migration?",
    a: (
      <>
        Yes. We plan redirects, run pre-launch checks, and <strong>monitor search performance after launch.</strong> See our{" "}
        <a className="ent-faq-link" href="/website-development/website-redesign-migration">website redesign and migration</a> service.
      </>
    ),
  },
  { q: "Will you sign an NDA and follow our security policies?", a: <>Yes. <strong>We’re happy to work within your security and access requirements.</strong></> },
  { q: "Can you scale up or down as priorities change?", a: <>Yes. Engagements are built from <strong>workstreams you can add or pause</strong> as roadmaps and priorities shift each quarter.</> },
];

/* -------- page -------- */

export default function EnterpriseSeoView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "SEO", href: "/digital-marketing/seo" }}
        line1="SEO for large sites, many"
        line2={
          <>
            teams, and complex <span className="grad-text">releases.</span>
          </>
        }
        lead={
          <>
            Enterprise SEO that works inside your processes:{" "}
            <strong>technical SEO at scale, clear governance, and reporting that leadership can act on.</strong>
          </>
        }
        primary={{ label: "Book an enterprise SEO call", href: "/contact" }}
        secondary={{ label: "See our approach ↓", href: "#workstreams" }}
      >
        <ScaleCard />
      </ServiceDetailHero>

      <TrustBar items={["Technical SEO at scale", "Governance & ownership", "International & migrations", "Leadership reporting"]} />

      {/* WHY DIFFERENT */}
      <section className="band tint ent-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it’s different</span>
            <h2>Scale changes everything.</h2>
            <p>
              On large websites, SEO is less about single pages and more about systems: templates, workflows, approvals, and how
              teams work together. A small change can affect thousands of pages.
            </p>
          </Reveal>
          <Reveal className="ent-surf-grid">
            {WHY.map((card) => (
              <article className="ent-surf" key={card.title}>
                <div className="si2">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="ent-why-quote">
            Enterprise SEO succeeds when it becomes part of how the organization ships, <span>not an afterthought.</span>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="band ent-sec" id="challenges">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common challenges</span>
            <h2>Enterprise SEO challenges we solve.</h2>
          </Reveal>
          <Reveal className="ent-fix-tbl">
            <div className="ent-fix-row head">
              <div>The challenge</div>
              <div>How we approach it</div>
            </div>
            {CHALLENGES.map((row) => (
              <div className="ent-fix-row" key={row.prob}>
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

      {/* WORKSTREAMS */}
      <section className="band tint ent-sec" id="workstreams">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Workstreams</span>
            <h2>Enterprise SEO workstreams.</h2>
            <p>Engagements are built from these workstreams, based on your priorities.</p>
          </Reveal>
          <WorkstreamGrid />
        </div>
      </section>

      {/* GOVERNANCE RACI */}
      <section className="band ent-sec" id="governance">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Governance</span>
            <h2>Who owns what.</h2>
            <p>Clear ownership keeps SEO moving. Here’s a typical model, adjusted to your organization.</p>
          </Reveal>
          <RaciTable />
          <Reveal className="ent-raci-legend">
            <span>
              <span className="l2" aria-hidden="true">
                <i></i>
                <i></i>
              </span>{" "}
              Leads
            </span>
            <span>
              <span className="l1" aria-hidden="true">
                <i></i>
              </span>{" "}
              Supports
            </span>
            <span>
              <span className="na" aria-hidden="true">–</span> Not usually involved
            </span>
          </Reveal>
        </div>
      </section>

      {/* RHYTHM */}
      <section className="band tint ent-sec" id="rhythm">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Working rhythm</span>
            <h2>Engagement rhythm.</h2>
            <p>A predictable cadence keeps everyone aligned.</p>
          </Reveal>
          <Reveal className="ent-rhy-grid">
            {RHYTHM.map((card) => (
              <article className="ent-rhy" key={card.cadence}>
                <span className="rt2">{card.cadence}</span>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TOOLS */}
      <section className="band ent-sec" id="tools">
        <div className="wrap">
          <Reveal className="sec-head" style={{ margin: "0 auto 36px", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Tools
            </span>
            <h2>Tools we work with.</h2>
            <p>We plug into the tools your teams already use.</p>
          </Reveal>
          <Reveal className="ent-tool-grid">
            {TOOLS.map((tool) => (
              <article className="ent-tool" key={tool}>
                <span className="td"></span>
                {tool}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint ent-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>From an enterprise roadmap to team training.</h2>
          </Reveal>
          <Reveal className="ent-inc2-grid">
            {INCLUDED.map((item) => (
              <div className="ent-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band ent-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who needs enterprise SEO</span>
            <h2>Make SEO part of how you ship.</h2>
          </Reveal>
          <div className="ent-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="ent-who" key={i} style={d(item.delay ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every engagement." />

      <CtaBand
        id="start"
        eyebrow="Enterprise SEO Services"
        heading="Make SEO part of how your organization ships."
        copy={
          <>
            Book a free call:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your site, your teams, and where SEO gets stuck.</strong>
          </>
        }
        primaryLabel="Book an enterprise SEO call"
        primaryHref="/contact"
        secondary={{ label: "See our approach", href: "#workstreams", arrow: "↗" }}
      />
    </>
  );
}
