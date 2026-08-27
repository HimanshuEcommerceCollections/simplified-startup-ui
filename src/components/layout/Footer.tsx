"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";
import "./footer.css";

const SERVICE_LINKS = [
  "Digital Marketing",
  "Business Consulting",
  "Website Development",
  "Branding & Growth",
  "Sales & Lead Gen",
  "Talent & Staffing",
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#book" },
];

export default function Footer() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });
  const revealClass = `reveal${inView ? " in" : ""}`;

  return (
    <footer id="siteFooter" ref={ref} className={inView ? "foot-in" : undefined}>
      <span className="foot-glow" aria-hidden="true"></span>
      <div className="wrap">
        <div className="foot-grid">
          <div className={`foot-brand ${revealClass}`}>
            <Link href="/" className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mark" src="/assets/images/logo.png" alt="" aria-hidden="true" />
              Simplified&nbsp;Startup
            </Link>
            <p>One partner, every step. Everything your startup needs to go from idea to scale.</p>
            <form className="news" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@company.com" aria-label="Email for newsletter" />
              <button type="submit">Join</button>
            </form>
          </div>
          <div className={revealClass}>
            <h4>Services</h4>
            <ul>
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <Link href="/services">{label}</Link>
                </li>
              ))}
              <li>
                <Link href="/bookkeeping">Bookkeeping &amp; Accounting</Link>
              </li>
            </ul>
          </div>
          <div className={revealClass}>
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={revealClass}>
            <h4>Get started</h4>
            <ul>
              <li>
                <Link href="/#book">Book a free consultation</Link>
              </li>
              <li>
                <Link href="/#book">Try the AI Advisor</Link>
              </li>
              <li>
                <Link href="/growth-plan">Get Started form</Link>
              </li>
              <li>
                <a href="mailto:hello@simplifiedstartup.com">hello@simplifiedstartup.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`foot-bottom ${revealClass}`}>
          <span>
            © 2026 Simplified Startup ·{" "}
            <a href="#" className="legal-link">
              Privacy Policy
            </a>{" "}
            ·{" "}
            <a href="#" className="legal-link">
              Terms of Service
            </a>
          </span>
          <div className="foot-social">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="Instagram">◎</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
