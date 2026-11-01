"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, d } from "../../ServiceDetailKit";
import { ICON_CHECK, ICON_PHONE, ICON_WARN, ICON_X } from "./icons";
import type { RcpHero, RcpIndustry, RcpMiddleSection, RcpSixSection } from "./types";
import "./rcp-page.css";

const WAVE_BARS = 15;
const WHO_DELAYS = [0, 60, 120, 180];

/* -------- hero signature: live voice call -------- */

function VoiceCallCard({ card }: { card: RcpHero["card"] }) {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: transcript and badge render in their end state, the waveform stays still
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel={card.ariaLabel}
      className={`rcp-vc${run ? " run" : ""}`}
      live={card.live}
      corner="ANSWERED BY AI"
      footLeft={card.footLeft}
      footRight={card.footRight}
    >
      <div className="rcp-vc-caller">
        <span className="vca">{ICON_PHONE}</span>
        <span className="vcn">
          <b>{card.callerTitle}</b>
          <small>{card.callerSub}</small>
        </span>
        <span className="vtime">{card.time}</span>
      </div>
      <div className="rcp-vc-wave" aria-hidden="true">
        {Array.from({ length: WAVE_BARS }, (_, i) => (
          <i key={i}></i>
        ))}
      </div>
      <div className="rcp-vc-script">
        {card.lines.map((line, i) => (
          <div className={`rcp-vl ${line.who === "ai" ? "ai" : "them"}`} key={i}>
            <span className="vrole">{line.who === "ai" ? "AI receptionist" : "Caller"}</span>
            <div className="vb">{line.text}</div>
          </div>
        ))}
      </div>
      {card.badge && (
        <span className={`rcp-vc-badge ${card.badge.tone}`}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          {card.badge.text}
        </span>
      )}
    </SignatureCard>
  );
}

/* -------- six tilt cards (trades / practice areas) -------- */

function SixGrid({ section }: { section: RcpSixSection }) {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="rcp-six-grid">
        {section.cards.map((card) => (
          <article className="rcp-six" key={card.title} data-tilt>
            <span className="rcp-six-spot"></span>
            <div className="sxi">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- the three industry-specific middle sections -------- */

function MiddleBody({ section }: { section: RcpMiddleSection }) {
  switch (section.kind) {
    case "example":
      return (
        <Reveal className="rcp-flow">
          {section.steps.map((step) => (
            <div className="rcp-flow-step" key={step.title}>
              <span className="when">{step.when}</span>
              <span className="dot"></span>
              <div className="box">
                <b>{step.title}</b>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      );
    case "knowledge":
      return (
        <Reveal className="rcp-kn-grid">
          {section.cards.map((card) => (
            <article className="rcp-kn" key={card.title}>
              <span className="knk">{card.kicker}</span>
              <div className="kni">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      );
    case "escalation":
      return (
        <Reveal className="rcp-es-grid">
          {section.cards.map((card) => (
            <article className={`rcp-es${card.urgent ? " urgent" : ""}`} key={card.title}>
              <span className="esi">{card.icon}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      );
    case "triage":
      return (
        <Reveal className="rcp-triage">
          {section.tiers.map((tier, i) => (
            <article className={`rcp-trt sev${i + 1}`} key={tier.title}>
              <span className="tk">
                <span className="tki">{tier.icon}</span>
                {tier.label}
              </span>
              <div className="rcp-trt-body">
                <b>{tier.title}</b>
                <p>{tier.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      );
    case "boundaries":
      return (
        <Reveal className="rcp-bd-grid">
          {section.cards.map((card) => (
            <article className="rcp-bd" key={card.title}>
              <span className="bdk">{card.kicker}</span>
              <div className="bdi">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      );
    case "six":
      return <SixGrid section={section} />;
  }
}

function MiddleSection({ section, tint }: { section: RcpMiddleSection; tint: boolean }) {
  const id = section.kind === "example" ? "example" : section.id;
  return (
    <section className={`band${tint ? " tint" : ""} rcp-sec`} id={id}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{section.eyebrow}</span>
          <h2>{section.heading}</h2>
        </Reveal>
        <MiddleBody section={section} />
      </div>
    </section>
  );
}

/* -------- page -------- */

export default function AiReceptionistIndustryView({ data }: { data: RcpIndustry }) {
  const { hero, why, callTypes, middle, tools, questions, problems, included, who, faq, cta } = data;

  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "AI Voice Agents", href: "/ai-automation/ai-voice-agents" }}
        line1={hero.line1}
        line2={hero.line2}
        lead={hero.lead}
        primary={{ label: hero.primaryLabel, href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#example" }}
      >
        <VoiceCallCard card={hero.card} />
      </ServiceDetailHero>

      <TrustBar items={data.trust} />

      {/* WHY (dark + glance) */}
      <section className="band dark rcp-sec" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{why.eyebrow}</span>
            <h2>{why.heading}</h2>
          </Reveal>
          <Reveal className="rcp-glance">
            <div className="gtxt">
              {why.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="gbox">
              <h4>At a glance</h4>
              <ul>
                {why.glance.map((item) => (
                  <li key={item}>
                    <span className="gk">{ICON_CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CALL TYPES */}
      <section className="band tint rcp-sec" id="calltypes">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Calls your AI receptionist can handle</span>
            <h2>{callTypes.heading}</h2>
          </Reveal>
          <Reveal className="rcp-ct-tbl">
            <div className="rcp-ct-row head">
              <div>Call type</div>
              <div>What the AI does</div>
              <div>When it hands off</div>
            </div>
            {callTypes.rows.map((row) => (
              <div className="rcp-ct-row" key={row.type}>
                <div>{row.type}</div>
                <div>{row.does}</div>
                <div className="hand">{row.hand}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INDUSTRY-SPECIFIC (band / tint / band) */}
      {middle.map((section, i) => (
        <MiddleSection section={section} tint={i === 1} key={section.kind === "example" ? "example" : section.id} />
      ))}

      {/* TOOLS */}
      <section className="band tint rcp-sec" id="tools">
        <div className="wrap">
          <Reveal className="sec-head" style={{ margin: "0 auto 10px", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Integrations
            </span>
            <h2>Tools we can connect.</h2>
            <p>Integrations depend on your systems and their available connections.</p>
          </Reveal>
          <Reveal className="rcp-tl-grid">
            {tools.names.map((name) => (
              <div className="rcp-tl" key={name}>
                <span className="rcp-tl-dot"></span>
                <b>{name}</b>
              </div>
            ))}
          </Reveal>
          <Reveal className="rcp-cnote">
            {ICON_WARN}
            <p>{tools.note}</p>
          </Reveal>
        </div>
      </section>

      {/* QUESTIONS (practice / owner / firm) */}
      <section className="band rcp-sec" id={questions.id}>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{questions.eyebrow}</span>
            <h2>Quick answers before your demo.</h2>
          </Reveal>
          <Reveal className="rcp-aq-grid">
            {questions.items.map((item) => (
              <article className="rcp-aq" key={item.q}>
                <div className="aqq">
                  <span className="qm">?</span>
                  <span>{item.q}</span>
                </div>
                <p>{item.a}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="band tint rcp-sec" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>{problems.heading}</h2>
          </Reveal>
          <Reveal className="rcp-fix-tbl">
            <div className="rcp-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {problems.rows.map((row) => (
              <div className="rcp-fix-row" key={row.prob}>
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

      {/* INCLUDED */}
      <section className="band rcp-sec" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>{included.heading}</h2>
          </Reveal>
          <Reveal className="rcp-inc2-grid">
            {included.items.map((item) => (
              <div className="rcp-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint rcp-sec" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>{who.heading}</h2>
          </Reveal>
          <div className="rcp-who-grid">
            {who.items.map((item, i) => (
              <Reveal className="rcp-who" key={i} style={d(WHO_DELAYS[i] ?? 0)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq items={faq.items} columns={2} numbered={false} eyebrow="Common questions" heading={faq.heading} />

      <CtaBand
        id="start"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        copy={cta.copy}
        primaryLabel={cta.primaryLabel}
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#example", arrow: "↗" }}
      />
    </>
  );
}
