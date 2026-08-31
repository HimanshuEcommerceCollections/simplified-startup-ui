"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMagnetic } from "@/lib/useMagnetic";
import "./navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why us", href: "/why-us" },
  { label: "Pricing", href: "/pricing" },
];

const RESOURCE_LINKS = [
  { label: "FAQ", href: "/faq", hint: "Straight answers, no pitches" },
  { label: "Blog", href: "/blog", hint: "Straight talk on SEO, ads & AI" },
  { label: "Glossary", href: "/glossary", hint: "Marketing terms, plain English" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>();
  const dropRef = useRef<HTMLDivElement>(null);

  // touch devices fire mouseenter before click, which would immediately
  // re-toggle the dropdown — only let hover drive it where hover exists
  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

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

  // close the dropdown on Escape or an outside click/tap
  useEffect(() => {
    if (!resourcesOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setResourcesOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setResourcesOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [resourcesOpen]);

  const SERVICE_DETAIL_ROUTES = ["/bookkeeping", "/website-development", "/ai-automation"];

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    // service detail pages highlight the Services item
    if (href === "/services") return pathname === "/services" || SERVICE_DETAIL_ROUTES.includes(pathname);
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const resourcesActive = RESOURCE_LINKS.some((link) => isActive(link.href));

  function closeAll() {
    setOpen(false);
    setResourcesOpen(false);
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
              onClick={closeAll}
            >
              {link.label}
            </Link>
          ))}
          <div
            className={`nav-drop${resourcesOpen ? " open" : ""}`}
            ref={dropRef}
            onMouseEnter={canHover ? () => setResourcesOpen(true) : undefined}
            onMouseLeave={canHover ? () => setResourcesOpen(false) : undefined}
          >
            <button
              className={`nav-drop-btn${resourcesActive ? " active" : ""}`}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              onClick={() => setResourcesOpen((o) => !o)}
            >
              Resources
              <svg className="nav-drop-caret" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="nav-drop-panel" role="menu" aria-label="Resources">
              {RESOURCE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  role="menuitem"
                  className={isActive(link.href) ? "active" : undefined}
                  onClick={closeAll}
                >
                  {link.label}
                  <small>{link.hint}</small>
                </Link>
              ))}
            </div>
          </div>
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
            <Link href="/growth-plan" ref={ctaRef} className="btn magnetic">
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
