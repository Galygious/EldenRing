/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages configuration
  basePath: '/EldenRing',
  assetPrefix: '/EldenRing',
};

module.exports = nextConfig; 