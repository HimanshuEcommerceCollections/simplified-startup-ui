"use client";

import Reveal from "@/components/ui/Reveal";
import { useTiltCards } from "@/lib/useTilt";
import type { FounderQsBlock, Reports6Block } from "./types";

/** SaaS: six report cards with the pointer spotlight + tilt. */
export function SaasReports({ items }: { items: Reports6Block["items"] }) {
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="bki-r6-grid">
        {items.map((item) => (
          <article className="bki-r6" data-tilt key={item.title}>
            <span className="bki-r6-spot"></span>
            <div className="r6i">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/** SaaS: the questions founders ask, with the answer the books give. */
export function FounderQuestions({ items }: { items: FounderQsBlock["items"] }) {
  return (
    <Reveal className="bki-fq-grid">
      {items.map((item) => (
        <article className="bki-fq" key={item.q}>
          <div className="fqq">
            <span className="qm" aria-hidden="true">
              ?
            </span>
            <span>{item.q}</span>
          </div>
          <p>{item.a}</p>
        </article>
      ))}
    </Reveal>
  );
}
