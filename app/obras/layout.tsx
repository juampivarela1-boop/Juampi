import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obras',
  description: 'Galería de proyectos realizados en Villa Gesell, Mar Azul y Mar de las Pampas. Casas modernas, reformas y ampliaciones diseñadas por Martín Varvasini.',
  openGraph: {
    title: 'Portafolio de Obras | Martín Varvasini Arquitecto',
    description: 'Explora más de 100+ proyectos arquitectónicos. Casas nuevas, reformas y diseño contemporáneo.',
    url: 'https://arquitecturamartin.com.ar/obras',
    siteName: 'Martín Varvasini - Arquitecto',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: 'https://arquitecturamartin.com.ar/Img/CASA%20CAROLINA/SaveClip.App_426985872_1135797071207775_2804125062818619571_n.jpg',
        width: 1200,
        height: 630,
        alt: 'Casa Carolina – Casa Nueva – fachada exterior y diseño arquitectónico – Mar de las Pampas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portafolio de Obras | Martín Varvasini Arquitecto',
    description: 'Explora más de 100 proyectos arquitectónicos.',
  },
};

export default function ObrasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
