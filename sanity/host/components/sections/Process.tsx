'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants, scrollReveal } from '@/lib/animations';

const steps = [
  {
    number: '01',
    title: 'Casa Nueva',
    description:
      'Diseño integral de viviendas desde cero. Incorporamos tus necesidades y deseos en un proyecto único.',
  },
  {
    number: '02',
    title: 'Gestiones Municipales',
    description:
      'Presentación y seguimiento de planos municipales.',
  },
  {
    number: '03',
    title: 'Proyecto Ejecutivo',
    description:
      'Elaboramos toda la documentación técnica para construcción.',
  },
  {
    number: '04',
    title: 'Dirección de Obra',
    description:
      'Supervisamos con detalle constructivo y calidad de materiales durante la ejecución del proyecto.',
  },
];

export default function Process() {
  return (
    <section className="section bg-white relative">
      <div className="container-page">
        <motion.div
          {...scrollReveal}
          className="mb-16 text-center"
        >
          <span className="text-[var(--brand)] text-xs md:text-sm font-light tracking-[0.3em] uppercase mb-3 block">
            Metodología
          </span>
          <h2 className="headline inline-block mb-6">
            Nuestro Proceso
          </h2>
          <p className="text-[var(--ink-light)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Un enfoque estructurado que garantiza resultados excepcionales en cada etapa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connecting line - horizontal for desktop, vertical for mobile */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[var(--brand)]/20 via-[var(--brand)]/40 to-[var(--brand)]/20" />
          
          {/* Vertical line for mobile/tablet */}
          <div className="lg:hidden absolute left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--brand)]/20 via-[var(--brand)]/40 to-[var(--brand)]/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group"
              >
                {/* Layout vertical en mobile, centrado en desktop */}
                <div className="flex lg:flex-col items-start lg:items-center gap-6 lg:gap-0">
                  <div className="flex-shrink-0 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="bg-gradient-to-br from-[var(--brand)] to-[var(--brand-dark)] text-white text-xl font-playfair font-medium w-20 h-20 rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow duration-300"
                    >
                      {step.number}
                    </motion.div>
                  </div>
                  
                  <div className="flex-1 lg:text-center lg:mt-6">
                    <h3 className="text-lg md:text-xl font-playfair font-medium text-[var(--ink)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[var(--ink-light)] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

