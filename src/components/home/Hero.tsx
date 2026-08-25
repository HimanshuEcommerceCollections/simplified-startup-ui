"use client";

import { useEffect, useRef } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { openAiAdvisor } from "@/components/layout/FloatingActions";
import "./hero.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const reduce = useReducedMotion();

  // Pause the background video for reduced-motion users
  useEffect(() => {
    if (reduce && videoRef.current) {
      videoRef.current.removeAttribute("autoplay");
      videoRef.current.pause();
    }
  }, [reduce]);

  // Mouse-follow radial light (smooth lerp)
  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow || reduce) return;
    let tx = 50, ty = 40, cx = 50, cy = 40;
    let raf: number | null = null;

    function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow!.style.setProperty("--mx", `${cx.toFixed(2)}%`);
      glow!.style.setProperty("--my", `${cy.toFixed(2)}%`);
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }
    function onMove(e: PointerEvent) {
      const r = hero!.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(loop);
    }
    hero.addEventListener("pointermove", onMove);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section className="hero" id="main" ref={heroRef}>
      <div className="hero-glow" ref={glowRef} aria-hidden="true"></div>
      <div className="hero-inner">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-video-frame">
            <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="auto">
              <source src="/assets/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="hero-card-wrap">
          <div className="hero-card">
            <span className="hero-eyebrow">One partner. Every step.</span>
            <h1>
              <span className="h-line">
                <span>Everything your</span>
              </span>
              <span className="h-line">
                <span>startup&nbsp;needs.</span>
              </span>
            </h1>
            <p className="sub">
              Your startup team — without building one. Founders usually coordinate a dozen
              specialists; we bring strategy, brand, product, engineering, and growth together under
              one trusted operating partner — from first idea to scale.
            </p>
            <div className="hero-cta">
              <a href="#book" ref={primaryRef} className="btn-primary magnetic">
                Book a Strategy Call
              </a>
              <button type="button" className="btn-ghost-hero" onClick={openAiAdvisor}>
                Talk to AI Advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
