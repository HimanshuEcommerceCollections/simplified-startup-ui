"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SignatureCard } from "../../ServiceDetailKit";
import type { HeroCardData } from "./types";

/**
 * Hero "breakdown" card: a gross row (optional), then deduction rows or recognition
 * bars, then the net row. The design adds `.run` 900ms after load, which staggers the rows in.
 */
export default function HeroCard({ card }: { card: HeroCardData }) {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // reduced motion: the card is shown in its end state on first paint (bki-page.css pins it)
  const run = reduce || started;

  return (
    <SignatureCard
      ariaLabel={card.ariaLabel}
      className={`bki-card${run ? " run" : ""}`}
      live={card.live}
      corner={card.corner}
      footLeft={card.footLeft}
      footRight={card.footRight}
    >
      {card.gross && (
        <div className="bki-gross">
          <span className="gl">{card.gross.label}</span>
          <span className="gv">{card.gross.value}</span>
        </div>
      )}
      {card.rows && (
        <div className={`bki-split${card.gross ? "" : " first"}`}>
          {card.rows.map((row, i) => (
            <div className={`bki-pos tone-${row.tone ?? "amber"}`} key={i}>
              <span className="psi">{row.icon}</span>
              <span className="psn">{row.name}</span>
              <span className="psv">{row.value}</span>
            </div>
          ))}
        </div>
      )}
      {card.bars && (
        <div className="bki-bars">
          {card.bars.map((bar) => (
            <div className="bki-pob" key={bar.label}>
              <span className="pobm">{bar.label}</span>
              <span className="pobar">
                <i style={{ "--w": bar.width } as CSSProperties}></i>
              </span>
              <span className="pobv">{bar.value}</span>
            </div>
          ))}
        </div>
      )}
      <div className="bki-net">
        <span className="nl">{card.net.label}</span>
        <span className="nv">{card.net.value}</span>
      </div>
    </SignatureCard>
  );
}
