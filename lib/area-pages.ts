/**
 * One page per county we actually work.
 *
 * Five pages, not fifty. A page per town would be the same paragraph with a name swapped
 * into it, which is the thin-content pattern Google built a filter for, and it would claim
 * a coverage the crew does not have. A county is the unit the service area is really
 * organised around, so it is the unit the pages are written at — each one about the housing
 * and the buildings that county actually has, which is what makes them different pages
 * rather than one page printed five times.
 */
import type { AreaPage } from './page-types';

export const AREA_PAGES: AreaPage[] = [
  {
    slug: 'essex-county',
    county: 'Essex',
    towns: [
      'Newark',
      'Montclair',
      'East Orange',
      'West Orange',
      'Bloomfield',
      'Irvington',
      'Livingston',
      'Belleville',
      'Nutley',
      'Maplewood',
      'South Orange',
      'Millburn',
      'Verona',
      'Cedar Grove',
      'Caldwell'
    ],
    copy: {
      en: {
        name: 'Essex County',
        title: 'House Cleaning in Essex County, NJ | Genesis Cleaning',
        desc: 'House and commercial cleaning in Newark, Montclair, Bloomfield, Livingston and across Essex County, NJ. Free quote: (882) 930-0319. Se habla español.',
        h1: 'Cleaning services in Essex County, New Jersey',
        intro:
          'Residential and commercial cleaning across Essex County, from the apartment buildings and storefronts of Newark and East Orange to the older single-family homes of Montclair, Maplewood and the Caldwells.',
        sections: [
          {
            h2: 'Two kinds of building, one county',
            body: 'Essex holds New Jersey’s largest city and some of its oldest suburbs within about twenty minutes of each other. A Newark walk-up and a century-old Montclair colonial need different work: one is a compact unit with a shared entry and a building schedule, the other has more floors, more trim and more original woodwork than anything built since. Both are quoted against what is in front of us.'
          },
          {
            h2: 'Older housing stock, more surface',
            body: 'Much of Maplewood, South Orange, Montclair and the Oranges was built before 1940. That means radiators, picture rails, deep baseboards, transom windows and hardwood that shows every missed corner. It takes longer than a new build of the same square footage, and the quote says so up front rather than turning into a surprise.'
          },
          {
            h2: 'Commercial along the corridors',
            body: 'Storefronts and offices along Bloomfield Avenue, Springfield Avenue and through downtown Newark are cleaned before opening or after closing. Standing visits for offices, clinics and shops, scheduled around your hours rather than through them.'
          }
        ],
        includesH2: 'Where we work in Essex County',
        includes: [
          'Newark, East Orange, Irvington and Belleville',
          'Montclair, Verona, Cedar Grove and the Caldwells',
          'Bloomfield, Nutley and Glen Ridge',
          'Maplewood, South Orange and Millburn',
          'West Orange and Livingston',
          'Surrounding Essex County municipalities on request'
        ],
        faq: [
          {
            q: 'Do you cover all of Essex County?',
            a: 'The towns listed above are where most of our Essex work is. If you are somewhere else in the county, call and ask — the answer is usually yes.'
          },
          {
            q: 'Can you work with a Newark building’s access rules?',
            a: 'Yes. Front-desk sign-in, service elevators and certificate of insurance requests are routine. Tell us the building before the first visit.'
          },
          {
            q: 'Do you clean older homes with original woodwork?',
            a: 'Yes, and they are quoted for what they are. Trim, radiators and original floors take longer than a modern build and we say so before booking.'
          }
        ]
      },
      es: {
        name: 'Condado de Essex',
        title: 'Limpieza de Casas en el Condado de Essex, NJ | Genesis',
        desc: 'Limpieza residencial y comercial en Newark, Montclair, Bloomfield, Livingston y todo el condado de Essex, NJ. Cotización: (882) 930-0319.',
        h1: 'Servicios de limpieza en el condado de Essex, Nueva Jersey',
        intro:
          'Limpieza residencial y comercial en todo el condado de Essex, desde los edificios de apartamentos y los locales de Newark y East Orange hasta las casas unifamiliares antiguas de Montclair, Maplewood y las Caldwells.',
        sections: [
          {
            h2: 'Dos tipos de edificio, un condado',
            body: 'Essex tiene la ciudad más grande de Nueva Jersey y algunos de sus suburbios más antiguos a unos veinte minutos uno del otro. Un walk-up de Newark y una colonial centenaria de Montclair necesitan trabajos distintos: una es una unidad compacta con entrada compartida y calendario de edificio, la otra tiene más pisos, más molduras y más madera original que cualquier cosa construida después. Las dos se cotizan contra lo que tenemos enfrente.'
          },
          {
            h2: 'Vivienda antigua, más superficie',
            body: 'Buena parte de Maplewood, South Orange, Montclair y los Oranges se construyó antes de 1940. Eso significa radiadores, rieles de cuadro, zócalos profundos, ventanas de transom y madera que enseña cada rincón que se saltó. Toma más tiempo que una construcción nueva de los mismos metros, y la cotización lo dice desde el principio en vez de convertirse en sorpresa.'
          },
          {
            h2: 'Comercial sobre los corredores',
            body: 'Los locales y las oficinas de Bloomfield Avenue, Springfield Avenue y el centro de Newark se limpian antes de abrir o después de cerrar. Visitas fijas para oficinas, consultorios y tiendas, agendadas alrededor de tu horario y no a través de él.'
          }
        ],
        includesH2: 'Dónde trabajamos en el condado de Essex',
        includes: [
          'Newark, East Orange, Irvington y Belleville',
          'Montclair, Verona, Cedar Grove y las Caldwells',
          'Bloomfield, Nutley y Glen Ridge',
          'Maplewood, South Orange y Millburn',
          'West Orange y Livingston',
          'Municipios vecinos del condado de Essex si lo pides'
        ],
        faq: [
          {
            q: '¿Cubren todo el condado de Essex?',
            a: 'Los pueblos de la lista son donde está casi todo nuestro trabajo en Essex. Si estás en otra parte del condado, llama y pregunta: la respuesta casi siempre es sí.'
          },
          {
            q: '¿Pueden con las reglas de acceso de un edificio en Newark?',
            a: 'Sí. Registro en recepción, elevador de servicio y solicitudes de póliza son rutina. Dinos el edificio antes de la primera visita.'
          },
          {
            q: '¿Limpian casas antiguas con madera original?',
            a: 'Sí, y se cotizan por lo que son. Molduras, radiadores y pisos originales toman más tiempo que una construcción moderna, y lo decimos antes de agendar.'
          }
        ]
      }
    }
  },
  {
    slug: 'union-county',
    county: 'Union',
    towns: [
      'Elizabeth',
      'Union',
      'Plainfield',
      'Linden',
      'Westfield',
      'Cranford',
      'Summit',
      'Rahway',
      'Scotch Plains',
      'Roselle',
      'Hillside',
      'Springfield',
      'Clark',
      'Berkeley Heights',
      'New Providence'
    ],
    copy: {
      en: {
        name: 'Union County',
        title: 'House Cleaning in Union County, NJ | Genesis Cleaning',
        desc: 'House and commercial cleaning in Elizabeth, Union, Westfield, Cranford, Summit and across Union County, NJ. Quote: (882) 930-0319. Se habla español.',
        h1: 'Cleaning services in Union County, New Jersey',
        intro:
          'Residential and commercial cleaning across Union County — Elizabeth, Union, Linden and Plainfield through to Westfield, Cranford, Summit and the Watchung foothills. This is the county the (908) number belongs to.',
        sections: [
          {
            h2: 'The county closest to home',
            body: 'Union is where most of our standing weekly and biweekly visits are, which means shorter travel time and more flexibility on scheduling than anywhere else we cover. Same-day and next-day availability turns up here more often than in the other four counties.'
          },
          {
            h2: 'Bilingual service where it is actually needed',
            body: 'Elizabeth, Plainfield, Union and Roselle are among the most Spanish-speaking municipalities in the state. Every quote, every visit and every follow-up can happen in Spanish from start to finish, and for a good share of our clients here it does.'
          },
          {
            h2: 'Suburban homes and downtown storefronts',
            body: 'Westfield, Cranford, Summit, Scotch Plains and New Providence run to larger single-family homes on regular recurring schedules. The downtowns along the Raritan Valley line run to storefronts, offices and clinics cleaned before opening. Both are normal weeks for us.'
          }
        ],
        includesH2: 'Where we work in Union County',
        includes: [
          'Elizabeth, Linden, Roselle and Hillside',
          'Union, Springfield and Kenilworth',
          'Westfield, Cranford, Clark and Garwood',
          'Summit, New Providence and Berkeley Heights',
          'Plainfield, Scotch Plains and Fanwood',
          'Rahway and surrounding Union County towns'
        ],
        faq: [
          {
            q: 'Is Union County your main service area?',
            a: 'It is where most of our recurring work is and where our shortest travel times are, which usually shows up as more scheduling options.'
          },
          {
            q: 'Can the whole job be handled in Spanish?',
            a: 'Yes. Quote, scheduling, the visit itself and anything afterwards. Aquí se habla español, and in this county that is most of the point.'
          },
          {
            q: 'How quickly can you come out?',
            a: 'In Union County, often within a day or two. Call and we will tell you what is actually open rather than promising a slot we do not have.'
          }
        ]
      },
      es: {
        name: 'Condado de Union',
        title: 'Limpieza de Casas en el Condado de Union, NJ | Genesis',
        desc: 'Limpieza residencial y comercial en Elizabeth, Union, Westfield, Cranford, Summit y todo el condado de Union, NJ. (882) 930-0319.',
        h1: 'Servicios de limpieza en el condado de Union, Nueva Jersey',
        intro:
          'Limpieza residencial y comercial en todo el condado de Union: Elizabeth, Union, Linden y Plainfield hasta Westfield, Cranford, Summit y las faldas de Watchung. Este es el condado al que pertenece el número (908).',
        sections: [
          {
            h2: 'El condado más cercano',
            body: 'En Union está la mayoría de nuestras visitas fijas semanales y quincenales, lo que significa menos tiempo de traslado y más flexibilidad de horario que en cualquier otro lugar que cubrimos. La disponibilidad para el mismo día o el siguiente aparece aquí más seguido que en los otros cuatro condados.'
          },
          {
            h2: 'Servicio bilingüe donde de verdad hace falta',
            body: 'Elizabeth, Plainfield, Union y Roselle están entre los municipios más hispanohablantes del estado. Cada cotización, cada visita y cada seguimiento pueden ser en español de principio a fin, y para buena parte de nuestros clientes aquí así es.'
          },
          {
            h2: 'Casas de suburbio y locales de centro',
            body: 'Westfield, Cranford, Summit, Scotch Plains y New Providence tienden a casas unifamiliares grandes con calendarios recurrentes. Los centros a lo largo de la línea Raritan Valley tienden a locales, oficinas y consultorios limpiados antes de abrir. Las dos cosas son una semana normal para nosotros.'
          }
        ],
        includesH2: 'Dónde trabajamos en el condado de Union',
        includes: [
          'Elizabeth, Linden, Roselle y Hillside',
          'Union, Springfield y Kenilworth',
          'Westfield, Cranford, Clark y Garwood',
          'Summit, New Providence y Berkeley Heights',
          'Plainfield, Scotch Plains y Fanwood',
          'Rahway y pueblos vecinos del condado de Union'
        ],
        faq: [
          {
            q: '¿Union es su área principal de servicio?',
            a: 'Es donde está la mayor parte de nuestro trabajo recurrente y donde tenemos los traslados más cortos, lo que normalmente se traduce en más opciones de horario.'
          },
          {
            q: '¿Todo el trabajo se puede llevar en español?',
            a: 'Sí. Cotización, agenda, la visita misma y lo que siga después. Aquí se habla español, y en este condado ese es casi todo el punto.'
          },
          {
            q: '¿Qué tan rápido pueden venir?',
            a: 'En el condado de Union, muchas veces en uno o dos días. Llama y te decimos qué hay abierto de verdad, en vez de prometerte un espacio que no tenemos.'
          }
        ]
      }
    }
  },
  {
    slug: 'morris-county',
    county: 'Morris',
    towns: [
      'Morristown',
      'Parsippany',
      'Randolph',
      'Denville',
      'Madison',
      'Chatham',
      'Florham Park',
      'Dover',
      'Rockaway',
      'Montville',
      'Boonton',
      'Mount Olive',
      'Roxbury',
      'Hanover',
      'Morris Plains'
    ],
    copy: {
      en: {
        name: 'Morris County',
        title: 'House Cleaning in Morris County, NJ | Genesis Cleaning',
        desc: 'House and commercial cleaning in Morristown, Parsippany, Randolph, Madison and across Morris County, NJ. Quote: (882) 930-0319. Se habla español.',
        h1: 'Cleaning services in Morris County, New Jersey',
        intro:
          'Residential and commercial cleaning across Morris County, from the corporate parks of Parsippany and Florham Park to the larger family homes of Randolph, Denville, Montville and Mendham.',
        sections: [
          {
            h2: 'Bigger houses, longer visits',
            body: 'Morris runs to more square footage per home than the counties east of it — more bathrooms, finished basements, three-car garages and second staircases. That changes the crew size and the hours rather than just the price, so a Morris quote is built on a walkthrough or a room count instead of an average.'
          },
          {
            h2: 'Office parks and professional suites',
            body: 'Parsippany, Florham Park, Hanover and Whippany hold some of the densest office space in the state. Suites, floors and shared common areas cleaned overnight or before opening, on a written scope you can hand to a facilities manager.'
          },
          {
            h2: 'Seasonal work the county actually generates',
            body: 'Wooded lots mean more that gets tracked in: pollen in spring, leaf grit in autumn, road salt and slush from November on. Deep cleans and window work here cluster around the shoulder seasons for exactly that reason, and booking ahead of them is cheaper than catching up after.'
          }
        ],
        includesH2: 'Where we work in Morris County',
        includes: [
          'Morristown, Morris Plains and Madison',
          'Parsippany-Troy Hills, Hanover and Florham Park',
          'Randolph, Denville, Rockaway and Dover',
          'Chatham, Chester and Mendham',
          'Montville, Boonton and Mountain Lakes',
          'Mount Olive, Roxbury and surrounding Morris County towns'
        ],
        faq: [
          {
            q: 'Do you quote large homes differently?',
            a: 'Yes. Above a certain size a room count stops being a good estimate, so we walk it or go through it with you in detail before giving a number.'
          },
          {
            q: 'Can you clean an office suite overnight?',
            a: 'Yes. Overnight and pre-opening visits are standard for the Parsippany and Florham Park office parks.'
          },
          {
            q: 'When should I book a deep clean?',
            a: 'Spring after the pollen settles, or autumn once the leaves are down. Both fill up, so a few weeks of notice gets you a better slot.'
          }
        ]
      },
      es: {
        name: 'Condado de Morris',
        title: 'Limpieza de Casas en el Condado de Morris, NJ | Genesis',
        desc: 'Limpieza residencial y comercial en Morristown, Parsippany, Randolph, Madison y todo el condado de Morris, NJ. (882) 930-0319.',
        h1: 'Servicios de limpieza en el condado de Morris, Nueva Jersey',
        intro:
          'Limpieza residencial y comercial en todo el condado de Morris, desde los parques corporativos de Parsippany y Florham Park hasta las casas familiares grandes de Randolph, Denville, Montville y Mendham.',
        sections: [
          {
            h2: 'Casas más grandes, visitas más largas',
            body: 'Morris tiende a más metros por casa que los condados al este: más baños, sótanos terminados, cocheras para tres autos y segundas escaleras. Eso cambia el tamaño de la cuadrilla y las horas, no solo el precio, así que una cotización de Morris se arma con un recorrido o un conteo de cuartos y no con un promedio.'
          },
          {
            h2: 'Parques de oficinas y despachos',
            body: 'Parsippany, Florham Park, Hanover y Whippany concentran algunos de los espacios de oficina más densos del estado. Despachos, pisos y áreas comunes limpiados de noche o antes de abrir, con un alcance escrito que le puedes entregar a mantenimiento.'
          },
          {
            h2: 'Trabajo de temporada que el condado genera solo',
            body: 'Los lotes arbolados significan que entra más de la calle: polen en primavera, tierra de hoja en otoño, sal y aguanieve de noviembre en adelante. Las limpiezas profundas y el trabajo de ventanas aquí se juntan alrededor de los cambios de estación justo por eso, y agendar antes sale más barato que ponerse al día después.'
          }
        ],
        includesH2: 'Dónde trabajamos en el condado de Morris',
        includes: [
          'Morristown, Morris Plains y Madison',
          'Parsippany-Troy Hills, Hanover y Florham Park',
          'Randolph, Denville, Rockaway y Dover',
          'Chatham, Chester y Mendham',
          'Montville, Boonton y Mountain Lakes',
          'Mount Olive, Roxbury y pueblos vecinos del condado de Morris'
        ],
        faq: [
          {
            q: '¿Cotizan distinto las casas grandes?',
            a: 'Sí. Pasado cierto tamaño, contar cuartos deja de ser un buen estimado, así que la recorremos o la repasamos contigo en detalle antes de dar un número.'
          },
          {
            q: '¿Pueden limpiar un despacho de noche?',
            a: 'Sí. Las visitas nocturnas y antes de abrir son lo normal en los parques de oficinas de Parsippany y Florham Park.'
          },
          {
            q: '¿Cuándo conviene agendar una limpieza profunda?',
            a: 'En primavera cuando baja el polen, o en otoño una vez que cayó la hoja. Las dos se llenan, así que avisar con unas semanas te consigue mejor espacio.'
          }
        ]
      }
    }
  },
  {
    slug: 'middlesex-county',
    county: 'Middlesex',
    towns: [
      'Edison',
      'Woodbridge',
      'New Brunswick',
      'Piscataway',
      'Perth Amboy',
      'Old Bridge',
      'East Brunswick',
      'Sayreville',
      'South Brunswick',
      'North Brunswick',
      'Carteret',
      'Monroe',
      'Metuchen',
      'Highland Park',
      'Plainsboro'
    ],
    copy: {
      en: {
        name: 'Middlesex County',
        title: 'House Cleaning in Middlesex County, NJ | Genesis',
        desc: 'House and commercial cleaning in Edison, Woodbridge, New Brunswick, Piscataway and across Middlesex County, NJ. (882) 930-0319. Se habla español.',
        h1: 'Cleaning services in Middlesex County, New Jersey',
        intro:
          'Residential and commercial cleaning across Middlesex County — Edison, Woodbridge and Piscataway through New Brunswick, Perth Amboy and the townships along Route 1.',
        sections: [
          {
            h2: 'A rental market that turns over constantly',
            body: 'New Brunswick, Piscataway and Highland Park run on academic-year leases, which means a concentrated wave of move-outs and move-ins every summer. Turnover cleans here get booked weeks ahead because the whole county wants the same fortnight, and the ones booked late are the ones that go unfilled.'
          },
          {
            h2: 'Corporate space along the corridor',
            body: 'The Route 1 and Route 287 corridors through Edison, Woodbridge and South Brunswick hold offices, showrooms and light-industrial suites. Recurring commercial visits are scheduled outside operating hours with a fixed written scope.'
          },
          {
            h2: 'Townhouses and newer construction',
            body: 'Much of Monroe, South Brunswick, Old Bridge and Plainsboro is newer than what we clean further north — open plans, more tile and hard floor, fewer of the radiators and deep mouldings that slow an older house down. Those visits run faster, and the quote reflects it.'
          }
        ],
        includesH2: 'Where we work in Middlesex County',
        includes: [
          'Edison, Metuchen and Woodbridge',
          'New Brunswick, North Brunswick and East Brunswick',
          'Piscataway, Highland Park and South Plainfield',
          'Perth Amboy, Carteret and Sayreville',
          'Old Bridge, Monroe and South Brunswick',
          'Plainsboro and surrounding Middlesex County towns'
        ],
        faq: [
          {
            q: 'How far ahead should I book a summer move-out?',
            a: 'Three to four weeks for late July and August. That window is the busiest of the year in this county and it fills first.'
          },
          {
            q: 'Do you work with student rentals and landlords?',
            a: 'Yes. Multiple units at one address, or several addresses on one day, are quoted together and cost less than booking them separately.'
          },
          {
            q: 'Can you clean a showroom or light-industrial suite?',
            a: 'Yes, on a recurring schedule outside your operating hours, with the scope agreed in writing first.'
          }
        ]
      },
      es: {
        name: 'Condado de Middlesex',
        title: 'Limpieza de Casas en el Condado de Middlesex, NJ | Genesis',
        desc: 'Limpieza residencial y comercial en Edison, Woodbridge, New Brunswick, Piscataway y todo el condado de Middlesex, NJ. (882) 930-0319.',
        h1: 'Servicios de limpieza en el condado de Middlesex, Nueva Jersey',
        intro:
          'Limpieza residencial y comercial en todo el condado de Middlesex: Edison, Woodbridge y Piscataway pasando por New Brunswick, Perth Amboy y los municipios a lo largo de la Ruta 1.',
        sections: [
          {
            h2: 'Un mercado de renta que cambia sin parar',
            body: 'New Brunswick, Piscataway y Highland Park funcionan con contratos de ciclo escolar, lo que significa una ola concentrada de salidas y entradas cada verano. Las limpiezas de cambio aquí se agendan con semanas de anticipación porque todo el condado quiere la misma quincena, y las que se piden tarde son las que se quedan sin lugar.'
          },
          {
            h2: 'Espacio corporativo sobre el corredor',
            body: 'Los corredores de la Ruta 1 y la Ruta 287 por Edison, Woodbridge y South Brunswick concentran oficinas, salas de exhibición y naves ligeras. Las visitas comerciales recurrentes se agendan fuera del horario de operación con un alcance fijo y por escrito.'
          },
          {
            h2: 'Townhouses y construcción más nueva',
            body: 'Buena parte de Monroe, South Brunswick, Old Bridge y Plainsboro es más nueva que lo que limpiamos más al norte: planta abierta, más azulejo y piso duro, menos radiadores y molduras profundas de las que frenan una casa antigua. Esas visitas corren más rápido, y la cotización lo refleja.'
          }
        ],
        includesH2: 'Dónde trabajamos en el condado de Middlesex',
        includes: [
          'Edison, Metuchen y Woodbridge',
          'New Brunswick, North Brunswick y East Brunswick',
          'Piscataway, Highland Park y South Plainfield',
          'Perth Amboy, Carteret y Sayreville',
          'Old Bridge, Monroe y South Brunswick',
          'Plainsboro y pueblos vecinos del condado de Middlesex'
        ],
        faq: [
          {
            q: '¿Con cuánta anticipación agendo una salida de verano?',
            a: 'Tres o cuatro semanas para finales de julio y agosto. Esa ventana es la más ocupada del año en este condado y se llena primero.'
          },
          {
            q: '¿Trabajan con rentas estudiantiles y con dueños?',
            a: 'Sí. Varias unidades en una dirección, o varias direcciones el mismo día, se cotizan juntas y cuestan menos que contratarlas por separado.'
          },
          {
            q: '¿Pueden limpiar una sala de exhibición o una nave ligera?',
            a: 'Sí, con calendario recurrente fuera de tu horario de operación y con el alcance acordado por escrito antes.'
          }
        ]
      }
    }
  },
  {
    slug: 'hudson-county',
    county: 'Hudson',
    towns: [
      'Jersey City',
      'Hoboken',
      'Bayonne',
      'Union City',
      'North Bergen',
      'West New York',
      'Kearny',
      'Secaucus',
      'Weehawken',
      'Harrison',
      'Guttenberg',
      'East Newark'
    ],
    copy: {
      en: {
        name: 'Hudson County',
        title: 'Apartment Cleaning in Hudson County, NJ | Genesis',
        desc: 'Apartment, condo and commercial cleaning in Jersey City, Hoboken, Bayonne, Union City and across Hudson County, NJ. (882) 930-0319. Se habla español.',
        h1: 'Cleaning services in Hudson County, New Jersey',
        intro:
          'Apartment, condo and commercial cleaning across Hudson County — the towers of Jersey City and Hoboken, the brownstones and walk-ups of Union City and West New York, and the short-term rentals in between.',
        sections: [
          {
            h2: 'Buildings before units',
            body: 'In Hudson the building is half the job. Service elevators have to be reserved, front desks need the crew on a list, loading docks close at set hours and certificates of insurance get asked for before anyone gets past the lobby. Tell us the building when you book and all of that is handled before the day rather than on it.'
          },
          {
            h2: 'Smaller footprints, closer inspection',
            body: 'A Hoboken one-bedroom and a Livingston colonial take different kinds of care. In eight hundred square feet every surface is within arm’s reach of somewhere you sit, so the standard is set by what you notice from the couch, not by what a checklist says was covered.'
          },
          {
            h2: 'Short-term rental turnovers',
            body: 'Hudson has one of the densest short-term rental markets in the state, most of it on eleven-to-three turnover windows. Those are booked as fixed blocks rather than as a normal visit with a deadline attached, because the two are not the same job.'
          }
        ],
        includesH2: 'Where we work in Hudson County',
        includes: [
          'Jersey City: Downtown, Journal Square, The Heights, Bergen-Lafayette',
          'Hoboken and Weehawken',
          'Union City, West New York and Guttenberg',
          'North Bergen and Secaucus',
          'Bayonne',
          'Kearny, Harrison and East Newark'
        ],
        faq: [
          {
            q: 'Can you meet my building’s certificate of insurance requirement?',
            a: 'Ask when you book and we will tell you straight away what we can provide. It is a routine request in Jersey City and Hoboken towers.'
          },
          {
            q: 'Do you do Airbnb turnovers here?',
            a: 'Yes, on fixed same-day windows. Hudson is where most of our short-term rental work is.'
          },
          {
            q: 'Is parking a problem?',
            a: 'It is priced into the quote, not added afterwards. Metered and permit-only streets are normal for us across this county.'
          }
        ]
      },
      es: {
        name: 'Condado de Hudson',
        title: 'Limpieza de Apartamentos en el Condado de Hudson, NJ | Genesis',
        desc: 'Limpieza de apartamentos, condominios y comercios en Jersey City, Hoboken, Bayonne, Union City y todo el condado de Hudson, NJ. (882) 930-0319.',
        h1: 'Servicios de limpieza en el condado de Hudson, Nueva Jersey',
        intro:
          'Limpieza de apartamentos, condominios y comercios en todo el condado de Hudson: las torres de Jersey City y Hoboken, los brownstones y walk-ups de Union City y West New York, y las rentas de corto plazo que hay en medio.',
        sections: [
          {
            h2: 'Primero el edificio, luego la unidad',
            body: 'En Hudson el edificio es medio trabajo. Hay que apartar el elevador de servicio, la recepción necesita a la cuadrilla en una lista, los andenes de carga cierran a horas fijas y piden pólizas de seguro antes de que alguien pase del lobby. Dinos el edificio al contratar y todo eso queda resuelto antes del día y no durante.'
          },
          {
            h2: 'Espacios más chicos, revisión más cercana',
            body: 'Un one-bedroom de Hoboken y una colonial de Livingston piden cuidados distintos. En setenta y cinco metros cada superficie está al alcance del brazo desde donde te sientas, así que el estándar lo marca lo que notas desde el sillón, no lo que una lista dice que se cubrió.'
          },
          {
            h2: 'Cambios de renta de corto plazo',
            body: 'Hudson tiene uno de los mercados de renta corta más densos del estado, y casi todo corre en ventanas de once a tres. Esos se agendan como bloques fijos y no como una visita normal con fecha límite, porque no son el mismo trabajo.'
          }
        ],
        includesH2: 'Dónde trabajamos en el condado de Hudson',
        includes: [
          'Jersey City: Downtown, Journal Square, The Heights, Bergen-Lafayette',
          'Hoboken y Weehawken',
          'Union City, West New York y Guttenberg',
          'North Bergen y Secaucus',
          'Bayonne',
          'Kearny, Harrison y East Newark'
        ],
        faq: [
          {
            q: '¿Pueden cumplir el requisito de póliza de mi edificio?',
            a: 'Pregunta al contratar y te decimos de inmediato qué podemos entregar. Es una solicitud de rutina en las torres de Jersey City y Hoboken.'
          },
          {
            q: '¿Hacen cambios de Airbnb aquí?',
            a: 'Sí, en ventanas fijas del mismo día. Hudson es donde está la mayor parte de nuestro trabajo de renta corta.'
          },
          {
            q: '¿El estacionamiento es un problema?',
            a: 'Va incluido en la cotización, no se agrega después. Las calles con parquímetro y de permiso son normales para nosotros en todo este condado.'
          }
        ]
      }
    }
  }
];
