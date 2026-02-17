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
      // Caso especial: index.php suele ser la home
      { source: "/index.php", destination: "/", permanent: true },

      // Genérico: cualquier /algo.php -> /algo
      // Ej: /contacto.php -> /contacto
      //     /servicios.php -> /servicios
      { source: "/:path*.php", destination: "/:path*", permanent: true },

      // Si llegara a aparecer con slash final (raro, pero pasa)
      { source: "/:path*.php/", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
