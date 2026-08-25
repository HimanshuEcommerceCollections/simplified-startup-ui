"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMagnetic } from "@/lib/useMagnetic";
import "./navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why us", href: "/#why" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/#resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    // service detail pages highlight the Services item
    if (href === "/services") return pathname === "/services" || pathname === "/bookkeeping";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : undefined}>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="Simplified Startup home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mark" src="/assets/images/logo.png" alt="" aria-hidden="true" />
          Simplified&nbsp;Startup
        </Link>
        <nav className={`nav-links${open ? " show" : ""}`} id="navLinks">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={isActive(link.href) ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <div className="nav-phone">
            <span className="ico" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <div className="q">Have a question?</div>
              <div className="num">+91 00000 00000</div>
            </div>
          </div>
          <div className="nav-cta">
            <Link href="/#book" ref={ctaRef} className="btn magnetic">
              Start Project
            </Link>
          </div>
          <button
            className="hamburger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
