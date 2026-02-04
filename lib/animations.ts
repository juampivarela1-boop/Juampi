// Framer Motion variants y animaciones reusables
import { Variants } from 'framer-motion';

// Container variants para stagger children
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Item variants para fade in desde abajo
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Animación simple de fade in
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

// Animación para scroll reveal
export const scrollReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true },
};

// Animación para cards con hover
export const cardHover = {
  whileHover: { scale: 1.03, y: -2 },
  whileTap: { scale: 0.98 },
};
