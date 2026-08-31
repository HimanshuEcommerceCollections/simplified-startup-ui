"use client";

/**
 * Shared building blocks for the per-service detail pages
 * (website-development, ai-automation, and the six to come).
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { usePointerSpot } from "@/lib/usePointerSpot";
import { useTiltCards } from "@/lib/useTilt";
import "./service-detail.css";

export const d = (ms: number): CSSProperties => ({ "--d": ms } as CSSProperties);

/* -------- HERO -------- */

type HeroProps = {
  eyebrow?: string;
  /** Rendered above the h1 in place of / after the eyebrow (e.g. the crossed-out clichés list). */
  aboveTitle?: ReactNode;
  line1: ReactNode;
  line2: ReactNode;
  lead: ReactNode;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  sign?: string;
  /** Trust chips below the actions (digital-marketing hero). */
  chips?: string[];
  /** Smaller h1 + tighter lead (talent/advisory/branding heroes). */
  compact?: boolean;
  className?: string;
  /** Right-hand signature card. */
  children: ReactNode;
};

export function ServiceDetailHero({ eyebrow, aboveTitle, line1, line2, lead, primary, secondary, sign, chips, compact, className, children }: HeroProps) {
  const [heroIn, setHeroIn] = useState(false);
  const { sectionRef, spotRef } = usePointerSpot<HTMLElement, HTMLSpanElement>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setHeroIn(true), reduce ? 0 : 260);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`sd-hero${compact ? " sd-hero-compact" : ""}${className ? ` ${className}` : ""}`}
      id="top"
      ref={sectionRef}
    >
      <div className="sd-grid-bg"></div>
      <span className="sd-cursor" ref={spotRef}></span>
      <div className="wrap">
        <div className="sd-hero-inner">
          <div>
            {eyebrow && <span className="eyebrow sd-hero-tag">{eyebrow}</span>}
            {aboveTitle}
            <h1 className="sd-h1">
              <span className={`sd-mask${heroIn ? " in" : ""}`}>
                <span className="mri">{line1}</span>
              </span>
              <span className={`sd-mask${heroIn ? " in" : ""}`} style={{ transitionDelay: "150ms" }}>
                <span className="mri" style={heroIn ? { transitionDelay: "150ms" } : undefined}>
                  {line2}
                </span>
              </span>
            </h1>
            <p className="sd-lead">{lead}</p>
            <div className="sd-hero-actions">
              <a className="btn btn-primary" href={primary.href}>
                {primary.label} <span className="arw">↗</span>
              </a>
              <a className="btn btn-ghost" href={secondary.href}>
                {secondary.label}
              </a>
            </div>
            {chips && (
              <div className="sd-hero-chips">
                {chips.map((chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            )}
            {sign && (
              <span className="sd-sign">
                <span className="d"></span> {sign}
              </span>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

/* -------- signature-card shell -------- */

type SignatureCardProps = {
  live: ReactNode;
  corner: string;
  footLeft: ReactNode;
  footRight: ReactNode;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
};

export function SignatureCard({ live, corner, footLeft, footRight, ariaLabel, className, children }: SignatureCardProps) {
  return (
    <aside className={`sd-card${className ? ` ${className}` : ""}`} aria-label={ariaLabel}>
      <div className="sd-card-top">
        <span className="lt">
          <span className="dot"></span> {live}
        </span>
        <span className="rt">{corner}</span>
      </div>
      {children}
      <div className="sd-card-foot">
        <span>{footLeft}</span>
        <span className="gt">{footRight}</span>
      </div>
    </aside>
  );
}

/* -------- FEATURE GRID + CALLOUT -------- */

export type FeatureCard = {
  icon?: ReactNode;
  kicker?: string;
  title: string;
  items?: ReactNode[];
  text?: ReactNode;
  delay?: number;
};

export function FeatureGrid({ cards, columns = 2 }: { cards: FeatureCard[]; columns?: 2 | 3 }) {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div className={columns === 3 ? "sd-wf-grid" : "sd-feat-grid"} ref={gridRef}>
      {cards.map((card) => (
        <Reveal as="article" className="sd-feat" key={card.title} data-tilt style={d(card.delay ?? 0)}>
          <span className="sd-feat-spot"></span>
          {card.icon && <div className="fi">{card.icon}</div>}
          {card.kicker && <span className="fk">{card.kicker}</span>}
          <h3>{card.title}</h3>
          {card.items && (
            <ul>
              {card.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {card.text && <p>{card.text}</p>}
        </Reveal>
      ))}
    </div>
  );
}

export function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal className="sd-callout">
      <span className="cl">{label}</span>
      <p>{children}</p>
    </Reveal>
  );
}

/* -------- STEPS -------- */

export type Step = { no: string; dur: string; title: string; blocks: { k: string; v: ReactNode }[] };

export function StepsRow({ steps }: { steps: Step[] }) {
  return (
    <div className="sd-steps">
      {steps.map((step, i) => (
        <Reveal as="article" className="sd-step" key={step.title} style={d(i * 90)}>
          <span className="sd-step-connect"></span>
          <div className="sd-step-top">
            <span className="sd-step-no">{step.no}</span>
            <span className="sd-step-dur">{step.dur}</span>
          </div>
          <h3>{step.title}</h3>
          {step.blocks.map((block) => (
            <div key={block.k}>
              <span className="stk">{block.k}</span>
              <p className="stv">{block.v}</p>
            </div>
          ))}
        </Reveal>
      ))}
    </div>
  );
}

/* -------- PRICING BANDS -------- */

export type PriceBand = { kicker: string; price: string; per?: string; desc: ReactNode };

export function PriceBands({
  bands,
  discounts,
  note,
}: {
  bands: PriceBand[];
  discounts?: { pct: string; text: ReactNode }[];
  note?: ReactNode;
}) {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <>
      <div className="sd-bands" ref={gridRef}>
        {bands.map((band, i) => (
          <Reveal as="article" className="sd-pb" key={band.kicker} data-tilt style={d(i * 80)}>
            <span className="sd-pb-spot"></span>
            <span className="pk">{band.kicker}</span>
            <div className="pp">
              {band.price}
              {band.per && <span className="per"> {band.per}</span>}
            </div>
            <p className="pd">{band.desc}</p>
          </Reveal>
        ))}
      </div>
      {discounts && (
        <Reveal className="sd-disc">
          {discounts.map((disc) => (
            <div className="sd-dc" key={disc.pct}>
              <span className="pct">{disc.pct}</span>
              <p>{disc.text}</p>
            </div>
          ))}
        </Reveal>
      )}
      {note && (
        <Reveal as="p" className="sd-price-note">
          {note}
        </Reveal>
      )}
    </>
  );
}

/* -------- FAQ -------- */

export type ServiceFaqItem = { q: string; a: ReactNode };

function ServiceFaqRow({
  item,
  index,
  numbered,
  open,
  onToggle,
}: {
  item: ServiceFaqItem;
  index: number;
  numbered: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    setMaxHeight(open ? panel.scrollHeight : 0);
    if (!open) return;
    function onResize() {
      if (panelRef.current) setMaxHeight(panelRef.current.scrollHeight);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <div className={`sd-faq-item${open ? " open" : ""}`}>
      <button className="sd-faq-q" aria-expanded={open} onClick={onToggle}>
        <span>
          {numbered && <span className="qn">Q.{index + 1}</span>}
          {numbered ? " " : null}
          {item.q}
        </span>
        <span className="ic"></span>
      </button>
      <div className="sd-faq-a" ref={panelRef} style={{ maxHeight }}>
        <div className="sd-faq-a-inner">{item.a}</div>
      </div>
    </div>
  );
}

function ServiceFaqList({ items, numbered }: { items: ServiceFaqItem[]; numbered: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className={`sd-faq-list${numbered ? "" : " plain"}`}>
      {items.map((item, i) => (
        <ServiceFaqRow
          key={item.q}
          item={item}
          index={i}
          numbered={numbered}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

export function ServiceFaq({
  items,
  columns = 1,
  numbered = true,
  tint = false,
  eyebrow = "Fair questions",
  heading = "Asked by every smart buyer.",
}: {
  items: ServiceFaqItem[];
  columns?: 1 | 2;
  numbered?: boolean;
  tint?: boolean;
  eyebrow?: string;
  heading?: string;
}) {
  const half = Math.ceil(items.length / 2);
  return (
    <section className={`band${tint ? " tint" : ""}`} id="faq">
      <div className="wrap">
        <Reveal className="sec-head" style={{ margin: "0 auto 44px", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            {eyebrow}
          </span>
          <h2>{heading}</h2>
        </Reveal>
        {columns === 2 ? (
          <Reveal className="sd-faq-cols">
            <ServiceFaqList items={items.slice(0, half)} numbered={numbered} />
            <ServiceFaqList items={items.slice(half)} numbered={numbered} />
          </Reveal>
        ) : (
          <Reveal>
            <ServiceFaqList items={items} numbered={numbered} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* -------- TRUST BAR -------- */

export function TrustBar({ items }: { items: string[] }) {
  return (
    <div className="sd-trust">
      <div className="wrap">
        {items.map((item) => (
          <span key={item}>
            <span className="d"></span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------- PROBLEM GRID + SOLVE BAR -------- */

const KIT_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type ProblemItem = { icon: ReactNode; title: string; text: ReactNode; delay?: number };

export function ProblemSolve({
  items,
  solve,
  columns = 2,
  draw = false,
}: {
  items: ProblemItem[];
  solve: ReactNode;
  /** 2 (talent/branding) or 3 (advisory). */
  columns?: 2 | 3;
  /** Advisory variant: the ✕ icon draws its strokes instead of popping in. */
  draw?: boolean;
}) {
  return (
    <>
      <div className={`sd-prob-grid${columns === 3 ? " cols-3" : ""}`}>
        {items.map((item) => (
          <Reveal className={`sd-prob${draw ? " draw" : ""}`} key={item.title} style={d(item.delay ?? 0)}>
            <h3>
              <span className="x">{item.icon}</span>
              {item.title}
            </h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="sd-prob-solve">
        <span className="mk">{KIT_CHECK}</span>
        <p>{solve}</p>
      </Reveal>
    </>
  );
}

/* -------- WHO IT'S FOR (dark) -------- */

export type WhoItem = { icon: ReactNode; title: string; text: ReactNode; delay?: number };

export function WhoGrid({ items }: { items: WhoItem[] }) {
  return (
    <div className="sd-who-grid">
      {items.map((item) => (
        <Reveal className="sd-who" key={item.title} style={d(item.delay ?? 0)}>
          <div className="wi">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- WHAT YOU GET -------- */

export function GetGrid({ items }: { items: { text: ReactNode; delay?: number }[] }) {
  return (
    <div className="sd-get-grid">
      {items.map((item, i) => (
        <Reveal className="sd-getc" key={i} style={d(item.delay ?? 0)}>
          <span className="gk">{KIT_CHECK}</span>
          <p>{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- SIMPLE STEP CARDS (4-up, advisory/branding) -------- */

export type StepCard = { no: string; dur: string; title: string; text: ReactNode; delay?: number };

export function StepCards({ steps }: { steps: StepCard[] }) {
  return (
    <div className="sd-steps4">
      {steps.map((step) => (
        <Reveal as="article" className="sd-step4" key={step.title} style={d(step.delay ?? 0)}>
          <div className="st4-top">
            <span className="st4-no">{step.no}</span>
            <span className="st4-dur">{step.dur}</span>
          </div>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- PRICING TIERS (name / best-for / published rate) -------- */

export type PricingTier = { name: string; best: ReactNode; price: string; featured?: boolean; badge?: string; delay?: number };

export function PricingTiers({ tiers, columns = 3 }: { tiers: PricingTier[]; columns?: 3 | 4 }) {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div className={`sd-tiers${columns === 4 ? " cols-4" : ""}`} ref={gridRef}>
      {tiers.map((tier) => (
        <Reveal
          as="article"
          className={`sd-tier${tier.featured ? " is-feature" : ""}`}
          key={tier.name}
          data-tilt
          style={d(tier.delay ?? 0)}
        >
          {tier.badge && <span className="sd-tier-badge">{tier.badge}</span>}
          <span className="sd-tier-spot"></span>
          <div className="tn">{tier.name}</div>
          <p className="tb">{tier.best}</p>
          <div className="tp">{tier.price}</div>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- NOTE CALLOUT (gradient left rule, terms / price notes) -------- */

export function NoteCallout({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <Reveal className="sd-note" style={style}>
      {children}
    </Reveal>
  );
}

/* -------- ADJACENT -------- */

export type AdjacentCard = { title: string; desc: ReactNode; tag?: string };

export function AdjacentGrid({ cards }: { cards: AdjacentCard[] }) {
  return (
    <div className="sd-adj-grid">
      {cards.map((card, i) => (
        <Reveal as="article" className="sd-adj" key={card.title} style={d(i % 2 === 1 ? 80 : 0)}>
          <h3>{card.title}</h3>
          <p>
            {card.desc}
            {card.tag && <span className="tag">{card.tag}</span>}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
