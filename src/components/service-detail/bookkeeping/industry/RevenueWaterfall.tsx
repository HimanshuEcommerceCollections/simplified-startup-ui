"use client";

import Reveal from "@/components/ui/Reveal";
import type { WaterfallBlock } from "./types";

/** Agencies: gross billings stepped down to profit (a ribbon timeline with +/- tags). */
export default function RevenueWaterfall({ steps }: { steps: WaterfallBlock["steps"] }) {
  return (
    <Reveal className="bki-wf">
      {steps.map((step) => (
        <div className={`bki-wfe${step.variant ? ` ${step.variant}` : ""}`} key={step.key}>
          <span className="wk">{step.key}</span>
          <span className="wd"></span>
          <div className="box">
            <div className="bt">
              <b>{step.title}</b>
              <p>{step.text}</p>
            </div>
            <span className={`tag ${step.tagKind}`}>{step.tag}</span>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
