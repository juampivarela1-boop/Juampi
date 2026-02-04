import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Script from 'next/script';
import { generateLocalBusinessSchema, generateWebSiteSchema } from '@/lib/seo';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const baseUrl = 'https://arquitecturamartin.com.ar';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Martín Varvasini - Arquitecto Villa Gesell',
    default: 'Arquitecto en Villa Gesell | Martín Varvasini - Estudio de Arquitectura',
  },
  description:
    'Estudio de arquitectura en Villa Gesell, Pinamar, Mar Azul y Mar de las Pampas. Diseño y dirección de obra nueva, reformas y ampliaciones. Arquitectura moderna costera.',
  keywords: [
    'arquitecto Villa Gesell',
    'arquitecto Pinamar',
    'arquitecto Mar Azul',
    'arquitecto Mar de las Pampas',
    'estudio de arquitectura Villa Gesell',
    'diseño de casas',
    'proyecto de obra',
    'reformas y ampliaciones',
    'dirección de obra',
    'obra nueva',
    'arquitectura costera',
    'casa en la costa',
    'remodelación',
    'vivienda unifamiliar',
    'casa moderna',
    'casa minimalista',
    'arquitectura sustentable',
    'proyecto ejecutivo',
    'documentación municipal',
  ],
  authors: [{ name: 'Martín Varvasini' }],
  creator: 'Martín Varvasini',
  publisher: 'Martín Varvasini - Arquitecto',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: baseUrl,
    siteName: 'Martín Varvasini - Arquitecto',
    title: 'Arquitecto en Villa Gesell | Martín Varvasini',
    description:
      'Estudio de arquitectura en Villa Gesell, Pinamar, Mar Azul y Mar de las Pampas. Diseño y dirección de obra nueva, reformas y ampliaciones.',
    images: [
      {
        url: '/casafondo.jpg',
        width: 1200,
        height: 630,
        alt: 'Estudio de Arquitectura Martín Varvasini - Villa Gesell',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arquitecto en Villa Gesell | Martín Varvasini',
    description:
      'Estudio de arquitectura en Villa Gesell, Mar Azul y Mar de las Pampas. Diseño y dirección de obra.',
    images: ['/casafondo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Add Google Search Console verification
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Datos estructurados JSON-LD para LocalBusiness
  const localBusinessData = generateLocalBusinessSchema({
    name: 'Martín Varvasini - Arquitecto',
    description:
      'Estudio de arquitectura con más de 24 años de experiencia. Diseño y dirección de obra. Proyectos de casas nuevas, reformas y ampliaciones.',
    url: baseUrl,
    telephone: '+5492255506035',
    email: 'contacto@arquitecturamartin.com.ar',
    address: {
      streetAddress: '',
      addressLocality: 'Villa Gesell',
      addressRegion: 'Buenos Aires',
      postalCode: '7165',
      addressCountry: 'AR',
    },
    areaServed: [
      'Villa Gesell',
      'Pinamar',
      'Mar Azul',
      'Mar de las Pampas',
      'Las Gaviotas',
      'Partido de Villa Gesell',
    ],
    priceRange: '$$',
  });

  const webSiteData = generateWebSiteSchema(
    baseUrl,
    'Martín Varvasini - Arquitecto'
  );

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#D07A22" />
        
        {/* JSON-LD Structured Data */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessData),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteData),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[var(--paper)] text-[var(--ink)] antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

