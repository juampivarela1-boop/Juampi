'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants, scrollReveal } from '@/lib/animations';

// Mock testimonials
const testimonials = [
  {
    id: 1,
    name: 'Monica Bochge',
    project: '',
    text: 'Gracias Martin por ayudarnos a cumplir nuestro sueño de tener una casa tan cómoda y cálida. Interpretaste muy bien lo que queríamos y lo plasmaste en la realidad. Cabe señalar que toda la planta baja es apta para personas con movilidad reducida, lo cual fue un desafío. GRACIAS MARTIN!!!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Fabiana Angeles',
    project: '',
    text: 'Nos diste confianza desde el primer dia que estuviste en casa para conocer nuestra proyecto e ideas, captaste todo y pasaste limites perfeccionando detalles que marcaron sin duda los detalles, sin duda haríamos la segunda Vigo contigo❤️',
    rating: 5,
  },
  {
    id: 3,
    name: 'Marisa Rosano',
    project: 'Casa Cambelia de las Pampas',
    text: 'Confiamos y no nos decepcionaste. ¡Estamos felices!',
    instagram: 'https://www.instagram.com/p/C8IlEh_PQ2z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
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
              {testimonial.id === 1 ? (
                <div className="flex gap-1 mb-6">
                  <a
                    href="/obras/casa-prana"
                    className="text-[var(--brand)] underline text-base font-semibold hover:text-[var(--brand-dark)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Casa Prana - Ver casa
                  </a>
                </div>
              ) : testimonial.id === 2 ? (
                <div className="flex gap-1 mb-6">
                  <a
                    href="/obras/casa-vigo"
                    className="text-[var(--brand)] underline text-base font-semibold hover:text-[var(--brand-dark)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Casa Vigo - Ver casa
                  </a>
                </div>
              ) : testimonial.id === 3 ? (
                <div className="flex gap-1 mb-6">
                  <a
                    href="https://www.instagram.com/p/C8IlEh_PQ2z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                    className="text-[var(--brand)] underline text-base font-semibold hover:text-[var(--brand-dark)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Casa Cambelia de las Pampas - Ver reseña
                  </a>
                </div>
              ) : (
                <div className="flex gap-1 mb-6">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-[var(--brand)] text-lg">
                        ★
                      </span>
                    ))}
                </div>
              )}
              <p className="text-[var(--ink-light)] mb-8 italic text-base leading-relaxed">“{testimonial.text}”</p>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-playfair font-medium text-[var(--ink)] text-lg">
                    {testimonial.name}
                  </p>
                  {testimonial.id === 1 && (
                    <a
                      href="https://www.instagram.com/p/DEilUFvNsBR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brand)] underline hover:text-[var(--brand-dark)] transition-colors"
                    >
                      Ver reseña
                    </a>
                  )}
                  {testimonial.id === 2 && (
                    <a
                      href="https://www.instagram.com/reel/C73AZqpAAY1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brand)] underline hover:text-[var(--brand-dark)] transition-colors"
                    >
                      Ver reseña
                    </a>
                  )}
                  {testimonial.id === 3 && (
                    <a
                      href="https://www.instagram.com/p/C8IlEh_PQ2z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brand)] underline hover:text-[var(--brand-dark)] transition-colors"
                    >
                      Ver reseña
                    </a>
                  )}
                </div>
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

