const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', 'sanity', '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error('Falta NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local');
  process.exit(1);
}

if (!token) {
  console.error('Falta SANITY_API_TOKEN en .env.local (root).');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const rootDir = path.join(__dirname, '..');

const extractMockArray = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const mockWorks = \[([\s\S]*?)\n\];/);
  if (!match) throw new Error('No se encontró mockWorks');
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return [${match[1]}];`)();
};

const extractMockProjects = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const mockProjects[\s\S]*?=\s*({[\s\S]*?})\s*;\s*\n\s*\/\/ Array con el orden/);
  if (!match) throw new Error('No se encontró mockProjects');
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return ${match[1]};`)();
};

const safeDecode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const uploadImageFromPublic = async (url) => {
  if (!url) return null;

  const clean = safeDecode(url.split('?')[0]);
  const relative = clean.startsWith('/') ? clean.slice(1) : clean;
  const filePath = path.join(rootDir, 'public', relative);

  if (!fs.existsSync(filePath)) {
    console.warn(`No se encontró imagen: ${filePath}`);
    return null;
  }

  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(filePath),
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
};

const toBlockContent = (text) => {
  if (!text) return undefined;
  return [
    {
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          text: String(text),
        },
      ],
    },
  ];
};

const run = async () => {
  const worksPath = path.join(rootDir, 'app', 'obras', 'page.tsx');
  const detailPath = path.join(rootDir, 'app', 'obras', '[slug]', 'page.tsx');

  const works = extractMockArray(worksPath);
  const mockProjects = extractMockProjects(detailPath);

  console.log(`Encontradas ${works.length} obras en mockWorks.`);

  for (const work of works) {
    const slug = work.slug;
    if (!slug) continue;

    const existing = await client.fetch(
      '*[_type == "project" && slug.current == $slug][0]{_id}',
      { slug }
    );

    if (existing) {
      console.log(`Omitiendo ${slug} (ya existe en Sanity).`);
      continue;
    }

    const detail = mockProjects[slug] || {};

    const coverImage = await uploadImageFromPublic(work.image);
    const galleryImages = Array.isArray(detail.images)
      ? (await Promise.all(detail.images.map((img) => uploadImageFromPublic(img.url))))
          .filter(Boolean)
      : [];

    const doc = {
      _type: 'project',
      title: work.title,
      slug: { _type: 'slug', current: slug },
      location: work.location,
      year: work.year,
      areaM2: work.areaM2,
      category: work.category ? [work.category] : undefined,
      featured: false,
      coverImage: coverImage || undefined,
      galleryImages: galleryImages.length ? galleryImages : undefined,
      description: toBlockContent(detail.description || ''),
    };

    await client.create(doc);
    console.log(`Importado ${slug}`);
  }

  console.log('Importación finalizada.');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
