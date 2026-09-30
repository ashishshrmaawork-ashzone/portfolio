"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "@/components/site-settings-provider";

const links = [
  ["#home", "Home", "nav_home"],
  ["#about", "About", "nav_about"],
  ["#features", "Services", "nav_services"],
  ["/projects", "Portfolio", "nav_portfolio"],
  ["#resume", "Resume", "nav_resume"],
  ["/blog", "Blog", "nav_blog"],
  ["#contacts", "Contact", "nav_contact"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const settings = useSiteSettings();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const quoteHref = "/#quote";
  const quoteLabel = settings.nav_quote ?? "Get a Quote";

  useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    const closeButton = menu?.querySelector<HTMLButtonElement>(".site-menu-close");
    closeButton?.focus();
    document.body.classList.add("site-menu-open");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menu) return;

      const items = [...menu.querySelectorAll<HTMLElement>("button, a[href]")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("site-menu-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" href="/#home" aria-label="Ashish Sharma home">
          <img src={settings.logo_url || "/assets/images/logo.svg"} alt={settings.site_name ?? "Ashish Sharma"} width="225" height="48" />
        </Link>
        <nav className="site-desktop-nav" aria-label="Main navigation">
          {links.map(([href, label, key]) => (
            <Link href={href.startsWith("#") && pathname !== "/" ? `/${href}` : href} key={key}>
              {settings[key] || label}
            </Link>
          ))}
        </nav>
        <Link className="site-quote" href={quoteHref}>
          {quoteLabel} <span aria-hidden="true">↗</span>
        </Link>
        <button
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          className="site-menu-toggle"
          ref={toggleRef}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="site-menu-overlay" hidden={!menuOpen} id="site-mobile-menu" onClick={() => setMenuOpen(false)}>
          <div aria-label="Navigation" aria-modal="true" className="site-menu-panel" onClick={(event) => event.stopPropagation()} ref={menuRef} role="dialog">
            <div className="site-menu-heading">
              <img src={settings.logo_url || "/assets/images/logo.svg"} alt={settings.site_name ?? "Ashish Sharma"} width="190" height="42" />
              <button className="site-menu-close" onClick={() => setMenuOpen(false)} type="button" aria-label="Close navigation">×</button>
            </div>
            <nav aria-label="Mobile navigation">
              {links.map(([href, label, key]) => (
                <Link href={href.startsWith("#") && pathname !== "/" ? `/${href}` : href} key={key} onClick={() => setMenuOpen(false)}>
                  {settings[key] || label}
                </Link>
              ))}
              <Link className="site-quote" href={quoteHref} onClick={() => setMenuOpen(false)}>
                {quoteLabel} <span aria-hidden="true">↗</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
