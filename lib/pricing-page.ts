/**
 * /pricing — how a quote works. No fake dollar amounts, no Product schema, no priceRange.
 */
import type { Copy } from './page-types';
import type { Lang } from './i18n';

export type PricingCopy = Copy & {
  napLine: string;
};

export const PRICING: Record<Lang, PricingCopy> = {
  en: {
    name: 'Pricing',
    title: 'Quotes for Cleaning in New Jersey | Genesis Cleaning',
    desc: 'Cleaning quotes in Essex, Union, Morris, Middlesex and Hudson County, NJ. We send a number for your space — no published rates. Call (882) 930-0319. WhatsApp.',
    h1: 'How a Genesis cleaning quote works',
    intro:
      'We do not publish rates. You get a number for your space after we know the town, the type of property, and the job. WhatsApp or call now, or send the short form — we reply by phone or WhatsApp.',
    sections: [
      {
        h2: 'What we need before we can price the job',
        body: 'We send a number for your space after we know the job. These are the facts that change it — not a chart on the website.\n- Size of the space — square footage, or beds if that is how you know the house.\n- Kitchens and bathrooms — how many, and how hard they have been used.\n- Condition (lived-in vs empty vs post-work) — a reset is a different visit from a house that is already kept.\n- Access, parking, elevators, COI — how we get in, and whether the building asks for paperwork.\n- One visit or a standing plan — a one-time job is quoted here; a repeating calendar is [standard cleaning](/services/standard-cleaning).\n- Supplies included unless you say otherwise — say on WhatsApp if we must use a product you already have.'
      },
      {
        h2: 'Phone, WhatsApp, or the form',
        body: 'Three ways to get the number. WhatsApp stays the main button. Call (882) 930-0319 if you would rather talk. The short form is for people who will not open WhatsApp — we still reply by phone or WhatsApp. We do not publish rates.'
      },
      {
        h2: 'What we quote',
        body: 'These pages explain the job. Prices still come in the quote. House cleaning, commercial cleaning, and office cleaning are linked below. Standing plans are [standard cleaning](/services/standard-cleaning).'
      }
    ],
    includesH2: 'How to reach us',
    includes: [
      'WhatsApp with ZIP, property type, and what you need',
      'Call (882) 930-0319',
      'Short form on this page',
      'We reply by phone or WhatsApp',
      'We do not publish rates',
      'Aquí se habla español'
    ],
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
    napLine: 'Genesis Cleaning Service LLC · Orange, NJ 07050 · (882) 930-0319 · service@gcscleaning.net'
  },
  es: {
    name: 'Precios',
    title: 'Cotizaciones de Limpieza NJ | Genesis Cleaning Service',
    desc: 'Cotizaciones de limpieza en Essex, Union, Morris, Middlesex y Hudson, NJ. Un número para tu espacio — sin tarifas publicadas. Llama al (882) 930-0319.',
    h1: 'Cómo funciona una cotización de Genesis',
    intro:
      'No publicamos tarifas. Recibes un número para tu espacio cuando sabemos el pueblo, el tipo de propiedad y el trabajo. WhatsApp o llama ahora, o envía el formulario corto — respondemos por teléfono o WhatsApp.',
    sections: [
      {
        h2: 'Qué necesitamos para cotizar el trabajo',
        body: 'Enviamos un número para tu espacio cuando sabemos el trabajo. Esto es lo que lo cambia — no una tabla en el sitio.\n- Tamaño del espacio — pies cuadrados, o recámaras si así conoces la casa.\n- Cocinas y baños — cuántos, y cómo se han usado.\n- Estado (habitado, vacío o post-obra) — un reset no es la misma visita que una casa ya mantenida.\n- Acceso, estacionamiento, ascensores, COI — cómo entramos, y si el edificio pide papeles.\n- Una visita o un plan fijo — el trabajo de una vez se cotiza aquí; el calendario que se repite es [limpieza estándar](/es/services/standard-cleaning).\n- Suministros incluidos salvo que indiques lo contrario — dínoslo por WhatsApp si hay que usar un producto que ya tienes.'
      },
      {
        h2: 'Teléfono, WhatsApp o el formulario',
        body: 'Tres caminos para el número. WhatsApp sigue siendo el botón principal. Llama al (882) 930-0319 si prefieres hablar. El formulario corto es para quien no abre WhatsApp: igual respondemos por teléfono o WhatsApp. No publicamos tarifas.'
      },
      {
        h2: 'Qué cotizamos',
        body: 'Estas páginas explican el trabajo. El precio sigue yendo en la cotización. Limpieza de casas, limpieza comercial y limpieza de oficinas están enlazadas abajo. Los planes fijos son [limpieza estándar](/es/services/standard-cleaning).'
      }
    ],
    includesH2: 'Cómo contactarnos',
    includes: [
      'WhatsApp con ZIP, tipo de propiedad y lo que necesitas',
      'Llama al (882) 930-0319',
      'Formulario corto en esta página',
      'Respondemos por teléfono o WhatsApp',
      'No publicamos tarifas',
      'Aquí se habla español'
    ],
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
    napLine: 'Genesis Cleaning Service LLC · Orange, NJ 07050 · (882) 930-0319 · service@gcscleaning.net'
  }
};
