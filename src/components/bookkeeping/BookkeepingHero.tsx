"use client";

import { useEffect, useState, type CSSProperties } from "react";
import "./bookkeeping-hero.css";

const Tick = () => (
  <svg width="12" height="12" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.6">
    <path d="M4 11.5l4.4 4.4L18 6" />
  </svg>
);

// Calendar days: value + dim/circle flags, in display order.
const DAYS: { n: number; dim?: boolean; circle?: boolean }[] = [
  { n: 28, dim: true }, { n: 29, dim: true }, { n: 30, dim: true }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 },
  { n: 5 }, { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 },
  { n: 12 }, { n: 13 }, { n: 14 }, { n: 15 }, { n: 16 }, { n: 17 }, { n: 18 },
  { n: 19 }, { n: 20 }, { n: 21, circle: true }, { n: 22 }, { n: 23 }, { n: 24 }, { n: 25 },
];

// Diagonal wave: row + column offset per cell.
const cellDelay = (i: number): CSSProperties => {
  const row = Math.floor(i / 7);
  const col = i % 7;
  return { "--d": (0.3 + row * 0.06 + col * 0.035).toFixed(3) + "s" } as CSSProperties;
};

export default function BookkeepingHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const heroEl = (base: string, i: number) => ({
    className: `${base} hero-el${loaded ? " in" : ""}`.trim(),
    style: { "--i": i } as CSSProperties,
  });

  return (
    <section className="band bk-hero" aria-label="Bookkeeping">
      <div className="wrap bk-hero-grid">
        <div className="bk-hero-copy">
          <span {...heroEl("eyebrow bk-file", 0)}>SS-WEB-10 · Practice file · Bookkeeping</span>
          <h1 {...heroEl("", 1)}>
            Books, <span className="grad-text">handled.</span>
          </h1>
          <p {...heroEl("bk-lead", 2)}>
            Small business bookkeeping services with a close date you can circle. Transactions
            categorized, accounts reconciled, reports in plain English — CPA-ready when tax season
            comes. Priced up front, so you always know the number.
          </p>
          <div {...heroEl("bk-hero-cta", 3)}>
            <a href="#book" className="btn btn-primary">
              Get your free growth plan <span className="arw" aria-hidden="true">→</span>
            </a>
            <a href="#cost" className="btn btn-ghost">
              See what it costs
            </a>
          </div>
        </div>
        <div {...heroEl("bk-vis", 4)}>
          <span className="bk-chip c1">
            <span className="tick">
              <Tick />
            </span>
            Reconciled to the penny
          </span>
          <div className="bk-cal">
            <div className="bk-cal-top">
              <b>Monthly close</b>
              <span>This month</span>
            </div>
            <div className="bk-grid7">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <i key={`${d}-${i}`}>{d}</i>
              ))}
              {DAYS.map((day, i) => (
                <u
                  key={i}
                  className={day.dim ? "dim" : day.circle ? "circle" : undefined}
                  style={cellDelay(i)}
                >
                  {day.n}
                  {day.circle && (
                    <svg className="bk-ring" viewBox="0 0 48 48" aria-hidden="true">
                      <circle cx="24" cy="24" r="21" />
                    </svg>
                  )}
                </u>
              ))}
            </div>
            <div className="bk-cal-foot">
              <span className="dot" aria-hidden="true"></span>Close date, met — every month.
            </div>
          </div>
          <span className="bk-chip c2">
            <span className="tick">
              <Tick />
            </span>
            CPA-ready
          </span>
        </div>
      </div>
    </section>
  );
}
