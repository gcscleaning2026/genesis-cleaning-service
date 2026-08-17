/**
 * Language data: canonical origin, per-language <head> copy, WhatsApp deep-link text
 * and the Spanish dictionary.
 *
 * Split out of site-content.ts on purpose: the client runtime needs the dictionary,
 * and importing it from the same module as the ~96 KB SITE_HTML string would drag
 * that string into the browser bundle.
 */

export type Lang = 'en' | 'es';
// Canonical origin for the deployment. Change this and the sitemap/robots files
// together when the site moves to its own domain.
export const SITE_ORIGIN = 'https://genesis-cleaning-service.vercel.app';

// Per-language <head> copy. Consumed by scripts/prerender.mjs when it writes the
// static / and /es pages, and by App.tsx when the visitor flips language in place.
export const HEAD = {
  en: {
    path: '/',
    lang: 'en',
    locale: 'en_US',
    title: 'Genesis Cleaning Service LLC | Professional Residential & Commercial Cleaning in New Jersey',
    desc: 'Genesis Cleaning Service LLC (GCS): residential, commercial, construction and window cleaning across New Jersey. Aquí se habla español. Call or WhatsApp +1 (908) 338-3160.',
    ogTitle: 'Genesis Cleaning Service LLC | Professional Cleaning You Can Trust',
    ogDesc: 'Residential, commercial, construction and window cleaning in New Jersey. Los detalles hacen la diferencia. Aquí se habla español.'
  },
  es: {
    path: '/es',
    lang: 'es',
    locale: 'es_US',
    title: 'Genesis Cleaning Service LLC | Limpieza Profesional Residencial y Comercial en Nueva Jersey',
    desc: 'Genesis Cleaning Service LLC (GCS): limpieza residencial, comercial, post-construcción y de ventanas en Nueva Jersey. Aquí se habla español. Llama o escribe por WhatsApp al +1 (908) 338-3160.',
    ogTitle: 'Genesis Cleaning Service LLC | Limpieza profesional en la que puedes confiar',
    ogDesc: 'Limpieza residencial, comercial, post-construcción y de ventanas en Nueva Jersey. Los detalles hacen la diferencia. Aquí se habla español.'
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
  'nav.why': 'Por qué GCS',
  'nav.contact': 'Contacto',
  'cta.quote': 'Cotización gratis',
  'cta.quoteshort': 'Cotizar',
  'cta.call': 'Llama al (908) 338-3160',
  'cta.callshort': 'Llamar',
  'cta.email': 'Correo',
  'hero.h1a': 'Limpieza profesional',
  'hero.h1b': 'en la que puedes confiar',
  'hero.sub': 'Limpieza residencial y comercial confiable para casas y negocios en Nueva Jersey, con la atención a los detalles que hacen la diferencia.',
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
  'svc.h2': 'Cuatro formas de mantener limpio tu espacio',
  'svc.1.t': 'Limpieza Residencial',
  'svc.1.b': 'Casas y apartamentos limpiados cuarto por cuarto: cocinas, baños, pisos y áreas comunes, en el horario que mejor te funcione.',
  'svc.2.t': 'Limpieza Comercial',
  'svc.2.b': 'Oficinas, locales y espacios compartidos siempre presentables para tu equipo y tus clientes, con horarios que se ajustan a tu operación.',
  'svc.3.t': 'Limpieza de Construcción',
  'svc.3.b': 'Limpieza después de obra o remodelación: retiramos polvo, escombros y residuos para que el espacio quede listo para entregar.',
  'svc.4.t': 'Limpieza de Ventanas',
  'svc.4.b': 'Vidrios interiores y exteriores sin marcas ni rayas, para que la luz natural entre como debe ser.',
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
  'contact.area': 'Área de servicio',
  'contact.areaval': 'Nueva Jersey',
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
  'foot.tag': 'Limpieza profesional, confianza y calidad para casas y negocios en Nueva Jersey. Los detalles hacen la diferencia.',
  'foot.lang': 'Idioma',
  'foot.copy': '© 2026 Genesis Cleaning Service LLC. Todos los derechos reservados.',
  'a11y.langgroup': 'Idioma',
  'a11y.menu': 'Abrir menú',
  'a11y.quickcontact': 'Contacto rápido'
};
