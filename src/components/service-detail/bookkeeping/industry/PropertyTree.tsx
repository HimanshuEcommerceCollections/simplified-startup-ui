"use client";

import Reveal from "@/components/ui/Reveal";
import type { PropertyTreeBlock } from "./types";

/** Real estate: the portfolio header fanning out to one card per property plus the combined view. */
export default function PropertyTree({ head, nodes }: { head: string; nodes: PropertyTreeBlock["nodes"] }) {
  return (
    <Reveal className="bki-ptree">
      <div className="bki-ptree-head">{head}</div>
      <div className="bki-ptree-conn" aria-hidden="true">
        {nodes.map(() => "↓").join("   ")}
      </div>
      <div className="bki-ptree-row">
        {nodes.map((node) => (
          <article className={`bki-pcard${node.portfolio ? " port" : ""}`} key={node.title}>
            <span className="pk">{node.kicker}</span>
            <h3>{node.title}</h3>
            <span className="plabel">{node.label}</span>
            <ul>
              {node.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
