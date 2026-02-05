'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { urlFor } from '@/lib/sanity.client';

// Mock data - será reemplazado por datos de Sanity
const mockWorks = [
  {
    id: 1,
    title: 'Casa Carolina',
    location: 'Mar de las Pampas',
    year: 2019,
    slug: 'casa-carolina',
    category: 'Obras Entregadas',
    areaM2: 216,
    image: '/Img/CASA CAROLINA/SaveClip.App_426985872_1135797071207775_2804125062818619571_n.jpg',
  },
  {
    id: 2,
    title: 'Casa MYJ',
    location: 'Calle 29 entre Punta Indio y Pinamar, Las Gaviotas',
    year: 2021,
    slug: 'casa-myj',
    category: 'Obras Entregadas',
    areaM2: 200,
    image: '/Img/MYJ CASA/casamyj.jpg',
  },
  {
    id: 3,
    title: 'Casa Martin Fierro',
    location: 'Calle Martin Fierro',
    year: 2022,
    slug: 'casa-martin-fierro',
    category: 'Obras Entregadas',
    areaM2: 96,
    image: '/Img/Martin fierro cas/482355131_1169806148169507_2205687858580211105_n.jpg',
  },
  {
    id: 4,
    title: 'Casa Prana',
    location: 'Calle Vega y Artes, Mar de las Pampas',
    year: 2013,
    slug: 'casa-prana',
    category: 'Obras Entregadas',
    areaM2: 151.07,
    image: '/Img/casa-prana-destacada.jpg',
  },
  {
    id: 5,
    title: 'Casa Marinas',
    location: 'Puertos del Lago - Barrio Marinas - Escobar',
    year: 2020,
    slug: 'casa-marinas',
    category: 'Obras Entregadas',
    areaM2: 546.12,
    image: '/Img/casa-marinas-destacada.jpg',
  },
  {
    id: 6,
    title: 'Casa Setiembre',
    location: 'Mar de las Pampas',
    year: 2011,
    slug: 'casa-contemporanea',
    category: 'Obras Entregadas',
    areaM2: 250,
    image: '/Img/135_1_n.jpg',
  },
  {
    id: 7,
    title: 'Casa Punto de Encuentro',
    location: 'Mar Azul',
    year: 2011,
    slug: 'casa-punto-de-encuentro',
    category: 'Obras Entregadas',
    areaM2: 180,
    image: '/Img/casa punto de encuentro/134_2_n.jpg',
  },
  {
    id: 8,
    title: 'Casa Antü Pewen',
    location: 'Mar de las Pampas',
    year: 2023,
    slug: 'casa-antu-pewen',
    category: 'Obras Entregadas',
    areaM2: 73,
    image: '/Img/casa Antü Pewen/86_1_n.jpg',
  },
  {
    id: 9,
    title: 'Casa Valeria del Mar',
    location: 'Valeria del Mar',
    year: 2023,
    slug: 'casa-valeria-del-mar',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/CASA VALERIA DEL MAR/482319405_1168738581609597_7057043746754401797_n.jpg',
  },
  {
    id: 10,
    title: 'Casa Mario y Sandra',
    location: 'Villa Gesell',
    year: 2017,
    slug: 'casa-mario-y-sandra',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Casa Mario y Sandra/514417597_23870598835934050_3763323217747048216_n.jpg',
  },
  {
    id: 11,
    title: 'Casa Lío',
    location: 'Costa Esmeralda',
    year: 2017,
    slug: 'casa-lio',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Diseño Estructural/513150901_10084828068271027_2178580964258911095_n.jpg',
  },
  {
    id: 12,
    title: 'Obra Querandíes',
    location: 'Mar de las Pampas',
    year: 2015,
    slug: 'obra-querandies',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Obra Querandíes/509803496_10053247868095714_6675195259480783319_n.jpg',
  },
  {
    id: 13,
    title: 'Casa Coquimbo',
    location: 'Calle Santa Ana y Pedroni, Mar de las Pampas',
    year: 2014,
    slug: 'casa-coquimbo',
    category: 'Obras Entregadas',
    areaM2: 147.65,
    image: '/Img/Coquimbo/507953828_10016884045065430_3279785280575583673_n.jpg',
  },
  {
    id: 14,
    title: 'Avance de obra Albornoz',
    location: 'Mar de las Pampas',
    year: 2014,
    slug: 'obra-albornoz',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Obra Albornoz/506478169_10007094252711076_3636636995094657512_n.jpg',
  },
  {
    id: 15,
    title: 'Casa Selva - Reforma Integral (Morado / Rojo)',
    location: 'Calle 40, Mar Azul',
    year: 2011,
    slug: 'casa-selva',
    category: 'Obras Entregadas',
    areaM2: 98,
    image: '/Img/Casa Selva Mar Azul/503414868_9889888047765031_2222542482059722752_n.jpg',
  },
  {
    id: 16,
    title: 'Casa Cupal Avance de obra',
    location: 'Mar de las Pampas',
    year: 2014,
    slug: 'casa-cupal',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Casa Cupal Avance de obra/506483247_9991798484240653_393612243510967791_n.jpg',
  },
  {
    id: 17,
    title: 'Casa Pivamar',
    location: 'Mar Azul',
    year: 2012,
    slug: 'casa-pivamar',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Casa pivamar/504536121_9929932053760630_4272594163241988015_n.jpg',
  },
  {
    id: 18,
    title: 'Casa Ramos',
    location: 'Calle Bonanza, Mar de las Pampas',
    year: 2011,
    slug: 'casa-ramos',
    category: 'Obras Entregadas',
    areaM2: 118,
    image: '/Img/casa ramos/502566598_9899424140144755_8654498115596516598_n.jpg',
  },
  {
    id: 19,
    title: 'Casa Cambelia',
    location: 'Calle Solis, Mar de las Pampas',
    year: 2012,
    slug: 'casa-cambelia',
    category: 'Obras Entregadas',
    areaM2: 111,
    image: '/Img/casa cambelia de las pampas/503152391_9891581954262307_7059465186719371092_n.jpg',
  },
  {
    id: 20,
    title: 'Casa Kawinkelen',
    location: 'Mar de las Pampas',
    year: 2009,
    slug: 'casa-kawinkelen',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/casa Kawinkelen pampas 2009/502573474_9891582017595634_38161502935766851_n.jpg',
  },
  {
    id: 21,
    title: 'Casa Pura Vida',
    location: '28 entre Punta Indio y Pinamar, Las Gaviotas',
    year: 2010,
    slug: 'casa-pura-vida',
    category: 'Obras Entregadas',
    areaM2: 98.5,
    image: '/Img/casa pura vida las gaviotas 2010/502961106_9891563030930866_6642515461390982306_n.jpg',
  },
  {
    id: 22,
    title: 'Casa Valhala',
    location: 'Mar de las Pampas',
    year: 2008,
    slug: 'casa-valhala',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Casa Valhala Mar De las pampas 2008/502414086_9889934141093755_5153663509568235286_n.jpg',
  },
  {
    id: 23,
    title: 'Casa Spadescansar',
    location: 'Mar Azul',
    year: 2008,
    slug: 'casa-spadescansar',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/casa spadescansar/502578522_9889903101096859_6826749419979587134_n.jpg',
  },
  {
    id: 24,
    title: 'Casa El Rayo Verde',
    location: 'Mar Azul',
    year: 2010,
    slug: 'casa-el-rayo-verde',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/casa el rayo verde mar azul 2010/503144701_9889903501096819_7423311589169437296_n.jpg',
  },
  {
    id: 25,
    title: 'Casa Nuestro Lugar',
    location: 'Mar de las Pampas',
    year: 2010,
    slug: 'casa-nuestro-lugar',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/nuestro lugar casa mar de las pampas 2010/502690577_9889896671097502_2033419148426054757_n.jpg',
  },
  {
    id: 26,
    title: 'Casa Morena 2',
    location: 'Mar Azul',
    year: 2012,
    slug: 'casa-morena-2',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/casa morena 2  mar azul año 2012/502498710_9889896704430832_3924326043657321178_n.jpg',
  },
  {
    id: 27,
    title: 'Casa Alanis II',
    location: 'Mar Azul',
    year: 2010,
    slug: 'casa-alanis-ii',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/Alanis II 2010/500461544_24054218430848814_1390625280296995726_n.jpg',
  },
  {
    id: 28,
    title: 'Casa Alanis 1',
    location: 'Mar Azul',
    year: 2008,
    slug: 'casa-alanis-1',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/alanis 1 2008 mar azul/496156778_23913021178301874_2152520376328060323_n.jpg',
  },
  {
    id: 29,
    title: 'Costa Gaviotas Cabañas',
    location: 'Las Gaviotas',
    year: 2010,
    slug: 'costa-gaviotas-cabanas',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/costa gaviotas cabañas/513175485_10239468957728116_7469273170172722864_n.jpg',
  },
  {
    id: 30,
    title: 'Casa Mis Afectos',
    location: 'Mar de las Pampas',
    year: 2008,
    slug: 'casa-mis-afectos',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/casa mis afectos 2008 mar de las pampas/502416657_9889886554431847_3159001107125756123_n.jpg',
  },
  {
    id: 31,
    title: 'Casa Ojana',
    location: 'Mar de las Pampas',
    year: 2010,
    slug: 'casa-ojana',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/casa ojana mar de las pampas 2010/502473948_9889886857765150_8716139701865141355_n.jpg',
  },
  {
    id: 32,
    title: 'Casa Nanu',
    location: 'Palacios y Garay, Mar de las Pampas',
    year: 2011,
    slug: 'casa-nanu',
    category: 'Obras Entregadas',
    areaM2: 82,
    image: '/Img/casa nanu mar de las pampas 2011/502414787_9889886631098506_4382141569772793129_n.jpg',
  },
  {
    id: 33,
    title: 'Casa Recanto das Pampas',
    location: 'Calle Cruz del Sur, Mar de las Pampas',
    year: 2008,
    slug: 'casa-recanto-das-pampas',
    category: 'Obras Entregadas',
    areaM2: 75.5,
    image: '/Img/casa recanto das pampas mar ed las pampas año 2008/502412392_9889521124468390_2586157993504969712_n.jpg',
  },
  {
    id: 34,
    title: 'Casa Alfredo',
    location: 'Costa Esmeralda',
    year: 2010,
    slug: 'casa-alfredo',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/casa alfredo csota esmeralda 2010/502863212_9889518487801987_741748816852835543_n.jpg',
  },
  {
    id: 35,
    title: 'Casa La Morena',
    location: 'Calle 36 y Punta del Indio, Mar Azul',
    year: 2010,
    slug: 'casa-la-morena',
    category: 'Obras Entregadas',
    areaM2: 63,
    image: '/Img/casa la morena mar azul 2010/502502420_9889518554468647_5082236360954978050_n.jpg',
  },
  {
    id: 36,
    title: 'Casa Otium',
    location: 'Calle Albatros, Mar de las Pampas',
    year: 2009,
    slug: 'casa-otium',
    category: 'Obras Entregadas',
    areaM2: 104,
    image: '/Img/casa otium mar de las pampas 2009/502471247_9889518164468686_1492871446280330990_n.jpg',
  },
  {
    id: 37,
    title: 'Ampliación Apart "La Morada"',
    location: 'Villa Gesell',
    year: 2022,
    slug: 'ampliacion-1',
    category: 'Obras Entregadas',
    areaM2: 175,
    image: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448067258_1509499283328942_2240280668779532489_n.jpg',
  },
  {
    id: 45,
    title: 'Ampliación Apart La Morada 2024',
    location: 'Villa Gesell',
    year: 2024,
    slug: 'ampliacion-apart-la-morada-2024',
    category: 'Obras Entregadas',
    areaM2: 0,
    image: '/Img/AMPLIACION 1/480305640_1150518246764964_6917937509997425630_n.jpg',
  },
  {
    id: 38,
    title: 'Casa Mobydick',
    location: 'Mar Azul',
    year: 2023,
    slug: 'casa-mobydick',
    category: 'Obras Entregadas',
    areaM2: 85,
    image: '/Img/casa mobydick/SaveClip.App_402510146_998765957852671_2454399049944654230_n.jpg',
  },
  {
    id: 39,
    title: 'Casa Tiefland',
    location: 'Barrio Senderos 3, Costa Esmeralda',
    year: 2017,
    slug: 'casa-tiefland',
    category: 'Obras Entregadas',
    areaM2: 265,
    image: '/Img/Casa Tiefland/SaveClip.App_448604828_477899691488105_5066464145311794518_n.jpg',
  },
  {
    id: 40,
    title: 'Casa MyG',
    location: 'Calle 42 y Playa, Mar Azul',
    year: 2016,
    slug: 'casa-myg',
    category: 'Obras Entregadas',
    areaM2: 217,
    image: '/Img/Casa MYG/SaveClip.App_448262749_405749659173137_3171350461115898264_n.jpg',
  },
  {
    id: 42,
    title: 'Casa Cristal',
    location: 'Pinamar y 28, Las Gaviotas',
    year: 2011,
    slug: 'casa-cristal',
    category: 'Obras Entregadas',
    areaM2: 227,
    image: '/Img/casa cristal/SaveClip.App_456150810_427456383025501_2021559903644199490_n.jpg',
  },
  {
    id: 43,
    title: 'Casa Griega',
    location: 'Calle 29 y Necochea, Las Gaviotas',
    year: 2018,
    slug: 'casa-griega',
    category: 'Obras Entregadas',
    areaM2: 290,
    image: '/Img/casa griega/SaveClip.App_456195474_429650799461603_4991496607165857083_n.jpg',
  },
  {
    id: 44,
    title: 'Casa Socrates',
    location: 'Coul de Sac Peralta Ramos, Mar de las Pampas',
    year: 2015,
    slug: 'casa-socrates',
    category: 'Obras Entregadas',
    areaM2: 243,
    image: '/Img/casa socrates/SaveClip.App_462359449_522062450570020_6823454231860084660_n.jpg',
  },
];

const categories = [
  'Todas',
  'Obras Entregadas',
  'En Obra',
];

export default function ObrasList() {
  const [works, setWorks] = useState(mockWorks);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'location'>('newest');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const mergeWorks = (staticWorks: typeof mockWorks, cmsWorks: any[]) => {
    const bySlug = new Map<string, any>();

    staticWorks.forEach((work) => {
      if (work.slug) bySlug.set(work.slug, work);
    });

    cmsWorks.forEach((work) => {
      if (work?.slug) {
        const prev = bySlug.get(work.slug) || {};
        bySlug.set(work.slug, { ...prev, ...work });
      }
    });

    return Array.from(bySlug.values());
  };

  useEffect(() => {
    let isMounted = true;

    const loadWorks = async () => {
      try {
        const response = await fetch('/api/works', { cache: 'no-store' });
        if (!response.ok) return;

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && isMounted) {
          setWorks(mergeWorks(mockWorks, data));
        }
      } catch (error) {
        console.error('No se pudieron cargar obras desde Sanity:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadWorks();

    return () => {
      isMounted = false;
    };
  }, []);

  const getCategoryLabel = (category: string[] | string | undefined) => {
    if (Array.isArray(category)) return category[0];
    return category || 'Proyecto';
  };

  const matchesCategory = (category: string[] | string | undefined, selected: string) => {
    if (selected === 'Todas') return true;
    if (Array.isArray(category)) return category.includes(selected);
    return category === selected;
  };

  const getWorkImageUrl = (work: any) => {
    if (work.image) return work.image;
    if (work.coverImage) {
      return urlFor(work.coverImage).width(1200).height(675).url();
    }
    return null;
  };

  // Función para extraer la ciudad principal de una ubicación
  const extractCity = (location: string): string => {
    // Extraer la ciudad después de comas o al final del string
    const cities = ['Villa Gesell', 'Mar Azul', 'Mar de las Pampas', 'Las Gaviotas', 'Pinamar', 'Costa Esmeralda', 'Valeria del Mar', 'Escobar', 'Buenos Aires'];
    
    for (const city of cities) {
      if (location.includes(city)) {
        return city;
      }
    }
    
    // Si no encuentra una ciudad conocida, usar la ubicación completa
    return location;
  };

  // Filtrar obras según categoría seleccionada
  let filteredWorks = works.filter((work) =>
    matchesCategory(work.category, selectedCategory)
  );

  // Ordenar obras según el orden seleccionado
  filteredWorks = [...filteredWorks].sort((a, b) => {
    if (sortOrder === 'newest') {
      return (b.year ?? 0) - (a.year ?? 0);
    } else if (sortOrder === 'oldest') {
      return (a.year ?? 0) - (b.year ?? 0);
    } else {
      // Ordenar por ciudad principal alfabéticamente
      const cityA = extractCity(a.location);
      const cityB = extractCity(b.location);
      return cityA.localeCompare(cityB, 'es');
    }
  });

  // Agrupar obras por ciudad cuando se ordena por localidad
  const groupedByLocation = sortOrder === 'location' 
    ? filteredWorks.reduce((acc, work) => {
        const locationKey = extractCity(work.location ?? '');
        if (!acc[locationKey]) {
          acc[locationKey] = [];
        }
        acc[locationKey].push(work);
        return acc;
      }, {} as Record<string, typeof filteredWorks>)
    : null;

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[var(--paper)] z-0">
      <div className="container-page">
        {/* Header */}
        <div className="mb-12">
          <h1>
            Portafolio de Obras
          </h1>
          <p className="text-[var(--ink-light)] text-lg max-w-2xl">
            Explora nuestros proyectos realizados.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                cat === selectedCategory
                  ? 'bg-[var(--brand)] text-white shadow-sm hover:shadow-md'
                  : 'bg-white text-[var(--ink)] border-2 border-[var(--brand)]/20 hover:bg-[var(--brand)]/5 hover:border-[var(--brand)]/40'
              }`}
            >
              {cat}
            </button>
          ))}
          
          {/* Sort dropdown */}
          <div className="ml-auto relative flex items-center gap-2">
            <span className="text-sm text-[var(--ink-light)] font-medium">Ordenar:</span>
            <button
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              className="px-6 py-2.5 rounded-full font-semibold transition-all duration-300 bg-white text-[var(--ink)] border-2 border-[var(--brand)]/20 hover:bg-[var(--brand)]/5 hover:border-[var(--brand)]/40 flex items-center gap-2"
            >
              {sortOrder === 'newest' ? 'Más recientes' : sortOrder === 'oldest' ? 'Más antiguas' : 'Por localidad'}
              <svg className={`w-4 h-4 transition-transform ${sortMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {sortMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-[var(--brand)]/10 overflow-hidden z-10">
                <button
                  onClick={() => {
                    setSortOrder('newest');
                    setSortMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-[var(--brand)]/5 transition-colors flex items-center gap-2 ${
                    sortOrder === 'newest' ? 'bg-[var(--brand)]/10 text-[var(--brand)] font-semibold' : 'text-[var(--ink)]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Más recientes
                </button>
                <button
                  onClick={() => {
                    setSortOrder('oldest');
                    setSortMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-[var(--brand)]/5 transition-colors flex items-center gap-2 ${
                    sortOrder === 'oldest' ? 'bg-[var(--brand)]/10 text-[var(--brand)] font-semibold' : 'text-[var(--ink)]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Más antiguas
                </button>
                <button
                  onClick={() => {
                    setSortOrder('location');
                    setSortMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-[var(--brand)]/5 transition-colors flex items-center gap-2 ${
                    sortOrder === 'location' ? 'bg-[var(--brand)]/10 text-[var(--brand)] font-semibold' : 'text-[var(--ink)]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Por localidad
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Grid de obras */}
        {sortOrder === 'location' && groupedByLocation ? (
          // Vista agrupada por localidad
          <div className="space-y-12">
            {Object.entries(groupedByLocation).map(([location, works]) => (
              <div key={location}>
                <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-[var(--ink)] mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                  <span className="text-sm font-normal text-[var(--ink-light)]">({works.length} {works.length === 1 ? 'obra' : 'obras'})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {works.map((work) => {
                    const imageUrl = getWorkImageUrl(work);
                    const categoryLabel = getCategoryLabel(work.category);
                    const areaValue = work.areaM2 ?? 0;

                    return (
                      <Link
                        key={work._id ?? work.id ?? work.slug}
                        href={`/obras/${work.slug}`}
                        className="group"
                      >
                        <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-gradient-to-br from-brand/10 to-brand-dark/10">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={`${work.title} - ${work.location ?? 'Ubicación'}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              placeholder="blur"
                              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI0Y3RjRFRiIvPjwvc3ZnPg=="
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg
                                className="w-20 h-20 text-[#D07A22]/20"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                            {work.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[var(--brand)]">
                            <span>{categoryLabel}</span>
                            <span className="w-1 h-1 bg-[var(--brand)]/40 rounded-full" />
                            <span>{work.year ?? '—'}</span>
                            {areaValue > 0 && (
                              <>
                                <span className="w-1 h-1 bg-[var(--brand)]/40 rounded-full" />
                                <span>{areaValue}m²</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Vista normal (por fecha)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work) => {
            const imageUrl = getWorkImageUrl(work);
            const categoryLabel = getCategoryLabel(work.category);
            const areaValue = work.areaM2 ?? 0;

            return (
              <Link
                key={work._id ?? work.id ?? work.slug}
                href={`/obras/${work.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-gradient-to-br from-brand/10 to-brand-dark/10">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${work.title} - ${work.location ?? 'Ubicación'}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI0Y3RjRFRiIvPjwvc3ZnPg=="
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-20 h-20 text-[#D07A22]/20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#D07A22] transition">
                  {work.title}
                </h3>
                <div className="text-sm mb-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (work.location) {
                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(work.location)}`, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-[#D07A22] hover:text-[#5A3427] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {work.location ?? 'Ubicación'}
                  </button>
                  <span className="text-[#6B7280]">•</span>
                  <span className="text-[#6B7280]">{work.year ?? '—'}</span>
                </div>
                <p className="text-[#D07A22] text-sm font-semibold">
                  {categoryLabel} • {areaValue > 0 ? `${areaValue}m²` : '?'}
                </p>
              </Link>
            );
          })}
        </div>
        )}
      </div>
    </main>
  );
}


