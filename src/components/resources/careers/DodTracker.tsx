"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";

const CIRCUMFERENCE = 326.73;
const DURATION = 2000;

/** "The way we operate" — looping Definition-of-Done progress ring. */
export default function DodTracker() {
  const [cardRef, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const progRef = useRef<SVGCircleElement>(null);
  const pctRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLUListElement>(null);

  // The looping fill/count/steps sequence is driven imperatively, ported
  // from the design's script — a render per animation frame would be wasteful.
  useEffect(() => {
    if (!inView) return;
    const card = cardRef.current;
    const prog = progRef.current;
    if (!card || !prog) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      card.classList.add("done");
      return;
    }
    const stepEls = stepsRef.current ? Array.from(stepsRef.current.children) : [];
    let raf: number | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function reset() {
      if (raf) cancelAnimationFrame(raf);
      prog!.style.transition = "none";
      prog!.style.strokeDashoffset = String(CIRCUMFERENCE);
      card!.classList.remove("done");
      if (pctRef.current) pctRef.current.textContent = "0";
      stepEls.forEach((li) => li.classList.remove("on"));
      void prog!.getBoundingClientRect(); // reflow
    }
    function play() {
      reset();
      prog!.style.transition = `stroke-dashoffset ${DURATION}ms cubic-bezier(.16,.84,.44,1)`;
      prog!.style.strokeDashoffset = "0";
      const t0 = performance.now();
      function tick(now: number) {
        const p = Math.min((now - t0) / DURATION, 1);
        if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100));
        if (p < 1) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
      stepEls.forEach((li, i) => {
        timers.push(setTimeout(() => li.classList.add("on"), 300 + (i * (DURATION - 500)) / Math.max(stepEls.length - 1, 1)));
      });
      timers.push(setTimeout(() => card!.classList.add("done"), DURATION + 60));
    }

    play();
    const loop = setInterval(play, DURATION + 2600);
    return () => {
      clearInterval(loop);
      timers.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inView, cardRef]);

  return (
    <aside className="dw-viz reveal in" aria-hidden="true">
      <div className="dw-card" ref={cardRef}>
        <div className="dw-head">
          <span className="dw-cap">Definition of done</span>
          <span className="dw-live">
            <i></i>live
          </span>
        </div>
        <div className="dw-ring-wrap">
          <span className="dw-orbit"></span>
          <svg className="dw-ring" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <linearGradient id="dwGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2563eb" />
                <stop offset="1" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            <circle className="dw-track" cx="60" cy="60" r="52" />
            <circle className="dw-prog" ref={progRef} cx="60" cy="60" r="52" />
          </svg>
          <div className="dw-center">
            <span className="dw-pct">
              <b ref={pctRef}>0</b>%
            </span>
            <span className="dw-done">
              Done{" "}
              <svg viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
        </div>
        <ul className="dw-steps" ref={stepsRef}>
          <li>
            <span className="dw-tick"></span>Scoped &amp; written
          </li>
          <li>
            <span className="dw-tick"></span>Reviewed twice
          </li>
          <li>
            <span className="dw-tick"></span>Written down
          </li>
          <li>
            <span className="dw-tick"></span>Shipped
          </li>
        </ul>
      </div>
    </aside>
  );
}
