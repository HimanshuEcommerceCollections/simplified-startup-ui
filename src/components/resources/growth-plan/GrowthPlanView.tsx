"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { useInView } from "@/lib/useInView";
import { usePointerSpot } from "@/lib/usePointerSpot";
import GpPlanCard from "./GpPlanCard";
import "./growth-plan-page.css";

const CHECK = (
  <svg className="gp-ck" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

const PLAN_ITEMS: ReactNode[] = [
  <>
    The services we&apos;d recommend, <strong>named and scoped</strong>
  </>,
  <>
    The <strong>fixed price</strong> of each one
  </>,
  <>
    The <strong>order</strong> we&apos;d run them in
  </>,
  <>
    <strong>What to skip</strong> for now, and why
  </>,
];

const STEPS = [
  {
    h: "Fill in the form",
    p: "Two minutes. No prep, no deck, no tidy numbers needed. Not sure what you need? Pick “not sure yet” — that's what the plan is for.",
  },
  {
    h: "A 45-minute session",
    p: "On video, with a senior team member — not a sales rep. We ask how the business makes money, who your best customer is, what you've tried, and what a good year looks like.",
  },
  {
    h: "Your plan, in writing",
    p: "One email, one attachment. Recommendations, prices, sequence with dates, and the quality checklist our work has to pass. Then the next move is yours.",
  },
];

const GETS = [
  { ico: "$", h: "Named services", p: "No “from” pricing, no mystery hours." },
  { ico: "→", h: "A dated sequence", p: "First, next, later — with real dates." },
  { ico: "−", h: "A skip list", p: "What not to pay for yet." },
  { ico: "14", h: "Our quality bar", p: "The 14 points every deliverable must pass." },
  { ico: "?", h: "An honest fit call", p: "If we're wrong for you, the plan says so." },
];

const SERVICES = [
  { h: "Launch your business", p: "Idea to open. Business plan, entity setup, brand, and the first paying customers.", when: "Usually when the idea is solid but nothing is registered or built yet." },
  { h: "A website that sells", p: "Design and build, engineered to convert rather than just look current.", when: "Usually when traffic arrives but doesn't turn into enquiries — or there's no site at all." },
  { h: "Automate the busywork", p: "Data entry, follow-ups, reporting, handoffs between tools — handled.", when: "Usually when you can name the task you do every week and hate every week." },
  { h: "Fill your pipeline", p: "Qualified prospects researched, verified, and delivered ready to contact.", when: "Usually when you can close well but run out of people to talk to." },
  { h: "Hiring help", p: "Sourcing, screening, and onboarding run for you — interview a shortlist, not a stack.", when: "Usually when the bottleneck is you, and the fix is another pair of hands." },
  { h: "Bookkeeping", p: "Clean monthly financials, closed on time, in a format you can actually read.", when: "Usually when you're guessing at margins or dreading tax season." },
];

const STAGES = [
  {
    k: "Pre-launch",
    p: "Nothing's live yet, and the risk is spending in the wrong order. Your plan leans on sequence — what to set up first, what to postpone until money comes in, and what to skip. Most pre-launch founders are being sold things they don't need for another year.",
  },
  {
    k: "Early revenue",
    p: "Customers exist, but growth feels accidental rather than repeatable. Your plan focuses on making what already works happen on purpose — usually the path from stranger to customer, and where it leaks.",
  },
  {
    k: "Established & stuck",
    p: "Revenue is steady, but the business has stopped moving. Your plan goes after the bottleneck — nine times out of ten it's pipeline, delivery capacity, or hours vanishing into work nobody should do by hand.",
  },
];

const FAQS = [
  { q: "Is the plan really free? What's the catch?", a: "No card, no invoice, no obligation. The catch is plain self-interest: some founders read their plan and ask us to run it. The rest keep a document worth keeping. That's a trade we're happy with." },
  { q: "I haven't launched yet — is this for me?", a: "Yes. Pre-launch plans lean harder on sequence and on what to skip. Write “pre-launch” in the form and we'll build it that way." },
  { q: "Who will I actually be speaking to?", a: "Someone senior who does the work — not a sales rep with a script. That's why it's a conversation rather than a qualification call." },
  { q: "How long does it take end to end?", a: "Two minutes on the form, 45 minutes in the session, and a few working days before the plan lands." },
  { q: "Do I need to prepare anything?", a: "No deck, no financials, no tidy numbers. If you have figures to hand they help, but the session works without them." },
  { q: "Do I have to buy anything afterwards?", a: "No. The plan is yours to act on yourself, sit on, or take to another firm. We send it once. The next step is yours." },
  { q: "What if you're not the right fit?", a: "Then the plan says so and points you at what is. A recommendation we don't believe in is worth less to us than a straight answer." },
  { q: "Will I end up on a mailing list?", a: "No spam, no drip campaign, no “just checking in” six weeks later." },
];

const d = (ms: number): CSSProperties => ({ "--d": ms } as CSSProperties);

export default function GrowthPlanView() {
  const [heroIn, setHeroIn] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const { sectionRef, spotRef } = usePointerSpot<HTMLElement, HTMLSpanElement>();
  const [stepsRef, stepsIn] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const svcGridRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const [formInViewRef, formIn] = useInView<HTMLElement>({ threshold: 0.14 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setHeroIn(true), reduce ? 0 : 110);
    return () => clearTimeout(t);
  }, []);

  // service cards: cursor spotlight (px) + gentle tilt, ported from the design
  useEffect(() => {
    const grid = svcGridRef.current;
    if (!grid) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".gp-svc"));
    const handlers = cards.map((card) => {
      function onMove(e: PointerEvent) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        card.style.transform = `translateY(-5px) rotateX(${((0.5 - py) * 4).toFixed(2)}deg) rotateY(${((px - 0.5) * 4).toFixed(2)}deg)`;
      }
      function onLeave() {
        card.style.transform = "";
      }
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return { card, onMove, onLeave };
    });
    return () =>
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
  }, []);

  // form card sheen follows the pointer
  useEffect(() => {
    const wrap = formWrapRef.current;
    if (!wrap) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    function onMove(e: PointerEvent) {
      const r = wrap!.getBoundingClientRect();
      wrap!.style.setProperty("--cx", `${((e.clientX - r.left) / r.width) * 100}%`);
      wrap!.style.setProperty("--cy", `${((e.clientY - r.top) / r.height) * 100}%`);
    }
    wrap.addEventListener("pointermove", onMove);
    return () => wrap.removeEventListener("pointermove", onMove);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const next = { name: !name, email: !emailOk };
    setErrors(next);
    if (next.name || next.email) {
      (form.elements.namedItem(next.name ? "name" : "email") as HTMLInputElement).focus();
      return;
    }
    setSubmitted(true);
  }

  return (
    <>
      {/* 1 · HERO */}
      <section className={`gp-hero${heroIn ? " in" : ""}`} id="top" ref={sectionRef}>
        <div className="gp-hero-bg" aria-hidden="true"></div>
        <span className="gp-cursor" ref={spotRef} aria-hidden="true"></span>
        <div className="wrap">
          <div className="gp-hero-inner">
            <div className="gp-hero-copy">
              <span className="eyebrow gp-tag">Free growth plan</span>
              <h1 className="gp-h1" aria-label="Get a free growth plan built around your business.">
                <span className="gp-mask">
                  <i>Get a free growth plan</i>
                </span>
                <span className="gp-mask">
                  <i>
                    built around <span className="grad-text">your business.</span>
                  </i>
                </span>
              </h1>
              <p className="gp-lead">
                A short conversation, then a written plan you keep — <strong>whether you hire us or not.</strong>
              </p>
              <div className="gp-hero-actions">
                <a className="btn btn-primary" href="#request">
                  Request my free growth plan <span className="arw">↗</span>
                </a>
                <a className="btn btn-ghost" href="#how">
                  How it works
                </a>
              </div>
              <div className="gp-nos">
                <span className="gp-no">
                  <b>×</b> No retainer first
                </span>
                <span className="gp-no">
                  <b>×</b> No invoice after
                </span>
                <span className="gp-no">
                  <b>×</b> No follow-up sequence
                </span>
              </div>
            </div>
            <div className="gp-hero-card">
              <GpPlanCard />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · WHAT THE PLAN IS */}
      <section className="band gp-what" id="what">
        <div className="wrap">
          <div className="gp-split">
            <Reveal className="sec-head gp-split-l">
              <span className="eyebrow">What the plan is</span>
              <h2>One page, written for your business.</h2>
              <p>
                By the person you spoke with — not a template. Short on purpose. A forty-page deck is easy to make and
                hard to use.
              </p>
            </Reveal>
            <ul className="gp-list gp-split-r">
              {PLAN_ITEMS.map((item, i) => (
                <Reveal as="li" className="gp-li" key={i} style={d(i * 90)}>
                  {CHECK}
                  <p>{item}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · HOW IT WORKS */}
      <section className="band tint gp-how" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps. Then the next move is yours.</h2>
            <p>Two minutes on the form, forty-five in a session, a few working days for the plan. We don&apos;t chase.</p>
          </Reveal>
          <div className={`gp-steps${stepsIn ? " in" : ""}`} ref={stepsRef}>
            <div className="gp-line-track" aria-hidden="true">
              <span className="gp-line-fill"></span>
            </div>
            {STEPS.map((step, i) => (
              <Reveal className="gp-stepcard" key={step.h} style={d(i * 140)}>
                <span className="gp-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.h}</h3>
                <p>{step.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · WHAT YOU GET BACK */}
      <section className="band gp-get" id="get">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you get back</span>
            <h2>Everything you need to decide — nothing you don&apos;t.</h2>
          </Reveal>
          <div className="gp-get-grid">
            {GETS.map((get, i) => (
              <Reveal className="gp-getcard" key={get.h} style={d(i * 80)}>
                <span className="gp-getico">{get.ico}</span>
                <h3>{get.h}</h3>
                <p>{get.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · WHERE PLANS USUALLY LEAD */}
      <section className="band tint gp-services" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Where plans usually lead</span>
            <h2>Six services. Fixed scope, published prices.</h2>
            <p>Nothing quoted by the hour. Most plans recommend two or three — rarely all six at once.</p>
          </Reveal>
          <div className="gp-svc-grid" ref={svcGridRef}>
            {SERVICES.map((svc, i) => (
              <Reveal as="article" className="gp-svc" key={svc.h} style={d(i * 80)}>
                <span className="gp-svc-mx"></span>
                <h3>{svc.h}</h3>
                <p>{svc.p}</p>
                <span className="gp-when">{svc.when}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · WHY IT'S FREE */}
      <section className="band dark gp-free" id="free">
        <div className="gp-free-glow" aria-hidden="true"></div>
        <div className="wrap">
          <Reveal className="gp-free-inner">
            <span className="eyebrow">Why it&apos;s free</span>
            <h2 style={{ color: "#fff" }}>Openly self-interested.</h2>
            <p>
              Some founders read their plan and ask us to run it. That only works if the plan is good on its own.
              Everyone else keeps a document worth keeping.
            </p>
            <p className="gp-free-kicker">Thin free advice costs us more than none.</p>
          </Reveal>
        </div>
      </section>

      {/* 7 · WHATEVER STAGE */}
      <section className="band gp-stage" id="stage">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Whatever stage you&apos;re at</span>
            <h2>The process doesn&apos;t change. The emphasis does.</h2>
          </Reveal>
          <div className="gp-stage-grid">
            {STAGES.map((stage, i) => (
              <Reveal as="article" className="gp-stagecard" key={stage.k} style={d(i * 120)}>
                <span className="gp-stage-k">{stage.k}</span>
                <p>{stage.p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="gp-stage-note">
            Not sure which one you are? That&apos;s fine — say so in the form. Placing you is part of the session, not
            something you need to work out first.
          </Reveal>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section className="band tint gp-faq" id="faq">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Frequently asked</span>
            <h2>The straight answers.</h2>
          </Reveal>
          <Reveal className="gp-acc">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div className={`gp-item${open ? " open" : ""}`} key={faq.q}>
                  <button className="gp-summary" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
                    <span>{faq.q}</span>
                    <span className="gp-chev" aria-hidden="true"></span>
                  </button>
                  {open && (
                    <div className="gp-a">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* 9 · REQUEST */}
      <section className="band gp-request" id="request" ref={formInViewRef}>
        <div className="wrap">
          <div className={`gp-form-wrap reveal${formIn ? " in" : ""}`} ref={formWrapRef}>
            <>
              <span className="gp-form-sheen" aria-hidden="true"></span>
              <div className="gp-form-grid">
                <div className="gp-form-copy">
                  <span className="eyebrow" style={{ color: "#a7f3ea" }}>
                    Request your plan
                  </span>
                  <h2>Two minutes now. A plan you keep.</h2>
                  <p>
                    Forty-five in a session, then a written plan lands in a few working days. No spam, no drip campaign,
                    no “just checking in.” <strong>A real person replies to book a time.</strong>
                  </p>
                  <ul className="gp-form-assure">
                    <li>A one-page plan, written for you</li>
                    <li>Named services &amp; fixed prices</li>
                    <li>Yours to keep — hire us or not</li>
                  </ul>
                </div>

                <form className="gp-form" noValidate onSubmit={onSubmit}>
                  <div className="gp-field">
                    <label htmlFor="gpName">Your name</label>
                    <input
                      id="gpName"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Founder"
                      required
                      className={errors.name ? "err" : undefined}
                      onInput={() => setErrors((prev) => ({ ...prev, name: false }))}
                    />
                  </div>
                  <div className="gp-field">
                    <label htmlFor="gpEmail">Email</label>
                    <input
                      id="gpEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      required
                      className={errors.email ? "err" : undefined}
                      onInput={() => setErrors((prev) => ({ ...prev, email: false }))}
                    />
                  </div>
                  <div className="gp-field">
                    <label htmlFor="gpBiz">
                      Business or website <span>(optional)</span>
                    </label>
                    <input id="gpBiz" name="business" type="text" placeholder="company.com" />
                  </div>
                  <div className="gp-field">
                    <label htmlFor="gpStage">What stage are you at?</label>
                    <select id="gpStage" name="stage" defaultValue="early">
                      <option value="pre-launch">Pre-launch — nothing live yet</option>
                      <option value="early">Early revenue — growing, but accidental</option>
                      <option value="established">Established &amp; stuck</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="gp-field">
                    <label htmlFor="gpNeed">What do you think you need?</label>
                    <select id="gpNeed" name="need" defaultValue="not-sure">
                      <option value="not-sure">Not sure yet — that&apos;s what the plan is for</option>
                      <option>Launch your business</option>
                      <option>A website that sells</option>
                      <option>Automate the busywork</option>
                      <option>Fill your pipeline</option>
                      <option>Hiring help</option>
                      <option>Bookkeeping</option>
                    </select>
                  </div>
                  <div className="gp-field">
                    <label htmlFor="gpMsg">
                      Anything useful to know? <span>(optional)</span>
                    </label>
                    <textarea
                      id="gpMsg"
                      name="message"
                      rows={3}
                      placeholder="How the business makes money, what you've tried, what a good year looks like…"
                    ></textarea>
                  </div>
                  <button className="btn btn-primary gp-submit" type="submit">
                    Request my free growth plan <span className="arw">↗</span>
                  </button>
                  <p className="gp-form-fine">No card. No obligation. We send the plan once — the next step is yours.</p>

                  {submitted && (
                    <div className="gp-success" role="status">
                      <svg className="gp-succ-check" viewBox="0 0 24 24">
                        <path d="M4 12.5l5 5L20 6" />
                      </svg>
                      <h3>Request received.</h3>
                      <p>A real person will reply to book your 45-minute session. Check your inbox — no spam, promise.</p>
                    </div>
                  )}
                </form>
              </div>
            </>
          </div>
        </div>
      </section>
    </>
  );
}
