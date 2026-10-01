import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

const fallbackMetadata: Metadata = {
  metadataBase: new URL("https://ashishshrmaa.vercel.app"),
  title: "Ashish Sharma | Full Stack Developer",
  applicationName: "Ashish Sharma",
  authors: [{ name: "Ashish Sharma" }],
  creator: "Ashish Sharma",
  publisher: "Ashish Sharma",
  description:
    "Ashish Sharma builds fast, useful and modern digital products with PHP, WordPress, JavaScript, React and Next.js.",
  openGraph: {
    type: "website",
    siteName: "Ashish Sharma",
    title: "Ashish Sharma | Full Stack Developer",
    description:
      "Ashish Sharma builds fast, useful and modern digital products with PHP, WordPress, JavaScript, React and Next.js.",
  },
  twitter: {
    card: "summary",
    title: "Ashish Sharma | Full Stack Developer",
    description:
      "Ashish Sharma builds fast, useful and modern digital products with PHP, WordPress, JavaScript, React and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/assets/images/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
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
        <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/assets/css/portfolio-refresh.css" />
        <link rel="stylesheet" href="/assets/css/site-layout.css" />
        <link rel="stylesheet" href="/assets/css/project-details.css" />
        <link rel="stylesheet" href="/assets/css/blog.css" />
        <link rel="stylesheet" href="/assets/css/project-gallery.css" />
        <link rel="stylesheet" href="/assets/css/react-portfolio.css" />
      </head>
      <body className="template-color-1 spybody white-version">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
