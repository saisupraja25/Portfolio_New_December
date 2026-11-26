import type { NextConfig } from 'next';

// Static export so the site can be hosted on GitHub Pages (or any static host).
// For a GitHub "project page" (https://user.github.io/<repo>/) set NEXT_PUBLIC_BASE_PATH=/<repo>.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
