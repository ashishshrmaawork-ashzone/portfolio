"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/wordpress";

const SiteSettingsContext = createContext<SiteSettings>({});

function isSiteSettings(value: unknown): value is SiteSettings {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every((entry) => typeof entry === "string")
  );
}

export function SiteSettingsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, setSettings] = useState<SiteSettings>({});
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/portfolio/site-settings", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Site settings request failed (${response.status}).`);
        }

        const result: unknown = await response.json();
        if (!isSiteSettings(result)) {
          throw new Error("WordPress returned invalid site settings.");
        }

        setSettings(result);
        if (typeof result.site_name === "string") {
          const title =
            pathname === "/"
              ? `${result.site_name} | ${result.site_tagline || "Full Stack Developer"}`
              : document.title.replace(/\|\s*Ashish Sharma$/, `| ${result.site_name}`);
          document.title = title;
        }
        if (pathname === "/" && typeof result.site_description === "string") {
          const description = document.querySelector('meta[name="description"]');
          description?.setAttribute("content", result.site_description);
        }
        if (typeof result.favicon_url === "string" && result.favicon_url) {
          document.querySelector('link[rel="icon"]')?.setAttribute("href", result.favicon_url);
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Portfolio site settings failed to load.", error);
      }
    }

    void load();
    return () => controller.abort();
  }, [pathname]);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
