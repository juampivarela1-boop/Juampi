'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CONTACT } from '@/lib/constants';
import { scrollReveal } from '@/lib/animations';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-dark)] text-white relative">
      {/* Borde superior con brand color */}
      <div className="h-[2px] bg-[var(--brand)]" />
      
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
      
      <div className="container-page py-10 sm:py-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8">
          <motion.div
            {...scrollReveal}
          >
            <h3 className="text-lg font-playfair font-semibold mb-3 text-white">Arq. Martín Varvasini</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              Diseño arquitectónico moderno y sostenible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-3 text-white uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/obras" className="text-white/65 hover:text-[var(--brand)] transition-colors text-sm" title="Ver portafolio de obras">
                  Obras
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-white/65 hover:text-[var(--brand)] transition-colors text-sm" title="Conocer nuestros servicios">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/estudio" className="text-white/65 hover:text-[var(--brand)] transition-colors text-sm" title="Sobre el estudio y el arquitecto">
                  Estudio
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/65 hover:text-[var(--brand)] transition-colors text-sm" title="Formulario de contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-3 text-white uppercase tracking-wider">Contacto</h4>
            <p className="text-white/65 mb-2 text-sm">
              <a
                href={`tel:${CONTACT.whatsappNumber}`}
                className="hover:text-[var(--brand)] transition-colors"
                title="Llamar al teléfono del estudio"
                aria-label={`Llamar al ${CONTACT.phone}`}
              >
                {CONTACT.phone}
              </a>
            </p>
            <p className="text-white/65 text-sm">
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-[var(--brand)] transition-colors break-all"
                title="Enviar correo electrónico"
                aria-label={`Enviar email a ${CONTACT.email}`}
              >
                {CONTACT.email}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-3 text-white uppercase tracking-wider">Ubicación</h4>
            <div className="text-white/65 text-sm leading-relaxed space-y-2">
              <div className="space-y-1">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Villa+Gesell,+Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand)] transition-colors inline-block"
                >
                  Villa Gesell
                </a>
                <span>, </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Pinamar,+Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand)] transition-colors inline-block"
                >
                  Pinamar
                </a>
                <span>, </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mar+Azul,+Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand)] transition-colors inline-block"
                >
                  Mar Azul
                </a>
                <span>,</span>
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mar+de+las+Pampas,+Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand)] transition-colors inline-block"
                >
                  Mar de las Pampas
                </a>
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--brand)] transition-colors inline-block"
                >
                  Buenos Aires, Argentina
                </a>
              </div>
              <Link
                href="/servicios#cobertura"
                className="hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1 text-xs mt-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver cobertura
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-6 mt-2"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-white/50 text-xs">
              © {currentYear} Martín Varvasini. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/politica-privacidad"
                className="text-white/50 hover:text-[var(--brand)] transition-colors text-xs"
                title="Ver política de privacidad"
              >
                Política de Privacidad
              </Link>
              <p className="text-white/50 text-xs">
                Diseñado y desarrollado con precisión.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

