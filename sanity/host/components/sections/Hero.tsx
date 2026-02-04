'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CONTACT } from '@/lib/constants';
import { cardHover } from '@/lib/animations';

export default function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array de imágenes de fondo
  const backgroundImages = [
    '/casafondo.jpg',
    '/Img/casa-marinas-destacada.jpg',
    '/Img/135_1_n.jpg',
    '/Img/CASA CAROLINA/SaveClip.App_426985872_1135797071207775_2804125062818619571_n.jpg',
    '/casafondo.jpg'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000); // Desaparece después de 5 segundos

    return () => clearTimeout(timer);
  }, []);

  // Cambiar imagen automáticamente con tiempos diferentes
  useEffect(() => {
    // Primera y última imagen (casafondo.jpg) duran 10 segundos, las demás 5 segundos
    const delay = (currentImageIndex === 0 || currentImageIndex === backgroundImages.length - 1) ? 10000 : 5000;
    
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentImageIndex, backgroundImages.length]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] w-full overflow-hidden flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 grain">
        {/* Imágenes de fondo con transición */}
        {backgroundImages.map((image, index) => (
          <motion.div
            key={`hero-bg-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image 
              src={image} 
              alt="Casa de arquitectura moderna diseñada por Martín Varvasini" 
              fill 
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}
        
        {/* Overlay profesional con degradado suave para máxima legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />
        
        {/* Degradado radial central para destacar el contenido */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black/30_100%)]" />
      </div>

      {/* Transición suave al siguiente bloque */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[var(--paper)] z-10" />

      {/* Content */}
      <div className="relative w-full container-page py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <span className="text-white/80 text-xs md:text-sm font-light tracking-[0.3em] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              Estudio de Arquitectura
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-semibold text-white mb-4 sm:mb-6 leading-[1.08] tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] px-4"
          >
            Arquitectura que<br />
            transforma <span className="italic font-normal">espacios</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/75 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl font-light leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] px-4"
          >
            Diseño contemporáneo y sostenible con más de 100 proyectos ejecutados
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 w-full sm:w-auto"
          >
            <motion.div {...cardHover}>
              <Link
                href="/contacto"
                className="btn-primary"
                title="Ir a la página de contacto"
                aria-label="Ir al formulario de contacto para reservar consulta"
              >
                Reservar Consulta
              </Link>
            </motion.div>
            <motion.div {...cardHover}>
              <Link
                href="/obras"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                title="Ver nuestros proyectos"
                aria-label="Explorar portafolio de obras y proyectos completados"
              >
                Ver Portafolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator sutil - aparece brevemente y luego se desvanece */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            aria-label="Desplazarse hacia abajo para ver más contenido"
            role="img"
          >
            <div className="w-6 h-10 border-2 border-white/45 rounded-full flex items-start justify-center p-2">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 bg-white/55 rounded-full" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

