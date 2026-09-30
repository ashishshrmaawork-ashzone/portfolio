import type { Metadata } from "next";
import { loadSiteSettings } from "@/lib/wordpress";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteSettingsProvider } from "@/components/site-settings-provider";

const fallbackMetadata: Metadata = {
  title: "Ashish Sharma | Full Stack Developer",
  description:
    "Ashish Sharma builds fast, useful and modern digital products with PHP, WordPress, JavaScript, React and Next.js.",
  icons: { icon: "/assets/images/favicon.svg?v=2" },
};

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSiteSettings();
  return { ...fallbackMetadata, title: settings.site_name ? settings.site_name + " | " + (settings.site_tagline ?? "Full Stack Developer") : fallbackMetadata.title,
    description: settings.site_description ?? fallbackMetadata.description,
    icons: { icon: settings.favicon_url || "/assets/images/favicon.svg" } };
}
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await loadSiteSettings();
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/aos.css" />
        <link rel="stylesheet" href="/assets/css/feature.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/portfolio-refresh.css" />
        <link rel="stylesheet" href="/assets/css/site-layout.css" />
        <link rel="stylesheet" href="/assets/css/project-details.css" />
        <link rel="stylesheet" href="/assets/css/blog.css" />
        <link rel="stylesheet" href="/assets/css/react-portfolio.css" />
      </head>
      <body className="template-color-1 white-version">
        <SiteSettingsProvider settings={settings}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
