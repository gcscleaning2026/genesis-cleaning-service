/**
 * One page per service.
 *
 * The home page names twelve services in two sentences each, which is enough to choose
 * from and not enough to rank for. Somebody searching "move out cleaning New Jersey" is
 * not looking for a list of twelve things — they are looking for the one, so each service
 * gets a page that answers that search on its own terms and links back to the rest.
 */
import type { ServicePage } from './page-types';

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'residential-commercial-cleaning',
    icon: 'i-bold-house-line',
    image: 'gcs-svc-commercial-residential',
    imageAlt: {
      en: 'Bright open-plan living room and kitchen after a residential clean',
      es: 'Sala y cocina de planta abierta iluminadas después de una limpieza residencial'
    },
    copy: {
      en: {
        name: 'Residential & Commercial Cleaning',
        title: 'Residential & Commercial Cleaning in NJ | Genesis',
        desc: 'House cleaning and business cleaning across Essex, Union, Morris, Middlesex and Hudson County, NJ. Free quote: (882) 930-0319. Se habla español.',
        h1: 'Residential and commercial cleaning in New Jersey',
        intro:
          'The same crew cleans your house and your place of business. Booked as a standing weekly or monthly visit, or as a one-off when a space has gotten ahead of you, and worked room by room either way.',
        sections: [
          {
            h2: 'House cleaning, room by room',
            body: 'Kitchens, bathrooms, floors and living areas, in that order, because that is the order a house gets dirty in. Counters and fixtures wiped down, floors vacuumed and mopped, bathrooms scrubbed rather than freshened. Nothing is skipped because it was out of reach last time.'
          },
          {
            h2: 'Business cleaning around your hours',
            body: 'Storefronts, offices and shared spaces cleaned early, late or overnight, so your staff and your customers never have to step around a mop. The scope is agreed up front and it does not drift: you know what is being done each visit and what it costs before we start.'
          },
          {
            h2: 'One quote, against your actual space',
            body: 'Pricing follows the square footage, the condition and how often we come, not a package tier you have to fit yourself into. Tell us the rooms and the frequency and you get a number, not a range.'
          }
        ],
        includesH2: 'What a visit covers',
        includes: [
          'Kitchens: counters, sinks, appliance exteriors, cabinet fronts',
          'Bathrooms: toilets, showers, tubs, sinks, mirrors, floors',
          'Floors throughout, vacuumed and mopped by surface type',
          'Dusting: surfaces, sills, shelves and reachable fixtures',
          'Trash emptied and liners replaced',
          'All supplies and equipment brought by us'
        ],
        faq: [
          {
            q: 'Can one crew handle both my home and my office?',
            a: 'Yes. Most clients who book both keep them on the same schedule and the same invoice, which is usually why they asked in the first place.'
          },
          {
            q: 'Do I have to sign up for recurring visits?',
            a: 'No. One-off cleans are quoted the same way as standing visits. Recurring work costs less per visit because the space stays in better condition between them.'
          },
          {
            q: 'Do you bring the supplies?',
            a: 'Yes, all of it. Equipment and top-quality cleaning products come with the crew, so nothing needs to be waiting for us when we arrive.'
          }
        ]
      },
      es: {
        name: 'Limpieza Residencial y Comercial',
        title: 'Limpieza Residencial y Comercial en NJ | Genesis',
        desc: 'Limpieza de casas y de negocios en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Cotización gratis: (882) 930-0319.',
        h1: 'Limpieza residencial y comercial en Nueva Jersey',
        intro:
          'El mismo equipo limpia tu casa y tu negocio. Contratado como visita fija semanal o mensual, o como una sola cita cuando un espacio se te adelantó, y trabajado cuarto por cuarto en ambos casos.',
        sections: [
          {
            h2: 'Limpieza de casas, cuarto por cuarto',
            body: 'Cocinas, baños, pisos y áreas comunes, en ese orden, porque ese es el orden en que se ensucia una casa. Superficies y llaves repasadas, pisos aspirados y trapeados, baños tallados y no solo refrescados. Nada se salta por haber quedado fuera de alcance la vez anterior.'
          },
          {
            h2: 'Limpieza de negocios en tu horario',
            body: 'Locales, oficinas y espacios compartidos limpiados temprano, tarde o de noche, para que tu personal y tus clientes nunca tengan que esquivar un trapeador. El alcance se acuerda desde el principio y no se mueve: sabes qué se hace en cada visita y cuánto cuesta antes de empezar.'
          },
          {
            h2: 'Una cotización, contra tu espacio real',
            body: 'El precio sigue los metros, la condición y con qué frecuencia venimos, no un paquete al que tengas que ajustarte. Dinos los cuartos y la frecuencia y recibes un número, no un rango.'
          }
        ],
        includesH2: 'Qué cubre una visita',
        includes: [
          'Cocinas: superficies, fregaderos, exterior de electrodomésticos, frentes de gabinete',
          'Baños: inodoros, regaderas, tinas, lavabos, espejos, pisos',
          'Pisos en toda la casa, aspirados y trapeados según el material',
          'Sacudido: superficies, repisas, estantes y accesorios al alcance',
          'Basura vaciada y bolsas repuestas',
          'Todo el equipo y los productos los llevamos nosotros'
        ],
        faq: [
          {
            q: '¿Un mismo equipo puede atender mi casa y mi oficina?',
            a: 'Sí. Casi todos los clientes que contratan las dos las mantienen en el mismo calendario y en la misma factura, que suele ser la razón por la que preguntaron.'
          },
          {
            q: '¿Tengo que contratar visitas recurrentes?',
            a: 'No. Una sola limpieza se cotiza igual que una visita fija. El trabajo recurrente cuesta menos por visita porque el espacio se mantiene mejor entre una y otra.'
          },
          {
            q: '¿Ustedes traen los productos?',
            a: 'Sí, todo. El equipo y los productos de limpieza de alta calidad llegan con la cuadrilla, así que no hace falta que nada nos esté esperando.'
          }
        ]
      }
    }
  },
  {
    slug: 'window-cleaning',
    icon: 'i-bold-app-window',
    image: 'gcs-svc-window',
    imageAlt: {
      en: 'Gloved hand pulling a squeegee down a large window pane',
      es: 'Mano con guante pasando una escobilla por un cristal grande'
    },
    copy: {
      en: {
        name: 'Window Cleaning',
        title: 'Window Cleaning in New Jersey | Genesis Cleaning',
        desc: 'Interior and exterior window cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Frames and sills included. Quote: (882) 930-0319.',
        h1: 'Interior and exterior window cleaning in New Jersey',
        intro:
          'Glass washed on both faces, frames and sills included, until nothing stands between the room and the daylight. Homes, storefronts and offices, on ground floors and upper storeys reachable from the inside.',
        sections: [
          {
            h2: 'Both faces, or it is not finished',
            body: 'A window cleaned only on the inside still looks dirty from the inside, because the film you are seeing is usually on the other side. We do both faces on the same visit, then dry the edges, since a streak at the perimeter is what the eye finds first.'
          },
          {
            h2: 'Frames, sills and tracks',
            body: 'The channel a sash slides in collects more than the glass does: grit, dead insects, paint flakes and standing water. It is vacuumed out and wiped before the glass is touched, so nothing washes back down onto clean panes.'
          },
          {
            h2: 'On its own or with a clean',
            body: 'Window work is quoted per pane and can be booked by itself, added to a standard visit, or built into a deep clean or a move-out. Screens are washed separately on request.'
          }
        ],
        includesH2: 'What the visit covers',
        includes: [
          'Interior and exterior glass, washed and dried edge to edge',
          'Frames wiped down, inside and out',
          'Sills and sash tracks vacuumed and cleaned',
          'Standing water and drip marks dried off',
          'Screens washed on request',
          'Ladders and equipment supplied by us'
        ],
        faq: [
          {
            q: 'How high can you reach?',
            a: 'Ground floor and upper-storey windows that can be worked safely from inside or from a ladder. Anything needing rope access or a lift is outside what we take on.'
          },
          {
            q: 'How often should windows be done?',
            a: 'Twice a year suits most homes. Storefronts and anything near a main road usually need it quarterly, because road film builds faster than household dust.'
          },
          {
            q: 'Do you clean screens too?',
            a: 'On request, yes. They are washed and dried separately so they are not put back damp against clean glass.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Ventanas',
        title: 'Limpieza de Ventanas en Nueva Jersey | Genesis',
        desc: 'Limpieza de ventanas por dentro y por fuera en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Cotización: (882) 930-0319.',
        h1: 'Limpieza de ventanas interiores y exteriores en Nueva Jersey',
        intro:
          'Vidrios lavados por las dos caras, con marcos y repisas incluidos, hasta que nada se interponga entre el cuarto y la luz del día. Casas, locales y oficinas, en planta baja y en pisos altos alcanzables desde adentro.',
        sections: [
          {
            h2: 'Las dos caras, o no está terminado',
            body: 'Una ventana limpiada solo por dentro se sigue viendo sucia desde adentro, porque la película que estás viendo casi siempre está del otro lado. Hacemos las dos caras en la misma visita y secamos los bordes, ya que una raya en la orilla es lo primero que encuentra el ojo.'
          },
          {
            h2: 'Marcos, repisas y rieles',
            body: 'El canal por donde corre la hoja junta más que el vidrio: tierra, insectos, escamas de pintura y agua estancada. Se aspira y se limpia antes de tocar el vidrio, para que nada regrese lavado sobre los cristales ya limpios.'
          },
          {
            h2: 'Sola o junto con una limpieza',
            body: 'El trabajo de ventanas se cotiza por hoja y se puede contratar solo, agregar a una visita estándar, o integrar a una limpieza profunda o a una mudanza. Los mosquiteros se lavan aparte si los pides.'
          }
        ],
        includesH2: 'Qué cubre la visita',
        includes: [
          'Vidrio interior y exterior, lavado y secado de orilla a orilla',
          'Marcos repasados por dentro y por fuera',
          'Repisas y rieles aspirados y limpiados',
          'Agua estancada y marcas de escurrimiento secadas',
          'Mosquiteros lavados si los pides',
          'Escaleras y equipo puestos por nosotros'
        ],
        faq: [
          {
            q: '¿Hasta qué altura llegan?',
            a: 'Planta baja y ventanas de pisos altos que se puedan trabajar con seguridad desde adentro o desde una escalera. Lo que necesite arnés o plataforma queda fuera de lo que tomamos.'
          },
          {
            q: '¿Cada cuánto conviene limpiar las ventanas?',
            a: 'Dos veces al año le sirve a casi toda casa. Los locales y todo lo que esté cerca de una avenida suelen necesitarlo cada tres meses, porque la película de la calle se acumula más rápido que el polvo de casa.'
          },
          {
            q: '¿También limpian los mosquiteros?',
            a: 'Si los pides, sí. Se lavan y se secan aparte para no volver a colocarlos húmedos contra el vidrio limpio.'
          }
        ]
      }
    }
  },
  {
    slug: 'standard-cleaning',
    icon: 'i-bold-broom',
    image: 'gcs-svc-standard',
    imageAlt: {
      en: 'Person mopping the floor of a tidy, plant-filled living room',
      es: 'Persona trapeando el piso de una sala ordenada y llena de plantas'
    },
    copy: {
      en: {
        name: 'Standard Cleaning',
        title: 'Standard House Cleaning in New Jersey | Genesis',
        desc: 'Weekly, biweekly and monthly house cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Free quote: (882) 930-0319. Se habla español.',
        h1: 'Standard house cleaning in New Jersey',
        intro:
          'The steady weekly, biweekly or monthly pass that holds a place together between the heavier jobs. Same rooms, same checklist, same crew, so the house never gets far enough behind to need a deep clean.',
        sections: [
          {
            h2: 'What standard actually means',
            body: 'Kitchens and bathrooms cleaned properly, floors vacuumed and mopped, surfaces dusted and trash taken out. It is the maintenance pass, not the rescue: it assumes the house was cleaned last time and keeps it that way, which is why it costs less than a deep clean.'
          },
          {
            h2: 'The same crew each visit',
            body: 'Recurring work goes to the same people wherever the schedule allows. They stop needing to be told where things go, and that is most of the difference between a service that is fine and one you forget to think about.'
          },
          {
            h2: 'Frequency changes the price',
            body: 'Weekly costs less per visit than monthly, because less has built up in between. If you are not sure which you need, start monthly: moving up is easy, and discovering halfway through that a month was too long is not.'
          }
        ],
        includesH2: 'What a standard visit covers',
        includes: [
          'Kitchen: counters, sink, stovetop, appliance exteriors',
          'Bathrooms: toilet, shower, tub, sink, mirror, floor',
          'All floors vacuumed and mopped',
          'Dusting of surfaces, sills and reachable fixtures',
          'Beds made and visible clutter straightened',
          'Trash emptied, liners replaced'
        ],
        faq: [
          {
            q: 'How is this different from a deep clean?',
            a: 'A deep clean gets behind and inside things: grout, window tracks, appliance interiors, baseboards. A standard visit maintains what a deep clean already reached.'
          },
          {
            q: 'Do I need to be home?',
            a: 'No. Most recurring clients are not. Arrange access once and the visits carry on without you having to plan around them.'
          },
          {
            q: 'What if I need to skip a week?',
            a: 'Cancel up to 24 hours ahead and there is no charge. Skipping occasionally is normal and does not change your rate.'
          }
        ]
      },
      es: {
        name: 'Limpieza Estándar',
        title: 'Limpieza de Casas en Nueva Jersey | Genesis',
        desc: 'Limpieza de casas semanal, quincenal y mensual en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Cotización: (882) 930-0319.',
        h1: 'Limpieza estándar de casas en Nueva Jersey',
        intro:
          'El paso constante semanal, quincenal o mensual que sostiene un lugar entre los trabajos más pesados. Los mismos cuartos, la misma lista, el mismo equipo, para que la casa nunca se atrase lo suficiente como para necesitar una limpieza profunda.',
        sections: [
          {
            h2: 'Qué significa estándar en realidad',
            body: 'Cocinas y baños limpiados como se debe, pisos aspirados y trapeados, superficies sacudidas y basura afuera. Es el paso de mantenimiento, no el rescate: da por hecho que la casa se limpió la vez anterior y la mantiene así, y por eso cuesta menos que una limpieza profunda.'
          },
          {
            h2: 'El mismo equipo en cada visita',
            body: 'El trabajo recurrente va con las mismas personas siempre que el calendario lo permita. Dejan de necesitar que les digan dónde va cada cosa, y ahí está casi toda la diferencia entre un servicio correcto y uno en el que ya no tienes que pensar.'
          },
          {
            h2: 'La frecuencia cambia el precio',
            body: 'Semanal cuesta menos por visita que mensual, porque se acumuló menos entre una y otra. Si no sabes cuál necesitas, empieza mensual: subir es fácil, y darte cuenta a media marcha de que un mes era demasiado no lo es.'
          }
        ],
        includesH2: 'Qué cubre una visita estándar',
        includes: [
          'Cocina: superficies, fregadero, estufa, exterior de electrodomésticos',
          'Baños: inodoro, regadera, tina, lavabo, espejo, piso',
          'Todos los pisos aspirados y trapeados',
          'Sacudido de superficies, repisas y accesorios al alcance',
          'Camas tendidas y desorden visible acomodado',
          'Basura vaciada y bolsas repuestas'
        ],
        faq: [
          {
            q: '¿En qué se diferencia de una limpieza profunda?',
            a: 'Una limpieza profunda entra detrás y adentro de las cosas: lechada, rieles de ventana, interior de electrodomésticos, zócalos. La visita estándar mantiene lo que la profunda ya alcanzó.'
          },
          {
            q: '¿Tengo que estar en casa?',
            a: 'No. Casi ningún cliente recurrente lo está. Se acuerda el acceso una vez y las visitas siguen sin que tengas que organizarte alrededor de ellas.'
          },
          {
            q: '¿Y si necesito saltarme una semana?',
            a: 'Cancela hasta 24 horas antes y no hay cargo. Saltarse una de vez en cuando es normal y no cambia tu tarifa.'
          }
        ]
      }
    }
  },
  {
    slug: 'move-in-move-out-cleaning',
    icon: 'i-bold-truck',
    image: 'gcs-svc-move',
    imageAlt: {
      en: 'Packing boxes in an empty room being prepared for a move',
      es: 'Cajas de mudanza en un cuarto vacío que se prepara para entregar'
    },
    copy: {
      en: {
        name: 'Move-In & Move-Out Cleaning',
        title: 'Move-Out Cleaning in New Jersey | Genesis Cleaning',
        desc: 'Move-in and move-out cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Empty units returned to move-in condition. (882) 930-0319.',
        h1: 'Move-in and move-out cleaning in New Jersey',
        intro:
          'An empty unit brought back to move-in condition before the keys go to whoever is next. Booked by tenants at the end of a lease, by landlords between tenancies, and by buyers who would rather not inherit the last owner’s kitchen.',
        sections: [
          {
            h2: 'Empty is the whole point',
            body: 'A unit with nothing in it is the only chance anyone gets to clean inside the cabinets, behind the appliances and along the baseboards without working around furniture. That is the visit this is, so book it after the truck leaves rather than before.'
          },
          {
            h2: 'Written to the inspection, not to a guess',
            body: 'Most move-out cleans exist because a deposit is on the line or a walkthrough is scheduled. Tell us which, and the work is aimed at the places those get decided: oven interior, refrigerator, cabinet insides, grout, window tracks and the marks left behind furniture.'
          },
          {
            h2: 'Same-day turnarounds where the calendar allows',
            body: 'Move-outs and move-ins often land on the same day at the same address. Where the schedule allows we clean between them, so the incoming tenant walks into a finished unit rather than a cleaned-around one.'
          }
        ],
        includesH2: 'What a move-out clean covers',
        includes: [
          'Inside all cabinets, drawers and closets',
          'Oven, refrigerator and appliance interiors',
          'Bathrooms scrubbed: grout, tile, fixtures, tub and shower',
          'Baseboards, door frames, switch plates and light fixtures',
          'Window interiors, sills and tracks',
          'Floors vacuumed and mopped last, after everything above'
        ],
        faq: [
          {
            q: 'When should I book it?',
            a: 'After the unit is empty and before the walkthrough. Cleaning around remaining furniture leaves exactly the marks an inspection looks for.'
          },
          {
            q: 'Will this get my deposit back?',
            a: 'We cannot promise what a landlord decides, and nobody honestly can. What we can do is clean the places deposits are usually withheld over, and tell you up front if something is damage rather than dirt.'
          },
          {
            q: 'Do you do both ends of a move?',
            a: 'Yes. Out of the old place and into the new one, on the same booking, is common and usually cheaper than arranging them separately.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Mudanza',
        title: 'Limpieza de Mudanza en Nueva Jersey | Genesis',
        desc: 'Limpieza de entrada y salida de mudanza en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Cotización: (882) 930-0319.',
        h1: 'Limpieza de entrada y salida de mudanza en Nueva Jersey',
        intro:
          'Una unidad vacía devuelta a condiciones de habitarse antes de que las llaves pasen a quien sigue. La contratan inquilinos al terminar un contrato, dueños entre un inquilino y otro, y compradores que prefieren no heredar la cocina del anterior.',
        sections: [
          {
            h2: 'Que esté vacía es justo el punto',
            body: 'Una unidad sin nada adentro es la única oportunidad que alguien tiene de limpiar dentro de los gabinetes, detrás de los electrodomésticos y a lo largo de los zócalos sin trabajar rodeando muebles. Esta es esa visita, así que agéndala después de que se vaya el camión y no antes.'
          },
          {
            h2: 'Escrita para la inspección, no para adivinar',
            body: 'Casi toda limpieza de salida existe porque hay un depósito en juego o una revisión agendada. Dinos cuál, y el trabajo se apunta a donde eso se decide: interior del horno, refrigerador, adentro de los gabinetes, lechada, rieles de ventana y las marcas que dejaron los muebles.'
          },
          {
            h2: 'Cambios el mismo día cuando el calendario alcanza',
            body: 'Las salidas y las entradas caen seguido el mismo día en la misma dirección. Cuando el calendario lo permite limpiamos entre las dos, para que quien llega entre a una unidad terminada y no a una limpiada por encima.'
          }
        ],
        includesH2: 'Qué cubre una limpieza de salida',
        includes: [
          'Adentro de todos los gabinetes, cajones y clósets',
          'Interior de horno, refrigerador y electrodomésticos',
          'Baños tallados: lechada, azulejo, llaves, tina y regadera',
          'Zócalos, marcos de puerta, apagadores y lámparas',
          'Ventanas por dentro, repisas y rieles',
          'Pisos aspirados y trapeados al final, después de todo lo anterior'
        ],
        faq: [
          {
            q: '¿Cuándo debo agendarla?',
            a: 'Después de que la unidad esté vacía y antes de la revisión. Limpiar rodeando los muebles que quedan deja exactamente las marcas que busca una inspección.'
          },
          {
            q: '¿Esto me devuelve el depósito?',
            a: 'No podemos prometer lo que decide un dueño, y con honestidad nadie puede. Lo que sí hacemos es limpiar los lugares por los que suelen retener depósitos, y decirte desde el principio si algo es daño y no suciedad.'
          },
          {
            q: '¿Hacen los dos lados de la mudanza?',
            a: 'Sí. Salir del lugar anterior y entrar al nuevo, en la misma contratación, es común y normalmente sale más barato que agendarlas por separado.'
          }
        ]
      }
    }
  },
  {
    slug: 'office-cleaning',
    icon: 'i-bold-buildings',
    image: 'gcs-svc-office',
    imageAlt: {
      en: 'Open-plan office with desks and meeting areas',
      es: 'Oficina de planta abierta con escritorios y áreas de junta'
    },
    copy: {
      en: {
        name: 'Office Workplace Cleaning',
        title: 'Office Cleaning in New Jersey | Genesis Cleaning',
        desc: 'Office and workplace cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Early, late or overnight visits. Quote: (882) 930-0319.',
        h1: 'Office and workplace cleaning in New Jersey',
        intro:
          'Desks, kitchens and floors handled early, late or overnight, so nobody has to work around us. Standing visits for offices, agencies, clinics and shared workspaces across five New Jersey counties.',
        sections: [
          {
            h2: 'Outside your hours, by default',
            body: 'Most offices are cleaned before the first person arrives or after the last one leaves. That is the arrangement unless you ask for something else: it is faster for us, less disruptive for your staff, and it removes the awkwardness of cleaning a room somebody is sitting in.'
          },
          {
            h2: 'The surfaces that actually matter',
            body: 'A workplace is judged on the kitchen, the bathrooms and the meeting room, in that order, by everyone who walks through it. Those get the time. Desks are wiped where they are clear, floors are done every visit, and shared touch points are disinfected rather than dusted.'
          },
          {
            h2: 'A scope you can hand to a facilities manager',
            body: 'You get a written list of what happens each visit and how often the less-frequent items come round: interior glass, vents, under-desk floors, appliance interiors. Nothing is left to be argued about after the fact.'
          }
        ],
        includesH2: 'What an office visit covers',
        includes: [
          'Kitchen and break room: counters, sink, appliance exteriors, tables',
          'Bathrooms cleaned and restocked',
          'Desks and shared surfaces wiped where clear',
          'Touch points disinfected: handles, switches, lift buttons, rails',
          'All floors vacuumed and mopped',
          'Trash and recycling emptied, liners replaced'
        ],
        faq: [
          {
            q: 'Can you come outside business hours?',
            a: 'Yes, and usually that is what we recommend. Early morning, evening and overnight are all normal for us.'
          },
          {
            q: 'Do you clean employee desks?',
            a: 'We wipe what is clear and leave what is not. Papers and personal items are not moved unless you tell us otherwise in writing.'
          },
          {
            q: 'Can we start with one visit before committing?',
            a: 'Yes. A single visit is quoted the same way as a contract, and most recurring clients started that way.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Oficinas',
        title: 'Limpieza de Oficinas en Nueva Jersey | Genesis',
        desc: 'Limpieza de oficinas y lugares de trabajo en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Cotización: (882) 930-0319.',
        h1: 'Limpieza de oficinas y lugares de trabajo en Nueva Jersey',
        intro:
          'Escritorios, cocinas y pisos atendidos temprano, tarde o de noche, para que nadie tenga que trabajar a nuestro alrededor. Visitas fijas para oficinas, agencias, consultorios y espacios compartidos en cinco condados de Nueva Jersey.',
        sections: [
          {
            h2: 'Fuera de tu horario, por defecto',
            body: 'Casi toda oficina se limpia antes de que llegue la primera persona o después de que se va la última. Ese es el acuerdo salvo que pidas otra cosa: es más rápido para nosotros, menos molesto para tu personal, y quita lo incómodo de limpiar un cuarto donde alguien está sentado.'
          },
          {
            h2: 'Las superficies que de verdad importan',
            body: 'Un lugar de trabajo se juzga por la cocina, los baños y la sala de juntas, en ese orden, por todos los que pasan por ahí. A eso se le da el tiempo. Los escritorios se repasan donde están despejados, los pisos se hacen cada visita, y los puntos de contacto compartidos se desinfectan, no se sacuden.'
          },
          {
            h2: 'Un alcance que le puedes entregar a mantenimiento',
            body: 'Recibes una lista escrita de qué pasa en cada visita y cada cuánto vuelven los puntos menos frecuentes: vidrio interior, rejillas, pisos bajo escritorio, interior de electrodomésticos. Nada queda para discutirse después.'
          }
        ],
        includesH2: 'Qué cubre una visita de oficina',
        includes: [
          'Cocina y comedor: superficies, fregadero, exterior de electrodomésticos, mesas',
          'Baños limpiados y resurtidos',
          'Escritorios y superficies compartidas repasados donde estén despejados',
          'Puntos de contacto desinfectados: manijas, apagadores, botones de elevador, barandales',
          'Todos los pisos aspirados y trapeados',
          'Basura y reciclaje vaciados, bolsas repuestas'
        ],
        faq: [
          {
            q: '¿Pueden venir fuera del horario de oficina?',
            a: 'Sí, y normalmente es lo que recomendamos. Temprano, en la tarde y de noche son horarios normales para nosotros.'
          },
          {
            q: '¿Limpian los escritorios del personal?',
            a: 'Repasamos lo que está despejado y dejamos lo que no. Los papeles y las cosas personales no se mueven salvo que nos lo indiques por escrito.'
          },
          {
            q: '¿Podemos empezar con una sola visita antes de comprometernos?',
            a: 'Sí. Una visita se cotiza igual que un contrato, y casi todos los clientes recurrentes empezaron así.'
          }
        ]
      }
    }
  },
  {
    slug: 'apartment-condo-cleaning',
    icon: 'i-bold-building-apartment',
    image: 'gcs-svc-apartment',
    imageAlt: {
      en: 'Living room of a bright modern apartment',
      es: 'Sala de un apartamento moderno e iluminado'
    },
    copy: {
      en: {
        name: 'Apartment & Condo Cleaning',
        title: 'Apartment & Condo Cleaning in New Jersey | Genesis',
        desc: 'Apartment and condo cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Careful work at a smaller scale. (882) 930-0319.',
        h1: 'Apartment and condo cleaning in New Jersey',
        intro:
          'Careful work scaled to a smaller footprint, where every corner is close enough to notice. Studios, one-bedrooms and condos across Hudson, Essex and the rest of the five counties we cover.',
        sections: [
          {
            h2: 'Small spaces show everything',
            body: 'In a thousand square feet there is nowhere for a missed baseboard to hide. Apartments get the same checklist as a house and more attention per square foot, because that is what the scale demands rather than what it lets you get away with.'
          },
          {
            h2: 'Buildings with rules',
            body: 'Service elevators, loading windows, front-desk sign-in and quiet hours are normal in Jersey City, Hoboken and Newark towers. Tell us the building and we work inside its rules instead of finding them out on the day.'
          },
          {
            h2: 'Turnovers as well as upkeep',
            body: 'Recurring visits keep a unit in shape; move-out cleans get it ready to hand back. Landlords with several units in one building usually book them together, which is cheaper than one address at a time.'
          }
        ],
        includesH2: 'What an apartment visit covers',
        includes: [
          'Kitchen: counters, sink, stovetop, appliance exteriors',
          'Bathroom: toilet, shower, tub, sink, mirror, tile',
          'Floors vacuumed and mopped throughout',
          'Dusting of surfaces, sills, shelves and radiators',
          'Balcony sliders and interior glass wiped',
          'Trash taken to the building chute or bin'
        ],
        faq: [
          {
            q: 'Is a studio cheaper than a house?',
            a: 'Yes, though not proportionally. Kitchens and bathrooms take the same time regardless of how much floor surrounds them, and those are most of the work.'
          },
          {
            q: 'Can you work with my building’s access rules?',
            a: 'Yes. Front-desk sign-in, service elevator booking and certificate requirements are routine — just tell us before the first visit rather than on the day.'
          },
          {
            q: 'Do you clean several units in one building?',
            a: 'Often. Landlords and managers with multiple units book them on one visit, which cuts the travel time out of the price.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Apartamentos y Condominios',
        title: 'Limpieza de Apartamentos en Nueva Jersey | Genesis',
        desc: 'Limpieza de apartamentos y condominios en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Cotización: (882) 930-0319.',
        h1: 'Limpieza de apartamentos y condominios en Nueva Jersey',
        intro:
          'Trabajo cuidadoso a la escala de un espacio pequeño, donde cada rincón queda lo bastante cerca para notarse. Estudios, unidades de una recámara y condominios en Hudson, Essex y el resto de los cinco condados que cubrimos.',
        sections: [
          {
            h2: 'Los espacios chicos enseñan todo',
            body: 'En cien metros no hay dónde se esconda un zócalo que se saltó. Los apartamentos llevan la misma lista que una casa y más atención por metro, porque eso es lo que exige la escala, no lo que te deja pasar.'
          },
          {
            h2: 'Edificios con reglas',
            body: 'Elevador de servicio, ventana de carga, registro en recepción y horas de silencio son normales en las torres de Jersey City, Hoboken y Newark. Dinos el edificio y trabajamos dentro de sus reglas en vez de descubrirlas el mismo día.'
          },
          {
            h2: 'Cambios de inquilino además del mantenimiento',
            body: 'Las visitas recurrentes mantienen la unidad; la limpieza de salida la deja lista para entregar. Los dueños con varias unidades en un mismo edificio suelen contratarlas juntas, que sale más barato que una dirección a la vez.'
          }
        ],
        includesH2: 'Qué cubre una visita de apartamento',
        includes: [
          'Cocina: superficies, fregadero, estufa, exterior de electrodomésticos',
          'Baño: inodoro, regadera, tina, lavabo, espejo, azulejo',
          'Pisos aspirados y trapeados en toda la unidad',
          'Sacudido de superficies, repisas, estantes y radiadores',
          'Puertas corredizas de balcón y vidrio interior repasados',
          'Basura llevada al ducto o al contenedor del edificio'
        ],
        faq: [
          {
            q: '¿Un estudio cuesta menos que una casa?',
            a: 'Sí, aunque no en proporción. Cocinas y baños toman el mismo tiempo sin importar cuánto piso los rodee, y ahí está casi todo el trabajo.'
          },
          {
            q: '¿Pueden trabajar con las reglas de acceso de mi edificio?',
            a: 'Sí. Registro en recepción, apartar elevador de servicio y requisitos de póliza son rutina; solo dinos antes de la primera visita y no el mismo día.'
          },
          {
            q: '¿Limpian varias unidades en un mismo edificio?',
            a: 'Seguido. Dueños y administradores con varias unidades las contratan en una sola visita, lo que quita el tiempo de traslado del precio.'
          }
        ]
      }
    }
  },
  {
    slug: 'deep-cleaning',
    icon: 'i-bold-sparkle',
    image: 'gcs-svc-deep',
    imageAlt: {
      en: 'Steam cleaner lifting grime from tiled bathroom walls',
      es: 'Limpiadora de vapor levantando mugre de una pared de azulejo'
    },
    copy: {
      en: {
        name: 'Deep Cleaning',
        title: 'Deep Cleaning Service in New Jersey | Genesis Cleaning',
        desc: 'Deep cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Grout, appliance interiors, baseboards, window tracks. (882) 930-0319.',
        h1: 'Deep cleaning in New Jersey',
        intro:
          'For a place that has been let go, or one that takes heavy traffic every day: grout, window tracks, appliance interiors, baseboards and whatever has gathered behind them. The visit that resets a house rather than maintaining it.',
        sections: [
          {
            h2: 'Behind and inside, not just across',
            body: 'A standard clean works the surfaces you see. A deep clean goes where dirt has had time to settle: the grout line rather than the tile, the inside of the oven rather than its door, the baseboard rather than the floor beside it, and the gap the refrigerator has been standing over.'
          },
          {
            h2: 'The right first visit for a new client',
            body: 'If a house has not been cleaned professionally in a while, a deep clean first and standard visits after is cheaper over a year than trying to catch up with maintenance passes. It also gives every visit after it a known starting point.'
          },
          {
            h2: 'It takes longer, and it is quoted that way',
            body: 'A deep clean runs two to three times the hours of a standard visit for the same square footage. That is the job, not an upsell — we will tell you which one your space actually needs when we quote it.'
          }
        ],
        includesH2: 'What a deep clean covers',
        includes: [
          'Grout and tile scrubbed in kitchens and bathrooms',
          'Oven, refrigerator and microwave interiors',
          'Baseboards, door frames, switch plates and vents',
          'Window interiors, sills and sash tracks',
          'Behind and under movable appliances and furniture',
          'Cabinet fronts, handles and reachable light fixtures'
        ],
        faq: [
          {
            q: 'How do I know if I need a deep clean or a standard one?',
            a: 'If you can name a room you have been avoiding, or nobody has cleaned inside the oven in a year, it is a deep clean. Tell us the condition honestly and we will say which it is.'
          },
          {
            q: 'How long does it take?',
            a: 'Two to three times a standard visit for the same space. A typical three-bedroom runs most of a day with a full crew.'
          },
          {
            q: 'Do I need one every year?',
            a: 'Only if standard visits stop between them. Houses on steady recurring cleaning rarely need another one.'
          }
        ]
      },
      es: {
        name: 'Limpieza Profunda',
        title: 'Limpieza Profunda en Nueva Jersey | Genesis',
        desc: 'Limpieza profunda en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. Lechada, electrodomésticos, zócalos. (882) 930-0319.',
        h1: 'Limpieza profunda en Nueva Jersey',
        intro:
          'Para un lugar que se dejó pasar, o uno que recibe mucho tránsito a diario: lechada, rieles de ventana, el interior de los electrodomésticos, zócalos y lo que se haya juntado detrás. La visita que reinicia una casa en vez de mantenerla.',
        sections: [
          {
            h2: 'Detrás y adentro, no solo por encima',
            body: 'Una limpieza estándar trabaja las superficies que ves. Una profunda va a donde la suciedad tuvo tiempo de asentarse: la línea de lechada y no el azulejo, el interior del horno y no su puerta, el zócalo y no el piso de junto, y el hueco sobre el que ha estado parado el refrigerador.'
          },
          {
            h2: 'La primera visita correcta para un cliente nuevo',
            body: 'Si una casa lleva tiempo sin limpieza profesional, una profunda primero y visitas estándar después sale más barato en un año que intentar ponerse al día con pasos de mantenimiento. Además le da a cada visita posterior un punto de partida conocido.'
          },
          {
            h2: 'Toma más tiempo, y así se cotiza',
            body: 'Una limpieza profunda lleva de dos a tres veces las horas de una visita estándar para los mismos metros. Ese es el trabajo, no una venta adicional: al cotizar te decimos cuál de las dos necesita de verdad tu espacio.'
          }
        ],
        includesH2: 'Qué cubre una limpieza profunda',
        includes: [
          'Lechada y azulejo tallados en cocinas y baños',
          'Interior de horno, refrigerador y microondas',
          'Zócalos, marcos de puerta, apagadores y rejillas',
          'Ventanas por dentro, repisas y rieles',
          'Detrás y debajo de electrodomésticos y muebles movibles',
          'Frentes de gabinete, manijas y lámparas al alcance'
        ],
        faq: [
          {
            q: '¿Cómo sé si necesito profunda o estándar?',
            a: 'Si puedes nombrar un cuarto que has estado evitando, o si nadie ha limpiado dentro del horno en un año, es profunda. Cuéntanos la condición con honestidad y te decimos cuál es.'
          },
          {
            q: '¿Cuánto tarda?',
            a: 'De dos a tres veces una visita estándar para el mismo espacio. Una casa típica de tres recámaras toma casi todo un día con la cuadrilla completa.'
          },
          {
            q: '¿Necesito una cada año?',
            a: 'Solo si las visitas estándar se interrumpen entre una y otra. Las casas con limpieza recurrente constante rara vez necesitan otra.'
          }
        ]
      }
    }
  },
  {
    slug: 'construction-cleaning',
    icon: 'i-bold-hard-hat',
    image: 'gcs-svc-construction',
    imageAlt: {
      en: 'Interior of a building under construction before the final clean',
      es: 'Interior de un edificio en obra antes de la limpieza final'
    },
    copy: {
      en: {
        name: 'Construction & Model Home Cleaning',
        title: 'Post-Construction Cleaning in New Jersey | Genesis',
        desc: 'Post-construction and model home cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Drywall dust and debris. (882) 930-0319.',
        h1: 'Post-construction and model home cleaning in New Jersey',
        intro:
          'Drywall dust, adhesive marks and leftover debris cleared out so the unit can be shown or signed off. Booked by builders, general contractors and remodellers who need a site to stop looking like one.',
        sections: [
          {
            h2: 'Drywall dust is not household dust',
            body: 'It is finer, it carries further and it settles again after you think you are done, which is why a post-construction clean is worked top down in passes rather than room by room in one go. Ceilings, ledges and vents first, floors last, and a second pass after the air has settled.'
          },
          {
            h2: 'Marks that come with a new build',
            body: 'Adhesive residue on glass, grout haze on new tile, sticker gum on appliances, paint flecks on hardware and the pencil marks left on trim. These are what separate a site that is swept from a unit that can be shown to a buyer.'
          },
          {
            h2: 'Rough, final or model-ready',
            body: 'Tell us which stage you are at. Rough clean between trades, final clean before handover, or a model-home standard where the unit has to photograph well and stay that way through weeks of walkthroughs.'
          }
        ],
        includesH2: 'What a post-construction clean covers',
        includes: [
          'Debris and leftover material removed from the unit',
          'Ceilings, ledges, vents and light fixtures dusted top down',
          'Adhesive residue, grout haze and sticker gum removed',
          'Windows, frames and tracks cleaned inside and out',
          'Cabinet and appliance interiors wiped out',
          'Floors vacuumed and mopped in a final pass'
        ],
        faq: [
          {
            q: 'Do you do rough cleans between trades?',
            a: 'Yes. Rough between trades, final before handover, or both. Booking both usually costs less than a single final clean on a site that was never touched.'
          },
          {
            q: 'Can you handle a multi-unit building?',
            a: 'Yes. Unit-by-unit across a floor or a building is priced per unit with the common areas quoted separately.'
          },
          {
            q: 'How soon before a walkthrough should you come?',
            a: 'A day ahead where possible. Fine dust settles for several hours after the last work is done, and cleaning too early means cleaning twice.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Construcción y Casas Modelo',
        title: 'Limpieza Post-Construcción en Nueva Jersey | Genesis',
        desc: 'Limpieza post-construcción y de casas modelo en los condados de Essex, Union, Morris, Middlesex y Hudson, NJ. (882) 930-0319.',
        h1: 'Limpieza post-construcción y de casas modelo en Nueva Jersey',
        intro:
          'Polvo de yeso, marcas de adhesivo y escombros sobrantes retirados para que la unidad se pueda mostrar o dar por terminada. La contratan constructoras, contratistas generales y remodeladores que necesitan que una obra deje de parecerlo.',
        sections: [
          {
            h2: 'El polvo de yeso no es polvo de casa',
            body: 'Es más fino, viaja más lejos y se vuelve a asentar cuando ya creías haber terminado, y por eso una limpieza post-obra se trabaja de arriba abajo en pasadas y no cuarto por cuarto de una sola vez. Techos, repisas y rejillas primero, pisos al final, y una segunda pasada cuando el aire ya se asentó.'
          },
          {
            h2: 'Las marcas que trae una obra nueva',
            body: 'Residuo de adhesivo en el vidrio, velo de lechada en azulejo nuevo, goma de etiqueta en electrodomésticos, salpicaduras de pintura en herrajes y las marcas de lápiz que quedan en las molduras. Eso es lo que separa una obra barrida de una unidad que se le puede mostrar a un comprador.'
          },
          {
            h2: 'Gruesa, final o lista para modelo',
            body: 'Dinos en qué etapa estás. Limpieza gruesa entre oficios, limpieza final antes de la entrega, o estándar de casa modelo, donde la unidad tiene que fotografiarse bien y quedarse así durante semanas de recorridos.'
          }
        ],
        includesH2: 'Qué cubre una limpieza post-construcción',
        includes: [
          'Escombro y material sobrante retirados de la unidad',
          'Techos, repisas, rejillas y lámparas sacudidos de arriba abajo',
          'Residuo de adhesivo, velo de lechada y goma de etiqueta removidos',
          'Ventanas, marcos y rieles limpiados por dentro y por fuera',
          'Interior de gabinetes y electrodomésticos repasado',
          'Pisos aspirados y trapeados en una pasada final'
        ],
        faq: [
          {
            q: '¿Hacen limpieza gruesa entre oficios?',
            a: 'Sí. Gruesa entre oficios, final antes de la entrega, o las dos. Contratar ambas suele costar menos que una sola limpieza final en una obra que nunca se tocó.'
          },
          {
            q: '¿Pueden con un edificio de varias unidades?',
            a: 'Sí. Unidad por unidad en un piso o en todo el edificio se cotiza por unidad, con las áreas comunes cotizadas aparte.'
          },
          {
            q: '¿Con cuánta anticipación al recorrido deben venir?',
            a: 'Un día antes cuando se pueda. El polvo fino sigue asentándose varias horas después del último trabajo, y limpiar demasiado pronto significa limpiar dos veces.'
          }
        ]
      }
    }
  },
  {
    slug: 'clubhouse-cleaning',
    icon: 'i-bold-armchair',
    image: 'gcs-svc-clubhouse',
    imageAlt: {
      en: 'Bright community clubhouse lounge with seating and tall windows',
      es: 'Salón comunitario iluminado con asientos y ventanales altos'
    },
    copy: {
      en: {
        name: 'Clubhouse Cleaning',
        title: 'Clubhouse & Amenity Cleaning in New Jersey | Genesis',
        desc: 'Clubhouse, lounge and amenity cleaning for NJ communities in Essex, Union, Morris, Middlesex and Hudson County. (882) 930-0319.',
        h1: 'Clubhouse and amenity cleaning in New Jersey',
        intro:
          'Lounges, party rooms and amenity floors kept ready for whoever walks in next. Booked by HOAs, property managers and residential communities where the clubhouse is the room every resident judges the building by.',
        sections: [
          {
            h2: 'Ready, not just cleaned',
            body: 'An amenity room is used at unpredictable hours by people who did not book it. That changes the job: furniture goes back where it belongs, cushions get straightened, the kitchen is reset and the bins are empty, so the room is presentable at any hour rather than only after a visit.'
          },
          {
            h2: 'Around events, not through them',
            body: 'Party rooms get booked and they get left in a state. We schedule the recurring visit against your calendar and take post-event cleans as separate call-outs, so a Saturday rental does not sit until Monday.'
          },
          {
            h2: 'The whole amenity floor',
            body: 'Lounge, kitchenette, package room, mail area, restrooms, corridors and the glass everyone puts their hands on. Quoted as one scope so nothing falls between contracts.'
          }
        ],
        includesH2: 'What a clubhouse visit covers',
        includes: [
          'Lounge and seating areas reset and wiped down',
          'Kitchenette: counters, sink, appliance exteriors, tables',
          'Restrooms cleaned and restocked',
          'Interior glass, doors and touch points',
          'Hard floors and carpets vacuumed and mopped',
          'Bins emptied and liners replaced'
        ],
        faq: [
          {
            q: 'Can you clean after resident events?',
            a: 'Yes. Post-event cleans are booked as call-outs on top of the recurring visit, including same-day where the schedule allows.'
          },
          {
            q: 'Do you cover the gym and pool areas too?',
            a: 'Gyms and fitness rooms, yes. Pool decks and wet areas are quoted separately depending on what the surfaces need.'
          },
          {
            q: 'Who do you invoice, the HOA or the manager?',
            a: 'Either. Most communities run it through the management company on one monthly invoice.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Clubhouse',
        title: 'Limpieza de Clubhouse en Nueva Jersey | Genesis',
        desc: 'Limpieza de clubhouse, salones y amenidades para comunidades en Essex, Union, Morris, Middlesex y Hudson, NJ. (882) 930-0319.',
        h1: 'Limpieza de clubhouse y amenidades en Nueva Jersey',
        intro:
          'Salones, salas de eventos y áreas de amenidades listos para quien entre después. Los contratan asociaciones de vecinos, administradores y comunidades residenciales donde el clubhouse es el cuarto por el que cada residente juzga el edificio.',
        sections: [
          {
            h2: 'Listo, no solo limpio',
            body: 'Un cuarto de amenidades lo usan a horas impredecibles personas que no lo apartaron. Eso cambia el trabajo: los muebles regresan a su lugar, los cojines se acomodan, la cocina se reinicia y los botes quedan vacíos, para que el cuarto se vea presentable a cualquier hora y no solo después de una visita.'
          },
          {
            h2: 'Alrededor de los eventos, no a través de ellos',
            body: 'Las salas de eventos se apartan y se dejan en un estado. Agendamos la visita recurrente contra tu calendario y tomamos las limpiezas post-evento como salidas aparte, para que una renta de sábado no se quede así hasta el lunes.'
          },
          {
            h2: 'Todo el piso de amenidades',
            body: 'Salón, cocineta, cuarto de paquetería, área de correo, baños, pasillos y el vidrio donde todos ponen las manos. Se cotiza como un solo alcance para que nada quede entre dos contratos.'
          }
        ],
        includesH2: 'Qué cubre una visita de clubhouse',
        includes: [
          'Salón y áreas de asientos acomodados y repasados',
          'Cocineta: superficies, fregadero, exterior de electrodomésticos, mesas',
          'Baños limpiados y resurtidos',
          'Vidrio interior, puertas y puntos de contacto',
          'Pisos duros y alfombras aspirados y trapeados',
          'Botes vaciados y bolsas repuestas'
        ],
        faq: [
          {
            q: '¿Pueden limpiar después de eventos de residentes?',
            a: 'Sí. Las limpiezas post-evento se contratan como salidas encima de la visita recurrente, incluso el mismo día cuando el calendario alcanza.'
          },
          {
            q: '¿También cubren el gimnasio y el área de alberca?',
            a: 'Gimnasios y salas de acondicionamiento, sí. Las cubiertas de alberca y las áreas húmedas se cotizan aparte según lo que necesiten las superficies.'
          },
          {
            q: '¿A quién le facturan, a la asociación o al administrador?',
            a: 'A cualquiera de los dos. Casi todas las comunidades lo llevan por la administradora en una sola factura mensual.'
          }
        ]
      }
    }
  },
  {
    slug: 'gym-cleaning',
    icon: 'i-bold-barbell',
    image: 'gcs-svc-gym',
    imageAlt: {
      en: 'Fitness centre floor lined with cardio and weight equipment',
      es: 'Piso de gimnasio con equipo de cardio y de pesas'
    },
    copy: {
      en: {
        name: 'Gyms & Fitness Center Cleaning',
        title: 'Gym & Fitness Center Cleaning in New Jersey | Genesis',
        desc: 'Gym and fitness center cleaning in Essex, Union, Morris, Middlesex and Hudson County, NJ. Equipment, mats, mirrors, locker rooms. (882) 930-0319.',
        h1: 'Gym and fitness center cleaning in New Jersey',
        intro:
          'Machines, mats, mirrors and locker rooms wiped down wherever hands and skin land. Independent studios, building fitness rooms and full facilities, cleaned outside class hours.',
        sections: [
          {
            h2: 'Contact surfaces first',
            body: 'A gym is not judged on its floor, it is judged on the handle somebody grips after somebody else did. Grips, benches, machine pads, dumbbell handles, mats and rails get disinfected every visit, because those are the surfaces the room exists around.'
          },
          {
            h2: 'Locker rooms and wet areas',
            body: 'Showers, benches, lockers, floors and drains, cleaned with products chosen for wet-area surfaces rather than whatever works on a kitchen. Mirrors and glass are done last so nothing dries with spots on it.'
          },
          {
            h2: 'Before open or after close',
            body: 'Fitness rooms are almost always cleaned outside class hours. Early morning before the first session, or overnight after the last one, so equipment can be moved and floors can dry.'
          }
        ],
        includesH2: 'What a gym visit covers',
        includes: [
          'Machine grips, pads, benches and handles disinfected',
          'Mats, mirrors and rails cleaned',
          'Locker rooms: showers, benches, lockers, floors, drains',
          'Restrooms cleaned and restocked',
          'Rubber and hard floors vacuumed and mopped',
          'Bins emptied, liners replaced, towels collected'
        ],
        faq: [
          {
            q: 'Do you use products that are safe on equipment?',
            a: 'Yes. Machine upholstery and grips take a different product from tile and glass, and using the wrong one cracks vinyl over time.'
          },
          {
            q: 'Can you come daily?',
            a: 'Yes. Studios with several classes a day usually need daily visits; building fitness rooms are often fine at two or three a week.'
          },
          {
            q: 'Do you handle the towel service?',
            a: 'We collect and bag used towels as part of the visit. Laundering them is arranged separately if you want it.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Gimnasios',
        title: 'Limpieza de Gimnasios en Nueva Jersey | Genesis',
        desc: 'Limpieza de gimnasios y centros de acondicionamiento en Essex, Union, Morris, Middlesex y Hudson, NJ. (882) 930-0319.',
        h1: 'Limpieza de gimnasios y centros de acondicionamiento en Nueva Jersey',
        intro:
          'Máquinas, colchonetas, espejos y vestidores repasados donde caen las manos y la piel. Estudios independientes, salas de acondicionamiento de edificio e instalaciones completas, limpiados fuera del horario de clases.',
        sections: [
          {
            h2: 'Primero las superficies de contacto',
            body: 'Un gimnasio no se juzga por su piso, se juzga por la agarradera que alguien toma después de que la tomó otro. Agarraderas, bancas, tapicería de máquinas, mangos de mancuernas, colchonetas y barandales se desinfectan en cada visita, porque el cuarto existe alrededor de esas superficies.'
          },
          {
            h2: 'Vestidores y áreas húmedas',
            body: 'Regaderas, bancas, lockers, pisos y coladeras, limpiados con productos elegidos para superficies húmedas y no con lo que sirva en una cocina. Espejos y vidrio se hacen al final para que nada se seque con manchas.'
          },
          {
            h2: 'Antes de abrir o después de cerrar',
            body: 'Las salas de acondicionamiento casi siempre se limpian fuera del horario de clases. Temprano antes de la primera sesión, o de noche después de la última, para poder mover el equipo y dejar secar los pisos.'
          }
        ],
        includesH2: 'Qué cubre una visita de gimnasio',
        includes: [
          'Agarraderas, tapicería, bancas y mangos desinfectados',
          'Colchonetas, espejos y barandales limpiados',
          'Vestidores: regaderas, bancas, lockers, pisos, coladeras',
          'Baños limpiados y resurtidos',
          'Pisos de hule y duros aspirados y trapeados',
          'Botes vaciados, bolsas repuestas, toallas recogidas'
        ],
        faq: [
          {
            q: '¿Usan productos seguros para el equipo?',
            a: 'Sí. La tapicería y las agarraderas llevan un producto distinto al del azulejo y el vidrio, y usar el equivocado agrieta el vinil con el tiempo.'
          },
          {
            q: '¿Pueden venir a diario?',
            a: 'Sí. Los estudios con varias clases al día suelen necesitar visita diaria; las salas de edificio muchas veces quedan bien con dos o tres por semana.'
          },
          {
            q: '¿Se encargan del servicio de toallas?',
            a: 'Recogemos y embolsamos las toallas usadas como parte de la visita. El lavado se acuerda aparte si lo quieres.'
          }
        ]
      }
    }
  },
  {
    slug: 'sanitizing-disinfecting',
    icon: 'i-bold-spray-bottle',
    image: 'gcs-svc-sanitizing',
    imageAlt: {
      en: 'Gloved hands disinfecting a countertop with spray and a cloth',
      es: 'Manos con guantes desinfectando una superficie con atomizador y paño'
    },
    copy: {
      en: {
        name: 'Sanitizing & Disinfecting',
        title: 'Sanitizing & Disinfecting Service in NJ | Genesis',
        desc: 'Sanitizing and disinfecting for homes and businesses in Essex, Union, Morris, Middlesex and Hudson County, NJ. (882) 930-0319.',
        h1: 'Sanitizing and disinfecting in New Jersey',
        intro:
          'Disinfection aimed where it counts: door handles, light switches, faucets, keyboards and the rest of what a day’s worth of hands passes over. Added to a regular clean, or booked on its own after an illness runs through a household or an office.',
        sections: [
          {
            h2: 'Cleaning and disinfecting are two steps',
            body: 'Disinfectant applied over dirt does very little — the surface has to be cleaned first, then the product has to sit for its full dwell time before it is wiped. Skipping either step is why a lot of disinfecting accomplishes nothing, so we do both in order.'
          },
          {
            h2: 'Touch points, not square footage',
            body: 'The value is in the small surfaces, not the large ones. Handles, switches, rails, faucet levers, lift buttons, shared keyboards, phone handsets, appliance controls and the edge of every door people push open with a hand.'
          },
          {
            h2: 'After an illness, or on a schedule',
            body: 'One-off after something has gone through the house or the office, or a standing add-on to your regular visit through the winter. Both are quoted against the number of touch points rather than the floor area.'
          }
        ],
        includesH2: 'What the service covers',
        includes: [
          'Door handles, push plates and door edges',
          'Light switches, thermostats and lift buttons',
          'Faucet levers, flush handles and dispensers',
          'Shared keyboards, mice, phone handsets and remotes',
          'Appliance controls, handles and cabinet pulls',
          'Rails, banisters and chair arms in shared rooms'
        ],
        faq: [
          {
            q: 'Is this the same as a regular clean?',
            a: 'No. A regular clean removes dirt; this targets the surfaces hands transfer things across. Most clients add it to a clean rather than choose between them.'
          },
          {
            q: 'What products do you use?',
            a: 'Standard commercial disinfectants applied at their labelled dwell time. If someone in the house has a sensitivity, tell us and we will work around it.'
          },
          {
            q: 'How soon can you come after someone has been ill?',
            a: 'Usually within a day or two. Tell us when booking so the crew arrives prepared rather than finding out on site.'
          }
        ]
      },
      es: {
        name: 'Sanitización y Desinfección',
        title: 'Sanitización y Desinfección en Nueva Jersey | Genesis',
        desc: 'Sanitización y desinfección para casas y negocios en Essex, Union, Morris, Middlesex y Hudson, NJ. (882) 930-0319.',
        h1: 'Sanitización y desinfección en Nueva Jersey',
        intro:
          'Desinfección apuntada a donde cuenta: manijas de puerta, interruptores, llaves de agua, teclados y todo lo demás por donde pasan las manos en un día. Se agrega a una limpieza regular, o se contrata sola después de que una enfermedad pasa por una casa o una oficina.',
        sections: [
          {
            h2: 'Limpiar y desinfectar son dos pasos',
            body: 'El desinfectante aplicado encima de la suciedad hace muy poco: primero hay que limpiar la superficie, luego el producto tiene que reposar su tiempo completo antes de retirarlo. Saltarse cualquiera de los dos pasos es la razón por la que mucha desinfección no logra nada, así que hacemos ambos en orden.'
          },
          {
            h2: 'Puntos de contacto, no metros cuadrados',
            body: 'El valor está en las superficies pequeñas, no en las grandes. Manijas, apagadores, barandales, palancas de llave, botones de elevador, teclados compartidos, auriculares de teléfono, controles de electrodomésticos y la orilla de cada puerta que la gente empuja con la mano.'
          },
          {
            h2: 'Después de una enfermedad, o por calendario',
            body: 'Una sola vez después de que algo pasó por la casa o la oficina, o como agregado fijo a tu visita regular durante el invierno. Las dos se cotizan contra la cantidad de puntos de contacto y no contra el área de piso.'
          }
        ],
        includesH2: 'Qué cubre el servicio',
        includes: [
          'Manijas, placas de empuje y orillas de puerta',
          'Apagadores, termostatos y botones de elevador',
          'Palancas de llave, manijas de descarga y dispensadores',
          'Teclados, ratones, auriculares y controles compartidos',
          'Controles de electrodomésticos, manijas y jaladeras',
          'Barandales, pasamanos y brazos de silla en cuartos compartidos'
        ],
        faq: [
          {
            q: '¿Es lo mismo que una limpieza regular?',
            a: 'No. Una limpieza regular quita suciedad; esto apunta a las superficies por donde las manos transfieren cosas. Casi todos los clientes lo agregan a una limpieza en vez de elegir entre las dos.'
          },
          {
            q: '¿Qué productos usan?',
            a: 'Desinfectantes comerciales estándar aplicados con el tiempo de reposo que indica la etiqueta. Si alguien en la casa tiene alguna sensibilidad, dinos y lo trabajamos alrededor.'
          },
          {
            q: '¿Qué tan pronto pueden venir después de que alguien se enfermó?',
            a: 'Normalmente en uno o dos días. Dinos al agendar para que la cuadrilla llegue preparada y no se entere en el lugar.'
          }
        ]
      }
    }
  },
  {
    slug: 'vacation-rental-cleaning',
    icon: 'i-bold-suitcase-rolling',
    image: 'gcs-svc-vacation-rental',
    imageAlt: {
      en: 'Freshly made bed in a bright vacation rental bedroom',
      es: 'Cama recién tendida en la recámara iluminada de una renta vacacional'
    },
    copy: {
      en: {
        name: 'Vacation Rental Cleaning',
        title: 'Airbnb & Vacation Rental Cleaning in NJ | Genesis',
        desc: 'Turnover cleaning for Airbnb and short-term rentals in Essex, Union, Morris, Middlesex and Hudson County, NJ. (882) 930-0319.',
        h1: 'Vacation rental turnover cleaning in New Jersey',
        intro:
          'Same-day turnarounds between bookings, linens and all, so the next arrival finds a finished room. Built for short-term rental hosts working against a checkout at eleven and a check-in at three.',
        sections: [
          {
            h2: 'The window is the job',
            body: 'A turnover is not a normal clean with a deadline attached; it is a different job. Everything is done in one pass in a fixed order so the unit is finished, staged and photographed-ready inside the gap between guests rather than an hour after it closes.'
          },
          {
            h2: 'Linens, restock and reset',
            body: 'Beds stripped and remade, towels swapped, consumables restocked from your supply, and the unit reset to the layout your listing photos show. Guests notice the difference between clean and staged, and the reviews say so.'
          },
          {
            h2: 'You hear about problems before the guest does',
            body: 'A cleaner is the only person who sees the unit between stays. Damage, missing items, a leak under the sink or a burnt-out bulb get reported with a photo the same day, which is usually early enough to fix.'
          }
        ],
        includesH2: 'What a turnover covers',
        includes: [
          'Beds stripped, linens changed, beds made and staged',
          'Bathrooms cleaned, towels swapped, amenities restocked',
          'Kitchen reset: dishes, appliance interiors, counters, bin',
          'Floors vacuumed and mopped throughout',
          'Unit reset to listing layout and photographed on request',
          'Damage, missing items and low stock reported same day'
        ],
        faq: [
          {
            q: 'Can you work an eleven-to-three window?',
            a: 'Yes, that is the standard turnover slot. Tell us the address and the window when you book and it goes on the schedule as a fixed block.'
          },
          {
            q: 'Do you supply the linens?',
            a: 'We change and launder what you provide. Most hosts keep two or three sets on site so a turnover never waits on a wash.'
          },
          {
            q: 'Will you tell me if a guest damaged something?',
            a: 'Yes, same day, with photos. That timing is usually what decides whether a claim is worth filing.'
          }
        ]
      },
      es: {
        name: 'Limpieza de Rentas Vacacionales',
        title: 'Limpieza de Airbnb y Rentas Vacacionales en NJ | Genesis',
        desc: 'Limpieza entre reservas para Airbnb y rentas de corto plazo en Essex, Union, Morris, Middlesex y Hudson, NJ. (882) 930-0319.',
        h1: 'Limpieza entre reservas para rentas vacacionales en Nueva Jersey',
        intro:
          'Cambios el mismo día entre reservas, ropa de cama incluida, para que quien llegue encuentre un cuarto terminado. Hecho para anfitriones de renta corta que trabajan contra una salida a las once y una entrada a las tres.',
        sections: [
          {
            h2: 'La ventana es el trabajo',
            body: 'Un cambio entre reservas no es una limpieza normal con fecha límite; es otro trabajo. Todo se hace en una sola pasada y en un orden fijo para que la unidad quede terminada, montada y lista para foto dentro del hueco entre huéspedes y no una hora después de que se cerró.'
          },
          {
            h2: 'Ropa de cama, resurtido y montaje',
            body: 'Camas destendidas y vueltas a tender, toallas cambiadas, consumibles resurtidos de tu inventario, y la unidad devuelta al acomodo que muestran las fotos de tu anuncio. Los huéspedes notan la diferencia entre limpio y montado, y las reseñas lo dicen.'
          },
          {
            h2: 'Te enteras de los problemas antes que el huésped',
            body: 'La persona que limpia es la única que ve la unidad entre estancias. Daños, cosas faltantes, una fuga bajo el fregadero o un foco fundido se reportan con foto el mismo día, que normalmente es a tiempo para arreglarlo.'
          }
        ],
        includesH2: 'Qué cubre un cambio entre reservas',
        includes: [
          'Camas destendidas, ropa cambiada, camas tendidas y montadas',
          'Baños limpiados, toallas cambiadas, amenidades resurtidas',
          'Cocina reiniciada: trastes, interior de electrodomésticos, superficies, bote',
          'Pisos aspirados y trapeados en toda la unidad',
          'Unidad devuelta al acomodo del anuncio y fotografiada si lo pides',
          'Daños, faltantes y bajo inventario reportados el mismo día'
        ],
        faq: [
          {
            q: '¿Pueden trabajar una ventana de once a tres?',
            a: 'Sí, ese es el horario estándar de cambio. Dinos la dirección y la ventana al contratar y queda en el calendario como un bloque fijo.'
          },
          {
            q: '¿Ustedes ponen la ropa de cama?',
            a: 'Cambiamos y lavamos la que tú tengas. Casi todos los anfitriones guardan dos o tres juegos en el lugar para que un cambio nunca espere a una lavada.'
          },
          {
            q: '¿Me avisan si un huésped dañó algo?',
            a: 'Sí, el mismo día y con fotos. Ese tiempo suele ser lo que decide si vale la pena levantar una reclamación.'
          }
        ]
      }
    }
  }
];
