"use client";

import { useEffect, useRef } from "react";
import "./why-one-team.css";

const LINES = [
  {
    kw: "You become the middleman.",
    rest: "The people handling your website, your marketing, and your design never talk to each other, so every change has to route through you.",
  },
  {
    kw: "Things fall between the cracks.",
    rest: "When something isn't clearly anyone's job, it doesn't get done — and you find out too late.",
  },
  {
    kw: "No one owns the results.",
    rest: "Each vendor reports on their own slice of the work. Nobody is accountable for whether your business actually grows.",
  },
];

export default function WhyOneTeam() {
  const sectionRef = useRef<HTMLElement>(null);

  // Orchestrated blur-to-focus reveal: lead-in first, then each problem line
  // rises with its progress dash. Plays once; everything stays visible
  // without JS or under prefers-reduced-motion (the CSS gates on .js-reveal).
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const lines = Array.from(sec.querySelectorAll(".hc-line"));
    const dots = Array.from(sec.querySelectorAll(".hc-progress .pd"));
    const lead = Array.from(sec.querySelectorAll(".hc-left .eyebrow, .hc-bold, .hc-intro"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      [...lead, ...lines, ...dots].forEach((el) => el.classList.add("on"));
      return;
    }

    sec.classList.add("js-reveal");
    const timers: ReturnType<typeof setTimeout>[] = [];
    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played) return;
          played = true;
          io.disconnect();
          lead.forEach((el, i) => timers.push(setTimeout(() => el.classList.add("on"), i * 110)));
          lines.forEach((el, i) =>
            timers.push(
              setTimeout(() => {
                el.classList.add("on");
                if (dots[i]) dots[i].classList.add("on");
              }, 300 + i * 240)
            )
          );
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(sec);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="band light" id="why-stack" aria-label="Why one team beats six vendors">
      <div className="hc-stick">
        <div className="wrap hc-inner">
          <div className="hc-grid">
            <div className="hc-left">
              <span className="eyebrow">— Why one team beats six vendors</span>
              <h2 className="hc-bold">
                Right now, you&apos;re the one <span className="kw">holding it all together</span>.
              </h2>
              <div className="hc-progress" aria-hidden="true">
                <span className="pd"></span>
                <span className="pd"></span>
                <span className="pd"></span>
              </div>
            </div>
            <div className="hc-right">
              <p className="hc-intro">
                Most business owners don&apos;t plan a fragmented setup. It just happens — one person
                builds the website, someone else runs the ads, another handles design and social.
                Then the job of tying it all together lands on you.
              </p>
              <div className="hc-lines">
                {LINES.map((line) => (
                  <p key={line.kw} className="hc-line">
                    <span className="kw">{line.kw}</span> {line.rest}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
