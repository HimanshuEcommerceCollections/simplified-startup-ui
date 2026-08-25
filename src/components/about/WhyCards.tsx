import type { CSSProperties } from "react";
import Reveal from "@/components/ui/Reveal";
import "./why-cards.css";

function i(index: number, from?: string): CSSProperties {
  return { "--i": index, ...(from ? { "--from": from } : {}) } as CSSProperties;
}

export default function WhyCards() {
  return (
    <section className="band light" id="about-why" aria-label="Why Simplified Startup">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Why Simplified Startup</span>
          <h2 className="ab-h2">Starting a business means doing ten jobs you never trained for.</h2>
          <p className="sec-lead">
            You&apos;re an expert at your craft — not necessarily at branding, websites, funnels, or
            the back office. Those pieces get patched together from freelancers and half-finished
            tools, and the business stalls in the gaps.
          </p>
        </Reveal>
        <div className="why2-grid">
          <Reveal anim="rise" index={0} className="why2-card">
            <svg className="wm" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line className="wm-base" x1="4" y1="34" x2="84" y2="34" />
              <line className="wm-base" x1="102" y1="34" x2="162" y2="34" />
              <line className="wm-base" x1="180" y1="34" x2="236" y2="34" />
              <rect className="wm-u" x="9" y="18" width="12" height="12" rx="3" style={i(0)} />
              <rect className="wm-u" x="35" y="18" width="12" height="12" rx="3" style={i(1)} />
              <rect className="wm-u" x="61" y="18" width="12" height="12" rx="3" style={i(2)} />
              <rect className="wm-u wm-fall" x="87" y="18" width="12" height="12" rx="3" style={i(3)} />
              <rect className="wm-u" x="113" y="18" width="12" height="12" rx="3" style={i(4)} />
              <rect className="wm-u" x="139" y="18" width="12" height="12" rx="3" style={i(5)} />
              <rect className="wm-u wm-fall" x="165" y="18" width="12" height="12" rx="3" style={i(6)} />
              <rect className="wm-u" x="191" y="18" width="12" height="12" rx="3" style={i(7)} />
              <rect className="wm-u" x="217" y="18" width="12" height="12" rx="3" style={i(8)} />
            </svg>
            <h3>The gaps cost you</h3>
            <p>
              Every missing skill is a job you take on yourself — or a vendor you have to find,
              brief, and manage. Momentum leaks out between them.
            </p>
          </Reveal>
          <Reveal anim="rise" index={1} className="why2-card">
            <svg className="wm" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle className="wm-void" cx="120" cy="26" r="14" />
              <line className="wm-stub" x1="36" y1="26" x2="62" y2="26" pathLength="1" style={i(0)} />
              <line className="wm-stub" x1="90" y1="26" x2="104" y2="26" pathLength="1" style={i(1)} />
              <line className="wm-stub" x1="204" y1="26" x2="178" y2="26" pathLength="1" style={i(2)} />
              <line className="wm-stub" x1="150" y1="26" x2="136" y2="26" pathLength="1" style={i(3)} />
              <rect className="wm-tool" x="10" y="14" width="24" height="24" rx="7" style={i(0)} />
              <rect className="wm-tool" x="64" y="14" width="24" height="24" rx="7" style={i(1)} />
              <rect className="wm-tool" x="206" y="14" width="24" height="24" rx="7" style={i(2)} />
              <rect className="wm-tool" x="152" y="14" width="24" height="24" rx="7" style={i(3)} />
              <g className="wm-glyph" style={i(0)}>
                <path d="M17 26h10M22 21v10" />
              </g>
              <g className="wm-glyph" style={i(1)}>
                <path d="M71 30l5-6 5 6" />
              </g>
              <g className="wm-glyph" style={i(2)}>
                <path d="M213 22h10M213 27h10M213 32h6" />
              </g>
              <g className="wm-glyph" style={i(3)}>
                <path d="M159 31l4-8 5 5 4-6" />
              </g>
            </svg>
            <h3>Tools aren&apos;t a team</h3>
            <p>
              A pile of subscriptions doesn&apos;t make decisions, own outcomes, or tell you what to
              do next. Software helps; expertise builds.
            </p>
          </Reveal>
          <Reveal anim="rise" index={2} className="why2-card is-fix">
            <svg className="wm" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="wmg" gradientUnits="userSpaceOnUse" x1="20" y1="4" x2="220" y2="52">
                  <stop offset="0" stopColor="#2563eb" />
                  <stop offset="1" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
              <line className="wm-link" x1="120" y1="26" x2="30" y2="26" pathLength="1" style={i(0)} />
              <line className="wm-link" x1="120" y1="26" x2="72" y2="10" pathLength="1" style={i(1)} />
              <line className="wm-link" x1="120" y1="26" x2="168" y2="10" pathLength="1" style={i(2)} />
              <line className="wm-link" x1="120" y1="26" x2="210" y2="26" pathLength="1" style={i(3)} />
              <line className="wm-link" x1="120" y1="26" x2="96" y2="46" pathLength="1" style={i(4)} />
              <line className="wm-link" x1="120" y1="26" x2="144" y2="46" pathLength="1" style={i(5)} />
              <rect className="wm-n" x="24" y="20" width="12" height="12" rx="3" style={i(0, "-16px")} />
              <rect className="wm-n" x="66" y="4" width="12" height="12" rx="3" style={i(1, "-12px")} />
              <rect className="wm-n" x="162" y="4" width="12" height="12" rx="3" style={i(2, "12px")} />
              <rect className="wm-n" x="204" y="20" width="12" height="12" rx="3" style={i(3, "16px")} />
              <rect className="wm-n" x="90" y="40" width="12" height="12" rx="3" style={i(4, "-10px")} />
              <rect className="wm-n" x="138" y="40" width="12" height="12" rx="3" style={i(5, "10px")} />
              <circle className="wm-hub" cx="120" cy="26" r="13" />
              <circle className="wm-ring" cx="120" cy="26" r="13" />
            </svg>
            <h3>The fix</h3>
            <p>
              One team that covers the pieces you&apos;re missing — strategy, brand, tech, marketing,
              and the back office — so you can focus on the work you&apos;re great at.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
