"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const DEMOS: [string, string][] = [
  ["How long does SEO take?", "Usually 3–6 months for meaningful movement. Anyone promising rankings in 30 days isn't being honest."],
  ["Do I have to sign a long contract?", "No lock-in. Most services are month-to-month — cancel with about 30 days' notice."],
  ["Where can I see your prices?", "On every service page, publicly. No “book a call to hear our rates.”"],
  ["Who owns the work you create?", "You do — content, designs, ad and social accounts all belong to you."],
];

/** Hero signature: cycling typewriter Q → thinking dots → A demo. */
export default function FaqDemoCard() {
  const reduce = useReducedMotion();
  const [rawPhase, setPhase] = useState<"typing" | "thinking" | "answered">("typing");
  const [rawTyped, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // reduced motion shows the first Q/A statically
  const phase = reduce ? "answered" : rawPhase;
  const typed = reduce ? DEMOS[index][0] : rawTyped;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const push = (fn: () => void, ms: number) => {
      const t = setTimeout(() => alive && fn(), ms);
      timers.current.push(t);
    };

    function run(demoIndex: number) {
      setIndex(demoIndex);
      setPhase("typing");
      setTyped("");
      const question = DEMOS[demoIndex][0];
      for (let i = 1; i <= question.length; i++) {
        push(() => setTyped(question.slice(0, i)), i * 30);
      }
      const doneAt = question.length * 30;
      push(() => setPhase("thinking"), doneAt + 250);
      push(() => setPhase("answered"), doneAt + 1050);
      push(() => run((demoIndex + 1) % DEMOS.length), doneAt + 4200);
    }

    const kickoff = setTimeout(() => run(0), 850);
    timers.current.push(kickoff);
    const currentTimers = timers.current;
    return () => {
      alive = false;
      currentTimers.forEach(clearTimeout);
    };
  }, []);

  const stateClass = phase === "answered" ? " answered" : phase === "thinking" ? " thinking" : "";

  return (
    <div className={`fq-demo${stateClass}`} aria-hidden="true">
      <div className="fq-demo-q">
        <span className="fq-demo-badge">Q</span>
        <p>{typed}</p>
      </div>
      <div className="fq-demo-think">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div className="fq-demo-a">
        <span className="fq-demo-badge a">A</span>
        <p>{DEMOS[index][1]}</p>
      </div>
      <span className="fq-demo-tag">Plain answer · no pitch</span>
    </div>
  );
}
