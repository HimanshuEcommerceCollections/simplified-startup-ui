import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The intake form moved; keep old links and bookmarks working.
      { source: "/growth-plan", destination: "/start-project", permanent: true },
    ];
  },
};

export default nextConfig;
