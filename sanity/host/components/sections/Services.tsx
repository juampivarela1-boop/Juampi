'use client';

import { motion } from 'framer-motion';
import { Home, Hammer, Ruler, Palette, ClipboardList, Briefcase } from 'lucide-react';
import { containerVariants, itemVariants, scrollReveal } from '@/lib/animations';

const services = [
  {
    title: 'Casa Nueva',
    description: 'Diseño integral de viviendas desde cero.',
    Icon: Home,
  },
  {
    title: 'Reforma Integral',
    description: 'Transformación completa de espacios existentes.',
    Icon: Hammer,
  },
  {
    title: 'Ampliación',
    description: 'Extensión funcional de casas actuales.',
    Icon: Ruler,
  },
  {
    title: 'Gestiones Municipales',
    description: 'Presentación y seguimiento de planos municipales.',
    Icon: Palette,
  },
  {
    title: 'Dirección de Obra',
    description: 'Supervisamos con detalle constructivo y calidad de materiales durante la ejecución del proyecto.',
    Icon: ClipboardList,
  },
  {
    title: 'Administración de Obra',
    description: 'Gestión integral de presupuestos y plazos.',
    Icon: Briefcase,
  },
];

export default function Services() {
  return (
    <section className="section bg-[var(--paper)] relative">
      <div className="container-page">
        <motion.div
          {...scrollReveal}
          className="mb-16 text-center"
        >
          <span className="text-[var(--brand)] text-xs md:text-sm font-light tracking-[0.3em] uppercase mb-3 block">
            Servicios
          </span>
          <h2 className="headline inline-block mb-6">
            Cómo podemos ayudarte
          </h2>
          <p className="text-[var(--ink-light)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Soluciones arquitectónicas completas adaptadas a tus necesidades y presupuesto.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="card p-8 lg:p-10 group cursor-default"
            >
              <div className="mb-5 transition-transform duration-300 group-hover:scale-110">
                <service.Icon className="w-8 h-8 text-[var(--brand)]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-playfair font-medium text-[var(--ink)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[var(--ink-light)] text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

