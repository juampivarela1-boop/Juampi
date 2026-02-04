import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estudio',
  description:
    'Martín Varvasini, arquitecto con más de 24 años de experiencia. Arquitectura moderna, sustentable y diseño personalizado. Más de 100 proyectos ejecutados.',
  keywords: [
    'arquitecto Villa Gesell',
    'estudio arquitectura Villa Gesell',
    'arquitecto Mar Azul',
    'arquitectura moderna',
    'diseño sustentable',

  ],
  alternates: {
    canonical: 'https://arquitecturamartin.com.ar/estudio',
  },
  openGraph: {
    title: 'Estudio | Martín Varvasini - Arquitecto Villa Gesell',
    description:
      'Conocé al arquitecto Martín Varvasini. Más de 24 años diseñando casas modernas en Villa Gesell, Mar Azul y Mar de las Pampas.',
    url: 'https://arquitecturamartin.com.ar/estudio',
    images: [
      {
        url: '/1_martin_varvasini.jpg',
        width: 1200,
        height: 1200,
        alt: 'Martín Varvasini - Arquitecto',
      },
    ],
  },
};

export default function EstudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
