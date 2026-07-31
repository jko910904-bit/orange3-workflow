import type { NextConfig } from "next";

/**
 * Separate dist dirs so `next build` cannot corrupt a running `next dev` cache.
 * Dev: .next-dev  |  Build/Start: .next
 */
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      { source: "/templates", destination: "/screens", permanent: false },
      { source: "/templates/:id", destination: "/screens/:id", permanent: false },
      {
        source: "/screens/member",
        destination: "/screens/member-management",
        permanent: false,
      },
      { source: "/preview/tokens", destination: "/foundations", permanent: false },
      { source: "/preview/components/button", destination: "/components/button", permanent: false },
      { source: "/preview/components/input", destination: "/components/input", permanent: false },
      { source: "/preview/components/card", destination: "/components/card", permanent: false },
      { source: "/preview/components/table", destination: "/components/table", permanent: false },
      { source: "/preview/ai-metadata", destination: "/ai-metadata", permanent: false },
      { source: "/preview/compose", destination: "/prompt", permanent: false },
      { source: "/preview/generator", destination: "/prompt", permanent: false },
    ];
  },
  async rewrites() {
    return [
      // Orange3 static workflow editor
      { source: "/orange", destination: "/orange/index.html" },
      { source: "/orange/", destination: "/orange/index.html" },
    ];
  },
};

export default nextConfig;
