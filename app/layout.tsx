import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fallbackMetadata: Metadata = {
  title: "Ashish Sharma | Full Stack Developer",
  description:
    "Ashish Sharma builds fast, useful and modern digital products with PHP, WordPress, JavaScript, React and Next.js.",
  icons: { icon: "/assets/images/favicon.svg?v=2" },
};

export const metadata: Metadata = fallbackMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        <link rel="stylesheet" href="/assets/css/project-gallery.css" />
        <link rel="stylesheet" href="/assets/css/react-portfolio.css" />
      </head>
      <body className="template-color-1 white-version">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
