"use client";

import { useEffect, useState, type CSSProperties } from "react";
import "./about-hero.css";

function delayStyle(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

export default function AboutHero() {
  const [loaded, setLoaded] = useState(false);
  const [bpIn, setBpIn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setLoaded(true), reduce ? 0 : 60);
    const t2 = setTimeout(() => setBpIn(true), reduce ? 0 : 220);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const loadClass = `hero-load${loaded ? " in" : ""}`;

  return (
    <section className="ab-hero" aria-label="Built for founders">
      <div className="wrap ab-hero-inner">
        <div className="ab-hero-copy">
          <span className={`eyebrow ${loadClass}`} style={delayStyle(0)}>
            Built for founders &amp; small-business owners
          </span>
          <h1 className={`ab-hero-h1 ${loadClass}`} style={delayStyle(1)}>
            Whatever you&apos;re building, we build the <span className="grad-text">missing pieces.</span>
          </h1>
          <p className={`ab-hero-lead ${loadClass}`} style={delayStyle(2)}>
            You bring the business. We bring the strategy, brand, technology, and marketing you
            don&apos;t have in-house — so the whole thing actually works.
          </p>
          <div className={`ab-hero-cta ${loadClass}`} style={delayStyle(3)}>
            <a href="#book" className="btn btn-primary">
              Book a strategy call <span aria-hidden="true">→</span>
            </a>
            <a href="#what" className="btn btn-ghost">
              See what we do
            </a>
          </div>
          <div className={`ab-hero-flow ${loadClass}`} style={delayStyle(4)} aria-hidden="true">
            <span>Build</span>
            <i>→</i>
            <span>Launch</span>
            <i>→</i>
            <span>Grow</span>
          </div>
        </div>
        <div className={`ab-hero-vis ${loadClass}`} style={delayStyle(5)}>
          <div className={`bp${bpIn ? " in" : ""}`} aria-hidden="true">
            <svg className="bp-svg" viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bpg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2563eb" />
                  <stop offset="1" stopColor="#14b8a6" />
                </linearGradient>
                <pattern id="bpgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" stroke="#2563eb" strokeWidth="0.5" opacity="0.09" />
                </pattern>
              </defs>
              <rect className="bp-gridrect" x="0" y="0" width="460" height="460" fill="url(#bpgrid)" />
              <g className="bp-dim">
                <line className="bp-draw" x1="44" y1="432" x2="416" y2="432" pathLength="1" style={{ "--d": ".2s" } as CSSProperties} />
                <line className="bp-draw" x1="44" y1="426" x2="44" y2="438" pathLength="1" style={{ "--d": ".25s" } as CSSProperties} />
                <line className="bp-draw" x1="416" y1="426" x2="416" y2="438" pathLength="1" style={{ "--d": ".3s" } as CSSProperties} />
              </g>
              <g className="bp-crop">
                <path className="bp-draw" d="M16 30V16H30" pathLength="1" style={{ "--d": ".1s" } as CSSProperties} />
                <path className="bp-draw" d="M444 30V16H430" pathLength="1" style={{ "--d": ".14s" } as CSSProperties} />
                <path className="bp-draw" d="M16 430V444H30" pathLength="1" style={{ "--d": ".18s" } as CSSProperties} />
                <path className="bp-draw" d="M444 430V444H430" pathLength="1" style={{ "--d": ".22s" } as CSSProperties} />
              </g>
              <text className="bp-title" x="44" y="44">
                BUSINESS BUILD PLAN
              </text>
              <text className="bp-scale" x="416" y="44">
                SCALE 1:1
              </text>
              <text className="bp-dimlabel" x="230" y="448">
                — YOUR BUSINESS, ASSEMBLED —
              </text>
              <line className="bp-line" x1="230" y1="230" x2="230" y2="92" pathLength="1" style={{ "--d": "0.40s" } as CSSProperties} />
              <line className="bp-line" x1="230" y1="230" x2="92" y2="142" pathLength="1" style={{ "--d": "0.46s" } as CSSProperties} />
              <line className="bp-line" x1="230" y1="230" x2="368" y2="142" pathLength="1" style={{ "--d": "0.52s" } as CSSProperties} />
              <line className="bp-line" x1="230" y1="230" x2="92" y2="322" pathLength="1" style={{ "--d": "0.58s" } as CSSProperties} />
              <line className="bp-line" x1="230" y1="230" x2="368" y2="322" pathLength="1" style={{ "--d": "0.64s" } as CSSProperties} />
              <line className="bp-line" x1="230" y1="230" x2="230" y2="372" pathLength="1" style={{ "--d": "0.70s" } as CSSProperties} />
              <rect className="bp-box" x="182" y="70" width="96" height="44" rx="10" pathLength="1" style={{ "--d": "0.55s" } as CSSProperties} />
              <rect className="bp-box" x="44" y="120" width="96" height="44" rx="10" pathLength="1" style={{ "--d": "0.62s" } as CSSProperties} />
              <rect className="bp-box" x="320" y="120" width="96" height="44" rx="10" pathLength="1" style={{ "--d": "0.69s" } as CSSProperties} />
              <rect className="bp-box" x="44" y="300" width="96" height="44" rx="10" pathLength="1" style={{ "--d": "0.76s" } as CSSProperties} />
              <rect className="bp-box" x="320" y="300" width="96" height="44" rx="10" pathLength="1" style={{ "--d": "0.83s" } as CSSProperties} />
              <rect className="bp-box" x="182" y="350" width="96" height="44" rx="10" pathLength="1" style={{ "--d": "0.90s" } as CSSProperties} />
              <rect className="bp-fill" x="320" y="120" width="96" height="44" rx="10" style={{ "--d": "1.53s" } as CSSProperties} />
              <rect className="bp-fill" x="320" y="300" width="96" height="44" rx="10" style={{ "--d": "1.81s" } as CSSProperties} />
              <rect className="bp-fill" x="182" y="350" width="96" height="44" rx="10" style={{ "--d": "1.95s" } as CSSProperties} />
              <rect className="bp-hubfill" x="180" y="185" width="100" height="90" rx="16" />
              <rect className="bp-box bp-hub" x="180" y="185" width="100" height="90" rx="16" pathLength="1" style={{ "--d": "1.05s" } as CSSProperties} />
              <text className="bp-label draft" x="230" y="95.5">STRATEGY</text>
              <text className="bp-label draft" x="92" y="145.5">BRAND</text>
              <text className="bp-label built" x="368" y="145.5">WEBSITE</text>
              <text className="bp-label draft" x="92" y="325.5">SALES</text>
              <text className="bp-label built" x="368" y="325.5">MARKETING</text>
              <text className="bp-label built" x="230" y="375.5">FINANCE</text>
            </svg>
            <div className="bp-core">
              <span className="bp-core-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/logo-small.webp" alt="" />
              </span>
              <span className="bp-core-label">Your business</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
