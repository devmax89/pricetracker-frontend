/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|webp|svg|gif|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^http:\/\/.*\/api\/products/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-products-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60,
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /^https?:.*\/products\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'product-pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
});

const nextConfig = {
  // Aggiungi questa riga per Next.js 16
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazon.it',
      },
      {
        protocol: 'https',
        hostname: '**.mediaworld.it',
      },
      {
        protocol: 'https',
        hostname: '**.ldlc.com',
      },
      {
        protocol: 'https',
        hostname: '**.akinformatica.it',
      },
      {
        protocol: 'https',
        hostname: '**.nexths.it',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-eu.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'media.ldlc.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mmsrg.com',
      },
    ],
  },
}

module.exports = withPWA(nextConfig); 