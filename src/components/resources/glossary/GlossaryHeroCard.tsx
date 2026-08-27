"use client";

import { useEffect, useState } from "react";

const ENTRIES: [string, string, string][] = [
  ["C", "CTR", "The percentage of people who see something — an ad, an email, a search result — and actually click on it."],
  ["B", "Backlink", "A link from another site to yours. Google treats them a bit like recommendations — more good ones, more trust."],
  ["G", "GEO", "Getting AI tools like ChatGPT, Gemini, or Claude to mention and recommend your business when people ask."],
  ["F", "Funnel", "The path from first hearing about you to becoming a customer — awareness, interest, decision, action."],
  ["M", "Money Page", "A page built for one service, business type, and location — like “SEO for realtors in Raleigh.”"],
];

/** Hero signature: cycling dictionary-entry card. */
export default function GlossaryHeroCard() {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    function cycle() {
      setSwapping(true);
      timers.push(
        setTimeout(() => {
          i = (i + 1) % ENTRIES.length;
          setIndex(i);
          setSwapping(false);
        }, 420)
      );
      timers.push(setTimeout(cycle, 3600));
    }
    timers.push(setTimeout(cycle, 3200));
    return () => timers.forEach(clearTimeout);
  }, []);

  const [letter, term, def] = ENTRIES[index];

  return (
    <div className={`gl-card${swapping ? " swap" : ""}`} aria-hidden="true">
      <div className="gl-card-top">
        <span className="gl-card-letter">{letter}</span>
        <span className="gl-card-tag">plain English</span>
      </div>
      <h3 className="gl-card-term">{term}</h3>
      <p className="gl-card-def">{def}</p>
      <div className="gl-card-dots">
        {ENTRIES.map((entry, i) => (
          <i key={entry[1]} className={i === index ? "on" : undefined}></i>
        ))}
      </div>
    </div>
  );
}
