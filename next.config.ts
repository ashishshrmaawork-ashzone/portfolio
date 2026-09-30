import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/portfolios", destination: "/projects", permanent: true },
      { source: "/portfolio.html", destination: "/projects", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/original/index.html" },
        { source: "/index.html", destination: "/original/index.html" },
        { source: "/project-details.html", destination: "/original/project-details.html" },
        { source: "/blog.html", destination: "/original/blog.html" },
        { source: "/blog-detail.html", destination: "/original/blog-detail.html" },
        { source: "/assets/:path*", destination: "/original/assets/:path*" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};
export default nextConfig;
