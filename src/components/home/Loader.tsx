"use client";

import { useEffect, useState } from "react";
import "./loader.css";

/** Full-screen page loader; calls onDone when it starts fading out. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;
    let done = false;

    function hide() {
      if (done) return;
      done = true;
      setHidden(true);
      onDone();
      removeTimer = setTimeout(() => setGone(true), 650);
    }
    function ready() {
      const elapsed = performance.now() - start;
      const delay = Math.max(0, (reduce ? 200 : 1400) - elapsed);
      hideTimer = setTimeout(hide, delay);
    }

    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready);
    const cap = setTimeout(hide, 2000); // safety cap

    return () => {
      window.removeEventListener("load", ready);
      clearTimeout(cap);
      if (hideTimer) clearTimeout(hideTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div className={`loader${hidden ? " hidden" : ""}`} role="status" aria-label="Loading">
      <div className="loader-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="loader-mark" src="/assets/images/logo.png" alt="Simplified Startup" />
        <span className="loader-word">Simplified&nbsp;Startup</span>
        <span className="loader-track">
          <i></i>
        </span>
      </div>
    </div>
  );
}
