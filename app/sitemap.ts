import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arquitecturamartin.com.ar';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/estudio`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/obras`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // TODO: When Sanity is connected, add dynamic project pages
  // const projects = await client.fetch('SELECT slug FROM projects');
  // const projectPages = projects.map((project) => ({
  //   url: `${baseUrl}/obras/${project.slug}`,
  //   lastModified: project.updatedAt,
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }));

  return [...staticPages];
}
