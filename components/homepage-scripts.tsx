"use client";

import { useEffect } from "react";

const scripts = [
  "jquery.js",
  "modernizer.min.js",
  "feather.min.js",
  "bootstrap.js",
  "site-layout.js",
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
    homepageScriptsLoaded ??= loadHomepageScripts();
    void homepageScriptsLoaded.catch((error: unknown) => {
      console.error("Homepage behavior could not be initialized.", error);
    });
  }, []);

  return null;
}
