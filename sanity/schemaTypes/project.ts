import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Proyecto / Obra',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
    }),
    defineField({
      name: 'areaM2',
      title: 'Superficie (m²)',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Obras Entregadas', value: 'Obras Entregadas' },
          { title: 'En Obra', value: 'En Obra' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: '¿Destacar en portada?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'blockContent',
    }),
  ],
});
