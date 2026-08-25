"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import "./cost-band.css";

export default function CostBand() {
  const priceRef = useRef<HTMLDivElement>(null);

  // Discount percentages count up once the card scrolls into view.
  useEffect(() => {
    const price = priceRef.current;
    if (!price) return;
    const counts = Array.from(price.querySelectorAll<HTMLElement>(".bk-count"));
    if (!counts.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      counts.forEach((c) => (c.textContent = c.getAttribute("data-to")));
      return;
    }
    const rafs: number[] = [];
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done) return;
          done = true;
          counts.forEach((c) => {
            const to = parseInt(c.getAttribute("data-to") || "0", 10);
            let start: number | null = null;
            const dur = 900;
            const tick = (ts: number) => {
              if (!start) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              c.textContent = String(Math.round(p * to));
              if (p < 1) rafs.push(requestAnimationFrame(tick));
            };
            rafs.push(requestAnimationFrame(tick));
          });
          io.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    io.observe(price);
    return () => {
      io.disconnect();
      rafs.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <section className="band light" id="cost" aria-label="What it costs">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— What it costs</span>
          <h2>Priced by scope band — set before work starts.</h2>
        </Reveal>
        <Reveal anim="pop" className="bk-price">
          <div ref={priceRef}>
            <p className="bk-price-lead">
              Your free growth plan scopes the work and fixes the exact price in writing before
              anything begins — no hourly meter, no surprise line items, and the number doesn&apos;t
              move after that. Combine services and the discount is automatic:
            </p>
            <div className="bk-tiers">
              <div className="bk-tier">
                <div className="bk-off">
                  <span className="bk-count" data-to="10">
                    0
                  </span>
                  % off
                </div>
                <p>Any two services together — applied to both.</p>
              </div>
              <div className="bk-tier">
                <div className="bk-off">
                  <span className="bk-count" data-to="15">
                    0
                  </span>
                  % off
                </div>
                <p>Three or more services together — applied across all of them.</p>
              </div>
            </div>
            <p className="bk-price-foot">
              The full pricing model — published bands, terms, and how ranges work — is on the{" "}
              <a href="/pricing">price list</a>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
