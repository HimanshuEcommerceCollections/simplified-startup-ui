"use client";

import { useEffect, useRef } from "react";
import "./terms-grid.css";

const TERMS = [
  {
    label: "Initial term",
    title: "Short, then flexible",
    copy: "Growth plans run a 3-month initial term, then month to month. SEO has a 6-month minimum — search compounds, and shorter engagements waste your money.",
  },
  {
    label: "Ownership",
    title: "You own everything",
    copy: "Site, content, accounts, and creative — all in your name. If we part ways, everything stays with you.",
  },
  {
    label: "Media",
    title: "Ad spend is yours",
    copy: "You pay ad platforms directly. We never mark up media or route your budget through our books.",
  },
  {
    label: "Software",
    title: "Tools included",
    copy: "Software and tool costs are absorbed in the price. No pass-through line items.",
  },
  {
    label: "Pricing",
    title: "Locked once planned",
    copy: "Your exact price is fixed in your plan before work starts. Scope changes are re-scoped in writing — never absorbed silently, never surprise-billed.",
  },
  {
    label: "Guarantees",
    title: "Honest guarantees",
    copy: "We guarantee the work — scope, schedule, and a quality checklist, in writing. We never guarantee a market outcome; no honest agency can.",
  },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*<>";

export default function TermsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Magic-card hover: a cursor-tracking spotlight/border, and the mono
  // label "decodes" through random glyphs on pointer enter.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;
    const cleanups: (() => void)[] = [];
    const rafs = new Map<HTMLElement, number>();

    function decode(el: HTMLElement) {
      const orig = el.getAttribute("data-text") ?? el.textContent ?? "";
      el.setAttribute("data-text", orig);
      const prev = rafs.get(el);
      if (prev) cancelAnimationFrame(prev);
      const start = performance.now();
      const dur = 560;
      const frame = (now: number) => {
        const pr = Math.min((now - start) / dur, 1);
        const revealCount = pr * pr * orig.length;
        let out = "";
        for (let i = 0; i < orig.length; i++) {
          const ch = orig[i];
          out += ch === " " || i < revealCount ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (pr < 1) rafs.set(el, requestAnimationFrame(frame));
        else {
          el.textContent = orig;
          rafs.delete(el);
        }
      };
      rafs.set(el, requestAnimationFrame(frame));
    }

    grid.querySelectorAll<HTMLElement>(".term").forEach((cell) => {
      const label = cell.querySelector<HTMLElement>(".t-label");
      if (label) label.setAttribute("data-text", label.textContent ?? "");
      const onMove = (e: PointerEvent) => {
        const r = cell.getBoundingClientRect();
        cell.style.setProperty("--x", e.clientX - r.left + "px");
        cell.style.setProperty("--y", e.clientY - r.top + "px");
      };
      const onEnter = () => {
        if (label) decode(label);
      };
      cell.addEventListener("pointermove", onMove);
      cell.addEventListener("pointerenter", onEnter);
      cleanups.push(() => {
        cell.removeEventListener("pointermove", onMove);
        cell.removeEventListener("pointerenter", onEnter);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      rafs.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  return (
    <section className="band" id="terms" aria-label="Terms">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">— The fine print, unhidden</span>
          <h2>Terms you can read before the call</h2>
        </div>
        <div className="terms-grid" ref={gridRef}>
          {TERMS.map((term) => (
            <div key={term.label} className="term">
              <span className="t-label">{term.label}</span>
              <h3>{term.title}</h3>
              <p>{term.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
