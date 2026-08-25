import Reveal from "@/components/ui/Reveal";
import "./vs-accounting.css";

export default function VsAccounting() {
  return (
    <section className="band" aria-label="Bookkeeping vs accounting">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— Cleared up</span>
          <h2>Bookkeeping vs accounting — what&apos;s the difference?</h2>
          <p className="bk-sub">
            People use the words interchangeably; they&apos;re not the same job. You usually need
            both, at different moments.
          </p>
        </Reveal>
        <div className="bk-vs-grid">
          <Reveal anim="left" className="bk-vs-card bk-vs-us">
            <span className="bk-tag">What we do</span>
            <h3>Bookkeeping</h3>
            <p>
              The monthly record: categorize, reconcile, close, report. It keeps your numbers true
              all year so nothing&apos;s a surprise.
            </p>
          </Reveal>
          <Reveal anim="right" className="bk-vs-card bk-vs-cpa">
            <span className="bk-tag">Your CPA</span>
            <h3>Accounting &amp; tax</h3>
            <p>
              The yearly interpretation: tax strategy, returns, filings. Your CPA does their best
              work when the books are already clean.
            </p>
          </Reveal>
        </div>
        <p className="bk-vs-foot">
          <b>We don&apos;t file your taxes</b> — we make the file your CPA files from. Clean books
          mean a cheaper, calmer tax season.
        </p>
      </div>
    </section>
  );
}
