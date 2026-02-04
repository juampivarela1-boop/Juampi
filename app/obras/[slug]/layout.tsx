import { Metadata } from 'next';

// TODO: When Sanity is connected, fetch real project data
// import { client } from '@/lib/sanity.client';

type Props = {
  params: Promise<{ slug: string }>;
};

// Mock data for projects
const mockProjects: Record<string, any> = {
  'casa-carolina': { title: 'Casa Carolina', location: 'Mar de las Pampas', year: 2019, type: 'Casa Nueva', description: 'Casa Carolina en Mar de las Pampas.' },
  'casa-marinas': { title: 'Casa Marinas', location: 'Escobar', year: 2020, type: 'Casa Nueva', description: 'Casa diseñada para Fernanda y Alfredo en Escobar.' },
  'casa-myj': { title: 'Casa MYJ', location: 'Las Gaviotas', year: 2021, type: 'Casa Nueva', description: 'Vivienda unifamiliar en Las Gaviotas.' },
  'casa-martin-fierro': { title: 'Casa Martín Fierro', location: 'Villa Gesell', year: 2024, type: 'Reforma', description: 'Reforma integral en Villa Gesell.' },
  'casa-prana': { title: 'Casa Prana', location: 'Mar de las Pampas', year: 2013, type: 'Casa Nueva', description: 'Casa Prana en Mar de las Pampas.' },
  'casa-punto-de-encuentro': { title: 'Casa Punto de Encuentro', location: 'Villa Gesell', year: 2020, type: 'Casa Nueva', description: 'Casa Punto de Encuentro en Villa Gesell.' },
  'casa-antu-pewen': { title: 'Casa Antü Pewen', location: 'Villa Gesell', year: 2021, type: 'Casa Nueva', description: 'Casa Antü Pewen en Villa Gesell.' },
  'casa-valeria-del-mar': { title: 'Casa Valeria del Mar', location: 'Valeria del Mar', year: 2024, type: 'Casa Nueva', description: 'Vivienda en Valeria del Mar.' },
  'casa-mario-y-sandra': { title: 'Casa Mario y Sandra', location: 'Villa Gesell', year: 2019, type: 'Casa Nueva', description: 'Casa Mario y Sandra en Villa Gesell.' },
  'casa-lio': { title: 'Casa Lio', location: 'Villa Gesell', year: 2024, type: 'Casa Nueva', description: 'Casa Lio en Villa Gesell.' },
  'obra-querandies': { title: 'Obra Querandíes', location: 'Villa Gesell', year: 2024, type: 'Casa Nueva', description: 'Obra en Querandíes, Villa Gesell.' },
  'casa-coquimbo': { title: 'Casa Coquimbo', location: 'Mar Azul', year: 2024, type: 'Casa Nueva', description: 'Casa Coquimbo en Mar Azul.' },
  'obra-albornoz': { title: 'Obra Albornoz', location: 'Mar de las Pampas', year: 2024, type: 'Casa Nueva', description: 'Obra Albornoz en Mar de las Pampas.' },
  'casa-selva': { title: 'Casa Selva', location: 'Mar Azul', year: 2024, type: 'Casa Nueva', description: 'Casa Selva en Mar Azul.' },
  'casa-cupal': { title: 'Casa Cupal', location: 'Mar de las Pampas', year: 2024, type: 'Casa Nueva', description: 'Casa Cupal en Mar de las Pampas.' },
  'casa-pivamar': { title: 'Casa Pivamar', location: 'Mar Azul', year: 2012, type: 'Casa Nueva', description: 'Casa Pivamar en Mar Azul.' },
  'casa-ramos': { title: 'Casa Ramos', location: 'Mar de las Pampas', year: 2011, type: 'Casa Nueva', description: 'Casa Ramos en Mar de las Pampas.' },
  'casa-cambelia': { title: 'Casa Cambelia', location: 'Mar de las Pampas', year: 2012, type: 'Casa Nueva', description: 'Casa Cambelia en Mar de las Pampas.' },
  'casa-kawinkelen': { title: 'Casa Kawinkelen', location: 'Mar de las Pampas', year: 2009, type: 'Casa Nueva', description: 'Casa Kawinkelen en Mar de las Pampas.' },
  'casa-pura-vida': { title: 'Casa Pura Vida', location: 'Las Gaviotas', year: 2010, type: 'Casa Nueva', description: 'Casa Pura Vida en Las Gaviotas.' },
  'casa-valhala': { title: 'Casa Valhala', location: 'Mar de las Pampas', year: 2008, type: 'Casa Nueva', description: 'Casa Valhala en Mar de las Pampas.' },
  'casa-spadescansar': { title: 'Casa Spadescansar', location: 'Mar Azul', year: 2008, type: 'Casa Nueva', description: 'Casa Spadescansar en Mar Azul.' },
  'casa-el-rayo-verde': { title: 'Casa El Rayo Verde', location: 'Mar Azul', year: 2010, type: 'Casa Nueva', description: 'Casa El Rayo Verde en Mar Azul.' },
  'casa-nuestro-lugar': { title: 'Casa Nuestro Lugar', location: 'Mar de las Pampas', year: 2010, type: 'Casa Nueva', description: 'Casa Nuestro Lugar en Mar de las Pampas.' },
  'casa-morena-2': { title: 'Casa Morena 2', location: 'Mar Azul', year: 2012, type: 'Casa Nueva', description: 'Casa Morena 2 en Mar Azul.' },
  'casa-alanis-ii': { title: 'Casa Alanis II', location: 'Mar Azul', year: 2010, type: 'Casa Nueva', description: 'Casa Alanis II en Mar Azul.' },
  'casa-alanis-1': { title: 'Casa Alanis 1', location: 'Mar Azul', year: 2008, type: 'Casa Nueva', description: 'Casa Alanis 1 en Mar Azul.' },
  'costa-gaviotas-cabanas': { title: 'Costa Gaviotas Cabañas', location: 'Las Gaviotas', year: 2010, type: 'Casa Nueva', description: 'Costa Gaviotas Cabañas en Las Gaviotas.' },
  'casa-mis-afectos': { title: 'Casa Mis Afectos', location: 'Mar de las Pampas', year: 2008, type: 'Casa Nueva', description: 'Casa Mis Afectos en Mar de las Pampas.' },
  'casa-ojana': { title: 'Casa Ojana', location: 'Mar de las Pampas', year: 2010, type: 'Casa Nueva', description: 'Casa Ojana en Mar de las Pampas.' },
  'casa-nanu': { title: 'Casa Nanu', location: 'Mar de las Pampas', year: 2011, type: 'Casa Nueva', description: 'Casa Nanu en Mar de las Pampas.' },
  'casa-recanto-das-pampas': { title: 'Casa Recanto das Pampas', location: 'Mar de las Pampas', year: 2008, type: 'Casa Nueva', description: 'Casa Recanto das Pampas en Mar de las Pampas.' },
  'casa-alfredo': { title: 'Casa Alfredo', location: 'Costa Esmeralda', year: 2010, type: 'Casa Nueva', description: 'Casa Alfredo en Costa Esmeralda.' },
  'casa-la-morena': { title: 'Casa La Morena', location: 'Mar Azul', year: 2010, type: 'Casa Nueva', description: 'Casa La Morena en Mar Azul.' },
  'casa-otium': { title: 'Casa Otium', location: 'Mar de las Pampas', year: 2009, type: 'Casa Nueva', description: 'Casa Otium en Mar de las Pampas.' },
  'casa-mobydick': { title: 'Casa Mobydick', location: 'Mar Azul', year: 2023, type: 'Casa Nueva', description: 'Casa Mobydick en Mar Azul.' },
  'ampliacion-1': { title: 'Ampliación Apart "La Morada"', location: 'Villa Gesell', year: 2022, type: 'Ampliación', description: 'Ampliación Apart "La Morada" - 175 m² con 4 departamentos, piscina cubierta y spa en Villa Gesell.' },
  'casa-contemporanea': { title: 'Casa Contemporánea', location: 'Villa Gesell', year: 2024, type: 'Casa Nueva', description: 'Casa Contemporánea en Villa Gesell.' },
};

// Mock function - replace with Sanity query
async function getProject(slug: string) {
  // const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
  // return project;
  
  return mockProjects[slug] || {
    title: 'Casa Contemporánea',
    location: 'Villa Gesell',
    year: 2024,
    areaM2: 250,
    type: 'Casa Nueva',
    description:
      'Proyecto de vivienda contemporánea que combina minimalismo con funcionalidad.',
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  
  const title = `${project.title} - ${project.location}`;
  const description = `${project.type} en ${project.location}. ${project.description}`;

  return {
    title,
    description,
    keywords: [
      `${project.type} ${project.location}`,
      'arquitectura moderna',
      'casa diseño',
      project.location,
      'arquitecto Villa Gesell',
    ],
    alternates: {
      canonical: `https://arquitecturamartin.com.ar/obras/${slug}`,
    },
    openGraph: {
      title: `${title} | Martín Varvasini`,
      description,
      url: `https://arquitecturamartin.com.ar/obras/${slug}`,
      type: 'article',
      images: [
        {
          url: '/casafondo.jpg', // TODO: Use project.mainImage when available
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/casafondo.jpg'], // TODO: Use project.mainImage when available
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
