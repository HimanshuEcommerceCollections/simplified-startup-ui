"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar, type ServiceFaqItem } from "../../ServiceDetailKit";
import { ECOMMERCE } from "./ecommerce";
import { HEALTHCARE } from "./healthcare";
import { REAL_ESTATE } from "./real-estate";
import { SAAS } from "./saas";
import "./cbi-page.css";

/* -------- data shape (one file per industry) -------- */

type Bubble = { from: "them" | "bot"; text: string };
type NoteIcon = "warn" | "shield" | "privacy";
type Note = { icon: NoteIcon; text: ReactNode };
type Head = { eyebrow: string; heading: string };

export type ChatbotIndustryData = {
  hero: {
    line1: ReactNode;
    line2: ReactNode;
    lead: ReactNode;
    primaryLabel: string;
    secondary: { label: string; href: string };
    card: {
      ariaLabel: string;
      live: string;
      corner: string;
      botName: string;
      botStatus: string;
      bubbles: Bubble[];
      /** Healthcare: amber "admin only" strip under the chat. */
      disclaimer?: string;
      footLeft: string;
      footRight: string;
    };
  };
  trust: string[];
  why: Head & {
    paragraphs: ReactNode[];
    glance: string[];
    /** Healthcare: dark safety banner between the glance block and the chips. */
    safety?: { title: string; text: ReactNode };
    chips: string[];
  };
  capabilities: Head & { cards: { label: string; icon: ReactNode; title: string; text: ReactNode; items: string[] }[] };
  touchpoints: Head & { stackHead: string; layers: { icon: ReactNode; title: string; items: string[] }[] };
  readiness: Head & { tests: { title: string; text: string; example: string }[] };
  discovery: Head & { questions: { title: string; text: string }[] };
  process: Head & { steps: { title: string; text: string; output: string }[] };
  present: Head & { steps: { when: string; title: string; text: string }[]; conversation: Bubble[]; note?: Note };
  features: Head & { rows: { feature: string; purpose: string; notes: string }[]; note?: Note };
  qualities: Head & { items: { icon: ReactNode; title: string; text: string }[]; note: Note };
  mistakes: Head & { rows: { problem: string; fix: string }[] };
  who: Head & { items: { icon: ReactNode; title: string; text: string; useCase: string }[] };
  included: Head & { items: { icon: ReactNode; text: string }[] };
  faq: Head & { items: ServiceFaqItem[] };
  cta: { eyebrow: string; heading: string; copy: ReactNode; primaryLabel: string };
};

const INDUSTRIES = {
  ecommerce: ECOMMERCE,
  healthcare: HEALTHCARE,
  "real-estate": REAL_ESTATE,
  saas: SAAS,
} as const;

export type ChatbotIndustrySlug = keyof typeof INDUSTRIES;

/* -------- shared icons -------- */

const ICON_BOT = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="11" r="1.3" fill="currentColor" />
    <circle cx="15" cy="11" r="1.3" fill="currentColor" />
    <path d="M12 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_GLANCE_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);
const ICON_SHIELD_ALERT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PRIVACY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 11h14M12 4v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const NOTE_ICONS: Record<NoteIcon, ReactNode> = { warn: ICON_WARN, shield: ICON_SHIELD_ALERT, privacy: ICON_PRIVACY };

/* -------- hero signature: chat widget -------- */

function ChatWidgetCard({ card }: { card: ChatbotIndustryData["hero"]["card"] }) {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: bubbles and the disclaimer are shown in their end state on first paint
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel={card.ariaLabel}
      className={`cbi-cb${run ? " run" : ""}`}
      live={card.live}
      corner={card.corner}
      footLeft={card.footLeft}
      footRight={card.footRight}
    >
      <div className="cbi-cb-wname">
        <span className="wav">{ICON_BOT}</span>
        <span>
          <b>{card.botName}</b>
          <small>{card.botStatus}</small>
        </span>
      </div>
      <div className="cbi-cb-chat">
        {card.bubbles.map((bubble, i) => (
          <div className={`cbi-cbub ${bubble.from}`} key={i}>
            <div className="bb">{bubble.text}</div>
          </div>
        ))}
      </div>
      {card.disclaimer && (
        <div className="cbi-cb-disc">
          {ICON_WARN}
          {card.disclaimer}
        </div>
      )}
    </SignatureCard>
  );
}

/* -------- small pieces -------- */

function SecHead({ head }: { head: Head }) {
  return (
    <Reveal className="sec-head">
      <span className="eyebrow">{head.eyebrow}</span>
      <h2>{head.heading}</h2>
    </Reveal>
  );
}

function OrangeNote({ note, style }: { note: Note; style?: CSSProperties }) {
  return (
    <Reveal className="cbi-onote" style={style}>
      {NOTE_ICONS[note.icon]}
      <p>{note.text}</p>
    </Reveal>
  );
}

function CapabilityGrid({ cards }: { cards: ChatbotIndustryData["capabilities"]["cards"] }) {
  return (
    <Reveal className="cbi-cap-grid">
      {cards.map((card) => (
        <article className="cbi-cap" key={card.title}>
          <span className="cbi-cap-spot"></span>
          <span className="capl">{card.label}</span>
          <div className="capi">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          <ul>
            {card.items.map((item) => (
              <li key={item}>
                <span className="ck">{ICON_CHECK}</span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </Reveal>
  );
}

/* -------- page -------- */

export default function ChatbotIndustryView({ industry }: { industry: ChatbotIndustrySlug }) {
  const data = INDUSTRIES[industry];
  const { hero, why, capabilities, touchpoints, readiness, discovery, process, present, features, qualities, mistakes, who, included, faq, cta } = data;

  return (
    <div className="cbi-page">
      <ServiceDetailHero
        compact
        crumb={{ label: "AI Chatbots", href: "/ai-automation/ai-chatbots" }}
        line1={hero.line1}
        line2={hero.line2}
        lead={hero.lead}
        primary={{ label: hero.primaryLabel, href: "/contact" }}
        secondary={hero.secondary}
      >
        <ChatWidgetCard card={hero.card} />
      </ServiceDetailHero>

      <TrustBar items={data.trust} />

      {/* WHY (dark + glance + chips) */}
      <section className="band dark cbi-sec" id="why">
        <div className="wrap">
          <SecHead head={why} />
          <Reveal className="cbi-glance">
            <div className="gtxt">
              {why.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="gbox">
              <h4>At a glance</h4>
              <ul>
                {why.glance.map((item) => (
                  <li key={item}>
                    <span className="gk">{ICON_GLANCE_CHECK}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {why.safety && (
            <Reveal className="cbi-safety" style={{ marginTop: 24 }}>
              <span className="sfi">{ICON_SHIELD_ALERT}</span>
              <div>
                <b>{why.safety.title}</b>
                <p>{why.safety.text}</p>
              </div>
            </Reveal>
          )}
          <Reveal className="cbi-qchips">
            {why.chips.map((chip) => (
              <span className="qch" key={chip}>
                <span className="qq">“</span>
                {chip}”
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="band tint cbi-sec" id="capabilities">
        <div className="wrap">
          <SecHead head={capabilities} />
          <CapabilityGrid cards={capabilities.cards} />
        </div>
      </section>

      {/* TOUCHPOINTS (stacked diagram) */}
      <section className="band cbi-sec" id="touchpoints">
        <div className="wrap">
          <SecHead head={touchpoints} />
          <Reveal className="cbi-stack">
            <div className="cbi-stack-head">{touchpoints.stackHead}</div>
            <div className="cbi-stack-conn" aria-hidden="true">
              ↓ &nbsp; ↓ &nbsp; ↓ &nbsp; ↓
            </div>
            <div className="cbi-stack-layers">
              {touchpoints.layers.map((layer) => (
                <article className="cbi-sl" key={layer.title}>
                  <div className="sli">{layer.icon}</div>
                  <h3>{layer.title}</h3>
                  <ul>
                    {layer.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* READINESS TEST */}
      <section className="band tint cbi-sec" id="readiness">
        <div className="wrap">
          <SecHead head={readiness} />
          <Reveal className="cbi-rt6-grid">
            {readiness.tests.map((test, i) => (
              <article className="cbi-rt6" key={test.title}>
                <span className="rtn">{i + 1}</span>
                <h3>{test.title}</h3>
                <p>{test.text}</p>
                <p className="ex">{test.example}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* DISCOVERY QUESTIONS */}
      <section className="band cbi-sec" id="discovery">
        <div className="wrap">
          <SecHead head={discovery} />
          <Reveal className="cbi-q-grid">
            {discovery.questions.map((q, i) => (
              <article className="cbi-qc" key={q.title}>
                <span className="qi">{i + 1}</span>
                <div>
                  <h3>{q.title}</h3>
                  <p>{q.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="band tint cbi-sec" id="process">
        <div className="wrap">
          <SecHead head={process} />
          <Reveal className="cbi-oc-list">
            {process.steps.map((step, i) => (
              <article className="cbi-oc" key={step.title}>
                <span className="ocn">{i + 1}</span>
                <div className="oct">
                  <b>{step.title}</b>
                  <p>{step.text}</p>
                </div>
                <span className="oco">{step.output}</span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRESENT + SAMPLE CONVERSATION */}
      <section className="band cbi-sec" id="present">
        <div className="wrap">
          <SecHead head={present} />
          <Reveal className="cbi-pres-wrap">
            <div className="cbi-cp4">
              {present.steps.map((step) => (
                <div className="cbi-cp4e" key={step.title}>
                  <span className="dot3"></span>
                  <div>
                    <span className="wn">{step.when}</span>
                    <b>{step.title}</b>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cbi-convo">
              <div className="cvh">
                <span className="cvd"></span> Sample conversation <span className="ill">Illustrative only</span>
              </div>
              {present.conversation.map((bubble, i) => (
                <div className={`cvb ${bubble.from}`} key={i}>
                  <div className="bb">{bubble.text}</div>
                </div>
              ))}
            </div>
          </Reveal>
          {present.note && <OrangeNote note={present.note} style={{ marginTop: 26 }} />}
        </div>
      </section>

      {/* FEATURES TABLE */}
      <section className="band tint cbi-sec" id="features">
        <div className="wrap">
          <SecHead head={features} />
          <Reveal className="cbi-fe-tbl">
            <div className="cbi-fe-row head">
              <div>Feature</div>
              <div>Purpose</div>
              <div>Implementation notes</div>
            </div>
            {features.rows.map((row) => (
              <div className="cbi-fe-row" key={row.feature}>
                <div>{row.feature}</div>
                <div>{row.purpose}</div>
                <div className="impl">{row.notes}</div>
              </div>
            ))}
          </Reveal>
          {features.note && <OrangeNote note={features.note} />}
        </div>
      </section>

      {/* QUALITIES */}
      <section className="band cbi-sec" id="qualities">
        <div className="wrap">
          <SecHead head={qualities} />
          <Reveal className="cbi-st8-grid">
            {qualities.items.map((item) => (
              <article className="cbi-st8" key={item.title}>
                <span className="s8i">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
          <OrangeNote note={qualities.note} />
        </div>
      </section>

      {/* MISTAKES (problem / fix table) */}
      <section className="band tint cbi-sec" id="mistakes">
        <div className="wrap">
          <SecHead head={mistakes} />
          <Reveal className="cbi-fix-tbl">
            <div className="cbi-fix-row head">
              <div>What goes wrong</div>
              <div>How to address it</div>
            </div>
            {mistakes.rows.map((row) => (
              <div className="cbi-fix-row" key={row.problem}>
                <div className="prob">
                  <span className="xi">{ICON_X}</span>
                  {row.problem}
                </div>
                <div className="fix">
                  <span className="vi">{ICON_GLANCE_CHECK}</span>
                  {row.fix}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band cbi-sec" id="forwho">
        <div className="wrap">
          <SecHead head={who} />
          <Reveal className="cbi-wh5-grid">
            {who.items.map((item) => (
              <article className="cbi-wh5" key={item.title}>
                <div className="w5i">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="uc">
                  <b>Use case</b>
                  {item.useCase}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint cbi-sec" id="included">
        <div className="wrap">
          <SecHead head={included} />
          <Reveal className="cbi-inc2-grid">
            {included.items.map((item) => (
              <div className="cbi-inc2" key={item.text}>
                <span className="ik">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <ServiceFaq items={faq.items} columns={2} numbered={false} eyebrow={faq.eyebrow} heading={faq.heading} />

      <CtaBand
        id="start"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        copy={cta.copy}
        primaryLabel={cta.primaryLabel}
        primaryHref="/contact"
        secondary={{ label: "See what it does", href: "#capabilities", arrow: "↗" }}
      />
    </div>
  );
}
