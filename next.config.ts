import type { NextConfig } from "next";

/**
 * Separate dist dirs so `next build` cannot corrupt a running `next dev` cache.
 * Dev: .next-dev  |  Build/Start: .next
 */
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
