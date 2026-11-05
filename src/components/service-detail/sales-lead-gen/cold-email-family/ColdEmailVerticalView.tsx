"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, type ServiceFaqItem } from "../../ServiceDetailKit";
import {
  Band,
  ComplianceNote,
  FixTable,
  Glance,
  IncludedGrid,
  NumberedRows,
  Scramble,
  Timeline,
  TriTable,
  WhoGrid,
  useCardRun,
  type FixRow,
  type IconText,
  type NumberedRow,
  type TableRow,
  type TimelineStep,
  type Tone,
  type WhoItem,
} from "./blocks";
import { ICON_ARROW } from "./icons";
import { AGENCIES } from "./data-agencies";
import { CONSULTING } from "./data-consulting";
import { SAAS } from "./data-saas";

/* -------- data model: one page = hero card + an ordered list of sections -------- */

type SectionBase = { id: string; tone: Tone; eyebrow: string; heading: string; intro?: ReactNode };

export type IconCard = { icon: ReactNode; title: string; text: string };

export type VerticalSection = SectionBase &
  (
    | { kind: "glance"; paras: ReactNode[]; items: string[] }
    | { kind: "table"; head: [string, string, string]; rows: TableRow[] }
    | { kind: "timeline"; steps: TimelineStep[] }
    /** agencies: 6 tilt cards */
    | { kind: "angles"; cards: IconCard[] }
    /** agencies: 4 offers, icon left */
    | { kind: "offers"; cards: IconCard[] }
    /** consulting: 3 offers, centred */
    | { kind: "offers3"; cards: IconCard[] }
    | { kind: "replies"; items: { q: string; a: string }[]; note?: boolean }
    | { kind: "fix"; rows: FixRow[] }
    | { kind: "included"; items: IconText[] }
    | { kind: "who"; items: WhoItem[] }
    /** consulting: insight-led 4-step flow */
    | { kind: "flow"; steps: (IconCard & { kicker: string })[] }
    /** SaaS: ICP building blocks */
    | { kind: "icp"; cards: (IconCard & { kicker: string; sub: string })[] }
    /** SaaS: messaging by persona */
    | { kind: "personas"; cards: (IconCard & { focus: string; mid?: boolean })[] }
    /** SaaS: CRM steps */
    | { kind: "rows"; rows: NumberedRow[]; note?: boolean }
  );

export type VerticalPage = {
  hero: {
    line1: string;
    line2: string;
    /** gradient word that closes line 2 (scrambles in) */
    grad: string;
    lead: ReactNode;
    primaryLabel: string;
    secondary: { label: string; href: string };
  };
  card: {
    ariaLabel: string;
    live: string;
    corner: string;
    rows: { title: string; sub: string; when: string }[];
    footLeft: string;
    footRight: string;
  };
  trust: string[];
  sections: VerticalSection[];
  faq: { heading: string; items: ServiceFaqItem[] };
  cta: {
    eyebrow: string;
    heading: string;
    copy: ReactNode;
    primaryLabel: string;
    secondary: { label: string; href: string };
  };
};

const PAGES = { agencies: AGENCIES, consulting: CONSULTING, saas: SAAS } satisfies Record<string, VerticalPage>;

export type VerticalKey = keyof typeof PAGES;

/* -------- hero signature: outreach sequence card -------- */

function SequenceCard({ card }: { card: VerticalPage["card"] }) {
  const run = useCardRun();

  return (
    <SignatureCard
      className={`cev-sq${run ? " run" : ""}`}
      ariaLabel={card.ariaLabel}
      live={card.live}
      corner={card.corner}
      footLeft={card.footLeft}
      footRight={card.footRight}
    >
      <div className="cev-sq-body">
        {card.rows.map((row, i) => (
          <div className="cev-sqr" key={row.title}>
            <span className="sqn">{i + 1}</span>
            <span className="sqt">
              <b>{row.title}</b>
              <small>{row.sub}</small>
            </span>
            <span className="sqw">{row.when}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- page-specific bodies -------- */

function AnglesGrid({ cards }: { cards: IconCard[] }) {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const rootRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={rootRef}>
      <Reveal className="cev-pz-grid">
        {cards.map((card) => (
          <article className="cev-pz" key={card.title} data-tilt>
            <span className="cev-pz-spot"></span>
            <div className="pzi">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

function SectionBody({ section }: { section: VerticalSection }) {
  switch (section.kind) {
    case "glance":
      return <Glance paras={section.paras} items={section.items} />;
    case "table":
      return <TriTable head={section.head} rows={section.rows} />;
    case "timeline":
      return <Timeline steps={section.steps} />;
    case "angles":
      return <AnglesGrid cards={section.cards} />;
    case "offers":
      return (
        <Reveal className="cev-of-grid">
          {section.cards.map((card) => (
            <article className="cev-of" key={card.title}>
              <span className="ofi">{card.icon}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      );
    case "offers3":
      return (
        <Reveal className="cev-of3-grid">
          {section.cards.map((card) => (
            <article className="cev-of3" key={card.title}>
              <div className="o3i">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      );
    case "replies":
      return (
        <>
          <Reveal className="cev-rp-grid">
            {section.items.map((item) => (
              <article className="cev-rp" key={item.q}>
                <div className="rpq">
                  <span className="qm">?</span>
                  <span>&ldquo;{item.q}&rdquo;</span>
                </div>
                <p>{item.a}</p>
              </article>
            ))}
          </Reveal>
          {section.note && <ComplianceNote />}
        </>
      );
    case "fix":
      return <FixTable rows={section.rows} />;
    case "included":
      return <IncludedGrid items={section.items} />;
    case "who":
      return <WhoGrid items={section.items} />;
    case "flow":
      return (
        <Reveal className="cev-il4">
          {section.steps.map((step, i) => (
            <FlowStep key={step.kicker} step={step} arrow={i > 0} />
          ))}
        </Reveal>
      );
    case "icp":
      return (
        <Reveal className="cev-icp-grid">
          {section.cards.map((card) => (
            <article className="cev-icp" key={card.kicker}>
              <span className="ick">{card.kicker}</span>
              <div className="ici">{card.icon}</div>
              <h3>{card.title}</h3>
              <span className="icsub">{card.sub}</span>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      );
    case "personas":
      return (
        <Reveal className="cev-pr3-grid">
          {section.cards.map((card) => (
            <article className={`cev-pr3${card.mid ? " mid" : ""}`} key={card.title}>
              <span className="prk">{card.title}</span>
              <div className="pri">{card.icon}</div>
              <h3>{card.title}</h3>
              <span className="prc">{card.focus}</span>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>
      );
    case "rows":
      return (
        <>
          <NumberedRows rows={section.rows} />
          {section.note && <ComplianceNote />}
        </>
      );
  }
}

/** One step of the insight-led flow, preceded by an arrow (arrows are siblings, as in the design). */
function FlowStep({ step, arrow }: { step: IconCard & { kicker: string }; arrow: boolean }) {
  return (
    <>
      {arrow && <span className="ilarr">{ICON_ARROW}</span>}
      <article className="cev-il">
        <span className="ilk">{step.kicker}</span>
        <div className="ili">{step.icon}</div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </article>
    </>
  );
}

/* -------- page -------- */

export default function ColdEmailVerticalView({ page }: { page: VerticalKey }) {
  const data: VerticalPage = PAGES[page];

  return (
    <div className="cev-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "Cold Email", href: "/sales-lead-gen/cold-email" }}
        line1={data.hero.line1}
        line2={
          <>
            {data.hero.line2}{" "}
            <span className="grad-text">
              <Scramble text={data.hero.grad} />
            </span>
          </>
        }
        lead={data.hero.lead}
        primary={{ label: data.hero.primaryLabel, href: "/contact" }}
        secondary={data.hero.secondary}
      >
        <SequenceCard card={data.card} />
      </ServiceDetailHero>

      <TrustBar items={data.trust} />

      {data.sections.map((section) => (
        <Band
          key={section.id}
          id={section.id}
          tone={section.tone}
          eyebrow={section.eyebrow}
          heading={section.heading}
          intro={section.intro}
        >
          <SectionBody section={section} />
        </Band>
      ))}

      <ServiceFaq items={data.faq.items} columns={2} numbered={false} tint eyebrow="Common questions" heading={data.faq.heading} />

      <CtaBand
        id="start"
        eyebrow={data.cta.eyebrow}
        heading={data.cta.heading}
        copy={data.cta.copy}
        primaryLabel={data.cta.primaryLabel}
        primaryHref="/contact"
        secondary={{ ...data.cta.secondary, arrow: "↗" }}
      />
    </div>
  );
}
