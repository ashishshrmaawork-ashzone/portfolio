import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/portfolio.html", destination: "/projects", permanent: true },
      {
        source: "/project-details.html",
        has: [{ type: "query", key: "project", value: "(?<slug>[^&]+)" }],
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/project-details.html",
        destination: "/projects",
        permanent: true,
      },
      { source: "/blog.html", destination: "/blog", permanent: true },
      {
        source: "/blog-detail.html",
        has: [{ type: "query", key: "article", value: "(?<slug>[^&]+)" }],
        destination: "/blog/:slug",
        permanent: true,
      },
      { source: "/blog-detail.html", destination: "/blog", permanent: true },
    ];
  },
};
export default nextConfig;
