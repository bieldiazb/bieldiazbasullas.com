// ── Legal texts in English ────────────────────────────────────────
// Blocks: text (supports [link](url) and emails), { list }, { table }, { dl }.

export default function legalEn({ owner, address, paths, storage }) {
  const titular = [
    ["Owner", owner.name],
    ...(owner.nif ? [["Tax ID (NIF)", owner.nif]] : []),
    ["Address", address],
    ["Email", owner.email],
  ]

  return {
    updatedLabel: "Last updated",
    legal: {
      title: "Legal notice",
      sections: [
        { heading: "Owner details", blocks: [
          `In accordance with Article 10 of Spanish Law 34/2002 on information society services and e-commerce (LSSI-CE), the website ${owner.domain} is owned by:`,
          { dl: titular },
        ] },
        { heading: "Purpose", blocks: [
          "This website presents the owner’s professional work as a web developer and designer, the services he offers and some of the projects he has built, and lets you get in touch.",
        ] },
        { heading: "Terms of use", blocks: [
          "Accessing and using the website means you accept this legal notice. You agree to use it appropriately, in accordance with the law, good faith and public order, and not to use it for unlawful activities or anything that could harm the website or third parties.",
        ] },
        { heading: "Intellectual and industrial property", blocks: [
          "The design, code, text and other content on this website belong to the owner or are used with permission. They may not be reproduced, distributed, publicly communicated or transformed without written permission, except where the law allows it.",
          "The names, trademarks and images of the projects shown in the projects section belong to their respective owners and are included only as examples of the work done.",
        ] },
        { heading: "External links", blocks: [
          "This website contains links to third-party sites, such as the projects or social networks. The owner does not control their content and is not responsible for it; you access them at your own risk.",
        ] },
        { heading: "Liability", blocks: [
          "The owner works to keep the information accurate and the website running well, but cannot guarantee that there will be no errors or interruptions, and is not liable for any resulting damage, within the limits allowed by law.",
        ] },
        { heading: "Data protection and cookies", blocks: [
          `Personal data is processed as described in the [Privacy policy](${paths.privacy}), and cookies and similar technologies as described in the [Cookie policy](${paths.cookies}).`,
        ] },
        { heading: "Applicable law", blocks: [
          "This legal notice is governed by Spanish law. Any dispute will be submitted to the courts that have jurisdiction under the applicable rules and, if the user is a consumer, to those of their place of residence.",
        ] },
      ],
    },

    privacy: {
      title: "Privacy policy",
      intro: `This policy explains what personal data ${owner.domain} collects, what it is used for and what rights you have, under Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).`,
      sections: [
        { heading: "Data controller", blocks: [{ dl: titular }] },
        { heading: "What data is collected", blocks: [
          "Only what you send through the contact form or by email: your name, your email address, your message and, if you ticked any, the services you are interested in.",
          "In addition, as with any website, the hosting service logs technical connection data (such as your IP address and browser) for security and operational reasons.",
          "Cloudflare Web Analytics is also used to see, in aggregate, how many visits the website gets and which pages are viewed. It does not use cookies or store anything in your browser, and it does not identify who visits the website.",
          "If you accept it in the cookie banner, Google Analytics is also used to understand how the website is used: which pages are visited, where visits come from (for example, a search engine), the type of device and approximate location. Google Analytics uses cookies with a random identifier and does not run unless you accept it.",
        ] },
        { heading: "What it is used for", blocks: [
          { list: [
            "Replying to your enquiry and, if you ask, preparing a project proposal.",
            "Serving the website, protecting it from malicious traffic and fixing errors (technical connection data).",
            "Understanding, in aggregate and anonymously, how the website is used (Cloudflare Web Analytics).",
            "If you accept it, analysing in more detail how the website is used in order to improve it (Google Analytics).",
          ] },
          "It is not used to send you advertising or to build profiles, and no automated decisions are made.",
        ] },
        { heading: "Legal basis", blocks: [
          { list: [
            "Enquiries: your request and taking pre-contractual steps at your request (Art. 6(1)(b) GDPR), and your consent when you submit the form (Art. 6(1)(a) GDPR).",
            "Technical data and aggregate statistics: the legitimate interest in keeping the website secure, running and knowing how it is used (Art. 6(1)(f) GDPR).",
            "Google Analytics: your consent in the cookie banner (Art. 6(1)(a) GDPR), which you can withdraw at any time.",
          ] },
        ] },
        { heading: "How long it is kept", blocks: [
          "Enquiry data is kept for as long as needed to reply and for no more than one year after the last contact. If we start working together, it is kept for the duration of the relationship and for the periods required by law (for example, for tax purposes).",
        ] },
        { heading: "Who has access", blocks: [
          "Data is not shared with third parties unless required by law. These providers help run the website and process data on the owner’s behalf:",
          { list: [
            "Cloudflare, Inc. (United States): website hosting and delivery, and cookie-free visit statistics (Cloudflare Web Analytics).",
            "Google Ireland Limited (Ireland) and Google LLC (United States): visit statistics with Google Analytics, only if you accept it.",
            "Formspree, Inc. (United States): receiving and forwarding contact form messages.",
            "Proton AG (Switzerland): the email service used to reply to enquiries.",
          ] },
        ] },
        { heading: "International transfers", blocks: [
          "Cloudflare, Google and Formspree may process data in the United States. In those cases, the transfer is made with the safeguards provided for in the GDPR, such as the EU-US Data Privacy Framework or the standard contractual clauses approved by the European Commission. Switzerland has an adequacy decision from the European Commission.",
        ] },
        { heading: "Your rights", blocks: [
          `You can exercise your rights of access, rectification, erasure, objection, restriction of processing and portability, and withdraw your consent at any time, by writing to ${owner.email}. Tell us which right you want to exercise; if necessary, we may ask you to verify your identity.`,
          "If you believe your data has not been handled properly, you can lodge a complaint with the [Spanish Data Protection Agency (AEPD)](https://www.aepd.es).",
        ] },
        { heading: "Children", blocks: [
          "This website is not aimed at children under 14. If you are under 14, do not send personal data without your parents’ or guardians’ consent.",
        ] },
        { heading: "Security", blocks: [
          "Reasonable technical and organisational measures are applied to protect your data, such as an encrypted connection (HTTPS).",
        ] },
        { heading: "Changes to this policy", blocks: [
          "This policy may be updated to reflect legal or service changes. The date of the last update is shown at the top of the page.",
        ] },
      ],
    },

    cookies: {
      title: "Cookie policy",
      intro: "This policy explains what this website stores in your browser and why.",
      sections: [
        { heading: "What cookies are", blocks: [
          "Cookies and similar technologies (such as the browser’s local storage) are small files or pieces of data that a website stores on your device to work or to remember information about your visit.",
        ] },
        { heading: "What this website uses", blocks: [
          storage.hasConsent
            ? "This website only uses the essential technical cookies and data and, if you accept them in the banner, the analytics cookies listed below."
            : "Right now, this website does not use analytics, advertising or social media cookies. It only stores the essential technical information listed below, which does not require your consent under Article 22.2 of the LSSI-CE.",
          { table: {
            head: ["Name", "Type", "Purpose", "Duration"],
            rows: [
              ["intro-seen", "Session storage (first-party)", "Remembers that you have already seen the intro animation so it does not repeat.", "Until you close the tab"],
              ...(storage.hasConsent ? [["cookie-consent", "Local storage (first-party)", "Stores your cookie preferences.", "12 months"]] : []),
              ...(storage.hasConsent ? [
                ["_ga", "Analytics cookie (Google Analytics)", "Distinguishes visitors with a random identifier. Only if you accept it.", "2 years"],
                ["_ga_4PM01TM1G7", "Analytics cookie (Google Analytics)", "Keeps the state of the visit session. Only if you accept it.", "2 years"],
              ] : []),
              ["__cf_bm", "Third-party cookie (Cloudflare)", "Security: tells legitimate traffic apart from bots. Only set if the hosting protection system requires it.", "30 minutes"],
            ],
          } },
        ] },
        { heading: "Analytics", blocks: [
          storage.hasConsent
            ? "Visits are counted with Cloudflare Web Analytics, which does not use cookies. In addition, if you accept it in the banner, Google Analytics (Google Ireland Limited) is enabled, which does use them; if you don’t accept it, it is not loaded. You can change your mind at any time from the “Cookie preferences” link in the footer, and if you withdraw your consent the Google Analytics cookies are deleted. More information: [how Google uses data](https://policies.google.com/technologies/partner-sites)."
            : "To see how many visits the website gets, it uses Cloudflare Web Analytics, which counts them in aggregate without cookies or data in your browser, so your consent is not needed. If a tool that does use them is added in the future, this policy will be updated and it will not run until you accept it in the cookie banner.",
        ] },
        { heading: "How to manage them", blocks: [
          "You can view, block or delete cookies and local storage from your browser settings. The website will keep working, although you may see the intro animation again.",
          { list: [
            "[Google Chrome](https://support.google.com/chrome/answer/95647)",
            "[Mozilla Firefox](https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox)",
            "[Safari](https://support.apple.com/guide/safari/sfri11471/mac)",
            "[Microsoft Edge](https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)",
          ] },
        ] },
        { heading: "More information", blocks: [
          `If you have any questions, write to ${owner.email}. You can also read the [Privacy policy](${paths.privacy}).`,
        ] },
      ],
    },

    notfound: {
      title: "This page got lost, but I didn’t.",
      text: "The link may be old or the address may have a typo. Meanwhile, take a shot.",
      back: "Back to home",
    },
  }
}
