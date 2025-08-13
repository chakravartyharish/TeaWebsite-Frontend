/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['localhost', 'images.unsplash.com', 'plus.unsplash.com', 'teawebsite-f6328f6fe19f.herokuapp.com'],
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Environment-specific configuration
  env: {
    CUSTOM_KEY: process.env.NODE_ENV,
  },
  
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Suppress specific console warnings in development
      const originalConsoleError = console.error;
      console.error = (...args) => {
        const message = args[0]?.toString() || '';
        // Filter out Clerk-related headers() warnings
        if (message.includes('headers()` should be awaited') || 
            message.includes('sync-dynamic-apis')) {
          return; // Don't log these specific warnings
        }
        originalConsoleError.apply(console, args);
      };
    }
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    // Suppress warnings about dynamic imports in development
    config.ignoreWarnings = [
      { message: /Critical dependency: the request of a dependency is an expression/ },
      { message: /Route .* used `headers\(\)` should be awaited before using its value/ },
    ];
    
    return config;
  },
  
  // Netlify-specific optimizations
  trailingSlash: false,
  output: 'standalone',
};

module.exports = nextConfig;
