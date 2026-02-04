'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT } from '@/lib/constants';

export default function WhatsAppButton() {
  const whatsappUrl = CONTACT.whatsappUrl;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group"
        title="Consultar por WhatsApp"
        aria-label="Abrir chat de WhatsApp para realizar una consulta"
      >
        <FaWhatsapp
          size={22}
          className="group-hover:rotate-12 transition-transform duration-300"
          aria-hidden="true"
        />
        <span className="font-semibold text-sm">Consultar</span>
      </motion.a>
    </motion.div>
  );
}

