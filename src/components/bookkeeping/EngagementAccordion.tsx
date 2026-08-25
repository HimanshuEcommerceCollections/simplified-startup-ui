"use client";

import { useState, type KeyboardEvent } from "react";
import { useInView } from "@/lib/useInView";
import Reveal from "@/components/ui/Reveal";
import "./engagement-accordion.css";

const Check = () => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M4 11.5l4.4 4.4L18 6" />
  </svg>
);

const PANELS = [
  {
    num: "01",
    title: "Setup & catch-up",
    items: [
      "Chart of accounts built for how your business actually runs.",
      "Historical cleanup scoped honestly — you'll know the size of the mess before we start.",
      "Works with the major platforms: QuickBooks, Xero, or what you already use.",
    ],
  },
  {
    num: "02",
    title: "Monthly close",
    items: [
      "Transactions categorized and accounts reconciled every month.",
      'A written close date you can circle — not "sometime after the 15th."',
      "A reconciliation checklist behind every close, same discipline every month.",
    ],
  },
  {
    num: "03",
    title: "Reports you can read",
    items: [
      "Monthly P&L and cash view with plain-English notes on what changed.",
      "Flags raised when a number moves in a way you should know about.",
      "No jargon walls — if you can't read the report, the report failed.",
    ],
  },
  {
    num: "04",
    title: "Tax-season ready",
    items: [
      "Clean, organized books handed to your CPA — we do the books, they do the tax.",
      "Year-end without archaeology: everything categorized, reconciled, documented.",
      "Your CPA will notice the difference, and so will their invoice.",
    ],
  },
];

export default function EngagementAccordion() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  // hover previews a panel; click/keyboard locks it
  const [locked, setLocked] = useState(0);
  const [active, setActive] = useState(0);
  const hoverCapable = () => window.matchMedia("(hover: hover)").matches;

  const onKey = (i: number) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setLocked(i);
      setActive(i);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const n = (i + 1) % PANELS.length;
      setLocked(n);
      setActive(n);
      (e.currentTarget.parentElement?.children[n] as HTMLElement)?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = (i - 1 + PANELS.length) % PANELS.length;
      setLocked(n);
      setActive(n);
      (e.currentTarget.parentElement?.children[n] as HTMLElement)?.focus();
    }
  };

  return (
    <section className="band light" aria-label="What the engagement includes">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— Named product · fixed scope</span>
          <h2>What the engagement includes — in writing.</h2>
          <p className="bk-sub">
            One named product, one fixed scope, one price fixed in your plan before work starts.
          </p>
        </Reveal>
        <div
          ref={ref}
          className={`na-accordion${inView ? " na-in" : ""}`}
          role="tablist"
          aria-label="What the engagement includes"
          onMouseLeave={() => setActive(locked)}
        >
          {PANELS.map((panel, i) => (
            <div
              key={panel.num}
              className={`na-panel${i === active ? " active" : ""}`}
              role="tab"
              tabIndex={0}
              aria-selected={i === active}
              aria-label={panel.title}
              onClick={() => {
                setLocked(i);
                setActive(i);
              }}
              onPointerEnter={() => {
                if (hoverCapable()) setActive(i);
              }}
              onKeyDown={onKey(i)}
            >
              <span className="na-plus" aria-hidden="true"></span>
              <span className="na-title-v">{panel.title}</span>
              <div className="na-expand">
                <span className="na-num">{panel.num}</span>
                <h3>{panel.title}</h3>
                <ul className="na-list">
                  {panel.items.map((item) => (
                    <li key={item}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="bk-note">
          <p>
            <b>Scope is written down, both directions.</b> Your plan states the accounts, volume,
            and platforms in scope. Catch-up work is scoped and priced separately, in writing,
            before it starts.
          </p>
        </div>
      </div>
    </section>
  );
}
