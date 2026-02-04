import groq from 'groq';

export const projectListQuery = groq`
  *[_type == "project"]
    | order(year desc, title asc) {
      _id,
      title,
      "slug": slug.current,
      location,
      year,
      category,
      areaM2,
      featured,
      coverImage
    }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true]
    | order(year desc, title asc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      location,
      year,
      category,
      areaM2,
      featured,
      coverImage
    }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    location,
    year,
    areaM2,
    category,
    featured,
    coverImage,
    galleryImages,
    description
  }
`;
