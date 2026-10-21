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
      metaTitle: "Apps de gestión a medida en Manresa y el Bages | Biel Díaz",
      metaDescription: "Apps de gestión hechas a tu manera de trabajar: clientes, reservas, inventario o lo que necesites, en un solo lugar. Desarrollador en Manresa y el Bages.",
      h1: "Apps de gestión a medida",
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
      related: "sergigarcia",
      faqs: [
        { q: "¿Puedo empezar con una versión pequeña y ampliarla después?", a: "Sí. Es la forma recomendada: empezamos por lo que más te hace falta y vamos añadiendo funciones a medida que se usa la app." },
        { q: "¿Puedo usar la app desde el móvil?", a: "Sí. Las apps se diseñan para que funcionen bien en el móvil, la tableta y el ordenador, sin instalar nada." },
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
      metaTitle: "Posicionamiento SEO en Manresa y el Bages | Biel Díaz",
      metaDescription: "Hago que te encuentren en Google: revisión técnica, contenidos y ficha de Google Business. SEO para negocios de Manresa, el Bages y Cataluña.",
      h1: "Gestión de SEO",
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
      related: null,
      faqs: [
        { q: "¿Cuánto se tarda en ver resultados?", a: "El SEO es a medio plazo: los primeros cambios suelen notarse en unas semanas y los resultados sólidos, en unos meses, según la competencia." },
        { q: "¿Me puedes hacer el SEO si la web no la has hecho tú?", a: "Sí. Revisamos la web que tienes y te propongo qué hay que mejorar, tanto si la hacemos nueva como si no." },
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
