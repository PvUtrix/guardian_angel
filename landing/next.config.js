/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  // Disable static optimization for dynamic routes
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig
