"use client";
import { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/wordpress";
const SiteSettingsContext = createContext<SiteSettings>({});
export function SiteSettingsProvider({ children, settings }: Readonly<{ children: React.ReactNode; settings: SiteSettings }>) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}
export function useSiteSettings() { return useContext(SiteSettingsContext); }
