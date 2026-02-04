'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants, scrollReveal } from '@/lib/animations';

// Mock testimonials
const testimonials = [
  {
    id: 1,
    name: 'María González',
    project: 'Casa Contemporánea - Villa Gesell',
    text: 'Martín transformó nuestra visión en realidad. Profesional, creativo y atento a cada detalle.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    project: 'Reforma Integral - Mar Azul',
    text: 'La dirección de obra fue impecable. Excelente comunicación y respeto por los plazos.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Fernández',
    project: 'Ampliación - Mar de las Pampas',
    text: 'Servicio completo desde el diseño hasta la entrega. Altamente recomendado.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-[var(--paper)] relative">
      <div className="container-page">
        <motion.div
          {...scrollReveal}
          className="mb-16 text-center"
        >
          <span className="text-[var(--brand)] text-xs md:text-sm font-light tracking-[0.3em] uppercase mb-3 block">
            Testimonios
          </span>
          <h2 className="headline inline-block mb-6">
            Lo que Dicen nuestros Clientes
          </h2>
          <p className="text-[var(--ink-light)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Historias de satisfacción y proyectos realizados con excelencia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="card p-8 lg:p-10"
            >
              <div className="flex gap-1 mb-6">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-[var(--brand)] text-lg">
                      ★
                    </span>
                  ))}
              </div>
              <p className="text-[var(--ink-light)] mb-8 italic text-base leading-relaxed">“{testimonial.text}”</p>
              <div>
                <p className="font-playfair font-medium text-[var(--ink)] text-lg mb-1">{testimonial.name}</p>
                <p className="text-xs text-[var(--brand)] font-light uppercase tracking-[0.2em]">
                  {testimonial.project}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

