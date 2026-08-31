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
  eyebrow: string;
  line1: ReactNode;
  line2: ReactNode;
  lead: ReactNode;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  sign: string;
  /** Right-hand signature card. */
  children: ReactNode;
};

export function ServiceDetailHero({ eyebrow, line1, line2, lead, primary, secondary, sign, children }: HeroProps) {
  const [heroIn, setHeroIn] = useState(false);
  const { sectionRef, spotRef } = usePointerSpot<HTMLElement, HTMLSpanElement>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setHeroIn(true), reduce ? 0 : 260);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="sd-hero" id="top" ref={sectionRef}>
      <div className="sd-grid-bg"></div>
      <span className="sd-cursor" ref={spotRef}></span>
      <div className="wrap">
        <div className="sd-hero-inner">
          <div>
            <span className="eyebrow sd-hero-tag">{eyebrow}</span>
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
            <span className="sd-sign">
              <span className="d"></span> {sign}
            </span>
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
  open,
  onToggle,
}: {
  item: ServiceFaqItem;
  index: number;
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
          <span className="qn">Q.{index + 1}</span> {item.q}
        </span>
        <span className="ic"></span>
      </button>
      <div className="sd-faq-a" ref={panelRef} style={{ maxHeight }}>
        <div className="sd-faq-a-inner">{item.a}</div>
      </div>
    </div>
  );
}

export function ServiceFaq({ items }: { items: ServiceFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="band" id="faq">
      <div className="wrap">
        <Reveal className="sec-head" style={{ margin: "0 auto 44px", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Fair questions
          </span>
          <h2>Asked by every smart buyer.</h2>
        </Reveal>
        <Reveal className="sd-faq-list">
          {items.map((item, i) => (
            <ServiceFaqRow
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
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
