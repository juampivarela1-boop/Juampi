import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },

  // Optimize for production
  reactStrictMode: true,
  // ✅ Redirects para URLs viejas .php -> rutas nuevas
  redirects: async () => {
    return [
      // ✅ URL vieja sin .php
      { source: "/obrasejecutadas", destination: "/obras", permanent: true },
      { source: "/obrasejecutadas/", destination: "/obras", permanent: true },

      // (si tu ruta real es /proyectos, usá esto en vez de /obras)
      // { source: "/obrasejecutadas", destination: "/proyectos", permanent: true },
      // { source: "/obrasejecutadas/", destination: "/proyectos", permanent: true },

      // ✅ index.php -> home
      { source: "/index.php", destination: "/", permanent: true },

      // ✅ cualquier /algo.php -> /algo
      { source: "/:path*.php", destination: "/:path*", permanent: true },
      { source: "/:path*.php/", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
