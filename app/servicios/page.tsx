'use client';

import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

// Types for page metadata
// Note: metadata cannot be in client components, so we define it separately if needed

const services = [
  {
    title: 'Casa Nueva',
    description:
      'Diseño integral de viviendas modernas desde cero. Incorporamos tus necesidades y deseos en un proyecto único.',
    features: [
      'Anteproyecto conceptual',
      'Proyecto arquitectónico',
      'Proyecto ejecutivo',
      'Especificaciones técnicas',
    ],
  },
  {
    title: 'Reforma Integral',
    description:
      'Transformación completa de espacios existentes. Mejoramos funcionalidad, estética y eficiencia energética.',
    features: [
      'Diagnóstico del estado actual',
      'Propuestas de diseño',
      'Relevamiento técnico',
      'Proyecto de reforma',
    ],
  },
  {
    title: 'Ampliación',
    description:
      'Extensión funcional de casas actuales. Aprovechamos el terreno disponible para agregar espacios.',
    features: [
      'Estudio de factibilidad',
      'Integración arquitectónica',
      'Nuevas conexiones técnicas',
      'Proyecto ejecutivo',
    ],
  },
  {
    title: 'Interiorismo',
    description:
      'Diseño de interiores personalizado y sofisticado. Espacios funcionales, bellos y confortables.',
    features: [
      'Concepto de diseño',
      'Selección de materiales',
      'Diseño de mobiliario',
      'Coordinación de obra',
    ],
  },
  {
    title: 'Dirección de Obra',
    description:
      'Supervisión profesional de todo el proceso constructivo. Garantizamos calidad y cumplimiento de plazos.',
    features: [
      'Seguimiento permanente',
      'Control de calidad',
      'Coordinación de oficios',
      'Informes periódicos',
    ],
  },
  {
    title: 'Administración de Obra',
    description:
      'Gestión integral de presupuestos, plazos y recursos. Máximo control de costos sin sacrificar calidad.',
    features: [
      'Presupuesto detallado',
      'Control financiero',
      'Gestión de proveedores',
      'Reportes de avance',
    ],
  },
];

export default function Servicios() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-[var(--paper)]">
      <div className="container-page">
        {/* Header */}
        <div className="mb-16">
          <h1>
            Servicios de Arquitectura
          </h1>
          <p className="text-[var(--ink-light)] text-lg max-w-3xl">
            Ofrecemos una gama completa de servicios arquitectónicos adaptados a
            tus necesidades específicas. Desde la concepción inicial hasta la
            supervisión de obra, estamos con vos en cada etapa del proceso.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-[#111827] mb-3">
                {service.title}
              </h3>
              <p className="text-[#111827]-light mb-6">{service.description}</p>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#D07A22] mb-3">
                  Incluye:
                </p>
                {service.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D07A22] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-[#111827]-light">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cobertura de Proyectos */}
        <motion.div
          id="cobertura"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs tracking-[0.25em] text-[var(--brand)] uppercase font-light mb-3 block">
              Cobertura / Modalidad de Trabajo
            </span>
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold tracking-tight text-[#111827] mb-3">
              Cobertura de Proyectos
            </h2>
            <p className="text-sm md:text-base text-[#6B7280] leading-relaxed max-w-3xl">
              Desarrollamos proyectos de arquitectura y dirección de obra en distintas ubicaciones, 
              combinando trabajo presencial y remoto según las necesidades de cada etapa.
            </p>
          </div>

          {/* Content Container */}
          <div className="bg-white/95 border border-black/5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-10">
            {/* Grid 2x2 with mini-cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item 1 */}
              <div className="group rounded-xl p-5 hover:bg-white/60 ring-1 ring-black/5 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <svg 
                    className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-[#111827] mb-1.5">
                      Reuniones online y seguimiento
                    </h3>
                    <p className="text-base text-[#6B7280] leading-relaxed">
                      Comunicación continua por videollamada durante el desarrollo
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group rounded-xl p-5 hover:bg-white/60 ring-1 ring-black/5 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <svg 
                    className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-[#111827] mb-1.5">
                      Documentación técnica digital
                    </h3>
                    <p className="text-base text-[#6B7280] leading-relaxed">
                      Planos, especificaciones y renders en formato digital
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="group rounded-xl p-5 hover:bg-white/60 ring-1 ring-black/5 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <svg 
                    className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-[#111827] mb-1.5">
                      Coordinación con equipos locales
                    </h3>
                    <p className="text-base text-[#6B7280] leading-relaxed">
                      Articulación con constructores y proveedores de tu zona
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="group rounded-xl p-5 hover:bg-white/60 ring-1 ring-black/5 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <svg 
                    className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-[#111827] mb-1.5">
                      Visitas por etapa del proyecto
                    </h3>
                    <p className="text-base text-[#6B7280] leading-relaxed">
                      Presencia en obra en los momentos clave de cada fase
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Outline Style */}
            <div className="flex justify-center pt-10 mt-10 border-t border-black/5">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[var(--brand)] text-[var(--brand)] text-sm font-medium rounded-full hover:bg-[var(--brand)] hover:text-white transition-all duration-300"
              >
                Consultar proyecto
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CTA - ¿Cuál es tu proyecto? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 bg-white/70 ring-1 ring-black/5 shadow-sm p-12 md:p-16 rounded-xl text-center border-t-4 border-[var(--brand)]"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-[#111827]">
            ¿Cuál es tu proyecto?
          </h2>
          <p className="text-[#6B7280] mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Contáctanos para una consulta y descubre cómo podemos
            ayudarte a materializar tu idea.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-[var(--brand)] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[var(--brand-dark)] hover:shadow-lg transition-all duration-300"
          >
            Reservar Consulta
          </Link>
        </motion.div>
      </div>
    </main>
  );
}


