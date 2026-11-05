"use client";

/* Section blocks shared by the cold email vertical pages and the deliverability page. */

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { d } from "../../ServiceDetailKit";
import { ICON_CHECK, ICON_WARN, ICON_X } from "./icons";
import "./cev-page.css";

export type Tone = "plain" | "tint" | "dark";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/<>*";

/** Hero gradient word: decodes from random glyphs into the final text (design's text-scramble). */
export function Scramble({ text }: { text: string }) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
        iters += 0.6;
        if (iters >= text.length) {
          if (interval) clearInterval(interval);
          setShown(text);
        } else {
          setShown(out);
        }
      }, 42);
    }, 1550);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text]);

  return <>{shown}</>;
}

/** The hero signature card's `run` flag: 900ms after mount, or at once under reduced motion. */
export function useCardRun() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return reduce || started;
}

const CENTER_HEAD: CSSProperties = { margin: "0 auto 36px", textAlign: "center" };

/** A full-width band with the design's sec-head (eyebrow, h2, optional intro). */
export function Band({
  id,
  tone,
  eyebrow,
  heading,
  intro,
  center,
  children,
}: {
  id: string;
  tone: Tone;
  eyebrow: string;
  heading: string;
  intro?: ReactNode;
  /** Centred sec-head (the deliverability tools grid). */
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`band${tone === "plain" ? "" : ` ${tone}`}`} id={id}>
      <div className="wrap">
        <Reveal className="sec-head" style={center ? CENTER_HEAD : undefined}>
          <span className="eyebrow" style={center ? { justifyContent: "center" } : undefined}>
            {eyebrow}
          </span>
          <h2>{heading}</h2>
          {intro && <p>{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* -------- why (dark): copy + at-a-glance box -------- */

export function Glance({ paras, items }: { paras: ReactNode[]; items: string[] }) {
  return (
    <Reveal className="cev-glance">
      <div className="gtxt">
        {paras.map((p, i) => (
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

/* -------- 3-column table -------- */

export type TableRow = { a: string; b: string; c: string };

export function TriTable({ head, rows }: { head: [string, string, string]; rows: TableRow[] }) {
  return (
    <Reveal className="cev-tg-tbl">
      <div className="cev-tg-row head">
        {head.map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>
      {rows.map((row) => (
        <div className="cev-tg-row" key={row.a}>
          <div>{row.a}</div>
          <div className="dm">{row.b}</div>
          <div className="bs">{row.c}</div>
        </div>
      ))}
    </Reveal>
  );
}

/* -------- sequence timeline -------- */

export type TimelineStep = { when: string; title: string; text: string };

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <Reveal className="cev-tl" threshold={0.15}>
      {steps.map((step) => (
        <div className="cev-tle" key={step.title}>
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
}

/* -------- problem / fix table -------- */

export type FixRow = { prob: string; fix: string };

export function FixTable({ rows }: { rows: FixRow[] }) {
  return (
    <Reveal className="cev-fix-tbl">
      <div className="cev-fix-row head">
        <div>What goes wrong</div>
        <div>How we handle it</div>
      </div>
      {rows.map((row) => (
        <div className="cev-fix-row" key={row.prob}>
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

/* -------- included list -------- */

export type IconText = { icon: ReactNode; text: string };

export function IncludedGrid({ items }: { items: IconText[] }) {
  return (
    <Reveal className="cev-inc2-grid">
      {items.map((item) => (
        <div className="cev-inc2" key={item.text}>
          <span className="ik">{item.icon}</span>
          <p>{item.text}</p>
        </div>
      ))}
    </Reveal>
  );
}

/* -------- who it's for (2-up) -------- */

export type WhoItem = { icon: ReactNode; lead: string; rest: string };

const WHO_DELAYS = [0, 60, 120, 180];

export function WhoGrid({ items }: { items: WhoItem[] }) {
  return (
    <div className="cev-who-grid">
      {items.map((item, i) => (
        <Reveal className="cev-who" key={item.lead} style={d(WHO_DELAYS[i] ?? 0)}>
          <span className="wi">{item.icon}</span>
          <p>
            <strong>{item.lead}</strong> {item.rest}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- numbered rows with an outcome chip -------- */

export type NumberedRow = { title: string; text: string; out: string };

export function NumberedRows({ rows }: { rows: NumberedRow[] }) {
  return (
    <Reveal className="cev-oc-list">
      {rows.map((row, i) => (
        <article className="cev-oc" key={row.title}>
          <span className="ocn">{i + 1}</span>
          <div className="oct">
            <b>{row.title}</b>
            <p>{row.text}</p>
          </div>
          <span className="oco">{row.out}</span>
        </article>
      ))}
    </Reveal>
  );
}

/* -------- compliance note (verbatim on every page of the family) -------- */

export function ComplianceNote() {
  return (
    <Reveal className="cev-cnote">
      {ICON_WARN}
      <p>
        Cold email rules vary by country. In the U.S., CAN-SPAM requires honest headers and subject lines, a physical address, and a
        clear opt-out. Regions like the EU, UK, and Canada have stricter rules.{" "}
        <b>We build campaigns with these basics in mind, but please confirm requirements with your own legal counsel.</b>
      </p>
    </Reveal>
  );
}
