import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad y protección de datos personales de Martín Varvasini Arquitecto. Información sobre el tratamiento de datos y cookies.',
  robots: 'index, follow',
};

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-[var(--paper)]">
      <div className="container-page max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] mb-6">
          Política de Privacidad
        </h1>
        
        <p className="text-[var(--ink-light)] text-sm mb-8">
          Última actualización: Enero 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              1. Información que Recopilamos
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed mb-4">
              Cuando utilizas nuestro formulario de contacto, recopilamos la siguiente información:
            </p>
            <ul className="list-disc list-inside text-[var(--ink-light)] space-y-2 ml-4">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Información sobre tu proyecto (tipo de obra, ubicación, superficie, mensaje)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              2. Cómo Utilizamos tus Datos
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed mb-4">
              Los datos personales que nos proporcionas se utilizan únicamente para:
            </p>
            <ul className="list-disc list-inside text-[var(--ink-light)] space-y-2 ml-4">
              <li>Responder a tus consultas sobre servicios de arquitectura</li>
              <li>Comunicarnos contigo vía WhatsApp, email o teléfono</li>
              <li>Elaborar presupuestos y propuestas para tu proyecto</li>
              <li>Gestionar y dar seguimiento a proyectos en curso</li>
            </ul>
            <p className="text-[var(--ink-light)] leading-relaxed mt-4">
              <strong>No compartimos</strong> tu información personal con terceros, excepto cuando sea necesario para cumplir con obligaciones legales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              3. Almacenamiento de Datos
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed">
              Los datos del formulario de contacto se envían directamente a WhatsApp y pueden ser almacenados en nuestros registros de comunicación durante el tiempo necesario para gestionar tu consulta o proyecto. Conservamos esta información mientras mantengamos una relación comercial activa o según lo requiera la ley.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              4. Cookies y Tecnologías Similares
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed mb-4">
              Nuestro sitio web utiliza cookies esenciales para:
            </p>
            <ul className="list-disc list-inside text-[var(--ink-light)] space-y-2 ml-4">
              <li>Garantizar el correcto funcionamiento del sitio</li>
              <li>Protección anti-spam en formularios (rate limiting por sesión)</li>
              <li>Recordar preferencias básicas de navegación</li>
            </ul>
            <p className="text-[var(--ink-light)] leading-relaxed mt-4">
              Actualmente <strong>no utilizamos</strong> cookies de análisis (Google Analytics) ni de publicidad. Si esto cambiara en el futuro, actualizaremos esta política y solicitaremos tu consentimiento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              5. Tus Derechos
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed mb-4">
              De acuerdo con la Ley 25.326 de Protección de Datos Personales de Argentina, tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-[var(--ink-light)] space-y-2 ml-4">
              <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos sobre ti</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos personales</li>
              <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              6. Cómo Ejercer tus Derechos
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed mb-4">
              Para solicitar acceso, modificación o eliminación de tus datos personales, puedes contactarnos por cualquiera de estos medios:
            </p>
            <div className="bg-white p-6 rounded-lg border border-[var(--brand)]/20 space-y-3">
              <p className="text-[var(--ink)]">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:martin@varvasini.com.ar"
                  className="text-[var(--brand)] hover:underline"
                >
                  martin@varvasini.com.ar
                </a>
              </p>
              <p className="text-[var(--ink)]">
                <strong>WhatsApp:</strong>{' '}
                <a
                  href="https://wa.me/5492255506035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  +54 9 2255 506035
                </a>
              </p>
              <p className="text-[var(--ink-light)] text-sm mt-2">
                Responderemos tu solicitud dentro de los 10 días hábiles siguientes a la recepción.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              7. Seguridad
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, pérdida, alteración o divulgación. Esto incluye:
            </p>
            <ul className="list-disc list-inside text-[var(--ink-light)] space-y-2 ml-4 mt-4">
              <li>Conexión segura HTTPS en todo el sitio</li>
              <li>Protección anti-spam con honeypot y rate limiting</li>
              <li>Validaciones estrictas en formularios</li>
              <li>Acceso restringido a datos personales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              8. Enlaces a Terceros
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed">
              Nuestro sitio puede contener enlaces a sitios web de terceros (WhatsApp, Instagram, Google Maps). No somos responsables de las políticas de privacidad de estos sitios externos. Te recomendamos revisar sus políticas de privacidad respectivas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              9. Cambios a esta Política
            </h2>
            <p className="text-[var(--ink-light)] leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios se publicarán en esta página con una nueva fecha de actualización. Te recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos tu información.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              10. Responsable del Tratamiento
            </h2>
            <div className="bg-white p-6 rounded-lg border border-[var(--brand)]/20">
              <p className="text-[var(--ink)] mb-2">
                <strong>Martín Varvasini - Arquitecto</strong>
              </p>
              <p className="text-[var(--ink-light)]">
                Villa Gesell, Buenos Aires, Argentina
              </p>
              <p className="text-[var(--ink-light)]">
                Email: martin@varvasini.com.ar
              </p>
              <p className="text-[var(--ink-light)]">
                Tel: +54 9 2255 506035
              </p>
            </div>
          </section>

          <div className="border-t border-[var(--brand)]/20 pt-6 mt-8">
            <Link
              href="/contacto"
              className="inline-flex items-center text-[var(--brand)] hover:text-[var(--brand-dark)] transition-colors font-semibold"
            >
              ← Volver a Contacto
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
