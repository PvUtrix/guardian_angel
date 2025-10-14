/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone for now to debug
  // output: 'standalone',
  serverExternalPackages: [],
  images: {
    domains: ['localhost'],
  },
  // Enable compression
  compress: true,
  // Optimize for production
  poweredByHeader: false,
  generateEtags: false,
  // Ensure proper routing
  trailingSlash: false,
  // Ensure proper base path handling
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig
