"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import "./how-we-help.css";

const STAGES = [
  {
    label: "Strategy",
    intro: "We map the plan — what to build, in what order, and the one result we're aiming at.",
    items: [
      "A working session to understand the business",
      "A written plan with the order of work",
      "One result we agree to measure against",
    ],
  },
  {
    label: "Build",
    intro: "Senior specialists make it real — brand, site, systems, and content, built to a standard.",
    items: [
      "Brand and site handled by senior specialists",
      "Systems and content set up properly",
      "Progress you can see as it happens",
    ],
  },
  {
    label: "Launch",
    intro: "We get it live and working — set up, tested, and handed over in your name.",
    items: [
      "Everything tested before it goes live",
      "Accounts and access in your name",
      "A walkthrough so you can run it",
    ],
  },
  {
    label: "Grow",
    intro: "We keep it moving — marketing, iteration, and support on a steady cadence.",
    items: [
      "Marketing on a set cadence",
      "A regular review of what's working",
      "Support when something needs changing",
    ],
  },
];

const N = STAGES.length;
const HALF = 100 / (N * 2);
const SPAN = 100 - HALF * 2;

export default function HowWeHelp() {
  const [cur, setCur] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [rootRef, rootInView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [placed, setPlaced] = useState(false);
  const reduce = useReducedMotion();
  const swapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const ptRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // the path draws itself to stage one when the section arrives
  useEffect(() => {
    if (!rootInView) return;
    const t = setTimeout(() => setPlaced(true), reduce ? 0 : 140);
    return () => clearTimeout(t);
  }, [rootInView, reduce]);

  useEffect(() => () => clearTimeout(swapTimer.current), []);

  function go(i: number, focus = false) {
    const next = Math.max(0, Math.min(N - 1, i));
    if (next !== cur && !reduce) {
      setSwapping(false);
      requestAnimationFrame(() => {
        setSwapping(true);
        clearTimeout(swapTimer.current);
        swapTimer.current = setTimeout(() => setSwapping(false), 800);
      });
    }
    setCur(next);
    if (focus) ptRefs.current[next]?.focus();
  }

  function onRailKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(cur + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(cur - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(N - 1, true);
    }
  }

  const progress = placed ? (SPAN * cur) / (N - 1) : 0;

  return (
    <section className="band light" id="how" aria-label="How we help">
      <div className="wrap">
        <div className="jr-top">
          <Reveal className="sec-head">
            <span className="eyebrow">How we help</span>
            <h2 className="ab-h2">A clear path from idea to growing business.</h2>
            <p className="sec-lead">
              Four stages, the same every time. Tap a stage on the path — or use the arrows — to see
              what happens at each one.
            </p>
          </Reveal>
          <div className="jr-nav">
            <button className="jr-arw" type="button" aria-label="Previous stage" disabled={cur === 0} onClick={() => go(cur - 1)}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="jr-count" aria-hidden="true">
              <b>{String(cur + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}
            </span>
            <button
              className="jr-arw is-next"
              type="button"
              aria-label="Next stage"
              disabled={cur === N - 1}
              onClick={() => go(cur + 1)}
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="jr" ref={rootRef}>
          <div className="jr-stage">
            <div className="jr-rail" role="tablist" aria-label="Stages of the process" onKeyDown={onRailKeyDown}>
              <span className="jr-track" aria-hidden="true"></span>
              <span className="jr-fill" aria-hidden="true" style={{ width: `${progress}%` }}></span>
              <span className="jr-pin" aria-hidden="true" style={{ left: `${HALF + progress}%` }}>
                <svg viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="jrpg" gradientUnits="userSpaceOnUse" x1="3" y1="2" x2="23" y2="22">
                      <stop offset="0" stopColor="#2563eb" />
                      <stop offset="1" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M13 1.6c-5.2 0-9.4 4.1-9.4 9.2 0 6.4 8 15.6 8.4 16 .3.3.7.3 1 0 .4-.4 8.4-9.6 8.4-16 0-5.1-4.2-9.2-8.4-9.2Z"
                    fill="url(#jrpg)"
                  />
                  <circle cx="13" cy="10.6" r="3.5" fill="#fff" />
                </svg>
              </span>
              {STAGES.map((stage, idx) => (
                <button
                  key={stage.label}
                  ref={(el) => {
                    ptRefs.current[idx] = el;
                  }}
                  className={`jr-pt${idx === cur ? " is-on" : ""}${idx < cur ? " is-done" : ""}`}
                  type="button"
                  role="tab"
                  id={`jr-t${idx}`}
                  aria-controls={`jr-p${idx}`}
                  aria-selected={idx === cur}
                  tabIndex={idx === cur ? 0 : -1}
                  onClick={() => go(idx)}
                >
                  <span className="jr-bead">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="jr-label">{stage.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={`jr-card${swapping ? " sw" : ""}`}>
            {STAGES.map((stage, idx) => (
              <div
                key={stage.label}
                className="jr-p"
                id={`jr-p${idx}`}
                role="tabpanel"
                aria-labelledby={`jr-t${idx}`}
                hidden={idx !== cur}
              >
                <span className="jr-eyebrow">Stage {String(idx + 1).padStart(2, "0")}</span>
                <h3>{stage.label}</h3>
                <p>{stage.intro}</p>
                <ul className="jr-list">
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
