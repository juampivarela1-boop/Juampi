# Arquitectura Martín - Sitio Web

Sitio web moderno y premium para el estudio de arquitectura de Martín Varvasini, especializado en diseño en Villa Gesell, Mar Azul y Mar de las Pampas.

## 🎨 Características

- **Next.js 15** con App Router y TypeScript
- **TailwindCSS** con tokens de color personalizados
- **Framer Motion** para animaciones sutiles
- **Sanity CMS** para contenido autogestionable
- **Responsive Design** optimizado para móvil
- **Seguridad de primera clase** - Sin backend PHP ni formularios inseguros
- **Performance optimizado** - Image optimization, lazy loading, ISR
- **SEO listo** - Metadata, Open Graph, sitemap
- **Dark mode ready** - Respeta `prefers-reduced-motion`

## 🚀 Stack Técnico

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: TailwindCSS 4 con custom tokens
- **Animaciones**: Framer Motion 11
- **CMS**: Sanity headless CMS
- **Deployment**: Vercel
- **Font**: Manrope (Google Fonts)

## 📦 Instalación y Setup

### 1. Clonar el proyecto

```bash
git clone <repository>
cd arquitecturamartin
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env.local` en la raíz:

```env
# Sanity Configuration (opcional - si usas Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Site Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=5492255506035
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Para usar Sanity:**
1. Crear cuenta en [sanity.io](https://sanity.io)
2. Crear nuevo proyecto
3. Copiar Project ID desde el dashboard
4. Pegar en `.env.local`

**Sin Sanity:**
- El sitio funcionará con datos mock
- Aún así puedes integrar Sanity cuando lo necesites

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### 5. Build para producción

```bash
npm run build
npm start
```

## 🏗️ Estructura del Proyecto

```
arquitecturamartin/
├── app/
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Home
│   ├── globals.css             # Estilos globales
│   ├── obras/
│   │   ├── page.tsx            # Lista de obras
│   │   └── [slug]/
│   │       └── page.tsx        # Detalle de obra
│   ├── servicios/
│   │   └── page.tsx            # Página de servicios
│   ├── estudio/
│   │   └── page.tsx            # About / Biografía
│   └── contacto/
│       └── page.tsx            # Formulario de contacto
├── components/
│   ├── Header.tsx              # Navegación
│   ├── Footer.tsx              # Pie de página
│   ├── CTAWhatsApp.tsx         # Call-to-action
│   ├── WhatsAppButton.tsx      # Botón flotante (móvil)
│   └── sections/
│       ├── Hero.tsx            # Sección hero
│       ├── FeaturedWorks.tsx   # Obras destacadas
│       ├── Services.tsx        # Servicios
│       ├── Process.tsx         # Proceso de trabajo
│       └── Testimonials.tsx    # Testimonios
├── lib/
│   └── sanity.ts               # Cliente de Sanity
├── sanity/
│   ├── sanity.config.ts        # Config de Sanity
│   └── schemaTypes/
│       ├── project.ts          # Schema para proyectos
│       ├── testimonial.ts      # Schema para testimonios
│       └── blockContent.ts     # Editor de bloques
├── public/                      # Assets estáticos
├── .env.local                  # Variables de entorno (local)
├── tailwind.config.js          # Config de Tailwind
├── tsconfig.json               # Config de TypeScript
├── next.config.ts              # Config de Next.js
└── package.json
```

## 🎯 Rutas disponibles

- `/` - Inicio
- `/obras` - Galería de proyectos
- `/obras/[slug]` - Detalle de proyecto
- `/servicios` - Servicios ofrecidos
- `/estudio` - Biografía e información del arquitecto
- `/contacto` - Formulario de contacto

## 🛡️ Seguridad

- ✅ **No PHP ni servidores propios**: contacto solo vía WhatsApp + mailto
- ✅ **Headers de seguridad**: CSP, X-Frame-Options, X-XSS-Protection
- ✅ **No expone claves**: variables en `.env.local`
- ✅ **Validaciones en cliente**: email, teléfono, formularios
- ✅ **Recomendaciones**:
  - Activar 2FA en Vercel, Sanity y email
  - Usar HTTPS en producción
  - Monitorear logs en Vercel

## 📊 SEO

- Metadata dinámicamente generada por página
- Open Graph para redes sociales
- Títulos y descripciones optimizados para búsquedas locales
- Sitemap automático (puede agregarse)
- Estructura semántica (h1/h2/h3)
- Mobile-friendly responsive

## 🎨 Personalización

### Colores

Editar en `tailwind.config.js`:

```js
colors: {
  brand: '#D07A22',        // Naranja
  'brand-dark': '#5A3427', // Marrón
  paper: '#F7F4EF',        // Crema
  ink: '#111827',          // Negro texto
  'ink-light': '#6B7280',  // Gris
}
```

### Tipografía

Cambiar font en `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google'; // o cualquier otra font
```

### Número de WhatsApp

Actualizar en:
- `components/WhatsAppButton.tsx`
- `components/sections/Hero.tsx`
- `components/CTAWhatsApp.tsx`
- `.env.local`

## 🚀 Deployment en Vercel

### 1. Conectar repositorio

```bash
vercel login
vercel
```

### 2. Variables de entorno en Vercel

- Ir a Settings → Environment Variables
- Agregar:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`

### 3. Deploy automático

Cada push a main dispara deploy automático.

## 📝 Contenido con Sanity

### Ir a Sanity Studio

```bash
npm run sanity:studio
```

O en producción: `https://tu-sitio.vercel.app/studio`

### Agregar una obra

1. Studio → Projects (Proyectos)
2. Create new
3. Completa:
   - Título
   - Slug (auto-generado)
   - Ubicación
   - Año
   - Superficie
   - Categoría
   - Imagen de portada
   - Galería
   - Descripción

## 🔧 Scripts disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build
npm start           # Producción
npm run lint        # ESLint
npm run sanity:studio # Abrir Sanity Studio localmente
```

## 📱 Performance

- **Image Optimization**: Next.js Image component con AVIF/WebP
- **Lazy Loading**: Imágenes cargan bajo demanda
- **Code Splitting**: Automático con Next.js
- **CSS**: Tailwind purga clases no usadas
- **ISR**: Revalidate dinámico para Sanity

## 🎬 Animaciones

Respeta `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## 🐛 Troubleshooting

### Error: "Cannot find module @sanity/client"

```bash
npm install @sanity/client
```

### Sanity no se conecta

- Verificar `NEXT_PUBLIC_SANITY_PROJECT_ID` en `.env.local`
- Usar datos mock mientras configuras Sanity

### Imágenes no cargan

- Agregar dominio de Sanity en `next.config.ts`
- Usar `next/image` en lugar de `<img>`

## 📄 Licencia

Proyecto privado de Martín Varvasini.

## 👥 Soporte

Para consultas o cambios, contactar a través de:
- WhatsApp: +54 9 2255 506035
- Email: info@arquitecturamartin.com.ar

---

**Última actualización**: Enero 2026
