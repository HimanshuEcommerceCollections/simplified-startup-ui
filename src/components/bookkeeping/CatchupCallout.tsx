import Reveal from "@/components/ui/Reveal";
import "./catchup-callout.css";

export default function CatchupCallout() {
  return (
    <section className="band light" aria-label="Behind on the books">
      <div className="wrap">
        <Reveal anim="pop" className="bk-callout">
          <div className="bk-co-txt">
            <span className="eyebrow bk-co-eyebrow">— Behind on the books?</span>
            <h3>Catch-up and cleanup.</h3>
            <p>
              Months behind, or inherited a mess? Common, and fixable. We bring the books current
              before monthly service starts — no lecture.
            </p>
          </div>
          <a href="#book" className="btn">
            Scope my catch-up <span className="arw" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
