"use client";

import { Fragment, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar } from "../../ServiceDetailKit";
import { FixTable, GlanceBand, IncludedGrid, ProcessList, SecHead, Timeline, WhoGrid2, useHeroRun } from "../email-family/EmailFamily";
import {
  ICON_BAG,
  ICON_BOLT,
  ICON_BRANCH,
  ICON_CAL,
  ICON_CHECK_BOLD,
  ICON_CLOCK,
  ICON_CODE,
  ICON_CONNECT,
  ICON_EYE,
  ICON_FILTER,
  ICON_GRID,
  ICON_MONITOR,
  ICON_PEN,
  ICON_PERSON,
  ICON_PIN,
  ICON_REFRESH,
  ICON_SEARCH,
  ICON_SHIELD_CHECK,
  ICON_TREND,
} from "../email-family/icons";
import "./eaf-page.css";

/* -------- hero signature: flow builder -------- */

const NODES: { kind?: "trig" | "exitn"; icon: ReactNode; title: string; sub: string; tag: string }[] = [
  { kind: "trig", icon: ICON_BOLT, title: "Trigger", sub: "Someone signs up", tag: "Start" },
  { icon: ICON_FILTER, title: "Filter", sub: "Who qualifies", tag: "Rule" },
  { icon: ICON_CLOCK, title: "Delay", sub: "Wait 1 day", tag: "Timing" },
  { icon: ICON_BRANCH, title: "Branch", sub: "Clicked? two paths", tag: "Path" },
  { kind: "exitn", icon: ICON_CHECK_BOLD, title: "Exit", sub: "Goal reached", tag: "Stop" },
];

function FlowBuilderCard() {
  // reduced motion: nodes and connectors are shown in their end state on first paint
  const run = useHeroRun();
  return (
    <SignatureCard
      ariaLabel="The parts of an automated email flow"
      className={`eaf-fb2${run ? " run" : ""}`}
      live="Flow builder"
      corner="SET UP ONCE"
      footLeft="Build it once, it runs for you"
      footRight="works on autopilot →"
    >
      <div className="eaf-fb2-body">
        {NODES.map((node, i) => (
          <Fragment key={node.title}>
            {i > 0 && <div className="eaf-fbconn"></div>}
            <div className={`eaf-fbn${node.kind ? ` ${node.kind}` : ""}`}>
              <span className="fbi">{node.icon}</span>
              <span className="fbt">
                <b>{node.title}</b>
                <small>{node.sub}</small>
              </span>
              <span className="tag">{node.tag}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- triggers table -------- */

const TRIGGERS: { trig: string; flow: string; goal: string }[] = [
  { trig: "Signs up for your list", flow: "Welcome series", goal: "Introduce the brand and build trust" },
  { trig: "Downloads a resource", flow: "Lead nurture", goal: "Move toward a conversation" },
  { trig: "Starts checkout or a form", flow: "Abandonment flow", goal: "Help them finish" },
  { trig: "Makes a purchase or books", flow: "Post-purchase or onboarding", goal: "Set expectations and build loyalty" },
  { trig: "Goes quiet for a while", flow: "Re-engagement", goal: "Win back interest or clean the list" },
  { trig: "Reaches a milestone", flow: "Anniversary or renewal", goal: "Celebrate and retain" },
];

/* -------- anatomy (5 parts) -------- */

const ANATOMY: { icon: ReactNode; key: string; title: string; text: string }[] = [
  { icon: ICON_BOLT, key: "Trigger", title: "What starts it", text: "A specific action or date." },
  { icon: ICON_FILTER, key: "Filters", title: "Who gets it", text: "Rules that include or exclude people." },
  { icon: ICON_CLOCK, key: "Delays", title: "When emails send", text: "Time between steps." },
  { icon: ICON_BRANCH, key: "Branches", title: "Different paths", text: "Paths based on behavior or data." },
  { icon: ICON_CHECK_BOLD, key: "Exit", title: "When it stops", text: "Ends when the goal is reached." },
];

/* -------- branching example -------- */

const EXAMPLE_STEPS = [
  { when: "Right away", title: "Welcome email", text: "Thanks, what to expect, and a key link." },
  { when: "A day or two later", title: "Brand story", text: "Who you are and what makes you different." },
  {
    when: "If they clicked",
    title: "More content about what they clicked",
    text: "Follow their interest with relevant content.",
    branch: "Branch · Interest path",
  },
  { when: "If they didn’t", title: "A shorter, simpler follow-up", text: "A lighter nudge to re-engage.", branch: "Branch · Reminder path" },
  { when: "Later", title: "Next step", text: "An offer, consultation, or product suggestion." },
];

/* -------- personalization (6, tilt) -------- */

const PERSONALIZE: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_PERSON, title: "Name and details", text: "Basic personal fields used naturally." },
  { icon: ICON_EYE, title: "Behavior", text: "Content based on pages viewed or links clicked." },
  { icon: ICON_BAG, title: "Purchase history", text: "Suggestions based on what they bought." },
  { icon: ICON_PIN, title: "Location", text: "Local details, time zones, and events." },
  { icon: ICON_TREND, title: "Lifecycle stage", text: "New, active, or at-risk messaging." },
  { icon: ICON_GRID, title: "Dynamic blocks", text: "Sections that change for different segments." },
];

function PersonalizeGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="eaf-pz-grid">
        {PERSONALIZE.map((card) => (
          <article className="eaf-pz" key={card.title} data-tilt>
            <span className="eaf-pz-spot"></span>
            <div className="pzi">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- process (5) -------- */

const PROCESS = [
  { title: "Map the journey", text: "Key moments where an automated email would help.", out: "Flow map" },
  { title: "Write and design", text: "Copy and templates for each email.", out: "Draft flow" },
  { title: "Build and connect", text: "Triggers, filters, and data connections set up.", out: "Built flow" },
  { title: "Test", text: "Every path tested with test contacts.", out: "Tested flow" },
  { title: "Launch and review", text: "Results reviewed and improved over time.", out: "Ongoing optimization" },
];

/* -------- flow audit -------- */

const FIXES = [
  { prob: "Flows built years ago and never updated", fix: "Content and offers refreshed." },
  { prob: "People getting conflicting emails", fix: "Filters and exits added." },
  { prob: "Broken triggers after platform changes", fix: "Triggers tested and fixed." },
  { prob: "One path for everyone", fix: "Branches by behavior." },
  { prob: "No goal or exit", fix: "Clear goals and exit rules." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_SEARCH, text: "Flow audit and opportunity map" },
  { icon: ICON_BOLT, text: "Journey and trigger planning" },
  { icon: ICON_PEN, text: "Flow copy and design" },
  { icon: ICON_CODE, text: "Build in your email platform" },
  { icon: ICON_BRANCH, text: "Branching and personalization" },
  { icon: ICON_SHIELD_CHECK, text: "Testing of every path" },
  { icon: ICON_CONNECT, text: "Integration with your store or CRM" },
  { icon: ICON_TREND, text: "Monthly flow performance review" },
  { icon: ICON_REFRESH, text: "Ongoing improvements" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_BAG, text: <><strong>Online stores</strong> with few or outdated flows.</> },
  { icon: ICON_MONITOR, text: <><strong>B2B and SaaS teams</strong> that want automated nurture and onboarding.</> },
  { icon: ICON_CAL, text: <><strong>Service businesses</strong> sending booking reminders and follow-ups.</> },
  { icon: ICON_CLOCK, text: <><strong>Teams spending too long</strong> on manual emails.</> },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does email automation cost?", a: <>It depends on the number and complexity of flows. <strong>We share pricing on the free call.</strong></> },
  { q: "Which platforms do you build flows in?", a: <><strong>Klaviyo, HubSpot, ActiveCampaign, Mailchimp, Brevo,</strong> and others.</> },
  { q: "How many flows do we need?", a: <>It depends on your business. <strong>We start with the flows that matter most,</strong> then add more over time.</> },
  { q: "Will flows conflict with our campaigns?", a: <>We set rules so <strong>people don’t receive too many emails at once.</strong></> },
  { q: "Can you guarantee results from automation?", a: <>No. Results depend on your audience and offers. <strong>We focus on relevance, timing, and testing.</strong></> },
  {
    q: "Can you fix our existing flows?",
    a: <>Yes. We start with a <strong>flow audit,</strong> then refresh content, fix broken triggers, and add branching and exits where needed.</>,
  },
];

/* -------- page -------- */

export default function EmailAutomationFlowsView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Email Marketing", href: "/digital-marketing/email-marketing" }}
        line1="Emails that send themselves at"
        line2={
          <>
            exactly the right <span className="grad-text">moment.</span>
          </>
        }
        lead={
          <>
            Automated email flows built around real customer behavior, <strong>with smart triggers, branching, and testing.</strong>
          </>
        }
        primary={{ label: "Book an automation call", href: "/contact" }}
        secondary={{ label: "See flow examples ↓", href: "#example" }}
      >
        <FlowBuilderCard />
      </ServiceDetailHero>

      <TrustBar items={["Triggered by real behavior", "Branching by action", "Personalized content", "Tested before launch"]} />

      <GlanceBand
        eyebrow="How it works"
        heading="Set it up once, let it work."
        sub="A flow is a series of emails that starts automatically when someone takes an action."
        paragraphs={[
          <>
            Instead of sending every email by hand, flows react to what people do: <strong>signing up, buying, booking, or going quiet.</strong>
          </>,
          <>
            Because they’re timely and relevant, flows often feel more personal than{" "}
            <a href="/digital-marketing/email-marketing">one-off campaigns</a>.
          </>,
          <>
            Good flows are <strong>planned carefully, tested, and reviewed over time</strong> so they stay useful.
          </>,
        ]}
        items={["Trigger starts the flow", "Delays control timing", "Branches personalize the path", "Exits stop the flow when goals are met", "Reviews keep flows fresh"]}
      />

      {/* TRIGGERS */}
      <section className="band tint" id="triggers">
        <div className="wrap">
          <SecHead eyebrow="Triggers" heading="Common triggers and what they start." sub="Every flow begins with a trigger." />
          <Reveal className="eaf-tr-tbl">
            <div className="eaf-tr-row head">
              <div>Trigger</div>
              <div>Flow it starts</div>
              <div>Goal</div>
            </div>
            {TRIGGERS.map((row) => (
              <div className="eaf-tr-row" key={row.trig}>
                <div>{row.trig}</div>
                <div className="fl2">{row.flow}</div>
                <div className="gl">{row.goal}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ANATOMY */}
      <section className="band" id="anatomy">
        <div className="wrap">
          <SecHead eyebrow="Anatomy of a flow" heading="Every flow we build uses the same clear parts." />
          <Reveal className="eaf-an5">
            {ANATOMY.map((part, i) => (
              <Fragment key={part.key}>
                {i > 0 && <div className="eaf-an5conn"></div>}
                <div className="eaf-an5e">
                  <span className="ak">
                    <span className="aki">{part.icon}</span>
                    {part.key}
                  </span>
                  <div className="ad">
                    <b>{part.title}</b>
                    <p>{part.text}</p>
                  </div>
                </div>
              </Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BRANCHING EXAMPLE */}
      <section className="band tint" id="example">
        <div className="wrap">
          <SecHead eyebrow="Example" heading="A welcome series with branching." sub="The path changes based on how each subscriber responds." />
          <Timeline steps={EXAMPLE_STEPS} whenWidth={100} />
        </div>
      </section>

      {/* PERSONALIZATION */}
      <section className="band" id="personalize">
        <div className="wrap">
          <SecHead eyebrow="Personalization" heading="Ways we personalize flows." />
          <PersonalizeGrid />
        </div>
      </section>

      {/* PROCESS */}
      <section className="band tint" id="process">
        <div className="wrap">
          <SecHead eyebrow="How we build" heading="How we build and test flows." />
          <ProcessList steps={PROCESS} />
        </div>
      </section>

      {/* FLOW AUDIT */}
      <section className="band" id="audit">
        <div className="wrap">
          <SecHead eyebrow="Flow audit" heading="What we find in flow audits." />
          <FixTable rows={FIXES} />
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <SecHead eyebrow="What’s included" heading="From flow audit to ongoing improvements." />
          <IncludedGrid items={INCLUDED} />
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <SecHead eyebrow="Who it’s for" heading="Let your emails work while you don’t." />
          <WhoGrid2 items={WHO} />
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="Email Automation & Flows"
        heading="Let your emails work while you don’t."
        copy={
          <>
            Book a free call to plan your email automation:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll map the flows that would save your team time.</strong>
          </>
        }
        primaryLabel="Book an automation call"
        primaryHref="/contact"
        secondary={{ label: "See flow examples", href: "#example", arrow: "↗" }}
      />
    </>
  );
}
