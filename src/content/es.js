// ── Contenido de las páginas de servicio, la página local y las FAQ (es) ──
// JS plano: también lo importa src/seo/meta.js para los títulos y los
// datos estructurados. Sin precios ni datos que no sean de Biel.

export default {
  ui: {
    home: "Inicio",
    services: "Servicios",
    forWho: "Para quién es",
    includes: "Qué incluye",
    process: "Cómo trabajo",
    related: "Proyecto relacionado",
    relatedLink: "Ver el proyecto",
    allProjects: "Ver todos los proyectos",
    faq: "Preguntas frecuentes",
    otherServices: "Otros servicios",
    more: "Más información",
    ctaTitle: "Hablemos de tu proyecto",
    ctaText: "Cuéntame qué necesitas y te responderé en menos de 24 h, sin compromiso.",
    ctaButton: "Hablemos",
    processSteps: [
      { title: "Hablamos", text: "Una primera conversación, sin compromiso, para entender qué necesitas y qué quieres conseguir." },
      { title: "Propuesta", text: "Te preparo una propuesta con el alcance, los plazos y el precio, para que sepas exactamente qué tendrás." },
      { title: "Diseño y desarrollo", text: "Te enseño los avances y ajustamos hasta que la web o la app hace el trabajo que necesitas." },
      { title: "Puesta en marcha", text: "La publicamos, te enseño a usarla y sigo a tu lado si hay que hacer cambios." },
    ],
  },

  services: {
    "custom-apps": {
      metaTitle: "Desarrollo de apps a medida en Manresa | Biel Díaz",
      metaDescription: "Desarrollo apps de gestión a medida para negocios de Manresa y el Bages: clientes, reservas, inventario y más, con trato directo y sin intermediarios.",
      h1: "Apps de gestión a medida",
      heading: "Apps de gestión a medida en Manresa y el Bages",
      intro: "Herramientas hechas a tu manera de trabajar: clientes, reservas, inventario o lo que necesites, todo en un solo lugar. Se acabaron las hojas de cálculo que no se hablan entre sí.",
      forWho: [
        "Negocios que llevan la gestión con hojas de cálculo, papel o varias apps que no se conectan.",
        "Equipos que hacen cada día las mismas tareas a mano y quieren automatizarlas.",
        "Profesionales que no encuentran ningún programa estándar que se adapte a cómo trabajan.",
      ],
      includes: [
        "Análisis de cómo trabajas ahora y qué hay que resolver.",
        "Diseño de pantallas claras y fáciles de usar, en el móvil y en el ordenador.",
        "Usuarios y permisos para cada persona del equipo.",
        "Importación y exportación de datos, y avisos por correo electrónico cuando hace falta.",
        "Puesta en marcha y formación para que el equipo la use desde el primer día.",
      ],
      sections: [
        {
          title: "Por qué una app a medida y no un programa estándar",
          paragraphs: [
            "Un programa estándar te obliga a adaptar el negocio al programa. Una app a medida hace lo contrario: se diseña a partir de cómo trabajas, con los campos, los pasos y los permisos que necesitas y nada más. Así ahorras tiempo cada día y no pagas por funciones que no usas.",
            "Como trabajas con una persona de la zona, puedes explicar el proceso en persona, probar versiones pequeñas y ajustarlo sobre la marcha.",
          ],
        },
        {
          title: "Cómo lo hago",
          paragraphs: [
            "Empiezo por una primera versión que resuelve lo que ahora te hace perder más tiempo, la probamos con tu equipo y vamos añadiendo funciones. Lo diseño y lo programo yo directamente, y te explico cómo funciona para que no dependas a ciegas.",
            "La app funciona desde el navegador, en el móvil y en el ordenador, y los datos son tuyos: puedes exportarlos cuando quieras.",
          ],
        },
      ],
      related: "sergigarcia",
      faqs: [
        { q: "¿Puedo empezar con una versión pequeña y ampliarla después?", a: "Sí. Es la forma recomendada: empezamos por lo que más te hace falta y vamos añadiendo funciones a medida que se usa la app." },
        { q: "¿Puedo usar la app desde el móvil?", a: "Sí. Las apps se diseñan para que funcionen bien en el móvil, la tableta y el ordenador, sin instalar nada." },
        { q: "¿Haces apps a medida en Manresa y el Bages?", a: "Sí. Estoy en Sant Fruitós de Bages y desarrollo apps para negocios de Manresa y del Bages, y también a distancia para negocios de toda Cataluña." },
        { q: "¿Cuánto cuesta una app a medida?", a: "Depende del alcance y de las funciones que necesites. Tras una primera conversación, sin compromiso, te preparo una propuesta con el precio y los plazos." },
        { q: "¿Cuánto se tarda en tener la app?", a: "Depende del alcance. Una primera versión con las funciones esenciales se puede probar antes que la app completa, y en la propuesta tienes los plazos exactos." },
        { q: "¿Y si más adelante necesito cambios?", a: "No hay problema. Sigo a tu lado: la app se puede ampliar o ajustar cuando el negocio cambia." },
      ],
    },
    gyms: {
      metaTitle: "Programa de gestión para gimnasios y entrenadores | Biel Díaz",
      metaDescription: "Socios, cuotas, horarios y reservas de clases desde una sola app. Gestión para gimnasios, estudios y entrenadores personales, con portal para clientes.",
      h1: "Gestión para gimnasios",
      intro: "Socios, cuotas, horarios y reservas de clases desde una sola app. Tú te centras en entrenar y pasas menos tiempo con papeles.",
      forWho: [
        "Gimnasios y estudios pequeños (yoga, pilates, spinning, funcional).",
        "Entrenadores personales que llevan clientes y sesiones.",
        "Clubs y academias deportivas con grupos e inscripciones.",
      ],
      includes: [
        "Ficha de cada cliente con su estado, notas e historial.",
        "Sesiones individuales o de grupo con plazas y lista de espera.",
        "Bonos por paquetes o mensuales, con avisos antes de que se acaben.",
        "Portal para que los clientes reserven y cancelen desde el móvil.",
        "Recordatorios por correo electrónico y facturas en PDF.",
      ],
      related: "repwise",
      faqs: [
        { q: "¿Tienes un programa ya hecho o lo haces a medida?", a: "Las dos cosas. Repwise es mi programa de gestión para entrenadores y clubs pequeños, y si necesitas algo distinto, puedo adaptarlo o hacer uno a medida." },
        { q: "¿Los clientes tienen que instalar alguna app?", a: "No. El portal del cliente funciona desde el navegador del móvil, sin instalar nada." },
      ],
    },
    portfolios: {
      metaTitle: "Web portfolio a medida para creativos | Biel Díaz",
      metaDescription: "Una web que enseña tu trabajo como se merece, diseñada desde cero y sin plantillas. Portfolios para diseñadores, fotógrafos y profesionales.",
      h1: "Portfolios web a medida",
      intro: "Una web que enseña tu trabajo como se merece, diseñada desde cero y sin plantillas. Ideal para creativos y profesionales que quieren destacar.",
      forWho: [
        "Diseñadores, ilustradores, fotógrafos y estudios creativos.",
        "Profesionales que quieren una web propia y no una plantilla como la de todo el mundo.",
        "Cualquier persona que quiera que su trabajo sea lo primero que se vea.",
      ],
      includes: [
        "Diseño propio a partir de tu identidad, sin plantillas.",
        "Galería de trabajos y fichas de proyecto fáciles de actualizar.",
        "Animaciones cuidadas que no hacen la web más lenta.",
        "Web rápida, adaptada al móvil y preparada para Google.",
        "Formulario de contacto y enlaces a tus redes.",
      ],
      related: "tresdege",
      faqs: [
        { q: "¿Podré añadir proyectos nuevos yo mismo?", a: "Sí. Dejamos preparada la forma de añadir nuevos para que el portfolio no se quede parado." },
        { q: "¿Me puedes ayudar con los textos?", a: "Sí. Revisamos juntos los textos para que expliquen bien lo que haces y ayuden a salir en Google." },
      ],
    },
    wordpress: {
      metaTitle: "Páginas web en WordPress en Manresa y el Bages | Biel Díaz",
      metaDescription: "Webs sencillas y rápidas en WordPress que puedes actualizar tú mismo. Para negocios de Manresa y el Bages que quieren empezar a estar en internet.",
      h1: "Webs básicas en WordPress",
      intro: "Una web sencilla, rápida y que puedes actualizar tú mismo. Perfecta para empezar a estar en internet sin complicaciones.",
      forWho: [
        "Negocios locales que aún no tienen web o tienen una antigua.",
        "Profesionales que quieren cambiar textos y fotos sin depender de nadie.",
        "Quien necesita una web clara de pocas páginas, bien hecha y pronto.",
      ],
      includes: [
        "Diseño moderno adaptado al móvil.",
        "Las páginas que necesites: desde una sola página hasta cuatro o cinco.",
        "Formulario de contacto, mapa y botón de WhatsApp.",
        "SEO básico y alta en la ficha de Google Business.",
        "Formación para que actualices la web tú mismo.",
      ],
      related: null,
      faqs: [
        { q: "¿Cuánto se tarda en tener la web?", a: "Una web de una sola página suele estar lista en una o dos semanas, y una de cuatro o cinco páginas, en dos o tres. En la propuesta tienes los plazos exactos." },
        { q: "¿WordPress o una web a medida?", a: "WordPress es ideal si quieres una web sencilla que puedas editar tú mismo. Si necesitas un diseño único, animaciones o funciones especiales, te conviene más una web a medida." },
      ],
    },
    seo: {
      metaTitle: "Posicionamiento SEO en el Bages y Manresa | Biel Díaz",
      metaDescription: "Especialista en posicionamiento SEO en el Bages y Manresa: auditoría, palabras clave, contenidos y ficha de Google Business para que te encuentren.",
      h1: "Gestión de SEO",
      heading: "Posicionamiento SEO en el Bages y Manresa",
      intro: "Hago que te encuentren en Google: revisión técnica, contenidos y ficha de Google Business. Más visitas de gente que busca justo lo que ofreces.",
      forWho: [
        "Negocios que tienen web pero no salen en Google.",
        "Negocios locales que quieren salir cuando alguien busca su servicio en la zona.",
        "Webs que han perdido visitas y no saben por qué.",
      ],
      includes: [
        "Auditoría técnica: velocidad, indexación, errores y datos estructurados.",
        "Búsqueda de palabras clave según la dificultad y lo que busca tu clientela.",
        "Mejora de los títulos, las descripciones y los textos de cada página.",
        "Creación y optimización de la ficha de Google Business.",
        "Configuración de Search Console y seguimiento de resultados.",
      ],
      sections: [
        {
          title: "Por qué el SEO local funciona en el Bages",
          paragraphs: [
            "Cuando alguien busca “posicionamiento web Manresa” o “SEO en el Bages”, Google enseña primero los negocios que demuestran ser de la zona y que responden bien a lo que se busca. La competencia local es mucho menor que la nacional, y por eso un trabajo bien hecho puede dar resultados antes que en las búsquedas genéricas.",
            "Soy especialista en SEO en Sant Fruitós de Bages: trabajo contigo directamente, sin la estructura ni los intermediarios de una agencia, y sé cómo busca la gente de Manresa, Navarcles, Sallent o Santpedor.",
          ],
        },
        {
          title: "Qué hago para que salgas en Google",
          paragraphs: [
            "Primero reviso cómo te ve Google: si las páginas se indexan, si hay errores, si la web carga rápido y si los títulos y las descripciones invitan a hacer clic. Después elijo las búsquedas que traen clientes de verdad (un servicio más una población) y las asigno a la página que mejor las responde.",
            "Por último trabajo la parte local: la ficha de Google Business, las reseñas y los enlaces desde directorios y negocios de la zona. Cada mes miro Search Console para saber qué se ha movido y qué toca hacer después.",
          ],
        },
      ],
      related: null,
      faqs: [
        { q: "¿Cuánto se tarda en ver resultados?", a: "El SEO es a medio plazo: los primeros cambios suelen notarse en unas semanas y los resultados sólidos, en unos meses, según la competencia." },
        { q: "¿Me puedes hacer el SEO si la web no la has hecho tú?", a: "Sí. Revisamos la web que tienes y te propongo qué hay que mejorar, tanto si la hacemos nueva como si no." },
        { q: "¿Haces SEO en Manresa y en todo el Bages?", a: "Sí. Estoy en Sant Fruitós de Bages y trabajo con negocios de Manresa, Navarcles, Sallent, Santpedor, Sant Joan de Vilatorrada y el resto del Bages. También a distancia con negocios de toda Cataluña." },
        { q: "¿Qué diferencia hay entre SEO y Google Ads?", a: "El SEO te hace salir en los resultados orgánicos, sin pagar por cada clic: cuesta más arrancar, pero las visitas se quedan. Google Ads es publicidad de pago: da visitas rápido, pero se acaban cuando dejas de pagar." },
        { q: "¿Cuánto cuesta el SEO?", a: "Depende del estado de la web y de la competencia de tus búsquedas. Tras una primera conversación y una revisión inicial, sin compromiso, te preparo una propuesta con el alcance y el precio." },
        { q: "¿Necesito la ficha de Google Business?", a: "Si tienes un negocio con local o que da servicio en una zona, sí: es una de las maneras más rápidas de salir en el mapa y en las búsquedas locales. Te ayudo a crearla y optimizarla." },
      ],
    },
    audit: {
      metaTitle: "Auditoría SEO en Manresa y el Bages | Biel Díaz",
      metaDescription: "Auditoría SEO de tu web: errores técnicos, indexación, palabras clave y ficha de Google Business, con un informe claro y las acciones por prioridad.",
      h1: "Auditoría SEO",
      heading: "Auditoría SEO en Manresa y el Bages",
      intro: "Reviso tu web de arriba abajo y te explico, sin jerga, qué te impide salir en Google y qué hay que arreglar primero. Recibirás un informe claro con las acciones ordenadas por prioridad.",
      forWho: [
        "Negocios que tienen web pero no reciben visitas de Google.",
        "Webs que han perdido posiciones o tráfico y no saben por qué.",
        "Quien quiere saber en qué punto está antes de contratar SEO o rediseñar la web.",
      ],
      includes: [
        "Revisión técnica: indexación, errores, redirecciones, velocidad y versión para móvil.",
        "Análisis de los títulos, las descripciones, los encabezados y los contenidos de cada página.",
        "Búsqueda de las palabras clave reales de tu zona y de quién sale hoy.",
        "Revisión de la ficha de Google Business y de la presencia local.",
        "Lectura de Search Console y Analytics, si ya los tienes.",
        "Informe con las acciones ordenadas por prioridad y una llamada para explicarlo.",
      ],
      sections: [
        {
          title: "Qué recibirás",
          paragraphs: [
            "Un informe escrito, en catalán o en castellano, con lo que he encontrado y por qué importa, explicado para alguien que no es técnico. Cada problema tiene su solución concreta y una prioridad: qué hay que hacer ya, qué puede esperar y qué no vale la pena.",
            "Después lo hablamos por videollamada, o en persona si eres de la zona, y tú decides si lo arreglas tú, si lo hace tu equipo o si lo hago yo.",
          ],
        },
        {
          title: "Cuándo conviene hacer una auditoría SEO",
          paragraphs: [
            "Antes de rediseñar una web, porque un cambio mal hecho puede hacerte perder las posiciones que ya tienes. Cuando el tráfico baja sin un motivo claro. O si hace tiempo que tienes web y nunca has visto cómo te ve Google.",
          ],
        },
      ],
      related: null,
      faqs: [
        { q: "¿Qué es una auditoría SEO?", a: "Es una revisión de tu web para saber qué te impide salir en Google: errores técnicos, contenidos que no responden a lo que busca la gente y poca presencia local. El resultado es un informe con lo que hay que mejorar." },
        { q: "¿Cuánto tarda una auditoría SEO?", a: "Depende del tamaño de la web. Una web pequeña suele estar revisada en pocos días. En la propuesta tienes el plazo exacto." },
        { q: "¿Cuánto cuesta una auditoría SEO?", a: "Depende del tamaño de la web y del alcance. Tras una primera conversación, sin compromiso, te preparo una propuesta con el precio cerrado." },
        { q: "¿Me haces la auditoría si la web no la has hecho tú?", a: "Sí. Funciona con cualquier web, tanto si está en WordPress o a medida como si la has hecho con Wix o Squarespace." },
        { q: "¿Haces auditorías SEO en Manresa y el Bages?", a: "Sí. Estoy en Sant Fruitós de Bages y hago auditorías a negocios de Manresa y del Bages, y también a distancia en toda Cataluña." },
        { q: "¿Qué pasa después de la auditoría?", a: "Tienes el informe y decides. Puedes aplicarlo tú, pasarlo a tu equipo o pedirme que lo implemente con el servicio de gestión de SEO." },
      ],
    },
    smb: {
      metaTitle: "Apps para pymes: presupuestos, pedidos y tareas | Biel Díaz",
      metaDescription: "Digitalizo los procesos de tu negocio con apps pensadas para equipos pequeños: presupuestos, pedidos o tareas. Fáciles de usar desde el primer día.",
      h1: "Apps para pymes",
      intro: "Digitalizo los procesos de tu negocio con apps pensadas para equipos pequeños: presupuestos, pedidos o tareas. Fáciles de usar desde el primer día.",
      forWho: [
        "Pymes y autónomos que pierden tiempo con papeleo y correos.",
        "Equipos pequeños que necesitan compartir información al momento.",
        "Negocios que quieren dejar de depender de hojas de cálculo.",
      ],
      includes: [
        "Presupuestos, pedidos, tareas o el proceso que necesites digitalizar.",
        "Acceso para todo el equipo con usuarios y permisos.",
        "Estadísticas para ver cómo va el negocio.",
        "Importación de los datos que ya tienes, desde Excel o PDF.",
        "Avisos automáticos por correo electrónico.",
      ],
      related: "camescola",
      faqs: [
        { q: "¿Los datos son seguros?", a: "Sí. Cada persona entra con su usuario, solo ve lo que le corresponde y la conexión va cifrada." },
        { q: "¿Podemos importar los datos que ya tenemos?", a: "Sí. Podemos traer los datos de tus hojas de cálculo o documentos para que no tengas que empezar de cero." },
      ],
    },
  },

  local: {
    metaTitle: "Diseño web en Manresa y el Bages | Biel Díaz",
    metaDescription: "Diseñador y desarrollador web en Sant Fruitós de Bages. Webs, apps a medida y SEO para negocios de Manresa y el Bages, con trato directo.",
    h1: "Diseño web en Manresa y el Bages",
    intro: "Soy Biel, desarrollador web y diseñador en Sant Fruitós de Bages, al lado de Manresa. Hago webs, apps a medida y SEO para negocios y profesionales de la zona.",
    whyTitle: "Por qué trabajar con alguien de aquí",
    why: [
      "Trato directo: hablas con quien diseña y programa tu web, sin intermediarios.",
      "Conozco la zona: sé cómo busca la gente de Manresa y el Bages, y lo tengo en cuenta para salir en Google.",
      "Si estás cerca, podemos vernos en persona para hablar del proyecto.",
    ],
    areasTitle: "Zona en la que trabajo",
    areas: "Manresa, Sant Fruitós de Bages, Navarcles, Santpedor, Sant Joan de Vilatorrada, Sallent, Callús, Artés y el resto del Bages. También trabajo a distancia con negocios de toda Cataluña.",
    servicesTitle: "Qué puedo hacer por ti",
    faqs: [
      { q: "¿Tienes que ser del Bages para trabajar conmigo?", a: "No. Muchos clientes son de Manresa y alrededores, pero trabajo a distancia con negocios de toda Cataluña." },
      { q: "¿Me ayudas a salir en Google cuando buscan mi negocio en la zona?", a: "Sí. Optimizamos la web y la ficha de Google Business para que salgas cuando alguien busca tu servicio en Manresa y el Bages." },
    ],
  },

  homeFaq: {
    eyebrow: "Preguntas",
    title: "Preguntas frecuentes",
    items: [
      { q: "¿Trabajas solo con negocios del Bages?", a: "No. Estoy en Sant Fruitós de Bages y muchos clientes son de Manresa y alrededores, pero trabajo a distancia con negocios de toda Cataluña." },
      { q: "¿Cuánto cuesta una web o una app?", a: "Depende de lo que necesites. Después de una primera conversación, sin compromiso, te preparo una propuesta con el alcance, los plazos y el precio." },
      { q: "¿Cuánto se tarda en tener la web?", a: "Una web sencilla suele estar lista en una o dos semanas, y una más completa, en tres o cuatro. Una app a medida depende del alcance. En la propuesta tienes los plazos." },
      { q: "¿WordPress o una web a medida?", a: "WordPress es ideal si quieres una web sencilla que puedas editar tú mismo. Si necesitas un diseño único, animaciones o funciones especiales, te conviene más una web a medida." },
      { q: "¿Me puedes ayudar si ya tengo web?", a: "Sí. Puedo revisarla, mejorar su SEO para que salga en Google o rediseñarla." },
    ],
  },
}
