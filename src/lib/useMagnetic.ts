"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic hover spring + click ripple for primary buttons,
 * ported from the design's premium enhancement layer.
 * Attach the returned ref to an element carrying the `magnetic` class.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf: number | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    function spring() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      btn!.style.transform = `translate(${cx.toFixed(2)}px,${(cy - 2).toFixed(2)}px)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(spring);
      } else {
        raf = null;
      }
    }

    function onMove(e: PointerEvent) {
      const r = btn!.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 14;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 14;
      if (!raf) raf = requestAnimationFrame(spring);
    }

    function onLeave() {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(spring);
    }

    function onDown(e: PointerEvent) {
      const r = btn!.getBoundingClientRect();
      const d = Math.max(r.width, r.height) * 2;
      const rp = document.createElement("span");
      rp.className = "ripple";
      rp.style.width = rp.style.height = `${d}px`;
      rp.style.left = `${e.clientX - r.left}px`;
      rp.style.top = `${e.clientY - r.top}px`;
      btn!.appendChild(rp);
      setTimeout(() => rp.remove(), 600);
    }

    if (reduce) return;
    btn.addEventListener("pointermove", onMove);
    btn.addEventListener("pointerleave", onLeave);
    btn.addEventListener("pointerdown", onDown);
    return () => {
      btn.removeEventListener("pointermove", onMove);
      btn.removeEventListener("pointerleave", onLeave);
      btn.removeEventListener("pointerdown", onDown);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
