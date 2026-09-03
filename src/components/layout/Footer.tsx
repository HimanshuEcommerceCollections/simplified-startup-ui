"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useInView } from "@/lib/useInView";
import "./footer.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const SERVICE_LINKS = [
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Business Consulting", href: "/business-advisory" },
  { label: "Website Development", href: "/website-development" },
  { label: "Branding & Growth", href: "/branding-growth" },
  { label: "Sales & Lead Gen", href: "/sales-lead-gen" },
  { label: "Talent & Staffing", href: "/talent-staffing" },
  { label: "AI Automation", href: "/ai-automation" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#book" },
];

function NewsletterForm() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const honeypot = (form.elements.namedItem("company") as HTMLInputElement).value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(`${API_URL}/api/v1/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sourcePage: pathname, company: honeypot }),
      });
      if (!res.ok) throw new Error(`request failed (${res.status})`);
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="news-done">You&apos;re in — thanks for subscribing.</p>;
  }
  return (
    <form className="news" onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="you@company.com"
        aria-label="Email for newsletter"
        onInput={() => state === "error" && setState("idle")}
      />
      <span className="news-hp" aria-hidden="true">
        <input name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" aria-label="Company" />
      </span>
      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "…" : "Join"}
      </button>
      {state === "error" && (
        <span className="news-err" role="alert">
          Couldn&apos;t subscribe — check the address and try again.
        </span>
      )}
    </form>
  );
}

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
            <NewsletterForm />
          </div>
          <div className={revealClass}>
            <h4>Services</h4>
            <ul>
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
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
