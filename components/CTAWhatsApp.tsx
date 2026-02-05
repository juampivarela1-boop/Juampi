'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CONTACT } from '@/lib/constants';
import { scrollReveal, cardHover } from '@/lib/animations';

export default function CTAWhatsApp() {
  const whatsappUrl = CONTACT.whatsappUrl;

  return (
    <section className="bg-[var(--paper)] relative py-16 sm:py-20 md:py-24">
      <div className="container-page">
        <motion.div
          {...scrollReveal}
          className="max-w-4xl mx-auto"
        >
          {/* Card elevado centrado */}
          <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Borde superior con gradiente brand */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent" />
            
            <div className="px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] mb-3 md:mb-4">
                ¿Listo para transformar tu espacio?
              </h2>
              <p className="text-[var(--ink-light)] text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                Contáctanos hoy para una consulta y descubre cómo podemos
                ayudarte a materializar tu proyecto arquitectónico.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...cardHover}
                  className={`btn-primary w-full sm:w-auto text-black`}
                  title="Contacto directo por WhatsApp"
                  aria-label="Iniciar conversación de WhatsApp para consulta"
                >
                  Consulta por WhatsApp
                </motion.a>
                <motion.div
                  {...cardHover}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contacto"
                    className="btn-secondary w-full sm:w-auto"
                    title="Ir al formulario de contacto"
                    aria-label="Navegar a la página de contacto para completar formulario"
                  >
                    O completa el formulario
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

