"use client";

import { useEffect, useRef } from "react";
import "./bundle-discounts.css";

export default function BundleDiscounts() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Discount numbers sit at their final value and re-roll on hover;
  // named-bundle pills get a light magnetic pull.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    let raf = 0;

    function roll(el: HTMLElement, dur: number) {
      const to = parseInt(el.getAttribute("data-to") || "0", 10);
      let t0: number | null = null;
      const tick = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(to * e));
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = String(to);
      };
      raf = requestAnimationFrame(tick);
    }

    grid.querySelectorAll<HTMLElement>(".cu").forEach((el) => {
      if (reduce) return;
      const tile = el.closest(".bnd-tile");
      if (!tile) return;
      const onEnter = () => roll(el, 700);
      tile.addEventListener("pointerenter", onEnter);
      cleanups.push(() => tile.removeEventListener("pointerenter", onEnter));
    });

    if (fine && !reduce) {
      grid.querySelectorAll<HTMLElement>(".bnd-name-pill").forEach((el) => {
        const onMove = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const mx = ev.clientX - (r.left + r.width / 2);
          const my = ev.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${(mx * 0.12).toFixed(1)}px,${(my * 0.2).toFixed(1)}px)`;
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="band light" id="bundles" aria-label="Combining services">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">— Bundles, stated up front</span>
          <h2>Combining services</h2>
          <p>
            Work with us across more than one service and the discount is applied automatically.
            Your plan always shows the math.
          </p>
        </div>

        <div className="bnd-grid" ref={gridRef}>
          <div className="bnd-tile">
            <div className="pct">
              <span className="cu" data-to="10">
                10
              </span>
              % off
            </div>
            <h3>Any two services together</h3>
            <p>The discount is applied to both, automatically.</p>
          </div>
          <div className="bnd-tile">
            <div className="pct">
              <span className="cu" data-to="15">
                15
              </span>
              % off
            </div>
            <h3>Three or more services</h3>
            <p>Applied across all of them, automatically.</p>
          </div>

          <div className="bnd-tile bnd-named">
            <div className="pct">
              <span className="cu" data-to="15">
                15
              </span>
              % off
            </div>
            <h3>Three named bundles</h3>
            <p>Three services each, sequenced deliberately, at 15% off the total.</p>
            <div className="names">
              <span className="bnd-name-pill">
                Launch <span>get to market</span>
              </span>
              <span className="bnd-name-pill">
                Scale <span>compound growth</span>
              </span>
              <span className="bnd-name-pill">
                Operate <span>run it smoothly</span>
              </span>
            </div>
            <p style={{ marginTop: 16 }}>
              Working with us across service areas — say, a website plus staffing plus bookkeeping —
              carries its own 10–15% cross-area discount, calculated separately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
