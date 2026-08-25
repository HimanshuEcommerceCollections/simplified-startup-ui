import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import "./approach.css";

type ApproachCard = {
  title: string;
  icon: ReactNode;
  bestFor: string;
  tradeOff?: string;
  featured?: boolean;
};

const CARDS: ApproachCard[] = [
  {
    title: "Independent Specialists",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="13" r="6" />
        <path d="M8 34c0-7 5.4-11 12-11s12 4 12 11" />
      </svg>
    ),
    bestFor: "Small, one-time projects",
    tradeOff: "Requires coordination",
  },
  {
    title: "Traditional Agency",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 34V8h18v26" />
        <path d="M8 34h24" />
        <path d="M16 14h1.5M22.5 14h1.5M16 20h1.5M22.5 20h1.5M16 26h1.5M22.5 26h1.5" />
      </svg>
    ),
    bestFor: "Large campaigns",
    tradeOff: "Higher cost and slower processes",
  },
  {
    title: "Internal Team",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="5" />
        <circle cx="26" cy="14" r="5" />
        <path d="M6 32c0-5 3.6-8 8-8 2 0 3.7.6 5 1.7M34 32c0-5-3.6-8-8-8-2 0-3.7.6-5 1.7" />
      </svg>
    ),
    bestFor: "Long-term scaling",
    tradeOff: "Time and hiring investment",
  },
  {
    title: "Simplified Startup",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="4.5" />
        <circle cx="20" cy="7" r="2.5" />
        <circle cx="33" cy="20" r="2.5" />
        <circle cx="20" cy="33" r="2.5" />
        <circle cx="7" cy="20" r="2.5" />
        <path d="M20 11.5v4M20 24.5v4M24.5 20h4M11.5 20h4" />
      </svg>
    ),
    bestFor: "Founders who need strategy, execution, and growth from one trusted partner.",
    featured: true,
  },
];

export default function Approach() {
  return (
    <section className="band approach" id="approach">
      <div className="approach-band">
        <div className="wrap">
          <Reveal className="approach-head">
            <span className="eyebrow on-light">How founders build</span>
            <h2>
              Most founders <span className="grad">coordinate several specialists.</span>
            </h2>
            <p>
              Each route below works well for certain needs. Here&apos;s where each one fits — and
              where a single trusted partner brings it all together.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="wrap">
        <div className="cards3">
          {CARDS.map((card) => (
            <Reveal key={card.title} as="article" className={`c3${card.featured ? " featured" : ""}`}>
              {card.featured && <span className="c3-badge">★ Recommended</span>}
              <span className="ic" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="t">
                {card.title}
                <i className="line"></i>
              </h3>
              <div className="c3-row">
                <span className="c3-k">Best for</span>
                <span className="c3-v">{card.bestFor}</span>
              </div>
              {card.tradeOff && (
                <div className="c3-row">
                  <span className="c3-k">Trade-off</span>
                  <span className="c3-v">{card.tradeOff}</span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
