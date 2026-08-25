"use client";

import { useEffect, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import "./integrated-team.css";

type Stat = { icon: ReactNode; value: number; suffix: string; label: string };

const STATS: Stat[] = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="5" />
        <circle cx="26" cy="14" r="5" />
        <path d="M6 32c0-5 3.6-8 8-8 2 0 3.7.6 5 1.7M34 32c0-5-3.6-8-8-8-2 0-3.7.6-5 1.7" />
      </svg>
    ),
    value: 50,
    suffix: "+",
    label: "Founders partnered",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 34 13 20 20 6 13 20 6Z" />
        <path d="M6 20l14 7 14-7" />
        <path d="M6 27l14 7 14-7" />
      </svg>
    ),
    value: 6,
    suffix: "",
    label: "Services, one team",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 5l12 4v9c0 7.5-5 13-12 16-7-3-12-8.5-12-16V9l12-4Z" />
        <path d="M14.5 19.5l4 4 7-8" />
      </svg>
    ),
    value: 100,
    suffix: "%",
    label: "Senior-led work",
  },
];

function CountUpNum({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const dur = 1500;
    let raf: number;
    let begin: number | null = null;
    function step(ts: number) {
      if (reduce) {
        setValue(target);
        return;
      }
      if (begin === null) begin = ts;
      const p = Math.min((ts - begin) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, reduce]);

  return (
    <div className="num">
      {value}
      {suffix}
    </div>
  );
}

export default function IntegratedTeam() {
  const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="band opt4" id="option4">
      <div className="wrap opt4-grid">
        <Reveal className="opt4-media">
          <span className="frame" aria-hidden="true"></span>
          <div className="photo">
            <div className="ph4" style={{ backgroundImage: "url(/assets/images/integrated-team.jpg)" }}></div>
          </div>
          <div className="media-badge">
            <span className="mb-rule"></span>
            <span className="mb-t">
              One partner.
              <br />
              Every step.
            </span>
          </div>
        </Reveal>
        <Reveal className="opt4-copy">
          <span className="eyebrow on-light">Option 04 — the one we built</span>
          <h2 className="grad">An integrated team, as one partnership.</h2>
          <p className="lead">Senior operators. Transparent bundles. One point of contact.</p>
          <p className="body4">
            Strategy, brand, web, marketing, and sales — working as a single engagement, not five
            separate vendors. No handoff gaps, no &quot;that&apos;s not our department.&quot;
            Predictable bundle pricing built for startup budgets, so senior work is finally within
            reach this early.
          </p>
          <div className="stats3" ref={statsRef}>
            {STATS.map((stat) => (
              <div className="stat4" key={stat.label}>
                <span className="si" aria-hidden="true">
                  {stat.icon}
                </span>
                <CountUpNum target={stat.value} suffix={stat.suffix} start={statsInView} />
                <div className="lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
