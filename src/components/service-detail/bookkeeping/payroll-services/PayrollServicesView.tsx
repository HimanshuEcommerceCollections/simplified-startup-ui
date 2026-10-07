"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import "./pr-page.css";

/* -------- icons -------- */

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
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_INFO = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 11v5M12 8v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_HEART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_USER_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7 1 0 2 .2 2.8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m15 18 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_ROCKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 15c0-4 3-9 7-11 4 2 7 7 7 11l-3 2H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* -------- hero signature: paycheck breakdown -------- */

const PAY_LINES: { kind: "add" | "sub"; op: string; name: string; value: string }[] = [
  { kind: "add", op: "+", name: "Gross pay", value: "$4,200" },
  { kind: "add", op: "+", name: "Overtime & bonuses", value: "$380" },
  { kind: "add", op: "+", name: "Reimbursements", value: "$120" },
  { kind: "sub", op: "−", name: "Taxes withheld", value: "−$980" },
  { kind: "sub", op: "−", name: "Benefit deductions", value: "−$260" },
];

function PayCard() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the paycheck is shown in its end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel="A sample paycheck breakdown"
      className={`pr-pay${run ? " run" : ""}`}
      live="Paycheck breakdown"
      corner="ON TIME · IN YOUR BOOKS"
      footLeft="Every piece set up right"
      footRight="matches your books →"
    >
      <div className="pr-pay-body">
        {PAY_LINES.map((line) => (
          <div className={`pr-pl ${line.kind}`} key={line.name}>
            <span className="op">{line.op}</span>
            <span className="pn">{line.name}</span>
            <span className="pv">{line.value}</span>
          </div>
        ))}
      </div>
      <div className="pr-pay-net">
        <span className="op">=</span>
        <span className="pn">Net pay</span>
        <span className="pv">$3,460</span>
      </div>
    </SignatureCard>
  );
}

/* -------- why it matters -------- */

const WHY: { icon: ReactNode; title: string; text: ReactNode }[] = [
  { icon: ICON_HEART, title: "Trust depends on it", text: <>Late or wrong paychecks <strong>quickly hurt team morale.</strong></> },
  { icon: ICON_CALENDAR, title: "Deadlines don’t move", text: <>Pay dates and tax deposit schedules <strong>repeat all year.</strong></> },
  { icon: ICON_TREND, title: "Your books need it too", text: <>Payroll is often a business’s <strong>largest expense and must be recorded accurately.</strong></> },
];

/* -------- six-step cycle -------- */

const CYCLE = [
  { no: "01", title: "Collect", text: "Hours, time off, bonuses, and changes gathered." },
  { no: "02", title: "Review", text: "Totals checked against last period and approvals." },
  { no: "03", title: "Approve", text: "You approve the payroll before it runs." },
  { no: "04", title: "Pay", text: "Direct deposits sent through your payroll platform." },
  { no: "05", title: "Record", text: "Payroll entries posted correctly in your books." },
  { no: "06", title: "Report", text: "Payroll summary shared with you each period." },
];

/* -------- platforms -------- */

const PLATFORMS = ["Gusto", "QuickBooks Payroll", "ADP", "Rippling", "Paychex", "OnPay", "Deel"];

/* -------- W-2 vs 1099 -------- */

const WT_ROWS: { k: string; w2: string; c99: string }[] = [
  { k: "Who they are", w2: "People on your payroll, working under your direction", c99: "Independent workers running their own business" },
  { k: "Tax withholding", w2: "Taxes withheld from each paycheck", c99: "No withholding; they handle their own taxes" },
  { k: "Year-end form", w2: "Form W-2", c99: "Form 1099-NEC (when required)" },
  { k: "Forms at hiring", w2: "W-4 and I-9", c99: "W-9" },
  { k: "Benefits", w2: "May be eligible for benefits", c99: "Usually not eligible" },
];

/* -------- pay schedules (count-ups) -------- */

type Schedule = { title: string; count: number; text: string };

const SCHEDULES: Schedule[] = [
  { title: "Weekly", count: 52, text: "Common for hourly teams and trades." },
  { title: "Biweekly", count: 26, text: "Every other week; a popular choice." },
  { title: "Semi-monthly", count: 24, text: "Twice a month on set dates." },
  { title: "Monthly", count: 12, text: "Once a month; less common for hourly staff." },
];

/* the design fires the count-ups once 30% of the grid is in view */
const SCHED_IO: IntersectionObserverInit = { threshold: 0.3 };

function ScheduleCard({ sched, run, reduce }: { sched: Schedule; run: boolean; reduce: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || reduce) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1100, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(e * sched.count);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, sched.count]);

  // reduced motion: the final figure is derived at render, no animation
  const shown = reduce ? sched.count : value;

  return (
    <article className="pr-sch">
      <h3>{sched.title}</h3>
      <div className="big">{Math.round(shown)}</div>
      <span className="sk">Paydays per year</span>
      <p>{sched.text}</p>
    </article>
  );
}

function ScheduleGrid() {
  const reduce = useReducedMotion();
  // the grid is both the design's scroll-reveal and the count-up trigger, so one observer drives both
  const [gridRef, inView] = useInView<HTMLDivElement>(SCHED_IO);
  return (
    <div className={`reveal pr-sch-grid${inView ? " in" : ""}`} ref={gridRef}>
      {SCHEDULES.map((sched) => (
        <ScheduleCard key={sched.title} sched={sched} run={inView} reduce={reduce} />
      ))}
    </div>
  );
}

/* -------- paycheck waterfall -------- */

const WATERFALL: { kind: "add" | "sub" | "eq"; op: string; name: string; text: string; tag: string }[] = [
  { kind: "add", op: "+", name: "Gross pay", text: "Regular wages or salary for the period.", tag: "Earnings" },
  { kind: "add", op: "+", name: "Overtime & bonuses", text: "Extra hours, commissions, and one-time payments.", tag: "Earnings" },
  { kind: "add", op: "+", name: "Reimbursements", text: "Approved expenses paid back to employees.", tag: "Earnings" },
  { kind: "sub", op: "−", name: "Taxes withheld", text: "Federal, state, and local withholdings.", tag: "Deduction" },
  { kind: "sub", op: "−", name: "Benefit deductions", text: "Health insurance, retirement, and other elections.", tag: "Deduction" },
  { kind: "eq", op: "=", name: "Net pay", text: "What lands in the employee’s account.", tag: "Take-home" },
];

/* -------- mistakes we help prevent -------- */

const FIXES: { prob: string; fix: string }[] = [
  { prob: "Missed pay dates", fix: "Payroll calendar with reminders before every run." },
  { prob: "Wrong pay rates or hours", fix: "Changes reviewed and approved before payroll runs." },
  { prob: "Not registered in a new state", fix: "State registration flagged when you hire in a new state." },
  { prob: "Payroll not matching the books", fix: "Every pay run recorded and reconciled in your accounting software." },
  { prob: "Untracked paid time off", fix: "PTO balances tracked inside your payroll platform." },
  { prob: "Missing contractor forms", fix: "W-9s collected and contractor payments tracked for year-end." },
];

/* -------- new-hire checklist -------- */

const NEW_HIRE = [
  "Form W-4 completed",
  "Form I-9 completed and kept on file",
  "State withholding forms (if required)",
  "Direct deposit details collected",
  "Pay rate and schedule confirmed",
  "Benefits enrollment (if offered)",
  "State new hire report submitted",
  "Added to payroll platform and time tracking",
];

/* -------- included -------- */

const INCLUDED: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_LINES, text: "Payroll platform setup or review" },
  { icon: ICON_PEOPLE, text: "Employee and contractor profiles added" },
  { icon: ICON_CALENDAR, text: "Pay schedules and pay rates set up" },
  { icon: ICON_DOLLAR, text: "Direct deposit setup" },
  { icon: ICON_LIST_CHECK, text: "Each payroll run reviewed before approval" },
  {
    icon: ICON_TREND,
    text: (
      <>
        Payroll recorded in <a href="/bookkeeping/quickbooks-xero-setup">QuickBooks or Xero</a>
      </>
    ),
  },
  { icon: ICON_CHAT, text: "Contractor payment tracking" },
  { icon: ICON_DOC, text: "Year-end W-2 and 1099 coordination through your platform" },
  { icon: ICON_DOC, text: "Payroll summary each pay period" },
];

/* -------- who / faq -------- */

const WHO: { icon: ReactNode; text: ReactNode; delay: number }[] = [
  { icon: ICON_USER_CHECK, text: <><strong>Businesses hiring their first employee</strong> and setting up payroll for the first time.</>, delay: 0 },
  { icon: ICON_ROCKET, text: <><strong>Owners running payroll themselves</strong> who want it off their plate.</>, delay: 60 },
  { icon: ICON_GLOBE, text: <><strong>Teams with employees in several states</strong> or a mix of employees and contractors.</>, delay: 120 },
  { icon: ICON_TREND, text: <><strong>Startups growing headcount</strong> that need payroll and books to stay in sync.</>, delay: 180 },
];

const FAQS = [
  { q: "How much do payroll services cost?", a: <>It depends on team size, pay frequency, and the number of states. <strong>Payroll platform fees are separate.</strong> We share pricing on the free call.</> },
  { q: "Do you file payroll taxes?", a: <>Payroll tax deposits and filings are handled by your payroll platform, such as Gusto or ADP. <strong>We make sure payroll is set up and recorded correctly.</strong></> },
  { q: "Can you pay contractors too?", a: <>Yes. We set up contractor payments in your platform and <strong>track them for year-end forms.</strong></> },
  { q: "Can you help if we hire in another state?", a: <>Yes. We flag new state requirements so <strong>registrations can be set up before the first paycheck</strong> in that state.</> },
  { q: "Which payroll platform should we use?", a: <>It depends on team size, benefits, and budget. <strong>We can compare options like Gusto, ADP, and QuickBooks Payroll</strong> with you.</> },
  { q: "Does payroll get recorded in our books?", a: <>Yes: every pay run is <strong>posted and reconciled in QuickBooks or Xero,</strong> so payroll (often your largest expense) always matches your reports.</> },
];

/* -------- page -------- */

export default function PayrollServicesView() {
  return (
    <div className="pr-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Bookkeeping & Accounting", href: "/bookkeeping" }}
        line1="Payroll that runs on"
        line2={
          <>
            time, <span className="grad-text">every time.</span>
          </>
        }
        lead={
          <>
            Payroll setup and management for small businesses and startups, using trusted platforms like Gusto, ADP, and
            QuickBooks Payroll, <strong>and it lands correctly in your books.</strong>
          </>
        }
        primary={{ label: "Set up my payroll", href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
      >
        <PayCard />
        {/* disclaimer chip under the hero CTAs; positioned under the copy column by pr-page.css */}
        <div className="pr-hero-note">
          {ICON_INFO}
          <span>
            We manage payroll through your platform, which handles tax deposits and filings.{" "}
            <b>Worker classification, tax, and HR/legal matters should be confirmed with your CPA, attorney, or HR advisor.</b>
          </span>
        </div>
      </ServiceDetailHero>

      <TrustBar items={["Gusto · ADP · QuickBooks Payroll", "W-2 & 1099", "Recorded in your books", "Reviewed before every run"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why it matters</span>
            <h2>Payroll has no room for mistakes.</h2>
            <p>Your team counts on being paid correctly and on time. Behind every paycheck are hours, deductions, tax withholdings, and records that all need to line up.</p>
          </Reveal>
          <Reveal className="pr-why-grid">
            {WHY.map((item) => (
              <article className="pr-whyc" key={item.title}>
                <div className="wi">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="pr-why-quote">
            Good payroll is invisible. <span>Your team gets paid, your books stay clean, and nothing slips through the cracks.</span>
          </Reveal>
        </div>
      </section>

      {/* CYCLE */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Your payroll cycle.</h2>
            <p>The same six steps repeat every pay period, so nothing gets missed.</p>
          </Reveal>
          <Reveal className="pr-cyc-grid">
            {CYCLE.map((step) => (
              <article className="pr-cyc" key={step.no}>
                <span className="cn">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="band tint" id="platforms">
        <div className="wrap">
          <Reveal className="sec-head" style={{ margin: "0 auto 36px", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Software
            </span>
            <h2>Payroll platforms we work with.</h2>
          </Reveal>
          <Reveal className="pr-plat-row">
            {PLATFORMS.map((name) => (
              <span className="pr-plat" key={name}>
                <span className="pd"></span>
                {name}
              </span>
            ))}
          </Reveal>
          <Reveal as="p" className="pr-plat-note">
            Already using a platform? <strong>We work inside it.</strong> Need one? We help you compare options.
          </Reveal>
        </div>
      </section>

      {/* W-2 VS 1099 */}
      <section className="band" id="whopay">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who you pay</span>
            <h2>W-2 employees vs 1099 contractors.</h2>
            <p>Employees and contractors are paid and reported differently. Here’s a simple, general comparison.</p>
          </Reveal>
          <Reveal className="pr-wt-tbl">
            <div className="pr-wt-row head">
              <div></div>
              <div className="w2">W-2 Employee</div>
              <div className="c99">1099 Contractor</div>
            </div>
            {WT_ROWS.map((row) => (
              <div className="pr-wt-row" key={row.k}>
                <div>{row.k}</div>
                <div className="w2">{row.w2}</div>
                <div className="c99">{row.c99}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="pr-wt-note">
            General information only. Worker classification depends on federal and state rules, so confirm with your CPA or attorney.
          </Reveal>
        </div>
      </section>

      {/* PAY SCHEDULES */}
      <section className="band tint" id="schedules">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pay schedules</span>
            <h2>Pay schedule options.</h2>
            <p>Choose how often your team gets paid. Some states have rules on pay frequency, so we check before setup.</p>
          </Reveal>
          <ScheduleGrid />
        </div>
      </section>

      {/* INSIDE A PAYCHECK */}
      <section className="band" id="inside">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Inside a paycheck</span>
            <h2>What’s on every payroll.</h2>
            <p>Each pay run combines these pieces. We make sure each one is set up and recorded correctly.</p>
          </Reveal>
          <Reveal className="pr-wf-list">
            {WATERFALL.map((row) => (
              <article className={`pr-wfr ${row.kind}`} key={row.name}>
                <span className="wop">{row.op}</span>
                <span className="wn">
                  <b>{row.name}</b>
                  <small>{row.text}</small>
                </span>
                <span className="wtag">{row.tag}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="band tint" id="prevent">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we help prevent</span>
            <h2>Payroll mistakes we help avoid.</h2>
          </Reveal>
          <Reveal className="pr-fix-tbl">
            <div className="pr-fix-row head">
              <div>The mistake</div>
              <div>How we help</div>
            </div>
            {FIXES.map((row) => (
              <div className="pr-fix-row" key={row.prob}>
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

      {/* NEW HIRE */}
      <section className="band" id="newhire">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Hiring someone new</span>
            <h2>New hire onboarding checklist.</h2>
            <p>Each new employee needs a few things set up before their first paycheck.</p>
          </Reveal>
          <Reveal className="pr-nh-grid">
            {NEW_HIRE.map((item) => (
              <div className="pr-nh" key={item}>
                <span className="box">{ICON_CHECK_BOLD}</span>
                <p>{item}</p>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="pr-nh-note">
            Requirements vary by state. Your payroll platform and HR advisor can confirm what applies.
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Every engagement includes</span>
            <h2>From platform setup to year-end coordination.</h2>
          </Reveal>
          <Reveal className="pr-inc2-grid">
            {INCLUDED.map((item, i) => (
              <div className="pr-inc2" key={i}>
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
            <span className="eyebrow">Who uses payroll services</span>
            <h2>Make payroll the easiest part of your week.</h2>
          </Reveal>
          <div className="pr-who-grid">
            {WHO.map((item, i) => (
              <Reveal className="pr-who" key={i} style={d(item.delay)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every setup." />

      {/* the design's CTA heading repeats the #forwho h2 verbatim; kept as designed */}
      <CtaBand
        id="start"
        eyebrow="Payroll Services"
        heading="Make payroll the easiest part of your week."
        copy={
          <>
            Book a free call to talk through your team, pay schedule, and payroll setup,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review how you pay your team today and what a cleaner setup would look like.</strong>
          </>
        }
        primaryLabel="Set up my payroll"
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#how", arrow: "↗" }}
      />
    </div>
  );
}
