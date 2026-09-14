"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMagnetic } from "@/lib/useMagnetic";
import "./navbar.css";

type NavLink = { label: string; href: string; hint?: string };

const LINKS_BEFORE_SERVICES: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
const LINKS_AFTER_SERVICES: NavLink[] = [
  { label: "Why us", href: "/why-us" },
  { label: "Pricing", href: "/pricing" },
];

/** The eight services — same routes and one-liners as the services-page explorer. */
const SERVICE_LINKS: NavLink[] = [
  { label: "Digital Marketing", href: "/digital-marketing", hint: "Get found and get pipeline" },
  { label: "Website Development", href: "/website-development", hint: "A site that sells while you sleep" },
  { label: "Branding & Growth", href: "/branding-growth", hint: "Look like the leader in your space" },
  { label: "Sales & Lead Generation", href: "/sales-lead-gen", hint: "A pipeline you can predict" },
  { label: "AI Automation", href: "/ai-automation", hint: "Automate the busywork" },
  { label: "Business & Startup Advisory", href: "/business-advisory", hint: "A plan, not a pep talk" },
  { label: "Talent & Staffing", href: "/talent-staffing", hint: "Senior capability, no full-time hire" },
  { label: "Bookkeeping & Accounting", href: "/bookkeeping", hint: "Finance handled, end to end" },
];

const RESOURCE_LINKS: NavLink[] = [
  { label: "FAQ", href: "/faq", hint: "Straight answers, no pitches" },
  { label: "Blog", href: "/blog", hint: "Straight talk on SEO, ads & AI" },
  { label: "Glossary", href: "/glossary", hint: "Marketing terms, plain English" },
];

type Menu = "services" | "resources";

function Caret() {
  return (
    <svg className="nav-drop-caret" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<Menu | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>();
  const navRef = useRef<HTMLElement>(null);

  // touch devices fire mouseenter before click, which would immediately
  // re-toggle a dropdown — only let hover drive it where hover exists
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

  // close an open dropdown on Escape or an outside click/tap
  useEffect(() => {
    if (!openMenu) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Element | null;
      if (navRef.current && target && !target.closest(".nav-drop")) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // the Services item highlights on the overview and on every service detail page
  const servicesActive = pathname === "/services" || SERVICE_LINKS.some((link) => isActive(link.href));
  const resourcesActive = RESOURCE_LINKS.some((link) => isActive(link.href));

  function closeAll() {
    setOpen(false);
    setOpenMenu(null);
  }
  const toggleMenu = (menu: Menu) => setOpenMenu((m) => (m === menu ? null : menu));
  const hoverProps = (menu: Menu) =>
    canHover ? { onMouseEnter: () => setOpenMenu(menu), onMouseLeave: () => setOpenMenu(null) } : {};

  const renderLink = (link: NavLink) => (
    <Link key={link.label} href={link.href} className={isActive(link.href) ? "active" : undefined} onClick={closeAll}>
      {link.label}
    </Link>
  );
  const renderPanel = (links: NavLink[], label: string, wide = false) => (
    <div className={`nav-drop-panel${wide ? " nav-drop-panel--wide" : ""}`} role="menu" aria-label={label}>
      {links.map((link) => (
        <Link key={link.label} href={link.href} role="menuitem" className={isActive(link.href) ? "active" : undefined} onClick={closeAll}>
          {link.label}
          {link.hint && <small>{link.hint}</small>}
        </Link>
      ))}
    </div>
  );

  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : undefined}>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="Simplified Startup home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mark" src="/assets/images/logo.png" alt="" aria-hidden="true" />
          Simplified&nbsp;Startup
        </Link>
        <nav className={`nav-links${open ? " show" : ""}`} id="navLinks" ref={navRef}>
          {LINKS_BEFORE_SERVICES.map(renderLink)}

          {/* Services: the label is a real link to the overview page; hovering
              (or the caret, on touch / in the mobile menu) reveals the eight services */}
          <div className={`nav-drop${openMenu === "services" ? " open" : ""}`} {...hoverProps("services")}>
            <div className="nav-drop-head">
              <Link href="/services" className={`nav-drop-btn${servicesActive ? " active" : ""}`} onClick={closeAll}>
                Services
              </Link>
              <button
                type="button"
                className="nav-drop-toggle"
                aria-label="Show services"
                aria-expanded={openMenu === "services"}
                aria-haspopup="true"
                onClick={() => toggleMenu("services")}
              >
                <Caret />
              </button>
            </div>
            {renderPanel(SERVICE_LINKS, "Services", true)}
          </div>

          {LINKS_AFTER_SERVICES.map(renderLink)}

          <div className={`nav-drop${openMenu === "resources" ? " open" : ""}`} {...hoverProps("resources")}>
            <button
              className={`nav-drop-btn${resourcesActive ? " active" : ""}`}
              aria-expanded={openMenu === "resources"}
              aria-haspopup="true"
              onClick={() => toggleMenu("resources")}
            >
              Resources
              <Caret />
            </button>
            {renderPanel(RESOURCE_LINKS, "Resources")}
          </div>
        </nav>
        <div className="nav-right">
          {/* "Have a question?" phone block hidden until a real number exists — see git history to restore */}
          <div className="nav-cta">
            <Link href="/start-project" ref={ctaRef} className="btn magnetic">
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
