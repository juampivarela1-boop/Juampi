import Hero from '@/components/sections/Hero';
import FeaturedWorks from '@/components/sections/FeaturedWorks';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import MediaSection from '@/components/sections/MediaSection';
import CTAWhatsApp from '@/components/CTAWhatsApp';
import { Metadata } from 'next';
import { localBusinessSchema, websiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Estudio de arquitectura. Diseño de casas modernas, dirección de obra, reformas y ampliaciones. Más de 24 años de experiencia y 50+ proyectos ejecutados.',
  keywords: [
    'arquitecto',
    'estudio arquitectura',
    'diseño casas modernas',
    'dirección de obra',
    'proyectos arquitectónicos',
    'arquitectura contemporánea',
  ],
  alternates: {
    canonical: 'https://arquitecturamartin.com.ar',
  },
  openGraph: {
    title: 'Estudio de Arquitectura | Martín Varvasini',
    description:
      'Diseño de casas modernas, dirección de obra, reformas y ampliaciones. Más de 24 años de experiencia.',
    url: 'https://arquitecturamartin.com.ar',
    siteName: 'Martín Varvasini - Arquitecto',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: 'https://arquitecturamartin.com.ar/casafondo.jpg',
        width: 1200,
        height: 630,
        alt: 'Casa de arquitectura moderna diseñada por Martín Varvasini',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estudio de Arquitectura | Martín Varvasini',
    description: 'Diseño de casas modernas, dirección de obra, reformas y ampliaciones.',
    images: ['https://arquitecturamartin.com.ar/casafondo.jpg'],
  },
};

export default function Home() {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, websiteSchema]),
        }}
      />
      
      <Hero />
      <FeaturedWorks />
      <MediaSection 
        videoId="1wqqGCjq_hA"
        startTime={0}
        title="Entrevista"
        description="Conocé la manera de proyectar y dirigir obra de Martín Varvasini."
        thumbnailUrl="/Img/entrevista.PNG"
      />
      <Services />
      <Process />
      <Testimonials />
      <CTAWhatsApp />
    </>
  );
}

