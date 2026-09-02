/**
 * The two hub pages: /services and /areas.
 *
 * They exist for the same reason the breadcrumb needs a middle rung. Before them, a service
 * page's parent was `/#services` — an anchor on the home page, which is a place to scroll to
 * rather than a page to be at, and a BreadcrumbList that names one is describing a hierarchy
 * the site does not have. They also give the two obvious plural queries ("cleaning services
 * New Jersey", "areas served") somewhere to land that is not the home page.
 */
import type { Lang } from './i18n';

export type IndexCopy = {
  title: string;
  desc: string;
  h1: string;
  intro: string;
  /** Heading above the card grid. */
  listH2: string;
};

export const SERVICES_INDEX: Record<Lang, IndexCopy> = {
  en: {
    title: 'Cleaning Services in New Jersey | Genesis Cleaning',
    desc: 'Twelve cleaning services across Essex, Union, Morris, Middlesex and Hudson County, NJ — residential, commercial, deep, move-out and more. (882) 930-0319.',
    h1: 'Cleaning services in New Jersey',
    intro:
      'Twelve services, each quoted against the space in front of us instead of a package you have to fit into. Every one of them is available in all five counties we work.',
    listH2: 'All twelve services'
  },
  es: {
    title: 'Servicios de Limpieza en Nueva Jersey | Genesis',
    desc: 'Doce servicios de limpieza en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ: residencial, comercial, profunda, mudanza y más. (882) 930-0319.',
    h1: 'Servicios de limpieza en Nueva Jersey',
    intro:
      'Doce servicios, cada uno cotizado contra el espacio que tenemos enfrente y no contra un paquete al que tengas que ajustarte. Todos están disponibles en los cinco condados que trabajamos.',
    listH2: 'Los doce servicios'
  }
};

export const AREAS_INDEX: Record<Lang, IndexCopy> = {
  en: {
    title: 'Service Areas in New Jersey | Genesis Cleaning',
    desc: 'Genesis Cleaning works across Essex, Union, Morris, Middlesex and Hudson County, New Jersey. Find the county you are in. (882) 930-0319. Se habla español.',
    h1: 'Where we clean in New Jersey',
    intro:
      'Five counties, named because they are the ones the crew actually drives to. Each page says what the housing and the buildings in that county are like, and what that changes about the work.',
    listH2: 'The five counties we cover'
  },
  es: {
    title: 'Áreas de Servicio en Nueva Jersey | Genesis',
    desc: 'Genesis Cleaning trabaja en los condados de Essex, Union, Morris, Middlesex y Hudson, Nueva Jersey. Encuentra tu condado. (882) 930-0319.',
    h1: 'Dónde limpiamos en Nueva Jersey',
    intro:
      'Cinco condados, nombrados porque son a los que la cuadrilla de verdad maneja. Cada página dice cómo son la vivienda y los edificios de ese condado, y qué cambia eso en el trabajo.',
    listH2: 'Los cinco condados que cubrimos'
  }
};
