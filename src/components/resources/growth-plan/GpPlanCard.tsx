"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const r = (n: number): CSSProperties => ({ "--r": n } as CSSProperties);

/** Hero signature: the sample growth plan assembling itself, quality bar filling to 14. */
export default function GpPlanCard() {
  const reduce = useReducedMotion();
  const [rawPhase, setPhase] = useState<"idle" | "in" | "done">("idle");
  const [rawCount, setCount] = useState(0);
  const [barFull, setBarFull] = useState(false);
  const raf = useRef<number | null>(null);

  // reduced motion shows the assembled end state statically
  const phase = reduce ? "done" : rawPhase;
  const count = reduce ? 14 : rawCount;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        setPhase("in");
        timers.push(
          setTimeout(() => {
            setBarFull(true);
            const t0 = performance.now();
            const dur = 1050;
            function tick(now: number) {
              const p = Math.min((now - t0) / dur, 1);
              setCount(Math.round(p * 14));
              if (p < 1) raf.current = requestAnimationFrame(tick);
            }
            raf.current = requestAnimationFrame(tick);
            timers.push(setTimeout(() => setPhase("done"), 1150));
          }, 1250)
        );
      }, 700)
    );
    return () => {
      timers.forEach(clearTimeout);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const cls = `gp-plan${phase !== "idle" ? " in" : ""}${phase === "done" ? " done" : ""}`;

  return (
    <div className={cls} aria-hidden="true">
      <div className="gp-plan-head">
        <span className="gp-plan-title">Growth plan</span>
        <span className="gp-plan-tag">1 page</span>
      </div>
      <p className="gp-plan-for">Prepared for your business</p>

      <div className="gp-plan-sec" style={r(0)}>
        <span className="gp-plan-label">Recommended</span>
        <div className="gp-line">
          <span>A website that sells</span>
          <b>$3,900</b>
        </div>
        <div className="gp-line">
          <span>Fill your pipeline</span>
          <b>$1,800/mo</b>
        </div>
      </div>

      <div className="gp-plan-sec" style={r(1)}>
        <span className="gp-plan-label">Sequence</span>
        <div className="gp-seq">
          <span className="gp-step">
            <i>First</i>Website · wk 1–3
          </span>
          <span className="gp-step">
            <i>Next</i>Pipeline · wk 4
          </span>
          <span className="gp-step">
            <i>Later</i>Automate · wk 8
          </span>
        </div>
      </div>

      <div className="gp-plan-sec" style={r(2)}>
        <span className="gp-plan-label">Skip for now</span>
        <div className="gp-line skip">
          <span>Hiring help — revisit at revenue</span>
        </div>
      </div>

      <div className="gp-plan-foot" style={r(3)}>
        <div className="gp-bar">
          <span className="gp-bar-fill" style={{ width: barFull || reduce ? "100%" : 0 }}></span>
        </div>
        <span className="gp-bar-label">
          <b>{count}</b>/14 quality bar
        </span>
      </div>
      <span className="gp-plan-seal">Yours to keep</span>
    </div>
  );
}
