// Schema.org JSON-LD para SEO

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Architect',
  '@id': 'https://arquitecturamartin.com.ar/#architect',
  name: 'Martín Varvasini - Estudio de Arquitectura',
  alternateName: 'Arquitecto Martín Varvasini',
  description: 'Estudio de arquitectura con enfoque en diseño contemporáneo y sostenible. Más de 24 años de experiencia con proyectos en distintas ubicaciones.',
  url: 'https://arquitecturamartin.com.ar',
  logo: 'https://arquitecturamartin.com.ar/logotrans.png',
  image: 'https://arquitecturamartin.com.ar/casafondo.jpg',
  telephone: '+54-2255-506035',
  email: 'contacto@arquitecturamartin.com.ar',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Villa Gesell',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Villa Gesell',
    },
    {
      '@type': 'City',
      name: 'Mar Azul',
    },
    {
      '@type': 'City',
      name: 'Mar de las Pampas',
    },
    {
      '@type': 'City',
      name: 'Las Gaviotas',
    },
    {
      '@type': 'City',
      name: 'Costa Esmeralda',
    },
    {
      '@type': 'City',
      name: 'Pinamar',
    },
  ],
  priceRange: '$$',
  foundingDate: '2001',
  founder: {
    '@type': 'Person',
    name: 'Martín Varvasini',
    jobTitle: 'Arquitecto',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidad de Buenos Aires',
      sameAs: 'https://www.uba.ar',
    },
  },
  sameAs: [
    // Agregar redes sociales cuando estén disponibles
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Arquitectura',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diseño Arquitectónico',
          description: 'Diseño de proyectos nuevos y renovaciones con enfoque contemporáneo y sostenible',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dirección de Obra',
          description: 'Supervisión integral durante toda la construcción del proyecto',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reformas y Ampliaciones',
          description: 'Renovaciones y ampliaciones de espacios existentes',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Interiorismo',
          description: 'Diseño de interiores y ambientación de espacios',
        },
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '45',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://arquitecturamartin.com.ar/#website',
  url: 'https://arquitecturamartin.com.ar',
  name: 'Martín Varvasini - Arquitecto',
  description: 'Estudio de arquitectura',
  publisher: {
    '@id': 'https://arquitecturamartin.com.ar/#architect',
  },
  inLanguage: 'es-AR',
};

export function generateProjectSchema(project: {
  title: string;
  description?: string;
  location: string;
  year: number;
  category: string;
  areaM2?: number;
  image?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://arquitecturamartin.com.ar/obras/${project.slug}`,
    name: project.title,
    description: project.description || `${project.category} en ${project.location}`,
    creator: {
      '@id': 'https://arquitecturamartin.com.ar/#architect',
    },
    dateCreated: project.year.toString(),
    genre: 'Arquitectura',
    keywords: `arquitectura, ${project.category}, ${project.location}`,
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    ...(project.image && {
      image: `https://arquitecturamartin.com.ar${project.image}`,
    }),
    ...(project.areaM2 && {
      size: `${project.areaM2} m²`,
    }),
  };
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
