/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'plus.unsplash.com', 'teawebsite-f6328f6fe19f.herokuapp.com'],
    unoptimized: true,
  },
  
  // Disable ESLint and TypeScript checking during build for production
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Netlify-compatible configuration
  trailingSlash: false,
};

module.exports = nextConfig;
