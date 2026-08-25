"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Adds an "in view" flag once the element enters the viewport
 * (the scroll-reveal pattern used throughout the designs).
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.16 },
  once = true
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  // Options are captured on first render — pass a stable value.
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      });
    }, optionsRef.current);
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return [ref, inView];
}
