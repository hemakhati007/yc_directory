import {withSentryConfig} from '@sentry/nextjs';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // reactStrictMode: true,
  /* config options here */
  typescript: {
    ignoreBuildErrors:true,
  },
  eslint: {
    ignoreDuringBuilds:true,
  },
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
 
    experimental: {
      // turbo option removed because it now expects a DeprecatedExperimentalTurboOptions object
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "hema-kahti",

  project: "yc_directory",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
});
// experimental bcz its experimental feature right now soon it will be stable