/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repfy/ui', '@repfy/types', '@repfy/utils'],
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
