"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import "./fit-check.css";

const CARDS = [
  {
    kicker: "Stage",
    title: "Pre-seed & bootstrapped",
    copy: "Early founders who need senior execution without hiring a full team.",
  },
  {
    kicker: "Traction",
    title: "Early revenue",
    copy: "Owners past product-market fit who need to grow without adding headcount.",
  },
  {
    kicker: "Team shape",
    title: "Small teams",
    copy: "A marketer but no designer, a dev but no strategist — we fill the gaps.",
  },
];

export default function FitCheck() {
  const fcRef = useRef<HTMLDivElement>(null);

  // Sequential diagnostic scan: each card is swept by a beam and "verified",
  // then the inverse "not for" verdict rises. Pointer-tracked sheen on hover.
  useEffect(() => {
    const fc = fcRef.current;
    if (!fc) return;
    const cards = Array.from(fc.querySelectorAll<HTMLElement>(".fc-card"));
    const not = fc.querySelector<HTMLElement>(".fc-not");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];

    cards.forEach((c) => {
      const onPointerMove = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
        c.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
      };
      const onPointerEnter = () => {
        if (!c.classList.contains("verified")) return;
        c.classList.remove("scanning");
        void c.offsetWidth;
        c.classList.add("scanning");
      };
      c.addEventListener("pointermove", onPointerMove);
      c.addEventListener("pointerenter", onPointerEnter);
      cleanups.push(() => {
        c.removeEventListener("pointermove", onPointerMove);
        c.removeEventListener("pointerenter", onPointerEnter);
      });
    });

    function verify(c: HTMLElement) {
      c.classList.add("scanning");
      timers.push(setTimeout(() => c.classList.add("verified"), 260));
      timers.push(setTimeout(() => c.classList.remove("scanning"), 1040));
    }

    let ran = false;
    function run() {
      if (ran) return;
      ran = true;
      cards.forEach((c, i) => timers.push(setTimeout(() => verify(c), i * 380)));
      timers.push(setTimeout(() => not?.classList.add("in"), cards.length * 380 + 120));
    }

    let io: IntersectionObserver | undefined;
    if (reduce) {
      cards.forEach((c) => c.classList.add("verified"));
      not?.classList.add("in");
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            run();
            io?.disconnect();
          }
        },
        { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
      );
      io.observe(fc);
    }

    return () => {
      io?.disconnect();
      timers.forEach(clearTimeout);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="band" id="who" aria-label="Who it's for">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— Fit check</span>
          <h2 className="who-title">Built for founders who&apos;d rather build the business.</h2>
          <p className="who-lead">
            The stack fits best if you&apos;re one of these — and we&apos;ll tell you honestly if
            you&apos;re not.
          </p>
        </Reveal>
        <div className="fc" ref={fcRef}>
          <div className="fc-grid">
            {CARDS.map((card) => (
              <article key={card.title} className="fc-card">
                <span className="fc-scan" aria-hidden="true"></span>
                <span className="fc-badge" aria-hidden="true">
                  <svg className="fc-check" viewBox="0 0 22 22">
                    <path d="M4 11.5l4.4 4.4L18 6" />
                  </svg>
                  Fit
                </span>
                <span className="fc-kicker">{card.kicker}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
          <div className="fc-not">
            <span className="fc-x" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 7l10 10M17 7L7 17" />
              </svg>
            </span>
            <p>
              <span className="fc-not-label">Not for</span> anyone shopping purely on lowest price,
              or expecting overnight results on a real growth channel. We commit to the work —
              scope, cadence, and the quality bar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
