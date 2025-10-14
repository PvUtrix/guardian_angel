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
}

module.exports = nextConfig
