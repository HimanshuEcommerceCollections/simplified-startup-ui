"use client";

import { useEffect, useRef } from "react";
import "./pricing-cta.css";

export default function PricingCta() {
  const bandRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Cursor-follow sheen on the band and a click ripple on the button.
  useEffect(() => {
    const band = bandRef.current;
    const btn = btnRef.current;
    if (!band) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    if (fine && !reduce) {
      const onMove = (e: PointerEvent) => {
        const r = band.getBoundingClientRect();
        band.style.setProperty("--cx", e.clientX - r.left + "px");
        band.style.setProperty("--cy", e.clientY - r.top + "px");
      };
      band.addEventListener("pointermove", onMove);
      cleanups.push(() => band.removeEventListener("pointermove", onMove));
    }

    if (btn && !reduce) {
      const onClick = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const rip = document.createElement("span");
        rip.className = "ripple";
        const size = Math.max(r.width, r.height) * 2.4;
        rip.style.width = rip.style.height = size + "px";
        rip.style.left = e.clientX - r.left + "px";
        rip.style.top = e.clientY - r.top + "px";
        btn.appendChild(rip);
        setTimeout(() => rip.remove(), 650);
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="band light" id="book" aria-label="Get your free growth plan">
      <div className="wrap">
        <div className="cta-pricing" ref={bandRef}>
          <div className="wrap-in">
            <span className="eyebrow">— No cost, yours to keep</span>
            <h2>Get your free growth plan</h2>
            <p>
              A working session on your goals, then a written plan with the exact services, costs,
              and sequence we&apos;d recommend — free, and yours whether you engage us or not.
            </p>
            <a href="#" ref={btnRef} className="btn">
              Book your free growth plan{" "}
              <span className="arw" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
