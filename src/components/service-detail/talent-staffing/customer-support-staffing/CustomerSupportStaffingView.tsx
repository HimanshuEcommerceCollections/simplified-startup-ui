"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./cs-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_EMAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SOCIAL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_SMS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v11H9l-4 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 10h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_LAPTOP = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: support queue -------- */

const QUEUE: { kind: "email" | "chat" | "phone"; icon: ReactNode; title: string; sub: string; status: string }[] = [
  { kind: "email", icon: ICON_EMAIL, title: "Email · “Where’s my order?”", sub: "Tier 1 · Zendesk", status: "Replied 2m" },
  { kind: "chat", icon: ICON_CHAT, title: "Live chat · sizing help", sub: "Real-time · Intercom", status: "Answering" },
  { kind: "phone", icon: ICON_PHONE, title: "Phone · booking change", sub: "Callback · Aircall", status: "Resolved" },
];

const KPIS: { v: string; k: string; hl?: boolean }[] = [
  { v: "1m 50s", k: "First response" },
  { v: "0", k: "Backlog" },
  { v: "96%", k: "CSAT", hl: true },
];

function QueueCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the queue is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample support queue being answered"
      className={`cs-card${run ? " run" : ""}`}
      live="Support queue · Live"
      corner="COVERAGE: YOUR HOURS"
      footLeft="In your tools, your tone"
      footRight="tiered & measured →"
    >
      <div className="cs-queue">
        {QUEUE.map((row) => (
          <div className={`cs-sq c-${row.kind}`} key={row.title}>
            <span className="si">{row.icon}</span>
            <span className="sc">
              <b>{row.title}</b>
              <small>{row.sub}</small>
            </span>
            <span className="st">
              {ICON_CHECK}
              {row.status}
            </span>
          </div>
        ))}
      </div>
      <div className="cs-csat">
        {KPIS.map((kpi) => (
          <div className={`k${kpi.hl ? " hl" : ""}`} key={kpi.k}>
            <span className="v">{kpi.v}</span>
            <span className="kk">{kpi.k}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- why support matters (count-ups) -------- */

type Stat = { count: number; suffix: string; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  {
    count: 88,
    suffix: "%",
    label: "Experience = product",
    text: (
      <>
        Say the experience a company provides is as important as its products or services. <em>Salesforce, Connected Customer</em>
      </>
    ),
    delay: 0,
  },
  {
    count: 88,
    suffix: "%",
    label: "More likely to buy again",
    text: (
      <>
        Say good customer service makes them more likely to purchase again. <em>Salesforce</em>
      </>
    ),
    delay: 80,
  },
  {
    count: 75,
    suffix: "%",
    label: "Recommended a company",
    text: (
      <>
        Have recommended a company based on excellent customer service. <em>Salesforce</em>
      </>
    ),
    delay: 160,
  },
  {
    count: 70,
    suffix: "%",
    label: "Value connected processes",
    text: (
      <>
        Say smooth handoffs between teams are very important to winning their business. <em>Salesforce</em>
      </>
    ),
    delay: 240,
  },
];

/* the design's count-up looks for a `#stats` host that never exists; it fires here once the
   grid scrolls past 85% of the viewport, which is what its scroll check intended */
const STATS_IO: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -15% 0px" };

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

  return (
    <Reveal className="cs-stat" style={d(stat.delay)}>
      <div className="sv">
        {Math.round(shown)}
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
    <div className="cs-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- channels -------- */

const CHANNELS: { icon: ReactNode; title: string; text: string; tools: string }[] = [
  { icon: ICON_EMAIL, title: "Email & Tickets", text: "Answer questions, process requests, and keep the queue moving.", tools: "Zendesk, Freshdesk, Help Scout, Gorgias" },
  { icon: ICON_CHAT, title: "Live Chat", text: "Real-time replies on your website or app during set hours.", tools: "Intercom, Zendesk Chat, Tidio, LiveChat" },
  { icon: ICON_PHONE, title: "Phone", text: "Inbound calls, callbacks, and order or booking support.", tools: "Aircall, RingCentral, Dialpad, Zoom Phone" },
  { icon: ICON_SOCIAL, title: "Social Media DMs", text: "Replies to messages and comments on social platforms.", tools: "Meta Business Suite, Sprout Social, Hootsuite" },
  { icon: ICON_SMS, title: "SMS & Messaging", text: "Text-based updates and replies for customers who opt in.", tools: "Gorgias, Attentive, Twilio, WhatsApp Business" },
  { icon: ICON_STAR, title: "Reviews & Community", text: "Responses to reviews and posts in customer forums.", tools: "Google Business Profile, Trustpilot, Discord" },
];

/* -------- coverage bars -------- */

const COVERAGE: { name: string; hours: string; fill: CSSProperties; label: string }[] = [
  { name: "Business hours", hours: "Mon–Fri, 9am–5pm", fill: { left: "37.5%", width: "33%" }, label: "8 hrs" },
  { name: "Extended hours", hours: "Mon–Fri, 7am–10pm", fill: { left: "29%", width: "62.5%" }, label: "15 hrs" },
  { name: "Weekend coverage", hours: "Sat–Sun, 9am–5pm", fill: { left: "37.5%", width: "33%" }, label: "8 hrs" },
  { name: "24/7 support", hours: "Every day, all hours", fill: { left: 0, width: "100%" }, label: "24 hrs" },
];

/* -------- escalation tiers -------- */

const ESCALATION: { no: string; self?: boolean; title: string; text: string; by: string }[] = [
  { no: "Tier 0", self: true, title: "Self-service", text: "Help center articles, FAQs, and chatbots that answer common questions instantly.", by: "Your help center & AI tools" },
  { no: "Tier 1", title: "Frontline support", text: "Order status, account questions, how-to help, and simple troubleshooting.", by: "Our support agents" },
  { no: "Tier 2", title: "Advanced support", text: "Technical issues, billing problems, refunds, and escalations that need more context.", by: "Trained senior agents" },
  { no: "Tier 3", title: "Specialist & product", text: "Bugs, product changes, and issues that need your engineers or leadership.", by: "Your internal team" },
];

/* -------- metrics table -------- */

const METRICS: { name: string; text: string }[] = [
  { name: "First response time", text: "How long customers wait for the first reply." },
  { name: "Resolution time", text: "How long it takes to fully solve an issue." },
  { name: "First contact resolution", text: "Share of issues solved in a single interaction." },
  { name: "Customer satisfaction (CSAT)", text: "How customers rate their support experience." },
  { name: "Ticket backlog", text: "Number of open tickets waiting for a reply." },
  { name: "Escalation rate", text: "Share of tickets passed to a higher tier." },
];

/* -------- included / who / faq -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Support needs review (channels, volume, hours)" },
  { icon: ICON_PERSON, text: "Agent matching based on skills, language, and time zone" },
  { icon: ICON_CHECK_THIN, text: "Skills test and interview before matching" },
  { icon: ICON_DOC, text: "Training on your product, policies, and tone of voice" },
  { icon: ICON_LINES, text: "Macros, saved replies, and escalation guide setup" },
  { icon: ICON_SHIELD_CHECK, text: "Regular quality reviews of conversations" },
  { icon: ICON_TREND, text: "Weekly or monthly support metrics report" },
  { icon: ICON_REFRESH, text: "Replacement support if the fit isn’t right" },
  { icon: ICON_SHIELD, text: "Confidentiality agreement (NDA) available" },
];

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_CART, text: <><strong>E-commerce brands</strong> handling orders, returns, and shipping questions.</>, delay: 0 },
  { icon: ICON_LAPTOP, text: <><strong>SaaS companies</strong> needing help desk and onboarding support.</>, delay: 60 },
  { icon: ICON_CALENDAR, text: <><strong>Service businesses</strong> managing bookings, calls, and customer follow-ups.</>, delay: 120 },
  { icon: ICON_ROCKET, text: <><strong>Founders still answering support themselves</strong> who want to hand it off.</>, delay: 180 },
];

const FAQS = [
  { q: "How much does customer support staffing cost?", a: <>It depends on channels, hours, coverage, and language needs. <strong>We share options and pricing on the free call.</strong></> },
  { q: "Can agents work inside our help desk?", a: <>Yes. Agents work in your existing tools, such as <strong>Zendesk, Gorgias, Intercom, or Freshdesk.</strong></> },
  { q: "How are agents trained on our product?", a: <>We build a short training plan from your <strong>help docs, policies, and example conversations,</strong> and review early replies closely.</> },
  { q: "Can you cover nights and weekends?", a: <>Yes. Coverage can include <strong>extended hours, weekends, or 24/7 support</strong> depending on your needs.</> },
  { q: "Do you support languages other than English?", a: <><strong>Bilingual support is available</strong> for some languages. Let us know your needs on the call.</> },
  { q: "What if an agent isn’t the right fit?", a: <>Tell us early: <strong>replacement support is included,</strong> and we run regular quality reviews to catch issues before they grow.</> },
];

/* -------- page -------- */

export default function CustomerSupportStaffingView() {
  return (
    <div className="cs-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Talent & Staffing", href: "/talent-staffing" }}
        line1="Support agents who answer"
        line2={
          <>
            fast, and sound like <span className="grad-text">you.</span>
          </>
        }
        lead={
          <>
            Remote support staff for email, live chat, phone, and social,{" "}
            <strong>with coverage built around the hours your customers need you.</strong>
          </>
        }
        primary={{ label: "Build my support team", href: "/contact" }}
        secondary={{ label: "See coverage options ↓", href: "#coverage" }}
      >
        <QueueCard />
      </ServiceDetailHero>

      <TrustBar items={["Email, chat, phone & social", "Your hours, up to 24/7", "Works inside your help desk", "Trained on your product & tone"]} />

      {/* WHY SUPPORT MATTERS (dark, stats) */}
      <section className="band dark" id="numbers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why support matters to customers</span>
            <h2>Customers link service directly to whether they buy again.</h2>
            <p>Research from Salesforce shows how closely experience and repeat business are tied together.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="cs-stat-note">
            Survey results reflect the customers surveyed and vary by industry.{" "}
            <strong>But fast, on-brand support is one of the cheapest ways to protect revenue you already earned.</strong>
          </Reveal>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="band tint" id="channels">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Support channels we staff</span>
            <h2>Cover one channel or several, inside the tools you already use.</h2>
          </Reveal>
          <Reveal className="cs-ch-grid">
            {CHANNELS.map((ch) => (
              <article className="cs-chn" key={ch.title}>
                <div className="ci">{ch.icon}</div>
                <h3>{ch.title}</h3>
                <p>{ch.text}</p>
                <div className="tools">
                  <b>Common tools</b>
                  {ch.tools}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="band" id="coverage">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Coverage models</span>
            <h2>Choose the hours your customers need.</h2>
            <p>Coverage can grow as your volume grows, times shown in your local time zone.</p>
          </Reveal>
          <Reveal className="cs-cov">
            <div className="cs-cov-scale" aria-hidden="true">
              <span>12am</span>
              <span>6am</span>
              <span>12pm</span>
              <span>6pm</span>
            </div>
            {COVERAGE.map((row) => (
              <div className="cs-cvr" key={row.name}>
                <div className="cl">
                  <b>{row.name}</b>
                  <small>{row.hours}</small>
                </div>
                <div className="ctrack">
                  <div className="cfill" style={row.fill}>
                    {row.label}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="cs-cov-note">
            Custom schedules are also available: <strong>we build coverage around your ticket volume, not a fixed package.</strong>
          </Reveal>
        </div>
      </section>

      {/* TIERED SUPPORT */}
      <section className="band tint" id="tiers">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who handles what</span>
            <h2>A tiered structure: fast answers up front, hard problems routed right.</h2>
          </Reveal>
          <Reveal className="cs-esc-list">
            {ESCALATION.map((tier) => (
              <article className={`cs-esc${tier.self ? " t0" : ""}`} key={tier.no}>
                <span className="tn">{tier.no}</span>
                <div className="tm">
                  <b>{tier.title}</b>
                  <p>{tier.text}</p>
                </div>
                <div className="th">
                  <b>Handled by</b>
                  {tier.by}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* METRICS */}
      <section className="band" id="metrics">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How you measure it</span>
            <h2>Support metrics you can track.</h2>
            <p>Your reports cover the metrics that matter for your business. Targets are agreed with you during onboarding.</p>
          </Reveal>
          <Reveal className="cs-met-tbl">
            <div className="cs-met-row head">
              <div>Metric</div>
              <div>What it measures</div>
            </div>
            {METRICS.map((m) => (
              <div className="cs-met-row" key={m.name}>
                <div className="mn">{m.name}</div>
                <div>{m.text}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>Matched, trained agents, measured and backed up.</h2>
          </Reveal>
          <Reveal className="cs-inc-grid">
            {INCLUDED.map((item) => (
              <div className="cs-inc" key={item.text}>
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
            <span className="eyebrow">Who uses customer support staffing</span>
            <h2>If your support inbox is outgrowing your team…</h2>
          </Reveal>
          <div className="cs-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="cs-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every support team." />

      <CtaBand
        id="start"
        eyebrow="Customer Support Staffing"
        heading="Give your customers faster answers."
        copy={
          <>
            Book a free call to talk through your channels, hours, and the support team you need:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll map your coverage and escalation paths before any agent starts.</strong>
          </>
        }
        primaryLabel="Build my support team"
        primaryHref="/contact"
        secondary={{ label: "See coverage options", href: "#coverage", arrow: "↗" }}
      />
    </div>
  );
}
