import type { Metadata } from "next";
import "./homepage.css";
import { Homepage } from "@/components/homepage";

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ashish Sharma",
  alternateName: ["Ashish Sharma Portfolio", "Ashish Sharma | Full Stack Developer"],
  url: "https://ashishshrmaa.vercel.app/",
};

export const metadata: Metadata = {
  title: "Ashish Sharma | Full Stack Developer & Web Solutions Expert",
  description:
    "Ashish Sharma builds fast, useful digital products with PHP, WordPress, JavaScript, React and Next.js.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Ashish Sharma | Full Stack Developer & Web Solutions Expert",
    description:
      "Ashish Sharma builds fast, useful digital products with PHP, WordPress, JavaScript, React and Next.js.",
    siteName: "Ashish Sharma",
  },
  twitter: {
    card: "summary",
    title: "Ashish Sharma | Full Stack Developer & Web Solutions Expert",
    description:
      "Ashish Sharma builds fast, useful digital products with PHP, WordPress, JavaScript, React and Next.js.",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <Homepage />
    </>
  );
}
