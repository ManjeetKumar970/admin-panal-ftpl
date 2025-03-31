import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dpubpwljl/**'
      }
    ]
  }
};
export default nextConfig;
