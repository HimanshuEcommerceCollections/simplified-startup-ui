"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";
import "./about-cta.css";

export default function AboutCta() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className={`cta-about${inView ? " in" : ""}`} id="book" aria-label="Get started" ref={ref}>
      <span className="shine" aria-hidden="true"></span>
      <div className="wrap cta-inner">
        <h2 className="cta-h2">Ready to build your business?</h2>
        <p className="cta-sub">
          Book a free strategy call and we&apos;ll map the fastest path across the pieces that matter
          first. No pressure — the plan is yours to keep either way.
        </p>
        <div className="cta-actions">
          <a href="#book" className="btn btn-on-grad">
            Book a free strategy call <span aria-hidden="true">→</span>
          </a>
          <Link href="/#services" className="btn btn-ghost-grad">
            See our services
          </Link>
        </div>
        <p className="fine">Free · 30 minutes · No obligation</p>
      </div>
    </section>
  );
}
