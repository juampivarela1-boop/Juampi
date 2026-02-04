import { Metadata } from 'next';
import { client, urlFor } from '@/lib/sanity.client';
import { projectBySlugQuery } from '@/lib/sanity.queries';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return {
      title: 'Obra',
      location: 'Villa Gesell',
      year: 2024,
      areaM2: 0,
      category: 'Proyecto',
      description: 'Proyecto de arquitectura.',
    };
  }

  const project = await client.fetch(projectBySlugQuery, { slug });

  return project || {
    title: 'Obra',
    location: 'Villa Gesell',
    year: 2024,
    areaM2: 0,
    category: 'Proyecto',
    description: 'Proyecto de arquitectura.',
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  
  const projectTitle = project.title || 'Obra';
  const projectLocation = project.location || 'Villa Gesell';
  const categoryLabel = Array.isArray(project.category)
    ? project.category[0]
    : project.category || 'Proyecto';
  const descriptionText = Array.isArray(project.description)
    ? project.description
        .map((block: any) => block?.children?.map((child: any) => child?.text).join(' '))
        .join(' ')
    : project.description || '';

  const title = `${projectTitle} - ${projectLocation}`;
  const description = `${categoryLabel} en ${projectLocation}. ${descriptionText}`;
  const ogImage = project.coverImage ? urlFor(project.coverImage).width(1200).height(630).url() : '/casafondo.jpg';

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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: projectTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
