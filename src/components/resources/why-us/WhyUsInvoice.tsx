"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const CHECK = (
  <svg className="wu-check sm" viewBox="0 0 24 24">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

/** Hero signature: the agency invoice that reconciles itself into the honest version. */
export default function WhyUsInvoice() {
  const reduce = useReducedMotion();
  const [rawPhases, setPhases] = useState<Set<string>>(new Set());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // reduced motion shows the reconciled end state statically
  const phases = reduce ? new Set(["built", "reconciled"]) : rawPhases;

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhases(new Set());
    const push = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
    push(() => setPhases(new Set(["built"])), 40); // line items type in
    push(() => setPhases(new Set(["built", "stamped"])), 760); // OVERCHARGED slam
    push(() => setPhases(new Set(["built", "stamped", "sweeping"])), 1420); // reconcile sweep
    push(() => setPhases(new Set(["built", "stamped", "sweeping", "reconciled"])), 1680);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kickoff = setTimeout(run, 700);
    const currentTimers = timers.current;
    return () => {
      clearTimeout(kickoff);
      currentTimers.forEach(clearTimeout);
    };
  }, [run]);

  const reconciled = phases.has("reconciled");
  const cls = ["wu-invoice", ...phases].join(" ");

  return (
    <div
      className={cls}
      aria-hidden="true"
      onPointerEnter={() => {
        if (!reduce && reconciled) run();
      }}
    >
      <div className="wu-inv-card">
        <div className="wu-inv-head">
          <span className="wu-inv-brand">
            <span className="wu-hb old">Agency invoice</span>
            <span className="wu-hb new">Simplified · published price</span>
          </span>
          <span className="wu-inv-no">
            <span className="wu-hb old">#0042</span>
            <span className="wu-hb new ok">public</span>
          </span>
        </div>

        <div className="wu-inv-body">
          <div className="wu-old">
            <div className="wu-il" style={{ "--k": 0 } as React.CSSProperties}>
              <span>Strategy slide deck</span>
              <b>$4,000</b>
            </div>
            <div className="wu-il" style={{ "--k": 1 } as React.CSSProperties}>
              <span>“Discovery” call</span>
              <b>$2,500</b>
            </div>
            <div className="wu-il" style={{ "--k": 2 } as React.CSSProperties}>
              <span>Loom walkthrough</span>
              <b>$2,500</b>
            </div>
            <div className="wu-il total" style={{ "--k": 3 } as React.CSSProperties}>
              <span>Total due on receipt</span>
              <b>$9,000</b>
            </div>
            <span className="wu-inv-stamp red">Overcharged</span>
          </div>
          <div className="wu-new">
            <div className="wu-nl">
              {CHECK}
              <span>Every price &amp; scope, on the site</span>
            </div>
            <div className="wu-nl">
              {CHECK}
              <span>
                Shown <b>before</b> you talk to anyone
              </span>
            </div>
            <div className="wu-nl">
              {CHECK}
              <span>Yours to keep · zero exit fee</span>
            </div>
          </div>
          <span className="wu-seal">Verifiable</span>
        </div>

        <span className="wu-sweep" aria-hidden="true"></span>
      </div>
      {!reduce && (
        <span className="wu-replay" title="Replay" onClick={run}>
          ↻ replay
        </span>
      )}
    </div>
  );
}
