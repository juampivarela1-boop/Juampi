import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

if (!projectId || !dataset) {
  console.warn(
    'Missing Sanity configuration. Using mock data. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to enable Sanity.'
  );
}

export const client = createClient({
  projectId: projectId || 'development',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
