"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import "./testimonials.css";

const TESTIMONIALS = [
  {
    name: "Anish",
    quote:
      "Ninety days in and we had a live site, campaigns running, and a real pipeline. Zero stress, all senior hands from start to finish.",
  },
  {
    name: "Aman",
    quote:
      "They exceeded our expectations on every front. The strategy and the execution both felt genuinely world-class.",
  },
  {
    name: "Prajwal",
    quote:
      "The journey from first brief to launch was seamless. We could see everything coming together weeks before go-live instead of guessing.",
  },
  {
    name: "Meera",
    quote:
      "It feels like an in-house growth team we could never have afforded to hire this early. Genuinely a partner, not a vendor.",
  },
  {
    name: "Rohan",
    quote:
      "Predictable pricing, senior operators, and things that actually ship. No endless decks that just sit in a drive.",
  },
  {
    name: "Sana",
    quote:
      "One team, one plan, one person to call. The handoff gaps we used to lose weeks to are simply gone.",
  },
];

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(3);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const pageCount = Math.max(1, Math.ceil(TESTIMONIALS.length / perView));
  const current = Math.min(page, pageCount - 1);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gapValue = parseFloat(getComputedStyle(track).columnGap);
    const gap = Number.isNaN(gapValue) ? 0 : gapValue;
    const step = (first.getBoundingClientRect().width + gap) * perView;
    setOffset(-current * step);
  }, [current, perView]);

  useEffect(() => {
    function onResize() {
      setPerView(window.matchMedia("(max-width: 900px)").matches ? 1 : 3);
    }
    onResize();
    let rt: ReturnType<typeof setTimeout>;
    function debounced() {
      clearTimeout(rt);
      rt = setTimeout(onResize, 150);
    }
    window.addEventListener("resize", debounced);
    return () => {
      window.removeEventListener("resize", debounced);
      clearTimeout(rt);
    };
  }, []);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, pageCount]);

  function go(delta: number) {
    setPage((p) => (Math.min(p, pageCount - 1) + delta + pageCount) % pageCount);
  }

  return (
    <section className="band light tst" id="testimonials">
      <div className="wrap">
        <Reveal className="sec-head tst-head">
          <span className="eyebrow on-light">What clients say</span>
          <h2>Testimonials</h2>
        </Reveal>
        <Reveal
          className="tst-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="tst-viewport">
            <div className="tst-track" ref={trackRef} style={{ transform: `translateX(${offset}px)` }}>
              {TESTIMONIALS.map((t) => (
                <article className="tst-card" key={t.name}>
                  <div className="tst-avatar" aria-hidden="true">
                    <span>{t.name[0]}</span>
                  </div>
                  <div className="tst-stars" aria-hidden="true">
                    ★★★★★
                  </div>
                  <span className="tst-quote-ico" aria-hidden="true">
                    “
                  </span>
                  <p className="tst-text">{t.quote}</p>
                  <div className="tst-name">{t.name}</div>
                  <div className="tst-role">Verified Customer</div>
                </article>
              ))}
            </div>
          </div>
          <div className="tst-controls">
            <button className="tst-arrow" aria-label="Previous testimonials" onClick={() => go(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="tst-dots">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  className={`tst-dot${i === current ? " active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setPage(i)}
                ></button>
              ))}
            </div>
            <button className="tst-arrow" aria-label="Next testimonials" onClick={() => go(1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
