// ── Textos legales en castellano ──────────────────────────────────
// Bloques: texto (admite [enlace](url) y correos), { list }, { table }, { dl }.

export default function legalEs({ owner, address, paths, storage }) {
  const titular = [
    ["Titular", owner.name],
    ...(owner.nif ? [["NIF", owner.nif]] : []),
    ["Domicilio", address],
    ["Correo electrónico", owner.email],
  ]

  return {
    updatedLabel: "Última actualización",
    legal: {
      title: "Aviso legal",
      sections: [
        { heading: "Datos del titular", blocks: [
          `En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), te informamos de que el sitio web ${owner.domain} es titularidad de:`,
          { dl: titular },
        ] },
        { heading: "Objeto", blocks: [
          "Este sitio web presenta la actividad profesional del titular como desarrollador web y diseñador, los servicios que ofrece y algunos de los proyectos que ha realizado, y permite ponerse en contacto con él.",
        ] },
        { heading: "Condiciones de uso", blocks: [
          "Acceder al sitio web y utilizarlo implica aceptar este aviso legal. Te comprometes a hacer un uso adecuado, conforme a la ley, la buena fe y el orden público, y a no utilizarlo para actividades ilícitas o que puedan dañar el sitio web o a terceros.",
        ] },
        { heading: "Propiedad intelectual e industrial", blocks: [
          "El diseño, el código, los textos y el resto de contenidos de este sitio web son del titular o se utilizan con autorización. No se permite su reproducción, distribución, comunicación pública ni transformación sin permiso por escrito, salvo los usos que permita la ley.",
          "Los nombres, las marcas y las imágenes de los proyectos que se muestran en la sección de proyectos pertenecen a sus respectivos titulares y se incluyen solo como muestra del trabajo realizado.",
        ] },
        { heading: "Enlaces externos", blocks: [
          "Este sitio web contiene enlaces a webs de terceros, como los proyectos o las redes sociales. El titular no controla su contenido ni se hace responsable de él, y accedes bajo tu responsabilidad.",
        ] },
        { heading: "Responsabilidad", blocks: [
          "El titular trabaja para que la información sea correcta y el sitio web funcione bien, pero no puede garantizar que no haya errores o interrupciones, y no se hace responsable de los daños que se puedan derivar, dentro de los límites que permite la ley.",
        ] },
        { heading: "Protección de datos y cookies", blocks: [
          `El tratamiento de los datos personales se rige por la [Política de privacidad](${paths.privacy}), y el uso de cookies y tecnologías similares, por la [Política de cookies](${paths.cookies}).`,
        ] },
        { heading: "Legislación aplicable", blocks: [
          "Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa aplicable y, si el usuario es consumidor, a los de su domicilio.",
        ] },
      ],
    },

    privacy: {
      title: "Política de privacidad",
      intro: `Esta política explica qué datos personales se recogen en ${owner.domain}, para qué se utilizan y qué derechos tienes, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).`,
      sections: [
        { heading: "Responsable del tratamiento", blocks: [{ dl: titular }] },
        { heading: "Qué datos se recogen", blocks: [
          "Solo los que nos hagas llegar a través del formulario de contacto o por correo electrónico: tu nombre, tu dirección de correo electrónico, el mensaje y, si los has marcado, los servicios que te interesan.",
          "Además, como ocurre con cualquier web, el servicio de alojamiento registra datos técnicos de la conexión (como la dirección IP y el navegador) por motivos de seguridad y funcionamiento.",
        ] },
        { heading: "Para qué se utilizan", blocks: [
          { list: [
            "Responder a tu consulta y, si lo pides, prepararte una propuesta de proyecto.",
            "Servir la web, protegerla de tráfico malicioso y resolver errores (datos técnicos de conexión).",
          ] },
          "No se utilizan para enviarte publicidad ni para crear perfiles, y no se toman decisiones automatizadas.",
        ] },
        { heading: "Base legal", blocks: [
          { list: [
            "Consultas: tu solicitud y la aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD) y tu consentimiento al enviar el formulario (art. 6.1.a RGPD).",
            "Datos técnicos: el interés legítimo en mantener la web segura y en funcionamiento (art. 6.1.f RGPD).",
          ] },
        ] },
        { heading: "Cuánto tiempo se conservan", blocks: [
          "Los datos de las consultas se conservan el tiempo necesario para responderlas y, como máximo, un año desde el último contacto. Si empezamos a trabajar juntos, se conservan mientras dure la relación y durante los plazos que exija la ley (por ejemplo, en materia fiscal).",
        ] },
        { heading: "Quién tiene acceso", blocks: [
          "Los datos no se ceden a terceros, salvo obligación legal. Para que la web funcione intervienen estos proveedores, que los tratan por cuenta del titular:",
          { list: [
            "Cloudflare, Inc. (Estados Unidos): alojamiento y distribución de la web.",
            "Formspree, Inc. (Estados Unidos): recepción y envío de los mensajes del formulario de contacto.",
            "Proton AG (Suiza): servicio de correo electrónico con el que se responden las consultas.",
          ] },
        ] },
        { heading: "Transferencias internacionales", blocks: [
          "Cloudflare y Formspree pueden tratar datos en Estados Unidos. En esos casos, la transferencia se realiza con las garantías que prevé el RGPD, como el Marco de Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo aprobadas por la Comisión Europea. Suiza cuenta con una decisión de adecuación de la Comisión Europea.",
        ] },
        { heading: "Tus derechos", blocks: [
          `Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a ${owner.email}. Indica qué derecho quieres ejercer; si es necesario, podemos pedirte que acredites tu identidad.`,
          "Si consideras que tus datos no se han tratado correctamente, puedes presentar una reclamación ante la [Agencia Española de Protección de Datos](https://www.aepd.es).",
        ] },
        { heading: "Menores", blocks: [
          "Esta web no se dirige a menores de 14 años. Si tienes menos, no envíes datos personales sin el consentimiento de tus padres o tutores.",
        ] },
        { heading: "Seguridad", blocks: [
          "Se aplican medidas técnicas y organizativas razonables para proteger los datos, como la conexión cifrada (HTTPS).",
        ] },
        { heading: "Cambios en esta política", blocks: [
          "Esta política puede actualizarse para adaptarla a cambios legales o del servicio. La fecha de la última actualización aparece al inicio de la página.",
        ] },
      ],
    },

    cookies: {
      title: "Política de cookies",
      intro: "Esta política explica qué guarda esta web en tu navegador y para qué.",
      sections: [
        { heading: "Qué son las cookies", blocks: [
          "Las cookies y las tecnologías similares (como el almacenamiento local del navegador) son pequeños archivos o datos que una web guarda en tu dispositivo para funcionar o para recordar información sobre la visita.",
        ] },
        { heading: "Qué utiliza esta web", blocks: [
          storage.hasConsent
            ? "Esta web solo utiliza las cookies y datos técnicos imprescindibles y, si lo aceptas en el banner, las de analítica que se detallan a continuación."
            : "Ahora mismo, esta web no utiliza cookies de analítica, de publicidad ni de redes sociales. Solo guarda la información técnica imprescindible que se detalla a continuación, que no requiere tu consentimiento según el artículo 22.2 de la LSSI-CE.",
          { table: {
            head: ["Nombre", "Tipo", "Finalidad", "Duración"],
            rows: [
              ["intro-seen", "Almacenamiento de sesión (propio)", "Recuerda que ya has visto la animación de entrada para que no se repita.", "Hasta que cierras la pestaña"],
              ...(storage.hasConsent ? [["cookie-consent", "Almacenamiento local (propio)", "Guarda tus preferencias de cookies.", "12 meses"]] : []),
              ["__cf_bm", "Cookie de terceros (Cloudflare)", "Seguridad: distingue el tráfico legítimo de los bots. Solo se establece si el sistema de protección del alojamiento lo requiere.", "30 minutos"],
            ],
          } },
        ] },
        { heading: "Analítica", blocks: [
          storage.hasConsent
            ? "Las herramientas de analítica solo se activan si las aceptas en el banner de cookies. Puedes cambiar de opinión en cualquier momento desde el enlace «Preferencias de cookies» del pie de página."
            : "Si en el futuro se añade una herramienta de analítica, se actualizará esta política y no se activará hasta que la hayas aceptado en el banner de cookies. Podrás cambiar de opinión en cualquier momento.",
        ] },
        { heading: "Cómo gestionarlas", blocks: [
          "Puedes consultar, bloquear o borrar las cookies y el almacenamiento local desde la configuración del navegador. La web seguirá funcionando, aunque quizá vuelvas a ver la animación de entrada.",
          { list: [
            "[Google Chrome](https://support.google.com/chrome/answer/95647)",
            "[Mozilla Firefox](https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox)",
            "[Safari](https://support.apple.com/guide/safari/sfri11471/mac)",
            "[Microsoft Edge](https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)",
          ] },
        ] },
        { heading: "Más información", blocks: [
          `Para cualquier duda, escribe a ${owner.email}. También puedes consultar la [Política de privacidad](${paths.privacy}).`,
        ] },
      ],
    },

    notfound: {
      title: "Esta página se ha perdido, pero yo no.",
      text: "Quizá el enlace es antiguo o hay un error en la dirección. Mientras tanto, puedes tirar a canasta.",
      back: "Volver al inicio",
    },
  }
}
