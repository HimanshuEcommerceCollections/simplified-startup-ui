"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar } from "../../ServiceDetailKit";
import {
  Band,
  ComplianceNote,
  FixTable,
  Glance,
  IncludedGrid,
  NumberedRows,
  Scramble,
  WhoGrid,
  useCardRun,
  type FixRow,
  type IconText,
  type NumberedRow,
  type WhoItem,
} from "./blocks";
import {
  ICON_CHECK_BOLD,
  ICON_CHECK_THIN,
  ICON_EYE,
  ICON_GLOBE,
  ICON_LINK,
  ICON_LIST_CHECK,
  ICON_MAIL,
  ICON_MEGAPHONE,
  ICON_MINUS_CIRCLE,
  ICON_PEOPLE,
  ICON_PERSON,
  ICON_REFRESH,
  ICON_REPLY,
  ICON_SHIELD,
  ICON_SHIELD_CHECK,
  ICON_TREND,
  ICON_WARN,
} from "./icons";
import "./ced-page.css";

/* -------- hero signature: placement check -------- */

const CHECKS: { title: string; sub: string; status: string }[] = [
  { title: "Separate sending domain", sub: "Main domain protected", status: "Ready" },
  { title: "SPF · DKIM · DMARC", sub: "DNS records set", status: "Pass" },
  { title: "Inboxes warmed", sub: "Reputation built", status: "Warm" },
  { title: "List verified", sub: "Bounces reduced", status: "Clean" },
];

function PlacementCard() {
  const run = useCardRun();

  return (
    <SignatureCard
      className={`ced-dl${run ? " run" : ""}`}
      ariaLabel="A sending setup checked for inbox placement"
      live="Placement check"
      corner="SET UP RIGHT"
      footLeft="Foundation checked first"
      footRight="inbox, not spam →"
    >
      <div className="ced-tabs">
        <span className="ced-tab ced-tab-inbox">Inbox</span>
        <span className="ced-tab ced-tab-spam">Spam</span>
      </div>
      <div className="ced-checks">
        {CHECKS.map((check) => (
          <div className="ced-dlc" key={check.title}>
            <span className="dck">{ICON_CHECK_BOLD}</span>
            <span className="dcn">
              <b>{check.title}</b>
              <small>{check.sub}</small>
            </span>
            <span className="dcs">{check.status}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- copy -------- */

const STACK: { label: string; icon: ReactNode; title: string; text: string }[] = [
  { label: "Domains", icon: ICON_GLOBE, title: "Secondary sending domains", text: "Similar to your brand, kept separate from your main domain." },
  { label: "Inboxes", icon: ICON_MAIL, title: "Real mailboxes", text: "Set up in Google Workspace or Microsoft 365 with real names." },
  { label: "Authentication", icon: ICON_SHIELD_CHECK, title: "SPF, DKIM, and DMARC", text: "DNS records that prove your emails are legitimate." },
  { label: "Warmup", icon: ICON_TREND, title: "Building reputation", text: "Gradually increasing activity before campaigns start." },
  { label: "Lists", icon: ICON_LIST_CHECK, title: "Verified contacts", text: "Emails checked to reduce bounces." },
  { label: "Monitoring", icon: ICON_EYE, title: "Ongoing health checks", text: "Bounces, replies, and placement watched over time." },
];

const SETUP: NumberedRow[] = [
  { title: "Plan domains", text: "Choose secondary domains that match your brand.", out: "Domain plan" },
  { title: "Create inboxes", text: "Set up mailboxes with names, signatures, and profile photos.", out: "Ready inboxes" },
  { title: "Configure DNS", text: "SPF, DKIM, DMARC, and forwarding set correctly.", out: "Authenticated domains" },
  { title: "Warm up", text: "Inboxes warmed gradually before outreach.", out: "Warm, trusted inboxes" },
  { title: "Connect tools", text: "Inboxes connected to your sending platform.", out: "Ready-to-send setup" },
  { title: "Monitor", text: "Health checked regularly and issues fixed early.", out: "Ongoing deliverability" },
];

const DNS: { rec: string; what: string; why: string }[] = [
  { rec: "SPF", what: "Lists the servers allowed to send for your domain", why: "Helps prevent spoofing" },
  { rec: "DKIM", what: "Adds a digital signature to your emails", why: "Proves emails weren’t changed in transit" },
  { rec: "DMARC", what: "Tells providers how to handle failed checks", why: "Builds trust and protects your brand" },
  { rec: "Custom tracking domain", what: "Branded links for open and click tracking", why: "Avoids shared tracking domains" },
];

const HYGIENE: { icon: ReactNode; title: string; items: string[] }[] = [
  { icon: ICON_CHECK_THIN, title: "Before sending", items: ["Verify every email", "Remove risky addresses", "Remove duplicates"] },
  { icon: ICON_MEGAPHONE, title: "While sending", items: ["Keep daily volumes sensible", "Spread sends across inboxes", "Avoid heavy links and images"] },
  { icon: ICON_REFRESH, title: "After sending", items: ["Remove bounces quickly", "Honor opt-outs right away", "Watch spam complaints"] },
];

const TOOLS = [
  "Google Workspace",
  "Microsoft 365",
  "Instantly",
  "Smartlead",
  "lemlist",
  "Apollo",
  "NeverBounce",
  "ZeroBounce",
  "MailReach",
  "Google Postmaster",
  "Cloudflare",
  "Namecheap",
];

const FIXES: FixRow[] = [
  { prob: "Cold email sent from the main domain", fix: "Separate sending domains set up." },
  { prob: "Missing or broken DNS records", fix: "SPF, DKIM, and DMARC configured." },
  { prob: "No warmup period", fix: "Gradual warmup before campaigns." },
  { prob: "High bounce rates", fix: "List verification before every send." },
  { prob: "Too many emails per inbox", fix: "Volume spread across more inboxes." },
  { prob: "Shared tracking domains", fix: "Custom tracking domain set up." },
];

const INCLUDED: IconText[] = [
  { icon: ICON_GLOBE, text: "Sending domain planning and purchase support" },
  { icon: ICON_MAIL, text: "Inbox creation in Google Workspace or Microsoft 365" },
  { icon: ICON_SHIELD_CHECK, text: "SPF, DKIM, and DMARC setup" },
  { icon: ICON_REPLY, text: "Custom tracking domain" },
  { icon: ICON_TREND, text: "Inbox warmup" },
  { icon: ICON_LINK, text: "Sending platform connection" },
  { icon: ICON_LIST_CHECK, text: "List verification setup" },
  { icon: ICON_MINUS_CIRCLE, text: "Opt-out handling" },
  { icon: ICON_EYE, text: "Ongoing health monitoring (optional)" },
];

const WHO: WhoItem[] = [
  { icon: ICON_SHIELD, lead: "Teams starting cold email", rest: "who want to set it up right the first time." },
  { icon: ICON_WARN, lead: "Senders landing in spam", rest: "and seeing low replies." },
  { icon: ICON_PEOPLE, lead: "Agencies and SDR teams", rest: "scaling outreach across many inboxes." },
  { icon: ICON_PERSON, lead: "Founders protecting their main domain", rest: "before outbound starts." },
];

const FAQS = [
  {
    q: "How much does a deliverability setup cost?",
    a: (
      <>
        It depends on the number of domains and inboxes. <strong>Domain and inbox fees are paid to the providers.</strong> We share our
        pricing on the free call.
      </>
    ),
  },
  {
    q: "Why not send from our main domain?",
    a: (
      <>
        Cold email carries more risk. <strong>Separate domains protect your main domain’s reputation.</strong>
      </>
    ),
  },
  {
    q: "How long does warmup take?",
    a: (
      <>
        It depends on the domains and inboxes. <strong>We warm gradually and confirm readiness before campaigns start.</strong>
      </>
    ),
  },
  {
    q: "Do you work with Instantly or Smartlead?",
    a: (
      <>
        Yes, along with <strong>lemlist, Apollo, and other common platforms.</strong>
      </>
    ),
  },
  {
    q: "Can you guarantee inbox placement?",
    a: (
      <>
        No. Placement depends on many factors, including content and engagement. <strong>We focus on proper setup and monitoring.</strong>
      </>
    ),
  },
  {
    q: "Can you fix an existing setup?",
    a: (
      <>
        Yes. We review your <strong>domains, DNS records, warmup, and list hygiene,</strong> then fix the issues hurting{" "}
        <a className="cev-link" href="/sales-lead-gen/cold-email">
          placement
        </a>
        .
      </>
    ),
  },
];

/* -------- page -------- */

export default function ColdEmailDeliverabilityView() {
  return (
    <div className="ced-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Cold Email", href: "/sales-lead-gen/cold-email" }}
        line1="Cold email infrastructure that lands in"
        line2={
          <>
            the inbox, not the{" "}
            <span className="grad-text">
              <Scramble text="spam folder." />
            </span>
          </>
        }
        lead={
          <>
            Sending domains, inboxes, DNS records, warmup, and list hygiene:{" "}
            <strong>set up properly before you send a single campaign.</strong>
          </>
        }
        primary={{ label: "Book a deliverability setup call", href: "/contact" }}
        secondary={{ label: "See the setup stack ↓", href: "#stack" }}
      >
        <PlacementCard />
      </ServiceDetailHero>

      <TrustBar items={["Main domain protected", "DNS records set correctly", "Inboxes warmed before sending", "Ongoing health monitoring"]} />

      <Band
        id="why"
        tone="dark"
        eyebrow="Why it matters"
        heading="Great copy means nothing in the spam folder."
        intro="Deliverability is the foundation every cold email campaign stands on."
      >
        <Glance
          paras={[
            <>
              Mailbox providers watch new senders closely. <strong>Poor setup can send even well-written emails to spam.</strong>
            </>,
            <>
              <a href="/sales-lead-gen/cold-email">Cold email</a> needs its own infrastructure, separate from your main business email,
              so your primary domain stays protected.
            </>,
            <>
              We set up <strong>domains, inboxes, authentication, and warmup properly before campaigns begin.</strong>
            </>,
          ]}
          items={["Separate sending domains", "Authenticated inboxes", "Gradual warmup", "Verified prospect lists", "Ongoing monitoring"]}
        />
      </Band>

      <Band
        id="stack"
        tone="tint"
        eyebrow="The stack"
        heading="The cold email deliverability stack."
        intro="Each layer supports the one above it."
      >
        <Reveal className="ced-stk" threshold={0.12}>
          {STACK.map((layer) => (
            <article className="ced-stkl" key={layer.label}>
              <span className="sk">
                <span className="ski">{layer.icon}</span>
                {layer.label}
              </span>
              <div className="sd">
                <b>{layer.title}</b>
                <p>{layer.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </Band>

      <Band id="setup" tone="plain" eyebrow="Setup" heading="How we set up your infrastructure.">
        <div className="ced-setup">
          <NumberedRows rows={SETUP} />
        </div>
      </Band>

      <Band id="dns" tone="tint" eyebrow="DNS" heading="DNS records explained." intro="These records tell mailbox providers your emails are real.">
        <Reveal className="ced-dns-tbl">
          <div className="ced-dns-row head">
            <div>Record</div>
            <div>What it does</div>
            <div>Why it matters</div>
          </div>
          {DNS.map((row) => (
            <div className="ced-dns-row" key={row.rec}>
              <div>{row.rec}</div>
              <div>{row.what}</div>
              <div className="wm">{row.why}</div>
            </div>
          ))}
        </Reveal>
      </Band>

      <Band
        id="hygiene"
        tone="plain"
        eyebrow="Hygiene"
        heading="List hygiene and sending practices."
        intro="Clean lists and sensible sending protect your reputation."
      >
        <Reveal className="ced-hg-grid">
          {HYGIENE.map((group) => (
            <article className="ced-hg" key={group.title}>
              <h3>
                <span className="hgi">{group.icon}</span>
                {group.title}
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="hk">{ICON_CHECK_BOLD}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </Band>

      <Band id="tools" tone="tint" eyebrow="Tools" heading="Tools we work with." center>
        <Reveal className="ced-tl12-grid">
          {TOOLS.map((tool) => (
            <div className="ced-tl12" key={tool}>
              <span className="td"></span>
              <b>{tool}</b>
            </div>
          ))}
        </Reveal>
        <ComplianceNote />
      </Band>

      <Band id="fixes" tone="plain" eyebrow="Fixes" heading="Common deliverability problems we fix.">
        <FixTable rows={FIXES} />
      </Band>

      <Band id="included" tone="tint" eyebrow="What’s included" heading="From domain planning to ongoing monitoring.">
        <IncludedGrid items={INCLUDED} />
      </Band>

      <Band id="forwho" tone="plain" eyebrow="Who it’s for" heading="Build cold email on a solid foundation.">
        <WhoGrid items={WHO} />
      </Band>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Cold email deliverability: asked a lot." />

      <CtaBand
        id="start"
        eyebrow="Cold Email Deliverability Setup"
        heading="Build cold email on a solid foundation."
        copy={
          <>
            Book a free call to set up your cold email infrastructure:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your current sending setup.</strong>
          </>
        }
        primaryLabel="Book a deliverability setup call"
        primaryHref="/contact"
        secondary={{ label: "See the setup stack", href: "#stack", arrow: "↗" }}
      />
    </div>
  );
}
