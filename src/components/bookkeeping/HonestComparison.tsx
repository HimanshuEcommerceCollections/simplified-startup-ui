import Reveal from "@/components/ui/Reveal";
import "./honest-comparison.css";

export default function HonestComparison() {
  return (
    <section className="band light" aria-label="The honest comparison">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— The honest comparison</span>
          <h2>Outsourced, in-house, or DIY?</h2>
          <p className="bk-sub">
            All three are real choices. Here&apos;s the straight version, including when not to hire
            us.
          </p>
        </Reveal>
        <div className="bk-cmp">
          <Reveal as="article" anim="pop" index={0} className="bk-cmp-card">
            <h3>DIY in a spreadsheet</h3>
            <div className="bk-cost">Your time</div>
            <p>
              Right if you&apos;re pre-revenue with a handful of transactions. Wrong the month you
              can&apos;t answer &quot;did we make money?&quot; without a weekend of sorting.
            </p>
          </Reveal>
          <Reveal as="article" anim="pop" index={1} className="bk-cmp-card">
            <h3>An in-house bookkeeper</h3>
            <div className="bk-cost">
              $3,000–$5,000<span className="bk-cost-per">/mo</span>
            </div>
            <p>
              With salary, benefits, and overhead. Makes sense at real transaction volume — overkill
              for most small businesses.
            </p>
          </Reveal>
          <Reveal as="article" anim="pop" index={2} className="bk-cmp-card is-this">
            <h3>Outsourced / virtual bookkeeping</h3>
            <div className="bk-cost grad-cost">
              $300–$900<span className="bk-cost-per">/mo</span>
            </div>
            <p>By volume, published below. Same clean, CPA-ready books — without a hire.</p>
          </Reveal>
        </div>
        <div className="bk-test">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <p>
            <b>Simple test:</b> if bookkeeping eats more than an afternoon a month, outsourcing pays
            for itself in the time back alone.
          </p>
        </div>
      </div>
    </section>
  );
}
