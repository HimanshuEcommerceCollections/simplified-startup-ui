"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import "./our-approach.css";

type Principle = { title: string; body: string; icon: ReactNode };

const PRINCIPLES: Principle[] = [
  {
    title: "Practical",
    body: "Real outputs — a live site, a running campaign, clean books — not a deck full of theory.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 6.5a3.5 3.5 0 1 0 4 4L21 8V4h-4l-2.5 2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M13 9 4 18a2.1 2.1 0 0 0 3 3l9-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Strategic",
    body: "Every piece ties back to a business goal and the one number that actually matters.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Collaborative",
    body: "We build with you, in plain language, with decisions you can see and understand.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 20c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M16 6.2a3.2 3.2 0 0 1 0 6.1M17.5 14.8c1.8.7 3 2.6 3 5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Experienced",
    body: "Senior operators who've built and run businesses — for themselves and for clients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="14.5" r="5.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="m12 12.4 1 2h2l-1.6 1.4.6 2.1-2-1.2-2 1.2.6-2.1L9 14.4h2l1-2Z" fill="currentColor" />
        <path d="M8 8.6 6 3.5h12l-2 5.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Accountable",
    body: "One team owning the result, so there's no gap between vendors for the work to fall through.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3.2 4.8 5.9v5.4c0 4.3 3 7.8 7.2 9.5 4.2-1.7 7.2-5.2 7.2-9.5V5.9L12 3.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m8.8 11.8 2.4 2.4 4-4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/** Signed offset of card i relative to the current card, the shortest way round. */
function signedOffset(i: number, cur: number, n: number) {
  let o = (i - cur + n) % n;
  if (o > n / 2) o -= n;
  return o;
}

export default function OurApproach() {
  const rootRef = useRef<HTMLElement>(null);

  // 3D coverflow, ported from the design's script (imperative because it
  // mixes drag gestures with per-card CSS custom properties).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".cf-stage")!;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>(".cf-card"));
    const prevB = root.querySelector<HTMLButtonElement>('[data-cf="prev"]')!;
    const nextB = root.querySelector<HTMLButtonElement>('[data-cf="next"]')!;
    const n = cards.length;
    let cur = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function layout() {
      cards.forEach((c, idx) => {
        const o = signedOffset(idx, cur, n);
        const a = Math.abs(o);
        c.style.setProperty("--o", String(o));
        c.style.setProperty("--a", String(a));
        c.style.zIndex = String(20 - a);
        c.classList.toggle("is-mid", a === 0);
        c.classList.toggle("is-side", a !== 0);
        c.setAttribute("aria-hidden", a === 0 ? "false" : "true");
        c.tabIndex = a === 0 ? 0 : -1;
      });
    }
    function go(i: number) {
      cur = ((i % n) + n) % n;
      layout();
    }

    const onNext = () => go(cur + 1);
    const onPrev = () => go(cur - 1);
    nextB.addEventListener("click", onNext);
    prevB.addEventListener("click", onPrev);

    const cardHandlers = cards.map((c, idx) => {
      const h = () => {
        if (c.classList.contains("is-side")) go(idx);
      };
      c.addEventListener("click", h);
      return h;
    });

    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(cur + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(cur - 1);
      }
    }
    stage.addEventListener("keydown", onKeyDown);

    /* drag across the fan */
    let sx = 0, sy = 0, dx = 0;
    let drag = false;
    function onPointerDown(e: PointerEvent) {
      if (reduce) return;
      const t = e.target as HTMLElement;
      if (t.closest && t.closest("a,button")) return;
      drag = true;
      dx = 0;
      sx = e.clientX;
      sy = e.clientY;
    }
    function onPointerMove(e: PointerEvent) {
      if (!drag) return;
      dx = e.clientX - sx;
      if (Math.abs(e.clientY - sy) > Math.abs(dx) * 1.6 && Math.abs(e.clientY - sy) > 18) {
        drag = false;
      }
    }
    function onPointerUp() {
      if (!drag) return;
      drag = false;
      if (dx < -60) go(cur + 1);
      else if (dx > 60) go(cur - 1);
    }
    const onPointerCancel = () => (drag = false);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerCancel);

    layout();

    return () => {
      nextB.removeEventListener("click", onNext);
      prevB.removeEventListener("click", onPrev);
      cards.forEach((c, idx) => c.removeEventListener("click", cardHandlers[idx]));
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerCancel);
    };
  }, []);

  return (
    <section className="band cf-band" id="our-approach" aria-label="Our approach" ref={rootRef}>
      <div className="wrap">
        <Reveal className="sec-head cf-head">
          <span className="eyebrow">Our approach</span>
          <h2 className="ab-h2">A strategic partner, not just another agency.</h2>
          <p className="sec-lead">
            We work the way a good business partner would — invested in the outcome, not just the
            deliverable.
          </p>
        </Reveal>

        <div className="cf-stage" aria-live="polite">
          {PRINCIPLES.map((p, idx) => {
            const o = signedOffset(idx, 0, PRINCIPLES.length);
            const a = Math.abs(o);
            return (
              <article
                key={p.title}
                className={`cf-card${a === 0 ? " is-mid" : " is-side"}`}
                style={{ "--o": o, "--a": a, zIndex: 20 - a } as React.CSSProperties}
                tabIndex={a === 0 ? 0 : -1}
                aria-hidden={a !== 0}
              >
                <span className="cf-ic" aria-hidden="true">
                  {p.icon}
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <span className="cf-ix" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")} / {String(PRINCIPLES.length).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>

        <div className="cf-ctrl">
          <button className="jr-arw on-dark" type="button" data-cf="prev" aria-label="Previous principle">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="jr-arw on-dark is-next" type="button" data-cf="next" aria-label="Next principle">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="cf-hint">Drag, tap a card, or use the arrows</p>
      </div>
    </section>
  );
}
