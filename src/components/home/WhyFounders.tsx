"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import "./why-founders.css";

const STEPS = [
  {
    title: "Integrated team, single point of contact",
    body: "No vendor juggling, no handoff gaps, no “that's not our department” moments. One team, one plan, one person to call.",
    image: "/assets/images/why-team.jpg",
    alt: "Simplified Startup team working together",
  },
  {
    title: "Senior operators, not interns",
    body: "Every engagement is led by experienced practitioners who have done the work before — not learning on your budget.",
    image: "/assets/images/why-roadmap.jpg",
    alt: "Strategy-to-execution roadmap session",
  },
  {
    title: "Bundled pricing built for startups",
    body: "Predictable, transparent, and accessible. Priced for businesses without enterprise budgets, so senior work is finally within reach.",
    image: "/assets/images/why-pricing.jpg",
    alt: "Transparent bundled pricing comparison",
  },
  {
    title: "Ship-focused, always",
    body: "Measurable outputs — live sites, running campaigns, booked meetings. Not endless strategy decks that sit in a drive.",
    image: "/assets/images/why-launch.jpg",
    alt: "Shipping and launching the product",
  },
];

export default function WhyFounders() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".why-step"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(steps.indexOf(entry.target as HTMLElement));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="band light" id="why">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow on-light">Why founders choose us</span>
          <h2>What you get that the alternatives can&apos;t.</h2>
        </Reveal>
        <div className="why-scroll">
          <div className="why-sticky">
            <div className="why-media">
              {STEPS.map((step, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={step.image}
                  className={`wm-img${i === active ? " active" : ""}`}
                  src={step.image}
                  alt={step.alt}
                />
              ))}
            </div>
          </div>
          <div className="why-steps" ref={stepsRef}>
            {STEPS.map((step, i) => (
              <div className={`why-step${i === active ? " active" : ""}`} key={step.title}>
                <span className="why-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
