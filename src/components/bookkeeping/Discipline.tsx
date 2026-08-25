import Reveal from "@/components/ui/Reveal";
import "./discipline.css";

const ITEMS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: "A written monthly close date, met.",
    copy: "Late books are wrong books, because you're steering on stale numbers.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Reconciliation is a checklist, not a mood.",
    copy: "Every account, every month, same steps.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
      </svg>
    ),
    title: "We're bookkeepers, not your CPA.",
    copy: "The books hand off clean for tax, and we stay in our lane.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
    title: "Plain-English notes with every report.",
    copy: "If you need a translator for your own numbers, something's wrong.",
  },
];

export default function Discipline() {
  return (
    <section className="band light" aria-label="The discipline">
      <div className="wrap bk-disc-grid">
        <Reveal>
          <span className="eyebrow">— The discipline</span>
          <h2 className="bk-disc-h2">A close date you can circle.</h2>
          <p className="bk-disc-lead">
            Bad bookkeeping isn&apos;t usually wrong numbers — it&apos;s late ones. The whole
            product is discipline.
          </p>
        </Reveal>
        <ul className="bk-disc-list">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} as="li" anim="left" index={i}>
              <span className="bk-ic">{item.icon}</span>
              <b>{item.title}</b>
              <span>{item.copy}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
