"use client";

import Reveal from "@/components/ui/Reveal";
import type { PayoutBlock } from "./types";

/** E-commerce: one platform payout split into its parts, on a vertical timeline. */
export default function PayoutBreakdown({ steps }: { steps: PayoutBlock["steps"] }) {
  return (
    <Reveal className="bki-pb">
      {steps.map((step) => (
        <div className={`bki-pbe${step.net ? " net" : ""}`} key={step.key}>
          <span className="pbk">{step.key}</span>
          <span className="dot3"></span>
          <div className="box">
            <b>{step.title}</b>
            <p>{step.text}</p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
