import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'
import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/carousel',
      '@mantine/charts',
      '@mantine/dates',
      '@mantine/dropzone',
      '@mantine/form',
      '@mantine/notifications',
      '@mantine/spotlight',
      '@mantine/tiptap',
    ],
  },
  serverExternalPackages: ['@aws-sdk/client-s3', 'pg', 'pino', 'pino-pretty', 'oslo'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.conqdb.com',
        port: '',
      },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  /**
   * @neshca/cache-handler does not support next@15 yet
   * https://github.com/caching-tools/next-shared-cache/discussions/691
   */
  // cacheHandler:
  //   process.env.NODE_ENV === 'production' ? path.resolve('./cache-handler.mjs') : undefined,
  cacheMaxMemorySize: 0,
  output: 'standalone',
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true', openAnalyzer: true })(
  withPayload(withNextIntl(nextConfig)),
)
