"use client";

import { useEffect, useRef } from "react";

/** Thin vertical scroll-progress indicator on the right edge. */
export default function ScrollProgress() {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;
    function update() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (window.scrollY || h.scrollTop) / max : 0;
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scrollbar" aria-hidden="true">
      <span className="fill" ref={fillRef}></span>
    </div>
  );
}
