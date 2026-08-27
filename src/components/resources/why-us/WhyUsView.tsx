"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CtaCard from "@/components/resources/CtaCard";
import { usePointerSpot } from "@/lib/usePointerSpot";
import WhyUsInvoice from "./WhyUsInvoice";
import "./why-us-page.css";

const CHECK = (
  <svg className="wu-check" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);
const CHECK_SM = (
  <svg className="wu-check sm" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

const LEDGER = [
  {
    tag: "Published pricing",
    burn: "We were handed a $9,000 invoice for “strategy” that turned out to be a slide deck and a Loom video.",
    fix: (
      <>
        Every price and scope sits on the website, in public, <strong>before you talk to anyone.</strong>
      </>
    ),
  },
  {
    tag: "Senior on every account",
    burn: "A junior learned on a client's budget while the partner who sold the deal was never seen again.",
    fix: (
      <>
        A named senior specialist owns your account — and <strong>you meet them before you sign.</strong>
      </>
    ),
  },
  {
    tag: "You own everything",
    burn: "An agency held a domain, an ad account, and a year of analytics hostage on the way out.",
    fix: (
      <>
        Every asset lives in your name from day one, and <strong>leaving costs you nothing.</strong>
      </>
    ),
  },
  {
    tag: "Numbers-first reporting",
    burn: "Glossy monthly reports full of impressions and “engagement” carefully hid that nothing actually sold.",
    fix: (
      <>
        Reports open with <strong>the number that changes your bank balance.</strong>
      </>
    ),
  },
];

const CHECKLIST = [
  { h: "On the record", p: "Prices, scope, and the full 14-point quality bar are published on the site — before a sales call, not after one." },
  { h: "Checkable work", p: "Every deliverable clears a written definition of done. Read the checklist and hold the finished work up against it yourself." },
  { h: "Advice against our interest", p: "We'll tell you what to skip, what to delay until you have revenue, and when a cheaper route serves you better — even when it costs us the sale." },
  { h: "No hostage contracts", p: "A short initial term, then month to month. No auto-renew, no notice-period games, no exit fee. You stay because it's working." },
  { h: "See the thinking first", p: "The free growth plan is a real, written document you keep — so you can judge our thinking before any money changes hands." },
];

const LEVERS = [
  { h: "Flat, scoped pricing", p: "No hourly meter, so we're never paid to be slow or to pad the work. A fixed scope makes efficiency our problem, not your invoice." },
  { h: "We don't profit from your spend", p: "No percentage-of-ad-spend model, so we recommend the budget that works — not the one that inflates our cut." },
  { h: "Outcome over activity", p: "No booked-meeting or activity quotas, so we chase the outcome that helps your business instead of numbers that look busy." },
  { h: "Earn it every month", p: "Retainers renew monthly. Being worth keeping every single month is the whole business model — no long contract to coast on." },
];

const RISKS = [
  { h: "Free plan first", p: "You get the full plan — scope, price, and sequence — before committing a cent, and it's yours to keep whether you hire us or not." },
  { h: "We fix our own misses", p: "If a deliverable misses the brief, we re-brief and rebuild on our time. A third revision round is our error to absorb, never your line item." },
  { h: "Walk away clean", p: "Leave whenever, with every account, asset, and login intact. Nothing for us to claw back, nothing for you to rebuild." },
  { h: "No lock-in cushion", p: "We'd rather earn month two than lock in month one — so the incentive to keep the first month's work genuinely good is entirely on us." },
];

const TEAM = [
  { h: "One team, your hours", p: "A tight blend of US and international specialists who keep your business hours, not just their own time zone." },
  { h: "Operators, not theorists", p: "People who've built and run companies of their own — not career deck-writers. They've made the expensive mistakes already, on their own dime." },
  { h: "Same face throughout", p: "The specialist who scopes your work is the one who does it and reports on it. No handoff, no telephone game." },
  { h: "Named accountability", p: "Because the roster is small, everyone is accountable by name. There's nowhere for weak work to hide." },
];

const WINS = [
  { h: "Your metrics, not vanity", p: "Enquiries, booked calls, closed sales, clean books — the numbers that change your bank balance, not our portfolio." },
  { h: "The bad news too", p: "Reports name what didn't work and what changes next month, not just a highlight reel — including the parts we'd rather not show." },
  { h: "We'll cut our own scope", p: "If a channel isn't earning its keep, we'll recommend cutting it — even if it shrinks our scope — before you have to ask." },
  { h: "Tied to outcomes", p: "Every number ties back to a business outcome, so “good month” always means good for you, not just busy for us." },
];

const OBJECTIONS = [
  {
    q: "“You're too small.”",
    a: "Small means senior and accountable, not stretched thin. We take fewer clients on purpose and we'll tell you plainly when we're at capacity rather than overcommit.",
  },
  {
    q: "“No big-brand logos yet.”",
    a: "True — we're early, and we won't fake a wall of logos. But the pricing, the process, and the quality bar are all public and checkable today, which most established agencies still won't do.",
  },
  {
    q: "“Cheaper options exist.”",
    a: "Also true. We're not the cheapest; we're the most accountable. If the only goal is lowest price, a freelancer will beat us — and we'll say so honestly rather than pretend otherwise.",
  },
  {
    q: "“How do I know you'll deliver?”",
    a: "Fair worry — so we don't pretend. No guaranteed rankings or lead counts; those depend on your market and offer. We commit to the things we control and put them in writing.",
  },
];

function d(ms: number): CSSProperties {
  return { "--d": ms } as CSSProperties;
}

export default function WhyUsView() {
  const [heroIn, setHeroIn] = useState(false);
  const [openObjection, setOpenObjection] = useState(0);
  const [stampKey, setStampKey] = useState(0);
  const { sectionRef, spotRef } = usePointerSpot<HTMLElement, HTMLSpanElement>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setHeroIn(true), reduce ? 0 : 120);
    return () => clearTimeout(t);
  }, []);

  function selectObjection(i: number) {
    setOpenObjection(i);
    setStampKey((k) => k + 1); // restart the "Answered" stamp pop
  }

  return (
    <>
      {/* 1 · HERO */}
      <section className={`wu-hero${heroIn ? " in" : ""}`} id="top" ref={sectionRef}>
        <div className="wu-ledger-bg" aria-hidden="true"></div>
        <span className="wu-cursor" ref={spotRef} aria-hidden="true"></span>
        <div className="wrap">
          <div className="wu-hero-inner">
            <div className="wu-hero-copy">
              <span className="eyebrow wu-hero-tag">Why Simplified Startup</span>
              <h1 className="wu-h1" aria-label="We built the agency we wished we'd hired.">
                <span className="wu-mask">
                  <i>We built the agency</i>
                </span>
                <span className="wu-mask">
                  <i>
                    we <span className="grad-text">wished we&apos;d hired.</span>
                  </i>
                </span>
              </h1>
              <p className="wu-hero-lead">
                Everything here is a fix for something that burned us — as founders, and as operators.{" "}
                <strong>Full stop.</strong>
              </p>
              <div className="wu-hero-actions">
                <Link className="btn btn-primary" href="/#book">
                  Book a strategy call <span className="arw">↗</span>
                </Link>
                <a className="btn btn-ghost" href="#team">
                  Meet the team
                </a>
              </div>
            </div>
            <div className="wu-hero-card">
              <WhyUsInvoice />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · WHY WE EXIST — the ledger */}
      <section className="band wu-exist" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why we exist</span>
            <h2>Every rule here came from a bad experience elsewhere.</h2>
            <p>
              We didn&apos;t invent our principles at a strategy offsite. Each one replaces a specific thing that burns
              founders — and we&apos;ve been the burned founder more than once. The agency model is quietly broken for
              small businesses: billable hours over outcomes, a pitch team that&apos;s never the delivery team, pricing
              hidden behind a phone call. Here&apos;s the direct line from what went wrong to what we now do.
            </p>
          </Reveal>

          <div className="wu-ledger">
            <Reveal className="wu-ledger-head" aria-hidden="true">
              <span>The burn</span>
              <span className="ok">The fix</span>
            </Reveal>
            {LEDGER.map((row, i) => (
              <Reveal className="wu-row" key={row.tag} style={d(i * 120)}>
                <div className="wu-burn">
                  <span className="wu-tag">{row.tag}</span>
                  <p className="wu-strike">
                    <span>{row.burn}</span>
                  </p>
                </div>
                <div className="wu-fix">
                  {CHECK}
                  <p>{row.fix}</p>
                  <span className="wu-stamp">Verifiable</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="blockquote" className="wu-quote">
            We&apos;re not reacting to the industry in the abstract. We&apos;re fixing the exact invoices, exits, and
            reports that made us angry as clients.
          </Reveal>
        </div>
      </section>

      {/* 3 · TRUST BY DESIGN */}
      <section className="band tint wu-trust" id="trust">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Trust, by design</span>
            <h2>We made honesty structural, not aspirational.</h2>
            <p>
              “Transparent” and “trustworthy” are the two most over-claimed words in this industry. Talk is free — so we
              wired honesty into how the work runs, where you can verify it. The test we hold ourselves to:{" "}
              <strong>could a sceptical founder check the claim without trusting us at all?</strong> If not, it
              doesn&apos;t belong on this page.
            </p>
          </Reveal>

          <ul className="wu-checklist">
            {CHECKLIST.map((item, i) => (
              <Reveal as="li" className="wu-cl" key={item.h} style={d(i * 90)}>
                {CHECK_SM}
                <div>
                  <h3>{item.h}</h3>
                  <p>{item.p}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal as="blockquote" className="wu-quote">
            If you can&apos;t verify it before you pay, it&apos;s a promise, not a proof. We try to deal only in proofs.
          </Reveal>
        </div>
      </section>

      {/* 4 · ALIGNED INCENTIVES — dark */}
      <section className="band dark wu-incentives" id="incentives">
        <div className="wu-inc-glow" aria-hidden="true"></div>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Aligned incentives</span>
            <h2 style={{ color: "#fff" }}>We only win when you renew.</h2>
            <p>
              Most agency models quietly reward the wrong behaviour — more billable hours, more ad spend, more months
              locked in. Follow the money at a typical agency and its interests point away from yours. We removed each of
              those levers on purpose.
            </p>
          </Reveal>

          <div className="wu-levers">
            {LEVERS.map((lever, i) => (
              <Reveal className="wu-lever" key={lever.h} style={d(i * 110)}>
                <div className="wu-toggle" aria-hidden="true">
                  <span></span>
                </div>
                <h3>{lever.h}</h3>
                <p>{lever.p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal as="blockquote" className="wu-quote dark">
            When the only way we grow is by being worth renewing, honesty stops being a virtue and becomes the strategy.
          </Reveal>
        </div>
      </section>

      {/* 5 · THE RISK IS ON US */}
      <section className="band wu-risk" id="risk">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The risk is on us</span>
            <h2>We take the risk you&apos;re usually asked to carry.</h2>
            <p>
              The standard agency deal asks you to pay up front and hope. We flipped it: the first move costs you
              nothing, the exit costs you nothing, and the pressure to perform sits with us — where it belongs. Risk is
              really about who pays when things don&apos;t go to plan. We moved each of those costs onto our side of the
              table.
            </p>
          </Reveal>

          <Reveal className="wu-balance" aria-hidden="true">
            <span className="wu-side">You</span>
            <div className="wu-beam">
              <span className="wu-weight"></span>
            </div>
            <span className="wu-side ours">Us</span>
          </Reveal>

          <div className="wu-risk-grid">
            {RISKS.map((risk, i) => (
              <Reveal className="wu-risk-card" key={risk.h} style={d(i * 90)}>
                <span className="wu-onus">On us</span>
                <h3>{risk.h}</h3>
                <p>{risk.p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal as="blockquote" className="wu-quote">
            Flip the risk onto the agency and only good work survives the arrangement. That&apos;s the point.
          </Reveal>
        </div>
      </section>

      {/* 6 · WHO DOES THE WORK */}
      <section className="band tint wu-team" id="team">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who actually does the work</span>
            <h2>Senior operators, not a sales team with a fulfilment floor.</h2>
            <p>
              At most agencies, the people who win the work and the people who do the work are different — and you only
              meet the first group. Here they&apos;re the same small, senior team, and you&apos;ll know them by name. We
              stay deliberately small because average quality is a function of who&apos;s actually touching the work.
              Growth, for us, means better clients and sharper work — not a bigger org chart.
            </p>
          </Reveal>

          <div className="wu-team-grid">
            {TEAM.map((card, i) => (
              <Reveal className="wu-tcard" key={card.h} style={d(i * 90)}>
                <span className="wu-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{card.h}</h3>
                <p>{card.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · HOW WE DEFINE A WIN */}
      <section className="band wu-win" id="win">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How we define a win</span>
            <h2>We measure results in your business, not ours.</h2>
            <p>
              Plenty of agencies are thriving while their clients quietly aren&apos;t. There are two scoreboards in this
              industry, and they rarely match. When they diverge, we optimise for yours — because if your scoreboard
              doesn&apos;t move, ours shouldn&apos;t either.
            </p>
          </Reveal>

          <Reveal className="wu-boards">
            <div className="wu-board dim">
              <span className="wu-board-label">The agency scoreboard</span>
              <ul>
                <li>Awards</li>
                <li>Case studies</li>
                <li>Renewals</li>
              </ul>
            </div>
            <div className="wu-vs" aria-hidden="true">
              we pick
            </div>
            <div className="wu-board win">
              <span className="wu-board-label ok">Your scoreboard</span>
              <ul>
                <li>Enquiries</li>
                <li>Booked calls</li>
                <li>Closed sales &amp; clean books</li>
              </ul>
            </div>
          </Reveal>

          <div className="wu-win-grid">
            {WINS.map((card, i) => (
              <Reveal className="wu-wcard" key={card.h} style={d(i * 90)}>
                <h3>{card.h}</h3>
                <p>{card.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · THE HONEST OBJECTIONS */}
      <section className="band tint wu-obj" id="objections">
        <div className="wrap">
          <div className="wu-obj-grid">
            <div className="wu-obj-main">
              <Reveal className="sec-head">
                <span className="eyebrow">The honest objections</span>
                <h2>The fair pushback — answered straight.</h2>
                <p>
                  You should be sceptical of any agency, us included. So here&apos;s the strongest case against hiring
                  us, and our honest reply to each — no spin.
                </p>
              </Reveal>

              <Reveal className="wu-acc">
                {OBJECTIONS.map((obj, i) => {
                  const open = openObjection === i;
                  return (
                    <div className={`wu-item${open ? " open" : ""}`} key={obj.q}>
                      <button className="wu-summary" aria-expanded={open} onClick={() => selectObjection(i)}>
                        <span className="wu-q">{obj.q}</span>
                        <span className="wu-chev" aria-hidden="true"></span>
                      </button>
                      {open && (
                        <div className="wu-a">
                          <p>{obj.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Reveal>
            </div>

            <Reveal as="aside" className="wu-obj-viz" aria-hidden="true">
              <div className="wu-lens">
                <span className="wu-lens-sweep"></span>
                <span className="wu-lens-ring r2"></span>
                <span className="wu-lens-cross"></span>
                <div className="wu-lens-core">
                  <span className="wu-lens-cap">Pushback</span>
                  <span className="wu-lens-count">
                    <b>{String(openObjection + 1).padStart(2, "0")}</b>
                    <i>/ 04</i>
                  </span>
                  <span className="wu-lens-stamp pop" key={stampKey}>
                    Answered
                  </span>
                </div>
              </div>
              <div className="wu-lens-dots">
                {OBJECTIONS.map((obj, i) => (
                  <i key={obj.q} className={i === openObjection ? "on" : undefined}></i>
                ))}
              </div>
              <span className="wu-lens-note">Every reply is checkable — before you pay.</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9 · PROOF, NOT PROMISES */}
      <section className="band wu-proof" id="proof">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Proof, not promises</span>
            <h2>We&apos;d rather show than tell — so we&apos;re honest about what we can show today.</h2>
            <p>
              We&apos;re early, and we won&apos;t borrow credibility we haven&apos;t earned. No stock photos of “the
              team,” no invented testimonials. A lot of agency proof is theatre. We&apos;d rather under-claim and be
              verifiable than over-claim and be typical.
            </p>
          </Reveal>

          <div className="wu-proof-grid">
            <Reveal className="wu-proof-card real" style={d(0)}>
              <span className="wu-ptag ok">Live now</span>
              <p>
                This very website is the sample — designed, built, measured, and documented against the same{" "}
                <strong>14-point bar</strong> we sell to you.
              </p>
            </Reveal>
            <Reveal className="wu-proof-card real" style={d(90)}>
              <span className="wu-ptag ok">Live now</span>
              <p>
                Everything we assert is checkable: the pricing page, the quality checklist, and the full process are all
                on the site right now.
              </p>
            </Reveal>
            <Reveal className="wu-proof-card slot" style={d(180)}>
              <span className="wu-ptag reserved">Reserved</span>
              <p>
                Case-study slot — publishes the moment a client signs off, with their{" "}
                <strong>real name and real numbers</strong>, never a day before.
              </p>
            </Reveal>
            <Reveal className="wu-proof-card slot" style={d(270)}>
              <span className="wu-ptag reserved">Reserved</span>
              <p>Attributed results, in context — not anonymised “a client saw +300%” with no way to check it.</p>
            </Reveal>
          </div>

          <Reveal as="blockquote" className="wu-quote">
            We&apos;d rather have honest empty slots than a fake highlight reel. The empty slots are a promise we intend
            to keep in public.
          </Reveal>
        </div>
      </section>

      <CtaCard
        eyebrow="See the difference on the first call"
        heading="A real plan, not a pitch."
        solid={{ label: "Get your free growth plan", href: "/#book", arrow: "↗" }}
        line={{ label: "See pricing", href: "/pricing" }}
        id="apply"
      >
        Book a free growth plan. You&apos;ll leave with a real, written document and a straight answer on whether
        we&apos;re the right partner. <strong>No decks, no pressure, no obligation either way.</strong>
      </CtaCard>
    </>
  );
}
