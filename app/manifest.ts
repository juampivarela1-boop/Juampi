import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Martín Varvasini - Arquitecto Villa Gesell',
    short_name: 'Arq. Martín Varvasini',
    description:
      'Estudio de arquitectura con una amplia cobertura. Diseño y dirección de obra.',
    start_url: '/',
    display: 'standalone',
    background_color: '#D8CEBA',
    theme_color: '#D07A22',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
