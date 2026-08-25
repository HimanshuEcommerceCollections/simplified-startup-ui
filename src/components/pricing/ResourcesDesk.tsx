import "./resources-desk.css";

const RESOURCES = [
  {
    kicker: "Benchmarks",
    title: "What marketing actually costs",
    copy: "Puts these bands next to sourced market figures, so you can see where our numbers sit against the wider market.",
    go: "Read the breakdown",
  },
  {
    kicker: "Structure",
    title: "Retainer vs project",
    copy: "When a monthly plan is the right structure — and when it isn't, including for us.",
    go: "See when each fits",
  },
];

export default function ResourcesDesk() {
  return (
    <section className="band" id="resources" aria-label="From the resources desk">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">— From the resources desk</span>
          <h2>Read before you decide</h2>
          <p>Weighing marketing packages for your business? Two honest companions to this page.</p>
        </div>
        <div className="res-grid">
          {RESOURCES.map((res) => (
            <a key={res.title} href="#" className="res-card">
              <span className="r-kicker">{res.kicker}</span>
              <h3>{res.title}</h3>
              <p>{res.copy}</p>
              <span className="r-go">
                {res.go}{" "}
                <span className="arw" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
