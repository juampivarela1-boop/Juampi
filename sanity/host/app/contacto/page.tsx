'use client';

import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CONTACT } from '@/lib/constants';

// Rate limiting in-memory (simple session-based)
const rateLimitStore = new Map<string, { count: number; timestamp: number; lastSubmitTime: number }>();
const RATE_LIMIT_MAX = 3; // máximo 3 envíos
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // en 1 hora (60 minutos)
const MIN_TIME_BETWEEN_SUBMITS = 5000; // mínimo 5 segundos entre envíos

function checkRateLimit(sessionId: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const record = rateLimitStore.get(sessionId);

  if (!record) {
    rateLimitStore.set(sessionId, { count: 1, timestamp: now, lastSubmitTime: now });
    return { allowed: true };
  }

  // Verificar tiempo mínimo entre envíos (anti-spam rápido)
  if (now - record.lastSubmitTime < MIN_TIME_BETWEEN_SUBMITS) {
    return { 
      allowed: false, 
      message: 'Por favor espera unos segundos antes de enviar otro mensaje.'
    };
  }

  // Si pasó la ventana de tiempo, reiniciar contador
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(sessionId, { count: 1, timestamp: now, lastSubmitTime: now });
    return { allowed: true };
  }

  // Si está dentro del límite
  if (record.count < RATE_LIMIT_MAX) {
    record.count++;
    record.lastSubmitTime = now;
    return { allowed: true };
  }

  // Calcular tiempo restante para próximo envío
  const timeRemaining = Math.ceil((RATE_LIMIT_WINDOW - (now - record.timestamp)) / 60000);
  return { 
    allowed: false, 
    message: `Has alcanzado el límite de ${RATE_LIMIT_MAX} envíos por hora. Intenta nuevamente en ${timeRemaining} minutos o contáctanos directamente por WhatsApp.`
  };
}

// Limpiar registros antiguos cada 2 horas
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW * 2);

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoObra: '',
    ubicacion: '',
    areaM2: '',
    fechaObjetivo: '',
    mensaje: '',
    website: '', // honeypot
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitError, setRateLimitError] = useState<string>('');
  const sessionIdRef = useRef<string>('');
  const formStartTimeRef = useRef<number>(0);

  // Generar session ID único al montar y registrar tiempo de carga
  useEffect(() => {
    sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    formStartTimeRef.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al editar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Limpiar rate limit error al editar
    if (rateLimitError) {
      setRateLimitError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Honeypot: si está lleno, es un bot
    if (formData.website) {
      console.log('🚫 Bot detectado por honeypot');
      return false;
    }

    // Anti-bot: verificar que no se envíe demasiado rápido (humano tarda al menos 3 segundos)
    const timeOnForm = Date.now() - formStartTimeRef.current;
    if (timeOnForm < 3000) {
      console.log('🚫 Envío demasiado rápido, posible bot');
      return false;
    }

    // Validar nombre
    if (!formData.nombre.trim() || formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validar teléfono (solo números, espacios, guiones y +)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    const phoneDigits = formData.telefono.replace(/[\s\-\+\(\)]/g, '');
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!phoneRegex.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono solo puede contener números, +, -, ( ) y espacios';
    } else if (phoneDigits.length < 8) {
      newErrors.telefono = 'El teléfono debe tener al menos 8 dígitos';
    }

    // Validar mensaje (mínimo 20 caracteres)
    if (formData.mensaje.trim() && formData.mensaje.trim().length < 20) {
      newErrors.mensaje = 'El mensaje debe tener al menos 20 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Limpiar error previo de rate limit
    setRateLimitError('');

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    // Verificar rate limit
    const rateLimitCheck = checkRateLimit(sessionIdRef.current);
    if (!rateLimitCheck.allowed) {
      setRateLimitError(rateLimitCheck.message || 'Has alcanzado el límite de envíos.');
      return;
    }

    // Construir mensaje para WhatsApp
    const mensajeWA = `
*Nueva Consulta de Arquitectura*

*Nombre:* ${formData.nombre}
*Email:* ${formData.email}
*Teléfono:* ${formData.telefono}
*Tipo de Obra:* ${formData.tipoObra || 'No especificado'}
*Ubicación:* ${formData.ubicacion || 'No especificada'}
*Superficie:* ${formData.areaM2 || 'No especificada'} m²
*Fecha Objetivo:* ${formData.fechaObjetivo || 'No especificada'}

*Mensaje:*
${formData.mensaje}
    `.trim();

    const whatsappUrl = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(
      mensajeWA
    )}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Mostrar confirmación
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        tipoObra: '',
        ubicacion: '',
        areaM2: '',
        fechaObjetivo: '',
        mensaje: '',
        website: '',
      });
      // Resetear tiempo de inicio del formulario
      formStartTimeRef.current = Date.now();
    }, 3000);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[var(--paper)]">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
              Contactanos
            </h1>
            <p className="text-[#111827]-light text-lg mb-8">
              Estamos listos para escuchar tu proyecto y ayudarte a hacerlo
              realidad.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">Teléfono</h3>
                <a
                  href={`tel:${CONTACT.whatsappNumber}`}
                  className="text-[#D07A22] hover:text-[#D07A22]-dark transition text-lg font-semibold"
                >
                  {CONTACT.phone}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">Email</h3>
                <a
                  href="mailto:martin@varvasini.com.ar"
                  className="text-[#D07A22] hover:text-[#D07A22]-dark transition text-lg font-semibold"
                >
                  martin@varvasini.com.ar
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">Ubicación</h3>
                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://www.google.com/maps/search/?api=1&query=Calle+36+N°+526,+Mar+Azul,+Buenos+Aires,+Argentina', '_blank', 'noopener,noreferrer');
                    }}
                    className="text-[#D07A22] hover:text-[#5A3427] transition-colors flex items-start gap-2 text-left"
                  >
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      Calle 36 N° 526 - entre Viña del Mar y Punta Indio<br />
                      Mar Azul | Las Gaviotas
                    </span>
                  </button>
                  <Link
                    href="/servicios#cobertura"
                    className="text-[#D07A22] hover:text-[#5A3427] transition-colors flex items-center gap-2 text-sm mt-2"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ver cobertura de proyectos
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">
                  Redes Sociales
                </h3>
                <div className="flex gap-4">
                  <a
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#D07A22] text-white flex items-center justify-center hover:shadow-lg transition"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/estudio_varvasini/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#D07A22] text-white flex items-center justify-center hover:shadow-lg transition"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/ArqMartinVarvasini/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#D07A22] text-white flex items-center justify-center hover:shadow-lg transition"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#D07A22] text-white p-8 rounded-xl text-center"
              >
                <p className="text-2xl font-bold mb-2">¡Gracias!</p>
                <p>
                  Tu consulta fue enviada a WhatsApp. Nos pondremos en contacto
                  pronto.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rate Limit Error */}
                {rateLimitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{rateLimitError}</p>
                        <p className="text-xs text-red-600 mt-1">
                          También puedes contactarnos directamente en{' '}
                          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                            WhatsApp
                          </a>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Honeypot field - invisible para usuarios reales */}
                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website">Website (no llenar)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className={`w-full px-4 py-3 border ${
                      errors.nombre ? 'border-red-500' : 'border-[#D07A22]/20'
                    } rounded-lg focus:outline-none focus:border-[#D07A22] transition`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.email ? 'border-red-500' : 'border-[#D07A22]/20'
                      } rounded-lg focus:outline-none focus:border-[#D07A22] transition`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.telefono ? 'border-red-500' : 'border-[#D07A22]/20'
                      } rounded-lg focus:outline-none focus:border-[#D07A22] transition`}
                      placeholder="+54 9..."
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Tipo de Obra
                  </label>
                  <select
                    name="tipoObra"
                    value={formData.tipoObra}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D07A22]/20 rounded-lg focus:outline-none focus:border-[#D07A22] transition"
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Casa Nueva">Casa Nueva</option>
                    <option value="Reforma">Reforma</option>
                    <option value="Ampliación">Ampliación</option>
                    <option value="Interiorismo">Interiorismo</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D07A22]/20 rounded-lg focus:outline-none focus:border-[#D07A22] transition"
                      placeholder="Villa Gesell / Mar Azul / etc"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Superficie (m²)
                    </label>
                    <input
                      type="number"
                      name="areaM2"
                      value={formData.areaM2}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D07A22]/20 rounded-lg focus:outline-none focus:border-[#D07A22] transition"
                      placeholder="250"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Fecha Objetivo
                  </label>
                  <input
                    type="text"
                    name="fechaObjetivo"
                    value={formData.fechaObjetivo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D07A22]/20 rounded-lg focus:outline-none focus:border-[#D07A22] transition"
                    placeholder="Ej: Marzo 2027"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    minLength={20}
                    className={`w-full px-4 py-3 border ${
                      errors.mensaje ? 'border-red-500' : 'border-[#D07A22]/20'
                    } rounded-lg focus:outline-none focus:border-[#D07A22] transition resize-none`}
                    placeholder="Cuéntanos más sobre tu proyecto (mínimo 20 caracteres)..."
                  />
                  {errors.mensaje && (
                    <p className="text-red-500 text-xs mt-1">{errors.mensaje}</p>
                  )}
                  {formData.mensaje.length > 0 && formData.mensaje.length < 20 && (
                    <p className="text-gray-500 text-xs mt-1">
                      {20 - formData.mensaje.length} caracteres restantes
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-[#D07A22] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Enviar por WhatsApp
                </motion.button>

                <p className="text-xs text-[#111827]-light text-center">
                  Al enviar el formulario, serás redirigido a WhatsApp para continuar la conversación.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

