"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMagnetic } from "@/lib/useMagnetic";
import "./navbar.css";

type NavLink = { label: string; href: string; hint?: string };
/** A service column in the Services mega-menu: the service page plus its built internal pages. */
type ServiceLink = NavLink & { children?: NavLink[] };

const LINKS_BEFORE_SERVICES: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
const LINKS_AFTER_SERVICES: NavLink[] = [
  { label: "Why us", href: "/why-us" },
  { label: "Pricing", href: "/pricing" },
];

/**
 * The eight services — same routes and one-liners as the services-page explorer.
 * `children` are the internal service pages that exist; add a line here each time
 * a new sub-service design is converted (every service keeps its column either way).
 */
const SERVICE_LINKS: ServiceLink[] = [
  {
    label: "Website Development",
    href: "/website-development",
    hint: "A site that sells while you sleep",
    children: [
      { label: "Landing pages", href: "/website-development/landing-page-design" },
      { label: "Local business websites", href: "/website-development/local-business-websites" },
      { label: "B2B & SaaS websites", href: "/website-development/b2b-saas-websites" },
      { label: "Web applications", href: "/website-development/web-applications" },
      { label: "Redesign & migration", href: "/website-development/website-redesign-migration" },
      { label: "Startup & MVP websites", href: "/website-development/startup-mvp-websites" },
    ],
  },
  {
    label: "Digital Marketing",
    href: "/digital-marketing",
    hint: "Get found and get pipeline",
    children: [
      { label: "SEO", href: "/digital-marketing/seo" },
      { label: "Google Ads", href: "/digital-marketing/google-ads" },
      { label: "Meta Ads", href: "/digital-marketing/meta-ads" },
      { label: "Email marketing", href: "/digital-marketing/email-marketing" },
      { label: "Social media management", href: "/digital-marketing/social-media-management" },
    ],
  },
  {
    label: "AI Automation",
    href: "/ai-automation",
    hint: "Automate the busywork",
    children: [
      { label: "AI chatbots", href: "/ai-automation/ai-chatbots" },
      { label: "AI voice agents", href: "/ai-automation/ai-voice-agents" },
    ],
  },
  {
    label: "Sales & Lead Generation",
    href: "/sales-lead-gen",
    hint: "A pipeline you can predict",
    children: [
      { label: "Cold email outreach", href: "/sales-lead-gen/cold-email" },
      { label: "LinkedIn outreach", href: "/sales-lead-gen/linkedin-outreach" },
      { label: "Appointment setting", href: "/sales-lead-gen/appointment-setting" },
    ],
  },
  { label: "Branding & Growth", href: "/branding-growth", hint: "Look like the leader in your space" },
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
  // mobile menu only: which service column has its internal pages expanded
  const [openCol, setOpenCol] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>();
  const navRef = useRef<HTMLElement>(null);
  // whether the open dropdown was opened by a mouse (hover) or by a tap / click
  const openedByMouse = useRef(false);
  // pending hover-close; cancelled if the mouse comes back before it fires
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
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

  // close an open dropdown on Escape, an outside click/tap, or (when it was
  // opened by a tap rather than hover) on scroll
  useEffect(() => {
    if (!openMenu) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Element | null;
      if (navRef.current && target && !target.closest(".nav-drop")) setOpenMenu(null);
    }
    function onScroll() {
      if (!openedByMouse.current) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
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
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setOpen(false);
    setOpenMenu(null);
    setOpenCol(null);
  }
  const toggleMenu = (menu: Menu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    openedByMouse.current = false;
    setOpenMenu((m) => (m === menu ? null : menu));
  };
  // Hover is decided per pointer, not per device: a mouse always gets
  // hover-to-open / leave-to-close, even on a touchscreen laptop whose browser
  // reports "(hover: none)". Fingers and pens ignore these and use the toggle.
  // Leaving closes after a short grace period so brushing the panel's edge or
  // crossing the gap between the pill and the panel doesn't snap it shut.
  const HOVER_CLOSE_DELAY = 150;
  const hoverProps = (menu: Menu) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      openedByMouse.current = true;
      setOpenMenu(menu);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        closeTimer.current = null;
        setOpenMenu((m) => (m === menu ? null : m));
      }, HOVER_CLOSE_DELAY);
    },
  });

  const renderLink = (link: NavLink) => (
    <Link key={link.label} href={link.href} className={isActive(link.href) ? "active" : undefined} onClick={closeAll}>
      {link.label}
    </Link>
  );
  const renderPanel = (links: NavLink[], label: string) => (
    <div className="nav-drop-panel" role="menu" aria-label={label}>
      {links.map((link) => (
        <Link key={link.label} href={link.href} role="menuitem" className={isActive(link.href) ? "active" : undefined} onClick={closeAll}>
          {link.label}
          {link.hint && <small>{link.hint}</small>}
        </Link>
      ))}
    </div>
  );

  // Services mega-menu: one column per service (its page + built internal pages).
  // On desktop every column is open; in the mobile menu each column with
  // children gets its own caret and expands one level further.
  const servicesPanel = (
    <div className="nav-drop-panel nav-drop-panel--mega" role="menu" aria-label="Services">
      {SERVICE_LINKS.map((svc) => {
        const colOpen = openCol === svc.href;
        return (
          <div className={`nav-mega-col${colOpen ? " open" : ""}`} key={svc.href}>
            <div className="nav-mega-head">
              <Link href={svc.href} role="menuitem" className={`nav-mega-svc${isActive(svc.href) ? " active" : ""}`} onClick={closeAll}>
                {svc.label}
                {svc.hint && <small>{svc.hint}</small>}
              </Link>
              {svc.children && (
                <button
                  type="button"
                  className="nav-mega-toggle"
                  aria-label={`Show ${svc.label} pages`}
                  aria-expanded={colOpen}
                  onClick={() => setOpenCol((c) => (c === svc.href ? null : svc.href))}
                >
                  <Caret />
                </button>
              )}
            </div>
            {svc.children && (
              <ul className="nav-mega-list">
                {svc.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} role="menuitem" className={pathname === child.href ? "active" : undefined} onClick={closeAll}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
      <Link href="/services" role="menuitem" className="nav-mega-all" onClick={closeAll}>
        See all services <span aria-hidden="true">→</span>
      </Link>
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
          <div className={`nav-drop nav-drop--mega${openMenu === "services" ? " open" : ""}`} {...hoverProps("services")}>
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
            {servicesPanel}
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
