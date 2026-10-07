import Reveal from "@/components/ui/Reveal";
import "./service-lines.css";

/** `href` marks a line that has its own sub-service page. */
const LINES: { title: string; desc: string; href?: string }[] = [
  {
    title: "Monthly bookkeeping",
    desc: "The recurring close, categorised, reconciled, and delivered on a date you can circle.",
    href: "/bookkeeping/monthly-bookkeeping",
  },
  {
    title: "Catch-up bookkeeping",
    desc: "Months or years behind, reconstructed to a position your accountant can file from.",
    href: "/bookkeeping/catch-up-bookkeeping",
  },
  {
    title: "QuickBooks & Xero setup",
    desc: "A chart of accounts built for your business, feeds mapped properly, historical mess corrected.",
    href: "/bookkeeping/quickbooks-xero-setup",
  },
  {
    title: "Payroll services",
    desc: "Pay runs reviewed before they go, W-2 and 1099 handled, every run recorded in your books.",
    href: "/bookkeeping/payroll-services",
  },
  {
    title: "AP & AR management",
    desc: "Invoices out on time, receivables chased properly, payables run on a schedule.",
  },
  {
    title: "Financial reporting",
    desc: "Margin by line, cash runway, and the short list of numbers that change decisions.",
  },
];

export default function ServiceLines() {
  return (
    <section className="band" aria-label="The service lines">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">The service lines</span>
          <h2>Six ways this gets bought.</h2>
          <p className="bk-sub">
            Most clients take the monthly close and add from here. Each is scoped and priced on its
            own, and combining any two applies the automatic 10% discount.
          </p>
        </Reveal>
        <div className="bk-lines">
          {LINES.map((line, i) => (
            <Reveal key={line.title} anim="step" index={i} className="bk-line">
              <h3>{line.title}</h3>
              <p>
                {line.desc}
                {line.href && (
                  <a className="bk-line-go" href={line.href}>
                    See the full page <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
