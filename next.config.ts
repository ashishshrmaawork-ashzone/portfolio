import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/portfolios", destination: "/projects", permanent: true },
      { source: "/portfolio.html", destination: "/projects", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/blog-detail.html", destination: "/blog", permanent: true },
      { source: "/project-details.html", destination: "/projects", permanent: true },
    ];
  },
};
export default nextConfig;
