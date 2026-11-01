"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, TrustBar, d } from "../../ServiceDetailKit";
import { ICON_CHECK, ICON_X } from "./icons";
import type { IconCard, PlatformData, PlatformSection } from "./types";
import "./spf-page.css";

/* -------- section shell: band + sec-head -------- */

function Band({ section, dark, children }: { section: PlatformSection; dark?: boolean; children: ReactNode }) {
  const tone = dark ? " dark" : section.tint ? " tint" : "";
  return (
    <section className={`band${tone} spf-sec`} id={section.id}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{section.eyebrow}</span>
          <h2>{section.heading}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* -------- 6 tilt cards -------- */

function TiltGrid({ cards }: { cards: IconCard[] }) {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="spf-tl-grid">
        {cards.map((card) => (
          <article className="spf-tl" key={card.title} data-tilt>
            <span className="spf-tl-spot"></span>
            <div className="tli">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- one body section -------- */

function Section({ section }: { section: PlatformSection }) {
  switch (section.kind) {
    case "glance":
      return (
        <Band section={section} dark>
          <Reveal className="spf-glance">
            <div className="gtxt">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="gbox">
              <h4>At a glance</h4>
              <ul>
                {section.glance.map((item) => (
                  <li key={item}>
                    <span className="gk">{ICON_CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Band>
      );

    case "iconTable":
      return (
        <Band section={section}>
          <Reveal className="spf-it-tbl">
            <div className="spf-it-row head">
              {section.head.map((h) => (
                <div key={h}>{h}</div>
              ))}
            </div>
            {section.rows.map((row) => (
              <div className="spf-it-row" key={row.name}>
                <div>
                  <span className="iti">{row.icon}</span>
                  {row.name}
                </div>
                <div>{row.what}</div>
                <div className="best2">{row.best}</div>
              </div>
            ))}
          </Reveal>
        </Band>
      );

    case "vsTable":
      return (
        <Band section={section}>
          <Reveal className="spf-vx-tbl">
            <div className="spf-vx-row head">
              <div></div>
              <div className="lf">{section.head[0]}</div>
              <div className="sf">{section.head[1]}</div>
            </div>
            {section.rows.map((row) => (
              <div className="spf-vx-row" key={row.label}>
                <div>{row.label}</div>
                <div className="lf">{row.left}</div>
                <div className="sf">{row.right}</div>
              </div>
            ))}
          </Reveal>
        </Band>
      );

    case "tiltGrid":
      return (
        <Band section={section}>
          <TiltGrid cards={section.cards} />
        </Band>
      );

    case "workflow":
      return (
        <Band section={section}>
          <Reveal className="spf-oc-list">
            {section.steps.map((step, i) => (
              <article className="spf-oc" key={step.title}>
                <span className="ocn">{i + 1}</span>
                <div className="oct">
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
                <span className="oco">{step.outcome}</span>
              </article>
            ))}
          </Reveal>
        </Band>
      );

    case "iconList":
      return (
        <Band section={section}>
          <Reveal className="spf-il-grid">
            {section.cards.map((card) => (
              <article className="spf-il" key={card.title}>
                <span className="ili">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </Band>
      );

    case "centerGrid":
      return (
        <Band section={section}>
          <Reveal className="spf-cg-grid">
            {section.cards.map((card) => (
              <article className="spf-cg" key={card.title}>
                <div className="cgi">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </Band>
      );

    case "sideGrid":
      return (
        <Band section={section}>
          <Reveal className={`spf-sg-grid${section.large ? " lg" : ""}`}>
            {section.cards.map((card) => (
              <article className="spf-sg" key={card.title}>
                <span className="sgi">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </Band>
      );

    case "mistakes":
      return (
        <Band section={section}>
          <Reveal className="spf-fix-tbl">
            <div className="spf-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {section.rows.map((row, i) => (
              <div className="spf-fix-row" key={i}>
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
        </Band>
      );

    case "included":
      return (
        <Band section={section}>
          <Reveal className="spf-inc-grid">
            {section.items.map((item, i) => (
              <div className="spf-inc" key={i}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </Band>
      );

    case "who":
      return (
        <Band section={section}>
          <div className="spf-who-grid">
            {section.items.map((item, i) => (
              <Reveal className="spf-who" key={i} style={d(i * 60)}>
                <span className="wi">{item.icon}</span>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Band>
      );
  }
}

/* -------- page -------- */

export default function SocialPlatformView({ data }: { data: PlatformData }) {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Social Media Management", href: "/digital-marketing/social-media-management" }}
        line1={data.hero.line1}
        line2={data.hero.line2}
        lead={data.hero.lead}
        primary={{ label: data.hero.primaryLabel, href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: "#workflow" }}
      >
        {data.card}
      </ServiceDetailHero>

      <TrustBar items={data.trust} />

      {data.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}

      <ServiceFaq items={data.faq.items} columns={2} numbered={false} tint eyebrow="Common questions" heading={data.faq.heading} />

      <CtaBand
        id="start"
        eyebrow={data.cta.eyebrow}
        heading={data.cta.heading}
        copy={data.cta.copy}
        primaryLabel={data.cta.primaryLabel}
        primaryHref="/contact"
        secondary={{ label: "See how it works", href: "#workflow", arrow: "↗" }}
      />
    </>
  );
}
