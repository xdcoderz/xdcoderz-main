import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */


  async rewrites() {
    return [
      {
        source: "/portfolio",
        destination: "https://xdcoder-portfolio.vercel.app/portfolio",
      },
      {
        source: "/portfolio/:path*",
        destination: "https://xdcoder-portfolio.vercel.app/portfolio/:path*",
      },
    ];
  },
};

export default nextConfig;
