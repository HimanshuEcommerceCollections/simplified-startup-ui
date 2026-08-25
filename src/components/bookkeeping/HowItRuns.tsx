"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import "./how-it-runs.css";

const STEPS = [
  {
    n: "1",
    title: "Setup",
    when: "Week 1–2",
    what: "We assess the current state honestly, build or repair the chart of accounts, and scope any catch-up in writing.",
    get: "A clean starting point and a fixed monthly scope.",
  },
  {
    n: "2",
    title: "Close",
    when: "Monthly · dated",
    what: "Categorization, reconciliations, and the checklist — done by the close date written in your plan, every month.",
    get: "Books that are actually closed, on a date you can circle.",
  },
  {
    n: "3",
    title: "Report",
    when: "Plain English",
    what: "The monthly report lands with notes on what moved and why — plus flags on anything you should look at.",
    get: "Numbers you can read, and act on.",
  },
];

export default function HowItRuns() {
  const stepsRef = useRef<HTMLDivElement>(null);

  // Reveal + sequential node activation, plus 3D pointer tilt with a
  // colour spotlight on fine pointers.
  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps) return;
    const nodes = Array.from(steps.querySelectorAll<HTMLElement>(".bk-step"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];

    if (fine && !reduce) {
      nodes.forEach((card) => {
        const onMove = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
          card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
          card.classList.add("tilt3d");
          card.style.transform = `rotateX(${((0.5 - py) * 10).toFixed(2)}deg) rotateY(${((px - 0.5) * 12).toFixed(2)}deg) translateY(-6px)`;
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
    }

    let io: IntersectionObserver | undefined;
    if (reduce) {
      steps.classList.add("steps-in");
      nodes.forEach((s) => s.classList.add("lit"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            steps.classList.add("steps-in");
            nodes.forEach((s, i) => timers.push(setTimeout(() => s.classList.add("lit"), 350 + i * 480)));
            io?.disconnect();
          });
        },
        { threshold: 0.3 }
      );
      io.observe(steps);
    }

    return () => {
      io?.disconnect();
      timers.forEach(clearTimeout);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="band" aria-label="How it runs">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— How it runs</span>
          <h2>Three steps. No mysteries.</h2>
        </Reveal>
        <div className="bk-steps" ref={stepsRef}>
          <span className="bk-rail" aria-hidden="true">
            <span className="bk-rail-fill"></span>
          </span>
          {STEPS.map((step) => (
            <article key={step.n} className="bk-step">
              <div className="bk-node">
                <span>{step.n}</span>
              </div>
              <h3>{step.title}</h3>
              <span className="bk-when">{step.when}</span>
              <p>
                <strong>What happens:</strong> {step.what}
              </p>
              <p className="bk-get">
                <strong>You get:</strong> {step.get}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
