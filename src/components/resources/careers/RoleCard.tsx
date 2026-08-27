"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ROLES } from "./careers-data";

/** Hero signature: the live "hiring across the stack" role card cycler. */
export default function RoleCard() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (reduce || paused) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const interval = setInterval(() => {
      setSwapping(true);
      timers.push(
        setTimeout(() => {
          indexRef.current = (indexRef.current + 1) % ROLES.length;
          setIndex(indexRef.current);
          setSwapping(false);
        }, 460)
      );
    }, 2600);
    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [reduce, paused]);

  const role = ROLES[index];

  return (
    <aside
      className={`rolecard${swapping ? " swap" : ""}`}
      aria-hidden="true"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="rc-top">
        <span className="rc-live">
          <span className="dot"></span> Now hiring
        </span>
        <span className="rc-count">
          Role {index + 1} / {ROLES.length}
        </span>
      </div>
      <div className="rc-body">
        <div className="rc-slot">
          <div className="rc-role">{role.title}</div>
        </div>
        <div className="rc-pills">
          <span className="rc-pill">Remote</span>
          <span className="rc-pill type">{role.type}</span>
        </div>
        <p className="rc-desc">{role.desc}</p>
      </div>
      <div className="rc-foot">
        <span className="rf-l">Hiring across the stack</span>
        <span className="rc-progress">
          {ROLES.map((r, i) => (
            <i key={r.title} className={i === index ? "on" : undefined}></i>
          ))}
        </span>
      </div>
    </aside>
  );
}
