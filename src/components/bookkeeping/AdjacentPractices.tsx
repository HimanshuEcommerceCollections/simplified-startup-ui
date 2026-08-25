"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import "./adjacent-practices.css";

const CARDS = [
  {
    title: "Launch your business",
    desc: "Starting up? Books wired at formation cost little and save the year-end scramble.",
  },
  {
    title: "AI automation strategy",
    desc: "The first step of the Operate bundle — books, staffing, and AI strategy together, 15% off.",
  },
  {
    title: "Hire without the headache",
    desc: "The other half of a calm back office — sourcing and screening run for you.",
  },
  {
    title: "Know what AI is worth to you",
    desc: "A ranked read on where AI would actually save you money — including where it would not.",
  },
];

export default function AdjacentPractices() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Light 3D tilt + colour spotlight on fine pointers.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduce) return;
    const cleanups: (() => void)[] = [];
    grid.querySelectorAll<HTMLElement>(".bk-adj-card").forEach((card) => {
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        card.classList.add("tilt3d");
        card.style.transform = `rotateX(${((0.5 - py) * 6).toFixed(2)}deg) rotateY(${((px - 0.5) * 7).toFixed(2)}deg) translateY(-4px)`;
      };
      const onLeave = () => {
        card.classList.remove("tilt3d");
        card.style.transform = "";
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="band light" aria-label="Often bought together">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— Adjacent practices</span>
          <h2>Often bought together.</h2>
        </Reveal>
        <div className="bk-adj" ref={gridRef}>
          {CARDS.map((card, i) => (
            <Reveal key={card.title} as="article" anim="pop" index={i} className="bk-adj-card">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </Reveal>
          ))}
        </div>
        <p className="bk-adj-note">
          Eight practices, one firm, one relationship owner — <a href="/services">see all eight</a>.
          Any two services together save 10%, three or more save 15%.
        </p>
      </div>
    </section>
  );
}
