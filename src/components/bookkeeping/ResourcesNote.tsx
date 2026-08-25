import Reveal from "@/components/ui/Reveal";
import "./resources-note.css";

export default function ResourcesNote() {
  return (
    <section className="band" aria-label="From the resources desk">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">— From the resources desk</span>
          <h2>Read before you decide.</h2>
        </Reveal>
        <Reveal anim="pop" className="bk-res">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <p>
            <b>Starting from zero?</b> Bookkeeping basics for new businesses covers what to put in
            place before you need a bookkeeper — and what you need one for. Educational, not advice.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
