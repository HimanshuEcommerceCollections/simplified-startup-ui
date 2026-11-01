"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The designs add `.run` to the hero card 900ms after load (immediately under
 * reduced motion). The reduced-motion end state is derived at render, not set in the effect.
 */
export function useCardRun(): boolean {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);

  return reduce || started;
}
