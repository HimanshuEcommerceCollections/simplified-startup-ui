"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaCard from "@/components/resources/CtaCard";
import { useInView } from "@/lib/useInView";
import { usePointerSpot } from "@/lib/usePointerSpot";
import { useTiltCards } from "@/lib/useTilt";
import RoleCard from "./RoleCard";
import DodTracker from "./DodTracker";
import { ROLES } from "./careers-data";
import "./careers-page.css";

const FEATURES: { icon: ReactNode; h: string; p: ReactNode }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3 3 8v8l9 5 9-5V8l-9-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 12v9M3 8l9 4 9-4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    h: "Real ownership",
    p: (
      <>
        You own whole projects end to end, not slivers of someone else&apos;s. <strong>Your name is on the work.</strong>
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 5.2A3.4 3.4 0 0 1 18 11m3 9c0-2.5-1.5-4.7-3.7-5.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    h: "Senior peers",
    p: (
      <>
        Everyone here has done the work before. You&apos;ll learn fast from <strong>people who ship, not manage.</strong>
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    h: "Remote, always",
    p: (
      <>
        Work from anywhere, on your schedule — a US + India team that keeps <strong>client hours, not office hours.</strong>
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 19V5M4 19h16M8 15l4-5 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    h: "Output over optics",
    p: (
      <>
        Measured by outcomes, not hours online. <strong>Ship good work</strong> and the rest takes care of itself.
      </>
    ),
  },
];

const DOD_ROWS = [
  { p: "Clear scope and a written definition of done", s: "You always know what “finished” means before you start." },
  { p: "Two revision rounds, honest feedback", s: "No endless spinning — we get to done and move on." },
  { p: "Direct communication over meetings", s: "We write things down so nobody's ever blocked waiting on a call." },
  { p: "Your growth is scoped like a project", s: "Real feedback, real progression, no politics." },
];

const TRAITS: ReactNode[] = [
  <>
    <strong>Senior in skill or hungry to get there fast</strong> — and honest about which.
  </>,
  <>
    A self-starter who needs <strong>a goal, not a babysitter.</strong>
  </>,
  <>
    Clear in writing and <strong>calm under a deadline.</strong>
  </>,
  <>
    Allergic to fluff — you&apos;d rather <strong>ship than posture.</strong>
  </>,
];

const PROCESS = [
  { h: "Apply", p: "A short form and your work — no cover-letter theatre." },
  { h: "Intro call", p: "30 minutes on you, the role, and how we work." },
  { h: "Paid work sample", p: "A small, real, paid task — because talk is cheap and work isn't." },
  { h: "Offer", p: "A clear offer, fast. If it's a no, you'll hear that too — quickly." },
];

export default function CareersView() {
  const [heroIn, setHeroIn] = useState(false);
  const { sectionRef, spotRef } = usePointerSpot<HTMLElement, HTMLSpanElement>();
  const featGridRef = useTiltCards<HTMLDivElement>();
  const [wtRef, wtIn] = useInView<HTMLElement>({ threshold: 0.28 });
  const wtSpot = useRef<HTMLDivElement>(null);
  const [procRef, procIn] = useInView<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setHeroIn(true), reduce ? 0 : 260);
    return () => clearTimeout(t);
  }, []);

  // "Who thrives" cursor spotlight tracks over the whole section
  useEffect(() => {
    const section = wtRef.current;
    if (!section) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    function onMove(e: PointerEvent) {
      const r = section!.getBoundingClientRect();
      if (wtSpot.current) {
        wtSpot.current.style.left = `${e.clientX - r.left}px`;
        wtSpot.current.style.top = `${e.clientY - r.top}px`;
      }
    }
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, [wtRef]);

  return (
    <>
      {/* HERO */}
      <section className="cr-hero" id="top" ref={sectionRef}>
        <div className="cr-grid-bg"></div>
        <span className="cr-cursor" ref={spotRef}></span>
        <div className="wrap">
          <div className="cr-hero-inner">
            <div className="cr-hero-copy">
              <span className="eyebrow cr-hero-tag">Careers at Simplified Startup</span>
              <h1 className="cr-h1">
                <span className={`cr-mask${heroIn ? " in" : ""}`}>
                  <span className="mri">Do the best work</span>
                </span>
                <span className={`cr-mask${heroIn ? " in" : ""}`} style={{ transitionDelay: "150ms" } as CSSProperties}>
                  <span className="mri" style={heroIn ? { transitionDelay: "150ms" } : undefined}>
                    of your <span className="grad-text">career.</span>
                  </span>
                </span>
              </h1>
              <p className="cr-lead">
                We&apos;re a senior, remote team that builds and grows real startups —{" "}
                <strong>no bloat, no busywork, no black box.</strong> If you&apos;d rather own outcomes than sit in
                status meetings, you&apos;ll fit right in.
              </p>
              <div className="cr-actions">
                <a className="btn btn-primary" href="#roles">
                  See open roles <span className="arw">↗</span>
                </a>
                <a className="btn btn-ghost" href="#apply">
                  Send a general application
                </a>
              </div>
              <div className="cr-meta">
                <span className="hm">
                  <span className="d"></span> Remote — US + India
                </span>
                <span className="hm">
                  <span className="d"></span> Senior peers only
                </span>
                <span className="hm">
                  <span className="d"></span> Output over optics
                </span>
              </div>
            </div>
            <RoleCard />
          </div>
        </div>
      </section>

      {/* WHY WORK HERE */}
      <section className="band tint" id="why">
        <div className="wrap" ref={featGridRef}>
          <Reveal className="sec-head">
            <span className="eyebrow">Why work here</span>
            <h2>Small team. Real ownership. Zero bureaucracy.</h2>
            <p>Four reasons people join us — and stay.</p>
          </Reveal>
          <div className="feat-grid">
            {FEATURES.map((feat, i) => (
              <Reveal as="article" className="feat" key={feat.h} data-tilt style={{ "--d": i % 2 === 1 ? 80 : 0 } as CSSProperties}>
                <span className="feat-spot"></span>
                <div className="fi">{feat.icon}</div>
                <h3>{feat.h}</h3>
                <p>{feat.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="band" id="work">
        <div className="wrap">
          <div className="dw-grid">
            <div className="dw-main">
              <Reveal className="sec-head">
                <span className="eyebrow">How we work</span>
                <h2>The way we operate.</h2>
                <p>The same open-file principles we sell clients, applied to how we run the team.</p>
              </Reveal>
              <Reveal className="dod">
                {DOD_ROWS.map((row) => (
                  <div className="dod-row" key={row.p}>
                    <span className="ck">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p>
                      {row.p}
                      <span>{row.s}</span>
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
            <DodTracker />
          </div>
        </div>
      </section>

      {/* WHO THRIVES HERE */}
      <section className={`wt-hire${wtIn ? " wt-in" : ""}`} id="hire" ref={wtRef}>
        <div className="wt-grid" aria-hidden="true"></div>
        <div className="wt-aurora a1" aria-hidden="true"></div>
        <div className="wt-aurora a2" aria-hidden="true"></div>
        <div className="wt-spot" ref={wtSpot} aria-hidden="true"></div>

        <div className="wt-wrap">
          <div className="wt-head">
            <span className="wt-eyebrow">
              <span className="wt-live-dot"></span>
              Live · Who we hire
              <span className="wt-eq" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </span>
            <h2 className="wt-title" aria-label="Who thrives here.">
              {["Who", "thrives"].map((word, i) => (
                <span key={word}>
                  <span className="wt-w" style={{ "--wd": `${120 + i * 130}ms` } as CSSProperties}>
                    <i>{word}</i>
                  </span>{" "}
                </span>
              ))}
              <span className="wt-w" style={{ "--wd": "380ms" } as CSSProperties}>
                <i>
                  here<span className="wt-accent">.</span>
                </i>
              </span>
            </h2>
            <p className="wt-sub">We hire for judgment and drive over pedigree. You&apos;ll do well if you&apos;re:</p>
          </div>

          <div className="wt-panel">
            <ul className="wt-traits">
              <div className="wt-scanline" aria-hidden="true"></div>
              {TRAITS.map((trait, i) => (
                <li className="wt-trait" style={{ "--i": i } as CSSProperties} key={i}>
                  <span className="wt-tn">{String(i + 1).padStart(2, "0")}</span>
                  <p>{trait}</p>
                </li>
              ))}
            </ul>

            <aside className="wt-notfor">
              <span className="wt-nf-label">
                <span className="wt-warn"></span> Not for you if
              </span>
              <p>
                You want a big-company ladder, rigid 9-to-5s, or work you can hide behind. <strong>That&apos;s not us.</strong>
              </p>
              <div className="wt-ecg" aria-hidden="true">
                <svg viewBox="0 0 320 44" preserveAspectRatio="none">
                  <path d="M0,22 L60,22 L72,22 L80,8 L90,36 L100,22 L120,22 L128,15 L136,29 L144,22 L175,22 L320,22" />
                </svg>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="band" id="roles">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Open roles</span>
            <h2>Open roles.</h2>
          </Reveal>
          <Reveal as="p" className="roles-intro">
            Hiring across the stack. Don&apos;t see your exact role? <strong>Send a general application</strong> — we
            make room for great people.
          </Reveal>

          <Reveal className="role-list">
            {ROLES.map((role) => (
              <a className="role" href="#apply" key={role.title}>
                <div className="role-main">
                  <div className="role-head">
                    <span className="role-title">{role.title}</span>
                    <span className="role-pill">Remote</span>
                    <span className="role-pill type">{role.type}</span>
                  </div>
                  <p className="role-desc">{role.desc}</p>
                </div>
                <span className="role-go">
                  Apply <span className="arw">↗</span>
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="band tint" id="process">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our hiring process</span>
            <h2>Four steps. About two weeks.</h2>
            <p>No ghosting, no ten-round gauntlet. You&apos;ll always know where you stand.</p>
          </Reveal>

          <div className={`proc reveal${procIn ? " in" : ""}`} ref={procRef}>
            <span className="proc-line"></span>
            {PROCESS.map((step, i) => (
              <article className="pstep" key={step.h}>
                <div className="pnum">{String(i + 1).padStart(2, "0")}</div>
                <h3>{step.h}</h3>
                <p>{step.p}</p>
              </article>
            ))}
          </div>
          <Reveal as="p" className="proc-note">
            <strong>You&apos;ll always know where you stand</strong> — every step, in plain language.
          </Reveal>
        </div>
      </section>

      <CtaCard
        eyebrow="Join the team"
        heading="Think you'd fit? Show us."
        solid={{ label: "See open roles", href: "#roles" }}
        line={{ label: "Send a general application", href: "#apply", arrow: "↗" }}
        id="apply"
      >
        Pick a role, or send a general application with the best thing you&apos;ve built.{" "}
        <strong>We read every one.</strong>
      </CtaCard>
    </>
  );
}
