"use client";

import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { ServiceDetailHero, ServiceFaq, TrustBar, d } from "../../ServiceDetailKit";
import HeroCard from "./HeroCard";
import RevenueWaterfall from "./RevenueWaterfall";
import PayoutBreakdown from "./PayoutBreakdown";
import PropertyTree from "./PropertyTree";
import PrimeCostBars from "./PrimeCostBars";
import { FounderQuestions, SaasReports } from "./SaasBlocks";
import { ICON_CHECK, ICON_CHECK_BOLD, ICON_WARN, ICON_X, ICON_X_BOLD } from "./icons";
import type { IndustryData, MiddleBlock } from "./types";
import "./bki-page.css";

/* -------- shared middle blocks -------- */

function MiddleBlockView({ block }: { block: MiddleBlock }) {
  switch (block.kind) {
    case "table":
      return (
        <Reveal className="bki-ch-tbl">
          <div className="bki-ch-row head">
            {block.head.map((h) => (
              <div key={h}>{h}</div>
            ))}
          </div>
          {block.rows.map(([a, b, c]) => (
            <div className="bki-ch-row" key={a}>
              <div>{a}</div>
              <div>{b}</div>
              <div className="rec">{c}</div>
            </div>
          ))}
        </Reveal>
      );
    case "waterfall":
      return <RevenueWaterfall steps={block.steps} />;
    case "payout":
      return <PayoutBreakdown steps={block.steps} />;
    case "cards":
      return (
        <Reveal className="bki-iv-grid">
          {block.cards.map((card) => (
            <article className={`bki-iv${card.sub ? " has-sub" : ""}`} key={card.title}>
              {card.kicker && <span className="ivk">{card.kicker}</span>}
              <div className="ivi">{card.icon}</div>
              <h3>{card.title}</h3>
              {card.sub && <span className="ivsub">{card.sub}</span>}
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      );
    case "timeline":
      return (
        <Reveal className="bki-ct4">
          {block.steps.map((step) => (
            <div className="bki-cte" key={step.title}>
              <span className="when">{step.when}</span>
              <span className="dot3"></span>
              <div className="box">
                <b>{step.title}</b>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      );
    case "reports":
      return (
        <Reveal className="bki-rp4-grid">
          {block.items.map((item) => (
            <article className="bki-rp4" key={item.title}>
              <span className="r4i">{item.icon}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      );
    case "propertyTree":
      return <PropertyTree head={block.head} nodes={block.nodes} />;
    case "txTable":
      return (
        <Reveal className="bki-tx-tbl">
          <div className="bki-tx-row head">
            {block.head.map((h) => (
              <div key={h}>{h}</div>
            ))}
          </div>
          {block.rows.map((row) => (
            <div className="bki-tx-row" key={row.item}>
              <div>{row.item}</div>
              <div className="miss">
                <span className="mi">{ICON_X_BOLD}</span>
                {row.mistake}
              </div>
              <div className="ok">
                <span className="oi">{ICON_CHECK_BOLD}</span>
                {row.fix}
              </div>
            </div>
          ))}
        </Reveal>
      );
    case "primeCost":
      return <PrimeCostBars bars={block.bars} total={block.total} />;
    case "compare":
      return (
        <Reveal className="bki-ca-tbl">
          <div className="bki-ca-row head">
            <div></div>
            <div className="cash">{block.head[0]}</div>
            <div className="acc">{block.head[1]}</div>
          </div>
          {block.rows.map((row) => (
            <div className="bki-ca-row" key={row.k}>
              <div>{row.k}</div>
              <div className="cash">{row.cash}</div>
              <div className="acc">{row.acc}</div>
            </div>
          ))}
        </Reveal>
      );
    case "accounts":
      return (
        <Reveal className="bki-coa-grid">
          {block.cards.map((card) => (
            <article className="bki-coa" key={card.kicker}>
              <span className="coak">{card.kicker}</span>
              <div className="coai">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      );
    case "reports6":
      return <SaasReports items={block.items} />;
    case "founderQs":
      return <FounderQuestions items={block.items} />;
  }
}

/* -------- page -------- */

const WHO_DELAYS = [0, 60, 120, 180];

export default function BookkeepingIndustryView({ data }: { data: IndustryData }) {
  const { hero, why, tools, problems, included, who, faq, cta } = data;

  return (
    <div className="bki-page">
      <ServiceDetailHero
        compact
        className="bki-hero"
        crumb={{ label: "Bookkeeping & Accounting", href: "/bookkeeping" }}
        line1={hero.line1}
        line2={hero.line2}
        lead={hero.lead}
        primary={{ label: hero.primaryLabel, href: "/contact" }}
        secondary={{ label: "See how it works ↓", href: hero.secondaryHref }}
      >
        <HeroCard card={hero.card} />
      </ServiceDetailHero>

      <TrustBar items={data.trust} />

      {/* WHY (dark + at a glance) */}
      <section className="band dark" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{why.eyebrow}</span>
            <h2>{why.heading}</h2>
          </Reveal>
          <Reveal className="bki-glance">
            <div className="gtxt">
              {why.paras.map((para, i) => (
                <p key={i}>{para}</p>
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

      {/* INDUSTRY SECTIONS (tint alternates, starting tinted) */}
      {data.middle.map((section, i) => (
        <section className={`band${i % 2 === 0 ? " tint" : ""}`} id={section.id} key={section.id}>
          <div className="wrap">
            <Reveal className="sec-head">
              <span className="eyebrow">{section.eyebrow}</span>
              <h2>{section.heading}</h2>
            </Reveal>
            <MiddleBlockView block={section.block} />
          </div>
        </section>
      ))}

      {/* TOOLS */}
      <section className="band" id="tools">
        <div className="wrap">
          <Reveal className="sec-head" style={{ margin: "0 auto 36px", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Tools
            </span>
            <h2>Tools we work with.</h2>
          </Reveal>
          <Reveal className="bki-tl-grid">
            {tools.names.map((name) => (
              <div className="bki-tl" key={name}>
                <span className="td"></span>
                <b>{name}</b>
              </div>
            ))}
          </Reveal>
          <Reveal className="bki-cnote">
            {ICON_WARN}
            <p>{tools.note}</p>
          </Reveal>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="band tint" id="problems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common problems</span>
            <h2>{problems.heading}</h2>
          </Reveal>
          <Reveal className="bki-fix-tbl">
            <div className="bki-fix-row head">
              <div>What goes wrong</div>
              <div>How we handle it</div>
            </div>
            {problems.rows.map(([prob, fix]) => (
              <div className="bki-fix-row" key={prob}>
                <div className="prob">
                  <span className="xi">{ICON_X}</span>
                  {prob}
                </div>
                <div className="fix">
                  <span className="vi">{ICON_CHECK}</span>
                  {fix}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>{included.heading}</h2>
          </Reveal>
          <Reveal className="bki-inc-grid">
            {included.items.map((item) => (
              <div className="bki-inc" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who it’s for</span>
            <h2>{who.heading}</h2>
          </Reveal>
          <div className="bki-who-grid">
            {who.items.map((item, i) => (
              <Reveal className="bki-who" key={i} style={d(WHO_DELAYS[i] ?? 0)}>
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
        secondary={{ label: "See how it works", href: cta.secondaryHref, arrow: "↗" }}
      />
    </div>
  );
}
