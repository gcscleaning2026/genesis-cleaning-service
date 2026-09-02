/**
 * Wave 1 city landings. Ten municipalities, not seventy-three.
 *
 * County hubs stay the unit for the rest of the map. Unlisted towns 404 with noindex.
 * URLs are flat: /areas/{city-slug}. Nested /areas/{county}/{city} is not a page.
 */
import type { Copy } from './page-types';
import type { Lang } from './i18n';

export type CityVariant = 'apartment' | 'house' | 'shop' | 'move-out';

export type CityPage = {
  slug: string;
  city: string;
  county: string;
  countySlug: string;
  nearby: string[];
  apartmentFirst?: boolean;
  variant: CityVariant;
  relatedSlug: string;
  copy: Record<Lang, Copy>;
};

const HUDSON = ['Bayonne', 'Union City', 'North Bergen', 'West New York', 'Kearny', 'Secaucus', 'Weehawken', 'Harrison', 'Guttenberg', 'East Newark'];
const ESSEX = ['Irvington', 'Livingston', 'Belleville', 'Nutley', 'Maplewood', 'South Orange', 'Millburn', 'Verona', 'Cedar Grove', 'Caldwell', 'Glen Ridge'];
const UNION = ['Union', 'Plainfield', 'Linden', 'Westfield', 'Cranford', 'Summit', 'Rahway', 'Scotch Plains', 'Roselle', 'Hillside', 'Kenilworth', 'Garwood', 'Fanwood'];
const MIDDLESEX = ['Woodbridge', 'New Brunswick', 'Piscataway', 'Perth Amboy', 'Old Bridge', 'East Brunswick', 'South Brunswick', 'South Plainfield', 'Metuchen'];

function nearby(city: string, countyTowns: string[], extras: string[]): string[] {
  return [...countyTowns.filter(t => t !== city), ...extras.filter(t => t !== city)];
}

const HOUSING = {
  apartment: {
    en: {
      h2: 'Towers, elevators, and building rules',
      body: '{City} jobs are the unit inside the building. When the board asks for a COI, we send it; elevator time and parking go into the quote so they are not extras on the day. Short-term turnovers need a tight window — say so on WhatsApp with the building and unit type.'
    },
    es: {
      h2: 'Torres, ascensores y reglas del edificio',
      body: 'En {City} el trabajo es la unidad dentro del edificio. Si la administración pide COI, lo enviamos; el ascensor y el estacionamiento van en la cotización para que no sean extras. Los turnovers de corta estadía necesitan una ventana justa: dínoslo por WhatsApp con el edificio y el tipo de unidad.'
    }
  },
  house: {
    en: {
      h2: 'Houses, not floor plans',
      body: '{City} housing is rooms, stairs, and finish — colonials and capes more than glass towers. We quote the kitchens, baths, and condition in front of us, then send the crew that fits that house.'
    },
    es: {
      h2: 'Casas, no planos',
      body: 'En {City} la vivienda es habitaciones, escaleras y acabados: colonials y capes, no torres de vidrio. Cotizamos las cocinas, baños y el estado de esa casa, y llega el equipo que corresponde.'
    }
  },
  shop: {
    en: {
      h2: 'Homes upstairs, shops on the street',
      body: '{City} mixes houses and street-level space. Tell us which one you need cleaned; we do not quote a downtown package. Homes are ordinary access. Shops are a written scope that fits the hours the public is gone.'
    },
    es: {
      h2: 'Casas arriba, negocios en la calle',
      body: '{City} mezcla casas y locales a pie de calle. Dinos cuál hay que limpiar; no cotizamos un paquete de downtown. En casas, acceso normal. En locales, un alcance por escrito que cabe en el horario en que no hay público.'
    }
  },
  'move-out': {
    en: {
      h2: 'Homes upstairs, shops on the street',
      body: 'Newark mixes houses, walk-ups, and empty units that need to be ready for the next keys. Tell us whether this is a lived-in house or a turnover; those are different visits. Building access and a written window go in the quote.'
    },
    es: {
      h2: 'Casas arriba, negocios en la calle',
      body: 'Newark mezcla casas, walk-ups y unidades vacías que tienen que quedar listas para las siguientes llaves. Dinos si es una casa habitada o una mudanza; son visitas distintas. El acceso al edificio y la ventana van en la cotización.'
    }
  }
} as const;

const RELATED = {
  apartment: {
    slug: 'apartment-condo-cleaning',
    en: { h2: 'Apartment cleaning for this building', body: 'Units, building rules, and a smaller footprint live on apartment and condo cleaning. Need a different job? See all services.' },
    es: { h2: 'Limpieza de apartamentos para este edificio', body: 'Unidades, reglas de edificio y un pie más chico están en limpieza de apartamentos y condos. ¿Otro tipo de trabajo? Ver todos los servicios.' }
  },
  house: {
    slug: 'house-cleaning',
    en: { h2: 'House cleaning for this town', body: 'Houses in this town are quoted on the house cleaning page. Standing calendars live on standard cleaning — not on this city page. Need a different job? See all services.' },
    es: { h2: 'Limpieza de casas para este pueblo', body: 'Las casas de este pueblo se cotizan en la página de limpieza de casas. El calendario fijo está en limpieza estándar. ¿Otro tipo de trabajo? Ver todos los servicios.' }
  },
  shop: {
    slug: 'commercial-cleaning',
    en: { h2: 'Cleaning for the shop, not just the house', body: 'Non-office businesses are quoted on commercial cleaning. Offices still go to office cleaning from that page. Need a different job? See all services.' },
    es: { h2: 'Limpieza para el local, no solo la casa', body: 'Los negocios que no son oficina se cotizan en limpieza comercial. Las oficinas siguen en limpieza de oficinas. ¿Otro tipo de trabajo? Ver todos los servicios.' }
  },
  'move-out': {
    slug: 'move-in-move-out-cleaning',
    en: { h2: 'Move-in and move-out in Newark', body: 'Empty units and key-ready turnovers are move-in and move-out cleaning. Need a different job? See all services.' },
    es: { h2: 'Mudanzas en Newark', body: 'Unidades vacías y entregas de llaves son limpieza de mudanza. ¿Otro tipo de trabajo? Ver todos los servicios.' }
  }
} as const;

function fill(s: string, city: string, county: string) {
  return s.replaceAll('{City}', city).replaceAll('{County}', county);
}

function cityCopy(
  city: string,
  county: string,
  variant: CityVariant,
  titles: Record<Lang, string>,
  descs: Record<Lang, string>,
  intros: Record<Lang, string>,
  h1s: Record<Lang, string>
): Record<Lang, Copy> {
  const access = {
    apartment: {
      en: {
        q: `What about COI, elevators, and parking in ${city}?`,
        a: 'Tell us the building when you quote. COI is routine in Jersey City and Hoboken towers. Elevator time and parking go into the quote so they are not extras on the day.'
      },
      es: {
        q: `¿Y el COI, los ascensores y el estacionamiento en ${city}?`,
        a: 'Dinos el edificio al cotizar. El COI es habitual en torres de Jersey City y Hoboken. El ascensor y el estacionamiento van en la cotización para que no sean extras el día del servicio.'
      }
    },
    house: {
      en: {
        q: `Do I need to be home in ${city}?`,
        a: 'Not if we have a way in — lockbox, garage code, or a neighbor. Say so on WhatsApp so the crew is not guessing in the driveway.'
      },
      es: {
        q: `¿Tengo que estar en casa en ${city}?`,
        a: 'No, si tenemos cómo entrar: lockbox, código del garage o un vecino. Dilo por WhatsApp para que el equipo no adivine en la entrada.'
      }
    },
    shop: {
      en: {
        q: `Can you clean a shop after hours and a house during the day in ${city}?`,
        a: 'Yes. Homes and storefronts are different visits. Put the address type and the hours that work in WhatsApp and we quote that window.'
      },
      es: {
        q: `¿Pueden limpiar un local fuera de horario y una casa de día en ${city}?`,
        a: 'Sí. Casa y local son visitas distintas. Pon el tipo de dirección y el horario que te sirve en WhatsApp y cotizamos esa ventana.'
      }
    },
    'move-out': {
      en: {
        q: `Can you clean a shop after hours and a house during the day in ${city}?`,
        a: 'Yes. Homes and storefronts are different visits. Put the address type and the hours that work in WhatsApp and we quote that window.'
      },
      es: {
        q: `¿Pueden limpiar un local fuera de horario y una casa de día en ${city}?`,
        a: 'Sí. Casa y local son visitas distintas. Pon el tipo de dirección y el horario que te sirve en WhatsApp y cotizamos esa ventana.'
      }
    }
  } as const;

  const housing = HOUSING[variant];
  const related = RELATED[variant];
  const out = {} as Record<Lang, Copy>;
  for (const lang of ['en', 'es'] as const) {
    out[lang] = {
      name: city,
      title: titles[lang],
      desc: descs[lang],
      h1: h1s[lang],
      intro: intros[lang],
      sections: [
        { h2: fill(housing[lang].h2, city, county), body: fill(housing[lang].body, city, county) },
        { h2: fill(related[lang].h2, city, county), body: fill(related[lang].body, city, county) },
        {
          h2: lang === 'es' ? `Otros pueblos que limpiamos en el condado de ${county}` : `Other towns we clean in ${county} County`,
          body:
            lang === 'es'
              ? `Mismo condado, mismo equipo. Estos nombres no son páginas aparte. La cobertura completa del condado de ${county} está en la página del condado.`
              : `Same county, same crew. These names are not separate pages. Full ${county} County coverage lives on the county page.`
        }
      ],
      includesH2: lang === 'es' ? `Qué cubre una visita en ${city}` : `What a visit in ${city} covers`,
      includes:
        lang === 'es'
          ? [
              'Cotización para esta dirección, no un paquete publicado',
              'Suministros que llevamos nosotros',
              'Acceso y horario dichos por WhatsApp',
              'WhatsApp o llamada al (882) 930-0319',
              'Aquí se habla español'
            ]
          : [
              'Quoted for this address, not a published package',
              'Supplies brought by us',
              'Access and hours named on WhatsApp',
              'WhatsApp or a call to (882) 930-0319',
              'Aquí se habla español'
            ],
      faq: [
        {
          q: lang === 'es' ? `¿De verdad limpian en ${city}?` : `Do you actually clean in ${city}?`,
          a:
            lang === 'es'
              ? `Sí. Genesis limpia en ${city} y en todo el condado de ${county}. Los demás pueblos del condado aparecen arriba como nombres, no como más sitios web.`
              : `Yes. Genesis cleans in ${city} and across ${county} County. Other towns in this county are listed above as names, not extra websites.`
        },
        access[variant][lang],
        {
          q: lang === 'es' ? '¿Puedo reservar en español?' : 'Can I book in Spanish?',
          a:
            lang === 'es'
              ? 'Sí. Aquí se habla español. WhatsApp o llama al (882) 930-0319 y pide el trabajo en español.'
              : 'Yes. Aquí se habla español. WhatsApp or call (882) 930-0319 and ask for the job in Spanish.'
        }
      ]
    };
  }
  return out;
}

export const WAVE1_CITY_SLUGS = [
  'orange',
  'newark',
  'jersey-city',
  'hoboken',
  'east-orange',
  'west-orange',
  'montclair',
  'bloomfield',
  'elizabeth',
  'edison'
] as const;

export const CITY_PAGES: CityPage[] = [
  {
    slug: 'orange',
    city: 'Orange',
    county: 'Essex',
    countySlug: 'essex-county',
    nearby: nearby('Orange', ESSEX, ['East Orange', 'West Orange', 'Newark', 'Montclair']),
    apartmentFirst: false,
    variant: 'house',
    relatedSlug: 'house-cleaning',
    copy: cityCopy(
      'Orange',
      'Essex',
      'house',
      {
        en: 'House Cleaning in Orange, New Jersey | Genesis Cleaning',
        es: 'Limpieza de Casas en Orange, NJ | Genesis Cleaning'
      },
      {
        en: 'House cleaning in Orange, Essex County, NJ 07050 — we are based here. Kitchens, baths and floors quoted to your house. Call (882) 930-0319. Se habla español.',
        es: 'Limpieza de casas en Orange, condado de Essex, NJ 07050 — tenemos base aquí. Cocinas, baños y pisos cotizados a tu casa. Llama al (882) 930-0319. WhatsApp.'
      },
      {
        en: 'Genesis cleans houses in Orange, Essex County — we are based here (07050). We quote the house in front of us, not a county average. WhatsApp the town, beds/baths, and whether this is a one-time visit.',
        es: 'Genesis limpia casas en Orange, condado de Essex — tenemos base aquí (07050). Cotizamos la casa que tienes, no un promedio del condado. Por WhatsApp dinos el pueblo, recámaras/baños y si es una visita única.'
      },
      { en: 'We clean houses in Orange', es: 'Limpiamos casas en Orange' }
    )
  },
  {
    slug: 'newark',
    city: 'Newark',
    county: 'Essex',
    countySlug: 'essex-county',
    nearby: nearby('Newark', ESSEX, ['East Orange', 'Orange', 'Elizabeth']),
    apartmentFirst: false,
    variant: 'move-out',
    relatedSlug: 'move-in-move-out-cleaning',
    copy: cityCopy(
      'Newark',
      'Essex',
      'move-out',
      {
        en: 'Move-Out Cleaning in Newark, NJ | Genesis Cleaning',
        es: 'Limpieza de Mudanza en Newark, NJ | Genesis Cleaning'
      },
      {
        en: 'House and move-out cleaning in Newark, Essex County, NJ. Lived-in homes or empty units ready for the next keys. Free quote: (882) 930-0319. Se habla español.',
        es: 'Limpieza de casas y mudanza en Newark, condado de Essex, NJ. Casa habitada o unidad vacía para las llaves. Cotización: (882) 930-0319. Se habla español.'
      },
      {
        en: 'Genesis cleans homes and street-level businesses in Newark. Houses get a room-by-room visit; empty units are a different job. WhatsApp whether this is a home or a turnover and we quote from there.',
        es: 'Genesis limpia casas y negocios a pie de calle en Newark. En casas, habitación por habitación; las unidades vacías son otro trabajo. Por WhatsApp dinos si es casa o mudanza y cotizamos desde ahí.'
      },
      { en: 'We clean homes and storefronts in Newark', es: 'Limpiamos casas y locales en Newark' }
    )
  },
  {
    slug: 'jersey-city',
    city: 'Jersey City',
    county: 'Hudson',
    countySlug: 'hudson-county',
    nearby: nearby('Jersey City', HUDSON, ['Hoboken']),
    apartmentFirst: true,
    variant: 'apartment',
    relatedSlug: 'apartment-condo-cleaning',
    copy: cityCopy(
      'Jersey City',
      'Hudson',
      'apartment',
      {
        en: 'Apartment Cleaning in Jersey City, NJ | Genesis Cleaning',
        es: 'Limpieza de Apartamentos en Jersey City, NJ | Genesis'
      },
      {
        en: 'Apartment cleaning in Jersey City, Hudson County, NJ. Towers, walk-ups, COI and elevator time quoted in — not extras on the day. Call (882) 930-0319 today.',
        es: 'Limpieza de apartamentos en Jersey City, condado de Hudson, NJ. Torres, walk-ups, COI y ascensor en la cotización, no como extras. Llama al (882) 930-0319.'
      },
      {
        en: 'Genesis cleans apartments and condos in Jersey City — towers, walk-ups, and short-term units. Quotes bake in building access, elevators, COI, and parking. Message us on WhatsApp with your building and unit type.',
        es: 'Genesis limpia apartamentos y condos en Jersey City: torres, walk-ups y unidades de corta estadía. La cotización incluye acceso al edificio, ascensores, COI y estacionamiento. Escríbenos por WhatsApp con tu edificio y tipo de unidad.'
      },
      { en: 'We clean apartments in Jersey City', es: 'Limpiamos apartamentos en Jersey City' }
    )
  },
  {
    slug: 'hoboken',
    city: 'Hoboken',
    county: 'Hudson',
    countySlug: 'hudson-county',
    nearby: nearby('Hoboken', HUDSON, ['Jersey City']),
    apartmentFirst: true,
    variant: 'apartment',
    relatedSlug: 'apartment-condo-cleaning',
    copy: cityCopy(
      'Hoboken',
      'Hudson',
      'apartment',
      {
        en: 'Apartment Cleaning in Hoboken, NJ | Genesis Cleaning',
        es: 'Limpieza de Apartamentos en Hoboken, NJ | Genesis Cleaning'
      },
      {
        en: 'Apartment cleaning in Hoboken, Hudson County, NJ. Walk-ups and waterfront buildings; COI and parking quoted in. Free quote: (882) 930-0319. Se habla español.',
        es: 'Limpieza de apartamentos en Hoboken, condado de Hudson, NJ. Walk-ups y edificios al waterfront; COI y estacionamiento en la cotización. (882) 930-0319.'
      },
      {
        en: 'Genesis cleans apartments and condos in Hoboken — towers, walk-ups, and short-term units. Quotes bake in building access, elevators, COI, and parking. Message us on WhatsApp with your building and unit type.',
        es: 'Genesis limpia apartamentos y condos en Hoboken: torres, walk-ups y unidades de corta estadía. La cotización incluye acceso al edificio, ascensores, COI y estacionamiento. Escríbenos por WhatsApp con tu edificio y tipo de unidad.'
      },
      { en: 'We clean apartments in Hoboken', es: 'Limpiamos apartamentos en Hoboken' }
    )
  },
  {
    slug: 'east-orange',
    city: 'East Orange',
    county: 'Essex',
    countySlug: 'essex-county',
    nearby: nearby('East Orange', ESSEX, ['Orange', 'West Orange', 'Newark']),
    apartmentFirst: false,
    variant: 'house',
    relatedSlug: 'house-cleaning',
    copy: cityCopy(
      'East Orange',
      'Essex',
      'house',
      {
        en: 'House Cleaning in East Orange, NJ | Genesis Cleaning',
        es: 'Limpieza de Casas en East Orange, NJ | Genesis Cleaning'
      },
      {
        en: 'House cleaning in East Orange, Essex County, NJ. Colonials and two-families quoted by rooms, not a county average. Free quote: (882) 930-0319. Se habla español.',
        es: 'Limpieza de casas en East Orange, condado de Essex, NJ. Colonials y bifamiliares cotizados por cuartos, no por un promedio. Llama al (882) 930-0319 hoy.'
      },
      {
        en: 'Genesis cleans houses in East Orange, Essex County — colonials, capes, and the rooms that actually get used. We quote the house in front of us, not a county average. WhatsApp the town, beds/baths, and whether this is a one-time visit.',
        es: 'Genesis limpia casas en East Orange, condado de Essex: colonials, capes y las habitaciones que de verdad se usan. Cotizamos la casa que tienes, no un promedio del condado. Por WhatsApp dinos el pueblo, recámaras/baños y si es una visita única.'
      },
      { en: 'We clean houses in East Orange', es: 'Limpiamos casas en East Orange' }
    )
  },
  {
    slug: 'west-orange',
    city: 'West Orange',
    county: 'Essex',
    countySlug: 'essex-county',
    nearby: nearby('West Orange', ESSEX, ['Orange', 'East Orange', 'Montclair']),
    apartmentFirst: false,
    variant: 'house',
    relatedSlug: 'house-cleaning',
    copy: cityCopy(
      'West Orange',
      'Essex',
      'house',
      {
        en: 'House Cleaning in West Orange, NJ | Genesis Cleaning',
        es: 'Limpieza de Casas en West Orange, NJ | Genesis Cleaning'
      },
      {
        en: 'House cleaning in West Orange, Essex County, NJ. Stairs, kitchens and baths quoted to this house. WhatsApp or call (882) 930-0319. No published rates.',
        es: 'Limpieza de casas en West Orange, condado de Essex, NJ. Escaleras, cocinas y baños cotizados a esta casa. WhatsApp o llama al (882) 930-0319. Se habla español.'
      },
      {
        en: 'Genesis cleans houses in West Orange, Essex County — colonials, capes, and the rooms that actually get used. We quote the house in front of us, not a county average. WhatsApp the town, beds/baths, and whether this is a one-time visit.',
        es: 'Genesis limpia casas en West Orange, condado de Essex: colonials, capes y las habitaciones que de verdad se usan. Cotizamos la casa que tienes, no un promedio del condado. Por WhatsApp dinos el pueblo, recámaras/baños y si es una visita única.'
      },
      { en: 'We clean houses in West Orange', es: 'Limpiamos casas en West Orange' }
    )
  },
  {
    slug: 'montclair',
    city: 'Montclair',
    county: 'Essex',
    countySlug: 'essex-county',
    nearby: nearby('Montclair', ESSEX, ['Bloomfield', 'Orange', 'Glen Ridge']),
    apartmentFirst: false,
    variant: 'house',
    relatedSlug: 'house-cleaning',
    copy: cityCopy(
      'Montclair',
      'Essex',
      'house',
      {
        en: 'House Cleaning in Montclair, NJ | Genesis Cleaning',
        es: 'Limpieza de Casas en Montclair, NJ | Genesis Cleaning'
      },
      {
        en: 'House cleaning in Montclair, Essex County, NJ. Colonials and capes quoted by kitchens, baths and condition. Free quote: (882) 930-0319. Se habla español.',
        es: 'Limpieza de casas en Montclair, condado de Essex, NJ. Colonials y capes cotizados por cocina, baños y estado. Cotización gratis al (882) 930-0319. WhatsApp.'
      },
      {
        en: 'Genesis cleans houses in Montclair, Essex County — colonials, capes, and the rooms that actually get used. We quote the house in front of us, not a county average. WhatsApp the town, beds/baths, and whether this is a one-time visit.',
        es: 'Genesis limpia casas en Montclair, condado de Essex: colonials, capes y las habitaciones que de verdad se usan. Cotizamos la casa que tienes, no un promedio del condado. Por WhatsApp dinos el pueblo, recámaras/baños y si es una visita única.'
      },
      { en: 'We clean houses in Montclair', es: 'Limpiamos casas en Montclair' }
    )
  },
  {
    slug: 'bloomfield',
    city: 'Bloomfield',
    county: 'Essex',
    countySlug: 'essex-county',
    nearby: nearby('Bloomfield', ESSEX, ['Montclair', 'Nutley', 'Belleville']),
    apartmentFirst: false,
    variant: 'house',
    relatedSlug: 'house-cleaning',
    copy: cityCopy(
      'Bloomfield',
      'Essex',
      'house',
      {
        en: 'House Cleaning in Bloomfield, NJ | Genesis Cleaning',
        es: 'Limpieza de Casas en Bloomfield, NJ | Genesis Cleaning'
      },
      {
        en: 'House cleaning in Bloomfield, Essex County, NJ. Rooms, stairs and finish quoted to this house, not a package. Call (882) 930-0319. No published rates.',
        es: 'Limpieza de casas en Bloomfield, condado de Essex, NJ. Habitaciones, escaleras y acabados cotizados a esta casa. Llama al (882) 930-0319. Se habla español.'
      },
      {
        en: 'Genesis cleans houses in Bloomfield, Essex County — colonials, capes, and the rooms that actually get used. We quote the house in front of us, not a county average. WhatsApp the town, beds/baths, and whether this is a one-time visit.',
        es: 'Genesis limpia casas en Bloomfield, condado de Essex: colonials, capes y las habitaciones que de verdad se usan. Cotizamos la casa que tienes, no un promedio del condado. Por WhatsApp dinos el pueblo, recámaras/baños y si es una visita única.'
      },
      { en: 'We clean houses in Bloomfield', es: 'Limpiamos casas en Bloomfield' }
    )
  },
  {
    slug: 'elizabeth',
    city: 'Elizabeth',
    county: 'Union',
    countySlug: 'union-county',
    nearby: nearby('Elizabeth', UNION, ['Linden', 'Hillside', 'Roselle']),
    apartmentFirst: false,
    variant: 'shop',
    relatedSlug: 'commercial-cleaning',
    copy: cityCopy(
      'Elizabeth',
      'Union',
      'shop',
      {
        en: 'Home & Storefront Cleaning in Elizabeth, NJ | Genesis',
        es: 'Limpieza de Casas y Locales en Elizabeth | Genesis'
      },
      {
        en: 'Home and storefront cleaning in Elizabeth, Union County, NJ. Houses and shops are separate visits, quoted to the hours that work. Call (882) 930-0319.',
        es: 'Limpieza de casas y locales en Elizabeth, condado de Union, NJ. Casa y negocio son visitas distintas, cotizadas al horario. Llama al (882) 930-0319 hoy.'
      },
      {
        en: 'Genesis cleans homes and street-level businesses in Elizabeth. Houses get a room-by-room visit; storefronts get a scope that fits opening hours. WhatsApp whether this is a home or a shop and we quote from there.',
        es: 'Genesis limpia casas y negocios a pie de calle en Elizabeth. En casas, habitación por habitación; en locales, un alcance que cabe en el horario. Por WhatsApp dinos si es casa o negocio y cotizamos desde ahí.'
      },
      { en: 'We clean homes and storefronts in Elizabeth', es: 'Limpiamos casas y locales en Elizabeth' }
    )
  },
  {
    slug: 'edison',
    city: 'Edison',
    county: 'Middlesex',
    countySlug: 'middlesex-county',
    nearby: nearby('Edison', MIDDLESEX, ['Woodbridge', 'Metuchen', 'Piscataway']),
    apartmentFirst: false,
    variant: 'shop',
    relatedSlug: 'commercial-cleaning',
    copy: cityCopy(
      'Edison',
      'Middlesex',
      'shop',
      {
        en: 'Home & Storefront Cleaning in Edison, NJ | Genesis',
        es: 'Limpieza de Casas y Locales en Edison, NJ | Genesis'
      },
      {
        en: 'Home and storefront cleaning in Edison, Middlesex County, NJ. Houses and corridor shops quoted as separate visits. Free quote: (882) 930-0319. Se habla español.',
        es: 'Limpieza de casas y locales en Edison, condado de Middlesex, NJ. Casa y local del corredor son visitas distintas. Cotización: (882) 930-0319. Se habla español.'
      },
      {
        en: 'Genesis cleans homes and street-level businesses in Edison. Houses get a room-by-room visit; storefronts get a scope that fits opening hours. WhatsApp whether this is a home or a shop and we quote from there.',
        es: 'Genesis limpia casas y negocios a pie de calle en Edison. En casas, habitación por habitación; en locales, un alcance que cabe en el horario. Por WhatsApp dinos si es casa o negocio y cotizamos desde ahí.'
      },
      { en: 'We clean homes and storefronts in Edison', es: 'Limpiamos casas y locales en Edison' }
    )
  }
];
