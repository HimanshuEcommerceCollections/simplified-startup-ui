"use client";

import type { CSSProperties, ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import { IncludedGrid, SecHead, useHeroRun } from "../email-family/EmailFamily";
import {
  ICON_CHAT,
  ICON_CODE,
  ICON_GRID,
  ICON_HEART,
  ICON_LIST_CHECK,
  ICON_MAIL,
  ICON_PEOPLE,
  ICON_SHIELD,
  ICON_SHIELD_CHECK,
  ICON_TREND,
  ICON_WARN,
} from "../email-family/icons";
import "./eda-page.css";

/* -------- hero signature: inbox placement scorecard -------- */

type ScoreTone = "good" | "warn" | "bad";

const SCORES: { label: string; pct: number; tone: ScoreTone; verdict: string }[] = [
  { label: "Authentication", pct: 38, tone: "bad", verdict: "Fix first" },
  { label: "Sender rules", pct: 54, tone: "warn", verdict: "Needs work" },
  { label: "Reputation", pct: 42, tone: "bad", verdict: "At risk" },
  { label: "List quality", pct: 58, tone: "warn", verdict: "Needs work" },
  { label: "Engagement", pct: 72, tone: "good", verdict: "Healthy" },
  { label: "Content", pct: 76, tone: "good", verdict: "Healthy" },
];

const barWidth = (pct: number): CSSProperties => ({ "--w": `${pct}%` } as CSSProperties);

function ScorecardCard() {
  // reduced motion: rows, bars and the flag are shown in their end state on first paint
  const run = useHeroRun();
  return (
    <SignatureCard
      ariaLabel="A sample inbox placement scorecard"
      className={`eda-score${run ? " run" : ""}`}
      live="Inbox placement"
      corner="6 LAYERS"
      footLeft="Every layer scored & ranked"
      footRight="prioritized fix plan →"
    >
      <div className="eda-score-body">
        {SCORES.map((row) => (
          <div className={`eda-sb ${row.tone}`} key={row.label}>
            <span className="sl">{row.label}</span>
            <span className="st">
              <i style={barWidth(row.pct)}></i>
            </span>
            <span className="sv">{row.verdict}</span>
          </div>
        ))}
      </div>
      <div className="eda-score-flag">
        {ICON_WARN}
        Authentication gaps hurting inbox placement
      </div>
    </SignatureCard>
  );
}

/* -------- the deliverability stack (6 numbered tilt cards) -------- */

const LAYERS: { no: string; icon: ReactNode; title: string; sub: string; text: string }[] = [
  { no: "01", icon: ICON_SHIELD_CHECK, title: "Authentication", sub: "SPF, DKIM, and DMARC", text: "Records that prove your emails are really from you." },
  { no: "02", icon: ICON_SHIELD, title: "Sender requirements", sub: "Gmail and Yahoo rules", text: "Bulk sender requirements like authentication and easy unsubscribe." },
  { no: "03", icon: ICON_TREND, title: "Reputation", sub: "Domain and sending history", text: "How mailbox providers view your sending." },
  { no: "04", icon: ICON_PEOPLE, title: "List quality", sub: "Who you send to", text: "Bounces, inactive contacts, and how people joined." },
  { no: "05", icon: ICON_HEART, title: "Engagement", sub: "How people respond", text: "Opens, clicks, complaints, and unsubscribes." },
  { no: "06", icon: ICON_MAIL, title: "Content", sub: "What you send", text: "Links, images, formatting, and spam triggers." },
];

function StackGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="eda-ds-grid">
        {LAYERS.map((layer) => (
          <article className="eda-ds" key={layer.no} data-tilt>
            <span className="eda-ds-spot"></span>
            <span className="dk">Layer {layer.no}</span>
            <div className="di">{layer.icon}</div>
            <h3>{layer.title}</h3>
            <span className="dsub">{layer.sub}</span>
            <p>{layer.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- questions the audit answers (4) -------- */

const QUESTIONS: { title: string; text: string }[] = [
  { title: "Is our domain set up correctly?", text: "Whether SPF, DKIM, and DMARC are in place and aligned." },
  { title: "Do we meet sender requirements?", text: "How your setup compares with Gmail and Yahoo rules." },
  { title: "Is our list hurting us?", text: "Inactive contacts, bounces, and risky sources." },
  { title: "What should we fix first?", text: "A clear order of priorities." },
];

/* -------- what you get (6) -------- */

const RECEIVE: { icon: ReactNode; text: string }[] = [
  { icon: ICON_GRID, text: "Review of all six deliverability layers" },
  { icon: ICON_CODE, text: "DNS record check with fix instructions" },
  { icon: ICON_PEOPLE, text: "List hygiene recommendations" },
  { icon: ICON_MAIL, text: "Content and sending practice review" },
  { icon: ICON_LIST_CHECK, text: "Prioritized fix plan" },
  { icon: ICON_CHAT, text: "Walkthrough call to review findings" },
];

/* -------- how it works (3 steps) -------- */

const STEPS: { no: string; title: string; text: string; delay: number }[] = [
  { no: "Step 1 · Access", title: "Access", text: "Short kickoff call, platform access, and domain details.", delay: 0 },
  { no: "Step 2 · Review", title: "Review", text: "We check authentication, reputation, list, and content.", delay: 90 },
  { no: "Step 3 · Plan", title: "Plan", text: "You get the findings, fix plan, and walkthrough call.", delay: 180 },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does a deliverability audit cost?", a: <>It depends on the number of domains and platforms. <strong>We share pricing on the intro call.</strong></> },
  { q: "Do you fix the DNS records too?", a: <>We can, or we can give <strong>clear instructions for your IT team or domain provider.</strong></> },
  { q: "Which platforms do you review?", a: <>Common ones include <strong>Klaviyo, HubSpot, Mailchimp, Brevo, Google Workspace, and Microsoft 365.</strong></> },
  { q: "Do we have to hire you afterward?", a: <>No. <strong>The plan is yours to use</strong> with your own team or any partner.</> },
];

/* -------- page -------- */

export default function EmailDeliverabilityAuditView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Email Marketing", href: "/digital-marketing/email-marketing" }}
        line1="Find out why your emails land in"
        line2={
          <>
            spam, and how to <span className="grad-text">fix it.</span>
          </>
        }
        lead={
          <>
            A focused review of your{" "}
            <a className="emf-link" href="/digital-marketing/email-marketing">
              email setup
            </a>{" "}
            <strong>with a clear, prioritized fix plan.</strong>
          </>
        }
        primary={{ label: "Book your deliverability audit", href: "/contact" }}
        secondary={{ label: "What we review ↓", href: "#stack" }}
      >
        <ScorecardCard />
      </ServiceDetailHero>

      <TrustBar items={["Plain-language findings", "Prioritized fix plan", "Works with your platform", "No obligation to hire us"]} />

      {/* STACK */}
      <section className="band tint" id="stack">
        <div className="wrap">
          <SecHead eyebrow="What we review" heading="The deliverability stack." sub="Inbox placement depends on several layers working together." />
          <StackGrid />
        </div>
      </section>

      {/* ANSWERS */}
      <section className="band" id="answers">
        <div className="wrap">
          <SecHead eyebrow="Questions the audit answers" heading="Clear answers about why your emails do (or don’t) reach the inbox." />
          <Reveal className="eda-q-grid">
            {QUESTIONS.map((item) => (
              <article className="eda-qc" key={item.title}>
                <span className="qi">?</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* YOU GET */}
      <section className="band tint" id="get">
        <div className="wrap">
          <SecHead eyebrow="What you get" heading="Findings, fixes, and a prioritized plan." />
          <IncludedGrid items={RECEIVE} />
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <SecHead eyebrow="How it works" heading="Access → review → plan." sub="A simple, three-step process." />
          <div className="eda-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="eda-step" key={step.title} style={d(step.delay)}>
                <span className="eda-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every audit." />

      <CtaBand
        id="start"
        eyebrow="Email Deliverability Audit"
        heading="Get your emails back in the inbox."
        copy={
          <>
            No obligation. Just a clear picture of your deliverability and what to fix first.{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>You’ll get plain-language findings and a prioritized fix plan.</strong>
          </>
        }
        primaryLabel="Book your deliverability audit"
        primaryHref="/contact"
        secondary={{ label: "What we review", href: "#stack", arrow: "↗" }}
      />
    </>
  );
}
