'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { containerVariants, itemVariants, scrollReveal } from '@/lib/animations';
import { urlFor } from '@/lib/sanity.client';

type FeaturedWork = {
  _id?: string;
  title: string;
  slug: string;
  location?: string;
  year?: number;
  category?: string[] | string;
  coverImage?: any;
  image?: string;
};

type FeaturedWorksProps = {
  works: FeaturedWork[];
};

const fallbackWorks: FeaturedWork[] = [
  {
    title: 'Casa Carolina',
    slug: 'casa-carolina',
    location: 'Mar de las Pampas',
    year: 2019,
    category: 'Obras Entregadas',
    image: '/Img/CASA CAROLINA/SaveClip.App_426985872_1135797071207775_2804125062818619571_n.jpg',
  },
  {
    title: 'Casa Prana',
    slug: 'casa-prana',
    location: 'Calle Vega y Artes, Mar de las Pampas',
    year: 2013,
    category: 'Casa Nueva',
    image: '/Img/casa-prana-destacada.jpg',
  },
  {
    title: 'Casa Antü Pewen',
    slug: 'casa-antu-pewen',
    location: 'Mar de las Pampas',
    year: 2023,
    category: 'Casa Nueva',
    image: '/Img/casa Antü Pewen/86_1_n.jpg',
  },
];

export default function FeaturedWorks({ works }: FeaturedWorksProps) {
  const items = Array.isArray(works) && works.length > 0 ? works : fallbackWorks;

  return (
    <section className="section bg-white relative">
      <div className="container-page">
        <motion.div
          {...scrollReveal}
          className="mb-16 text-center"
        >
          <span className="text-[var(--brand)] text-xs md:text-sm font-light tracking-[0.3em] uppercase mb-3 block">
            Portafolio
          </span>
          <h2 className="headline inline-block mb-6">
            Obras Destacadas
          </h2>
          <p className="text-[var(--ink-light)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Una selección de nuestros proyectos más representativos donde el diseño y la funcionalidad se encuentran.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16"
        >
          {items.map((work) => {
            const categoryLabel = Array.isArray(work.category)
              ? work.category[0]
              : work.category || 'Proyecto';
            const imageUrl = work.image
              ? work.image
              : work.coverImage
                ? urlFor(work.coverImage).width(900).height(1200).url()
                : null;

            return (
            <motion.div
              key={work._id ?? work.slug}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/obras/${work.slug}`} className="block">
                <div className="card p-0 mb-6 relative overflow-hidden">
                  {/* Ratio consistente 3:4 para todas las imágenes */}
                  <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#F7F4EF] via-[#E8E4DF] to-[#D8D4CF]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${work.title} – ${categoryLabel} – fachada exterior y diseño arquitectónico – ${work.location ?? 'Ubicación'}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI0Y3RjRFRiIvPjwvc3ZnPg=="
                      />
                    ) : (
                      <>
                        {/* Placeholder with elegant icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-[#D07A22]/20 transition-all duration-500 group-hover:scale-110 group-hover:text-[#D07A22]/30"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </>
                    )}
                    
                    {/* Overlay con texto "Ver obra →" en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                      <span className="text-white text-sm font-medium tracking-wide flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Ver obra
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 px-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (work.location) {
                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(work.location)}`, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-[var(--ink-light)] text-xs uppercase tracking-[0.2em] font-light hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {work.location ?? 'Ubicación'}
                  </button>
                  <h3 className="text-xl md:text-2xl font-playfair font-medium text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors duration-400 leading-tight">
                    {work.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[var(--brand)] uppercase tracking-[0.15em] font-light">
                    <span>{categoryLabel}</span>
                    <span className="w-1 h-1 bg-[var(--brand)]/40 rounded-full" />
                    <span>{work.year ?? '—'}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/obras"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#5A3427] text-white hover:bg-[#6B4532] hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:ring-[#5A3427]"
          >
            Ver Todo el Portafolio
          </Link>
        </motion.div>
      </div>
      
      {/* Subtle divider */}
      <div className="subtle-divider mt-16 mx-auto max-w-4xl" />
    </section>
  );
}

