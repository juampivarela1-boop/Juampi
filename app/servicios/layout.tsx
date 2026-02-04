import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios de Arquitectura',
  description:
    'Servicios de arquitectura en Villa Gesell: proyecto y dirección de obra nueva, reformas y ampliaciones, vivienda unifamiliar, proyecto ejecutivo, documentación municipal. Arquitectura moderna y sustentable.',
  keywords: [
    'proyecto de obra',
    'dirección de obra Villa Gesell',
    'obra nueva',
    'reforma integral',
    'ampliación casa',
    'vivienda unifamiliar',
    'proyecto ejecutivo',
    'documentación municipal',
    'arquitectura sustentable',
    'anteproyecto',
    'cómputo y presupuesto',
  ],
  alternates: {
    canonical: 'https://arquitecturamartin.com.ar/servicios',
  },
  openGraph: {
    title: 'Servicios de Arquitectura | Martín Varvasini - Villa Gesell',
    description:
      'Proyecto y dirección de obra nueva, reformas y ampliaciones, vivienda unifamiliar, arquitectura sustentable en Villa Gesell, Mar Azul y Mar de las Pampas.',
    url: 'https://arquitecturamartin.com.ar/servicios',
  },
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
