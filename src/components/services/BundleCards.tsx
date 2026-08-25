"use client";

import { useState, type KeyboardEvent, type MouseEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import "./bundle-cards.css";

const BUNDLES = [
  {
    tag: "Single service",
    feature: false,
    best: "one clear gap — you need a site, or SEO, or the books cleaned up.",
    get: "that service, fully scoped and owned, with published pricing.",
    backLabel: "One service",
    backTitle: "Start with one.",
    backList: ["Fully scoped & owned by you", "Transparent, published price", "No bundle or lock-in required"],
    cta: { label: "See services", href: "#services" },
  },
  {
    tag: "Growth bundle",
    feature: true,
    best: "most startups — usually web + marketing, or marketing + sales.",
    get: "coordinated channels, one plan, one report, and a bundle discount.",
    backLabel: "Most popular",
    backTitle: "Compound the wins.",
    backList: ["Two or three services, one plan", "One report, one owner", "Bundle discount applied"],
    cta: { label: "Book a strategy call", href: "#book" },
  },
  {
    tag: "Full stack",
    feature: false,
    best: "founders who'd rather run the company than run vendors.",
    get: "the whole team — strategy through execution — as one engagement, at the best per-service rate.",
    backLabel: "Whole team",
    backTitle: "Run the company, not vendors.",
    backList: ["Strategy through execution", "One team, one engagement", "Best per-service rate"],
    cta: { label: "Book a strategy call", href: "#book" },
  },
];

const FlipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default function BundleCards() {
  const [flipped, setFlipped] = useState<boolean[]>(() => BUNDLES.map(() => false));

  const toggle = (i: number) => setFlipped((f) => f.map((v, k) => (k === i ? !v : v)));

  const onCardClick = (i: number) => (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    toggle(i);
  };
  const onCardKey = (i: number) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  };

  return (
    <section className="band light" id="bundling" aria-label="How bundling works">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— Pricing that rewards scope</span>
          <h2 className="bn-title">Bundle the services, not the invoices.</h2>
          <p className="bn-lead">
            The more of the stack you run with us, the more the pieces compound — and the better
            the per-service price. Three ways founders start.
          </p>
        </Reveal>
        <div className="bn-grid">
          {BUNDLES.map((b, i) => (
            <Reveal
              key={b.tag}
              as="article"
              anim="bn"
              index={i}
              className={`bn-card${b.feature ? " is-feature" : ""}${flipped[i] ? " flipped" : ""}`}
              tabIndex={0}
              role="button"
              aria-label={`${b.tag} — flip for details`}
              aria-pressed={flipped[i]}
              onClick={onCardClick(i)}
              onKeyDown={onCardKey(i)}
            >
              <div className="bn-inner">
                <div className="bn-face bn-front">
                  <span className="bn-flip-hint" aria-hidden="true">
                    <FlipIcon />
                    Flip
                  </span>
                  <span className="bn-tag">{b.tag}</span>
                  <p className="bn-best">
                    <strong>Best for</strong> {b.best}
                  </p>
                  <p className="bn-get">
                    <strong>You get</strong> {b.get}
                  </p>
                </div>
                <div className="bn-face bn-back">
                  <span className="bn-back-label">{b.backLabel}</span>
                  <h3 className="bn-back-h">{b.backTitle}</h3>
                  <ul className="bn-back-list">
                    {b.backList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a href={b.cta.href} className="bn-cta">
                    {b.cta.label} <span className="arw" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
