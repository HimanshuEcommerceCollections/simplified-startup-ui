"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./mss-page.css";

/* -------- icons -------- */

const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SOCIAL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: team structure org chart -------- */

function OrgCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the chart is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="How support staff fit into your team"
      className={`mss-org${run ? " run" : ""}`}
      live="Team structure"
      corner="THEY EXECUTE · YOU DIRECT"
      footLeft="Your team directs"
      footRight="support handles execution →"
    >
      <div className="mss-org-body">
        <div className="mss-org-you">
          <div className="mss-on you">
            <b>You / Founder</b>
            <small>Sets goals &amp; priorities</small>
          </div>
        </div>
        <div className="mss-org-conn"></div>
        <div className="mss-org-leads">
          <div className="mss-on lead">
            <b>Marketing Lead</b>
            <small>Your marketer or agency</small>
          </div>
          <div className="mss-on lead">
            <b>Sales Lead</b>
            <small>Your AE or founder-seller</small>
          </div>
        </div>
        <div className="mss-org-sup">
          <div className="mss-on">
            <b>Marketing Support</b>
            <small>Coordinator · Social · Content · Ads</small>
          </div>
          <div className="mss-on">
            <b>Sales Support</b>
            <small>SDR · Research · CRM · CS</small>
          </div>
        </div>
        <div className="mss-org-crm">⇅ Shared CRM: one source of truth for leads &amp; deals</div>
      </div>
    </SignatureCard>
  );
}

/* -------- where sales time goes (count-ups) -------- */

type Stat = { count: number; prefix?: string; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 28,
    suffix: "%",
    label: "Time actually selling",
    text: (
      <>
        Share of a rep’s week spent selling. The rest goes to deal management and data entry. <em>Salesforce, State of Sales</em>
      </>
    ),
    delay: 0,
  },
  {
    // the design splits this as count 9 + suffix ".3%", which would count "0.3%" to "9.3%"; counted as a decimal here
    count: 9.3,
    suffix: "%",
    label: "Researching prospects",
    text: (
      <>
        Share of the week reps spend researching prospects: work support staff can take on. <em>Salesforce</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 69,
    suffix: "%",
    label: "Say selling is harder",
    text: (
      <>
        Share of sales professionals who say selling is harder now than before. <em>Salesforce</em>
      </>
    ),
    delay: 160,
  },
  {
    count: 70,
    prefix: "~",
    suffix: "%",
    label: "Overwhelmed by tools",
    text: (
      <>
        Share of reps who say they feel overwhelmed by the number of tools they use. <em>Salesforce</em>
      </>
    ),
    delay: 240,
  },
];

/* the design fires the count-ups once the stats block scrolls past 85% of the viewport */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

function formatStat(value: number, decimal: boolean) {
  return decimal ? value.toFixed(1) : String(Math.round(value));
}

function StatCard({ stat, run, reduce }: { stat: Stat; run: boolean; reduce: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || reduce) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(e * stat.count);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, stat.count]);

  // reduced motion: the final figure is derived at render, no animation
  const shown = reduce ? stat.count : value;
  const decimal = stat.count % 1 !== 0;

  return (
    <Reveal className="mss-stat" style={d(stat.delay)}>
      <div className="sv">
        {stat.prefix}
        {formatStat(shown, decimal)}
        {stat.suffix}
      </div>
      <span className="sk">{stat.label}</span>
      <p>{stat.text}</p>
    </Reveal>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  const [gridRef, inView] = useInView<HTMLDivElement>(STATS_IO);
  return (
    <div className="mss-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- roles we place -------- */

type Role = { tag: "mkt" | "sales"; icon: ReactNode; title: string; text: string; tools: string };

const ROLES: Role[] = [
  {
    tag: "mkt",
    icon: ICON_CALENDAR,
    title: "Marketing Coordinator",
    text: "Keeps campaigns on schedule, manages the content calendar, and coordinates with designers and vendors.",
    tools: "Asana, ClickUp, HubSpot, Google Workspace",
  },
  {
    tag: "mkt",
    icon: ICON_SOCIAL,
    title: "Social Media Assistant",
    text: "Schedules posts, replies to comments and DMs, and pulls weekly performance reports.",
    tools: "Meta Business Suite, Buffer, Later, Canva",
  },
  {
    tag: "mkt",
    icon: ICON_MAIL,
    title: "Content & Email Assistant",
    text: "Formats blogs, uploads to your CMS, builds newsletters, and keeps email lists clean.",
    tools: "WordPress, Webflow, Klaviyo, Mailchimp",
  },
  {
    tag: "mkt",
    icon: ICON_TARGET,
    title: "Paid Ads Assistant",
    text: "Uploads creative, monitors budgets, and prepares reports for your ads manager.",
    tools: "Google Ads, Meta Ads Manager, LinkedIn Campaign Manager",
  },
  {
    tag: "sales",
    icon: ICON_LIST_CHECK,
    title: "Sales Development Rep (SDR)",
    text: "Researches prospects, runs outreach, follows up, and books meetings for your account executives.",
    tools: "Apollo, Sales Navigator, Instantly, HubSpot",
  },
  {
    tag: "sales",
    icon: ICON_SEARCH,
    title: "Lead Research Assistant",
    text: "Builds and verifies prospect lists and adds company and contact details to your CRM.",
    tools: "Apollo, Clay, ZoomInfo, LinkedIn",
  },
  {
    tag: "sales",
    icon: ICON_TREND,
    title: "CRM & Sales Admin",
    text: "Keeps deals, contacts, and pipeline stages up to date and prepares proposals and reports.",
    tools: "HubSpot, Salesforce, Pipedrive, GoHighLevel",
  },
  {
    tag: "sales",
    icon: ICON_SHIELD_CHECK,
    title: "Customer Success Assistant",
    text: "Handles onboarding emails, renewal reminders, and check-ins with existing customers.",
    tools: "Intercom, Zendesk, HubSpot, Gmail",
  },
];

/* -------- how it fits together -------- */

const STRUCTURE: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_STAR, text: <><strong>You / Founder</strong> set goals and priorities: the direction everything rolls up to.</>, delay: 0 },
  { icon: ICON_PEOPLE, text: <><strong>Your Marketing &amp; Sales Leads</strong> (in-house, agency, or founder-seller) own strategy and set the day’s priorities.</>, delay: 80 },
  { icon: ICON_CHECK, text: <><strong>Support staff execute</strong>: coordinator, social, content, ads, SDR, research, CRM, CS, all logging to one shared CRM.</>, delay: 160 },
];

/* -------- skills matrix -------- */

const MATRIX_COLS = ["HubSpot", "Salesforce", "Canva", "Meta / Google Ads", "Apollo", "Klaviyo / Mailchimp", "Asana / ClickUp"];

const MATRIX_ROWS: { role: string; dots: (0 | 1)[] }[] = [
  { role: "Marketing Coordinator", dots: [1, 0, 1, 0, 0, 1, 1] },
  { role: "Social Media Assistant", dots: [0, 0, 1, 1, 0, 0, 1] },
  { role: "Content & Email Assistant", dots: [1, 0, 1, 0, 0, 1, 1] },
  { role: "Paid Ads Assistant", dots: [1, 0, 1, 1, 0, 0, 0] },
  { role: "SDR", dots: [1, 1, 0, 0, 1, 0, 0] },
  { role: "Lead Research Assistant", dots: [1, 1, 0, 0, 1, 0, 0] },
  { role: "CRM & Sales Admin", dots: [1, 1, 0, 0, 1, 0, 1] },
  { role: "Customer Success Assistant", dots: [1, 1, 0, 0, 0, 1, 1] },
];

/* the design pops the dots once a fifth of the table is on screen */
const MATRIX_IO: IntersectionObserverInit = { threshold: 0.2 };

function SkillsMatrix() {
  const reduce = useReducedMotion();
  const [tableRef, inView] = useInView<HTMLTableElement>(MATRIX_IO);
  // reduced motion: dots are shown at full size on first paint
  const show = reduce || inView;

  return (
    <Reveal className="mss-mx-wrap">
      <table className={`mss-mx-tbl${show ? " in" : ""}`} ref={tableRef}>
        <thead>
          <tr>
            <th scope="col">Role</th>
            {MATRIX_COLS.map((col) => (
              <th scope="col" key={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX_ROWS.map((row) => (
            <tr key={row.role}>
              <th scope="row">{row.role}</th>
              {row.dots.map((on, i) => (
                <td key={MATRIX_COLS[i]}>{on ? <span className="mss-mx-dot" aria-label="Yes"></span> : null}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

/* -------- ways to work together -------- */

const OPTIONS: { name: string; fit: string; how: string }[] = [
  { name: "Single role, part-time", fit: "Teams needing a few hours of help each day.", how: "One dedicated person on a set weekly schedule." },
  { name: "Single role, full-time", fit: "Teams with daily marketing or sales workload.", how: "One dedicated person working your business hours." },
  { name: "Support pod", fit: "Teams needing both marketing and sales help.", how: "Two or more roles working together under your leads." },
  { name: "Campaign or project support", fit: "Launches, events, or list-building projects.", how: "Scoped support for a set period." },
];

/* -------- every engagement includes -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_CALENDAR, text: "Role scoping call and job outline" },
  { icon: ICON_PERSON, text: "Candidate matching based on skills, tools, and time zone" },
  { icon: ICON_CHECK, text: "Skills test and interview before matching" },
  { icon: ICON_SHIELD, text: "Onboarding plan and tool access setup" },
  { icon: ICON_LIST_CHECK, text: "Weekly task tracker and check-ins" },
  { icon: ICON_TREND, text: "Simple reporting on tasks and output" },
  { icon: ICON_REFRESH, text: "Replacement support if the fit isn’t right" },
  { icon: ICON_SHIELD, text: "Confidentiality agreement (NDA) available" },
];

/* -------- who / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_ROCKET, text: <><strong>Founders doing their own marketing and sales</strong> who need execution help.</>, delay: 0 },
  { icon: ICON_BOLT, text: <><strong>Small marketing teams</strong> that need more hands to publish and promote consistently.</>, delay: 60 },
  { icon: ICON_TREND, text: <><strong>Sales teams</strong> that want reps focused on conversations instead of admin.</>, delay: 120 },
  { icon: ICON_PEOPLE, text: <><strong>Agencies</strong> needing extra support across client accounts.</>, delay: 180 },
];

const FAQS = [
  { q: "How much do support staff cost?", a: <>It depends on the role, hours, and location. <strong>We share options and pricing on the free call.</strong></> },
  { q: "Can support staff work inside our existing tools?", a: <>Yes. We match candidates to the tools you use, such as <strong>HubSpot, Salesforce, Canva, or Apollo.</strong></> },
  { q: "Who manages the support staff day to day?", a: <>Your marketing or sales lead sets priorities. <strong>We help with onboarding, check-ins, and replacements</strong> if needed.</> },
  { q: "Can an SDR book meetings for our sales team?", a: <>Yes. SDRs can research prospects, run outreach, and <strong>book meetings directly onto your team’s calendars.</strong></> },
  { q: "What if we need more than one role?", a: <>You can start with one role and add more later, or <strong>begin with a small support pod</strong> covering marketing and sales.</> },
  { q: "Is my information kept confidential?", a: <>Yes. A <strong>confidentiality agreement (NDA) is available,</strong> and support staff work with scoped, role-based access to your tools.</> },
];

/* -------- page -------- */

export default function MarketingSalesSupportStaffView() {
  return (
    <div className="mss-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Talent & Staffing", href: "/talent-staffing" }}
        line1="Keep marketing moving"
        line2={
          <>
            and your pipeline <span className="grad-text">full.</span>
          </>
        }
        lead={
          <>
            Remote marketing assistants, SDRs, and CRM support who handle the daily work,{" "}
            <strong>so your marketers and sellers can focus on strategy and closing.</strong>
          </>
        }
        primary={{ label: "Find my support staff", href: "/contact" }}
        secondary={{ label: "See the roles ↓", href: "#roles" }}
      >
        <OrgCard />
      </ServiceDetailHero>

      <TrustBar items={["Marketing & sales roles", "Works in your tools", "Under your existing leads", "Skills-tested & matched"]} />

      {/* WHERE SALES TIME GOES (dark, stats) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where sales time goes</span>
            <h2>Most of the week goes to work that isn’t selling.</h2>
            <p>Salesforce research on sales teams shows how much time disappears into tasks support staff can handle.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="mss-stat-note">
            Survey results reflect the professionals surveyed and vary by team.{" "}
            <strong>But the pattern holds: your best people spend too little time on their actual job.</strong>
          </Reveal>
        </div>
      </section>

      {/* ROLES */}
      <section className="band tint" id="roles">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Roles we place</span>
            <h2>Choose one role, or build a small support team around your staff.</h2>
          </Reveal>
          <Reveal className="mss-role-grid">
            {ROLES.map((role) => (
              <article className="mss-role" key={role.title}>
                <span className={`rtag ${role.tag}`}>{role.tag === "mkt" ? "Marketing" : "Sales"}</span>
                <div className="rh">
                  <span className="ri">{role.icon}</span>
                  <h3>{role.title}</h3>
                </div>
                <p>{role.text}</p>
                <div className="tools">
                  <b>Tools</b>
                  {role.tools}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ORG STRUCTURE */}
      <section className="band" id="structure">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it fits together</span>
            <h2>Support staff work under your existing leaders.</h2>
            <p>Your team sets direction; support staff handle the execution, all on one shared CRM.</p>
          </Reveal>
          {/* the design keys the icon pop on `.who.in` but only the grid is a reveal there;
              each card is its own reveal here so the icons actually appear */}
          <div className="mss-struct-grid">
            {STRUCTURE.map((item, i) => (
              <Reveal className="mss-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS MATRIX */}
      <section className="band tint" id="matrix">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Skills &amp; tools by role</span>
            <h2>We match candidates to the tools your team already uses.</h2>
          </Reveal>
          <SkillsMatrix />
          <Reveal as="p" className="mss-mx-note">
            Tool lists are typical examples and are adjusted to your stack.
          </Reveal>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="band" id="options">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Ways to work together</span>
            <h2>Start with one role, or a small support pod.</h2>
          </Reveal>
          <Reveal className="mss-eng-tbl">
            <div className="mss-eng-row head">
              <div>Option</div>
              <div className="ec2">Often a good fit for</div>
              <div>How it works</div>
            </div>
            {OPTIONS.map((opt) => (
              <div className="mss-eng-row" key={opt.name}>
                <div className="en">{opt.name}</div>
                <div className="ec2">{opt.fit}</div>
                <div>{opt.how}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="mss-eng-note">
            Pricing depends on role, hours, and time zone, and is <strong>shared on the free call.</strong>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>Scoped, matched, onboarded, and backed up.</h2>
          </Reveal>
          <Reveal className="mss-inc-grid">
            {INCLUDED.map((item) => (
              <div className="mss-inc" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who hires marketing &amp; sales support</span>
            <h2>If your best people are buried in busywork…</h2>
          </Reveal>
          <div className="mss-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="mss-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every match." />

      <CtaBand
        id="start"
        eyebrow="Marketing & Sales Support Staff"
        heading="Give your team more room to grow."
        copy={
          <>
            Book a free call to talk through your goals and the support roles that would help most,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll look at where your team’s time goes and recommend where to start.</strong>
          </>
        }
        primaryLabel="Find my support staff"
        primaryHref="/contact"
        secondary={{ label: "See the roles", href: "#roles", arrow: "↗" }}
      />
    </div>
  );
}
