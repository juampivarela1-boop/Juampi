'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MediaSectionProps {
  videoId: string;
  startTime?: number;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
}

export default function MediaSection({
  videoId,
  startTime = 0,
  title = 'Entrevista',
  description = 'Conocé el enfoque de Martín Varvasini en una nota donde explica su manera de proyectar y dirigir obra.',
  thumbnailUrl,
}: MediaSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}${startTime > 0 ? `&t=${startTime}s` : ''}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0&modestbranding=1`;
  const defaultThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbnail = thumbnailUrl || defaultThumbnail;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsModalOpen(false);
      };
      
      window.addEventListener('keydown', handleEscape);
      return () => {
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [isModalOpen]);

  return (
    <>
      <section className="py-20 md:py-28 bg-[var(--paper)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[var(--brand-dark)]/10"
          >
            <div className="grid md:grid-cols-5 gap-0">
              {/* Contenido de texto */}
              <div className="md:col-span-2 p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center md:items-start bg-gradient-to-br from-white to-gray-50">
                <div className="w-full max-w-md mx-auto md:mx-0 md:max-w-none">
                  <div className="mb-3 md:mb-4 text-center md:text-left">
                    <span className="inline-block text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase text-white bg-[var(--brand-dark)] px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-md">
                      En medios
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--brand-dark)] mb-3 sm:mb-4 md:mb-5 leading-tight text-center md:text-left">
                    {title}
                  </h2>
                  
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed mb-5 sm:mb-6 md:mb-8 font-medium text-center md:text-left">
                    {description}
                  </p>

                  <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 w-full">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      aria-label="Ver video de la nota completa"
                      className="group flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-[var(--brand-dark)] text-white font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl hover:bg-[var(--brand-dark)]/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full max-w-xs md:max-w-none"
                    >
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      Ver nota completa
                    </button>

                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white border-2 border-[var(--brand-dark)] text-[var(--brand-dark)] font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl hover:bg-[var(--brand-dark)] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs md:max-w-none"
                    >
                      Abrir en YouTube
                      <svg 
                        className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Thumbnail del video */}
              <div className="md:col-span-3 relative w-full p-6 sm:p-8 md:p-12 flex items-center justify-center">
                <div className="w-full max-w-[640px]">
                  <div className="relative w-full aspect-video overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      aria-label="Reproducir video"
                      className="absolute inset-0 w-full h-full group focus:outline-none focus:ring-4 focus:ring-[var(--brand-dark)] focus:ring-inset"
                    >
                      <Image
                        src={thumbnail}
                        alt={`Video: ${title}`}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      
                      {/* Overlay con botón de play */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--brand-dark)] rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-125 transition-all duration-300 group-hover:bg-[var(--brand-dark)]/80">
                            <svg 
                              className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              style={{ marginLeft: '2px' }}
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal con video */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar video"
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
