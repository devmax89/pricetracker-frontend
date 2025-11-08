/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
}

module.exports = nextConfig