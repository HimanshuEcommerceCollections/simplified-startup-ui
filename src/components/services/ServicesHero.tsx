"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import "./services-hero.css";

const NODES = [
  { id: "growth", pulse: "d1", cx: 300, cy: 120, r: 15, halo: 26, dot: "#14b8a6", dotR: 5, plate: { x: 200, y: 60, w: 132, h: 42 }, label: { x: 214, y: 79, text: "GROWTH" }, value: { x: 214, y: 95, text: "+12.4%", teal: true } },
  { id: "revenue", pulse: "d2", cx: 616, cy: 176, r: 16, halo: 28, dot: "#2563eb", dotR: 5.5, plate: { x: 590, y: 106, w: 150, h: 44 }, label: { x: 606, y: 126, text: "REVENUE" }, value: { x: 606, y: 143, text: "$48.2k", teal: false } },
  { id: "customers", pulse: "d3", cx: 676, cy: 392, r: 14, halo: 24, dot: "#14b8a6", dotR: 5, plate: { x: 574, y: 404, w: 166, h: 44 }, label: { x: 590, y: 424, text: "CUSTOMERS" }, value: { x: 590, y: 441, text: "3,180", teal: false } },
  { id: "decisions", pulse: "d4", cx: 552, cy: 606, r: 15, halo: 26, dot: "#2563eb", dotR: 5, plate: { x: 546, y: 616, w: 176, h: 44 }, label: { x: 562, y: 636, text: "DECISIONS" }, value: { x: 562, y: 653, text: "3 ready", teal: true } },
  { id: "tasks", pulse: "d5", cx: 206, cy: 600, r: 14, halo: 24, dot: "#14b8a6", dotR: 5, plate: { x: 70, y: 616, w: 150, h: 44 }, label: { x: 84, y: 636, text: "TASKS" }, value: { x: 84, y: 653, text: "3 due", teal: false } },
  { id: "runway", pulse: "d1", cx: 90, cy: 300, r: 15, halo: 26, dot: "#2563eb", dotR: 5, plate: { x: 16, y: 238, w: 140, h: 44 }, label: { x: 30, y: 258, text: "RUNWAY" }, value: { x: 30, y: 275, text: "19 mo", teal: false } },
];

export default function ServicesHero() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const revenueRef = useRef<SVGTextElement>(null);
  const growthRef = useRef<SVGTextElement>(null);
  const customersRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Live-ticking metric values on the signal graph.
  useEffect(() => {
    if (reduce) return;
    let revenue = 48.2;
    let growth = 12.4;
    let customers = 3180;
    const timer = setInterval(() => {
      revenue += Math.random() * 0.14 - 0.03;
      growth += Math.random() * 0.16 - 0.07;
      customers += Math.round(Math.random() * 4 - 1);
      if (revenueRef.current) revenueRef.current.textContent = `$${revenue.toFixed(1)}k`;
      if (growthRef.current) growthRef.current.textContent = `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`;
      if (customersRef.current) customersRef.current.textContent = customers.toLocaleString();
    }, 2600);
    return () => clearInterval(timer);
  }, [reduce]);

  const heroEl = (base: string, i: number) => ({
    className: `${base} hero-el${loaded ? " in" : ""}`.trim(),
    style: { "--i": i } as React.CSSProperties,
  });

  const valueRef = (id: string) =>
    id === "revenue" ? revenueRef : id === "growth" ? growthRef : id === "customers" ? customersRef : undefined;

  return (
    <section className="band svc-hero" id="svc-hero" aria-label="Our services">
      <span className="ph-blob ph-b1" aria-hidden="true"></span>
      <span className="ph-blob ph-b2" aria-hidden="true"></span>
      <div className="wrap svc-hero-grid">
        <div className="svc-hero-copy">
          <span {...heroEl("eyebrow", 0)}>One partner. Every service.</span>
          <h1 {...heroEl("svc-h1", 1)}>
            Everything your business needs — <span className="grad-text">under one roof.</span>
          </h1>
          <p {...heroEl("svc-lead", 2)}>
            Eight services, one senior team, one plan. Instead of hiring, briefing, and babysitting
            six vendors, you get an integrated partner that runs the whole stack — from first idea
            to steady growth.
          </p>
          <div {...heroEl("svc-hero-cta", 3)}>
            <a href="#book" className="btn btn-primary">
              Book a strategy call <span className="arw" aria-hidden="true">→</span>
            </a>
            <a href="#bundling" className="btn btn-ghost">
              See how bundling works
            </a>
          </div>
        </div>
        <div {...heroEl("svc-hero-vis", 4)}>
          <div className="bs-netwrap">
            <svg
              className="bs-net"
              viewBox="0 0 760 700"
              role="img"
              aria-label="An abstract network connecting revenue, growth, runway, customers, tasks and decisions into one living system."
            >
              <defs>
                <radialGradient id="bsCoreGrad" cx="38%" cy="34%" r="72%">
                  <stop offset="0%" stopColor="#eafffb" />
                  <stop offset="30%" stopColor="#5fe0d2" />
                  <stop offset="70%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </radialGradient>
                <radialGradient id="bsCoreHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(20,184,166,.5)" />
                  <stop offset="45%" stopColor="rgba(37,99,235,.26)" />
                  <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                </radialGradient>
                <radialGradient id="bsGlass" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="rgba(255,255,255,.98)" />
                  <stop offset="55%" stopColor="rgba(238,244,255,.85)" />
                  <stop offset="100%" stopColor="rgba(214,227,247,.55)" />
                </radialGradient>
                <linearGradient id="bsEdge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
                <filter id="bsSoft" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id="bsShadow" x="-80%" y="-80%" width="260%" height="260%">
                  <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1e3a8a" floodOpacity="0.22" />
                </filter>
              </defs>

              <g>
                <path id="bs-e-growth" className="bs-edge" d="M378,352 Q322,246 300,120" />
                <path id="bs-e-revenue" className="bs-edge" d="M378,352 Q520,232 616,176" />
                <path id="bs-e-customers" className="bs-edge" d="M378,352 Q548,348 676,392" />
                <path id="bs-e-decisions" className="bs-edge" d="M378,352 Q494,502 552,606" />
                <path id="bs-e-tasks" className="bs-edge" d="M378,352 Q262,502 206,600" />
                <path id="bs-e-runway" className="bs-edge" d="M378,352 Q222,320 90,300" />
                <path className="bs-edge bs-faint" d="M300,120 Q470,120 616,176" />
                <path className="bs-edge bs-faint" d="M616,176 Q690,300 676,392" />
                <path className="bs-edge bs-faint" d="M676,392 Q640,530 552,606" />
                <path className="bs-edge bs-faint" d="M552,606 Q380,660 206,600" />
                <path className="bs-edge bs-faint" d="M206,600 Q110,470 90,300" />
                <path className="bs-edge bs-faint" d="M90,300 Q170,180 300,120" />
                <path className="bs-edge bs-faint" d="M378,352 L470,250" />
                <path className="bs-edge bs-faint" d="M378,352 L268,262" />
                <path className="bs-edge bs-faint" d="M378,352 L300,470" />
                <path className="bs-edge bs-faint" d="M378,352 L486,452" />
              </g>

              <g aria-hidden="true">
                <circle className="bs-particle" r="3">
                  <animateMotion dur="3.4s" repeatCount="indefinite"><mpath href="#bs-e-revenue" /></animateMotion>
                </circle>
                <circle className="bs-particle bs-b" r="2.4">
                  <animateMotion dur="4.2s" begin="1.1s" repeatCount="indefinite"><mpath href="#bs-e-growth" /></animateMotion>
                </circle>
                <circle className="bs-particle" r="2.6">
                  <animateMotion dur="3.8s" begin=".5s" repeatCount="indefinite"><mpath href="#bs-e-customers" /></animateMotion>
                </circle>
                <circle className="bs-particle bs-b" r="3">
                  <animateMotion dur="4.6s" begin=".2s" repeatCount="indefinite"><mpath href="#bs-e-decisions" /></animateMotion>
                </circle>
                <circle className="bs-particle" r="2.4">
                  <animateMotion dur="4s" begin="1.6s" repeatCount="indefinite"><mpath href="#bs-e-tasks" /></animateMotion>
                </circle>
                <circle className="bs-particle bs-b" r="2.6">
                  <animateMotion dur="3.6s" begin=".8s" repeatCount="indefinite"><mpath href="#bs-e-runway" /></animateMotion>
                </circle>
                <circle className="bs-particle bs-b" r="2.2">
                  <animateMotion dur="4.8s" begin="1.9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                    <mpath href="#bs-e-revenue" />
                  </animateMotion>
                </circle>
                <circle className="bs-particle" r="2.2">
                  <animateMotion dur="5s" begin="2.4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                    <mpath href="#bs-e-customers" />
                  </animateMotion>
                </circle>
                <circle className="bs-particle bs-b" r="2.2">
                  <animateMotion dur="5.4s" begin="1.2s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                    <mpath href="#bs-e-tasks" />
                  </animateMotion>
                </circle>
              </g>

              <circle className="bs-corehalo" cx="378" cy="352" r="150" fill="url(#bsCoreHalo)" />
              <g id="bsCore">
                <circle cx="378" cy="352" r="62" fill="url(#bsCoreGrad)" filter="url(#bsShadow)" />
                <circle cx="378" cy="352" r="62" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
                <ellipse cx="360" cy="330" rx="26" ry="16" fill="rgba(255,255,255,.55)" filter="url(#bsSoft)" />
                <circle cx="378" cy="352" r="86" fill="none" stroke="rgba(37,99,235,.22)" strokeWidth="1" strokeDasharray="2 7" />
                <text className="bs-coreword" x="378" y="356" textAnchor="middle">CORE</text>
              </g>

              {NODES.map((n) => (
                <g key={n.id}>
                  <circle className={`bs-pulse ${n.pulse}`} cx={n.cx} cy={n.cy} r={n.halo} fill="url(#bsCoreHalo)" opacity=".7" />
                  <circle cx={n.cx} cy={n.cy} r={n.r} fill="url(#bsGlass)" stroke="rgba(37,99,235,.35)" strokeWidth="1.4" filter="url(#bsShadow)" />
                  <circle cx={n.cx} cy={n.cy} r={n.dotR} fill={n.dot} />
                  <rect className="bs-plate" x={n.plate.x} y={n.plate.y} width={n.plate.w} height={n.plate.h} rx="12" />
                  <text className="bs-nlabel" x={n.label.x} y={n.label.y}>{n.label.text}</text>
                  <text
                    ref={valueRef(n.id)}
                    className={`bs-nval${n.value.teal ? " bs-tl" : ""}`}
                    x={n.value.x}
                    y={n.value.y}
                  >
                    {n.value.text}
                  </text>
                </g>
              ))}

              <circle className="bs-pulse d3" cx="470" cy="250" r="4.5" fill="#5b9bff" opacity=".85" />
              <circle className="bs-pulse d5" cx="268" cy="262" r="4" fill="#14b8a6" opacity=".8" />
              <circle className="bs-pulse d2" cx="300" cy="470" r="4" fill="#5b9bff" opacity=".8" />
              <circle className="bs-pulse d4" cx="486" cy="452" r="4.5" fill="#14b8a6" opacity=".85" />
            </svg>
            <div className="bs-cap">
              <span className="bs-pip" aria-hidden="true"></span>Live signal graph · one team, one outcome
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
