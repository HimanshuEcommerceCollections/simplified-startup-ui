import "./rate-card.css";

type Rate = { title: string; desc: string; price: string; per?: boolean; scope?: boolean };
type Group = { label: string; rows: Rate[] };

const GROUPS: Group[] = [
  {
    label: "Search (SEO) — part of digital marketing",
    rows: [
      {
        title: "SEO Audit",
        desc: "One time. A complete technical and content audit with a focused road map.",
        price: "$1,500–3,000",
      },
      {
        title: "Monthly SEO Optimization",
        desc: "Building authority and content, month over month. 6-month minimum.",
        price: "$1,500–3,000",
        per: true,
      },
      {
        title: "SEO — Aggressive",
        desc: "Speed in a competitive market: more content, more targets, faster cycles.",
        price: "$3,000–6,000",
        per: true,
      },
    ],
  },
  {
    label: "Brand",
    rows: [
      {
        title: "Brand Foundation",
        desc: "Logo suite, colour and type systems, voice guide, and starter templates.",
        price: "$2,000–3,500",
      },
      {
        title: "Complete Brand Identity",
        desc: "The foundation, extended with further applications and collateral.",
        price: "$3,500–5,000",
      },
    ],
  },
  {
    label: "Web",
    rows: [
      {
        title: "Website Build",
        desc: "Grouped by scope — pages, features, and integrations. Your scope band is set in writing, before work begins, in your free growth plan.",
        price: "By scope band",
        scope: true,
      },
    ],
  },
];

export default function RateCard() {
  return (
    <section className="band light" id="standalone" aria-label="Standalone services">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">— The rate card, in plain sight</span>
          <h2>Standalone services</h2>
          <p>
            Take a single service on its own. These are the declared rates for search, brand, and
            web work. Where a range is shown, the exact number is fixed in your plan before
            anything begins.
          </p>
        </div>

        {GROUPS.map((group) => (
          <div key={group.label} className="rate-group">
            <div className="rate-glabel">{group.label}</div>
            {group.rows.map((row) => (
              <div key={row.title} className="rate-row">
                <div className="rate-main">
                  <div className="rate-title">{row.title}</div>
                  <p>{row.desc}</p>
                </div>
                <div className={`rate-price${row.scope ? " scope" : ""}`}>
                  {row.price}
                  {row.per && <span className="per"> /mo</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
