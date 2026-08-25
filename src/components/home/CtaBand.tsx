"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { useMagnetic } from "@/lib/useMagnetic";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { openAiAdvisor } from "@/components/layout/FloatingActions";
import "./cta-band.css";

type CtaBandProps = {
  eyebrow?: string;
  heading?: string;
  copy?: string;
  primaryLabel?: string;
  /** When set, the secondary action renders as a link instead of the AI Advisor button. */
  secondary?: { label: string; href: string };
  /** Optional fine-print line under the actions. */
  fine?: string;
  /** When set, a still image replaces the background video. */
  bgImage?: string;
};

export default function CtaBand({
  eyebrow = "Your next step",
  heading = "The growth team you can't afford to hire — for the price you can.",
  copy = "Book a free consultation and we'll map the fastest path from where you are to real traction. No decks, no pressure.",
  primaryLabel = "Book a free consultation",
  secondary,
  fine,
  bgImage,
}: CtaBandProps) {
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
    <section className={`cta-home${bgImage ? " has-photo" : ""}`} id="book">
      {bgImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cta-bg" src={bgImage} alt="" aria-hidden="true" />
          <span className="cta-veil" aria-hidden="true"></span>
        </>
      ) : (
        <video ref={videoRef} className="cta-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src="/assets/videos/cta-background.mp4" type="video/mp4" />
        </video>
      )}
      <Reveal className="wrap">
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          {eyebrow}
        </span>
        <h2>{heading}</h2>
        <p>{copy}</p>
        <div className="cta-actions">
          <a href="#book" ref={primaryRef} className="btn btn-primary magnetic">
            {primaryLabel} <span className="arw">↗</span>
          </a>
          {secondary ? (
            <a href={secondary.href} className="btn btn-ghost-dark">
              {secondary.label}
            </a>
          ) : (
            <button type="button" className="btn btn-ghost-dark" onClick={openAiAdvisor}>
              Try the AI Advisor
            </button>
          )}
        </div>
        {fine && <p className="cta-fine">{fine}</p>}
      </Reveal>
    </section>
  );
}
