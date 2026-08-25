"use client";

import { useState, type KeyboardEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import "./monthly-jobs.css";

const JOBS = [
  { num: "01", title: "Categorize", back: "Every transaction sorted to the right account — not a guess, a rule you can see." },
  { num: "02", title: "Reconcile", back: "Bank and card accounts matched to the penny, so the books equal reality." },
  { num: "03", title: "Month-end close", back: "A dated close each month. You know exactly when the books are final." },
  { num: "04", title: "Financial statements", back: "P&L, balance sheet, cash flow — in plain English, not accountant-speak." },
  { num: "05", title: "Resolve issues", back: 'Odd transactions flagged and chased down, not buried in "ask my client."' },
  { num: "06", title: "CPA-ready file", back: "Everything organized so tax time is a handoff, not a scramble." },
];

const FlipHint = () => (
  <span className="bk-flip-hint">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 3v4h4" />
    </svg>
    Details
  </span>
);

export default function MonthlyJobs() {
  const [flipped, setFlipped] = useState<boolean[]>(() => JOBS.map(() => false));
  const toggle = (i: number) => setFlipped((f) => f.map((v, k) => (k === i ? !v : v)));

  const onClick = (i: number) => () => {
    // hover flips on desktop; tap toggles on touch
    if (!window.matchMedia("(hover: hover)").matches) toggle(i);
  };
  const onKey = (i: number) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  };

  return (
    <section className="band" aria-label="What's in monthly bookkeeping">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— Plain answer</span>
          <h2>What&apos;s in monthly bookkeeping.</h2>
          <p className="bk-sub">
            Six jobs, every month, on a date you can circle. That&apos;s it — no mystery line items.
          </p>
        </Reveal>
        <div className="bk-jobs">
          {JOBS.map((job, i) => (
            <Reveal
              key={job.num}
              as="article"
              anim="pop"
              index={i}
              className={`bk-job${flipped[i] ? " flipped" : ""}`}
              tabIndex={0}
              role="button"
              aria-label={`${job.title} — flip for details`}
              onClick={onClick(i)}
              onKeyDown={onKey(i)}
            >
              <div className="bk-job-inner">
                <div className="bk-job-face bk-job-front">
                  <span className="bk-num">{job.num}</span>
                  <h3>{job.title}</h3>
                  <FlipHint />
                </div>
                <div className="bk-job-face bk-job-back">
                  <span className="bk-num">{job.num}</span>
                  <p>{job.back}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
