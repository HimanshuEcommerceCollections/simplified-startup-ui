"use client";

import { useEffect, useRef } from "react";
import "./scoped-practices.css";

const PRACTICES = [
  {
    title: "Startup Consulting",
    desc: "Research, planning, formation coordination, and launch — banded by depth and stage.",
  },
  {
    title: "AI & Automation",
    desc: "Priced by process scope and integration complexity, with a monthly run option.",
  },
  {
    title: "Sales & Lead Gen",
    desc: "Banded by volume of activity. The volumes we pledge to are named in your plan.",
  },
  {
    title: "Talent & Staffing",
    desc: "Banded by role, seniority, and depth of search, with continuous placement management.",
  },
  {
    title: "Bookkeeping",
    desc: "Banded by volume of accounts and platforms. Catch-up work is scoped separately, in writing.",
  },
  {
    title: "AI Business Consulting",
    desc: "Application-based: a short application plus one call, then accurate pricing in writing before work starts.",
  },
];

export default function ScopedPractices() {
  const flowRef = useRef<HTMLSpanElement>(null);

  // The rule's flow line lights up left to right on an ambient loop.
  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const parts = Array.from(flow.children);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      parts.forEach((el) => el.classList.add("lit"));
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      parts.forEach((el) => el.classList.remove("lit"));
      for (let j = 0; j <= i; j++) parts[j]?.classList.add("lit");
      i = (i + 1) % (parts.length + 2);
    }, 620);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="band" id="scoped" aria-label="Scoped practices">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">— Six practices, one pricing model</span>
          <h2>Scoped practices</h2>
        </div>
        <p className="scoped-lead">
          These engagements vary too much by situation for a single published amount to be honest —
          so we publish the model instead. Your free growth plan scopes the work and sets the exact
          price in writing before anything begins, and it doesn&apos;t shift after that.
        </p>

        <div className="scoped-grid">
          {PRACTICES.map((p) => (
            <div key={p.title} className="scoped-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="scoped-rule">
          <span className="rl-label">The rule, all around</span>
          <span className="rl-flow" ref={flowRef}>
            <span className="step">Scope in writing</span>
            <span className="arw" aria-hidden="true">
              →
            </span>
            <span className="step">exact price fixed</span>
            <span className="arw" aria-hidden="true">
              →
            </span>
            <span className="step">work begins</span>
          </span>
          <span className="rl-note">All prices automatically include bundling discounts (10% / 15%).</span>
        </div>
      </div>
    </section>
  );
}
