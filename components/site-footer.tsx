"use client";

import Link from "next/link";
import { useSiteSettings } from "@/components/site-settings-provider";

export function SiteFooter() {
  const settings = useSiteSettings();
  const services = (settings.footer_services ?? "Web Development\nPerformance Optimization\nServer Handling\nWebsite Maintenance")
    .split(/\r?\n/)
    .map((label) => label.trim())
    .filter(Boolean);

  return (
    <footer className="rn-footer-area">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-intro">
            <Link href="/#home" aria-label="Ashish Sharma home">
              <img className="footer-wordmark" src={settings.footer_logo_url || "/assets/images/logo-footer.svg"} alt={settings.site_name ?? "Ashish Sharma"} width="240" height="52" />
            </Link>
            <p>{settings.footer_description ?? "Building fast, secure and scalable digital experiences from idea to deployment."}</p>
            <Link className="footer-cta" href="/#contacts">{settings.footer_cta ?? "Let’s work together"} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="footer-links">
            <h4>{settings.footer_explore_heading ?? "Explore"}</h4>
            <Link href="/#about">About</Link>
            <Link href="/#features">Services</Link>
            <Link href="/#portfolio">Portfolio</Link>
            <Link href="/#resume">Experience</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="footer-links">
            <h4>{settings.footer_services_heading ?? "Services"}</h4>
            {services.map((service) => <Link href="/#features" key={service}>{service}</Link>)}
          </div>
          <div className="footer-links">
            <h4>{settings.footer_contact_heading ?? "Connect"}</h4>
            <a href={`mailto:${settings.contact_email ?? "ashishshrmaa@outlook.com"}`}>{settings.contact_email ?? "ashishshrmaa@outlook.com"}</a>
            {settings.whatsapp_url && (
              <a href={settings.whatsapp_url} target="_blank" rel="noreferrer">
                WhatsApp ↗
              </a>
            )}
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
            <Link href="/#contacts">
              {settings.footer_cta ?? "Start a project"} ↗
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{settings.copyright ?? `© ${new Date().getFullYear()} Ashish Sharma. All rights reserved.`}</span>
          <span>Designed &amp; built with care in India.</span>
        </div>
      </div>
    </footer>
  );
}
