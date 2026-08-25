"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { useMagnetic } from "@/lib/useMagnetic";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { openAiAdvisor } from "@/components/layout/FloatingActions";
import "./cta-band.css";

export default function CtaBand() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce && videoRef.current) {
      videoRef.current.removeAttribute("autoplay");
      videoRef.current.pause();
    }
  }, [reduce]);

  return (
    <section className="cta-home" id="book">
      <video ref={videoRef} className="cta-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="/assets/videos/cta-background.mp4" type="video/mp4" />
      </video>
      <Reveal className="wrap">
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Your next step
        </span>
        <h2>The growth team you can&apos;t afford to hire — for the price you can.</h2>
        <p>
          Book a free consultation and we&apos;ll map the fastest path from where you are to real
          traction. No decks, no pressure.
        </p>
        <div className="cta-actions">
          <a href="#book" ref={primaryRef} className="btn btn-primary magnetic">
            Book a free consultation <span className="arw">↗</span>
          </a>
          <button type="button" className="btn btn-ghost-dark" onClick={openAiAdvisor}>
            Try the AI Advisor
          </button>
        </div>
      </Reveal>
    </section>
  );
}
