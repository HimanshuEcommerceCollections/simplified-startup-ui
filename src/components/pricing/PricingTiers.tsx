"use client";

import { useEffect, useRef } from "react";
import "./pricing-tiers.css";

const TIERS = [
  {
    name: "Starter",
    price: "$1,000–1,500",
    per: "/mo",
    desc: "Consistent marketing, handled — content, social, and the basics done right, every month.",
    list: ["Core channel management", "Monthly content calendar, written and shipped", "Monthly results report"],
    cta: { label: "Start with Starter", primary: false },
    feature: false,
  },
  {
    name: "Growth",
    price: "$2,000–4,000",
    per: "/mo",
    desc: "Multi-channel marketing with search and conversion work compounding month over month.",
    list: [
      "Everything in Starter",
      "Search visibility and website conversion work",
      "Quarterly strategy session with your plan owner",
    ],
    cta: { label: "Choose Growth", primary: true },
    feature: true,
  },
  {
    name: "Full-Service",
    price: "$4,000–8,000",
    per: "/mo",
    desc: "The entire growth engine, ready for you — strategy, execution, and reporting, all under one roof.",
    list: ["Everything in Growth", "Paid campaigns and full-funnel measurement", "A senior team across every channel"],
    cta: { label: "Go Full-Service", primary: false },
    feature: false,
  },
];

export default function PricingTiers() {
  const gridRef = useRef<HTMLDivElement>(null);

  // 3D tilt + cursor spotlight on the cards, magnetic pull on the CTAs.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;
    const cleanups: (() => void)[] = [];

    grid.querySelectorAll<HTMLElement>(".tier").forEach((card) => {
      const onMove = (ev: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        card.style.transform = `translateY(-6px) rotateX(${((0.5 - py) * 6).toFixed(2)}deg) rotateY(${((px - 0.5) * 6).toFixed(2)}deg)`;
      };
      const onLeave = () => {
        card.style.transform = "";
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    grid.querySelectorAll<HTMLElement>(".tier-cta .btn").forEach((el) => {
      const onMove = (ev: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const mx = ev.clientX - (r.left + r.width / 2);
        const my = ev.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(mx * 0.18).toFixed(1)}px,${(my * 0.3).toFixed(1)}px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.style.transition = "transform .25s cubic-bezier(.16,.84,.44,1)";
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="band" id="packages" aria-label="Monthly marketing packages">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">— Ongoing marketing, handled</span>
          <h2>Monthly marketing packages</h2>
          <p>
            Our recurring digital marketing plans — three tiers, month to month after a 3-month
            introductory term. Software and tool costs are included, so the price below is the
            total price.
          </p>
        </div>

        <div className="tiers" ref={gridRef}>
          {TIERS.map((tier) => (
            <div key={tier.name} className={`tier${tier.feature ? " is-feature" : ""}`}>
              {tier.feature && <div className="tier-beam" aria-hidden="true"></div>}
              <div className="tier-spot" aria-hidden="true"></div>
              {tier.feature && <span className="tier-badge">Most chosen</span>}
              <div className="tier-name">{tier.name}</div>
              <div className="tier-price">
                {tier.price} <span className="per">{tier.per}</span>
              </div>
              <p className="tier-desc">{tier.desc}</p>
              <div className="tier-div"></div>
              <ul className="tier-list">
                {tier.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="tier-cta">
                <a href="#book" className={`btn ${tier.cta.primary ? "btn-primary" : "btn-ghost"}`}>
                  {tier.cta.label}
                  {tier.cta.primary && (
                    <span className="arw" aria-hidden="true">
                      →
                    </span>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="tiers-note">
          Month to month following a 3-month introductory contract. Where a range is shown, your
          exact number is fixed in your plan before work starts.
        </p>
      </div>
    </section>
  );
}
