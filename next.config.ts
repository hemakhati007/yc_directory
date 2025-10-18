import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // reactStrictMode: true,
  /* config options here */
  images: {
    dangerouslyAllowSVG:true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        // to allow imgaes from all src
      }
    ]
  }
};

export default nextConfig;
