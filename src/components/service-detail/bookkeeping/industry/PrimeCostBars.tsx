"use client";

import type { CSSProperties } from "react";
import Reveal from "@/components/ui/Reveal";
import type { PrimeCostBlock } from "./types";

/** Restaurants: food, beverage and labor bars filling to their widths, then the prime-cost total. */
export default function PrimeCostBars({ bars, total }: { bars: PrimeCostBlock["bars"]; total: PrimeCostBlock["total"] }) {
  return (
    <Reveal className="bki-pc">
      <div className="bki-pc-bars">
        {bars.map((bar) => (
          <div className="bki-pcb" key={bar.label}>
            <span className="pcl">
              <span className="pci">{bar.icon}</span>
              {bar.label}
            </span>
            <span className="pcbar">
              <i className={bar.fill} style={{ "--w": bar.width } as CSSProperties}></i>
            </span>
            <span className="pcv">{bar.value}</span>
          </div>
        ))}
      </div>
      <div className="bki-pc-total">
        <div className="ptl">
          <b>{total.title}</b>
          <span>{total.text}</span>
        </div>
        <span className="ptv">{total.value}</span>
      </div>
    </Reveal>
  );
}
