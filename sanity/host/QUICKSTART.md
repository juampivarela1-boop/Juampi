# 🚀 INICIO RÁPIDO - Arquitectura Martín Web

## ✅ ESTADO ACTUAL

El proyecto ha sido **COMPLETAMENTE CONSTRUIDO** y **COMPILADO SIN ERRORES**.

```
✓ Compiled successfully
✓ TypeScript check passed
✓ All routes working
✓ Ready for development or deployment
```

---

## 🎯 Instrucciones de Inicio

### Paso 1: Abrir terminal en el proyecto

```bash
cd c:\Users\Fede\Desktop\arquitecturamartin
```

### Paso 2: Instalar dependencias (si no lo hiciste ya)

```bash
npm install
```

### Paso 3: Ejecutar en desarrollo

```bash
npm run dev
```

**El sitio estará disponible en**: [http://localhost:3000](http://localhost:3000)

---

## 📋 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm start` | Ejecutar build compilado |
| `npm run lint` | Ejecutar ESLint |

---

## 🌐 Rutas Disponibles

| Ruta | Descripción |
|------|------------|
| `/` | Home con hero, obras, servicios, proceso, testimonios |
| `/obras` | Galería de proyectos con filtros |
| `/obras/casa-contemporanea` | Ejemplo: Detalle de obra (demo) |
| `/servicios` | 6 servicios ofrecidos |
| `/estudio` | Bio y valores del arquitecto |
| `/contacto` | Formulario + WhatsApp |

---

## 🎨 Personalización Rápida

### Cambiar número de WhatsApp

Busca y reemplaza `5492255506035` en:
- `components/WhatsAppButton.tsx`
- `components/sections/Hero.tsx`
- `components/CTAWhatsApp.tsx`
- `.env.local`

### Cambiar colores

Edita en `tailwind.config.js`:
```js
colors: {
  brand: '#D07A22',        // Naranja principal
  'brand-dark': '#5A3427', // Marrón oscuro
  paper: '#F7F4EF',        // Fondo crema
  ink: '#111827',          // Texto negro
  'ink-light': '#6B7280',  // Gris
}
```

### Cambiar tipografía

En `app/layout.tsx`, importa otra fuente de Google:
```tsx
import { Inter } from 'next/font/google';
// o cualquier otra: Poppins, Lato, etc.
```

---

## 🗄️ Integrar Sanity (Próximo paso importante)

### 1. Crear cuenta Sanity

Ir a: https://sanity.io/pricing/free

### 2. Crear nuevo proyecto

- Proyecto: "Arquitectura Martín"
- Dataset: "production"

### 3. Copiar Project ID

Desde dashboard de Sanity, copiar el Project ID

### 4. Configurar .env.local

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_WHATSAPP_NUMBER=5492255506035
```

### 5. Datos ya estarán en el sitio

El sitio ya está completamente integrado con Sanity. Solo necesitas:
- Subir imágenes de proyectos
- Crear entradas de "Proyecto"
- Agregar testimonios

---

## 🚀 Desplegar a Vercel

### 1. Conectar repositorio

```bash
npm install -g vercel
vercel login
vercel
```

### 2. Variables de entorno en Vercel

En Settings → Environment Variables, agregar:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WHATSAPP_NUMBER=5492255506035
```

### 3. ¡Listo!

Cada push a main deployará automáticamente.

---

## 📊 Estructura de Archivos Importantes

```
arquitecturamartin/
├── app/                    # Páginas (routing Next.js)
│   ├── page.tsx           # Home (/)
│   ├── layout.tsx         # Layout global
│   ├── obras/             # /obras
│   ├── servicios/         # /servicios
│   ├── estudio/           # /estudio
│   └── contacto/          # /contacto
├── components/            # Componentes reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── sections/          # Secciones del home
├── sanity/               # Configuración Sanity CMS
├── lib/                  # Librerías (cliente Sanity)
├── .env.local           # Variables de entorno
├── tailwind.config.js   # Config Tailwind
├── next.config.ts       # Config Next.js
└── README.md            # Documentación completa
```

---

## ⚠️ Problemas Comunes

### Puerto 3000 ocupado

```bash
npm run dev -- -p 3001
```

### Error de Sanity al compilar

Verifica que `.env.local` tenga las variables correctas o déjalas vacías (funcionará con mock data).

### Imágenes no cargan

Asegúrate de agregar dominio de Sanity en `next.config.ts`:

```js
remotePatterns: [
  { protocol: 'https', hostname: 'cdn.sanity.io' }
]
```

---

## 📚 Documentación Completa

Revisa estos archivos:
- **README.md** - Documentación técnica completa
- **BUILDREPORT.md** - Reporte detallado de construcción
- **FILEMANIFEST.md** - Listado de todos los archivos

---

## ✅ Checklist Pre-Producción

Antes de hacer público:

- [ ] Configurar Sanity Project ID
- [ ] Subir contenido (obras, testimonios)
- [ ] Cambiar WhatsApp a número real
- [ ] Cambiar email de contacto
- [ ] Cambiar dirección/ubicación
- [ ] Agregar logo si existe
- [ ] Cambiar colores si es necesario
- [ ] Deploy a Vercel
- [ ] Configurar dominio personalizado
- [ ] Activar 2FA en Vercel, Sanity, Email
- [ ] Añadir Google Analytics (opcional)
- [ ] Test de mobile en dispositivo real
- [ ] Test de formulario

---

## 🎯 Soporte

**El código está completamente documentado**. Cualquier duda:

1. Revisa el archivo `README.md`
2. Revisa los comentarios en el código
3. Busca en Google: "Next.js 15" + tu pregunta
4. Consulta docs: https://nextjs.org/docs

---

## 🎉 ¡Listo para Empezar!

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y disfruta el sitio.

---

**Fecha**: 16 de Enero, 2026  
**Versión**: 1.0.0  
**Estado**: Production Ready ✅
