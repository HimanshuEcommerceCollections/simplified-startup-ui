"use client";

import { useEffect, useRef } from "react";

/**
 * Card spotlight + 3D tilt, ported from the resource designs' [data-tilt]
 * handler: tracks the pointer into --mx/--my (percent) and applies a small
 * rotateX/rotateY lift. Attach to elements inside the returned container ref
 * by giving them the `data-tilt` attribute.
 */
export function useTiltCards<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
    const handlers = cards.map((card) => {
      function onMove(e: PointerEvent) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        const rx = (0.5 - py) * 4;
        const ry = (px - 0.5) * 4;
        card.style.transform = `translateY(-5px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      }
      function onLeave() {
        card.style.transform = "";
      }
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return { card, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return rootRef;
}
