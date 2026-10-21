// ── Textos legals en català ───────────────────────────────────────
// Blocs: text (admet [enllaç](url) i correus), { list }, { table }, { dl }.

export default function legalCa({ owner, address, paths, storage }) {
  const titular = [
    ["Titular", owner.name],
    ...(owner.nif ? [["NIF", owner.nif]] : []),
    ["Domicili", address],
    ["Correu electrònic", owner.email],
  ]

  return {
    updatedLabel: "Última actualització",
    legal: {
      title: "Avís legal",
      sections: [
        { heading: "Dades del titular", blocks: [
          `En compliment de l’article 10 de la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), t’informem que el lloc web ${owner.domain} és titularitat de:`,
          { dl: titular },
        ] },
        { heading: "Objecte", blocks: [
          "Aquest lloc web presenta l’activitat professional del titular com a desenvolupador web i dissenyador, els serveis que ofereix i alguns dels projectes que ha fet, i permet posar-s’hi en contacte.",
        ] },
        { heading: "Condicions d’ús", blocks: [
          "Accedir al lloc web i fer-lo servir implica acceptar aquest avís legal. Et comprometes a fer-ne un ús adequat, d’acord amb la llei, la bona fe i l’ordre públic, i a no utilitzar-lo per a activitats il·lícites o que puguin danyar el lloc web o tercers.",
        ] },
        { heading: "Propietat intel·lectual i industrial", blocks: [
          "El disseny, el codi, els textos i la resta de continguts d’aquest lloc web són del titular o s’hi fan servir amb autorització. No se’n permet la reproducció, la distribució, la comunicació pública ni la transformació sense permís per escrit, llevat dels usos que permeti la llei.",
          "Els noms, les marques i les imatges dels projectes que es mostren a la secció de projectes pertanyen als seus titulars respectius i s’hi inclouen només com a mostra de la feina feta.",
        ] },
        { heading: "Enllaços externs", blocks: [
          "Aquest lloc web conté enllaços a webs de tercers, com ara els projectes o les xarxes socials. El titular no en controla el contingut ni se’n fa responsable, i hi accedeixes sota la teva responsabilitat.",
        ] },
        { heading: "Responsabilitat", blocks: [
          "El titular treballa perquè la informació sigui correcta i el lloc web funcioni bé, però no pot garantir que no hi hagi errors o interrupcions, i no es fa responsable dels danys que se’n puguin derivar, dins dels límits que permet la llei.",
        ] },
        { heading: "Protecció de dades i cookies", blocks: [
          `El tractament de les dades personals es regeix per la [Política de privacitat](${paths.privacy}), i l’ús de cookies i tecnologies similars, per la [Política de cookies](${paths.cookies}).`,
        ] },
        { heading: "Legislació aplicable", blocks: [
          "Aquest avís legal es regeix per la legislació espanyola. Per a qualsevol controvèrsia, les parts se sotmeten als jutjats i tribunals que corresponguin d’acord amb la normativa aplicable i, si l’usuari és consumidor, als del seu domicili.",
        ] },
      ],
    },

    privacy: {
      title: "Política de privacitat",
      intro: `Aquesta política explica quines dades personals es recullen a ${owner.domain}, per a què es fan servir i quins drets tens, d’acord amb el Reglament (UE) 2016/679 (RGPD) i la Llei orgànica 3/2018 (LOPDGDD).`,
      sections: [
        { heading: "Responsable del tractament", blocks: [{ dl: titular }] },
        { heading: "Quines dades es recullen", blocks: [
          "Només les que tu facis arribar a través del formulari de contacte o per correu electrònic: el teu nom, la teva adreça de correu electrònic, el missatge i, si n’has marcat, els serveis que t’interessen.",
          "A més, com passa amb qualsevol web, el servei d’allotjament registra dades tècniques de la connexió (com l’adreça IP i el navegador) per motius de seguretat i funcionament.",
          "També es fa servir Cloudflare Web Analytics per saber, de manera agregada, quantes visites rep la web i quines pàgines es consulten. Aquesta eina no fa servir cookies ni guarda res al teu navegador, i no identifica qui visita la web.",
          "Si ho acceptes al bàner de cookies, també es fa servir Google Analytics per saber com s’utilitza la web: quines pàgines es visiten, d’on arriben les visites (per exemple, des d’un cercador), el tipus de dispositiu i la ubicació aproximada. Google Analytics fa servir cookies amb un identificador aleatori i no s’activa si no l’acceptes.",
        ] },
        { heading: "Per a què es fan servir", blocks: [
          { list: [
            "Respondre la teva consulta i, si ho demanes, preparar-te una proposta de projecte.",
            "Servir la web, protegir-la de trànsit maliciós i resoldre errors (dades tècniques de connexió).",
            "Conèixer de manera agregada i anònima l’ús de la web (Cloudflare Web Analytics).",
            "Si ho acceptes, analitzar amb més detall com s’utilitza la web per millorar-la (Google Analytics).",
          ] },
          "No s’utilitzen per enviar-te publicitat ni per crear perfils, i no es prenen decisions automatitzades.",
        ] },
        { heading: "Base legal", blocks: [
          { list: [
            "Consultes: la teva sol·licitud i l’aplicació de mesures precontractuals a petició teva (art. 6.1.b RGPD) i el teu consentiment en enviar el formulari (art. 6.1.a RGPD).",
            "Dades tècniques i estadístiques agregades: l’interès legítim a mantenir la web segura, en funcionament i a saber com s’utilitza (art. 6.1.f RGPD).",
            "Google Analytics: el teu consentiment al bàner de cookies (art. 6.1.a RGPD), que pots retirar en qualsevol moment.",
          ] },
        ] },
        { heading: "Quant de temps es conserven", blocks: [
          "Les dades de les consultes es conserven el temps necessari per respondre-les i, com a màxim, un any des de l’últim contacte. Si comencem a treballar junts, es conserven mentre duri la relació i durant els terminis que exigeixi la llei (per exemple, en matèria fiscal).",
        ] },
        { heading: "Qui hi té accés", blocks: [
          "Les dades no es cedeixen a tercers, llevat d’obligació legal. Per fer funcionar la web hi intervenen aquests proveïdors, que les tracten per compte del titular:",
          { list: [
            "Cloudflare, Inc. (Estats Units): allotjament i distribució de la web, i estadístiques de visites sense cookies (Cloudflare Web Analytics).",
            "Google Ireland Limited (Irlanda) i Google LLC (Estats Units): estadístiques de visites amb Google Analytics, només si ho acceptes.",
            "Formspree, Inc. (Estats Units): recepció i enviament dels missatges del formulari de contacte.",
            "Proton AG (Suïssa): servei de correu electrònic amb què es responen les consultes.",
          ] },
        ] },
        { heading: "Transferències internacionals", blocks: [
          "Cloudflare, Google i Formspree poden tractar dades als Estats Units. En aquests casos, la transferència es fa amb les garanties que preveu el RGPD, com el Marc de Privacitat de Dades UE-EUA o les clàusules contractuals tipus aprovades per la Comissió Europea. Suïssa té una decisió d’adequació de la Comissió Europea.",
        ] },
        { heading: "Els teus drets", blocks: [
          `Pots exercir els drets d’accés, rectificació, supressió, oposició, limitació del tractament i portabilitat, i retirar el consentiment en qualsevol moment, escrivint a ${owner.email}. Indica quin dret vols exercir; si cal, et podem demanar que acreditis la teva identitat.`,
          "Si consideres que no s’han tractat bé les teves dades, pots presentar una reclamació a l’[Agència Espanyola de Protecció de Dades](https://www.aepd.es).",
        ] },
        { heading: "Menors", blocks: [
          "Aquesta web no s’adreça a menors de 14 anys. Si en tens menys, no enviïs dades personals sense el consentiment dels teus pares o tutors.",
        ] },
        { heading: "Seguretat", blocks: [
          "S’apliquen mesures tècniques i organitzatives raonables per protegir les dades, com la connexió xifrada (HTTPS).",
        ] },
        { heading: "Canvis en aquesta política", blocks: [
          "Aquesta política es pot actualitzar per adaptar-la a canvis legals o del servei. La data de l’última actualització és a l’inici de la pàgina.",
        ] },
      ],
    },

    cookies: {
      title: "Política de cookies",
      intro: "Aquesta política explica què guarda aquesta web al teu navegador i per a què.",
      sections: [
        { heading: "Què són les cookies", blocks: [
          "Les cookies i les tecnologies similars (com l’emmagatzematge local del navegador) són petits fitxers o dades que una web guarda al teu dispositiu per funcionar o per recordar informació sobre la visita.",
        ] },
        { heading: "Què fa servir aquesta web", blocks: [
          storage.hasConsent
            ? "Aquesta web només fa servir les cookies i dades tècniques imprescindibles i, si ho acceptes al bàner, les d’analítica que es detallen a continuació."
            : "Ara mateix, aquesta web no fa servir cookies d’analítica, de publicitat ni de xarxes socials. Només guarda la informació tècnica imprescindible que es detalla a continuació, que no requereix el teu consentiment d’acord amb l’article 22.2 de la LSSI-CE.",
          { table: {
            head: ["Nom", "Tipus", "Finalitat", "Durada"],
            rows: [
              ["intro-seen", "Emmagatzematge de sessió (propi)", "Recorda que ja has vist l’animació d’entrada perquè no es repeteixi.", "Fins que tanques la pestanya"],
              ...(storage.hasConsent ? [["cookie-consent", "Emmagatzematge local (propi)", "Guarda les teves preferències de cookies.", "12 mesos"]] : []),
              ...(storage.hasConsent ? [
                ["_ga", "Cookie d’analítica (Google Analytics)", "Distingeix visitants amb un identificador aleatori. Només si l’acceptes.", "2 anys"],
                ["_ga_4PM01TM1G7", "Cookie d’analítica (Google Analytics)", "Manté l’estat de la sessió de visita. Només si l’acceptes.", "2 anys"],
              ] : []),
              ["__cf_bm", "Cookie de tercers (Cloudflare)", "Seguretat: distingeix el trànsit legítim dels bots. Només s’estableix si el sistema de protecció de l’allotjament ho requereix.", "30 minuts"],
            ],
          } },
        ] },
        { heading: "Analítica", blocks: [
          storage.hasConsent
            ? "Per comptar visites es fa servir Cloudflare Web Analytics, que no fa servir cookies. A més, si ho acceptes al bàner, s’activa Google Analytics (Google Ireland Limited), que sí que en fa servir; si no ho acceptes, no es carrega. Pots canviar d’opinió en qualsevol moment des de l’enllaç «Preferències de cookies» del peu de pàgina, i si retires el consentiment s’esborren les cookies de Google Analytics. Més informació: [com fa servir Google les dades](https://policies.google.com/technologies/partner-sites)."
            : "Per saber quantes visites rep la web es fa servir Cloudflare Web Analytics, que les compta de manera agregada sense cookies ni dades al navegador; per això no cal el teu consentiment. Si en el futur s’afegeix una eina que sí que en faci servir, s’actualitzarà aquesta política i no s’activarà fins que no l’hagis acceptada al bàner de cookies.",
        ] },
        { heading: "Com gestionar-les", blocks: [
          "Pots consultar, bloquejar o esborrar les cookies i l’emmagatzematge local des de la configuració del navegador. La web continuarà funcionant, tot i que potser tornaràs a veure l’animació d’entrada.",
          { list: [
            "[Google Chrome](https://support.google.com/chrome/answer/95647)",
            "[Mozilla Firefox](https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox)",
            "[Safari](https://support.apple.com/guide/safari/sfri11471/mac)",
            "[Microsoft Edge](https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)",
          ] },
        ] },
        { heading: "Més informació", blocks: [
          `Per a qualsevol dubte, escriu a ${owner.email}. També pots consultar la [Política de privacitat](${paths.privacy}).`,
        ] },
      ],
    },

    notfound: {
      title: "Aquesta pàgina s’ha perdut, però jo no.",
      text: "Potser l’enllaç és antic o hi ha un error a l’adreça. Mentrestant, pots tirar a cistella.",
      back: "Torna a l’inici",
    },
  }
}
