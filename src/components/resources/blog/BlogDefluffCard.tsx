"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Hero signature: the marketing-speak paragraph "de-fluffs" into plain English. */
export default function BlogDefluffCard() {
  const reduce = useReducedMotion();
  const [rawPhases, setPhases] = useState<Set<string>>(new Set());
  const [rawWords, setWords] = useState(31);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const raf = useRef<number | null>(null);

  // reduced motion shows the reconciled end state statically
  const phases = reduce ? new Set(["striking", "reconciled"]) : rawPhases;
  const words = reduce ? 11 : rawWords;

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (raf.current) cancelAnimationFrame(raf.current);
    setPhases(new Set());
    setWords(31);
    const push = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
    push(() => setPhases(new Set(["striking"])), 650);
    push(() => setPhases(new Set(["striking", "sweeping"])), 1300);
    push(() => {
      setPhases(new Set(["striking", "sweeping", "reconciled"]));
      // count 31 -> 11
      const t0 = performance.now();
      const dur = 700;
      function step(now: number) {
        const p = Math.min((now - t0) / dur, 1);
        setWords(Math.round(31 + (11 - 31) * p));
        if (p < 1) raf.current = requestAnimationFrame(step);
      }
      raf.current = requestAnimationFrame(step);
    }, 1560);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kickoff = setTimeout(run, 750);
    const currentTimers = timers.current;
    return () => {
      clearTimeout(kickoff);
      currentTimers.forEach(clearTimeout);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run]);

  const cls = ["bl-defluff", ...phases].join(" ");
  const reconciled = phases.has("reconciled");

  return (
    <div className="bl-df-wrap">
      <div
        className={cls}
        aria-hidden="true"
        onPointerEnter={() => {
          if (!reduce && reconciled) run();
        }}
      >
        <div className="bl-df-head">
          <span className="bl-df-cap">
            <span className="bl-hb old">Marketing-speak</span>
            <span className="bl-hb new">Straight talk</span>
          </span>
          <span className="bl-df-words">
            <b>{words}</b> words
          </span>
        </div>

        <div className="bl-df-body">
          <div className="bl-df-before">
            <p className="bl-df-fluff">
              We <em>leverage</em> a <em>best-in-class</em>, <em>synergistic</em> omnichannel framework to{" "}
              <em>holistically</em> unlock <em>scalable</em>, <em>data-driven</em> growth and{" "}
              <em>move the needle</em> on your <em>KPIs</em> going forward.
            </p>
          </div>
          <div className="bl-df-after">
            <svg className="bl-df-check" viewBox="0 0 24 24">
              <path d="M4 12.5l5 5L20 6" />
            </svg>
            <p>We help you get more customers — and tell you exactly how.</p>
          </div>
        </div>

        <span className="bl-df-sweep" aria-hidden="true"></span>
        <span className="bl-df-seal">Plain English</span>
      </div>
      {!reduce && (
        <span className="bl-df-replay show" title="Replay" onClick={run}>
          ↻ replay
        </span>
      )}
    </div>
  );
}
