import "./capability-ticker.css";

const ITEMS = [
  "Strategy",
  "Brand identity",
  "Websites & tech",
  "Marketing",
  "Sales systems",
  "Automation",
  "Finance & back office",
];

function Sequence({ hidden }: { hidden?: boolean }) {
  return (
    <div className="hb-seq" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span className="hb-item" key={item}>
          <i className="hb-node" aria-hidden="true"></i>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function CapabilityTicker() {
  return (
    <div className="hb-strip" role="region" aria-label="Disciplines we cover">
      <div className="hb-track">
        <Sequence />
        <Sequence hidden />
      </div>
    </div>
  );
}
