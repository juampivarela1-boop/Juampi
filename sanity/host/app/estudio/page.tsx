'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import MediaSection from '@/components/sections/MediaSection';

const photos = [
  { src: '/Img/martin1.jpg', alt: 'Fotografía profesional de Martín Varvasini en su escritorio' },
  { src: '/Img/martin2.jpg', alt: 'Martín Varvasini en su estudio de arquitectura' },
  { src: '/Img/martin3.jpg', alt: 'Martín Varvasini trabajando en proyectos arquitectónicos' },
];

export default function Estudio() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextPhoto = () => {
    setDirection(1);
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setDirection(-1);
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
    }),
  };
  return (
    <main className="min-h-screen pt-24 pb-20 bg-[var(--paper)]">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <h1>
              Martín Varvasini
            </h1>
            <p className="text-[var(--brand)] font-semibold text-lg mb-8">
              Arquitecto independiente
            </p>

            <div className="space-y-6 text-[var(--ink-light)]">
              <p className="text-lg leading-relaxed">
                Con más de 24 años de experiencia como arquitecto independiente en arquitectura residencial, desarrollando proyectos modernos y minimalistas adaptados al contexto de la costa bonaerense.
              </p>

              <p className="text-lg leading-relaxed">
                Mi enfoque se fundamenta en la combinación de estética
                contemporánea, funcionalidad impecable y sostenibilidad. Cada
                proyecto es único y responde a las necesidades específicas de
                mis clientes.
              </p>

              <div>
                <h3>Valores</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand)] font-bold mt-1">◆</span>
                    <div>
                      <p className="font-semibold text-[var(--ink)]">Precisión</p>
                      <p className="text-sm">Atención al detalle en cada proyecto</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand)] font-bold mt-1">◆</span>
                    <div>
                      <p className="font-semibold text-[var(--ink)]">Creatividad</p>
                      <p className="text-sm">Soluciones innovadoras y personalizadas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D07A22] font-bold mt-1">◆</span>
                    <div>
                      <p className="font-semibold text-[#111827]">Confiabilidad</p>
                      <p className="text-sm">Cumplimiento de plazos y presupuestos</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D07A22] font-bold mt-1">◆</span>
                    <div>
                      <p className="font-semibold text-[#111827]">Sostenibilidad</p>
                      <p className="text-sm">Diseño responsable con el ambiente</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Image Carousel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl group">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentPhoto}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    x: { type: "tween", duration: 0.4, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={photos[currentPhoto].src}
                    alt={photos[currentPhoto].alt}
                    fill
                    className="object-cover"
                    quality={95}
                    priority={currentPhoto === 0}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Preload next images */}
              <div className="hidden">
                {photos.map((photo, idx) => (
                  idx !== currentPhoto && (
                    <Image
                      key={idx}
                      src={photo.src}
                      alt=""
                      width={100}
                      height={100}
                      priority
                    />
                  )
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[var(--ink)] w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] z-10"
                aria-label="Foto anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[var(--ink)] w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] z-10"
                aria-label="Foto siguiente"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
                {currentPhoto + 1} / {photos.length}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-[#D07A22]/10">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#D07A22] mb-2">24+</p>
            <p className="text-[#111827]-light">Años de experiencia</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#D07A22] mb-2">100+</p>
            <p className="text-[#111827]-light">Proyectos realizados</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#D07A22] mb-2">6</p>
            <p className="text-[#111827]-light">Zonas de trabajo</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <svg className="w-10 h-10 text-[#D07A22]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-[#111827]-light">Alta satisfacción de clientes</p>
          </div>
        </div>

        {/* Formation */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#111827] mb-8">Formación</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#D07A22] pl-6 py-2">
              <p className="font-semibold text-[#111827]">
                Arquitecto UBA
              </p>
              <p className="text-[#111827]-light text-sm mb-1">Universidad de Buenos Aires</p>
              <p className="text-[#111827]-light text-sm">1989 - 2001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Entrevista */}
      <MediaSection 
        videoId="3Pq5RfysoAg"
        startTime={0}
        title="Entrevista"
        description="Conocé el enfoque de Martín Varvasini en una nota donde explica su manera de proyectar y dirigir obra."
        thumbnailUrl="/Img/entrevista.PNG"
      />
    </main>
  );
}

