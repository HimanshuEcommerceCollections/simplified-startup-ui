"use client";

import { useEffect, useRef, useState } from "react";
import "./pricing-hero.css";

const CHIPS = [
  "Fixed before work starts",
  "Tools & software included",
  "You own everything",
  "Ad spend paid direct, never marked up",
];

export default function PricingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [maskIn, setMaskIn] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMaskIn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cursor light follows the pointer across the hero (fine pointers only).
  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      glow.style.left = e.clientX - r.left + "px";
      glow.style.top = e.clientY - r.top + "px";
    };
    hero.addEventListener("pointermove", onMove);
    return () => hero.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={heroRef} className="pr-hero" aria-label="Pricing">
      <div className="hero-cursor" ref={glowRef} aria-hidden="true"></div>
      <div className="wrap">
        <span className="pr-doc-tag">
          SS-WEB-03 <span className="sep" aria-hidden="true"></span> The price list{" "}
          <span className="sep" aria-hidden="true"></span> Effective 2026
        </span>
        <h1 className={`pr-h1 pr-h1-mask${maskIn ? " in" : ""}`}>
          <span className="mri">
            Every price, <span className="grad-text pr-pub">published.</span>
          </span>
        </h1>
        <p className="pr-lead">
          Digital marketing packages and service pricing for business — published in full. The
          number you see is the number we mean. <strong>Ranges reflect scope</strong>, and
          they&apos;re set together in your plan before work starts — not discovered later.
        </p>
        <div className="pr-trust">
          {CHIPS.map((chip) => (
            <span key={chip} className="pr-chip">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
