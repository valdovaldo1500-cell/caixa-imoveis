import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    // Pretty URL for the static Darlei sítios catalog in public/
    return [{ source: "/sitios", destination: "/sitios.html" }];
  },
};

export default nextConfig;
