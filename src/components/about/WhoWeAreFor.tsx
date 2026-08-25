"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import "./who-we-are-for.css";

const CARDS = [
  {
    badge: "FF",
    pill: "Starting out",
    title: "First-time founders",
    meta: "Idea to first customers",
    desc: "Turning a first idea into a real, working business — with a team that's done it before.",
  },
  {
    badge: "SB",
    pill: "Established",
    title: "Small-business owners",
    meta: "Great at the craft, short on time",
    desc: "The plumber, the shop, the studio — great at the craft, short on time for the rest.",
  },
  {
    badge: "RG",
    pill: "Scaling",
    title: "Owners ready to grow",
    meta: "Past the early days",
    desc: "Past the early days and wanting to scale without hiring a department for every need.",
  },
  {
    badge: "FG",
    pill: "Partial team",
    title: "Anyone filling a gap",
    meta: "One piece missing",
    desc: "A marketer but no designer, a builder but no strategist — we cover what you're missing.",
  },
];

/**
 * The swipeable card deck is driven imperatively (ported from the design's
 * script) — the transient transition-suppression classes and drag transforms
 * don't map cleanly onto declarative state.
 */
export default function WhoWeAreFor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const deck = root.querySelector<HTMLElement>(".jrd-deck")!;
    const cards = Array.from(deck.querySelectorAll<HTMLElement>(".jrd-card"));
    const dots = Array.from(root.querySelectorAll<HTMLElement>(".jrd-dot"));
    const prevB = root.querySelector<HTMLButtonElement>('[data-jrd="prev"]')!;
    const nextB = root.querySelector<HTMLButtonElement>('[data-jrd="next"]')!;
    const n = cards.length;
    let cur = 0;
    let busy = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function layout() {
      cards.forEach((c, idx) => {
        const k = (idx - cur + n) % n;
        c.style.setProperty("--k", String(k));
        c.style.zIndex = String(n - k);
        c.classList.toggle("is-top", k === 0);
        c.setAttribute("aria-hidden", k === 0 ? "false" : "true");
        c.tabIndex = k === 0 ? 0 : -1;
      });
      dots.forEach((d, idx) => d.setAttribute("aria-current", idx === cur ? "true" : "false"));
    }

    function next() {
      if (busy) return;
      busy = true;
      const out = cards[cur];
      cur = (cur + 1) % n;
      out.classList.add("is-out");
      layout();
      timers.push(
        setTimeout(
          () => {
            out.classList.add("nt-tf");
            out.classList.remove("is-out");
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                out.classList.remove("nt-tf");
                busy = false;
              });
            });
          },
          reduce ? 0 : 480
        )
      );
    }

    function prev() {
      if (busy) return;
      busy = true;
      const inc = cards[(cur - 1 + n) % n];
      inc.classList.add("nt-all", "is-out");
      cur = (cur - 1 + n) % n;
      layout();
      requestAnimationFrame(() => {
        inc.classList.remove("nt-all");
        requestAnimationFrame(() => {
          inc.classList.remove("is-out");
          timers.push(setTimeout(() => (busy = false), reduce ? 0 : 480));
        });
      });
    }

    function goTo(idx: number) {
      if (idx === cur || busy) return;
      if ((idx - cur + n) % n === 1) next();
      else if ((cur - idx + n) % n === 1) prev();
      else {
        cur = idx;
        layout();
      }
    }

    const onNext = () => next();
    const onPrev = () => prev();
    nextB.addEventListener("click", onNext);
    prevB.addEventListener("click", onPrev);
    const dotHandlers = dots.map((d, idx) => {
      const h = () => goTo(idx);
      d.addEventListener("click", h);
      return h;
    });

    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Enter" || e.key === " ") {
        const t = e.target as HTMLElement;
        if (t.classList && t.classList.contains("jrd-card")) {
          e.preventDefault();
          next();
        }
      }
    }
    deck.addEventListener("keydown", onKeyDown);

    /* drag to swipe */
    let sx = 0, sy = 0, dx = 0;
    let dragging = false;
    let card: HTMLElement | null = null;

    function release(cancel: boolean) {
      if (!dragging || !card) return;
      dragging = false;
      const c = card;
      const moved = dx;
      c.classList.remove("is-drag");
      c.style.transform = "";
      c.style.opacity = "";
      card = null;
      if (cancel) return;
      if (moved > 70) next();
      else if (moved < -70) prev();
      else if (Math.abs(moved) < 6) next(); /* a tap advances the deck */
    }
    function onPointerDown(e: PointerEvent) {
      if (busy || reduce) return;
      const target = e.target as HTMLElement;
      card = target.closest ? target.closest<HTMLElement>(".jrd-card.is-top") : null;
      if (!card) return;
      if (target.closest("a,button")) return;
      dragging = true;
      dx = 0;
      sx = e.clientX;
      sy = e.clientY;
      card.classList.add("is-drag");
      try {
        card.setPointerCapture(e.pointerId);
      } catch {}
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging || !card) return;
      dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dy) > Math.abs(dx) * 1.6 && Math.abs(dy) > 18) {
        release(true);
        return;
      }
      card.style.transform = `translate(${dx}px,${dy * 0.18}px) rotate(${dx * 0.045}deg)`;
      card.style.opacity = String(Math.max(0.25, 1 - Math.abs(dx) / 460));
    }
    const onPointerUp = () => release(false);
    const onPointerCancel = () => release(true);
    deck.addEventListener("pointerdown", onPointerDown);
    deck.addEventListener("pointermove", onPointerMove);
    deck.addEventListener("pointerup", onPointerUp);
    deck.addEventListener("pointercancel", onPointerCancel);

    layout();

    return () => {
      timers.forEach(clearTimeout);
      nextB.removeEventListener("click", onNext);
      prevB.removeEventListener("click", onPrev);
      dots.forEach((d, idx) => d.removeEventListener("click", dotHandlers[idx]));
      deck.removeEventListener("keydown", onKeyDown);
      deck.removeEventListener("pointerdown", onPointerDown);
      deck.removeEventListener("pointermove", onPointerMove);
      deck.removeEventListener("pointerup", onPointerUp);
      deck.removeEventListener("pointercancel", onPointerCancel);
    };
  }, []);

  return (
    <section className="band" id="who" aria-label="Who we're for">
      <div className="wrap">
        <div className="jrd" ref={rootRef}>
          <div className="jrd-copy">
            <Reveal className="sec-head">
              <span className="eyebrow">Who we&apos;re for</span>
              <h2 className="ab-h2">For the people actually building the business.</h2>
              <p className="sec-lead">
                If you&apos;re building something real and could use expertise in the areas you
                don&apos;t live in, you&apos;re who we built this for.
              </p>
            </Reveal>
            <div className="jrd-nav">
              <button className="jr-arw" type="button" data-jrd="prev" aria-label="Previous">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="jr-arw is-next" type="button" data-jrd="next" aria-label="Next">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="jrd-dots">
                {CARDS.map((card, idx) => (
                  <button
                    key={card.title}
                    className="jrd-dot"
                    type="button"
                    aria-current={idx === 0}
                    aria-label={`Show ${card.title}`}
                  ></button>
                ))}
              </div>
            </div>
            <p className="jrd-hint">Drag a card, or use the arrows</p>
          </div>

          <div className="jrd-deck" aria-live="polite">
            {CARDS.map((card, idx) => (
              <article
                key={card.title}
                className={`jrd-card${idx === 0 ? " is-top" : ""}`}
                style={{ "--k": idx } as React.CSSProperties}
                tabIndex={idx === 0 ? 0 : -1}
                aria-hidden={idx !== 0}
              >
                <div className="jrd-head">
                  <span className="jrd-badge" aria-hidden="true">
                    {card.badge}
                  </span>
                  <span className="jrd-pill">{card.pill}</span>
                  <span className="jrd-ix" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
                  </span>
                </div>
                <h3>{card.title}</h3>
                <p className="jrd-meta">{card.meta}</p>
                <div className="jrd-rule" aria-hidden="true"></div>
                <p className="jrd-desc">{card.desc}</p>
                <a className="jrd-go" href="#book">
                  Book a strategy call <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
