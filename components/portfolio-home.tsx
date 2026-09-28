"use client";

import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PortfolioSections } from "@/components/portfolio-sections";
import { useSiteSettings } from "@/components/site-settings-provider";
import { useEffect, useState } from "react";

export function PortfolioHome() {
  const settings = useSiteSettings();
  const [activeRole, setActiveRole] = useState(0);
  const roles = (settings.home_roles || "Developer.\nProfessional Coder.\nWeb Developer.")
    .split(/\r?\n/)
    .map((role) => role.trim())
    .filter(Boolean);
  const highlights = (settings.about_highlights || "Full stack web development\nWordPress and custom applications\nPerformance and deployment")
    .split(/\r?\n/)
    .map((highlight) => highlight.trim())
    .filter(Boolean);
  const stats = (settings.home_stats || "10+|Years experience\n50+|Projects delivered\n24/7|Technical support")
    .split(/\r?\n/)
    .map((entry) => entry.split("|", 2))
    .filter(([value, label]) => Boolean(value && label));

  useEffect(() => {
    if (roles.length < 2) return;
    const timer = window.setInterval(() => setActiveRole((index) => (index + 1) % roles.length), 2800);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  return (
    <main className="main-page-wrapper">
      <section className="rn-slider-area" id="home">
        <div className="slide slider-style-1">
          <div className="container">
            <div className="row row--30 align-items-center">
              <div className="col-lg-7">
                <div className="content">
                  <div className="inner">
                    <span className="subtitle">{settings.home_eyebrow || "Welcome to my world"}</span>
                    <h1 className="title">
                      Hi, I’m <span>{settings.home_name || settings.site_name || "Ashish Sharma"}</span>
                      <br />
                      <span className="header-caption">
                        <span className="cd-headline clip is-full-width">
                          <span>a </span>
                          <span className="cd-words-wrapper">
                            <b className="is-visible" key={activeRole}>{roles[activeRole] || "Developer."}</b>
                          </span>
                        </span>
                      </span>
                    </h1>
                    <p className="description">
                      {settings.home_intro ||
                        "I build reliable digital experiences across PHP, WordPress, JavaScript, React, Next.js and server handling — from a clean interface to a dependable deployment."}
                    </p>
                    <div className="dev-terminal" aria-label="Developer status">
                      <div className="dev-terminal-bar"><span /><span /><span /><code>{settings.terminal_user || "ashish@dev:~"}</code></div>
                      <div className="dev-terminal-line"><b>$</b> <span>{settings.terminal_command || "build --fast --secure --scalable"}</span></div>
                      <div className="dev-terminal-line success"><b>✓</b> <span>{settings.terminal_status || "ready for your next project"}</span></div>
                    </div>
                    <div className="hero-actions">
                      <Link className="rn-btn" href="#portfolio">{settings.primary_cta || "View my work"} <span aria-hidden="true">↗</span></Link>
                      <Link className="hero-text-link" href="#contacts">{settings.secondary_cta || "Start a project"} ↗</Link>
                    </div>
                    <div className="hero-proof">
                      {stats.map(([value, label]) => (
                        <div key={`${value}-${label}`}><strong>{value}</strong><span>{label}</span></div>
                      ))}
                    </div>
                    <div className="hero-connect">
                      <span className="title">Let&apos;s connect</span>
                      <div className="social-share">
                        {settings.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
                        {settings.github_url && <a href={settings.github_url} target="_blank" rel="noreferrer">GitHub ↗</a>}
                        {settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noreferrer">Instagram ↗</a>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="thumbnail">
                  <div className="inner">
                    <img src={settings.hero_image_url || "/assets/images/tech-stack.svg"} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rn-about-area rn-section-gap section-separator" id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="subtitle">{settings.about_eyebrow || "A little about me"}</span>
              <h2 className="title">{settings.about_title || "Building useful digital experiences."}</h2>
              <p>{settings.about_intro || "I am a full stack developer who enjoys turning complex problems into fast, dependable products."}</p>
              <p>{settings.about_detail || "From early planning and interface development through deployment and ongoing support, I help teams build web experiences that work well for the people who use them."}</p>
              <ul className="about-highlights">
                {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
            <div className="about-visual">
              <img src={settings.about_image_url || settings.hero_image_url || "/assets/images/tech-stack.svg"} alt={settings.about_image_url ? (settings.about_image_alt || settings.site_name || "About Ashish Sharma") : ""} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <PortfolioSections />

      <section className="rn-contact-area rn-section-gap section-separator" id="contacts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <span className="subtitle">{settings.contact_eyebrow || "Contact"}</span>
                <h2 className="title">{settings.contact_title || "Let’s build something great."}</h2>
              </div>
            </div>
          </div>
          <div className="row mt--50 mt-contact-sm">
            <div className="col-lg-5">
              <div className="contact-about-area">
                <span className="contact-availability">{settings.contact_availability || "Available for freelance projects"}</span>
                <h3 className="contact-intro-title">{settings.contact_intro_title || "Your idea. Our next project."}</h3>
                <p className="contact-intro-copy">{settings.contact_intro || "Need a website, an application or a better experience for your users? Tell me what you have in mind."}</p>
                {settings.contact_email && <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>}
                {settings.whatsapp_url && <p><a href={settings.whatsapp_url} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a></p>}
              </div>
            </div>
            <div className="col-lg-7 contact-input">
              <div className="contact-form-wrapper">
                <h3>Send a message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="quote-section" id="quote">
            <div className="section-title">
              <span className="subtitle">Project enquiry</span>
              <h2 className="title">Request a quote</h2>
              <p>Tell me about the work you have in mind and I’ll get back to you.</p>
            </div>
            <ContactForm type="quote" />
          </div>
        </div>
      </section>
    </main>
  );
}
