// ── Contingut de les pàgines de servei, la pàgina local i les FAQ (ca) ──
// JS pla: també l'importa src/seo/meta.js per als títols i les dades
// estructurades. Sense preus ni dades que no siguin del Biel.

export default {
  ui: {
    home: "Inici",
    services: "Serveis",
    forWho: "Per a qui és",
    includes: "Què inclou",
    process: "Com treballo",
    related: "Projecte relacionat",
    relatedLink: "Veure el projecte",
    allProjects: "Veure tots els projectes",
    faq: "Preguntes freqüents",
    otherServices: "Altres serveis",
    more: "Més informació",
    ctaTitle: "Parlem del teu projecte",
    ctaText: "Explica’m què necessites i et respondré en menys de 24 h, sense compromís.",
    ctaButton: "Parlem",
    processSteps: [
      { title: "Parlem", text: "Una primera conversa, sense compromís, per entendre què necessites i què vols aconseguir." },
      { title: "Proposta", text: "Et preparo una proposta amb l’abast, els terminis i el preu, perquè sàpigues exactament què tindràs." },
      { title: "Disseny i desenvolupament", text: "Et mostro els avenços i ajustem fins que la web o l’app fa la feina que necessites." },
      { title: "Posada en marxa", text: "La publiquem, t’ensenyo a fer-la servir i continuo al teu costat si cal fer canvis." },
    ],
  },

  services: {
    "custom-apps": {
      metaTitle: "Apps de gestió a mida a Manresa i el Bages | Biel Díaz",
      metaDescription: "Apps de gestió fetes a la teva manera de treballar: clients, reserves, inventari o el que necessitis, en un sol lloc. Desenvolupador a Manresa i el Bages.",
      h1: "Apps de gestió a mida",
      intro: "Eines fetes a la teva manera de treballar: clients, reserves, inventari o el que necessitis, tot en un sol lloc. S’han acabat els fulls de càlcul que no es parlen entre ells.",
      forWho: [
        "Negocis que porten la gestió amb fulls de càlcul, paper o diverses apps que no es connecten.",
        "Equips que fan cada dia les mateixes tasques a mà i volen automatitzar-les.",
        "Professionals que no troben cap programa estàndard que s’adapti a com treballen.",
      ],
      includes: [
        "Anàlisi de com treballes ara i què cal resoldre.",
        "Disseny de pantalles clares i fàcils d’usar, al mòbil i a l’ordinador.",
        "Usuaris i permisos per a cada persona de l’equip.",
        "Importació i exportació de dades, i avisos per correu electrònic quan cal.",
        "Posada en marxa i formació perquè l’equip la faci servir des del primer dia.",
      ],
      related: "sergigarcia",
      faqs: [
        { q: "Puc començar amb una versió petita i ampliar-la després?", a: "Sí. És la manera recomanada: comencem pel que et fa més falta i hi anem afegint funcions a mesura que l’app es fa servir." },
        { q: "Puc fer servir l’app des del mòbil?", a: "Sí. Les apps es dissenyen perquè funcionin bé al mòbil, a la tauleta i a l’ordinador, sense haver d’instal·lar res." },
      ],
    },
    gyms: {
      metaTitle: "Programa de gestió per a gimnasos i entrenadors | Biel Díaz",
      metaDescription: "Socis, quotes, horaris i reserves de classes des d’una sola app. Gestió per a gimnasos, estudis i entrenadors personals, amb portal per als clients.",
      h1: "Gestió per a gimnasos",
      intro: "Socis, quotes, horaris i reserves de classes des d’una sola app. Tu et centres a entrenar i passes menys temps amb papers.",
      forWho: [
        "Gimnasos i estudis petits (ioga, pilates, spinning, funcional).",
        "Entrenadors personals que porten clients i sessions.",
        "Clubs i acadèmies esportives amb grups i inscripcions.",
      ],
      includes: [
        "Fitxa de cada client amb l’estat, les notes i l’historial.",
        "Sessions individuals o de grup amb places i llista d’espera.",
        "Abonaments per paquets o mensuals, amb avisos abans que s’acabin.",
        "Portal perquè els clients reservin i cancel·lin des del mòbil.",
        "Recordatoris per correu electrònic i factures en PDF.",
      ],
      related: "repwise",
      faqs: [
        { q: "Tens un programa ja fet o el fas a mida?", a: "Les dues coses. Repwise és el meu programa de gestió per a entrenadors i clubs petits, i si necessites alguna cosa diferent, el puc adaptar o fer-ne un a mida." },
        { q: "Els clients han d’instal·lar alguna app?", a: "No. El portal del client funciona des del navegador del mòbil, sense instal·lar res." },
      ],
    },
    portfolios: {
      metaTitle: "Web portfoli a mida per a creatius i professionals | Biel Díaz",
      metaDescription: "Una web que ensenya la teva feina com es mereix, dissenyada des de zero i sense plantilles. Portfolis per a dissenyadors, fotògrafs i professionals.",
      h1: "Portfolis web a mida",
      intro: "Una web que ensenya la teva feina com es mereix, dissenyada des de zero i sense plantilles. Ideal per a creatius i professionals que volen destacar.",
      forWho: [
        "Dissenyadors, il·lustradors, fotògrafs i estudis creatius.",
        "Professionals que volen una web pròpia i no una plantilla com la de tothom.",
        "Qualsevol persona que vulgui que la seva feina sigui el que es vegi primer.",
      ],
      includes: [
        "Disseny propi a partir de la teva identitat, sense plantilles.",
        "Galeria de treballs i fitxes de projecte fàcils d’actualitzar.",
        "Animacions cuidades que no fan la web més lenta.",
        "Web ràpida, adaptada al mòbil i preparada per a Google.",
        "Formulari de contacte i enllaços a les teves xarxes.",
      ],
      related: "tresdege",
      faqs: [
        { q: "Podré afegir projectes nous jo mateix?", a: "Sí. Deixem preparada la manera d’afegir-ne de nous perquè el portfoli no es quedi aturat." },
        { q: "Em pots ajudar amb els textos?", a: "Sí. Revisem junts els textos perquè expliquin bé què fas i ajudin a sortir a Google." },
      ],
    },
    wordpress: {
      metaTitle: "Pàgines web en WordPress a Manresa i el Bages | Biel Díaz",
      metaDescription: "Webs senzilles i ràpides en WordPress que pots actualitzar tu mateix. Per a negocis de Manresa i el Bages que volen començar a ser a internet.",
      h1: "Webs bàsiques en WordPress",
      intro: "Una web senzilla, ràpida i que pots actualitzar tu mateix. Perfecta per començar a ser a internet sense complicacions.",
      forWho: [
        "Negocis locals que encara no tenen web o en tenen una d’antiga.",
        "Professionals que volen canviar textos i fotos sense dependre de ningú.",
        "Qui necessita una web clara de poques pàgines, ben feta i aviat.",
      ],
      includes: [
        "Disseny modern adaptat al mòbil.",
        "Les pàgines que necessitis: des d’una sola pàgina fins a quatre o cinc.",
        "Formulari de contacte, mapa i botó de WhatsApp.",
        "SEO bàsic i alta a la fitxa de Google Business.",
        "Formació perquè actualitzis la web tu mateix.",
      ],
      related: null,
      faqs: [
        { q: "Quant es triga a tenir la web?", a: "Una web d’una sola pàgina sol estar llesta en una o dues setmanes, i una de quatre o cinc pàgines, en dues o tres. A la proposta tens els terminis exactes." },
        { q: "WordPress o una web a mida?", a: "WordPress és ideal si vols una web senzilla que puguis editar tu mateix. Si necessites un disseny únic, animacions o funcions especials, et convé més una web a mida." },
      ],
    },
    seo: {
      metaTitle: "Posicionament SEO a Manresa i el Bages | Biel Díaz",
      metaDescription: "Faig que et trobin a Google: revisió tècnica, continguts i fitxa de Google Business. SEO per a negocis de Manresa, el Bages i Catalunya.",
      h1: "Gestió de SEO",
      intro: "Faig que et trobin a Google: revisió tècnica, continguts i fitxa de Google Business. Més visites de gent que busca just el que ofereixes.",
      forWho: [
        "Negocis que tenen web però no surten a Google.",
        "Negocis locals que volen sortir quan algú busca el seu servei a la zona.",
        "Webs que han perdut visites i no saben per què.",
      ],
      includes: [
        "Auditoria tècnica: velocitat, indexació, errors i dades estructurades.",
        "Recerca de paraules clau segons la dificultat i el que busca la teva clientela.",
        "Millora dels títols, les descripcions i els textos de cada pàgina.",
        "Creació i optimització de la fitxa de Google Business.",
        "Configuració de Search Console i seguiment de resultats.",
      ],
      related: null,
      faqs: [
        { q: "Quant es triga a veure resultats?", a: "El SEO és a mitjà termini: els primers canvis solen notar-se en unes setmanes i els resultats sòlids, en uns mesos, segons la competència." },
        { q: "Em pots fer el SEO si la web no l’has feta tu?", a: "Sí. Revisem la web que tens i et proposo què cal millorar, tant si la fem nova com si no." },
      ],
    },
    smb: {
      metaTitle: "Apps per a pimes: pressupostos, comandes i tasques | Biel Díaz",
      metaDescription: "Digitalitzo els processos del teu negoci amb apps pensades per a equips petits: pressupostos, comandes o tasques. Fàcils d’usar des del primer dia.",
      h1: "Apps per a pimes",
      intro: "Digitalitzo els processos del teu negoci amb apps pensades per a equips petits: pressupostos, comandes o tasques. Fàcils d’usar des del primer dia.",
      forWho: [
        "Pimes i autònoms que perden temps amb paperassa i correus.",
        "Equips petits que necessiten compartir informació al moment.",
        "Negocis que volen deixar de dependre de fulls de càlcul.",
      ],
      includes: [
        "Pressupostos, comandes, tasques o el procés que necessitis digitalitzar.",
        "Accés per a tot l’equip amb usuaris i permisos.",
        "Estadístiques per veure com va el negoci.",
        "Importació de les dades que ja tens, des d’Excel o PDF.",
        "Avisos automàtics per correu electrònic.",
      ],
      related: "camescola",
      faqs: [
        { q: "Les dades són segures?", a: "Sí. Cada persona entra amb el seu usuari, només veu el que li toca i la connexió va xifrada." },
        { q: "Podem importar les dades que ja tenim?", a: "Sí. Podem portar les dades dels teus fulls de càlcul o documents perquè no hagis de començar de zero." },
      ],
    },
  },

  local: {
    metaTitle: "Disseny web a Manresa i el Bages | Biel Díaz",
    metaDescription: "Dissenyador i desenvolupador web a Sant Fruitós de Bages. Webs, apps a mida i SEO per a negocis de Manresa i el Bages, amb tracte directe.",
    h1: "Disseny web a Manresa i el Bages",
    intro: "Soc el Biel, desenvolupador web i dissenyador a Sant Fruitós de Bages, al costat de Manresa. Faig webs, apps a mida i SEO per a negocis i professionals de la zona.",
    whyTitle: "Per què treballar amb algú d’aquí",
    why: [
      "Tracte directe: parles amb qui dissenya i programa la teva web, sense intermediaris.",
      "Coneixem la zona: sé com busca la gent de Manresa i el Bages, i ho tinc en compte per sortir a Google.",
      "Si ets a prop, ens podem veure en persona per parlar del projecte.",
    ],
    areasTitle: "Zona on treballo",
    areas: "Manresa, Sant Fruitós de Bages, Navarcles, Santpedor, Sant Joan de Vilatorrada, Sallent, Callús, Artés i la resta del Bages. També treballo a distància amb negocis de tot Catalunya.",
    servicesTitle: "Què puc fer per tu",
    faqs: [
      { q: "Has de ser del Bages per treballar amb tu?", a: "No. Molts clients són de Manresa i rodalies, però treballo a distància amb negocis de tot Catalunya." },
      { q: "M’ajudes a sortir a Google quan busquen el meu negoci a la zona?", a: "Sí. Optimitzem la web i la fitxa de Google Business perquè surtis quan algú busca el teu servei a Manresa i el Bages." },
    ],
  },

  homeFaq: {
    eyebrow: "Preguntes",
    title: "Preguntes freqüents",
    items: [
      { q: "Treballes només amb negocis del Bages?", a: "No. Soc a Sant Fruitós de Bages i molts clients són de Manresa i rodalies, però treballo a distància amb negocis de tot Catalunya." },
      { q: "Quant costa una web o una app?", a: "Depèn del que necessitis. Després d’una primera conversa, sense compromís, et preparo una proposta amb l’abast, els terminis i el preu." },
      { q: "Quant es triga a tenir la web?", a: "Una web senzilla sol estar llesta en una o dues setmanes, i una de més completa, en tres o quatre. Una app a mida depèn de l’abast. A la proposta tens els terminis." },
      { q: "WordPress o una web a mida?", a: "WordPress és ideal si vols una web senzilla que puguis editar tu mateix. Si necessites un disseny únic, animacions o funcions especials, et convé més una web a mida." },
      { q: "Em pots ajudar si ja tinc web?", a: "Sí. Puc revisar-la, millorar-ne el SEO perquè surti a Google o redissenyar-la." },
    ],
  },
}
