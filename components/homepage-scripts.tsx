"use client";

import { useEffect } from "react";

const scripts = [
  "jquery.js",
  "modernizer.min.js",
  "feather.min.js",
  "bootstrap.js",
  "text-type.js",
  "wow.js",
  "aos.js",
  "particles.js",
  "jquery-one-page-nav.js",
  "main.js",
  "owl.carousel.js",
  "homepage-captcha.js",
  "portfolio-refresh.js",
  "dynamic-content.js",
  "testimonial-slider.js",
  "mobile-sliders.js",
  "project-details.js",
];

let homepageScriptsLoaded: Promise<void> | undefined;

async function loadHomepageScripts() {
  for (const name of scripts) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `/assets/js/${name}`;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Could not load homepage script: ${name}`));
      document.body.append(script);
    });
  }
  window.dispatchEvent(new Event("portfolio-homepage-ready"));
}

export function HomepageScripts() {
  useEffect(() => {
    let active = true;
    let observer: IntersectionObserver | undefined;

    homepageScriptsLoaded ??= loadHomepageScripts();
    void homepageScriptsLoaded
      .then(() => {
        if (!active) return;

        const sections = [...document.querySelectorAll<HTMLElement>(
          "#home, #features, #portfolio, #resume, #testimonial, #contacts",
        )];
        const navigationLinks = [...document.querySelectorAll<HTMLAnchorElement>(
          ".site-desktop-nav a",
        )];
        if ("IntersectionObserver" in window) {
          observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              for (const link of navigationLinks) {
                if (link.hash === `#${entry.target.id}`) {
                  link.setAttribute("aria-current", "location");
                } else {
                  link.removeAttribute("aria-current");
                }
              }
            }
          }, { rootMargin: "-15% 0px -65% 0px" });
          sections.forEach((section) => observer?.observe(section));
        }

        if (new URLSearchParams(window.location.search).get("quote") === "1") {
          const modal = document.getElementById("quoteModal");
          const bootstrap = (window as Window & {
            bootstrap?: {
              Modal: { getOrCreateInstance: (element: Element) => { show: () => void } };
            };
          }).bootstrap;
          if (modal && bootstrap) bootstrap.Modal.getOrCreateInstance(modal).show();
        }
      })
      .catch((error: unknown) => {
        console.error("Homepage behavior could not be initialized.", error);
      });

    return () => {
      active = false;
      observer?.disconnect();
    };
  }, []);

  return null;
}
