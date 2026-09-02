import type { Lang } from './i18n';
import type { Copy } from './page-types';

export type Wave1Service = {
  slug: string;
  icon: string;
  image: string;
  imageAlt: Record<Lang, string>;
  relatedSlugs: string[];
  relatedHelper: Record<Lang, string>;
  coverage: Record<Lang, string>;
  ctaH2: Record<Lang, string>;
  ctaSub: Record<Lang, string>;
  waText: Record<Lang, string>;
  copy: Record<Lang, Copy>;
};

export const HOUSE_CLEANING: Wave1Service = {
  slug: 'house-cleaning',
  icon: 'i-bold-house-line',
  image: 'gcs-svc-commercial-residential',
  imageAlt: {
    en: 'Bright open-plan living room and kitchen after a residential clean',
    es: 'Sala y cocina de planta abierta iluminadas después de una limpieza residencial'
  },
  relatedSlugs: [
    'standard-cleaning',
    'deep-cleaning',
    'move-in-move-out-cleaning',
    'apartment-condo-cleaning'
  ],
  relatedHelper: {
    en: 'Units, not houses, go to apartment cleaning.',
    es: 'Las unidades, no las casas, van a limpieza de apartamentos.'
  },
  coverage: {
    en: 'House cleaning in Essex, Union, Morris, Middlesex, and Hudson County, NJ.',
    es: 'Limpieza de casas en Essex, Union, Morris, Middlesex y Hudson, NJ.'
  },
  ctaH2: {
    en: 'Ready for a cleaner house?',
    es: '¿Listo para una casa más limpia?'
  },
  ctaSub: {
    en: 'Tell us the town, beds, and baths. We quote on WhatsApp or the phone.',
    es: 'Dinos el pueblo, recámaras y baños. Cotizamos por WhatsApp o por teléfono.'
  },
  waText: {
    en: 'Hello, I need a house cleaning quote in New Jersey.',
    es: 'Hola, necesito una cotización de limpieza de casa en Nueva Jersey.'
  },
  copy: {
    en: {
      name: 'House cleaning',
      title: 'House Cleaning in Five NJ Counties | Genesis Cleaning',
      desc: 'Genesis cleans houses across Essex, Union, Morris, Middlesex, and Hudson County, NJ. WhatsApp town, beds, and baths. Call (882) 930-0319. Se habla español.',
      h1: 'House cleaning in New Jersey',
      intro:
        'Genesis cleans houses across Essex, Union, Morris, Middlesex, and Hudson County — kitchens, baths, floors, and living rooms, quoted from the house you have, not a range. WhatsApp the town, beds and baths, and whether this is a one-time visit or you want a standing plan.',
      sections: [
        {
          h2: 'Kitchen, baths, floors, then the rest of the house',
          body: 'A house gets dirty in a fixed order, so the visit does too: kitchen, bathrooms, floors, then the rooms people actually live in. Counters and fixtures get wiped, baths get scrubbed rather than freshened, and floors are vacuumed and mopped by surface. Dusting, beds, and the rest of the house belong on the same visit — they are not a second product. You get a number for this house, not a published range. WhatsApp the town, beds, and baths.'
        },
        {
          h2: 'One visit, or a plan we come back on',
          body: 'Some houses need one reset. Others need the same crew to keep coming back. Either is fine — tell us which you want when you quote. If you want the same house on a repeating calendar, that standing plan lives on [standard cleaning](/services/standard-cleaning). This page is the house itself.'
        },
        {
          h2: 'Houses here, apartments on their own page',
          body: 'This page is single-family houses and the house-shaped stock in Essex and Morris. Towers, condos, and building rules are [apartment and condo cleaning](/services/apartment-condo-cleaning).'
        }
      ],
      includesH2: 'What a house visit covers',
      includes: ['Kitchen', 'Bathrooms', 'Floors', 'Living areas', 'Supplies included', 'Quoted for this house'],
      faq: [
        {
          q: 'Is house cleaning a one-time visit or a repeating plan?',
          a: 'Either. Message us the house and how often you want us there. Standing calendars are quoted on the standard cleaning page — this page is the house itself.'
        },
        {
          q: 'Do you bring the supplies?',
          a: 'Yes. Genesis brings the supplies for a normal house visit. If you need us to use a product you already have, say so on WhatsApp.'
        },
        {
          q: 'Can you clean if I have pets?',
          a: 'Yes. Tell us the pet and whether they will be home. We do not need you on site if we have a way in.'
        }
      ]
    },
    es: {
      name: 'Limpieza de casas',
      title: 'Limpieza de casas en Nueva Jersey | Genesis Cleaning',
      desc: 'Genesis limpia casas en Essex, Union, Morris, Middlesex y Hudson, NJ. Por WhatsApp dinos pueblo, recámaras y baños. (882) 930-0319. Aquí se habla español.',
      h1: 'Limpieza de casas en Nueva Jersey',
      intro:
        'Genesis limpia casas en los condados de Essex, Union, Morris, Middlesex y Hudson: cocina, baños, pisos y salas, cotizado por la casa que tienes, no por un rango. Por WhatsApp dinos el pueblo, recámaras y baños, y si es una visita única o quieres un plan fijo.',
      sections: [
        {
          h2: 'Cocina, baños, pisos y el resto de la casa',
          body: 'La casa se ensucia en un orden fijo, y la visita también: cocina, baños, pisos y luego las habitaciones que de verdad se usan. Encimeras y grifería se limpian, los baños se restregan (no se “refrescan”) y los pisos se aspiran y trapean según la superficie. El polvo, las camas y el resto de la casa van en la misma visita, no como otro producto. Recibes un número para esta casa, no un rango publicado. Por WhatsApp dinos el pueblo, recámaras y baños.'
        },
        {
          h2: 'Una visita, o un plan para volver',
          body: 'Algunas casas necesitan un reset. Otras necesitan que el mismo equipo vuelva. Las dos sirven; dínoslo al cotizar. Si quieres la misma casa en un calendario que se repite, ese plan está en [limpieza estándar](/es/services/standard-cleaning). Esta página es la casa.'
        },
        {
          h2: 'Casas aquí, apartamentos en su página',
          body: 'Esta página es vivienda unifamiliar y el stock tipo casa en Essex y Morris. Torres, condos y reglas de edificio son [limpieza de apartamentos y condos](/es/services/apartment-condo-cleaning).'
        }
      ],
      includesH2: 'Qué cubre una visita a casa',
      includes: ['Cocina', 'Baños', 'Pisos', 'Áreas de estar', 'Incluye suministros', 'Cotizado para esta casa'],
      faq: [
        {
          q: '¿La limpieza de casa es una visita o un plan que se repite?',
          a: 'Las dos. Dinos la casa y cada cuánto nos quieres. El calendario fijo se cotiza en la página de limpieza estándar; esta página es la casa.'
        },
        {
          q: '¿Ustedes traen los suministros?',
          a: 'Sí. Genesis lleva los suministros para una visita normal a casa. Si hay que usar un producto que ya tienes, dínoslo por WhatsApp.'
        },
        {
          q: '¿Pueden limpiar si hay mascotas?',
          a: 'Sí. Dinos la mascota y si va a estar en casa. No hace falta que tú estés si tenemos cómo entrar.'
        }
      ]
    }
  }
};

export const COMMERCIAL_CLEANING: Wave1Service = {
  slug: 'commercial-cleaning',
  icon: 'i-bold-buildings',
  image: 'gcs-svc-construction',
  imageAlt: {
    en: 'Interior of a building under construction before the final clean',
    es: 'Interior de un edificio en obra antes de la limpieza final'
  },
  relatedSlugs: ['office-cleaning', 'gym-cleaning', 'construction-cleaning', 'house-cleaning'],
  relatedHelper: {
    en: 'Offices use the office page. Homes use house cleaning.',
    es: 'Las oficinas usan la página de oficinas. Las casas, limpieza de casas.'
  },
  coverage: {
    en: 'Commercial cleaning in Essex, Union, Morris, Middlesex, and Hudson County, NJ.',
    es: 'Limpieza comercial en Essex, Union, Morris, Middlesex y Hudson, NJ.'
  },
  ctaH2: {
    en: 'Ready for a cleaner shop or job site?',
    es: '¿Listo para un local u obra más limpios?'
  },
  ctaSub: {
    en: 'Send the business type, town, and hours we can be inside.',
    es: 'Envía el tipo de negocio, el pueblo y el horario en que podemos entrar.'
  },
  waText: {
    en: 'Hello, I need a commercial cleaning quote for my business in New Jersey. Business type:',
    es: 'Hola, necesito una cotización de limpieza comercial para mi negocio en Nueva Jersey. Tipo de negocio:'
  },
  copy: {
    en: {
      name: 'Commercial cleaning',
      title: 'Commercial Cleaning for NJ Shops | Genesis Cleaning',
      desc: 'Genesis cleans shops, job sites, and showrooms across five New Jersey counties, usually after hours, on a written scope. (882) 930-0319. Se habla español.',
      h1: 'Commercial cleaning for New Jersey businesses',
      intro:
        'Genesis cleans shops, job sites, showrooms, and other businesses that are not an office floor — usually after hours, on a written scope. Offices have their own page. WhatsApp the business type, town, and the hours we can be in the space.',
      sections: [
        {
          h2: 'After hours, around your customers',
          body: 'A commercial visit runs when the public is gone — evening, overnight, or early morning. The scope is floors, restrooms, the surfaces customers see, and the back of house you name. It is not a desk farm. You get a written list for that window, and a number for that space, not a published rate. WhatsApp the business type, the town, and the hours we can be inside.'
        },
        {
          h2: 'Corridor shops, showrooms, and gyms we already clean',
          body: 'Along Route 1 and 287 through Edison, Woodbridge, and South Brunswick we already clean showrooms and light-industrial space. Offices on that corridor still go to [office cleaning](/services/office-cleaning). Showrooms and light-industrial stay here. Union County gyms and fitness rooms are a different product: [gym and fitness center cleaning](/services/gym-cleaning). Construction dust after a build or remodel is [construction and model home cleaning](/services/construction-cleaning). None of those towns get their own page from this copy.'
        },
        {
          h2: 'If it is an office, use the office page',
          body: 'Desks, meeting rooms, a facilities manager, and paper left where it is belong on [office workplace cleaning](/services/office-cleaning). Storefronts, studios, gym floors, showrooms, light-industrial, and job sites belong here. If you have a house and a shop, those are two quotes — the house is [house cleaning](/services/house-cleaning).'
        }
      ],
      includesH2: 'What a commercial visit is for',
      includes: [
        'After-hours window',
        'Customer-facing floors',
        'Restrooms',
        'Written scope',
        'Showrooms & shops',
        'Job sites'
      ],
      faq: [
        {
          q: 'Can you clean after we close?',
          a: 'Yes. Most commercial visits are evenings, overnight, or early morning. Put the hours the space is empty in WhatsApp with the town and business type.'
        },
        {
          q: 'How is a commercial visit different from office cleaning?',
          a: 'Office cleaning is desks, meeting rooms, and a facilities scope — that page is office cleaning. A commercial visit is the shop, gym, showroom, or job site: floors, restrooms, and the surfaces your customers see.'
        },
        {
          q: 'Do you have a bilingual crew?',
          a: 'Yes. Aquí se habla español. Ask for the job in Spanish on WhatsApp or at (882) 930-0319.'
        }
      ]
    },
    es: {
      name: 'Limpieza comercial',
      title: 'Limpieza comercial para negocios NJ | Genesis Cleaning',
      desc: 'Genesis limpia tiendas, obras y showrooms en cinco condados de Nueva Jersey, casi siempre fuera de horario. Llama al (882) 930-0319. Aquí se habla español.',
      h1: 'Limpieza comercial para negocios en Nueva Jersey',
      intro:
        'Genesis limpia tiendas, obras, showrooms y otros negocios que no son una planta de oficinas — casi siempre fuera de horario, con un alcance por escrito. Las oficinas tienen su propia página. Por WhatsApp dinos el tipo de negocio, el pueblo y el horario en que podemos entrar.',
      sections: [
        {
          h2: 'Fuera de horario, alrededor de tus clientes',
          body: 'La visita comercial entra cuando no hay público: noche, madrugada o muy temprano. El alcance son pisos, baños, lo que ve el cliente y el back of house que nombres. No es un mar de escritorios. Recibes una lista por escrito para esa ventana y un número para ese espacio, no una tarifa publicada. Por WhatsApp dinos el tipo de negocio, el pueblo y el horario en que podemos entrar.'
        },
        {
          h2: 'Locales del corredor, showrooms y gimnasios que ya limpiamos',
          body: 'En la Ruta 1 y la 287 por Edison, Woodbridge y South Brunswick ya limpiamos showrooms e industrial ligero. Las oficinas de ese corredor siguen en [limpieza de oficinas](/es/services/office-cleaning). Showrooms e industrial ligero se quedan aquí. Gimnasios y salas de fitness en Union son otro producto: [limpieza de gimnasios](/es/services/gym-cleaning). El polvo de obra o remodelación es [limpieza de obra y casas modelo](/es/services/construction-cleaning). Estos pueblos no ganan página propia por este texto.'
        },
        {
          h2: 'Si es una oficina, usa la página de oficinas',
          body: 'Escritorios, salas de juntas, un facilities manager y papeles donde están pertenecen a [limpieza de oficinas](/es/services/office-cleaning). Locales, estudios, pisos de gimnasio, showrooms, industrial ligero y obras pertenecen aquí. Si tienes casa y local, son dos cotizaciones: la casa es [limpieza de casas](/es/services/house-cleaning).'
        }
      ],
      includesH2: 'Para qué es una visita comercial',
      includes: [
        'Ventana fuera de horario',
        'Pisos de cara al cliente',
        'Baños',
        'Alcance por escrito',
        'Showrooms y locales',
        'Obras'
      ],
      faq: [
        {
          q: '¿Pueden limpiar cuando ya cerramos?',
          a: 'Sí. La mayoría de las visitas comerciales son de noche, madrugada o muy temprano. Pon en WhatsApp el horario en que el local está vacío, el pueblo y el tipo de negocio.'
        },
        {
          q: '¿En qué se diferencia una visita comercial de la limpieza de oficinas?',
          a: 'La de oficinas es escritorios, salas y un alcance de facilities — eso está en la página de oficinas. La visita comercial es el local, gimnasio, showroom u obra: pisos, baños y lo que ve el cliente.'
        },
        {
          q: '¿Tienen equipo bilingüe?',
          a: 'Sí. Aquí se habla español. Pide el trabajo en español por WhatsApp o al (882) 930-0319.'
        }
      ]
    }
  }
};

export const PRICING_COPY = {
  en: {
    name: 'Pricing',
    title: 'How Genesis Cleaning Quotes Work Across New Jersey',
    desc: 'Genesis does not publish cleaning rates. Share your ZIP, property type, and the job. We reply by phone or WhatsApp. Call (882) 930-0319. Se habla español.',
    h1: 'How a Genesis cleaning quote works',
    intro:
      'We do not publish rates. You get a number for your space after we know the town, the type of property, and the job. WhatsApp or call now, or send the short form — we reply by phone or WhatsApp.',
    factorsH2: 'What we need before we can price the job',
    factorsIntro: 'We send a number for your space after we know the job. These are the facts that change it — not a chart on the website.',
    factors: [
      { label: 'Size of the space', body: 'square footage, or beds if that is how you know the house.' },
      { label: 'Kitchens and bathrooms', body: 'how many, and how hard they have been used.' },
      { label: 'Condition (lived-in vs empty vs post-work)', body: 'a reset is a different visit from a house that is already kept.' },
      { label: 'Access, parking, elevators, COI', body: 'how we get in, and whether the building asks for paperwork.' },
      {
        label: 'One visit or a standing plan',
        body: 'a one-time job is quoted here; a repeating calendar is [standard cleaning](/services/standard-cleaning).'
      },
      { label: 'Supplies included unless you say otherwise', body: 'say on WhatsApp if we must use a product you already have.' }
    ],
    howH2: 'Phone, WhatsApp, or the form',
    howBody:
      'Three ways to get the number. WhatsApp stays the main button. Call (882) 930-0319 if you would rather talk. The short form is for people who will not open WhatsApp — we still reply by phone or WhatsApp. We do not publish rates.',
    quoteH2: 'Request a quote',
    quoteHelper: 'We reply by phone or WhatsApp. We do not publish rates.',
    whatH2: 'What we quote',
    whatIntro: 'These pages explain the job. Prices still come in the quote.',
    faqH2: 'Questions people ask',
    faq: [
      {
        q: 'Why isn’t there a price on this page?',
        a: 'Because the number depends on the space, the access, and the job. WhatsApp, call (882) 930-0319, or the form — we send a number, not a range on the website.'
      },
      {
        q: 'Can I get the quote in Spanish?',
        a: 'Yes. Aquí se habla español. Use WhatsApp, the phone, or the form in Spanish.'
      }
    ],
    ctaH2: 'Ready for a number on your job?',
    ctaSub: 'WhatsApp, call, or the form. No published rates.',
    waText: 'Hello, I would like a cleaning quote. I can share my ZIP, property type, and what I need.'
  },
  es: {
    name: 'Precios',
    title: 'Cómo funciona una cotización de Genesis | Precios NJ',
    desc: 'Genesis no publica tarifas. Envía ZIP, tipo de propiedad y el trabajo; respondemos por teléfono o WhatsApp. Llama al (882) 930-0319. Aquí se habla español.',
    h1: 'Cómo funciona una cotización de Genesis',
    intro:
      'No publicamos tarifas. Recibes un número para tu espacio cuando sabemos el pueblo, el tipo de propiedad y el trabajo. WhatsApp o llama ahora, o envía el formulario corto — respondemos por teléfono o WhatsApp.',
    factorsH2: 'Qué necesitamos para cotizar el trabajo',
    factorsIntro: 'Enviamos un número para tu espacio cuando sabemos el trabajo. Esto es lo que lo cambia — no una tabla en el sitio.',
    factors: [
      { label: 'Tamaño del espacio', body: 'pies cuadrados, o recámaras si así conoces la casa.' },
      { label: 'Cocinas y baños', body: 'cuántos, y cómo se han usado.' },
      { label: 'Estado (habitado, vacío o post-obra)', body: 'un reset no es la misma visita que una casa ya mantenida.' },
      { label: 'Acceso, estacionamiento, ascensores, COI', body: 'cómo entramos, y si el edificio pide papeles.' },
      {
        label: 'Una visita o un plan fijo',
        body: 'el trabajo de una vez se cotiza aquí; el calendario que se repite es [limpieza estándar](/es/services/standard-cleaning).'
      },
      { label: 'Suministros incluidos salvo que indiques lo contrario', body: 'dínoslo por WhatsApp si hay que usar un producto que ya tienes.' }
    ],
    howH2: 'Teléfono, WhatsApp o el formulario',
    howBody:
      'Tres caminos para el número. WhatsApp sigue siendo el botón principal. Llama al (882) 930-0319 si prefieres hablar. El formulario corto es para quien no abre WhatsApp: igual respondemos por teléfono o WhatsApp. No publicamos tarifas.',
    quoteH2: 'Pedir cotización',
    quoteHelper: 'Respondemos por teléfono o WhatsApp. No publicamos tarifas.',
    whatH2: 'Qué cotizamos',
    whatIntro: 'Estas páginas explican el trabajo. El precio sigue yendo en la cotización.',
    faqH2: 'Preguntas que nos hacen',
    faq: [
      {
        q: '¿Por qué no hay un precio en esta página?',
        a: 'Porque el número depende del espacio, el acceso y el trabajo. WhatsApp, llama al (882) 930-0319 o usa el formulario: te enviamos un número, no un rango en el sitio.'
      },
      {
        q: '¿Puedo recibir la cotización en español?',
        a: 'Sí. Aquí se habla español. Usa WhatsApp, el teléfono o el formulario en español.'
      }
    ],
    ctaH2: '¿Listo para un número para tu trabajo?',
    ctaSub: 'WhatsApp, llama o el formulario. Sin tarifas publicadas.',
    waText: 'Hola, me gustaría una cotización de limpieza. Puedo compartir mi ZIP, el tipo de propiedad y lo que necesito.'
  }
} as const;

export const WAVE1_SERVICES = [HOUSE_CLEANING, COMMERCIAL_CLEANING];
export const wave1ServiceBySlug = (slug: string) => WAVE1_SERVICES.find(page => page.slug === slug);
export const NAV_DROP_SLUGS = new Set(['residential-commercial-cleaning']);
