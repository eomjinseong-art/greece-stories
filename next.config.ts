import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/cities", destination: "/polis", permanent: true },
      { source: "/cities/:slug", destination: "/polis/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
