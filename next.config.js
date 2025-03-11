/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  // Ensure the app directory is used as the root
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
    ];
  },
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production
  swcMinify: true, // Use SWC minifier
  experimental: {
    // Enable experimental features for better performance
    optimizeCss: true, // Optimize CSS
    scrollRestoration: true, // Restore scroll position
    optimisticClientCache: true, // Optimistic client cache
  },
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Only run in production build
    if (!dev) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 