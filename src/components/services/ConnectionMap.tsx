"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./connection-map.css";

type NodeData = {
  num: string;
  tag: string;
  icon: ReactNode;
  title: string;
  tags: string[];
  desc: string;
  pos: [number, number];
};

const DATA: NodeData[] = [
  {
    num: "01",
    tag: "Single contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
      </svg>
    ),
    title: "Single point of contact",
    tags: ["One team", "One plan", "One contact"],
    desc: "One team, one plan, one person to call. No handoff gaps, no vendor juggling, no translating between specialists.",
    pos: [0.27, 0.19],
  },
  {
    num: "02",
    tag: "Senior team",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="9" r="6" />
        <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
      </svg>
    ),
    title: "Senior operators, not interns",
    tags: ["Founders", "Operators", "Proven"],
    desc: "Every engagement is led by people who've done the work — for their own companies and for clients.",
    pos: [0.81, 0.3],
  },
  {
    num: "03",
    tag: "Fixed pricing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.6 13.4 12 22l-9-9V3h9l8.6 8.6a2 2 0 0 1 0 2.8z" />
        <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Bundled, published pricing",
    tags: ["Fixed price", "Published", "No surprises"],
    desc: "Transparent and built for startup budgets, so senior work is finally within reach. Your number is fixed before work starts.",
    pos: [0.74, 0.81],
  },
  {
    num: "04",
    tag: "Ship-focused",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 15c-1.5 1-2 5-2 5s4-.5 5-2M9 11a12 12 0 0 1 8-8c2 0 3 1 3 3a12 12 0 0 1-8 8z" />
        <path d="m9 11 4 4" />
      </svg>
    ),
    title: "Ship-focused, always",
    tags: ["Live sites", "Campaigns", "Real output"],
    desc: "Measurable outputs — live sites, running campaigns, booked meetings, clean books — not endless strategy decks.",
    pos: [0.2, 0.73],
  },
];

const N = DATA.length;

export default function ConnectionMap() {
  const stageRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<SVGLineElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linkRefs = useRef<(SVGLineElement | null)[]>([]);
  const readRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const activeRef = useRef(0);
  const lastInteractRef = useRef(0);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(i: number, user: boolean) {
    if (user) lastInteractRef.current = performance.now();
    if (i === activeRef.current) return;
    activeRef.current = i;
    setActive(i);
    // swap the readout with a quick fade
    const read = readRef.current;
    if (read) read.classList.add("swapping");
    if (swapTimer.current) clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => {
      setShown(i);
      if (read) read.classList.remove("swapping");
    }, 160);
  }

  // Living map: gentle float + cursor repulsion + flowing active link,
  // with an idle auto-cycle through the four reasons.
  useEffect(() => {
    const stage = stageRef.current;
    const flowLine = flowRef.current;
    const spot = spotRef.current;
    if (!stage || !flowLine) return;
    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
    const links = linkRefs.current.filter(Boolean) as SVGLineElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const phases = DATA.map((_, i) => (i * 6.28) / N + 1.7 * i);
    const state = nodes.map(() => ({ ox: 0, oy: 0, px: 0, py: 0 }));
    let W = 0;
    let cx = 0;
    let cy = 0;
    const measure = () => {
      W = stage.clientWidth || 480;
      cx = W * 0.5;
      cy = W * 0.5;
    };
    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%)`;
    };
    const setLine = (l: SVGLineElement, x: number, y: number) => {
      l.setAttribute("x1", String(cx));
      l.setAttribute("y1", String(cy));
      l.setAttribute("x2", String(x));
      l.setAttribute("y2", String(y));
    };

    let pmx = -999;
    let pmy = -999;
    let overStage = false;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      pmx = e.clientX - r.left;
      pmy = e.clientY - r.top;
      overStage = true;
      if (spot) spot.style.transform = `translate(${pmx}px,${pmy}px) translate(-50%,-50%)`;
      lastInteractRef.current = performance.now();
    };
    const onLeave = () => {
      overStage = false;
      pmx = -999;
      pmy = -999;
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    const staticLayout = () => {
      measure();
      nodes.forEach((el, k) => {
        const x = DATA[k].pos[0] * W;
        const y = DATA[k].pos[1] * W;
        state[k].px = x;
        state[k].py = y;
        place(el, x, y);
        if (links[k]) setLine(links[k], x, y);
      });
      const a = state[activeRef.current];
      if (a) setLine(flowLine, a.px, a.py);
    };

    let raf = 0;
    let t = 0;
    let flowOff = 0;
    let lastCycle = 0;
    const frame = (now: number) => {
      t += 0.016;
      const REP = 118;
      const STR = 42;
      nodes.forEach((el, k) => {
        const bx = DATA[k].pos[0] * W;
        const by = DATA[k].pos[1] * W;
        const fx = Math.sin(t * 0.9 + phases[k]) * 7;
        const fy = Math.cos(t * 0.75 + phases[k] * 1.3) * 7;
        let rx = 0;
        let ry = 0;
        if (overStage) {
          const dx = bx + fx - pmx;
          const dy = by + fy - pmy;
          const dist = Math.hypot(dx, dy);
          if (dist < REP && dist > 0.001) {
            const f = (1 - dist / REP) * STR;
            rx = (dx / dist) * f;
            ry = (dy / dist) * f;
          }
        }
        const s = state[k];
        s.ox += (fx + rx - s.ox) * 0.12;
        s.oy += (fy + ry - s.oy) * 0.12;
        const x = bx + s.ox;
        const y = by + s.oy;
        s.px = x;
        s.py = y;
        place(el, x, y);
        if (links[k]) setLine(links[k], x, y);
      });
      const a = state[activeRef.current];
      if (a) {
        setLine(flowLine, a.px, a.py);
        flowOff -= 0.7;
        flowLine.setAttribute("stroke-dashoffset", flowOff.toFixed(1));
      }
      if (now - lastInteractRef.current > 2400 && now - lastCycle > 3200) {
        lastCycle = now;
        goTo((activeRef.current + 1) % N, false);
      }
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      measure();
      if (reduce) staticLayout();
    };
    window.addEventListener("resize", onResize, { passive: true });

    if (reduce) {
      staticLayout();
    } else {
      measure();
      lastInteractRef.current = performance.now();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, []);

  const hoverActivate = (i: number) => {
    if (window.matchMedia("(hover: hover)").matches) goTo(i, true);
  };

  const d = DATA[shown];

  return (
    <section className="band" id="why" aria-label="Why one partner">
      <div className="wrap">
        <div className="cn-wrap">
          <div className="cn-copy">
            <span className="eyebrow">— The case for connected</span>
            <h2 className="why-title">What you get that a stack of freelancers can&apos;t.</h2>
            <p className="cn-lead">
              The four things that only exist when one senior team owns the whole engagement.
            </p>
            <div className="cn-read" ref={readRef} aria-live="polite">
              <div className="cn-read-inner">
                <span className="cn-read-num">
                  {d.num} / 0{N}
                </span>
                <h3 className="cn-read-title">{d.title}</h3>
                <p className="cn-read-desc">{d.desc}</p>
                <div className="cn-read-tags">
                  {d.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="cn-dots" role="tablist" aria-label="Reasons">
              {DATA.map((item, i) => (
                <button
                  key={item.num}
                  role="tab"
                  aria-label={item.title}
                  aria-selected={i === active}
                  className={i === active ? "on" : undefined}
                  onClick={() => goTo(i, true)}
                ></button>
              ))}
            </div>
          </div>

          <div className="cn-stage" ref={stageRef}>
            <div className="cn-spot" ref={spotRef} aria-hidden="true"></div>
            <svg className="cn-svg" aria-hidden="true" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cnLink" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2563eb" />
                  <stop offset="1" stopColor="#14b8a6" />
                </linearGradient>
                <linearGradient id="cnFlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#14b8a6" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              {DATA.map((item, i) => (
                <line
                  key={item.num}
                  className={`cn-link${i === active ? " on" : ""}`}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                />
              ))}
              <line className="cn-flow on" ref={flowRef} />
            </svg>
            <div className="cn-hub" aria-hidden="true">
              <span>
                <b>
                  One
                  <br />
                  connected
                  <br />
                  team
                </b>
                <small>The core</small>
              </span>
            </div>
            <div className="cn-nodes">
              {DATA.map((item, i) => (
                <div
                  key={item.num}
                  className={`cn-node${i === active ? " on" : " dim"}`}
                  role="button"
                  tabIndex={0}
                  aria-label={item.title}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  onMouseEnter={() => hoverActivate(i)}
                  onClick={() => goTo(i, true)}
                  onFocus={() => goTo(i, true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goTo(i, true);
                    }
                  }}
                >
                  <span className="cn-dot">
                    {item.icon}
                    <span className="cn-idx">{item.num}</span>
                  </span>
                  <span className="cn-tag">{item.tag}</span>
                </div>
              ))}
            </div>
            <span className="cn-hint" aria-hidden="true">
              Hover a node
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
