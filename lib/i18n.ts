/**
 * Language data: canonical origin, per-language <head> copy, WhatsApp deep-link text
 * and the Spanish dictionary.
 *
 * Split out of site-content.ts on purpose: the client runtime needs the dictionary,
 * and importing it from the same module as the ~96 KB SITE_HTML string would drag
 * that string into the browser bundle.
 */

export type Lang = 'en' | 'es';
// Canonical origin for the deployment. app/robots.ts, app/sitemap.ts and the <head> and
// JSON-LD in components/site-document.tsx all read it, so every self-referential URL the
// site publishes comes from this one line. It is the www host rather than the apex because
// that is what is actually served: gcscleaning.net answers with a 308 to www, and a
// canonical pointing at a redirect is a canonical pointing away from the served page.
export const SITE_ORIGIN = 'https://www.gcscleaning.net';

// Per-language <head> copy, consumed by components/site-document.tsx.
//
// `title` and `desc` are what a search result shows, and both are cut to fit: roughly 60
// characters of title and 160 of description. That budget is why the brand is last rather
// than first — nobody finds this business by typing its name, they type the service and
// the state, so the words that have to survive the truncation are those. `ogTitle` and
// `ogDesc` are the shared-link card instead, which has room, so they lead with the name.
export const HEAD = {
  en: {
    path: '/',
    lang: 'en',
    locale: 'en_US',
    title: 'House & Commercial Cleaning in New Jersey | Genesis Cleaning',
    desc: 'Residential, commercial, construction and window cleaning in Essex, Union, Morris, Middlesex & Hudson County, NJ. Free quote: (882) 930-0319. Se habla español.',
    ogTitle: 'Genesis Cleaning Service LLC | Professional Cleaning You Can Trust',
    ogDesc: 'Residential, commercial, construction and window cleaning across Essex, Union, Morris, Middlesex and Hudson County, NJ. Aquí se habla español.'
  },
  es: {
    path: '/es',
    lang: 'es',
    locale: 'es_US',
    title: 'Limpieza Residencial y Comercial en Nueva Jersey | Genesis',
    desc: 'Limpieza residencial, comercial, post-construcción y de ventanas en Essex, Union, Morris, Middlesex y Hudson, NJ. Cotización gratis: (882) 930-0319.',
    ogTitle: 'Genesis Cleaning Service LLC | Limpieza profesional en la que puedes confiar',
    ogDesc: 'Limpieza residencial, comercial, post-construcción y de ventanas en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Aquí se habla español.'
  }
};

// WhatsApp deep-link message per language, mirrored from GenesisSite.WA so the
// prerendered markup carries the right link before the bundle runs.
export const WA_TEXT = {
  en: 'Hello, I am interested in cleaning services and would like to request a quote.',
  es: 'Hola, estoy interesado/a en sus servicios de limpieza y me gustaría solicitar una cotización.'
};

export const ES: Record<string, string> = {
  'nav.home': 'Inicio',
  'nav.services': 'Servicios',
  'nav.areas': 'Áreas de servicio',
  'nav.pricing': 'Precios',
  'nav.house': 'Limpieza de casas',
  'nav.commercial': 'Limpieza comercial',
  'nav.why': 'Por qué GCS',
  'nav.faq': 'Preguntas frecuentes',
  'nav.contact': 'Contacto',
  'cta.quote': 'Cotización gratis',
  'cta.quoteshort': 'Cotizar',
  'cta.call': 'Llama al (882) 930-0319',
  'cta.callshort': 'Llamar',
  'cta.email': 'Correo',
  'hero.h1a': 'Limpieza de casas y negocios',
  'hero.h1b': 'en Nueva Jersey',
  'hero.sub': 'Limpieza de casas, limpieza de oficinas y limpieza post-construcción en los condados de Essex, Union, Morris, Middlesex y Hudson, con la atención a los detalles que hacen la diferencia.',
  'val.h2': 'Lo que nos define',
  'val.1.t': 'Profesionalismo',
  'val.1.b': 'Un proceso cuidadoso y consistente en cada trabajo, residencial o comercial.',
  'val.2.t': 'Confianza',
  'val.2.b': 'Comunicación clara antes, durante y después del trabajo.',
  'val.3.t': 'Calidad',
  'val.3.b': 'Terminamos un espacio cuando se ve como nos gustaría ver el nuestro.',
  'val.4.t': 'Atención al detalle',
  'val.4.b': 'Los detalles hacen la diferencia: las esquinas, los bordes y las superficies que casi siempre se pasan por alto.',
  'svc.eyebrow': 'Nuestros servicios',
  'svc.h2': 'Doce formas de mantener limpio tu espacio',
  'svc.sub': 'Doce servicios en Nueva Jersey, cada uno cotizado contra el espacio que tenemos enfrente y no contra un paquete al que tengas que ajustarte.',
  'svc.1.t': 'Limpieza de casas',
  'svc.commercial.t': 'Limpieza comercial',
  'svc.commercial.b': 'Locales, estudios, pisos de gimnasio, showrooms y obras — cotizado al horario en que no hay público. Las oficinas siguen en limpieza de oficinas.',
  'svc.1.b': 'Genesis limpia casas en cinco condados de Nueva Jersey: cocina, baños, pisos y salas, cotizado por la casa que tienes.',
  'svc.2.t': 'Limpieza de Ventanas Interiores y Exteriores',
  'svc.2.b': 'Vidrios lavados por las dos caras, con marcos y repisas incluidos, hasta que nada se interponga entre el cuarto y la luz del día.',
  'svc.3.t': 'Limpieza Estándar',
  'svc.3.b': 'El paso semanal o mensual constante que sostiene un lugar entre los trabajos más pesados.',
  'svc.4.t': 'Limpieza de Mudanza, Entrada y Salida',
  'svc.4.b': 'Una unidad vacía devuelta a condiciones de habitarse antes de que las llaves pasen a quien sigue.',
  'svc.5.t': 'Limpieza de Oficinas',
  'svc.5.b': 'Escritorios, cocinas y pisos atendidos temprano, tarde o de noche, para que nadie tenga que trabajar a nuestro alrededor.',
  'svc.6.t': 'Limpieza de Apartamentos y Condominios',
  'svc.6.b': 'Trabajo cuidadoso a la escala de un espacio pequeño, donde cada rincón queda lo bastante cerca para notarse.',
  'svc.7.t': 'Limpieza Profunda',
  'svc.7.b': 'Para un lugar que se dejó pasar, o uno que recibe mucho tránsito a diario: lechada, rieles de ventana, el interior de los electrodomésticos, zócalos y lo que se haya juntado detrás.',
  'svc.8.t': 'Limpieza de Construcción y Casas Modelo',
  'svc.8.b': 'Polvo de yeso, marcas de adhesivo y escombros sobrantes retirados para que la unidad se pueda mostrar o dar por terminada.',
  'svc.9.t': 'Limpieza de Clubhouse',
  'svc.9.b': 'Salones, salas de eventos y áreas de amenidades listos para quien entre después.',
  'svc.10.t': 'Limpieza de Gimnasios y Centros de Acondicionamiento',
  'svc.10.b': 'Máquinas, colchonetas, espejos y vestidores repasados donde caen las manos y la piel.',
  'svc.11.t': 'Sanitización y Desinfección',
  'svc.11.b': 'Desinfección apuntada a donde cuenta: manijas de puerta, interruptores, llaves de agua, teclados y todo lo demás por donde pasan las manos en un día.',
  'svc.12.t': 'Limpieza de Rentas Vacacionales',
  'svc.12.b': 'Cambios el mismo día entre reservas, ropa de cama incluida, para que quien llegue encuentre un cuarto terminado.',
  'why.h2': 'Por qué nos vuelven a llamar',
  'why.sub': 'GCS se construyó sobre una sola idea, la que está en nuestro logo: los detalles hacen la diferencia.',
  'why.1.t': 'Atención al detalle',
  'why.1.b': 'El resultado se juzga en lo que casi nadie revisa: zócalos, rieles, manijas y bordes.',
  'why.2.t': 'Casas y negocios',
  'why.2.b': 'Un mismo equipo para tu casa, tu oficina y la obra después de la construcción.',
  'why.3.t': 'Servicio bilingüe',
  'why.3.b': 'Inglés o español, el idioma en el que te sientas más cómodo.',
  'why.4.t': 'Comunicación directa',
  'why.4.b': 'Llama o escribe por WhatsApp y habla con las personas que hacen el trabajo.',
  'why.5.t': 'Presentación profesional',
  'why.5.b': 'Llegamos preparados, trabajamos con cuidado alrededor de tus cosas y dejamos el espacio listo para usar.',
  'faq.eyebrow': 'Preguntas frecuentes',
  'faq.h2': 'Lo que necesitas saber antes de reservar',
  'faq.sub': 'Respuestas claras sobre nuestros suministros, el acceso a tu espacio, las mascotas, las cancelaciones y las cotizaciones.',
  'faq.1.q': '¿Ustedes traen los suministros?',
  'faq.1.a': 'Por supuesto, llevamos todo el equipo de limpieza necesario y de la mejor calidad.',
  'faq.2.q': '¿Necesito estar en casa?',
  'faq.2.a': 'No necesitas estar en casa para que hagamos el trabajo; nosotros nos encargamos de la limpieza.',
  'faq.3.q': '¿Se permiten mascotas?',
  'faq.3.a': 'No importa si tienes mascotas; podemos encargarnos de la limpieza.',
  'faq.4.q': '¿Hay cancelaciones?',
  'faq.4.a': 'Puedes cancelar con 24 horas de anticipación.',
  'faq.5.q': '¿Cómo funciona el precio?',
  'faq.5.a': 'El precio depende de los detalles de cada trabajo, por eso se incluye en tu cotización.',
  'es.p1': 'Llámanos o escríbenos por WhatsApp en español. Te atendemos en español desde la primera pregunta hasta el último detalle del trabajo.',
  'es.p2': 'Pide tu cotización en español, cuéntanos qué necesita tu espacio en español y recibe la respuesta en español. Sin traductores de por medio.',
  'es.cta': 'Escríbenos por WhatsApp',
  'cta.h2': '¿Listo para un espacio más limpio?',
  'cta.sub': 'Cuéntanos sobre tu casa, tu oficina o tu obra y te preparamos una cotización.',
  'contact.h2': 'Contacta a Genesis Cleaning Service',
  'contact.phone': 'Teléfono',
  'contact.email': 'Correo',
  'contact.social': 'Redes',
  'contact.web': 'Sitio web',
  'contact.base': 'Con base en',
  'contact.area': 'Área de servicio',
  'contact.areaval': 'Condados de Essex, Union, Morris, Middlesex y Hudson, NJ',
  'rev.eyebrow': 'Testimonios',
  'rev.h2': 'Lo que dicen de nosotros',
  'rev.sub': 'Casas, oficinas y obras que hemos limpiado.',
  'rev.prompt': '¿Limpiamos para ti?',
  'rev.leave': 'Deja tu reseña',
  'rev.name': 'Tu nombre',
  'rev.namePh': 'María R.',
  'rev.rating': 'Tu calificación',
  'rev.comment': 'Tu reseña',
  'rev.commentPh': 'Cuéntanos cómo estuvo la limpieza.',
  'rev.submit': 'Enviar reseña',
  'rev.close': 'Cerrar',
  'rev.note': 'Las reseñas se publican cuando Genesis las aprueba. De 8 a 80 palabras.',
  'rev.err': 'Escribe tu nombre y un comentario breve.',
  'rev.err.words': 'Escribe entre 8 y 80 palabras.',
  'rev.err.profanity': 'Reescribe tu comentario sin lenguaje ofensivo.',
  'rev.err.links': 'No se permiten enlaces ni correos en las reseñas.',
  'rev.err.rate': 'Ya enviaste una reseña recientemente. Inténtalo más tarde.',
  'rev.err.bot': 'No pudimos verificar este envío. Inténtalo de nuevo.',
  'rev.err.network': 'No pudimos enviar tu reseña. Inténtalo de nuevo.',
  'rev.thanks': 'Gracias. Tu reseña aparecerá cuando el dueño la apruebe.',
  'foot.tag': 'Limpieza profesional, confianza y calidad para casas y negocios en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Los detalles hacen la diferencia.',
  'foot.lang': 'Idioma',
  'foot.copy': '© 2026 Genesis Cleaning Service LLC. Todos los derechos reservados.',
  'a11y.skip': 'Saltar al contenido',
  'a11y.langgroup': 'Idioma',
  'a11y.menu': 'Abrir menú',
  'a11y.quickcontact': 'Contacto rápido'
};
