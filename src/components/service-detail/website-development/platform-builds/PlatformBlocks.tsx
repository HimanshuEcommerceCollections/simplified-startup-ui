"use client";

/**
 * Section blocks shared by the platform build pages (Framer, Webflow, Next.js & React).
 * The three designs come from one template: same glance / fit / tilt services / layer stack /
 * standards / comparison / chips / decisions / problems / included / who blocks, with page copy.
 * Namespace: .pb-
 */

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTiltCards } from "@/lib/useTilt";
import { d } from "../../ServiceDetailKit";
import { ICON_CHECK, ICON_X, ICON_X_THIN } from "./icons";
import "./pb-blocks.css";

/* -------- hero helpers -------- */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/<>*";

/** Gradient last word of the h1, scrambled into place 1.55s after load (as in the designs). */
export function ScrambleWord({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      let iters = 0;
      interval = setInterval(() => {
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < Math.floor(iters)) out += text[i];
          else if (text[i] === " ") out += " ";
          else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setShown(out);
        iters += 0.6;
        if (iters >= text.length) {
          clearInterval(interval);
          setShown(text);
        }
      }, 42);
    }, 1550);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduce, text]);

  return <span className="grad-text">{shown}</span>;
}

/** Signature card `.run` flag: set 900ms after mount; reduced motion shows the end state on first paint. */
export function useCardRun() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return reduce || started;
}

/* -------- section shell -------- */

export function PbBand({
  id,
  tone,
  eyebrow,
  heading,
  sub,
  center,
  children,
}: {
  id: string;
  tone?: "tint" | "dark";
  eyebrow: ReactNode;
  heading: string;
  sub?: ReactNode;
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`band${tone ? ` ${tone}` : ""}`} id={id}>
      <div className="wrap">
        <Reveal className="sec-head" style={center ? { margin: "0 auto 36px", textAlign: "center" } : undefined}>
          <span className="eyebrow" style={center ? { justifyContent: "center" } : undefined}>
            {eyebrow}
          </span>
          <h2>{heading}</h2>
          {sub && <p>{sub}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* -------- why (dark): copy + at-a-glance box -------- */

export function PbGlance({ paragraphs, items }: { paragraphs: ReactNode[]; items: string[] }) {
  return (
    <Reveal className="pb-glance">
      <div className="gtxt">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="gbox">
        <h4>At a glance</h4>
        <ul>
          {items.map((item) => (
            <li key={item}>
              <span className="gk">{ICON_CHECK}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* -------- fit split -------- */

export function PbFit({ no, yes }: { no: { title: string; items: string[] }; yes: { title: string; items: string[] } }) {
  return (
    <Reveal className="pb-fit-grid">
      <article className="pb-fit no">
        <h3>
          <span className="fh">{ICON_X_THIN}</span>
          {no.title}
        </h3>
        <ul>
          {no.items.map((item) => (
            <li key={item}>
              <span className="m">{ICON_X}</span>
              {item}
            </li>
          ))}
        </ul>
      </article>
      <article className="pb-fit yes">
        <h3>
          <span className="fh">{ICON_CHECK}</span>
          {yes.title}
        </h3>
        <ul>
          {yes.items.map((item) => (
            <li key={item}>
              <span className="m">{ICON_CHECK}</span>
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

/* -------- 6 tilt cards (services / build types) -------- */

export type PbCard = { icon: ReactNode; title: string; href?: string; text: string };

export function PbTiltGrid({ items }: { items: PbCard[] }) {
  const tiltRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={tiltRef}>
      <Reveal className="pb-sv6-grid">
        {items.map((card) => (
          <article className="pb-sv6" data-tilt key={card.title}>
            <span className="pb-sv6-spot"></span>
            <div className="s6i">{card.icon}</div>
            <h3>{card.href ? <a href={card.href}>{card.title}</a> : card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- layer stack (head, connectors, 4 layers) -------- */

export type PbLayer = { icon: ReactNode; title: string; kicker: string; items: string[] };

export function PbStack({ head, conn, layers }: { head: string; conn: string; layers: PbLayer[] }) {
  return (
    <Reveal className="pb-stack">
      <div className="pb-stack-head">{head}</div>
      <div className="pb-stack-conn" aria-hidden="true">
        {[conn, conn, conn, conn].join("   ")}
      </div>
      <div className="pb-stack-layers">
        {layers.map((layer) => (
          <article className="pb-sl" key={layer.title}>
            <div className="sli">{layer.icon}</div>
            <h3>{layer.title}</h3>
            <span className="slk">{layer.kicker}</span>
            <ul>
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Reveal>
  );
}

/* -------- numbered build process with outcome pills -------- */

export function PbProcess({ steps }: { steps: { title: string; text: string; out: string }[] }) {
  return (
    <Reveal className="pb-oc-list">
      {steps.map((step, i) => (
        <article className="pb-oc" key={step.title}>
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

/* -------- standards (2-col icon rows) -------- */

export function PbStandards({ items }: { items: { icon: ReactNode; title: string; text: string }[] }) {
  return (
    <Reveal className="pb-st8-grid">
      {items.map((item) => (
        <article className="pb-st8" key={item.title}>
          <span className="s8i">{item.icon}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </Reveal>
  );
}

/* -------- comparison table: first data column is "ours" -------- */

export function PbCompare({ columns, rows }: { columns: ReactNode[]; rows: { label: string; cells: ReactNode[] }[] }) {
  const size = columns.length === 3 ? " c3" : " c2";
  return (
    <Reveal className={`pb-cmp${size}`}>
      <div className="pb-cmp-row head">
        <div></div>
        {columns.map((col, i) => (
          <div className={i === 0 ? "hl" : "oth"} key={i}>
            {col}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div className="pb-cmp-row" key={row.label}>
          <div>{row.label}</div>
          {row.cells.map((cell, i) => (
            <div className={i === 0 ? "hl" : undefined} key={i}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </Reveal>
  );
}

/* -------- 3-col data table (migration / rendering) -------- */

export function PbDataTable({ head, rows }: { head: [string, string, string]; rows: [ReactNode, ReactNode, ReactNode][] }) {
  return (
    <Reveal className="pb-dt">
      <div className="pb-dt-row head">
        {head.map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div className="pb-dt-row" key={i}>
          <div>{row[0]}</div>
          <div>{row[1]}</div>
          <div className="em">{row[2]}</div>
        </div>
      ))}
    </Reveal>
  );
}

/* -------- integration chips -------- */

export function PbChips({ items }: { items: string[] }) {
  return (
    <Reveal className="pb-plat-row">
      {items.map((item) => (
        <span className="pb-plat" key={item}>
          <span className="pd2"></span>
          {item}
        </span>
      ))}
    </Reveal>
  );
}

/* -------- decisions / early questions -------- */

export function PbDecisions({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <Reveal className="pb-q-grid">
      {items.map((item) => (
        <article className="pb-qc" key={item.title}>
          <span className="qi">?</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </Reveal>
  );
}

/* -------- common problems (problem -> fix) -------- */

export function PbProblems({ rows }: { rows: { prob: string; fix: string }[] }) {
  return (
    <Reveal className="pb-fix-tbl">
      <div className="pb-fix-row head">
        <div>What goes wrong</div>
        <div>How we handle it</div>
      </div>
      {rows.map((row) => (
        <div className="pb-fix-row" key={row.prob}>
          <div className="prob">
            <span className="xi">{ICON_X_THIN}</span>
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

/* -------- included (2-col icon list) -------- */

export function PbIncluded({ items }: { items: { icon: ReactNode; text: string }[] }) {
  return (
    <Reveal className="pb-inc2-grid">
      {items.map((item) => (
        <div className="pb-inc2" key={item.text}>
          <span className="ik">{item.icon}</span>
          <p>{item.text}</p>
        </div>
      ))}
    </Reveal>
  );
}

/* -------- who (4 cards, 2-col; the designs inline the grid columns) -------- */

export function PbWho({ items }: { items: { icon: ReactNode; text: ReactNode }[] }) {
  return (
    <div className="pb-who-grid">
      {items.map((item, i) => (
        <Reveal className="pb-who" key={i} style={d(i * 60)}>
          <span className="wi">{item.icon}</span>
          <p>{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
