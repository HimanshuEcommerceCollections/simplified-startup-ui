"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-follow cursor glow used by the resource-page heroes:
 * moves the spot element to the pointer position inside the section.
 * No-ops for coarse pointers and reduced motion, matching the designs.
 */
export function usePointerSpot<S extends HTMLElement, T extends HTMLElement>() {
  const sectionRef = useRef<S>(null);
  const spotRef = useRef<T>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    function onMove(e: PointerEvent) {
      const r = section!.getBoundingClientRect();
      spot!.style.left = `${e.clientX - r.left}px`;
      spot!.style.top = `${e.clientY - r.top}px`;
    }
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  return { sectionRef, spotRef };
}
