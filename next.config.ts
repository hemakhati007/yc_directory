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
  },
  // experimental: {
  //   ppr: 'incremental'
  //   // cacheComponents: true,
  // },
  // // additional devindicators
  // devIndicators: {
  //   buildActivity: true,          // Shows the "building…" indicator in the browser
  //   buildActivityPosition: 'bottom-right', // Position of the build indicator
  //   // autoPrerender: false,         // Shows auto prerender indicator (deprecated in App Router)
  // }

};

export default nextConfig;
// experimental bcz its experimental feature right now soon it will be stable

