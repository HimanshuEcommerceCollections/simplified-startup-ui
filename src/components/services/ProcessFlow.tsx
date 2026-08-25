"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import "./process-flow.css";

type Stage = {
  kicker: string;
  idx: string;
  name: string;
  desc: string;
  vars: CSSProperties;
  icon: ReactNode;
};

const STAGES: Stage[] = [
  {
    kicker: "Align",
    idx: "01",
    name: "Map",
    desc: "A working session and an audit, then a written plan — services, sequence, fixed price, and the one metric we're judged by.",
    vars: {
      "--nc": "linear-gradient(135deg,#1e3a8a,#2563eb)",
      "--ncs": "rgba(30,58,138,.5)",
      "--rc": "#2563eb",
      "--tc": "#1e40af",
    } as CSSProperties,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 21s6.5-5.4 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.6 12 21 12 21z" />
        <circle cx="12" cy="10.3" r="2.3" />
      </svg>
    ),
  },
  {
    kicker: "Produce",
    idx: "02",
    name: "Build",
    desc: "Senior specialists produce the work against a checklist you can read. Two revision rounds; a third is our rewrite, free.",
    vars: {
      "--nc": "linear-gradient(135deg,#2456e6,#3b82f6)",
      "--ncs": "rgba(37,99,235,.5)",
      "--rc": "#2563eb",
      "--tc": "#1d4ed8",
    } as CSSProperties,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3z" />
        <path d="M3.5 12 12 16.5 20.5 12" />
        <path d="M3.5 16.5 12 21l8.5-4.5" />
      </svg>
    ),
  },
  {
    kicker: "Operate",
    idx: "03",
    name: "Grow",
    desc: "Everything runs on a stated cadence: weekly updates, a monthly report that leads with numbers, quarterly scope reviews.",
    vars: {
      "--nc": "linear-gradient(135deg,#2563eb,#0ea5a9)",
      "--ncs": "rgba(13,148,136,.5)",
      "--rc": "#0d9488",
      "--tc": "#0d9488",
    } as CSSProperties,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 16.5 9.5 11l3.5 3.5L20 7" />
        <path d="M15.5 7H20v4.5" />
      </svg>
    ),
  },
  {
    kicker: "Keep",
    idx: "04",
    name: "Own",
    desc: "Every account, asset, and login stays in your name from day one. Leave whenever — you keep all of it.",
    vars: {
      "--nc": "linear-gradient(135deg,#14b8a6,#2dd4bf)",
      "--ncs": "rgba(20,184,166,.5)",
      "--rc": "#14b8a6",
      "--tc": "#0f766e",
    } as CSSProperties,
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="8.5" cy="12" r="3.5" />
        <path d="M12 12h9M18 12v3.5M21 12v2.5" />
      </svg>
    ),
  },
];

export default function ProcessFlow() {
  const pfRef = useRef<HTMLDivElement>(null);

  // "The current": a self-drawing rail lights each phase as it passes,
  // then hover/focus sends the comet back to a phase. Ported near-verbatim
  // from the design script — geometry is measured, so it stays imperative.
  useEffect(() => {
    const pf = pfRef.current;
    if (!pf) return;
    const track = pf.querySelector<HTMLElement>(".pf-track");
    const rail = pf.querySelector<HTMLElement>(".pf-rail");
    const base = pf.querySelector<HTMLElement>(".pf-rail-base");
    const fillEl = pf.querySelector<HTMLElement>(".pf-rail-fill");
    const comet = pf.querySelector<HTMLElement>(".pf-comet");
    const count = pf.querySelector<HTMLElement>("#pfCount");
    const stages = Array.from(pf.querySelectorAll<HTMLElement>(".pf-stage"));
    const N = stages.length;
    if (!track || !rail || !base || !fillEl || !comet || !N) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let vertical = false;
    let centers: { x: number; y: number }[] = [];

    function measure() {
      vertical = window.matchMedia("(max-width:760px)").matches;
      const tr = track!.getBoundingClientRect();
      centers = stages.map((s) => {
        const n = s.querySelector(".pf-node")!.getBoundingClientRect();
        return { x: n.left - tr.left + n.width / 2, y: n.top - tr.top + n.height / 2 };
      });
      const a = centers[0];
      const z = centers[N - 1];
      if (vertical) {
        rail!.style.left = a.x + "px";
        rail!.style.right = "auto";
        rail!.style.top = "0";
        rail!.style.bottom = "0";
        rail!.style.width = "2px";
        rail!.style.height = "auto";
        base!.style.left = "0";
        base!.style.top = a.y + "px";
        base!.style.width = "2px";
        base!.style.height = Math.max(0, z.y - a.y) + "px";
        fillEl!.style.left = "0";
        fillEl!.style.top = a.y + "px";
        fillEl!.style.width = "2px";
      } else {
        rail!.style.left = "0";
        rail!.style.right = "0";
        rail!.style.top = a.y - 1 + "px";
        rail!.style.bottom = "auto";
        rail!.style.width = "auto";
        rail!.style.height = "2px";
        base!.style.left = a.x + "px";
        base!.style.top = "0";
        base!.style.height = "2px";
        base!.style.width = Math.max(0, z.x - a.x) + "px";
        fillEl!.style.left = a.x + "px";
        fillEl!.style.top = "0";
        fillEl!.style.height = "2px";
      }
    }

    function burst(s: HTMLElement) {
      s.classList.remove("burst");
      void s.offsetWidth;
      s.classList.add("burst");
    }

    function apply(p: number) {
      p = Math.max(0, Math.min(1, p));
      const seg = p * (N - 1);
      let i = Math.min(N - 2, Math.floor(seg));
      let f = seg - i;
      if (p >= 1) {
        i = N - 2;
        f = 1;
      }
      const a = centers[0];
      const hx = centers[i].x + (centers[i + 1].x - centers[i].x) * f;
      const hy = centers[i].y + (centers[i + 1].y - centers[i].y) * f;
      if (vertical) {
        fillEl!.style.height = Math.max(0, hy - a.y) + "px";
        comet!.style.transform = `translate(${a.x}px,${hy}px) translate(-50%,-50%)`;
      } else {
        fillEl!.style.width = Math.max(0, hx - a.x) + "px";
        comet!.style.transform = `translate(${hx}px,${a.y}px) translate(-50%,-50%)`;
      }
      stages.forEach((s, k) => {
        const reached = k / (N - 1) <= p + 0.001;
        if (reached && !s.classList.contains("lit")) {
          s.classList.add("lit");
          burst(s);
        }
      });
      const cur = Math.min(N, Math.max(1, Math.round(p * (N - 1)) + 1));
      if (count) count.textContent = ("0" + cur).slice(-2);
    }

    let raf = 0;
    let revealed = false;
    function reveal() {
      if (revealed) return;
      revealed = true;
      measure();
      pf!.classList.add("drawing");
      const dur = 2150;
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        apply(1 - Math.pow(1 - p, 3));
        if (p < 1) raf = requestAnimationFrame(step);
        else {
          pf!.classList.remove("drawing");
          pf!.classList.add("done");
        }
      };
      raf = requestAnimationFrame(step);
    }

    const cleanups: (() => void)[] = [];
    stages.forEach((s, k) => {
      s.tabIndex = 0;
      const go = () => {
        if (!pf!.classList.contains("done")) return;
        const c = centers[k];
        comet!.style.transition = "transform .5s cubic-bezier(.16,.84,.44,1)";
        comet!.style.transform = vertical
          ? `translate(${centers[0].x}px,${c.y}px) translate(-50%,-50%)`
          : `translate(${c.x}px,${centers[0].y}px) translate(-50%,-50%)`;
        burst(s);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      };
      s.addEventListener("mouseenter", go);
      s.addEventListener("focus", go);
      s.addEventListener("keydown", onKey);
      cleanups.push(() => {
        s.removeEventListener("mouseenter", go);
        s.removeEventListener("focus", go);
        s.removeEventListener("keydown", onKey);
      });
    });

    const onResize = () => {
      measure();
      if (revealed) apply(1);
    };
    window.addEventListener("resize", onResize, { passive: true });

    let io: IntersectionObserver | undefined;
    if (reduce) {
      measure();
      stages.forEach((s) => s.classList.add("lit"));
      pf.classList.add("done");
      apply(1);
    } else {
      measure();
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            reveal();
            io?.disconnect();
          }
        },
        { threshold: 0.32 }
      );
      io.observe(pf);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="band light" id="process" aria-label="How it works">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— The same process, every service</span>
          <h2 className="jr-title">Four phases. No mysteries.</h2>
          <p className="jr-lead">
            The same process behind every service, whichever you buy — plus the rule most agencies
            skip: you own everything.
          </p>
        </Reveal>
        <div className="pf" ref={pfRef} role="list" aria-label="Our four-phase process">
          <div className="pf-count" aria-hidden="true">
            <b id="pfCount">01</b> / 04
          </div>
          <div className="pf-track">
            <div className="pf-rail" aria-hidden="true">
              <span className="pf-rail-base"></span>
              <span className="pf-rail-fill"></span>
            </div>
            <span className="pf-comet" aria-hidden="true"></span>
            <div className="pf-stages">
              {STAGES.map((stage, i) => (
                <div key={stage.name} className="pf-stage" role="listitem" data-i={i} style={stage.vars}>
                  <span className="pf-node">
                    <span className="pf-ring"></span>
                    {stage.icon}
                  </span>
                  <span className="pf-kicker">{stage.kicker}</span>
                  <h3 className="pf-name">
                    <span className="pf-idx">{stage.idx}</span>
                    {stage.name}
                  </h3>
                  <p className="pf-desc">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
