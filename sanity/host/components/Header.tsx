'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT, SITE } from '@/lib/constants';
import { cardHover } from '@/lib/animations';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Obras', href: '/obras' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Sobre mí', href: '/estudio' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="fixed top-0 w-full glass shadow-sm z-50 border-b border-[var(--brand)]/5">
      <nav className="container-page py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="block" title="Volver al inicio" aria-label="Ir a página de inicio">
            <Image
              src="/logotrans.png"
              alt="Martín Varvasini Arquitecto - Logo"
              width={180}
              height={50}
              priority
              className="h-8 md:h-10 w-auto hover:opacity-80 transition-opacity duration-300"
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    isActive ? 'text-[var(--brand)]' : 'text-[var(--ink-light)] hover:text-[var(--brand)]'
                  }`}
                  title={`Ir a ${item.label}`}
                  aria-label={`Navegar a la sección de ${item.label}`}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--brand)] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    style={{ bottom: '-4px' }}
                  />
                </Link>
              </motion.div>
            );
          })}
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            {...cardHover}
          >
            <Link
              href="/contacto"
              className="btn-primary text-sm px-6 py-2.5"
              title="Ir a la página de contacto"
              aria-label="Ir al formulario de contacto para reservar consulta"
            >
              Reservar Consulta
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.span 
            className="w-6 h-0.5 bg-[var(--ink)] block transition-all"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-[var(--ink)] block transition-all"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-[var(--ink)] block transition-all"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass border-t border-[var(--brand)]/10"
        >
          <div className="container-page py-6 flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium transition-colors py-2 ${
                    isActive ? 'text-[var(--brand)]' : 'text-[var(--ink-light)] hover:text-[var(--brand)]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contacto"
              className="btn-primary text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Reservar Consulta
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
