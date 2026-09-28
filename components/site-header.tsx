"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  ["#home", "Home"],
  ["#features", "Services"],
  ["#portfolio", "Portfolio"],
  ["#resume", "Resume"],
  ["#testimonial", "Testimonials"],
  ["#contacts", "Contact"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" href="/#home" aria-label="Ashish Sharma home">
          <img src="/assets/images/logo.svg" alt="Ashish Sharma" width="225" height="48" />
        </Link>
        <nav className="site-desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button button-small header-cta" href="/#contacts">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </Link>
        <button
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="site-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {links.map(([href, label]) => (
              <Link href={href} key={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link className="button" href="/#contacts" onClick={() => setMenuOpen(false)}>
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
