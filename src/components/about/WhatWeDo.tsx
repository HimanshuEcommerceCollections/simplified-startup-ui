import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import "./what-we-do.css";

type EcoCard = { title: string; body: string; icon: ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const CARDS: EcoCard[] = [
  {
    title: "Strategy & Advisory",
    body: "A clear, numbers-first plan for where the business goes next.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3.5V6M12 18v2.5M3.5 12H6M18 12h2.5" />
      </svg>
    ),
  },
  {
    title: "Branding & Identity",
    body: "A look and message that make you the obvious choice.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 18l.9-5.4L4.2 8.7l5.4-.8L12 3z" />
      </svg>
    ),
  },
  {
    title: "Website & Technology",
    body: "A fast, modern site and the tools that run behind it.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <path d="M3.5 9h17" />
        <circle cx="6.4" cy="6.8" r=".6" />
        <circle cx="8.4" cy="6.8" r=".6" />
      </svg>
    ),
  },
  {
    title: "Marketing & Growth",
    body: "The channels that turn strangers into steady customers.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 14V10a1 1 0 0 1 1-1h3l7-4.5v15L8 15H5a1 1 0 0 1-1-1z" />
        <path d="M18 9a3.5 3.5 0 0 1 0 6" />
      </svg>
    ),
  },
  {
    title: "Sales & Lead Gen",
    body: "A pipeline of real conversations with the right buyers.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 17l5-5 3 3 7-7" />
        <path d="M16 8h4v4" />
      </svg>
    ),
  },
  {
    title: "AI & Automation",
    body: "Automate the busywork, with a human on every call that matters.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3.5l1.6 4.3 4.4 1.6-4.4 1.6L12 15.3l-1.6-4.3L6 9.4l4.4-1.6L12 3.5z" />
        <path d="M18.5 15l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" />
      </svg>
    ),
  },
  {
    title: "Talent & Staffing",
    body: "Vetted people to extend your team without a full-time hire.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="8.5" cy="9" r="2.6" />
        <circle cx="16" cy="10" r="2.1" />
        <path d="M4 18.5c0-2.5 2-4.2 4.5-4.2s4.5 1.7 4.5 4.2M14 18.5c0-1.9 1.2-3.4 3-3.6" />
      </svg>
    ),
  },
  {
    title: "Bookkeeping & Finance",
    body: "Clean books and plain-English numbers you can act on.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section className="band" id="what" aria-label="What we do">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">What we do</span>
          <h2 className="ab-h2">All your business needs, covered.</h2>
          <p className="sec-lead">
            From strategy and branding to technology, marketing, and growth, we bring the expertise
            you need to build and move your business forward — as one connected team, not a
            scattered set of vendors.
          </p>
        </Reveal>
        <div className="eco-grid">
          {CARDS.map((card, idx) => (
            <Reveal key={card.title} anim="pop" index={idx} className="eco-card">
              <span className="eco-ic">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="eco-note">One connected ecosystem — take what you need now, add the rest as you grow.</p>
      </div>
    </section>
  );
}
