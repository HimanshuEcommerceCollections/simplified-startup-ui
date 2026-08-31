"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import "./cta-card.css";

type CtaAction = { label: string; href: string; arrow?: string };

type CtaCardProps = {
  eyebrow: string;
  heading: string;
  /** Rich copy — pass a fragment so <strong> emphasis from the designs survives. */
  children: ReactNode;
  solid: CtaAction;
  line: CtaAction;
  id?: string;
  /** Render the wrapping band with the tinted background. */
  tint?: boolean;
};

/** The rounded gradient closing-CTA card used by the resource pages. */
export default function CtaCard({ eyebrow, heading, children, solid, line, id = "cta", tint }: CtaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealRef, inView] = useInView<HTMLElement>({ threshold: 0.14 });

  // sheen follows the pointer
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    function onMove(e: PointerEvent) {
      const r = card!.getBoundingClientRect();
      card!.style.setProperty("--cx", `${e.clientX - r.left}px`);
      card!.style.setProperty("--cy", `${e.clientY - r.top}px`);
    }
    card.addEventListener("pointermove", onMove);
    return () => card.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className={`band${tint ? " tint" : ""}`} id={id} ref={revealRef}>
      <div className="wrap">
        <div className={`cta-card reveal${inView ? " in" : ""}`} ref={cardRef}>
          <span className="cta-sheen" aria-hidden="true"></span>
          <div className="cta-in">
            <span className="eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
            <p>{children}</p>
            <div className="cta-actions">
              <a className="btn solid" href={solid.href}>
                {solid.label} {solid.arrow && <span className="arw">{solid.arrow}</span>}
              </a>
              <a className="btn line" href={line.href}>
                {line.label} {line.arrow && <span className="arw">{line.arrow}</span>}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
