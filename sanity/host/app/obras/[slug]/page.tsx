'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NextImage from 'next/image';

// Mock data - será reemplazado por datos de Sanity
const mockProjects: Record<string, any> = {
  'casa-carolina': {
    title: 'Casa Carolina',
    location: 'Mar de las Pampas',
    year: 2019,
    areaM2: 216,
    category: 'Obras Entregadas',
    description:
      'Casa Carolina es un proyecto residencial de 216m² que ejemplifica el compromiso con la arquitectura sustentable y el diseño contemporáneo. Situada en Mar de las Pampas, esta vivienda responde a las necesidades de confort y funcionalidad, integrándose armoniosamente con el entorno natural. La propuesta arquitectónica prioriza la eficiencia energética, la utilización de materiales nobles y la generación de espacios luminosos que potencian la calidad de vida de sus habitantes.',
    images: [
      { id: 1, url: '/Img/CASA CAROLINA/SaveClip.App_426710204_372069262263432_6947105437362156218_n.jpg' },
      { id: 2, url: '/Img/CASA CAROLINA/SaveClip.App_426985872_1135797071207775_2804125062818619571_n.jpg' },
      { id: 3, url: '/Img/CASA CAROLINA/SaveClip.App_427350781_2634388566735539_6001662775699683640_n.jpg' },
      { id: 4, url: '/Img/CASA CAROLINA/SaveClip.App_427379152_395873686391003_4496936667000640248_n.jpg' },
      { id: 5, url: '/Img/CASA CAROLINA/SaveClip.App_427425504_781349277373712_8104704633672810949_n.jpg' },
      { id: 6, url: '/Img/CASA CAROLINA/SaveClip.App_427432193_950769433334472_4075134637766725689_n.jpg' },
      { id: 7, url: '/Img/CASA CAROLINA/SaveClip.App_427448269_379209851516439_5236530079631382353_n.jpg' },
      { id: 8, url: '/Img/CASA CAROLINA/SaveClip.App_427626269_398495132628292_1621978150936607866_n.jpg' },
    ],
  },
  'casa-marinas': {
    title: 'Casa Marinas',
    location: 'Escobar',
    year: 2020,
    areaM2: 546.12,
    category: 'Obras Entregadas',
    description:
      'Casa diseñada para Fernanda y Alfredo en Escobar. Un proyecto de 546m² que combina espacios amplios con diseño contemporáneo, creando ambientes luminosos y funcionales que se integran perfectamente con su entorno. La distribución privilegia las vistas y la conexión con el exterior.',
    images: [
      { id: 1, url: '/Img/casa Marinas/DESTACADA_MARINAS.jpg' },
      { id: 2, url: '/Img/casa Marinas/488699523_1188894349594020_6565181685141304167_n.jpg' },
      { id: 3, url: '/Img/casa Marinas/488905899_1188894329594022_463564986748860108_n.jpg' },
      { id: 4, url: '/Img/casa Marinas/488930483_1188897039593751_448433627336677475_n.jpg' },
      { id: 5, url: '/Img/casa Marinas/488966100_1188894856260636_946112273889383276_n.jpg' },
      { id: 6, url: '/Img/casa Marinas/489031951_1188893962927392_8182887768965751932_n.jpg' },
      { id: 7, url: '/Img/casa Marinas/489278445_1188894619593993_2687926080416468610_n.jpg' },
      { id: 8, url: '/Img/casa Marinas/489291490_1188895069593948_7093232656470320455_n.jpg' },
      { id: 9, url: '/Img/casa Marinas/489376998_1188897269593728_7791046589803670036_n.jpg' },
      { id: 10, url: '/Img/casa Marinas/489751984_1188897239593731_5227092831617884607_n.jpg' },
      { id: 11, url: '/Img/casa Marinas/489788922_1188895106260611_5864893868140571995_n.jpg' },
      { id: 12, url: '/Img/casa Marinas/490020460_1188895372927251_8924810233551958012_n.jpg' },
    ],
  },
  'casa-prana': {
    title: 'Casa Prana',
    location: 'Calle Vega y Artes, Mar de las Pampas',
    year: 2013,
    areaM2: 151.07,
    category: 'Obras Entregadas',
    description:
      'Casa "PRANA" - Quiero agradecer mucho a Marcelo y Mónica por confiar en nosotros para este proyecto. Ha sido genial trabajar con ustedes y ayudar a hacer realidad sus ideas. Gracias por darnos la oportunidad y el apoyo. Fotos: Gentileza Esteban Turón.',
    images: [
      { id: 1, url: '/Img/Casa Prana/DESTACADA_PRANA.jpg' },
      { id: 2, url: '/Img/Casa Prana/483105617_1172855707864551_1990233753895527408_n.jpg' },
      { id: 3, url: '/Img/Casa Prana/483106094_1172856107864511_2237205611941176077_n.jpg' },
      { id: 4, url: '/Img/Casa Prana/483106205_1172856147864507_1896125728112724546_n.jpg' },
      { id: 5, url: '/Img/Casa Prana/484220294_1172856091197846_1611725959614693027_n.jpg' },
      { id: 6, url: '/Img/Casa Prana/484317570_1172856097864512_5352029086892898986_n.jpg' },
      { id: 7, url: '/Img/Casa Prana/484338611_1172855951197860_9211603296220968858_n.jpg' },
      { id: 8, url: '/Img/Casa Prana/484395864_1172855967864525_6886691755555024332_n.jpg' },
      { id: 9, url: '/Img/Casa Prana/484512451_1172855924531196_1559501720614670558_n.jpg' },
      { id: 10, url: '/Img/Casa Prana/484620663_1172855974531191_4575216298524818116_n.jpg' },
      { id: 11, url: '/Img/Casa Prana/484714781_1172856121197843_5131066369039491431_n.jpg' },
      { id: 12, url: '/Img/Casa Prana/484751880_1172855954531193_3076985866397353762_n.jpg' },
      { id: 13, url: '/Img/Casa Prana/484794637_1172855917864530_5101101423992833714_n.jpg' },
      { id: 14, url: '/Img/Casa Prana/484808813_1172855971197858_3007311356020345938_n.jpg' },
      { id: 15, url: '/Img/Casa Prana/484870350_1172855817864540_209328310954994766_n.jpg' },
    ],
  },
  'casa-contemporanea': {
    title: 'Casa Setiembre',
    location: 'Mar de las Pampas',
    year: 2011,
    areaM2: 250,
    type: 'Casa Nueva',
    description:
      'Proyecto de vivienda contemporánea que combina minimalismo con funcionalidad. Diseñada para maximizar la iluminación natural y conectar los espacios interiores con la naturaleza circundante.',
    images: [
      { id: 1, url: '/Img/135_1_n.jpg' },
      { id: 2, url: '/Img/135_2_n.jpg' },
      { id: 3, url: '/Img/135_3_n.jpg' },
      { id: 4, url: '/Img/135_4_n.jpg' },
      { id: 5, url: '/Img/135_5_n.jpg' },
      { id: 6, url: '/Img/135_6_n.jpg' },
      { id: 7, url: '/Img/135_7_n.jpg' },
      { id: 8, url: '/Img/135_8_n.jpg' },
    ],
  },
  'casa-punto-de-encuentro': {
    title: 'Casa Punto de Encuentro',
    location: 'Mar Azul',
    year: 2011,
    areaM2: 180,
    type: 'Casa Nueva',
    description:
      'Casa diseñada como punto de encuentro familiar, con espacios amplios y luminosos que favorecen la convivencia. Arquitectura que integra funcionalidad y calidez en cada ambiente.',
    images: [
      { id: 1, url: '/Img/casa punto de encuentro/134_1_n.jpg' },
      { id: 2, url: '/Img/casa punto de encuentro/134_2_n.jpg' },
      { id: 3, url: '/Img/casa punto de encuentro/134_3_n.jpg' },
      { id: 4, url: '/Img/casa punto de encuentro/134_4_n.jpg' },
      { id: 5, url: '/Img/casa punto de encuentro/134_5_n.jpg' },
      { id: 6, url: '/Img/casa punto de encuentro/134_6_n.jpg' },
      { id: 7, url: '/Img/casa punto de encuentro/134_7_n.jpg' },
      { id: 8, url: '/Img/casa punto de encuentro/134_8_n.jpg' },
      { id: 9, url: '/Img/casa punto de encuentro/134_9_n.jpg' },
      { id: 10, url: '/Img/casa punto de encuentro/134_10_n.jpg' },
      { id: 11, url: '/Img/casa punto de encuentro/134_11_n.jpg' },
      { id: 12, url: '/Img/casa punto de encuentro/134_12_n.jpg' },
      { id: 13, url: '/Img/casa punto de encuentro/134_13_n.jpg' },
      { id: 14, url: '/Img/casa punto de encuentro/134_14_n.jpg' },
      { id: 15, url: '/Img/casa punto de encuentro/134_15_n.jpg' },
      { id: 16, url: '/Img/casa punto de encuentro/134_16_n.jpg' },
    ],
  },
  'casa-antu-pewen': {
    title: 'Casa Antü Pewen',
    location: 'Mar de las Pampas',
    year: 2023,
    areaM2: 73,
    type: 'Casa Nueva',
    description:
      'Casa ubicada en calle Victoria Ocampo y Los Álamos, Mar de las Pampas. Diseño compacto de 73m² que maximiza cada espacio con inteligencia y funcionalidad, creando ambientes cálidos y confortables.',
    images: [
      { id: 1, url: '/Img/casa Antü Pewen/86_1_n.jpg' },
      { id: 2, url: '/Img/casa Antü Pewen/86_2_n.jpg' },
      { id: 3, url: '/Img/casa Antü Pewen/86_3_n.jpg' },
      { id: 4, url: '/Img/casa Antü Pewen/86_4_n.jpg' },
      { id: 5, url: '/Img/casa Antü Pewen/86_5_n.jpg' },
      { id: 6, url: '/Img/casa Antü Pewen/86_6_n.jpg' },
      { id: 7, url: '/Img/casa Antü Pewen/86_7_n.jpg' },
      { id: 8, url: '/Img/casa Antü Pewen/86_8_n.jpg' },
    ],
  },
  'casa-myj': {
    title: 'Casa MYJ',
    location: 'Calle 29 entre Punta Indio y Pinamar, Las Gaviotas',
    year: 2021,
    areaM2: 200,
    type: 'Casa Nueva',
    description:
      'Casas "MYJ" - Años 2021/23 - Quiero agradecer a Moira y Jorge por haber confiado en el estudio y permitirme formar parte de su proyecto en sus 2 etapas. Un proyecto de 200m² que se desarrolló en dos fases, integrando funcionalidad y diseño en cada una de ellas.',
    images: [
      { id: 1, url: '/Img/MYJ CASA/484808763_1172723177877804_3048024819971311984_n.jpg' },
      { id: 2, url: '/Img/MYJ CASA/483525105_1172723334544455_4210904473919782640_n.jpg' },
      { id: 3, url: '/Img/MYJ CASA/484363946_1172723364544452_7088373701041411152_n.jpg' },
      { id: 4, url: '/Img/MYJ CASA/484477359_1172723301211125_1424490545758422684_n.jpg' },
      { id: 5, url: '/Img/MYJ CASA/484510268_1172723227877799_1248128023423725122_n.jpg' },
      { id: 6, url: '/Img/MYJ CASA/484536834_1172723287877793_2819175290749583865_n.jpg' },
      { id: 7, url: '/Img/MYJ CASA/484827948_1172723337877788_6728763792832102480_n.jpg' },
      { id: 8, url: '/Img/MYJ CASA/485011143_1172723354544453_1220525942186935040_n.jpg' },
      { id: 9, url: '/Img/MYJ CASA/485162528_1172723347877787_8094126104549725705_n.jpg' },
    ],
  },
  'casa-valeria-del-mar': {
    title: 'Casa Valeria del Mar',
    location: 'Valeria del Mar',
    year: 2023,
    areaM2: 0,
    type: 'Casa Nueva',
    description:
      'Casa ubicada en Valeria del Mar. Proyecto que integra diseño moderno con funcionalidad, creando espacios cómodos y luminosos.',
    images: [
      { id: 1, url: '/Img/CASA VALERIA DEL MAR/482319405_1168738581609597_7057043746754401797_n.jpg' },
      { id: 2, url: '/Img/CASA VALERIA DEL MAR/482343866_1168738568276265_2763599324554773080_n.jpg' },
      { id: 3, url: '/Img/CASA VALERIA DEL MAR/482346890_1168738178276304_1468394427503358268_n.jpg' },
      { id: 4, url: '/Img/CASA VALERIA DEL MAR/482346964_1168738594942929_8483549987584156709_n.jpg' },
      { id: 5, url: '/Img/CASA VALERIA DEL MAR/482347245_1168738584942930_8166121007085427824_n.jpg' },
      { id: 6, url: '/Img/CASA VALERIA DEL MAR/482349735_1168738624942926_5217480549732483992_n.jpg' },
      { id: 7, url: '/Img/CASA VALERIA DEL MAR/482355801_1168738604942928_5122639072105381952_n.jpg' },
      { id: 8, url: '/Img/CASA VALERIA DEL MAR/483066098_1168738591609596_8012256878162919677_n.jpg' },
      { id: 9, url: '/Img/CASA VALERIA DEL MAR/483101304_1168738561609599_2082166394020191889_n.jpg' },
      { id: 10, url: '/Img/CASA VALERIA DEL MAR/484328532_1168738574942931_9150571182056568209_n.jpg' },
    ],
  },
  'ampliacion-apart-la-morada-2024': {
    title: 'Ampliación Apart La Morada 2024',
    location: 'Villa Gesell',
    year: 2024,
    areaM2: 0,
    type: 'Ampliación',
    description:
      'Ampliación en apart "La Morada". Villa Gesell. Proyecto que expande los espacios del apartamento, integrando nuevos ambientes con funcionalidad y diseño contemporáneo.',
    images: [
      { id: 1, url: '/Img/AMPLIACION 1/480305640_1150518246764964_6917937509997425630_n.jpg' },
      { id: 2, url: '/Img/AMPLIACION 1/486572439_9405769739510200_6644308760058307745_n.jpg' },
      { id: 3, url: '/Img/AMPLIACION 1/486604996_9405769816176859_5923432399626459402_n.jpg' },
    ],
  },
  'casa-mario-y-sandra': {
    title: 'Casa Mario y Sandra',
    location: 'Villa Gesell',
    year: 2017,
    areaM2: 0,
    type: 'Casa Nueva',
    description:
      'Casa Mario y Sandra - Villa Gesell. Proyecto realizado en 2017.',
    images: [
      { id: 1, url: '/Img/Casa Mario y Sandra/513694989_23870599252600675_9197121366695295916_n.jpg' },
      { id: 2, url: '/Img/Casa Mario y Sandra/513829561_23870599142600686_3471959030320949497_n.jpg' },
      { id: 3, url: '/Img/Casa Mario y Sandra/513860758_23870598822600718_6691224047667927260_n.jpg' },
      { id: 4, url: '/Img/Casa Mario y Sandra/513904449_23870599049267362_8789316721563513728_n.jpg' },
      { id: 5, url: '/Img/Casa Mario y Sandra/513905596_23870599169267350_6379979232492336807_n.jpg' },
      { id: 6, url: '/Img/Casa Mario y Sandra/514011072_23870598875934046_5709045258535262562_n.jpg' },
      { id: 7, url: '/Img/Casa Mario y Sandra/514248751_23870599012600699_2380076487551201863_n.jpg' },
      { id: 8, url: '/Img/Casa Mario y Sandra/514252290_23870599285934005_6717031996074119310_n.jpg' },
      { id: 9, url: '/Img/Casa Mario y Sandra/514252778_23870599259267341_3311127005826555196_n.jpg' },
      { id: 10, url: '/Img/Casa Mario y Sandra/514310093_23870599265934007_1994630846168720107_n.jpg' },
      { id: 11, url: '/Img/Casa Mario y Sandra/514344614_23870599272600673_7388422812829587732_n.jpg' },
      { id: 12, url: '/Img/Casa Mario y Sandra/514349852_23870599255934008_2568341851186170662_n.jpg' },
      { id: 13, url: '/Img/Casa Mario y Sandra/514350945_23870599149267352_5625727739371310500_n.jpg' },
      { id: 14, url: '/Img/Casa Mario y Sandra/514399342_23870599275934006_6787219445960775467_n.jpg' },
      { id: 15, url: '/Img/Casa Mario y Sandra/514402216_23870599085934025_6668673700769891278_n.jpg' },
      { id: 16, url: '/Img/Casa Mario y Sandra/514410237_23870599132600687_5335176737456751847_n.jpg' },
      { id: 17, url: '/Img/Casa Mario y Sandra/514414006_23870599292600671_25066423790696481_n.jpg' },
      { id: 18, url: '/Img/Casa Mario y Sandra/514417597_23870598835934050_3763323217747048216_n.jpg' },
      { id: 19, url: '/Img/Casa Mario y Sandra/514420789_23870599015934032_2595026347217025311_n.jpg' },
    ],
  },
  'casa-lio': {
    title: 'Casa Lío',
    location: 'Costa Esmeralda',
    year: 2017,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Diseño estructural respetando el medano.',
    images: [
      { id: 1, url: '/Img/Diseño Estructural/medano.jpg' },
      { id: 2, url: '/Img/Diseño Estructural/503769391_10084828054937695_6073497003782480712_n.jpg' },
      { id: 3, url: '/Img/Diseño Estructural/504438129_10084828058271028_3256089486271079482_n.jpg' },
      { id: 4, url: '/Img/Diseño Estructural/509008394_10043956469024854_4995898781716276240_n.jpg' },
      { id: 5, url: '/Img/Diseño Estructural/509265171_10043956409024860_49988714296620522_n.jpg' },
      { id: 6, url: '/Img/Diseño Estructural/509331047_10043956032358231_7594337134284797114_n.jpg' },
      { id: 7, url: '/Img/Diseño Estructural/509366870_10043956219024879_3236378778789022541_n.jpg' },
      { id: 8, url: '/Img/Diseño Estructural/509605760_10045574748863026_8179233411789306507_n.jpg' },
      { id: 9, url: '/Img/Diseño Estructural/510173498_10043956222358212_1382502410009113241_n.jpg' },
      { id: 10, url: '/Img/Diseño Estructural/510574686_10045575058862995_2358731396180517134_n.jpg' },
      { id: 11, url: '/Img/Diseño Estructural/512700798_10085495558204278_8358188912598645422_n.jpg' },
      { id: 12, url: '/Img/Diseño Estructural/512841535_10084828164937684_7642115593096412519_n.jpg' },
      { id: 13, url: '/Img/Diseño Estructural/513150901_10084828068271027_2178580964258911095_n.jpg' },
      { id: 14, url: '/Img/Diseño Estructural/513548976_10084828128271021_8080884552044423314_n.jpg' },
      { id: 15, url: '/Img/Diseño Estructural/513673179_10084828061604361_133419555040468585_n.jpg' },
      { id: 16, url: '/Img/Diseño Estructural/513810959_10085495964870904_1721948115551615181_n.jpg' },
      { id: 17, url: '/Img/Diseño Estructural/513846211_10084828064937694_4130409923844968756_n.jpg' },
      { id: 18, url: '/Img/Diseño Estructural/513941928_10084828161604351_5294191494932215022_n.jpg' },
      { id: 19, url: '/Img/Diseño Estructural/514049057_10085495958204238_8993472798205934097_n.jpg' },
      { id: 20, url: '/Img/Diseño Estructural/514224798_10084828041604363_5515477908426760400_n.jpg' },
    ],
  },
  'obra-querandies': {
    title: 'Obra Querandíes',
    location: 'Mar de las Pampas',
    year: 2015,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto desarrollado en Mar de las Pampas que refleja un profundo respeto por el entorno natural y la biodiversidad costera. El diseño privilegia la integración armónica con el paisaje, utilizando materiales nobles que dialogan con la vegetación autóctona y preservan el carácter único de la zona.',
    images: [
      { id: 1, url: '/Img/Obra Querandíes/499412893_10040258819394619_7325452866614765516_n.jpg' },
      { id: 2, url: '/Img/Obra Querandíes/509803496_10053247868095714_6675195259480783319_n.jpg' },
      { id: 3, url: '/Img/Obra Querandíes/509998401_10053247634762404_7234813679057294141_n.jpg' },
      { id: 4, url: '/Img/Obra Querandíes/510210185_10052024404884727_2867282320334269362_n.jpg' },
      { id: 5, url: '/Img/Obra Querandíes/510453699_10053247811429053_8384195558994785324_n.jpg' },
      { id: 6, url: '/Img/Obra Querandíes/510615086_10052024684884699_5445763711168045076_n.jpg' },
      { id: 7, url: '/Img/Obra Querandíes/510954191_10049576701796164_4915269038176049851_n.jpg' },
    ],
  },
  'casa-coquimbo': {
    title: 'Casa Coquimbo',
    location: 'Mar de las Pampas',
    year: 2015,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda situada en Mar de las Pampas que abraza la filosofía de construcción sustentable. El proyecto valora la diversidad del ecosistema costero, integrando espacios que permiten disfrutar del entorno natural sin comprometer su preservación. Cada detalle arquitectónico busca minimizar el impacto ambiental.',
    images: [
      { id: 1, url: '/Img/Coquimbo/507953828_10016884045065430_3279785280575583673_n.jpg' },
      { id: 2, url: '/Img/Coquimbo/508422522_10016884365065398_4985382479746409642_n.jpg' },
      { id: 3, url: '/Img/Coquimbo/508567707_10016884068398761_8983659515154579116_n.jpg' },
      { id: 4, url: '/Img/Coquimbo/508624860_10016884361732065_3068923731364495160_n.jpg' },
      { id: 5, url: '/Img/Coquimbo/508694397_10016884061732095_6425823962507194869_n.jpg' },
      { id: 6, url: '/Img/Coquimbo/508852605_10016883935065441_7330469174813471138_n.jpg' },
      { id: 7, url: '/Img/Coquimbo/509269797_10016884358398732_5831894891400343582_n.jpg' },
      { id: 8, url: '/Img/Coquimbo/509430169_10016884065065428_6534502208139841010_n.jpg' },
    ],
  },
  'obra-albornoz': {
    title: 'Avance de obra Albornoz',
    location: 'Mar de las Pampas',
    year: 2014,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto en desarrollo que demuestra nuestro compromiso con la arquitectura respetuosa del entorno. El diseño contempla la topografía natural del terreno y la vegetación existente, buscando generar el mínimo impacto sobre el paisaje costero mientras se crean espacios habitables confortables y luminosos.',
    images: [
      { id: 1, url: '/Img/Obra Albornoz/506478169_10007094252711076_3636636995094657512_n.jpg' },
      { id: 2, url: '/Img/Obra Albornoz/507987347_10007094229377745_7290031711933089123_n.jpg' },
      { id: 3, url: '/Img/Obra Albornoz/508013481_10007094269377741_3437213111293742130_n.jpg' },
    ],
  },
  'casa-selva': {
    title: 'Casa Selva — Reforma Integral (Morado / Rojo)',
    location: 'Mar Azul',
    year: 2011,
    areaM2: 0,
    type: 'Reforma',
    description: 'Con el incansable aporte de MMO. Adrián Godoy y la inestimable colaboración de mi amigo-hermano ARQ. Esteban Turon.',
    images: [
      { id: 1, url: '/Img/Casa Selva Mar Azul/502531338_9891605647593271_3640422129201881606_n.jpg' },
      { id: 2, url: '/Img/Casa Selva Mar Azul/502545662_9889888391098330_6269839240773563141_n.jpg' },
      { id: 3, url: '/Img/Casa Selva Mar Azul/502551165_9891605897593246_3722406090286699113_n.jpg' },
      { id: 4, url: '/Img/Casa Selva Mar Azul/502580918_9891605830926586_7633491444760345434_n.jpg' },
      { id: 5, url: '/Img/Casa Selva Mar Azul/502616590_9891605620926607_8428512094599234922_n.jpg' },
      { id: 6, url: '/Img/Casa Selva Mar Azul/502627555_9889888504431652_7760311336133526400_n.jpg' },
      { id: 7, url: '/Img/Casa Selva Mar Azul/502682526_9891605874259915_7783399718679292208_n.jpg' },
      { id: 8, url: '/Img/Casa Selva Mar Azul/502689304_9891605607593275_2854406193191092339_n.jpg' },
      { id: 9, url: '/Img/Casa Selva Mar Azul/502727107_9891605644259938_2402160508805471425_n.jpg' },
      { id: 10, url: '/Img/Casa Selva Mar Azul/502849161_9891605944259908_6427855536512981060_n.jpg' },
      { id: 11, url: '/Img/Casa Selva Mar Azul/502897073_9891605637593272_2272482624672481923_n.jpg' },
      { id: 12, url: '/Img/Casa Selva Mar Azul/502898573_9891605627593273_4285436092577715035_n.jpg' },
      { id: 13, url: '/Img/Casa Selva Mar Azul/502926716_9891605640926605_3558871246037409836_n.jpg' },
      { id: 14, url: '/Img/Casa Selva Mar Azul/502941295_9891605634259939_1996756719956515938_n.jpg' },
      { id: 15, url: '/Img/Casa Selva Mar Azul/503121587_9891605847593251_2607980040178393558_n.jpg' },
      { id: 16, url: '/Img/Casa Selva Mar Azul/503228132_9891605884259914_3630154152110307961_n.jpg' },
      { id: 17, url: '/Img/Casa Selva Mar Azul/503414868_9889888047765031_2222542482059722752_n.jpg' },
      { id: 18, url: '/Img/Casa Selva Mar Azul/508564312_10006073559479812_1088309403996512804_n.jpg' },
      { id: 19, url: '/Img/Casa Selva Mar Azul/508783147_10006073402813161_4469544309230141916_n.jpg' },
    ],
  },
  'casa-cupal': {
    title: 'Casa Cupal Avance de obra',
    location: 'Mar de las Pampas',
    year: 2014,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Obra en construcción que ejemplifica nuestra visión de arquitectura en armonía con el ambiente costero. El proyecto respeta los recursos naturales del sitio, priorizando la conservación de especies vegetales nativas y la integración con el entorno. Los materiales seleccionados reflejan un compromiso con la sostenibilidad.',
    images: [
      { id: 1, url: '/Img/Casa Cupal Avance de obra/506358632_9991798564240645_1396240070819755580_n.jpg' },
      { id: 2, url: '/Img/Casa Cupal Avance de obra/506445458_9991798540907314_2447812615449528923_n.jpg' },
      { id: 3, url: '/Img/Casa Cupal Avance de obra/506453955_9991798240907344_2344365626984688792_n.jpg' },
      { id: 4, url: '/Img/Casa Cupal Avance de obra/506483247_9991798484240653_393612243510967791_n.jpg' },
      { id: 5, url: '/Img/Casa Cupal Avance de obra/507490912_9991798467573988_4281371012657276207_n.jpg' },
      { id: 6, url: '/Img/Casa Cupal Avance de obra/507991092_9991798570907311_1620313064227384514_n.jpg' },
    ],
  },
  'casa-pivamar': {
    title: 'Casa Pivamar',
    location: 'Mar Azul',
    year: 2012,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda en Mar Azul que celebra la relación entre arquitectura y naturaleza. El diseño valora la diversidad del paisaje costero, creando espacios que se integran respetuosamente con el entorno. La propuesta arquitectónica prioriza la eficiencia energética y el uso consciente de recursos naturales.',
    images: [
      { id: 1, url: '/Img/Casa pivamar/504805871_9929931983760637_3886133040819464171_n.jpg' },
      { id: 2, url: '/Img/Casa pivamar/504778779_9929931957093973_7891984640431821247_n.jpg' },
      { id: 3, url: '/Img/Casa pivamar/504772501_9929932080427294_231672592886522091_n.jpg' },
      { id: 4, url: '/Img/Casa pivamar/504716483_9929931977093971_2645939790087031896_n.jpg' },
      { id: 5, url: '/Img/Casa pivamar/504710327_9929931990427303_112227257499681932_n.jpg' },
      { id: 6, url: '/Img/Casa pivamar/504536121_9929932053760630_4272594163241988015_n.jpg' },
      { id: 7, url: '/Img/Casa pivamar/504471328_9929932020427300_841133113347677897_n.jpg' },
      { id: 8, url: '/Img/Casa pivamar/504195456_9929931873760648_4158675259126234276_n.jpg' },
      { id: 9, url: '/Img/Casa pivamar/504186444_9929931953760640_3149841017594076113_n.jpg' },
      { id: 10, url: '/Img/Casa pivamar/504077778_9929932010427301_6414676473364175027_n.jpg' },
      { id: 11, url: '/Img/Casa pivamar/504021801_9929932140427288_4259357440769551492_n.jpg' },
      { id: 12, url: '/Img/Casa pivamar/503833160_9929931973760638_6168125656274474877_n.jpg' },
      { id: 13, url: '/Img/Casa pivamar/503812937_9929932087093960_2710895894535486399_n.jpg' },
      { id: 14, url: '/Img/Casa pivamar/503802430_9929932187093950_1142163811311360462_n.jpg' },
      { id: 15, url: '/Img/Casa pivamar/503769687_9929932127093956_1163746788227793712_n.jpg' },
      { id: 16, url: '/Img/Casa pivamar/503762266_9929932117093957_2534083633407451957_n.jpg' },
      { id: 17, url: '/Img/Casa pivamar/503644094_9929932013760634_831498924429852433_n.jpg' },
      { id: 18, url: '/Img/Casa pivamar/503603210_9929932033760632_5718558984264360413_n.jpg' },
      { id: 19, url: '/Img/Casa pivamar/503599856_9929931907093978_3794055059266843928_n.jpg' },
      { id: 20, url: '/Img/Casa pivamar/503507853_9929931980427304_2399727787774718073_n.jpg' },
      { id: 21, url: '/Img/Casa pivamar/503486314_9929931987093970_7962557262661407606_n.jpg' },
      { id: 22, url: '/Img/Casa pivamar/503435921_9929932030427299_1325115087142394623_n.jpg' },
    ],
  },
  'casa-ramos': {
    title: 'Casa Ramos',
    location: 'Mar de las Pampas',
    year: 2011,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto que manifiesta un profundo respeto por el ecosistema costero de Mar de las Pampas. La arquitectura dialoga con el entorno natural, preservando la vegetación autóctona y fomentando la biodiversidad. Cada decisión de diseño busca honrar la identidad del lugar y su riqueza ambiental.',
    images: [
      { id: 1, url: '/Img/casa ramos/501395915_9899424366811399_3932874044863809726_n.jpg' },
      { id: 2, url: '/Img/casa ramos/502538850_9899423876811448_7044992491494916158_n.jpg' },
      { id: 3, url: '/Img/casa ramos/502566598_9899424140144755_8654498115596516598_n.jpg' },
      { id: 4, url: '/Img/casa ramos/502578521_9899424343478068_6726194001068425417_n.jpg' },
      { id: 5, url: '/Img/casa ramos/503102805_9899424073478095_6428570123420478033_n.jpg' },
      { id: 6, url: '/Img/casa ramos/503219153_9899424350144734_9043887076609846526_n.jpg' },
      { id: 7, url: '/Img/casa ramos/503264939_9899424360144733_7252894838919524260_n.jpg' },
      { id: 8, url: '/Img/casa ramos/503264989_9899424116811424_7279221714061446487_n.jpg' },
      { id: 9, url: '/Img/casa ramos/503266887_9899423873478115_1917093527159530024_n.jpg' },
      { id: 10, url: '/Img/casa ramos/503311241_9899424370144732_4191485604947606089_n.jpg' },
      { id: 11, url: '/Img/casa ramos/503334412_9899423886811447_6391638570470476949_n.jpg' },
      { id: 12, url: '/Img/casa ramos/503370975_9899424090144760_2792857389293573555_n.jpg' },
      { id: 13, url: '/Img/casa ramos/503375009_9899423880144781_785626327913636219_n.jpg' },
      { id: 14, url: '/Img/casa ramos/503385559_9899424133478089_5646799351081336977_n.jpg' },
      { id: 15, url: '/Img/casa ramos/503388441_9899423890144780_32539878250290761_n.jpg' },
      { id: 16, url: '/Img/casa ramos/503399911_9899424113478091_228314399870884854_n.jpg' },
      { id: 17, url: '/Img/casa ramos/503446379_9899424063478096_6262251457290815743_n.jpg' },
      { id: 18, url: '/Img/casa ramos/503501176_9899424326811403_7185889256436361913_n.jpg' },
      { id: 19, url: '/Img/casa ramos/503502113_9899424100144759_365758730719324684_n.jpg' },
      { id: 20, url: '/Img/casa ramos/503537711_9899424143478088_6353511074295905850_n.jpg' },
      { id: 21, url: '/Img/casa ramos/503561852_9899424103478092_6840396891934977139_n.jpg' },
      { id: 22, url: '/Img/casa ramos/503609375_9899424220144747_7074841396988185740_n.jpg' },
      { id: 23, url: '/Img/casa ramos/503609455_9899424130144756_8616054395435061385_n.jpg' },
      { id: 24, url: '/Img/casa ramos/503634735_9899424123478090_1373361629901733041_n.jpg' },
    ],
  },
  'casa-cambelia': {
    title: 'Casa Cambelia',
    location: 'Mar de las Pampas',
    year: 2012,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda que refleja nuestro compromiso con la arquitectura sustentable y respetuosa del medio ambiente. El proyecto integra espacios habitables con el paisaje natural, valorando la diversidad de flora y fauna local. El diseño promueve la convivencia armónica entre el habitar humano y la naturaleza costera.',
    images: [
      { id: 1, url: '/Img/casa cambelia de las pampas/502530865_9891582014262301_8795232495285941237_n.jpg' },
      { id: 2, url: '/Img/casa cambelia de las pampas/502583378_9891581964262306_214181819010981130_n.jpg' },
      { id: 3, url: '/Img/casa cambelia de las pampas/502711643_9891581947595641_1258488929364465951_n.jpg' },
      { id: 4, url: '/Img/casa cambelia de las pampas/502715967_9891582047595631_2523281601592459966_n.jpg' },
      { id: 5, url: '/Img/casa cambelia de las pampas/502751742_9891581957595640_3426300573670113797_n.jpg' },
      { id: 6, url: '/Img/casa cambelia de las pampas/502909289_9891581627595673_6465518066874673587_n.jpg' },
      { id: 7, url: '/Img/casa cambelia de las pampas/502935925_9891581917595644_3478595881408943274_n.jpg' },
      { id: 8, url: '/Img/casa cambelia de las pampas/502936774_9891581760928993_7769742720240858794_n.jpg' },
      { id: 9, url: '/Img/casa cambelia de las pampas/503152391_9891581954262307_7059465186719371092_n.jpg' },
      { id: 10, url: '/Img/casa cambelia de las pampas/503169043_9891581724262330_8040557389994704370_n.jpg' },
      { id: 11, url: '/Img/casa cambelia de las pampas/503175424_9891581580929011_3083922505489072662_n.jpg' },
      { id: 12, url: '/Img/casa cambelia de las pampas/503285592_9891582007595635_4972978010455013413_n.jpg' },
      { id: 13, url: '/Img/casa cambelia de las pampas/503360956_9891583870928782_1921290946852003219_n.jpg' },
      { id: 14, url: '/Img/casa cambelia de las pampas/503475456_9891581997595636_5472445733687379906_n.jpg' },
      { id: 15, url: '/Img/casa cambelia de las pampas/503488160_9891582000928969_3087875697935790875_n.jpg' },
    ],
  },
  'casa-kawinkelen': {
    title: 'Casa Kawinkelen',
    location: 'Mar de las Pampas',
    year: 2009,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto pionero que establece nuestros principios de diseño respetuoso con el entorno costero. La arquitectura se inserta delicadamente en el paisaje, preservando las características naturales del sitio. El uso de materiales locales y técnicas constructivas conscientes minimiza el impacto sobre la biodiversidad circundante.',
    images: [
      { id: 1, url: '/Img/casa Kawinkelen pampas 2009/502573474_9891582017595634_38161502935766851_n.jpg' },
      { id: 2, url: '/Img/casa Kawinkelen pampas 2009/502583378_9891581597595676_941939936095740457_n.jpg' },
      { id: 3, url: '/Img/casa Kawinkelen pampas 2009/502600471_9891581820928987_6936781749913138712_n.jpg' },
      { id: 4, url: '/Img/casa Kawinkelen pampas 2009/502624904_9891581827595653_6975117798969994923_n.jpg' },
      { id: 5, url: '/Img/casa Kawinkelen pampas 2009/502626974_9891581594262343_2728536988084551139_n.jpg' },
      { id: 6, url: '/Img/casa Kawinkelen pampas 2009/502634773_9891582040928965_1517061651957539265_n.jpg' },
      { id: 7, url: '/Img/casa Kawinkelen pampas 2009/502690077_9891581810928988_6567724374155489016_n.jpg' },
      { id: 8, url: '/Img/casa Kawinkelen pampas 2009/502708833_9891581584262344_2980185319264311900_n.jpg' },
      { id: 9, url: '/Img/casa Kawinkelen pampas 2009/502714022_9891581587595677_2190045958813673914_n.jpg' },
      { id: 10, url: '/Img/casa Kawinkelen pampas 2009/502720492_9891582020928967_8721836573781703641_n.jpg' },
      { id: 11, url: '/Img/casa Kawinkelen pampas 2009/502736363_9891581794262323_3508797666571896433_n.jpg' },
      { id: 12, url: '/Img/casa Kawinkelen pampas 2009/502762227_9891581990928970_7713977385642770534_n.jpg' },
      { id: 13, url: '/Img/casa Kawinkelen pampas 2009/502843573_9891581984262304_2029150753009256549_n.jpg' },
      { id: 14, url: '/Img/casa Kawinkelen pampas 2009/502900438_9891581590929010_6184808551672782744_n.jpg' },
      { id: 15, url: '/Img/casa Kawinkelen pampas 2009/502908360_9891581644262338_9219397075045869785_n.jpg' },
      { id: 16, url: '/Img/casa Kawinkelen pampas 2009/502908466_9891581637595672_8571127214383818805_n.jpg' },
      { id: 17, url: '/Img/casa Kawinkelen pampas 2009/503437487_9891582050928964_3038162805910000891_n.jpg' },
    ],
  },
  'casa-pura-vida': {
    title: 'Casa Pura Vida',
    location: 'Las Gaviotas',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda en Las Gaviotas que encarna la filosofía de vida en armonía con la naturaleza. El diseño celebra la diversidad del ecosistema local, integrando espacios que invitan a la conexión con el entorno. La propuesta arquitectónica valora la simplicidad y el respeto por los recursos naturales del sitio.',
    images: [
      { id: 1, url: '/Img/casa pura vida las gaviotas 2010/502569135_9891563017597534_660766915269396761_n.jpg' },
      { id: 2, url: '/Img/casa pura vida las gaviotas 2010/502574225_9891563160930853_7723209573636437954_n.jpg' },
      { id: 3, url: '/Img/casa pura vida las gaviotas 2010/502576058_9891563080930861_1202481579761846835_n.jpg' },
      { id: 4, url: '/Img/casa pura vida las gaviotas 2010/502577584_9891562860930883_9029389947625454899_n.jpg' },
      { id: 5, url: '/Img/casa pura vida las gaviotas 2010/502609289_9891563040930865_5982313500552192739_n.jpg' },
      { id: 6, url: '/Img/casa pura vida las gaviotas 2010/502620789_9891563060930863_7444809823359928966_n.jpg' },
      { id: 7, url: '/Img/casa pura vida las gaviotas 2010/502687038_9891563117597524_772410153324322315_n.jpg' },
      { id: 8, url: '/Img/casa pura vida las gaviotas 2010/502936774_9891563004264202_2911662353071432423_n.jpg' },
      { id: 9, url: '/Img/casa pura vida las gaviotas 2010/502961106_9891563030930866_6642515461390982306_n.jpg' },
      { id: 10, url: '/Img/casa pura vida las gaviotas 2010/503351312_9891562867597549_7174850828291392688_n.jpg' },
      { id: 11, url: '/Img/casa pura vida las gaviotas 2010/503473332_9891563084264194_682778741607326661_n.jpg' },
      { id: 12, url: '/Img/casa pura vida las gaviotas 2010/503535772_9891562914264211_6854152239039769127_n.jpg' },
    ],
  },
  'casa-valhala': {
    title: 'Casa Valhala',
    location: 'Mar de las Pampas',
    year: 2008,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto emblemático que marca el inicio de nuestra trayectoria en arquitectura costera sustentable. Casa Valhala representa nuestro compromiso con el respeto por el entorno natural de Mar de las Pampas, integrándose delicadamente con la topografía y vegetación nativa. El diseño prioriza la preservación del ecosistema local mientras crea espacios habitables que celebran la conexión con la naturaleza.',
    images: [
      { id: 1, url: '/Img/Casa Valhala Mar De las pampas 2008/502414086_9889934141093755_5153663509568235286_n.jpg' },
      { id: 2, url: '/Img/Casa Valhala Mar De las pampas 2008/502414802_9889934631093706_1933468796330423200_n.jpg' },
      { id: 3, url: '/Img/Casa Valhala Mar De las pampas 2008/502495722_9889934357760400_6855515788131928852_n.jpg' },
      { id: 4, url: '/Img/Casa Valhala Mar De las pampas 2008/502575214_9889934157760420_5901232867151283298_n.jpg' },
      { id: 5, url: '/Img/Casa Valhala Mar De las pampas 2008/502912380_9889934347760401_8386192261114558842_n.jpg' },
      { id: 6, url: '/Img/Casa Valhala Mar De las pampas 2008/502939624_9889934517760384_7950475616669698636_n.jpg' },
      { id: 7, url: '/Img/Casa Valhala Mar De las pampas 2008/503152090_9889934424427060_8716693850188435270_n.jpg' },
    ],
  },
  'casa-spadescansar': {
    title: 'Casa Spadescansar',
    location: 'Mar Azul',
    year: 2008,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Refugio diseñado especialmente para el descanso y la desconexión, donde cada espacio invita a la calma y el bienestar. Esta casa en Mar Azul es ideal para quienes buscan un retiro tranquilo rodeado de naturaleza, ofreciendo ambientes luminosos y confortables que promueven la relajación. Su diseño contemplativo respeta el entorno natural y crea una atmósfera serena perfecta para recargar energías y disfrutar de la paz que brinda el bosque costero.',
    images: [
      { id: 1, url: '/Img/casa spadescansar/502578522_9889903101096859_6826749419979587134_n.jpg' },
      { id: 2, url: '/Img/casa spadescansar/502739074_9889903414430161_5027266755736015152_n.jpg' },
      { id: 3, url: '/Img/casa spadescansar/502741104_9889903431096826_8132460949571358123_n.jpg' },
      { id: 4, url: '/Img/casa spadescansar/502817100_9889903234430179_3381392068512753395_n.jpg' },
      { id: 5, url: '/Img/casa spadescansar/502845270_9889903367763499_304124565100187251_n.jpg' },
      { id: 6, url: '/Img/casa spadescansar/502957848_9889903111096858_8478929250221908039_n.jpg' },
      { id: 7, url: '/Img/casa spadescansar/503039503_9889903191096850_7358892528072695092_n.jpg' },
      { id: 8, url: '/Img/casa spadescansar/503269231_9889903281096841_550395582845174241_n.jpg' },
      { id: 9, url: '/Img/casa spadescansar/503270074_9889903054430197_4701093913418476217_n.jpg' },
      { id: 10, url: '/Img/casa spadescansar/503411503_9889903507763485_4049948905736481431_n.jpg' },
    ],
  },
  'casa-el-rayo-verde': {
    title: 'Casa El Rayo Verde',
    location: 'Mar Azul',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda unifamiliar que manifiesta un profundo respeto por el ecosistema de Mar Azul. El proyecto se integra armoniosamente con la topografía natural del terreno, preservando la vegetación nativa y priorizando la iluminación natural en todos sus espacios. Construida con materiales nobles que envejecen con dignidad, esta casa representa un enfoque consciente hacia la arquitectura sustentable en entornos costeros.',
    images: [
      { id: 1, url: '/Img/casa el rayo verde mar azul 2010/502415100_9889903221096847_4837914340917081687_n.jpg' },
      { id: 2, url: '/Img/casa el rayo verde mar azul 2010/502481172_9889903047763531_2773626561640126449_n.jpg' },
      { id: 3, url: '/Img/casa el rayo verde mar azul 2010/502716418_9889903314430171_117974738667930358_n.jpg' },
      { id: 4, url: '/Img/casa el rayo verde mar azul 2010/502721966_9889903494430153_4969916789250180462_n.jpg' },
      { id: 5, url: '/Img/casa el rayo verde mar azul 2010/502728300_9889903417763494_6031861469713938695_n.jpg' },
      { id: 6, url: '/Img/casa el rayo verde mar azul 2010/502776640_9889903064430196_3505937402984100215_n.jpg' },
      { id: 7, url: '/Img/casa el rayo verde mar azul 2010/502778792_9889903081096861_8950441909509148276_n.jpg' },
      { id: 8, url: '/Img/casa el rayo verde mar azul 2010/502950555_9889903107763525_5206573139745525335_n.jpg' },
      { id: 9, url: '/Img/casa el rayo verde mar azul 2010/503137824_9889903354430167_214258055766883319_n.jpg' },
      { id: 10, url: '/Img/casa el rayo verde mar azul 2010/503144701_9889903501096819_7423311589169437296_n.jpg' },
      { id: 11, url: '/Img/casa el rayo verde mar azul 2010/503349208_9889903337763502_1964271396315227371_n.jpg' },
      { id: 12, url: '/Img/casa el rayo verde mar azul 2010/503354864_9889903071096862_857143035077475439_n.jpg' },
      { id: 13, url: '/Img/casa el rayo verde mar azul 2010/503414868_9889903257763510_7203146053950105267_n.jpg' },
    ],
  },
  'casa-nuestro-lugar': {
    title: 'Casa Nuestro Lugar',
    location: 'Mar de las Pampas',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda que refleja la idea de pertenencia y arraigo al paisaje de Mar de las Pampas. Este proyecto busca crear un refugio donde la arquitectura se funde con el entorno natural, respetando la vegetación autóctona y aprovechando las visuales del bosque costero. Los espacios interiores están pensados para generar calidez y conexión con la naturaleza, utilizando materiales nobles que dialogan con el contexto y promueven un habitar consciente y sustentable.',
    images: [
      { id: 1, url: '/Img/nuestro lugar casa mar de las pampas 2010/502415400_9889896684430834_3474395492302738584_n.jpg' },
      { id: 2, url: '/Img/nuestro lugar casa mar de las pampas 2010/502499300_9889896847764151_2123773860664666491_n.jpg' },
      { id: 3, url: '/Img/nuestro lugar casa mar de las pampas 2010/502561179_9889896674430835_5946479624883619362_n.jpg' },
      { id: 4, url: '/Img/nuestro lugar casa mar de las pampas 2010/502690577_9889896671097502_2033419148426054757_n.jpg' },
      { id: 5, url: '/Img/nuestro lugar casa mar de las pampas 2010/502753434_9889896911097478_362447369614556898_n.jpg' },
      { id: 6, url: '/Img/nuestro lugar casa mar de las pampas 2010/502771417_9889896881097481_1433192453931884442_n.jpg' },
      { id: 7, url: '/Img/nuestro lugar casa mar de las pampas 2010/502959448_9889896761097493_7839052830004733641_n.jpg' },
      { id: 8, url: '/Img/nuestro lugar casa mar de las pampas 2010/503352096_9889896681097501_8666904549394802275_n.jpg' },
    ],
  },
  'casa-morena-2': {
    title: 'Casa Morena 2',
    location: 'Mar Azul',
    year: 2012,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto que combina funcionalidad y estética en el corazón de Mar Azul. Esta vivienda se caracteriza por su integración respetuosa con el entorno boscoso, priorizando la entrada de luz natural y las vistas hacia la vegetación circundante. El diseño contempla materiales durables y de bajo impacto ambiental, creando espacios cálidos que promueven una vida en armonía con la naturaleza costera.',
    images: [
      { id: 1, url: '/Img/casa morena 2  mar azul año 2012/502498710_9889896704430832_3924326043657321178_n.jpg' },
      { id: 2, url: '/Img/casa morena 2  mar azul año 2012/502543753_9889896907764145_2735358782969004144_n.jpg' },
      { id: 3, url: '/Img/casa morena 2  mar azul año 2012/502630372_9889896677764168_1964747562036767165_n.jpg' },
      { id: 4, url: '/Img/casa morena 2  mar azul año 2012/502828744_9889896691097500_4996062880773470851_n.jpg' },
    ],
  },
  'casa-alanis-ii': {
    title: 'Casa Alanis II',
    location: 'Mar Azul',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda que representa una evolución en nuestro enfoque hacia la arquitectura sustentable en Mar Azul. El proyecto se integra de manera sensible con el paisaje natural, respetando la topografía y la vegetación existente. Los espacios fueron concebidos para maximizar la iluminación natural y las vistas al bosque, mientras los materiales seleccionados reflejan un compromiso con la durabilidad y el bajo impacto ambiental, creando un hogar en completa armonía con su entorno.',
    images: [
      { id: 1, url: '/Img/Alanis II 2010/500461544_24054218430848814_1390625280296995726_n.jpg' },
      { id: 2, url: '/Img/Alanis II 2010/500516883_24054216404182350_4970377870484824193_n.jpg' },
      { id: 3, url: '/Img/Alanis II 2010/500559635_24054218354182155_3519463572226993462_n.jpg' },
      { id: 4, url: '/Img/Alanis II 2010/500567504_24054216477515676_2641827140252769037_n.jpg' },
      { id: 5, url: '/Img/Alanis II 2010/500567504_24054218060848851_4746903709337253815_n.jpg' },
      { id: 6, url: '/Img/Alanis II 2010/500578425_24054218084182182_2885376260406677233_n.jpg' },
      { id: 7, url: '/Img/Alanis II 2010/500579763_24054218040848853_654823342976238694_n.jpg' },
      { id: 8, url: '/Img/Alanis II 2010/500579763_24054218220848835_2621091964765753020_n.jpg' },
      { id: 9, url: '/Img/Alanis II 2010/500674234_24054218230848834_6317346670246221153_n.jpg' },
      { id: 10, url: '/Img/Alanis II 2010/500749776_24054218194182171_7082814765847488954_n.jpg' },
      { id: 11, url: '/Img/Alanis II 2010/500759420_24054216484182342_5521005041707002703_n.jpg' },
      { id: 12, url: '/Img/Alanis II 2010/500781372_24054218437515480_3210441838524737439_n.jpg' },
      { id: 13, url: '/Img/Alanis II 2010/500823690_24054218467515477_1737427806948246527_n.jpg' },
      { id: 14, url: '/Img/Alanis II 2010/501131188_24054216154182375_3717035917899018083_n.jpg' },
      { id: 15, url: '/Img/Alanis II 2010/501217577_24054216480849009_1543824159069230700_n.jpg' },
      { id: 16, url: '/Img/Alanis II 2010/501275223_24054218050848852_5660237176554791602_n.jpg' },
      { id: 17, url: '/Img/Alanis II 2010/501376897_24054218224182168_4365031867936684387_n.jpg' },
      { id: 18, url: '/Img/Alanis II 2010/501483971_24054216384182352_6469865690990842180_n.jpg' },
    ],
  },
  'casa-alanis-1': {
    title: 'Casa Alanis 1',
    location: 'Mar Azul',
    year: 2008,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto pionero que marca el inicio de nuestra colaboración en Mar Azul. Esta vivienda refleja un enfoque temprano hacia la arquitectura que respeta el entorno boscoso costero, integrando espacios luminosos con vistas privilegiadas hacia la vegetación nativa. El diseño contempla materiales de calidad que envejecen con dignidad, estableciendo las bases de nuestra filosofía de construir en armonía con el paisaje natural.',
    images: [
      { id: 1, url: '/Img/alanis 1 2008 mar azul/494516322_23913021134968545_668304765632062613_n.jpg' },
      { id: 2, url: '/Img/alanis 1 2008 mar azul/494540423_23913021164968542_2026493172286637485_n.jpg' },
      { id: 3, url: '/Img/alanis 1 2008 mar azul/494647965_23913021124968546_258575614179212999_n.jpg' },
      { id: 4, url: '/Img/alanis 1 2008 mar azul/494975277_23913021131635212_3626108547111192174_n.jpg' },
      { id: 5, url: '/Img/alanis 1 2008 mar azul/495193082_23913021271635198_7210610072333362551_n.jpg' },
      { id: 6, url: '/Img/alanis 1 2008 mar azul/495434578_23913021268301865_8607419324227590363_n.jpg' },
      { id: 7, url: '/Img/alanis 1 2008 mar azul/495476425_23913021111635214_3765501192839724819_n.jpg' },
      { id: 8, url: '/Img/alanis 1 2008 mar azul/495485846_23913021151635210_3676364966377022715_n.jpg' },
      { id: 9, url: '/Img/alanis 1 2008 mar azul/495587111_23913021148301877_7051344871650209151_n.jpg' },
      { id: 10, url: '/Img/alanis 1 2008 mar azul/495623312_23913021154968543_980729889607592896_n.jpg' },
      { id: 11, url: '/Img/alanis 1 2008 mar azul/495843113_23913021121635213_5069534160969786216_n.jpg' },
      { id: 12, url: '/Img/alanis 1 2008 mar azul/495937299_23913021144968544_8382327439318689413_n.jpg' },
      { id: 13, url: '/Img/alanis 1 2008 mar azul/496092444_23913021141635211_6677740293757873774_n.jpg' },
      { id: 14, url: '/Img/alanis 1 2008 mar azul/496156778_23913021178301874_2152520376328060323_n.jpg' },
    ],
  },
  'costa-gaviotas-cabanas': {
    title: 'Costa Gaviotas Cabañas',
    location: 'Las Gaviotas',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Conjunto de cabañas diseñadas para integrarse con el entorno natural de Las Gaviotas. El proyecto busca crear espacios de descanso que respetan la biodiversidad local, utilizando materiales nobles y técnicas constructivas sustentables. Cada cabaña fue pensada para maximizar la conexión con la naturaleza circundante, ofreciendo vistas privilegiadas y una experiencia de habitar en armonía con el paisaje costero.',
    images: [
      { id: 1, url: '/Img/costa gaviotas cabañas/513076474_10239468957888120_5624676038317006149_n.jpg' },
      { id: 2, url: '/Img/costa gaviotas cabañas/513175485_10239468957728116_7469273170172722864_n.jpg' },
      { id: 3, url: '/Img/costa gaviotas cabañas/513222114_10239468957848119_6434791418943339397_n.jpg' },
      { id: 4, url: '/Img/costa gaviotas cabañas/513368009_10239468958728141_4833533154429687656_n.jpg' },
      { id: 5, url: '/Img/costa gaviotas cabañas/513479808_10239468957408108_8190936639040436662_n.jpg' },
      { id: 6, url: '/Img/costa gaviotas cabañas/513952506_10239468959008148_1244701040700780403_n.jpg' },
      { id: 7, url: '/Img/costa gaviotas cabañas/514070291_10239468957808118_5812200637956387552_n.jpg' },
      { id: 8, url: '/Img/costa gaviotas cabañas/514199695_10239468958848144_1119095585121479280_n.jpg' },
      { id: 9, url: '/Img/costa gaviotas cabañas/514254947_10239468959168152_2170029083779172315_n.jpg' },
      { id: 10, url: '/Img/costa gaviotas cabañas/514264697_10239468958408133_8258747183358229303_n.jpg' },
      { id: 11, url: '/Img/costa gaviotas cabañas/514370987_10239468962168227_7497374982510223315_n.jpg' },
      { id: 12, url: '/Img/costa gaviotas cabañas/514379862_10239468959208153_698561212971624643_n.jpg' },
      { id: 13, url: '/Img/costa gaviotas cabañas/514395613_10239468958648139_2786275739089468843_n.jpg' },
      { id: 14, url: '/Img/costa gaviotas cabañas/514397575_10239468957568112_5013059624053825550_n.jpg' },
    ],
  },
  'casa-mis-afectos': {
    title: 'Casa Mis Afectos',
    location: 'Mar de las Pampas',
    year: 2008,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda que refleja la calidez y el vínculo emocional con el lugar. Este proyecto en Mar de las Pampas busca crear espacios íntimos y acogedores que celebran la conexión con el entorno natural. El diseño respeta la vegetación autóctona y la topografía del terreno, utilizando materiales nobles que envejecen con dignidad y promueven una arquitectura sustentable en armonía con el paisaje costero.',
    images: [
      { id: 1, url: '/Img/casa mis afectos 2008 mar de las pampas/502416657_9889886554431847_3159001107125756123_n.jpg' },
      { id: 2, url: '/Img/casa mis afectos 2008 mar de las pampas/502467746_9889886451098524_1255118002605280873_n.jpg' },
      { id: 3, url: '/Img/casa mis afectos 2008 mar de las pampas/502468999_9889886674431835_1494394364129031981_n.jpg' },
      { id: 4, url: '/Img/casa mis afectos 2008 mar de las pampas/502472887_9889886527765183_8104704892007299504_n.jpg' },
      { id: 5, url: '/Img/casa mis afectos 2008 mar de las pampas/502571237_9889886877765148_5056494698654615247_n.jpg' },
      { id: 6, url: '/Img/casa mis afectos 2008 mar de las pampas/502677030_9889886684431834_7907280154559513418_n.jpg' },
      { id: 7, url: '/Img/casa mis afectos 2008 mar de las pampas/502721966_9889886677765168_6154532577855364757_n.jpg' },
      { id: 8, url: '/Img/casa mis afectos 2008 mar de las pampas/502745156_9889886414431861_3101265311451981886_n.jpg' },
      { id: 9, url: '/Img/casa mis afectos 2008 mar de las pampas/502753434_9889886447765191_7043869412045871548_n.jpg' },
      { id: 10, url: '/Img/casa mis afectos 2008 mar de las pampas/502895154_9889886711098498_4616909896471552137_n.jpg' },
      { id: 11, url: '/Img/casa mis afectos 2008 mar de las pampas/502900392_9889886767765159_5864264211231627883_n.jpg' },
      { id: 12, url: '/Img/casa mis afectos 2008 mar de las pampas/502925168_9889886874431815_2271058954166741008_n.jpg' },
      { id: 13, url: '/Img/casa mis afectos 2008 mar de las pampas/502942967_9889886847765151_4548973581457110481_n.jpg' },
      { id: 14, url: '/Img/casa mis afectos 2008 mar de las pampas/503152090_9889886574431845_8601444120147260912_n.jpg' },
      { id: 15, url: '/Img/casa mis afectos 2008 mar de las pampas/503480141_9889886687765167_2304613216076287420_n.jpg' },
    ],
  },
  'casa-ojana': {
    title: 'Casa Ojana',
    location: 'Mar de las Pampas',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda que se integra armoniosamente con el paisaje de Mar de las Pampas. El proyecto refleja un enfoque sensible hacia el entorno natural, respetando la vegetación autóctona y la topografía del terreno. Los espacios fueron diseñados para maximizar la iluminación natural y las vistas al bosque, utilizando materiales nobles que promueven una arquitectura sustentable en equilibrio con el ecosistema costero.',
    images: [
      { id: 1, url: '/Img/casa ojana mar de las pampas 2010/502473948_9889886857765150_8716139701865141355_n.jpg' },
      { id: 2, url: '/Img/casa ojana mar de las pampas 2010/502557002_9889886564431846_2414941042089840045_n.jpg' },
      { id: 3, url: '/Img/casa ojana mar de las pampas 2010/502627555_9889886851098484_7712453561565460815_n.jpg' },
      { id: 4, url: '/Img/casa ojana mar de las pampas 2010/502687774_9889886601098509_4449004925639845432_n.jpg' },
      { id: 5, url: '/Img/casa ojana mar de las pampas 2010/502739065_9889886704431832_1672786213008984387_n.jpg' },
      { id: 6, url: '/Img/casa ojana mar de las pampas 2010/502883638_9889886634431839_9064647764231389027_n.jpg' },
      { id: 7, url: '/Img/casa ojana mar de las pampas 2010/502910896_9889886511098518_6753285328803107915_n.jpg' },
      { id: 8, url: '/Img/casa ojana mar de las pampas 2010/503151616_9889886707765165_5384381890782699864_n.jpg' },
      { id: 9, url: '/Img/casa ojana mar de las pampas 2010/503183888_9889886697765166_3141965558618356589_n.jpg' },
    ],
  },
  'casa-nanu': {
    title: 'Casa Nanu',
    location: 'Mar de las Pampas',
    year: 2011,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto que refleja un profundo compromiso con la arquitectura sustentable en Mar de las Pampas. Esta vivienda se integra delicadamente con el entorno natural, respetando la vegetación nativa y la topografía del terreno. El diseño prioriza la iluminación natural y las visuales hacia el bosque costero, utilizando materiales nobles que envejecen con dignidad y promueven un habitar consciente en armonía con el ecosistema local.',
    images: [
      { id: 1, url: '/Img/casa nanu mar de las pampas 2011/502414787_9889886631098506_4382141569772793129_n.jpg' },
      { id: 2, url: '/Img/casa nanu mar de las pampas 2011/502473497_9889886571098512_5666789588271711265_n.jpg' },
      { id: 3, url: '/Img/casa nanu mar de las pampas 2011/502489504_9889886381098531_6150710554241070081_n.jpg' },
      { id: 4, url: '/Img/casa nanu mar de las pampas 2011/502543753_9889886581098511_3027922632223095234_n.jpg' },
      { id: 5, url: '/Img/casa nanu mar de las pampas 2011/502563844_9889886577765178_2308871937770583291_n.jpg' },
      { id: 6, url: '/Img/casa nanu mar de las pampas 2011/502679198_9889886494431853_7248136151348917068_n.jpg' },
      { id: 7, url: '/Img/casa nanu mar de las pampas 2011/502679198_9889886611098508_4958021585517625494_n.jpg' },
      { id: 8, url: '/Img/casa nanu mar de las pampas 2011/502721966_9889886584431844_2615295506503420869_n.jpg' },
      { id: 9, url: '/Img/casa nanu mar de las pampas 2011/502937825_9889886681098501_2087514792567324453_n.jpg' },
      { id: 10, url: '/Img/casa nanu mar de las pampas 2011/502953834_9889886531098516_3910420676416026725_n.jpg' },
      { id: 11, url: '/Img/casa nanu mar de las pampas 2011/503284615_9889886597765176_5151796290336297074_n.jpg' },
      { id: 12, url: '/Img/casa nanu mar de las pampas 2011/503286141_9889886561098513_4404730609878811060_n.jpg' },
    ],
  },
  'casa-recanto-das-pampas': {
    title: 'Casa Recanto das Pampas',
    location: 'Mar de las Pampas',
    year: 2008,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto emblemático que refleja nuestra visión de arquitectura integrada con la naturaleza. Esta vivienda en Mar de las Pampas fue diseñada para ser un verdadero refugio que respeta el entorno boscoso costero. El proyecto prioriza la preservación de la vegetación nativa, incorporando estrategias de diseño pasivo y materiales nobles que crean espacios cálidos en completa armonía con el ecosistema local.',
    images: [
      { id: 1, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502412392_9889521124468390_2586157993504969712_n.jpg' },
      { id: 2, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502412424_9889521534468349_9216437447122610388_n.jpg' },
      { id: 3, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502417358_9889521487801687_2154510217051715577_n.jpg' },
      { id: 4, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502424971_9889518494468653_2571596079981422831_n.jpg' },
      { id: 5, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502433694_9889521087801727_1296540999779818600_n.jpg' },
      { id: 6, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502434570_9889518474468655_1644321220550538228_n.jpg' },
      { id: 7, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502454038_9889518517801984_2175471631239444804_n.jpg' },
      { id: 8, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502465564_9889521547801681_9157130613518025634_n.jpg' },
      { id: 9, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502469652_9889521497801686_4998720377731848929_n.jpg' },
      { id: 10, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502488233_9889521484468354_3805464419043420025_n.jpg' },
      { id: 11, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502575037_9889521564468346_5102096463260742662_n.jpg' },
      { id: 12, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/502611883_9889518567801979_8973658450335000694_n.jpg' },
      { id: 13, url: '/Img/casa recanto das pampas mar ed las pampas año 2008/503128955_9889521504468352_5896713647037392505_n.jpg' },
    ],
  },
  'casa-alfredo': {
    title: 'Casa Alfredo',
    location: 'Costa Esmeralda',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto que refleja nuestra visión de arquitectura sustentable en Costa Esmeralda. Esta vivienda se integra respetuosamente con el entorno natural de la costa atlántica, priorizando la iluminación natural y las vistas al paisaje. El diseño contempla materiales nobles y estrategias de construcción consciente que minimizan el impacto ambiental, creando espacios cálidos en armonía con el ecosistema costero.',
    images: [
      { id: 1, url: '/Img/casa alfredo csota esmeralda 2010/502434675_9889518557801980_5823191922855307368_n.jpg' },
      { id: 2, url: '/Img/casa alfredo csota esmeralda 2010/502461109_9889518127802023_3430113230460541362_n.jpg' },
      { id: 3, url: '/Img/casa alfredo csota esmeralda 2010/502576558_9889518481135321_3914158516934867773_n.jpg' },
      { id: 4, url: '/Img/casa alfredo csota esmeralda 2010/502616000_9889518271135342_7472895571476161752_n.jpg' },
      { id: 5, url: '/Img/casa alfredo csota esmeralda 2010/502617942_9889518247802011_1150185283446802148_n.jpg' },
      { id: 6, url: '/Img/casa alfredo csota esmeralda 2010/502863212_9889518487801987_741748816852835543_n.jpg' },
      { id: 7, url: '/Img/casa alfredo csota esmeralda 2010/502937420_9889518111135358_8581108207456907098_n.jpg' },
    ],
  },
  'casa-la-morena': {
    title: 'Casa La Morena',
    location: 'Mar Azul',
    year: 2010,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Vivienda que se integra con sensibilidad al paisaje natural de Mar Azul. El proyecto refleja un enfoque consciente hacia el diseño sustentable, respetando la vegetación autóctona y las características del terreno. Los espacios interiores fueron concebidos para aprovechar la iluminación natural y las vistas al bosque, utilizando materiales de calidad que promueven una arquitectura en armonía con el entorno costero.',
    images: [
      { id: 1, url: '/Img/casa la morena mar azul 2010/502404645_9889518311135338_5044147383017468467_n.jpg' },
      { id: 2, url: '/Img/casa la morena mar azul 2010/502412424_9889518104468692_5524600651978979103_n.jpg' },
      { id: 3, url: '/Img/casa la morena mar azul 2010/502424219_9889518301135339_1225174197632069134_n.jpg' },
      { id: 4, url: '/Img/casa la morena mar azul 2010/502487818_9889518261135343_8012175169307856996_n.jpg' },
      { id: 5, url: '/Img/casa la morena mar azul 2010/502502420_9889518554468647_5082236360954978050_n.jpg' },
      { id: 6, url: '/Img/casa la morena mar azul 2010/502520409_9889518527801983_1217440906373991534_n.jpg' },
      { id: 7, url: '/Img/casa la morena mar azul 2010/502570007_9889518511135318_4116276100785261751_n.jpg' },
      { id: 8, url: '/Img/casa la morena mar azul 2010/502582713_9889518574468645_4346464004665576639_n.jpg' },
      { id: 9, url: '/Img/casa la morena mar azul 2010/502619389_9889518241135345_8681997970072826801_n.jpg' },
      { id: 10, url: '/Img/casa la morena mar azul 2010/502623281_9889518561135313_7724300228189188589_n.jpg' },
      { id: 11, url: '/Img/casa la morena mar azul 2010/503120962_9889518504468652_6701012239894844585_n.jpg' },
    ],
  },
  'casa-otium': {
    title: 'Casa Otium',
    location: 'Mar de las Pampas',
    year: 2009,
    areaM2: 0,
    type: 'Casa Nueva',
    description: 'Proyecto que celebra el concepto de ocio y contemplación en armonía con la naturaleza. Esta vivienda en Mar de las Pampas fue diseñada para ser un espacio de descanso que respeta profundamente el entorno boscoso. El proyecto integra estrategias de diseño sustentable, preservando la vegetación nativa y utilizando materiales nobles que promueven una arquitectura consciente del impacto ambiental y en equilibrio con el ecosistema costero.',
    images: [
      { id: 1, url: '/Img/casa otium mar de las pampas 2009/502467049_9889518501135319_901184028925202585_n.jpg' },
      { id: 2, url: '/Img/casa otium mar de las pampas 2009/502471247_9889518164468686_1492871446280330990_n.jpg' },
      { id: 3, url: '/Img/casa otium mar de las pampas 2009/502471537_9889518284468674_219585134337329273_n.jpg' },
      { id: 4, url: '/Img/casa otium mar de las pampas 2009/502471897_9889518291135340_6336904776277982997_n.jpg' },
      { id: 5, url: '/Img/casa otium mar de las pampas 2009/502487778_9889518467801989_697751294794873077_n.jpg' },
      { id: 6, url: '/Img/casa otium mar de las pampas 2009/502517511_9889518141135355_4788769657487807974_n.jpg' },
      { id: 7, url: '/Img/casa otium mar de las pampas 2009/502565535_9889518461135323_7667566117353504581_n.jpg' },
      { id: 8, url: '/Img/casa otium mar de las pampas 2009/502617861_9889518577801978_9149374510613935440_n.jpg' },
      { id: 9, url: '/Img/casa otium mar de las pampas 2009/502961534_9889518244468678_5506885199563613134_n.jpg' },
      { id: 10, url: '/Img/casa otium mar de las pampas 2009/503211705_9889518281135341_82904556764198780_n.jpg' },
    ],
  },
  'casa-mobydick': {
    title: 'Casa Mobydick',
    location: 'Mar Azul',
    year: 2023,
    areaM2: 85,
    type: 'Casa Nueva',
    description:
      'Casa en alquiler turístico Mar Azul, Argentina, a tres cuadras del mar, para disfrutar la paz y la tranquilidad del bosque y la playa. Casa diseñada con enfoque en la integración con el entorno natural costero, priorizando espacios luminosos y funcionales que invitan al descanso. La arquitectura responde a las necesidades del turismo sostenible, creando ambientes acogedores que potencian la experiencia de vivir cerca del mar.',
    images: [
      { id: 1, url: '/Img/casa mobydick/SaveClip.App_401433485_3644500602498975_4290159840041662935_n.jpg' },
      { id: 2, url: '/Img/casa mobydick/SaveClip.App_402436287_1078360073333837_7252398363092866706_n.jpg' },
      { id: 3, url: '/Img/casa mobydick/SaveClip.App_402491872_184860171283719_5300514167834053515_n.jpg' },
      { id: 4, url: '/Img/casa mobydick/SaveClip.App_402510146_998765957852671_2454399049944654230_n.jpg' },
      { id: 5, url: '/Img/casa mobydick/SaveClip.App_402720178_1048188849546479_3611794109276182212_n.jpg' },
      { id: 6, url: '/Img/casa mobydick/SaveClip.App_403124552_197468756740841_6790243504513048353_n.jpg' },
    ],
  },
  'ampliacion-1': {
    title: 'Ampliación Apart "La Morada"',
    location: 'Villa Gesell',
    year: 2022,
    areaM2: 175,
    type: 'Ampliación',
    description:
      'Ampliación Apart "La Morada" - Proyecto de 175 m² que incluye 4 departamentos, piscina cubierta y spa. Un proyecto integral de ampliación en Villa Gesell que combina funcionalidad y confort, diseñado para ofrecer una experiencia de hospedaje completa. Gracias a Emiliano por confiar en el estudio.',
    images: [
      { id: 1, url: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448067258_1509499283328942_2240280668779532489_n.jpg' },
      { id: 2, url: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448079874_1374081193264859_6482758920230727426_n.jpg' },
      { id: 3, url: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448088602_804537508448840_647930721598905142_n.jpg' },
      { id: 4, url: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448092591_3558814347700069_996865995822142724_n.jpg' },
      { id: 5, url: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448215789_364711519559074_281405469282317015_n.jpg' },
      { id: 6, url: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448225147_976031067258687_5344655511314543567_n.jpg' },
      { id: 7, url: '/Img/Casa Ampliacion Apart La Morada  departamentos piscina cubierta y spa 202/SaveClip.App_448226197_1009829060408355_7411664778472056010_n.jpg' },
    ],
  },
};

// Array con el orden de las obras
const projectSlugs = ['casa-carolina', 'casa-marinas', 'casa-myj', 'casa-martin-fierro', 'casa-prana', 'casa-punto-de-encuentro', 'casa-antu-pewen', 'casa-valeria-del-mar', 'casa-mario-y-sandra', 'casa-lio', 'obra-querandies', 'casa-coquimbo', 'obra-albornoz', 'casa-selva', 'casa-cupal', 'casa-pivamar', 'casa-ramos', 'casa-cambelia', 'casa-kawinkelen', 'casa-pura-vida', 'casa-valhala', 'casa-spadescansar', 'casa-el-rayo-verde', 'casa-nuestro-lugar', 'casa-morena-2', 'casa-alanis-ii', 'casa-alanis-1', 'costa-gaviotas-cabanas', 'casa-mis-afectos', 'casa-ojana', 'casa-nanu', 'casa-recanto-das-pampas', 'casa-alfredo', 'casa-la-morena', 'casa-otium', 'casa-mobydick', 'ampliacion-apart-la-morada-2024', 'ampliacion-1', 'casa-contemporanea'];

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const mockProjectDetail = mockProjects[slug];
  if (!mockProjectDetail) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Obra no encontrada</h1>
        <Link href="/obras" className="text-brand underline">Volver a obras</Link>
      </main>
    );
  }
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  // Calcular el índice actual y los slugs anterior/siguiente
  const currentIndex = projectSlugs.indexOf(slug);
  const prevIndex = (currentIndex - 1 + projectSlugs.length) % projectSlugs.length;
  const nextIndex = (currentIndex + 1) % projectSlugs.length;
  const prevSlug = projectSlugs[prevIndex];
  const nextSlug = projectSlugs[nextIndex];

  const openLightbox = (idx: number) => {
    setLightboxImage(idx);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/obras"
          className="inline-flex items-center gap-2 text-brand hover:text-brand-dark transition mb-8"
        >
          <span>←</span> Volver a Obras
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            {mockProjectDetail.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-brand/10">
            <div>
              <p className="text-ink-light text-sm mb-1">Ubicación</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mockProjectDetail.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand hover:text-brand-dark transition-colors underline decoration-brand/30 hover:decoration-brand"
              >
                {mockProjectDetail.location}
              </a>
            </div>
            <div>
              <p className="text-ink-light text-sm mb-1">Año</p>
              <p className="font-semibold text-ink">{mockProjectDetail.year}</p>
            </div>
            <div>
              <p className="text-ink-light text-sm mb-1">Superficie</p>
              <p className="font-semibold text-ink">
                {mockProjectDetail.areaM2 > 0 ? `${mockProjectDetail.areaM2}m²` : '?'}
              </p>
            </div>
            <div>
              <p className="text-ink-light text-sm mb-1">Tipo</p>
              <p className="font-semibold text-ink">{mockProjectDetail.type}</p>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-lg text-ink-light leading-relaxed">
            {mockProjectDetail.description}
          </p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-ink mb-8">Galería</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {mockProjectDetail.images.map((img: any, idx: number) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl cursor-pointer aspect-video bg-gradient-to-br from-brand/10 to-brand-dark/10 group"
                onClick={() => openLightbox(idx)}
              >
                <NextImage
                  src={img.url}
                  alt={`${mockProjectDetail.title} - Imagen ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI0Y3RjRFRiIvPjwvc3ZnPg=="
                />
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
                <NextImage
                  src={mockProjectDetail.images[lightboxImage].url}
                  alt={`${mockProjectDetail.title} - Imagen ${lightboxImage + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                />

                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-white text-4xl hover:opacity-70 transition z-10 bg-black/30 w-12 h-12 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(false);
                  }}
                >
                  ×
                </button>

                {/* Navigation - Previous */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:opacity-70 transition z-10 bg-black/30 w-14 h-14 rounded-full flex items-center justify-center hover:bg-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(
                      (prev) =>
                        (prev - 1 + mockProjectDetail.images.length) %
                        mockProjectDetail.images.length
                    );
                  }}
                >
                  ‹
                </button>

                {/* Navigation - Next */}
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:opacity-70 transition z-10 bg-black/30 w-14 h-14 rounded-full flex items-center justify-center hover:bg-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(
                      (prev) =>
                        (prev + 1) % mockProjectDetail.images.length
                    );
                  }}
                >
                  ›
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                  {lightboxImage + 1} / {mockProjectDetail.images.length}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-center border-t border-brand/10 pt-12"
        >
          <Link
            href={`/obras/${prevSlug}`}
            className="text-brand hover:text-brand-dark transition font-semibold"
          >
            ← Obra Anterior
          </Link>
          <Link
            href="/contacto"
            className="bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Contactar
          </Link>
          <Link
            href={`/obras/${nextSlug}`}
            className="text-brand hover:text-brand-dark transition font-semibold"
          >
            Siguiente Obra →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
