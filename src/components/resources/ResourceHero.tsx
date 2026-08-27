"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePointerSpot } from "@/lib/usePointerSpot";
import "./resource-hero.css";

type SearchProps = {
  placeholder: string;
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
};

type ResourceHeroProps = {
  /** Visual variant: adjusts h1 scale + padding per design. */
  variant?: "faq" | "blog" | "glossary";
  eyebrow: string;
  /** The two masked headline lines. */
  line1: ReactNode;
  line2: ReactNode;
  ariaTitle: string;
  lead: string;
  search?: SearchProps;
  /** The right-hand signature card. */
  children?: ReactNode;
};

/** Shared hero for the FAQ / Blog / Glossary resource pages. */
export default function ResourceHero({
  variant = "faq",
  eyebrow,
  line1,
  line2,
  ariaTitle,
  lead,
  search,
  children,
}: ResourceHeroProps) {
  const [heroIn, setHeroIn] = useState(false);
  const { sectionRef, spotRef } = usePointerSpot<HTMLElement, HTMLSpanElement>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setHeroIn(true), reduce ? 0 : 100);
    return () => clearTimeout(t);
  }, []);

  const variantClass = variant === "faq" ? "" : ` rh-hero--${variant}`;

  return (
    <section className={`rh-hero${variantClass}${heroIn ? " in" : ""}`} id="top" ref={sectionRef}>
      <div className="rh-hero-bg" aria-hidden="true"></div>
      <span className="rh-cursor" ref={spotRef} aria-hidden="true"></span>
      <div className="wrap">
        <div className="rh-hero-inner">
          <div className="rh-hero-copy">
            <span className="eyebrow rh-tag">{eyebrow}</span>
            <h1 className="rh-h1" aria-label={ariaTitle}>
              <span className="rh-mask">
                <i>{line1}</i>
              </span>
              <span className="rh-mask">
                <i>{line2}</i>
              </span>
            </h1>
            <p className="rh-lead">{lead}</p>
            {search && (
              <div className="rh-search" role="search">
                <svg className="rh-search-ico" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
                <input
                  type="search"
                  autoComplete="off"
                  placeholder={search.placeholder}
                  aria-label={search.ariaLabel}
                  value={search.value}
                  onChange={(e) => search.onChange(e.target.value)}
                />
                <button
                  className="rh-search-clear"
                  aria-label="Clear search"
                  hidden={!search.value}
                  onClick={() => search.onChange("")}
                >
                  ×
                </button>
              </div>
            )}
          </div>
          {children && <div className="rh-hero-card">{children}</div>}
        </div>
      </div>
    </section>
  );
}
