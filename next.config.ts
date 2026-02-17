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
      // ---- URLs viejas sin .php (secciones antiguas)
      { source: "/obrasejecutadas", destination: "/obras", permanent: true },
      { source: "/obrasejecutadas/", destination: "/obras", permanent: true },

      { source: "/obrasenejecucion", destination: "/obras", permanent: true },
      { source: "/obrasenejecucion/", destination: "/obras", permanent: true },

      { source: "/administraciondepropiedades", destination: "/servicios", permanent: true },
      { source: "/administraciondepropiedades/", destination: "/servicios", permanent: true },

      // ---- URL vieja dinámica con query ?id=...
      // manda cualquier /obra?id=72 a /obras (listado)
      {
        source: "/obra",
        has: [{ type: "query", key: "id" }],
        destination: "/obras",
        permanent: true,
      },
      // por si alguien entra sin query
      { source: "/obra", destination: "/obras", permanent: true },

      // ---- .php -> sin .php (genérico)
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/:path*.php", destination: "/:path*", permanent: true },
      { source: "/:path*.php/", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
