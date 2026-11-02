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
      metaTitle: "Desenvolupament d’apps a mida a Manresa | Biel Díaz",
      metaDescription: "Desenvolupo apps de gestió a mida per a negocis de Manresa i el Bages: clients, reserves, inventari i més, amb tracte directe i sense intermediaris.",
      h1: "Apps de gestió a mida",
      heading: "Apps de gestió a mida a Manresa i el Bages",
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
      sections: [
        {
          title: "Per què una app a mida i no un programa estàndard",
          paragraphs: [
            "Un programa estàndard et fa adaptar el negoci al programa. Una app a mida fa el contrari: es dissenya a partir de com treballes, amb els camps, els passos i els permisos que necessites i res més. Així estalvies temps cada dia i no pagues per funcions que no fas servir.",
            "Com que treballes amb una persona de la zona, pots explicar el procés en persona, provar versions petites i ajustar-ho sobre la marxa.",
          ],
        },
        {
          title: "Com ho faig",
          paragraphs: [
            "Començo per una primera versió que resol el que ara et fa perdre més temps, la provem amb el teu equip i hi anem afegint funcions. Ho dissenyo i ho programo jo directament, i t’explico com funciona perquè no en depenguis a cegues.",
            "L’app funciona des del navegador, al mòbil i a l’ordinador, i les dades són teves: les pots exportar quan vulguis.",
          ],
        },
      ],
      related: "sergigarcia",
      faqs: [
        { q: "Puc començar amb una versió petita i ampliar-la després?", a: "Sí. És la manera recomanada: comencem pel que et fa més falta i hi anem afegint funcions a mesura que l’app es fa servir." },
        { q: "Puc fer servir l’app des del mòbil?", a: "Sí. Les apps es dissenyen perquè funcionin bé al mòbil, a la tauleta i a l’ordinador, sense haver d’instal·lar res." },
        { q: "Fas apps a mida a Manresa i al Bages?", a: "Sí. Soc a Sant Fruitós de Bages i desenvolupo apps per a negocis de Manresa i del Bages, i també a distància per a negocis de tot Catalunya." },
        { q: "Quant costa una app a mida?", a: "Depèn de l’abast i de les funcions que necessitis. Després d’una primera conversa, sense compromís, et preparo una proposta amb el preu i els terminis." },
        { q: "Quant es triga a tenir l’app?", a: "Depèn de l’abast. Una primera versió amb les funcions essencials es pot provar abans que l’app completa, i a la proposta tens els terminis exactes." },
        { q: "I si més endavant necessito canvis?", a: "No hi ha problema. Continuo al teu costat: l’app es pot ampliar o ajustar quan el negoci canvia." },
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
      metaDescription: "Especialista en SEO a Manresa i el Bages: auditoria, paraules clau, continguts i fitxa de Google Business perquè et trobin els clients de la zona.",
      h1: "Gestió de SEO",
      heading: "Posicionament SEO a Manresa i el Bages",
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
      sections: [
        {
          title: "Per què el SEO local funciona al Bages",
          paragraphs: [
            "Quan algú busca “posicionament web Manresa” o “SEO al Bages”, Google ensenya primer els negocis que demostren que són de la zona i que responen bé el que es busca. La competència local és molt més petita que la nacional, i per això una feina ben feta pot donar resultats abans que en les cerques genèriques.",
            "Soc especialista en SEO a Sant Fruitós de Bages: treballo amb tu directament, sense l’estructura ni els intermediaris d’una agència, i sé com busca la gent de Manresa, Navarcles, Sallent o Santpedor.",
          ],
        },
        {
          title: "Què faig perquè surtis a Google",
          paragraphs: [
            "Primer reviso com et veu Google: si les pàgines s’indexen, si hi ha errors, si la web carrega ràpid i si els títols i les descripcions conviden a fer clic. Després trio les cerques que porten clients de debò (un servei més una població) i les assigno a la pàgina que millor les respon.",
            "Finalment treballo la part local: la fitxa de Google Business, les ressenyes i els enllaços des de directoris i negocis de la zona. Cada mes miro Search Console per saber què s’ha mogut i què toca fer després.",
          ],
        },
      ],
      related: null,
      faqs: [
        { q: "Quant es triga a veure resultats?", a: "El SEO és a mitjà termini: els primers canvis solen notar-se en unes setmanes i els resultats sòlids, en uns mesos, segons la competència." },
        { q: "Em pots fer el SEO si la web no l’has feta tu?", a: "Sí. Revisem la web que tens i et proposo què cal millorar, tant si la fem nova com si no." },
        { q: "Fas SEO a Manresa i a tot el Bages?", a: "Sí. Soc a Sant Fruitós de Bages i treballo amb negocis de Manresa, Navarcles, Sallent, Santpedor, Sant Joan de Vilatorrada i la resta del Bages. També a distància amb negocis de tot Catalunya." },
        { q: "Quina diferència hi ha entre SEO i Google Ads?", a: "El SEO et fa sortir als resultats orgànics, sense pagar per cada clic: costa més d’arrencar, però les visites es queden. Google Ads és publicitat de pagament: dóna visites ràpid, però s’acaben quan deixes de pagar." },
        { q: "Quant costa el SEO?", a: "Depèn de l’estat de la web i de la competència de les teves cerques. Després d’una primera conversa i una revisió inicial, sense compromís, et preparo una proposta amb l’abast i el preu." },
        { q: "Necessito la fitxa de Google Business?", a: "Si tens un negoci amb local o que dóna servei en una zona, sí: és una de les maneres més ràpides de sortir al mapa i a les cerques locals. T’ajudo a crear-la i optimitzar-la." },
      ],
    },
    audit: {
      metaTitle: "Auditoria SEO a Manresa i el Bages | Biel Díaz",
      metaDescription: "Auditoria SEO de la teva web: errors tècnics, indexació, paraules clau i fitxa de Google Business, amb un informe clar i les accions per prioritat.",
      h1: "Auditoria SEO",
      heading: "Auditoria SEO a Manresa i el Bages",
      intro: "Reviso la teva web de dalt a baix i t’explico, sense jargó, què t’impedeix sortir a Google i què cal arreglar primer. Rebràs un informe clar amb les accions ordenades per prioritat.",
      forWho: [
        "Negocis que tenen web però no reben visites de Google.",
        "Webs que han perdut posicions o trànsit i no saben per què.",
        "Qui vol saber en quin punt és abans de contractar SEO o redissenyar la web.",
      ],
      includes: [
        "Revisió tècnica: indexació, errors, redireccions, velocitat i versió per a mòbil.",
        "Anàlisi dels títols, les descripcions, els encapçalaments i els continguts de cada pàgina.",
        "Recerca de les paraules clau reals de la teva zona i de qui hi surt avui.",
        "Revisió de la fitxa de Google Business i de la presència local.",
        "Lectura de Search Console i Analytics, si ja els tens.",
        "Informe amb les accions ordenades per prioritat i una trucada per explicar-lo.",
      ],
      sections: [
        {
          title: "Què rebràs",
          paragraphs: [
            "Un informe escrit, en català o en castellà, amb el que he trobat i per què importa, explicat per a algú que no és tècnic. Cada problema té la solució concreta i una prioritat: què cal fer ja, què pot esperar i què no val la pena.",
            "Després en parlem per videotrucada, o en persona si ets de la zona, i tu decideixes si ho arregles tu, si ho fa el teu equip o si ho faig jo.",
          ],
        },
        {
          title: "Quan convé fer una auditoria SEO",
          paragraphs: [
            "Abans de redissenyar una web, perquè un canvi mal fet pot fer perdre les posicions que ja tens. Quan el trànsit baixa sense un motiu clar. O si fa temps que tens web i mai has vist com et veu Google.",
          ],
        },
      ],
      related: null,
      faqs: [
        { q: "Què és una auditoria SEO?", a: "És una revisió de la teva web per saber què t’impedeix sortir a Google: errors tècnics, continguts que no responen el que busca la gent i poca presència local. El resultat és un informe amb el que cal millorar." },
        { q: "Quant triga una auditoria SEO?", a: "Depèn de la mida de la web. Una web petita sol estar revisada en pocs dies. A la proposta tens el termini exacte." },
        { q: "Quant costa una auditoria SEO?", a: "Depèn de la mida de la web i de l’abast. Després d’una primera conversa, sense compromís, et preparo una proposta amb el preu tancat." },
        { q: "Em fas l’auditoria si la web no l’has feta tu?", a: "Sí. Funciona amb qualsevol web, tant si és en WordPress o a mida com si l’has fet amb Wix o Squarespace." },
        { q: "Fas auditories SEO a Manresa i el Bages?", a: "Sí. Soc a Sant Fruitós de Bages i faig auditories a negocis de Manresa i del Bages, i també a distància a tot Catalunya." },
        { q: "Què passa després de l’auditoria?", a: "Tens l’informe i decideixes. Pots aplicar-ho tu, passar-ho al teu equip o demanar-me que ho implementi amb el servei de gestió de SEO." },
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
    metaDescription: "Disseny i creació de pàgines web a Manresa i el Bages: webs, apps a mida i SEO amb tracte directe. Dissenyador i programador a Sant Fruitós de Bages.",
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
    sections: [
      {
        title: "Creació de pàgines web a Manresa",
        paragraphs: [
          "Faig pàgines web per a botigues, restaurants, professionals, clubs i empreses de Manresa i el Bages: des d’una web senzilla en WordPress fins a una web a mida amb disseny propi. Tot en català i, si cal, també en castellà i en anglès.",
        ],
      },
      {
        title: "Programador i dissenyador web a Sant Fruitós de Bages",
        paragraphs: [
          "Soc programador i dissenyador web: faig el disseny i el desenvolupament jo mateix, així que no hi ha intermediaris ni traspassos entre equips. Les webs són ràpides, es veuen bé al mòbil i surten preparades per aparèixer a Google des del primer dia.",
        ],
      },
    ],
    servicesTitle: "Què puc fer per tu",
    faqs: [
      { q: "Has de ser del Bages per treballar amb tu?", a: "No. Molts clients són de Manresa i rodalies, però treballo a distància amb negocis de tot Catalunya." },
      { q: "M’ajudes a sortir a Google quan busquen el meu negoci a la zona?", a: "Sí. Optimitzem la web i la fitxa de Google Business perquè surtis quan algú busca el teu servei a Manresa i el Bages." },
      { q: "Quant costa una pàgina web a Manresa?", a: "Depèn del que necessitis: una web senzilla no és el mateix que una web a mida amb animacions o funcions especials. Després d’una primera conversa, sense compromís, et preparo una proposta amb l’abast, els terminis i el preu." },
      { q: "Fas pàgines web a Manresa i a Sant Fruitós de Bages?", a: "Sí. Soc a Sant Fruitós de Bages, al costat de Manresa, i faig pàgines web per a negocis i professionals de tot el Bages. Si ens volem veure en persona, no hi ha problema." },
      { q: "Quant es triga a tenir la web?", a: "Una web senzilla sol estar llesta en una o dues setmanes, i una de més completa, en tres o quatre. A la proposta tens els terminis exactes." },
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
