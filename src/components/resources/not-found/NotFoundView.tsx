"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ResourceHero from "@/components/resources/ResourceHero";
import CtaBand from "@/components/home/CtaBand";
import "./not-found.css";

const CONTACT_EMAIL = "contact@simplifiedstartup.com";

const QUICK_LINKS = [
  { label: "Home", href: "/", hint: "Start from the top" },
  { label: "Services", href: "/services", hint: "All eight services, one place" },
  { label: "Pricing", href: "/pricing", hint: "Every price, published" },
  { label: "Start a project", href: "/start-project", hint: "Free growth plan" },
  { label: "Blog", href: "/blog", hint: "Straight talk on growth" },
  { label: "FAQ", href: "/faq", hint: "Answers, not pitches" },
];

export default function NotFoundView() {
  const pathname = usePathname();

  return (
    <>
      <ResourceHero
        eyebrow="404 · Page not found"
        line1="This page isn’t"
        line2={<span className="grad-text">here yet.</span>}
        ariaTitle="This page isn’t here yet."
        lead="The link may be old, mistyped, or pointing at a page we haven’t published. Pick a route below, or tell us what you were looking for."
      >
        <div className="nf-card" aria-label="Where to go instead">
          <div className="nf-card-top">
            <span className="nf-live">
              <span className="dot" aria-hidden="true"></span>
              Route check
            </span>
            <span className="nf-code">404</span>
          </div>
          <div className="nf-path" title={pathname ?? undefined}>
            <span className="nf-path-label">Requested</span>
            <code>{pathname || "/"}</code>
            <span className="nf-path-status">Not found</span>
          </div>
          <ul className="nf-links">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <b>{l.label}</b>
                  <small>{l.hint}</small>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="nf-card-foot">
            <span>Still stuck?</span>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Broken%20link%20on%20simplifiedstartup.com`}>{CONTACT_EMAIL}</a>
          </div>
        </div>
      </ResourceHero>

      <div className="nf-actions wrap">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/services" className="btn btn-ghost">
          See all services <span className="arw">→</span>
        </Link>
      </div>

      <CtaBand
        eyebrow="Looking for something specific?"
        heading="Tell us what you need. We’ll point you to it."
        copy={
          <>
            Every service and every price is published on this site. If you can’t find it, email{" "}
            <strong>{CONTACT_EMAIL}</strong> and a real person will reply.
          </>
        }
        primaryLabel="Start a project"
        primaryHref="/start-project"
        secondary={{ label: "See all services", href: "/services", arrow: "→" }}
        id="book"
      />
    </>
  );
}
