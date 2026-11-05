"use client";

/**
 * Blocks shared by the email-family sub-pages (e-commerce email, email automation,
 * deliverability audit, newsletter, SMS & WhatsApp). The five designs ship these
 * sections with identical CSS; only the copy differs.
 */

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { d } from "../../ServiceDetailKit";
import { ICON_CHECK, ICON_X } from "./icons";
import "./email-family.css";

/** Hero signature cards start their row animation 900ms after mount (end state at once under reduced motion). */
export function useHeroRun(): boolean {
  const reduce = useReducedMotion();
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRan(true), 900);
    return () => clearTimeout(t);
  }, []);

  return reduce || ran;
}

/* -------- section head -------- */

export function SecHead({ eyebrow, heading, sub, center }: { eyebrow: string; heading: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <Reveal className="sec-head" style={center ? { margin: "0 auto 36px", textAlign: "center" } : undefined}>
      <span className="eyebrow" style={center ? { justifyContent: "center" } : undefined}>
        {eyebrow}
      </span>
      <h2>{heading}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}

/* -------- dark "why" band: text + at-a-glance box -------- */

export function GlanceBand({
  eyebrow,
  heading,
  sub,
  paragraphs,
  items,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  sub: ReactNode;
  paragraphs: ReactNode[];
  items: ReactNode[];
  /** Extra content under the glance grid (the SMS compliance note). */
  children?: ReactNode;
}) {
  return (
    <section className="band dark" id="why">
      <div className="wrap">
        <SecHead eyebrow={eyebrow} heading={heading} sub={sub} />
        <Reveal className="emf-glance">
          <div className="gtxt">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="gbox">
            <h4>At a glance</h4>
            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  <span className="gk">{ICON_CHECK}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* -------- vertical timeline (cart flow, branching welcome series, order journey) -------- */

export type TimelineStep = { when: string; title: string; text: string; branch?: string };

export function Timeline({ steps, whenWidth, note }: { steps: TimelineStep[]; whenWidth: number; note?: ReactNode }) {
  return (
    <>
      <Reveal className="emf-ct4" style={{ "--emf-when": `${whenWidth}px` } as CSSProperties}>
        {steps.map((step) => (
          <div className={`emf-cte${step.branch ? " branch" : ""}`} key={step.title}>
            <span className="when">{step.when}</span>
            <span className="dot3"></span>
            <div className="box">
              {step.branch && <span className="bt2">{step.branch}</span>}
              <b>{step.title}</b>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </Reveal>
      {note && <Reveal as="p" className="emf-ct4-note">{note}</Reveal>}
    </>
  );
}

/* -------- "Platforms we work with" chip band -------- */

export function PlatformsBand({ items, tint }: { items: string[]; tint?: boolean }) {
  return (
    <section className={`band${tint ? " tint" : ""}`} id="platforms">
      <div className="wrap">
        <SecHead center eyebrow="Software" heading="Platforms we work with." />
        <Reveal className="emf-plat-row">
          {items.map((item) => (
            <span className="emf-plat" key={item}>
              <span className="pd2"></span>
              {item}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* -------- problem / fix table -------- */

export function FixTable({ rows }: { rows: { prob: string; fix: string }[] }) {
  return (
    <Reveal className="emf-fix-tbl">
      <div className="emf-fix-row head">
        <div>What goes wrong</div>
        <div>How we handle it</div>
      </div>
      {rows.map((row) => (
        <div className="emf-fix-row" key={row.prob}>
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
  );
}

/* -------- numbered process rows -------- */

export function ProcessList({ steps }: { steps: { title: string; text: string; out: string }[] }) {
  return (
    <Reveal className="emf-oc-list">
      {steps.map((step, i) => (
        <article className="emf-oc" key={step.title}>
          <span className="ocn">{i + 1}</span>
          <div className="oct">
            <b>{step.title}</b>
            <p>{step.text}</p>
          </div>
          <span className="oco">{step.out}</span>
        </article>
      ))}
    </Reveal>
  );
}

/* -------- included checklist (2-col) -------- */

export function IncludedGrid({ items }: { items: { icon: ReactNode; text: ReactNode }[] }) {
  return (
    <Reveal className="emf-inc2-grid">
      {items.map((item, i) => (
        <div className="emf-inc2" key={i}>
          <span className="ik">{item.icon}</span>
          <p>{item.text}</p>
        </div>
      ))}
    </Reveal>
  );
}

/* -------- who it's for (2-up; the designs set the 2 columns inline) -------- */

export function WhoGrid2({ items }: { items: { icon: ReactNode; text: ReactNode }[] }) {
  return (
    <div className="emf-who-grid">
      {items.map((item, i) => (
        <Reveal className="emf-who" key={i} style={d(i * 60)}>
          <span className="wi">{item.icon}</span>
          <p>{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
