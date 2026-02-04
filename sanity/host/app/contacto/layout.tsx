import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá con el arquitecto Martín Varvasini en Villa Gesell. Consultas por WhatsApp o formulario. Asesoramiento para tu proyecto de casa nueva, reforma o ampliación.',
  keywords: [
    'contacto arquitecto Villa Gesell',
    'consulta arquitectura',
    'presupuesto obra',
    'arquitecto Mar Azul contacto',
    'asesoramiento arquitectura',
  ],
  alternates: {
    canonical: 'https://arquitecturamartin.com.ar/contacto',
  },
  openGraph: {
    title: 'Contacto | Martín Varvasini - Arquitecto Villa Gesell',
    description:
      'Consultá tu proyecto de arquitectura. Disponible por WhatsApp y formulario online.',
    url: 'https://arquitecturamartin.com.ar/contacto',
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
